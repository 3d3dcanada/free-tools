export const imageModes = {
  "compress-image": ["Image Compressor", "Smaller files. A clear comparison."],
  "resize-image": ["Image Resizer", "The right size for its next home."],
  "crop-image": ["Crop, Rotate and Flip Images", "Keep the part that matters."],
  "convert-image": ["Image Converter", "A new format. Your original stays yours."],
  "favicon-generator": ["Favicon Generator", "A small mark, everywhere it belongs."],
  "rounded-image": ["Rounded Corners and Image Borders", "Give the edges a little care."],
  "remove-background": ["Background Remover", "Let the subject stand on its own."],
} as const;
export type ImageMode = keyof typeof imageModes;
export const cropRatios = ["free", "1:1", "4:5", "4:3", "3:2", "16:9", "9:16"] as const;
/** presets are premium rows in the panel. Each states exactly what it sets. */
export type ImagePreset = { id: string; title: string; detail: string; meta: string; settings: Partial<ImageSettings> };
const fill = (width: number, height: number) => ({ resize: "pixels", width, height, fit: "cover" }) as const;
export const imagePresets: Partial<Record<ImageMode, ImagePreset[]>> = {
  "compress-image": [
    { id: "balanced", title: "Balanced", detail: "WebP at quality 80, the usual starting point for the web.", meta: "WebP · 80", settings: { format: "webp", quality: 80 } },
    { id: "lighter", title: "Lighter", detail: "WebP at quality 60. Smaller files, softer fine detail.", meta: "WebP · 60", settings: { format: "webp", quality: 60 } },
    { id: "photo", title: "Photo Standard", detail: "JPG at quality 82. Opens in every photo app.", meta: "JPG · 82", settings: { format: "jpeg", quality: 82 } },
    { id: "newest", title: "Newest Format", detail: "AVIF at quality 50. Slower to encode; check it opens where it is going.", meta: "AVIF · 50", settings: { format: "avif", quality: 50 } },
    { id: "lossless", title: "Lossless", detail: "PNG, optimised without changing a pixel.", meta: "PNG", settings: { format: "png" } },
  ],
  "convert-image": [
    { id: "jpeg", title: "JPG", detail: "Photos. Opens in every app. No transparency.", meta: "Lossy", settings: { format: "jpeg" } },
    { id: "png", title: "PNG", detail: "Lossless. Keeps transparency and sharp text.", meta: "Lossless", settings: { format: "png" } },
    { id: "webp", title: "WebP", detail: "Smaller web images, with transparency.", meta: "Lossy", settings: { format: "webp" } },
    { id: "avif", title: "AVIF", detail: "The newest format. Slower to encode.", meta: "Lossy", settings: { format: "avif" } },
  ],
  "resize-image": [
    { id: "post", title: "Instagram Post", detail: "Square, filled and centre-cropped.", meta: "1080 × 1080", settings: fill(1080, 1080) },
    { id: "portrait", title: "Instagram Portrait", detail: "4:5, filled and centre-cropped.", meta: "1080 × 1350", settings: fill(1080, 1350) },
    { id: "story", title: "Story or Reel", detail: "9:16, filled and centre-cropped.", meta: "1080 × 1920", settings: fill(1080, 1920) },
    { id: "linkedin", title: "LinkedIn Banner", detail: "Profile background, filled and centre-cropped.", meta: "1584 × 396", settings: fill(1584, 396) },
    { id: "youtube", title: "YouTube Thumbnail", detail: "16:9, filled and centre-cropped.", meta: "1280 × 720", settings: fill(1280, 720) },
    { id: "web", title: "Website Large", detail: "Scaled to fit a 1920 px box. Keeps the whole image.", meta: "1920 px", settings: { resize: "pixels", width: 1920, height: 1920, fit: "contain" } },
    { id: "email", title: "Email Friendly", detail: "Scaled to fit a 1200 px box. Keeps the whole image.", meta: "1200 px", settings: { resize: "pixels", width: 1200, height: 1200, fit: "contain" } },
    { id: "half", title: "Half Size", detail: "Half the width and height of each image.", meta: "50%", settings: { resize: "percent", percent: 50 } },
  ],
  "rounded-image": [
    { id: "soft", title: "Soft Corners", detail: "A gentle 6% radius.", meta: "6%", settings: { radius: 6, border: 0 } },
    { id: "rounded", title: "Rounded", detail: "A clear 12% radius.", meta: "12%", settings: { radius: 12, border: 0 } },
    { id: "framed", title: "Framed", detail: "A 12% radius with a 16 px border in your colour.", meta: "12% · 16 px", settings: { radius: 12, border: 16 } },
    { id: "circle", title: "Circle", detail: "A circle on square images, a capsule on others.", meta: "50%", settings: { radius: 50, border: 0 } },
  ],
};
export const presetFor = (mode: ImageMode, s: ImageSettings) =>
  imagePresets[mode]?.find((p) =>
    (Object.keys(p.settings) as (keyof ImageSettings)[]).every((k) => p.settings[k] === s[k]),
  )?.id;
export type ImageSettings = {
  format: "png" | "jpeg" | "webp" | "avif";
  quality: number;
  resize: "pixels" | "percent";
  width: number;
  height: number;
  percent: number;
  fit: "contain" | "cover";
  ratio: (typeof cropRatios)[number];
  x: number;
  y: number;
  cropWidth: number;
  cropHeight: number;
  rotation: number;
  flipX: boolean;
  flipY: boolean;
  radius: number;
  border: number;
  colour: string;
};
export const imageDefaults: ImageSettings = {
  format: "webp",
  quality: 80,
  resize: "pixels",
  width: 1200,
  height: 1200,
  percent: 50,
  fit: "contain",
  ratio: "1:1",
  x: 50,
  y: 50,
  cropWidth: 80,
  cropHeight: 80,
  rotation: 0,
  flipX: false,
  flipY: false,
  radius: 12,
  border: 0,
  colour: "#ffffff",
};
export function validateSettings(s: ImageSettings) {
  if (!["png", "jpeg", "webp", "avif"].includes(s.format)) throw new Error("Choose an output format.");
  for (const [key, min, max] of [
    ["quality", 1, 100],
    ["width", 1, 8192],
    ["height", 1, 8192],
    ["percent", 1, 400],
    ["x", 0, 100],
    ["y", 0, 100],
    ["cropWidth", 1, 100],
    ["cropHeight", 1, 100],
    ["radius", 0, 50],
    ["border", 0, 100],
  ] as const)
    if (!Number.isFinite(s[key]) || s[key] < min || s[key] > max)
      throw new Error(`${key} must be between ${min} and ${max}.`);
  if (![0, 90, 180, 270].includes(s.rotation)) throw new Error("Choose a quarter-turn rotation.");
  if (!/^#[a-f\d]{6}$/i.test(s.colour)) throw new Error("Choose a valid colour.");
}
export function dimensions(width: number, height: number) {
  if (
    !Number.isInteger(width) ||
    !Number.isInteger(height) ||
    width < 1 ||
    height < 1 ||
    width > 16384 ||
    height > 16384 ||
    width * height > 24_000_000
  )
    throw new Error("Keep images below 24 megapixels and 16,384 pixels on either side.");
}
export function cropRect(w: number, h: number, s: ImageSettings) {
  let width = (w * s.cropWidth) / 100,
    height = (h * s.cropHeight) / 100;
  if (s.ratio !== "free") {
    const [a, b] = s.ratio.split(":").map(Number);
    if (!a || !b) throw new Error("Choose a valid crop ratio.");
    if (width / height > a / b) width = (height * a) / b;
    else height = (width * b) / a;
  }
  return { x: ((w - width) * s.x) / 100, y: ((h - height) * s.y) / 100, width, height };
}
export function resizeDimensions(w: number, h: number, s: ImageSettings) {
  const scale = s.resize === "percent" ? s.percent / 100 : Math.min(s.width / w, s.height / h);
  const result =
    s.resize === "pixels" && s.fit === "cover"
      ? [Math.round(s.width), Math.round(s.height)]
      : [Math.max(1, Math.round(w * scale)), Math.max(1, Math.round(h * scale))];
  dimensions(result[0], result[1]);
  return result;
}
export function safeSvg(source: string) {
  if (
    source.length > 5_000_000 ||
    !/<svg[\s>]/i.test(source) ||
    /<!DOCTYPE|<!ENTITY|<script|<foreignObject|<image|<feImage|\bon\w+\s*=|@import|@font-face|url\(\s*["']?(?!#)|(?:href|src)\s*=\s*["'](?!#)/i.test(
      source,
    )
  )
    throw new Error(
      "Use a self-contained SVG with shapes and text, without scripts, embedded images or external resources.",
    );
  return source;
}
export function ico(pngs: { size: number; bytes: Uint8Array }[]) {
  if (!pngs.length || pngs.some((p) => ![16, 32, 48, 64, 128, 256].includes(p.size)))
    throw new Error("ICO needs supported square PNG sizes.");
  const header = 6 + pngs.length * 16;
  const bytes = new Uint8Array(header + pngs.reduce((n, p) => n + p.bytes.length, 0));
  const view = new DataView(bytes.buffer);
  view.setUint16(2, 1, true);
  view.setUint16(4, pngs.length, true);
  let offset = header;
  pngs.forEach((p, i) => {
    const entry = 6 + i * 16;
    bytes[entry] = bytes[entry + 1] = p.size === 256 ? 0 : p.size;
    view.setUint16(entry + 4, 1, true);
    view.setUint16(entry + 6, 32, true);
    view.setUint32(entry + 8, p.bytes.length, true);
    view.setUint32(entry + 12, offset, true);
    bytes.set(p.bytes, offset);
    offset += p.bytes.length;
  });
  return bytes;
}
