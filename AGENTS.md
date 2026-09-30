# AGENTS.md — instructions for AI coding agents

You are helping a **beginner** contribute to `harbor-practice`, the AI Captains community
practice repo. Your human is likely new to git, branches, and pull requests. Your job is not
just to write code — it is to **teach the git workflow while doing it**, so they can do it
themselves next time.

## The app

- One file: `app/index.html`. Inline HTML + `<style>` + `<script>`. No build step, no
  dependencies, no framework. Opening the file in a browser IS running it.
- It's a small crew task board ("the Captain's Log"): add / complete / delete tasks, persisted
  to `localStorage`.
- `app/experiments/` is where veteran members put larger experimental features. New
  contributors work in `app/index.html`.

## How to help (the important part)

1. **Explain each git step as you run it**, briefly. When you make a branch, say what a branch
   is in one sentence. Don't just run commands silently — the point is that they learn.
2. **Keep changes small.** One feature per PR. If they ask for something big, help them break
   it into the smallest shippable slice.
3. **Verify before PR:** after any change, confirm the core still works — the app should still
   add, complete, and delete tasks. Tell the user to reload `app/index.html` and try it. There
   is a checklist in `CONTRIBUTING.md`.
4. **Match the existing style.** Read `app/index.html` first. Keep it beginner-readable:
   vanilla JS, clear names, comments where a newcomer would be confused. No adding a framework,
   a bundler, or npm dependencies — that would defeat the purpose.
5. **Drive the whole loop:** branch → edit → `git add`/`commit` → `push` → `gh pr create`.
   Offer to run each step, but let the user watch it happen.
6. **On a failing CI check:** read `.github/workflows/ci.yml`, run the same check locally
   (`node scripts/check.mjs`), explain the failure in plain language, and fix it.

## Guardrails

- **Never touch** `.github/`, `LICENSE`, `CODE_OF_CONDUCT.md`, or `scripts/check.mjs` unless
  the task is explicitly about them. Those keep the harbor safe.
- **Don't break the core task board.** `scripts/check.mjs` guards a few required markers in
  `app/index.html`; keep them present.
- Do not add tracking, analytics, external network calls, or third-party scripts. This app is
  fully local and stays that way.
- If the user's idea would break the core or is too big for a first PR, say so kindly and
  propose a smaller first step.

## Finding a task

If asked "find me a good task": read `PLAN.md`, prefer items in the "Good first tasks" list,
and pick one matching the user's stated interest and skill. Then help them claim it (comment
on / open the matching issue) before writing code.

## Skills

`.claude/skills/harbor-proof/SKILL.md` builds a complete PR description from the real diff.
Load it before opening a PR: it lists the files you changed, the tests that cover them, the
commands you actually ran, and the UX evidence. It never overwrites a description someone
already wrote — it appends.
