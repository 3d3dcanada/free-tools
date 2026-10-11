import { useEffect, useRef, useState, type KeyboardEvent, type PointerEvent, type ReactNode, type RefObject } from "react";

type Press = { index: number; x: number; y: number; pointer: number; mouse: boolean; timer?: number; active: boolean };
type Drag = { from: number; at: number; x: number; y: number };

/**
 * pages you can pick up. A mouse drags after a few pixels; a finger
 * holds for a moment first so a swipe still scrolls; Alt and an arrow key
 * moves the focused page. `at` is the gap the page will drop into.
 */
export default function PageGrid<T>({
  items,
  keyOf,
  sheet,
  caption,
  label,
  on,
  dim,
  onPick,
  onMove,
  tools,
  row = false,
  stage,
  name,
}: {
  items: T[];
  keyOf: (item: T) => string | number;
  sheet: (item: T, index: number) => ReactNode;
  caption: (item: T, index: number) => ReactNode;
  label: (item: T, index: number) => string;
  on: (item: T) => boolean;
  dim?: (item: T) => boolean;
  onPick: (index: number) => void;
  onMove: (from: number, to: number) => void;
  tools?: (item: T, index: number) => ReactNode;
  row?: boolean;
  /** The positioned stage the drag ghost is drawn in. */
  stage: RefObject<HTMLElement | null>;
  name: string;
}) {
  const list = useRef<HTMLOListElement>(null);
  const cards = useRef<(HTMLLIElement | null)[]>([]);
  const press = useRef<Press | null>(null);
  const live = useRef<Drag | null>(null);
  const skipClick = useRef(false);
  const [drag, setDrag] = useState<Drag | null>(null);
  const show = (next: Drag | null) => {
    live.current = next;
    setDrag(next);
  };
  // While a finger drags a page, the stage must not scroll under it.
  useEffect(() => {
    const element = list.current;
    if (!element) return;
    const hold = (e: TouchEvent) => {
      if (press.current?.active) e.preventDefault();
    };
    element.addEventListener("touchmove", hold, { passive: false });
    return () => element.removeEventListener("touchmove", hold);
  }, []);
  const gap = (x: number, y: number) => {
    let best = -1,
      distance = Infinity,
      after = false;
    cards.current.forEach((element, i) => {
      if (!element) return;
      const r = element.getBoundingClientRect();
      const cx = r.left + r.width / 2,
        cy = r.top + r.height / 2;
      const d = Math.hypot(x - cx, (y - cy) * (row ? 0.2 : 1.6));
      if (d < distance) {
        distance = d;
        best = i;
        after = x > cx;
      }
    });
    return best < 0 ? 0 : best + (after ? 1 : 0);
  };
  const local = (x: number, y: number) => {
    const r = stage.current?.getBoundingClientRect();
    return { x: x - (r?.left ?? 0), y: y - (r?.top ?? 0) };
  };
  const nudgeScroll = (x: number, y: number) => {
    const box = list.current?.parentElement;
    if (!box) return;
    const r = box.getBoundingClientRect(),
      edge = 48,
      step = 16;
    if (row) box.scrollLeft += x < r.left + edge ? -step : x > r.right - edge ? step : 0;
    else box.scrollTop += y < r.top + edge ? -step : y > r.bottom - edge ? step : 0;
  };
  const lift = (element: HTMLElement) => {
    const p = press.current;
    if (!p) return;
    p.active = true;
    skipClick.current = true;
    try {
      element.setPointerCapture(p.pointer);
    } catch {
      // The pointer already left; the drag simply ends on the next event.
    }
    navigator.vibrate?.(8);
    show({ from: p.index, at: p.index, ...local(p.x, p.y) });
  };
  const finish = (commit: boolean) => {
    const p = press.current,
      d = live.current;
    press.current = null;
    if (p?.timer) clearTimeout(p.timer);
    if (p?.active && d && commit) {
      const to = d.at > d.from ? d.at - 1 : d.at;
      if (to !== d.from) onMove(d.from, to);
    }
    show(null);
  };
  const handlers = (i: number) => ({
    onPointerDown: (e: PointerEvent<HTMLButtonElement>) => {
      if (e.button) return;
      const element = e.currentTarget;
      skipClick.current = false;
      press.current = { index: i, x: e.clientX, y: e.clientY, pointer: e.pointerId, mouse: e.pointerType === "mouse", active: false };
      if (e.pointerType !== "mouse") press.current.timer = window.setTimeout(() => lift(element), 320);
    },
    onPointerMove: (e: PointerEvent<HTMLButtonElement>) => {
      const p = press.current;
      if (!p || p.pointer !== e.pointerId) return;
      if (!p.active) {
        const moved = Math.hypot(e.clientX - p.x, e.clientY - p.y);
        if (p.mouse && moved > 6) lift(e.currentTarget);
        else if (!p.mouse && moved > 10) {
          clearTimeout(p.timer);
          press.current = null;
        }
        if (!press.current?.active) return;
      }
      show({ from: p.index, at: gap(e.clientX, e.clientY), ...local(e.clientX, e.clientY) });
      nudgeScroll(e.clientX, e.clientY);
    },
    onPointerUp: () => finish(true),
    onPointerCancel: () => finish(false),
    onClick: () => {
      if (skipClick.current) {
        skipClick.current = false;
        return;
      }
      onPick(i);
    },
    onKeyDown: (e: KeyboardEvent) => {
      if (!e.altKey) return;
      const back = e.key === "ArrowLeft" || e.key === "ArrowUp",
        ahead = e.key === "ArrowRight" || e.key === "ArrowDown";
      if (!back && !ahead) return;
      e.preventDefault();
      const to = back ? i - 1 : i + 1;
      if (to >= 0 && to < items.length) onMove(i, to);
    },
  });
  return (
    <>
      <ol ref={list} className={`pdfw-grid${row ? " is-row" : ""}${drag ? " is-dragging" : ""}`} aria-label={name}>
        {items.map((item, i) => (
          <li
            key={keyOf(item)}
            ref={(element) => {
              cards.current[i] = element;
            }}
            className="pdfw-card"
            data-on={on(item) || undefined}
            data-dim={dim?.(item) || undefined}
            data-lifted={drag?.from === i || undefined}
            data-insert={
              drag && drag.at !== drag.from && drag.at !== drag.from + 1
                ? drag.at === i
                  ? "before"
                  : drag.at === items.length && i === items.length - 1
                    ? "after"
                    : undefined
                : undefined
            }
            onContextMenu={(e) => e.preventDefault()}
          >
            <button type="button" className="pdfw-pick" aria-pressed={on(item)} aria-label={label(item, i)} {...handlers(i)}>
              {sheet(item, i)}
            </button>
            <span className="pdfw-caption">{caption(item, i)}</span>
            {tools && <span className="pdfw-tools">{tools(item, i)}</span>}
          </li>
        ))}
      </ol>
      {drag && items[drag.from] !== undefined && (
        <div className="pdfw-ghost" style={{ left: drag.x, top: drag.y }} aria-hidden="true">
          {sheet(items[drag.from], drag.from)}
        </div>
      )}
    </>
  );
}
