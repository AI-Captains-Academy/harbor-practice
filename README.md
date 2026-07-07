# harbor-practice ⚓

**The AI Captains practice harbor.** This is a safe place to learn to build with AI agents by
doing the real thing: pick a task, make a branch, vibe-code a feature, open a pull request,
and get it merged by a maintainer.

You cannot break anything important here. That is the whole point. Break things. Learn how
they get fixed. Ship your first PR.

> New here? Read **[`START-HERE.md`](START-HERE.md)** — it is written so you can hand it
> straight to your AI agent (Claude, Cursor, whatever you use) and say *"walk me through
> this."*

---

## What is this?

`harbor-practice` is the community sandbox for **[Harbor](https://github.com/AI-Captains-Academy/harbor)**,
the AI Captains community platform. Harbor itself is private (it runs the real crew). This
repo is public and beginner-owned: **you** and the rest of the crew build it together.

Inside is a tiny, real, working app — **the Captain's Log**, a little crew task board that
runs in your browser with no build step, no install, nothing to configure. Open
`app/index.html` and it works. Your job is to make it better, one small feature at a time.

## The 60-second version

```
1. Read START-HERE.md  (hand it to your AI agent)
2. Read PLAN.md        ("find me a good first task")
3. Claim a task        (comment on the issue, or open one)
4. Make a branch       git checkout -b my-feature
5. Build the thing     (vibe-code it with your agent)
6. Open a Pull Request (your agent can do this too)
7. A maintainer reviews + merges it. You just shipped. 🚀
```

## The contribution ladder

Everyone starts at the bottom. That is normal. That is good.

| Rung | Who | What you do |
|---|---|---|
| **1 — Log keeper** | Brand new | Add a task to the to-do list (open a good issue). Your first contribution is *writing down work*, not code. This is a real skill. |
| **2 — Builder** | Ready to code | Take a `good-first-task`, branch, build, PR. Your agent coaches the whole git loop. |
| **3 — Veteran** | Shipped a few PRs | Experiment freely with new features in `app/experiments/` — as long as core functionality still works (CI stays green). |

You do **not** need permission to start. Being in the AI Captains GitHub org (you were
auto-invited when you joined Harbor) is all the access you need.

## Rules of the harbor

- **Don't break the core.** The main task board must keep working. CI checks this on every PR.
- **Small PRs win.** One feature per pull request. Easier to review, faster to merge.
- **Ask the crew.** Stuck? Open a draft PR or comment on your issue. Someone has been there.
- **Be kind in review.** We were all on rung 1 last week.

See [`CONTRIBUTING.md`](CONTRIBUTING.md) for the full git walkthrough and
[`CODE_OF_CONDUCT.md`](CODE_OF_CONDUCT.md) for how we treat each other.

## Run the app

No install. No build. Just open the file:

```bash
open app/index.html          # macOS
# or double-click app/index.html in your file explorer
```

That's it. It is one HTML file with inline CSS + JS on purpose, so a beginner can read the
whole thing top to bottom.

---

*Built by the crew, for the crew. An [AI Captains](https://skool.com/aicaptains) project.*
