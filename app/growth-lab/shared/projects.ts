export type Project<T> = { id: string; name: string; updated: string; value: T };
export type Library<T> = { version: 1; family: string; projects: Project<T>[] };
export const projectKey = (family: string) => `3d3d:projects:${family}:v1`;
export const projectLimit = 30;
type Store = Pick<Storage, "getItem" | "setItem">;

export function projectName(name: string) {
  const result = name.trim();
  if (!result || result.length > 100) throw new Error("Use a project name between 1 and 100 characters.");
  return result;
}

export function isLibrary<T>(v: unknown, family: string, valid: (v: unknown) => v is T): v is Library<T> {
  if (!v || typeof v !== "object") return false;
  const x = v as Library<unknown>;
  return x.version === 1 && x.family === family && Array.isArray(x.projects) && x.projects.length <= projectLimit &&
    new Set(x.projects.map(p => p?.id)).size === x.projects.length && x.projects.every(p =>
      p && typeof p.id === "string" && /^[\w-]{1,100}$/.test(p.id) && typeof p.name === "string" &&
      p.name.trim().length > 0 && p.name.length <= 100 && typeof p.updated === "string" && p.updated.length <= 32 &&
      /^\d{4}-\d{2}-\d{2}T/.test(p.updated) &&
      Number.isFinite(Date.parse(p.updated)) && valid(p.value));
}

export function readLibrary<T>(store: Store, family: string, valid: (v: unknown) => v is T): Library<T> {
  const raw = store.getItem(projectKey(family));
  if (raw === null) return { version: 1, family, projects: [] };
  try {
    const parsed: unknown = JSON.parse(raw);
    if (isLibrary(parsed, family, valid)) return parsed;
  } catch { /* Keep the original bytes available for recovery. */ }
  throw new Error("This library could not be read. Download the original before resetting it.");
}

/** One atomic write; a failed quota check leaves the previous library intact. */
export function changeLibrary<T>(store: Store, family: string, valid: (v: unknown) => v is T,
  change: (projects: Project<T>[]) => Project<T>[]) {
  const library = readLibrary(store, family, valid);
  const next = { ...library, projects: change(library.projects) };
  if (next.projects.length > projectLimit) throw new Error("This library holds 30 projects. Back up and remove one before adding more.");
  if (!isLibrary(next, family, valid)) throw new Error("This project has incomplete or unsupported values. Your saved projects are unchanged.");
  try { store.setItem(projectKey(family), JSON.stringify(next)); }
  catch { throw new Error("Device storage is full or unavailable. Download a copy before closing."); }
  return next;
}

export function checkRevision<T>(projects: Project<T>[], original: Project<T>) {
  const current = projects.find(p => p.id === original.id);
  if (!current || JSON.stringify(current) !== JSON.stringify(original))
    throw new Error("This project changed in another tab. Reopen the library before replacing it.");
}
