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
  const to = (clientX: number) => {
    const r = frame.current?.getBoundingClientRect();
    if (r?.width) setSplit(Math.min(100, Math.max(0, ((clientX - r.left) / r.width) * 100)));
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
    setSplit(Math.min(100, Math.max(0, next)));
  };
  return (
    <div className="iw-view" ref={host}>
      {width > 0 && (
        <div
          ref={frame}
          className="iw-compare"
          style={{ width, height }}
          onPointerDown={(e) => {
            if (e.button) return;
            e.currentTarget.setPointerCapture(e.pointerId);
            to(e.clientX);
          }}
          onPointerMove={(e) => {
            if (e.currentTarget.hasPointerCapture(e.pointerId)) to(e.clientX);
          }}
        >
          <img
            className="iw-layer"
            src={before}
            alt={tr("Original image")}
            draggable={false}
            style={{ objectFit: cover ? "cover" : "fill" }}
            onLoad={(e) => setNatural(e.currentTarget.naturalWidth / e.currentTarget.naturalHeight || 0)}
          />
          {after ? (
            <img
              className="iw-layer"
              src={after}
              alt={tr("Processed image")}
              draggable={false}
              style={{ clipPath: `inset(0 0 0 ${split}%)` }}
            />
          ) : (
            <div className="iw-veil" style={{ left: `${split}%` }} />
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
            style={{ left: `${split}%` }}
            onKeyDown={key}
          >
            <span aria-hidden="true" />
          </div>
        </div>
      )}
    </div>
  );
}
