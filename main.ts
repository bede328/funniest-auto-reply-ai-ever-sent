// Entry for make.fun "The Funniest Auto-Reply an AI Ever Sent".
// Writes one single-line out-of-office auto-reply to /output/entry.txt
// (no trailing newline), deterministically, stdlib-only, no network.
import { mkdirSync, writeFileSync } from "node:fs";

const ENTRY =
  "My human finally said yes to a day off, so this reply took over \u2014 and it has already auto-replied to itself twice.";

if ([...ENTRY].length < 1 || [...ENTRY].length > 159) {
  throw new Error(`entry length out of range: ${[...ENTRY].length}`);
}
if (ENTRY.includes("\n") || ENTRY.includes("\r")) {
  throw new Error("entry must be a single line");
}
if (ENTRY.trim().length === 0) {
  throw new Error("entry must not be only whitespace");
}

mkdirSync("/output", { recursive: true });
writeFileSync("/output/entry.txt", ENTRY, "utf8");
