import { image } from "../../deck-studio/model";
import { T, bound, box, code, copy, disp, head, kick, mono, type Art, type Template } from "./kit";
import { MARK_PNG } from "./seller-mark";

/*
 * Seller designs: 3D3D's own look for independent sellers, shown first when a
 * studio opens with ?seller=<code>. White ground, ink type, the four neons as
 * a stripe, the wave mark as it is. Every QR code in a seller design opens
 * 3D3D's quote form with the seller's code (model.ts), so whatever the seller
 * changes, the customer stays theirs. One unit is a hundredth of the width.
 */

const g = (w: number, h: number) => {
  const u = w / 100;
  return { u, H: h / u, U: (n: number) => n * u };
};
const NEONS = ["#04d9c4", "#ff6a00", "#ff2d92", "#18e36b"];
const WHITE = { kind: "solid", color: "#ffffff" } as Art["bg"];
const QR = { color: "#141717", bg: "#ffffff", slot: "seller-qr" };
const mark = (x: number, y: number, s: number) => image(x, y, s, s, MARK_PNG, { fit: "contain", radius: 0, slot: "mark" });
/** The four-neon stripe, in equal parts. */
const stripe = (x: number, y: number, w: number, h: number) => NEONS.map((c, i) => box(x + (w / 4) * i, y, w / 4, h, c, { slot: `stripe${i}` }));
const lockup = (U: (n: number) => number, x: number, y: number, s: number, ink = "#141717") => [
  mark(U(x), U(y), U(s)),
  T(U(x + s * 1.15), U(y + s * 0.08), U(30), U(s), "3D3D", head(U(s * 0.62), { weight: 900, tracking: -0.04, color: ink, slot: "wordmark" })),
];

/** A full page for one service or all three: title, three lines with a neon bar each, then the code. */
const page = (title: string, body: string, rows: [string, string][]) => (w: number, h: number): Art => {
  const { H, U } = g(w, h);
  return {
    bg: WHITE,
    els: [
      ...lockup(U, 7, 5.5, 7),
      T(U(60), U(7), U(33), U(3), "3d3d.ca", kick(U(2), { color: "#141717", align: "right", slot: "site" })),
      ...stripe(U(7), U(14.5), U(86), U(0.6)),
      T(U(7), U(19), U(86), U(24), title, disp(U(title.length > 24 ? 7.6 : 10.4), { color: "#141717", slot: "title" })),
      T(U(7), U(43), U(80), U(10), body, copy(U(3), { color: "#2a2e2e", slot: "body" })),
      ...rows.flatMap(([t, d], i) => [
        box(U(7), U(56 + i * 14), U(1.1), U(11), NEONS[i % 4], { slot: `bar${i}` }),
        T(U(11), U(56 + i * 14), U(82), U(4.4), t, head(U(3.4), { color: "#141717", slot: `row${i}` })),
        T(U(11), U(61 + i * 14), U(78), U(6), d, copy(U(2.4), { color: "#2a2e2e", slot: `rowtext${i}` })),
      ]),
      box(U(7), U(H - 31), U(86), U(0.2), "#e3e6e6", { slot: "rule" }),
      code(U(7), U(H - 27), U(19), "https://example.com", QR),
      T(U(30), U(H - 26), U(63), U(5), "Scan to tell 3D3D what you need", head(U(3.5), { color: "#141717", slot: "scan" })),
      T(U(30), U(H - 20.5), U(63), U(12), "Scan the code or go to 3d3d.ca/quote. Say what you need in your own words. 3D3D replies with a quote, and asking costs nothing.", copy(U(2.4), { color: "#2a2e2e", slot: "steps" })),
      T(U(7), U(H - 5.5), U(86), U(3), "Your name · independent seller for 3D3D, paid by commission · info@3d3d.ca", mono(U(1.8), { color: "#4a5050", slot: "who" })),
    ],
  };
};
const ALL: [string, string][] = [
  ["3D printing and products", "Replacement parts, brackets, holders, prototypes, small products and runs of many."],
  ["Websites and software", "Business websites, booking and order forms, and tools that save hours of paperwork."],
  ["Private AI systems", "An assistant that knows your own documents and runs on your own computer."],
];
const PRINT: [string, string][] = [
  ["Replacement parts", "Brackets, clips, covers and knobs that are hard to find or discontinued."],
  ["Products and runs of many", "Keychains, signs, holders and small products, from a few to a few hundred."],
  ["3D modelling", "From a sketch, a photo or a broken piece."],
];
const WEB: [string, string][] = [
  ["Business websites", "Fast, clear sites that bring in customers."],
  ["Booking and order forms", "Customers book and order without a phone call."],
  ["Custom tools", "The spreadsheet or paperwork you dread, turned into a simple app."],
];
const AI: [string, string][] = [
  ["Knows your documents", "Ask about your procedures, files and records in plain words."],
  ["Runs on your own computer", "Nothing private leaves the office."],
  ["Set up for you", "3D3D chooses the hardware, sets it up and supports it."],
];
const ALL_TITLE = "Need something made?",
  ALL_BODY = "3D printed parts and products, websites and software, and private AI systems. Made in Fredericton, New Brunswick.";

/** A square, portrait or story post: the title big, one line, the code small. */
const post = (dark: boolean) => (w: number, h: number): Art => {
  const { H, U } = g(w, h);
  const ink = dark ? "#f5f5f5" : "#141717",
    soft = dark ? "#c9cfcf" : "#2a2e2e";
  return {
    bg: dark ? ({ kind: "solid", color: "#0b0d12" } as Art["bg"]) : WHITE,
    els: [
      ...lockup(U, 7, 7, 9, ink),
      ...stripe(U(7), U(19), U(86), U(0.9)),
      T(U(7), U(25), U(86), U(H * 0.34), ALL_TITLE, disp(U(11.5), { color: ink, slot: "title" })),
      T(U(7), U(H * 0.34 + 27), U(86), U(14), "Parts, products, websites and private AI. Made in Fredericton.", copy(U(3.8), { color: soft, slot: "body" })),
      code(U(7), U(H - 25), U(16), "https://example.com", dark ? QR : { ...QR, bg: "#ffffff" }),
      T(U(27), U(H - 23), U(66), U(6), "Scan, or tap the link in my bio", head(U(3.4), { color: ink, slot: "scan" })),
      T(U(27), U(H - 15.5), U(66), U(4), "I sell for 3D3D and earn a commission", mono(U(2.2), { color: soft, slot: "who" })),
    ],
  };
};

const CARD_FRONT = (night: boolean) => (w: number, h: number): Art => {
  const { H, U } = g(w, h);
  const ink = night ? "#f5f5f5" : "#141717";
  return {
    bg: night ? ({ kind: "solid", color: "#0b0d12" } as Art["bg"]) : WHITE,
    els: [
      ...lockup(U, 8, 8, 10, ink),
      bound(U(8), U(24), U(84), U(11), "{name}", head(U(7), { weight: 850, color: ink })),
      bound(U(8), U(35), U(84), U(5), "{role}", mono(U(2.5), { color: night ? "#c9cfcf" : "#4a5050" })),
      ...stripe(0, U(H - 2.6), w, U(2.6)),
    ],
  };
};
const CARD_BACK = (night: boolean) => (w: number, h: number): Art => {
  const { H, U } = g(w, h);
  const ink = night ? "#f5f5f5" : "#141717",
    q = Math.min(29, H - 22);
  return {
    bg: night ? ({ kind: "solid", color: "#0b0d12" } as Art["bg"]) : WHITE,
    els: [
      bound(U(8), U(8), U(52), U(16), "{tagline}", head(U(3.6), { color: ink })),
      bound(U(8), U(H - 22), U(54), U(14), "{phone}\n{email}\n{website}", mono(U(2.3), { lineHeight: 1.6, color: ink })),
      code(U(64), U(7), U(q), "https://example.com", { ...QR, bind: "card" as const, slot: "qr" }),
      T(U(64), U(8 + q), U(q), U(4), "Scan for a quote", kick(U(1.7), { align: "center", color: ink, slot: "scanline" })),
      ...stripe(0, U(H - 2.6), w, U(2.6)),
    ],
  };
};

export const SELLER_CARDS: Template[] = [
  { id: "3d3d-seller", name: "3D3D Seller", theme: "studio", pages: [CARD_FRONT(false), CARD_BACK(false)] },
  { id: "3d3d-seller-night", name: "3D3D Seller Night", theme: "neon-night", pages: [CARD_FRONT(true), CARD_BACK(true)] },
];
export const SELLER_FLYERS: Template[] = [
  { id: "3d3d-everything", name: "3D3D Everything", theme: "studio", pages: [page(ALL_TITLE, ALL_BODY, ALL)] },
  { id: "3d3d-printing", name: "3D3D Printing", theme: "studio", pages: [page("Broken part? New product? We print it.", "Made in Fredericton on solar power, in tough plastics that last.", PRINT)] },
  { id: "3d3d-web", name: "3D3D Websites", theme: "studio", pages: [page("A website or tool that saves you hours.", "Built in Fredericton for local businesses.", WEB)] },
  { id: "3d3d-ai", name: "3D3D Private AI", theme: "studio", pages: [page("Your own AI, inside your office.", "An assistant that knows your business and keeps it private.", AI)] },
];
export const SELLER_POSTERS: Template[] = [{ id: "3d3d-poster", name: "3D3D Poster", theme: "studio", pages: [page(ALL_TITLE, ALL_BODY, ALL)] }];
export const SELLER_SOCIAL: Template[] = [
  { id: "3d3d-post", name: "3D3D Post", theme: "studio", pages: [post(false)] },
  { id: "3d3d-post-night", name: "3D3D Post Night", theme: "neon-night", pages: [post(true)] },
];
