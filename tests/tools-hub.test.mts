/**
 * the hub, the homepage band and the menus all draw from one set of tool
 * families and one set of previews. This keeps them honest.
 * Run: npm test (tests/run.mjs bundles and runs every test file).
 */
import assert from "node:assert/strict";
import { renderToStaticMarkup } from "react-dom/server";
import jsQR from "jsqr";
import { catalogs } from "../app/growth-lab/seo/catalog.generated";
import { categoryFor } from "../app/growth-lab/tools/navigation";
import { TOOL_COUNT, TOOL_FAMILIES } from "../app/growth-lab/seo/tool-families";
import ToolPreview, { PREVIEW_SLUGS, QR_PREVIEW } from "../app/growth-lab/shared/ToolPreview";
import { initialTag, payload } from "../app/growth-lab/tools/qr-code/model";
import { translate } from "../app/growth-lab/shared/translate";
import { hubUi } from "../app/growth-lab/shared/ui.fr.hub";

let checks = 0;
const ok = (cond: unknown, msg: string) => {
  checks++;
  assert.ok(cond, msg);
};

// Families: every tool in exactly one family, the same one `categoryFor` picks.
const slugs = catalogs.en.map((t) => t.slug);
ok(slugs.length === 36, `catalogue has 36 tools (found ${slugs.length})`);
ok(TOOL_COUNT === slugs.length, "family counts add up to the catalogue");
const seen = new Map<string, string>();
for (const f of TOOL_FAMILIES) {
  for (const s of f.slugs) {
    ok(!seen.has(s), `${s} is in two families`);
    seen.set(s, f.category);
    ok(categoryFor(s) === f.category, `${s}: family ${f.category} but the hub files it under ${categoryFor(s)}`);
  }
  ok(f.best.length === 3 && f.best.every((b) => f.slugs.includes(b.slug)), `${f.category}: best tools belong to the family`);
}
for (const s of slugs) ok(seen.has(s), `${s} is missing from the families`);

// Previews: one per tool, drawn with no script, no handler and no external reference.
ok(PREVIEW_SLUGS.length === slugs.length && slugs.every((s) => PREVIEW_SLUGS.includes(s)), "every tool has a preview and none is extra");
for (const s of slugs) {
  const html = renderToStaticMarkup(ToolPreview({ slug: s }) as never);
  ok(html.startsWith("<svg"), `${s}: renders an svg`);
  ok(!/<script|<foreignObject|<image|\son[a-z]+=|href=|src=|url\(["']?https?:/i.test(html), `${s}: preview carries nothing active or external`);
  ok(html.length < 9000, `${s}: preview is ${html.length} bytes`);
}

// The QR preview is a real code: paint its path, quiet zone and all, and decode it.
{
  const n = QR_PREVIEW.size,
    scale = 8,
    quiet = 4,
    side = (n + quiet * 2) * scale;
  const px = new Uint8ClampedArray(side * side * 4).fill(255);
  const dark = new Set<string>();
  for (const m of QR_PREVIEW.path.matchAll(/M(\d+) (\d+)h(\d+)v1h-\d+z/g)) {
    const [x, y, w] = [Number(m[1]), Number(m[2]), Number(m[3])];
    for (let i = 0; i < w; i++) dark.add(`${x + i},${y}`);
  }
  for (let y = 0; y < n; y++)
    for (let x = 0; x < n; x++)
      if (dark.has(`${x},${y}`))
        for (let dy = 0; dy < scale; dy++)
          for (let dx = 0; dx < scale; dx++) {
            const o = (((y + quiet) * scale + dy) * side + (x + quiet) * scale + dx) * 4;
            px[o] = px[o + 1] = px[o + 2] = 0;
          }
  const hit = jsQR(px, side, side);
  ok(hit?.data === QR_PREVIEW.text, `QR preview decodes to its text (got ${hit?.data})`);
}

// The data promise: a QR code holds exactly what was typed (trimmed), nothing added.
{
  const typed = "https://example.com/menu?table=4&lang=fr";
  ok(payload({ ...initialTag, kind: "url", value: `  ${typed}  ` }) === typed, "a URL code encodes exactly what was typed");
}

// French for every new string.
for (const [en, fr] of Object.entries(hubUi)) {
  ok(fr.trim() && translate(en, "fr") === fr && fr !== en, `French for "${en.slice(0, 40)}"`);
}

console.log(`tools-hub: ${checks} checks passed`);
