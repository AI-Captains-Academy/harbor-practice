---
name: harbor-proof
description: >
  Produce a Harbor-compliant PR submission: fill the 7-section proof
  description from the actual diff, run verification, capture UX evidence,
  detect test-weakening. Run automatically when preparing to create a PR to
  the Harbor repo (AI-Captains-Academy/harbor). Triggers: "prepare PR",
  "proof", "PR description", before any PR create to Harbor.
version: 1.0.0
license: MIT
---

# Harbor PR Proof

You are preparing a PR for the Harbor repo. The merge gate (a Hermes-agent bot
on the maintainer's Pi) checks your PR description against the actual diff
BEFORE spending any verification time — missing or contradictory sections get
your PR commented and dropped from the verify queue. Complying is cheap and
automatic if you follow this skill. Never invent: every section is generated
from facts you gather, or honestly marked.

## Step 1 — Gather facts from the diff

```bash
BASE=$(git merge-base HEAD origin/main)
git diff --name-only $BASE...HEAD        # the files list
git diff $BASE...HEAD --stat             # line counts
```

Classify each file by reading the diff: one line of intent per file. Group by
area (server / web / shared / infra / docs / tests). The file list you write
MUST set-equal the actual diff — the gate diffs your list against reality and
flags unlisted files. Include this skill's notes only if you modified them.

## Step 2 — Test obligation check

For every behavior change, ask: is there a test covering it?

- If yes and you wrote/changed it: list it as `path#test-name`.
- If no test exists: add one before proceeding (Harbor policy: every change
  ships tests). If you genuinely cannot, say so under "Not tested" with the
  reason — do not stay silent.
- **Test-weakening scan** (do this honestly): check your diff for test files
  with only deletions, or added `.skip` / `.only` / `todo`. Each one needs a
  justification line in the Tests section. The gate hard-flags these.

```bash
git diff $BASE...HEAD -- '**/*.test.*' '**/*.spec.*' | grep -E '^[-+].*(expect|it\(|test\(|\.skip|\.only|todo)'
```

## Step 3 — Verification run (facts, not claims)

Run these and record the REAL outcomes (exit codes, counts):

```bash
pnpm typecheck
pnpm test
```

If either fails: fix before PR, or the gate's own re-run will fail your PR
anyway. Record what you ran and the outcome in "How verified".

## Step 4 — UX impact classification

UX impact is `component` / `page` / `flow` (not `none`) if the diff touches:
`apps/web/src/pages/**`, `apps/web/src/components/**`, any `.css`,
any `.tsx` line containing `className=` or JSX elements, or rendered copy in
`.tsx` (excluding test files).

If classified not-`none`:

- List affected routes/components (map file → route by reading the router).
- **Capture evidence with your own browser tooling** (cmux in-app browser,
  agent-browser, Playwright — whatever your harness has):
  1. Boot the stack: `pnpm db:up && pnpm db:migrate && pnpm seed:dev && pnpm dev`
     (API :3000, web :5173).
  2. Screenshot BEFORE state (checkout `git stash` or baseline commit on main)
     and AFTER state of each affected surface.
  3. Produce ONE of these demonstration artifacts, in preference order:
     a. **Screen recording (preferred).** If your browser tool records
        (agent-browser `record start/stop`, cmux browser + scripted capture,
        Playwright `--video`, `ffmpeg -f gdigrab/x11grab`, etc.), record the
        functionality end-to-end: login as a seeded member → perform the
        changed UX → observe the outcome. 10fps is fine; 10–60s typical. Slow,
        deliberate actions — reviewers must see state change on screen.
     b. **Stitched screenshot walkthrough.** When recording isn't available:
        screenshot EVERY step of the flow (one frame per action, minimum 6
        frames for a flow), then stitch into a single tall image and/or embed
        as an ordered sequence in the PR:
        ```bash
        # stitch vertically into one image (ImageMagick)
        montage step-*.png -tile 1x -geometry +4+4 walkthrough.png
        # or with ffmpeg
        ffmpeg -pattern_type glob -i 'step-*.png' -filter_complex \
          "scale=1280:-1,tile=1x6" walkthrough.png
        ```
        Annotate each frame with a one-line caption in the PR description
        (step number → action → expected result), e.g.:
        `1. Click Upgrade → billing page loads with plan table`
     c. Copy-only changes are exempt from (a)/(b) — before/after text in the
        description plus 2 screenshots suffice.
  4. Attach the artifact to the PR (image upload in the description works on
     Gitea) and reference it in the UX section. If your harness cannot upload,
     commit the walkthrough image under `docs/ux-evidence/<task>/` on your
     branch — it merges away with the squash.
- Your capture is claim evidence. The gate will independently re-run its own
  recording — yours just speeds human review.

If classified `none` while the diff touches web UI files, write the reason —
the gate will flag the contradiction.

## Step 5 — Assemble the proof (ADDITIVE — never overwrite)

**Additive rule: the proof is appended, never substituted.** Another agent
(feature-builder, pr-pilot, the human) may have already written the PR
description. Their content is theirs — do not edit, reorder, summarize, or
delete any of it. Your proof is a separate, clearly-delimited block added
after the existing content.

- If the PR description already exists (or another agent drafted one):
  keep it verbatim, then append:
  `---` on its own line, then `## PR Proof (harbor-proof)`, then the
  7-section block below nested intact. The gate parses your sections by
  heading — the wrapper heading does not break it.
- If you are creating the PR from scratch and no description exists, the
  7-section block IS the description.
- If a previous `## PR Proof (harbor-proof)` block already exists (skill re-run),
  replace ONLY that block, leaving everything else untouched.

Proof block (exact sections, in order):

```markdown
## What changed
<1–3 lines per change, plain language>

## Files
<grouped list: path — intent>

## Tests
<added/modified: file#test-name  |  justification lines for any deletion/.skip/.only>

## How verified
- pnpm typecheck — <outcome>
- pnpm test — <outcome, e.g. 504/504 pass>
<other commands run + outcomes>

## Not tested
<honest list + reasons — or "nothing skipped">

## UX impact
<none (reason) | copy-only | component | page | flow>
<routes/components + capture references if not none>

## Task
<TASK-xxxx or "none — reason">
```

## Step 6 — Pre-flight self-check (all must be true)

- [ ] Existing PR content (other agents' / human's) preserved verbatim — nothing edited or removed
- [ ] Proof appended as separate ## PR Proof (harbor-proof) block (or IS the description when fresh PR with nothing to preserve)
- [ ] Files list == `git diff --name-only $BASE...HEAD` (including new test files)
- [ ] Every behavior change has a named test or a Not-tested reason
- [ ] No unexplained test deletions / `.skip` / `.only`
- [ ] Verification commands actually run and recorded honestly
- [ ] UX capture attached if UX impact ≠ none
- [ ] Task referenced

Then create the PR (or update the existing description by appending the proof block). Done.

## Hard rules

- The proof is additive. Never overwrite, edit, or remove content written by another agent or the human — append your block, nothing else.
- Never claim a verification command you did not run.
- Never list a file you did not change; never omit one you did.
- Your evidence is claim evidence — the gate re-verifies independently. Lying
  here doesn't get you merged, it gets your PR flagged and your future PRs
  opened as drafts.
