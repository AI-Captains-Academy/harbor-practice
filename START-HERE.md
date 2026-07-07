# START HERE ⚓

Welcome aboard. You are about to ship your first pull request. Seriously.

This file is written so you can **hand it to your AI agent** (Claude Code, Cursor, Cline,
whatever you use) and say:

> "Read START-HERE.md, PLAN.md, and CONTRIBUTING.md in this repo, then walk me through
> picking a good first task and building it."

Your agent will take it from there. Below is the same thing, for humans.

---

## What you're going to do

You're going to add a small feature to a tiny task-board app (`app/index.html`), and open a
pull request so a maintainer can merge it. Along the way you'll learn:

- **branches** — your own copy of the code to experiment on
- **commits** — saving your work with a message
- **pull requests (PRs)** — asking to merge your work into the main project
- **code review** — a maintainer looks at your work and helps you land it

None of this is scary once you've done it once. Let's do it once.

## Step 0 — Get the code onto your computer

```bash
git clone https://github.com/AI-Captains-Academy/harbor-practice.git
cd harbor-practice
open app/index.html      # see the app running. macOS: 'open'. Windows: 'start'. Linux: 'xdg-open'.
```

If `git clone` fails with a permission error, you may not be signed in to GitHub on the
command line yet. Ask your agent: *"help me authenticate git with GitHub"* (the `gh` CLI is
the easy path).

## Step 1 — Find a task

Open [`PLAN.md`](PLAN.md). It has a to-do list of small features. Pick one that looks fun.

Or ask your agent: **"read PLAN.md and find me a good first task I can practice building."**

Prefer tasks labeled **`good-first-task`** in the
[Issues tab](https://github.com/AI-Captains-Academy/harbor-practice/issues) — they're sized
for a first PR.

**Claim it** so two people don't build the same thing: comment "I'm taking this ⚓" on the
issue. No issue yet for your idea? Open one first (that's rung 1 — see the README ladder).

## Step 2 — Make a branch

A branch is your personal workspace. It keeps your experiment separate from everyone else's.

```bash
git checkout -b add-task-colors      # name it after what you're doing
```

## Step 3 — Build the thing

Open `app/index.html` and make your change. It's one file — HTML at the top, CSS in a
`<style>` block, JavaScript in a `<script>` block at the bottom. All beginner-readable.

This is where your AI agent shines. Describe what you want ("make completed tasks show a
strikethrough and a checkmark") and let it help you write the code. Then reload the file in
your browser to see it work.

Check your work against [`CONTRIBUTING.md`](CONTRIBUTING.md#the-only-rule-that-matters):
**did the existing task board still work?** Add/remove/complete a task. If yes, you're good.

## Step 4 — Save your work (commit)

```bash
git add app/index.html
git commit -m "Add color labels to tasks"
```

## Step 5 — Send it up + open a Pull Request

```bash
git push -u origin add-task-colors
```

Then open the PR. Easiest way, if you have the `gh` CLI:

```bash
gh pr create --fill
```

...or push and click the "Compare & pull request" button GitHub shows you on the repo page.
Your agent can run `gh pr create` for you.

In the PR description, say what you built and add "Closes #12" (your issue number) so it links
up.

## Step 6 — Monitor it + get it merged

- **CI runs automatically.** A green check ✅ means you didn't break the core. A red ✗ means
  something needs fixing — read the log, or ask your agent: *"the CI check failed on my PR,
  help me read the error."*
- **A maintainer reviews.** They might ask for a small change. That's normal and good — push
  another commit to the same branch and it updates the PR automatically.
- **Stalled?** If nothing's happened in a few days, it's totally fine to politely bump:
  comment "gentle bump ⚓ — ready for review whenever you have a moment." Maintainers are
  human and busy. Bumping is expected, not rude.
- **Merged!** 🎉 You just contributed to a real open-source project. That's rung 2. Do it a
  few more times and you're a veteran (rung 3) with an `experiments/` playground of your own.

---

## If you get stuck

Getting stuck is not failure — it's the actual work. Everyone here has been stuck.

1. Ask your AI agent first. It has this whole repo's context.
2. Comment on your issue or open a **draft PR** and describe where you're stuck.
3. Bring it to the crew in Harbor. That's what the community is for.

Now go read [`PLAN.md`](PLAN.md) and pick something. See you in the PRs. ⚓
