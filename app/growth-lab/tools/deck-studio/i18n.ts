import { useLocale, translate } from "../../shared/locale";

/**
 * The studio's French, registered by ./french from the French routes only (2026-11-11), the
 * same pattern as shared/french: an English visitor's chunk carries no French dictionary.
 * `ui` is the interface, `content` the template text; anything missing falls back to English.
 */
const FR = { ui: {} as Record<string, string>, content: {} as Record<string, string> };
export function addDeckFrench(ui: Record<string, string>, content: Record<string, string>) {
  Object.assign(FR.ui, ui);
  Object.assign(FR.content, content);
}
/** Template text in French, line by line when a block has several. */
export const frContent = (s: string) =>
  FR.content[s] ?? (s.includes("\n") ? s.split("\n").map((l) => FR.content[l] ?? l).join("\n") : s);

export function useDT() {
  const locale = useLocale();
  return (s: string) => dt(s, locale);
}
export const dt = (s: string, locale: "en" | "fr") => (locale === "fr" ? (FR.ui[s] ?? FR.content[s] ?? translate(s, locale)) : s);
