/**
 * 2026-10-09: pieces shared by the image, PDF and 3D printing workspaces.
 * A dark stage holds the work; the paper panel holds premium rows, never pills.
 */
import {
  ArrowLeft, ArrowRight, Box, Download, FlipHorizontal2, FlipVertical2, Maximize, Plus, RotateCcw, RotateCw,
  Trash2, X,
} from "lucide";
import { useEffect, useRef, useState, type DragEvent, type ReactNode, type RefObject } from "react";
import { track } from "../../lib/analytics";
import type { Locale } from "../seo/guide";
import { useT } from "./locale";

type Node = [string, Record<string, string | number>][];
const icons = {
  // Lucide names flips by their axis line: mirroring left to right is its "vertical" flip.
  add: Plus, box: Box, close: X, delete: Trash2, download: Download, earlier: ArrowLeft, flipX: FlipVertical2,
  flipY: FlipHorizontal2, fit: Maximize, later: ArrowRight, left: RotateCcw, right: RotateCw,
} as unknown as Record<string, Node>;
export type IconName = keyof typeof icons;

export function Icon({ name }: { name: IconName }) {
  return (
    <svg className="ws-icon" viewBox="0 0 24 24" aria-hidden="true">
      {icons[name].map(([tag, attrs], i) => {
        const Tag = tag as "path";
        return <Tag key={i} {...(attrs as Record<string, string>)} />;
      })}
    </svg>
  );
}

/** A file picker that reads as a button. The input stays focusable for keyboards. */
export function AddFiles({
  label,
  accept,
  multiple = false,
  onFiles,
  primary = false,
}: {
  label: string;
  accept: string;
  multiple?: boolean;
  onFiles: (files: File[]) => void;
  primary?: boolean;
}) {
  return (
    <label className={`ws-add${primary ? " ws-add-primary" : ""}`}>
      <input
        type="file"
        accept={accept}
        multiple={multiple}
        onChange={(e) => {
          const files = Array.from(e.target.files ?? []);
          e.target.value = "";
          if (files.length) onFiles(files);
        }}
      />
      <Icon name="add" />
      <span>{label}</span>
    </label>
  );
}

export type Preset = { id: string; title: string; detail?: string; meta?: string };

/** Premium selectable rows: title, one honest line, the value on the right. */
export function PresetRows({
  label,
  items,
  value,
  onPick,
}: {
  label: string;
  items: Preset[];
  value: string | undefined;
  onPick: (id: string) => void;
}) {
  const tr = useT();
  return (
    <div className="ws-presets" role="group" aria-label={label}>
      {items.map((p) => (
        <button key={p.id} type="button" className="ws-preset" aria-pressed={p.id === value} onClick={() => onPick(p.id)}>
          <span className="ws-preset-text">
            <strong>{tr(p.title)}</strong>
            {p.detail && <span>{tr(p.detail)}</span>}
          </span>
          {p.meta && <span className="ws-preset-meta">{tr(p.meta)}</span>}
        </button>
      ))}
    </div>
  );
}

/** Connected buttons for two to five short choices. */
export function Segmented<T extends string | number>({
  label,
  value,
  options,
  onChange,
  className = "",
}: {
  label: string;
  value: T;
  options: [T, ReactNode][];
  onChange: (value: T) => void;
  className?: string;
}) {
  return (
    <div className={`segmented ${className}`} role="group" aria-label={label}>
      {options.map(([v, text]) => (
        <button key={String(v)} type="button" aria-pressed={v === value} onClick={() => onChange(v)}>
          {text}
        </button>
      ))}
    </div>
  );
}

/** A URL for a Blob that lives exactly as long as the Blob is shown. */
export function useObjectUrl(blob?: Blob | null) {
  const [url, setUrl] = useState("");
  useEffect(() => {
    if (!blob) {
      setUrl("");
      return;
    }
    const next = URL.createObjectURL(blob);
    setUrl(next);
    return () => URL.revokeObjectURL(next);
  }, [blob]);
  return url;
}

/** The content box of an element, kept current by a ResizeObserver. */
export function useElementSize(ref: RefObject<HTMLElement | null>) {
  const [size, setSize] = useState({ width: 0, height: 0 });
  useEffect(() => {
    const element = ref.current;
    if (!element) return;
    const observer = new ResizeObserver(([entry]) =>
      setSize({ width: entry.contentRect.width, height: entry.contentRect.height }),
    );
    observer.observe(element);
    return () => observer.disconnect();
  }, [ref]);
  return size;
}

/** Drop files anywhere on the stage. `dragging` lights the stage while files hover. */
export function useFileDrop(onFiles: (files: File[]) => void) {
  const [dragging, setDragging] = useState(false);
  const depth = useRef(0);
  return {
    dragging,
    bind: {
      onDragEnter: (e: DragEvent) => {
        if (!e.dataTransfer.types.includes("Files")) return;
        depth.current++;
        setDragging(true);
      },
      onDragLeave: () => {
        depth.current = Math.max(0, depth.current - 1);
        if (!depth.current) setDragging(false);
      },
      onDragOver: (e: DragEvent) => {
        if (e.dataTransfer.types.includes("Files")) e.preventDefault();
      },
      onDrop: (e: DragEvent) => {
        if (!e.dataTransfer.types.includes("Files")) return;
        e.preventDefault();
        depth.current = 0;
        setDragging(false);
        const files = Array.from(e.dataTransfer.files);
        if (files.length) onFiles(files);
      },
    },
  };
}

/** File sizes in the reader's language: 412 KB, 3.1 MB (FR: 412 ko, 3,1 Mo). */
export function formatBytes(bytes: number, locale: Locale) {
  const fr = locale === "fr";
  const mb = bytes >= 1024 * 1024;
  const value = mb ? bytes / 1024 / 1024 : Math.max(0.1, bytes / 1024);
  const digits = mb ? (value < 10 ? 1 : 0) : value < 10 ? 1 : 0;
  const n = value.toLocaleString(fr ? "fr-CA" : "en-CA", { maximumFractionDigits: digits });
  return `${n} ${mb ? (fr ? "Mo" : "MB") : fr ? "ko" : "KB"}`;
}

/** A safe file stem for export names. */
export const stem = (name: string, fallback = "file") =>
  name
    .replace(/\.[^.]+$/, "")
    .replace(/[^a-zA-Z0-9_-]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 80) || fallback;

/** Count an export exactly as ExportBar does: the page and the export kind, never a file name or size. */
export const countExport = (label: string) =>
  track("content_cta", { to: window.location.pathname, kind: `tool_export:${label}` });
