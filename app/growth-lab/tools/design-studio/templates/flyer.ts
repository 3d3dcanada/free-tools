import { Bath, BedDouble } from "lucide";
import { table } from "../../deck-studio/model";
import { T, box, code, copy, disp, head, ico, icoNode, kick, mono, pat, photo, S, type Template } from "./kit";

/*
 * Flyers: Letter, A4, A5 and half letter (portrait, 1.29 to 1.55 tall).
 * One unit is a hundredth of the page width, so type wraps the same at every
 * size; blocks hold to the top or the bottom and the photo takes whatever
 * height a taller sheet adds. Every photo frame sits on a designed block, so
 * the flyer is finished before a photo goes in.
 */

const g = (w: number, h: number) => {
  const u = w / 100;
  return { u, H: h / u, U: (n: number) => n * u };
};
const WHITE_QR = { color: "#111111", bg: "#ffffff", slot: "qr" };

export const FLYERS: Template[] = [
  {
    id: "night-market",
    name: "Night Market",
    theme: "neon-night",
    pages: [
      (w, h) => {
        const { H, U } = g(w, h);
        const ph = H * 0.5;
        return {
          els: [
            box(0, 0, w, U(ph), "theme:surface"),
            pat(0, 0, w, U(ph), "halftone", U(2.4), { opacity: 0.5 }),
            photo(0, 0, w, U(ph)),
            box(U(7), U(ph - 11), U(25), U(27), "theme:accent", { slot: "dateblock" }),
            T(U(7), U(ph - 9.5), U(25), U(17), "14", disp(U(15), { align: "center", color: "theme:on-accent", lineHeight: 1, slot: "day" })),
            T(U(7), U(ph + 7), U(25), U(4), "Nov · Sat", kick(U(2.5), { align: "center", color: "theme:on-accent", slot: "month" })),
            T(U(37), U(ph + 2.2), U(56), U(4), "6 pm to 11 pm · Free entry", kick(U(2.3), { slot: "kicker" })),
            T(U(37), U(ph + 6.5), U(58), U(25), "Harbour Night Market", disp(U(8.6), { slot: "title" })),
            T(U(7), U(ph + 33), U(62), U(14), "Street food, live music and stalls full of things made by hand, right on the water.", copy(U(3), { slot: "body" })),
            box(U(7), U(H - 16), U(86), U(0.25), "theme:line"),
            ico(U(7), U(H - 11.6), U(3.4), "map-pin"),
            T(U(11.6), U(H - 11.8), U(37), U(4), "Pier 3, on the waterfront", mono(U(2.2), { slot: "place" })),
            ico(U(50), U(H - 11.6), U(3.4), "music"),
            T(U(54.6), U(H - 11.8), U(23), U(4), "Bands from 7 pm", mono(U(2.2), { slot: "time" })),
            code(U(80), U(H - 21), U(13), "https://example.com", WHITE_QR),
          ],
        };
      },
    ],
  },
  {
    id: "swiss-workshop",
    name: "Swiss Grid",
    theme: "studio",
    pages: [
      (w, h) => {
        const { H, U } = g(w, h);
        const top = 55,
          foot = 33,
          ph = H - top - foot;
        return {
          els: [
            T(U(7), U(6.5), U(45), U(3), "Community Workshop", kick(U(2.1), { color: "theme:ink", slot: "kicker" })),
            T(U(52), U(6.5), U(41), U(3), "No. 04 · Autumn", kick(U(2.1), { color: "theme:muted", align: "right", slot: "tag" })),
            box(U(7), U(10.5), U(86), U(0.7), "theme:ink"),
            T(U(7), U(14), U(86), U(38), "Make Something Together", disp(U(12.4), { slot: "title" })),
            box(U(7), U(top), U(86), U(ph), "theme:surface"),
            pat(U(7), U(top), U(86), U(ph), "dots", U(2.2), { fill: "theme:line", opacity: 1 }),
            photo(U(7), U(top), U(86), U(ph)),
            S(U(71), U(top - 8), U(21), U(21), "ellipse", { fill: "theme:accent", slot: "badge" }),
            T(U(71), U(top - 1.6), U(21), U(6), "Free", disp(U(5.6), { align: "center", color: "theme:on-accent", slot: "offer" })),
            T(U(71), U(top + 4.6), U(21), U(3), "All ages", kick(U(1.7), { align: "center", color: "theme:on-accent", slot: "note" })),
            box(U(7), U(H - foot + 4), U(86), U(0.35), "theme:ink"),
            T(U(7), U(H - foot + 7), U(26), U(3), "When", kick(U(1.8), { color: "theme:muted" })),
            T(U(7), U(H - foot + 10.5), U(27), U(9), "Sat, Nov 14\n1 pm to 4 pm", head(U(3.1), { slot: "date" })),
            T(U(36.5), U(H - foot + 7), U(26), U(3), "Where", kick(U(1.8), { color: "theme:muted" })),
            T(U(36.5), U(H - foot + 10.5), U(27), U(9), "Northside Library\nRoom B", head(U(3.1), { slot: "place" })),
            T(U(66), U(H - foot + 7), U(26), U(3), "Bring", kick(U(1.8), { color: "theme:muted" })),
            T(U(66), U(H - foot + 10.5), U(27), U(9), "Curiosity. We supply the rest.", head(U(3.1), { slot: "body" })),
            box(U(7), U(H - 8.6), U(2.4), U(2.4), "theme:accent"),
            T(U(11), U(H - 9), U(70), U(3), "Sign up at example.com/workshop", mono(U(2.1), { slot: "cta" })),
          ],
        };
      },
    ],
  },
  {
    id: "grand-opening",
    name: "Grand Opening",
    theme: "sunrise",
    pages: [
      (w, h) => {
        const { H, U } = g(w, h);
        const ah = H * 0.47;
        return {
          els: [
            pat(0, 0, w, U(ah + 14), "rays", 0, { fill: "theme:accent3", opacity: 0.16 }),
            S(U(28), U(11), U(52), U(ah), "arch", { fill: "theme:accent3" }),
            photo(U(24), U(7), U(52), U(ah), "photo", { mask: "arch" }),
            S(U(69), U(ah - 3), U(22), U(22), "star", { fill: "theme:accent2", rot: 12, slot: "badge" }),
            T(U(69), U(ah + 4.4), U(22), U(8), "Free\ncoffee", disp(U(3.6), { align: "center", color: "theme:on-accent2", lineHeight: 0.95, rot: 12, slot: "offer" })),
            T(U(7), U(ah + 13), U(86), U(3.5), "Northside Bakery", kick(U(2.4), { align: "center", slot: "kicker" })),
            T(U(7), U(ah + 18), U(86), U(26), "Grand Opening", disp(U(13), { align: "center", upper: true, slot: "title" })),
            T(U(14), U(ah + 44), U(72), U(10), "Fresh bread from 7 am, coffee on us all morning, and a first look at the new shop.", copy(U(3), { align: "center", slot: "body" })),
            box(U(7), U(H - 15), U(86), U(9), "theme:ink", { slot: "band" }),
            T(U(7), U(H - 15), U(86), U(9), "Saturday, Nov 14 · 7 am · 210 Queen Street", mono(U(2.4), { align: "center", valign: "middle", color: "theme:bg", weight: 600, slot: "details" })),
          ],
        };
      },
    ],
  },
  {
    id: "season-sale",
    name: "Season Sale",
    theme: "ember",
    pages: [
      (w, h) => {
        const { H, U } = g(w, h);
        return {
          els: [
            pat(0, 0, w, U(H * 0.45), "confetti", U(4.5), { fill: "theme:accent2", opacity: 0.55, strokeW: U(0.5) }),
            box(U(-10), U(15), U(120), U(17), "theme:accent", { rot: -7, slot: "band" }),
            T(U(-2), U(15), U(104), U(17), "Season Sale", disp(U(9), { align: "center", valign: "middle", color: "theme:on-accent", rot: -7, upper: true, tracking: 0.02, slot: "kicker" })),
            T(U(7), U(33), U(86), U(45), "30%", disp(U(38), { color: "theme:accent2", tracking: -0.06, slot: "offer" })),
            T(U(7), U(72), U(60), U(10), "off everything in store", head(U(5), { slot: "title" })),
            T(U(7), U(85), U(48), U(25), "Winter coats\nBoots and gloves\nWool blankets\nGifts under $25", copy(U(3.1), { list: "check", color: "theme:ink", lineHeight: 1.45, slot: "list" })),
            box(U(58), U(84), U(35), U(H - 104), "theme:surface"),
            pat(U(58), U(84), U(35), U(H - 104), "lines", U(2.4), { fill: "theme:accent", opacity: 0.4, strokeW: U(0.25) }),
            photo(U(58), U(84), U(35), U(H - 104), "photo", { radius: U(1) }),
            box(U(7), U(H - 14), U(86), U(0.3), "theme:line"),
            T(U(7), U(H - 10.5), U(55), U(4), "Nov 20 to Nov 30 · In store and online", mono(U(2.2), { slot: "date" })),
            T(U(62), U(H - 10.5), U(31), U(4), "example.com", mono(U(2.2), { align: "right", color: "theme:accent", weight: 700, slot: "url" })),
          ],
        };
      },
    ],
  },
  {
    id: "class-schedule",
    name: "Class Schedule",
    theme: "forest",
    pages: [
      (w, h) => {
        const { H, U } = g(w, h);
        const ph = H * 0.3;
        return {
          els: [
            box(0, 0, w, U(ph), "theme:accent2"),
            pat(0, 0, w, U(ph), "topo", U(4), { fill: "#ffffff", opacity: 0.28, strokeW: U(0.18) }),
            photo(0, 0, w, U(ph)),
            S(U(72), U(ph - 9), U(18), U(18), "ellipse", { fill: "theme:accent3", slot: "badge" }),
            T(U(72), U(ph - 4.5), U(18), U(9), "First class free", kick(U(1.9), { align: "center", valign: "middle", color: "theme:on-accent3", lineHeight: 1.25, slot: "offer" })),
            T(U(7), U(ph + 7), U(60), U(3.5), "Riverside Studio · Spring", kick(U(2.2), { slot: "kicker" })),
            T(U(7), U(ph + 11.5), U(64), U(22), "Yoga for Every Body", disp(U(9.4), { slot: "title" })),
            T(U(7), U(ph + 32.5), U(80), U(10), "Beginner friendly classes in a bright, quiet room. Mats provided.", copy(U(3), { slot: "body" })),
            table(U(7), U(ph + 44), U(86), U(30), [["Day", "Time", "Class"], ["Monday", "6:00 pm", "Gentle Flow"], ["Wednesday", "6:00 pm", "Strength and Balance"], ["Saturday", "9:30 am", "Morning Stretch"]], { size: U(2.4), accent: "theme:accent", stripe: true, slot: "schedule" }),
            box(U(7), U(H - 14), U(86), U(0.3), "theme:line"),
            T(U(7), U(H - 10.5), U(50), U(4), "$12 a class · 10 for $100", head(U(2.8), { slot: "price" })),
            T(U(55), U(H - 10.3), U(38), U(4), "example.com/classes", mono(U(2.2), { align: "right", slot: "url" })),
          ],
        };
      },
    ],
  },
  {
    id: "now-hiring",
    name: "Now Hiring",
    theme: "slate",
    pages: [
      (w, h) => {
        const { H, U } = g(w, h);
        const roles: [string, string][] = [
          ["Line Cook", "Full time"],
          ["Server", "Part time"],
          ["Dishwasher", "Evenings"],
        ];
        const r0 = H - 66;
        return {
          els: [
            box(U(58), U(7), U(35), U(34), "theme:accent2", { radius: U(1.2) }),
            pat(U(58), U(7), U(35), U(34), "plus", U(3), { fill: "#ffffff", opacity: 0.5, strokeW: U(0.3) }),
            photo(U(58), U(7), U(35), U(34), "photo", { radius: U(1.2) }),
            T(U(7), U(8), U(46), U(3.5), "Harbour Kitchen", kick(U(2.2), { slot: "kicker" })),
            T(U(7), U(13), U(49), U(30), "We're hiring.", disp(U(10.5), { slot: "title" })),
            T(U(7), U(46), U(80), U(12), "Join a small kitchen that cooks everything from scratch. Fair pay, real training and shared tips.", copy(U(3.1), { slot: "body" })),
            ...roles.flatMap(([role, kind], i) => [
              box(U(7), U(r0 + i * 10), U(86), U(0.3), "theme:line"),
              T(U(7), U(r0 + 2.4 + i * 10), U(54), U(5), role, head(U(4), { slot: `role${i}` })),
              T(U(58), U(r0 + 3.4 + i * 10), U(35), U(4), kind, kick(U(2), { align: "right", color: "theme:muted", slot: `type${i}` })),
            ]),
            box(U(7), U(H - 32), U(86), U(25), "theme:ink", { radius: U(1.2), slot: "applybox" }),
            T(U(11), U(H - 28), U(60), U(3.5), "How to apply", kick(U(2), { color: "theme:accent2" })),
            T(U(11), U(H - 23.5), U(58), U(14), "Send a few lines about you to jobs@example.com or drop by after 2 pm.", head(U(3.3), { color: "theme:bg", lineHeight: 1.25, slot: "cta" })),
            code(U(75), U(H - 29), U(15), "https://example.com", WHITE_QR),
          ],
        };
      },
    ],
  },
  {
    id: "autumn-menu",
    name: "Autumn Menu",
    theme: "noir",
    pages: [
      (w, h) => {
        const { H, U } = g(w, h);
        const s1 = 42,
          s2 = H * 0.5 + 22;
        const items = (y: number, names: string, prices: string, slot: string) => [
          T(U(14), y, U(58), U(18), names, head(U(3.2), { weight: 500, lineHeight: 1.75, slot })),
          T(U(72), y, U(14), U(18), prices, head(U(3.2), { weight: 500, lineHeight: 1.75, align: "right", color: "theme:accent", slot: slot + "p" })),
        ];
        return {
          els: [
            S(U(36), U(6), U(28), U(28), "ring", { fill: "theme:accent", radius: U(0.6) }),
            photo(U(38), U(8), U(24), U(24), "photo", { mask: "circle" }),
            T(U(7), U(s1 - 7), U(86), U(4), "The Copper Pot", kick(U(2.4), { align: "center", slot: "kicker" })),
            T(U(7), U(s1 - 2.5), U(86), U(12), "Autumn Menu", disp(U(10), { align: "center", weight: 300, tracking: -0.02, slot: "title" })),
            S(U(48.5), U(s1 + 12), U(3), U(3), "diamond", { fill: "theme:accent" }),
            box(U(14), U(s1 + 13.4), U(32), U(0.2), "theme:accent"),
            box(U(54), U(s1 + 13.4), U(32), U(0.2), "theme:accent"),
            T(U(14), U(s1 + 19), U(72), U(4), "Starters", kick(U(2.2), { slot: "sec1" })),
            ...items(U(s1 + 24), "Roasted squash soup\nBeet and goat cheese salad\nCrispy fried mushrooms", "9\n12\n11", "list1"),
            T(U(14), U(s2), U(72), U(4), "Mains", kick(U(2.2), { slot: "sec2" })),
            ...items(U(s2 + 5), "Braised short rib\nWild mushroom risotto\nPan-seared trout", "28\n22\n26", "list2"),
            box(U(14), U(H - 15), U(72), U(0.2), "theme:line"),
            T(U(7), U(H - 11), U(86), U(4), "Kitchen open 5 pm to 10 pm · 12 Harbour Lane", mono(U(2.1), { align: "center", color: "theme:muted", slot: "details" })),
          ],
        };
      },
    ],
  },
  {
    id: "lost-pet",
    name: "Lost Pet",
    theme: "studio",
    pages: [
      (w, h) => {
        const { H, U } = g(w, h);
        const ph = H * 0.36,
          strips = 6;
        // The band grows on A5 and half letter so the title keeps the 1/4 in safe line.
        const band = Math.max(U(17), 36 + U(11));
        return {
          els: [
            box(0, 0, w, band, "theme:accent3", { slot: "band" }),
            T(18, 18, w - 36, band - 36, "Lost Cat", disp(U(11), { align: "center", valign: "middle", color: "theme:on-accent3", upper: true, slot: "title" })),
            box(U(7), U(23), U(86), U(ph), "theme:surface"),
            pat(U(7), U(23), U(86), U(ph), "dots", U(2.4), { fill: "theme:line", opacity: 1 }),
            photo(U(7), U(23), U(86), U(ph), "photo", { radius: U(1) }),
            T(U(7), U(ph + 27), U(86), U(9), "Have you seen Max?", disp(U(7.6), { align: "center", slot: "sub" })),
            T(U(12), U(ph + 37), U(76), U(12), "Grey tabby with green eyes and white socks. Very friendly. Last seen near Elm Street on Nov 3.", copy(U(3), { align: "center", color: "theme:ink", slot: "body" })),
            T(U(7), U(ph + 50), U(86), U(4), "Reward for his safe return", kick(U(2.2), { align: "center", color: "theme:accent3", slot: "offer" })),
            T(U(7), U(ph + 55), U(86), U(7), "Call or text 506 555 0100", head(U(4.8), { align: "center", weight: 850, slot: "contact" })),
            box(0, U(H - 19), w, U(0.3), "theme:ink", { slot: "cut" }),
            ...Array.from({ length: strips - 1 }, (_, i) => box(U(((i + 1) * 100) / strips), U(H - 19), U(0.2), U(19), "theme:line")),
            ...Array.from({ length: strips }, (_, i) =>
              T(U((i * 100) / strips + 100 / strips / 2 - 8.5), U(H - 10.4 - 1.6), U(17), U(3.2), "Max · 506 555 0100", mono(U(1.45), { align: "center", rot: -90, weight: 600, slot: `strip${i}` })),
            ),
          ],
        };
      },
    ],
  },
  {
    id: "open-house",
    name: "Open House",
    theme: "ocean",
    pages: [
      (w, h) => {
        const { H, U } = g(w, h);
        const ph = H * 0.48;
        return {
          els: [
            box(0, 0, w, U(ph), "theme:surface"),
            pat(0, 0, w, U(ph), "grid", U(5), { fill: "theme:line", opacity: 1, strokeW: U(0.15) }),
            photo(0, 0, w, U(ph)),
            box(U(7), U(ph - 9), U(38), U(17), "theme:accent", { slot: "pricebox" }),
            T(U(10), U(ph - 6.8), U(34), U(3), "Asking", kick(U(1.8), { color: "theme:on-accent", slot: "pricelabel" })),
            T(U(10), U(ph - 3), U(34), U(9), "$489,000", disp(U(6.6), { color: "theme:on-accent", slot: "price" })),
            T(U(50), U(ph + 2), U(43), U(4), "Open Sunday 1 to 4 pm", kick(U(2.1), { slot: "kicker" })),
            T(U(7), U(ph + 12), U(86), U(10), "42 Maple Crescent", disp(U(7), { slot: "title" })),
            T(U(7), U(ph + 22), U(80), U(10), "A bright family home on a quiet crescent, steps from the park and the school.", copy(U(3), { slot: "body" })),
            icoNode(U(7), U(ph + 35), U(4.5), "bed-double", BedDouble),
            T(U(13), U(ph + 35.4), U(20), U(4), "3 bedrooms", mono(U(2.3), { slot: "f1" })),
            icoNode(U(36), U(ph + 35), U(4.5), "bath", Bath),
            T(U(42), U(ph + 35.4), U(20), U(4), "2 baths", mono(U(2.3), { slot: "f2" })),
            ico(U(63), U(ph + 35), U(4.5), "ruler"),
            T(U(69), U(ph + 35.4), U(24), U(4), "1,850 sq ft", mono(U(2.3), { slot: "f3" })),
            box(U(7), U(H - 19), U(86), U(0.3), "theme:line"),
            T(U(7), U(H - 15), U(50), U(5), "Jordan Lee", head(U(3.6), { slot: "who" })),
            T(U(7), U(H - 10), U(60), U(4), "Realtor · 506 555 0100", mono(U(2.2), { color: "theme:muted", slot: "contact" })),
            code(U(80), U(H - 17.5), U(13), "https://example.com", WHITE_QR),
          ],
        };
      },
    ],
  },
  {
    id: "fundraiser",
    name: "Fundraiser",
    theme: "mint",
    pages: [
      (w, h) => {
        const { H, U } = g(w, h);
        const y0 = H * 0.5;
        return {
          els: [
            S(U(-18), U(-14), U(80), U(80), "ellipse", { fill: "theme:accent", opacity: 0.16 }),
            S(U(9), U(9), U(46), U(46), "ring", { fill: "theme:accent", radius: U(1) }),
            photo(U(11), U(11), U(42), U(42), "photo", { mask: "circle" }),
            pat(U(60), U(9), U(33), U(33), "dots", U(2.6), { fill: "theme:accent2", opacity: 0.7 }),
            T(U(60), U(45), U(33), U(4), "Community Fund", kick(U(2.1), { slot: "kicker" })),
            T(U(7), U(y0), U(86), U(22), "Help us build the new playground", disp(U(8.4), { slot: "title" })),
            T(U(7), U(y0 + 22), U(80), U(9), "Every dollar goes to equipment, safe surfacing and benches for parents.", copy(U(3), { slot: "body" })),
            box(U(7), U(y0 + 34), U(86), U(2.4), "theme:line", { radius: U(1.2) }),
            box(U(7), U(y0 + 34), U(86 * 0.64), U(2.4), "theme:accent", { radius: U(1.2), slot: "progress" }),
            T(U(7), U(y0 + 38.5), U(60), U(4), "$3,200 raised of $5,000", head(U(3), { slot: "raised" })),
            ico(U(7), U(H - 21), U(4), "gift"),
            T(U(7), U(H - 15.5), U(26), U(8), "Give online\nany amount", mono(U(2.1), { lineHeight: 1.4, slot: "way1" })),
            ico(U(36.5), U(H - 21), U(4), "calendar"),
            T(U(36.5), U(H - 15.5), U(26), U(8), "Bake sale\nSat, Nov 21", mono(U(2.1), { lineHeight: 1.4, slot: "way2" })),
            code(U(80), U(H - 21.5), U(13), "https://example.com", WHITE_QR),
          ],
        };
      },
    ],
  },
  {
    id: "public-notice",
    name: "Public Notice",
    theme: "blueprint",
    pages: [
      (w, h) => {
        const { H, U } = g(w, h);
        const rows: [string, string][] = [
          ["calendar", "Monday, Nov 16 to Friday, Nov 20"],
          ["clock", "8 am to 5 pm each day"],
          ["map-pin", "Elm Street, from King to Queen"],
          ["zap", "Water may be off for up to two hours"],
        ];
        const r0 = 52;
        return {
          els: [
            pat(0, 0, w, h, "grid", U(4), { fill: "theme:line", opacity: 0.9, strokeW: U(0.12) }),
            box(U(7), U(8), U(30), U(6), "theme:accent2", { slot: "tagbox" }),
            T(U(7), U(8), U(30), U(6), "Public Notice", kick(U(2.2), { align: "center", valign: "middle", color: "theme:on-accent2", slot: "kicker" })),
            T(U(7), U(19), U(86), U(30), "Water main work on Elm Street", disp(U(9.6), { slot: "title" })),
            ...rows.flatMap(([icon, line], i) => [
              box(U(7), U(r0 + i * 11), U(86), U(0.25), "theme:line"),
              ico(U(7), U(r0 + 3 + i * 11), U(4.6), icon, { color: "theme:accent" }),
              T(U(15), U(r0 + 3.2 + i * 11), U(78), U(5), line, head(U(3.4), { weight: 600, slot: `row${i}` })),
            ]),
            T(U(7), U(r0 + 48), U(80), U(14), "Crews will keep one lane open. Thank you for your patience while we replace the old pipe.", copy(U(3), { slot: "body" })),
            box(U(7), U(H - 20), U(86), U(13), "theme:accent2", { slot: "helpbox" }),
            T(U(11), U(H - 20), U(78), U(13), "Questions? Call 506 555 0100", head(U(4.2), { valign: "middle", color: "theme:on-accent2", weight: 850, slot: "contact" })),
          ],
        };
      },
    ],
  },
  {
    id: "public-talk",
    name: "Public Talk",
    theme: "editorial",
    pages: [
      (w, h) => {
        const { H, U } = g(w, h);
        const ph = H - 80;
        return {
          els: [
            T(U(7), U(8), U(50), U(3.5), "Riverside Library Talks", kick(U(2.1), { slot: "kicker" })),
            T(U(60), U(8), U(33), U(3.5), "No. 12", kick(U(2.1), { align: "right", color: "theme:muted", slot: "tag" })),
            box(U(7), U(12.5), U(86), U(0.25), "theme:ink"),
            T(U(7), U(17), U(86), U(36), "On Making Things Slowly", disp(U(11.4), { weight: 300, tracking: -0.035, lineHeight: 0.98, slot: "title" })),
            box(U(7), U(54), U(14), U(0.8), "theme:accent"),
            T(U(7), U(58), U(42), U(30), "An evening about craft, patience and the pleasure of doing one thing well. Questions and tea after the talk.", copy(U(2.9), { color: "theme:ink", slot: "body" })),
            S(U(56), U(58), U(37), U(ph), "arch", { fill: "theme:accent2" }),
            photo(U(56), U(58), U(37), U(ph), "photo", { mask: "arch", filter: "mono" }),
            T(U(7), U(H - 22), U(44), U(4), "Thursday, Nov 19 · 7 pm", head(U(3.1), { slot: "date" })),
            T(U(7), U(H - 17), U(44), U(8), "Main Hall\nFree, all welcome", mono(U(2.1), { color: "theme:muted", lineHeight: 1.5, slot: "place" })),
          ],
        };
      },
    ],
  },
  {
    id: "yard-sale",
    name: "Yard Sale",
    theme: "magenta",
    pages: [
      (w, h) => {
        const { H, U } = g(w, h);
        return {
          els: [
            pat(0, 0, w, U(40), "confetti", U(5), { fill: "theme:accent2", opacity: 0.6, strokeW: U(0.55) }),
            T(U(5), U(9), U(90), U(36), "Yard Sale", disp(U(17.5), { align: "center", rot: -4, slot: "title" })),
            S(U(27), U(45), U(46), U(8), "pill", { fill: "theme:accent", slot: "pill" }),
            T(U(27), U(45), U(46), U(8), "Sat · 8 am to 1 pm", mono(U(2.6), { align: "center", valign: "middle", weight: 700, color: "theme:on-accent", slot: "date" })),
            box(U(7), U(59), U(40), U(H - 89), "theme:accent3", { radius: U(1.4) }),
            pat(U(7), U(59), U(40), U(H - 89), "waves", U(3.4), { fill: "#ffffff", opacity: 0.45, strokeW: U(0.3) }),
            photo(U(7), U(59), U(40), U(H - 89), "photo", { radius: U(1.4) }),
            T(U(53), U(60), U(40), U(4), "Something for everyone", kick(U(2), { slot: "kicker" })),
            T(U(53), U(66), U(40), U(36), "Furniture\nBooks and records\nToys and games\nTools\nKitchen things\nPlants", copy(U(3.2), { list: "bullet", color: "theme:ink", lineHeight: 1.35, slot: "list" })),
            box(U(7), U(H - 24), U(86), U(0.3), "theme:ink"),
            ico(U(7), U(H - 18.5), U(5), "map-pin", { color: "theme:accent" }),
            T(U(14), U(H - 19), U(79), U(7), "88 Birch Road", disp(U(5.6), { slot: "place" })),
            T(U(14), U(H - 11.5), U(70), U(4), "Rain or shine · Cash and e-transfer", mono(U(2.1), { color: "theme:muted", slot: "note" })),
          ],
        };
      },
    ],
  },
];
