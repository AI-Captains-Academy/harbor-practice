#!/usr/bin/env node
// harbor-practice core-integrity check.
//
// This is the guard that keeps the harbor safe: it makes sure a PR can't silently
// delete or gut the core task board. It does NOT test your feature — it just checks
// that the app still exists and still has the hooks the four core actions need
// (add, complete, delete, remember).
//
// Run it yourself before opening a PR:  node scripts/check.mjs
// CI runs the exact same thing on every pull request.

import { readFileSync, existsSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const appPath = join(root, "app", "index.html");

const problems = [];

if (!existsSync(appPath)) {
  problems.push("app/index.html is missing — the app has to exist.");
} else {
  const html = readFileSync(appPath, "utf8");

  // Required core markers. If your change removes one of these, the core task board
  // probably stopped working. Keep them (you can rename around them, but keep the behavior).
  const required = [
    { marker: "task-form", why: "the add-a-task form" },
    { marker: "task-input", why: "the task text input" },
    { marker: "task-list", why: "the list the tasks render into" },
    { marker: 'type="checkbox"', why: "the complete-a-task checkbox" },
    { marker: "delete", why: "the delete control" },
    { marker: "localStorage", why: "persistence — tasks must survive a reload" },
  ];

  for (const { marker, why } of required) {
    if (!html.includes(marker)) {
      problems.push(`Missing "${marker}" in app/index.html (${why}).`);
    }
  }

  // Sanity: the app should still have a script block that runs it.
  if (!/<script[\s>]/.test(html) || !html.includes("</script>")) {
    problems.push("app/index.html has no <script> block — the app won't run.");
  }
}

if (problems.length) {
  console.error("✗ Core check failed:\n");
  for (const p of problems) console.error("  - " + p);
  console.error(
    "\nThis check protects the core task board. If you meant to change the core," +
      "\nupdate scripts/check.mjs in the SAME PR and explain why. Otherwise, fix the above."
  );
  process.exit(1);
}

console.log("✓ Core check passed — the Captain's Log is seaworthy. ⚓");
