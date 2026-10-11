export const pdfModes = {
  "merge-pdf": ["Merge PDF Files", "Put the whole story in one file."],
  "split-pdf": ["Split PDF Pages", "Keep just the pages you need."],
  "organize-pdf": ["Reorder, Rotate and Delete PDF Pages", "Get every page in its place."],
  "images-to-pdf": ["Images to PDF", "A tidy document from your images."],
  "pdf-to-image": ["PDF to JPG or PNG", "Take a page out as an image."],
  "stamp-pdf": ["PDF Page Numbers and Stamps", "Make the next copy easier to follow."],
} as const;
export type PdfMode = keyof typeof pdfModes;
/** `sizes` holds each page's crop box in points and its stored rotation, read once at open. */
export type PdfSource = {
  id: number;
  name: string;
  bytes: Uint8Array<ArrayBuffer>;
  pages: number;
  size: number;
  sizes: [number, number, number][];
};
export type PageRef = { id: number; source: number; page: number; rotation: number };
export type PdfMarks = {
  numbers: boolean;
  start: number;
  text: string;
  position: "top" | "centre" | "bottom";
  opacity: number;
  image: string;
};
export const markDefaults: PdfMarks = {
  numbers: false,
  start: 1,
  text: "",
  position: "centre",
  opacity: 0.35,
  image: "",
};
export function pageRange(text: string, count: number): number[] {
  if (!Number.isInteger(count) || count < 1 || count > 200) throw new Error("Use 1 to 200 pages.");
  if (!text.trim()) return Array.from({ length: count }, (_, i) => i);
  if (text.length > 1000) throw new Error("Page selection is too long.");
  const pages: number[] = [];
  for (const item of text.split(",")) {
    const match = /^\s*(\d+)(?:\s*-\s*(\d+))?\s*$/.exec(item);
    if (!match) throw new Error("Use page numbers and ranges, such as 1, 3-5.");
    const start = Number(match[1]),
      end = Number(match[2] ?? match[1]);
    if (start < 1 || end < start || end > count)
      throw new Error(`Choose pages between 1 and ${count}, with ascending ranges.`);
    for (let n = start; n <= end; n++) if (!pages.includes(n - 1)) pages.push(n - 1);
  }
  return pages;
}
export function movePage<T>(pages: T[], from: number, to: number) {
  if (![from, to].every((i) => Number.isInteger(i) && i >= 0 && i < pages.length)) return pages;
  const copy = [...pages],
    [item] = copy.splice(from, 1);
  copy.splice(to, 0, item);
  return copy;
}
export type StampItem =
  | { kind: "text"; text: string; size: number; y: number; opacity: number }
  | { kind: "image"; x: number; y: number; width: number; height: number; opacity: number };
/**
 * where numbers and stamps land on a page that reads vw × vh points
 * (origin bottom left, text y is the baseline). The export draws these items
 * and the on-page preview draws the same items, so the preview is the export.
 */
export function stampLayout(
  vw: number,
  vh: number,
  marks: PdfMarks,
  index: number,
  image?: { width: number; height: number },
): StampItem[] {
  const items: StampItem[] = [];
  if (marks.numbers)
    items.push({ kind: "text", text: `${marks.start + index}`, size: Math.min(11, vh / 15), y: Math.min(18, vh / 10), opacity: 1 });
  const centreY = marks.position === "top" ? vh - 36 : marks.position === "bottom" ? 36 : vh / 2;
  if (marks.text) items.push({ kind: "text", text: marks.text, size: Math.min(24, vw / 20), y: centreY, opacity: marks.opacity });
  if (image) {
    const scale = Math.min((vw * 0.3) / image.width, (vh * 0.2) / image.height);
    const width = image.width * scale,
      height = image.height * scale;
    items.push({
      kind: "image",
      x: (vw - width) / 2,
      y: Math.max(0, Math.min(vh - height, centreY - height / 2)),
      width,
      height,
      opacity: marks.opacity,
    });
  }
  return items;
}
/** A page's size as it will read after its stored rotation plus the user's turns. */
export function pageView(source: PdfSource, ref: PageRef) {
  const [w, h, stored] = source.sizes[ref.page] ?? [612, 792, 0];
  const turn = (stored + ref.rotation) % 360;
  return { width: turn % 180 ? h : w, height: turn % 180 ? w : h, stored, turn, raw: [w, h] as const };
}
