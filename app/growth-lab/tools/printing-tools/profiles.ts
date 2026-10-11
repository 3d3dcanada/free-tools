import { number, validSettings, type Settings } from "./model";
export type PrinterProfile = { version: 1; name: string; bed: string[]; margin: string; settings: Settings };
export function isPrinterProfile(v: unknown): v is PrinterProfile {
  if (!v || typeof v !== "object") return false;
  const p = v as PrinterProfile;
  if (p.version !== 1 || typeof p.name !== "string" || !p.name.trim() || p.name.length > 100 ||
    !Array.isArray(p.bed) || p.bed.length !== 3 || !p.bed.every(n => typeof n === "string") ||
    typeof p.margin !== "string" || !validSettings(p.settings)) return false;
  try {
    p.bed.forEach(n => number(n, "build volume", 1, 10000));
    number(p.margin, "edge margin", 0, 100);
    return true;
  } catch { return false; }
}
