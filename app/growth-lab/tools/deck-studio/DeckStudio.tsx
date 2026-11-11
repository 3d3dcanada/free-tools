import { useCallback, useMemo, useRef, useState } from "react";
import { useDT } from "./i18n";
import { useLocale } from "../../shared/locale";
import { countExport } from "../../shared/tooluse";
import Inspector, { type InspectorTab } from "./Inspector";
import { Modal } from "./controls";
import { AddGrid, DeckCanvas, IconsModal, ShapesModal, StageCorner, retheme, useDeckEditor } from "./editor";
import { LAYOUTS, TEMPLATES, deckFromTemplate, makeSlide, starterDeck, type LayoutId } from "./layouts";
import {
  RATIOS,
  cloneSlide,
  icon,
  isDeck,
  themeById,
  type Deck,
  type El,
  type Ratio,
} from "./model";
import { SlideThumb } from "./render";
import Presenter from "./Presenter";
import { matchesSearch } from "../navigation";
import ProjectLibrary from "../../shared/ProjectLibrary";
import BrandProfile from "../../shared/BrandProfile";
import { DraftRecovery, History } from "../../shared/kit";
import { ToolSlot } from "../../shared/chrome";
import Layers from "./Layers";
import { image, dims } from "./model";
import { deckPurposes, matchesDeckTemplate } from "./template-filters";

const STORE = "3d3d:deck-studio:v1";

export default function DeckStudio() {
  const tt = useDT();
  const locale = useLocale();
  const [tab, setTab] = useState<InspectorTab>("slide");
  const [presenting, setPresenting] = useState<null | number>(null);
  const importPick = useRef<HTMLInputElement>(null);
  const ed = useDeckEditor<Deck>({
    store: STORE,
    start: starterDeck,
    valid: isDeck,
    tooLarge: tt("Too large to autosave. Use Export, then Save Deck File."),
    onFocusElement: () => setTab("element"),
    paused: presenting !== null,
    footRoom: 52,
    onPresent: setPresenting,
  });
  const { mounted, deck, commit, undo, redo, setStatus, cur, setCur, slide, sel, setSel, selected, modal, setModal, setSlide, patchEls, addEl, removeSel, duplicateSel, layer, align, insert, center } = ed;

  const onDeck = useCallback(
    (patch: Partial<Deck>) =>
      commit((d) => {
        if (patch.ratio && patch.ratio !== d.ratio) {
          const a = RATIOS[d.ratio],
            b = RATIOS[patch.ratio];
          const sx = b.w / a.w,
            sy = b.h / a.h,
            sf = Math.min(sx, sy);
          return {
            ...d,
            ...patch,
            slides: d.slides.map((s) => ({
              ...s,
              els: s.els.map((e) => {
                const o = { ...e, x: e.x * sx, y: e.y * sy, w: e.w * sx, h: e.h * sy } as El;
                if (o.type === "text" || o.type === "table") o.size = Math.max(8, Math.round(o.size * sf));
                if (o.type === "icon" || o.type === "qr") o.w = o.h = Math.min(o.w, o.h);
                return o;
              }),
            })),
          };
        }
        if (patch.theme && patch.theme !== d.theme) return retheme(d, patch.theme, patch);
        return { ...d, ...patch };
      }, "deck:" + Object.keys(patch).join()),
    [commit],
  );

  /* -------------------------------------------------------------- slides */
  const addSlide = (layout: LayoutId) => {
    if (!deck) return;
    const s = makeSlide(deck, layout, {}, cur + 2, locale);
    commit((d) => ({ ...d, slides: [...d.slides.slice(0, cur + 1), s, ...d.slides.slice(cur + 1)] }));
    setCur(cur + 1);
    setSel([]);
    setModal(null);
  };
  const moveSlide = (from: number, to: number) => {
    if (!deck || to < 0 || to >= deck.slides.length || from === to) return;
    commit((d) => {
      const s = [...d.slides];
      const [m] = s.splice(from, 1);
      s.splice(to, 0, m);
      return { ...d, slides: s };
    });
    setCur(to);
  };
  const dupSlide = (i: number) => {
    commit((d) => ({ ...d, slides: [...d.slides.slice(0, i + 1), cloneSlide(d.slides[i]), ...d.slides.slice(i + 1)] }));
    setCur(i + 1);
  };
  const delSlide = (i: number) => {
    if (!deck || deck.slides.length <= 1) return;
    commit((d) => ({ ...d, slides: d.slides.filter((_, j) => j !== i) }));
    setCur(Math.max(0, Math.min(i, deck.slides.length - 2)));
    setSel([]);
  };

  if (!mounted || !deck || !slide)
    return (
      <div className="ds-root ds-loading" aria-busy="true">
        <p>{tt("Loading the deck studio…")}</p>
      </div>
    );

  const single = selected.length === 1 ? selected[0] : null;
  // The slide list: the rail on desktop, the first tab of the settings sheet on a phone.
  const slideList = (thumb: number) => (
    <>
      <button type="button" className="ds-rail-templates" onClick={() => setModal("templates")}>{tt("Start From a Template")}</button>
      <ol>
        {deck.slides.map((s, i) => (
          <li
            key={s.id}
            draggable
            onDragStart={(e) => e.dataTransfer.setData("text/slide", String(i))}
            onDragOver={(e) => e.preventDefault()}
            onDrop={(e) => {
              const from = Number(e.dataTransfer.getData("text/slide"));
              if (Number.isInteger(from)) moveSlide(from, i);
            }}
            className={i === cur ? "on" : undefined}
          >
            <button
              type="button"
              className="ds-rail-slide"
              aria-current={i === cur ? "true" : undefined}
              aria-label={`Slide ${i + 1}`}
              onClick={() => {
                setCur(i);
                setSel([]);
              }}
            >
              <span className="ds-rail-n">{String(i + 1).padStart(2, "0")}</span>
              <SlideThumb deck={deck} slide={s} width={thumb} />
              {s.hidden && <span className="ds-rail-hidden">{tt("Hidden")}</span>}
            </button>
            <span className="ds-rail-actions">
              <button type="button" title={tt("Move slide up")} aria-label={tt("Move slide up")} onClick={() => moveSlide(i, i - 1)} disabled={i === 0}>↑</button>
              <button type="button" title={tt("Move slide down")} aria-label={tt("Move slide down")} onClick={() => moveSlide(i, i + 1)} disabled={i === deck.slides.length - 1}>↓</button>
              <button type="button" title={tt("Duplicate")} aria-label={tt("Duplicate slide")} onClick={() => dupSlide(i)}>⧉</button>
              <button type="button" title={tt("Delete")} aria-label={tt("Delete slide")} onClick={() => delSlide(i)} disabled={deck.slides.length <= 1}>×</button>
            </span>
          </li>
        ))}
      </ol>
      <button type="button" className="ds-add-slide" onClick={() => setModal("layouts")}>{tt("+ Add Slide")}</button>
    </>
  );
  return (
    <div className="ds-root">
      {/* 2026-11-11: no toolbar of its own. Undo, redo, Download and Projects sit in the tool's one bar;
          adding things is in Content; Present is on the stage; on a phone the sheet is Edit Settings. */}
      <History editor={{ undo, redo, canUndo: ed.canUndo, canRedo: ed.canRedo }} />
      <ProjectLibrary value={deck} valid={isDeck} name="slide-decks" defaultName={deck.title} onLoad={d => { commit(d); setCur(0); setSel([]); }} />
      <ToolSlot name="primary">
        <button type="button" onClick={() => setModal("export")}><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 4v11m0 0-4.5-4.5M12 15l4.5-4.5M5 19h14" /></svg>{tt("Download")}</button>
      </ToolSlot>

      <div className="ds-main">
        {/* ------------------------------------------------ slide rail */}
        <nav className="ds-rail" aria-label={tt("Slides")}>{slideList(134)}</nav>

        {/* ------------------------------------------------ canvas */}
        <DeckCanvas
          ed={ed}
          foot={
            <>
              <div className="ds-stage-foot">
                <button type="button" onClick={() => setCur(Math.max(0, cur - 1))} disabled={cur === 0} aria-label={tt("Previous slide")}>‹</button>
                <span>
                  {cur + 1} / {deck.slides.length}
                </span>
                <button type="button" onClick={() => setCur(Math.min(deck.slides.length - 1, cur + 1))} disabled={cur === deck.slides.length - 1} aria-label={tt("Next slide")}>›</button>
                <button type="button" className="ds-play" onClick={() => setPresenting(cur)} title={tt("Present (F5)")}>▶ {tt("Present")}</button>
              </div>
              <StageCorner ed={ed} max={3} />
            </>
          }
        />

        {/* ------------------------------------------------ inspector */}
        <Inspector
          tools={<>
            {ed.blocked && <DraftRecovery recover={ed.recover} resume={ed.resume} />}
            <BrandProfile applyLabel="Apply Colours" onApply={b => onDeck({ colors: { ...deck.colors, accent: b.accent, ink: b.ink, bg: b.paper } })}
              onLogo={src => { const r = dims(deck), size = Math.min(r.w, r.h) * 0.15; addEl(image(r.w - size * 1.3, size * 0.3, size, size, src, { fit: "contain", slot: "brand-logo" })); }} />
          </>}
          layers={<Layers ed={ed} />}
          lead={{ label: tt("Slides"), body: <div className="ds-sheet-slides">{slideList(124)}</div> }}
          add={<>
            <label className="ds-name-field">{tt("Deck name")}<input value={deck.title} maxLength={120} onChange={(e) => commit((d) => ({ ...d, title: e.target.value }), "title")} /></label>
            <AddGrid ed={ed} title={tt("Add to the Slide")} onShapes={() => setModal("shapes")} />
          </>}
          deck={deck}
          slide={slide}
          selected={selected}
          onSelect={setSel}
          tab={tab}
          setTab={setTab}
          onEls={(patch) => patchEls(sel, patch, "inspect:" + sel.join())}
          onSlide={(patch) => setSlide((s) => ({ ...s, ...patch }), "slide:" + Object.keys(patch).join())}
          onDeck={onDeck}
          onPickImage={ed.pickImage}
          onPickIcon={() => setModal("icons")}
          onAlign={align}
          onLayer={layer}
          onDuplicate={duplicateSel}
          onDelete={removeSel}
        />
      </div>

      <input
        ref={importPick}
        type="file"
        accept=".json,.deck,application/json"
        hidden
        onChange={async (e) => {
          const f = e.target.files?.[0];
          e.target.value = "";
          if (!f) return;
          try {
            if (f.size > 60_000_000) throw new Error(tt("That file is too large."));
            const v: unknown = JSON.parse(await f.text());
            if (!isDeck(v)) throw new Error(tt("That file is not a deck from this studio."));
            commit(v);
            setCur(0);
            setSel([]);
            setModal(null);
            setStatus(tt("Deck opened"));
          } catch (err) {
            setStatus((err as Error).message);
          }
        }}
      />

      {modal === "templates" && (
        <TemplatesModal
          ratio={deck.ratio}
          onClose={() => setModal(null)}
          onPick={(d) => {
            commit(d);
            setCur(0);
            setSel([]);
            setTab("deck");
            setModal(null);
          }}
        />
      )}
      {modal === "layouts" && <LayoutsModal deck={deck} onClose={() => setModal(null)} onPick={addSlide} />}
      {modal === "shapes" && <ShapesModal onClose={() => setModal(null)} onPick={insert.shape} />}
      {modal === "icons" && (
        <IconsModal
          onClose={() => setModal(null)}
          onPick={(name, paths) => {
            setModal(null);
            if (single?.type === "icon") patchEls([single.id], { name, paths } as Partial<El>);
            else {
              const c = center(120, 120);
              addEl(icon(c.x, c.y, 120, name, paths));
            }
          }}
        />
      )}
      {modal === "export" && (
        <ExportModal
          deck={deck}
          cur={cur}
          onClose={() => setModal(null)}
          onImport={() => importPick.current?.click()}
          setStatus={setStatus}
        />
      )}
      {presenting !== null && <Presenter deck={deck} start={presenting} onExit={(i) => { setPresenting(null); setCur(i); }} />}
    </div>
  );
}

function TemplatesModal({ ratio, onClose, onPick }: { ratio: Ratio; onClose: () => void; onPick: (d: Deck) => void }) {
  const tt = useDT();
  const [confirm, setConfirm] = useState<string | null>(null);
  const [query, setQuery] = useState("");
  const [purpose, setPurpose] = useState("All Purposes"), [layout, setLayout] = useState("All Layouts");
  const locale = useLocale();
  const previews = useMemo(() => TEMPLATES.map((t) => ({ t, d: deckFromTemplate(t, ratio, locale) })), [ratio, locale]);
  const filtered = previews.filter(({ t, d }) => matchesSearch(`${t.name} ${tt(t.name)} ${tt(t.blurb)}`, query) && matchesDeckTemplate(t.id, d, purpose, layout));
  return (
    <Modal title={tt("Start From a Template")} onClose={onClose} wide>
      <p className="ds-modal-lead">{tt("Each template is a complete, designed deck. Pick one, then make it yours: every colour, font and layout can change.")}</p>
      <label className="ds-template-search">{tt("Search templates")}<input type="search" value={query} onChange={(e) => setQuery(e.target.value)} /></label>
      <div className="ds-template-filters">
        <label>{tt("Purpose")}<select value={purpose} onChange={e => setPurpose(e.target.value)}>{deckPurposes.map(p => <option key={p} value={p}>{tt(p)}</option>)}</select></label>
        <label>{tt("Layout")}<select value={layout} onChange={e => setLayout(e.target.value)}>{["All Layouts", "With Photos", "Without Photos"].map(l => <option key={l} value={l}>{tt(l)}</option>)}</select></label>
        <span role="status">{filtered.length} / {previews.length}</span>
      </div>
      <div className="ds-template-grid">
        {filtered.map(({ t, d }) => (
          <div key={t.id} className="ds-template">
            <button type="button" className="ds-template-pick" aria-label={`${tt("Use Template")}: ${tt(t.name)}`} onClick={() => setConfirm(t.id)}>
              <SlideThumb deck={d} slide={d.slides[0]} width={300} />
              <span className="ds-template-strip">
                {d.slides.slice(1, 5).map((s) => (
                  <SlideThumb key={s.id} deck={d} slide={s} width={70} />
                ))}
              </span>
            </button>
            <h3>{tt(t.name)}</h3>
            <p>{tt(t.blurb)}</p>
            <p className="ds-template-meta">{d.slides.length} {tt("slides")} · {tt(themeById(t.theme).name)}</p>
            {confirm === t.id && (
              <div className="ds-confirm">
                <span>{tt("This replaces the current deck.")}</span>
                <button type="button" className="ds-primary" onClick={() => onPick(deckFromTemplate(t, ratio, locale))}>{tt("Use Template")}</button>
                <button type="button" onClick={() => setConfirm(null)}>{tt("Cancel")}</button>
              </div>
            )}
          </div>
        ))}
      </div>
      {!filtered.length && <p role="status">{tt("No matching templates.")} <button type="button" onClick={() => { setQuery(""); setPurpose("All Purposes"); setLayout("All Layouts"); }}>{tt("Clear Filters")}</button></p>}
    </Modal>
  );
}

function LayoutsModal({ deck, onClose, onPick }: { deck: Deck; onClose: () => void; onPick: (l: LayoutId) => void }) {
  const tt = useDT();
  const locale = useLocale();
  const items = useMemo(
    () => (Object.keys(LAYOUTS) as LayoutId[]).map((id, i) => ({ id, s: makeSlide(deck, id, {}, i + 1, locale) })),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [deck.theme, deck.ratio, deck.colors, deck.fonts],
  );
  return (
    <Modal title={tt("Add a Slide")} onClose={onClose} wide>
      <div className="ds-layout-grid">
        {items.map(({ id, s }) => (
          <button key={id} type="button" className="ds-layout" onClick={() => onPick(id)}>
            <SlideThumb deck={deck} slide={s} width={220} />
            <span>{tt(LAYOUTS[id].name)}</span>
          </button>
        ))}
      </div>
    </Modal>
  );
}

function ExportModal({
  deck,
  cur,
  onClose,
  onImport,
  setStatus,
}: {
  deck: Deck;
  cur: number;
  onClose: () => void;
  onImport: () => void;
  setStatus: (s: string) => void;
}) {
  const tt = useDT();
  const [busy, setBusy] = useState("");
  const [message, setMessage] = useState("");
  async function run(kind: "pptx" | "pdf" | "html" | "png" | "json") {
    setBusy(kind);
    setMessage(tt("Preparing…"));
    try {
      const m = await import("./export");
      await m.exportDeck(deck, kind, cur);
      // A free tool export, counted by format only: tool_use with the slug and the
      // kind, never a file name or anything typed.
      countExport(kind);
      setStatus(`${kind.toUpperCase()} ${tt("ready")}`);
      setMessage(`${kind.toUpperCase()} ${tt("ready")}`);
    } catch (e) {
      const error = tt((e as Error).message || "Export failed");
      setStatus(error);
      setMessage(error);
    } finally {
      setBusy("");
    }
  }
  const rows: { k: "pptx" | "pdf" | "html" | "png" | "json"; t: string; d: string }[] = [
    { k: "pptx", t: "PowerPoint", d: "Editable text, shapes, native charts, tables and speaker notes. Opens in PowerPoint, Keynote and Google Slides." },
    { k: "pdf", t: "PDF", d: "Sharp, selectable text on every page. Best for sending and printing." },
    { k: "html", t: "Web Presentation", d: "One self-contained file with transitions, animations and keyboard controls. No internet needed to present." },
    { k: "png", t: "Image of This Slide", d: "A 2x PNG of the current slide for social posts and documents." },
    { k: "json", t: "Deck File", d: "Save everything to keep editing later here. Your images go inside the file." },
  ];
  return (
    <Modal title={tt("Export and Save")} onClose={onClose}>
      <div className="ds-export-review"><strong>{deck.title}</strong><p>{deck.ratio} · {deck.slides.filter(s => !s.hidden).length} {tt("Visible Slides")} · {deck.slides.filter(s => s.hidden).length} {tt("Hidden Slides")}</p><p>{tt("Review text, photos and slide order before downloading. The editable backup keeps hidden slides too.")}</p></div>
      <p className="ds-export-status" role="status" aria-atomic="true">{message || tt("Choose a file format below.")}</p>
      <ul className="ds-export">
        {rows.map((r) => (
          <li key={r.k}>
            <div>
              <strong>{tt(r.t)}</strong>
              <p>{tt(r.d)}</p>
            </div>
            <button type="button" aria-label={`${tt("Download")} ${tt(r.t)}`} className={r.k === "pptx" ? "ds-primary" : undefined} disabled={!!busy} onClick={() => run(r.k)}>
              {busy === r.k ? tt("Preparing…") : tt("Download")}
            </button>
          </li>
        ))}
        <li>
          <div>
            <strong>{tt("Open a Deck File")}</strong>
            <p>{tt("Continue a deck you saved from this studio.")}</p>
          </div>
          <button type="button" onClick={onImport}>{tt("Open")}</button>
        </li>
      </ul>
      <p className="ds-note">{tt("Everything is built in your browser. Nothing is uploaded.")}</p>
    </Modal>
  );
}
