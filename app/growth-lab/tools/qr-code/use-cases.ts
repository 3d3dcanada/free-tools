import { defaultStyle, type Tag } from "./model";
import type { Locale } from "../../seo/guide";
export const useCases = [
  { id: "website", kind: "url", label: "Website Sign" },
  { id: "menu", kind: "url", label: "Menu Sign" },
  { id: "review", kind: "url", label: "Review Link" },
  { id: "wifi", kind: "wifi", label: "Guest Wi-Fi" },
  { id: "contact", kind: "vcard", label: "Contact Card" },
  { id: "event", kind: "event", label: "Event Invitation" },
] as const;
export function qrUseCase(tag: Tag, id: (typeof useCases)[number]["id"], locale: Locale): Tag {
  const fr = locale === "fr";
  const selected = useCases.find(c => c.id === id)!;
  const wording = {
    website: [fr ? "Bienvenue" : "Welcome", fr ? "Découvrez notre site" : "Explore our website"],
    menu: [fr ? "Notre menu" : "Our menu", fr ? "Scannez pour voir le menu" : "Scan to see the menu"],
    review: [fr ? "Votre avis compte" : "Share your experience", fr ? "Scannez pour laisser un avis" : "Scan to leave a review"],
    wifi: [fr ? "Wi-Fi invité" : "Guest Wi-Fi", fr ? "Scannez pour vous connecter" : "Scan to connect"],
    contact: [fr ? "Gardons le contact" : "Let’s stay in touch", fr ? "Enregistrez mes coordonnées" : "Save my contact details"],
    event: [fr ? "Vous êtes invités" : "You’re invited", fr ? "Ajoutez la date à votre calendrier" : "Add the date to your calendar"],
  }[id];
  return { ...tag, kind: selected.kind, label: wording[0], caption: wording[1],
    value: tag.kind === "url" ? tag.value : "https://example.com",
    fields: { ...tag.fields }, style: { ...defaultStyle, frame: true } };
}
