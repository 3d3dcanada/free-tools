/**
 * an untouched sample follows the page language. A visit in French used
 * to store the French sample under the one draft key, and the English page then
 * opened with French text. Run (local esbuild, no network):
 *   npx esbuild scripts/audit/draft-language.test.mts --bundle --platform=node --format=esm --external:qrcode \
 *     --log-level=warning --outfile=node_modules/.cache/draft-language.test.mjs && node node_modules/.cache/draft-language.test.mjs
 */
import assert from "node:assert/strict";
import { draftIsPristine } from "../app/growth-lab/shared/browser";
import { sampleTag } from "../app/growth-lab/tools/qr-code/model";
import { deckSignature } from "../app/growth-lab/tools/deck-studio/model";
import { buildDesign, STUDIOS, templatesOf, type StudioId } from "../app/growth-lab/tools/design-studio/model";
import { starterDeck } from "../app/growth-lab/tools/deck-studio/layouts";

const wire = <T,>(v: T): T => JSON.parse(JSON.stringify(v));
let checks = 0;

// QR studio: one draft key for both languages.
for (const kind of ["url", "wifi", "vcard"] as const) {
  const en = sampleTag("en", kind),
    fr = sampleTag("fr", kind);
  assert.notDeepEqual(en, fr, `${kind}: the two language samples must differ`);
  // A French visit's stored sample, read by the English page:
  assert.equal(draftIsPristine(wire(fr), en, [en, fr]), true, `${kind}: stored French sample is not a draft`);
  assert.equal(draftIsPristine(wire(en), fr, [fr, en]), true, `${kind}: stored English sample is not a draft`);
  // The old behaviour (no list of other-language samples) kept the French sample:
  assert.equal(draftIsPristine(wire(fr), en, []), false, `${kind}: without the list the French sample would survive`);
  // The visitor's own words are kept, in either language:
  const edited = { ...wire(en), value: "https://example.com/menu" };
  assert.equal(draftIsPristine(edited, en, [en, fr]), false, `${kind}: an edited draft is kept`);
  assert.equal(draftIsPristine({ ...wire(fr), label: "Mon café" }, en, [en, fr]), false, `${kind}: a relabelled French draft is kept`);
  checks += 5;
}

// Deck and design studios: the starter deck is rebuilt with new ids every time.
const studios = Object.keys(STUDIOS) as StudioId[];
const starts: [string, (l: "en" | "fr") => ReturnType<typeof starterDeck>][] = [
  ["deck", starterDeck],
  ...studios.map((s) => [s, (l: "en" | "fr") => buildDesign(s, templatesOf(s)[0].id, STUDIOS[s].formats[0].id, l)] as never),
];
for (const [name, start] of starts) {
  const en = start("en"),
    fr = start("fr");
  assert.equal(deckSignature(start("en")), deckSignature(en), `${name}: two builds of one language compare equal`);
  assert.notEqual(deckSignature(en), deckSignature(fr), `${name}: the two languages differ`);
  const edited = wire(fr);
  edited.slides[0].els.push({ ...edited.slides[0].els[0], id: "mine" });
  assert.notEqual(deckSignature(edited), deckSignature(fr), `${name}: an added element makes it the visitor's work`);
  checks += 3;
}
console.log(`draft-language: ${checks} checks passed`);
