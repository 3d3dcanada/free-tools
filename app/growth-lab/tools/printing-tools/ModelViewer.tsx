import { useEffect, useMemo, useRef, useState } from "react";
import { analyse, cube, type Analysis } from "./geometry";
import type { Model } from "./import-model";

export const modelScales: Record<string, number> = { mm: 1, cm: 10, in: 25.4, m: 1000 };

/**
 * the loaded model for the whole 3D printing workspace. Every
 * calculator reads the same measurements; STL and OBJ units can be
 * reinterpreted, 3MF units are fixed by the file.
 */
export function useModel() {
  const [model, setModel] = useState<Model | null>(null);
  const [analysis, setAnalysis] = useState<Analysis | null>(null);
  const [unit, setUnit] = useState("mm");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const active = useRef(true),
    stop = useRef<() => void>(() => {});
  useEffect(() => {
    active.current = true;
    return () => {
      active.current = false;
      stop.current();
    };
  }, []);
  async function load(file: File) {
    if (busy) return;
    setBusy(true);
    setError("");
    try {
      const { importModel } = await import("./import-model"),
        next = await importModel(file);
      if (!active.current) return;
      const worker = new Worker(new URL("./analysis.worker.ts", import.meta.url), { type: "module" });
      const result = await new Promise<Analysis>((resolve, reject) => {
        const timer = setTimeout(() => {
          worker.terminate();
          reject(new Error("Mesh analysis exceeded 20 seconds. Simplify the model."));
        }, 20000);
        stop.current = () => {
          clearTimeout(timer);
          worker.terminate();
          reject(new Error("Model analysis cancelled."));
        };
        worker.onmessage = (e) => {
          clearTimeout(timer);
          worker.terminate();
          if (e.data.error) reject(new Error(e.data.error));
          else resolve(e.data.analysis);
        };
        worker.onerror = (e) => {
          clearTimeout(timer);
          worker.terminate();
          reject(new Error(e.message));
        };
        worker.postMessage(next.positions);
      });
      if (!active.current) return;
      setModel(next);
      setAnalysis(result);
      setUnit("mm");
    } catch (e) {
      if (active.current) setError((e as Error).message);
    } finally {
      stop.current = () => {};
      if (active.current) setBusy(false);
    }
  }
  function sample() {
    const p = cube();
    setModel({ name: "Sample 50×40×30 mm cube", positions: p, nativeUnits: "millimeter", fixedUnits: true });
    setAnalysis(analyse(p));
    setUnit("mm");
    setError("");
  }
  const scale = model?.fixedUnits ? 1 : modelScales[unit];
  const positions = useMemo(
    () => (model ? new Float32Array(model.positions.map((n) => n * scale)) : null),
    [model, scale],
  );
  const report = useMemo(
    () =>
      analysis
        ? {
            ...analysis,
            dimensions: analysis.dimensions.map((n) => n * scale),
            min: analysis.min.map((n) => n * scale),
            max: analysis.max.map((n) => n * scale),
            surfaceMm2: analysis.surfaceMm2 * scale ** 2,
            volumeMm3: analysis.volumeMm3 === null ? null : analysis.volumeMm3 * scale ** 3,
            toleranceMm: analysis.toleranceMm * scale,
          }
        : null,
    [analysis, scale],
  );
  return {
    model,
    report,
    positions,
    unit,
    setUnit,
    busy,
    error,
    load,
    sample,
    clear: () => {
      setModel(null);
      setAnalysis(null);
      setError("");
    },
  };
}
