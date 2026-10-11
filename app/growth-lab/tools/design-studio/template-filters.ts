import type { Design } from "./model";
const purposes: Record<string, string[]> = {
  Events: ["night-market", "grand-opening", "public-talk", "summer-sessions", "exhibition", "film-night", "speaker-series", "farmers-market", "tournament", "theatre", "harvest-festival", "open-studio", "event-promo"],
  Offers: ["season-sale", "autumn-menu", "open-house", "yard-sale", "product-launch", "product-spotlight", "weekend-sale"],
  Community: ["lost-pet", "fundraiser", "public-notice", "safety-sign", "now-hiring", "hiring"],
  Education: ["swiss-workshop", "class-schedule", "quick-tip", "big-stat"],
  "Stories & Ideas": ["quote", "type-poster", "announcement", "quote-card", "customer-words", "before-after", "new-post", "podcast", "thumbnail"],
};
export const templatePurposes = ["All Purposes", ...Object.keys(purposes), "Business"];
export const templateLayouts = ["All Layouts", "With Photos", "Without Photos", "With QR Code"];
export const templatePurpose = (id: string) => Object.entries(purposes).find(([, ids]) => ids.includes(id))?.[0] ?? "Business";
export function matchesTemplate(d: Design, purpose: string, layout: string) {
  const els = d.slides.flatMap(s => s.els);
  return (purpose === "All Purposes" || purpose === templatePurpose(d.template)) &&
    (layout === "All Layouts" || (layout === "With Photos" && els.some(e => e.type === "image")) ||
      (layout === "Without Photos" && !els.some(e => e.type === "image")) ||
      (layout === "With QR Code" && els.some(e => e.type === "qr")));
}
