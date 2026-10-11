import { iconPaths } from "./icons";
import { frContent } from "./content-fr";
import { COVERS } from "./covers";
import {
  RATIOS,
  blankSlide,
  chart,
  icon,
  image,
  qr,
  shape,
  table,
  text,
  themeById,
  type Deck,
  type El,
  type Ratio,
  type Slide,
} from "./model";

/*
 * Layouts are designed on the 1280 x 720 canvas and scaled to other ratios.
 * Every one carries real hierarchy: a mono kicker, a heavy headline, a body
 * measure that reads, and one accent doing one job.
 */

const W = 1280,
  H = 720,
  M = 88; // outer margin

const kicker = (x: number, y: number, label: string, w = 600) =>
  text(x, y, w, 26, label, { font: "mono", size: 15, weight: 600, upper: true, tracking: 0.18, color: "theme:accent" });
const title = (x: number, y: number, w: number, h: number, value: string, size = 64) =>
  text(x, y, w, h, value, { font: "heading", size, weight: 850, lineHeight: 1.02, tracking: -0.03, anim: "rise" });
const body = (x: number, y: number, w: number, h: number, value: string, size = 24) =>
  text(x, y, w, h, value, { size, color: "theme:muted", lineHeight: 1.45, anim: "fade" });
const rule = (x: number, y: number, w = 72) => shape(x, y, w, 6, "pill", { fill: "theme:accent" });
const glow = (x: number, y: number, s: number, a = "theme:accent", b = "theme:accent2") =>
  shape(x, y, s, s, "blob", { fill: a, fill2: b, opacity: 0.18, angle: 135 });
const card = (x: number, y: number, w: number, h: number) =>
  shape(x, y, w, h, "round", { fill: "theme:surface", stroke: "theme:line", strokeW: 1.5, radius: 22, shadow: "soft" });
const photo = (x: number, y: number, w: number, h: number, o = {}) => image(x, y, w, h, "", { radius: 24, ...o });
const pageNo = (n: number) =>
  text(W - M - 80, H - 54, 80, 22, String(n).padStart(2, "0"), { font: "mono", size: 13, align: "right", color: "theme:muted" });

export type LayoutId =
  | "cover"
  | "section"
  | "agenda"
  | "statement"
  | "imageRight"
  | "imageLeft"
  | "features"
  | "stats"
  | "quote"
  | "timeline"
  | "team"
  | "chart"
  | "comparison"
  | "pricing"
  | "gallery"
  | "problem"
  | "bigNumber"
  | "closing"
  | "blank";

type Content = Record<string, unknown>;
const str = (c: Content, k: string, d: string) => (typeof c[k] === "string" ? (c[k] as string) : d);
const list = <T>(c: Content, k: string, d: T[]) => (Array.isArray(c[k]) ? (c[k] as T[]) : d);

/** Coaching notes: what to say on each kind of slide (shown in presenter view). */
export const LAYOUT_NOTES: Partial<Record<LayoutId, string>> = {
  cover: "Introduce yourself in one breath, then say the one-line idea. Pause before moving on.",
  section: "Say why this section matters before you open it.",
  agenda: "Promise the audience what they will know by the end. Keep it under thirty seconds.",
  statement: "Read it once, slowly. Let it land, then prove it on the next slides.",
  imageRight: "Tell one short story about a real customer living this.",
  imageLeft: "Explain the approach as what changes for the customer, not how it works inside.",
  features: "One sentence per feature. Point to the one that matters most for this audience.",
  stats: "Say where each number comes from. Numbers without a source lose the room.",
  quote: "Read the quote in the customer’s voice, then say who they are.",
  timeline: "Walk left to right. Name the milestone you are most confident about.",
  team: "Say why each person is the right one for this, in a single line each.",
  chart: "Name the period and the source first, then the one thing the chart proves.",
  comparison: "Be fair to the alternatives. Credibility comes from what you admit.",
  pricing: "Recommend one plan and say who it is for.",
  gallery: "Pick one piece and tell its story. Let the others speak for themselves.",
  problem: "Spend more time on the problem than the solution. If they feel it, they will want the fix.",
  bigNumber: "Say the number, then the source, then stop for a beat.",
  closing: "Make the ask out loud, with a date. Then stop talking and wait.",
};

export const LAYOUTS: Record<LayoutId, { name: string; build: (c: Content, n: number) => El[] }> = {
  cover: {
    name: "Cover",
    build: (c) => [
      glow(760, -160, 720),
      glow(-260, 420, 520, "theme:accent2", "theme:accent3"),
      kicker(M, 150, str(c, "kicker", "Company Name · 2026")),
      title(M, 196, 860, 250, str(c, "title", "A Clear Name for the Big Idea"), 84),
      body(M, 462, 700, 110, str(c, "sub", "One sentence that tells the room what changes because you exist."), 28),
      rule(M, 600, 120),
      text(M, 626, 600, 26, str(c, "who", "Presented by Your Name"), { font: "mono", size: 15, color: "theme:muted" }),
    ],
  },
  section: {
    name: "Section Break",
    build: (c) => [
      text(M, 120, 420, 300, str(c, "num", "01"), { font: "heading", size: 260, weight: 900, color: "theme:accent", opacity: 0.9, lineHeight: 1, tracking: -0.06, anim: "zoom" }),
      title(M, 430, 900, 150, str(c, "title", "Where We Start"), 72),
      body(M, 580, 760, 70, str(c, "sub", "A short line that frames the next few slides."), 26),
      glow(880, 80, 520),
    ],
  },
  agenda: {
    name: "Agenda",
    build: (c, n) => {
      const items = list<string>(c, "items", ["The problem", "Our approach", "Proof so far", "The plan", "The ask"]);
      const els: El[] = [kicker(M, 96, str(c, "kicker", "Agenda")), title(M, 132, 520, 260, str(c, "title", "What We Will Cover"), 64), rule(M, 400)];
      items.slice(0, 6).forEach((it, i) => {
        const y = 110 + i * 92;
        els.push(
          text(660, y, 90, 60, String(i + 1).padStart(2, "0"), { font: "mono", size: 30, weight: 700, color: "theme:accent", anim: "left" }),
          text(760, y + 4, 440, 60, it, { font: "heading", size: 32, weight: 700, anim: "left" }),
          shape(760, y + 70, 440, 2, "rect", { fill: "theme:line" }),
        );
      });
      els.push(pageNo(n));
      return els;
    },
  },
  statement: {
    name: "Big Statement",
    build: (c, n) => [
      glow(380, 60, 620),
      text(M, 170, W - 2 * M, 330, str(c, "title", "We make the hard part of your week disappear."), { font: "heading", size: 76, weight: 850, align: "center", valign: "middle", lineHeight: 1.05, tracking: -0.03, anim: "rise" }),
      text(M, 520, W - 2 * M, 50, str(c, "sub", "Say it in one breath. Then prove it."), { size: 26, align: "center", color: "theme:muted", anim: "fade" }),
      pageNo(n),
    ],
  },
  imageRight: {
    name: "Text + Photo",
    build: (c, n) => [
      kicker(M, 110, str(c, "kicker", "The Problem")),
      title(M, 146, 540, 200, str(c, "title", "Teams lose a day a week to manual work"), 54),
      text(M, 370, 520, 260, list<string>(c, "bullets", ["Quotes rebuilt by hand every time", "Files scattered across three tools", "Nobody can see where a job stands"]).join("\n"), { size: 24, list: "check", color: "theme:ink", anim: "fade" }),
      photo(700, 80, 492, 560, { shadow: "lift" }),
      pageNo(n),
    ],
  },
  imageLeft: {
    name: "Photo + Text",
    build: (c, n) => [
      photo(0, 0, 560, H, { radius: 0 }),
      kicker(640, 140, str(c, "kicker", "Our Approach")),
      title(640, 176, 560, 200, str(c, "title", "One place for every job, start to finish"), 54),
      body(640, 400, 540, 200, str(c, "body", "Describe the approach in two or three sentences. Keep it about the outcome for the customer, not the machinery behind it."), 24),
      pageNo(n),
    ],
  },
  features: {
    name: "Three Features",
    build: (c, n) => {
      const items = list<{ icon: string; title: string; body: string }>(c, "items", [
        { icon: "zap", title: "Fast", body: "Set up in an afternoon, not a quarter." },
        { icon: "shield-check", title: "Private", body: "Your data stays where you put it." },
        { icon: "trending-up", title: "Proven", body: "Measured against the old way, every week." },
      ]);
      const els: El[] = [kicker(M, 90, str(c, "kicker", "Why It Works")), title(M, 126, 900, 120, str(c, "title", "Three things that set it apart"), 54)];
      items.slice(0, 3).forEach((it, i) => {
        const x = M + i * 376;
        els.push(
          card(x, 300, 344, 320),
          shape(x + 32, 332, 72, 72, "round", { fill: "theme:accent", radius: 20, opacity: 0.16 }),
          icon(x + 50, 350, 36, it.icon, iconPaths(it.icon), { anim: "pop" }),
          text(x + 32, 430, 280, 44, it.title, { font: "heading", size: 30, weight: 800 }),
          body(x + 32, 482, 290, 120, it.body, 20),
        );
      });
      els.push(pageNo(n));
      return els;
    },
  },
  stats: {
    name: "Key Numbers",
    build: (c, n) => {
      const items = list<{ value: string; label: string }>(c, "items", [
        { value: "3x", label: "faster quoting" },
        { value: "42%", label: "fewer missed follow-ups" },
        { value: "$0", label: "to start" },
      ]);
      const els: El[] = [kicker(M, 96, str(c, "kicker", "Traction")), title(M, 132, 1000, 120, str(c, "title", "The numbers so far"), 54)];
      items.slice(0, 3).forEach((it, i) => {
        const x = M + i * 376;
        els.push(
          shape(x, 300, 4, 260, "rect", { fill: i === 0 ? "theme:accent" : i === 1 ? "theme:accent2" : "theme:accent3" }),
          text(x + 30, 300, 330, 150, it.value, { font: "heading", size: 110, weight: 900, tracking: -0.05, lineHeight: 1, anim: "rise" }),
          text(x + 30, 460, 300, 90, it.label, { size: 24, color: "theme:muted", anim: "fade" }),
        );
      });
      els.push(body(M, 610, 900, 40, str(c, "note", "Source: replace with where each number comes from."), 15), pageNo(n));
      return els;
    },
  },
  quote: {
    name: "Quote",
    build: (c, n) => [
      icon(M, 110, 90, "quote", iconPaths("quote"), { color: "theme:accent", strokeW: 1.6 }),
      text(M, 220, 1040, 280, str(c, "quote", "Put a real sentence from a real customer here, in their own words."), { font: "heading", size: 50, weight: 700, lineHeight: 1.18, tracking: -0.02, anim: "fade" }),
      rule(M, 540, 60),
      text(M, 566, 700, 34, str(c, "who", "Name Surname"), { font: "heading", size: 24, weight: 700 }),
      text(M, 600, 700, 30, str(c, "role", "Role, Company"), { size: 20, color: "theme:muted" }),
      glow(900, 300, 520),
      pageNo(n),
    ],
  },
  timeline: {
    name: "Timeline",
    build: (c, n) => {
      const items = list<{ when: string; what: string }>(c, "items", [
        { when: "Q1", what: "Pilot with five customers" },
        { when: "Q2", what: "Launch self-serve" },
        { when: "Q3", what: "Open two new regions" },
        { when: "Q4", what: "Break even" },
      ]);
      const els: El[] = [kicker(M, 96, str(c, "kicker", "Roadmap")), title(M, 132, 1000, 120, str(c, "title", "Where we go from here"), 54), shape(M, 400, W - 2 * M, 4, "pill", { fill: "theme:line" })];
      const step = (W - 2 * M) / items.length;
      items.slice(0, 5).forEach((it, i) => {
        const x = M + i * step;
        els.push(
          shape(x, 386, 32, 32, "ellipse", { fill: "theme:accent", shadow: "glow", anim: "pop" }),
          text(x, 440, step - 30, 40, it.when, { font: "mono", size: 18, weight: 700, color: "theme:accent", upper: true, tracking: 0.1 }),
          text(x, 482, step - 30, 120, it.what, { font: "heading", size: 26, weight: 700, lineHeight: 1.2, anim: "rise" }),
        );
      });
      els.push(pageNo(n));
      return els;
    },
  },
  team: {
    name: "Team",
    build: (c, n) => {
      const items = list<{ name: string; role: string }>(c, "items", [
        { name: "Name Surname", role: "Founder · Product" },
        { name: "Name Surname", role: "Engineering" },
        { name: "Name Surname", role: "Sales" },
        { name: "Name Surname", role: "Operations" },
      ]);
      const els: El[] = [kicker(M, 90, str(c, "kicker", "Team")), title(M, 126, 1000, 120, str(c, "title", "The people doing the work"), 54)];
      const cw = (W - 2 * M - 3 * 32) / 4;
      items.slice(0, 4).forEach((it, i) => {
        const x = M + i * (cw + 32);
        els.push(
          photo(x, 290, cw, cw, { mask: "circle", anim: "zoom" }),
          text(x, 300 + cw, cw, 36, it.name, { font: "heading", size: 24, weight: 800, align: "center" }),
          text(x, 338 + cw, cw, 30, it.role, { size: 18, align: "center", color: "theme:muted" }),
        );
      });
      els.push(pageNo(n));
      return els;
    },
  },
  chart: {
    name: "Chart",
    build: (c, n) => [
      kicker(M, 110, str(c, "kicker", "Growth")),
      title(M, 146, 400, 220, str(c, "title", "Revenue doubled every quarter"), 50),
      body(M, 390, 380, 200, str(c, "body", "Explain the one thing the chart proves. Name the period and the source."), 22),
      card(540, 90, 652, 540),
      chart(580, 130, 580, 460, { anim: "rise", ...(c.chart as object) }),
      pageNo(n),
    ],
  },
  comparison: {
    name: "Comparison",
    build: (c, n) => [
      kicker(M, 90, str(c, "kicker", "Compared")),
      title(M, 126, 1000, 110, str(c, "title", "How we stack up"), 54),
      table(M, 270, W - 2 * M, 360, list<string[]>(c, "rows", [
        ["", "Us", "Option A", "Option B"],
        ["Price to start", "Free", "$29 / month", "$99 / month"],
        ["Works offline", "Yes", "No", "Partly"],
        ["Your data stays yours", "Yes", "No", "No"],
        ["Setup time", "Minutes", "Days", "Weeks"],
      ]), { size: 22, anim: "fade" }),
      pageNo(n),
    ],
  },
  pricing: {
    name: "Pricing",
    build: (c, n) => {
      const tiers = list<{ name: string; price: string; points: string }>(c, "tiers", [
        { name: "Starter", price: "$0", points: "One user\nCore features\nEmail support" },
        { name: "Team", price: "$49", points: "Up to ten users\nEverything in Starter\nPriority help" },
        { name: "Business", price: "Custom", points: "Unlimited users\nOnboarding\nDedicated contact" },
      ]);
      const els: El[] = [kicker(M, 80, str(c, "kicker", "Pricing")), title(M, 116, 1000, 100, str(c, "title", "Simple plans"), 54)];
      tiers.slice(0, 3).forEach((t, i) => {
        const x = M + i * 376,
          hot = i === 1;
        els.push(
          shape(x, 250, 344, 400, "round", { fill: hot ? "theme:accent" : "theme:surface", stroke: hot ? "" : "theme:line", strokeW: 1.5, radius: 24, shadow: hot ? "glow" : "soft", anim: "rise" }),
          text(x + 30, 280, 284, 30, t.name, { font: "mono", size: 16, weight: 700, upper: true, tracking: 0.14, color: hot ? "#0a0a0a" : "theme:accent" }),
          text(x + 30, 320, 284, 90, t.price, { font: "heading", size: 64, weight: 900, tracking: -0.04, color: hot ? "#0a0a0a" : "theme:ink" }),
          text(x + 30, 430, 284, 200, t.points, { size: 20, list: "check", color: hot ? "#0a0a0a" : "theme:ink" }),
        );
      });
      els.push(pageNo(n));
      return els;
    },
  },
  gallery: {
    name: "Gallery",
    build: (c, n) => [
      kicker(M, 80, str(c, "kicker", "Selected Work")),
      title(M, 116, 1000, 100, str(c, "title", "Things we have made"), 54),
      photo(M, 250, 520, 400, { anim: "zoom" }),
      photo(M + 544, 250, 284, 188, { anim: "zoom" }),
      photo(M + 852, 250, 252, 188, { anim: "zoom" }),
      photo(M + 544, 462, 560, 188, { anim: "zoom" }),
      pageNo(n),
    ],
  },
  problem: {
    name: "Problem / Solution",
    build: (c, n) => [
      shape(0, 0, W / 2, H, "rect", { fill: "theme:surface" }),
      kicker(M, 120, "Problem", 400),
      title(M, 160, 480, 160, str(c, "problem", "What is broken today"), 46),
      body(M, 340, 470, 260, str(c, "problemBody", "Describe the pain in the customer's words. Who feels it, how often and what it costs them."), 22),
      kicker(W / 2 + 64, 120, "Solution", 400),
      title(W / 2 + 64, 160, 480, 160, str(c, "solution", "What we do about it"), 46),
      body(W / 2 + 64, 340, 470, 260, str(c, "solutionBody", "Describe the fix as an outcome. What is different the week after they start?"), 22),
      shape(W / 2 - 28, H / 2 - 28, 56, 56, "ellipse", { fill: "theme:accent", shadow: "glow" }),
      icon(W / 2 - 16, H / 2 - 16, 32, "arrow-right", iconPaths("arrow-right"), { color: "#0a0a0a", strokeW: 2.5 }),
      pageNo(n),
    ],
  },
  bigNumber: {
    name: "Big Number",
    build: (c, n) => [
      glow(-120, -120, 640),
      text(M, 120, 760, 330, str(c, "value", "$4.2B"), { font: "heading", size: 220, weight: 900, tracking: -0.06, lineHeight: 1, color: "theme:accent", anim: "zoom" }),
      title(M, 440, 820, 100, str(c, "title", "Spent every year on a problem nobody likes"), 44),
      body(M, 560, 760, 80, str(c, "body", "Name the source of the number and the year."), 20),
      pageNo(n),
    ],
  },
  closing: {
    name: "Closing",
    build: (c) => [
      glow(700, -140, 760),
      glow(-200, 380, 560, "theme:accent2", "theme:accent3"),
      kicker(M, 170, str(c, "kicker", "Next Step")),
      title(M, 206, 760, 240, str(c, "title", "Let's build this together."), 80),
      body(M, 450, 640, 80, str(c, "sub", "Say exactly what you are asking for and by when."), 26),
      text(M, 566, 620, 34, str(c, "contact", "you@company.com · company.com"), { font: "mono", size: 18, color: "theme:ink" }),
      card(940, 300, 252, 300),
      qr(966, 326, 200, str(c, "url", "https://3d3d.ca")),
      text(940, 540, 252, 40, "Scan for the deck", { font: "mono", size: 14, align: "center", color: "theme:muted" }),
    ],
  },
  blank: { name: "Blank", build: () => [] },
};

/** Scale a 16:9 layout to another canvas: positions per axis, type by the smaller factor. */
export function adaptEls(els: El[], ratio: Ratio): El[] {
  if (ratio === "16:9") return els;
  const r = RATIOS[ratio],
    sx = r.w / W,
    sy = r.h / H,
    sf = Math.min(sx, sy);
  return els.map((e) => {
    const o = { ...e, x: e.x * sx, y: e.y * sy, w: e.w * sx, h: e.h * sy };
    if (o.type === "text") o.size = Math.max(10, Math.round(o.size * sf));
    if (o.type === "table") o.size = Math.max(10, Math.round(o.size * sf));
    if (o.type === "icon" || o.type === "qr") {
      const s = Math.min(o.w, o.h);
      o.w = s;
      o.h = s;
    }
    return o;
  });
}

/** French decks get French placeholder content, element by element. */
export function localizeEls(els: El[], locale: "en" | "fr"): El[] {
  if (locale === "en") return els;
  return els.map((e) => {
    if (e.type === "text") return { ...e, text: frContent(e.text) };
    if (e.type === "table") return { ...e, rows: e.rows.map((r) => r.map(frContent)) };
    if (e.type === "chart") return { ...e, labels: e.labels.map(frContent), series: e.series.map((x) => ({ ...x, name: frContent(x.name) })) };
    return e;
  });
}

export function makeSlide(deck: Pick<Deck, "theme" | "ratio">, layout: LayoutId, content: Content = {}, n = 1, locale: "en" | "fr" = "en"): Slide {
  const slide = blankSlide(deck, localizeEls(adaptEls(LAYOUTS[layout].build(content, n), deck.ratio), locale));
  const note = LAYOUT_NOTES[layout] ?? "";
  slide.notes = locale === "fr" ? frContent(note) : note;
  return slide;
}

/* ---------------------------------------------------------------- Templates */

export type Template = {
  id: string;
  name: string;
  blurb: string;
  theme: string;
  slides: [LayoutId, Content][];
};

export const TEMPLATES: Template[] = [
  {
    id: "investor",
    name: "Investor Pitch",
    blurb: "The ten slides investors expect, in the order they expect them.",
    theme: "neon-night",
    slides: [
      ["cover", { kicker: "Seed Round · 2026", title: "Name: the one-line idea", sub: "What you do, for whom, and why now." }],
      ["bigNumber", { value: "$4.2B", title: "A big, painful, measurable problem" }],
      ["problem", {}],
      ["imageRight", { kicker: "Product", title: "Show the product doing the job", bullets: ["The moment of value, on screen", "What the customer no longer does", "Why it is hard to copy"] }],
      ["stats", {}],
      ["chart", { title: "Growth you can check" }],
      ["comparison", {}],
      ["timeline", {}],
      ["team", {}],
      ["closing", { kicker: "The Ask", title: "Raising $750K to reach break even.", sub: "18 months of runway. Use of funds on the next slide in the appendix." }],
    ],
  },
  {
    id: "proposal",
    name: "Sales Proposal",
    blurb: "Win the job: their problem, your plan, the price and the next step.",
    theme: "studio",
    slides: [
      ["cover", { kicker: "Proposal · Client Name", title: "A plan for the job you described", sub: "Prepared for the client's team, with scope, timeline and price." }],
      ["agenda", { items: ["What we heard", "What we will do", "Timeline", "Investment", "Next step"] }],
      ["imageRight", { kicker: "What We Heard", title: "Your goals, in your words", bullets: ["The outcome you want", "The constraint you are working within", "The date that matters"] }],
      ["features", { kicker: "What We Will Do", title: "Three parts to the work" }],
      ["timeline", { items: [{ when: "Week 1", what: "Discovery and plan" }, { when: "Week 2-3", what: "Build and review" }, { when: "Week 4", what: "Launch" }, { when: "After", what: "Support" }] }],
      ["pricing", { kicker: "Investment", title: "Choose the scope" }],
      ["quote", {}],
      ["closing", { title: "Ready when you are.", sub: "Reply to approve, and we book the first week." }],
    ],
  },
  {
    id: "launch",
    name: "Product Launch",
    blurb: "A bold reveal: what is new, why it matters, when it ships.",
    theme: "magenta",
    slides: [
      ["cover", { kicker: "Introducing", title: "The product name", sub: "The shortest true description of what it does." }],
      ["statement", { title: "Everything you needed, nothing you didn't." }],
      ["features", {}],
      ["gallery", { kicker: "Look Closer", title: "Made for the way you work" }],
      ["pricing", {}],
      ["closing", { kicker: "Available Now", title: "Try it today.", sub: "Link, date and where to find it." }],
    ],
  },
  {
    id: "quarterly",
    name: "Quarterly Review",
    blurb: "Results, what we learned and the plan for next quarter.",
    theme: "slate",
    slides: [
      ["cover", { kicker: "Q3 Review", title: "Quarter in review", sub: "Results, lessons and priorities for next quarter." }],
      ["stats", { kicker: "Results", title: "The quarter at a glance" }],
      ["chart", { title: "Revenue by month", chart: { kind: "area", labels: ["Jul", "Aug", "Sep"], series: [{ name: "Revenue", values: [48, 61, 74] }] } }],
      ["problem", { problem: "What did not work", solution: "What we change" }],
      ["timeline", { kicker: "Next Quarter", title: "Priorities" }],
      ["closing", { kicker: "Decisions Needed", title: "Three calls to make today.", sub: "List them so the meeting ends with answers." }],
    ],
  },
  {
    id: "portfolio",
    name: "Portfolio",
    blurb: "Show your work large, with the story behind each piece.",
    theme: "noir",
    slides: [
      ["cover", { kicker: "Portfolio · 2026", title: "Your Name, Your Craft", sub: "Selected projects and what they achieved." }],
      ["gallery", {}],
      ["imageLeft", { kicker: "Project One", title: "The brief and the result" }],
      ["quote", {}],
      ["closing", { kicker: "Work With Me", title: "Let's make the next one.", sub: "Availability and how to reach you." }],
    ],
  },
  {
    id: "workshop",
    name: "Workshop or Lesson",
    blurb: "Teach clearly: goals, steps, practice and recap.",
    theme: "forest",
    slides: [
      ["cover", { kicker: "Workshop", title: "What everyone will be able to do by the end", sub: "Duration, level and what to bring." }],
      ["agenda", { title: "Today's plan", items: ["Warm-up", "Core idea", "Hands-on", "Questions", "Recap"] }],
      ["section", { num: "01", title: "The core idea" }],
      ["features", { kicker: "Steps", title: "Three steps to get it right", items: [{ icon: "book-open", title: "Learn", body: "The idea in one picture." }, { icon: "wrench", title: "Try", body: "Do it once, with help." }, { icon: "badge-check", title: "Check", body: "Know when it is right." }] }],
      ["comparison", { kicker: "Cheat Sheet", title: "Do and don't", rows: [["", "Do", "Avoid"], ["Setup", "Check twice", "Rushing"], ["Practice", "Small steps", "Big leaps"], ["Review", "Write it down", "Memory alone"]] }],
      ["closing", { kicker: "Recap", title: "You can now do the thing.", sub: "Resources and where to practise next." }],
    ],
  },
  {
    id: "event",
    name: "Event or Conference",
    blurb: "Speakers, schedule and the details people actually need.",
    theme: "ember",
    slides: [
      ["cover", { kicker: "October 2026 · City", title: "Event Name", sub: "One line on why this is worth a day of someone's time." }],
      ["team", { kicker: "Speakers", title: "Who you will hear from" }],
      ["timeline", { kicker: "Schedule", title: "The day", items: [{ when: "09:00", what: "Doors and coffee" }, { when: "10:00", what: "Opening talk" }, { when: "13:00", what: "Workshops" }, { when: "17:00", what: "Social" }] }],
      ["closing", { kicker: "Register", title: "Save your seat.", sub: "Date, place and price." }],
    ],
  },
  {
    id: "case-study",
    name: "Case Study",
    blurb: "Challenge, approach, result: proof that travels.",
    theme: "ocean",
    slides: [
      ["cover", { kicker: "Case Study", title: "How Client cut turnaround in half", sub: "The challenge, what we did and the measured result." }],
      ["problem", { problem: "The challenge", solution: "The approach" }],
      ["bigNumber", { value: "50%", title: "Faster turnaround in three months" }],
      ["quote", {}],
      ["closing", { kicker: "Your Turn", title: "Want the same result?", sub: "Book a short call to see if it fits." }],
    ],
  },
  {
    id: "editorial",
    name: "Editorial Story",
    blurb: "A calm, serif deck for reports, essays and annual reviews.",
    theme: "editorial",
    slides: [
      ["cover", { kicker: "Annual Report", title: "A year of steady work", sub: "What we did, what it changed and what comes next." }],
      ["statement", { title: "The short version: we grew by doing fewer things well." }],
      ["stats", {}],
      ["imageLeft", {}],
      ["closing", { kicker: "Thank You", title: "To everyone who helped.", sub: "Contact details and further reading." }],
    ],
  },
  {
    id: "blank",
    name: "Blank Deck",
    blurb: "One cover slide and your own ideas.",
    theme: "studio",
    slides: [["blank", {}]],
  },
  { id: "brand-book", name: "Brand Book", blurb: "A soft mesh, bold type and a clear visual system.", theme: "magenta",
    slides: [["cover", { kicker: "Brand Guidelines", title: "Our visual language", sub: "A working guide to the identity you are building." }], ["statement", {}], ["gallery", {}], ["comparison", {}], ["closing", {}]] },
  { id: "research", name: "Research Brief", blurb: "Technical grid, mono headlines and evidence-led pages.", theme: "blueprint",
    slides: [["cover", { kicker: "Research Brief", title: "A question worth answering", sub: "The method, the evidence and what we still need to learn." }], ["problem", {}], ["chart", {}], ["comparison", {}], ["closing", {}]] },
  { id: "architecture", name: "Architecture Review", blurb: "An arched image, generous space and a serif headline.", theme: "editorial",
    slides: [["cover", { kicker: "Design Review", title: "Space with a purpose", sub: "The site, the brief and the choices behind the design." }], ["imageLeft", {}], ["gallery", {}], ["timeline", {}], ["closing", {}]] },
  { id: "lookbook", name: "Lookbook", blurb: "Three image frames and a narrow editorial text column.", theme: "noir",
    slides: [["cover", { kicker: "Selected Work", title: "Details worth seeing", sub: "Add your own photographs and tell the story behind the work." }], ["gallery", {}], ["imageRight", {}], ["quote", {}], ["closing", {}]] },
  { id: "manifesto", name: "Manifesto", blurb: "Centred serif type on a dotted paper ground.", theme: "editorial",
    slides: [["cover", { kicker: "Our Perspective", title: "What we stand for", sub: "The principles that guide the choices we make." }], ["statement", {}], ["features", {}], ["closing", {}]] },
  { id: "roadmap", name: "Roadmap Brief", blurb: "Connected milestones with a broad, open headline.", theme: "mint",
    slides: [["cover", { kicker: "Planning Session", title: "The way forward", sub: "Priorities, owners and the decisions that move the work along." }], ["agenda", {}], ["timeline", {}], ["comparison", {}], ["closing", {}]] },
  { id: "geometric", name: "Geometric Study", blurb: "A graphic side panel, quarter circle and zigzag detail.", theme: "sunrise",
    slides: [["cover", { kicker: "Creative Direction", title: "Form meets function", sub: "Explore the shapes and ideas behind the next direction." }], ["section", {}], ["imageLeft", {}], ["gallery", {}], ["closing", {}]] },
];

export function deckFromTemplate(t: Template, ratio: Ratio = "16:9", locale: "en" | "fr" = "en", title?: string): Deck {
  const th = themeById(t.theme);
  const deck: Deck = {
    v: 1,
    title: title ?? (locale === "fr" ? frContent(t.name) : t.name),
    ratio,
    theme: t.theme,
    colors: {},
    fonts: { heading: th.heading, body: th.body },
    slides: [],
  };
  deck.slides = t.slides.map(([layout, content], i) => makeSlide(deck, layout, content, i + 1, locale));
  const cover = COVERS[t.id];
  if (cover) {
    const c = t.slides[0][1];
    deck.slides[0].els = localizeEls(adaptEls(cover({
      title: str(c, "title", "A Clear Name for the Big Idea"),
      kicker: str(c, "kicker", t.name),
      sub: str(c, "sub", "One sentence that tells the room what changes because you exist."),
    }), ratio), locale);
  }
  return deck;
}

export const starterDeck = (locale: "en" | "fr" = "en") => deckFromTemplate(TEMPLATES[0], "16:9", locale);
