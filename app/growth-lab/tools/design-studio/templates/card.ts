import { T, bound, box, code, disp, head, kick, mono, pat, photo, S, type Template } from "./kit";

/*
 * Business cards: 3.5 × 2 in and 85 × 55 mm, a front and a back. The words
 * come from the card details ({name}, {role}, {phone}...), so one set of
 * details fills every style, and the back's code holds the same contact.
 * Each style has its own SVG layer: cuts, lines, grids, halftone, rings,
 * waves, contours, rays. Words stay inside the 1/8 in safe line.
 */

const g = (w: number, h: number) => {
  const u = w / 100;
  return { u, H: h / u, U: (n: number) => n * u };
};
const QR = { color: "#111111", bg: "#ffffff", bind: "card" as const, slot: "qr" };
const CONTACT = "{phone}\n{email}\n{website}";

export const CARDS: Template[] = [
  {
    id: "gallery", name: "Gallery", theme: "editorial",
    pages: [
      (w, h) => {
        const { H, U } = g(w, h);
        return { els: [
          box(U(8), U(8), U(84), U(0.3), "theme:ink"),
          bound(U(8), U(12), U(80), U(4), "{company}", kick(U(2), { color: "theme:muted" })),
          bound(U(8), U(23), U(80), U(12), "{name}", head(U(7.5), { weight: 400 })),
          bound(U(8), U(H - 15), U(80), U(4), "{role}", mono(U(2.4))),
          box(U(8), U(H - 8), U(84), U(0.3), "theme:ink"),
        ] };
      },
      (w, h) => {
        const { H, U } = g(w, h), q = Math.min(28, H - 20);
        return { els: [
          bound(U(8), U(10), U(48), U(10), "{tagline}", head(U(3.3), { weight: 400 })),
          bound(U(8), U(H - 26), U(48), U(18), CONTACT, mono(U(2.1), { lineHeight: 1.7 })),
          box(U(62), U(8), U(0.3), U(H - 16), "theme:ink"),
          code(U(66), (h - U(q)) / 2, U(q), "https://example.com", QR),
        ] };
      },
    ],
  },
  {
    id: "orbit", name: "Orbit", theme: "neon-night",
    pages: [
      (w, h) => {
        const { H, U } = g(w, h);
        return { els: [
          pat(U(57), U(-18), U(70), U(H + 36), "rings", U(5), { opacity: 0.35, strokeW: U(0.4) }),
          bound(U(8), U(9), U(60), U(4), "{company}", kick(U(2))),
          bound(U(8), U(20), U(74), U(12), "{name}", head(U(6.8), { weight: 900 })),
          bound(U(8), U(33), U(70), U(4), "{role}", mono(U(2.2))),
          bound(U(8), U(H - 11), U(72), U(4), "{website}", kick(U(1.9))),
        ] };
      },
      (w, h) => {
        const { H, U } = g(w, h), q = Math.min(30, H - 20);
        return { els: [
          pat(U(-18), U(-18), U(65), U(H + 36), "rings", U(5), { opacity: 0.2, strokeW: U(0.4) }),
          bound(U(8), U(10), U(45), U(12), "{tagline}", head(U(3.6))),
          bound(U(8), U(H - 22), U(45), U(14), CONTACT, mono(U(2), { lineHeight: 1.5 })),
          box(w - U(q + 10), (h - U(q)) / 2 - U(2), U(q + 4), U(q + 4), "#ffffff"),
          code(w - U(q + 8), (h - U(q)) / 2, U(q), "https://example.com", QR),
        ] };
      },
    ],
  },
  {
    id: "ribbon", name: "Ribbon", theme: "sunrise",
    pages: [
      (w, h) => {
        const { H, U } = g(w, h);
        return { els: [
          S(U(66), 0, U(34), h, "slant", { fill: "theme:accent", fill2: "theme:accent2", angle: 110, opacity: 0.75 }),
          bound(U(8), U(10), U(60), U(4), "{company}", kick(U(2))),
          bound(U(8), U(20), U(62), U(10), "{name}", head(U(6.2))),
          bound(U(8), U(30), U(55), U(4), "{role}", mono(U(2))),
          bound(U(8), U(H - 17), U(55), U(10), "{email}\n{website}", mono(U(2.1), { lineHeight: 1.6 })),
        ] };
      },
      (w, h) => {
        const { H, U } = g(w, h), q = Math.min(30, H - 20);
        return { els: [
          S(0, 0, U(55), h, "slant", { fill: "theme:accent", fill2: "theme:accent2", angle: 110, opacity: 0.25 }),
          bound(U(8), U(12), U(42), U(14), "{tagline}", head(U(3.7))),
          bound(U(8), U(H - 14), U(42), U(5), "{phone}", mono(U(2.4))),
          box(w - U(q + 10), (h - U(q)) / 2 - U(2), U(q + 4), U(q + 4), "#ffffff"),
          code(w - U(q + 8), (h - U(q)) / 2, U(q), "https://example.com", QR),
        ] };
      },
    ],
  },
  {
    id: "registration", name: "Registration", theme: "studio",
    pages: [
      (w, h) => {
        const { H, U } = g(w, h);
        return { els: [
          ...[8, 88].flatMap((x) => [8, H - 12].map((y) => pat(U(x), U(y), U(4), U(4), "plus", U(4), { strokeW: U(0.3) }))),
          bound(U(16), U(14), U(70), U(10), "{name}", head(U(5.8), { weight: 850 })),
          bound(U(16), U(25), U(70), U(4), "{role}", kick(U(1.9))),
          bound(U(16), U(H - 20), U(70), U(12), CONTACT, mono(U(2.1), { lineHeight: 1.6 })),
        ] };
      },
      (w, h) => {
        const { H, U } = g(w, h), q = Math.min(28, H - 22);
        return { els: [
          pat(U(8), U(8), U(4), U(4), "plus", U(4), { strokeW: U(0.3) }),
          pat(U(88), U(H - 12), U(4), U(4), "plus", U(4), { strokeW: U(0.3) }),
          bound(U(16), U(13), U(40), U(12), "{company}", head(U(4))),
          bound(U(16), U(28), U(40), U(12), "{tagline}", mono(U(2))),
          code(U(62), (h - U(q)) / 2, U(q), "https://example.com", QR),
        ] };
      },
    ],
  },
  {
    id: "studio",
    name: "Studio",
    theme: "studio",
    pages: [
      (w, h) => {
        const { H, U } = g(w, h);
        return {
          els: [
            S(U(64), U(H - 30), U(52), U(52), "quarter", { fill: "theme:accent" }),
            pat(U(64), U(H - 30), U(36), U(30), "lines", U(2.2), { fill: "theme:on-accent", opacity: 0.35, strokeW: U(0.24) }),
            bound(U(8), U(9), U(60), U(4), "{company}", kick(U(2.3), { color: "theme:ink" })),
            bound(U(8), U(19), U(70), U(8), "{name}", head(U(6.2), { weight: 850, tracking: -0.03, lineHeight: 1 })),
            bound(U(8), U(27), U(60), U(4), "{role}", kick(U(2.1))),
            box(U(8), U(33.5), U(9), U(0.7), "theme:accent"),
            bound(U(8), U(H - 20), U(56), U(13), CONTACT, mono(U(2.35), { lineHeight: 1.55, color: "theme:muted" })),
          ],
        };
      },
      (w, h) => {
        const { H, U } = g(w, h);
        const q = Math.min(36, H - 16);
        return {
          bg: { kind: "solid", color: "theme:accent" },
          els: [
            pat(0, 0, w, h, "topo", U(4.2), { fill: "theme:on-accent", opacity: 0.16, strokeW: U(0.2) }),
            bound(U(8), U(10), U(42), U(18), "{tagline}", head(U(4.4), { weight: 800, color: "theme:on-accent" })),
            bound(U(8), U(H - 12), U(42), U(4), "{website}", kick(U(2.1), { color: "theme:on-accent" })),
            box(w - U(8 + q + 2), (h - U(q)) / 2 - U(2), U(q + 4), U(q + 4), "#ffffff", { slot: "qrtile" }),
            code(w - U(8 + q), (h - U(q)) / 2, U(q), "https://example.com", QR),
          ],
        };
      },
    ],
  },
  {
    id: "neon-grid",
    name: "Neon Grid",
    theme: "neon-night",
    pages: [
      (w, h) => {
        const { H, U } = g(w, h);
        return {
          els: [
            pat(0, 0, w, h, "grid", U(6), { fill: "theme:line", opacity: 0.9, strokeW: U(0.16) }),
            box(0, 0, U(2.2), h, "theme:accent"),
            bound(U(9), U(12), U(80), U(9), "{name}", head(U(7), { weight: 900, tracking: -0.035, lineHeight: 1 })),
            bound(U(9), U(22), U(70), U(4), "{role}", kick(U(2.2))),
            bound(U(9), U(H - 21), U(62), U(14), CONTACT, mono(U(2.35), { lineHeight: 1.6, color: "theme:muted" })),
            bound(U(62), U(H - 9.5), U(30), U(4), "{company}", kick(U(1.9), { color: "theme:accent2", align: "right" })),
          ],
        };
      },
      (w, h) => {
        const { H, U } = g(w, h);
        const q = Math.min(34, H - 18);
        return {
          els: [
            pat(0, 0, w, h, "dots", U(3), { fill: "theme:accent", opacity: 0.35 }),
            S(U(-18), U(H - 46), U(70), U(70), "ellipse", { fill: "theme:accent2", opacity: 0.22 }),
            bound(U(8), U(12), U(44), U(12), "{company}", head(U(5), { weight: 850 })),
            bound(U(8), U(26), U(42), U(10), "{tagline}", mono(U(2.2), { color: "theme:muted", lineHeight: 1.5 })),
            box(w - U(9 + q + 2.4), (h - U(q)) / 2 - U(2.4), U(q + 4.8), U(q + 4.8), "#ffffff", { radius: U(1.6), slot: "qrtile" }),
            code(w - U(9 + q), (h - U(q)) / 2, U(q), "https://example.com", QR),
            T(U(8), U(H - 11), U(50), U(4), "Scan to save my details", kick(U(1.8), { slot: "note" })),
          ],
        };
      },
    ],
  },
  {
    id: "split",
    name: "Split",
    theme: "slate",
    pages: [
      (w, h) => {
        const { H, U } = g(w, h);
        return {
          els: [
            box(0, 0, U(38), h, "theme:accent"),
            pat(0, 0, U(38), h, "halftone", U(3.2), { fill: "theme:on-accent", opacity: 0.2, rot: 180 }),
            bound(U(4), (h - U(20)) / 2, U(30), U(20), "{initials}", disp(U(13), { align: "center", valign: "middle", color: "theme:on-accent", tracking: -0.02 })),
            bound(U(45), U(11), U(50), U(14), "{name}", head(U(5.6), { weight: 850, lineHeight: 1.02 })),
            bound(U(45), U(25), U(50), U(4), "{role}", kick(U(1.95), { color: "theme:accent" })),
            box(U(45), U(31), U(48), U(0.25), "theme:line"),
            bound(U(45), U(H - 22), U(50), U(15), CONTACT, mono(U(2.2), { lineHeight: 1.6 })),
          ],
        };
      },
      (w, h) => {
        const { H, U } = g(w, h);
        const q = Math.min(24, H - 30);
        return {
          els: [
            bound(U(8), U(14), U(48), U(14), "{company}", head(U(5.2), { weight: 850 })),
            box(U(8), U(30), U(12), U(0.6), "theme:accent"),
            bound(U(8), U(34), U(48), U(10), "{tagline}", mono(U(2), { color: "theme:muted" })),
            code(w - U(8 + q), (h - U(q)) / 2, U(q), "https://example.com", QR),
            box(0, h - U(2.2), w, U(2.2), "theme:accent"),
          ],
        };
      },
    ],
  },
  {
    id: "monogram",
    name: "Monogram",
    theme: "noir",
    pages: [
      (w, h) => {
        const { H, U } = g(w, h);
        const r = 23;
        return {
          els: [
            pat(0, 0, w, h, "rings", U(3.4), { fill: "theme:accent", opacity: 0.08, strokeW: U(0.18) }),
            S(U(50 - r / 2), U(7), U(r), U(r), "ring", { fill: "theme:accent", radius: U(0.35) }),
            bound(U(50 - r / 2), U(7), U(r), U(r), "{initials}", disp(U(8.4), { align: "center", valign: "middle", color: "theme:accent", weight: 300, tracking: 0.02 })),
            bound(U(8), U(r + 11), U(84), U(7), "{name}", head(U(4.8), { align: "center", weight: 500, tracking: 0.02 })),
            bound(U(8), U(r + 18.5), U(84), U(4), "{role}", kick(U(1.9), { align: "center" })),
          ],
        };
      },
      (w, h) => {
        const { H, U } = g(w, h);
        const q = Math.min(30, H - 20);
        return {
          els: [
            box(0, 0, U(1.4), h, "theme:accent"),
            bound(U(9), U(10), U(48), U(5), "{company}", kick(U(2.1), { color: "theme:accent" })),
            bound(U(9), U(18), U(49), U(H - 30), "{phone}\n{email}\n{website}\n{address}", mono(U(2.2), { lineHeight: 1.75 })),
            box(w - U(8 + q + 2), (h - U(q)) / 2 - U(2), U(q + 4), U(q + 4), "#f7f3ea", { slot: "qrtile" }),
            code(w - U(8 + q), (h - U(q)) / 2, U(q), "https://example.com", { ...QR, bg: "#f7f3ea" }),
          ],
        };
      },
    ],
  },
  {
    id: "portrait",
    name: "Portrait",
    theme: "sunrise",
    pages: [
      (w, h) => {
        const { H, U } = g(w, h);
        const c = Math.min(36, H - 18);
        return {
          els: [
            S(U(5), (h - U(c + 6)) / 2, U(c + 6), U(c + 6), "ellipse", { fill: "theme:accent3" }),
            photo(U(8), (h - U(c)) / 2, U(c), U(c), "photo", { mask: "circle" }),
            bound(U(c + 16), U(12), U(80 - c), U(8), "{name}", head(U(5.6), { weight: 850 })),
            bound(U(c + 16), U(20.5), U(80 - c), U(4), "{role}", kick(U(1.95))),
            bound(U(c + 16), U(H - 21), U(80 - c), U(15), CONTACT, mono(U(2.15), { lineHeight: 1.6, color: "theme:muted" })),
          ],
        };
      },
      (w, h) => {
        const { H, U } = g(w, h);
        const q = Math.min(32, H - 18);
        return {
          bg: { kind: "solid", color: "theme:accent" },
          els: [
            pat(0, 0, w, h, "waves", U(4.4), { fill: "theme:on-accent", opacity: 0.18, strokeW: U(0.28) }),
            bound(U(8), U(11), U(46), U(22), "{tagline}", head(U(4.6), { weight: 850, color: "theme:on-accent" })),
            bound(U(8), U(H - 12), U(46), U(4), "{company}", kick(U(2), { color: "theme:on-accent" })),
            box(w - U(8 + q + 2), (h - U(q)) / 2 - U(2), U(q + 4), U(q + 4), "#ffffff", { radius: U(1.2), slot: "qrtile" }),
            code(w - U(8 + q), (h - U(q)) / 2, U(q), "https://example.com", QR),
          ],
        };
      },
    ],
  },
  {
    id: "editorial",
    name: "Editorial",
    theme: "editorial",
    pages: [
      (w, h) => {
        const { H, U } = g(w, h);
        return {
          els: [
            bound(U(8), U(9), U(60), U(4), "{company}", kick(U(1.9), { color: "theme:muted" })),
            bound(U(8), U(17), U(84), U(14), "{name}", head(U(8), { weight: 300, tracking: -0.03, lineHeight: 1 })),
            box(U(8), U(30), U(14), U(0.6), "theme:accent"),
            bound(U(8), U(33), U(60), U(4), "{role}", mono(U(2.2), { italic: true, color: "theme:accent" })),
            bound(U(52), U(H - 18), U(40), U(12), "{phone}\n{email}", mono(U(2.1), { align: "right", lineHeight: 1.6 })),
          ],
        };
      },
      (w, h) => {
        const { H, U } = g(w, h);
        const q = Math.min(26, H - 26);
        return {
          bg: { kind: "solid", color: "theme:accent2" },
          els: [
            pat(U(55), 0, U(45), h, "lines", U(2.4), { fill: "#ffffff", opacity: 0.14, strokeW: U(0.2) }),
            bound(U(8), U(11), U(50), U(20), "{tagline}", head(U(4.4), { weight: 300, color: "#ffffff", lineHeight: 1.15 })),
            bound(U(8), U(H - 18), U(50), U(12), "{website}\n{address}", mono(U(2), { color: "#ffffff", lineHeight: 1.6 })),
            box(w - U(8 + q + 2), (h - U(q)) / 2 - U(2), U(q + 4), U(q + 4), "#ffffff", { slot: "qrtile" }),
            code(w - U(8 + q), (h - U(q)) / 2, U(q), "https://example.com", QR),
          ],
        };
      },
    ],
  },
  {
    id: "bold-type",
    name: "Bold Type",
    theme: "magenta",
    pages: [
      (w, h) => {
        const { H, U } = g(w, h);
        return {
          els: [
            pat(U(62), 0, U(38), U(26), "confetti", U(3.4), { fill: "theme:accent2", opacity: 0.5, strokeW: U(0.35) }),
            bound(U(7), U(8), U(86), U(14), "{first}", disp(U(12), { tracking: -0.055 })),
            bound(U(7), U(20), U(86), U(14), "{last}", disp(U(12), { tracking: -0.055, color: "theme:accent" })),
            bound(U(7), U(H - 14), U(46), U(4), "{role}", kick(U(1.9), { color: "theme:ink" })),
            bound(U(52), U(H - 14), U(41), U(4), "{website}", mono(U(2.1), { align: "right", weight: 700 })),
          ],
        };
      },
      (w, h) => {
        const { H, U } = g(w, h);
        const q = Math.min(30, H - 18);
        return {
          bg: { kind: "solid", color: "theme:accent" },
          els: [
            S(U(-12), U(H - 34), U(60), U(60), "ellipse", { fill: "theme:accent2", opacity: 0.55 }),
            bound(U(8), U(10), U(48), U(20), "{phone}\n{email}", mono(U(2.3), { color: "theme:on-accent", lineHeight: 1.7, weight: 600 })),
            bound(U(8), U(H - 13), U(48), U(5), "{company}", head(U(3.2), { color: "theme:on-accent", weight: 850 })),
            box(w - U(8 + q + 2), (h - U(q)) / 2 - U(2), U(q + 4), U(q + 4), "#ffffff", { radius: U(1.2), slot: "qrtile" }),
            code(w - U(8 + q), (h - U(q)) / 2, U(q), "https://example.com", QR),
          ],
        };
      },
    ],
  },
  {
    id: "technical",
    name: "Technical",
    theme: "blueprint",
    pages: [
      (w, h) => {
        const { H, U } = g(w, h);
        const label = (y: number, t: string) => T(U(8), U(y), U(30), U(3), t, kick(U(1.5), { color: "theme:accent", tracking: 0.24 }));
        return {
          els: [
            pat(0, 0, w, h, "grid", U(4), { fill: "theme:line", opacity: 0.9, strokeW: U(0.1) }),
            pat(U(92), U(4), U(4), U(4), "plus", U(4), { fill: "theme:accent2", strokeW: U(0.25) }),
            pat(U(4), U(H - 8), U(4), U(4), "plus", U(4), { fill: "theme:accent2", strokeW: U(0.25) }),
            label(8, "Name"),
            bound(U(8), U(11.5), U(84), U(8), "{name}", head(U(5.4), { weight: 700 })),
            label(22, "Role"),
            bound(U(8), U(25.5), U(84), U(4), "{role}", mono(U(2.3))),
            label(H - 23, "Contact"),
            bound(U(8), U(H - 19.5), U(70), U(14), CONTACT, mono(U(2.2), { lineHeight: 1.55 })),
          ],
        };
      },
      (w, h) => {
        const { H, U } = g(w, h);
        const q = Math.min(34, H - 18);
        return {
          els: [
            pat(0, 0, w, h, "grid", U(4), { fill: "theme:line", opacity: 0.9, strokeW: U(0.1) }),
            S(U(8), U(10), U(4), U(4), "ellipse", { fill: "theme:accent2" }),
            bound(U(15), U(9.2), U(38), U(6), "{company}", head(U(3.6), { weight: 800 })),
            bound(U(8), U(19), U(46), U(14), "{tagline}", mono(U(2.1), { color: "theme:muted", lineHeight: 1.5 })),
            T(U(8), U(H - 11), U(40), U(3), "Scan · Save · Call", kick(U(1.6), { color: "theme:accent", slot: "note" })),
            box(w - U(9 + q + 2), (h - U(q)) / 2 - U(2), U(q + 4), U(q + 4), "#ffffff", { slot: "qrtile" }),
            code(w - U(9 + q), (h - U(q)) / 2, U(q), "https://example.com", QR),
          ],
        };
      },
    ],
  },
  {
    id: "corner",
    name: "Corner",
    theme: "forest",
    pages: [
      (w, h) => {
        const { H, U } = g(w, h);
        return {
          els: [
            S(U(72), U(-8), U(36), U(36), "ellipse", { fill: "theme:accent" }),
            pat(U(60), 0, U(40), U(32), "dots", U(2.4), { fill: "theme:accent2", opacity: 0.55 }),
            bound(U(8), U(14), U(60), U(9), "{name}", head(U(6), { weight: 850 })),
            bound(U(8), U(23), U(60), U(4), "{role}", kick(U(2), { color: "theme:accent2" })),
            box(U(8), U(H - 24), U(30), U(0.3), "theme:ink"),
            bound(U(8), U(H - 20), U(60), U(14), CONTACT, mono(U(2.2), { lineHeight: 1.6 })),
          ],
        };
      },
      (w, h) => {
        const { H, U } = g(w, h);
        const q = Math.min(30, H - 20);
        return {
          bg: { kind: "solid", color: "theme:accent2" },
          els: [
            pat(0, 0, w, h, "rings", U(4), { fill: "#ffffff", opacity: 0.14, strokeW: U(0.22) }),
            bound(U(8), (h - U(12)) / 2, U(48), U(12), "{company}", head(U(5.6), { color: "#ffffff", weight: 850, valign: "middle" })),
            box(w - U(8 + q + 2), (h - U(q)) / 2 - U(2), U(q + 4), U(q + 4), "#ffffff", { radius: U(1.6), slot: "qrtile" }),
            code(w - U(8 + q), (h - U(q)) / 2, U(q), "https://example.com", QR),
          ],
        };
      },
    ],
  },
  {
    id: "minimal",
    name: "Minimal",
    theme: "studio",
    pages: [
      (w, h) => {
        const { H, U } = g(w, h);
        return {
          els: [
            bound(U(8), U(H / 2 - 7), U(60), U(7), "{name}", head(U(4.2), { weight: 600, tracking: 0.01 })),
            bound(U(8), U(H / 2 + 0.5), U(60), U(4), "{role}", mono(U(2), { color: "theme:muted" })),
            box(U(70), U(8), U(0.25), U(H - 16), "theme:line"),
            S(U(84), U(9), U(4.2), U(4.2), "ellipse", { fill: "theme:accent" }),
            bound(U(73), U(H - 21), U(22), U(14), "{phone}\n{email}", mono(U(1.8), { lineHeight: 1.6, color: "theme:muted" })),
          ],
        };
      },
      (w, h) => {
        const { H, U } = g(w, h);
        const q = 22;
        return {
          els: [
            S(U(48), U(8), U(4), U(4), "ellipse", { fill: "theme:accent" }),
            bound(U(8), U(14.5), U(84), U(5), "{website}", mono(U(2.4), { align: "center", tracking: 0.12 })),
            code(U(50 - q / 2), U(H - 6 - q), U(q), "https://example.com", { ...QR, bg: "#faf8f5" }),
          ],
        };
      },
    ],
  },
  {
    id: "harbour",
    name: "Harbour",
    theme: "ocean",
    pages: [
      (w, h) => {
        const { H, U } = g(w, h);
        return {
          els: [
            S(U(-4), U(H - 22), U(108), U(24), "wave", { fill: "theme:surface" }),
            pat(0, U(H - 18), w, U(18), "waves", U(3), { fill: "theme:accent", opacity: 0.4, strokeW: U(0.22) }),
            bound(U(8), U(10), U(80), U(8), "{name}", head(U(6), { weight: 850 })),
            bound(U(8), U(18.5), U(60), U(4), "{role}", kick(U(2))),
            bound(U(8), U(26), U(60), U(13), "{phone}\n{email}", mono(U(2.2), { lineHeight: 1.6, color: "theme:muted" })),
          ],
        };
      },
      (w, h) => {
        const { H, U } = g(w, h);
        const q = Math.min(32, H - 18);
        return {
          els: [
            pat(0, 0, w, h, "topo", U(3.4), { fill: "theme:accent", opacity: 0.22, strokeW: U(0.18) }),
            bound(U(8), U(11), U(46), U(16), "{tagline}", head(U(4.2), { weight: 800 })),
            bound(U(8), U(H - 12), U(46), U(4), "{website}", kick(U(1.9), { color: "theme:accent" })),
            box(w - U(8 + q + 2), (h - U(q)) / 2 - U(2), U(q + 4), U(q + 4), "#ffffff", { radius: U(1.2), slot: "qrtile" }),
            code(w - U(8 + q), (h - U(q)) / 2, U(q), "https://example.com", QR),
          ],
        };
      },
    ],
  },
  {
    id: "halftone",
    name: "Halftone",
    theme: "ember",
    pages: [
      (w, h) => {
        const { H, U } = g(w, h);
        return {
          els: [
            pat(U(44), 0, U(56), h, "halftone", U(3), { fill: "theme:accent", opacity: 0.85, rot: 180 }),
            bound(U(8), U(11), U(60), U(16), "{name}", head(U(6.4), { weight: 900, lineHeight: 1.02 })),
            bound(U(8), U(26), U(60), U(4), "{role}", kick(U(1.95), { color: "theme:accent2" })),
            bound(U(8), U(H - 20), U(56), U(14), CONTACT, mono(U(2.15), { lineHeight: 1.6 })),
          ],
        };
      },
      (w, h) => {
        const { H, U } = g(w, h);
        const q = Math.min(30, H - 20);
        return {
          bg: { kind: "solid", color: "theme:accent" },
          els: [
            bound(U(6), (h - U(32)) / 2, U(52), U(32), "{initials}", disp(U(24), { color: "theme:on-accent", valign: "middle", tracking: -0.04 })),
            box(w - U(8 + q + 2), (h - U(q)) / 2 - U(2), U(q + 4), U(q + 4), "#ffffff", { radius: U(1.2), slot: "qrtile" }),
            code(w - U(8 + q), (h - U(q)) / 2, U(q), "https://example.com", QR),
          ],
        };
      },
    ],
  },
  {
    id: "sunburst",
    name: "Sunburst",
    theme: "mint",
    pages: [
      (w, h) => {
        const { H, U } = g(w, h);
        return {
          els: [
            pat(U(-40), U(-30), U(90), U(H + 60), "rays", 0, { fill: "theme:accent", opacity: 0.16 }),
            S(U(-7), U(H / 2 - 9), U(18), U(18), "ellipse", { fill: "theme:accent" }),
            bound(U(18), U(13), U(76), U(9), "{name}", head(U(6), { weight: 850 })),
            bound(U(18), U(22), U(76), U(4), "{role}", kick(U(2))),
            bound(U(18), U(H - 20), U(76), U(14), CONTACT, mono(U(2.2), { lineHeight: 1.6 })),
          ],
        };
      },
      (w, h) => {
        const { H, U } = g(w, h);
        const q = Math.min(32, H - 18);
        return {
          els: [
            pat(0, 0, U(58), h, "zigzag", U(3.6), { fill: "theme:accent2", opacity: 0.35, strokeW: U(0.3) }),
            bound(U(8), U(H / 2 - 7), U(46), U(7), "{company}", head(U(4.6), { weight: 850 })),
            bound(U(8), U(H / 2 + 1), U(46), U(10), "{tagline}", mono(U(1.9), { color: "theme:muted", lineHeight: 1.45 })),
            box(w - U(8 + q + 2), (h - U(q)) / 2 - U(2), U(q + 4), U(q + 4), "#ffffff", { radius: U(1.2), slot: "qrtile" }),
            code(w - U(8 + q), (h - U(q)) / 2, U(q), "https://example.com", QR),
          ],
        };
      },
    ],
  },
];
