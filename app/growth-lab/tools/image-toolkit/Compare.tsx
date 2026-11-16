import { useRef, useState, type KeyboardEvent } from "react";
import { useT } from "../../shared/locale";
import { useElementSize } from "../../shared/workspace";

/**
 * before and after on one frame with a draggable divider. Both layers
 * fill the frame the way the processing does (a fill-and-crop resize covers),
 * so the two sides line up pixel for pixel.
 */
export default function Compare({
  before,
  after,
  aspect,
  cover,
  labels,
  state,
}: {
  before: string;
  after: string;
  /** Output width ÷ height, once a result exists. */
  aspect: number;
  cover: boolean;
  labels: [string, string];
  /** What the right side is doing when it has nothing new to show. */
  state?: string;
}) {
  const tr = useT();
  const host = useRef<HTMLDivElement>(null);
  const frame = useRef<HTMLDivElement>(null);
  const size = useElementSize(host);
  const [split, setSplit] = useState(50);
  const [natural, setNatural] = useState(0);
  const ratio = aspect || natural || 4 / 3;
  const width = Math.max(0, Math.min(size.width, size.height * ratio));
  const height = width / ratio;
  // 2026-11-15: while the divider is dragged its position goes straight to a CSS variable on the frame, once a
  // frame, and React hears about it only when the drag ends. Every pointer move used to set state, so each move
  // re-rendered both full-size layers with a new clip; on a 1200 x 1600 result the moves queued faster than the
  // page could paint and the tab stopped answering.
  const live = useRef(50);
  const queued = useRef(0);
  const box = useRef<DOMRect | null>(null);
  const to = (clientX: number) => {
    const r = box.current ?? frame.current?.getBoundingClientRect();
    if (!r?.width) return;
    live.current = Math.min(100, Math.max(0, ((clientX - r.left) / r.width) * 100));
    if (queued.current) return;
    queued.current = requestAnimationFrame(() => {
      queued.current = 0;
      frame.current?.style.setProperty("--split", `${live.current}%`);
    });
  };
  const settle = () => {
    box.current = null;
    setSplit(live.current);
  };
  const key = (e: KeyboardEvent) => {
    const step = e.shiftKey ? 10 : 2;
    const next =
      e.key === "ArrowLeft" || e.key === "ArrowDown"
        ? split - step
        : e.key === "ArrowRight" || e.key === "ArrowUp"
          ? split + step
          : e.key === "Home"
            ? 0
            : e.key === "End"
              ? 100
              : null;
    if (next === null) return;
    e.preventDefault();
    live.current = Math.min(100, Math.max(0, next));
    setSplit(live.current);
  };
  return (
    <div className="iw-view" ref={host}>
      {width > 0 && (
        <div
          ref={frame}
          className="iw-compare"
          style={{ width, height, ["--split" as string]: `${split}%` }}
          onPointerDown={(e) => {
            if (e.button) return;
            e.currentTarget.setPointerCapture(e.pointerId);
            box.current = e.currentTarget.getBoundingClientRect();
            to(e.clientX);
          }}
          onPointerMove={(e) => {
            if (e.currentTarget.hasPointerCapture(e.pointerId)) to(e.clientX);
          }}
          onPointerUp={settle}
          onPointerCancel={settle}
        >
          <img
            className="iw-layer"
            src={before}
            alt={tr("Original image")}
            draggable={false}
            // 2026-11-14: once a result exists the original stops at the divider. It used to run under the whole
            // frame, so a transparent result (a removed background) showed the original through it and looked
            // unchanged; now the frame's checkerboard shows where the result is clear.
            style={{ objectFit: cover ? "cover" : "fill", clipPath: after ? "inset(0 calc(100% - var(--split)) 0 0)" : undefined }}
            onLoad={(e) => setNatural(e.currentTarget.naturalWidth / e.currentTarget.naturalHeight || 0)}
          />
          {after ? (
            <img
              className="iw-layer"
              src={after}
              alt={tr("Processed image")}
              draggable={false}
              style={{ clipPath: "inset(0 0 0 var(--split))" }}
            />
          ) : (
            <div className="iw-veil" style={{ left: "var(--split)" }} />
          )}
          <span className="iw-tag iw-tag-before">{labels[0]}</span>
          <span className="iw-tag iw-tag-after">{labels[1]}</span>
          {state && <span className="iw-state" role="status">{state}</span>}
          <div
            className="iw-handle"
            role="slider"
            tabIndex={0}
            aria-label={tr("Before and after divider")}
            aria-valuemin={0}
            aria-valuemax={100}
            aria-valuenow={Math.round(split)}
            aria-valuetext={`${Math.round(split)}%`}
            style={{ left: "var(--split)" }}
            onKeyDown={key}
          >
            <span aria-hidden="true" />
          </div>
        </div>
      )}
    </div>
  );
}
