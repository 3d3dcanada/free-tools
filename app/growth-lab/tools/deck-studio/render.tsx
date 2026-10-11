import { createContext, useContext, type CSSProperties } from "react";
import { qrSvg, defaultStyle } from "../qr-code/model";
import { useLocale } from "../../shared/locale";
import { dt } from "./i18n";
import {
  dims,
  fontStack,
  paint,
  palette,
  type Background,
  type ChartEl,
  type Deck,
  type El,
  type ShapeEl,
  type Slide,
  type TableEl,
} from "./model";

/* ---------------------------------------------------------------- Geometry shared with exports */

/** SVG patterns (design studios): drawn inside their box, spacing from `radius`. */
export const PATTERNS = ["dots", "halftone", "grid", "lines", "waves", "rings", "topo", "rays", "zigzag", "plus", "confetti"] as const;
export const isPattern = (k: string) => (PATTERNS as readonly string[]).includes(k);
/** Patterns made of lines take the fill colour as their stroke. */
export const isStrokePattern = (k: string) => isPattern(k) && k !== "dots" && k !== "halftone" && k !== "rays";

const f1 = (n: number) => Math.round(n * 10) / 10;

function patternPath(kind: string, w: number, h: number, spacing: number): string {
  // Never more than about 3,000 marks, however large the box.
  const g = Math.max(spacing > 0 ? spacing : Math.min(w, h) / 12, Math.sqrt((w * h) / 3000), 2);
  let d = "";
  const dot = (x: number, y: number, r: number) =>
    (d += `M${f1(x - r)} ${f1(y)}a${f1(r)} ${f1(r)} 0 1 0 ${f1(2 * r)} 0a${f1(r)} ${f1(r)} 0 1 0 ${f1(-2 * r)} 0`);
  switch (kind) {
    case "dots":
      for (let y = g / 2; y < h; y += g) for (let x = g / 2; x < w; x += g) dot(x, y, g * 0.16);
      return d;
    case "halftone":
      // Dots that fade from heavy on the left to nothing on the right; rotate to point it.
      for (let y = g / 2; y < h; y += g * 0.866)
        for (let x = ((y / (g * 0.866)) % 2 < 1 ? g / 2 : g); x < w; x += g) {
          const r = g * 0.4 * Math.pow(1 - x / w, 1.3);
          if (r > g * 0.04) dot(x, y, r);
        }
      return d;
    case "grid":
      for (let x = 0; x <= w + 0.01; x += g) d += `M${f1(x)} 0V${f1(h)}`;
      for (let y = 0; y <= h + 0.01; y += g) d += `M0 ${f1(y)}H${f1(w)}`;
      return d;
    case "lines":
      for (let c = 0; c <= w + h; c += g) d += `M${f1(c)} 0L${f1(c - h)} ${f1(h)}`;
      return d;
    case "waves": {
      const a = g * 0.26,
        L = g * 1.6;
      for (let y = g / 2; y < h + a; y += g) {
        d += `M${f1(-L)} ${f1(y)}Q${f1(-L * 0.75)} ${f1(y - a)} ${f1(-L / 2)} ${f1(y)}`;
        for (let x = 0; x <= w + L; x += L / 2) d += `T${f1(x)} ${f1(y)}`;
      }
      return d;
    }
    case "zigzag": {
      const a = g * 0.28;
      for (let y = g / 2; y < h + a; y += g) {
        d += `M0 ${f1(y)}`;
        for (let x = g / 2, up = true; x <= w + g; x += g / 2, up = !up) d += `L${f1(x)} ${f1(up ? y - a : y)}`;
      }
      return d;
    }
    case "rings": {
      const cx = w / 2,
        cy = h / 2;
      for (let r = g; r < Math.hypot(w, h) / 2 + g; r += g) d += `M${f1(cx - r)} ${f1(cy)}a${f1(r)} ${f1(r)} 0 1 0 ${f1(2 * r)} 0a${f1(r)} ${f1(r)} 0 1 0 ${f1(-2 * r)} 0`;
      return d;
    }
    case "topo": {
      // Contour lines around an off-centre hill, the same every time for the same box.
      const cx = w * 0.64,
        cy = h * 0.38,
        n = Math.ceil(Math.hypot(w, h) / g);
      for (let i = 1; i <= n; i++) {
        const base = i * g * 0.9;
        for (let s = 0; s <= 48; s++) {
          const t = (s / 48) * Math.PI * 2;
          const r = base * (1 + 0.13 * Math.sin(3 * t + i * 0.7) + 0.07 * Math.sin(5 * t - i * 0.4) + 0.04 * Math.cos(2 * t + i));
          d += `${s ? "L" : "M"}${f1(cx + Math.cos(t) * r * 1.18)} ${f1(cy + Math.sin(t) * r)}`;
        }
        d += "Z";
      }
      return d;
    }
    case "rays": {
      // A sunburst from the centre: alternate wedges filled.
      const cx = w / 2,
        cy = h / 2,
        R = Math.hypot(w, h),
        n = 36;
      for (let i = 0; i < n; i += 2) {
        const a0 = (i / n) * Math.PI * 2,
          a1 = ((i + 1) / n) * Math.PI * 2;
        d += `M${f1(cx)} ${f1(cy)}L${f1(cx + Math.cos(a0) * R)} ${f1(cy + Math.sin(a0) * R)}L${f1(cx + Math.cos(a1) * R)} ${f1(cy + Math.sin(a1) * R)}Z`;
      }
      return d;
    }
    case "plus": {
      const s = g * 0.17;
      for (let y = g / 2; y < h; y += g) for (let x = g / 2; x < w; x += g) d += `M${f1(x - s)} ${f1(y)}H${f1(x + s)}M${f1(x)} ${f1(y - s)}V${f1(y + s)}`;
      return d;
    }
    case "confetti": {
      // Short dashes at fixed pseudo-random places and angles.
      let seed = 7;
      const rnd = () => ((seed = (seed * 16807) % 2147483647) - 1) / 2147483646;
      const count = Math.min(900, Math.round((w * h) / (g * g)));
      for (let i = 0; i < count; i++) {
        const x = rnd() * w,
          y = rnd() * h,
          a = rnd() * Math.PI,
          l = g * (0.22 + rnd() * 0.18);
        d += `M${f1(x - Math.cos(a) * l)} ${f1(y - Math.sin(a) * l)}L${f1(x + Math.cos(a) * l)} ${f1(y + Math.sin(a) * l)}`;
      }
      return d;
    }
  }
  return d;
}

export function shapePath(kind: ShapeEl["shape"], w: number, h: number, r = 0): string {
  const m = Math.min(w, h);
  if (isPattern(kind)) return patternPath(kind, w, h, r);
  switch (kind) {
    case "wave":
      return `M0 ${h * 0.42}C${w * 0.22} ${h * -0.06} ${w * 0.5} ${h * 0.86} ${w} ${h * 0.18}V${h}H0Z`;
    case "arch": {
      const ry = Math.min(w / 2, h);
      return `M0 ${h}V${ry}A${w / 2} ${ry} 0 0 1 ${w} ${ry}V${h}Z`;
    }
    case "ring": {
      const t = Math.max(1, Math.min(r || m * 0.14, m / 2 - 0.5)),
        rx = w / 2,
        ry = h / 2;
      return `M0 ${ry}A${rx} ${ry} 0 1 0 ${w} ${ry}A${rx} ${ry} 0 1 0 0 ${ry}ZM${t} ${ry}A${rx - t} ${ry - t} 0 1 1 ${w - t} ${ry}A${rx - t} ${ry - t} 0 1 1 ${t} ${ry}Z`;
    }
    case "slant":
      return `M${w * 0.24} 0H${w}L${w * 0.76} ${h}H0Z`;
    case "quarter":
      return `M0 0A${w} ${h} 0 0 1 ${w} ${h}H0Z`;
    case "ellipse":
      return `M${w / 2} 0A${w / 2} ${h / 2} 0 1 1 ${w / 2} ${h}A${w / 2} ${h / 2} 0 1 1 ${w / 2} 0Z`;
    case "triangle":
      return `M${w / 2} 0L${w} ${h}L0 ${h}Z`;
    case "diamond":
      return `M${w / 2} 0L${w} ${h / 2}L${w / 2} ${h}L0 ${h / 2}Z`;
    case "hexagon":
      return `M${w * 0.25} 0H${w * 0.75}L${w} ${h / 2}L${w * 0.75} ${h}H${w * 0.25}L0 ${h / 2}Z`;
    case "star": {
      const pts: string[] = [];
      for (let i = 0; i < 10; i++) {
        const a = -Math.PI / 2 + (i * Math.PI) / 5,
          rr = i % 2 ? 0.42 : 1;
        pts.push(`${w / 2 + (Math.cos(a) * rr * w) / 2} ${h / 2 + (Math.sin(a) * rr * h) / 2}`);
      }
      return `M${pts.join("L")}Z`;
    }
    case "arrow":
      return `M0 ${h * 0.3}H${w * 0.62}V0L${w} ${h / 2}L${w * 0.62} ${h}V${h * 0.7}H0Z`;
    case "chevron":
      return `M0 0H${w * 0.72}L${w} ${h / 2}L${w * 0.72} ${h}H0L${w * 0.28} ${h / 2}Z`;
    case "line":
      return `M0 ${h / 2}H${w}`;
    case "blob":
      return `M${w * 0.52} ${h * 0.02}C${w * 0.8} ${h * 0.0} ${w * 1.0} ${h * 0.25} ${w * 0.98} ${h * 0.52}C${w * 0.96} ${h * 0.82} ${w * 0.7} ${h * 1.0} ${w * 0.45} ${h * 0.98}C${w * 0.18} ${h * 0.96} ${w * 0.0} ${h * 0.72} ${w * 0.03} ${h * 0.45}C${w * 0.06} ${h * 0.18} ${w * 0.25} ${h * 0.04} ${w * 0.52} ${h * 0.02}Z`;
    case "pill":
      r = m / 2;
    // falls through
    case "round":
    case "rect":
    default: {
      const rr = Math.max(0, Math.min(kind === "rect" ? r : r || m * 0.12, m / 2));
      return `M${rr} 0H${w - rr}A${rr} ${rr} 0 0 1 ${w} ${rr}V${h - rr}A${rr} ${rr} 0 0 1 ${w - rr} ${h}H${rr}A${rr} ${rr} 0 0 1 0 ${h - rr}V${rr}A${rr} ${rr} 0 0 1 ${rr} 0Z`;
    }
  }
}

export function seriesColors(deck: Deck): string[] {
  const p = palette(deck);
  return [p.accent, p.accent2, p.accent3, p.muted, p.ink];
}

const esc = (s: string) => s.replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" })[c]!);

/** Chart as standalone SVG markup: used on the canvas, in PDF and in HTML exports. */
export function chartSvg(deck: Deck, el: ChartEl, font = "Arial, sans-serif"): string {
  const { w, h } = el;
  const ink = paint(deck, el.color, "#111");
  const grid = paint(deck, "theme:line", "#ddd");
  const colors = seriesColors(deck);
  const pad = { l: 56, r: 16, t: el.legend ? 40 : 14, b: 40 };
  const fs = Math.max(11, Math.min(18, h / 22));
  let out = "";
  const legend = el.legend
    ? el.series
        .map(
          (s, i) =>
            `<rect x="${pad.l + i * 150}" y="8" width="14" height="14" rx="3" fill="${colors[i % colors.length]}"/><text x="${pad.l + i * 150 + 20}" y="20" font-size="${fs}" fill="${ink}">${esc(s.name)}</text>`,
        )
        .join("")
    : "";
  if (el.kind === "pie" || el.kind === "donut") {
    const vals = el.series[0]?.values ?? [];
    const total = vals.reduce((a, b) => a + Math.max(0, b), 0) || 1;
    const cx = Math.min(w, h) / 2,
      cy = h / 2,
      r = Math.min(w, h) / 2 - 8;
    let a0 = -Math.PI / 2;
    vals.forEach((v, i) => {
      const a1 = a0 + (Math.max(0, v) / total) * Math.PI * 2;
      const large = a1 - a0 > Math.PI ? 1 : 0;
      const p0 = [cx + r * Math.cos(a0), cy + r * Math.sin(a0)],
        p1 = [cx + r * Math.cos(a1), cy + r * Math.sin(a1)];
      out += `<path d="M${cx} ${cy}L${p0[0]} ${p0[1]}A${r} ${r} 0 ${large} 1 ${p1[0]} ${p1[1]}Z" fill="${colors[i % colors.length]}" stroke="${paint(deck, "theme:surface", "#fff")}" stroke-width="3"/>`;
      a0 = a1;
    });
    if (el.kind === "donut") out += `<circle cx="${cx}" cy="${cy}" r="${r * 0.58}" fill="${paint(deck, "theme:surface", "#fff")}"/>`;
    // legend to the right
    const lx = Math.min(w, h) + 16;
    el.labels.forEach((l, i) => {
      const y = 24 + i * (fs + 14);
      out += `<rect x="${lx}" y="${y - fs + 2}" width="${fs}" height="${fs}" rx="3" fill="${colors[i % colors.length]}"/><text x="${lx + fs + 8}" y="${y}" font-size="${fs}" fill="${ink}">${esc(l)}${el.values ? ` · ${Math.round(((vals[i] ?? 0) / total) * 100)}%` : ""}</text>`;
    });
    return `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}" font-family="${esc(font)}">${out}</svg>`;
  }
  const all = el.series.flatMap((s) => s.values);
  const max = Math.max(1, ...all) * 1.12;
  const horizontal = el.kind === "bar";
  const iw = w - pad.l - pad.r,
    ih = h - pad.t - pad.b;
  const n = el.labels.length || 1;
  if (el.grid)
    for (let g = 0; g <= 4; g++) {
      const v = (max * g) / 4;
      if (horizontal) {
        const x = pad.l + (iw * g) / 4;
        out += `<line x1="${x}" y1="${pad.t}" x2="${x}" y2="${pad.t + ih}" stroke="${grid}"/>`;
      } else {
        const y = pad.t + ih - (ih * g) / 4;
        out += `<line x1="${pad.l}" y1="${y}" x2="${pad.l + iw}" y2="${y}" stroke="${grid}"/><text x="${pad.l - 8}" y="${y + 4}" font-size="${fs * 0.8}" text-anchor="end" fill="${ink}" opacity=".6">${Math.round(v)}</text>`;
      }
    }
  if (el.kind === "column" || el.kind === "bar") {
    const groups = el.series.length || 1;
    el.labels.forEach((label, i) => {
      const band = (horizontal ? ih : iw) / n;
      const bw = (band * 0.7) / groups;
      el.series.forEach((s, j) => {
        const v = s.values[i] ?? 0,
          len = (Math.max(0, v) / max) * (horizontal ? iw : ih);
        const c = colors[j % colors.length];
        if (horizontal) {
          const y = pad.t + band * i + band * 0.15 + bw * j;
          out += `<rect x="${pad.l}" y="${y}" width="${len}" height="${bw}" rx="${Math.min(6, bw / 3)}" fill="${c}"/>`;
          if (el.values) out += `<text x="${pad.l + len + 6}" y="${y + bw / 2 + fs / 3}" font-size="${fs * 0.85}" fill="${ink}">${v}</text>`;
        } else {
          const x = pad.l + band * i + band * 0.15 + bw * j;
          out += `<rect x="${x}" y="${pad.t + ih - len}" width="${bw}" height="${len}" rx="${Math.min(6, bw / 3)}" fill="${c}"/>`;
          if (el.values) out += `<text x="${x + bw / 2}" y="${pad.t + ih - len - 6}" font-size="${fs * 0.85}" text-anchor="middle" font-weight="700" fill="${ink}">${v}</text>`;
        }
      });
      out += horizontal
        ? `<text x="${pad.l - 8}" y="${pad.t + band * i + band / 2 + fs / 3}" font-size="${fs}" text-anchor="end" fill="${ink}">${esc(label)}</text>`
        : `<text x="${pad.l + band * i + band / 2}" y="${h - 14}" font-size="${fs}" text-anchor="middle" fill="${ink}">${esc(label)}</text>`;
    });
  } else {
    const step = n > 1 ? iw / (n - 1) : iw;
    el.series.forEach((s, j) => {
      const c = colors[j % colors.length];
      const pts = el.labels.map((_, i) => [pad.l + step * i, pad.t + ih - ((s.values[i] ?? 0) / max) * ih]);
      const d = pts.map((p, i) => `${i ? "L" : "M"}${p[0]} ${p[1]}`).join("");
      if (el.kind === "area")
        out += `<path d="${d}L${pts.at(-1)![0]} ${pad.t + ih}L${pts[0][0]} ${pad.t + ih}Z" fill="${c}" opacity=".22"/>`;
      out += `<path d="${d}" fill="none" stroke="${c}" stroke-width="4" stroke-linejoin="round" stroke-linecap="round"/>`;
      pts.forEach((p, i) => {
        out += `<circle cx="${p[0]}" cy="${p[1]}" r="6" fill="${paint(deck, "theme:surface", "#fff")}" stroke="${c}" stroke-width="3"/>`;
        if (el.values) out += `<text x="${p[0]}" y="${p[1] - 12}" font-size="${fs * 0.85}" text-anchor="middle" font-weight="700" fill="${ink}">${s.values[i] ?? 0}</text>`;
      });
    });
    el.labels.forEach((label, i) => {
      out += `<text x="${pad.l + step * i}" y="${h - 14}" font-size="${fs}" text-anchor="middle" fill="${ink}">${esc(label)}</text>`;
    });
  }
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}" font-family="${esc(font)}">${legend}${out}</svg>`;
}

export function shapeSvg(deck: Deck, el: ShapeEl): string {
  const fill = paint(deck, el.fill, "none"),
    fill2 = el.fill2 ? paint(deck, el.fill2) : "";
  const gid = `g-${el.id}`;
  // Lines and line patterns are drawn with the fill colour (or its blend).
  const lined = el.shape === "line" || isStrokePattern(el.shape);
  const stroke = el.stroke ? paint(deck, el.stroke) : lined ? (fill2 && el.shape !== "line" ? `url(#${gid})` : fill) : "none";
  const sw = el.shape === "line" ? Math.max(el.strokeW, 2) : lined ? el.strokeW || 1.5 : el.strokeW;
  const rad = (el.angle * Math.PI) / 180;
  const grad = fill2
    ? `<defs><linearGradient id="${gid}" x1="${0.5 - Math.cos(rad) / 2}" y1="${0.5 - Math.sin(rad) / 2}" x2="${0.5 + Math.cos(rad) / 2}" y2="${0.5 + Math.sin(rad) / 2}"><stop stop-color="${fill}"/><stop offset="1" stop-color="${fill2}"/></linearGradient></defs>`
    : "";
  const inset = sw / 2;
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${el.w}" height="${el.h}" viewBox="${-inset} ${-inset} ${el.w + sw} ${el.h + sw}" preserveAspectRatio="none" overflow="${isPattern(el.shape) ? "hidden" : "visible"}">${grad}<path d="${shapePath(el.shape, el.w, el.h, el.radius)}" fill="${lined ? "none" : fill2 ? `url(#${gid})` : fill}" stroke="${stroke}" stroke-width="${sw}" stroke-linecap="round" vector-effect="non-scaling-stroke"/></svg>`;
}

export function qrMarkup(deck: Deck, value: string, color: string, bg: string): string {
  try {
    return qrSvg(value || "https://3d3d.ca", {
      ...defaultStyle,
      foreground: paint(deck, color, "#141717"),
      background: paint(deck, bg, "#ffffff"),
      quiet: 4,
      size: 480,
      dots: "round",
      corners: "round",
    });
  } catch {
    return "";
  }
}

export function backgroundCss(deck: Deck, bg: Background): CSSProperties {
  const c1 = paint(deck, bg.color, "#fff"),
    c2 = paint(deck, bg.color2, c1);
  const p = palette(deck);
  if (bg.kind === "gradient") return { background: `linear-gradient(${bg.angle}deg, ${c1}, ${c2})` };
  if (bg.kind === "mesh")
    return {
      background: `radial-gradient(60% 70% at 85% 10%, ${p.accent}40, transparent 60%), radial-gradient(55% 60% at 5% 95%, ${p.accent2}33, transparent 60%), linear-gradient(${bg.angle}deg, ${c1}, ${c2})`,
    };
  if (bg.kind === "image" && bg.image)
    return {
      backgroundColor: c1,
      backgroundImage: `linear-gradient(rgba(0,0,0,${bg.dim}), rgba(0,0,0,${bg.dim})), url("${bg.image}")`,
      backgroundSize: "cover",
      backgroundPosition: "center",
    };
  return { background: c1 };
}

const FILTERS: Record<string, string> = {
  none: "none",
  mono: "grayscale(1) contrast(1.05)",
  warm: "sepia(.35) saturate(1.2)",
  cool: "saturate(.9) hue-rotate(-12deg) brightness(1.03)",
  dim: "brightness(.7)",
  vivid: "saturate(1.45) contrast(1.08)",
};
const MASKS: Record<string, string | undefined> = {
  none: undefined,
  circle: "ellipse(50% 50% at 50% 50%)",
  arch: "inset(0 round 50% 50% 0 0 / 35% 35% 0 0)",
  blob: undefined,
};

export function shadowCss(deck: Deck, s: El["shadow"]): string | undefined {
  const a = palette(deck).accent;
  if (s === "soft") return "0 18px 44px -18px rgba(0,0,0,.35)";
  if (s === "lift") return "0 34px 70px -28px rgba(0,0,0,.55)";
  if (s === "glow") return `0 0 0 1px ${a}55, 0 0 46px -6px ${a}`;
  return undefined;
}

/* ---------------------------------------------------------------- DOM render */

/**
 * How an empty photo frame shows: the deck's dashed drop box, or (design
 * studios, 2026-10-09) a quiet tint with a photo mark, so a template still
 * reads as a finished design in its thumbnail before your photo goes in.
 */
export const EmptyFrame = createContext<"dashed" | "tint">("dashed");

export function ElementView({ deck, el, editing }: { deck: Deck; el: El; editing?: boolean }) {
  const locale = useLocale();
  const frame = useContext(EmptyFrame);
  const shadow = shadowCss(deck, el.shadow);
  switch (el.type) {
    case "text": {
      const fill = el.fill ? paint(deck, el.fill) : undefined;
      const lines = el.text.split("\n");
      const style: CSSProperties = {
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: el.valign === "middle" ? "center" : el.valign === "bottom" ? "flex-end" : "flex-start",
        fontFamily: fontStack(deck, el.font),
        fontSize: el.size,
        fontWeight: el.weight,
        fontStyle: el.italic ? "italic" : undefined,
        textDecoration: el.underline ? "underline" : undefined,
        textTransform: el.upper ? "uppercase" : undefined,
        color: paint(deck, el.color, "#111"),
        textAlign: el.align,
        lineHeight: el.lineHeight,
        letterSpacing: `${el.tracking}em`,
        background: fill,
        padding: el.pad,
        borderRadius: el.radius,
        boxShadow: shadow,
        whiteSpace: "pre-wrap",
        overflowWrap: "anywhere",
      };
      if (editing) return <div style={style} />;
      if (el.list === "none") return <div style={style}>{el.text}</div>;
      const marker = (i: number) =>
        el.list === "number" ? `${i + 1}.` : el.list === "check" ? "✓" : "•";
      return (
        <div style={style}>
          {lines.map((l, i) => (
            <div key={i} style={{ display: "flex", gap: "0.55em", marginBottom: "0.35em" }}>
              <span style={{ color: palette(deck).accent, fontWeight: 800, minWidth: "1em" }}>{marker(i)}</span>
              <span style={{ flex: 1 }}>{l}</span>
            </div>
          ))}
        </div>
      );
    }
    case "shape":
      return (
        <div
          style={{ width: "100%", height: "100%", filter: shadow ? `drop-shadow(${el.shadow === "glow" ? `0 0 22px ${palette(deck).accent}` : "0 18px 22px rgba(0,0,0,.28)"})` : undefined }}
          dangerouslySetInnerHTML={{ __html: shapeSvg(deck, el).replace("<svg ", '<svg style="width:100%;height:100%;display:block" ') }}
        />
      );
    case "image": {
      const clip =
        el.mask === "blob"
          ? `path("${shapePath("blob", el.w, el.h)}")`
          : MASKS[el.mask];
      return (
        <div
          style={{
            width: "100%",
            height: "100%",
            overflow: "hidden",
            borderRadius: el.mask === "none" ? el.radius : undefined,
            clipPath: clip,
            boxShadow: el.mask === "none" ? shadow : undefined,
            border: el.border && el.borderW ? `${el.borderW}px solid ${paint(deck, el.border)}` : undefined,
            background: el.src
              ? undefined
              : frame === "tint"
                ? `${palette(deck).accent}24`
                : `linear-gradient(135deg, ${palette(deck).accent}33, ${palette(deck).accent2}33)`,
          }}
        >
          {!el.src && frame === "tint" ? (
            <svg
              viewBox="0 0 24 24"
              width={Math.max(10, Math.min(el.w, el.h) * 0.22)}
              height={Math.max(10, Math.min(el.w, el.h) * 0.22)}
              fill="none"
              stroke={palette(deck).accent}
              strokeWidth={1.6}
              strokeLinecap="round"
              strokeLinejoin="round"
              opacity={0.8}
              style={{ display: "block", margin: "auto", height: "100%" }}
              aria-hidden="true"
            >
              <path d="M4 5h16v14H4z" />
              <path d="M4 15l5-5 4 4 3-3 4 4" />
              <circle cx="15.5" cy="8.5" r="1.4" />
            </svg>
          ) : el.src ? (
            <img
              src={el.src}
              alt=""
              draggable={false}
              style={{
                width: "100%",
                height: "100%",
                objectFit: el.fit,
                objectPosition: `${el.fx}% ${el.fy}%`,
                filter: FILTERS[el.filter],
                display: "block",
              }}
            />
          ) : (
            <div className="ds-image-empty">{dt("Double-click to add a photo", locale)}</div>
          )}
        </div>
      );
    }
    case "icon": {
      const color = paint(deck, el.color, "#111");
      return (
        <div
          style={{
            width: "100%",
            height: "100%",
            display: "grid",
            placeItems: "center",
            background: el.fill ? paint(deck, el.fill) : undefined,
            borderRadius: el.radius,
            boxShadow: shadow,
          }}
        >
          <svg
            viewBox="0 0 24 24"
            width={el.fill ? "58%" : "100%"}
            height={el.fill ? "58%" : "100%"}
            fill="none"
            stroke={color}
            strokeWidth={el.strokeW}
            strokeLinecap="round"
            strokeLinejoin="round"
            dangerouslySetInnerHTML={{ __html: el.paths }}
          />
        </div>
      );
    }
    case "chart":
      return (
        <div
          style={{ width: "100%", height: "100%" }}
          dangerouslySetInnerHTML={{
            __html: chartSvg(deck, el, fontStack(deck, "body")).replace("<svg ", '<svg style="width:100%;height:100%;display:block;overflow:visible" '),
          }}
        />
      );
    case "table":
      return <TableView deck={deck} el={el} />;
    case "qr":
      return (
        <div
          style={{ width: "100%", height: "100%", borderRadius: 12, overflow: "hidden", boxShadow: shadow }}
          dangerouslySetInnerHTML={{
            __html: qrMarkup(deck, el.value, el.color, el.bg).replace(/width="\d+" height="\d+"/, 'width="100%" height="100%"'),
          }}
        />
      );
  }
}

function TableView({ deck, el }: { deck: Deck; el: TableEl }) {
  const ink = paint(deck, el.color, "#111"),
    accent = paint(deck, el.accent, "#04d9c4"),
    line = paint(deck, "theme:line", "#ddd");
  return (
    <table
      style={{
        width: "100%",
        height: "100%",
        borderCollapse: "collapse",
        fontFamily: fontStack(deck, "body"),
        fontSize: el.size,
        color: ink,
        tableLayout: "fixed",
      }}
    >
      <tbody>
        {el.rows.map((row, i) => (
          <tr
            key={i}
            style={{
              background: el.header && i === 0 ? accent : el.stripe && i % 2 === 0 ? `${line}88` : undefined,
              color: el.header && i === 0 ? "#0a0a0a" : undefined,
              fontWeight: el.header && i === 0 ? 700 : undefined,
            }}
          >
            {row.map((cell, j) => (
              <td key={j} style={{ padding: "0.5em 0.7em", borderBottom: `1px solid ${line}`, overflowWrap: "anywhere" }}>
                {cell}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export function elBoxStyle(el: El, extra: CSSProperties = {}): CSSProperties {
  return {
    position: "absolute",
    left: el.x,
    top: el.y,
    width: el.w,
    height: el.h,
    transform: el.rot ? `rotate(${el.rot}deg)` : undefined,
    opacity: el.opacity,
    ...extra,
  };
}

/** A whole slide at design size. Scale it with a CSS transform from outside. */
export function SlideView({
  deck,
  slide,
  play = false,
}: {
  deck: Deck;
  slide: Slide;
  /** Run entrance animations (presenter). */
  play?: boolean;
}) {
  const r = dims(deck);
  let order = 0;
  return (
    <div
      className="ds-slide"
      style={{ position: "relative", width: r.w, height: r.h, overflow: "hidden", ...backgroundCss(deck, slide.bg) }}
    >
      {slide.els.map((el) => {
        const anim = play && el.anim !== "none" ? el.anim : "";
        const delay = anim ? order++ * 140 : 0;
        return (
          <div
            key={el.id}
            className={anim ? `ds-anim ds-anim-${anim}` : undefined}
            style={elBoxStyle(el, anim ? { animationDelay: `${delay}ms` } : {})}
          >
            <ElementView deck={deck} el={el} />
          </div>
        );
      })}
    </div>
  );
}

/** A slide scaled to a given width (thumbnails, previews, templates). */
export function SlideThumb({ deck, slide, width }: { deck: Deck; slide: Slide; width: number }) {
  const r = dims(deck);
  const s = width / r.w;
  return (
    <div className="ds-thumb" style={{ width, height: r.h * s }}>
      <div style={{ transform: `scale(${s})`, transformOrigin: "0 0", width: r.w, height: r.h, pointerEvents: "none" }}>
        <SlideView deck={deck} slide={slide} />
      </div>
    </div>
  );
}
