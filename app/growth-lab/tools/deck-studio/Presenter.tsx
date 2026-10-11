import { useEffect, useMemo, useRef, useState } from "react";
import { useDT } from "./i18n";
import { createPortal } from "react-dom";
import { RATIOS, type Deck } from "./model";
import { SlideThumb, SlideView } from "./render";

/**
 * Full-screen presenting. Arrows, Space and PageUp/PageDown move; S toggles
 * the speaker view (notes, next slide, timer); L is a laser pointer; B blanks
 * the screen; Esc leaves. Entrance animations and slide transitions play.
 */
export default function Presenter({ deck, start, onExit }: { deck: Deck; start: number; onExit: (i: number) => void }) {
  const tt = useDT();
  const order = useMemo(() => deck.slides.map((s, i) => ({ s, i })).filter((x) => !x.s.hidden || x.i === start), [deck, start]);
  const [pos, setPos] = useState(Math.max(0, order.findIndex((x) => x.i === start)));
  const [speaker, setSpeaker] = useState(false);
  const [laser, setLaser] = useState(false);
  const [blank, setBlank] = useState(false);
  const [dot, setDot] = useState<{ x: number; y: number } | null>(null);
  const [size, setSize] = useState({ w: 1280, h: 720 });
  const [t0] = useState(() => Date.now());
  const [now, setNow] = useState(Date.now());
  const [chrome, setChrome] = useState(true);
  const root = useRef<HTMLDivElement>(null);
  const hide = useRef<ReturnType<typeof setTimeout>>(undefined);
  const r = RATIOS[deck.ratio];
  const current = order[pos];
  const next = order[pos + 1];

  useEffect(() => {
    root.current?.requestFullscreen?.().catch(() => {});
  }, []);
  useEffect(() => {
    const exitFs = () => {
      if (!document.fullscreenElement) onExit(order[pos]?.i ?? 0);
    };
    document.addEventListener("fullscreenchange", exitFs);
    return () => document.removeEventListener("fullscreenchange", exitFs);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pos]);
  useEffect(() => {
    const fit = () => setSize({ w: window.innerWidth, h: window.innerHeight });
    fit();
    window.addEventListener("resize", fit);
    const tick = setInterval(() => setNow(Date.now()), 1000);
    return () => {
      window.removeEventListener("resize", fit);
      clearInterval(tick);
    };
  }, []);
  useEffect(() => {
    const leave = () => {
      if (document.fullscreenElement) void document.exitFullscreen().catch(() => {});
      onExit(order[pos]?.i ?? 0);
    };
    const key = (e: KeyboardEvent) => {
      if (["ArrowRight", "ArrowDown", "PageDown", " ", "Enter", "n"].includes(e.key)) {
        e.preventDefault();
        setBlank(false);
        setPos((p) => Math.min(order.length - 1, p + 1));
      } else if (["ArrowLeft", "ArrowUp", "PageUp", "Backspace", "p"].includes(e.key)) {
        e.preventDefault();
        setBlank(false);
        setPos((p) => Math.max(0, p - 1));
      } else if (e.key === "Home") setPos(0);
      else if (e.key === "End") setPos(order.length - 1);
      else if (e.key.toLowerCase() === "s") setSpeaker((v) => !v);
      else if (e.key.toLowerCase() === "l") setLaser((v) => !v);
      else if (e.key.toLowerCase() === "b" || e.key === ".") setBlank((v) => !v);
      else if (e.key === "Escape") leave();
    };
    window.addEventListener("keydown", key);
    return () => window.removeEventListener("keydown", key);
  }, [order, pos, onExit]);

  const area = speaker ? { w: size.w * 0.64, h: size.h * 0.8 } : { w: size.w, h: size.h };
  const scale = Math.min(area.w / r.w, area.h / r.h);
  const mins = Math.floor((now - t0) / 60000),
    secs = Math.floor(((now - t0) / 1000) % 60);
  if (!current) return null;
  return createPortal(
    <div
      ref={root}
      className={`growth-lab ds-present${speaker ? " is-speaker" : ""}${laser ? " is-laser" : ""}`}
      onPointerMove={(e) => {
        setChrome(true);
        clearTimeout(hide.current);
        hide.current = setTimeout(() => setChrome(false), 2200);
        if (laser) setDot({ x: e.clientX, y: e.clientY });
      }}
      onClick={(e) => {
        if ((e.target as HTMLElement).closest("button")) return;
        setPos((p) => Math.min(order.length - 1, p + 1));
      }}
      role="dialog"
      aria-label={tt("Presentation")}
    >
      <div className="ds-present-stage" style={{ width: area.w, height: area.h }}>
        <div
          key={current.s.id}
          className={`ds-present-slide ds-tr-${current.s.transition}`}
          style={{ width: r.w * scale, height: r.h * scale }}
        >
          <div style={{ transform: `scale(${scale})`, transformOrigin: "0 0", width: r.w, height: r.h }}>
            <SlideView deck={deck} slide={current.s} play />
          </div>
        </div>
      </div>
      {speaker && (
        <aside className="ds-speaker">
          <div className="ds-speaker-time">
            <strong>
              {String(mins).padStart(2, "0")}:{String(secs).padStart(2, "0")}
            </strong>
            <span>
              {tt("Slide")} {pos + 1} {tt("of")} {order.length}
            </span>
          </div>
          <p className="ds-speaker-label">{tt("Next")}</p>
          {next ? <SlideThumb deck={deck} slide={next.s} width={Math.min(360, size.w * 0.3)} /> : <p className="ds-speaker-end">{tt("End of deck")}</p>}
          <p className="ds-speaker-label">{tt("Notes")}</p>
          <div className="ds-speaker-notes">{current.s.notes || "No notes on this slide."}</div>
        </aside>
      )}
      {blank && <div className="ds-blank" />}
      {laser && dot && <span className="ds-laser" style={{ left: dot.x, top: dot.y }} />}
      <div className={`ds-present-bar${chrome ? "" : " is-hidden"}`}>
        <button type="button" onClick={() => setPos((p) => Math.max(0, p - 1))} aria-label={tt("Previous")}>‹</button>
        <span>
          {pos + 1} / {order.length}
        </span>
        <button type="button" onClick={() => setPos((p) => Math.min(order.length - 1, p + 1))} aria-label={tt("Next")}>›</button>
        <button type="button" aria-pressed={speaker} onClick={() => setSpeaker((v) => !v)} title={tt("Speaker view (S)")}>{tt("Notes")}</button>
        <button type="button" aria-pressed={laser} onClick={() => setLaser((v) => !v)} title={tt("Laser (L)")}>{tt("Laser")}</button>
        <button type="button" onClick={() => setBlank((v) => !v)} title={tt("Blank screen (B)")}>{tt("Blank")}</button>
        <button
          type="button"
          onClick={() => {
            if (document.fullscreenElement) void document.exitFullscreen().catch(() => {});
            onExit(current.i);
          }}
          aria-label={tt("Exit presentation")}
        >
          ×
        </button>
      </div>
    </div>,
    document.body,
  );
}
