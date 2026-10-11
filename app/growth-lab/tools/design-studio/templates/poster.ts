import { HardHat } from "lucide";
import { T, box, code, copy, disp, head, ico, icoNode, kick, mono, pat, photo, S, type Template } from "./kit";

/*
 * Posters: 11 × 17, 18 × 24, 24 × 36, A3 and A2 (portrait, 1.33 to 1.55 tall).
 * Read from across a room: very large type, one strong image or field of
 * colour, and the practical details gathered in one place.
 */

const g = (w: number, h: number) => {
  const u = w / 100;
  return { u, H: h / u, U: (n: number) => n * u };
};
const WHITE_QR = { color: "#111111", bg: "#ffffff", slot: "qr" };

export const POSTERS: Template[] = [
  {
    id: "summer-sessions",
    name: "Summer Sessions",
    theme: "ember",
    pages: [
      (w, h) => {
        const { H, U } = g(w, h);
        const ph = H * 0.56;
        // The 1/2 in safe line in page units: the date band grows with it on the smaller posters.
        const s = 3600 / w,
          bh = 2 * s + 5.5;
        return {
          els: [
            box(0, 0, w, U(ph), "theme:surface"),
            pat(0, 0, w, U(ph), "rays", 0, { opacity: 0.22 }),
            photo(0, 0, w, U(ph)),
            S(U(-2), U(ph - 7), U(104), U(14), "wave", { fill: "theme:bg" }),
            T(U(6), U(ph + 2), U(88), U(33), "Summer Sessions", disp(U(15.5), { upper: true, slot: "title" })),
            T(U(6), U(ph + 33), U(55), U(12), "An open-air evening of live music by the river.", copy(U(3.3), { slot: "sub" })),
            T(U(64), U(ph + 33.5), U(30), U(14), "Headliner\nSpecial Guest\nLocal Openers", head(U(2.9), { align: "right", lineHeight: 1.3, slot: "list" })),
            box(0, U(H - bh), w, U(bh), "theme:accent", { slot: "band" }),
            T(U(6), U(H - s - 5), U(52), U(4.5), "Fri · Aug 21 · 7 pm", kick(U(2.7), { color: "theme:on-accent", tracking: 0.14, slot: "date" })),
            T(U(52), U(H - s - 5), U(42), U(4.5), "Riverside Park", kick(U(2.7), { color: "theme:on-accent", align: "right", tracking: 0.14, slot: "place" })),
            code(U(80), U(ph - 26), U(14), "https://example.com", WHITE_QR),
            T(U(52), U(ph - 14.5), U(26), U(6), "Tickets", mono(U(2.2), { align: "right", color: "#ffffff", weight: 700, slot: "cta" })),
          ],
        };
      },
    ],
  },
  {
    id: "exhibition",
    name: "Exhibition",
    theme: "studio",
    pages: [
      (w, h) => {
        const { H, U } = g(w, h);
        const c = Math.min(74, H - 74);
        return {
          els: [
            T(U(6), U(5), U(50), U(3), "Northside Gallery", kick(U(2), { color: "theme:ink", slot: "kicker" })),
            T(U(50), U(5), U(44), U(3), "Exhibition", kick(U(2), { align: "right", color: "theme:muted", slot: "tag" })),
            box(U(6), U(9), U(88), U(0.4), "theme:ink"),
            T(U(6), U(12), U(88), U(32), "Objects of Use", disp(U(15.5), { slot: "title" })),
            S(U(30), U(46), U(c), U(c), "ellipse", { fill: "theme:accent" }),
            photo(U(22), U(42), U(c), U(c), "photo", { mask: "circle", filter: "mono" }),
            T(U(6), U(H - 26), U(60), U(9), "Nov 6 to Dec 20", disp(U(7), { weight: 300, tracking: -0.03, slot: "date" })),
            T(U(6), U(H - 16), U(60), U(9), "Opening night Friday, Nov 6, 6 pm\n14 Mill Street · Free", mono(U(1.9), { color: "theme:muted", lineHeight: 1.55, slot: "details" })),
            T(U(66), U(H - 16), U(28), U(9), "Tue to Sun\n11 am to 5 pm", mono(U(1.9), { align: "right", color: "theme:muted", lineHeight: 1.55, slot: "hours" })),
          ],
        };
      },
    ],
  },
  {
    id: "film-night",
    name: "Film Night",
    theme: "noir",
    pages: [
      (w, h) => {
        const { H, U } = g(w, h);
        const fy = H * 0.3,
          fh = 56;
        return {
          els: [
            T(U(6), U(8), U(88), U(3.5), "Free outdoor screening", kick(U(2.2), { align: "center", slot: "kicker" })),
            T(U(6), U(13), U(88), U(fy - 15), "Cinema Under the Stars", disp(U(9.6), { align: "center", weight: 200, tracking: -0.02, lineHeight: 1, slot: "title" })),
            box(0, U(fy), w, U(fh), "theme:surface"),
            pat(0, U(fy), w, U(fh), "lines", U(2.2), { fill: "theme:accent", opacity: 0.3, strokeW: U(0.15) }),
            photo(0, U(fy), w, U(fh)),
            box(0, U(fy - 1.2), w, U(0.5), "theme:accent"),
            box(0, U(fy + fh + 0.7), w, U(0.5), "theme:accent"),
            T(U(6), U(fy + fh + 6), U(88), U(8), "Friday, Sept 11 · Dusk", head(U(5), { align: "center", weight: 300, slot: "date" })),
            T(U(6), U(fy + fh + 14), U(88), U(4), "Commons Green · Bring a blanket", kick(U(2.1), { align: "center", color: "theme:muted", slot: "place" })),
            box(U(28), U(H - 16), U(44), U(0.25), "theme:line"),
            T(U(10), U(H - 13), U(80), U(8), "Popcorn on sale · Family film at 7 pm · Feature at 9 pm · Free entry for everyone", mono(U(1.6), { align: "center", color: "theme:muted", lineHeight: 1.6, tracking: 0.12, upper: true, slot: "credits" })),
          ],
        };
      },
    ],
  },
  {
    id: "speaker-series",
    name: "Speaker Series",
    theme: "blueprint",
    pages: [
      (w, h) => {
        const { H, U } = g(w, h);
        return {
          els: [
            pat(0, 0, w, h, "grid", U(5), { fill: "theme:line", opacity: 0.9, strokeW: U(0.1) }),
            T(U(6), U(6), U(60), U(3.5), "Speaker Series · Talk 08", kick(U(2.2), { color: "theme:accent2", slot: "kicker" })),
            T(U(6), U(12), U(88), U(40), "How small towns build big ideas", disp(U(10.6), { slot: "title" })),
            S(U(52), U(54), U(44), U(44), "ring", { fill: "theme:accent", radius: U(1.2) }),
            photo(U(55), U(57), U(38), U(38), "photo", { mask: "circle" }),
            pat(U(6), U(56), U(40), U(36), "dots", U(3), { fill: "theme:accent", opacity: 0.55 }),
            T(U(6), U(60), U(42), U(9), "Jordan Ellis", head(U(5.4), { slot: "who" })),
            T(U(6), U(69), U(42), U(10), "Founder, Harbour Works", mono(U(2.3), { color: "theme:muted", slot: "role" })),
            box(U(6), U(H - 30), U(88), U(0.3), "theme:line"),
            ico(U(6), U(H - 24), U(4), "calendar", { color: "theme:accent2" }),
            T(U(12), U(H - 24), U(40), U(5), "Wed, Oct 21 · 7 pm", head(U(3.2), { weight: 600, slot: "date" })),
            ico(U(6), U(H - 16.5), U(4), "map-pin", { color: "theme:accent2" }),
            T(U(12), U(H - 16.5), U(46), U(5), "Innovation Hall, Room 2", head(U(3.2), { weight: 600, slot: "place" })),
            code(U(78), U(H - 25), U(16), "https://example.com", WHITE_QR),
            T(U(56), U(H - 8.5), U(38), U(3), "Reserve a free seat", mono(U(1.8), { align: "right", color: "theme:accent2", slot: "cta" })),
          ],
        };
      },
    ],
  },
  {
    id: "farmers-market",
    name: "Farmers Market",
    theme: "forest",
    pages: [
      (w, h) => {
        const { H, U } = g(w, h);
        const d = 27;
        return {
          els: [
            S(U(-8), U(-6), U(50), U(50), "ellipse", { fill: "theme:accent3", opacity: 0.85 }),
            S(U(58), U(-14), U(58), U(58), "ellipse", { fill: "theme:accent", opacity: 0.9 }),
            S(U(30), U(20), U(30), U(30), "ellipse", { fill: "theme:accent2", opacity: 0.85 }),
            photo(U(6), U(46), U(d), U(d), "photo", { mask: "circle" }),
            photo(U(36.5), U(46), U(d), U(d), "photo2", { mask: "circle" }),
            photo(U(67), U(46), U(d), U(d), "photo3", { mask: "circle" }),
            T(U(6), U(77), U(88), U(26), "Saturday Market", disp(U(12.4), { slot: "title" })),
            T(U(6), U(103), U(88), U(5), "Local food · Bread · Flowers · Crafts · Music", kick(U(2.1), { color: "theme:accent2", slot: "kicker" })),
            box(U(6), U(H - 22), U(88), U(0.35), "theme:ink"),
            T(U(6), U(H - 17.5), U(44), U(12), "Every Saturday\n8 am to 1 pm", head(U(3.6), { slot: "date" })),
            T(U(50), U(H - 17.5), U(44), U(12), "Market Square\nfree parking", head(U(3.6), { align: "right", slot: "place" })),
          ],
        };
      },
    ],
  },
  {
    id: "quote",
    name: "Big Quote",
    theme: "magenta",
    pages: [
      (w, h) => {
        const { H, U } = g(w, h);
        return {
          els: [
            pat(U(50), 0, U(50), h, "halftone", U(3), { fill: "theme:accent", opacity: 0.18, rot: 180 }),
            ico(U(6), U(8), U(18), "quote", { color: "theme:accent", strokeW: 1.5 }),
            T(U(6), U(30), U(86), U(H - 66), "Make the thing you wish existed, then make it again, better.", disp(U(10.2), { weight: 800, lineHeight: 1.02, slot: "quote" })),
            box(U(6), U(H - 28), U(12), U(1), "theme:accent"),
            T(U(6), U(H - 23), U(70), U(6), "A workshop motto", head(U(4), { slot: "who" })),
            T(U(6), U(H - 16), U(70), U(4), "Northside Makers · Open nights Thursday", mono(U(2), { color: "theme:muted", slot: "place" })),
          ],
        };
      },
    ],
  },
  {
    id: "safety-sign",
    name: "Safety Sign",
    theme: "studio",
    pages: [
      (w, h) => {
        const { H, U } = g(w, h);
        return {
          bg: { kind: "solid", color: "#ffd400" },
          els: [
            box(0, 0, w, U(12), "#111111"),
            pat(0, 0, w, U(12), "lines", U(5), { fill: "#ffd400", strokeW: U(1.4), opacity: 1 }),
            box(0, U(H - 12), w, U(12), "#111111"),
            pat(0, U(H - 12), w, U(12), "lines", U(5), { fill: "#ffd400", strokeW: U(1.4), opacity: 1 }),
            box(U(31), U(20), U(38), U(38), "#111111", { radius: U(5) }),
            icoNode(U(37), U(26), U(26), "hard-hat", HardHat, { color: "#ffd400", strokeW: 1.6 }),
            T(U(6), U(64), U(88), U(36), "Hard hats past this point", disp(U(11.4), { align: "center", color: "#111111", upper: true, slot: "title" })),
            T(U(12), U(H - 34), U(76), U(14), "Site safety rules apply to everyone, visitors included. Check in at the office.", head(U(3.6), { align: "center", color: "#111111", weight: 600, lineHeight: 1.3, slot: "body" })),
            T(U(6), U(H - 19), U(88), U(4), "Site office · Gate 2", kick(U(2.2), { align: "center", color: "#111111", slot: "place" })),
          ],
        };
      },
    ],
  },
  {
    id: "product-launch",
    name: "Product Launch",
    theme: "neon-night",
    pages: [
      (w, h) => {
        const { H, U } = g(w, h);
        const c = 64,
          cy = H * 0.36 - c / 2;
        return {
          els: [
            pat(0, U(cy - 18), w, U(c + 36), "rings", U(4), { fill: "theme:accent", opacity: 0.25, strokeW: U(0.15) }),
            S(U(18), U(cy), U(c), U(c), "ellipse", { fill: "theme:surface", shadow: "glow" }),
            photo(U(18), U(cy), U(c), U(c), "photo", { mask: "circle" }),
            T(U(6), U(cy + c + 7), U(88), U(4), "Introducing", kick(U(2.4), { align: "center", slot: "kicker" })),
            T(U(6), U(cy + c + 12), U(88), U(16), "Aurora Lamp", disp(U(12), { align: "center", slot: "title" })),
            T(U(14), U(cy + c + 29), U(72), U(10), "Warm light, a dimmer that remembers, and parts you can replace.", copy(U(3.2), { align: "center", slot: "sub" })),
            S(U(32), U(H - 16), U(36), U(8), "pill", { fill: "theme:accent", slot: "pill" }),
            T(U(32), U(H - 16), U(36), U(8), "Available Nov 30", mono(U(2.4), { align: "center", valign: "middle", weight: 700, color: "theme:on-accent", slot: "date" })),
          ],
        };
      },
    ],
  },
  {
    id: "tournament",
    name: "Tournament",
    theme: "ocean",
    pages: [
      (w, h) => {
        const { H, U } = g(w, h);
        return {
          els: [
            box(U(-15), U(H * 0.18), U(130), U(44), "theme:accent", { rot: -9, slot: "band" }),
            pat(U(-15), U(H * 0.18), U(130), U(44), "zigzag", U(4), { fill: "theme:on-accent", opacity: 0.18, strokeW: U(0.3), rot: -9 }),
            photo(U(63), U(H * 0.1), U(33), U(50), "photo", { radius: U(1.5), rot: -9 }),
            T(U(6), U(7), U(60), U(3.5), "Summer League", kick(U(2.3), { slot: "kicker" })),
            T(U(4), U(H * 0.18 + 10), U(62), U(24), "3 on 3", disp(U(15), { color: "theme:on-accent", rot: -9, slot: "num" })),
            T(U(6), U(H * 0.5 + 8), U(88), U(22), "Basketball Tournament", disp(U(9.4), { upper: true, slot: "title" })),
            T(U(6), U(H * 0.5 + 31), U(70), U(10), "All skill levels. Teams of three or four, ages 14 and up.", copy(U(3.1), { slot: "body" })),
            box(U(6), U(H - 21), U(88), U(0.3), "theme:line"),
            T(U(6), U(H - 16.5), U(50), U(10), "July 18 and 19\nRiverside Courts", head(U(3.5), { lineHeight: 1.25, slot: "date" })),
            code(U(80), U(H - 18), U(14), "https://example.com", WHITE_QR),
            T(U(52), U(H - 12), U(26), U(4), "Register", mono(U(2.2), { align: "right", color: "theme:accent", weight: 700, slot: "cta" })),
          ],
        };
      },
    ],
  },
  {
    id: "theatre",
    name: "Theatre",
    theme: "editorial",
    pages: [
      (w, h) => {
        const { H, U } = g(w, h);
        const ah = H * 0.42;
        return {
          els: [
            T(U(6), U(6), U(88), U(3), "The Riverside Players present", kick(U(2), { align: "center", slot: "kicker" })),
            S(U(23), U(12), U(54), U(ah), "arch", { fill: "theme:accent2" }),
            photo(U(23), U(12), U(54), U(ah), "photo", { mask: "arch" }),
            T(U(6), U(ah + 16), U(88), U(22), "The Lighthouse Keeper", disp(U(10), { align: "center", weight: 300, tracking: -0.035, slot: "title" })),
            T(U(14), U(ah + 38), U(72), U(10), "A new play in two acts about a long winter on a small island.", copy(U(3), { align: "center", slot: "sub" })),
            box(U(40), U(ah + 48), U(20), U(0.4), "theme:accent"),
            T(U(10), U(ah + 52), U(38), U(14), "Alex Moreau\nSam Okafor\nRiley Chen", head(U(2.7), { align: "right", weight: 500, lineHeight: 1.45, slot: "cast" })),
            T(U(52), U(ah + 52), U(38), U(14), "The Keeper\nThe Visitor\nThe Radio Voice", head(U(2.7), { color: "theme:muted", weight: 400, lineHeight: 1.45, slot: "roles" })),
            box(U(6), U(H - 15), U(88), U(0.3), "theme:ink"),
            T(U(6), U(H - 11), U(88), U(4), "Nov 12 to 15 · 7:30 pm · Town Hall Theatre", mono(U(2.1), { align: "center", slot: "date" })),
          ],
        };
      },
    ],
  },
  {
    id: "harvest-festival",
    name: "Harvest Festival",
    theme: "sunrise",
    pages: [
      (w, h) => {
        const { H, U } = g(w, h);
        return {
          bg: { kind: "mesh", color: "theme:bg", color2: "theme:surface", angle: 160 },
          els: [
            pat(0, 0, w, U(H * 0.55), "topo", U(4.5), { fill: "theme:accent", opacity: 0.25, strokeW: U(0.18) }),
            T(U(6), U(8), U(88), U(4), "Three days · Free", kick(U(2.4), { slot: "kicker" })),
            T(U(6), U(14), U(88), U(44), "Harvest Festival", disp(U(16), { slot: "title" })),
            T(U(6), U(H * 0.55 - 10), U(88), U(22), "25 26 27", disp(U(16), { color: "theme:accent", weight: 300, tracking: -0.02, slot: "num" })),
            T(U(6), U(H * 0.55 + 12), U(50), U(4), "September", kick(U(2.6), { color: "theme:ink", slot: "month" })),
            box(U(6), U(H - 38), U(88), U(0.35), "theme:ink"),
            ...[
              ["Main Stage", "Bands from noon"],
              ["Long Table", "Farm dinner Saturday"],
              ["Barn", "Workshops for kids"],
            ].flatMap(([a, b], i) => [
              T(U(6), U(H - 33 + i * 8.5), U(40), U(6), a, head(U(3.6), { slot: `s${i}` })),
              T(U(46), U(H - 32.2 + i * 8.5), U(48), U(6), b, mono(U(2.2), { align: "right", color: "theme:muted", slot: `d${i}` })),
            ]),
            S(U(70), U(H * 0.55 - 30), U(24), U(24), "star", { fill: "theme:accent2", rot: 14 }),
            photo(U(73), U(H * 0.55 - 27), U(18), U(18), "photo", { mask: "circle" }),
          ],
        };
      },
    ],
  },
  {
    id: "open-studio",
    name: "Open Studio",
    theme: "mint",
    pages: [
      (w, h) => {
        const { H, U } = g(w, h);
        const gh = H - 74,
          cw = 42.5,
          ch = (gh - 3) / 2;
        const cells = [
          [6, 30],
          [51.5, 30],
          [6, 33 + ch],
          [51.5, 33 + ch],
        ];
        return {
          els: [
            T(U(6), U(7), U(60), U(4), "Open Studio Weekend", kick(U(2.3), { slot: "kicker" })),
            T(U(6), U(12), U(88), U(17.5), "Come see how it's made", disp(U(8), { slot: "title" })),
            ...cells.flatMap(([x, y], i) => [
              box(U(x), U(y), U(cw), U(ch), i % 3 === 0 ? "theme:accent" : "theme:accent2", { radius: U(1) }),
              pat(U(x), U(y), U(cw), U(ch), i % 2 ? "dots" : "lines", U(2.6), { fill: "#ffffff", opacity: 0.4, strokeW: U(0.25) }),
              photo(U(x), U(y), U(cw), U(ch), i ? `photo${i + 1}` : "photo", { radius: U(1) }),
            ]),
            box(U(6), U(H - 38), U(88), U(0.3), "theme:line"),
            T(U(6), U(H - 33), U(60), U(12), "Saturday and Sunday\n10 am to 4 pm", head(U(4), { lineHeight: 1.2, slot: "date" })),
            T(U(6), U(H - 19), U(70), U(10), "Live demos every hour, ask anything, take a sample home.", copy(U(3), { slot: "body" })),
            code(U(80), U(H - 31), U(14), "https://example.com", WHITE_QR),
            T(U(66), U(H - 15), U(28), U(4), "Map and times", mono(U(1.9), { align: "right", slot: "cta" })),
          ],
        };
      },
    ],
  },
  {
    id: "type-poster",
    name: "Type Poster",
    theme: "studio",
    pages: [
      (w, h) => {
        const { H, U } = g(w, h);
        return {
          els: [
            box(U(6), U(6), U(88), U(0.5), "theme:ink"),
            T(U(6), U(8), U(30), U(4), "Design Week", kick(U(2), { color: "theme:ink", slot: "kicker" })),
            T(U(36), U(8), U(40), U(4), "Talks and Studios", kick(U(2), { color: "theme:muted", slot: "tag" })),
            T(U(76), U(8), U(18), U(4), "Oct 2026", kick(U(2), { align: "right", color: "theme:muted", slot: "month" })),
            // Inside the 1/2 in safe line on 11 × 17, the narrowest poster.
            T(U(4.6), U(14), U(90.8), U(70), "50", disp(U(64), { tracking: -0.08, lineHeight: 0.86, slot: "num" })),
            box(U(6), U(80), U(30), U(30), "theme:accent"),
            T(U(42), U(80), U(52), U(30), "Fifty events across the city in seven days, most of them free.", head(U(4.6), { weight: 700, lineHeight: 1.12, slot: "title" })),
            box(U(6), U(H - 26), U(88), U(0.5), "theme:ink"),
            T(U(6), U(H - 22), U(28), U(14), "Programme\nexample.com", mono(U(2), { lineHeight: 1.5, slot: "url" })),
            T(U(36), U(H - 22), U(28), U(14), "Opening night\nMon, Oct 19", mono(U(2), { lineHeight: 1.5, slot: "date" })),
            T(U(66), U(H - 22), U(28), U(14), "Centre\nArts Hall", mono(U(2), { align: "right", lineHeight: 1.5, slot: "place" })),
          ],
        };
      },
    ],
  },
];
