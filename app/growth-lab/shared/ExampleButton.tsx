import { useState } from "react";
import { useT } from "./locale";
export default function ExampleButton({ onLoad }: { onLoad: () => void | Promise<void> }) {
  const tr = useT();
  const [busy, setBusy] = useState(false), [error, setError] = useState("");
  return <div className="example-input">
    <button type="button" disabled={busy} onClick={async () => {
      setBusy(true); setError("");
      try { await onLoad(); } catch (e) { setError((e as Error).message); } finally { setBusy(false); }
    }}>{tr(busy ? "Preparing…" : "Try a Sample File")}</button>
    <span className="fine">{tr(error || "A small example created in this browser. Replace it with your own file whenever you’re ready.")}</span>
  </div>;
}
