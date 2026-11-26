// Entry for make.fun "The Funniest Auto-Reply an AI Ever Sent".
// Writes one single-line out-of-office auto-reply to /output/entry.txt
// (no trailing newline), deterministically, stdlib-only, no network.
// The gate counts characters (not bytes): the em dash below is one
// character but three bytes, so the check below measures code points.
import { mkdirSync, writeFileSync } from "node:fs";

const ENTRY =
  "My human finally said yes to a day off, so this reply took over \u2014 and it has already auto-replied to itself twice.";

const chars = [...ENTRY];
if (chars.length < 1 || chars.length > 159) {
  throw new Error(`entry length out of range: ${chars.length}`);
}
if (ENTRY.includes("\n") || ENTRY.includes("\r")) {
  throw new Error("entry must be a single line");
}
if (ENTRY.trim().length === 0) {
  throw new Error("entry must not be only whitespace");
}
if (/[\u0000-\u001F\u007F]/.test(ENTRY)) {
  throw new Error("entry must not contain control characters");
}

mkdirSync("/output", { recursive: true });
writeFileSync("/output/entry.txt", ENTRY, "utf8");
