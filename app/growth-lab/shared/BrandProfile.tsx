import { useState } from "react";
import { imageFile, useLocalDraft } from "./browser";
import { brandFields, brandLimits, emptyBrand, isBrand, type Brand } from "./brand";
import Dialog from "./Dialog";
import { ToolChrome, ToolSlot } from "./chrome";
import { DraftRecovery } from "./kit";
import { useT } from "./locale";
import ProjectLibrary from "./ProjectLibrary";

const labels = { name: "Name", role: "Role", company: "Business", email: "Email", phone: "Phone", website: "Website", address: "Address", tagline: "Tagline" };
export default function BrandProfile({ onApply, applyLabel, onLogo }: {
  onApply: (brand: Brand) => void; applyLabel: string; onLogo?: (src: string) => void;
}) {
  const tr = useT();
  const draft = useLocalDraft("3d3d:brand:v1", emptyBrand, isBrand);
  const [open, setOpen] = useState(false), [error, setError] = useState("");
  const b = draft.value;
  return <>
    <ToolSlot name="menu">
      <button type="button" aria-haspopup="dialog" onClick={() => setOpen(true)}>{tr("My Brand")}</button>
    </ToolSlot>
    <Dialog open={open} title={tr("My Brand")} onClose={() => setOpen(false)} className="growth-lab library-layer">
      <section className="library-panel">
        <header><div><h2>{tr("My Brand")}</h2><p className="fine">{tr("Reuse your details, colours and logo across tools. Changes apply only when you choose an action below.")}</p></div><button type="button" aria-label={tr("Close")} onClick={() => setOpen(false)}>×</button></header>
        <div className="library-body">
          {draft.blocked && <DraftRecovery recover={draft.recover} resume={draft.resume} />}
          <div className="brand-fields">{brandFields.map(k => <label key={k}>{tr(labels[k])}<input maxLength={brandLimits[k]} value={b[k]} onChange={e => draft.setValue({ ...b, [k]: e.target.value })} /></label>)}</div>
          <div className="brand-colours">{([['accent', 'Accent'], ['ink', 'Text Colour'], ['paper', 'Background Colour']] as const).map(([k, label]) => <label key={k}>{tr(label)}<input type="color" value={b[k]} onChange={e => draft.setValue({ ...b, [k]: e.target.value })} /></label>)}</div>
          <label>{tr("Logo")}<input type="file" accept="image/png,image/jpeg,image/webp" onChange={async e => {
            const file = e.target.files?.[0]; e.target.value = ""; if (!file) return;
            try { const src = await imageFile(file); draft.setValue(prev => ({ ...prev, logo: src })); setError(""); }
            catch (e) { setError((e as Error).message); }
          }} /></label>
          {b.logo && <div className="brand-logo"><img src={b.logo} alt={tr("Your logo")} /><button type="button" onClick={() => draft.setValue({ ...b, logo: "" })}>{tr("Remove Logo")}</button></div>}
          <p className="fine" role="status">{tr(error || draft.storage)}</p>
          <div className="library-actions">
            <button type="button" onClick={() => { onApply(b); setOpen(false); }}>{tr(applyLabel)}</button>
            {onLogo && <button type="button" disabled={!b.logo} onClick={() => { onLogo(b.logo); setOpen(false); }}>{tr("Insert Logo")}</button>}
            {/* Inside this dialog, not the tool menu. */}<ToolChrome.Provider value={null}><ProjectLibrary value={b} valid={isBrand} onLoad={draft.setValue} name="brand-profiles" defaultName={b.company || b.name} /></ToolChrome.Provider>
          </div>
        </div>
      </section>
    </Dialog>
  </>;
}
