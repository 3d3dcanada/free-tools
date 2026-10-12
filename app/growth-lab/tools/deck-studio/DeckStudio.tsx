import { useCallback, useMemo, useRef, useState } from "react";
import { useDT } from "./i18n";
import { useLocale } from "../../shared/locale";
import Inspector from "./Inspector";
import { Modal } from "./controls";
import { DeckCanvas, IconsModal, ShapesModal, ToolBtn, retheme, useDeckEditor } from "./editor";
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
  const [tab, setTab] = useState<"element" | "slide" | "deck">("slide");
  const [presenting, setPresenting] = useState<null | number>(null);
  const [insertOpen, setInsertOpen] = useState(false);
  const [mobilePanel, setMobilePanel] = useState<null | "slides" | "inspector">(null);
  const importPick = useRef<HTMLInputElement>(null);
  const ed = useDeckEditor<Deck>({
    store: STORE,
    start: starterDeck,
    valid: isDeck,
    tooLarge: tt("Too large to autosave. Use Export, then Save Deck File."),
    onFocusElement: () => setTab("element"),
    paused: presenting !== null,
    onPresent: setPresenting,
  });
  const { mounted, deck, commit, undo, redo, status, setStatus, cur, setCur, slide, sel, setSel, selected, modal, setModal, scale, zoom, setZoom, setSlide, patchEls, addEl, removeSel, duplicateSel, layer, align, insert, center } = ed;

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
  return (
    <div className="ds-root" data-mobile-panel={mobilePanel ?? ""}>
      {/* ------------------------------------------------ toolbar */}
      <div className="ds-toolbar" role="toolbar" aria-label={tt("Deck tools")}>
        <input
          className="ds-title"
          value={deck.title}
          maxLength={120}
          aria-label={tt("Deck name")}
          onChange={(e) => commit((d) => ({ ...d, title: e.target.value }), "title")}
        />
        <div className="ds-tool-group">
          <button type="button" onClick={() => setModal("templates")}>{tt("Templates")}</button>
          <button type="button" onClick={() => setModal("layouts")}>{tt("+ Slide")}</button>
        </div>
        <button type="button" className="ds-insert-toggle" aria-expanded={insertOpen} onClick={() => setInsertOpen(!insertOpen)}>{tt("Insert")}</button>
        <div className="ds-tool-group ds-insert" data-open={insertOpen} onClick={() => setInsertOpen(false)} aria-label={tt("Insert")}>
          <ToolBtn label={tt("Heading")} d="M6 4v16M18 4v16M6 12h12" onClick={insert.heading} />
          <ToolBtn label={tt("Text")} d="M4 6h16M4 12h10M4 18h14" onClick={insert.text} />
          <ToolBtn label={tt("List")} d="M9 6h11M9 12h11M9 18h11M4 6h.01M4 12h.01M4 18h.01" onClick={insert.bullets} />
          <ToolBtn label={tt("Number")} d="M7 20V4L4 7M14 8a3 3 0 1 1 6 0c0 4-6 6-6 12h6" onClick={insert.stat} />
          <ToolBtn label={tt("Shape")} d="M12 3l9 9-9 9-9-9z" onClick={() => setModal("shapes")} />
          <ToolBtn label={tt("Photo")} d="M4 5h16v14H4zM4 15l5-5 4 4 3-3 4 4M15 9h.01" onClick={insert.photo} />
          <ToolBtn label={tt("Icon")} d="M12 3l2.6 6 6.4.6-4.8 4.3 1.4 6.3L12 17l-5.6 3.2 1.4-6.3L3 9.6 9.4 9z" onClick={insert.icon} />
          <ToolBtn label={tt("Chart")} d="M4 20V10M10 20V4M16 20v-7M22 20H2" onClick={insert.chart} />
          <ToolBtn label={tt("Table")} d="M3 5h18v14H3zM3 10h18M3 15h18M9 5v14M15 5v14" onClick={insert.table} />
          <ToolBtn label={tt("QR")} d="M4 4h6v6H4zM14 4h6v6h-6zM4 14h6v6H4zM14 14h2v2h-2zM18 18h2v2h-2zM14 18h2M18 14h2" onClick={insert.qr} />
        </div>
        <History editor={{ undo, redo, canUndo: ed.canUndo, canRedo: ed.canRedo }} />
        <div className="ds-tool-group ds-zoom">
          <button type="button" aria-label={tt("Zoom out")} onClick={() => setZoom(Math.max(0.15, scale - 0.1))}>−</button>
          <button type="button" onClick={() => setZoom("fit")} aria-pressed={zoom === "fit"}>{Math.round(scale * 100)}%</button>
          <button type="button" aria-label={tt("Zoom in")} onClick={() => setZoom(Math.min(3, scale + 0.1))}>+</button>
        </div>
        <span className="ds-spacer" />
        <span className="ds-status" role="status">{status}</span>
        <ProjectLibrary value={deck} valid={isDeck} name="slide-decks" defaultName={deck.title} onLoad={d => { commit(d); setCur(0); setSel([]); }} />
        <ToolSlot name="primary">
          <button type="button" className="ds-export-btn" onClick={() => setModal("export")}><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 4v11m0 0-4.5-4.5M12 15l4.5-4.5M5 19h14" /></svg>{tt("Download")}</button>
        </ToolSlot>
        <button type="button" className="ds-present-btn" onClick={() => setPresenting(cur)} title={tt("Present (F5)")}>
          ▶ {tt("Present")}
        </button>
      </div>

      <div className="ds-main">
        {/* ------------------------------------------------ slide rail */}
        <nav className="ds-rail" aria-label={tt("Slides")}>
          <button type="button" className="ds-sheet-close" aria-label={tt("Close panel")} onClick={() => setMobilePanel(null)}>×</button>
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
                    setMobilePanel(null);
                  }}
                >
                  <span className="ds-rail-n">{String(i + 1).padStart(2, "0")}</span>
                  <SlideThumb deck={deck} slide={s} width={168} />
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
        </nav>

        {/* ------------------------------------------------ canvas */}
        <DeckCanvas
          ed={ed}
          foot={
            <div className="ds-stage-foot">
              <button type="button" onClick={() => setCur(Math.max(0, cur - 1))} disabled={cur === 0} aria-label={tt("Previous slide")}>‹</button>
              <span>
                {cur + 1} / {deck.slides.length}
              </span>
              <button type="button" onClick={() => setCur(Math.min(deck.slides.length - 1, cur + 1))} disabled={cur === deck.slides.length - 1} aria-label={tt("Next slide")}>›</button>
            </div>
          }
        />

        {/* ------------------------------------------------ inspector */}
        <Inspector
          tools={<>
            {ed.blocked && <DraftRecovery recover={ed.recover} resume={ed.resume} />}
            <div className="ds-reuse"><BrandProfile applyLabel="Apply Colours" onApply={b => onDeck({ colors: { ...deck.colors, accent: b.accent, ink: b.ink, bg: b.paper } })}
              onLogo={src => { const r = dims(deck), size = Math.min(r.w, r.h) * 0.15; addEl(image(r.w - size * 1.3, size * 0.3, size, size, src, { fit: "contain", slot: "brand-logo" })); }} /></div>
            <Layers ed={ed} />
          </>}
          onClose={() => setMobilePanel(null)}
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

      {/* ------------------------------------------------ phone bar */}
      <div className="ds-mobile-bar">
        <button type="button" aria-pressed={mobilePanel === "slides"} onClick={() => setMobilePanel(mobilePanel === "slides" ? null : "slides")}>{tt("Slides")}</button>
        <button type="button" aria-pressed={mobilePanel === "inspector" && tab === "slide"} onClick={() => { setTab("slide"); setMobilePanel(mobilePanel === "inspector" && tab === "slide" ? null : "inspector"); }}>{tt("Content")}</button>
        <button type="button" aria-pressed={mobilePanel === "inspector" && tab !== "slide"} onClick={() => { setTab(selected.length ? "element" : "deck"); setMobilePanel(mobilePanel === "inspector" && tab !== "slide" ? null : "inspector"); }}>
          {tt(selected.length ? "Style" : "Design")}
        </button>
        <button type="button" className="ds-present-btn" aria-label={tt("Present")} onClick={() => setPresenting(cur)}>▶</button>
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
