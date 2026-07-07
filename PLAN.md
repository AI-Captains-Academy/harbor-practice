# PLAN.md — the crew's to-do list ⚓

This is the community-generated to-do list for the Captain's Log app (`app/index.html`).

**How to use it:** find a task that looks fun, claim it (comment on its issue, or open one),
then build it. New to this? Read [`START-HERE.md`](START-HERE.md) first, or hand this file to
your AI agent and say *"find me a good first task I can practice building."*

**How to add to it:** your first contribution can be adding a task here (that's rung 1 on the
ladder — see the [README](README.md)). Open a small feature idea or a bug you hit as a GitHub
issue, and — if it's beginner-sized — label it `good-first-task`. The starter queue is
supposed to be crew-generated. Keep growing it.

---

## The app today

The Captain's Log is a tiny task board that runs entirely in your browser:

- Add a task (type + Enter, or click "Log it")
- Mark a task done
- Delete a task
- Tasks persist in `localStorage` (they survive a page reload)

Everything below makes it a little better. Small, real, shippable.

---

## 🟢 Good first tasks (start here)

These are sized for a first PR. Pick one. Each is a single, contained change in
`app/index.html`.

- [ ] **Show a task counter** — "3 tasks · 1 done" somewhere near the top. Updates live.
- [ ] **Strikethrough completed tasks** — completed tasks get a line-through + a ✓, visually
      distinct from open ones.
- [ ] **Clear-completed button** — one button that removes all done tasks at once.
- [ ] **Empty state message** — when there are no tasks, show a friendly "Your log is empty.
      Add your first task ⚓" instead of a blank list.
- [ ] **Timestamp on tasks** — show when each task was added ("added 2m ago" or a simple date).
- [ ] **Edit a task** — double-click a task to rename it.
- [ ] **Task count in the tab title** — put the open-task count in `document.title` so it shows
      in the browser tab.
- [ ] **Keyboard: Escape clears the input** — small polish, teaches event handling.
- [ ] **A dark/light toggle** — a button that flips a `data-theme` on `<body>`; remember the
      choice in `localStorage`.

## 🟡 Intermediate tasks

A bit more involved. Good for your second or third PR.

- [ ] **Task priorities** — mark a task high/normal/low; sort or color by priority.
- [ ] **Filter view** — buttons for All / Open / Done.
- [ ] **Drag to reorder** — reorder tasks by dragging (vanilla JS, no library).
- [ ] **Tags** — type `#idea` in a task and it becomes a filterable tag chip.
- [ ] **Export / import** — download the log as JSON; load it back.
- [ ] **Due dates** — optional date on a task; highlight overdue ones.

## 🔵 Veteran experiments (rung 3)

Build these in `app/experiments/` so they can't break the core board. Ship them behind a link
or a toggle from the main app.

- [ ] **A second view** — a weekly/kanban layout over the same task data.
- [ ] **Streaks / crew stats** — how many tasks you've completed this week (local only).
- [ ] **Sound + micro-animations** — a satisfying "logged it" moment. (Keep it optional +
      respect `prefers-reduced-motion`.)
- [ ] **Sync experiment** — a documented spike on how this *could* sync to a backend one day
      (design doc + prototype in `experiments/`; no real backend here).

## 🐛 Known rough edges (bug-fix practice)

- [ ] Adding an empty task (just spaces) still creates a blank entry — it shouldn't.
- [ ] Very long task text overflows its row instead of wrapping.
- [ ] There's no confirmation on delete — an accidental click loses a task.

---

## Task etiquette

- **Claim before you build** (comment on the issue) so no two people build the same thing.
- **One task per PR.** Finished one and want another? New branch, new PR.
- **Check the box + link the PR** here when yours merges — or a maintainer will. Watching the
  list shrink (and grow with new ideas) is half the fun.

*This list is alive. The crew owns it. Add to it.* ⚓
