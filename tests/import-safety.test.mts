/**
 * import safety: every place a visitor can bring a file or a saved draft
 * into a free tool, fed a hostile input. A refused file is the pass condition.
 * Importers covered (accept= in app/growth-lab):
 *   .deck / project JSON (deck studio, design studios, brand, QR, billing, printing, academy),
 *   SVG (image toolkit), batch CSV (QR), STL / OBJ (3MF is run in the browser, see STOP-REPORT),
 *   logo and photo uploads go through a canvas re-encode (`imageFile`), checked by the
 *   data-URL validators below.
 * Run: npm test (tests/run.mjs bundles and runs every test file).
 */
import assert from "node:assert/strict";
import { TEMPLATES, deckFromTemplate } from "../app/growth-lab/tools/deck-studio/layouts";
import { chart, isDeck, qr, shape, table, type Deck, type El } from "../app/growth-lab/tools/deck-studio/model";
import { STUDIOS, buildDesign, isDesign, templatesOf } from "../app/growth-lab/tools/design-studio/model";
import { initialTag, isTag } from "../app/growth-lab/tools/qr-code/model";
import { emptyBrand, isBrand } from "../app/growth-lab/shared/brand";
import { validImage } from "../app/growth-lab/shared/browser";
import { safeSvg } from "../app/growth-lab/tools/image-toolkit/model";
import { parseCsv } from "../app/growth-lab/shared/csv";
import { validProgress } from "../app/growth-lab/academy/progress";
import { importModel } from "../app/growth-lab/tools/printing-tools/import-model";

let checks = 0;
const refused = (ok: boolean, why: string) => {
  checks++;
  assert.equal(ok, false, `accepted a hostile file: ${why}`);
};
const accepted = (ok: boolean, why: string) => {
  checks++;
  assert.equal(ok, true, `refused a clean file: ${why}`);
};
const throws = async (fn: () => unknown, why: string) => {
  checks++;
  await assert.rejects(async () => fn(), undefined, `accepted a hostile file: ${why}`);
};
const clone = <T,>(v: T): T => JSON.parse(JSON.stringify(v));
const HOSTILE = '1" onload="window.__pwn=1" x="';

// ---- .deck files -----------------------------------------------------------
const base = deckFromTemplate(TEMPLATES.find((t) => t.id !== "blank")!);
accepted(isDeck(clone(base)), "a deck written by the studio");
const withEl = (el: El): Deck => {
  const d = clone(base);
  d.slides[0].els.push(clone(el));
  return d;
};
const loose = (el: unknown, patch: Record<string, unknown>) => Object.assign(clone(el as object), patch) as El;

const s = shape(10, 10, 100, 60, "rect");
const c = chart(10, 10, 300, 200, { kind: "column", labels: ["a", "b"], series: [{ name: "s", values: [1, 2] }] });
const t = table(10, 10, 300, 100, [["a", "b"]]);
const q = qr(10, 10, 100, "https://3d3d.ca");
for (const el of [s, c, t, q]) accepted(isDeck(withEl(el)), `a clean ${el.type}`);

refused(isDeck(withEl(loose(s, { strokeW: HOSTILE }))), "stroke width as an attribute break-out");
refused(isDeck(withEl(loose(s, { radius: HOSTILE }))), "radius as an attribute break-out");
refused(isDeck(withEl(loose(s, { angle: "<img src=x onerror=1>" }))), "angle as markup");
refused(isDeck(withEl(loose(s, { shape: '"><script>1</script>' }))), "shape name as markup");
refused(isDeck(withEl(loose(s, { x: Infinity }))), "non-finite position");
refused(isDeck(withEl(loose(s, { anim: "javascript:1" }))), "animation name outside the list");
refused(isDeck(withEl(loose(c, { kind: '"><svg onload=1>' }))), "chart kind as markup");
refused(isDeck(withEl(loose(c, { series: [{ name: "s", values: ['"><img src=x onerror=1>'] }] }))), "chart value as markup");
refused(isDeck(withEl(loose(c, { series: [{ name: "s", values: new Array(500).fill(1) }] }))), "oversized chart series");
refused(isDeck(withEl(loose(c, { labels: [{ toString: 1 }] }))), "chart label that is not text");
refused(isDeck(withEl(loose(t, { rows: [[{ a: 1 }]] }))), "table cell that is not text");
refused(isDeck(withEl(loose(t, { rows: new Array(500).fill(["x"]) }))), "oversized table");
refused(isDeck(withEl(loose(q, { value: "x".repeat(5000) }))), "oversized QR value");
refused(isDeck(withEl(loose(q, { bind: "<b>" }))), "QR bind outside the list");
refused(isDeck(withEl({ ...s, type: "image", src: "data:image/svg+xml;base64,PHN2Zz48L3N2Zz4=" } as unknown as El)), "SVG data image");
refused(isDeck(withEl({ ...s, type: "image", src: "javascript:alert(1)" } as unknown as El)), "javascript: image");
refused(isDeck(withEl({ ...s, type: "icon", name: "x", paths: '<path d="M0 0" onload="1"/>' } as unknown as El)), "icon markup with a handler");
refused(isDeck({ ...clone(base), v: 2 }), "unknown version");
refused(isDeck({ ...clone(base), slides: new Array(300).fill(clone(base).slides[0]) }), "more than 200 slides");
{
  const many = clone(base);
  many.slides[0].els = new Array(400).fill(clone(many.slides[0].els[0] ?? s));
  refused(isDeck(many), "more than 300 elements on one slide");
}
refused(isDeck(JSON.parse('{"__proto__":{"polluted":1},"v":1}')), "prototype key in a bare object");
assert.equal(({} as Record<string, unknown>).polluted, undefined, "JSON.parse must not pollute Object.prototype");

// ---- design studios (cards, flyers, posters, social) ------------------------
const cardT = templatesOf("card")[0];
const card = buildDesign("card", cardT.id, STUDIOS.card.formats[0].id, "en");
accepted(isDesign(clone(card), "card"), "a design written by the card studio");
{
  const d = clone(card);
  d.slides[0].els.push(clone(loose(s, { strokeW: HOSTILE })));
  refused(isDesign(d, "card"), "a design with a hostile stroke width");
}

// ---- QR drafts, brand profiles, logos ---------------------------------------
accepted(isTag(clone(initialTag)), "a QR draft written by the studio");
const tagWith = (style: Record<string, unknown>) => ({ ...clone(initialTag), style: { ...clone(initialTag).style, ...style } });
refused(isTag(tagWith({ logo: "data:image/svg+xml;base64,PHN2Zz48c2NyaXB0Pg==" })), "SVG logo in a QR draft");
refused(isTag(tagWith({ logo: "javascript:alert(1)" })), "javascript: logo in a QR draft");
refused(isTag(tagWith({ foreground: "red;background:url(x)" })), "colour that is a CSS payload");
refused(isTag({ ...clone(initialTag), fields: { __proto__x: "a" } }), "field name outside the form");
refused(isTag({ ...clone(initialTag), value: "x".repeat(2001) }), "oversized QR value");
accepted(isBrand(clone(emptyBrand)), "an empty brand profile");
refused(isBrand({ ...clone(emptyBrand), logo: "data:image/svg+xml;base64,PHN2Zz48L3N2Zz4=" }), "SVG logo in a brand profile");
refused(isBrand({ ...clone(emptyBrand), accent: "url(javascript:1)" }), "brand colour as CSS");
refused(isBrand({ ...clone(emptyBrand), name: "x".repeat(101) }), "oversized brand name");
accepted(validImage("data:image/png;base64,iVBORw0KGgo="), "a PNG data URL");
refused(validImage("data:text/html;base64,PHNjcmlwdD4="), "an HTML data URL");
refused(validImage("data:image/png;base64," + "A".repeat(2_000_001)), "a 2 MB data URL");

// ---- SVG import (image toolkit) ----------------------------------------------
accepted(!!safeSvg('<svg xmlns="http://www.w3.org/2000/svg" width="10" height="10"><rect width="10" height="10"/></svg>'), "a plain SVG");
for (const [why, src] of [
  ["a script element", '<svg xmlns="http://www.w3.org/2000/svg"><script>alert(1)</script></svg>'],
  ["an event handler", '<svg xmlns="http://www.w3.org/2000/svg" onload="alert(1)"></svg>'],
  ["a foreignObject", '<svg xmlns="http://www.w3.org/2000/svg"><foreignObject><div/></foreignObject></svg>'],
  ["an external image", '<svg xmlns="http://www.w3.org/2000/svg"><image href="https://example.com/x.png"/></svg>'],
  ["a javascript: link", '<svg xmlns="http://www.w3.org/2000/svg"><a href="javascript:alert(1)"><rect/></a></svg>'],
  ["a CSS import", '<svg xmlns="http://www.w3.org/2000/svg"><style>@import url(https://example.com/a.css);</style></svg>'],
  ["an entity declaration", '<!DOCTYPE svg [<!ENTITY a "x">]><svg xmlns="http://www.w3.org/2000/svg"/>'],
  ["a 6 MB file", "<svg>" + " ".repeat(6_000_000) + "</svg>"],
  ["text that is not SVG", "<html><body>hi</body></html>"],
] as const) {
  checks++;
  assert.throws(() => safeSvg(src), undefined, `accepted a hostile SVG: ${why}`);
}

// ---- batch CSV and progress files ---------------------------------------------
accepted(parseCsv("name,value\na,https://3d3d.ca\n").length === 1, "a clean CSV");
for (const [why, csv] of [
  ["a __proto__ header", "__proto__,value\na,b\n"],
  ["duplicate headers", "name,name\na,b\n"],
  ["101 rows", "name\n" + Array.from({ length: 101 }, (_, i) => `r${i}`).join("\n") + "\n"],
  ["an unclosed quote", 'name\n"a\n'],
  ["a 3 MB file", "name\n" + "x".repeat(3_000_000)],
  ["ragged rows", "a,b\n1\n"],
] as const) {
  checks++;
  assert.throws(() => parseCsv(csv), undefined, `accepted a hostile CSV: ${why}`);
}
refused(validProgress({ version: 1, courseVersion: -1, lessons: {} }), "progress from another course version");
refused(validProgress({ version: 1, lessons: [] }), "progress with a list instead of a map");
refused(validProgress(JSON.parse('{"version":1,"lessons":{"__proto__":{"x":1}}}')), "progress with a prototype key");

// ---- 3D models (STL and OBJ here; 3MF needs a DOM and is exercised in the browser) ----
const file = (name: string, body: BlobPart) => new File([body], name);
await throws(() => importModel(file("big.stl", new Uint8Array(20_000_001))), "a 20 MB model");
await throws(() => importModel(file("model.exe", "x")), "an unsupported extension");
{
  const header = new Uint8Array(84);
  new DataView(header.buffer).setUint32(80, 150_001, true);
  const body = new Uint8Array(84 + 150_001 * 50);
  body.set(header);
  await throws(() => importModel(file("many.stl", body)), "an STL over 150,000 triangles");
}
await throws(
  () => importModel(file("many.obj", "v 0 0 0\nv 1 0 0\nv 0 1 0\n" + "f 1 2 3\n".repeat(150_001))),
  "an OBJ over 150,000 triangles",
);
await throws(() => importModel(file("empty.obj", "# nothing\n")), "an OBJ with no mesh");
await throws(
  () => importModel(file("nan.obj", "v NaN 0 0\nv 1 0 0\nv 0 1 0\nf 1 2 3\n")),
  "an OBJ with a NaN vertex",
);
await throws(
  () => importModel(file("inf.stl", "solid x\nfacet normal 0 0 1\nouter loop\nvertex 1e999 0 0\nvertex 1 0 0\nvertex 0 1 0\nendloop\nendfacet\nendsolid x\n")),
  "an ASCII STL with an infinite vertex",
);
{
  const ok = await importModel(file("tri.obj", "v 0 0 0\nv 10 0 0\nv 0 10 0\nf 1 2 3\n"));
  accepted(ok.positions.length === 9, "a one-triangle OBJ");
}

console.log(`import-safety: ${checks} checks passed`);
