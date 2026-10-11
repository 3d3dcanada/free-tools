/**
 * design studios: the logic that is easy to break without seeing it.
 * Every template builds at every size in English and French with its words
 * inside the print safe line, a resize or a
 * new template keeps your words, photos and additions without duplicating
 * the template's own parts, and a business card's details fill its text and
 * its contact code both ways. Also lists French sample text still missing.
 *
 * Run: npm test (tests/run.mjs bundles and runs every test file).
 */
import assert from "node:assert/strict";
import { STUDIOS, buildDesign, normalizeCard, reflow, templatesOf, type Design, type StudioId } from "../app/growth-lab/tools/design-studio/model";
import { shape, type El } from "../app/growth-lab/tools/deck-studio/model";
import { CONTENT_FR } from "../app/growth-lab/tools/design-studio/content-fr";
import { TEMPLATES, deckFromTemplate } from "../app/growth-lab/tools/deck-studio/layouts";
import { icon, isDeck, RATIOS, type Ratio } from "../app/growth-lab/tools/deck-studio/model";

const PHOTO = "data:image/png;base64,iVBORw0KGgo=";
let checks = 0;
const untranslated = new Set<string>();

// Template diversity must survive export/reload and every supported canvas size.
const designed = TEMPLATES.filter((t) => t.id !== "blank");
assert.ok(designed.length >= 16);
const compositions = new Set(designed.map((t) => JSON.stringify(deckFromTemplate(t).slides[0].els.map((e) => [e.type, e.x, e.y, e.w, e.h]))));
assert.equal(compositions.size, designed.length, "Every designed cover has its own geometry");
for (const t of TEMPLATES) for (const ratio of Object.keys(RATIOS) as Ratio[]) for (const locale of ["en", "fr"] as const) {
  const d = deckFromTemplate(t, ratio, locale);
  assert.ok(isDeck(JSON.parse(JSON.stringify(d))), t.id);
  const { w, h } = RATIOS[ratio];
  for (const e of d.slides[0].els) if (e.type === "text") {
    assert.ok(e.x >= 0 && e.y >= 0 && e.x + e.w <= w + 0.01 && e.y + e.h <= h + 0.01, t.id + ": cover words fit the canvas");
  }
  checks++;
}
assert.ok(templatesOf("card").length >= 16);

for (const studio of Object.keys(STUDIOS) as StudioId[]) {
  const cfg = STUDIOS[studio];
  const templates = templatesOf(studio);
  assert.ok(templates.length >= 12, `${studio}: at least 12 templates`);
  for (const t of templates) if (!CONTENT_FR[t.name]) untranslated.add(`template name: ${t.name}`);
  for (const t of templates)
    for (const f of cfg.formats) {
      const en = buildDesign(studio, t.id, f.id, "en"),
        fr = buildDesign(studio, t.id, f.id, "fr");
      assert.equal(en.slides.length, cfg.faces.length, `${studio}/${t.id}: one page per face`);
      assert.deepEqual(en.size, { w: f.w, h: f.h });
      for (const page of en.slides) {
        const slots = page.els.map((e) => e.slot);
        assert.ok(slots.every(Boolean), `${t.id}: every part has a slot`);
        assert.equal(new Set(slots).size, slots.length, `${t.id}@${f.id}: slots are unique`);
      }
      // A fresh print design never trips its own preflight: every word box sits inside the safe line.
      if (cfg.print)
        for (const page of [...en.slides, ...fr.slides])
          for (const e of page.els) {
            if (e.type !== "text" || !e.text.trim() || e.rot) continue;
            const m = cfg.safe - 0.5;
            assert.ok(e.x >= m && e.y >= m && e.x + e.w <= f.w - m && e.y + e.h <= f.h - m, `${studio}/${t.id}@${f.id}: "${e.text.slice(0, 20)}" sits outside the safe line`);
          }
      en.slides.forEach((p, i) =>
        p.els.forEach((e, j) => {
          const o = fr.slides[i].els[j];
          // Web addresses, handles and words mapped to themselves on purpose (names) stay as they are; prices change ($38 is 38 $).
          if (e.type === "text" && o.type === "text" && !e.bind && e.text === o.text && (/[a-z]{3}/i.test(e.text) || /\$\d/.test(e.text)) && !/^[@\w.:/-]+$/.test(e.text) && CONTENT_FR[e.text] !== e.text)
            untranslated.add(e.text);
        }),
      );
      checks++;
    }
}

// A resize keeps a dropped photo, an edited title and something you added, and duplicates nothing.
for (const studio of ["flyer", "poster", "social"] as StudioId[]) {
  const formats = STUDIOS[studio].formats;
  for (const t of templatesOf(studio)) {
    let d: Design = buildDesign(studio, t.id, formats[0].id, "en");
    const page = d.slides[0];
    const title = page.els.find((e) => e.slot === "title" && e.type === "text");
    const frame = page.els.find((e) => e.type === "image");
    const mine = shape(10, 10, 50, 50, "star");
    d = {
      ...d,
      slides: [
        {
          ...page,
          els: [
            ...page.els.map((e): El => (e === title ? { ...e, text: "My own words" } : e === frame ? { ...e, src: PHOTO } : e)),
            mine,
          ],
        },
      ],
    };
    for (const f of formats.slice(1)) {
      const r = reflow(d, { format: f.id }, "en");
      const fresh = buildDesign(studio, t.id, f.id, "en");
      assert.equal(r.slides[0].els.length, fresh.slides[0].els.length + 1, `${t.id} → ${f.id}: template parts plus yours, nothing doubled`);
      if (title) assert.equal(r.slides[0].els.find((e) => e.slot === "title" && e.type === "text")?.type === "text" && (r.slides[0].els.find((e) => e.slot === "title") as { text: string }).text, "My own words");
      if (frame) assert.equal(r.slides[0].els.find((e) => e.type === "image" && e.slot === frame.slot && e.src === PHOTO)?.type, "image", `${t.id} → ${f.id}: the photo comes along`);
      assert.ok(r.slides[0].els.some((e) => e.type === "shape" && e.shape === "star" && !e.slot), `${t.id} → ${f.id}: your star comes along`);
      d = r;
      checks++;
    }
  }
}

// A new template takes your words and photo into its matching parts and leaves its own design alone.
{
  const [a, b] = templatesOf("flyer");
  let d = buildDesign("flyer", a.id, "letter", "en");
  d = { ...d, slides: d.slides.map((p) => ({ ...p, els: p.els.map((e): El => (e.slot === "title" && e.type === "text" ? { ...e, text: "Spring Fair" } : e.type === "image" ? { ...e, src: PHOTO } : e)) })) };
  const r = reflow(d, { template: b.id }, "en");
  assert.equal(r.template, b.id);
  assert.equal(r.theme, b.theme);
  assert.equal((r.slides[0].els.find((e) => e.slot === "title") as { text: string }).text, "Spring Fair");
  assert.ok(r.slides[0].els.some((e) => e.type === "image" && e.src === PHOTO));
  assert.equal(r.slides[0].els.length, buildDesign("flyer", b.id, "letter", "en").slides[0].els.length);
  checks++;
}

// Business cards: details fill both faces and the vCard; typing into the name updates the details.
{
  for (const t of templatesOf("card")) {
    const d = buildDesign("card", t.id, "us", "en");
    const qr = d.slides[1].els.find((e) => e.type === "qr");
    assert.ok(qr && qr.type === "qr" && qr.value.startsWith("BEGIN:VCARD"), `${t.id}: the back carries the contact code`);
  }
  const d = buildDesign("card", "studio", "us", "en");
  const named = normalizeCard({ ...d, details: { ...d.details!, name: "Sam Lee" } }, d);
  const nameEl = named.slides[0].els.find((e) => e.type === "text" && e.bind === "{name}");
  assert.equal(nameEl?.type === "text" && nameEl.text, "Sam Lee");
  assert.ok((named.slides[1].els.find((e) => e.type === "qr") as { value: string }).value.includes("FN:Sam Lee"));
  const typed: Design = { ...named, slides: named.slides.map((p) => ({ ...p, els: p.els.map((e): El => (e.type === "text" && e.bind === "{name}" ? { ...e, text: "Sam K. Lee" } : e)) })) };
  const back = normalizeCard(typed, named);
  assert.equal(back.details!.name, "Sam K. Lee");
  assert.ok((back.slides[1].els.find((e) => e.type === "qr") as { value: string }).value.includes("FN:Sam K. Lee"));
  const block: Design = { ...back, slides: back.slides.map((p) => ({ ...p, els: p.els.map((e): El => (e.type === "text" && e.bind?.includes("\n") ? { ...e, text: "Call me" } : e)) })) };
  const freed = normalizeCard(block, back);
  assert.ok(freed.slides[0].els.some((e) => e.type === "text" && e.text === "Call me" && !e.bind), "typing into a combined block makes it free text");
  const eu = reflow(freed, { format: "eu" }, "en");
  assert.equal(eu.details!.name, "Sam K. Lee");
  assert.ok(eu.slides[0].els.some((e) => e.type === "text" && e.text === "Call me"), "free text survives a resize");
  checks++;
}

// An imported deck cannot smuggle an event handler in through icon markup.
{
  const d = JSON.parse(JSON.stringify(deckFromTemplate(designed[0])));
  d.slides[0].els.push(JSON.parse(JSON.stringify(icon(10, 10, 40, "dot", '<circle cx="12" cy="12" r="4"/>'))));
  assert.ok(isDeck(d), "a clean icon must still import");
  const last = d.slides[0].els[d.slides[0].els.length - 1];
  last.paths = '<circle cx="12" cy="12" r="4" onmouseover="alert(1)"/>';
  assert.equal(isDeck(d), false, "icon markup with an event handler must be rejected");
  last.paths = '<circle cx="12" cy="12" r="4" ONCLICK="alert(1)"/>';
  assert.equal(isDeck(d), false, "upper-case attribute names must be rejected");
  checks++;
}
console.log(`design studios: ${checks} checks passed`);
if (untranslated.size) {
  console.log(`French missing for ${untranslated.size} sample lines:`);
  for (const s of untranslated) console.log("  " + JSON.stringify(s));
  process.exitCode = 1;
}
