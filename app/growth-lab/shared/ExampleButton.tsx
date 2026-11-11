import { useState } from "react";
import { useT } from "./locale";
/** `quiet` on the empty stage (2026-11-11): the button only, the line returns for an error. */
export default function ExampleButton({ onLoad, quiet = false }: { onLoad: () => void | Promise<void>; quiet?: boolean }) {
  const tr = useT();
  const [busy, setBusy] = useState(false), [error, setError] = useState("");
  return <div className={`example-input${quiet ? " example-quiet" : ""}`}>
    <button type="button" disabled={busy} onClick={async () => {
      setBusy(true); setError("");
      try { await onLoad(); } catch (e) { setError((e as Error).message); } finally { setBusy(false); }
    }}>{tr(busy ? "Preparing…" : "Try a Sample File")}</button>
    {(!quiet || error) && <span className="fine">{tr(error || "A small example created in this browser. Replace it with your own file whenever you’re ready.")}</span>}
  </div>;
}
