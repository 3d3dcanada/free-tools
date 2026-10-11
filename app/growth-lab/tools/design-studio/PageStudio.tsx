import { useEffect, useMemo, useRef, useState, type ReactNode } from "react";
import { useLocale } from "../../shared/locale";
import { download } from "../../shared/browser";
import { track } from "../../../lib/analytics";
import { Field, Modal, Section, Seg, Toggle } from "../deck-studio/controls";
import { DeckCanvas, IconsModal, ShapesModal, ToolBtn, retheme, useDeckEditor } from "../deck-studio/editor";
import { BackgroundSection, BrandSection, ElementPanel, FontsSection, ThemeSection } from "../deck-studio/Inspector";
import { FONTS, fontStack, icon, image, paint, shape, type El, type TextEl } from "../deck-studio/model";
import ProjectLibrary from "../../shared/ProjectLibrary";
import BrandProfile from "../../shared/BrandProfile";
import { DraftRecovery } from "../../shared/kit";
import Layers from "../deck-studio/Layers";
import { layoutText } from "../deck-studio/export";
import { EmptyFrame, SlideThumb, isPattern, shapeSvg } from "../deck-studio/render";
import {
  BLEED,
  CARD_FIELDS,
  STUDIOS,
  buildDesign,
  cardQr,
  fileName,
  formatOf,
  isDesign,
  normalizeCard,
  reflow,
  templatesOf,
  type CardField,
  type Design,
  type Format,
  type StudioId,
} from "./model";
import { sizeNote, useST } from "./i18n";
import { matchesSearch } from "../navigation";
import { matchesTemplate, templateLayouts, templatePurpose, templatePurposes } from "./template-filters";

/*
 * One page on the Deck Studio canvas (2026-10-09): the flyer, poster,
 * social image and business card studios. Templates down the left, the page
 * on the stage with its print guides, styles on the right, and real files out:
 * print PDF with bleed and crop marks, PNG, JPG, SVG and a 10-up card sheet.
 */

const SELF_HOSTED = FONTS.filter((f) => f.id === "geist" || f.id === "geist-mono");

const SLOT_LABEL: Record<string, string> = {
  kicker: "Label",
  title: "Headline",
  sub: "Subheading",
  body: "Body Text",
  details: "Details",
  date: "Date",
  day: "Day",
  month: "Month",
  time: "Time",
  place: "Place",
  cta: "Call to Action",
  contact: "Contact",
  price: "Price",
  offer: "Offer",
  list: "List",
  quote: "Quote",
  who: "Name",
  url: "Web Address",
  tag: "Tag",
  note: "Small Print",
  num: "Number",
  role: "Role",
  pricelabel: "Price Label",
  raised: "Amount Raised",
  f1: "Feature 1",
  f2: "Feature 2",
  f3: "Feature 3",
  way1: "Way to Give 1",
  way2: "Way to Give 2",
  sec1: "Section 1",
  sec2: "Section 2",
  hours: "Hours",
  cast: "Cast",
  roles: "Roles",
  credits: "Credits",
  ...Object.fromEntries(Array.from({ length: 6 }, (_, i) => [`strip${i}`, `Tear-off ${i + 1}`])),
};

const CARD_LABEL: Record<CardField, string> = {
  name: "Name",
  role: "Role",
  company: "Business",
  phone: "Phone",
  email: "Email",
  website: "Website",
  address: "Address",
  tagline: "Tagline",
};

type Kind = "pdf" | "png" | "jpg" | "svg" | "sheet" | "json";

export default function PageStudio({ studio }: { studio: StudioId }) {
  const cfg = STUDIOS[studio];
  const tt = useST();
  const locale = useLocale();
  const [tab, setTab] = useState<"element" | "page" | "design">("page");
  const [sheet, setSheet] = useState<null | "inspector">(null);
  const [templateQuery, setTemplateQuery] = useState("");
  const [purpose, setPurpose] = useState("All Purposes"), [layout, setLayout] = useState("All Layouts");
  const [guides, setGuides] = useState(true);
  const [decorations, setDecorations] = useState(false);
  const [insertOpen, setInsertOpen] = useState(false);
  const importPick = useRef<HTMLInputElement>(null);
  const ed = useDeckEditor<Design>({
    store: `3d3d:design-studio:${studio}:v1`,
    start: (l) => buildDesign(studio, templatesOf(studio)[0].id, cfg.formats[0].id, l),
    valid: (v): v is Design => isDesign(v, studio),
    tooLarge: tt("Too large to autosave. Use Export, then Save Design File."),
    onFocusElement: () => setTab("element"),
    fitInserts: true,
    footRoom: 48,
    normalize: (next, prev) => fitWords(studio === "card" ? normalizeCard(next, prev) : next, prev),
  });
  const { deck, slide, selected, sel, scale, ratio } = ed;
  const fmt = formatOf(studio, deck?.format ?? cfg.formats[0].id);
  const card = deck?.details ? { details: deck.details, qrKind: deck.qrKind ?? ("vcard" as const) } : undefined;

  // Every template, drawn at the current size (and, for cards, with your own details).
  const previews = useMemo(
    () =>
      deck
        ? templatesOf(studio).map((t) => {
            const d = buildDesign(studio, t.id, deck.format, locale, card);
            return { t, d: card ? fitWords(d, null) : d };
          })
        : [],
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [studio, deck?.format, locale, deck?.details, deck?.qrKind],
  );

  if (!ed.mounted || !deck || !slide)
    return (
      <div className="ds-root ds-loading" aria-busy="true">
        <p>{tt("Loading the studio…")}</p>
      </div>
    );

  const filtered = previews.filter(({ t, d }) => matchesSearch(`${t.name} ${tt(t.name)} ${tt(templatePurpose(t.id))}`, templateQuery) && matchesTemplate(d, purpose, layout));

  const onDeck = (patch: Partial<Design>) =>
    ed.commit((d) => (patch.theme && patch.theme !== d.theme ? retheme(d, patch.theme, patch) : { ...d, ...patch }), "deck:" + Object.keys(patch).join());
  const applyTemplate = (id: string) => {
    setSheet(null);
    ed.setModal(null);
    if (id === deck.template) return;
    ed.commit((d) => reflow(d, { template: id }, locale));
    ed.setSel([]);
    ed.setStatus(tt("Template applied. Your words and photos came along; Undo brings back the last design."));
  };
  const setFormat = (id: string) => {
    ed.setModal(null);
    if (id === deck.format) return;
    ed.commit((d) => reflow(d, { format: id }, locale));
    ed.setSel([]);
    ed.setZoom("fit");
    ed.setStatus(`${tt(formatOf(studio, id).label)} · ${sizeNote(formatOf(studio, id).note, locale)}`);
  };
  const onPickShape = (k: Parameters<typeof shape>[4]) => {
    if (!isPattern(k)) return ed.insert.shape(k);
    // A pattern arrives as a quiet overlay across half the page.
    const w = ratio.w * 0.6,
      h = ratio.h * 0.4,
      c = ed.center(w, h);
    ed.addEl(shape(c.x, c.y, w, h, k, { radius: Math.min(ratio.w, ratio.h) / 24, fill: "theme:accent", opacity: 0.5 }));
    ed.setModal(null);
  };
  const single = selected.length === 1 ? selected[0] : null;
  const cardStudio = studio === "card";
  const faceName = cfg.faces[Math.min(ed.cur, cfg.faces.length - 1)];

  return (
    <EmptyFrame.Provider value="tint">
      <div className={`ds-root ps-root ps-${studio}`} data-mobile-panel={sheet ?? ""}>
        {/* ------------------------------------------------ toolbar */}
        <div className="ds-toolbar" role="toolbar" aria-label={tt("Design tools")}>
          <input
            className="ds-title"
            value={deck.title}
            maxLength={120}
            aria-label={tt("Design name")}
            onChange={(e) => ed.commit((d) => ({ ...d, title: e.target.value }), "title")}
          />
          <div className="ds-tool-group">
            <button type="button" className="ps-browse" onClick={() => ed.setModal("templates")}>{tt("Templates")}</button>
            <button type="button" className="ps-size-btn" onClick={() => ed.setModal("formats")} title={tt("Page Size")}>
              <span className="ps-size-glyph" style={{ aspectRatio: `${fmt.w} / ${fmt.h}` }} aria-hidden="true" />
              {tt(fmt.label)}
            </button>
          </div>
          <button type="button" className="ds-insert-toggle" aria-expanded={insertOpen} onClick={() => setInsertOpen(!insertOpen)}>{tt("Insert")}</button>
          <div className="ds-tool-group ds-insert" data-open={insertOpen} onClick={() => setInsertOpen(false)} aria-label={tt("Insert")}>
            <ToolBtn label={tt("Heading")} d="M6 4v16M18 4v16M6 12h12" onClick={ed.insert.heading} />
            <ToolBtn label={tt("Text")} d="M4 6h16M4 12h10M4 18h14" onClick={ed.insert.text} />
            <ToolBtn label={tt("List")} d="M9 6h11M9 12h11M9 18h11M4 6h.01M4 12h.01M4 18h.01" onClick={ed.insert.bullets} />
            <ToolBtn label={tt("Shape")} d="M12 3l9 9-9 9-9-9z" onClick={() => ed.setModal("shapes")} />
            <ToolBtn label={tt("Photo")} d="M4 5h16v14H4zM4 15l5-5 4 4 3-3 4 4M15 9h.01" onClick={ed.insert.photo} />
            <ToolBtn label={tt("Icon")} d="M12 3l2.6 6 6.4.6-4.8 4.3 1.4 6.3L12 17l-5.6 3.2 1.4-6.3L3 9.6 9.4 9z" onClick={ed.insert.icon} />
            <ToolBtn label={tt("QR")} d="M4 4h6v6H4zM14 4h6v6h-6zM4 14h6v6H4zM14 14h2v2h-2zM18 18h2v2h-2zM14 18h2M18 14h2" onClick={ed.insert.qr} />
            <ToolBtn label={tt("Number")} d="M7 20V4L4 7M14 8a3 3 0 1 1 6 0c0 4-6 6-6 12h6" onClick={ed.insert.stat} />
            {!cardStudio && <ToolBtn label={tt("Table")} d="M3 5h18v14H3zM3 10h18M3 15h18M9 5v14M15 5v14" onClick={ed.insert.table} />}
            {!cardStudio && <ToolBtn label={tt("Chart")} d="M4 20V10M10 20V4M16 20v-7M22 20H2" onClick={ed.insert.chart} />}
          </div>
          <div className="ds-tool-group">
            <button type="button" onClick={ed.undo} disabled={!ed.canUndo} title={tt("Undo (Ctrl Z)")} aria-label={tt("Undo")}>↶</button>
            <button type="button" onClick={ed.redo} disabled={!ed.canRedo} title={tt("Redo (Ctrl Y)")} aria-label={tt("Redo")}>↷</button>
          </div>
          <div className="ds-tool-group ds-zoom">
            <button type="button" aria-label={tt("Zoom out")} onClick={() => ed.setZoom(Math.max(0.05, scale - 0.1))}>−</button>
            <button type="button" onClick={() => ed.setZoom("fit")} aria-pressed={ed.zoom === "fit"}>{Math.round(scale * 100)}%</button>
            <button type="button" aria-label={tt("Zoom in")} onClick={() => ed.setZoom(Math.min(4, scale + 0.1))}>+</button>
          </div>
          <span className="ds-spacer" />
          <span className="ds-status" role="status">{ed.status}</span>
          <ProjectLibrary value={deck} valid={(v): v is Design => isDesign(v, studio)} name={`${studio}-designs`} defaultName={deck.title} onLoad={d => { ed.commit(d); ed.setCur(0); ed.setSel([]); }} />
          {cardStudio && <button type="button" className="ps-decoration-btn" onClick={() => setDecorations(true)}>{tt("Decorations")}</button>}
          <button type="button" className="ds-export-btn ds-primary ps-export-btn" onClick={() => ed.setModal("export")}>{tt("Export")}</button>
        </div>

        <div className="ds-main">
          {/* ------------------------------------------------ templates */}
          <nav className="ds-rail ps-rail" aria-label={tt("Templates")}>
            <button type="button" className="ds-sheet-close" aria-label={tt("Close panel")} onClick={() => setSheet(null)}>×</button>
            <p className="ps-rail-head">
              {tt("Templates")} <span>{previews.length}</span>
            </p>
            <ol>
              {previews.map(({ t, d }) => (
                <li key={t.id} className={t.id === deck.template ? "on" : undefined}>
                  <button
                    type="button"
                    className="ps-tpl"
                    aria-pressed={t.id === deck.template}
                    aria-label={`${tt("Use template:")} ${tt(t.name)}`}
                    // A mouse pick should not pull focus: focusing inside the rail scrolls the whole page.
                    onMouseDown={(e) => e.preventDefault()}
                    onClick={() => applyTemplate(t.id)}
                  >
                    <span className="ps-tpl-art">
                      {d.slides.map((s) => (
                        <SlideThumb key={s.id} deck={d} slide={s} width={cardStudio ? 164 : 172} />
                      ))}
                    </span>
                    <span className="ps-tpl-name">{tt(t.name)}</span>
                  </button>
                </li>
              ))}
            </ol>
          </nav>

          {/* ------------------------------------------------ page */}
          <DeckCanvas
            ed={ed}
            drops
            around={cfg.print && guides ? <div className="ps-bleed" style={{ left: -BLEED * scale, top: -BLEED * scale, width: (ratio.w + 2 * BLEED) * scale, height: (ratio.h + 2 * BLEED) * scale }} aria-hidden="true" /> : undefined}
            overlay={
              cfg.print && guides ? (
                <div className="ps-safe" style={{ left: cfg.safe, top: cfg.safe, width: ratio.w - 2 * cfg.safe, height: ratio.h - 2 * cfg.safe, ["--inv" as string]: 1 / scale }} aria-hidden="true" />
              ) : undefined
            }
            foot={
              cfg.faces.length > 1 ? (
                <div className="ds-stage-foot ps-faces" role="group" aria-label={tt("Card side")}>
                  {cfg.faces.map((f, i) => (
                    <button key={f} type="button" aria-pressed={ed.cur === i} onClick={() => (ed.setCur(i), ed.setSel([]))}>
                      {tt(f)}
                    </button>
                  ))}
                </div>
              ) : (
                <button type="button" className="ds-stage-foot ps-size-foot" onClick={() => ed.setModal("formats")}>
                  {/* "11 × 17 in" already says "11 × 17". */}
                  {fmt.note.startsWith(fmt.label) ? sizeNote(fmt.note, locale) : `${tt(fmt.label)} · ${sizeNote(fmt.note, locale)}`}
                </button>
              )
            }
          />

          {/* ------------------------------------------------ inspector */}
          <aside className="ds-inspector" aria-label={tt("Inspector")}>
            <button type="button" className="ds-sheet-close" aria-label={tt("Close panel")} onClick={() => setSheet(null)}>×</button>
            <div className="ds-tabs" role="group" aria-label={tt("Inspector")}>
              {(["page", "element", "design"] as const).map((t) => (
                <button key={t} type="button" aria-pressed={tab === t} onClick={() => setTab(t)}>
                  {t === "element"
                    ? selected.length > 1
                      ? `${selected.length} ${tt("Items")}`
                      : tt("Style")
                    : t === "page"
                      ? tt("Content")
                      : tt("Design")}
                </button>
              ))}
            </div>
            <div className="ds-inspector-body">
              {ed.blocked && <DraftRecovery recover={ed.recover} resume={ed.resume} />}
              <div className="ds-reuse"><BrandProfile applyLabel={cardStudio ? "Apply Details & Colours" : "Apply Colours"} onApply={b => onDeck({ colors: { ...deck.colors, accent: b.accent, ink: b.ink, bg: b.paper }, ...(cardStudio ? { details: Object.fromEntries(CARD_FIELDS.map(k => [k, b[k]])) as Design["details"] } : {}) })}
                onLogo={src => { const size = Math.min(ratio.w, ratio.h) * 0.2; ed.addEl(image(ratio.w - size * 1.25, size * 0.25, size, size, src, { fit: "contain", slot: "brand-logo" })); }} /></div>
              <Layers ed={ed} />
              {tab === "element" &&
                (selected.length ? (
                  <ElementPanel
                    deck={deck}
                    selected={selected}
                    onEls={(patch) => ed.patchEls(sel, patch, "inspect:" + sel.join())}
                    onPickImage={ed.pickImage}
                    onPickIcon={() => ed.setModal("icons")}
                    onAlign={ed.align}
                    onLayer={ed.layer}
                    onDuplicate={ed.duplicateSel}
                    onDelete={ed.removeSel}
                    page={{ unit: cfg.unit }}
                  />
                ) : (
                  <div className="ds-empty-hint">
                    <p className="ds-hint-title">{tt("Select something on the page")}</p>
                    <p>{tt("Click a word, a shape or a photo frame to style it. Double-click text to type. Drop a photo onto a frame to fill it, or onto the page to add it.")}</p>
                    <ul>
                      <li><kbd>Ctrl</kbd> <kbd>D</kbd> {tt("duplicate")}</li>
                      <li><kbd>Ctrl</kbd> <kbd>Z</kbd> {tt("undo")}</li>
                      <li><kbd>{tt("Arrows")}</kbd> {tt("nudge, ")}<kbd>Shift</kbd> {tt("for 10")}</li>
                      <li><kbd>Del</kbd> {tt("remove")}</li>
                    </ul>
                  </div>
                ))}
              {tab === "page" && (
                <>
                  <p className="ds-note ps-content-note">{tt("Edit your words here. Select anything on the canvas to style it, or open Design for colours and fonts.")}</p>
                  {cardStudio && <CardSection d={deck} commit={ed.commit} />}
                  <WordsSection
                    els={slide.els}
                    skipBound={cardStudio}
                    title={cardStudio ? `${tt("Other Words")} · ${tt(faceName)}` : tt("Words on This Page")}
                    onFocus={(id) => ed.setSel([id])}
                    onText={(id, v) => ed.patchEls([id], { text: v } as Partial<El>, "words:" + id)}
                  />
                  {slide.els.some((e) => e.type === "image") && <Section title={tt("Photos")}>
                    {slide.els.filter((e) => e.type === "image").map((e, i) => <button type="button" className="ps-photo-row" key={e.id} onClick={() => { ed.setSel([e.id]); ed.pickImage("element"); }}>
                      <span>{tt("Photo")} {i + 1}</span><strong>{tt(e.src ? "Replace Photo" : "Add Photo")}</strong>
                    </button>)}
                  </Section>}
                  <BackgroundSection deck={deck} slide={slide} onSlide={(patch) => ed.setSlide((s) => ({ ...s, ...patch }), "slide:" + Object.keys(patch).join())} onPickImage={ed.pickImage} />
                </>
              )}
              {tab === "design" && (
                <>
                  <Section title={tt("Page Size")}>
                    <FormatRows formats={cfg.formats} current={deck.format} onPick={setFormat} />
                  </Section>
                  <ThemeSection
                    deck={deck}
                    onDeck={onDeck}
                    slide={slide}
                    fontsOf={() => deck.fonts}
                    note={tt("A theme recolours everything that uses theme colours. Anything you coloured yourself keeps its colour.")}
                  />
                  <BrandSection deck={deck} onDeck={onDeck} />
                  <FontsSection deck={deck} onDeck={onDeck} fonts={SELF_HOSTED} note={tt("Geist and Geist Mono, the site's own type, so the file looks the same on every device.")} />
                  {cfg.print && (
                    <Section title={tt("Print")}>
                      <Toggle on={guides} onChange={setGuides} label={tt("Show print guides")} />
                      <p className="ds-note ps-legend">
                        <i className="ps-legend-bleed" /> {tt("Bleed: 3 mm of artwork past the trim, so colour runs to the edge after cutting.")}
                      </p>
                      <p className="ds-note ps-legend">
                        <i className="ps-legend-safe" /> {tt("Safe line: keep words and codes inside it.")}
                      </p>
                    </Section>
                  )}
                </>
              )}
            </div>
          </aside>
        </div>

        {/* ------------------------------------------------ phone bar */}
        <div className="ds-mobile-bar ps-mobile-bar">
          <button type="button" onClick={() => ed.setModal("templates")}>{tt("Templates")}</button>
          <button type="button" aria-pressed={sheet === "inspector" && tab === "page"} onClick={() => { setTab("page"); setSheet(sheet === "inspector" && tab === "page" ? null : "inspector"); }}>{tt("Content")}</button>
          <button type="button" aria-pressed={sheet === "inspector" && tab !== "page"} onClick={() => { setTab(selected.length ? "element" : "design"); setSheet(sheet === "inspector" && tab !== "page" ? null : "inspector"); }}>{tt("Style")}</button>
          <button type="button" className="ds-primary" onClick={() => ed.setModal("export")}>{tt("Export")}</button>
        </div>

        <input
          ref={importPick}
          type="file"
          accept=".json,application/json"
          hidden
          onChange={async (e) => {
            const f = e.target.files?.[0];
            e.target.value = "";
            if (!f) return;
            try {
              if (f.size > 60_000_000) throw new Error(tt("That file is too large."));
              const v: unknown = JSON.parse(await f.text());
              if (!isDesign(v, studio)) throw new Error(tt("That file is not a design from this studio."));
              ed.commit(v);
              ed.setCur(0);
              ed.setSel([]);
              ed.setModal(null);
              ed.setStatus(tt("Design opened"));
            } catch (err) {
              ed.setStatus(tt((err as Error).message));
            }
          }}
        />

        {ed.modal === "formats" && (
          <Modal title={tt("Page Size")} onClose={() => ed.setModal(null)}>
            <FormatRows formats={cfg.formats} current={deck.format} onPick={setFormat} />
            <p className="ds-note ps-modal-note">{tt("Your words, photos and colours move to the new size. Undo brings back the last one.")}</p>
          </Modal>
        )}
        {ed.modal === "shapes" && <ShapesModal patterns onClose={() => ed.setModal(null)} onPick={onPickShape} />}
        {decorations && (
          <Modal title={tt("Decorations")} onClose={() => setDecorations(false)}>
            <p>{tt("Choose a layer for this face. Change its colour, size and opacity in the element panel.")}</p>
            <div className="ds-shape-picker">
              {(["lines", "topo", "rings", "plus", "blob", "none"] as const).map((kind) => {
                const preview = shape(0, 0, 120, 80, kind === "none" ? "rect" : kind, { fill: "theme:accent", fill2: kind === "blob" ? "theme:accent2" : "", opacity: kind === "none" ? 0 : 0.7, radius: 12 });
                return (
                  <button key={kind} type="button" onClick={() => {
                    const els = kind === "none" ? [] : kind === "plus"
                      ? [[0.05, 0.08], [0.9, 0.08], [0.05, 0.84], [0.9, 0.84]].map(([x, y]) => shape(ratio.w * x, ratio.h * y, ratio.w * 0.04, ratio.w * 0.04, "plus", { fill: "theme:accent", radius: ratio.w * 0.04, slot: "decoration" }))
                      : [shape(ratio.w * 0.58, 0, ratio.w * 0.42, ratio.h, kind, { fill: "theme:accent", fill2: kind === "blob" ? "theme:accent2" : "", opacity: 0.18, radius: ratio.w * 0.04, slot: "decoration" })];
                    ed.setSlide((s) => ({ ...s, els: [...els, ...s.els.filter((e) => e.slot !== "decoration")] }));
                    ed.setSel([]);
                    setDecorations(false);
                  }}>
                    <span className="ps-decoration-preview" dangerouslySetInnerHTML={{ __html: kind === "none" ? "" : shapeSvg(deck, preview) }} />
                    {tt({ lines: "Line Art", topo: "Contours", rings: "Rings", plus: "Corner Marks", blob: "Gradient", none: "None" }[kind])}
                  </button>
                );
              })}
            </div>
          </Modal>
        )}
        {ed.modal === "templates" && (
          <Modal title={tt("Browse Templates")} onClose={() => ed.setModal(null)} wide>
            <p className="ds-modal-lead">{tt("Pick a layout. Your words and photos carry over, and Undo restores the previous design.")}</p>
            <label className="ds-template-search">{tt("Search templates")}<input type="search" value={templateQuery} onChange={(e) => setTemplateQuery(e.target.value)} /></label>
            <div className="ds-template-filters">
              <label>{tt("Purpose")}<select value={purpose} onChange={e => setPurpose(e.target.value)}>{templatePurposes.filter(p => p === "All Purposes" || previews.some(({ t }) => templatePurpose(t.id) === p)).map(p => <option key={p} value={p}>{tt(p)}</option>)}</select></label>
              <label>{tt("Layout")}<select value={layout} onChange={e => setLayout(e.target.value)}>{templateLayouts.map(l => <option key={l} value={l}>{tt(l)}</option>)}</select></label>
              <span role="status">{filtered.length} / {previews.length}</span>
            </div>
            <div className="ps-template-grid">
              {filtered.map(({ t, d }) => <button type="button" className="ps-tpl" key={t.id} aria-label={`${tt("Use template:")} ${tt(t.name)}`} aria-pressed={deck.template === t.id} onClick={() => applyTemplate(t.id)}>
                <span className="ps-tpl-art">{d.slides.map((s) => <SlideThumb key={s.id} deck={d} slide={s} width={240} />)}</span>
                <strong>{tt(t.name)}</strong><span>{tt(deck.template === t.id ? "Current Template" : "Use Template")}</span>
              </button>)}
            </div>
            {!filtered.length && <p role="status">{tt("No matching templates.")} <button type="button" onClick={() => { setTemplateQuery(""); setPurpose("All Purposes"); setLayout("All Layouts"); }}>{tt("Clear Filters")}</button></p>}
          </Modal>
        )}
        {ed.modal === "icons" && (
          <IconsModal
            onClose={() => ed.setModal(null)}
            onPick={(name, paths) => {
              ed.setModal(null);
              if (single?.type === "icon") ed.patchEls([single.id], { name, paths } as Partial<El>);
              else {
                const s = Math.min(ratio.w, ratio.h) * 0.16,
                  c = ed.center(s, s);
                ed.addEl(icon(c.x, c.y, s, name, paths));
              }
            }}
          />
        )}
        {ed.modal === "export" && (
          <ExportPanel
            doc={deck}
            cur={ed.cur}
            onClose={() => ed.setModal(null)}
            onImport={() => importPick.current?.click()}
            setStatus={ed.setStatus}
          />
        )}
      </div>
    </EmptyFrame.Provider>
  );
}

function FormatRows({ formats, current, onPick }: { formats: Format[]; current: string; onPick: (id: string) => void }) {
  const tt = useST();
  const locale = useLocale();
  return (
    <ul className="ps-formats">
      {formats.map((f) => (
        <li key={f.id}>
          <button type="button" className="ps-format" aria-pressed={f.id === current} onClick={() => onPick(f.id)}>
            <span className="ps-format-glyph" aria-hidden="true">
              <i style={{ aspectRatio: `${f.w} / ${f.h}`, [f.w >= f.h ? "width" : "height"]: "100%" }} />
            </span>
            <strong>{tt(f.label)}</strong>
            <em>{sizeNote(f.note, locale)}</em>
          </button>
        </li>
      ))}
    </ul>
  );
}

/** Every word on the page as a field: the quick way to fill a template, and the easy way on a phone. */
function WordsSection({
  els,
  skipBound,
  title,
  onFocus,
  onText,
}: {
  els: El[];
  skipBound: boolean;
  title: string;
  onFocus: (id: string) => void;
  onText: (id: string, v: string) => void;
}) {
  const tt = useST();
  const texts = els.filter((e): e is TextEl => e.type === "text" && !(skipBound && e.bind));
  if (!texts.length) return null;
  return (
    <Section title={title}>
      {texts.map((e, i) => (
        <Field key={e.id} label={e.slot && SLOT_LABEL[e.slot] ? tt(SLOT_LABEL[e.slot]) : `${tt("Text")} ${i + 1}`} wide>
          <textarea
            rows={Math.min(4, Math.max(1, e.text.split("\n").length, Math.ceil(e.text.length / 34)))}
            value={e.text}
            maxLength={2000}
            onFocus={() => onFocus(e.id)}
            onChange={(ev) => onText(e.id, ev.target.value)}
          />
        </Field>
      ))}
    </Section>
  );
}

/** The business card's details: they fill the card and its contact code. */
function CardSection({ d, commit }: { d: Design; commit: (next: (d: Design) => Design, key?: string) => void }) {
  const tt = useST();
  const details = d.details!;
  let problem = "";
  try {
    cardQr(details, d.qrKind ?? "vcard");
  } catch (e) {
    problem = (e as Error).message;
  }
  return (
    <Section title={tt("Your Details")}>
      {CARD_FIELDS.map((k) => (
        <Field key={k} label={tt(CARD_LABEL[k])} wide>
          <input
            value={details[k]}
            maxLength={120}
            autoComplete="off"
            onChange={(e) => commit((x) => ({ ...x, details: { ...x.details!, [k]: e.target.value } }), "details:" + k)}
          />
        </Field>
      ))}
      <Field label={tt("The QR Code Holds")} wide>
        <Seg
          label={tt("The QR Code Holds")}
          value={d.qrKind ?? "vcard"}
          onChange={(v) => commit((x) => ({ ...x, qrKind: v }))}
          options={[
            { v: "vcard", label: tt("Contact Card") },
            { v: "url", label: tt("Website") },
          ]}
        />
      </Field>
      {problem ? (
        <p className="ps-problem" role="alert">{tt(problem)}</p>
      ) : (
        <p className="ds-note">
          {tt(d.qrKind === "url" ? "Phones open your website when they scan the code." : "Phones offer to save these details as a contact when they scan the code.")}
        </p>
      )}
    </Section>
  );
}

/* ---------------------------------------------------------------- export */

const ROWS: Record<StudioId, { k: Kind; t: string; d: string }[]> = {
  flyer: [
    { k: "pdf", t: "Print PDF", d: "Trim size plus 3 mm bleed and crop marks, artwork at 300 DPI, with trim and bleed boxes for the printer." },
    { k: "png", t: "PNG", d: "The page at 300 DPI, trimmed. For email, the web or a home printer." },
    { k: "svg", t: "SVG", d: "Shapes and live text at the page's real size, with the fonts inside. Opens in browsers and design apps." },
  ],
  poster: [
    { k: "pdf", t: "Print PDF", d: "Trim size plus 3 mm bleed and crop marks, artwork at up to 300 DPI, with trim and bleed boxes for the printer." },
    { k: "png", t: "PNG", d: "The poster at up to 300 DPI, trimmed. For screens and quick proofs." },
    { k: "svg", t: "SVG", d: "Shapes and live text at the poster's real size, with the fonts inside. Opens in browsers and design apps." },
  ],
  social: [
    { k: "png", t: "PNG", d: "Exactly the selected size, pixel for pixel. Sharpest for text and graphics." },
    { k: "jpg", t: "JPG", d: "Exactly the selected size, a smaller file. Best when the image is mostly photo." },
  ],
  card: [
    { k: "pdf", t: "Print PDF", d: "Front and back as two pages: trim size plus 3 mm bleed and crop marks, at 300 DPI." },
    { k: "sheet", t: "10-Up Sheet", d: "Ten cards per page with cut marks, fronts on page one and backs on page two. Letter for 3.5 × 2 in cards, A4 for 85 × 55 mm." },
    { k: "png", t: "PNG of This Side", d: "The side on screen at 300 DPI, for email signatures and sharing." },
  ],
};

function ExportPanel({
  doc,
  cur,
  onClose,
  onImport,
  setStatus,
}: {
  doc: Design;
  cur: number;
  onClose: () => void;
  onImport: () => void;
  setStatus: (s: string) => void;
}) {
  const tt = useST();
  const [busy, setBusy] = useState("");
  const [message, setMessage] = useState("");
  const [lowRes, setLowRes] = useState<string[]>([]);
  const cfg = STUDIOS[doc.studio];
  const locale = useLocale();
  const fmt = formatOf(doc.studio, doc.format);
  const rows = ROWS[doc.studio];

  // Photos that will print soft: under 150 DPI at their printed size.
  useEffect(() => {
    if (!cfg.print) return;
    let live = true;
    void (async () => {
      const notes: string[] = [];
      for (const [i, s] of doc.slides.entries())
        for (const e of s.els) {
          if (e.type !== "image" || !e.src) continue;
          const img = new Image();
          img.src = e.src;
          try {
            await img.decode();
          } catch {
            continue;
          }
          const k = e.fit === "cover" ? Math.max(e.w / img.naturalWidth, e.h / img.naturalHeight) : Math.min(e.w / img.naturalWidth, e.h / img.naturalHeight);
          const dpi = Math.round(72 / k);
          if (dpi < 150) notes.push(`${tt("A photo will print soft, at about")} ${dpi} ${tt("DPI")}${cfg.faces.length > 1 ? ` (${tt(cfg.faces[i])})` : ""}. ${tt("Use a larger original or make the frame smaller.")}`);
        }
      if (live) setLowRes(notes);
    })();
    return () => {
      live = false;
    };
  }, [doc]);

  const notes = [...preflight(doc, tt), ...lowRes];

  async function run(kind: Kind) {
    setBusy(kind);
    setMessage(tt("Preparing…"));
    try {
      if (kind === "json") download(`${fileName(doc)}.design.json`, JSON.stringify(doc), "application/json");
      else {
        const m = await import("./export");
        await m.exportDesign(doc, kind, cur);
      }
      setStatus(`${tt(rows.find((r) => r.k === kind)?.t ?? "Design File")}: ${tt("ready")}`);
      setMessage(`${tt(rows.find((r) => r.k === kind)?.t ?? "Design File")}: ${tt("ready")}`);
      // A free tool export, counted by kind only (2026-10-09).
      track("content_cta", { to: window.location.pathname, kind: `tool_export:${kind}` });
    } catch (e) {
      setStatus(tt((e as Error).message || "Export failed"));
      setMessage(tt((e as Error).message || "Export failed"));
    } finally {
      setBusy("");
    }
  }
  const row = (k: Kind, t: string, d: ReactNode, primary = false) => (
    <li key={k}>
      <div>
        <strong>{tt(t)}</strong>
        <p>{d}</p>
      </div>
      <button type="button" aria-label={`${tt("Download")} ${tt(t)}`} className={primary ? "ds-primary" : undefined} disabled={!!busy} onClick={() => run(k)}>
        {busy === k ? tt("Preparing…") : tt("Download")}
      </button>
    </li>
  );
  return (
    <Modal title={tt("Export and Save")} onClose={onClose}>
      <div className="ds-export-review"><strong>{doc.title}</strong><p>{tt(fmt.label)} · {sizeNote(fmt.note, locale)} · {doc.slides.length} {tt("Pages / Faces")}</p><p>{tt(cfg.print ? "Image exports use the current page. Print PDF includes every face with bleed and crop marks." : "Image exports use the current page at its selected pixel dimensions.")}</p></div>
      <p className="ds-export-status" role="status" aria-atomic="true">{message || tt("Choose a file format below.")}</p>
      {notes.length > 0 && (
        <ul className="ps-preflight" aria-label={tt("Before you print")}>
          {notes.map((n) => (
            <li key={n}>{n}</li>
          ))}
        </ul>
      )}
      <ul className="ds-export">
        {rows.map((r, i) => row(r.k, r.t, tt(r.d), i === 0))}
        {row("json", "Design File", tt("Everything, photos included, to keep editing here later."))}
        <li>
          <div>
            <strong>{tt("Open a Design File")}</strong>
            <p>{tt("Continue a design you saved from this studio.")}</p>
          </div>
          <button type="button" onClick={onImport}>{tt("Open")}</button>
        </li>
      </ul>
      <p className="ds-note">{tt("Everything is built in your browser. Nothing is uploaded.")}</p>
    </Modal>
  );
}

/**
 * Typed words that need more room than their box get smaller until they fit,
 * the way a fixed frame does, so a longer headline or name never runs into the
 * part below. Only typing does this: a size or box you set yourself stays.
 * Without a previous design (the card previews) every detail is fitted.
 */
function fitWords(next: Design, prev: Design | null): Design {
  const ctx = typeof document === "undefined" ? null : document.createElement("canvas").getContext("2d");
  if (!ctx) return next;
  const before = new Map((prev?.slides ?? []).flatMap((s) => s.els.map((e) => [e.id, e] as const)));
  // Fits when the lines stack inside the box and no single word is wider than it
  // (the page would break a long name at its hyphen; the files would not).
  const fits = (e: TextEl, size: number) => {
    ctx.font = `${e.italic ? "italic " : ""}${e.weight} ${size}px ${fontStack(next, e.font)}`;
    (ctx as unknown as { letterSpacing: string }).letterSpacing = `${e.tracking * size}px`;
    const lines = layoutText({ ...e, size }, (s) => ctx.measureText(s).width);
    const width = e.w - e.pad * 2 - (e.list === "none" ? 0 : size * 1.55) + 0.5;
    return lines.length * size * e.lineHeight <= e.h - e.pad * 2 + 0.5 && lines.every((l) => ctx.measureText(l.text).width <= width);
  };
  let changed = false;
  const slides = next.slides.map((s) => {
    const els = s.els.map((e): El => {
      if (e.type !== "text" || e.rot || !e.text.trim()) return e;
      const was = before.get(e.id);
      // Words typed into a part already on the page (a new template's parts are
      // drawn to fit); with no previous design, every card detail.
      if (prev ? was?.type !== "text" || was.text === e.text : !e.bind) return e;
      let size = e.size;
      // Steps of 6 %, never below half the size it had.
      while (size > e.size / 2 && !fits(e, size)) size *= 0.94;
      if (size === e.size) return e;
      changed = true;
      return { ...e, size: Math.round(size * 100) / 100 };
    });
    return els.some((e, i) => e !== s.els[i]) ? { ...s, els } : s;
  });
  return changed ? { ...next, slides } : next;
}

/** What could print or post badly: empty frames, words near the trim, small or pale codes. */
function preflight(doc: Design, tt: (s: string) => string): string[] {
  const cfg = STUDIOS[doc.studio];
  const out: string[] = [];
  const { w, h } = doc.size!;
  const where = (i: number) => (cfg.faces.length > 1 ? ` (${tt(cfg.faces[i])})` : "");
  doc.slides.forEach((s, i) => {
    const empty = s.els.filter((e) => e.type === "image" && !e.src).length;
    if (empty) out.push(`${empty} ${tt(empty === 1 ? "photo frame is empty" : "photo frames are empty")}${where(i)}. ${tt("Empty frames are left out of the file; whatever is behind them shows.")}`);
    if (cfg.print)
      for (const e of s.els) {
        if (e.type !== "text" || !e.text.trim() || e.rot) continue;
        const m = cfg.safe - 0.5;
        if (e.x < m || e.y < m || e.x + e.w > w - m || e.y + e.h > h - m) {
          out.push(`${tt("Words sit outside the safe line")}${where(i)}: “${e.text.split("\n")[0].slice(0, 32)}”. ${tt("Trimming can cut them; move them inside the dashed line.")}`);
          break;
        }
      }
    for (const e of s.els) {
      if (e.type !== "qr") continue;
      if (cfg.print && e.w < 0.6 * 72) out.push(`${tt("A QR code is smaller than 15 mm")}${where(i)}. ${tt("Some phones will struggle; make it larger.")}`);
      const lum = (hex: string) => parseInt(hex.slice(1, 3), 16) * 0.3 + parseInt(hex.slice(3, 5), 16) * 0.59 + parseInt(hex.slice(5, 7), 16) * 0.11;
      if (lum(paint(doc, e.color, "#111111")) > lum(paint(doc, e.bg, "#ffffff")) - 60)
        out.push(`${tt("A QR code needs darker ink on lighter paper to scan")}${where(i)}.`);
    }
  });
  return out;
}
