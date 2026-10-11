import geistLatin from "@fontsource-variable/geist/files/geist-latin-wght-normal.woff2?url";
import geistExt from "@fontsource-variable/geist/files/geist-latin-ext-wght-normal.woff2?url";
import monoLatin from "@fontsource-variable/geist-mono/files/geist-mono-latin-wght-normal.woff2?url";
import monoExt from "@fontsource-variable/geist-mono/files/geist-mono-latin-ext-wght-normal.woff2?url";
import { download } from "../../shared/browser";
import { FILTER_MATRIX, bgSvg, drawTableTextCanvas, elSvg, esc, loadImage, svgUrl } from "../deck-studio/export";
import { fontStack, paint, palette, type El, type ImageEl, type Slide, type TableEl, type TextEl } from "../deck-studio/model";
import { chartSvg, shapePath } from "../deck-studio/render";
import { BLEED, STUDIOS, fileName, type Design } from "./model";

/*
 * Files out of the design studios (2026-10-09). One drawing feeds
 * every format: the art as SVG, the words laid out the way the page lays
 * them out (same fonts, same line breaks, same baselines), photos cropped
 * exactly as framed. Print adds 3 mm of bleed: colour blocks and photos that
 * touch the trim run on past it, and the PDF carries crop marks plus trim
 * and bleed boxes. Nothing leaves the browser.
 */

const MM = 72 / 25.4;
type Edges = { l: number; t: number; r: number; b: number };
const NONE: Edges = { l: 0, t: 0, r: 0, b: 0 };

/* ---------------------------------------------------------------- text, laid out like the page */

type Line = { text: string; marker: string; x: number; y: number; anchor: "start" | "middle" | "end" };
type Laid = { font: string; markerFont: string; spacing: number; lines: Line[]; markerX: number };

function laid(ctx: CanvasRenderingContext2D, doc: Design, el: TextEl): Laid {
  const stack = fontStack(doc, el.font);
  const font = `${el.italic ? "italic " : ""}${el.weight} ${el.size}px ${stack}`;
  const spacing = el.tracking * el.size;
  ctx.font = font;
  (ctx as unknown as { letterSpacing: string }).letterSpacing = `${spacing}px`;
  const measure = (s: string) => ctx.measureText(s).width;
  const list = el.list !== "none";
  const markerW = list ? el.size * 1.55 : 0;
  const avail = Math.max(1, el.w - el.pad * 2 - markerW);
  const paras = (el.upper ? el.text.toUpperCase() : el.text).split("\n");
  const rows: { text: string; marker: string; para: number }[] = [];
  paras.forEach((para, pi) => {
    const marker = el.list === "number" ? `${pi + 1}.` : el.list === "check" ? "✓" : el.list === "bullet" ? "•" : "";
    let line = "",
      first = true;
    const push = (t: string) => {
      rows.push({ text: t, marker: first ? marker : "", para: pi });
      first = false;
    };
    for (const tok of para.split(/(\s+)/)) {
      if (!tok) continue;
      if (line && measure((line + tok).trimEnd()) > avail) {
        push(line.trimEnd());
        line = tok.trimStart();
      } else line += tok;
      // A word longer than the line breaks anywhere, as the page does.
      while (line.length > 1 && measure(line) > avail) {
        let n = line.length - 1;
        while (n > 1 && measure(line.slice(0, n)) > avail) n--;
        push(line.slice(0, n));
        line = line.slice(n);
      }
    }
    push(line.trimEnd());
  });
  // The line box: half the leading above the font's own ascent, as CSS does.
  const m = ctx.measureText("Hg");
  const asc = m.fontBoundingBoxAscent || el.size * 0.92,
    desc = m.fontBoundingBoxDescent || el.size * 0.22;
  const lh = el.size * el.lineHeight,
    gap = list ? el.size * 0.35 : 0;
  const block = rows.length * lh + (list ? paras.length * gap : 0);
  const inner = el.h - el.pad * 2;
  let y = el.y + el.pad + (el.valign === "middle" ? (inner - block) / 2 : el.valign === "bottom" ? inner - block : 0);
  const x0 = el.x + el.pad + markerW;
  const anchor = el.align === "center" ? "middle" : el.align === "right" ? "end" : "start";
  const x = anchor === "middle" ? x0 + avail / 2 : anchor === "end" ? x0 + avail : x0;
  const lines = rows.map((r, i) => {
    const line = { text: r.text, marker: r.marker, x, y: y + (lh - (asc + desc)) / 2 + asc, anchor } as Line;
    y += lh;
    if (list && (i === rows.length - 1 || rows[i + 1].para !== r.para)) y += gap;
    return line;
  });
  return { font, markerFont: `800 ${el.size}px ${stack}`, spacing, lines, markerX: el.x + el.pad };
}

function drawText(ctx: CanvasRenderingContext2D, doc: Design, el: TextEl) {
  ctx.save();
  ctx.globalAlpha = el.opacity;
  ctx.translate(el.x + el.w / 2, el.y + el.h / 2);
  ctx.rotate((el.rot * Math.PI) / 180);
  ctx.translate(-el.x - el.w / 2, -el.y - el.h / 2);
  const L = laid(ctx, doc, el);
  ctx.textBaseline = "alphabetic";
  const ink = paint(doc, el.color, "#111111");
  for (const l of L.lines) {
    if (l.marker) {
      ctx.font = L.markerFont;
      ctx.textAlign = "left";
      ctx.fillStyle = palette(doc).accent;
      ctx.fillText(l.marker, L.markerX, l.y);
      ctx.font = L.font;
    }
    ctx.fillStyle = ink;
    ctx.textAlign = l.anchor === "middle" ? "center" : l.anchor === "end" ? "right" : "left";
    ctx.fillText(l.text, l.x, l.y);
    if (el.underline) {
      const tw = ctx.measureText(l.text).width;
      const left = l.anchor === "middle" ? l.x - tw / 2 : l.anchor === "end" ? l.x - tw : l.x;
      ctx.fillRect(left, l.y + el.size * 0.12, tw, Math.max(0.5, el.size / 16));
    }
  }
  ctx.restore();
}

function textSvg(ctx: CanvasRenderingContext2D, doc: Design, el: TextEl): string {
  const L = laid(ctx, doc, el);
  const fam = esc(fontStack(doc, el.font));
  const common = `font-family="${fam}" font-size="${el.size}" letter-spacing="${L.spacing}"${el.italic ? ' font-style="italic"' : ""}`;
  const ink = paint(doc, el.color, "#111111");
  let out = "";
  for (const l of L.lines) {
    if (l.marker) out += `<text x="${L.markerX}" y="${l.y}" ${common} font-weight="800" fill="${palette(doc).accent}">${esc(l.marker)}</text>`;
    if (l.text) out += `<text x="${l.x}" y="${l.y}" ${common} font-weight="${el.weight}" fill="${ink}" text-anchor="${l.anchor}" xml:space="preserve"${el.underline ? ' text-decoration="underline"' : ""}>${esc(l.text)}</text>`;
  }
  const rot = el.rot ? ` transform="rotate(${el.rot} ${el.x + el.w / 2} ${el.y + el.h / 2})"` : "";
  return `<g${rot} opacity="${el.opacity}">${out}</g>`;
}

function tableTextSvg(ctx: CanvasRenderingContext2D, doc: Design, el: TableEl): string {
  const rows = el.rows.length || 1,
    cols = el.rows[0]?.length || 1;
  const rh = el.h / rows,
    cw = el.w / cols;
  const fam = esc(fontStack(doc, "body"));
  let out = "";
  el.rows.forEach((row, i) =>
    row.forEach((cell, j) => {
      const head = el.header && i === 0;
      ctx.font = `${head ? 700 : 400} ${el.size}px ${fontStack(doc, "body")}`;
      let t = cell;
      while (t && ctx.measureText(t).width > cw - el.size) t = t.slice(0, -1);
      const shown = t !== cell ? t.slice(0, -1) + "…" : t;
      out += `<text x="${el.x + j * cw + el.size * 0.6}" y="${el.y + i * rh + rh / 2 + el.size * 0.35}" font-family="${fam}" font-size="${el.size}" font-weight="${head ? 700 : 400}" fill="${head ? "#0a0a0a" : paint(doc, el.color, "#111111")}">${esc(shown)}</text>`;
    }),
  );
  const rot = el.rot ? ` transform="rotate(${el.rot} ${el.x + el.w / 2} ${el.y + el.h / 2})"` : "";
  return `<g${rot} opacity="${el.opacity}">${out}</g>`;
}

/* ---------------------------------------------------------------- art */

type Sizes = Map<string, { w: number; h: number }>;
async function photoSizes(slides: Slide[]): Promise<Sizes> {
  const out: Sizes = new Map();
  for (const s of slides)
    for (const e of s.els)
      if (e.type === "image" && e.src && !out.has(e.src)) {
        const img = await loadImage(e.src);
        out.set(e.src, { w: img.naturalWidth, h: img.naturalHeight });
      }
  return out;
}

/** A photo cropped exactly as its frame shows it (fit, focus point, mask, look, border). */
function photoArt(doc: Design, el: ImageEl, size: { w: number; h: number } | undefined, ext: Edges): string {
  if (!el.src || !size) return "";
  const { w, h } = el;
  const id = `p-${el.id}`;
  const X = -ext.l,
    Y = -ext.t,
    W = w + ext.l + ext.r,
    H = h + ext.t + ext.b;
  const outline =
    el.mask === "circle"
      ? `<ellipse cx="${w / 2}" cy="${h / 2}" rx="${w / 2}" ry="${h / 2}"/>`
      : el.mask === "arch"
        ? `<path d="M0 ${h}V${h * 0.35}A${w / 2} ${h * 0.35} 0 0 1 ${w / 2} 0A${w / 2} ${h * 0.35} 0 0 1 ${w} ${h * 0.35}V${h}Z"/>`
        : el.mask === "blob"
          ? `<path d="${shapePath("blob", w, h)}"/>`
          : `<rect x="${X}" y="${Y}" width="${W}" height="${H}" rx="${Math.max(0, Math.min(el.radius, w / 2, h / 2))}"/>`;
  const b = el.border && el.borderW ? el.borderW : 0;
  const cw = Math.max(1, W - 2 * b),
    ch = Math.max(1, H - 2 * b);
  const k = el.fit === "cover" ? Math.max(cw / size.w, ch / size.h) : Math.min(cw / size.w, ch / size.h);
  const dw = size.w * k,
    dh = size.h * k;
  const dx = X + b + ((cw - dw) * el.fx) / 100,
    dy = Y + b + ((ch - dh) * el.fy) / 100;
  const filter = FILTER_MATRIX[el.filter] ? `<filter id="f-${id}" color-interpolation-filters="sRGB"><feColorMatrix type="matrix" values="${FILTER_MATRIX[el.filter]}"/></filter>` : "";
  const border = b ? `<g clip-path="url(#c-${id})" fill="none" stroke="${paint(doc, el.border)}" stroke-width="${b * 2}">${outline}</g>` : "";
  const rot = el.rot ? ` rotate(${el.rot} ${w / 2} ${h / 2})` : "";
  return `<g transform="translate(${el.x} ${el.y})${rot}" opacity="${el.opacity}"><defs><clipPath id="c-${id}">${outline}</clipPath>${filter}</defs><g clip-path="url(#c-${id})"><image href="${el.src}" x="${dx}" y="${dy}" width="${dw}" height="${dh}" preserveAspectRatio="none"${filter ? ` filter="url(#f-${id})"` : ""}/></g>${border}</g>`;
}

/** The page's soft, lift and glow shadows, drawn the way the page draws them. */
function shadowArt(doc: Design, el: El): string {
  if (el.shadow === "none") return "";
  const accent = palette(doc).accent;
  const rot = el.rot ? ` rotate(${el.rot} ${el.w / 2} ${el.h / 2})` : "";
  const box = el.type === "image" ? el.mask === "none" : el.type === "qr" || ((el.type === "icon" || el.type === "text") && !!el.fill);
  if (!box) return "";
  const [inset, dy, blur, colour, alpha] =
    el.shadow === "soft" ? [18, 18, 44, "#000", 0.35] : el.shadow === "lift" ? [28, 34, 70, "#000", 0.55] : [6, 0, 46, accent, 1];
  const r = el.type === "qr" ? 12 : "radius" in el ? Math.min(el.radius, el.w / 2, el.h / 2) : 0;
  return `<g transform="translate(${el.x} ${el.y})${rot}" opacity="${el.opacity}"><defs><filter id="s-${el.id}" x="-1" y="-1" width="3" height="3"><feGaussianBlur stdDeviation="${blur / 2}"/></filter></defs><rect x="${inset}" y="${inset + dy}" width="${Math.max(0, el.w - inset * 2)}" height="${Math.max(0, el.h - inset * 2)}" rx="${r}" fill="${colour}" opacity="${alpha}" filter="url(#s-${el.id})"/></g>`;
}

function art(doc: Design, el: El, sizes: Sizes, ext: Edges = NONE): string {
  if (el.type === "image") return shadowArt(doc, el) + photoArt(doc, el, sizes.get(el.src), ext);
  if (el.type === "chart") {
    const rot = el.rot ? ` rotate(${el.rot} ${el.w / 2} ${el.h / 2})` : "";
    return `<g transform="translate(${el.x} ${el.y})${rot}" opacity="${el.opacity}">${chartSvg(doc, el, fontStack(doc, "body"))}</g>`;
  }
  if (el.type === "shape" && el.shadow !== "none") {
    const glow = el.shadow === "glow";
    return `<defs><filter id="s-${el.id}" x="-1" y="-1" width="3" height="3"><feDropShadow dx="0" dy="${glow ? 0 : 18}" stdDeviation="11" flood-color="${glow ? palette(doc).accent : "#000"}" flood-opacity="${glow ? 1 : 0.28}"/></filter></defs><g filter="url(#s-${el.id})">${elSvg(doc, el, false)}</g>`;
  }
  if (el.type === "qr") {
    // The page rounds the code's corners by 12.
    const rot = el.rot ? ` rotate(${el.rot} ${el.w / 2} ${el.h / 2})` : "";
    const inner = elSvg(doc, { ...el, x: 0, y: 0, rot: 0, opacity: 1 }, false);
    return `${shadowArt(doc, el)}<g transform="translate(${el.x} ${el.y})${rot}" opacity="${el.opacity}"><defs><clipPath id="q-${el.id}"><rect width="${el.w}" height="${el.h}" rx="12"/></clipPath></defs><g clip-path="url(#q-${el.id})">${inner}</g></g>`;
  }
  return shadowArt(doc, el) + elSvg(doc, el, false);
}

/** Print: colour blocks and photos that touch the trim run on into the bleed. */
function bleedOut(el: El, w: number, h: number, b: number): { el: El; ext: Edges } {
  if (!b || el.rot) return { el, ext: NONE };
  const near = 0.75;
  const L = el.x <= near,
    T = el.y <= near,
    R = el.x + el.w >= w - near,
    B = el.y + el.h >= h - near;
  if (!(L || T || R || B)) return { el, ext: NONE };
  if (el.type === "image" && el.mask === "none" && el.radius <= 0.5)
    return { el, ext: { l: L ? el.x + b : 0, t: T ? el.y + b : 0, r: R ? w + b - el.x - el.w : 0, b: B ? h + b - el.y - el.h : 0 } };
  if (el.type === "shape" && el.shape === "rect") {
    const x = L ? Math.min(el.x, -b) : el.x,
      y = T ? Math.min(el.y, -b) : el.y;
    const r = R ? Math.max(el.x + el.w, w + b) : el.x + el.w,
      bt = B ? Math.max(el.y + el.h, h + b) : el.y + el.h;
    return { el: { ...el, x, y, w: r - x, h: bt - y }, ext: NONE };
  }
  return { el, ext: NONE };
}

/* ---------------------------------------------------------------- the page, as pixels or as SVG */

async function fontsReady() {
  try {
    await Promise.all([document.fonts.load('400 16px "Geist Variable"'), document.fonts.load('400 16px "Geist Mono Variable"')]);
    await document.fonts.ready;
  } catch {
    /* system fonts still draw */
  }
}

/** The page at `k` pixels per design unit, with `bleed` design units of artwork around it. */
async function pagePixels(doc: Design, slide: Slide, k: number, bleed = 0): Promise<HTMLCanvasElement> {
  await fontsReady();
  const { w, h } = doc.size!;
  const W = w + 2 * bleed,
    H = h + 2 * bleed;
  const canvas = document.createElement("canvas");
  canvas.width = Math.round(W * k);
  canvas.height = Math.round(H * k);
  const ctx = canvas.getContext("2d");
  if (!ctx) throw new Error("This browser cannot draw the page.");
  ctx.scale(canvas.width / W, canvas.height / H);
  ctx.translate(bleed, bleed);
  const sizes = await photoSizes([slide]);
  // Art goes down as one picture until a word has to sit on top of it.
  let layer = `<g transform="translate(${-bleed} ${-bleed})">${bgSvg(doc, slide.bg, W, H)}</g>`;
  const flush = async () => {
    if (!layer) return;
    const svg = `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="${W}" height="${H}" viewBox="${-bleed} ${-bleed} ${W} ${H}">${layer}</svg>`;
    ctx.drawImage(await loadImage(svgUrl(svg)), -bleed, -bleed, W, H);
    layer = "";
  };
  for (const el of slide.els) {
    const b = bleedOut(el, w, h, bleed);
    layer += art(doc, b.el, sizes, b.ext);
    if (el.type === "text" && el.text.trim()) {
      await flush();
      drawText(ctx, doc, el);
    } else if (el.type === "table") {
      await flush();
      drawTableTextCanvas(ctx, doc, el);
    }
  }
  await flush();
  return canvas;
}

let faceCss: Promise<string> | null = null;
/** Geist and Geist Mono inside the SVG, so it opens looking as designed. */
function embeddedFonts(): Promise<string> {
  const LATIN = "U+0000-00FF,U+0131,U+0152-0153,U+02BB-02BC,U+02C6,U+02DA,U+02DC,U+0304,U+0308,U+0329,U+2000-206F,U+20AC,U+2122,U+2191,U+2193,U+2212,U+2215,U+FEFF,U+FFFD";
  const EXT = "U+0100-02BA,U+02BD-02C5,U+02C7-02CC,U+02CE-02D7,U+02DD-02FF,U+0304,U+0308,U+0329,U+1D00-1DBF,U+1E00-1E9F,U+1EF2-1EFF,U+2020,U+20A0-20AB,U+20AD-20C0,U+2113,U+2C60-2C7F,U+A720-A7FF";
  const faces: [string, string, string][] = [
    [geistExt, "Geist Variable", EXT],
    [geistLatin, "Geist Variable", LATIN],
    [monoExt, "Geist Mono Variable", EXT],
    [monoLatin, "Geist Mono Variable", LATIN],
  ];
  return (faceCss ??= Promise.all(
    faces.map(async ([url, family, range]) => {
      const bytes = new Uint8Array(await (await fetch(url)).arrayBuffer());
      let bin = "";
      for (let i = 0; i < bytes.length; i += 0x8000) bin += String.fromCharCode(...bytes.subarray(i, i + 0x8000));
      return `@font-face{font-family:"${family}";src:url(data:font/woff2;base64,${btoa(bin)}) format("woff2");font-weight:100 900;unicode-range:${range}}`;
    }),
  ).then((css) => css.join("")));
}

export async function pageSvg(doc: Design, slide: Slide): Promise<string> {
  await fontsReady();
  const { w, h } = doc.size!;
  const sizes = await photoSizes([slide]);
  const ctx = document.createElement("canvas").getContext("2d")!;
  let body = bgSvg(doc, slide.bg, w, h);
  for (const el of slide.els) {
    body += art(doc, el, sizes);
    if (el.type === "text" && el.text.trim()) body += textSvg(ctx, doc, el);
    else if (el.type === "table") body += tableTextSvg(ctx, doc, el);
  }
  const print = STUDIOS[doc.studio].print;
  const size = print ? `width="${+(w / 72).toFixed(4)}in" height="${+(h / 72).toFixed(4)}in"` : `width="${w}" height="${h}"`;
  return `<?xml version="1.0" encoding="UTF-8"?>\n<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" ${size} viewBox="0 0 ${w} ${h}"><title>${esc(doc.title)}</title><defs><style>${await embeddedFonts()}</style></defs>${body}</svg>`;
}

/* ---------------------------------------------------------------- files */

/** 300 DPI unless the page is too big for one browser canvas (a 24 × 36 in poster draws at 200). */
export function printDpi(wPt: number, hPt: number): number {
  let dpi = 300;
  while (dpi > 100 && (wPt / 72) * (hPt / 72) * dpi * dpi > 40e6) dpi -= 25;
  return dpi;
}

const jpeg = (c: HTMLCanvasElement) => c.toDataURL("image/jpeg", 0.95);
const toBlob = (c: HTMLCanvasElement, type: string, q?: number) =>
  new Promise<Blob>((res, rej) => c.toBlob((b) => (b ? res(b) : rej(new Error("Export failed"))), type, q));

/** Tell image apps the PNG's print resolution (a pHYs chunk), so it opens at its real size. */
async function pngAtDpi(blob: Blob, dpi: number): Promise<Blob> {
  const src = new Uint8Array(await blob.arrayBuffer());
  const ppm = Math.round(dpi / 0.0254);
  const chunk = new Uint8Array(21);
  const v = new DataView(chunk.buffer);
  v.setUint32(0, 9);
  chunk.set([0x70, 0x48, 0x59, 0x73], 4); // "pHYs"
  v.setUint32(8, ppm);
  v.setUint32(12, ppm);
  chunk[16] = 1; // metres
  v.setUint32(17, crc32(chunk.subarray(4, 17)));
  // After the 8-byte signature and the 25-byte IHDR chunk.
  const out = new Uint8Array(src.length + chunk.length);
  out.set(src.subarray(0, 33));
  out.set(chunk, 33);
  out.set(src.subarray(33), 33 + chunk.length);
  return new Blob([out], { type: "image/png" });
}
let CRC: Uint32Array | null = null;
function crc32(bytes: Uint8Array): number {
  if (!CRC) {
    CRC = new Uint32Array(256);
    for (let n = 0; n < 256; n++) {
      let c = n;
      for (let k = 0; k < 8; k++) c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1;
      CRC[n] = c >>> 0;
    }
  }
  let c = 0xffffffff;
  for (const b of bytes) c = CRC[(c ^ b) & 0xff] ^ (c >>> 8);
  return (c ^ 0xffffffff) >>> 0;
}

/** Trim + 3 mm bleed + 5 mm for the crop marks, one page per face, trim and bleed boxes set. */
async function printPdf(doc: Design) {
  const [{ jsPDF }, { PDFDocument }] = await Promise.all([import("jspdf"), import("pdf-lib")]);
  const { w, h } = doc.size!;
  const b = BLEED,
    margin = b + 5 * MM;
  const PW = w + margin * 2,
    PH = h + margin * 2;
  const dpi = printDpi(w + 2 * b, h + 2 * b);
  const orientation = PW > PH ? "landscape" : "portrait";
  const pdf = new jsPDF({ unit: "pt", format: [PW, PH], orientation, compress: true });
  for (const [i, slide] of doc.slides.entries()) {
    if (i) pdf.addPage([PW, PH], orientation);
    const c = await pagePixels(doc, slide, dpi / 72, b);
    pdf.addImage(jpeg(c), "JPEG", margin - b, margin - b, w + 2 * b, h + 2 * b, undefined, "FAST");
    pdf.setDrawColor(0);
    pdf.setLineWidth(0.25);
    for (const x of [margin, margin + w])
      for (const y of [margin, margin + h]) {
        const dx = x === margin ? -1 : 1,
          dy = y === margin ? -1 : 1;
        pdf.line(x + dx * (b + 1 * MM), y, x + dx * (b + 4.5 * MM), y);
        pdf.line(x, y + dy * (b + 1 * MM), x, y + dy * (b + 4.5 * MM));
      }
  }
  const out = await PDFDocument.load(pdf.output("arraybuffer"));
  for (const page of out.getPages()) {
    page.setTrimBox(margin, margin, w, h);
    page.setBleedBox(margin - b, margin - b, w + 2 * b, h + 2 * b);
  }
  out.setTitle(doc.title);
  out.setCreator("3D3D Design Studio");
  download(`${fileName(doc)}-print.pdf`, new Uint8Array(await out.save()), "application/pdf");
}

/** Ten cards per page, two across and five down, with cut marks: fronts, then backs. */
async function sheetPdf(doc: Design) {
  const { jsPDF } = await import("jspdf");
  const { w, h } = doc.size!;
  // Five 55 mm rows leave no printable margin on Letter, so 85 × 55 mm cards go on A4.
  const [SW, SH, paper] = doc.format === "us" ? [612, 792, "Letter"] : [595.28, 841.89, "A4"];
  const mx = (SW - 2 * w) / 2,
    my = (SH - 5 * h) / 2;
  const pdf = new jsPDF({ unit: "pt", format: [SW, SH], orientation: "portrait", compress: true });
  for (const [i, slide] of doc.slides.entries()) {
    if (i) pdf.addPage([SW, SH], "portrait");
    const face = jpeg(await pagePixels(doc, slide, 300 / 72));
    for (let r = 0; r < 5; r++) for (let col = 0; col < 2; col++) pdf.addImage(face, "JPEG", mx + col * w, my + r * h, w, h, `face-${i}`, "FAST");
    pdf.setDrawColor(0);
    pdf.setLineWidth(0.25);
    for (const x of [mx, mx + w, mx + 2 * w]) {
      pdf.line(x, my - 1.5 * MM, x, Math.max(2 * MM, my - 8 * MM));
      pdf.line(x, my + 5 * h + 1.5 * MM, x, Math.min(SH - 2 * MM, my + 5 * h + 8 * MM));
    }
    for (let r = 0; r <= 5; r++) {
      const y = my + r * h;
      pdf.line(mx - 1.5 * MM, y, mx - 8 * MM, y);
      pdf.line(mx + 2 * w + 1.5 * MM, y, mx + 2 * w + 8 * MM, y);
    }
  }
  pdf.setProperties({ title: `${doc.title} · 10-up ${paper}`, creator: "3D3D Design Studio" });
  pdf.save(`${fileName(doc)}-10-up-${paper.toLowerCase()}.pdf`);
}

export async function exportDesign(doc: Design, kind: "pdf" | "png" | "jpg" | "svg" | "sheet", cur = 0) {
  const slide = doc.slides[cur] ?? doc.slides[0];
  const side = doc.slides.length > 1 ? `-${cur === 0 ? "front" : "back"}` : "";
  const print = STUDIOS[doc.studio].print;
  if (kind === "pdf") return printPdf(doc);
  if (kind === "sheet") return sheetPdf(doc);
  if (kind === "svg") return download(`${fileName(doc)}${side}.svg`, await pageSvg(doc, slide), "image/svg+xml");
  const { w, h } = doc.size!;
  const dpi = print ? printDpi(w, h) : 72;
  // Social sizes are exact pixels; print sizes draw at their print resolution.
  const c = await pagePixels(doc, slide, print ? dpi / 72 : 1);
  if (kind === "jpg") return download(`${fileName(doc)}${side}.jpg`, await toBlob(c, "image/jpeg", 0.92), "image/jpeg");
  const png = await toBlob(c, "image/png");
  download(`${fileName(doc)}${side}.png`, print ? await pngAtDpi(png, dpi) : png, "image/png");
}
