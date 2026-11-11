import { useLocale } from "../shared/locale";
import type * as FrenchReference from "./reference.fr";

/**
 * The academy's French, registered by ./french from the French routes only (2026-11-11), the same
 * pattern as shared/french: an English lesson carries no French dictionary or French glossary.
 */
const FR: { ui: Record<string, string>; ref?: typeof FrenchReference } = { ui: {} };
export function addAcademyFrench(ui: Record<string, string>, ref: typeof FrenchReference) {
  Object.assign(FR.ui, ui);
  FR.ref = ref;
}
/** The French glossary, units and symptoms. Only read on a French page, where ./french has run. */
export const frenchReference = () => FR.ref!;
export function academyText(text: string, locale: "en" | "fr") {
  return locale === "fr" ? (FR.ui[text] ?? text) : text;
}
export function useAcademyT() {
  const locale = useLocale();
  return (text: string) => academyText(text, locale);
}
