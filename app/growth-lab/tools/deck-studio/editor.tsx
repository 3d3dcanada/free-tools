import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
  type DragEvent as RDragEvent,
  type PointerEvent as RPointerEvent,
  type ReactNode,
} from "react";
import { useDT } from "./i18n";
import { useLocale } from "../../shared/locale";
import { download, readDraft } from "../../shared/browser";
import { Modal } from "./controls";
import { CURATED, iconPaths, loadAllIcons, nodeToPaths } from "./icons";
import {
  deckSignature,
  chart,
  cloneEl,
  dims,
  fontStack,
  image,
  paint,
  qr,
  shape,
  table,
  text,
  themeById,
  type Deck,
  type El,
  type Slide,
} from "./model";
import { ElementView, elBoxStyle, backgroundCss, isStrokePattern, shapePath, PATTERNS } from "./render";

/*
 * The canvas engine shared by Deck Studio and the design studios (flyer,
 * poster, social image, business card), moved out of DeckStudio.tsx on
 * 2026-10-09 without changing what it does: one document of absolutely
 * placed elements, undo per gesture, drag, resize, rotate, snap guides,
 * marquee, inline text, photos from a file, the clipboard or a drop.
 */

const SNAP = 7;

type Drag =
  | { kind: "move"; sx: number; sy: number; start: Map<string, { x: number; y: number }>; moved: boolean }
  | { kind: "resize"; sx: number; sy: number; handle: string; start: El; keep: boolean }
  | { kind: "rotate"; cx: number; cy: number; start: El }
  | { kind: "marquee"; sx: number; sy: number; x: number; y: number; add: boolean; base: string[] };

type Guide = { v?: number; h?: number };

export type EditorOptions<D extends Deck> = {
  /** localStorage key for the draft. */
  store: string;
  start: (locale: "en" | "fr") => D;
  valid: (v: unknown) => v is D;
  /** Status when the draft is too large for device storage. */
  tooLarge: string;
  /** An element was picked or added: show its styles. */
  onFocusElement: () => void;
  /** Keys are ignored while this is true (the presenter is up). */
  paused?: boolean;
  /** F5 or Ctrl Enter starts presenting from slide 0, or from the current slide with Shift. */
  onPresent?: (from: number) => void;
  /** Size inserted elements to the page instead of the 1280 x 720 slide (design studios). */
  fitInserts?: boolean;
  /** Runs on every change before it is kept (business cards fill bound text from the card details). */
  normalize?: (next: D, prev: D) => D;
  /** Pixels kept clear under the page for the stage footer. */
  footRoom?: number;
};

/** Slides on the old theme's own background follow a new theme. */
export function retheme<D extends Deck>(d: D, theme: string, patch: Partial<D> = {}): D {
  const oldBg = themeById(d.theme).bg,
    nb = themeById(theme).bg;
  return {
    ...d,
    ...patch,
    theme,
    slides: d.slides.map((s) =>
      s.bg.kind !== "image" && s.bg.kind === oldBg.kind && s.bg.color === oldBg.color && s.bg.color2 === oldBg.color2
        ? { ...s, bg: { ...s.bg, ...nb } }
        : s,
    ),
  };
}

export function useDeckEditor<D extends Deck>(o: EditorOptions<D>) {
  const tt = useDT();
  const locale = useLocale();
  const [mounted, setMounted] = useState(false);
  const [deck, setDeckRaw] = useState<D | null>(null);
  const [cur, setCur] = useState(0);
  const [sel, setSel] = useState<string[]>([]);
  const [editing, setEditing] = useState<string | null>(null);
  const [modal, setModal] = useState<string | null>(null);
  const [scale, setScale] = useState(0.5);
  const [zoom, setZoom] = useState<"fit" | number>("fit");
  const [guides, setGuides] = useState<Guide>({});
  const [marquee, setMarquee] = useState<{ x: number; y: number; w: number; h: number } | null>(null);
  const [status, setStatus] = useState("");
  const [blocked, setBlocked] = useState(false);
  const [snapping, setSnapping] = useState(true);
  const flush = useRef<() => void>(() => {});
  const past = useRef<D[]>([]);
  const future = useRef<D[]>([]);
  const lastKey = useRef<{ key: string; at: number }>({ key: "", at: 0 });
  const stage = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLDivElement>(null);
  const drag = useRef<Drag | null>(null);
  const clip = useRef<El[]>([]);
  const filePick = useRef<HTMLInputElement>(null);
  const pickTarget = useRef<"element" | "background" | "new">("new");
  const normalize = useRef(o.normalize);
  normalize.current = o.normalize;

  /* -------------------------------------------------------------- load / save */
  useEffect(() => {
    setMounted(true);
    let d: D | null = null;
    try {
      d = readDraft(localStorage, o.store, o.valid) ?? null;
    } catch {
      setBlocked(true);
      setStatus(tt("Your previous draft could not be loaded. It has been preserved."));
    }
    // an untouched starter deck is sample text in the language of whichever visit
    // saved it. It is not the visitor's work, so it never overrides the page language.
    if (d && [o.start("en"), o.start("fr")].some((s) => deckSignature(s) === deckSignature(d!))) d = null;
    setDeckRaw(d ?? o.start(locale));
  }, []);
  useEffect(() => {
    if (!deck || blocked) { flush.current = () => {}; return; }
    if (!o.valid(deck)) {
      flush.current = () => {};
      setStatus(tt("Draft has incomplete values. The last valid draft remains saved."));
      return;
    }
    setStatus(tt("Saving…"));
    let pending = true;
    const save = () => {
      if (!pending) return;
      try {
        if (deckSignature(deck) === deckSignature(o.start(locale))) localStorage.removeItem(o.store);
        else localStorage.setItem(o.store, JSON.stringify(deck));
        pending = false;
        setStatus(tt("Saved on this device"));
      } catch {
        setStatus(o.tooLarge);
      }
    };
    const t = setTimeout(save, 500);
    flush.current = save;
    // Switching tools before the debounce ends must keep the final keystroke.
    window.addEventListener("pagehide", save);
    return () => { clearTimeout(t); window.removeEventListener("pagehide", save); };
  }, [deck, blocked]);
  useEffect(() => () => flush.current(), []);

  /** Every change goes through here: one undo step per gesture (or per typing burst). */
  const commit = useCallback((next: D | ((d: D) => D), key = "") => {
    setDeckRaw((prev) => {
      if (!prev) return prev;
      let value = typeof next === "function" ? next(prev) : next;
      if (value === prev) return prev;
      if (normalize.current) value = normalize.current(value, prev);
      const now = Date.now();
      if (!(key && lastKey.current.key === key && now - lastKey.current.at < 900)) {
        past.current = [...past.current.slice(-99), prev];
        future.current = [];
      }
      lastKey.current = { key, at: now };
      return value;
    });
  }, []);
  const undo = useCallback(() => {
    setDeckRaw((d) => {
      const prev = past.current.pop();
      if (!d || !prev) return d;
      future.current.push(d);
      lastKey.current = { key: "", at: 0 };
      return prev;
    });
  }, []);
  const redo = useCallback(() => {
    setDeckRaw((d) => {
      const next = future.current.pop();
      if (!d || !next) return d;
      past.current.push(d);
      lastKey.current = { key: "", at: 0 };
      return next;
    });
  }, []);

  const slide = deck?.slides[Math.min(cur, (deck?.slides.length ?? 1) - 1)];
  const ratio = dims(deck ?? { ratio: "16:9" });
  const selected = useMemo(() => (slide ? slide.els.filter((e) => sel.includes(e.id)) : []), [slide, sel]);
  // Inserts are drawn for a 1280 x 720 slide; a page scales them to fit.
  const k = o.fitInserts ? Math.min(ratio.w / 1280, ratio.h / 720) : 1;

  /* -------------------------------------------------------------- fit */
  useLayoutEffect(() => {
    const el = stage.current;
    if (!el) return;
    const fit = () => {
      const r = el.getBoundingClientRect();
      const s = Math.min((r.width - 48) / ratio.w, (r.height - 48 - (o.footRoom ?? 0)) / ratio.h);
      setScale(zoom === "fit" ? Math.max(0.1, s) : zoom);
    };
    fit();
    const ro = new ResizeObserver(fit);
    ro.observe(el);
    return () => ro.disconnect();
  }, [ratio.w, ratio.h, zoom, mounted, deck === null]);

  /* -------------------------------------------------------------- mutations */
  const setSlide = useCallback(
    (fn: (s: Slide) => Slide, key = "") =>
      commit((d) => ({ ...d, slides: d.slides.map((s, i) => (i === Math.min(cur, d.slides.length - 1) ? fn(s) : s)) }), key),
    [commit, cur],
  );
  const patchEls = useCallback(
    (ids: string[], patch: Partial<El> | ((e: El) => Partial<El>), key = "") =>
      setSlide((s) => ({ ...s, els: s.els.map((e) => (ids.includes(e.id) ? ({ ...e, ...(typeof patch === "function" ? patch(e) : patch) } as El) : e)) }), key),
    [setSlide],
  );
  const addEl = useCallback(
    (el: El) => {
      setSlide((s) => ({ ...s, els: [...s.els, el] }));
      setSel([el.id]);
      o.onFocusElement();
    },
    [setSlide],
  );
  const removeSel = useCallback(() => {
    if (!sel.length) return;
    setSlide((s) => ({ ...s, els: s.els.filter((e) => !sel.includes(e.id) || e.locked) }));
    setSel([]);
  }, [sel, setSlide]);
  const duplicateSel = useCallback(() => {
    if (!slide || !sel.length) return;
    const copies = slide.els.filter((e) => sel.includes(e.id)).map((e) => cloneEl(e, 24 * k, 24 * k));
    setSlide((s) => ({ ...s, els: [...s.els, ...copies] }));
    setSel(copies.map((c) => c.id));
  }, [slide, sel, setSlide, k]);
  const layer = useCallback(
    (how: "front" | "forward" | "backward" | "back") =>
      setSlide((s) => {
        const els = [...s.els];
        const picked = els.filter((e) => sel.includes(e.id));
        const rest = els.filter((e) => !sel.includes(e.id));
        if (how === "front") return { ...s, els: [...rest, ...picked] };
        if (how === "back") return { ...s, els: [...picked, ...rest] };
        const out = [...els];
        const order = how === "forward" ? [...out.keys()].reverse() : [...out.keys()];
        for (const i of order) {
          if (!sel.includes(out[i].id)) continue;
          const j = how === "forward" ? i + 1 : i - 1;
          if (j < 0 || j >= out.length || sel.includes(out[j].id)) continue;
          [out[i], out[j]] = [out[j], out[i]];
        }
        return { ...s, els: out };
      }),
    [sel, setSlide],
  );
  const align = useCallback(
    (how: string) => {
      if (!selected.length) return;
      const many = selected.length > 1;
      const box = many
        ? {
            x: Math.min(...selected.map((e) => e.x)),
            y: Math.min(...selected.map((e) => e.y)),
            r: Math.max(...selected.map((e) => e.x + e.w)),
            b: Math.max(...selected.map((e) => e.y + e.h)),
          }
        : { x: 0, y: 0, r: ratio.w, b: ratio.h };
      if (how === "hdist" || how === "vdist") {
        const h = how === "hdist";
        const sorted = [...selected].sort((a, b) => (h ? a.x - b.x : a.y - b.y));
        const total = sorted.reduce((t, e) => t + (h ? e.w : e.h), 0);
        const gap = ((h ? box.r - box.x : box.b - box.y) - total) / Math.max(1, sorted.length - 1);
        let pos = h ? box.x : box.y;
        const at = new Map<string, number>();
        for (const e of sorted) {
          at.set(e.id, pos);
          pos += (h ? e.w : e.h) + gap;
        }
        patchEls(sel, (e) => (h ? { x: at.get(e.id)! } : { y: at.get(e.id)! }));
        return;
      }
      patchEls(sel, (e) => {
        switch (how) {
          case "left": return { x: box.x };
          case "right": return { x: box.r - e.w };
          case "hcenter": return { x: (box.x + box.r) / 2 - e.w / 2 };
          case "top": return { y: box.y };
          case "bottom": return { y: box.b - e.h };
          default: return { y: (box.y + box.b) / 2 - e.h / 2 };
        }
      });
    },
    [selected, sel, patchEls, ratio.w, ratio.h],
  );

  /* -------------------------------------------------------------- inserting */
  const center = (w: number, h: number) => ({ x: ratio.w / 2 - w / 2, y: ratio.h / 2 - h / 2 });
  const insert = {
    heading: () => {
      const c = center(760 * k, 110 * k);
      addEl(text(c.x, c.y, 760 * k, 110 * k, tt("Add a heading"), { font: "heading", size: 64 * k, weight: 850, tracking: -0.03, lineHeight: 1.05 }));
    },
    text: () => {
      const c = center(600 * k, 120 * k);
      addEl(text(c.x, c.y, 600 * k, 120 * k, tt("Add your text here. Double-click to edit."), { size: 26 * k, color: "theme:muted" }));
    },
    bullets: () => {
      const c = center(560 * k, 200 * k);
      addEl(text(c.x, c.y, 560 * k, 200 * k, [tt("First point"), tt("Second point"), tt("Third point")].join("\n"), { size: 28 * k, list: "bullet" }));
    },
    stat: () => {
      const c = center(360 * k, 200 * k);
      const a = text(c.x, c.y, 360 * k, 130 * k, "87%", { font: "heading", size: 110 * k, weight: 900, tracking: -0.05, lineHeight: 1, color: "theme:accent" });
      const b = text(c.x, c.y + 132 * k, 360 * k, 60 * k, tt("of customers came back"), { size: 24 * k, color: "theme:muted" });
      setSlide((s) => ({ ...s, els: [...s.els, a, b] }));
      setSel([a.id, b.id]);
      o.onFocusElement();
    },
    shape: (kind: Parameters<typeof shape>[4]) => {
      const sz = kind === "line" ? [400, 8] : kind === "arrow" || kind === "chevron" || kind === "pill" ? [320, 140] : [240, 240];
      const c = center(sz[0] * k, sz[1] * k);
      addEl(shape(c.x, c.y, sz[0] * k, sz[1] * k, kind, kind === "line" ? { fill: "theme:accent", strokeW: 6 * k } : {}));
      setModal(null);
    },
    photo: () => {
      pickTarget.current = "new";
      filePick.current?.click();
    },
    icon: () => setModal("icons"),
    chart: () => {
      const c = center(640 * k, 400 * k);
      addEl(chart(c.x, c.y, 640 * k, 400 * k));
    },
    table: () => {
      const c = center(760 * k, 280 * k);
      addEl(table(c.x, c.y, 760 * k, 280 * k, [["", tt("Plan A"), tt("Plan B")], [tt("Price"), "$20", "$40"], [tt("Users"), "1", "10"], [tt("Support"), tt("Email"), tt("Priority")]], { size: 18 * k }));
    },
    qr: () => {
      const c = center(220 * k, 220 * k);
      addEl(qr(c.x, c.y, 220 * k, "https://3d3d.ca"));
    },
  };

  async function readImage(file: File): Promise<string> {
    if (!/^image\/(png|jpeg|webp|gif)$/.test(file.type)) throw new Error(tt("Choose a PNG, JPEG, WebP or GIF image."));
    if (file.size > 25_000_000) throw new Error(tt("Choose an image under 25 MB."));
    const bmp = await createImageBitmap(file);
    const max = 2000,
      kk = Math.min(1, max / Math.max(bmp.width, bmp.height));
    const c = document.createElement("canvas");
    c.width = Math.round(bmp.width * kk);
    c.height = Math.round(bmp.height * kk);
    c.getContext("2d")!.drawImage(bmp, 0, 0, c.width, c.height);
    const png = file.type === "image/png" || file.type === "image/gif";
    return c.toDataURL(png ? "image/png" : "image/jpeg", 0.86);
  }
  /** A picked, pasted or dropped photo. `into` fills that photo frame. */
  async function onFile(file: File | undefined, into?: string) {
    if (!file || !slide) return;
    try {
      const src = await readImage(file);
      const t = pickTarget.current;
      const frame = into ? slide.els.find((e) => e.id === into && e.type === "image") : undefined;
      if (frame) {
        patchEls([frame.id], { src } as Partial<El>);
        setSel([frame.id]);
        o.onFocusElement();
      } else if (t === "background") setSlide((s) => ({ ...s, bg: { ...s.bg, kind: "image", image: src, dim: s.bg.dim || 0.35 } }));
      else if (t === "element" && selected[0]?.type === "image") patchEls([selected[0].id], { src } as Partial<El>);
      else {
        const bmp = await createImageBitmap(file);
        const w = Math.min(ratio.w * 0.6, 640 * k),
          h = (w * bmp.height) / bmp.width;
        const c = center(w, h);
        addEl(image(c.x, c.y, w, Math.min(h, ratio.h * 0.8), src));
      }
    } catch (e) {
      setStatus((e as Error).message);
    }
  }

  /* -------------------------------------------------------------- pointer */
  const toSlide = (cx: number, cy: number) => {
    const r = canvasRef.current!.getBoundingClientRect();
    return { x: (cx - r.left) / scale, y: (cy - r.top) / scale };
  };
  function snapMove(moving: El[], dx: number, dy: number) {
    if (!slide) return { dx, dy, g: {} as Guide };
    const box = {
      x: Math.min(...moving.map((e) => e.x)) + dx,
      y: Math.min(...moving.map((e) => e.y)) + dy,
      r: Math.max(...moving.map((e) => e.x + e.w)) + dx,
      b: Math.max(...moving.map((e) => e.y + e.h)) + dy,
    };
    const others = slide.els.filter((e) => !sel.includes(e.id));
    const vx = [0, ratio.w / 2, ratio.w, ...others.flatMap((e) => [e.x, e.x + e.w / 2, e.x + e.w])];
    const hy = [0, ratio.h / 2, ratio.h, ...others.flatMap((e) => [e.y, e.y + e.h / 2, e.y + e.h])];
    const tol = SNAP / scale;
    const g: Guide = {};
    let bx = Infinity,
      by = Infinity;
    for (const edge of [box.x, (box.x + box.r) / 2, box.r])
      for (const v of vx) if (Math.abs(v - edge) < tol && Math.abs(v - edge) < Math.abs(bx)) { bx = v - edge; g.v = v; }
    for (const edge of [box.y, (box.y + box.b) / 2, box.b])
      for (const v of hy) if (Math.abs(v - edge) < tol && Math.abs(v - edge) < Math.abs(by)) { by = v - edge; g.h = v; }
    return { dx: dx + (Number.isFinite(bx) ? bx : 0), dy: dy + (Number.isFinite(by) ? by : 0), g };
  }

  function onElDown(e: RPointerEvent, el: El) {
    if (editing === el.id) return;
    e.stopPropagation();
    if (e.button === 2) return;
    let ids = sel;
    if (e.shiftKey || e.metaKey || e.ctrlKey) ids = sel.includes(el.id) ? sel.filter((i) => i !== el.id) : [...sel, el.id];
    else if (!sel.includes(el.id)) ids = [el.id];
    setSel(ids);
    o.onFocusElement();
    if (editing) setEditing(null);
    const movable = slide!.els.filter((x) => ids.includes(x.id) && !x.locked);
    if (!movable.length) return;
    (e.target as Element).setPointerCapture?.(e.pointerId);
    drag.current = { kind: "move", sx: e.clientX, sy: e.clientY, start: new Map(movable.map((x) => [x.id, { x: x.x, y: x.y }])), moved: false };
  }
  function onHandleDown(e: RPointerEvent, handle: string) {
    e.stopPropagation();
    const el = selected[0];
    if (!el || el.locked) return;
    (e.target as Element).setPointerCapture?.(e.pointerId);
    if (handle === "rot") {
      const r = canvasRef.current!.getBoundingClientRect();
      drag.current = { kind: "rotate", cx: r.left + (el.x + el.w / 2) * scale, cy: r.top + (el.y + el.h / 2) * scale, start: el };
    } else drag.current = { kind: "resize", sx: e.clientX, sy: e.clientY, handle, start: el, keep: el.type === "image" || el.type === "icon" || el.type === "qr" };
  }
  function onCanvasDown(e: RPointerEvent) {
    if (e.button !== 0) return;
    setEditing(null);
    const p = toSlide(e.clientX, e.clientY);
    (e.target as Element).setPointerCapture?.(e.pointerId);
    drag.current = { kind: "marquee", sx: p.x, sy: p.y, x: p.x, y: p.y, add: e.shiftKey, base: e.shiftKey ? sel : [] };
    if (!e.shiftKey) setSel([]);
  }
  function onMove(e: RPointerEvent) {
    const d = drag.current;
    if (!d || !slide) return;
    if (d.kind === "move") {
      const rdx = (e.clientX - d.sx) / scale,
        rdy = (e.clientY - d.sy) / scale;
      if (!d.moved && Math.hypot(rdx, rdy) < 2) return;
      const moving = slide.els.filter((x) => d.start.has(x.id)).map((x) => ({ ...x, ...d.start.get(x.id)! }));
      const { dx, dy, g } = e.altKey || !snapping ? { dx: rdx, dy: rdy, g: {} } : snapMove(moving, rdx, rdy);
      setGuides(g);
      // One undo step per drag: every move of the gesture shares the key (onUp clears it).
      patchEls([...d.start.keys()], (x) => ({ x: d.start.get(x.id)!.x + dx, y: d.start.get(x.id)!.y + dy }), "drag");
      d.moved = true;
    } else if (d.kind === "resize") {
      const s = d.start;
      const dx = (e.clientX - d.sx) / scale,
        dy = (e.clientY - d.sy) / scale;
      let { x, y, w, h } = s;
      if (d.handle.includes("e")) w = s.w + dx;
      if (d.handle.includes("s")) h = s.h + dy;
      if (d.handle.includes("w")) { w = s.w - dx; x = s.x + dx; }
      if (d.handle.includes("n")) { h = s.h - dy; y = s.y + dy; }
      if ((d.keep || e.shiftKey) && d.handle.length === 2) {
        const kk = Math.max(w / s.w, h / s.h);
        w = s.w * kk;
        h = s.h * kk;
        if (d.handle.includes("w")) x = s.x + s.w - w;
        if (d.handle.includes("n")) y = s.y + s.h - h;
      }
      w = Math.max(8 * k, w);
      h = Math.max(4 * k, h);
      patchEls([s.id], { x, y, w, h }, "resize");
    } else if (d.kind === "rotate") {
      let a = (Math.atan2(e.clientY - d.cy, e.clientX - d.cx) * 180) / Math.PI + 90;
      if (a > 180) a -= 360;
      if (e.shiftKey || Math.abs(a % 45) < 3) a = Math.round(a / 15) * 15;
      patchEls([d.start.id], { rot: Math.round(a) }, "rotate");
    } else {
      const p = toSlide(e.clientX, e.clientY);
      d.x = p.x;
      d.y = p.y;
      const box = { x: Math.min(d.sx, p.x), y: Math.min(d.sy, p.y), w: Math.abs(p.x - d.sx), h: Math.abs(p.y - d.sy) };
      setMarquee(box);
      const hit = slide.els.filter((el) => el.x < box.x + box.w && el.x + el.w > box.x && el.y < box.y + box.h && el.y + el.h > box.y).map((el) => el.id);
      setSel([...new Set([...d.base, ...hit])]);
    }
  }
  function onUp() {
    drag.current = null;
    setGuides({});
    setMarquee(null);
    lastKey.current = { key: "", at: 0 };
  }
  /** A photo dropped on the canvas fills the frame under it, or arrives as a new photo. */
  function onDrop(e: RDragEvent) {
    const file = [...e.dataTransfer.files].find((f) => f.type.startsWith("image/"));
    if (!file || !slide) return;
    e.preventDefault();
    const p = toSlide(e.clientX, e.clientY);
    const frame = [...slide.els].reverse().find((el) => el.type === "image" && !el.locked && p.x >= el.x && p.x <= el.x + el.w && p.y >= el.y && p.y <= el.y + el.h);
    pickTarget.current = "new";
    void onFile(file, frame?.id);
  }

  /* -------------------------------------------------------------- keyboard */
  useEffect(() => {
    const key = (e: KeyboardEvent) => {
      if (o.paused || !deck) return;
      const t = e.target as HTMLElement;
      if (t.closest("dialog")) return;
      const typing = t.matches("input, textarea, select, [contenteditable]");
      const mod = e.ctrlKey || e.metaKey;
      if (o.onPresent && (e.key === "F5" || (mod && e.key === "Enter"))) {
        e.preventDefault();
        o.onPresent(e.shiftKey ? cur : 0);
        return;
      }
      if (typing) return;
      if (modal) {
        if (e.key === "Escape") setModal(null);
        return;
      }
      if (mod && e.key.toLowerCase() === "z") { e.preventDefault(); if (e.shiftKey) redo(); else undo(); }
      else if (mod && e.key.toLowerCase() === "y") { e.preventDefault(); redo(); }
      else if (mod && e.key.toLowerCase() === "d") { e.preventDefault(); duplicateSel(); }
      else if (mod && e.key.toLowerCase() === "a") { e.preventDefault(); setSel(slide?.els.map((x) => x.id) ?? []); }
      else if (mod && e.key.toLowerCase() === "c") { clip.current = selected.map((x) => structuredClone(x)); }
      else if (mod && e.key.toLowerCase() === "x") { clip.current = selected.map((x) => structuredClone(x)); removeSel(); }
      else if (mod && e.key.toLowerCase() === "v" && clip.current.length) {
        e.preventDefault();
        const copies = clip.current.map((x) => cloneEl(x, 24 * k, 24 * k));
        setSlide((s) => ({ ...s, els: [...s.els, ...copies] }));
        setSel(copies.map((c) => c.id));
      } else if (e.key === "Delete" || e.key === "Backspace") { if (sel.length) { e.preventDefault(); removeSel(); } }
      else if (e.key === "Escape") { setSel([]); setEditing(null); }
      else if (e.key === "Enter" && selected.length === 1 && selected[0].type === "text") { e.preventDefault(); setEditing(selected[0].id); }
      else if (e.key.startsWith("Arrow") && sel.length) {
        e.preventDefault();
        const n = e.shiftKey ? 10 : 1;
        const dx = e.key === "ArrowLeft" ? -n : e.key === "ArrowRight" ? n : 0,
          dy = e.key === "ArrowUp" ? -n : e.key === "ArrowDown" ? n : 0;
        patchEls(sel, (x) => (x.locked ? {} : { x: x.x + dx, y: x.y + dy }), "nudge");
      } else if (!sel.length && (e.key === "PageDown" || e.key === "ArrowDown")) setCur((c) => Math.min(c + 1, deck.slides.length - 1));
      else if (!sel.length && (e.key === "PageUp" || e.key === "ArrowUp")) setCur((c) => Math.max(c - 1, 0));
      else if (e.key === "]") layer(e.shiftKey ? "front" : "forward");
      else if (e.key === "[") layer(e.shiftKey ? "back" : "backward");
    };
    window.addEventListener("keydown", key);
    return () => window.removeEventListener("keydown", key);
  }, [deck, slide, sel, selected, modal, o.paused, o.onPresent, cur, undo, redo, duplicateSel, removeSel, patchEls, setSlide, layer, k]);

  /* -------------------------------------------------------------- paste images from clipboard */
  useEffect(() => {
    const paste = (e: ClipboardEvent) => {
      const t = e.target as HTMLElement;
      if (o.paused || t.closest?.("dialog, input, textarea, [contenteditable]")) return;
      const file = [...(e.clipboardData?.files ?? [])].find((f) => f.type.startsWith("image/"));
      if (file) {
        e.preventDefault();
        pickTarget.current = "new";
        void onFile(file);
      }
    };
    window.addEventListener("paste", paste);
    return () => window.removeEventListener("paste", paste);
  });

  /** Open the file picker for a new photo, the selected frame or the background. */
  const pickImage = (target: "element" | "background" | "new") => {
    pickTarget.current = target;
    filePick.current?.click();
  };

  return {
    mounted,
    deck,
    commit,
    undo,
    redo,
    canUndo: past.current.length > 0,
    canRedo: future.current.length > 0,
    status,
    setStatus,
    blocked,
    recover: () => download(`${o.store.replace(/[^\w-]/g, "-")}-recovery.txt`, localStorage.getItem(o.store) ?? "", "text/plain"),
    resume: () => {
      try {
        if (!o.valid(deck)) throw new Error("Invalid draft");
        localStorage.setItem(o.store, JSON.stringify(deck));
        setBlocked(false);
      } catch { setStatus(o.tooLarge); }
    },
    snapping,
    setSnapping,
    cur,
    setCur,
    slide,
    ratio,
    sel,
    setSel,
    selected,
    editing,
    setEditing,
    modal,
    setModal,
    scale,
    zoom,
    setZoom,
    guides,
    marquee,
    stage,
    canvasRef,
    filePick,
    pickTarget,
    setSlide,
    patchEls,
    addEl,
    removeSel,
    duplicateSel,
    layer,
    align,
    insert,
    center,
    onFile,
    pickImage,
    onElDown,
    onHandleDown,
    onCanvasDown,
    onMove,
    onUp,
    onDrop,
  };
}

export type DeckEditor<D extends Deck = Deck> = ReturnType<typeof useDeckEditor<D>>;

/**
 * The editing stage: the slide or page at its design size, scaled to fit,
 * with selection, handles, snap guides and the marquee drawn over it.
 * `overlay` sits on the page under the selection chrome (print guides);
 * `foot` floats at the bottom of the stage; `around` is drawn just outside the page.
 */
export function DeckCanvas<D extends Deck>({
  ed,
  foot,
  overlay,
  around,
  drops = false,
}: {
  ed: DeckEditor<D>;
  foot?: ReactNode;
  overlay?: ReactNode;
  around?: ReactNode;
  /** Accept photos dragged in from the desktop. */
  drops?: boolean;
}) {
  const tt = useDT();
  const { deck, slide, ratio, scale, sel, selected, editing } = ed;
  if (!deck || !slide) return null;
  const single = selected.length === 1 ? selected[0] : null;
  return (
    <div
      className="ds-stage"
      ref={ed.stage}
      onPointerDown={(e) => e.target === e.currentTarget && (ed.setSel([]), ed.setEditing(null))}
      onDragOver={drops ? (e) => e.dataTransfer.types.includes("Files") && e.preventDefault() : undefined}
      onDrop={drops ? ed.onDrop : undefined}
    >
      <div
        className="ds-canvas-wrap"
        style={{ width: ratio.w * scale, height: ratio.h * scale }}
      >
        {around}
        <div
          ref={ed.canvasRef}
          className="ds-canvas"
          style={{ width: ratio.w, height: ratio.h, transform: `scale(${scale})`, ...backgroundCss(deck, slide.bg) }}
          onPointerDown={ed.onCanvasDown}
          onPointerMove={ed.onMove}
          onPointerUp={ed.onUp}
          onPointerCancel={ed.onUp}
          onContextMenu={(e) => e.preventDefault()}
        >
          {slide.els.map((el) => (
            <div
              key={el.id}
              className={`ds-el${sel.includes(el.id) ? " is-sel" : ""}${el.locked ? " is-locked" : ""}`}
              style={elBoxStyle(el)}
              onPointerDown={(e) => ed.onElDown(e, el)}
              onDoubleClick={(e) => {
                e.stopPropagation();
                if (el.type === "text" && !el.locked) ed.setEditing(el.id);
                else if (el.type === "image") ed.pickImage("element");
                else if (el.type === "icon") ed.setModal("icons");
              }}
            >
              {editing === el.id && el.type === "text" ? (
                <TextEditor deck={deck} el={el} onDone={(value) => { ed.setEditing(null); if (value !== el.text) ed.patchEls([el.id], { text: value } as Partial<El>); }} />
              ) : (
                <ElementView deck={deck} el={el} />
              )}
            </div>
          ))}
          {overlay}
          {/* selection chrome */}
          {selected.map((el) => (
            <div key={"sel" + el.id} className="ds-sel-box" style={{ ...elBoxStyle(el), opacity: 1, ["--inv" as string]: 1 / scale }} aria-hidden="true" />
          ))}
          {single && !single.locked && editing !== single.id && (
            <div className="ds-handles" style={{ ...elBoxStyle(single), opacity: 1, ["--inv" as string]: 1 / scale }}>
              {["nw", "n", "ne", "e", "se", "s", "sw", "w"].map((h) => (
                <span key={h} className={`ds-h ds-h-${h}`} onPointerDown={(e) => ed.onHandleDown(e, h)} onPointerMove={ed.onMove} onPointerUp={ed.onUp} />
              ))}
              <span className="ds-h ds-h-rot" title={tt("Rotate (Shift snaps)")} onPointerDown={(e) => ed.onHandleDown(e, "rot")} onPointerMove={ed.onMove} onPointerUp={ed.onUp} />
            </div>
          )}
          {ed.guides.v !== undefined && <div className="ds-guide ds-guide-v" style={{ left: ed.guides.v, ["--inv" as string]: 1 / scale }} />}
          {ed.guides.h !== undefined && <div className="ds-guide ds-guide-h" style={{ top: ed.guides.h, ["--inv" as string]: 1 / scale }} />}
          {ed.marquee && <div className="ds-marquee" style={{ left: ed.marquee.x, top: ed.marquee.y, width: ed.marquee.w, height: ed.marquee.h, ["--inv" as string]: 1 / scale }} />}
        </div>
      </div>
      {foot}
      <input
        ref={ed.filePick}
        type="file"
        accept="image/png,image/jpeg,image/webp,image/gif"
        hidden
        onChange={(e) => {
          void ed.onFile(e.target.files?.[0]);
          e.target.value = "";
        }}
      />
    </div>
  );
}

export function ToolBtn({ label, d, onClick }: { label: string; d: string; onClick: () => void }) {
  const tt = useDT();
  return (
    <button type="button" className="ds-tool" onClick={onClick} title={`${tt("Add")} ${label}`}>
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d={d} />
      </svg>
      <span>{label}</span>
    </button>
  );
}

/** Inline text editing: a plain-text contentEditable laid over the element. */
function TextEditor({ deck, el, onDone }: { deck: Deck; el: Extract<El, { type: "text" }>; onDone: (v: string) => void }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const n = ref.current!;
    n.innerText = el.text;
    n.focus();
    const r = document.createRange();
    r.selectNodeContents(n);
    const s = window.getSelection();
    s?.removeAllRanges();
    s?.addRange(r);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <div style={{ position: "relative", width: "100%", height: "100%" }}>
      <div style={{ position: "absolute", inset: 0, opacity: 0 }}>
        <ElementView deck={deck} el={el} editing />
      </div>
      <div
        ref={ref}
        className="ds-text-edit"
        contentEditable="plaintext-only"
        suppressContentEditableWarning
        spellCheck
        onPointerDown={(e) => e.stopPropagation()}
        onKeyDown={(e) => {
          if (e.key === "Escape" || (e.key === "Enter" && (e.ctrlKey || e.metaKey))) {
            e.preventDefault();
            (e.target as HTMLElement).blur();
          }
        }}
        onBlur={(e) => onDone((e.currentTarget.innerText || "").replace(/\n$/, ""))}
        style={{
          fontFamily: fontStack(deck, el.font),
          color: paint(deck, el.color, "#111"),
          fontSize: el.size,
          fontWeight: el.weight,
          fontStyle: el.italic ? "italic" : undefined,
          // No caps while typing: innerText would hand back the capitalised
          // rendering and store "SPRING OPENING" for "Spring Opening".
          textAlign: el.align,
          lineHeight: el.lineHeight,
          letterSpacing: `${el.tracking}em`,
          padding: el.pad,
        }}
      />
    </div>
  );
}

const SHAPE_PREVIEW: Record<string, string> = {
  rect: "M0 0H100V100H0Z",
  round: "M18 0H82A18 18 0 0 1 100 18V82A18 18 0 0 1 82 100H18A18 18 0 0 1 0 82V18A18 18 0 0 1 18 0Z",
  pill: "M30 20H70A30 30 0 0 1 70 80H30A30 30 0 0 1 30 20Z",
  ellipse: "M50 0A50 50 0 1 1 50 100A50 50 0 1 1 50 0Z",
  triangle: "M50 0L100 100L0 100Z",
  diamond: "M50 0L100 50L50 100L0 50Z",
  hexagon: "M25 0H75L100 50L75 100H25L0 50Z",
  star: "M50 0L61 35L98 35L68 57L79 92L50 70L21 92L32 57L2 35L39 35Z",
  arrow: "M0 30H62V0L100 50L62 100V70H0Z",
  chevron: "M0 0H72L100 50L72 100H0L28 50Z",
  blob: "M52 2C80 0 100 25 98 52C96 82 70 100 45 98C18 96 0 72 3 45C6 18 25 4 52 2Z",
  line: "M0 50H100",
};

const CUTS = ["wave", "arch", "ring", "slant", "quarter"] as const;

export function ShapesModal({
  onClose,
  onPick,
  patterns = false,
}: {
  onClose: () => void;
  onPick: (k: Parameters<typeof shape>[4]) => void;
  /** Also offer the decorative cuts and SVG patterns (design studios). */
  patterns?: boolean;
}) {
  const tt = useDT();
  return (
    <Modal title={tt("Add a Shape")} onClose={onClose} wide={patterns}>
      <div className="ds-shape-picker">
        {(["rect", "round", "pill", "ellipse", "triangle", "diamond", "hexagon", "star", "arrow", "chevron", "blob", "line"] as const).map((k) => (
          <button key={k} type="button" onClick={() => onPick(k)}>
            <span
              className="ds-shape-preview"
              dangerouslySetInnerHTML={{
                __html: `<svg viewBox="-4 -4 108 108"><path d="${SHAPE_PREVIEW[k]}" fill="${k === "line" ? "none" : "currentColor"}" stroke="currentColor" stroke-width="${k === "line" ? 6 : 0}"/></svg>`,
              }}
            />
            <span>{tt(k === "round" ? "Rounded" : k === "rect" ? "Square" : k[0].toUpperCase() + k.slice(1))}</span>
          </button>
        ))}
      </div>
      {patterns && (
        <>
          <h3 className="ds-picker-head">{tt("Cuts and Patterns")}</h3>
          <div className="ds-shape-picker ds-pattern-picker">
            {[...CUTS, ...PATTERNS].map((k) => {
              const line = isStrokePattern(k);
              return (
                <button key={k} type="button" onClick={() => onPick(k)}>
                  <span
                    className="ds-shape-preview"
                    dangerouslySetInnerHTML={{
                      __html: `<svg viewBox="0 0 100 100" overflow="hidden"><path d="${shapePath(k, 100, 100, k === "ring" ? 16 : 14)}" fill="${line ? "none" : "currentColor"}" stroke="${line ? "currentColor" : "none"}" stroke-width="${line ? 3 : 0}" stroke-linecap="round"/></svg>`,
                    }}
                  />
                  <span>{tt(k[0].toUpperCase() + k.slice(1))}</span>
                </button>
              );
            })}
          </div>
        </>
      )}
    </Modal>
  );
}

export function IconsModal({ onClose, onPick }: { onClose: () => void; onPick: (name: string, paths: string) => void }) {
  const tt = useDT();
  const [q, setQ] = useState("");
  const [all, setAll] = useState<{ name: string; paths: string }[] | null>(null);
  const curated = useMemo(() => Object.keys(CURATED).map((name) => ({ name, paths: iconPaths(name) })), []);
  useEffect(() => {
    if (q && !all) void loadAllIcons().then(setAll);
  }, [q, all]);
  const words = q.trim().toLowerCase().split(/\s+/).filter(Boolean);
  const list = words.length ? (all ?? curated).filter((i) => words.every((w) => i.name.includes(w))).slice(0, 240) : curated;
  void nodeToPaths;
  return (
    <Modal title={tt("Icons")} onClose={onClose} wide>
      <input
        className="ds-icon-search"
        autoFocus
        type="search"
        placeholder={tt("Search 2,000+ icons: rocket, leaf, chart, phone…")}
        value={q}
        onChange={(e) => setQ(e.target.value)}
        aria-label={tt("Search icons")}
      />
      {q && !all && <p className="ds-note">{tt("Loading the full library…")}</p>}
      <div className="ds-icon-grid">
        {list.map((i) => (
          <button key={i.name} type="button" title={i.name} aria-label={i.name} onClick={() => onPick(i.name, i.paths)}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" dangerouslySetInnerHTML={{ __html: i.paths }} />
            <span>{i.name.replace(/-/g, " ")}</span>
          </button>
        ))}
      </div>
      {!list.length && <p className="ds-note">{tt("No icon matches that. Try a shorter word.")}</p>}
    </Modal>
  );
}
