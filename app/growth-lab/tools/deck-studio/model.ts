/**
 * Deck Studio data model. A deck is plain JSON: slides of absolutely
 * positioned elements on a fixed design canvas, so what you see in the editor
 * is what PowerPoint, the PDF and the HTML player receive.
 */

export type Ratio = "16:9" | "4:3" | "1:1" | "9:16";
export const RATIOS: Record<Ratio, { w: number; h: number; label: string }> = {
  "16:9": { w: 1280, h: 720, label: "Widescreen 16:9" },
  "4:3": { w: 1024, h: 768, label: "Standard 4:3" },
  "1:1": { w: 1080, h: 1080, label: "Square 1:1" },
  "9:16": { w: 720, h: 1280, label: "Story 9:16" },
};

export type FontRole = "heading" | "body" | "mono";
export type Anim = "none" | "fade" | "rise" | "zoom" | "left" | "right" | "pop";
export type Transition = "none" | "fade" | "slide" | "zoom" | "lift";
export type ShapeKind =
  | "rect"
  | "round"
  | "pill"
  | "ellipse"
  | "triangle"
  | "diamond"
  | "hexagon"
  | "star"
  | "arrow"
  | "chevron"
  | "line"
  | "blob"
  // Decorative cuts and SVG patterns for the design studios (2026-10-09). A
  // pattern's spacing is its `radius`; stroked patterns draw in the fill colour.
  | "wave"
  | "arch"
  | "ring"
  | "slant"
  | "quarter"
  | "dots"
  | "halftone"
  | "grid"
  | "lines"
  | "waves"
  | "rings"
  | "topo"
  | "rays"
  | "zigzag"
  | "plus"
  | "confetti";
export type ChartKind = "column" | "bar" | "line" | "area" | "pie" | "donut";

/** A colour is either a literal hex or a theme token, so a theme switch restyles the deck. */
export type Paint = string; // "#rrggbb" | "theme:ink" | "theme:accent" ...
export const TOKENS = ["ink", "muted", "bg", "surface", "accent", "accent2", "accent3", "line"] as const;
export type Token = (typeof TOKENS)[number];

type Base = {
  id: string;
  x: number;
  y: number;
  w: number;
  h: number;
  rot: number;
  opacity: number;
  locked?: boolean;
  anim: Anim;
  shadow: "none" | "soft" | "glow" | "lift";
  /** The design studios name a template's parts ("title", "photo") so a resize or a new template keeps your words and photos. */
  slot?: string;
};
export type TextEl = Base & {
  type: "text";
  text: string;
  font: FontRole;
  size: number;
  weight: number;
  color: Paint;
  align: "left" | "center" | "right";
  valign: "top" | "middle" | "bottom";
  italic: boolean;
  underline: boolean;
  upper: boolean;
  lineHeight: number;
  tracking: number;
  list: "none" | "bullet" | "number" | "check";
  fill: Paint | "";
  pad: number;
  radius: number;
  /** Business cards: the text is filled from the card details, e.g. "{name}" or "{phone}\n{email}". */
  bind?: string;
};
export type ShapeEl = Base & {
  type: "shape";
  shape: ShapeKind;
  fill: Paint | "";
  fill2: Paint | "";
  angle: number;
  stroke: Paint | "";
  strokeW: number;
  radius: number;
};
export type ImageEl = Base & {
  type: "image";
  src: string;
  fit: "cover" | "contain";
  radius: number;
  fx: number;
  fy: number;
  filter: "none" | "mono" | "warm" | "cool" | "dim" | "vivid";
  border: Paint | "";
  borderW: number;
  mask: "none" | "circle" | "arch" | "blob";
};
/** `paths` is the icon's own SVG markup, so a saved deck renders without the icon library. */
export type IconEl = Base & {
  type: "icon";
  name: string;
  paths: string;
  color: Paint;
  strokeW: number;
  fill: Paint | "";
  radius: number;
};
export type ChartEl = Base & {
  type: "chart";
  kind: ChartKind;
  labels: string[];
  series: { name: string; values: number[] }[];
  legend: boolean;
  values: boolean;
  color: Paint;
  grid: boolean;
};
export type TableEl = Base & {
  type: "table";
  rows: string[][];
  header: boolean;
  stripe: boolean;
  size: number;
  color: Paint;
  accent: Paint;
};
/** `bind` (business cards): the code encodes the card's website or its vCard. */
export type QrEl = Base & { type: "qr"; value: string; color: Paint; bg: Paint; bind?: "card" };
export type El = TextEl | ShapeEl | ImageEl | IconEl | ChartEl | TableEl | QrEl;
export type ElType = El["type"];

export type Background = {
  kind: "solid" | "gradient" | "image" | "mesh";
  color: Paint;
  color2: Paint;
  angle: number;
  image: string;
  dim: number;
};
export type Slide = { id: string; bg: Background; els: El[]; notes: string; transition: Transition; hidden?: boolean };
export type Deck = {
  v: 1;
  title: string;
  ratio: Ratio;
  /** A page that is not a slide ratio (the flyer, poster, social and card studios), in design units. */
  size?: { w: number; h: number };
  theme: string;
  /** Per-deck overrides of the theme. */
  colors: Partial<Record<Token, string>>;
  fonts: { heading: string; body: string };
  slides: Slide[];
};

/* ---------------------------------------------------------------- Themes */

export type Theme = {
  id: string;
  name: string;
  dark: boolean;
  colors: Record<Token, string>;
  heading: string;
  body: string;
  bg: Omit<Background, "image" | "dim">;
};

export const FONTS: { id: string; label: string; stack: string; pdf: "helvetica" | "times" | "courier"; pptx: string }[] = [
  { id: "geist", label: "Geist", stack: '"Geist Variable", "Geist", system-ui, sans-serif', pdf: "helvetica", pptx: "Arial" },
  { id: "geist-mono", label: "Geist Mono", stack: '"Geist Mono Variable", "Geist Mono", ui-monospace, monospace', pdf: "courier", pptx: "Consolas" },
  { id: "system", label: "System Sans", stack: 'system-ui, -apple-system, "Segoe UI", Roboto, sans-serif', pdf: "helvetica", pptx: "Segoe UI" },
  { id: "helvetica", label: "Helvetica", stack: '"Helvetica Neue", Helvetica, Arial, sans-serif', pdf: "helvetica", pptx: "Arial" },
  { id: "verdana", label: "Verdana", stack: "Verdana, Geneva, sans-serif", pdf: "helvetica", pptx: "Verdana" },
  { id: "trebuchet", label: "Trebuchet", stack: '"Trebuchet MS", "Lucida Grande", sans-serif', pdf: "helvetica", pptx: "Trebuchet MS" },
  { id: "georgia", label: "Georgia", stack: 'Georgia, "Times New Roman", serif', pdf: "times", pptx: "Georgia" },
  { id: "palatino", label: "Palatino", stack: '"Palatino Linotype", Palatino, "Book Antiqua", serif', pdf: "times", pptx: "Palatino Linotype" },
  { id: "times", label: "Times", stack: '"Times New Roman", Times, serif', pdf: "times", pptx: "Times New Roman" },
  { id: "courier", label: "Courier", stack: '"Courier New", Courier, monospace', pdf: "courier", pptx: "Courier New" },
];
export const fontFor = (id: string) => FONTS.find((f) => f.id === id) ?? FONTS[0];

const theme = (
  id: string,
  name: string,
  dark: boolean,
  c: Record<Token, string>,
  heading: string,
  body: string,
  bg: Theme["bg"],
): Theme => ({ id, name, dark, colors: c, heading, body, bg });

export const THEMES: Theme[] = [
  theme("studio", "Studio Paper", false,
    { ink: "#0a0a0a", muted: "#5c5c5c", bg: "#faf8f5", surface: "#ffffff", accent: "#04d9c4", accent2: "#ff2d92", accent3: "#ff6a00", line: "#e5e1da" },
    "geist", "geist", { kind: "solid", color: "theme:bg", color2: "theme:surface", angle: 160 }),
  theme("neon-night", "Neon Night", true,
    { ink: "#f5f5f5", muted: "#a3a3a3", bg: "#0b0d12", surface: "#151922", accent: "#04d9c4", accent2: "#ff2d92", accent3: "#18e36b", line: "#262b36" },
    "geist", "geist", { kind: "mesh", color: "#0b0d12", color2: "#102a2a", angle: 140 }),
  theme("ember", "Ember", true,
    { ink: "#fff7f0", muted: "#d6b9a6", bg: "#1a0d07", surface: "#2a160c", accent: "#ff6a00", accent2: "#ffc247", accent3: "#ff2d92", line: "#3d2416" },
    "geist", "geist", { kind: "gradient", color: "#1a0d07", color2: "#3a1404", angle: 135 }),
  theme("editorial", "Editorial", false,
    { ink: "#1b1a17", muted: "#6b665c", bg: "#f4efe6", surface: "#fffdf8", accent: "#b4232a", accent2: "#1f4e79", accent3: "#c99a2e", line: "#ddd4c4" },
    "georgia", "geist", { kind: "solid", color: "theme:bg", color2: "theme:surface", angle: 0 }),
  theme("forest", "Forest", false,
    { ink: "#0f2a1d", muted: "#4f6b5c", bg: "#f2f7f2", surface: "#ffffff", accent: "#18a058", accent2: "#0e7c86", accent3: "#e9a23b", line: "#d6e4d9" },
    "geist", "geist", { kind: "gradient", color: "#f2f7f2", color2: "#e0efe4", angle: 180 }),
  theme("magenta", "Magenta Pop", false,
    { ink: "#1d0b17", muted: "#6e4a62", bg: "#fff5fa", surface: "#ffffff", accent: "#ff2d92", accent2: "#7c3aed", accent3: "#04d9c4", line: "#f2d4e4" },
    "geist", "geist", { kind: "gradient", color: "#fff5fa", color2: "#f3e8ff", angle: 135 }),
  theme("ocean", "Deep Ocean", true,
    { ink: "#eef6ff", muted: "#9db4cc", bg: "#06192e", surface: "#0c2742", accent: "#38bdf8", accent2: "#04d9c4", accent3: "#f472b6", line: "#1d3b5c" },
    "geist", "geist", { kind: "gradient", color: "#06192e", color2: "#0b3a5e", angle: 160 }),
  theme("slate", "Slate Pro", false,
    { ink: "#0f172a", muted: "#64748b", bg: "#f8fafc", surface: "#ffffff", accent: "#2563eb", accent2: "#0ea5e9", accent3: "#f59e0b", line: "#e2e8f0" },
    "helvetica", "helvetica", { kind: "solid", color: "theme:bg", color2: "theme:surface", angle: 0 }),
  theme("noir", "Noir Gold", true,
    { ink: "#f7f3ea", muted: "#a8a196", bg: "#0d0c0a", surface: "#1a1814", accent: "#d4a843", accent2: "#f7f3ea", accent3: "#8c6d2c", line: "#2b2822" },
    "palatino", "geist", { kind: "solid", color: "theme:bg", color2: "theme:surface", angle: 0 }),
  theme("blueprint", "Blueprint", true,
    { ink: "#e8f1ff", muted: "#9fb7dd", bg: "#0b2a5b", surface: "#123a77", accent: "#7dd3fc", accent2: "#fde047", accent3: "#f9a8d4", line: "#2c58a0" },
    "geist-mono", "geist", { kind: "gradient", color: "#0b2a5b", color2: "#0e3a7a", angle: 180 }),
  theme("sunrise", "Sunrise", false,
    { ink: "#2a1306", muted: "#7a5a45", bg: "#fff8ef", surface: "#ffffff", accent: "#ff6a00", accent2: "#ff2d92", accent3: "#ffb703", line: "#f5dfc8" },
    "trebuchet", "geist", { kind: "gradient", color: "#fff8ef", color2: "#ffe9e2", angle: 160 }),
  theme("mint", "Mint Clean", false,
    { ink: "#06231f", muted: "#4b6e68", bg: "#f0fbf9", surface: "#ffffff", accent: "#04b8a6", accent2: "#18e36b", accent3: "#ff6a00", line: "#cdeee8" },
    "geist", "system", { kind: "solid", color: "theme:bg", color2: "theme:surface", angle: 0 }),
];
export const themeById = (id: string) => THEMES.find((t) => t.id === id) ?? THEMES[0];

export function palette(deck: Deck): Record<Token, string> {
  return { ...themeById(deck.theme).colors, ...deck.colors };
}
/** The canvas in design units: a slide ratio, or a page size. */
export const dims = (d: Pick<Deck, "ratio" | "size">) => d.size ?? RATIOS[d.ratio];

const luma = (hex: string) => {
  const c = [1, 3, 5].map((i) => parseInt(hex.slice(i, i + 2), 16) / 255).map((v) => (v <= 0.04 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4));
  return 0.2126 * c[0] + 0.7152 * c[1] + 0.0722 * c[2];
};
/** Resolve a paint to a hex colour for this deck. "theme:on-accent" is ink or paper, whichever reads on the accent. */
export function paint(deck: Deck, p: Paint | "" | undefined, fallback = "transparent"): string {
  if (!p) return fallback;
  if (p.startsWith("theme:on-")) {
    const c = palette(deck);
    const under = c[p.slice(9) as Token];
    if (!under) return fallback;
    const [a, b] = luma(c.ink) < luma(c.bg) ? [c.ink, c.bg] : [c.bg, c.ink];
    // Dark text unless the colour underneath is dark enough for light text to win.
    return luma(under) > 0.18 ? a : b;
  }
  if (p.startsWith("theme:")) return palette(deck)[p.slice(6) as Token] ?? fallback;
  return p;
}
export const fontStack = (deck: Deck, role: FontRole) =>
  role === "mono" ? fontFor("geist-mono").stack : fontFor(role === "heading" ? deck.fonts.heading : deck.fonts.body).stack;
export const fontId = (deck: Deck, role: FontRole) =>
  role === "mono" ? "geist-mono" : role === "heading" ? deck.fonts.heading : deck.fonts.body;

/* ---------------------------------------------------------------- Factories */

let counter = 0;
export const uid = () => `e${Date.now().toString(36)}${(counter++).toString(36)}${Math.random().toString(36).slice(2, 6)}`;

const base = (x: number, y: number, w: number, h: number): Base => ({
  id: uid(),
  x,
  y,
  w,
  h,
  rot: 0,
  opacity: 1,
  anim: "none",
  shadow: "none",
});

export function text(x: number, y: number, w: number, h: number, value: string, o: Partial<TextEl> = {}): TextEl {
  return {
    ...base(x, y, w, h),
    type: "text",
    text: value,
    font: "body",
    size: 24,
    weight: 400,
    color: "theme:ink",
    align: "left",
    valign: "top",
    italic: false,
    underline: false,
    upper: false,
    lineHeight: 1.35,
    tracking: 0,
    list: "none",
    fill: "",
    pad: 0,
    radius: 0,
    ...o,
  };
}
export function shape(x: number, y: number, w: number, h: number, kind: ShapeKind, o: Partial<ShapeEl> = {}): ShapeEl {
  return {
    ...base(x, y, w, h),
    type: "shape",
    shape: kind,
    fill: "theme:accent",
    fill2: "",
    angle: 135,
    stroke: "",
    strokeW: 0,
    radius: kind === "round" ? 24 : 0,
    ...o,
  };
}
export function image(x: number, y: number, w: number, h: number, src: string, o: Partial<ImageEl> = {}): ImageEl {
  return {
    ...base(x, y, w, h),
    type: "image",
    src,
    fit: "cover",
    radius: 16,
    fx: 50,
    fy: 50,
    filter: "none",
    border: "",
    borderW: 0,
    mask: "none",
    ...o,
  };
}
export function icon(x: number, y: number, s: number, name: string, paths: string, o: Partial<IconEl> = {}): IconEl {
  return { ...base(x, y, s, s), type: "icon", name, paths, color: "theme:accent", strokeW: 2, fill: "", radius: 16, ...o };
}
export function chart(x: number, y: number, w: number, h: number, o: Partial<ChartEl> = {}): ChartEl {
  return {
    ...base(x, y, w, h),
    type: "chart",
    kind: "column",
    labels: ["Q1", "Q2", "Q3", "Q4"],
    series: [{ name: "Revenue", values: [12, 19, 27, 41] }],
    legend: false,
    values: true,
    color: "theme:ink",
    grid: true,
    ...o,
  };
}
export function table(x: number, y: number, w: number, h: number, rows: string[][], o: Partial<TableEl> = {}): TableEl {
  return {
    ...base(x, y, w, h),
    type: "table",
    rows,
    header: true,
    stripe: true,
    size: 18,
    color: "theme:ink",
    accent: "theme:accent",
    ...o,
  };
}
export function qr(x: number, y: number, s: number, value: string, o: Partial<QrEl> = {}): QrEl {
  return { ...base(x, y, s, s), type: "qr", value, color: "theme:ink", bg: "theme:surface", ...o };
}

export function blankSlide(deck: Pick<Deck, "theme">, els: El[] = []): Slide {
  const t = themeById(deck.theme);
  return { id: uid(), bg: { ...t.bg, image: "", dim: 0 }, els, notes: "", transition: "fade" };
}

export function cloneEl<T extends El>(el: T, dx = 24, dy = 24): T {
  // A copy is yours, not the template's part (design studios), so it carries no slot.
  const { slot: _slot, ...copy } = structuredClone(el);
  return { ...copy, id: uid(), x: el.x + dx, y: el.y + dy } as T;
}
export function cloneSlide(s: Slide): Slide {
  return { ...structuredClone(s), id: uid(), els: s.els.map((e) => ({ ...structuredClone(e), id: uid() })) };
}

/** A deck's content with its random ids removed, so two builds of one template compare equal. */
export const deckSignature = (d: Deck) => JSON.stringify(d, (k, v) => (k === "id" ? undefined : v));

/* ---------------------------------------------------------------- Validation */

const ELTYPES = ["text", "shape", "image", "icon", "chart", "table", "qr"];
// A deck file can come from anywhere, and these values reach SVG markup and CSS,
// so every colour, id, image and icon is checked against a strict shape.
const PAINT = /^(#[0-9a-f]{6}|theme:(ink|muted|bg|surface|accent|accent2|accent3|line|on-accent|on-accent2|on-accent3))?$/i;
const ID = /^[a-z0-9_-]{1,40}$/i;
const DATA_IMAGE = /^(data:image\/(png|jpeg|webp|gif);base64,[A-Za-z0-9+/=]+)?$/;
// No event-handler attributes: an imported .deck file must never carry script into the page.
const ICON_MARKUP = /^(<(path|circle|rect|line|polyline|polygon|ellipse)( (?!on)[a-z][a-z-]*="[^"<>&]*")*\/>)*$/;
const PAINT_KEYS = ["color", "fill", "fill2", "stroke", "border", "accent", "bg"] as const;
// Shapes, charts and QR codes are drawn as SVG strings, so a numeric field that
// arrives as text ("1\" onload=\"...") would reach an attribute. Every number, enum, list
// and string a drawing function reads is checked here, so a bad file is refused whole
// and nothing is cleaned up on the way in.
const NUMERIC_KEYS = ["size", "weight", "lineHeight", "tracking", "pad", "radius", "angle", "strokeW", "fx", "fy", "borderW"];
const BOOLEAN_KEYS = ["italic", "underline", "upper", "header", "stripe", "legend", "values", "grid", "locked"];
const ENUMS: Record<string, readonly string[]> = {
  anim: ["none", "fade", "rise", "zoom", "left", "right", "pop"],
  shadow: ["none", "soft", "glow", "lift"],
  font: ["heading", "body", "mono"],
  align: ["left", "center", "right"],
  valign: ["top", "middle", "bottom"],
  list: ["none", "bullet", "number", "check"],
  fit: ["cover", "contain"],
  filter: ["none", "mono", "warm", "cool", "dim", "vivid"],
  mask: ["none", "circle", "arch", "blob"],
  kind: ["column", "bar", "line", "area", "pie", "donut"],
  shape: ["rect", "round", "pill", "ellipse", "triangle", "diamond", "hexagon", "star", "arrow", "chevron", "line", "blob", "wave", "arch", "ring", "slant", "quarter", "dots", "halftone", "grid", "lines", "waves", "rings", "topo", "rays", "zigzag", "plus", "confetti"],
};
const shortText = (v: unknown, max: number) => typeof v === "string" && v.length <= max;
const finite = (v: unknown) => typeof v === "number" && Number.isFinite(v) && Math.abs(v) <= 1e6;
function safeEl(e: Record<string, unknown>): boolean {
  if (!ID.test(String(e.id))) return false;
  for (const k of PAINT_KEYS) if (k in e && typeof e[k] === "string" && !PAINT.test(e[k] as string)) return false;
  if (e.type === "image" && !DATA_IMAGE.test(String(e.src))) return false;
  if (e.type === "icon" && (typeof e.paths !== "string" || e.paths.length > 20000 || !ICON_MARKUP.test(e.paths))) return false;
  for (const k of NUMERIC_KEYS) if (k in e && !finite(e[k])) return false;
  for (const k of BOOLEAN_KEYS) if (k in e && typeof e[k] !== "boolean") return false;
  for (const [k, allowed] of Object.entries(ENUMS)) if (k in e && !allowed.includes(String(e[k]))) return false;
  if ("slot" in e && !(typeof e.slot === "string" && /^[~a-z0-9_-]{1,40}$/i.test(e.slot))) return false;
  if ("bind" in e && !shortText(e.bind, 100)) return false;
  if ("text" in e && !shortText(e.text, 20000)) return false;
  if ("name" in e && !shortText(e.name, 200)) return false;
  if (e.type === "qr" && (!shortText(e.value, 2000) || (e.bind !== undefined && e.bind !== "card"))) return false;
  if (e.type === "chart") {
    const { labels, series } = e as { labels?: unknown; series?: unknown };
    if (!Array.isArray(labels) || labels.length > 100 || !labels.every((l) => shortText(l, 200))) return false;
    if (!Array.isArray(series) || series.length > 12) return false;
    for (const s of series as { name?: unknown; values?: unknown }[]) {
      if (!s || !shortText(s.name, 200) || !Array.isArray(s.values) || s.values.length > 200 || !s.values.every(finite)) return false;
    }
  }
  if (e.type === "table") {
    const rows = e.rows;
    if (!Array.isArray(rows) || rows.length > 100) return false;
    for (const r of rows) if (!Array.isArray(r) || r.length > 20 || !r.every((c) => shortText(c, 500))) return false;
  }
  return true;
}
export function isDeck(v: unknown): v is Deck {
  if (!v || typeof v !== "object") return false;
  const d = v as Deck;
  return (
    d.v === 1 &&
    typeof d.title === "string" &&
    d.title.length <= 200 &&
    Object.hasOwn(RATIOS, d.ratio) &&
    (d.size === undefined ||
      (!!d.size && [d.size.w, d.size.h].every((n) => typeof n === "number" && Number.isFinite(n) && n >= 16 && n <= 20000))) &&
    typeof d.theme === "string" &&
    !!d.colors &&
    typeof d.colors === "object" &&
    Object.values(d.colors).every((c) => typeof c === "string" && /^#[0-9a-f]{6}$/i.test(c)) &&
    !!d.fonts &&
    typeof d.fonts.heading === "string" &&
    typeof d.fonts.body === "string" &&
    Array.isArray(d.slides) &&
    d.slides.length > 0 &&
    d.slides.length <= 200 &&
    d.slides.every(
      (s) =>
        s &&
        typeof s.id === "string" &&
        !!s.bg &&
        PAINT.test(String(s.bg.color)) &&
        PAINT.test(String(s.bg.color2)) &&
        DATA_IMAGE.test(String(s.bg.image ?? "")) &&
        typeof s.bg.angle === "number" &&
        typeof s.bg.dim === "number" &&
        typeof s.notes === "string" &&
        Array.isArray(s.els) &&
        s.els.length <= 300 &&
        s.els.every(
          (e) =>
            e &&
            ELTYPES.includes(e.type) &&
            typeof e.id === "string" &&
            [e.x, e.y, e.w, e.h, e.rot, e.opacity].every((n) => typeof n === "number" && Number.isFinite(n)) &&
            safeEl(e as unknown as Record<string, unknown>),
        ),
    )
  );
}
