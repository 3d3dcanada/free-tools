import assert from "node:assert/strict";
import { catalogFor } from "../app/growth-lab/tools/catalog";
import { categories, categoryFor, matchesSearch } from "../app/growth-lab/tools/navigation";
import { localizedPath } from "../app/growth-lab/seo/guide";
import { dt } from "../app/growth-lab/tools/deck-studio/i18n";

// People search with accents, spaces, punctuation or an English route name in French.
assert.ok(matchesSearch("Créateur de présentations pitch-deck", "presentation"));
assert.ok(matchesSearch("Wi-Fi QR Code", "wifi qr"));
assert.ok(matchesSearch("Carte de visite business-card", "carte visite"));
assert.ok(matchesSearch("Carte de visite business-card", "business card"));
assert.ok(matchesSearch("Flyer Maker", "   "));
assert.equal(matchesSearch("Resize Image", "image pdf"), false);
assert.equal(matchesSearch("Poster Maker", "invoice"), false);

for (const locale of ["en", "fr"] as const) {
  const catalog = catalogFor(locale);
  assert.equal(new Set(catalog.map((t) => t.slug)).size, catalog.length);
  assert.ok(catalog.length >= 36);
  for (const tool of catalog) {
    assert.ok(categories.slice(1).includes(categoryFor(tool.slug)), tool.slug);
    assert.ok(matchesSearch(`${tool.name} ${tool.slug} ${tool.summary}`, tool.slug));
    assert.ok(localizedPath(`/tools/${tool.slug}`, locale).startsWith(locale === "fr" ? "/fr/tools/" : "/tools/"));
  }
  for (const slug of ["business-card", "flyer-maker", "poster-maker", "social-image-maker", "pitch-deck"]) {
    assert.ok(catalog.some((t) => t.slug === slug), `Design entry point: ${slug}`);
    assert.equal(categoryFor(slug), "Design");
  }
}
for (const text of ["Search templates", "No matching templates.", "Clear Search", "Choose a file format below.", "Download", "Preparing…"]) {
  assert.notEqual(dt(text, "fr"), text, `French editor action: ${text}`);
}
console.log("PASS: tools search, both catalogues, five design entry points and French export actions");
