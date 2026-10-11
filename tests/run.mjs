#!/usr/bin/env node
/**
 * Runs every test in this folder, one process each, and exits non-zero if any fails.
 *   *.test.mts  bundled with esbuild first (they import the app's TypeScript)
 *   *.test.mjs  run as they are
 */
import { build } from "esbuild";
import { spawnSync } from "node:child_process";
import { mkdirSync, readdirSync } from "node:fs";
import { basename, join, resolve } from "node:path";

const here = resolve(import.meta.dirname);
const cache = resolve(here, "../node_modules/.cache/free-tools-tests");
mkdirSync(cache, { recursive: true });

const files = readdirSync(here).filter((f) => /\.test\.(mts|mjs)$/.test(f)).sort();
let failed = 0;
for (const file of files) {
  let entry = join(here, file);
  if (file.endsWith(".mts")) {
    entry = join(cache, basename(file, ".mts") + ".mjs");
    await build({
      entryPoints: [join(here, file)],
      bundle: true,
      platform: "node",
      format: "esm",
      packages: "external",
      jsx: "automatic",
      // Vite provides import.meta.env in the app; in a plain Node test it is an empty object.
      define: { "import.meta.env": "{}" },
      logLevel: "warning",
      outfile: entry,
    });
  }
  const started = Date.now();
  const run = spawnSync(process.execPath, [entry], { cwd: resolve(here, ".."), encoding: "utf8" });
  const seconds = ((Date.now() - started) / 1000).toFixed(1);
  if (run.status === 0) console.log(`PASS ${file} (${seconds}s)${run.stdout.trim() ? "\n" + indent(run.stdout.trim().split("\n").slice(-2).join("\n")) : ""}`);
  else {
    failed++;
    console.log(`FAIL ${file} (${seconds}s)\n${indent((run.stdout + run.stderr).trim())}`);
  }
}
console.log(`\n${files.length - failed} of ${files.length} test files passed`);
process.exit(failed ? 1 : 0);

function indent(text) {
  return text.split("\n").map((l) => "     " + l).join("\n");
}
