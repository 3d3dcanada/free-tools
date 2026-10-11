import type { ImageSettings } from "./model";

export type ImageBatch = { files: File[]; settings: ImageSettings; overrides: Map<File, Partial<ImageSettings>> };
export const settingsFor = (batch: ImageBatch, file: File): ImageSettings => ({ ...batch.settings, ...batch.overrides.get(file) });
export function correctBatch(batch: ImageBatch, file: File | null, patch: Partial<ImageSettings>): ImageBatch {
  if (file) return { ...batch, overrides: new Map(batch.overrides).set(file, { ...batch.overrides.get(file), ...patch }) };
  // Applying a field to all images preserves their other individual corrections.
  const overrides = new Map(batch.overrides);
  for (const [f, old] of overrides) {
    const next = { ...old };
    for (const key of Object.keys(patch) as (keyof ImageSettings)[]) delete next[key];
    if (Object.keys(next).length) overrides.set(f, next); else overrides.delete(f);
  }
  return { ...batch, settings: { ...batch.settings, ...patch }, overrides };
}
