import { Target, Lightbulb, Users, Rocket, ChartColumn, Check } from "lucide";
import { escapeXml } from "../../shared/browser";
export const deckThemes = [
  {
    id: "studio",
    name: "Studio",
    title: "Arial",
    body: "Arial",
    paper: "#ffffff",
    ink: "#141717",
    accent: "#04D9C4",
    grid: "rail",
  },
  {
    id: "folio",
    name: "Folio",
    title: "Georgia",
    body: "Arial",
    paper: "#faf7ee",
    ink: "#29251d",
    accent: "#FF6A00",
    grid: "rule",
  },
  {
    id: "ledger",
    name: "Ledger",
    title: "Georgia",
    body: "Courier New",
    paper: "#ffffff",
    ink: "#202420",
    accent: "#18E36B",
    grid: "ledger",
  },
  {
    id: "signal",
    name: "Signal",
    title: "Arial Black",
    body: "Arial",
    paper: "#f6f6f2",
    ink: "#181818",
    accent: "#FF2D92",
    grid: "corner",
  },
  {
    id: "atelier",
    name: "Atelier",
    title: "Georgia",
    body: "Georgia",
    paper: "#fcf8f3",
    ink: "#39261f",
    accent: "#FF6A00",
    grid: "arch",
  },
  {
    id: "technical",
    name: "Technical",
    title: "Courier New",
    body: "Arial",
    paper: "#f9faf7",
    ink: "#1c2925",
    accent: "#04D9C4",
    grid: "ticks",
  },
  {
    id: "gallery",
    name: "Gallery",
    title: "Arial",
    body: "Georgia",
    paper: "#ffffff",
    ink: "#252124",
    accent: "#FF2D92",
    grid: "frame",
  },
  {
    id: "field",
    name: "Field Notes",
    title: "Arial Black",
    body: "Courier New",
    paper: "#f4f1e7",
    ink: "#2e2a22",
    accent: "#18E36B",
    grid: "notebook",
  },
] as const;
export const icons = { Target, Lightbulb, Users, Rocket, ChartColumn, Check };
export type IconName = keyof typeof icons;
export function iconSvg(name: string, colour = "#141717") {
  const node = icons[name as IconName];
  if (!node) return "";
  return `<svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="${colour}" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">${node
    .map(
      ([tag, attrs]) =>
        `<${tag} ${Object.entries(attrs)
          .map(([k, v]) => `${k}="${escapeXml(String(v))}"`)
          .join(" ")}/>`,
    )
    .join("")}</svg>`;
}
export type Chart = { type: "bar" | "line" | "pie"; rows: { label: string; value: number }[] };
export function validChart(v: unknown): v is Chart {
  if (!v || typeof v !== "object") return false;
  const c = v as Chart;
  return (
    ["bar", "line", "pie"].includes(c.type) &&
    Array.isArray(c.rows) &&
    c.rows.length >= 1 &&
    c.rows.length <= 8 &&
    c.rows.every(
      (r) =>
        r &&
        typeof r.label === "string" &&
        r.label.length > 0 &&
        r.label.length <= 20 &&
        Number.isFinite(r.value) &&
        Math.abs(r.value) <= 1e12 &&
        (c.type !== "pie" || r.value >= 0),
    ) &&
    (c.type !== "pie" || c.rows.some((r) => r.value > 0))
  );
}
export function chartSvg(c: Chart, accent: string) {
  if (!validChart(c))
    throw new Error("Use 1 to 8 named finite values. Pie values must be nonnegative with a positive total.");
  const e = escapeXml,
    min = Math.min(0, ...c.rows.map((r) => r.value)),
    max = Math.max(0, ...c.rows.map((r) => r.value));
  const y = (v: number) => 370 - ((v - min) / (max - min || 1)) * 300;
  const x = (i: number) => 65 + (i * 365) / Math.max(1, c.rows.length - 1);
  const colours = [accent, "#535a56", "#d6d8cc", "#a56b40", "#776278", "#9aab83", "#4d4d4d", "#b4b4b4"];
  let marks = "";
  if (c.type === "pie") {
    const total = c.rows.reduce((s, r) => s + r.value, 0);
    let a = -Math.PI / 2;
    for (const [i, r] of c.rows.entries()) {
      const b = a + (r.value / total) * Math.PI * 2;
      marks +=
        r.value === total
          ? `<circle cx="245" cy="180" r="125" fill="${colours[i]}"/>`
          : r.value
            ? `<path d="M245 180 L${245 + 125 * Math.cos(a)} ${180 + 125 * Math.sin(a)} A125 125 0 ${b - a > Math.PI ? 1 : 0} 1 ${245 + 125 * Math.cos(b)} ${180 + 125 * Math.sin(b)} Z" fill="${colours[i]}"/>`
            : "";
      marks += `<rect x="50" y="${325 + i * 18}" width="10" height="10" fill="${colours[i]}"/><text x="68" y="${334 + i * 18}" font-size="14">${e(r.label)} · ${r.value}</text>`;
      a = b;
    }
  } else {
    marks = `<path d="M40 ${y(0)}H460" stroke="#535a56"/>`;
    if (c.type === "line")
      marks += `<polyline points="${c.rows.map((r, i) => `${x(i)},${y(r.value)}`).join(" ")}" fill="none" stroke="${accent}" stroke-width="5"/>`;
    for (const [i, r] of c.rows.entries()) {
      const px = c.type === "bar" ? 65 + ((i + 0.5) * 365) / c.rows.length : x(i),
        w = 240 / c.rows.length;
      marks +=
        c.type === "bar"
          ? `<rect x="${px - w / 2}" y="${Math.min(y(0), y(r.value))}" width="${w}" height="${Math.max(1, Math.abs(y(r.value) - y(0)))}" fill="${accent}"/>`
          : `<circle cx="${px}" cy="${y(r.value)}" r="6" fill="#141717"/>`;
      marks += `<text x="${px}" y="${Math.max(32, y(r.value) - 12)}" text-anchor="middle" font-size="16">${r.value}</text><text x="${px}" y="402" text-anchor="middle" font-size="13" transform="rotate(22 ${px} 402)">${e(r.label)}</text>`;
    }
  }
  return `<svg xmlns="http://www.w3.org/2000/svg" width="490" height="490" viewBox="0 0 490 490" role="img"><title>${e(c.type)} chart: ${e(c.rows.map((r) => `${r.label} ${r.value}`).join(", "))}</title><g font-family="Arial" fill="#141717">${marks}</g></svg>`;
}
