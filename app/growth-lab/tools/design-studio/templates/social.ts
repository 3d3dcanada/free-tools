import { T, box, copy, disp, head, ico, kick, mono, pat, photo, S, type Art, type Template } from "./kit";

/*
 * Social images: square, portrait and story posts, link and cover images,
 * banners and thumbnails, 0.56 to 4 wide. Every template has a tall layout
 * and a wide one, with type sized from the shorter side. On banners the
 * words sit right of centre, clear of where profile photos cover the left.
 */

/** u: a hundredth of the shorter side. */
const g = (w: number, h: number) => {
  const u = Math.min(w, h) / 100;
  return { u, W: w / u, H: h / u, wide: w / h > 1.25, banner: w / h > 2.4, U: (n: number) => n * u };
};
type G = ReturnType<typeof g>;
/** One template, two compositions. */
const two = (tall: (g: G) => Art, wide: (g: G) => Art) => (w: number, h: number) => {
  const k = g(w, h);
  return k.wide ? wide(k) : tall(k);
};

export const SOCIAL: Template[] = [
  {
    id: "announcement",
    name: "Announcement",
    theme: "magenta",
    pages: [
      two(
        ({ W, H, U }) => {
          const pc = Math.min(W * 0.78, H * 0.46);
          return {
            els: [
              S(U(W - pc * 0.86), U(-pc * 0.18), U(pc * 1.04), U(pc * 1.04), "ellipse", { fill: "theme:accent2" }),
              pat(U(W - pc * 0.86), U(-pc * 0.18), U(pc * 1.04), U(pc * 1.04), "rings", U(4), { fill: "#ffffff", opacity: 0.4 }),
              photo(U(W - pc * 0.8), U(-pc * 0.12), U(pc * 0.92), U(pc * 0.92), "photo", { mask: "circle" }),
              T(U(8), U(8), U(40), U(5), "Studio Martin", mono(U(3), { weight: 700, slot: "tag" })),
              T(U(8), U(Math.min(H - 54, pc * 0.86 + 16)), U(84), U(5), "New in the shop", kick(U(3.4), { slot: "kicker" })),
              T(U(8), U(Math.min(H - 47, pc * 0.86 + 23)), U(84), U(30), "Hand-poured candles, back in stock", disp(U(9.6), { slot: "title" })),
              S(U(8), U(H - 15), U(34), U(8.6), "pill", { fill: "theme:ink" }),
              T(U(8), U(H - 15), U(34), U(8.6), "Shop the drop", mono(U(3.1), { align: "center", valign: "middle", color: "theme:bg", weight: 700, slot: "cta" })),
              T(U(46), U(H - 13.4), U(46), U(6), "Small batches, poured by hand.", copy(U(2.7), { slot: "sub" })),
            ],
          };
        },
        ({ W, H, U, banner }) => {
          const pw = banner ? W * 0.34 : W * 0.46;
          const px = banner ? 0 : W - pw;
          const tx = banner ? pw + 10 : 8;
          const tw = W - pw - 18;
          return {
            els: [
              box(U(px), 0, U(pw), U(H), "theme:accent2"),
              pat(U(px), 0, U(pw), U(H), "waves", U(6), { fill: "#ffffff", opacity: 0.35 }),
              photo(U(px), 0, U(pw), U(H)),
              S(U(banner ? pw - 9 : W - pw - 9), U(H - 26), U(18), U(18), "ellipse", { fill: "theme:accent" }),
              T(U(tx), U(banner ? 15 : 12), U(tw), U(6), "New in the shop", kick(U(banner ? 4.6 : 3.6), { slot: "kicker" })),
              T(U(tx), U(banner ? 25 : 20), U(tw), U(banner ? 40 : 46), "Hand-poured candles, back in stock", disp(U(banner ? 12.5 : 9.5), { slot: "title" })),
              S(U(tx), U(H - (banner ? 25 : 21)), U(banner ? 46 : 32), U(banner ? 13 : 10), "pill", { fill: "theme:ink" }),
              T(U(tx), U(H - (banner ? 25 : 21)), U(banner ? 46 : 32), U(banner ? 13 : 10), "Shop the drop", mono(U(banner ? 4.6 : 3.4), { align: "center", valign: "middle", color: "theme:bg", weight: 700, slot: "cta" })),
            ],
          };
        },
      ),
    ],
  },
  {
    id: "quote-card",
    name: "Quote Card",
    theme: "noir",
    pages: [
      two(
        ({ H, U }) => ({
          els: [
            pat(0, 0, U(100), U(H), "lines", U(5), { fill: "theme:accent", opacity: 0.12, strokeW: U(0.15) }),
            ico(U(8), U(9), U(14), "quote", { color: "theme:accent", strokeW: 1.4 }),
            T(U(8), U(26), U(84), U(H - 54), "Do the small things well and the big things get easier.", disp(U(8.4), { weight: 300, lineHeight: 1.08, tracking: -0.03, valign: H > 120 ? "middle" : "top", slot: "quote" })),
            box(U(8), U(H - 24), U(10), U(0.7), "theme:accent"),
            T(U(8), U(H - 19), U(60), U(5), "Sam Rivera", head(U(3.8), { slot: "who" })),
            T(U(8), U(H - 13), U(60), U(4), "Woodworker, Northside Studio", mono(U(2.4), { color: "theme:muted", slot: "role" })),
            S(U(72), U(H - 26), U(20), U(20), "ring", { fill: "theme:accent", radius: U(0.6) }),
            photo(U(73.5), U(H - 24.5), U(17), U(17), "photo", { mask: "circle", filter: "mono" }),
          ],
        }),
        ({ W, H, U, banner }) => {
          const c = banner ? 60 : 56;
          const cx = banner ? 12 : W - c - 10;
          const tx = banner ? cx + c + 14 : 10;
          const tw = banner ? W - tx - 12 : W - c - 30;
          return {
            els: [
              pat(0, 0, U(W), U(H), "lines", U(5), { fill: "theme:accent", opacity: 0.12, strokeW: U(0.15) }),
              S(U(cx - 3), U((H - c) / 2 - 3), U(c + 6), U(c + 6), "ring", { fill: "theme:accent", radius: U(0.8) }),
              photo(U(cx), U((H - c) / 2), U(c), U(c), "photo", { mask: "circle", filter: "mono" }),
              ico(U(tx), U(banner ? 12 : 12), U(banner ? 12 : 11), "quote", { color: "theme:accent", strokeW: 1.4 }),
              T(U(tx), U(banner ? 27 : 26), U(tw), U(46), "Do the small things well and the big things get easier.", disp(U(banner ? 9.4 : 7.4), { weight: 300, lineHeight: 1.08, tracking: -0.03, slot: "quote" })),
              T(U(tx), U(H - 19), U(tw), U(7), "Sam Rivera · Woodworker, Northside Studio", mono(U(banner ? 3.8 : 3), { color: "theme:muted", slot: "who" })),
            ],
          };
        },
      ),
    ],
  },
  {
    id: "product-spotlight",
    name: "Product Spotlight",
    theme: "studio",
    pages: [
      two(
        ({ H, U }) => {
          const ph = H - 44;
          return {
            els: [
              box(U(6), U(6), U(88), U(ph), "theme:surface", { radius: U(2) }),
              pat(U(6), U(6), U(88), U(ph), "dots", U(3), { fill: "theme:line", opacity: 1 }),
              photo(U(6), U(6), U(88), U(ph), "photo", { radius: U(2) }),
              S(U(70), U(ph - 14), U(22), U(22), "ellipse", { fill: "theme:accent", slot: "pricedot" }),
              T(U(70), U(ph - 14), U(22), U(22), "$38", disp(U(6.4), { align: "center", valign: "middle", color: "theme:on-accent", slot: "price" })),
              T(U(6), U(H - 34), U(60), U(4), "Spotlight", kick(U(2.6), { slot: "kicker" })),
              T(U(6), U(H - 30), U(70), U(15), "Ceramic pour-over set", disp(U(6.8), { slot: "title" })),
              T(U(6), U(H - 13), U(60), U(5), "Handmade in small batches", copy(U(2.8), { slot: "sub" })),
              T(U(62), U(H - 12.4), U(32), U(5), "Shop now", mono(U(2.8), { align: "right", weight: 700, color: "theme:ink", underline: true, slot: "cta" })),
            ],
          };
        },
        ({ W, H, U, banner }) => {
          const pw = banner ? W * 0.32 : W * 0.5;
          const px = banner ? 6 : W - pw - 6;
          const tx = banner ? px + pw + 12 : 8;
          const tw = W - pw - 26;
          return {
            els: [
              box(U(px), U(6), U(pw), U(H - 12), "theme:surface", { radius: U(2) }),
              pat(U(px), U(6), U(pw), U(H - 12), "dots", U(3), { fill: "theme:line", opacity: 1 }),
              photo(U(px), U(6), U(pw), U(H - 12), "photo", { radius: U(2) }),
              S(U(px + pw - 26), U(H - 34), U(22), U(22), "ellipse", { fill: "theme:accent", slot: "pricedot" }),
              T(U(px + pw - 26), U(H - 34), U(22), U(22), "$38", disp(U(6.4), { align: "center", valign: "middle", color: "theme:on-accent", slot: "price" })),
              T(U(tx), U(banner ? 15 : 14), U(tw), U(7), "Spotlight", kick(U(banner ? 4.4 : 3.2), { slot: "kicker" })),
              T(U(tx), U(banner ? 26 : 22), U(tw), U(40), "Ceramic pour-over set", disp(U(banner ? 11 : 9), { slot: "title" })),
              T(U(tx), U(H - (banner ? 26 : 27)), U(tw), U(8), "Handmade in small batches", copy(U(banner ? 4.6 : 3.4), { slot: "sub" })),
              T(U(tx), U(H - (banner ? 16 : 17)), U(tw), U(7), "Shop now", mono(U(banner ? 4.4 : 3.2), { weight: 700, color: "theme:ink", underline: true, slot: "cta" })),
            ],
          };
        },
      ),
    ],
  },
  {
    id: "event-promo",
    name: "Event Promo",
    theme: "neon-night",
    pages: [
      two(
        ({ H, U }) => {
          // Half the square; on portrait and story posts the photo takes the extra height.
          const ph = Math.max(H * 0.5, H - 56);
          return {
            els: [
              box(0, 0, U(100), U(ph), "theme:surface"),
              pat(0, 0, U(100), U(ph), "halftone", U(3), { opacity: 0.45 }),
              photo(0, 0, U(100), U(ph)),
              box(U(8), U(ph - 10), U(24), U(26), "theme:accent"),
              T(U(8), U(ph - 9), U(24), U(16.5), "21", disp(U(14), { align: "center", color: "theme:on-accent", lineHeight: 1, slot: "day" })),
              T(U(8), U(ph + 7), U(24), U(5), "Nov · Sat", kick(U(2.6), { align: "center", color: "theme:on-accent", slot: "month" })),
              T(U(37), U(ph + 2.5), U(56), U(5), "Live · 8 pm", kick(U(2.8), { slot: "kicker" })),
              T(U(37), U(ph + 7.5), U(57), U(26), "Late Night Jazz Session", disp(U(7.4), { slot: "title" })),
              T(U(8), U(H - 12), U(84), U(5), "The Lantern Room · Tickets at example.com", mono(U(2.7), { color: "theme:muted", slot: "place" })),
            ],
          };
        },
        ({ W, H, U, banner }) => {
          const pw = banner ? W * 0.36 : W * 0.48;
          const px = banner ? 0 : W - pw;
          const tx = banner ? pw + 8 : 8;
          return {
            els: [
              box(U(px), 0, U(pw), U(H), "theme:surface"),
              pat(U(px), 0, U(pw), U(H), "halftone", U(3.4), { opacity: 0.45 }),
              photo(U(px), 0, U(pw), U(H)),
              box(U(tx), U(banner ? 18 : 14), U(banner ? 30 : 26), U(banner ? 34 : 30), "theme:accent"),
              T(U(tx), U(banner ? 19.5 : 15.5), U(banner ? 30 : 26), U(20), "21", disp(U(banner ? 17 : 15), { align: "center", color: "theme:on-accent", lineHeight: 1, slot: "day" })),
              T(U(tx), U(banner ? 41 : 36), U(banner ? 30 : 26), U(6), "Nov · Sat", kick(U(banner ? 3.4 : 3), { align: "center", color: "theme:on-accent", slot: "month" })),
              T(U(tx + (banner ? 36 : 32)), U(banner ? 18 : 14), U(W - pw - (banner ? 56 : 48)), U(6), "Live · 8 pm", kick(U(banner ? 4 : 3.2), { slot: "kicker" })),
              T(U(tx + (banner ? 36 : 32)), U(banner ? 25 : 20), U(W - pw - (banner ? 56 : 48)), U(40), "Late Night Jazz Session", disp(U(banner ? 10 : 8.4), { slot: "title" })),
              T(U(tx), U(H - (banner ? 20 : 16)), U(W - pw - 16), U(7), "The Lantern Room · Tickets at example.com", mono(U(banner ? 4 : 2.6), { color: "theme:muted", slot: "place" })),
            ],
          };
        },
      ),
    ],
  },
  {
    id: "weekend-sale",
    name: "Weekend Sale",
    theme: "ember",
    pages: [
      two(
        ({ H, U }) => ({
          els: [
            pat(0, 0, U(100), U(H), "confetti", U(6), { fill: "theme:accent2", opacity: 0.5, strokeW: U(0.6) }),
            T(U(6), U(H / 2 - 40), U(88), U(6), "This weekend only", kick(U(3.4), { align: "center", slot: "kicker" })),
            T(U(4), U(H / 2 - 33), U(92), U(40), "40%", disp(U(36), { align: "center", color: "theme:accent2", tracking: -0.06, slot: "offer" })),
            T(U(6), U(H / 2 + 4), U(88), U(12), "off everything", disp(U(9), { align: "center", slot: "title" })),
            S(U(26), U(H / 2 + 21), U(48), U(10), "pill", { fill: "theme:accent", slot: "pill" }),
            T(U(26), U(H / 2 + 21), U(48), U(10), "Sat and Sun · In store", mono(U(3), { align: "center", valign: "middle", weight: 700, color: "theme:on-accent", slot: "date" })),
          ],
        }),
        ({ W, H, U, banner }) => {
          // The number takes a fixed width; the words take what is left.
          const ox = banner ? W * 0.26 : 8,
            size = banner ? 48 : 44,
            rx = ox + size * 2.3,
            rw = W - rx - 10;
          return {
            els: [
              pat(0, 0, U(W), U(H), "confetti", U(6), { fill: "theme:accent2", opacity: 0.5, strokeW: U(0.6) }),
              T(U(ox), U(H / 2 - size * 0.6), U(size * 2.25), U(size * 1.2), "40%", disp(U(size), { color: "theme:accent2", tracking: -0.06, lineHeight: 1, slot: "offer" })),
              T(U(rx), U(banner ? 17 : 17), U(rw), U(8.5), "This weekend only", kick(U(banner ? 4.2 : 3.4), { slot: "kicker" })),
              T(U(rx), U(banner ? 27 : 26), U(rw), U(34), "off everything", disp(U(banner ? 12 : 11), { slot: "title" })),
              S(U(rx), U(H - (banner ? 28 : 26)), U(banner ? 70 : 56), U(banner ? 14 : 12), "pill", { fill: "theme:accent", slot: "pill" }),
              T(U(rx), U(H - (banner ? 28 : 26)), U(banner ? 70 : 56), U(banner ? 14 : 12), "Sat and Sun · In store", mono(U(banner ? 4.6 : 3.6), { align: "center", valign: "middle", weight: 700, color: "theme:on-accent", slot: "date" })),
            ],
          };
        },
      ),
    ],
  },
  {
    id: "quick-tip",
    name: "Quick Tip",
    theme: "mint",
    pages: [
      two(
        ({ H, U }) => ({
          els: [
            box(0, 0, U(100), U(14), "theme:accent"),
            pat(0, 0, U(100), U(14), "zigzag", U(3.4), { fill: "theme:on-accent", opacity: 0.25, strokeW: U(0.3) }),
            T(U(8), U(4), U(60), U(6), "Tip 03 · Writing", kick(U(3), { color: "theme:on-accent", slot: "kicker" })),
            T(U(70), U(3), U(22), U(8), "03", disp(U(7), { align: "right", color: "theme:on-accent", slot: "num" })),
            T(U(8), U(24), U(84), U(H - 52), "Write the headline last. It is easier once you know what you are saying.", disp(U(8.6), { weight: 800, lineHeight: 1.04, valign: H > 120 ? "middle" : "top", slot: "title" })),
            box(U(8), U(H - 22), U(84), U(0.4), "theme:line"),
            T(U(8), U(H - 17), U(60), U(5), "Save this for later", mono(U(2.8), { weight: 700, slot: "cta" })),
            T(U(60), U(H - 17), U(32), U(5), "@studiomartin", mono(U(2.8), { align: "right", color: "theme:muted", slot: "tag" })),
          ],
        }),
        ({ W, H, U, banner }) => ({
          els: [
            box(0, 0, U(banner ? W * 0.3 : 40), U(H), "theme:accent"),
            pat(0, 0, U(banner ? W * 0.3 : 40), U(H), "zigzag", U(4), { fill: "theme:on-accent", opacity: 0.25, strokeW: U(0.3) }),
            T(U(4), U(H / 2 - 27), U(banner ? W * 0.3 - 8 : 32), U(54), "03", disp(U(banner ? 40 : 24), { align: "center", valign: "middle", color: "theme:on-accent", slot: "num" })),
            T(U((banner ? W * 0.3 : 40) + 10), U(12), U(W * 0.55), U(6), "Tip 03 · Writing", kick(U(banner ? 4.6 : 3.4), { slot: "kicker" })),
            T(U((banner ? W * 0.3 : 40) + 10), U(22), U(W - (banner ? W * 0.3 : 40) - 20), U(56), "Write the headline last. It is easier once you know what you are saying.", disp(U(banner ? 10 : 8.2), { weight: 800, lineHeight: 1.04, slot: "title" })),
            T(U((banner ? W * 0.3 : 40) + 10), U(H - 17), U(70), U(7.5), "Save this for later", mono(U(banner ? 4.4 : 3.2), { weight: 700, slot: "cta" })),
          ],
        }),
      ),
    ],
  },
  {
    id: "customer-words",
    name: "Customer Words",
    theme: "sunrise",
    pages: [
      two(
        ({ H, U }) => ({
          els: [
            S(U(-20), U(H - 60), U(90), U(90), "ellipse", { fill: "theme:accent3", opacity: 0.35 }),
            S(U(34), U(10), U(32), U(32), "ring", { fill: "theme:accent", radius: U(0.9) }),
            photo(U(36.5), U(12.5), U(27), U(27), "photo", { mask: "circle" }),
            T(U(8), U(45), U(84), U(H - 76), "“A real sentence from a real customer, in their own words.”", disp(U(H > 120 ? 6.8 : 6), { align: "center", weight: 700, lineHeight: 1.1, valign: H > 120 ? "middle" : "top", slot: "quote" })),
            box(U(45), U(H - 30), U(10), U(0.7), "theme:accent"),
            T(U(8), U(H - 25), U(84), U(5), "Customer Name", head(U(3.6), { align: "center", slot: "who" })),
            T(U(8), U(H - 19), U(84), U(5), "What they bought or why it mattered", mono(U(2.6), { align: "center", color: "theme:muted", slot: "role" })),
          ],
        }),
        ({ W, H, U, banner }) => {
          const c = banner ? 62 : 54;
          const cx = banner ? W * 0.3 - c - 8 : 10;
          return {
            els: [
              S(U(W - 70), U(-30), U(110), U(110), "ellipse", { fill: "theme:accent3", opacity: 0.35 }),
              S(U(cx - 3), U((H - c) / 2 - 3), U(c + 6), U(c + 6), "ring", { fill: "theme:accent", radius: U(0.9) }),
              photo(U(cx), U((H - c) / 2), U(c), U(c), "photo", { mask: "circle" }),
              T(U(cx + c + 14), U(14), U(W - cx - c - 26), U(52), "“A real sentence from a real customer, in their own words.”", disp(U(banner ? 8.4 : 7), { weight: 700, lineHeight: 1.12, slot: "quote" })),
              box(U(cx + c + 14), U(H - 30), U(10), U(0.8), "theme:accent"),
              T(U(cx + c + 14), U(H - 25), U(W - cx - c - 26), U(6), "Customer Name", head(U(banner ? 5 : 4), { slot: "who" })),
              T(U(cx + c + 14), U(H - 16), U(W - cx - c - 26), U(6), "What they bought or why it mattered", mono(U(banner ? 3.8 : 3), { color: "theme:muted", slot: "role" })),
            ],
          };
        },
      ),
    ],
  },
  {
    id: "before-after",
    name: "Before and After",
    theme: "slate",
    pages: [
      two(
        ({ H, U }) => {
          const ph = (H - 40) / 2;
          return {
            els: [
              T(U(6), U(6), U(70), U(5), "Restoration", kick(U(2.8), { slot: "kicker" })),
              T(U(6), U(11), U(88), U(12), "The old chair, saved", disp(U(7.4), { slot: "title" })),
              ...[0, 1].flatMap((i) => [
                box(U(6), U(25 + i * (ph + 2)), U(88), U(ph), i ? "theme:accent" : "theme:muted", { radius: U(1.4) }),
                pat(U(6), U(25 + i * (ph + 2)), U(88), U(ph), "lines", U(3), { fill: "#ffffff", opacity: 0.25, strokeW: U(0.25) }),
                photo(U(6), U(25 + i * (ph + 2)), U(88), U(ph), i ? "photo2" : "photo", { radius: U(1.4) }),
                S(U(9), U(28 + i * (ph + 2)), U(22), U(7), "pill", { fill: i ? "theme:accent" : "theme:ink" }),
                T(U(9), U(28 + i * (ph + 2)), U(22), U(7), i ? "After" : "Before", mono(U(2.6), { align: "center", valign: "middle", weight: 700, color: i ? "theme:on-accent" : "theme:bg", slot: i ? "after" : "before" })),
              ]),
              T(U(6), U(H - 11), U(88), U(5), "Swipe for the full process", mono(U(2.6), { color: "theme:muted", slot: "cta" })),
            ],
          };
        },
        ({ W, H, U, banner }) => {
          const x0 = banner ? W * 0.32 : 6;
          const pw = (W - x0 - 6 - 3) / 2;
          return {
            els: [
              ...(banner
                ? [
                    T(U(8), U(22), U(x0 - 14), U(6), "Restoration", kick(U(4.4), { slot: "kicker" })),
                    T(U(8), U(32), U(x0 - 14), U(40), "The old chair, saved", disp(U(10), { slot: "title" })),
                  ]
                : []),
              ...[0, 1].flatMap((i) => [
                box(U(x0 + i * (pw + 3)), U(banner ? 8 : 6), U(pw), U(H - (banner ? 16 : 26)), i ? "theme:accent" : "theme:muted", { radius: U(1.4) }),
                pat(U(x0 + i * (pw + 3)), U(banner ? 8 : 6), U(pw), U(H - (banner ? 16 : 26)), "lines", U(3), { fill: "#ffffff", opacity: 0.25, strokeW: U(0.25) }),
                photo(U(x0 + i * (pw + 3)), U(banner ? 8 : 6), U(pw), U(H - (banner ? 16 : 26)), i ? "photo2" : "photo", { radius: U(1.4) }),
                S(U(x0 + 3 + i * (pw + 3)), U(banner ? 11 : 9), U(22), U(8), "pill", { fill: i ? "theme:accent" : "theme:ink" }),
                T(U(x0 + 3 + i * (pw + 3)), U(banner ? 11 : 9), U(22), U(8), i ? "After" : "Before", mono(U(3), { align: "center", valign: "middle", weight: 700, color: i ? "theme:on-accent" : "theme:bg", slot: i ? "after" : "before" })),
              ]),
              ...(banner ? [] : [T(U(6), U(H - 15), U(W - 12), U(10), "The old chair, saved", disp(U(7), { slot: "title" }))]),
            ],
          };
        },
      ),
    ],
  },
  {
    id: "new-post",
    name: "New Post",
    theme: "editorial",
    pages: [
      two(
        ({ H, U }) => {
          const ph = H * 0.52;
          return {
            els: [
              box(0, 0, U(100), U(ph), "theme:accent2"),
              pat(0, 0, U(100), U(ph), "topo", U(4), { fill: "#ffffff", opacity: 0.25, strokeW: U(0.15) }),
              photo(0, 0, U(100), U(ph)),
              T(U(8), U(ph + 6), U(60), U(5), "New on the blog", kick(U(2.8), { slot: "kicker" })),
              T(U(8), U(ph + 12), U(84), U(H - ph - 30), "Seven things we learned from our first year in business", disp(U(6.6), { weight: 300, tracking: -0.03, lineHeight: 1.05, slot: "title" })),
              box(U(8), U(H - 15), U(12), U(0.7), "theme:accent"),
              T(U(8), U(H - 12), U(84), U(5), "Read it at example.com/blog", mono(U(2.6), { slot: "cta" })),
            ],
          };
        },
        ({ W, H, U, banner }) => {
          const pw = banner ? W * 0.34 : W * 0.44;
          return {
            els: [
              box(0, 0, U(pw), U(H), "theme:accent2"),
              pat(0, 0, U(pw), U(H), "topo", U(4.5), { fill: "#ffffff", opacity: 0.25, strokeW: U(0.15) }),
              photo(0, 0, U(pw), U(H)),
              T(U(pw + 10), U(13), U(W - pw - 20), U(6), "New on the blog", kick(U(banner ? 4.4 : 3.4), { slot: "kicker" })),
              T(U(pw + 10), U(22), U(W - pw - 20), U(56), "Seven things we learned from our first year in business", disp(U(banner ? 9.6 : 7.6), { weight: 300, tracking: -0.03, lineHeight: 1.05, slot: "title" })),
              T(U(pw + 10), U(H - 15), U(W - pw - 20), U(6), "Read it at example.com/blog", mono(U(banner ? 4.2 : 3.2), { slot: "cta" })),
            ],
          };
        },
      ),
    ],
  },
  {
    id: "hiring",
    name: "Hiring",
    theme: "blueprint",
    pages: [
      two(
        ({ H, U }) => ({
          els: [
            pat(0, 0, U(100), U(H), "grid", U(6), { fill: "theme:line", opacity: 0.9, strokeW: U(0.12) }),
            box(U(8), U(10), U(32), U(7), "theme:accent2"),
            T(U(8), U(10), U(32), U(7), "We're hiring", kick(U(2.6), { align: "center", valign: "middle", color: "theme:on-accent2", slot: "kicker" })),
            T(U(8), U(24), U(84), U(30), "Junior Web Developer", disp(U(10), { slot: "title" })),
            T(U(8), U(56), U(80), U(16), "Remote or in Saint John. Help small businesses build things that work.", copy(U(3.2), { slot: "body" })),
            box(U(8), U(H - 24), U(84), U(0.4), "theme:line"),
            T(U(8), U(H - 18), U(60), U(6), "Apply by Dec 1", head(U(3.6), { slot: "date" })),
            T(U(50), U(H - 17), U(42), U(6), "example.com/jobs", mono(U(2.8), { align: "right", color: "theme:accent", slot: "url" })),
          ],
        }),
        ({ W, H, U, banner }) => {
          const x = banner ? W * 0.3 : 8;
          return {
            els: [
              pat(0, 0, U(W), U(H), "grid", U(6), { fill: "theme:line", opacity: 0.9, strokeW: U(0.12) }),
              box(U(x), U(12), U(banner ? 46 : 36), U(banner ? 10 : 8), "theme:accent2"),
              T(U(x), U(12), U(banner ? 46 : 36), U(banner ? 10 : 8), "We're hiring", kick(U(banner ? 4 : 3), { align: "center", valign: "middle", color: "theme:on-accent2", slot: "kicker" })),
              T(U(x), U(banner ? 28 : 26), U(W - x - 12), U(40), "Junior Web Developer", disp(U(banner ? 15 : 10.4), { slot: "title" })),
              T(U(x), U(H - (banner ? 24 : 30)), U(W - x - 12), U(10), "Apply by Dec 1 · example.com/jobs", mono(U(banner ? 5 : 3.6), { color: "theme:accent", slot: "url" })),
              ...(banner ? [] : [T(U(8), U(54), U(W * 0.6), U(14), "Remote or in Saint John. Help small businesses build things that work.", copy(U(3.4), { slot: "body" }))]),
            ],
          };
        },
      ),
    ],
  },
  {
    id: "big-stat",
    name: "Big Stat",
    theme: "ocean",
    pages: [
      two(
        ({ H, U }) => ({
          els: [
            S(U(40), U(-30), U(100), U(100), "ellipse", { fill: "theme:accent", opacity: 0.12 }),
            pat(U(54), U(6), U(40), U(30), "dots", U(3), { fill: "theme:accent2", opacity: 0.6 }),
            T(U(8), U(H / 2 - 34), U(84), U(6), "This year", kick(U(3), { slot: "kicker" })),
            T(U(6), U(H / 2 - 27), U(90), U(34), "1,240", disp(U(28), { color: "theme:accent", tracking: -0.06, slot: "num" })),
            T(U(8), U(H / 2 + 8), U(80), U(20), "orders packed and shipped by hand", disp(U(6.6), { weight: 700, slot: "title" })),
            T(U(8), U(H - 12), U(84), U(5), "Source: our order book, Jan to Dec", mono(U(2.4), { color: "theme:muted", slot: "note" })),
          ],
        }),
        ({ W, H, U, banner }) => {
          const x0 = banner ? W * 0.28 : 8,
            size = banner ? 36 : 30,
            rx = x0 + size * 2.75,
            rw = W - rx - 10;
          return {
            els: [
              S(U(W - 90), U(-40), U(130), U(130), "ellipse", { fill: "theme:accent", opacity: 0.12 }),
              T(U(x0), U(H / 2 - size * 0.62 - 4), U(size * 2.7), U(size * 1.2), "1,240", disp(U(size), { color: "theme:accent", tracking: -0.06, lineHeight: 1, slot: "num" })),
              T(U(rx), U(banner ? 22 : 22), U(rw), U(7), "This year", kick(U(banner ? 4.2 : 3.4), { slot: "kicker" })),
              T(U(rx), U(banner ? 31 : 30), U(rw), U(44), "orders packed and shipped by hand", disp(U(banner ? 8.4 : 7), { weight: 700, slot: "title" })),
              T(U(x0), U(H - 15), U(W - x0 - 10), U(7), "Source: our order book, Jan to Dec", mono(U(banner ? 3.8 : 3), { color: "theme:muted", slot: "note" })),
            ],
          };
        },
      ),
    ],
  },
  {
    id: "podcast",
    name: "Podcast Episode",
    theme: "forest",
    pages: [
      two(
        ({ H, U }) => {
          const bars = 26;
          const r = Math.min(76, H - 58);
          return {
            els: [
              box(0, 0, U(100), U(H), "theme:accent2", { opacity: 0.06 }),
              S(U(50 - r / 2), U(7), U(r), U(r), "ring", { fill: "theme:accent", radius: U(1.2) }),
              photo(U(50 - r / 2 + 3), U(10), U(r - 6), U(r - 6), "photo", { mask: "circle" }),
              T(U(8), U(r + 10), U(84), U(5), "Episode 24 · The Workshop Hour", kick(U(2.7), { align: "center", slot: "kicker" })),
              T(U(8), U(r + 15.5), U(84), U(18), "How a hobby became a business", disp(U(7), { align: "center", slot: "title" })),
              ...Array.from({ length: bars }, (_, i) => {
                const hh = 2 + 6 * Math.abs(Math.sin(i * 1.7) * Math.cos(i * 0.6));
                return S(U(12 + i * 3), U(H - 20 - hh / 2), U(1.6), U(hh), "pill", { fill: i < 10 ? "theme:accent" : "theme:line" });
              }),
              T(U(8), U(H - 12), U(84), U(5), "Listen wherever you get podcasts", mono(U(2.5), { align: "center", color: "theme:muted", slot: "cta" })),
            ],
          };
        },
        ({ W, H, U, banner }) => {
          const c = banner ? 64 : 60;
          const cx = banner ? W * 0.3 - c - 6 : 10;
          const tx = cx + c + 14;
          const bars = Math.floor((W - tx - 12) / 3.2);
          return {
            els: [
              box(0, 0, U(W), U(H), "theme:accent2", { opacity: 0.06 }),
              S(U(cx - 3), U((H - c) / 2 - 3), U(c + 6), U(c + 6), "ring", { fill: "theme:accent", radius: U(1.2) }),
              photo(U(cx), U((H - c) / 2), U(c), U(c), "photo", { mask: "circle" }),
              T(U(tx), U(14), U(W - tx - 12), U(6), "Episode 24 · The Workshop Hour", kick(U(banner ? 4.2 : 3.2), { slot: "kicker" })),
              T(U(tx), U(23), U(W - tx - 12), U(40), "How a hobby became a business", disp(U(banner ? 10.4 : 8.4), { slot: "title" })),
              ...Array.from({ length: Math.min(bars, 60) }, (_, i) => {
                const hh = 3 + 9 * Math.abs(Math.sin(i * 1.7) * Math.cos(i * 0.6));
                return S(U(tx + i * 3.2), U(H - 20 - hh / 2), U(1.8), U(hh), "pill", { fill: i < bars * 0.4 ? "theme:accent" : "theme:line" });
              }),
            ],
          };
        },
      ),
    ],
  },
  {
    id: "thumbnail",
    name: "Bold Thumbnail",
    theme: "magenta",
    pages: [
      two(
        ({ H, U }) => ({
          els: [
            box(0, 0, U(100), U(H), "theme:accent2"),
            pat(0, 0, U(100), U(H), "rays", 0, { fill: "#ffffff", opacity: 0.1 }),
            photo(U(20), U(H - 62), U(76), U(62), "photo", { radius: 0 }),
            S(U(5), U(10), U(84), U(15), "rect", { fill: "theme:accent", rot: -3 }),
            T(U(8), U(10), U(80), U(15), "I tried it", disp(U(8.4), { valign: "middle", color: "theme:on-accent", rot: -3, upper: true, slot: "title" })),
            S(U(5), U(27), U(88), U(15), "rect", { fill: "#ffffff", rot: -3 }),
            T(U(8), U(27), U(84), U(15), "for 30 days", disp(U(8.4), { valign: "middle", color: "#111111", rot: -3, upper: true, slot: "sub" })),
            S(U(70), U(48), U(24), U(16), "arrow", { fill: "#ffd400", rot: 30 }),
          ],
        }),
        ({ W, H, U }) => ({
          els: [
            box(0, 0, U(W), U(H), "theme:accent2"),
            pat(0, 0, U(W), U(H), "rays", 0, { fill: "#ffffff", opacity: 0.1 }),
            photo(U(W * 0.52), U(6), U(W * 0.46), U(H - 6), "photo", { radius: 0 }),
            S(U(4), U(16), U(W * 0.56), U(22), "rect", { fill: "theme:accent", rot: -3 }),
            T(U(7), U(16), U(W * 0.53), U(22), "I tried it", disp(U(10.5), { valign: "middle", color: "theme:on-accent", rot: -3, upper: true, slot: "title" })),
            S(U(4), U(42), U(W * 0.56), U(22), "rect", { fill: "#ffffff", rot: -3 }),
            T(U(7), U(42), U(W * 0.53), U(22), "for 30 days", disp(U(10.5), { valign: "middle", color: "#111111", rot: -3, upper: true, slot: "sub" })),
            S(U(W * 0.4), U(70), U(22), U(15), "arrow", { fill: "#ffd400", rot: -10 }),
            T(U(5), U(H - 22), U(W * 0.36), U(10), "Part 1", mono(U(5), { weight: 800, color: "#ffffff", slot: "tag" })),
          ],
        }),
      ),
    ],
  },
];

