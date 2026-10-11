import type { Locale } from "../seo/guide";
import { frenchUi as sharedUi } from "./ui.fr";
import { workspaceUi } from "./ui.fr.workspace";
import { completionUi } from "./ui.fr.completion";
import { hubUi } from "./ui.fr.hub";
// 2026-10-09: the image, PDF and 3D workspaces keep their French in their own file.
const frenchUi: Record<string, string> = { ...sharedUi, ...workspaceUi, ...completionUi, ...hubUi };
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
