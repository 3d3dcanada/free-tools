import type { Locale } from "../../seo/guide";
import { translate } from "../../shared/translate";
import { structuresFr } from "./structures.fr";
import { escapeXml, validColour, validImage } from "../../shared/browser";
import { deckThemes, icons, iconSvg, chartSvg, validChart, type Chart } from "./visuals";
export type Slide = {
  title: string;
  body: string;
  notes: string;
  image: string;
  imageAlt: string;
  layout: "statement" | "split" | "steps";
  focalX?: number;
  focalY?: number;
  crop?: "cover" | "contain";
  imageWidth?: number;
  imageHeight?: number;
  chart?: Chart;
  icon?: string;
};
export type Deck = {
  theme?: string;
  version: 1;
  name: string;
  accent: string;
  logo: string;
  slides: Slide[];
};
export const structures = [
  {
    name: "Investor Pitch",
    purpose: "Make the problem, evidence and ask easy to judge.",
    titles: [
      "The Opportunity",
      "The Problem",
      "Our Approach",
      "Who Needs It",
      "Evidence So Far",
      "How It Earns",
      "The Team",
      "The Ask",
    ],
    prompts: [
      "Name the company and the change you are making.",
      "Describe a specific customer problem you have observed.",
      "Explain the product in one sentence, then how it helps.",
      "Identify the buyer and cite any market estimate.",
      "Use measured results. If you are pre-launch, say so.",
      "Explain what customers pay for and what delivery costs.",
      "Name the people and relevant experience.",
      "State what you need, what it funds and the next milestone.",
    ],
  },
  {
    name: "Sales Conversation",
    purpose: "Connect a customer problem to a clear next step.",
    titles: [
      "A Better Outcome",
      "Your Current Situation",
      "What Changes",
      "How It Works",
      "Scope and Price",
      "Next Step",
    ],
    prompts: [
      "State the result this customer wants.",
      "Reflect what the customer told you, without guessing.",
      "Compare today with the proposed outcome.",
      "Show the steps and responsibilities.",
      "List inclusions, exclusions and a real quoted price.",
      "Ask for one concrete decision.",
    ],
  },
  {
    name: "Grant Application",
    purpose: "Tie a documented need to activities and evaluation.",
    titles: [
      "Project Summary",
      "Community Need",
      "Who Benefits",
      "Activities",
      "Budget",
      "Evaluation",
      "Funding Request",
    ],
    prompts: [
      "Name the project and its purpose.",
      "Cite evidence of the need.",
      "Describe who is eligible and how they participate.",
      "Show the schedule and responsible people.",
      "Use actual estimates and identify matching funds.",
      "Explain what you will measure and when.",
      "State the requested amount and eligible spending.",
    ],
  },
  {
    name: "School Project",
    purpose: "Show the question, method and what you learned.",
    titles: ["Our Question", "Background", "Our Method", "What We Found", "What It Means", "Sources"],
    prompts: [
      "State a question you can investigate.",
      "Introduce the topic and key terms.",
      "Describe what you did so someone could repeat it.",
      "Present observations without changing the numbers.",
      "Explain limits and an interesting next question.",
      "List the sources, creators and dates you used.",
    ],
  },
  {
    name: "Product Demo",
    purpose: "Make a real workflow visible.",
    titles: ["Meet the Product", "The Job to Do", "Before You Start", "The Workflow", "The Result", "Try It"],
    prompts: [
      "Name the product and intended user.",
      "Describe one real task.",
      "List prerequisites and supported inputs.",
      "Use your own screenshots to show the main steps.",
      "Show a real output and any limitations.",
      "Give a clear next action.",
    ],
  },
  {
    name: "Nonprofit Partnership",
    purpose: "Explain the shared work and responsibilities.",
    titles: ["Shared Purpose", "The Need", "Our Work", "Partner Role", "Resources", "Accountability"],
    prompts: [
      "Describe the purpose both organisations share.",
      "Cite local evidence and affected people.",
      "Describe the proposed activities.",
      "Specify what each partner contributes.",
      "List confirmed resources and gaps.",
      "Explain reporting, consent and the next decision.",
    ],
  },
  {
    name: "Creative Portfolio",
    purpose: "Let a small number of real projects carry the story.",
    titles: ["What I Make", "My Approach", "Project One", "Project Two", "Working Together", "Contact"],
    prompts: [
      "Introduce your practice in one clear sentence.",
      "Describe how you work with a client.",
      "Show your own work and explain your contribution.",
      "Show a different challenge and the actual result.",
      "Explain the process, scope and availability.",
      "Give the contact details you want shared.",
    ],
  },
  {
    name: "Project Kickoff",
    purpose: "Align a team before work begins.",
    titles: ["The Outcome", "Scope", "People", "Milestones", "Risks", "First Week"],
    prompts: [
      "Describe how success will be recognised.",
      "Separate included and excluded work.",
      "Assign responsibilities and decisions.",
      "List dates that the team has agreed to.",
      "Name uncertainties and who will resolve them.",
      "List the first actions with owners.",
    ],
  },
  {
    name: "Research Briefing",
    purpose: "Keep the evidence separate from the interpretation.",
    titles: ["Research Question", "Prior Work", "Method", "Results", "Limitations", "Recommendation"],
    prompts: [
      "State the question and why it matters.",
      "Credit earlier findings and identify the gap.",
      "Describe the sample and procedure.",
      "Present measured results with units.",
      "Explain uncertainty and what was not tested.",
      "Make a recommendation supported by the results.",
    ],
  },
  {
    name: "Workshop",
    purpose: "Teach one practical skill with a worked exercise.",
    titles: [
      "Today’s Skill",
      "What You Need",
      "The Idea",
      "Walkthrough",
      "Your Turn",
      "Check Your Work",
      "Take It Further",
    ],
    prompts: [
      "State what participants will be able to do.",
      "List materials and prior knowledge.",
      "Explain the core idea in plain words.",
      "Show the steps using your own example.",
      "Give a short exercise with a clear output.",
      "Show how to spot and fix common mistakes.",
      "Link to references and a useful next exercise.",
    ],
  },
];
export function makeDeck(index = 0, locale: Locale = "en"): Deck {
  const t = (locale === "fr" ? structuresFr : structures)[index];
  return {
    version: 1,
    theme: "studio",
    name: t.name,
    accent: ["#04D9C4", "#FF6A00", "#FF2D92", "#18E36B"][index % 4],
    logo: "",
    slides: t.titles.map((title, i) => ({
      title,
      body: t.prompts[i],
      notes: "",
      image: "",
      imageAlt: "",
      layout: i === 0 ? "statement" : i % 3 === 0 ? "steps" : "split",
    })),
  };
}
const short = (v: unknown, max: number) => typeof v === "string" && v.length <= max;
export function isDeck(v: unknown): v is Deck {
  if (!v || typeof v !== "object") return false;
  const d = v as Deck;
  return (
    d.version === 1 &&
    (d.theme === undefined || deckThemes.some((t) => t.id === d.theme)) &&
    short(d.name, 100) &&
    validColour(d.accent) &&
    validImage(d.logo) &&
    Array.isArray(d.slides) &&
    d.slides.length > 0 &&
    d.slides.length <= 30 &&
    d.slides.every(
      (s) =>
        s &&
        short(s.title, 90) &&
        short(s.body, 600) &&
        short(s.notes, 3000) &&
        short(s.imageAlt, 180) &&
        validImage(s.image) &&
        ["statement", "split", "steps"].includes(s.layout) &&
        (s.chart === undefined || validChart(s.chart)) &&
        (s.icon === undefined || s.icon === "" || Object.hasOwn(icons, s.icon)) &&
        [s.focalX, s.focalY].every((n) => n === undefined || (Number.isFinite(n) && n >= 0 && n <= 100)) &&
        [s.imageWidth, s.imageHeight].every(
          (n) => n === undefined || (Number.isFinite(n) && n > 0 && n <= 40000),
        ) &&
        (s.crop === undefined || ["cover", "contain"].includes(s.crop)),
    )
  );
}
export function fromOutline(outline: string): Slide[] {
  if (outline.length > 20000) throw new Error("Keep the outline below 20,000 characters.");
  const blocks = outline
    .trim()
    .split(/\n\s*\n|\n(?=#\s)/)
    .filter(Boolean);
  if (!blocks.length || blocks.length > 30)
    throw new Error("Use between 1 and 30 sections, separated by a blank line.");
  return blocks.map((block) => {
    const lines = block
      .split("\n")
      .map((l) => l.replace(/^\s*(?:#+\s*|[-*•]\s*)/, "").trim())
      .filter(Boolean);
    if (lines[0].length > 90 || lines.slice(1).join("\n").length > 600)
      throw new Error("Each section needs a title under 91 characters and body under 601 characters.");
    return {
      title: lines[0],
      body: lines.slice(1).join("\n"),
      notes: "",
      image: "",
      imageAlt: "",
      layout: "split",
    };
  });
}
export function moveSlide(slides: Slide[], at: number, by: number): Slide[] {
  if (at + by < 0 || at + by >= slides.length) return slides;
  const next = [...slides];
  [next[at], next[at + by]] = [next[at + by], next[at]];
  return next;
}

export function wrap(text: string, max: number): string[] {
  return text.split("\n").flatMap((line) => {
    const result: string[] = [];
    let current = "";
    for (const word of line.split(/\s+/)) {
      const chunks = word.match(new RegExp(`.{1,${max}}`, "gu")) ?? [""];
      if (chunks.length > 1 && /^[^\p{L}\p{N}]+$/u.test(chunks[chunks.length - 1])) {
        const punctuation = chunks.pop()!;
        chunks[chunks.length - 1] += punctuation;
      }
      for (const chunk of chunks) {
        if (current && current.length + chunk.length + 1 > max) {
          result.push(current);
          current = "";
        }
        current += (current ? " " : "") + chunk;
      }
    }
    return [...result, current];
  });
}
export type TextBox = {
  text: string;
  x: number;
  y: number;
  width: number;
  size: number;
  bold: boolean;
  lineHeight: number;
  lines: string[];
  align: "left" | "center";
};
export function slideText(slide: Slide, theme = "studio"): TextBox[] {
  const narrow = !!slide.image || !!slide.chart || slide.layout === "split";
  const layout: Record<string, [number, number, number, number, "left" | "center"]> = {
    studio: [88, 170, 80, 40, "left"],
    folio: [80, 210, 92, 48, "center"],
    ledger: [64, 150, 80, 45, "left"],
    signal: [100, 185, 88, 30, "left"],
    atelier: [76, 190, 90, 54, "center"],
    technical: [66, 150, 80, 34, "left"],
    gallery: [92, 195, 110, 45, "center"],
    field: [82, 168, 90, 40, "left"],
  };
  const [headline, top, left, gap, align] = layout[theme] || layout.studio;
  const titleSize = narrow ? Math.min(headline, 56) : slide.layout === "steps" ? 62 : headline;
  const width = narrow ? 555 : 1280 - left * 2;
  const title = wrap(slide.title, Math.floor(width / (titleSize * 0.61)));
  const body = wrap(slide.body, narrow ? 37 : 68);
  const bodyY = top + title.length * titleSize * 1.12 + gap;
  const bodySize = Math.min(28, (600 - bodyY) / Math.max(1, body.length) / 1.35);
  return [
    {
      text: slide.title,
      x: left,
      y: top,
      width,
      size: titleSize,
      bold: true,
      lineHeight: titleSize * 1.12,
      lines: title,
      align: narrow ? "left" : align,
    },
    {
      text: slide.body,
      x: left,
      y: bodyY,
      width,
      size: bodySize,
      bold: false,
      lineHeight: bodySize * 1.35,
      lines: body,
      align: narrow ? "left" : align,
    },
  ];
}
export function slideIssue(slide: Slide, theme?: string): string | null {
  if (slide.chart && !validChart(slide.chart)) return "Correct the chart values before exporting.";
  if (!slide.title.trim()) return "Add a slide title before exporting.";
  if (slideText(slide, theme)[1].size < 18)
    return "This slide has too much text. Shorten it or move some copy into speaker notes.";
  if (slide.image && !slide.imageAlt.trim())
    return "Describe this slide’s image for people who cannot see it.";
  return null;
}
export function themeFor(deck: Deck) {
  return deckThemes.find((t) => t.id === deck.theme) || deckThemes[0];
}
export function photoSvg(slide: Slide) {
  if (!slide.image) return "";
  const w = slide.imageWidth || 1,
    h = slide.imageHeight || 1;
  const cropW = Math.min(w, h),
    cropH = cropW;
  const x = ((w - cropW) * (slide.focalX ?? 50)) / 100,
    y = ((h - cropH) * (slide.focalY ?? 50)) / 100;
  return (
    '<svg xmlns="http://www.w3.org/2000/svg" width="490" height="490" viewBox="' +
    (slide.crop === "cover" ? [x, y, cropW, cropH].join(" ") : [0, 0, w, h].join(" ")) +
    '"><image width="' +
    w +
    '" height="' +
    h +
    '" href="' +
    slide.image +
    '"/></svg>'
  );
}
export function slideBackdrop(deck: Deck) {
  const t = themeFor(deck),
    ink = deck.accent;
  const marks: Record<string, string> = {
    rail:
      '<path d="M32 80V605" stroke="' + ink + '" stroke-width="6"/><path d="M710 48H1200" stroke="#dddcd4"/>',
    rule: '<path d="M72 60H1208 M72 625H1208" stroke="' + ink + '" stroke-width="3"/>',
    ledger:
      '<path d="M670 72V606 M72 612H1208" stroke="#c3cabf"/><path d="M72 50h120" stroke="' +
      ink +
      '" stroke-width="8"/>',
    corner: '<path d="M1080 48h140v120 M40 550v80h120" stroke="' + ink + '" stroke-width="12" fill="none"/>',
    arch:
      '<path d="M705 602V305a245 245 0 0 1 490 0v297" stroke="#ded4c5" stroke-width="2" fill="none"/><circle cx="1160" cy="80" r="12" fill="' +
      ink +
      '"/>',
    ticks:
      '<path d="M40 40h70 M40 40v70 M1240 40h-70 M1240 40v70 M40 680h70 M40 680v-70 M1240 680h-70 M1240 680v-70" stroke="' +
      ink +
      '" stroke-width="3"/>',
    frame:
      '<rect x="32" y="32" width="1216" height="656" fill="none" stroke="#d1d1c9"/><path d="M72 70h48" stroke="' +
      ink +
      '" stroke-width="8"/>',
    notebook:
      '<path d="M48 42V680" stroke="' +
      ink +
      '" stroke-width="3"/><path d="M72 600H1200 M72 620H1200" stroke="#d5d1c2"/>',
  };
  return (
    '<svg xmlns="http://www.w3.org/2000/svg" width="1280" height="720" viewBox="0 0 1280 720"><rect width="1280" height="720" fill="' +
    t.paper +
    '"/>' +
    marks[t.grid] +
    "</svg>"
  );
}
const svgFont = (font: string) =>
  `${font}, ${/Georgia|Times/.test(font) ? "serif" : /Courier/.test(font) ? "monospace" : "Arial, sans-serif"}`;
export function slideSvg(deck: Deck, slide: Slide, index: number, locale: Locale = "en"): string {
  const e = escapeXml,
    t = themeFor(deck);
  const visual =
    slide.chart && !validChart(slide.chart)
      ? '<svg width="490" height="490"><text x="25" y="200" font-family="Arial" font-size="18">' +
        translate("Correct the chart table to see its preview.", locale) +
        "</text></svg>"
      : slide.chart
        ? chartSvg(slide.chart, deck.accent)
        : slide.image
          ? photoSvg(slide)
          : slide.layout === "split"
            ? '<svg xmlns="http://www.w3.org/2000/svg" width="490" height="490" viewBox="0 0 490 490"><path d="M50 360l95-135 82 70 90-115 125 180" fill="none" stroke="#c7c5b9" stroke-width="2"/><circle cx="160" cy="110" r="28" fill="none" stroke="' +
              deck.accent +
              '" stroke-width="3"/><text x="245" y="418" text-anchor="middle" font-family="Georgia" font-size="22" fill="' +
              t.ink +
              '">' +
              translate("Your evidence belongs here.", locale) +
              '</text><text x="245" y="450" text-anchor="middle" font-family="Arial" font-size="16" fill="' +
              t.ink +
              '">' +
              translate("Add a photograph, sketch or chart.", locale) +
              "</text></svg>"
            : "";
  const texts = slideText(slide, deck.theme)
    .map(
      (box) =>
        '<text text-anchor="' +
        (box.align === "center" ? "middle" : "start") +
        '" font-family="' +
        svgFont(box.bold ? t.title : t.body) +
        '" font-size="' +
        box.size +
        '" font-weight="' +
        (box.bold ? 700 : 400) +
        '" fill="' +
        t.ink +
        '">' +
        box.lines
          .map(
            (line, i) =>
              '<tspan x="' +
              (box.x + (box.align === "center" ? box.width / 2 : 0)) +
              '" y="' +
              (box.y + i * box.lineHeight) +
              '">' +
              e(line) +
              "</tspan>",
          )
          .join("") +
        "</text>",
    )
    .join("");
  const footer =
    '<text x="72" y="666" font-family="' +
    svgFont(t.body) +
    '" font-size="18" fill="' +
    t.ink +
    '">' +
    e(deck.name) +
    " · " +
    (index + 1) +
    "</text>";
  return slideBackdrop(deck)
    .replace(
      "</svg>",
      "<title>" +
        e(slide.title) +
        "</title><desc>" +
        e(slide.body) +
        " " +
        e(slide.imageAlt) +
        "</desc>" +
        texts +
        (visual ? visual.replace("<svg ", '<svg x="710" y="105" ') : "") +
        (slide.icon ? iconSvg(slide.icon, t.ink).replace("<svg ", '<svg x="1130" y="610" ') : "") +
        (deck.logo
          ? '<image href="' +
            deck.logo +
            '" x="900" y="625" width="135" height="55" preserveAspectRatio="xMidYMid meet"/>'
          : "") +
        footer +
        "</svg>",
    )
    .replace("<svg ", '<svg role="img" aria-label="' + e(slide.title) + '" ');
}
