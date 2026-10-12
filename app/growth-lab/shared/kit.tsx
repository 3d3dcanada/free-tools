import { useT, useLocale } from "./locale";
import { useCallback, useEffect, useRef, useState, type ReactNode, type SetStateAction } from "react";
import { useLocalDraft } from "./browser";
import { track } from "../../lib/analytics";
import ProjectLibrary from "./ProjectLibrary";
import { ToolSlot } from "./chrome";

export function useEditor<T>(key: string | null, initial: T, valid: (v: unknown) => v is T, pristine: T[] = []) {
  const draft = useLocalDraft(key, initial, valid, pristine);
  const past = useRef<T[]>([]);
  const future = useRef<T[]>([]);
  const current = useRef(draft.value);
  current.current = draft.value;
  const [, refresh] = useState(0);
  const setValue = useCallback(
    (next: SetStateAction<T>) => {
      const value = typeof next === "function" ? (next as (p: T) => T)(current.current) : next;
      past.current = [...past.current.slice(-39), current.current];
      future.current = [];
      current.current = value;
      draft.setValue(value);
    },
    [draft.setValue],
  );
  const step = useCallback(
    (back: boolean) => {
      const from = back ? past : future;
      const to = back ? future : past;
      if (!from.current.length) return;
      to.current.push(current.current);
      const value = from.current.pop()!;
      current.current = value;
      draft.setValue(value);
      refresh((n) => n + 1);
    },
    [draft.setValue],
  );
  useEffect(() => {
    const keyboard = (e: KeyboardEvent) => {
      if (!(e.ctrlKey || e.metaKey) || e.altKey) return;
      if ((e.target as HTMLElement).closest("dialog, input, textarea, select, [contenteditable]")) return;
      if (e.key.toLowerCase() === "z" || e.key.toLowerCase() === "y") {
        e.preventDefault();
        step(e.key.toLowerCase() === "z" && !e.shiftKey);
      }
    };
    window.addEventListener("keydown", keyboard);
    return () => window.removeEventListener("keydown", keyboard);
  }, [step]);
  return {
    ...draft,
    setValue,
    undo: () => step(true),
    redo: () => step(false),
    canUndo: !!past.current.length,
    canRedo: !!future.current.length,
  };
}

export function History({
  editor,
}: {
  editor: { undo: () => void; redo: () => void; canUndo: boolean; canRedo: boolean; blocked?: boolean; recover?: () => void; resume?: () => void };
}) {
  const tr = useT();

  // Undo and redo live in the tool bar; only a draft that could not load speaks up here.
  return (
    <>
      <ToolSlot name="history">
        <div className="history" role="group" aria-label={tr("Edit history")}>
          <button type="button" onClick={editor.undo} disabled={!editor.canUndo} aria-label={tr("Undo")} title={`${tr("Undo")} (Ctrl/⌘ Z)`}>
            <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M9 14 4 9l5-5" /><path d="M4 9h10.5a5.5 5.5 0 0 1 0 11H11" /></svg>
          </button>
          <button type="button" onClick={editor.redo} disabled={!editor.canRedo} aria-label={tr("Redo")} title={`${tr("Redo")} (Ctrl/⌘ Shift Z)`}>
            <svg viewBox="0 0 24 24" aria-hidden="true"><path d="m15 14 5-5-5-5" /><path d="M20 9H9.5a5.5 5.5 0 0 0 0 11H13" /></svg>
          </button>
        </div>
      </ToolSlot>
      {editor.blocked && <DraftRecovery recover={editor.recover!} resume={editor.resume!} />}
    </>
  );
}

export function DraftRecovery({ recover, resume }: { recover: () => void; resume: () => void }) {
  const tr = useT();
  const [error, setError] = useState("");
  return <div className="draft-recovery" role="status">
    <span>{tr("Your previous draft could not be loaded. It has been preserved.")}</span>
    <button type="button" onClick={() => { try { recover(); } catch { setError("Browser storage is unavailable. Downloads still work."); } }}>{tr("Download Original Data")}</button>
    <button type="button" onClick={() => {
      if (window.confirm(tr("Replace the unreadable draft with your current work? Download the original data first."))) resume();
    }}>{tr("Enable Saving")}</button>
    {error && <span>{tr(error)}</span>}
  </div>;
}

export function DropZone({
  label,
  accept,
  multiple = false,
  onFiles,
  children,
}: {
  label: string;
  accept: string;
  multiple?: boolean;
  onFiles: (files: File[]) => Promise<void> | void;
  children?: ReactNode;
}) {
  const tr = useT();

  const [error, setError] = useState("");
  async function handle(files: File[]) {
    try {
      setError("");
      if (!files.length) return;
      if (files.length > (multiple ? 100 : 1))
        throw new Error(multiple ? "Choose at most 100 files." : "Choose one file at a time.");
      if (files.some((f) => f.size > 100_000_000)) throw new Error("Each file must be smaller than 100 MB.");
      await onFiles(files);
    } catch (e) {
      setError((e as Error).message);
    }
  }
  return (
    <div
      className="dropzone"
      onDragOver={(e) => e.preventDefault()}
      onDrop={(e) => {
        e.preventDefault();
        void handle(Array.from(e.dataTransfer.files));
      }}
    >
      <label>
        {tr(label)}
        <input
          type="file"
          accept={accept}
          multiple={multiple}
          onChange={(e) => {
            void handle(Array.from(e.target.files ?? []));
            e.target.value = "";
          }}
        />
      </label>
      <small>{tr("Choose from your device, or drop files here.")}</small>
      {children}
      {error && (
        <p role="alert" className="notice">
          {tr(error)}
        </p>
      )}
    </div>
  );
}

export function Pledge({ fr = false }: { fr?: boolean }) {
  const tr = useT();

  const locale = useLocale();
  return (
    <p className="pledge">
      {fr || locale === "fr"
        ? tr(
            "Gratuit pour toujours. Sans compte, filigrane, essai ni expiration. Aucun fichier transmis: vos fichiers restent sur votre appareil.",
          )
        : tr(
            "Free forever. No account, no watermark, no trial, no expiry. Nothing uploaded: your files never leave your device.",
          )}
    </p>
  );
}

/**
 * What happens to a visitor's data, on every tool page and the hub. Each line
 * was checked against the code: files are read with File/Blob in the browser and no
 * request carries them (the only fetches are the fonts, the optional model the
 * background remover loads from this site, and the feedback form); drafts go to
 * localStorage through useLocalDraft and the deck editor; QR payloads are the typed
 * text itself (qr-code/model.ts `payload`, no redirect and no short link); the only
 * counting is a `tool_export:<label>` event with the page path (lib/analytics).
 */
const QR_FAMILY = new Set(["qr-code", "wifi-qr-code", "vcard-qr-code", "calendar-qr-code"]);
export function DataPromise({ slug }: { slug?: string }) {
  const tr = useT();
  const lines = [
    "Your files stay on this device. They are processed in your browser and never uploaded.",
    "Anything saved, such as drafts and settings, stays in this browser’s storage. Clearing site data deletes it, and nothing is backed up elsewhere.",
    "We count that a tool was used, never what was in it.",
    ...(!slug || QR_FAMILY.has(slug)
      ? ["QR codes made here are static: they contain exactly what you typed, never expire and are never tracked."]
      : []),
  ];
  return (
    <section className="data-promise" aria-label={tr("What happens to your data")}>
      <h2>{tr("What happens to your data")}</h2>
      <ul>
        {lines.map((l) => (
          <li key={l}>{tr(l)}</li>
        ))}
      </ul>
    </section>
  );
}

export type ExportAction = (() => Promise<void> | void) | { run: () => Promise<void> | void; disabled?: boolean };

/**
 * One Download button. With a single format it saves at once; with several it
 * opens a short list of the formats (2026-10-11: a row of six buttons hid the
 * QR code on a phone).
 */
export function ExportBar({
  actions,
  disabled = false,
  label = "Download",
}: {
  actions: Record<string, ExportAction>;
  disabled?: boolean;
  label?: string;
}) {
  const tr = useT();
  const [busy, setBusy] = useState("");
  const [message, setMessage] = useState("");
  const [open, setOpen] = useState(false);
  const box = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!open) return;
    const close = (e: PointerEvent | KeyboardEvent) => {
      if (e instanceof KeyboardEvent ? e.key === "Escape" : !box.current?.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("pointerdown", close);
    document.addEventListener("keydown", close);
    return () => {
      document.removeEventListener("pointerdown", close);
      document.removeEventListener("keydown", close);
    };
  }, [open]);
  const list = Object.entries(actions).map(([name, a]) =>
    typeof a === "function" ? { name, run: a, off: disabled } : { name, run: a.run, off: disabled || !!a.disabled },
  );
  async function run(name: string, task: () => Promise<void> | void) {
    setOpen(false);
    setBusy(name);
    setMessage("");
    try {
      await task();
      setMessage(`${name}: ready.`);
      // A free tool export, counted (2026-10-09). Only the page and the export kind,
      // never a file name, size or anything typed. Uses content_cta, which the
      // analytics worker already accepts.
      track("content_cta", { to: window.location.pathname, kind: `tool_export:${name}` });
    } catch (e) {
      setMessage((e as Error).message);
    } finally {
      setBusy("");
    }
  }
  const single = list.length === 1 ? list[0] : null;
  return (
    <div className="exportbar" ref={box}>
      <button
        type="button"
        className="export-main"
        disabled={!!busy || (single ? single.off : list.every((a) => a.off))}
        aria-haspopup={single ? undefined : "menu"}
        aria-expanded={single ? undefined : open}
        onClick={() => (single ? void run(single.name, single.run) : setOpen((o) => !o))}
      >
        <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 4v11m0 0-4.5-4.5M12 15l4.5-4.5M5 19h14" /></svg>
        {tr(busy ? "Preparing…" : single ? single.name : label)}
        {!single && <span className="export-caret" aria-hidden="true">▾</span>}
      </button>
      {!single && open && (
        <div className="export-menu" role="menu">
          {list.map((a) => (
            <button key={a.name} type="button" role="menuitem" disabled={a.off} onClick={() => void run(a.name, a.run)}>
              {tr(a.name)}
            </button>
          ))}
        </div>
      )}
      <p role="status" className="fine export-status">
        {tr(busy || message)}
      </p>
    </div>
  );
}

export function DraftFiles<T>({
  value,
  valid,
  onLoad,
  name,
  title,
}: {
  value: T;
  valid: (v: unknown) => v is T;
  onLoad: (v: T) => void;
  name: string;
  title?: string;
}) {
  return <ProjectLibrary value={value} valid={valid} onLoad={onLoad} name={name} defaultName={title} />;
}
