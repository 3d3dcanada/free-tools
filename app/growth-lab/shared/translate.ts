import type { Locale } from "../seo/guide";
// 2026-11-11: the French strings (about 90 KB) are no longer imported here. This file is in
// every tool page and the academy, so English visitors downloaded the whole dictionary to
// read none of it. Each French route imports ./french first, which fills this table before
// anything renders, on the server and in the browser. A French route without that import
// shows English; scripts/audit/perf-budget.test.mjs fails on one.
const frenchUi: Record<string, string> = {};
export function addFrench(dict: Record<string, string>) {
  Object.assign(frenchUi, dict);
}
export function translate(text: string, locale: Locale): string {
  if (locale === "en") return text;
  if (frenchUi[text]) return frenchUi[text];
  const trimmed = text.trim();
  if (frenchUi[trimmed]) return text.replace(trimmed, frenchUi[trimmed]);
  if (text.endsWith(": ready.")) return translate(text.slice(0, -8), locale) + ": prêt.";
  if (text.startsWith("Download ")) return "Télécharger " + text.slice(9);
  if (text.startsWith("FAIL · ")) return "ÉCHEC · " + translate(text.slice(7), locale);
  // Numbered interface labels keep the index; filenames and user fields are not translated.
  const numbered = /^(.*?)( \d+)$/.exec(text);
  if (numbered && frenchUi[numbered[1]]) return frenchUi[numbered[1]] + numbered[2];
  return text;
}
