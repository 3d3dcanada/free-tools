import { useT } from "../../shared/locale";
import { type Deck } from "./model";
import type { DeckEditor } from "./editor";

export default function Layers<D extends Deck>({ ed }: { ed: DeckEditor<D> }) {
  const tr = useT();
  if (!ed.slide) return null;
  const selected = ed.selected;
  return <details className="ds-section ds-layers">
    <summary>{tr("Layers & Alignment")} <span>{ed.slide.els.length}</span></summary>
    <div className="ds-section-body">
      <label className="ds-snap"><input type="checkbox" checked={ed.snapping} onChange={e => ed.setSnapping(e.target.checked)} />{tr("Snap to edges and centres")}</label>
      <p className="ds-note">{tr("Top rows appear in front. Select a row to reach covered or locked objects. Shift-click to select several.")}</p>
      <ol className="ds-layer-list">{[...ed.slide.els].reverse().map((el, i) => {
        const label = el.type === "text" ? el.text || tr("Empty Text") : `${tr(el.type === "image" ? "Photo" : el.type === "qr" ? "QR Code" : el.type.charAt(0).toUpperCase() + el.type.slice(1))} ${ed.slide!.els.length - i}`;
        return <li key={el.id}>
          <button type="button" aria-pressed={ed.sel.includes(el.id)} title={label} onClick={e => {
            ed.setEditing(null);
            ed.setSel(e.shiftKey ? ed.sel.includes(el.id) ? ed.sel.filter(id => id !== el.id) : [...ed.sel, el.id] : [el.id]);
          }}>{label}</button>
          <button type="button" aria-label={`${tr(el.locked ? "Unlock" : "Lock")}: ${label}`} aria-pressed={!!el.locked} onClick={() => ed.patchEls([el.id], { locked: !el.locked })}>{tr(el.locked ? "Unlock" : "Lock")}</button>
        </li>;
      })}</ol>
      <div className="ds-layer-actions">
        {([['forward', 'Move Forward'], ['backward', 'Move Backward'], ['front', 'Bring to Front'], ['back', 'Send to Back']] as const).map(([how, label]) => <button type="button" key={how} disabled={!selected.length || selected.some(e => e.locked)} onClick={() => ed.layer(how)}>{tr(label)}</button>)}
        {([['left', 'Align Left'], ['hcenter', 'Centre Horizontally'], ['right', 'Align Right'], ['top', 'Align Top'], ['vcenter', 'Centre Vertically'], ['bottom', 'Align Bottom']] as const).map(([how, label]) => <button type="button" key={how} disabled={!selected.length || selected.some(e => e.locked)} onClick={() => ed.align(how)}>{tr(label)}</button>)}
        <button type="button" disabled={!selected.length} onClick={ed.duplicateSel}>{tr("Duplicate")}</button>
        <button type="button" disabled={!selected.length || selected.every(e => e.locked)} onClick={ed.removeSel}>{tr("Delete")}</button>
      </div>
    </div>
  </details>;
}
