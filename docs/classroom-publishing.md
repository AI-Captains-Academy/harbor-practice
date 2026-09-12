# Publishing a course to the Harbor classroom

This is the agent-facing runbook for taking course content from *draft on your
machine* to *published in the Harbor classroom*. It is written so you can hand
it (or this repo's URL) to any AI agent as a single instruction and have it do
the right thing: **PR first, import to dev, then prod — in that order, with
logging at every step.**

Humans can read this too. It's short on purpose.

---

## The one-paragraph mental model

Harbor is the production platform ([github.com/AI-Captains-Academy/harbor](https://github.com/AI-Captains-Academy/harbor),
private). Course content lives as plain markdown on disk, and a script called
`import-skool-content.ts` loads it into the classroom database (courses →
modules → lessons). The flow is:

```
content files → PR in harbor-practice → merge → import to dev → verify → import on prod → publish
```

Nothing ever goes straight to prod, and nothing is ever pushed directly to
`main`. Every step is a git operation or a logged script run, which is what
gives you the audit trail for free.

---

## Step 1 — Put the content in a PR on harbor-practice

**Repo:** https://github.com/AI-Captains-Academy/harbor-practice (public)

```bash
git clone https://github.com/AI-Captains-Academy/harbor-practice.git
cd harbor-practice
git checkout -b feat/course-<course-slug>        # e.g. feat/course-ai-captains-academy-m2
mkdir -p content/skool/<module-dir>/lessons
# ...drop your lesson .md files into lessons/, plus optional
# module-intro.md, clips/ and thumbnails/ (see "Content format" below)
git add content/
git commit -m "Add <module title> course content"
git push -u origin feat/course-<course-slug>
gh pr create --fill                              # or open the PR on the website
```

Why a PR and not a direct push? Three reasons, all of which double as your
logging:

1. **Review** — at least one other pair of eyes (human or CI) sees the content
   before it exists anywhere real.
2. **CI runs on every PR** — the repo's core check (`.github/workflows/ci.yml`)
   must be green before merge. If your change accidentally breaks the practice
   app, you find out here, not later.
3. **The PR URL *is* the log entry.** "When did course X ship?" → search PRs in
   the repo. No separate changelog to maintain.

Follow the repo's own SOP — it's in [`CONTRIBUTING.md`](../CONTRIBUTING.md) and
[`AGENTS.md`](../AGENTS.md). Branch naming, one feature per PR, squash-merge,
delete the branch after. Agents follow the exact same rules as humans; there is
no agent fast-lane and no self-approving.

**Merge gate:** the PR merges only when CI is green and a maintainer has
approved (trivial doc-only changes may self-merge after green CI per the SOP —
course content is *not* trivial; get a human review).

---

## Step 2 — Import to dev (your local Harbor checkout)

After the PR merges, pull the content into a local Harbor clone and run the
importer against your **local dev database** — never against prod from here.

**Repo (private):** https://github.com/AI-Captains-Academy/harbor

```bash
git clone git@github.com:AI-Captains-Academy/harbor.git   # org members only
cd harbor
pnpm install
cp .env.example .env          # dev defaults are fine; never real keys

pnpm exec tsx scripts/import-skool-content.ts \
  ../harbor-practice/content/skool/<module-dir> \
  --course <course-slug> \
  --course-title "AI Captains Academy" \
  --tiers silver,gold
```

Notes:

- **No `--publish` yet.** The importer defaults to draft lessons. You'll see
  `Lessons imported as DRAFTS` in the output — that's correct at this stage.
- The importer is **idempotent**: lessons match on their `N.N.N` numeric prefix
  (e.g. `2.5.1 — …md`), so re-running updates in place instead of duplicating.
- It writes a row to the `imports` table (`kind: "skool-content"`) with a full
  summary — created/updated counts, missing clips. That's your DB-side log.

**Verify** before going anywhere near prod:

- Open the admin Courses page (`/admin/courses` in the local dev server) and
  check the course, module, and lesson list look right.
- Open one lesson as a member and confirm the body renders cleanly.

---

## Step 3 — Import on prod (the droplet)

Prod is a DigitalOcean droplet; the deploy spec is
[`DEPLOYMENT.md`](https://github.com/AI-Captains-Academy/harbor/blob/main/DEPLOYMENT.md)
in the Harbor repo. Live URL: https://harbor.sovereignpreneur.me

SSH access and the droplet's `.env` are **admin-only** — if you (the agent)
don't have credentials, stop here and hand back to your human with a summary of
steps 1–2 done and step 3 pending. That's a feature, not a failure: prod access
is deliberately not something every agent has.

On the droplet:

```bash
ssh root@67.205.157.29
cd /opt/harbor
scripts/deploy.sh        # pull latest main + rebuild + health check

# get the content onto the droplet (clips/videos especially — see below)
git clone https://github.com/AI-Captains-Academy/harbor-practice.git /tmp/harbor-practice

# run the importer inside the running app container (it has DB access + tsx)
docker compose -f docker-compose.prod.yml exec app \
  node --import tsx scripts/import-skool-content.ts /tmp/harbor-practice/content/skool/<module-dir> \
    --course <course-slug> --tiers silver,gold --copy-videos
```

- `--copy-videos` moves clip files into Harbor's media dir (`DATA_DIR/media/courses/`)
  so lesson video URLs resolve. If clips are missing, the importer **warns and
  continues** — check the output and copy the named files onto the droplet, then
  re-run (it's idempotent).
- Check the live site: course visible at https://harbor.sovereignpreneur.me
  (still draft), lessons render, videos play.

**Publish** — two options, pick one:

- Re-run the importer with `--publish` (idempotent, flips all lessons in that
  module to published), or
- Publish per-lesson from the admin UI (`/admin/courses` → course editor).

Publishing is the only step with no draft safety net, so it's deliberately
last, deliberate, and human-visible in the import log.

---

## Credentials — what you need and where it comes from

| Thing | Who needs it | How to get it |
| --- | --- | --- |
| GitHub account in the AI Captains org | Everyone (agents too) | Join Harbor as a member → you're auto-invited to the org. Log in with `gh auth login` on your machine. |
| `gh` CLI | Agent runs the PR | Install from https://cli.github.com, then `gh auth login` (device flow, no PAT juggling). |
| Harbor repo (private) access | Anyone importing to dev | Org membership with repo read access — granted with the org invite. If `git clone` of `harbor` fails, ask a maintainer; don't guess. |
| Dev database | Anyone importing to dev | Already configured via the local `.env` (dev defaults). No extra signup. |
| Droplet SSH (prod) | **Maintainers/admins only** | Request from the Harbor admins (Jordan / Ron). Agents should NOT hold prod SSH keys — hand off to a human at Step 3. |
| Stripe / Mailgun / etc. | Not needed for course publishing | These are billing/email creds, unrelated to the classroom pipeline. Ignore them. |

**Hard rule:** no credentials ever go in a tracked file, a PR, a lesson body,
or a chat message. If a key leaks, rotate it immediately and say so in the PR.

---

## Content format (what the importer expects)

Per module directory (`content/skool/<module-dir>/`):

- `lessons/<N.N.N>-<slug>.md` — one file per lesson. The **`# Heading`** on line
  1 becomes the lesson title (keep the `N.N.N` numeric prefix — it's the
  idempotency key). A `**🎬 Clip:** \`clipname.mp4\` (~5 min)` line sets the
  video + duration. Everything after the first `---` is the lesson body
  (markdown, sanitized on import).
- `module-intro.md` — optional; first `#` line becomes the module title.
- `clips/*.mp4` — optional; referenced by the 🎬 line, copied by `--copy-videos`.
- `thumbnails/*` — optional; matched to lessons by numeric prefix.

Course slug: lowercase, digits, hyphens only (`[a-z0-9-]+`, max 80 chars).

---

## TL;DR for the single-prompt handoff

Give an agent this repo URL plus one sentence:

> "Read docs/classroom-publishing.md in this repo and follow it end to end for
> the course content in `<your content dir>`: PR on harbor-practice first, then
> local dev import, stop and hand off to me before anything touches prod."

The doc is the procedure. The agent doesn't need any other context.
