/**
 * "Your files stay on your device", as a check and not a sentence.
 *
 * Every place the tools can make a network request is listed below with the reason it is
 * allowed. A new `fetch(`, `XMLHttpRequest`, `sendBeacon`, `WebSocket`, `EventSource` or a worker
 * loaded from anywhere but this build fails the test until a person adds it here and says why.
 */
import assert from "node:assert/strict";
import { existsSync, readdirSync, readFileSync, statSync } from "node:fs";
import { join, relative } from "node:path";

const root = new URL("..", import.meta.url).pathname;
const walk = (dir) =>
  readdirSync(dir).flatMap((n) => {
    const p = join(dir, n);
    return statSync(p).isDirectory() ? walk(p) : [p];
  });
const sources = walk(join(root, "app")).filter((f) => /\.(ts|tsx|mjs|mts)$/.test(f) && !/\.d\.mts$/.test(f));
const read = (f) => readFileSync(f, "utf8");
const rel = (f) => relative(root, f).split("\\").join("/");

// 1. Every fetch( is one of these, and nothing else can open a connection.
const FETCH_ALLOWED = {
  "app/growth-lab/shared/FeedbackForm.tsx": ["fetch(FEEDBACK_ENDPOINT,"], // the optional feedback form; off unless VITE_FEEDBACK_ENDPOINT is set
  "app/growth-lab/port/feedback.ts": ["fetch(FEEDBACK_ENDPOINT,"], // the lesson correction form, same endpoint
  "app/growth-lab/tools/invoice-generator/export.ts": ["fetch(`/pdf-assets/standard_fonts/"], // a font file shipped in public/
  "app/growth-lab/tools/design-studio/export.ts": ["fetch(url"], // a bundled Geist font file, to embed it in an SVG
  "app/growth-lab/tools/deck-studio/export.ts": ["fetch(href"], // this page's own preloaded font, to embed it in an HTML export
};
const found = {};
for (const f of sources) {
  for (const m of read(f).matchAll(/\bfetch\(([^)\n]*)/g)) {
    (found[rel(f)] ??= []).push(("fetch(" + m[1]).replace(/\s+/g, " ").slice(0, 60));
  }
}
for (const [file, calls] of Object.entries(found)) {
  const allowed = FETCH_ALLOWED[file];
  assert.ok(allowed, `unreviewed fetch in ${file}: ${calls.join(", ")}`);
  for (const c of calls) assert.ok(allowed.some((a) => c.startsWith(a)), `unreviewed fetch in ${file}: ${c}`);
}
for (const file of Object.keys(FETCH_ALLOWED)) assert.ok(found[file], `${file} no longer fetches; remove it from the list`);

const BANNED = /\b(XMLHttpRequest|sendBeacon|new WebSocket|new EventSource|importScripts|navigator\.serviceWorker)\b/;
for (const f of sources) assert.ok(!BANNED.test(read(f)), `${rel(f)} opens a connection some other way`);

// 2. Workers come from this build.
for (const f of sources) {
  for (const m of read(f).matchAll(/new Worker\(([^)]*)/g)) {
    assert.ok(/^new URL\("\.\/[\w.-]+", import\.meta\.url\b/.test(m[1].trim()), `${rel(f)}: worker not loaded from this build: ${m[1]}`);
  }
}

// 3. Every public file the code asks for is in public/.
const PREFIXES = ["/pdf-assets/", "/models/", "/academy/diagrams/"];
let assets = 0;
for (const f of sources) {
  for (const m of read(f).matchAll(/["'`](\/(?:pdf-assets|models|academy\/diagrams)\/[^"'`]*)["'`]/g)) {
    const url = m[1].split("${")[0];
    const target = join(root, "public", url);
    assert.ok(existsSync(target), `${rel(f)} asks for ${m[1]} but public${url} is missing`);
    assets++;
  }
}
assert.ok(PREFIXES.length && assets >= 5, `found only ${assets} public asset references`);

// 4. Nothing injects a script except the optional Turnstile widget, and no image or frame
//    source is set to a literal web address.
const SCRIPT_HOSTS = sources.filter((f) => /createElement\(["']script["']\)/.test(read(f))).map(rel);
assert.deepEqual(SCRIPT_HOSTS, ["app/ui/Turnstile.tsx"], "only the optional Turnstile widget may inject a script");
for (const f of sources) assert.ok(!/\.src\s*=\s*["'`]https?:/.test(read(f)), `${rel(f)} sets a source to a literal web address`);

console.log(`network-surface: ${Object.keys(FETCH_ALLOWED).length} reviewed fetch sites, ${assets} asset references, workers local`);
