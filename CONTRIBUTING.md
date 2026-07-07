# Contributing to harbor-practice ⚓

First time contributing to anything? **Perfect.** This repo exists for exactly that. Read
[`START-HERE.md`](START-HERE.md) for the guided version. This file is the reference.

## The only rule that matters

**Don't break the core.** After any change, the Captain's Log must still:

1. Add a task
2. Mark a task done
3. Delete a task
4. Remember tasks after a page reload

If those four still work, you're good. CI checks a lighter version of this automatically on
every PR (see below), but you should try it in your browser yourself.

## The workflow, once

```bash
# 1. Get the code
git clone https://github.com/AI-Captains-Academy/harbor-practice.git
cd harbor-practice

# 2. Branch (name it after your change)
git checkout -b add-task-counter

# 3. Edit app/index.html, then check it in your browser
open app/index.html        # 'start' on Windows, 'xdg-open' on Linux

# 4. Run the local check (optional but nice — same thing CI runs)
node scripts/check.mjs

# 5. Save it
git add app/index.html
git commit -m "Add a live task counter"

# 6. Send it up
git push -u origin add-task-counter

# 7. Open the pull request
gh pr create --fill        # or use the GitHub website button
```

## Branch naming

Short, kebab-case, describes the change: `add-dark-mode`, `fix-empty-task`,
`counter-in-tab-title`. That's it.

## Commit messages

One line, present tense, says what changed: `Add strikethrough to completed tasks`. If you're
fixing an issue, you can add `Closes #12` in the PR description (not required in the commit).

## Pull requests

- **One feature per PR.** Small is fast to review and fast to merge.
- Fill in the PR template: what you built, how to see it working, and `Closes #<issue>`.
- A maintainer reviews. If they ask for a change, just push another commit to the same branch
  — the PR updates itself.
- **Bumping is allowed.** No response in a few days? Comment "gentle bump ⚓". Really.

## What NOT to do

- Don't add a build step, npm packages, a framework, or a bundler. The whole app is one
  readable file on purpose.
- Don't add analytics, trackers, or external network calls. This app is fully local.
- Don't edit `.github/`, `scripts/check.mjs`, or `LICENSE` unless your task is explicitly
  about them.
- Don't rewrite the whole app in one giant PR. Ship a slice.

## The CI check

Every PR runs `.github/workflows/ci.yml`, which runs `node scripts/check.mjs`. It's simple: it
just confirms `app/index.html` still exists, is valid-ish, and still contains the core task
board hooks (so a change can't silently delete the app). Green ✅ = safe to merge. Red ✗ = read
the log; your agent can help.

## Code of conduct

Be kind. Assume good faith. We were all on rung 1 last week. Full text:
[`CODE_OF_CONDUCT.md`](CODE_OF_CONDUCT.md).

Welcome aboard. ⚓
