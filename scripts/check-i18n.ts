// Lists English strings that have no Myanmar translation yet.
// Run: npm run check:i18n
import { readFileSync, readdirSync, statSync } from "node:fs";
import { join } from "node:path";
import * as data from "../src/data.ts";
import { MY } from "../src/i18n/my.ts";

const keys = new Set<string>();

// 1. literal t("...") / t(`...`) calls in components
function walk(dir: string): string[] {
  return readdirSync(dir).flatMap((name) => {
    const path = join(dir, name);
    return statSync(path).isDirectory() ? walk(path) : /\.tsx?$/.test(name) ? [path] : [];
  });
}
for (const file of walk("src")) {
  if (file.includes("i18n")) continue;
  const src = readFileSync(file, "utf8");
  for (const m of src.matchAll(/\bt\(\s*(?:"((?:[^"\\]|\\.)*)"|`([^`$]*)`)/g)) keys.add(JSON.parse(`"${(m[1] ?? m[2]).replace(/"/g, '\\"').replace(/\n/g, "\\n")}"`.replace(/\\\\"/g, '\\"')));
}

// 2. user-facing fields in data.ts
const add = (...values: (string | undefined)[]) => values.forEach((v) => v && keys.add(v));
data.REWARDS.forEach((r) => add(r.label, r.desc));
data.CATEGORIES.forEach((c) => add(c.label, c.sub));
data.MISSIONS.forEach((m) => add(m.label));
data.GAMES.forEach((g) => add(g.cat, g.d));
data.COURSES.forEach((c) => add(c.t, c.cat, c.lvl, c.d));
data.ENGLISH_SETS.forEach((s) => add(s.t, s.lvl, ...s.q.map((q) => q.tip)));
data.VIDEOS.forEach((v) => add(v.cat));
data.MAGAZINES.forEach((m) => add(m.cat, m.mo, m.read, m.line, ...m.toc, ...m.art.flatMap((a) => [a.k, a.h, ...a.p])));

const missing = [...keys].filter((k) => !MY[k]);
const unused = Object.keys(MY).filter((k) => !keys.has(k));
console.log(`${keys.size} strings, ${missing.length} missing Myanmar translations`);
missing.forEach((k) => console.log(`  missing: ${JSON.stringify(k)}`));
if (unused.length) console.log(`(${unused.length} translations not matched by a literal key — fine if used via variables)`);
process.exitCode = missing.length ? 1 : 0;
