import { catalogs } from "../seo/catalog.generated";
import { pageMeta, type Locale } from "../seo/guide";
export const toolCatalog = catalogs.en;
export const catalogFor = (locale: Locale) => catalogs[locale];
export type Tool = (typeof toolCatalog)[number];
export function toolMeta(slug: string, locale: Locale = "en") {
  const tool = catalogFor(locale).find((t) => t.slug === slug);
  if (!tool) throw new Error("Unknown tool metadata.");
  return pageMeta(
    "/tools/" + slug,
    locale,
    tool.title,
    tool.description,
    "/og/tools/" + slug + "." + locale + ".jpg",
  );
}
