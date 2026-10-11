import { image, shape, text, type El, type ShapeKind } from "./model";

type Copy = { title: string; kicker: string; sub: string };
const block = (x: number, y: number, w: number, h: number, kind: ShapeKind = "rect", fill = "theme:accent", opacity = 1): El =>
  shape(x, y, w, h, kind, { fill, fill2: kind === "blob" ? "theme:accent2" : "", opacity, radius: 28, locked: true });
const heading = (c: Copy, x: number, y: number, w: number, h: number, size = 84, extra = {}) =>
  text(x, y, w, h, c.title, { font: "heading", size, weight: 850, tracking: -0.035, lineHeight: 1.04, ...extra });
const label = (value: string, x: number, y: number, w = 800) =>
  text(x, y, w, 36, value, { font: "mono", size: 18, upper: true, tracking: 0.16, color: "theme:accent" });
const detail = (c: Copy, x: number, y: number, w = 720) =>
  text(x, y, w, Math.min(100, 704 - y), c.sub, { size: 26, lineHeight: 1.4, color: "theme:muted" });
const photo = (x: number, y: number, w: number, h: number) => image(x, y, w, h, "", { radius: 0 });

/** Each template has a composition of its own. Empty frames use the visitor's photo. */
export const COVERS: Record<string, (c: Copy) => El[]> = {
  investor: (c) => [
    block(926, 80, 260, 260, "rings", "theme:accent", 0.6),
    block(88, 100, 12, 500), label(c.kicker, 132, 102),
    heading(c, 132, 200, 870, 285, 94), detail(c, 136, 526),
    block(1040, 510, 150, 150, "plus", "theme:accent2", 0.35),
  ],
  proposal: (c) => [
    photo(760, 0, 520, 720), block(760, 0, 520, 720, "lines", "theme:accent", 0.12),
    label(c.kicker, 70, 100, 640), heading(c, 70, 202, 620, 270, 72),
    block(70, 520, 170, 4), detail(c, 70, 560, 610),
  ],
  launch: (c) => [
    block(820, 0, 460, 720, "slant", "theme:accent2", 0.22),
    block(920, 68, 240, 240, "star"), block(1030, 400, 140, 140, "ellipse", "theme:accent3"),
    label(c.kicker, 80, 94), heading(c, 80, 210, 760, 280, 108),
    detail(c, 80, 558, 720),
  ],
  quarterly: (c) => [
    block(0, 0, 540, 720, "rect", "theme:surface"),
    text(50, 170, 440, 300, "Q3", { font: "heading", size: 238, weight: 900, color: "theme:accent", lineHeight: 1 }),
    block(50, 550, 440, 3, "rect", "theme:line"),
    label(c.kicker, 610, 155, 580), heading(c, 610, 246, 580, 240, 76),
    detail(c, 610, 540, 550),
  ],
  portfolio: (c) => [
    photo(0, 0, 1280, 720), block(0, 0, 1280, 720, "topo", "theme:accent", 0.12),
    block(0, 420, 1280, 300, "rect", "theme:bg"), label(c.kicker, 64, 450),
    heading(c, 64, 500, 1100, 100, 82), detail(c, 64, 622, 1060),
  ],
  workshop: (c) => [
    label(c.kicker, 80, 70), heading(c, 80, 140, 1040, 185, 66),
    ...[0, 1, 2].flatMap((i) => [
      block(80 + i * 388, 385, 350, 240, "rect", "theme:surface"),
      block(110 + i * 388, 419, 94, 94, ["ellipse", "triangle", "hexagon"][i] as ShapeKind),
      text(230 + i * 388, 446, 150, 90, String(i + 1).padStart(2, "0"), { font: "mono", size: 54, weight: 600 }),
    ]),
    detail(c, 80, 640, 1100),
  ],
  event: (c) => [
    block(660, 0, 620, 720, "rays", "theme:accent2", 0.25),
    text(70, 65, 450, 220, "14", { font: "heading", size: 238, weight: 900, lineHeight: 1, color: "theme:accent" }),
    label(c.kicker, 78, 300), heading(c, 78, 378, 1060, 185, 108), detail(c, 80, 610),
  ],
  "case-study": (c) => [
    block(0, 0, 1280, 18), label(c.kicker, 80, 90),
    heading(c, 80, 175, 870, 250, 84),
    block(970, 165, 200, 200, "ring", "theme:accent2"),
    block(80, 495, 1120, 2, "rect", "theme:line"), detail(c, 80, 545, 1040),
  ],
  editorial: (c) => [
    label(c.kicker, 72, 58), block(72, 116, 1136, 3, "rect", "theme:ink"),
    heading(c, 72, 158, 1090, 185, 80, { weight: 400 }),
    block(72, 375, 1136, 1, "rect", "theme:ink"),
    detail(c, 72, 425, 405), photo(535, 425, 305, 220),
    block(878, 425, 2, 220, "rect", "theme:line"),
    block(922, 430, 240, 215, "lines", "theme:accent", 0.35),
  ],
  "brand-book": (c) => [
    block(750, -70, 530, 820, "blob", "theme:accent", 0.18),
    block(920, 150, 260, 260, "ellipse", "theme:accent2", 0.35),
    label(c.kicker, 80, 95), heading(c, 80, 222, 760, 250, 102), detail(c, 80, 550),
    block(80, 670, 220, 8, "rect", "theme:accent2"),
  ],
  research: (c) => [
    block(800, 0, 480, 720, "grid", "theme:line"),
    block(870, 180, 240, 240, "hexagon", "theme:accent", 0.4),
    block(940, 250, 100, 100, "plus", "theme:accent2"),
    label(c.kicker, 74, 116, 680), heading(c, 74, 220, 665, 270, 78, { font: "mono", weight: 600 }),
    detail(c, 74, 558, 650),
  ],
  architecture: (c) => [
    photo(740, 60, 470, 600), block(740, 60, 470, 600, "arch", "theme:accent", 0.16),
    label(c.kicker, 70, 100), heading(c, 70, 220, 610, 280, 80, { weight: 400 }),
    block(70, 555, 80, 3), detail(c, 70, 590, 610),
  ],
  lookbook: (c) => [
    photo(60, 60, 330, 600), photo(412, 60, 330, 290), photo(412, 370, 330, 290),
    label(c.kicker, 805, 80, 400), heading(c, 805, 188, 405, 275, 70, { weight: 400 }),
    detail(c, 805, 535, 395),
  ],
  manifesto: (c) => [
    block(0, 0, 1280, 720, "dots", "theme:accent", 0.08),
    block(270, 90, 740, 540, "rect", "theme:surface"),
    label(c.kicker, 320, 142, 640),
    heading(c, 320, 225, 640, 260, 76, { align: "center", weight: 500 }),
    text(320, 536, 640, 90, c.sub, { size: 24, align: "center", color: "theme:muted" }),
  ],
  roadmap: (c) => [
    label(c.kicker, 80, 75), heading(c, 80, 152, 1040, 185, 82),
    block(120, 487, 1040, 4, "rect", "theme:line"),
    ...[0, 1, 2, 3].flatMap((i) => [
      block(108 + i * 340, 469, 40, 40, "ellipse", i % 2 ? "theme:accent2" : "theme:accent"),
      text(96 + i * 340, 535, 120, 66, String(i + 1).padStart(2, "0"), { font: "mono", size: 42, color: "theme:muted" }),
    ]),
    detail(c, 80, 632, 1040),
  ],
  geometric: (c) => [
    block(0, 0, 400, 720, "rect", "theme:surface"),
    block(40, 120, 320, 320, "quarter"), block(90, 500, 220, 140, "zigzag", "theme:accent2"),
    label(c.kicker, 470, 110, 700), heading(c, 470, 230, 735, 265, 88),
    detail(c, 470, 565, 710),
  ],
};
