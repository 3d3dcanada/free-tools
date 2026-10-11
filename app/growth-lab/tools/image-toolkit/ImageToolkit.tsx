import { useLocale, useLocalLink, useT } from "../../shared/locale";
import { useEffect, useMemo, useRef, useState } from "react";
import { download } from "../../shared/browser";
import { History, useEditor } from "../../shared/kit";
import {
  AddFiles,
  Icon,
  PresetRows,
  Segmented,
  countExport,
  formatBytes,
  stem,
  useFileDrop,
  useObjectUrl,
} from "../../shared/workspace";
import { imageDefaults, imagePresets, presetFor, type ImageMode, type ImageSettings } from "./model";
import { processImage } from "./process";
import type { CodecJob } from "./codec.worker";
import Compare from "./Compare";
import CropEditor from "./CropEditor";
import { correctBatch, settingsFor, type ImageBatch } from "./batch";
import ExampleButton from "../../shared/ExampleButton";
import { exampleImage } from "../../shared/examples";

type State = ImageBatch;
const valid = (v: unknown): v is State => !!v && typeof v === "object" && "files" in v;
type Processed = Awaited<ReturnType<typeof processImage>>;
/** A result belongs to the exact settings it was made with (`key`). */
type Entry = { key: string; result?: Processed; error?: string };
const accept = "image/*,.heic,.heif,.avif,.svg";
const suffix: Record<ImageMode, string> = {
  "compress-image": "-compressed",
  "resize-image": "-resized",
  "crop-image": "-cropped",
  "convert-image": "",
  "favicon-generator": "-favicon",
  "rounded-image": "-rounded",
  "remove-background": "-cutout",
};
const batchName: Record<ImageMode, string> = {
  "compress-image": "compressed-images.zip",
  "resize-image": "resized-images.zip",
  "crop-image": "cropped-images.zip",
  "convert-image": "converted-images.zip",
  "favicon-generator": "favicons.zip",
  "rounded-image": "rounded-images.zip",
  "remove-background": "cutout-images.zip",
};
const presetTitle: Partial<Record<ImageMode, string>> = {
  "compress-image": "Compression",
  "convert-image": "Convert To",
  "resize-image": "Size",
  "rounded-image": "Corners",
};
const formatName: Record<string, string> = { jpg: "JPG", png: "PNG", webp: "WebP", avif: "AVIF", zip: "ZIP" };
/** A saving is never shown as −100%: a file that still exists has not shrunk to nothing. */
const percent = (change: number) => (change > 0 ? `+${change}%` : change < 0 ? `−${Math.min(99, -change)}%` : "0%");

function Tile({
  file,
  entry,
  fresh,
  on,
  working,
  change: showChange,
  onPick,
  onRemove,
}: {
  file: File;
  entry?: Entry;
  fresh: boolean;
  on: boolean;
  working: boolean;
  change: boolean;
  onPick: () => void;
  onRemove: () => void;
}) {
  const tr = useT(),
    locale = useLocale();
  const url = useObjectUrl(file);
  const r = fresh ? entry?.result : undefined;
  const failed = fresh && !!entry?.error;
  const change = r ? Math.round((r.output.size / file.size - 1) * 100) : 0;
  return (
    <li className="iw-tile" data-state={working ? "working" : failed ? "error" : r ? "done" : "waiting"}>
      <button type="button" className="iw-tile-pick" aria-pressed={on} onClick={onPick} title={file.name}>
        <span className="iw-tile-thumb">
          <img src={url || undefined} alt="" loading="lazy" decoding="async" draggable={false} />
          {r && showChange && (
            <span className="iw-tile-change" data-up={change > 0 || undefined}>
              {percent(change)}
            </span>
          )}
          {failed && <span className="iw-tile-change" data-error="">{tr("Failed")}</span>}
        </span>
        <span className="iw-tile-name">{file.name}</span>
        <span className="iw-tile-size">
          {formatBytes(file.size, locale)}
          {r && ` → ${formatBytes(r.output.size, locale)}`}
        </span>
      </button>
      <button type="button" className="iw-tile-remove" aria-label={`${tr("Remove")} ${file.name}`} onClick={onRemove}>
        <Icon name="close" />
      </button>
    </li>
  );
}

/** A favicon is judged at its real sizes, and in a browser tab. */
function Favicon({ src }: { src: string }) {
  const tr = useT();
  return (
    <div className="iw-view iw-favicon">
      <p className="iw-favicon-label">{tr("In a browser tab")}</p>
      <div className="iw-favicon-tab">
        <img src={src || undefined} alt="" />
        <span>{tr("Your site")}</span>
        <Icon name="close" />
      </div>
      <p className="iw-favicon-label">{tr("Sizes in the ZIP")}</p>
      <ul className="iw-favicon-sizes" aria-label={tr("Icon sizes")}>
        {[16, 32, 48, 180, 512].map((n) => (
          <li key={n}>
            <span className="iw-favicon-box" style={{ width: Math.min(n, 132), height: Math.min(n, 132) }}>
              <img src={src || undefined} alt="" />
            </span>
            <span>{n} px</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function ImageToolkit({ mode, preset }: { mode: ImageMode; preset?: Partial<ImageSettings> }) {
  const tr = useT(),
    locale = useLocale(),
    link = useLocalLink();
  const editor = useEditor<State>(null, { files: [], settings: { ...imageDefaults, ...preset }, overrides: new Map() }, valid);
  const { files } = editor.value;
  const [selected, setSelected] = useState(0);
  const [scope, setScope] = useState<"all" | "selected">(mode === "crop-image" ? "selected" : "all");
  const index = Math.min(selected, Math.max(0, files.length - 1));
  const current = files[index] as File | undefined;
  const s = scope === "selected" && current ? settingsFor(editor.value, current) : editor.value.settings;
  const patch = (next: Partial<ImageSettings>) => editor.setValue(correctBatch(editor.value, scope === "selected" ? current ?? null : null, next));
  const [paused, setPaused] = useState(false), [attempt, setAttempt] = useState(0);
  const [results, setResults] = useState(() => new Map<File, Entry>());
  const [working, setWorking] = useState<File | null>(null);
  // The background model is a 4.6 MB download, so it loads only when asked.
  const [armed, setArmed] = useState(mode !== "remove-background");
  const [notice, setNotice] = useState("");
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState("");
  const key = useMemo(() => JSON.stringify([mode, files.map(f => settingsFor(editor.value, f))]), [mode, editor.value]);
  const keyFor = (file: File) => JSON.stringify([mode, settingsFor(editor.value, file)]);
  const whole = (n: number) => n.toLocaleString(locale === "fr" ? "fr-CA" : "en-CA");
  const resultsRef = useRef(results);
  resultsRef.current = results;
  useEffect(() => {
    setResults(previous => previous.size && [...previous.keys()].some(f => !files.includes(f))
      ? new Map([...previous].filter(([f]) => files.includes(f))) : previous);
  }, [files]);
  const selectedRef = useRef(selected);
  selectedRef.current = selected;
  const worker = useRef<Worker | null>(null),
    pending = useRef<((e: Error) => void) | null>(null);
  const stopCodec = () => {
    worker.current?.terminate();
    worker.current = null;
    pending.current?.(new Error("Cancelled"));
    pending.current = null;
  };
  useEffect(() => () => stopCodec(), []);
  const codec = (job: CodecJob) =>
    new Promise<Uint8Array<ArrayBuffer>>((resolve, reject) => {
      worker.current ??= new Worker(new URL("./codec.worker.ts", import.meta.url), { type: "module" });
      const timeout = window.setTimeout(() => {
        worker.current?.terminate();
        worker.current = null;
        pending.current = null;
        reject(
          new Error("Processing exceeded 60 seconds. Your browser may not support this operation efficiently."),
        );
      }, 60_000);
      pending.current = (error) => {
        clearTimeout(timeout);
        reject(error);
      };
      worker.current.onmessage = ({ data }: MessageEvent<{ bytes?: Uint8Array<ArrayBuffer>; error?: string }>) => {
        clearTimeout(timeout);
        pending.current = null;
        if (data.error || !data.bytes) reject(new Error(data.error || "Codec returned no data."));
        else resolve(data.bytes);
      };
      worker.current.onerror = () => {
        clearTimeout(timeout);
        pending.current = null;
        reject(new Error("The image worker stopped. Try a smaller image."));
      };
      worker.current.postMessage(job, [job.pixels.buffer]);
    });

  // Live: every settings change re-runs the batch after a short pause, the
  // image on screen first. What you see in the strip is what the ZIP holds.
  useEffect(() => {
    if (!files.length || !armed || paused) {
      setWorking(null);
      return;
    }
    let cancelled = false;
    const timer = window.setTimeout(async () => {
      stopCodec();
      const first = Math.min(selectedRef.current, files.length - 1);
      const order = [first, ...files.map((_, i) => i).filter((i) => i !== first)];
      for (const i of order) {
        if (cancelled) return;
        const file = files[i];
        const fileKey = keyFor(file);
        if (resultsRef.current.get(file)?.key === fileKey) continue;
        setWorking(file);
        let entry: Entry;
        try {
          const result = await processImage(file, mode, settingsFor(editor.value, file), (job) =>
            cancelled ? Promise.reject(new Error("Cancelled")) : codec(job),
          );
          entry = { key: fileKey, result };
        } catch (e) {
          entry = { key: fileKey, error: (e as Error).message };
        }
        if (cancelled) return;
        setResults((previous) => new Map(previous).set(file, entry));
      }
      if (!cancelled) {
        setWorking(null);
        stopCodec();
      }
    }, 260);
    return () => {
      cancelled = true;
      clearTimeout(timer);
      stopCodec();
    };
    // `s` is captured through `key`, which serialises it.
  }, [files, key, armed, paused, attempt]);

  // A new setting makes the last download message stale.
  useEffect(() => setSaved(""), [key]);
  const take = (incoming: File[]) => {
    const next = [...files, ...incoming];
    if (next.length > 20 || next.reduce((n, f) => n + f.size, 0) > 100_000_000) {
      setNotice("Choose up to 20 images totalling less than 100 MB.");
      return;
    }
    setNotice("");
    setSaved("");
    if (!files.length) setSelected(0);
    editor.setValue({ ...editor.value, files: next });
    setPaused(false);
  };
  const drop = useFileDrop(take);
  const remove = (i: number) => {
    const overrides = new Map(editor.value.overrides); overrides.delete(files[i]);
    editor.setValue({ ...editor.value, overrides, files: files.filter((_, n) => n !== i) });
    if (selected >= i && selected > 0) setSelected(selected - 1);
  };
  const entry = current ? results.get(current) : undefined;
  const isFresh = (f: File) => results.get(f)?.key === keyFor(f);
  const beforeUrl = useObjectUrl(current);
  const afterUrl = useObjectUrl(entry?.result?.preview);
  const done = files.filter((f) => isFresh(f) && results.get(f)?.result);
  const failed = files.filter((f) => isFresh(f) && results.get(f)?.error);
  const finished = done.length + failed.length;
  const retry = () => {
    const next = new Map(results);
    for (const file of failed) next.delete(file);
    resultsRef.current = next; setResults(next); setPaused(false); setAttempt(n => n + 1);
  };
  const before = done.reduce((n, f) => n + f.size, 0);
  const after = done.reduce((n, f) => n + (results.get(f)?.result?.output.size ?? 0), 0);
  const change = before ? Math.round((after / before - 1) * 100) : 0;
  const total = files.reduce((n, f) => n + f.size, 0);
  const one = files.length === 1;
  const r = current && isFresh(current) ? entry?.result : undefined;
  const presets = imagePresets[mode];
  // A percentage means something when the job is making files smaller; a vector to raster
  // conversion or a favicon set says nothing useful as "+9000%".
  const showChange = mode !== "convert-image" && mode !== "favicon-generator";
  const formats = !["remove-background", "favicon-generator", "rounded-image"].includes(mode);

  async function save() {
    setSaving(true);
    setSaved("");
    try {
      const ready = files
        .map((f, i) => ({ f, i, r: isFresh(f) ? results.get(f)?.result : undefined }))
        .filter((x): x is { f: File; i: number; r: Processed } => !!x.r);
      if (!ready.length) throw new Error("Nothing is ready to download yet.");
      if (one) {
        const { f, r } = ready[0];
        const same = new RegExp(`\\.${r.extension === "jpg" ? "jpe?g" : r.extension}$`, "i").test(f.name);
        download(`${stem(f.name, "image")}${suffix[mode] || (same ? "-converted" : "")}.${r.extension}`, r.output, r.output.type);
        countExport("Download Image");
      } else {
        const { default: JSZip } = await import("jszip");
        const zip = new JSZip();
        for (const { f, i, r } of ready)
          zip.file(`${String(i + 1).padStart(2, "0")}-${stem(f.name, "image")}.${r.extension}`, r.output);
        download(batchName[mode], await zip.generateAsync({ type: "blob" }), "application/zip");
        countExport("Download Batch ZIP");
      }
      setSaved(locale === "fr" ? "Téléchargé. Vos originaux restent intacts." : "Downloaded. Your originals are unchanged.");
    } catch (e) {
      setNotice((e as Error).message);
    } finally {
      setSaving(false);
    }
  }

  const number = (label: string, field: "width" | "height", suffixText = " px") => (
    <label>
      {tr(label)}
      {suffixText}
      <input
        type="number"
        min={1}
        max={8192}
        inputMode="numeric"
        value={Number.isFinite(s[field]) ? s[field] : ""}
        onChange={(e) => patch({ [field]: e.target.valueAsNumber })}
      />
    </label>
  );
  const quality = (
    <label className="ws-range">
      <span>{tr("Quality")}</span>
      <output>{s.format === "png" ? tr("Lossless") : s.quality}</output>
      <input
        type="range"
        min="1"
        max="100"
        value={s.quality}
        disabled={s.format === "png"}
        aria-label={tr("Quality")}
        onChange={(e) => patch({ quality: +e.target.value })}
      />
    </label>
  );
  const turns = (
    <div className="ws-icon-row" role="group" aria-label={tr("Rotation")}>
      <button type="button" aria-label={tr("Rotate left")} title={tr("Rotate left")} onClick={() => patch({ rotation: (s.rotation + 270) % 360 })}>
        <Icon name="left" />
      </button>
      <button type="button" aria-label={tr("Rotate right")} title={tr("Rotate right")} onClick={() => patch({ rotation: (s.rotation + 90) % 360 })}>
        <Icon name="right" />
      </button>
      <button type="button" aria-label={tr("Flip horizontally")} title={tr("Flip horizontally")} aria-pressed={s.flipX} onClick={() => patch({ flipX: !s.flipX })}>
        <Icon name="flipX" />
      </button>
      <button type="button" aria-label={tr("Flip vertically")} title={tr("Flip vertically")} aria-pressed={s.flipY} onClick={() => patch({ flipY: !s.flipY })}>
        <Icon name="flipY" />
      </button>
      <span>{s.rotation}°</span>
    </div>
  );

  const state = !current
    ? ""
    : isFresh(current) && entry?.error
      ? tr(entry.error)
      : !armed
        ? tr("Press Remove Background to start. The model loads only then.")
        : paused ? tr("Paused. Finished results are kept.") : !isFresh(current)
          ? tr(entry?.result ? "Updating…" : "Processing…")
          : "";
  const exportLabel = one
    ? `${tr("Download")} ${formatName[r?.extension ?? ""] ?? ""}`.trim()
    : `${tr("Download ZIP")} · ${done.length} ${tr("images")}`;

  return (
    <div className="workspace two-column image-editor iw">
      <div className="controls iw-panel">
        <History editor={editor} />
        <p className="panel-label">{tr("Your Images")}</p>
        <div className="ws-files">
          <AddFiles
            label={tr(files.length ? "Add More Images" : "Choose Images")}
            accept={accept}
            multiple
            primary={!files.length}
            onFiles={take}
          />
          {files.length > 0 && (
            <button
              type="button"
              className="ws-quiet"
              onClick={() => {
                editor.setValue({ ...editor.value, overrides: new Map(), files: [] });
                setResults(new Map());
                setSaved("");
              }}
            >
              {tr("Clear All")}
            </button>
          )}
        </div>
        {!files.length && <ExampleButton onLoad={() => take([exampleImage(locale)])} />}
        <p className="fine">
          {files.length
            ? `${files.length} ${tr(one ? "image" : "images")} · ${formatBytes(total, locale)}`
            : tr("Drop one image or a batch. Up to 20 files / 100 MB total; 24 megapixels per image.")}
        </p>
        {!!files.length && <div className="batch-controls">
          <label>{tr("Apply Changes To")}<select value={scope} onChange={e => setScope(e.target.value as typeof scope)}>
            <option value="all">{tr("All Images")}</option><option value="selected">{tr("Selected Image Only")}</option>
          </select></label>
          <p className="fine">{scope === "selected" ? current?.name : tr("Each changed setting applies to the batch. Other individual corrections stay.")}</p>
          {current && editor.value.overrides.has(current) && <button type="button" onClick={() => { const overrides = new Map(editor.value.overrides); overrides.delete(current); editor.setValue({ ...editor.value, overrides }); }}>{tr("Reset This Image to Batch Settings")}</button>}
          <div className="library-actions">
            {armed && finished < files.length && <button type="button" onClick={() => setPaused(p => !p)}>{tr(paused ? "Resume Processing" : "Pause Processing")}</button>}
            {!!failed.length && <button type="button" onClick={retry}>{tr("Retry Failed Images")}</button>}
          </div>
          <progress max={files.length} value={finished} aria-label={tr("Batch Progress")} />
          {current && isFresh(current) && entry?.error && <p className="notice" role="alert">{tr(entry.error)}</p>}
        </div>}
        {presets && (
          <>
            <p className="panel-label">{tr(presetTitle[mode] ?? "Presets")}</p>
            <PresetRows
              label={tr(presetTitle[mode] ?? "Presets")}
              items={presets}
              value={presetFor(mode, s)}
              onPick={(id) => patch(presets.find((p) => p.id === id)!.settings)}
            />
          </>
        )}
        {mode === "crop-image" && (
          <>
            <p className="panel-label">{tr("Crop")}</p>
            <p className="ws-readout">
              {r ? `${whole(r.width)} × ${whole(r.height)} px` : <small>{tr("Processing…")}</small>}
              <span>{s.ratio === "free" ? tr("Free") : s.ratio}</span>
            </p>
            {turns}
            <p className="fine">
              {tr("Drag the box or its handles. Choose Selected Image Only for a separate crop on each image.")}
            </p>
          </>
        )}
        {mode === "rounded-image" && (
          <>
            <p className="panel-label">{tr("Fine Tune")}</p>
            <label className="ws-range">
              <span>{tr("Corner Radius")}</span>
              <output>{s.radius}%</output>
              <input type="range" min="0" max="50" value={s.radius} aria-label={tr("Corner Radius")} onChange={(e) => patch({ radius: +e.target.value })} />
            </label>
            <label className="ws-range">
              <span>{tr("Border Width")}</span>
              <output>{s.border} px</output>
              <input type="range" min="0" max="100" value={s.border} aria-label={tr("Border Width")} onChange={(e) => patch({ border: +e.target.value })} />
            </label>
            <label className="ws-colour">
              <span>{tr("Border Colour")}</span>
              <input type="color" value={s.colour} onChange={(e) => patch({ colour: e.target.value })} />
            </label>
          </>
        )}
        {mode === "resize-image" && (
          <>
            <p className="panel-label">{tr("Exact Size")}</p>
            <Segmented
              label={tr("Resize Mode")}
              value={s.resize}
              options={[
                ["pixels", tr("Pixel Box")],
                ["percent", tr("Percent")],
              ]}
              onChange={(resize) => patch({ resize })}
            />
            {s.resize === "percent" ? (
              <label className="ws-range">
                <span>{tr("Scale")}</span>
                <output>{s.percent}%</output>
                <input type="range" min="1" max="400" value={s.percent} aria-label={tr("Scale")} onChange={(e) => patch({ percent: +e.target.value })} />
              </label>
            ) : (
              <>
                <div className="field-grid">
                  {number("Width", "width")}
                  {number("Height", "height")}
                </div>
                <Segmented
                  label={tr("Fit")}
                  value={s.fit}
                  options={[
                    ["contain", tr("Fit Inside")],
                    ["cover", tr("Fill and Crop")],
                  ]}
                  onChange={(fit) => patch({ fit })}
                />
              </>
            )}
          </>
        )}
        {formats && (
          <>
            <p className="panel-label">{tr(mode === "compress-image" ? "Fine Tune" : "Output")}</p>
            {mode !== "convert-image" && (
              <Segmented
                label={tr("Output Format")}
                value={s.format}
                options={[
                  ["jpeg", "JPG"],
                  ["png", "PNG"],
                  ["webp", "WebP"],
                  ["avif", "AVIF"],
                ]}
                onChange={(format) => patch({ format })}
              />
            )}
            {quality}
            {s.format === "jpeg" && (
              <label className="ws-colour">
                <span>{tr("JPG Background")}</span>
                <input type="color" value={s.colour} onChange={(e) => patch({ colour: e.target.value })} />
              </label>
            )}
          </>
        )}
        {mode === "compress-image" && (
          <p className="fine">
            {tr(
              "PNG optimisation is lossless. Quality changes JPG, WebP and AVIF. We show the actual saving, including when the output grows.",
            )}
          </p>
        )}
        {mode === "convert-image" && (
          <p className="notice">
            {tr(
              "HEIC opens only when your browser can decode it natively. If it cannot, export JPEG from Photos first. Self-contained SVG shapes and text can be rasterised here. Animated files produce one still frame.",
            )}
          </p>
        )}
        {mode === "remove-background" && (
          <>
            <p className="notice">
              {tr(
                "Loads a 4.6 MB Apache-licensed U²-Net model and its local runtime only when you press Remove Background. Requires WebGL in a worker. Inspect edges, fine hair and transparent objects; this is an automatic estimate.",
              )}
            </p>
            {!armed && (
              <button type="button" className="ws-export ws-wide" disabled={!files.length} onClick={() => setArmed(true)}>
                {tr(one ? "Remove Background" : "Remove Backgrounds")}
              </button>
            )}
          </>
        )}
        {mode === "favicon-generator" && (
          <p className="fine">
            {tr(
              "Each image becomes a ZIP with nine PNG sizes from 16 to 512 px, a multi-size ICO, a web manifest and installation notes. Transparent padding keeps the whole image.",
            )}
          </p>
        )}
        <p className="fine">{tr(editor.storage)}</p>
        <p className="fine">
          {tr("Need to inspect image metadata?")} <a href={link("/snitch")}>{tr("Open SNITCH")}</a>.
        </p>
      </div>
      <div className={`output ws-stage iw-stage${drop.dragging ? " is-dropping" : ""}`} {...drop.bind}>
        {notice && (
          <p className="ws-toast" role="alert">
            <span>{tr(notice)}</span>
            <button type="button" aria-label={tr("Close")} onClick={() => setNotice("")}>
              <Icon name="close" />
            </button>
          </p>
        )}
        {!current ? (
          <label className="ws-empty">
            <input
              type="file"
              accept={accept}
              multiple
              onChange={(e) => {
                const list = Array.from(e.target.files ?? []);
                e.target.value = "";
                if (list.length) take(list);
              }}
            />
            <span className="ws-empty-icon" aria-hidden="true">
              <Icon name="add" />
            </span>
            <strong>{tr("Drop images here")}</strong>
            <span>{tr("or choose files from your device. Nothing leaves this browser.")}</span>
          </label>
        ) : (
          <>
            {mode === "crop-image" ? (
              <CropEditor
                key={`${index}:${current.name}:${current.size}`}
                src={beforeUrl}
                s={settingsFor(editor.value, current)}
                onChange={patch}
                result={r ? afterUrl : undefined}
                resultLabel={r ? `${tr("Result")} · ${r.width} × ${r.height}` : undefined}
              />
            ) : mode === "favicon-generator" ? (
              <Favicon src={beforeUrl} />
            ) : (
              <Compare
                key={`${index}:${current.name}:${current.size}`}
                before={beforeUrl}
                after={entry?.result ? afterUrl : ""}
                aspect={entry?.result ? entry.result.width / entry.result.height : 0}
                cover={mode === "resize-image" && settingsFor(editor.value, current).resize === "pixels" && settingsFor(editor.value, current).fit === "cover"}
                labels={[
                  `${tr("Before")} · ${formatBytes(current.size, locale)}`,
                  entry?.result ? `${tr("After")} · ${formatBytes(entry.result.output.size, locale)}` : tr("After"),
                ]}
                state={state}
              />
            )}
            {!one && (
              <ul className="iw-strip" aria-label={tr("Images in this batch")}>
                {files.map((f, i) => (
                  <Tile
                    key={`${i}:${f.name}:${f.size}`}
                    file={f}
                    entry={results.get(f)}
                    fresh={isFresh(f)}
                    on={i === index}
                    working={working === f}
                    change={showChange}
                    onPick={() => setSelected(i)}
                    onRemove={() => remove(i)}
                  />
                ))}
              </ul>
            )}
            <div className="ws-foot">
              <div className="ws-foot-text">
                <strong>
                  {one
                    ? r
                      ? mode === "favicon-generator"
                        ? `${tr("ZIP · 9 PNG sizes, ICO and manifest")} · ${formatBytes(r.output.size, locale)}`
                        : `${whole(r.width)} × ${whole(r.height)} · ${formatBytes(current.size, locale)} → ${formatBytes(r.output.size, locale)}`
                      : current.name
                    : `${files.length} ${tr("images")}${done.length ? ` · ${formatBytes(before, locale)} → ${formatBytes(after, locale)}` : ""}`}
                  {done.length > 0 && showChange && (
                    <em className="ws-change" data-up={change > 0 || undefined}>
                      {percent(change)}
                    </em>
                  )}
                </strong>
                <span role="status">
                  {!armed
                    ? tr("The background model loads when you start.")
                    : paused ? tr("Paused. Finished results are kept.") : finished < files.length
                      ? `${tr("Processing")} ${Math.min(finished + 1, files.length)} / ${files.length}`
                      : failed.length
                        ? `${failed.length} ${tr("could not be processed")}`
                        : saved || tr("Ready. What you see is what you download.")}
                </span>
              </div>
              {!armed ? (
                <button type="button" className="ws-export" onClick={() => setArmed(true)}>
                  {tr(one ? "Remove Background" : "Remove Backgrounds")}
                </button>
              ) : (
                <button
                  type="button"
                  className="ws-export"
                  disabled={saving || (!paused && finished < files.length) || !done.length}
                  onClick={() => void save()}
                >
                  <Icon name="download" />
                  {saving ? tr("Preparing…") : !paused && finished < files.length ? tr("Processing…") : exportLabel}
                </button>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
