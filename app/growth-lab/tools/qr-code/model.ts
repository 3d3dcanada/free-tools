import type { Locale } from "../../seo/guide";
import { translate } from "../../shared/translate";
import QRCode from "qrcode";
import { escapeXml, validColour, validImage } from "../../shared/browser";
export const kinds = [
  "url",
  "text",
  "wifi",
  "vcard",
  "mecard",
  "email",
  "sms",
  "phone",
  "location",
  "event",
  "app",
] as const;
export type QrKind = (typeof kinds)[number];
export const dotStyles = ["square", "round", "circle", "diamond", "classy", "tiny", "bars"] as const;
export const cornerStyles = ["square", "round", "circle", "leaf", "dot"] as const;
export type QrStyle = {
  foreground: string;
  background: string;
  gradient: string;
  dots: (typeof dotStyles)[number];
  corners: (typeof cornerStyles)[number];
  /** Finder ("eye") colour; empty = the ink colour. */
  eye?: string;
  gradientType?: "linear" | "radial";
  /** Accent rule and heading colour on the caption frame. */
  frameColor?: string;
  quiet: number;
  size: number;
  dpi: number;
  logo: string;
  logoSize: number;
  frame: boolean;
};
export type Tag = {
  version: 2;
  kind: QrKind;
  value: string;
  label: string;
  caption: string;
  fields: Record<string, string>;
  style: QrStyle;
};
export const defaultStyle: QrStyle = {
  foreground: "#141717",
  background: "#ffffff",
  gradient: "",
  dots: "square",
  corners: "square",
  quiet: 4,
  size: 480,
  dpi: 300,
  logo: "",
  logoSize: 0.18,
  frame: true,
};
export const initialTag: Tag = {
  version: 2,
  kind: "url",
  value: "https://3d3d.ca",
  label: "Something worth discovering",
  caption: "Scan to explore",
  fields: {
    ssid: "Studio Guest",
    password: "",
    security: "WPA",
    hidden: "false",
    first: "Alex",
    last: "Martin",
    company: "",
    phone: "+15065550100",
    email: "hello@example.com",
    subject: "Hello",
    body: "",
    latitude: "45.9636",
    longitude: "-66.6431",
    locationType: "geo",
    title: "Workshop",
    start: "",
    end: "",
    place: "",
    url: "https://example.com",
    address: "",
  },
  style: defaultStyle,
};
/** The untouched starting tag in one language (the label, caption and form samples are translated). */
export function sampleTag(locale: "en" | "fr", kind: QrKind): Tag {
  const t = (text: string) => translate(text, locale);
  return {
    ...initialTag,
    label: t(initialTag.label),
    caption: t(initialTag.caption),
    fields: {
      ...initialTag.fields,
      ssid: t(initialTag.fields.ssid),
      subject: t(initialTag.fields.subject),
      title: t(initialTag.fields.title),
    },
    kind,
  };
}
export function isTag(v: unknown): v is Tag {
  if (!v || typeof v !== "object") return false;
  const t = v as Tag,
    s = t.style;
  return (
    t.version === 2 &&
    kinds.includes(t.kind) &&
    typeof t.value === "string" &&
    t.value.length <= 2000 &&
    typeof t.label === "string" &&
    t.label.length <= 35 &&
    typeof t.caption === "string" &&
    t.caption.length <= 50 &&
    !!t.fields &&
    typeof t.fields === "object" &&
    !Array.isArray(t.fields) &&
    Object.entries(t.fields).every(
      ([k, v]) => Object.hasOwn(initialTag.fields, k) && typeof v === "string" && v.length <= 1000,
    ) &&
    !!s &&
    validColour(s.foreground) &&
    validColour(s.background) &&
    (s.gradient === "" || validColour(s.gradient)) &&
    (dotStyles as readonly string[]).includes(s.dots) &&
    (cornerStyles as readonly string[]).includes(s.corners) &&
    (s.eye === undefined || s.eye === "" || validColour(s.eye)) &&
    (s.gradientType === undefined || s.gradientType === "linear" || s.gradientType === "radial") &&
    (s.frameColor === undefined || validColour(s.frameColor)) &&
    Number.isInteger(s.quiet) &&
    s.quiet >= 4 &&
    s.quiet <= 12 &&
    Number.isInteger(s.size) &&
    s.size >= 192 &&
    s.size <= 1200 &&
    [72, 96, 150, 300, 600].includes(s.dpi) &&
    validImage(s.logo) &&
    Number.isFinite(s.logoSize) &&
    s.logoSize >= 0.1 &&
    s.logoSize <= 0.3 &&
    typeof s.frame === "boolean"
  );
}
const clean = (v = "") => v.replace(/[\r\n]/g, " ");
const escaped = (v = "") =>
  v
    .replace(/\\/g, "\\\\")
    .replace(/\r?\n/g, "\\n")
    .replace(/([;,])/g, "\\$1");
export function safeUrl(value: string) {
  let u: URL;
  try {
    u = new URL(value);
  } catch {
    throw new Error("Enter a complete HTTP or HTTPS URL.");
  }
  if (!["http:", "https:"].includes(u.protocol) || u.username || u.password)
    throw new Error("Use HTTP or HTTPS without a username or password.");
  return value;
}
export function payload(t: Tag): string {
  const f = { ...initialTag.fields, ...t.fields };
  let value = t.value.trim();
  const tel = () => {
    if (!/^\+?[\d ()-]{3,30}$/.test(f.phone)) throw new Error("Enter a phone number with country code.");
    return f.phone.replace(/[ ()-]/g, "");
  };
  const email = () => {
    if (!/^[^\s@?&:]+@[^\s@?&:]+\.[^\s@?&:]+$/.test(f.email)) throw new Error("Enter a valid email address.");
    return f.email;
  };
  switch (t.kind) {
    case "url":
    case "app":
      value = safeUrl(value);
      break;
    case "wifi":
      if (!f.ssid.trim() || !["WPA", "WEP", "nopass"].includes(f.security))
        throw new Error("Enter the Wi-Fi name and select its security.");
      if (f.security !== "nopass" && !f.password)
        throw new Error("Enter the Wi-Fi password, or choose an open network if no password is required.");
      value = `WIFI:T:${f.security};S:${f.ssid.replace(/([\\;,:"])/g, "\\$1")};P:${f.security === "nopass" ? "" : f.password.replace(/([\\;,:"])/g, "\\$1")};H:${f.hidden === "true"};;`;
      break;
    case "vcard":
      value = [
        "BEGIN:VCARD",
        "VERSION:3.0",
        `N:${escaped(f.last)};${escaped(f.first)};;;`,
        `FN:${escaped(`${f.first} ${f.last}`.trim())}`,
        `ORG:${escaped(f.company)}`,
        `TEL:${clean(f.phone)}`,
        `EMAIL:${clean(f.email)}`,
        `URL:${f.url ? safeUrl(f.url) : ""}`,
        `ADR:;;${escaped(f.address)};;;;`,
        "END:VCARD",
      ].join("\r\n");
      break;
    case "mecard":
      value = `MECARD:N:${escaped(f.last)},${escaped(f.first)};TEL:${clean(f.phone)};EMAIL:${escaped(f.email)};ADR:${escaped(f.address)};URL:${f.url ? safeUrl(f.url) : ""};;`;
      break;
    case "email":
      value = `mailto:${email()}?subject=${encodeURIComponent(f.subject)}&body=${encodeURIComponent(f.body)}`;
      break;
    case "phone":
      value = `tel:${tel()}`;
      break;
    case "sms":
      value = `SMSTO:${tel()}:${clean(f.body)}`;
      break;
    case "location": {
      const lat = Number(f.latitude),
        lon = Number(f.longitude);
      if (
        !f.latitude.trim() ||
        !f.longitude.trim() ||
        !Number.isFinite(lat) ||
        !Number.isFinite(lon) ||
        Math.abs(lat) > 90 ||
        Math.abs(lon) > 180
      )
        throw new Error("Latitude must be −90 to 90; longitude −180 to 180.");
      value =
        f.locationType === "maps"
          ? `https://www.google.com/maps/search/?api=1&query=${lat}%2C${lon}`
          : `geo:${lat},${lon}`;
      break;
    }
    case "event": {
      const validDate = (value: string) => {
        if (!/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}$/.test(value)) return false;
        const timestamp = Date.parse(value + ":00Z");
        return Number.isFinite(timestamp) && new Date(timestamp).toISOString().slice(0, 16) === value;
      };
      if (!f.title.trim() || !validDate(f.start) || !validDate(f.end) || f.end <= f.start)
        throw new Error("Set an event title and an end after the start.");
      const date = (v: string) => v.replace(/[-:]/g, "") + "00";
      value = [
        "BEGIN:VCALENDAR",
        "VERSION:2.0",
        "PRODID:-//3D3D//Local QR//EN",
        "BEGIN:VEVENT",
        `UID:${encodeURIComponent(f.start + f.title)}@local.3d3d.ca`,
        "DTSTAMP:20261008T000000Z",
        `DTSTART:${date(f.start)}`,
        `DTEND:${date(f.end)}`,
        `SUMMARY:${escaped(f.title)}`,
        `LOCATION:${escaped(f.place)}`,
        `DESCRIPTION:${escaped(f.body)}`,
        "END:VEVENT",
        "END:VCALENDAR",
      ].join("\r\n");
      break;
    }
  }
  if (!value) throw new Error("Enter the content to encode.");
  if (new TextEncoder().encode(value).length > 1000)
    throw new Error("Keep encoded content below 1,001 bytes.");
  return value;
}
export function qrSvg(value: string, style: QrStyle = defaultStyle, locale: Locale = "en"): string {
  const s = style;
  if (!isTag({ ...initialTag, style: s })) throw new Error("Invalid QR style.");
  // Many codes share one page and SVG ids are document-wide, so the gradient id
  // is a hash of what it draws: identical on server and client, distinct per look.
  let h = 5381;
  for (const ch of value + JSON.stringify({ ...s, logo: s.logo.length })) h = ((h << 5) + h + ch.charCodeAt(0)) | 0;
  const ink = `qr-ink-${(h >>> 0).toString(36)}`;
  const qr = QRCode.create(value, { errorCorrectionLevel: s.logo ? "H" : "M" });
  const n = qr.modules.size,
    side = n + 2 * s.quiet;
  const finders = [
    [0, 0],
    [n - 7, 0],
    [0, n - 7],
  ];
  const on = (x: number, y: number) =>
    x >= 0 && y >= 0 && x < n && y < n && !!qr.modules.get(y, x) &&
    !finders.some(([a, b]) => x >= a && x < a + 7 && y >= b && y < b + 7);
  let cells = "";
  for (let y = 0; y < n; y++)
    for (let x = 0; x < n; x++) {
      if (!on(x, y)) continue;
      cells += dotCell(x, y, s.dots, on);
    }
  for (const [x, y] of finders) cells += finderCells(x, y, s);
  const logo = n * s.logoSize,
    pos = s.quiet + (n - logo) / 2;
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${s.size}" height="${s.size}" viewBox="0 0 ${side} ${side}" role="img"><title>${translate("Static QR code", locale)}</title><defs>${s.gradientType === "radial" ? `<radialGradient id="${ink}" gradientUnits="userSpaceOnUse" cx="${n / 2}" cy="${n / 2}" r="${n * 0.72}"><stop stop-color="${s.foreground}"/><stop offset="1" stop-color="${s.gradient || s.foreground}"/></radialGradient>` : `<linearGradient id="${ink}" gradientUnits="userSpaceOnUse" x1="0" y1="0" x2="${n}" y2="${n}"><stop stop-color="${s.foreground}"/><stop offset="1" stop-color="${s.gradient || s.foreground}"/></linearGradient>`}</defs><rect width="${side}" height="${side}" fill="${s.background}"/><g transform="translate(${s.quiet} ${s.quiet})" fill="${s.gradient ? `url(#${ink})` : s.foreground}" ${s.dots === "square" && s.corners === "square" ? 'shape-rendering="crispEdges"' : ""}>${cells}</g>${s.logo ? `<rect x="${pos - 0.8}" y="${pos - 0.8}" width="${logo + 1.6}" height="${logo + 1.6}" rx=".6" fill="${s.background}"/><image x="${pos}" y="${pos}" width="${logo}" height="${logo}" href="${s.logo}"/>` : ""}</svg>`;
}
/** One finder ("eye") at module x,y in the chosen corner shape. */
function finderCells(x: number, y: number, s: QrStyle): string {
  const eye = s.eye || "";
  const fillAttr = eye ? ` fill="${eye}"` : "";
  let cells = "";
    const c = s.corners;
  if (c === "circle") {
    cells += `<circle cx="${x + 3.5}" cy="${y + 3.5}" r="3.5"${fillAttr}/><circle cx="${x + 3.5}" cy="${y + 3.5}" r="2.5" fill="${s.background}"/><circle cx="${x + 3.5}" cy="${y + 3.5}" r="1.5"${fillAttr}/>`;
  } else if (c === "leaf") {
    cells += `<path d="M${x + 3} ${y}H${x + 7}V${y + 4}A3 3 0 0 1 ${x + 4} ${y + 7}H${x}V${y + 3}A3 3 0 0 1 ${x + 3} ${y}Z"${fillAttr}/><path d="M${x + 3} ${y + 1}H${x + 6}V${y + 4}A2 2 0 0 1 ${x + 4} ${y + 6}H${x + 1}V${y + 3}A2 2 0 0 1 ${x + 3} ${y + 1}Z" fill="${s.background}"/><path d="M${x + 3.1} ${y + 2}H${x + 5}V${y + 3.9}A1.1 1.1 0 0 1 ${x + 3.9} ${y + 5}H${x + 2}V${y + 3.1}A1.1 1.1 0 0 1 ${x + 3.1} ${y + 2}Z"${fillAttr}/>`;
  } else {
    const r = c === "round" || c === "dot" ? [1.3, 0.9] : [0, 0];
    const inner =
      c === "dot"
        ? `<circle cx="${x + 3.5}" cy="${y + 3.5}" r="1.5"${fillAttr}/>`
        : `<rect x="${x + 2}" y="${y + 2}" width="3" height="3" rx="${c === "round" ? 0.5 : 0}"${fillAttr}/>`;
    cells += `<rect x="${x}" y="${y}" width="7" height="7" rx="${r[0]}"${fillAttr}/><rect x="${x + 1}" y="${y + 1}" width="5" height="5" rx="${r[1]}" fill="${s.background}"/>${inner}`;
  }
    return cells;
}

/** A centred sample of one finder, for the corner-shape picker. */
export function cornerSampleSvg(corners: QrStyle["corners"], ink = "#141717"): string {
  const s = { ...defaultStyle, corners, foreground: ink };
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="-1 -1 9 9" aria-hidden="true"><rect x="-1" y="-1" width="9" height="9" fill="#fff"/><g fill="${ink}">${finderCells(0, 0, s)}</g></svg>`;
}

/** A centred 5 x 5 sample of the dot shape, for the dot-shape picker. */
export function dotSampleSvg(dots: QrStyle["dots"], ink = "#141717"): string {
  const grid = ["10110", "11011", "01110", "11011", "01101"];
  const on = (x: number, y: number) => grid[y]?.[x] === "1";
  let cells = "";
  for (let y = 0; y < 5; y++)
    for (let x = 0; x < 5; x++) if (on(x, y)) cells += dotCell(x, y, dots, on);
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="-.75 -.75 6.5 6.5" aria-hidden="true"><rect x="-.75" y="-.75" width="6.5" height="6.5" fill="#fff"/><g fill="${ink}">${cells}</g></svg>`;
}

function dotCell(x: number, y: number, dots: QrStyle["dots"], on: (x: number, y: number) => boolean): string {
  switch (dots) {
    case "circle":
      return `<circle cx="${x + 0.5}" cy="${y + 0.5}" r=".48"/>`;
    case "tiny":
      return `<circle cx="${x + 0.5}" cy="${y + 0.5}" r=".36"/>`;
    case "diamond":
      return `<path d="M${x + 0.5} ${y - 0.02}L${x + 1.02} ${y + 0.5}L${x + 0.5} ${y + 1.02}L${x - 0.02} ${y + 0.5}Z"/>`;
    case "classy":
      return `<path d="M${x + 0.45} ${y}H${x + 1}V${y + 0.55}A.45 .45 0 0 1 ${x + 0.55} ${y + 1}H${x}V${y + 0.45}A.45 .45 0 0 1 ${x + 0.45} ${y}Z"/>`;
    case "bars": {
      // Vertical runs joined into one rounded bar.
      if (on(x, y - 1)) return "";
      let len = 1;
      while (on(x, y + len)) len++;
      return `<rect x="${x + 0.1}" y="${y + 0.04}" width=".8" height="${len - 0.08}" rx=".4"/>`;
    }
    default:
      return `<rect x="${x}" y="${y}" width="1" height="1" rx="${dots === "round" ? 0.28 : 0}"/>`;
  }
}

export function tagSvg(t: Tag, locale: Locale = "en") {
  if (!isTag(t)) throw new Error("Invalid QR settings.");
  const square = qrSvg(payload(t), t.style, locale),
    size = t.style.size;
  if (!t.style.frame) return square;
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size + 124}" viewBox="0 0 ${size} ${size + 124}" role="img"><title>${escapeXml(t.label)} ${translate("QR tag", locale)}</title><rect width="100%" height="100%" fill="${t.style.background}"/><path d="M24 14h48" stroke="${t.style.frameColor || "#04D9C4"}" stroke-width="4"/><text x="${size / 2}" y="48" text-anchor="middle" font-family="Arial,sans-serif" font-size="${Math.min(20, size / 24)}" font-weight="700" fill="${t.style.frameColor || t.style.foreground}">${escapeXml(t.label)}</text>${square.replace("<svg ", '<svg y="64" ')}<text x="${size / 2}" y="${size + 99}" text-anchor="middle" font-family="Arial,sans-serif" font-size="${Math.min(18, size / 27)}" fill="${t.style.foreground}">${escapeXml(t.caption)}</text></svg>`;
}
export function qrWarnings(s: QrStyle): string[] {
  const lum = (hex: string) => {
    const rgb = [1, 3, 5]
      .map((i) => parseInt(hex.slice(i, i + 2), 16) / 255)
      .map((v) => (v <= 0.04045 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4));
    return rgb[0] * 0.2126 + rgb[1] * 0.7152 + rgb[2] * 0.0722;
  };
  const warnings = [],
    bg = lum(s.background);
  if (lum(s.foreground) >= bg)
    warnings.push("Inverted colours: many phone cameras expect dark modules on a light background.");
  if (
    [s.foreground, s.gradient || s.foreground, s.eye || s.foreground].some(
      (c) => (Math.max(lum(c), bg) + 0.05) / (Math.min(lum(c), bg) + 0.05) < 4.5,
    )
  )
    warnings.push("Low contrast: choose darker ink and a lighter background.");
  if (s.logo && s.logoSize > 0.22)
    warnings.push("The logo is large. Reduce it below 22% and check a printed sample.");
  return warnings;
}
export function ndef(t: Tag) {
  const p = payload(t),
    uri = ["url", "app", "email", "phone", "location"].includes(t.kind);
  const type = new TextEncoder().encode(uri ? "U" : "T");
  const content = new TextEncoder().encode(p);
  const body = new Uint8Array((uri ? 1 : 3) + content.length);
  body.set(uri ? [0] : [2, 101, 110]);
  body.set(content, uri ? 1 : 3);
  const short = body.length < 256;
  const header = short ? [0xd1, 1, body.length] : [0xc1, 1, 0, 0, body.length >> 8, body.length & 255];
  return new Uint8Array([...header, ...type, ...body]);
}

/** Ready-made looks for the style gallery. Every one passes the contrast check. */
export const qrPresets: { name: string; style: Partial<QrStyle> }[] = [
  { name: "Classic", style: { foreground: "#141717", background: "#ffffff", gradient: "", eye: "", dots: "square", corners: "square" } },
  { name: "Rounded", style: { foreground: "#141717", background: "#ffffff", gradient: "", eye: "#007f73", dots: "round", corners: "round" } },
  { name: "Dots", style: { foreground: "#1a1a2e", background: "#ffffff", gradient: "", eye: "", dots: "circle", corners: "circle" } },
  { name: "Teal Glow", style: { foreground: "#00594f", background: "#f2fffd", gradient: "#0b3d91", gradientType: "linear", eye: "#004d45", dots: "classy", corners: "leaf", frameColor: "#04D9C4" } },
  { name: "Magenta", style: { foreground: "#8a0040", background: "#fff7fb", gradient: "#3b0a57", gradientType: "radial", eye: "#5c002b", dots: "round", corners: "dot", frameColor: "#FF2D92" } },
  { name: "Ember", style: { foreground: "#7a2e00", background: "#fffaf5", gradient: "#3d1200", gradientType: "linear", eye: "#b33f00", dots: "diamond", corners: "round", frameColor: "#FF6A00" } },
  { name: "Forest", style: { foreground: "#0c4a1f", background: "#f6fff8", gradient: "", eye: "#0a6b2a", dots: "bars", corners: "round", frameColor: "#18E36B" } },
  { name: "Night Ink", style: { foreground: "#0b1026", background: "#ffffff", gradient: "#3a0ca3", gradientType: "radial", eye: "#0b1026", dots: "tiny", corners: "circle" } },
  { name: "Leaf", style: { foreground: "#173b2f", background: "#fbfaf4", gradient: "", eye: "#2d6a4f", dots: "classy", corners: "leaf" } },
  { name: "Blueprint", style: { foreground: "#0a2f6b", background: "#f3f8ff", gradient: "", eye: "#0a2f6b", dots: "square", corners: "dot" } },
  { name: "Bold Bars", style: { foreground: "#111111", background: "#ffffff", gradient: "", eye: "#111111", dots: "bars", corners: "square" } },
  { name: "Sunset", style: { foreground: "#a1124a", background: "#fffaf3", gradient: "#5a1a00", gradientType: "linear", eye: "#7a0d38", dots: "circle", corners: "leaf", frameColor: "#FF6A00" } },
];
