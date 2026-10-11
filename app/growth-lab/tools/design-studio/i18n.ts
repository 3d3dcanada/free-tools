import { useLocale } from "../../shared/locale";
import { dt } from "../deck-studio/i18n";
import type { El } from "../deck-studio/model";
import { CONTENT_FR, UI_FR } from "./content-fr";

/** Studio interface in French; anything missing falls back to Deck Studio's words, then English. */
export function useST() {
  const locale = useLocale();
  return (s: string) => (locale === "fr" ? (UI_FR[s] ?? CONTENT_FR[s] ?? dt(s, "fr")) : s);
}

/** A page size the way each language writes it: "8.5 × 11 in" is "8,5 × 11 po" in French. */
export const sizeNote = (note: string, locale: "en" | "fr") => (locale === "fr" ? note.replace(/(\d)\.(\d)/g, "$1,$2").replace(/ in$/, " po") : note);

/** Template sample text in French, line by line. */
export const tl = (s: string, locale: "en" | "fr") =>
  locale === "en" ? s : (CONTENT_FR[s] ?? s.split("\n").map((l) => CONTENT_FR[l] ?? l).join("\n"));

export function localize(els: El[], locale: "en" | "fr"): El[] {
  if (locale === "en") return els;
  return els.map((e) => {
    if (e.type === "text") return { ...e, text: tl(e.text, locale) };
    if (e.type === "table") return { ...e, rows: e.rows.map((r) => r.map((c) => tl(c, locale))) };
    if (e.type === "chart") return { ...e, labels: e.labels.map((l) => tl(l, locale)), series: e.series.map((x) => ({ ...x, name: tl(x.name, locale) })) };
    return e;
  });
}
