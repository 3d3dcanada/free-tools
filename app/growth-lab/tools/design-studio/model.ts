import { initialTag, payload, safeUrl } from "../qr-code/model";
import { isDeck, themeById, uid, type Background, type Deck, type El, type Slide } from "../deck-studio/model";
import { localize, tl } from "./i18n";
import { TEMPLATES, type Template } from "./templates";

/*
 * The design studios (2026-10-09): flyer, poster, social image and
 * business card on the Deck Studio canvas. A design is a Deck with a page
 * size instead of a slide ratio. Print pages are drawn in points (1/72 in),
 * so a 10 pt line on screen is 10 pt on paper; social images in pixels.
 */

export type StudioId = "flyer" | "poster" | "social" | "card";
export type Format = { id: string; label: string; w: number; h: number; note: string };
const IN = 72,
  MM = 72 / 25.4;

export type Studio = {
  id: StudioId;
  print: boolean;
  unit: "pt" | "px";
  formats: Format[];
  /** Keep words this far inside the trim (print). */
  safe: number;
  /** Faces per design: a business card has a front and a back. */
  faces: string[];
};

export const STUDIOS: Record<StudioId, Studio> = {
  flyer: {
    id: "flyer",
    print: true,
    unit: "pt",
    safe: 0.25 * IN,
    faces: ["Page"],
    formats: [
      { id: "letter", label: "Letter", w: 8.5 * IN, h: 11 * IN, note: "8.5 × 11 in" },
      { id: "a4", label: "A4", w: 210 * MM, h: 297 * MM, note: "210 × 297 mm" },
      { id: "a5", label: "A5", w: 148 * MM, h: 210 * MM, note: "148 × 210 mm" },
      { id: "half", label: "Half Letter", w: 5.5 * IN, h: 8.5 * IN, note: "5.5 × 8.5 in" },
    ],
  },
  poster: {
    id: "poster",
    print: true,
    unit: "pt",
    safe: 0.5 * IN,
    faces: ["Poster"],
    formats: [
      { id: "11x17", label: "11 × 17", w: 11 * IN, h: 17 * IN, note: "11 × 17 in" },
      { id: "18x24", label: "18 × 24", w: 18 * IN, h: 24 * IN, note: "18 × 24 in" },
      { id: "24x36", label: "24 × 36", w: 24 * IN, h: 36 * IN, note: "24 × 36 in" },
      { id: "a3", label: "A3", w: 297 * MM, h: 420 * MM, note: "297 × 420 mm" },
      { id: "a2", label: "A2", w: 420 * MM, h: 594 * MM, note: "420 × 594 mm" },
    ],
  },
  social: {
    id: "social",
    print: false,
    unit: "px",
    safe: 0,
    faces: ["Image"],
    formats: [
      { id: "instagram", label: "Instagram Square", w: 1080, h: 1080, note: "1080 × 1080 px" },
      { id: "portrait", label: "Instagram Portrait", w: 1080, h: 1350, note: "1080 × 1350 px" },
      { id: "story", label: "Story", w: 1080, h: 1920, note: "1080 × 1920 px" },
      { id: "fbpost", label: "Facebook Post", w: 1200, h: 630, note: "1200 × 630 px" },
      { id: "fbcover", label: "Facebook Cover", w: 1640, h: 624, note: "1640 × 624 px" },
      { id: "lipost", label: "LinkedIn Post", w: 1200, h: 627, note: "1200 × 627 px" },
      { id: "libanner", label: "LinkedIn Banner", w: 1584, h: 396, note: "1584 × 396 px" },
      { id: "xpost", label: "X Post", w: 1600, h: 900, note: "1600 × 900 px" },
      { id: "xheader", label: "X Header", w: 1500, h: 500, note: "1500 × 500 px" },
      { id: "youtube", label: "YouTube Thumbnail", w: 1280, h: 720, note: "1280 × 720 px" },
      { id: "og", label: "Open Graph", w: 1200, h: 630, note: "1200 × 630 px" },
    ],
  },
  card: {
    id: "card",
    print: true,
    unit: "pt",
    safe: 0.125 * IN,
    faces: ["Front", "Back"],
    formats: [
      { id: "us", label: "US Card", w: 3.5 * IN, h: 2 * IN, note: "3.5 × 2 in" },
      { id: "eu", label: "EU Card", w: 85 * MM, h: 55 * MM, note: "85 × 55 mm" },
    ],
  },
};

/** 3 mm of artwork past the trim on every print export. */
export const BLEED = 3 * MM;
export const formatOf = (studio: StudioId, id: string) => STUDIOS[studio].formats.find((f) => f.id === id) ?? STUDIOS[studio].formats[0];

/* ---------------------------------------------------------------- Card details */

export const CARD_FIELDS = ["name", "role", "company", "phone", "email", "website", "address", "tagline"] as const;
export type CardField = (typeof CARD_FIELDS)[number];
export type CardDetails = Record<CardField, string>;
export const SAMPLE_DETAILS: Record<"en" | "fr", CardDetails> = {
  en: {
    name: "Alex Martin",
    role: "Independent Maker",
    company: "Studio Martin",
    phone: "+1 506 555 0100",
    email: "hello@example.com",
    website: "example.com",
    address: "100 Water Street, Saint John NB",
    tagline: "Good ideas deserve to be made.",
  },
  fr: {
    name: "Alex Martin",
    role: "Artisan indépendant",
    company: "Atelier Martin",
    phone: "+1 506 555 0100",
    email: "bonjour@example.com",
    website: "example.com",
    address: "100, rue Water, Saint-Jean (N.-B.)",
    tagline: "Les bonnes idées méritent d’être fabriquées.",
  },
};

const bare = (url: string) => url.trim().replace(/^https?:\/\//i, "").replace(/\/$/, "");
const fullUrl = (url: string) => (/^https?:\/\//i.test(url.trim()) ? url.trim() : "https://" + url.trim());
function fieldValue(k: string, d: CardDetails): string {
  const name = d.name.trim().split(/\s+/).filter(Boolean);
  if (k === "initials") return (name.length > 1 ? [name[0], name[name.length - 1]] : name).map((p) => p[0]).join("").toUpperCase();
  if (k === "first") return name[0] ?? "";
  if (k === "last") return name.slice(1).join(" ");
  if (k === "website") return bare(d.website);
  return (d as Record<string, string>)[k] ?? "";
}
/** "{phone}\n{email}" with each line dropped when every field on it is empty. */
export function fillBind(bind: string, d: CardDetails): string {
  return bind
    .split("\n")
    .map((line) => {
      const keys = [...line.matchAll(/\{(\w+)\}/g)].map((m) => m[1]);
      if (keys.length && keys.every((k) => !fieldValue(k, d).trim())) return null;
      return line.replace(/\{(\w+)\}/g, (_, k: string) => fieldValue(k, d));
    })
    .filter((l): l is string => l !== null)
    .join("\n");
}
/** What the card's QR encodes: the website, or the details as a vCard. Throws a readable error. */
export function cardQr(d: CardDetails, kind: "url" | "vcard"): string {
  if (kind === "url") {
    if (!d.website.trim()) throw new Error("Add a website for the QR code, or switch it to a contact card.");
    return safeUrl(fullUrl(d.website));
  }
  const [first = "", ...rest] = d.name.trim().split(/\s+/);
  return payload({
    ...initialTag,
    kind: "vcard",
    fields: {
      ...initialTag.fields,
      first,
      last: rest.join(" "),
      company: d.company,
      phone: d.phone,
      email: d.email,
      url: d.website.trim() ? fullUrl(d.website) : "",
      address: d.address,
    },
  });
}

/* ---------------------------------------------------------------- Designs */

export type Design = Deck & {
  studio: StudioId;
  format: string;
  template: string;
  details?: CardDetails;
  qrKind?: "url" | "vcard";
};

export function isDesign(v: unknown, studio: StudioId): v is Design {
  if (!isDeck(v)) return false;
  const d = v as Design;
  return (
    d.studio === studio &&
    !!d.size &&
    STUDIOS[studio].formats.some((f) => f.id === d.format) &&
    typeof d.template === "string" &&
    d.template.length <= 60 &&
    (studio !== "card" ||
      (!!d.details &&
        CARD_FIELDS.every((k) => typeof d.details![k] === "string" && d.details![k].length <= 200) &&
        (d.qrKind === "url" || d.qrKind === "vcard")))
  );
}

export const templatesOf = (studio: StudioId) => TEMPLATES[studio];
export const fileName = (d: Design) =>
  (d.title.trim().replace(/[^\p{L}\p{N}]+/gu, "-").replace(/^-|-$/g, "").slice(0, 60) || d.studio).toLowerCase();
export const templateOf = (studio: StudioId, id: string): Template => TEMPLATES[studio].find((t) => t.id === id) ?? TEMPLATES[studio][0];

/** A fresh design: the template drawn for the format, in the visitor's language. */
export function buildDesign(
  studio: StudioId,
  templateId: string,
  formatId: string,
  locale: "en" | "fr",
  card?: { details: CardDetails; qrKind: "url" | "vcard" },
): Design {
  const tpl = templateOf(studio, templateId),
    fmt = formatOf(studio, formatId),
    th = themeById(tpl.theme);
  const slides: Slide[] = tpl.pages.map((page) => {
    const art = page(fmt.w, fmt.h);
    // Every part of a template has a slot, so a resize can tell the template's own parts from yours.
    art.els.forEach((e, i) => (e.slot ??= `~${i}`));
    return {
      id: uid(),
      bg: { ...th.bg, image: "", dim: 0, ...(art.bg ?? {}) } as Background,
      els: localize(art.els, locale),
      notes: "",
      transition: "none",
    };
  });
  const doc: Design = {
    v: 1,
    title: tl(tpl.name, locale),
    ratio: "16:9",
    size: { w: fmt.w, h: fmt.h },
    theme: tpl.theme,
    colors: {},
    fonts: { heading: "geist", body: "geist" },
    slides,
    studio,
    format: fmt.id,
    template: tpl.id,
  };
  if (studio !== "card") return doc;
  return applyDetails({ ...doc, details: card?.details ?? SAMPLE_DETAILS[locale], qrKind: card?.qrKind ?? "vcard" });
}

/** Fill every bound text and QR from the card details. */
export function applyDetails(d: Design): Design {
  if (!d.details) return d;
  let code = "";
  try {
    code = cardQr(d.details, d.qrKind ?? "vcard");
  } catch {
    /* the Card panel shows the problem; the code keeps its last good value */
  }
  return {
    ...d,
    slides: d.slides.map((s) => ({
      ...s,
      els: s.els.map((e) => {
        if (e.type === "text" && e.bind) {
          const t = fillBind(e.bind, d.details!);
          return t === e.text ? e : { ...e, text: t };
        }
        if (e.type === "qr" && e.bind === "card" && code && code !== e.value) return { ...e, value: code };
        return e;
      }),
    })),
  };
}

/**
 * Business cards: runs on every change. New details refill the bound text;
 * typing straight into a one-field text (the name) updates that detail, and
 * typing into a combined block (phone and email) makes it free text.
 */
export function normalizeCard(next: Design, prev: Design): Design {
  if (!next.details) return next;
  if (next.details !== prev.details || next.qrKind !== prev.qrKind) return applyDetails(next);
  const before = new Map(prev.slides.flatMap((s) => s.els.map((e) => [e.id, e] as const)));
  let details = next.details;
  const unbind = new Set<string>();
  for (const s of next.slides)
    for (const e of s.els) {
      if (e.type !== "text" || !e.bind) continue;
      const was = before.get(e.id);
      if (!was || was.type !== "text" || was.text === e.text) continue;
      const one = /^\{(\w+)\}$/.exec(e.bind);
      if (one && (CARD_FIELDS as readonly string[]).includes(one[1])) details = { ...details, [one[1]]: e.text };
      else unbind.add(e.id);
    }
  if (details === next.details && !unbind.size) return next;
  const freed: Design = unbind.size
    ? { ...next, slides: next.slides.map((s) => ({ ...s, els: s.els.map((e) => (unbind.has(e.id) && e.type === "text" ? { ...e, bind: undefined } : e)) })) }
    : next;
  return details === next.details ? freed : applyDetails({ ...freed, details });
}

/* ---------------------------------------------------------------- Resize and switch, keeping your work */

// What a format change carries from your edited element onto the redrawn one.
const STYLE_KEYS = [
  "color", "fill", "fill2", "angle", "stroke", "strokeW", "weight", "italic", "underline", "upper", "align", "valign", "font",
  "lineHeight", "tracking", "list", "pad", "radius", "opacity", "rot", "shadow", "locked", "shape", "name", "paths", "fit",
  "filter", "border", "borderW", "mask", "kind", "labels", "series", "legend", "values", "grid", "rows", "header", "stripe", "accent", "bg",
] as const;
const CONTENT_KEYS = { text: ["text", "bind"], image: ["src", "fx", "fy", "filter"], qr: ["value", "bind"], icon: ["name", "paths"], chart: ["labels", "series"], table: ["rows"], shape: [] } as const;

/**
 * Redraw the design for a new size or a new template. Your words, photos and
 * codes go into the matching parts of the new layout; for a new size your
 * colour, type and anything you added come along too.
 */
export function reflow(old: Design, to: { template?: string; format?: string }, locale: "en" | "fr"): Design {
  const studio = old.studio;
  const template = to.template ?? old.template,
    format = to.format ?? old.format;
  const sameTemplate = template === old.template;
  const card = old.details ? { details: old.details, qrKind: old.qrKind ?? ("vcard" as const) } : undefined;
  const next = buildDesign(studio, template, format, locale, card);
  const sample = buildDesign(studio, old.template, old.format, locale, card);
  const from = formatOf(studio, old.format),
    toFmt = formatOf(studio, format);
  const sx = toFmt.w / from.w,
    sy = toFmt.h / from.h,
    sf = Math.min(sx, sy);
  next.slides = next.slides.map((page, i) => {
    const mine = old.slides[i],
      orig = sample.slides[i];
    if (!mine || !orig) return page;
    const bySlot = (els: El[]) => new Map(els.filter((e) => e.slot).map((e) => [e.slot!, e]));
    const mineBy = bySlot(mine.els),
      origBy = bySlot(orig.els);
    const els: El[] = [];
    for (const e of page.els) {
      const m = e.slot ? mineBy.get(e.slot) : undefined,
        o = e.slot ? origBy.get(e.slot) : undefined;
      // A part you deleted stays deleted at the new size.
      if (sameTemplate && e.slot && o && !m) continue;
      if (!m || m.type !== e.type) {
        els.push(e);
        continue;
      }
      const out = { ...e } as Record<string, unknown>;
      const src = m as unknown as Record<string, unknown>,
        base = (o ?? {}) as Record<string, unknown>;
      for (const k of CONTENT_KEYS[e.type]) if (JSON.stringify(src[k]) !== JSON.stringify(base[k])) out[k] = src[k];
      if (sameTemplate) {
        for (const k of STYLE_KEYS) if (k in src && JSON.stringify(src[k]) !== JSON.stringify(base[k])) out[k] = src[k];
        if (e.type === "text" && o?.type === "text" && m.type === "text" && m.size !== o.size) (out as { size: number }).size = (e as { size: number }).size * (m.size / o.size);
      }
      els.push(out as El);
    }
    // Things you added yourself keep their place, scaled to the new size.
    if (sameTemplate)
      for (const m of mine.els) {
        if (m.slot && origBy.has(m.slot)) continue;
        const c = { ...m, x: m.x * sx, y: m.y * sy, w: m.w * sx, h: m.h * sy } as El;
        if (c.type === "text" || c.type === "table") c.size = Math.max(4, c.size * sf);
        if (c.type === "icon" || c.type === "qr") c.w = c.h = Math.min(c.w, c.h);
        els.push(c);
      }
    const bgMine = JSON.stringify(mine.bg) !== JSON.stringify(orig.bg);
    const bg = bgMine && (sameTemplate || mine.bg.kind === "image") ? mine.bg : page.bg;
    return { ...page, id: mine.id, bg, els };
  });
  if (sameTemplate) return { ...next, title: old.title, theme: old.theme, colors: old.colors, fonts: old.fonts };
  // A name you typed survives a new template; the template's own name does not.
  return old.title !== sample.title ? { ...next, title: old.title } : next;
}
