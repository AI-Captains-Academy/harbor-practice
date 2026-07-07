# experiments/ ⚓

Veteran playground (rung 3). Once you've shipped a few PRs and know the ropes, this is where
you build bigger, experimental features **without risking the core task board**.

Rules:

- Anything in here must not break `app/index.html`. Link to your experiment from the main app
  (or gate it behind a toggle) rather than modifying the core.
- One experiment per folder. Add a short `README.md` in your folder saying what it explores.
- Experiments can be rougher than core code — that's the point. But keep them readable; the
  next veteran learns from them.
- No build steps, no npm, no external network calls (same as the rest of the repo).

Ideas live in [`../../PLAN.md`](../../PLAN.md) under "Veteran experiments." Claim one, or
propose your own.
