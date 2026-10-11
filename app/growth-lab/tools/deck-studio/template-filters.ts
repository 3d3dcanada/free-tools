import type { Deck } from "./model";
const purposes: Record<string, string> = {
  investor: "Business", proposal: "Business", launch: "Business", quarterly: "Reports", portfolio: "Portfolio",
  workshop: "Education", event: "Events", "case-study": "Reports", editorial: "Reports", blank: "Blank",
  "brand-book": "Portfolio", research: "Education", architecture: "Portfolio", lookbook: "Portfolio",
  manifesto: "Stories & Ideas", roadmap: "Business", geometric: "Portfolio",
};
export const deckPurposes = ["All Purposes", ...new Set(Object.values(purposes))];
export function matchesDeckTemplate(id: string, deck: Deck, purpose: string, layout: string) {
  const photos = deck.slides.some(s => s.els.some(e => e.type === "image"));
  return (purpose === "All Purposes" || purposes[id] === purpose) &&
    (layout === "All Layouts" || (layout === "With Photos" ? photos : !photos));
}
