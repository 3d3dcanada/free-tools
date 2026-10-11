import { toolCatalog, catalogFor } from "./catalog";
import { imageModes } from "./image-toolkit/model";
import { pdfModes } from "./pdf-toolkit/model";
import { printingModes } from "./printing-tools/model";
import { intentFor } from "./intents";
import type { Locale } from "../seo/guide";
export const categories = [
  "All Tools",
  "QR and Contacts",
  "Design",
  "Images",
  "PDF Documents",
  "Business",
  "3D Printing",
];
/** The same accent-insensitive, multi-word search in the hub and tool switcher. */
export function matchesSearch(text: string, query: string) {
  const fold = (s: string) => s.normalize("NFD").replace(/[^\p{L}\p{N}]/gu, "").toLowerCase();
  const value = fold(text);
  return query.trim().split(/\s+/).every((word) => value.includes(fold(word)));
}
export function categoryFor(slug: string) {
  slug = intentFor(slug)?.parent ?? slug;
  if (slug in imageModes) return "Images";
  if (slug in pdfModes) return "PDF Documents";
  if (slug in printingModes) return "3D Printing";
  if (slug === "qr-code") return "QR and Contacts";
  if (slug === "invoice-generator") return "Business";
  return "Design";
}
export const summaries: Record<string, string> = Object.fromEntries(
  toolCatalog.map((t) => [t.slug, t.summary]),
);
export function relatedTools(slug: string, locale: Locale = "en") {
  const toolCatalog = catalogFor(locale);
  return [
    ...toolCatalog.filter((t) => t.slug !== slug && categoryFor(t.slug) === categoryFor(slug)),
    ...toolCatalog.filter((t) => t.slug !== slug && categoryFor(t.slug) !== categoryFor(slug)),
  ].slice(0, 4);
}
