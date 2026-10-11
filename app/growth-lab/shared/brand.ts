import { validColour, validImage } from "./browser";

export const brandFields = ["name", "role", "company", "email", "phone", "website", "address", "tagline"] as const;
export const brandLimits = { name: 100, role: 200, company: 100, email: 150, phone: 100, website: 200, address: 200, tagline: 200 };
export type Brand = { version: 1; logo: string; accent: string; ink: string; paper: string } & Record<(typeof brandFields)[number], string>;
export const emptyBrand: Brand = { version: 1, logo: "", accent: "#04d9c4", ink: "#202523", paper: "#f4f1ea",
  name: "", role: "", company: "", email: "", phone: "", website: "", address: "", tagline: "" };
export function isBrand(v: unknown): v is Brand {
  if (!v || typeof v !== "object") return false;
  const b = v as Brand;
  return b.version === 1 && brandFields.every(k => typeof b[k] === "string" && b[k].length <= brandLimits[k]) &&
    validImage(b.logo) && [b.accent, b.ink, b.paper].every(validColour);
}
