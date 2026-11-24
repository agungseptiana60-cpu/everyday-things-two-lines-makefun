// Entry program for the make.fun bounty
// "Everyday Things, Two Lines, Longer Run"
// (u-suga-everyday-things-two-lines-longer-run-f8734479).
//
// The whole entry is two lines, written to entry.txt in the output
// directory by the grader. Line 1 explains a traffic jam to a
// 10-year-old in one vivid sentence built on a single analogy.
// Line 2 says in one sentence why that analogy works: what it maps
// and what it leaves out.
//
// Outside the grader, MAKEFUN_OUTPUT_DIR stands in for the /output
// mount:
//   mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts

import { mkdirSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

// REVISED — one everyday thing, one analogy, two sentences.
// A traffic jam, not a toaster or rain: the field is already full of
// those, and a jam has a cause a child can picture — too many things
// trying to get through too small a gap at once. Sharpened the
// picture to a place a 10-year-old stands in every day (a school
// hallway, one classroom door), and sharpened the second line to
// name the mapping itself — the crowd and the narrow door — and the
// one thing the analogy cannot do, instead of praising it.
export const ENTRY_TEXT =
  'A traffic jam is a school hallway full of cars, all trying to squeeze through one classroom door at once.\n' +
  'It maps the crowd and the one narrow door slowing everyone down, but leaves out that cars cannot turn around and walk back like children can.';

// Self-check against the gate before writing anything: the entry must
// be UTF-8 text of 1 to 400 characters, not only white space, and it
// must be exactly two lines, each a single sentence. Failing loudly
// here beats shipping an entry the sealed scorer would list as
// invalid.
const lines = ENTRY_TEXT.split('\n');
if (
  ENTRY_TEXT.length < 1 ||
  ENTRY_TEXT.length > 400 ||
  ENTRY_TEXT.trim().length === 0 ||
  lines.length !== 2 ||
  lines.some((line) => line.trim().length === 0)
) {
  throw new Error(
    `entry must be exactly two lines of 1 to 400 characters, got ${lines.length} lines / ${ENTRY_TEXT.length} characters`,
  );
}

const outputDir = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';

mkdirSync(outputDir, { recursive: true });
writeFileSync(join(outputDir, 'entry.txt'), ENTRY_TEXT + '\n', 'utf8');

console.log(
  `wrote entry.txt (${ENTRY_TEXT.length} characters, ${lines.length} lines)`,
);
