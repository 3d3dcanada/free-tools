import { useRef, useState, type KeyboardEvent, type PointerEvent } from "react";
import { useT } from "../../shared/locale";
import { Icon, useElementSize } from "../../shared/workspace";
import { cropRatios, cropRect, type ImageSettings } from "./model";

type Box = { x: number; y: number; width: number; height: number };
type Drag = { handle: string; x: number; y: number; box: Box; pointer: number };
const corners = ["nw", "ne", "se", "sw"],
  edges = ["n", "e", "s", "w"];
const clamp = (n: number, lo: number, hi: number) => Math.min(hi, Math.max(lo, n));
const round = (n: number) => Math.round(n * 100) / 100;

/** Resize or move a crop box in source pixels; a fixed ratio holds from the opposite corner. */
function reshape(b: Box, handle: string, dx: number, dy: number, w: number, h: number, ratio: number) {
  if (handle === "move") return { ...b, x: clamp(b.x + dx, 0, w - b.width), y: clamp(b.y + dy, 0, h - b.height) };
  const min = Math.max(8, Math.min(w, h) * 0.02);
  let x0 = b.x,
    y0 = b.y,
    x1 = b.x + b.width,
    y1 = b.y + b.height;
  if (handle.includes("w")) x0 = clamp(x0 + dx, 0, x1 - min);
  if (handle.includes("e")) x1 = clamp(x1 + dx, x0 + min, w);
  if (handle.includes("n")) y0 = clamp(y0 + dy, 0, y1 - min);
  if (handle.includes("s")) y1 = clamp(y1 + dy, y0 + min, h);
  if (!ratio) return { x: x0, y: y0, width: x1 - x0, height: y1 - y0 };
  const ax = handle.includes("w") ? b.x + b.width : b.x,
    ay = handle.includes("n") ? b.y + b.height : b.y;
  let bw = x1 - x0,
    bh = y1 - y0;
  if (bw / bh > ratio) bh = bw / ratio;
  else bw = bh * ratio;
  const fit = Math.min(1, (handle.includes("w") ? ax : w - ax) / bw, (handle.includes("n") ? ay : h - ay) / bh);
  bw *= fit;
  bh *= fit;
  return { x: handle.includes("w") ? ax - bw : ax, y: handle.includes("n") ? ay - bh : ay, width: bw, height: bh };
}

/**
 * the crop is drawn on the image itself. Handles and the aspect bar
 * sit on the photo; rotation and flips turn the photo under the box exactly
 * the way the export does (crop first, then flip, then quarter turns).
 */
export default function CropEditor({
  src,
  s,
  onChange,
  result,
  resultLabel,
}: {
  src: string;
  s: ImageSettings;
  onChange: (next: Partial<ImageSettings>) => void;
  result?: string;
  resultLabel?: string;
}) {
  const tr = useT();
  const host = useRef<HTMLDivElement>(null);
  const size = useElementSize(host);
  const [natural, setNatural] = useState<[number, number] | null>(null);
  const [draft, setDraft] = useState<Box | null>(null);
  const drag = useRef<Drag | null>(null);
  const [w, h] = natural ?? [1, 1];
  const [ra, rb] = s.ratio.split(":").map(Number);
  const ratio = s.ratio === "free" ? 0 : ra / rb;
  const box = draft ?? cropRect(w, h, s);
  const turned = s.rotation % 180 !== 0;
  // On a phone the aspect bar wraps to two rows, so the photo starts lower.
  const top = size.width < 520 ? 104 : 64,
    side = 24;
  const k = Math.max(
    0.0001,
    Math.min((size.width - side * 2) / (turned ? h : w), (size.height - top - side) / (turned ? w : h)),
  );
  const cx = size.width / 2,
    cy = top + (size.height - top - side) / 2;
  const settingsFor = (b: Box): Partial<ImageSettings> => ({
    cropWidth: round(clamp((b.width / w) * 100, 1, 100)),
    cropHeight: round(clamp((b.height / h) * 100, 1, 100)),
    x: w - b.width > 0.5 ? round(clamp((b.x / (w - b.width)) * 100, 0, 100)) : 50,
    y: h - b.height > 0.5 ? round(clamp((b.y / (h - b.height)) * 100, 0, 100)) : 50,
  });
  const begin = (handle: string) => (e: PointerEvent<HTMLElement>) => {
    if (e.button) return;
    e.stopPropagation();
    e.preventDefault();
    e.currentTarget.setPointerCapture(e.pointerId);
    drag.current = { handle, x: e.clientX, y: e.clientY, box, pointer: e.pointerId };
  };
  const move = (e: PointerEvent<HTMLElement>) => {
    const d = drag.current;
    if (!d || d.pointer !== e.pointerId) return;
    // Screen movement back into the photo's own pixels: undo the turn, then the flips.
    const a = (s.rotation * Math.PI) / 180,
      sx = e.clientX - d.x,
      sy = e.clientY - d.y;
    let dx = sx * Math.cos(a) + sy * Math.sin(a),
      dy = -sx * Math.sin(a) + sy * Math.cos(a);
    if (s.flipX) dx = -dx;
    if (s.flipY) dy = -dy;
    setDraft(reshape(d.box, d.handle, dx / k, dy / k, w, h, ratio));
  };
  const end = (e: PointerEvent<HTMLElement>) => {
    if (drag.current?.pointer !== e.pointerId) return;
    drag.current = null;
    if (draft) onChange(settingsFor(draft));
    setDraft(null);
  };
  const nudge = (e: KeyboardEvent) => {
    const step = (e.shiftKey ? 0.05 : 0.01) * Math.max(w, h);
    const moves: Record<string, [number, number]> = {
      ArrowLeft: [-step, 0],
      ArrowRight: [step, 0],
      ArrowUp: [0, -step],
      ArrowDown: [0, step],
    };
    const delta = moves[e.key];
    if (!delta) return;
    e.preventDefault();
    onChange(settingsFor(reshape(box, "move", delta[0], delta[1], w, h, ratio)));
  };
  const pickRatio = (r: ImageSettings["ratio"]) =>
    onChange(
      r === "free"
        ? { ratio: r, ...settingsFor(box) }
        : { ratio: r, cropWidth: 100, cropHeight: 100, x: 50, y: 50 },
    );
  return (
    <div className="iw-view iw-crop" ref={host}>
      <img
        src={src}
        alt=""
        hidden
        onLoad={(e) => setNatural([e.currentTarget.naturalWidth, e.currentTarget.naturalHeight])}
      />
      <div className="iw-crop-bar ws-glass" role="toolbar" aria-label={tr("Crop tools")}>
        <div className="segmented iw-ratios" role="group" aria-label={tr("Crop Ratio")}>
          {cropRatios.map((r) => (
            <button key={r} type="button" aria-pressed={s.ratio === r} onClick={() => pickRatio(r)}>
              {r === "free" ? tr("Free") : r}
            </button>
          ))}
        </div>
        <span className="iw-crop-tools">
          <button type="button" title={tr("Rotate left")} aria-label={tr("Rotate left")} onClick={() => onChange({ rotation: (s.rotation + 270) % 360 })}>
            <Icon name="left" />
          </button>
          <button type="button" title={tr("Rotate right")} aria-label={tr("Rotate right")} onClick={() => onChange({ rotation: (s.rotation + 90) % 360 })}>
            <Icon name="right" />
          </button>
          <button type="button" title={tr("Flip horizontally")} aria-label={tr("Flip horizontally")} aria-pressed={s.flipX} onClick={() => onChange({ flipX: !s.flipX })}>
            <Icon name="flipX" />
          </button>
          <button type="button" title={tr("Flip vertically")} aria-label={tr("Flip vertically")} aria-pressed={s.flipY} onClick={() => onChange({ flipY: !s.flipY })}>
            <Icon name="flipY" />
          </button>
          <button type="button" title={tr("Whole image")} aria-label={tr("Whole image")} onClick={() => onChange({ cropWidth: 100, cropHeight: 100, x: 50, y: 50 })}>
            <Icon name="fit" />
          </button>
        </span>
      </div>
      {natural && size.width > 0 && (
        <div
          className="iw-crop-photo"
          style={{
            left: cx - (w * k) / 2,
            top: cy - (h * k) / 2,
            width: w * k,
            height: h * k,
            transform: `rotate(${s.rotation}deg) scale(${s.flipX ? -1 : 1}, ${s.flipY ? -1 : 1})`,
          }}
        >
          <img src={src} alt={tr("Image to crop")} draggable={false} />
          <div
            className="iw-crop-box"
            style={{ left: box.x * k, top: box.y * k, width: box.width * k, height: box.height * k }}
            tabIndex={0}
            role="group"
            aria-label={tr("Crop area. Drag to move, drag a handle to resize, or use the arrow keys.")}
            onPointerDown={begin("move")}
            onPointerMove={move}
            onPointerUp={end}
            onPointerCancel={end}
            onKeyDown={nudge}
          >
            <i className="iw-thirds" aria-hidden="true" />
            {(ratio ? corners : [...corners, ...edges]).map((handle) => (
              <span key={handle} className={`iw-h iw-h-${handle}`} aria-hidden="true" onPointerDown={begin(handle)} />
            ))}
          </div>
        </div>
      )}
      {result && (
        <figure className="iw-pip ws-glass">
          <img src={result} alt={tr("Cropped result")} />
          {resultLabel && <figcaption>{resultLabel}</figcaption>}
        </figure>
      )}
    </div>
  );
}
