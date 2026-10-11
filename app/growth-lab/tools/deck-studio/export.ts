import { download, svgPng } from "../../shared/browser";
import {
  dims,
  fontFor,
  fontId,
  fontStack,
  paint,
  palette,
  type Background,
  type Deck,
  type El,
  type ImageEl,
  type Slide,
  type TableEl,
  type TextEl,
} from "./model";
import { chartSvg, qrMarkup, shapeSvg } from "./render";
import { iconSvg } from "./icons";

export const esc = (s: string) => s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!);
export const safeName = (d: Deck) => (d.title.trim().replace(/[^\p{L}\p{N}]+/gu, "-").replace(/^-|-$/g, "").slice(0, 60) || "presentation").toLowerCase();

/* ---------------------------------------------------------------- SVG art (everything except live text) */

export function bgSvg(deck: Deck, bg: Background, w: number, h: number): string {
  const c1 = paint(deck, bg.color, "#ffffff"),
    c2 = paint(deck, bg.color2, c1);
  const p = palette(deck);
  const rad = (bg.angle * Math.PI) / 180;
  // CSS angles start at "to top" and turn clockwise.
  const vx = Math.sin(rad),
    vy = -Math.cos(rad);
  const lin = `<linearGradient id="bgl" x1="${0.5 - vx / 2}" y1="${0.5 - vy / 2}" x2="${0.5 + vx / 2}" y2="${0.5 + vy / 2}"><stop stop-color="${c1}"/><stop offset="1" stop-color="${c2}"/></linearGradient>`;
  if (bg.kind === "gradient") return `<defs>${lin}</defs><rect width="${w}" height="${h}" fill="url(#bgl)"/>`;
  if (bg.kind === "mesh")
    return `<defs>${lin}<radialGradient id="m1" cx=".85" cy=".1" r=".65"><stop stop-color="${p.accent}" stop-opacity=".25"/><stop offset="1" stop-color="${p.accent}" stop-opacity="0"/></radialGradient><radialGradient id="m2" cx=".05" cy=".95" r=".6"><stop stop-color="${p.accent2}" stop-opacity=".2"/><stop offset="1" stop-color="${p.accent2}" stop-opacity="0"/></radialGradient></defs><rect width="${w}" height="${h}" fill="url(#bgl)"/><rect width="${w}" height="${h}" fill="url(#m1)"/><rect width="${w}" height="${h}" fill="url(#m2)"/>`;
  if (bg.kind === "image" && bg.image)
    return `<rect width="${w}" height="${h}" fill="${c1}"/><image href="${bg.image}" width="${w}" height="${h}" preserveAspectRatio="xMidYMid slice"/><rect width="${w}" height="${h}" fill="#000" opacity="${bg.dim}"/>`;
  return `<rect width="${w}" height="${h}" fill="${c1}"/>`;
}

export const FILTER_MATRIX: Record<string, string> = {
  mono: "0.33 0.33 0.33 0 0 0.33 0.33 0.33 0 0 0.33 0.33 0.33 0 0 0 0 0 1 0",
  warm: "1.1 0.1 0 0 0.02 0.05 1 0 0 0.01 0 0 0.85 0 0 0 0 0 1 0",
  cool: "0.92 0 0.05 0 0 0 1 0.05 0 0 0.05 0.05 1.1 0 0.02 0 0 0 1 0",
  dim: "0.7 0 0 0 0 0 0.7 0 0 0 0 0 0.7 0 0 0 0 0 1 0",
  vivid: "1.35 -0.2 -0.15 0 0 -0.1 1.3 -0.2 0 0 -0.1 -0.2 1.3 0 0 0 0 0 1 0",
};

function imageSvg(el: ImageEl, deck: Deck): string {
  if (!el.src) return "";
  const id = `c-${el.id}`;
  const clip =
    el.mask === "circle"
      ? `<ellipse cx="${el.w / 2}" cy="${el.h / 2}" rx="${el.w / 2}" ry="${el.h / 2}"/>`
      : el.mask === "arch"
        ? `<path d="M0 ${el.h}V${el.w / 2}A${el.w / 2} ${el.w / 2} 0 0 1 ${el.w} ${el.w / 2}V${el.h}Z"/>`
        : `<rect width="${el.w}" height="${el.h}" rx="${el.mask === "none" ? el.radius : 0}"/>`;
  const filter = FILTER_MATRIX[el.filter] ? `<filter id="f-${el.id}"><feColorMatrix type="matrix" values="${FILTER_MATRIX[el.filter]}"/></filter>` : "";
  const par = el.fit === "contain" ? "xMidYMid meet" : `x${el.fx < 34 ? "Min" : el.fx > 66 ? "Max" : "Mid"}Y${el.fy < 34 ? "Min" : el.fy > 66 ? "Max" : "Mid"} slice`;
  const border = el.border && el.borderW ? `<rect width="${el.w}" height="${el.h}" rx="${el.radius}" fill="none" stroke="${paint(deck, el.border)}" stroke-width="${el.borderW * 2}" clip-path="url(#${id})"/>` : "";
  return `<defs><clipPath id="${id}">${clip}</clipPath>${filter}</defs><g clip-path="url(#${id})"><image href="${el.src}" width="${el.w}" height="${el.h}" preserveAspectRatio="${par}"${filter ? ` filter="url(#f-${el.id})"` : ""}/></g>${border}`;
}

function tableArt(el: TableEl, deck: Deck): string {
  const rows = el.rows.length || 1,
    cols = el.rows[0]?.length || 1;
  const rh = el.h / rows;
  const line = paint(deck, "theme:line", "#ddd");
  let out = "";
  el.rows.forEach((_, i) => {
    const fill = el.header && i === 0 ? paint(deck, el.accent) : el.stripe && i % 2 === 0 ? line : "";
    if (fill) out += `<rect y="${i * rh}" width="${el.w}" height="${rh}" fill="${fill}" opacity="${el.header && i === 0 ? 1 : 0.55}"/>`;
    out += `<line x1="0" y1="${(i + 1) * rh}" x2="${el.w}" y2="${(i + 1) * rh}" stroke="${line}"/>`;
  });
  void cols;
  return out;
}

/** One element as SVG (text omitted when `withText` is false). */
export function elSvg(deck: Deck, el: El, withText: boolean): string {
  let inner = "";
  switch (el.type) {
    case "shape":
      inner = shapeSvg(deck, el);
      break;
    case "image":
      inner = imageSvg(el, deck);
      break;
    case "icon": {
      const tile = el.fill ? `<rect width="${el.w}" height="${el.h}" rx="${el.radius}" fill="${paint(deck, el.fill)}"/>` : "";
      const k = el.fill ? 0.58 : 1;
      const s = Math.min(el.w, el.h) * k;
      inner = `${tile}<svg x="${(el.w - s) / 2}" y="${(el.h - s) / 2}" width="${s}" height="${s}" viewBox="0 0 24 24" fill="none" stroke="${paint(deck, el.color, "#111")}" stroke-width="${el.strokeW}" stroke-linecap="round" stroke-linejoin="round">${el.paths}</svg>`;
      break;
    }
    case "chart":
      inner = chartSvg(deck, el, "Arial, Helvetica, sans-serif");
      break;
    case "qr":
      inner = qrMarkup(deck, el.value, el.color, el.bg).replace(/width="\d+" height="\d+"/, `width="${el.w}" height="${el.h}"`);
      break;
    case "table":
      inner = tableArt(el, deck);
      break;
    case "text":
      if (el.fill) inner = `<rect width="${el.w}" height="${el.h}" rx="${el.radius}" fill="${paint(deck, el.fill)}"/>`;
      if (withText) inner += "";
      break;
  }
  if (!inner) return "";
  const rot = el.rot ? ` rotate(${el.rot} ${el.w / 2} ${el.h / 2})` : "";
  return `<g transform="translate(${el.x} ${el.y})${rot}" opacity="${el.opacity}">${inner}</g>`;
}

export function slideArtSvg(deck: Deck, slide: Slide, opts: { bgOnly?: boolean; only?: El } = {}): string {
  const r = dims(deck);
  const els = opts.only ? [opts.only] : opts.bgOnly ? [] : slide.els;
  const bg = opts.only ? "" : bgSvg(deck, slide.bg, r.w, r.h);
  return `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="${r.w}" height="${r.h}" viewBox="0 0 ${r.w} ${r.h}">${bg}${els.map((e) => elSvg(deck, e, false)).join("")}</svg>`;
}

/* ---------------------------------------------------------------- Text layout shared by canvas and PDF */

export type Measure = (s: string) => number;
export type Line = { text: string; marker: string };
export function layoutText(el: TextEl, measure: Measure): Line[] {
  const raw = el.upper ? el.text.toUpperCase() : el.text;
  const markerW = el.list === "none" ? 0 : el.size * 1.55;
  const width = Math.max(10, el.w - el.pad * 2 - markerW);
  const out: Line[] = [];
  raw.split("\n").forEach((para, pi) => {
    const marker = el.list === "number" ? `${pi + 1}.` : el.list === "check" ? "✓" : el.list === "bullet" ? "•" : "";
    const words = para.split(/(\s+)/);
    let line = "";
    let first = true;
    for (const w of words) {
      const trial = line + w;
      if (line && measure(trial.trimEnd()) > width) {
        out.push({ text: line.trimEnd(), marker: first ? marker : "" });
        first = false;
        line = w.trimStart();
      } else line = trial;
    }
    out.push({ text: line.trimEnd(), marker: first ? marker : "" });
  });
  return out;
}

export function textOrigin(el: TextEl, lines: number) {
  const lh = el.size * el.lineHeight;
  const gap = el.list === "none" ? 0 : el.size * 0.35;
  const block = lines * lh + Math.max(0, lines - 1) * gap * 0;
  const inner = el.h - el.pad * 2;
  const top = el.y + el.pad + (el.valign === "middle" ? (inner - block) / 2 : el.valign === "bottom" ? inner - block : 0);
  return { lh, top };
}

export function drawTextCanvas(ctx: CanvasRenderingContext2D, deck: Deck, el: TextEl) {
  ctx.save();
  ctx.globalAlpha = el.opacity;
  ctx.translate(el.x + el.w / 2, el.y + el.h / 2);
  ctx.rotate((el.rot * Math.PI) / 180);
  ctx.translate(-el.x - el.w / 2, -el.y - el.h / 2);
  ctx.font = `${el.italic ? "italic " : ""}${el.weight} ${el.size}px ${fontStack(deck, el.font)}`;
  (ctx as unknown as { letterSpacing: string }).letterSpacing = `${el.tracking * el.size}px`;
  ctx.textBaseline = "alphabetic";
  const lines = layoutText(el, (s) => ctx.measureText(s).width);
  const { lh, top } = textOrigin(el, lines.length);
  const markerW = el.list === "none" ? 0 : el.size * 1.55;
  lines.forEach((l, i) => {
    const y = top + i * lh + (lh - el.size) / 2 + el.size * 0.82;
    const tw = ctx.measureText(l.text).width;
    const x0 = el.x + el.pad + markerW;
    const avail = el.w - el.pad * 2 - markerW;
    const x = el.align === "center" ? x0 + (avail - tw) / 2 : el.align === "right" ? x0 + avail - tw : x0;
    if (l.marker) {
      ctx.fillStyle = palette(deck).accent;
      ctx.fillText(l.marker, el.x + el.pad, y);
    }
    ctx.fillStyle = paint(deck, el.color, "#111");
    ctx.fillText(l.text, x, y);
    if (el.underline) ctx.fillRect(x, y + el.size * 0.12, tw, Math.max(1, el.size / 16));
  });
  ctx.restore();
}

export function drawTableTextCanvas(ctx: CanvasRenderingContext2D, deck: Deck, el: TableEl) {
  const rows = el.rows.length || 1,
    cols = el.rows[0]?.length || 1;
  const rh = el.h / rows,
    cw = el.w / cols;
  ctx.save();
  ctx.globalAlpha = el.opacity;
  ctx.translate(el.x + el.w / 2, el.y + el.h / 2);
  ctx.rotate((el.rot * Math.PI) / 180);
  ctx.translate(-el.x - el.w / 2, -el.y - el.h / 2);
  el.rows.forEach((row, i) =>
    row.forEach((cell, j) => {
      const head = el.header && i === 0;
      ctx.font = `${head ? 700 : 400} ${el.size}px ${fontStack(deck, "body")}`;
      ctx.fillStyle = head ? "#0a0a0a" : paint(deck, el.color, "#111");
      let t = cell;
      while (t && ctx.measureText(t).width > cw - el.size) t = t.slice(0, -1);
      ctx.fillText(t !== cell ? t.slice(0, -1) + "…" : t, el.x + j * cw + el.size * 0.6, el.y + i * rh + rh / 2 + el.size * 0.35);
    }),
  );
  ctx.restore();
}

export async function loadImage(src: string) {
  const img = new Image();
  img.src = src;
  await img.decode();
  return img;
}
export const svgUrl = (svg: string) => "data:image/svg+xml;charset=utf-8," + encodeURIComponent(svg);

/** Full slide on a canvas: art first, then text with the page's own loaded fonts. */
async function slideCanvas(deck: Deck, slide: Slide, k: number, textFilter: (el: El) => boolean = () => true) {
  const r = dims(deck);
  await document.fonts?.ready;
  const canvas = document.createElement("canvas");
  canvas.width = Math.round(r.w * k);
  canvas.height = Math.round(r.h * k);
  const ctx = canvas.getContext("2d");
  if (!ctx) throw new Error("This browser cannot draw slides.");
  ctx.scale(k, k);
  // Draw element by element so text keeps its stacking order with the art.
  ctx.drawImage(await loadImage(svgUrl(slideArtSvg(deck, slide, { bgOnly: true }))), 0, 0, r.w, r.h);
  for (const el of slide.els) {
    const art = elSvg(deck, el, false);
    if (art) ctx.drawImage(await loadImage(svgUrl(`<svg xmlns="http://www.w3.org/2000/svg" width="${r.w}" height="${r.h}" viewBox="0 0 ${r.w} ${r.h}">${art}</svg>`)), 0, 0, r.w, r.h);
    if (!textFilter(el)) continue;
    if (el.type === "text") drawTextCanvas(ctx, deck, el);
    if (el.type === "table") drawTableTextCanvas(ctx, deck, el);
  }
  return canvas;
}

/* ---------------------------------------------------------------- PDF */

const hexRgb = (hex: string): [number, number, number] => {
  const h = /^#[0-9a-f]{6}$/i.test(hex) ? hex : "#111111";
  return [parseInt(h.slice(1, 3), 16), parseInt(h.slice(3, 5), 16), parseInt(h.slice(5, 7), 16)];
};
const pdfSafe = (s: string) => s.replace(/✓/g, "•").replace(/[^\x09\x0a\x0d\x20-\x7e\xa0-\xff‘’“”•–…€]/g, "");

async function exportPdf(deck: Deck) {
  const { jsPDF } = await import("jspdf");
  const r = dims(deck);
  const pdf = new jsPDF({ orientation: r.w >= r.h ? "landscape" : "portrait", unit: "px", format: [r.w, r.h], hotfixes: ["px_scaling"], compress: true });
  const vector = (el: El) => el.type === "text" && !el.rot;
  let first = true;
  for (const slide of deck.slides) {
    if (slide.hidden) continue;
    // jsPDF opens with one page; every later visible slide adds its own.
    if (!first) pdf.addPage([r.w, r.h], r.w >= r.h ? "landscape" : "portrait");
    first = false;
    // Art and any rotated text as one image; straight text stays real, selectable text.
    const canvas = await slideCanvas(deck, slide, 2, (el) => !vector(el));
    pdf.addImage(canvas.toDataURL("image/jpeg", 0.92), "JPEG", 0, 0, r.w, r.h, undefined, "FAST");
    for (const el of slide.els) {
      if (!vector(el) || el.type !== "text") continue;
      const f = fontFor(fontId(deck, el.font));
      const style = el.weight >= 600 ? (el.italic ? "bolditalic" : "bold") : el.italic ? "italic" : "normal";
      pdf.setFont(f.pdf, style);
      pdf.setFontSize(el.size * 0.75);
      pdf.setCharSpace(el.tracking * el.size);
      pdf.setTextColor(...hexRgb(paint(deck, el.color, "#111111")));
      const lines = layoutText({ ...el, text: pdfSafe(el.text) }, (s) => pdf.getTextWidth(s));
      const { lh, top } = textOrigin(el, lines.length);
      const markerW = el.list === "none" ? 0 : el.size * 1.55;
      lines.forEach((l, j) => {
        const y = top + j * lh + (lh - el.size) / 2 + el.size * 0.82;
        const tw = pdf.getTextWidth(l.text);
        const x0 = el.x + el.pad + markerW,
          avail = el.w - el.pad * 2 - markerW;
        const x = el.align === "center" ? x0 + (avail - tw) / 2 : el.align === "right" ? x0 + avail - tw : x0;
        if (l.marker) {
          pdf.setTextColor(...hexRgb(palette(deck).accent));
          pdf.text(pdfSafe(l.marker), el.x + el.pad, y);
          pdf.setTextColor(...hexRgb(paint(deck, el.color, "#111111")));
        }
        if (el.opacity < 1) pdf.setGState(new (pdf as unknown as { GState: new (o: object) => unknown }).GState({ opacity: el.opacity }) as never);
        pdf.text(l.text, x, y);
        if (el.opacity < 1) pdf.setGState(new (pdf as unknown as { GState: new (o: object) => unknown }).GState({ opacity: 1 }) as never);
        if (el.underline) pdf.rect(x, y + el.size * 0.12, tw, Math.max(1, el.size / 16), "F");
      });
    }
  }
  pdf.setProperties({ title: deck.title, creator: "3D3D Deck Studio" });
  pdf.save(`${safeName(deck)}.pdf`);
}

/* ---------------------------------------------------------------- PPTX */

/** Opaque art (slide backgrounds) as JPEG: a tenth of the PNG size, same look. */
async function svgJpeg(svg: string, width: number, height: number): Promise<string> {
  const img = await loadImage(svgUrl(svg));
  const c = document.createElement("canvas");
  c.width = width;
  c.height = height;
  c.getContext("2d")!.drawImage(img, 0, 0, width, height);
  return c.toDataURL("image/jpeg", 0.9);
}

async function exportPptx(deck: Deck) {
  const { default: PptxGenJS } = await import("pptxgenjs");
  const r = dims(deck);
  const IN = (px: number) => px / 96;
  const pptx = new PptxGenJS();
  pptx.defineLayout({ name: "DECK", width: IN(r.w), height: IN(r.h) });
  pptx.layout = "DECK";
  pptx.title = deck.title;
  pptx.company = "";
  pptx.author = "";
  const hex = (p: string, d = "111111") => paint(deck, p, "#" + d).replace("#", "");
  const SHAPES: Record<string, string> = {
    rect: "rect",
    round: "roundRect",
    pill: "roundRect",
    ellipse: "ellipse",
    triangle: "triangle",
    diamond: "diamond",
    hexagon: "hexagon",
    star: "star5",
    arrow: "rightArrow",
    chevron: "chevron",
    line: "line",
  };
  for (const slide of deck.slides) {
    const s = pptx.addSlide();
    if (slide.hidden) (s as unknown as { hidden: boolean }).hidden = true;
    if (slide.bg.kind === "solid") s.background = { color: hex(slide.bg.color, "ffffff") };
    else s.background = { data: await svgJpeg(slideArtSvg(deck, slide, { bgOnly: true }), r.w * 1.5, r.h * 1.5) };
    for (const el of slide.els) {
      const box = { x: IN(el.x), y: IN(el.y), w: IN(el.w), h: IN(el.h), rotate: el.rot || undefined };
      const transparency = Math.round((1 - el.opacity) * 100);
      if (el.type === "text") {
        const f = fontFor(fontId(deck, el.font));
        const runs = (el.upper ? el.text.toUpperCase() : el.text).split("\n").map((line, i, all) => ({
          text: line,
          options: {
            breakLine: i < all.length - 1,
            bullet:
              el.list === "bullet"
                ? { indent: el.size * 0.75 }
                : el.list === "number"
                  ? { type: "number" as const, indent: el.size * 0.75 }
                  : el.list === "check"
                    ? { code: "2713", indent: el.size * 0.75 }
                    : undefined,
          },
        }));
        s.addText(runs, {
          ...box,
          fontFace: f.pptx,
          fontSize: Math.max(6, el.size * 0.75),
          color: hex(el.color),
          bold: el.weight >= 600,
          italic: el.italic,
          underline: el.underline ? { style: "sng" } : undefined,
          align: el.align,
          valign: el.valign,
          charSpacing: el.tracking * el.size * 0.75,
          lineSpacingMultiple: el.lineHeight,
          margin: el.pad * 0.75,
          fill: el.fill ? { color: hex(el.fill), transparency } : undefined,
          rectRadius: el.fill && el.radius ? IN(el.radius) : undefined,
          shape: el.fill && el.radius ? pptx.ShapeType.roundRect : undefined,
          transparency,
          fit: "none",
        });
      } else if (el.type === "shape" && SHAPES[el.shape] && !el.fill2) {
        s.addShape(SHAPES[el.shape] as never, {
          ...box,
          fill: el.fill && el.shape !== "line" ? { color: hex(el.fill), transparency } : { type: "none" as never },
          line: el.stroke || el.shape === "line" ? { color: hex(el.stroke || el.fill), width: Math.max(0.5, (el.shape === "line" ? Math.max(el.strokeW, 2) : el.strokeW) * 0.75), transparency } : undefined,
          rectRadius: el.shape === "round" ? IN(el.radius || Math.min(el.w, el.h) * 0.12) : el.shape === "pill" ? IN(Math.min(el.w, el.h) / 2) : undefined,
        });
      } else if (el.type === "image" && el.src) {
        s.addImage({
          data: el.mask === "none" && el.filter === "none" && !el.radius ? el.src : await svgPng(slideArtSvg(deck, slide, { only: { ...el, x: 0, y: 0, rot: 0, opacity: 1 } }).replace(/width="\d+" height="\d+" viewBox="0 0 \d+ \d+"/, `width="${el.w}" height="${el.h}" viewBox="0 0 ${el.w} ${el.h}"`), Math.round(el.w * 2), Math.round(el.h * 2)),
          ...box,
          sizing: el.mask === "none" && el.filter === "none" && !el.radius ? { type: el.fit, w: box.w, h: box.h } : undefined,
          transparency,
        });
      } else if (el.type === "chart" && el.labels.length) {
        const kinds = { column: "bar", bar: "bar", line: "line", area: "area", pie: "pie", donut: "doughnut" } as const;
        const p = palette(deck);
        s.addChart(pptx.ChartType[kinds[el.kind]], el.series.map((sr) => ({ name: sr.name, labels: el.labels, values: el.labels.map((_, i) => sr.values[i] ?? 0) })), {
          ...box,
          barDir: el.kind === "bar" ? "bar" : "col",
          chartColors: [p.accent, p.accent2, p.accent3, p.muted, p.ink].map((c) => c.replace("#", "")),
          showLegend: el.legend || el.kind === "pie" || el.kind === "donut",
          legendPos: el.kind === "pie" || el.kind === "donut" ? "r" : "t",
          showValue: el.values,
          showPercent: el.values && (el.kind === "pie" || el.kind === "donut"),
          dataLabelColor: hex(el.color),
          catAxisLabelColor: hex(el.color),
          valAxisLabelColor: hex(el.color),
          valGridLine: el.grid ? { color: hex("theme:line", "dddddd"), size: 0.5 } : { style: "none" },
          catGridLine: { style: "none" },
          holeSize: 58,
        });
      } else if (el.type === "table") {
        const rows = el.rows.map((row, i) =>
          row.map((cell) => ({
            text: cell,
            options: {
              bold: el.header && i === 0,
              color: el.header && i === 0 ? "0A0A0A" : hex(el.color),
              fill: el.header && i === 0 ? { color: hex(el.accent) } : el.stripe && i % 2 === 0 ? { color: hex("theme:line", "eeeeee") } : undefined,
            },
          })),
        );
        s.addTable(rows, {
          x: box.x,
          y: box.y,
          w: box.w,
          rowH: IN(el.h / Math.max(1, el.rows.length)),
          fontFace: fontFor(deck.fonts.body).pptx,
          fontSize: el.size * 0.75,
          border: { type: "solid", color: hex("theme:line", "dddddd"), pt: 0.5 },
          margin: 0.06,
        });
      } else {
        // Icons, QR codes, blends and custom geometry: a crisp picture.
        const art = slideArtSvg(deck, slide, { only: { ...el, x: 0, y: 0, rot: 0, opacity: 1 } }).replace(/width="\d+" height="\d+" viewBox="0 0 \d+ \d+"/, `width="${el.w}" height="${el.h}" viewBox="0 0 ${el.w} ${el.h}"`);
        // Icons and QR codes stay crisp at 2x; large blended shapes are soft by nature.
        const k = el.type === "shape" && el.w * el.h > 90_000 ? 1 : 2;
        s.addImage({ data: await svgPng(art, Math.round(el.w * k), Math.round(el.h * k)), ...box, transparency });
      }
    }
    if (slide.notes) s.addNotes(slide.notes);
  }
  await pptx.writeFile({ fileName: `${safeName(deck)}.pptx` });
}

/* ---------------------------------------------------------------- HTML */

async function exportHtml(deck: Deck) {
  const [{ renderToStaticMarkup }, { createElement }, { SlideView }] = await Promise.all([
    import("react-dom/server"),
    import("react"),
    import("./render"),
  ]);
  const r = dims(deck);
  const fontLinks = [...document.querySelectorAll<HTMLLinkElement>('link[rel="preload"][as="font"]')].map((l) => l.href);
  const faces: string[] = [];
  for (const [i, href] of fontLinks.slice(0, 2).entries()) {
    try {
      const b = await (await fetch(href)).blob();
      const data = await new Promise<string>((res) => {
        const fr = new FileReader();
        fr.onload = () => res(fr.result as string);
        fr.readAsDataURL(b);
      });
      faces.push(`@font-face{font-family:"${i ? "Geist Mono Variable" : "Geist Variable"}";src:url(${data}) format("woff2");font-weight:100 900}`);
    } catch {
      /* system fonts still work */
    }
  }
  const slides = deck.slides
    .filter((s) => !s.hidden)
    .map(
      (s, i) =>
        `<section class="s ${s.transition}" data-i="${i}"${i ? "" : ' data-on="1"'}><div class="f">${renderToStaticMarkup(createElement(SlideView, { deck, slide: s, play: true }))}</div><aside>${esc(s.notes)}</aside></section>`,
    )
    .join("");
  const css = `${faces.join("")}*{box-sizing:border-box}html,body{margin:0;height:100%;background:#050505;overflow:hidden;font-family:"Geist Variable",system-ui,sans-serif}.s{position:fixed;inset:0;display:grid;place-items:center;visibility:hidden}.s[data-on]{visibility:visible}.f{width:${r.w}px;height:${r.h}px;transform-origin:center;flex:none}.s aside{display:none}.s[data-on].fade .f{animation:fd .5s ease both}.s[data-on].slide .f{animation:sl .55s cubic-bezier(.2,.7,.2,1) both}.s[data-on].zoom .f{animation:zm .55s cubic-bezier(.2,.7,.2,1) both}.s[data-on].lift .f{animation:lf .6s cubic-bezier(.2,.7,.2,1) both}@keyframes fd{from{opacity:0}}@keyframes sl{from{opacity:0;translate:6% 0}}@keyframes zm{from{opacity:0;scale:.92}}@keyframes lf{from{opacity:0;translate:0 5%}}.ds-anim{animation:.7s cubic-bezier(.2,.7,.2,1) both;animation-play-state:paused}.s[data-on] .ds-anim{animation-play-state:running}.ds-anim-fade{animation-name:af}.ds-anim-rise{animation-name:ar}.ds-anim-zoom{animation-name:az}.ds-anim-left{animation-name:al}.ds-anim-right{animation-name:aR}.ds-anim-pop{animation-name:ap}@keyframes af{from{opacity:0}}@keyframes ar{from{opacity:0;translate:0 40px}}@keyframes az{from{opacity:0;scale:.85}}@keyframes al{from{opacity:0;translate:-60px 0}}@keyframes aR{from{opacity:0;translate:60px 0}}@keyframes ap{0%{opacity:0;scale:.5}70%{scale:1.08}}#n{position:fixed;right:14px;bottom:12px;color:#fff;font:12px ui-monospace,monospace;opacity:.55}@media print{html,body{overflow:visible;height:auto;background:#fff}.s{position:static;visibility:visible;break-after:page;display:block}.f{transform:none!important}#n{display:none}}@media (prefers-reduced-motion:reduce){*{animation:none!important}}`;
  const js = `(()=>{const S=[...document.querySelectorAll('.s')];let i=0;const n=document.getElementById('n');function fit(){const k=Math.min(innerWidth/${r.w},innerHeight/${r.h});document.querySelectorAll('.f').forEach(f=>f.style.transform='scale('+k+')')}function go(j){j=Math.max(0,Math.min(S.length-1,j));if(j===i&&S[i].hasAttribute('data-on'))return;S[i].removeAttribute('data-on');i=j;void S[i].offsetWidth;S[i].setAttribute('data-on','1');n.textContent=(i+1)+' / '+S.length;history.replaceState(null,'','#'+(i+1))}addEventListener('resize',fit);fit();addEventListener('keydown',e=>{if(['ArrowRight','ArrowDown','PageDown',' ','Enter'].includes(e.key)){e.preventDefault();go(i+1)}else if(['ArrowLeft','ArrowUp','PageUp','Backspace'].includes(e.key)){e.preventDefault();go(i-1)}else if(e.key==='Home')go(0);else if(e.key==='End')go(S.length-1);else if(e.key==='f')document.documentElement.requestFullscreen&&document.documentElement.requestFullscreen()});addEventListener('click',e=>go(e.clientX<innerWidth/3?i-1:i+1));let x0=null;addEventListener('touchstart',e=>x0=e.touches[0].clientX,{passive:true});addEventListener('touchend',e=>{if(x0===null)return;const d=e.changedTouches[0].clientX-x0;if(Math.abs(d)>40)go(d<0?i+1:i-1);x0=null});const h=parseInt(location.hash.slice(1));S[0].removeAttribute('data-on');i=0;go(h>0?h-1:0)})();`;
  const html = `<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>${esc(deck.title)}</title><style>${css}</style></head><body>${slides}<div id="n"></div><script>${js}</script></body></html>`;
  download(`${safeName(deck)}.html`, html, "text/html");
}

/* ---------------------------------------------------------------- entry */

export async function exportDeck(deck: Deck, kind: "pptx" | "pdf" | "html" | "png" | "json", cur = 0) {
  if (kind === "json") return download(`${safeName(deck)}.deck.json`, JSON.stringify(deck), "application/json");
  if (kind === "pdf") return exportPdf(deck);
  if (kind === "pptx") return exportPptx(deck);
  if (kind === "html") return exportHtml(deck);
  const canvas = await slideCanvas(deck, deck.slides[cur] ?? deck.slides[0], 2);
  const blob = await new Promise<Blob>((res, rej) => canvas.toBlob((b) => (b ? res(b) : rej(new Error("PNG export failed."))), "image/png"));
  download(`${safeName(deck)}-slide-${cur + 1}.png`, blob, "image/png");
}

export { iconSvg };
