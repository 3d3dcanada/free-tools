import { origin, type Locale } from "./guide";
import { SITE_BASE } from "../../lib/free-tools-host";

// Verified against the site's route configuration on 8 October 2026.
const frenchServices: Record<string, string> = {
  "/3d-printing": "/fr/impression-3d",
  "/quote": "/fr/devis",
  "/software-development": "/fr/logiciels",
  "/website-design": "/fr/sites-web",
  "/nfc-tags": "/fr/etiquettes-nfc",
  "/private-ai": "/fr/ia-privee",
  "/private-ai/setup": "/fr/ia-privee/installation",
  "/punch-clock": "/fr/pointeuse",
};
export function sitePath(path: string, locale: Locale) {
  // Existing English-only services and reference hubs retain their real URL.
  return SITE_BASE + (locale === "fr" ? (frenchServices[path] ?? path) : path);
}

/** The absolute 3D3D address for an href `sitePath` returned (it already is one in the standalone build). */
export const siteAbsolute = (href: string) => (/^https?:\/\//.test(href) ? href : origin + href);
