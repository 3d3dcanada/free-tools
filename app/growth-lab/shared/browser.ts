import { useEffect, useState } from "react";

export function readDraft<T>(store: Pick<Storage, "getItem">, key: string, valid: (v: unknown) => v is T): T | undefined {
  const raw = store.getItem(key);
  if (raw === null) return undefined;
  const parsed: unknown = JSON.parse(raw);
  if (!valid(parsed)) throw new Error("Saved draft has an unsupported format.");
  return parsed;
}

const sameValue = (a: unknown, b: unknown) => JSON.stringify(a) === JSON.stringify(b);
/** True when `value` is the untouched sample: the page's own `initial`, or one in another language. */
export const draftIsPristine = <T,>(value: unknown, initial: T, pristine: T[] = []) =>
  sameValue(value, initial) || pristine.some((p) => sameValue(value, p));

/**
 * `pristine` lists the starting values the page can open with in other languages.
 * A draft equal to `initial` or to one of them is the untouched sample, not the
 * visitor's work: it is never written, and one found in storage is ignored, so the
 * sample text follows the page language instead of the language of the first visit.
 */
export function useLocalDraft<T>(key: string | null, initial: T, valid: (v: unknown) => v is T, pristine: T[] = []) {
  const [value, setValue] = useState(initial);
  const untouched = (v: unknown) => draftIsPristine(v, initial, pristine);
  const [ready, setReady] = useState(false);
  const [storage, setStorage] = useState("Loading local draft…");
  const [blocked, setBlocked] = useState(false);
  useEffect(() => {
    if (key === null) {
      setStorage("Files stay in this tab. Download your results before closing.");
      return;
    }
    setReady(false);
    try {
      const parsed = readDraft(localStorage, key, valid);
      if (parsed !== undefined && !untouched(parsed)) setValue(parsed);
      setBlocked(false);
      setReady(true);
    } catch {
      setBlocked(true);
      setStorage(
        "Local draft could not be loaded. Downloads still work. Clear this tool’s saved draft to enable saving.",
      );
    }
  }, [key, valid]);
  useEffect(() => {
    if (!ready || key === null) return;
    if (!valid(value)) {
      setStorage("Draft has incomplete values. The last valid draft remains saved.");
      return;
    }
    try {
      if (untouched(value)) localStorage.removeItem(key);
      else localStorage.setItem(key, JSON.stringify(value));
      setStorage("Saved on this device");
    } catch {
      setStorage("Device storage is full or unavailable. Download a copy before closing.");
    }
  }, [key, value, ready, valid]);
  return {
    value,
    setValue,
    ready,
    storage,
    blocked,
    recover: () => { if (key !== null) download(`${key.replace(/[^\w-]/g, "-")}-recovery.txt`, localStorage.getItem(key) ?? "", "text/plain"); },
    resume: () => {
      // Keep the editor's current content when explicitly replacing an unreadable draft.
      if (!valid(value)) { setStorage("Draft has incomplete values. The last valid draft remains saved."); return; }
      try {
        if (key !== null) localStorage.setItem(key, JSON.stringify(value));
        setBlocked(false); setReady(true);
      } catch { setStorage("Device storage is full or unavailable. Download a copy before closing."); }
    },
    clear: () => {
      try {
        if (key !== null) localStorage.removeItem(key);
        setValue(initial);
        setReady(true);
        setBlocked(false);
      } catch {
        setStorage("Browser storage is unavailable. Downloads still work.");
      }
    },
  };
}

export function download(name: string, data: BlobPart, type: string) {
  const url = URL.createObjectURL(new Blob([data], { type }));
  const a = document.createElement("a");
  a.href = url;
  a.download = name;
  a.click();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}
export const escapeXml = (text: string) =>
  text.replace(
    /[&<>"']/g,
    (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!,
  );
export const validImage = (v: unknown): v is string =>
  typeof v === "string" &&
  (v === "" || /^data:image\/(png|jpeg);base64,[A-Za-z0-9+/=]+$/.test(v)) &&
  v.length < 2_000_000;
export const validColour = (v: unknown): v is string => typeof v === "string" && /^#[0-9a-f]{6}$/i.test(v);

export async function imageFile(file: File): Promise<string> {
  if (!["image/png", "image/jpeg", "image/webp"].includes(file.type))
    throw new Error("Choose a PNG, JPEG or WebP image.");
  if (file.size > 8_000_000) throw new Error("Choose an image smaller than 8 MB.");
  const bitmap = await createImageBitmap(file);
  try {
    if (bitmap.width * bitmap.height > 40_000_000)
      throw new Error("Image is too large. Resize it below 40 megapixels.");
    const scale = Math.min(1, 1400 / Math.max(bitmap.width, bitmap.height));
    const canvas = document.createElement("canvas");
    canvas.width = Math.round(bitmap.width * scale);
    canvas.height = Math.round(bitmap.height * scale);
    canvas.getContext("2d")!.drawImage(bitmap, 0, 0, canvas.width, canvas.height);
    const result = canvas.toDataURL(file.type === "image/png" ? "image/png" : "image/jpeg", 0.85);
    if (!validImage(result)) throw new Error("Image is too detailed for a local draft. Use a smaller image.");
    return result;
  } finally {
    bitmap.close();
  }
}

export async function svgPng(svg: string, width: number, height: number): Promise<string> {
  const img = new Image();
  img.src = "data:image/svg+xml;charset=utf-8," + encodeURIComponent(svg);
  await img.decode();
  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;
  const context = canvas.getContext("2d");
  if (!context) throw new Error("This browser cannot export images.");
  context.drawImage(img, 0, 0, width, height);
  return canvas.toDataURL("image/png");
}
