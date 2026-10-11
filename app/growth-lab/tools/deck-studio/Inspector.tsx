import { useState, type ReactNode } from "react";
import { useDT } from "./i18n";
import { ColorField, Field, Num, Section, Seg, Slider, Toggle } from "./controls";
import { SlideThumb, isPattern, isStrokePattern } from "./render";
import {
  FONTS,
  RATIOS,
  THEMES,
  TOKENS,
  palette,
  themeById,
  type Background,
  type ChartEl,
  type Deck,
  type El,
  type ImageEl,
  type Ratio,
  type ShapeKind,
  type Slide,
  type TableEl,
  type Theme,
} from "./model";

type Props = {
  tools?: ReactNode;
  onClose: () => void;
  deck: Deck;
  slide: Slide;
  selected: El[];
  onSelect: (ids: string[]) => void;
  onEls: (patch: Partial<El> | ((e: El) => Partial<El>)) => void;
  onSlide: (patch: Partial<Slide>) => void;
  onDeck: (patch: Partial<Deck>) => void;
  onPickImage: (target: "element" | "background") => void;
  onPickIcon: () => void;
  onAlign: (how: "left" | "hcenter" | "right" | "top" | "vcenter" | "bottom" | "hdist" | "vdist") => void;
  onLayer: (how: "front" | "forward" | "backward" | "back") => void;
  onDuplicate: () => void;
  onDelete: () => void;
  tab: "element" | "slide" | "deck";
  setTab: (t: "element" | "slide" | "deck") => void;
};

const SHAPES: { v: ShapeKind; d: string }[] = [
  { v: "rect", d: "M3 5h18v14H3z" },
  { v: "round", d: "M7 5h10a4 4 0 0 1 4 4v6a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4V9a4 4 0 0 1 4-4z" },
  { v: "pill", d: "M9 7h6a5 5 0 0 1 0 10H9A5 5 0 0 1 9 7z" },
  { v: "ellipse", d: "M12 4a8 8 0 1 0 0 16 8 8 0 0 0 0-16z" },
  { v: "triangle", d: "M12 4l9 16H3z" },
  { v: "diamond", d: "M12 3l9 9-9 9-9-9z" },
  { v: "hexagon", d: "M7 4h10l5 8-5 8H7l-5-8z" },
  { v: "star", d: "M12 3l2.6 6 6.4.6-4.8 4.3 1.4 6.3L12 17l-5.6 3.2 1.4-6.3L3 9.6 9.4 9z" },
  { v: "arrow", d: "M3 9h11V5l7 7-7 7v-4H3z" },
  { v: "chevron", d: "M3 5h12l6 7-6 7H3l6-7z" },
  { v: "blob", d: "M12 3c5 0 9 3 9 8s-4 10-9 10-9-4-9-9 4-9 9-9z" },
  { v: "line", d: "M3 12h18" },
];
/** Decorative cuts and SVG patterns, offered on pages (design studios). */
export const PAGE_SHAPES: { v: ShapeKind; d: string }[] = [
  { v: "wave", d: "M3 13c4-6 8 4 18-3v10H3z" },
  { v: "arch", d: "M4 21V11a8 8 0 0 1 16 0v10z" },
  { v: "ring", d: "M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18zm0 5a4 4 0 1 1 0 8 4 4 0 0 1 0-8z" },
  { v: "slant", d: "M8 5h13l-5 14H3z" },
  { v: "quarter", d: "M4 4a16 16 0 0 1 16 16H4z" },
  { v: "dots", d: "M6 6h.01M12 6h.01M18 6h.01M6 12h.01M12 12h.01M18 12h.01M6 18h.01M12 18h.01M18 18h.01" },
  { v: "halftone", d: "M5 6a1.6 1.6 0 1 0 0 .1M10 6a1.1 1.1 0 1 0 0 .1M15 6a.6.6 0 1 0 0 .1M5 12a1.6 1.6 0 1 0 0 .1M10 12a1.1 1.1 0 1 0 0 .1M15 12a.6.6 0 1 0 0 .1M5 18a1.6 1.6 0 1 0 0 .1M10 18a1.1 1.1 0 1 0 0 .1M15 18a.6.6 0 1 0 0 .1" },
  { v: "grid", d: "M3 8h18M3 16h18M8 3v18M16 3v18" },
  { v: "lines", d: "M3 9l6-6M3 15L15 3M3 21L21 3M9 21l12-12M15 21l6-6" },
  { v: "waves", d: "M3 8q3-3 6 0t6 0 6 0M3 14q3-3 6 0t6 0 6 0M3 20q3-3 6 0t6 0 6 0" },
  { v: "rings", d: "M12 9a3 3 0 1 0 0 6 3 3 0 0 0 0-6M12 5a7 7 0 1 0 0 14 7 7 0 0 0 0-14" },
  { v: "topo", d: "M5 12c0-5 5-8 9-6s6 7 2 10-11 1-11-4M9 12c0-2 2-3 4-2s2 4 0 4-4 0-4-2" },
  { v: "rays", d: "M12 12L3 6v4zM12 12l9-6v4zM12 12L3 18v-4zM12 12l9 6v-4zM12 12L10 3h4zM12 12l-2 9h4z" },
  { v: "zigzag", d: "M3 9l3-3 3 3 3-3 3 3 3-3 3 3M3 17l3-3 3 3 3-3 3 3 3-3 3 3" },
  { v: "plus", d: "M6 4v4M4 6h4M18 4v4M16 6h4M6 16v4M4 18h4M18 16v4M16 18h4M12 10v4M10 12h4" },
  { v: "confetti", d: "M4 6l3 2M14 4l-1 3M19 9l2 2M8 14l-2 3M15 15l3-1M11 20l2 1" },
];
const ANIMS = ["none", "fade", "rise", "zoom", "left", "right", "pop"] as const;
const FILTERS = ["none", "mono", "warm", "cool", "dim", "vivid"] as const;
const MASKS = ["none", "circle", "arch", "blob"] as const;

export default function Inspector(p: Props) {
  const tt = useDT();
  const { deck, slide, selected, tab, setTab } = p;
  return (
    <aside className="ds-inspector" aria-label={tt("Inspector")}>
      <button type="button" className="ds-sheet-close" aria-label={tt("Close panel")} onClick={p.onClose}>×</button>
      <div className="ds-tabs" role="group" aria-label={tt("Inspector")}>
        {(["slide", "element", "deck"] as const).map((t) => (
          <button key={t} type="button" aria-pressed={tab === t} onClick={() => setTab(t)}>
            {t === "element" ? (selected.length > 1 ? `${selected.length} ${tt("Items")}` : tt("Style")) : t === "slide" ? tt("Content") : tt("Design")}
          </button>
        ))}
      </div>
      <div className="ds-inspector-body">
        {p.tools}
        {tab === "element" && (selected.length ? <ElementPanel {...p} /> : <EmptyHint />)}
        {tab === "slide" && <SlidePanel {...p} />}
        {tab === "deck" && <DeckPanel deck={deck} onDeck={p.onDeck} slide={slide} />}
      </div>
    </aside>
  );
}

function EmptyHint() {
  const tt = useDT();
  return (
    <div className="ds-empty-hint">
      <p className="ds-hint-title">{tt("Select something on the slide")}</p>
      <p>{tt("Click an element to style it. Shift-click or drag across the slide to select several. Double-click text to type, or a photo frame to add a picture.")}</p>
      <ul>
        <li><kbd>Ctrl</kbd> <kbd>D</kbd> {tt("duplicate")}</li>
        <li><kbd>Ctrl</kbd> <kbd>Z</kbd> {tt("undo")}</li>
        <li><kbd>{tt("Arrows")}</kbd> {tt("nudge, ")}<kbd>Shift</kbd> {tt("for 10")}</li>
        <li><kbd>Del</kbd> {tt("remove")}</li>
        <li><kbd>F5</kbd> {tt("Present")}</li>
      </ul>
    </div>
  );
}

export type ElementPanelProps = Pick<
  Props,
  "deck" | "selected" | "onEls" | "onPickImage" | "onPickIcon" | "onAlign" | "onLayer" | "onDuplicate" | "onDelete"
> & {
  /** A design-studio page: sizes in its unit, patterns offered, no entrance animation. */
  page?: { unit: "pt" | "px" };
};

export function ElementPanel(p: ElementPanelProps) {
  const tt = useDT();
  const { deck, selected, onEls, page } = p;
  const el = selected[0];
  const many = selected.length > 1;
  return (
    <>
      <div className="ds-quick">
        <button type="button" onClick={p.onDuplicate} title={`${tt("Duplicate")} (Ctrl D)`}>{tt("Duplicate")}</button>
        <button type="button" onClick={() => onEls((e) => ({ locked: !e.locked }))} aria-pressed={!!el.locked}>
          {tt(el.locked ? "Unlock" : "Lock")}
        </button>
        <button type="button" className="ds-danger" onClick={p.onDelete} title={tt("Delete")}>{tt("Delete")}</button>
      </div>

      {!many && el.type === "text" && <TextPanel deck={deck} el={el} onEls={onEls} unit={page?.unit} />}
      {!many && el.type === "shape" && (
        <Section title={tt("Shape")}>
          <div className="ds-tiles ds-tiles-shapes">
            {(page ? [...SHAPES, ...PAGE_SHAPES] : SHAPES).map((s) => (
              <button key={s.v} type="button" aria-pressed={el.shape === s.v} title={s.v} aria-label={s.v} onClick={() => onEls({ shape: s.v } as Partial<El>)}>
                <svg viewBox="0 0 24 24" style={isStrokePattern(s.v) ? { fill: "none" } : undefined}><path d={s.d} /></svg>
              </button>
            ))}
          </div>
          <Field label={tt("Fill")} wide>
            <ColorField deck={deck} value={el.fill} onChange={(v) => onEls({ fill: v } as Partial<El>)} allowNone />
          </Field>
          <Field label={tt("Blend To")} wide>
            <ColorField deck={deck} value={el.fill2} onChange={(v) => onEls({ fill2: v } as Partial<El>)} allowNone />
          </Field>
          {el.fill2 && (
            <Field label={tt("Blend Angle")} wide>
              <Slider value={el.angle} min={0} max={360} onChange={(v) => onEls({ angle: v } as Partial<El>)} format={(v) => `${v}°`} />
            </Field>
          )}
          {isPattern(el.shape) || el.shape === "ring" ? (
            <>
              <Field label={tt(el.shape === "ring" ? "Thickness" : "Spacing")} wide>
                <Slider
                  value={Math.round(el.radius || Math.min(el.w, el.h) / (el.shape === "ring" ? 7 : 12))}
                  min={1}
                  max={Math.max(8, Math.round(Math.min(el.w, el.h) / 2))}
                  onChange={(v) => onEls({ radius: v } as Partial<El>)}
                />
              </Field>
              {isStrokePattern(el.shape) && (
                <Field label={tt("Line Weight")} wide>
                  <Slider value={el.strokeW || 1.5} min={0.25} max={12} step={0.25} onChange={(v) => onEls({ strokeW: v } as Partial<El>)} />
                </Field>
              )}
            </>
          ) : (
            <>
              <Field label={tt("Outline")} wide>
                <ColorField deck={deck} value={el.stroke} onChange={(v) => onEls({ stroke: v, strokeW: el.strokeW || 2 } as Partial<El>)} allowNone />
              </Field>
              <Field label={tt("Outline Width")}>
                <Num value={el.strokeW} min={0} max={40} onChange={(v) => onEls({ strokeW: v } as Partial<El>)} />
              </Field>
            </>
          )}
          {(el.shape === "rect" || el.shape === "round") && (
            <Field label={tt("Corner Radius")}>
              <Num value={el.radius} min={0} max={400} onChange={(v) => onEls({ radius: v } as Partial<El>)} />
            </Field>
          )}
        </Section>
      )}
      {!many && el.type === "image" && <ImagePanel deck={deck} el={el} onEls={onEls} onPick={() => p.onPickImage("element")} />}
      {!many && el.type === "icon" && (
        <Section title={tt("Icon")}>
          <button type="button" className="ds-wide-btn" onClick={p.onPickIcon}>{tt("Change Icon")}</button>
          <Field label={tt("Colour")} wide>
            <ColorField deck={deck} value={el.color} onChange={(v) => onEls({ color: v } as Partial<El>)} />
          </Field>
          <Field label={tt("Tile")} wide>
            <ColorField deck={deck} value={el.fill} onChange={(v) => onEls({ fill: v } as Partial<El>)} allowNone />
          </Field>
          <Field label={tt("Line Weight")} wide>
            <Slider value={el.strokeW} min={0.75} max={3.5} step={0.25} onChange={(v) => onEls({ strokeW: v } as Partial<El>)} />
          </Field>
          {el.fill && (
            <Field label={tt("Tile Radius")}>
              <Num value={el.radius} min={0} max={200} onChange={(v) => onEls({ radius: v } as Partial<El>)} />
            </Field>
          )}
        </Section>
      )}
      {!many && el.type === "chart" && <ChartPanel deck={deck} el={el} onEls={onEls} />}
      {!many && el.type === "table" && <TablePanel deck={deck} el={el} onEls={onEls} />}
      {!many && el.type === "qr" && (
        <Section title={tt("QR Code")}>
          {el.bind === "card" ? (
            // A business card's code is filled from its details; a one-line field would flatten the contact card.
            <p className="ds-note">{tt("This code holds your card details. Change them, or point it at your website, in the Card tab.")}</p>
          ) : (
            <Field label={tt("Link or Text")} wide>
              <input value={el.value} maxLength={600} onChange={(e) => onEls({ value: e.target.value } as Partial<El>)} />
            </Field>
          )}
          <Field label={tt("Ink")} wide>
            <ColorField deck={deck} value={el.color} onChange={(v) => onEls({ color: v } as Partial<El>)} />
          </Field>
          <Field label={tt("Paper")} wide>
            <ColorField deck={deck} value={el.bg} onChange={(v) => onEls({ bg: v } as Partial<El>)} />
          </Field>
          <p className="ds-note">{tt("Keep dark ink on a light paper so phones can scan it.")}</p>
        </Section>
      )}

      <Section title={tt(many ? "Arrange" : "Position")}>
        <div className="ds-align">
          {(
            [
              ["left", "M4 4v16M8 7h12M8 12h8M8 17h10"],
              ["hcenter", "M12 4v16M6 7h12M8 12h8M5 17h14"],
              ["right", "M20 4v16M4 7h12M8 12h8M6 17h10"],
              ["top", "M4 4h16M7 8v12M12 8v8M17 8v10"],
              ["vcenter", "M4 12h16M7 6v12M12 8v8M17 5v14"],
              ["bottom", "M4 20h16M7 4v12M12 8v8M17 6v10"],
            ] as const
          ).map(([how, d]) => (
            <button key={how} type="button" title={tt("Align")} aria-label={`${tt("Align")} ${how}`} onClick={() => p.onAlign(how)}>
              <svg viewBox="0 0 24 24"><path d={d} /></svg>
            </button>
          ))}
          {many && (
            <>
              <button type="button" title={tt("Distribute across")} onClick={() => p.onAlign("hdist")}>↔</button>
              <button type="button" title={tt("Distribute down")} onClick={() => p.onAlign("vdist")}>↕</button>
            </>
          )}
        </div>
        <p className="ds-note">{tt(many ? "Aligns to the selection." : page ? "Aligns to the page." : "Aligns to the slide.")}</p>
        {!many && (
          <div className="ds-grid4">
            <Field label="X"><Num value={el.x} onChange={(v) => onEls({ x: v })} /></Field>
            <Field label="Y"><Num value={el.y} onChange={(v) => onEls({ y: v })} /></Field>
            <Field label="W"><Num value={el.w} min={4} onChange={(v) => onEls({ w: v })} /></Field>
            <Field label="H"><Num value={el.h} min={4} onChange={(v) => onEls({ h: v })} /></Field>
          </div>
        )}
        {!many && (
          <Field label={tt("Rotate")} wide>
            <Slider value={el.rot} min={-180} max={180} onChange={(v) => onEls({ rot: v })} format={(v) => `${v}°`} />
          </Field>
        )}
        <Field label={tt("Opacity")} wide>
          <Slider value={Math.round(el.opacity * 100)} min={5} max={100} onChange={(v) => onEls({ opacity: v / 100 })} format={(v) => `${v}%`} />
        </Field>
        <div className="ds-layer">
          <button type="button" onClick={() => p.onLayer("front")}>{tt("To Front")}</button>
          <button type="button" onClick={() => p.onLayer("forward")}>{tt("Forward")}</button>
          <button type="button" onClick={() => p.onLayer("backward")}>{tt("Back")}</button>
          <button type="button" onClick={() => p.onLayer("back")}>{tt("To Back")}</button>
        </div>
      </Section>

      <Section title={tt("Effects")}>
        <Field label={tt("Shadow")} wide>
          <Seg
            label={tt("Shadow")}
            value={el.shadow}
            onChange={(v) => onEls({ shadow: v })}
            options={[
              { v: "none", label: tt("None") },
              { v: "soft", label: tt("Soft") },
              { v: "lift", label: tt("Lift") },
              { v: "glow", label: tt("Glow") },
            ]}
          />
        </Field>
        {!page && (
          <Field label={tt("Entrance")} wide>
            <select value={el.anim} onChange={(e) => onEls({ anim: e.target.value as El["anim"] })}>
              {ANIMS.map((a) => (
                <option key={a} value={a}>
                  {tt(a === "none" ? "No animation" : a === "left" ? "Slide from left" : a === "right" ? "Slide from right" : a[0].toUpperCase() + a.slice(1))}
                </option>
              ))}
            </select>
          </Field>
        )}
      </Section>
    </>
  );
}

function TextPanel({ deck, el, onEls, unit = "px" }: { deck: Deck; el: Extract<El, { type: "text" }>; onEls: Props["onEls"]; unit?: string }) {
  const tt = useDT();
  const set = (patch: Partial<Extract<El, { type: "text" }>>) => onEls(patch as Partial<El>);
  return (
    <Section title={tt("Text")}>
      <Field label={tt("Content")} wide>
        <textarea rows={4} value={el.text} maxLength={4000} onChange={(e) => set({ text: e.target.value })} />
      </Field>
      <Field label={tt("Font")} wide>
        <Seg
          label={tt("Font role")}
          value={el.font}
          onChange={(v) => set({ font: v })}
          options={[
            { v: "heading", label: tt("Heading") },
            { v: "body", label: tt("Body") },
            { v: "mono", label: tt("Mono") },
          ]}
        />
      </Field>
      <div className="ds-grid2">
        <Field label={tt("Size")}><Num value={el.size} min={unit === "pt" ? 4 : 8} max={unit === "pt" ? 600 : 400} step={unit === "pt" ? 0.5 : 1} onChange={(v) => set({ size: v })} suffix={unit} /></Field>
        <Field label={tt("Weight")}>
          <select value={el.weight} onChange={(e) => set({ weight: +e.target.value })}>
            {[300, 400, 500, 600, 700, 800, 850, 900].map((w) => (
              <option key={w} value={w}>{w}</option>
            ))}
          </select>
        </Field>
      </div>
      <Field label={tt("Colour")} wide>
        <ColorField deck={deck} value={el.color} onChange={(v) => set({ color: v || "theme:ink" })} />
      </Field>
      <Field label={tt("Align")} wide>
        <Seg label={tt("Align")} value={el.align} onChange={(v) => set({ align: v })} options={[{ v: "left", label: tt("Left") }, { v: "center", label: tt("Centre") }, { v: "right", label: tt("Right") }]} />
      </Field>
      <Field label={tt("Vertical")} wide>
        <Seg label={tt("Vertical align")} value={el.valign} onChange={(v) => set({ valign: v })} options={[{ v: "top", label: tt("Top") }, { v: "middle", label: tt("Middle") }, { v: "bottom", label: tt("Bottom") }]} />
      </Field>
      <div className="ds-toggles">
        <Toggle on={el.italic} onChange={(v) => set({ italic: v })} label={tt("Italic")} />
        <Toggle on={el.underline} onChange={(v) => set({ underline: v })} label={tt("Underline")} />
        <Toggle on={el.upper} onChange={(v) => set({ upper: v })} label={tt("Caps")} />
      </div>
      <Field label={tt("List")} wide>
        <Seg label={tt("List style")} value={el.list} onChange={(v) => set({ list: v })} options={[{ v: "none", label: tt("None") }, { v: "bullet", label: "•" , title: "Bullets" }, { v: "number", label: "1.", title: "Numbers" }, { v: "check", label: "✓", title: "Checks" }]} />
      </Field>
      <Field label={tt("Line Height")} wide>
        <Slider value={el.lineHeight} min={0.8} max={2.2} step={0.05} onChange={(v) => set({ lineHeight: v })} format={(v) => v.toFixed(2)} />
      </Field>
      <Field label={tt("Letter Spacing")} wide>
        <Slider value={el.tracking} min={-0.08} max={0.4} step={0.01} onChange={(v) => set({ tracking: v })} format={(v) => `${v.toFixed(2)}em`} />
      </Field>
      <Field label={tt("Highlight Box")} wide>
        <ColorField deck={deck} value={el.fill} onChange={(v) => set({ fill: v, pad: v && !el.pad ? 16 : el.pad, radius: v && !el.radius ? 10 : el.radius })} allowNone />
      </Field>
      {el.fill && (
        <div className="ds-grid2">
          <Field label={tt("Padding")}><Num value={el.pad} min={0} max={120} onChange={(v) => set({ pad: v })} /></Field>
          <Field label={tt("Radius")}><Num value={el.radius} min={0} max={200} onChange={(v) => set({ radius: v })} /></Field>
        </div>
      )}
    </Section>
  );
}

function ImagePanel({ deck, el, onEls, onPick }: { deck: Deck; el: ImageEl; onEls: Props["onEls"]; onPick: () => void }) {
  const tt = useDT();
  const set = (patch: Partial<ImageEl>) => onEls(patch as Partial<El>);
  return (
    <Section title={tt("Photo")}>
      <button type="button" className="ds-wide-btn ds-primary" onClick={onPick}>
        {tt(el.src ? "Replace Photo" : "Add Photo")}
      </button>
      <Field label={tt("Fit")} wide>
        <Seg label={tt("Fit")} value={el.fit} onChange={(v) => set({ fit: v })} options={[{ v: "cover", label: tt("Fill Frame") }, { v: "contain", label: tt("Show All") }]} />
      </Field>
      {el.fit === "cover" && (
        <>
          <Field label={tt("Focus Across")} wide>
            <Slider value={el.fx} min={0} max={100} onChange={(v) => set({ fx: v })} format={(v) => `${v}%`} />
          </Field>
          <Field label={tt("Focus Down")} wide>
            <Slider value={el.fy} min={0} max={100} onChange={(v) => set({ fy: v })} format={(v) => `${v}%`} />
          </Field>
        </>
      )}
      <Field label={tt("Look")} wide>
        <div className="ds-tiles ds-tiles-text">
          {FILTERS.map((f) => (
            <button key={f} type="button" aria-pressed={el.filter === f} onClick={() => set({ filter: f })}>
              {tt(f === "none" ? "Original" : f[0].toUpperCase() + f.slice(1))}
            </button>
          ))}
        </div>
      </Field>
      <Field label={tt("Frame")} wide>
        <div className="ds-tiles ds-tiles-text">
          {MASKS.map((m) => (
            <button key={m} type="button" aria-pressed={el.mask === m} onClick={() => set({ mask: m })}>
              {tt(m === "none" ? "Rectangle" : m[0].toUpperCase() + m.slice(1))}
            </button>
          ))}
        </div>
      </Field>
      {el.mask === "none" && (
        <Field label={tt("Corner Radius")}>
          <Num value={el.radius} min={0} max={400} onChange={(v) => set({ radius: v })} />
        </Field>
      )}
      <Field label={tt("Border")} wide>
        <ColorField deck={deck} value={el.border} onChange={(v) => set({ border: v, borderW: v && !el.borderW ? 6 : el.borderW })} allowNone />
      </Field>
    </Section>
  );
}

function ChartPanel({ deck, el, onEls }: { deck: Deck; el: ChartEl; onEls: Props["onEls"] }) {
  const tt = useDT();
  const set = (patch: Partial<ChartEl>) => onEls(patch as Partial<El>);
  const setCell = (si: number, i: number, v: number) =>
    set({ series: el.series.map((s, j) => (j === si ? { ...s, values: el.labels.map((_, k) => (k === i ? v : s.values[k] ?? 0)) } : s)) });
  return (
    <Section title={tt("Chart")}>
      <div className="ds-tiles ds-tiles-text">
        {(["column", "bar", "line", "area", "pie", "donut"] as const).map((k) => (
          <button key={k} type="button" aria-pressed={el.kind === k} onClick={() => set({ kind: k })}>
            {tt(k[0].toUpperCase() + k.slice(1))}
          </button>
        ))}
      </div>
      <div className="ds-data">
        <div className="ds-data-row ds-data-head">
          <span />
          {el.series.map((s, si) => (
            <input
              key={si}
              aria-label={`Series ${si + 1} name`}
              value={s.name}
              onChange={(e) => set({ series: el.series.map((x, j) => (j === si ? { ...x, name: e.target.value } : x)) })}
            />
          ))}
        </div>
        {el.labels.map((l, i) => (
          <div className="ds-data-row" key={i}>
            <input aria-label={`Label ${i + 1}`} value={l} onChange={(e) => set({ labels: el.labels.map((x, k) => (k === i ? e.target.value : x)) })} />
            {el.series.map((s, si) => (
              <input
                key={si}
                type="number"
                aria-label={`${s.name} ${l}`}
                value={s.values[i] ?? 0}
                onChange={(e) => setCell(si, i, Number.isFinite(e.target.valueAsNumber) ? e.target.valueAsNumber : 0)}
              />
            ))}
          </div>
        ))}
      </div>
      <div className="ds-quick">
        <button type="button" disabled={el.labels.length >= 12} onClick={() => set({ labels: [...el.labels, `Item ${el.labels.length + 1}`], series: el.series.map((s) => ({ ...s, values: [...s.values, 10] })) })}>{tt("+ Row")}</button>
        <button type="button" disabled={el.labels.length <= 1} onClick={() => set({ labels: el.labels.slice(0, -1), series: el.series.map((s) => ({ ...s, values: s.values.slice(0, -1) })) })}>{tt("− Row")}</button>
        <button type="button" disabled={el.series.length >= 4 || el.kind === "pie" || el.kind === "donut"} onClick={() => set({ series: [...el.series, { name: `Series ${el.series.length + 1}`, values: el.labels.map(() => 10) }], legend: true })}>{tt("+ Series")}</button>
        <button type="button" disabled={el.series.length <= 1} onClick={() => set({ series: el.series.slice(0, -1) })}>{tt("− Series")}</button>
      </div>
      <div className="ds-toggles">
        <Toggle on={el.values} onChange={(v) => set({ values: v })} label={tt("Values")} />
        <Toggle on={el.legend} onChange={(v) => set({ legend: v })} label={tt("Legend")} />
        <Toggle on={el.grid} onChange={(v) => set({ grid: v })} label={tt("Grid")} />
      </div>
      <Field label={tt("Text Colour")} wide>
        <ColorField deck={deck} value={el.color} onChange={(v) => set({ color: v || "theme:ink" })} />
      </Field>
      <p className="ds-note">{tt("Series use the theme accents, in order.")}</p>
    </Section>
  );
}

function TablePanel({ deck, el, onEls }: { deck: Deck; el: TableEl; onEls: Props["onEls"] }) {
  const tt = useDT();
  const set = (patch: Partial<TableEl>) => onEls(patch as Partial<El>);
  const cols = el.rows[0]?.length ?? 1;
  return (
    <Section title={tt("Table")}>
      <div className="ds-data" style={{ ["--cols" as string]: cols }}>
        {el.rows.map((row, i) => (
          <div className="ds-data-row" key={i}>
            {row.map((cell, j) => (
              <input
                key={j}
                aria-label={`Row ${i + 1} column ${j + 1}`}
                value={cell}
                onChange={(e) => set({ rows: el.rows.map((r, a) => (a === i ? r.map((c, b) => (b === j ? e.target.value : c)) : r)) })}
              />
            ))}
          </div>
        ))}
      </div>
      <div className="ds-quick">
        <button type="button" disabled={el.rows.length >= 14} onClick={() => set({ rows: [...el.rows, Array(cols).fill("")] })}>{tt("+ Row")}</button>
        <button type="button" disabled={el.rows.length <= 1} onClick={() => set({ rows: el.rows.slice(0, -1) })}>{tt("− Row")}</button>
        <button type="button" disabled={cols >= 8} onClick={() => set({ rows: el.rows.map((r) => [...r, ""]) })}>{tt("+ Column")}</button>
        <button type="button" disabled={cols <= 1} onClick={() => set({ rows: el.rows.map((r) => r.slice(0, -1)) })}>{tt("− Column")}</button>
      </div>
      <div className="ds-toggles">
        <Toggle on={el.header} onChange={(v) => set({ header: v })} label={tt("Header Row")} />
        <Toggle on={el.stripe} onChange={(v) => set({ stripe: v })} label={tt("Stripes")} />
      </div>
      <Field label={tt("Text Size")}><Num value={el.size} min={8} max={60} onChange={(v) => set({ size: v })} /></Field>
      <Field label={tt("Header Colour")} wide>
        <ColorField deck={deck} value={el.accent} onChange={(v) => set({ accent: v || "theme:accent" })} />
      </Field>
      <Field label={tt("Text Colour")} wide>
        <ColorField deck={deck} value={el.color} onChange={(v) => set({ color: v || "theme:ink" })} />
      </Field>
    </Section>
  );
}

function SlidePanel(p: Props) {
  const tt = useDT();
  const { deck, slide, onSlide } = p;
  return (
    <>
      <Section title={tt("Words on This Slide")}>
        {slide.els.filter((e) => e.type === "text").map((e, i) => <Field key={e.id} label={`${tt("Text")} ${i + 1}`} wide>
          <textarea rows={Math.min(4, Math.max(1, e.text.split("\n").length))} value={e.text} maxLength={2000}
            onChange={(event) => onSlide({ els: slide.els.map((el) => el.id === e.id ? { ...e, text: event.target.value } : el) })} />
        </Field>)}
      </Section>
      {slide.els.some(e => e.type === "image") && <Section title={tt("Photos")}>
        {slide.els.filter(e => e.type === "image").map((e, i) => <button type="button" className="ds-photo-row" key={e.id} onClick={() => { p.onSelect([e.id]); p.onPickImage("element"); }}>
          <span>{tt("Photo")} {i + 1}</span><strong>{tt(e.src ? "Replace Photo" : "Add Photo")}</strong>
        </button>)}
      </Section>}
      <BackgroundSection deck={deck} slide={slide} onSlide={onSlide} onPickImage={p.onPickImage} />
      <Section title={tt("Transition")}>
        <Seg
          label={tt("Transition")}
          value={slide.transition}
          onChange={(v) => onSlide({ transition: v })}
          options={[
            { v: "none", label: tt("None") },
            { v: "fade", label: tt("Fade") },
            { v: "slide", label: tt("Slide") },
            { v: "zoom", label: tt("Zoom") },
            { v: "lift", label: tt("Lift") },
          ]}
        />
      </Section>
      <Section title={tt("Speaker Notes")}>
        <textarea
          className="ds-notes"
          aria-label={tt("Speaker Notes")}
          rows={7}
          maxLength={5000}
          value={slide.notes}
          placeholder={tt("What you want to say on this slide. Only you see this in presenter view.")}
          onChange={(e) => onSlide({ notes: e.target.value })}
        />
      </Section>
      <Section title={tt("Visibility")} open={false}>
        <Toggle on={!!slide.hidden} onChange={(v) => onSlide({ hidden: v })} label={tt("Skip this slide when presenting")} />
      </Section>
    </>
  );
}

/** A slide's or a page's background: colour, blend, glow or your photo. */
export function BackgroundSection({
  deck,
  slide,
  onSlide,
  onPickImage,
}: {
  deck: Deck;
  slide: Slide;
  onSlide: Props["onSlide"];
  onPickImage: Props["onPickImage"];
}) {
  const tt = useDT();
  const bg = slide.bg;
  const setBg = (patch: Partial<Background>) => onSlide({ bg: { ...bg, ...patch } });
  return (
    <Section title={tt("Background")}>
      <div className="ds-tiles ds-tiles-text">
        {(["solid", "gradient", "mesh", "image"] as const).map((k) => (
          <button key={k} type="button" aria-pressed={bg.kind === k} onClick={() => (k === "image" && !bg.image ? onPickImage("background") : setBg({ kind: k }))}>
            {tt(k === "mesh" ? "Glow" : k[0].toUpperCase() + k.slice(1))}
          </button>
        ))}
      </div>
      <Field label={tt("Colour")} wide>
        <ColorField deck={deck} value={bg.color} onChange={(v) => setBg({ color: v || "theme:bg" })} />
      </Field>
      {(bg.kind === "gradient" || bg.kind === "mesh") && (
        <>
          <Field label={tt("Blend To")} wide>
            <ColorField deck={deck} value={bg.color2} onChange={(v) => setBg({ color2: v || "theme:surface" })} />
          </Field>
          <Field label={tt("Angle")} wide>
            <Slider value={bg.angle} min={0} max={360} onChange={(v) => setBg({ angle: v })} format={(v) => `${v}°`} />
          </Field>
        </>
      )}
      {bg.kind === "image" && (
        <>
          <button type="button" className="ds-wide-btn" onClick={() => onPickImage("background")}>{tt("Replace Background Photo")}</button>
          <Field label={tt("Darken")} wide>
            <Slider value={Math.round(bg.dim * 100)} min={0} max={85} onChange={(v) => setBg({ dim: v / 100 })} format={(v) => `${v}%`} />
          </Field>
        </>
      )}
      <button
        type="button"
        className="ds-link-btn"
        onClick={() => {
          const t = themeById(deck.theme);
          onSlide({ bg: { ...t.bg, image: "", dim: 0 } });
        }}
      >
        {tt("Reset to theme background")}
      </button>
    </Section>
  );
}

function DeckPanel({ deck, onDeck, slide }: { deck: Deck; onDeck: Props["onDeck"]; slide: Slide }) {
  const tt = useDT();
  return (
    <>
      <ThemeSection deck={deck} onDeck={onDeck} slide={slide} />
      <BrandSection deck={deck} onDeck={onDeck} />
      <FontsSection deck={deck} onDeck={onDeck} />
      <Section title={tt("Slide Size")}>
        <div className="ds-tiles ds-tiles-text">
          {(Object.keys(RATIOS) as Ratio[]).map((r) => (
            <button key={r} type="button" aria-pressed={deck.ratio === r} onClick={() => onDeck({ ratio: r })}>
              {tt(RATIOS[r].label)}
            </button>
          ))}
        </div>
        <p className="ds-note">{tt("Changing size rescales every element to fit.")}</p>
      </Section>
    </>
  );
}

const themeFonts = (t: Theme) => ({ heading: t.heading, body: t.body });

/** Theme picker. `fontsOf` keeps a page on its own fonts (the design studios use the site's self-hosted set). */
export function ThemeSection({
  deck,
  onDeck,
  slide,
  fontsOf = themeFonts,
  note = "A theme restyles every slide that uses theme colours. Slides keep any custom colour you picked.",
}: {
  deck: Deck;
  onDeck: Props["onDeck"];
  slide: Slide;
  fontsOf?: (t: Theme) => Deck["fonts"];
  note?: string;
}) {
  const tt = useDT();
  return (
    <Section title={tt("Theme")}>
      <div className="ds-themes">
        {THEMES.map((t) => {
          const preview: Deck = { ...deck, theme: t.id, colors: {}, fonts: fontsOf(t) };
          return (
            <button
              key={t.id}
              type="button"
              className="ds-theme"
              aria-pressed={deck.theme === t.id}
              onClick={() => onDeck({ theme: t.id, colors: {}, fonts: fontsOf(t) })}
            >
              <SlideThumb deck={preview} slide={{ ...slide, bg: { ...t.bg, image: "", dim: 0 } }} width={128} />
              <span>{tt(t.name)}</span>
            </button>
          );
        })}
      </div>
      <p className="ds-note">{tt(note)}</p>
    </Section>
  );
}

export function BrandSection({ deck, onDeck }: { deck: Deck; onDeck: Props["onDeck"] }) {
  const tt = useDT();
  const [custom, setCustom] = useState(false);
  const p = palette(deck);
  return (
    <Section title={tt("Brand Colours")} open={custom}>
      <div className="ds-brand">
        {TOKENS.map((t) => (
          <label key={t} className="ds-brand-row">
            <input
              type="color"
              value={p[t]}
              onChange={(e) => {
                setCustom(true);
                onDeck({ colors: { ...deck.colors, [t]: e.target.value } });
              }}
            />
            <span>{tt(t === "bg" ? "Background" : t === "accent2" ? "Accent 2" : t === "accent3" ? "Accent 3" : t[0].toUpperCase() + t.slice(1))}</span>
            <code>{p[t]}</code>
          </label>
        ))}
      </div>
      {Object.keys(deck.colors).length > 0 && (
        <button type="button" className="ds-link-btn" onClick={() => onDeck({ colors: {} })}>
          {tt("Use the theme colours again")}
        </button>
      )}
    </Section>
  );
}

export function FontsSection({
  deck,
  onDeck,
  fonts = FONTS,
  note = "PowerPoint uses the nearest installed font: Geist becomes Arial, Geist Mono becomes Consolas.",
}: {
  deck: Deck;
  onDeck: Props["onDeck"];
  fonts?: typeof FONTS;
  note?: string;
}) {
  const tt = useDT();
  return (
    <Section title={tt("Fonts")}>
      <Field label={tt("Headings")} wide>
        <select value={deck.fonts.heading} onChange={(e) => onDeck({ fonts: { ...deck.fonts, heading: e.target.value } })}>
          {fonts.map((f) => (
            <option key={f.id} value={f.id}>{f.label}</option>
          ))}
        </select>
      </Field>
      <Field label={tt("Body")} wide>
        <select value={deck.fonts.body} onChange={(e) => onDeck({ fonts: { ...deck.fonts, body: e.target.value } })}>
          {fonts.map((f) => (
            <option key={f.id} value={f.id}>{f.label}</option>
          ))}
        </select>
      </Field>
      <p className="ds-note">{tt(note)}</p>
    </Section>
  );
}
