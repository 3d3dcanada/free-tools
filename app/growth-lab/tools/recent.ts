/**
 * Recently used tools, for the top of the hub (2026-11-11). Slugs only, in this
 * browser's localStorage, never sent anywhere. Storage that is full or blocked
 * just means no recent row.
 */
const KEY = "free-tools-recent";
const MAX = 6;

export function readRecent(store?: Storage): string[] {
  try {
    const list = JSON.parse((store ?? localStorage).getItem(KEY) ?? "[]");
    return Array.isArray(list) ? list.filter((s): s is string => typeof s === "string").slice(0, MAX) : [];
  } catch {
    return [];
  }
}

export function markRecent(slug: string, store?: Storage) {
  try {
    const s = store ?? localStorage;
    s.setItem(KEY, JSON.stringify([slug, ...readRecent(s).filter((x) => x !== slug)].slice(0, MAX)));
  } catch {
    /* storage off: nothing to remember */
  }
}
