import { useLocale, useT } from "../../shared/locale";
import { useEffect, useRef, useState, type CSSProperties } from "react";
import { download, imageFile } from "../../shared/browser";
import { History, useEditor } from "../../shared/kit";
import {
  AddFiles,
  Icon,
  PresetRows,
  Segmented,
  countExport,
  formatBytes,
  stem,
  useElementSize,
  useFileDrop,
  useObjectUrl,
} from "../../shared/workspace";
import {
  markDefaults,
  movePage,
  pageRange,
  pageView,
  stampLayout,
  type PageRef,
  type PdfMarks,
  type PdfMode,
  type PdfSource,
} from "./model";
import { composePdf, imagesPdf, readPdf } from "./process";
import { pageRenderer, pdfImages } from "./render";
import PageGrid from "./PageGrid";
import ExampleButton from "../../shared/ExampleButton";
import { exampleImage, examplePdf } from "../../shared/examples";

type Photo = { id: number; file: File };
type State = {
  sources: PdfSource[];
  pages: PageRef[];
  images: Photo[];
  marks: PdfMarks;
  dpi: number;
  format: "png" | "jpeg";
  size: "a4" | "letter" | "image";
  margin: number;
  each: boolean;
};
const initial: State = {
  sources: [],
  pages: [],
  images: [],
  marks: markDefaults,
  dpi: 150,
  format: "png",
  size: "a4",
  margin: 10,
  each: false,
};
const valid = (v: unknown): v is State => !!v && typeof v === "object" && "pages" in v;
/** One neon per source file, so a merged page always shows where it came from. */
const tints = ["#04D9C4", "#FF6A00", "#FF2D92", "#18E36B"];
const letter = (i: number) => String.fromCharCode(65 + (i % 26));
const verb: Partial<Record<PdfMode, string>> = { "merge-pdf": "merged", "organize-pdf": "organized", "stamp-pdf": "stamped" };
const paper = { a4: [210, 297], letter: [215.9, 279.4] } as const;
type Renderer = ReturnType<typeof pageRenderer>;

function useImageSize(src: string) {
  const [size, setSize] = useState<{ width: number; height: number }>();
  useEffect(() => {
    setSize(undefined);
    if (!src) return;
    let live = true;
    const image = new Image();
    image.onload = () => live && setSize({ width: image.naturalWidth, height: image.naturalHeight });
    image.src = src;
    return () => {
      live = false;
    };
  }, [src]);
  return size;
}

/** The same numbers and stamps the export draws, drawn over the page picture. */
function Marks({
  width,
  height,
  marks,
  index,
  image,
}: {
  width: number;
  height: number;
  marks: PdfMarks;
  index: number;
  image?: { width: number; height: number };
}) {
  const items = stampLayout(width, height, marks, index, marks.image ? image : undefined);
  if (!items.length) return null;
  return (
    <svg className="pdfw-marks" viewBox={`0 0 ${width} ${height}`} aria-hidden="true">
      {items.map((item, i) =>
        item.kind === "text" ? (
          <text
            key={i}
            x={width / 2}
            y={height - item.y}
            fontSize={item.size}
            textAnchor="middle"
            fontFamily="Helvetica, Arial, sans-serif"
            fill="#1f2424"
            opacity={item.opacity}
          >
            {item.text}
          </text>
        ) : (
          <image
            key={i}
            href={marks.image}
            x={item.x}
            y={height - item.y - item.height}
            width={item.width}
            height={item.height}
            opacity={item.opacity}
            preserveAspectRatio="none"
          />
        ),
      )}
    </svg>
  );
}

/** A page picture in a square cell: the picture turns, the stamps stay upright on top. */
function PageSheet({
  source,
  page,
  thumb,
  marks,
  index,
  image,
}: {
  source: PdfSource;
  page: PageRef;
  thumb?: string;
  marks?: PdfMarks;
  index: number;
  image?: { width: number; height: number };
}) {
  const view = pageView(source, page);
  const [w, h] = view.raw;
  const pictured = view.stored % 180 ? [h, w] : [w, h];
  const longest = Math.max(view.width, view.height);
  const box = (a: number, b: number): CSSProperties => ({ width: `${(a / longest) * 100}%`, height: `${(b / longest) * 100}%` });
  return (
    <span className="pdfw-sheet">
      <span className="pdfw-page" style={{ ...box(pictured[0], pictured[1]), transform: `translate(-50%, -50%) rotate(${page.rotation}deg)` }}>
        {thumb ? <img src={thumb} alt="" draggable={false} /> : <i className="pdfw-wait" />}
      </span>
      {marks && index >= 0 && (
        <span className="pdfw-overlay" style={box(view.width, view.height)}>
          <Marks width={view.width} height={view.height} marks={marks} index={index} image={image} />
        </span>
      )}
    </span>
  );
}

/** An image placed on its paper exactly as the PDF will place it: centred, whole, inside the margin. */
function PhotoSheet({ file, size, margin }: { file: File; size: State["size"]; margin: number }) {
  const url = useObjectUrl(file);
  const [ratio, setRatio] = useState(0.75);
  const sheet = size === "image" ? null : paper[size];
  const aspect = sheet ? sheet[0] / sheet[1] : ratio;
  const mx = sheet ? (margin / sheet[0]) * 100 : 0,
    my = sheet ? (margin / sheet[1]) * 100 : 0;
  return (
    <span className="pdfw-sheet">
      <span
        className="pdfw-page pdfw-paper"
        style={{
          width: `${aspect >= 1 ? 100 : aspect * 100}%`,
          height: `${aspect >= 1 ? 100 / aspect : 100}%`,
          transform: "translate(-50%, -50%)",
        }}
      >
        <img
          src={url || undefined}
          alt=""
          draggable={false}
          style={{ left: `${mx}%`, top: `${my}%`, width: `${100 - 2 * mx}%`, height: `${100 - 2 * my}%` }}
          onLoad={(e) => setRatio(e.currentTarget.naturalWidth / e.currentTarget.naturalHeight || 0.75)}
        />
      </span>
    </span>
  );
}

/** Stamp mode: the chosen page large, with the placement shown and chosen on the page itself. */
function Focus({
  source,
  page,
  index,
  count,
  marks,
  image,
  renderer,
  onPosition,
  onStep,
}: {
  source: PdfSource;
  page: PageRef;
  index: number;
  count: number;
  marks: PdfMarks;
  image?: { width: number; height: number };
  renderer: () => Renderer;
  onPosition: (position: PdfMarks["position"]) => void;
  onStep: (by: number) => void;
}) {
  const tr = useT(),
    locale = useLocale();
  const host = useRef<HTMLDivElement>(null);
  const area = useElementSize(host);
  const view = pageView(source, page);
  const [url, setUrl] = useState("");
  useEffect(() => {
    let live = true,
      made = "";
    setUrl("");
    renderer()
      .render(source, page.page, page.rotation, 1600)
      .then((b) => {
        if (!live) return;
        made = URL.createObjectURL(b);
        setUrl(made);
      })
      .catch(() => {});
    return () => {
      live = false;
      if (made) URL.revokeObjectURL(made);
    };
  }, [source, page.page, page.rotation, renderer]);
  const k = Math.max(0, Math.min((area.width - 40) / view.width, (area.height - 70) / view.height));
  const stamped = !!marks.text || !!marks.image;
  const zones: [PdfMarks["position"], string][] = [
    ["top", "Top"],
    ["centre", "Centre"],
    ["bottom", "Bottom"],
  ];
  return (
    <div className="pdfw-focus" ref={host}>
      {k > 0 && (
        <div className="pdfw-focus-page" style={{ width: view.width * k, height: view.height * k }}>
          {url ? <img src={url} alt={`${tr("Page")} ${index + 1}`} draggable={false} /> : <i className="pdfw-wait" />}
          <Marks width={view.width} height={view.height} marks={marks} index={index} image={image} />
          {stamped && (
            <div className="pdfw-zones" role="group" aria-label={tr("Stamp Position")}>
              {zones.map(([zone, name]) => (
                <button
                  key={zone}
                  type="button"
                  aria-pressed={marks.position === zone}
                  aria-label={`${tr("Stamp Position")}: ${tr(name)}`}
                  onClick={() => onPosition(zone)}
                />
              ))}
            </div>
          )}
        </div>
      )}
      <div className="pdfw-focus-nav ws-pill">
        <button type="button" aria-label={tr("Previous page")} disabled={index <= 0} onClick={() => onStep(-1)}>
          <Icon name="earlier" />
        </button>
        <span>
          {locale === "fr" ? `Page ${index + 1} sur ${count}` : `Page ${index + 1} of ${count}`}
        </span>
        <button type="button" aria-label={tr("Next page")} disabled={index >= count - 1} onClick={() => onStep(1)}>
          <Icon name="later" />
        </button>
      </div>
    </div>
  );
}

export default function PdfToolkit({
  mode,
  preset,
}: {
  mode: PdfMode;
  preset?: Partial<Pick<State, "format" | "size" | "dpi" | "margin">>;
}) {
  const tr = useT(),
    locale = useLocale(),
    fr = locale === "fr";
  const editor = useEditor<State>(
    null,
    { ...initial, ...preset, marks: { ...markDefaults, numbers: mode === "stamp-pdf" } },
    valid,
  );
  const state = editor.value,
    { sources, pages, images, marks } = state;
  const patch = (next: Partial<State>) => editor.setValue((current) => ({ ...current, ...next }));
  const mark = (next: Partial<PdfMarks>) => editor.setValue((current) => ({ ...current, marks: { ...current.marks, ...next } }));
  const photos = mode === "images-to-pdf";
  const picking = mode === "split-pdf" || mode === "pdf-to-image";
  const stamping = mode !== "pdf-to-image" && (marks.numbers || !!marks.text || !!marks.image);
  const [picked, setPicked] = useState<Set<number>>(() => new Set());
  const [active, setActive] = useState<number | null>(null);
  const [range, setRange] = useState("");
  const [rangeError, setRangeError] = useState("");
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [progress, setProgress] = useState(0);
  const exportJob = useRef<AbortController | null>(null);
  useEffect(() => () => exportJob.current?.abort(), []);
  useEffect(() => { setRange(""); setRangeError(""); }, [pages]);
  const [notice, setNotice] = useState("");
  const [saved, setSaved] = useState("");
  const [thumbs, setThumbs] = useState<Record<string, string>>({});
  const thumbsRef = useRef(thumbs);
  thumbsRef.current = thumbs;
  const ids = useRef({ source: 0, page: 0, photo: 0 });
  const stage = useRef<HTMLDivElement>(null);
  const rendererRef = useRef<Renderer | null>(null);
  const [renderer] = useState(() => () => (rendererRef.current ??= pageRenderer()));
  const stampImage = useImageSize(marks.image);
  useEffect(
    () => () => {
      rendererRef.current?.destroy();
      for (const url of Object.values(thumbsRef.current)) URL.revokeObjectURL(url);
    },
    [],
  );
  // Thumbnails render one page at a time in the background, the first pages first.
  useEffect(() => {
    let stop = false;
    void (async () => {
      for (const source of sources)
        for (let page = 0; page < source.pages; page++) {
          const key = `${source.id}:${page}`;
          if (stop) return;
          if (thumbsRef.current[key]) continue;
          try {
            const picture = await renderer().render(source, page, 0, 360);
            if (stop) return;
            const url = URL.createObjectURL(picture);
            thumbsRef.current = { ...thumbsRef.current, [key]: url };
            setThumbs(thumbsRef.current);
          } catch {
            // The page keeps its placeholder; export still reads the original.
          }
        }
    })();
    return () => {
      stop = true;
    };
  }, [sources, renderer]);

  const output = picking ? pages.filter((p) => picked.has(p.id)) : pages;
  const outIndex = new Map(output.map((p, i) => [p.id, i]));
  const focus = pages.find((p) => p.id === active) ?? pages[0];
  const focusIndex = focus ? pages.indexOf(focus) : -1;

  async function takePdfs(incoming: File[]) {
    if (loading) return;
    if (
      sources.length + incoming.length > 10 ||
      sources.reduce((n, s) => n + s.size, 0) + incoming.reduce((n, f) => n + f.size, 0) > 100_000_000
    ) {
      setNotice("Choose up to 10 PDFs or 50 images, below 100 MB combined.");
      return;
    }
    setLoading(true);
    setNotice("");
    setSaved("");
    try {
      const next: PdfSource[] = [];
      for (const file of incoming) next.push(await readPdf(file, ids.current.source++));
      if (pages.length + next.reduce((n, s) => n + s.pages, 0) > 200) throw new Error("Use at most 200 pages combined.");
      const added: number[] = [];
      editor.setValue((current) => {
        if (current.sources.length + next.length > 10 || current.sources.reduce((n, s) => n + s.size, 0) + next.reduce((n, s) => n + s.size, 0) > 100_000_000)
          throw new Error("Choose up to 10 PDFs or 50 images, below 100 MB combined.");
        if (current.pages.length + next.reduce((n, s) => n + s.pages, 0) > 200) throw new Error("Use at most 200 pages combined.");
        const offset = current.sources.length;
        const fresh = next.flatMap((source, k) =>
          Array.from({ length: source.pages }, (_, page) => {
            const id = ids.current.page++;
            added.push(id);
            return { id, source: offset + k, page, rotation: 0 };
          }),
        );
        return { ...current, sources: [...current.sources, ...next], pages: [...current.pages, ...fresh] };
      });
      if (picking) setPicked((previous) => new Set([...previous, ...added]));
      if (active === null && added.length) setActive(added[0]);
      setRange("");
    } catch (e) {
      setNotice((e as Error).message);
    } finally {
      setLoading(false);
    }
  }
  function takeImages(incoming: File[]) {
    const next = [...images, ...incoming.map((file) => ({ id: ids.current.photo++, file }))];
    if (next.length > 50 || next.reduce((n, p) => n + p.file.size, 0) > 100_000_000) {
      setNotice("Choose up to 10 PDFs or 50 images, below 100 MB combined.");
      return;
    }
    setNotice("");
    setSaved("");
    patch({ images: next });
  }
  const take = (files: File[]) => { if (!saving && !loading) return photos ? takeImages(files) : void takePdfs(files); };
  const drop = useFileDrop(take);
  const removeSource = (i: number) =>
    editor.setValue((current) => ({
      ...current,
      sources: current.sources.filter((_, n) => n !== i),
      pages: current.pages
        .filter((p) => p.source !== i)
        .map((p) => (p.source > i ? { ...p, source: p.source - 1 } : p)),
    }));
  const movePages = (from: number, to: number) => patch({ pages: movePage(pages, from, to) });
  const turn = (i: number) =>
    patch({ pages: pages.map((p, n) => (n === i ? { ...p, rotation: (p.rotation + 90) % 360 } : p)) });
  const removePage = (i: number) => patch({ pages: pages.filter((_, n) => n !== i) });
  const pickRange = (text: string) => {
    setRange(text);
    try {
      const chosen = pageRange(text, pages.length);
      setPicked(new Set(chosen.map((i) => pages[i].id)));
      setRangeError("");
    } catch (e) {
      setRangeError((e as Error).message);
    }
  };

  async function save() {
    if (exportJob.current) return;
    const controller = new AbortController(); exportJob.current = controller;
    const signal = controller.signal;
    const outputFile: typeof download = (...args) => {
      if (signal.aborted) throw new Error("Cancelled");
      download(...args);
    };
    setSaving(true);
    setProgress(0);
    setSaved("");
    setNotice("");
    try {
      const base = stem(photos ? (images.length === 1 ? images[0].file.name : "images") : sources[0]?.name ?? "document", "document");
      let kind: string;
      if (photos) {
        outputFile(`${base}.pdf`, await imagesPdf(images.map((p) => p.file), state.size, state.margin, signal, setProgress), "application/pdf");
        kind = "Download PDF";
      } else if (mode === "pdf-to-image") {
        const converted = await pdfImages(sources, output, state.dpi, state.format, signal, setProgress);
        const ext = state.format === "jpeg" ? "jpg" : "png";
        if (converted.length === 1) {
          outputFile(`${base}-page-${output[0].page + 1}.${ext}`, converted[0].blob, converted[0].blob.type);
          kind = "Download Page Image";
        } else {
          const { default: JSZip } = await import("jszip");
          const zip = new JSZip();
          for (const [i, image] of converted.entries()) zip.file(`page-${String(i + 1).padStart(3, "0")}.${ext}`, image.blob);
          outputFile(`${base}-pages.zip`, await zip.generateAsync({ type: "blob" }), "application/zip");
          kind = "Download Page Images ZIP";
        }
      } else if (mode === "split-pdf" && state.each) {
        const { default: JSZip } = await import("jszip");
        const zip = new JSZip();
        for (const [i, page] of output.entries()) {
          zip.file(`page-${String(i + 1).padStart(3, "0")}.pdf`, await composePdf(sources, [page], { ...marks, start: marks.start + i }, signal));
          setProgress(i + 1);
        }
        outputFile(`${base}-split.zip`, await zip.generateAsync({ type: "blob" }), "application/zip");
        kind = "Split Into Separate PDFs";
      } else {
        const name = mode === "split-pdf" ? `${base}-pages.pdf` : `${base}-${verb[mode] ?? "edited"}.pdf`;
        outputFile(name, await composePdf(sources, output, marks, signal, setProgress), "application/pdf");
        kind = mode === "split-pdf" ? "Download Selected PDF" : "Download PDF";
      }
      countExport(kind);
      setSaved(fr ? "Téléchargé. Vos originaux restent intacts." : "Downloaded. Your originals are unchanged.");
    } catch (e) {
      setNotice(signal.aborted ? "Export cancelled. Your pages and originals are unchanged." : (e as Error).message);
    } finally {
      exportJob.current = null;
      setSaving(false);
    }
  }

  const first = output[0] ? pageView(sources[output[0].source], output[0]) : null;
  const pixels = (dpi: number) =>
    first ? `${Math.ceil((first.width * dpi) / 72)} × ${Math.ceil((first.height * dpi) / 72)} px` : `${dpi} DPI`;
  const count = photos ? images.length : output.length;
  const ext = state.format === "jpeg" ? "JPG" : "PNG";
  const exportLabel = photos
    ? tr("Download PDF")
    : mode === "pdf-to-image"
      ? count === 1
        ? `${tr("Download")} ${ext}`
        : `${tr("Download ZIP")} · ${count} ${tr("images")}`
      : mode === "split-pdf" && state.each
        ? `${tr("Download ZIP")} · ${count} PDF`
        : tr("Download PDF");
  const summary = photos
    ? `${images.length} ${tr(images.length === 1 ? "page" : "pages")} · ${state.size === "a4" ? "A4" : state.size === "letter" ? "US Letter" : tr("Image size")}`
    : mode === "pdf-to-image"
      ? `${count} ${ext} · ${state.dpi} DPI${first ? ` · ${pixels(state.dpi)}` : ""}`
      : `${count} ${tr(count === 1 ? "page" : "pages")}${sources.length > 1 ? ` ${tr("from")} ${sources.length} ${tr("files")}` : ""}`;

  const marksControls = (
    <>
      <label className="check">
        <input type="checkbox" checked={marks.numbers} onChange={(e) => mark({ numbers: e.target.checked })} />
        {tr("Add Page Numbers")}
      </label>
      {marks.numbers && (
        <label>
          {tr("Start Number")}
          <input type="number" min="0" max="999999" value={marks.start} onChange={(e) => mark({ start: e.target.valueAsNumber })} />
        </label>
      )}
      <label>
        {tr("Stamp Text")}
        <input maxLength={100} placeholder={tr("DRAFT")} value={marks.text} onChange={(e) => mark({ text: e.target.value, image: "" })} />
      </label>
      <Segmented
        label={tr("Stamp Position")}
        value={marks.position}
        options={[
          ["top", tr("Top")],
          ["centre", tr("Centre")],
          ["bottom", tr("Bottom")],
        ]}
        onChange={(position) => mark({ position })}
      />
      <label className="ws-range">
        <span>{tr("Stamp Opacity")}</span>
        <output>{Math.round(marks.opacity * 100)}%</output>
        <input
          type="range"
          min="5"
          max="100"
          value={Math.round(marks.opacity * 100)}
          aria-label={tr("Stamp Opacity")}
          onChange={(e) => mark({ opacity: +e.target.value / 100 })}
        />
      </label>
      <div className="ws-files">
        <AddFiles
          label={tr(marks.image ? "Replace Stamp Image" : "Stamp Image")}
          accept="image/png,image/jpeg"
          onFiles={([file]) =>
            void imageFile(file)
              .then((image) => mark({ image, text: "" }))
              .catch((e: Error) => setNotice(e.message))
          }
        />
        {marks.image && (
          <button type="button" className="ws-quiet" onClick={() => mark({ image: "" })}>
            {tr("Remove Stamp Image")}
          </button>
        )}
      </div>
      <p className="fine">
        {tr(
          "Stamps are visible additions, not secure redactions. Editing creates a new document; existing digital signatures do not carry over.",
        )}
      </p>
    </>
  );

  const pageGrid = (row = false) => (
    <PageGrid
      items={pages}
      keyOf={(p) => p.id}
      stage={stage}
      row={row}
      name={tr("Page Order")}
      label={(p, i) =>
        fr
          ? `Page ${i + 1} : ${sources[p.source]?.name}, page ${p.page + 1}`
          : `Page ${i + 1}: ${sources[p.source]?.name}, page ${p.page + 1}`
      }
      on={(p) => (picking ? picked.has(p.id) : focus?.id === p.id)}
      dim={picking ? (p) => !picked.has(p.id) : undefined}
      onPick={(i) => {
        const id = pages[i].id;
        if (!picking) return setActive(id);
        setRange("");
        setRangeError("");
        setPicked((previous) => {
          const next = new Set(previous);
          if (next.has(id)) next.delete(id);
          else next.add(id);
          return next;
        });
      }}
      onMove={movePages}
      sheet={(p) => (
        <PageSheet
          source={sources[p.source]}
          page={p}
          thumb={thumbs[`${sources[p.source]?.id}:${p.page}`]}
          marks={stamping ? marks : undefined}
          index={outIndex.get(p.id) ?? -1}
          image={stampImage}
        />
      )}
      caption={(p, i) => (
        <>
          <b>{i + 1}</b>
          <span style={{ color: tints[p.source % tints.length] }}>{letter(p.source)}</span>
          {` · p. ${p.page + 1}`}
        </>
      )}
      tools={(p, i) => (
        <>
          <button type="button" aria-label={fr ? `Avancer la page ${i + 1}` : `Move page ${i + 1} earlier`} disabled={i === 0} onClick={() => movePages(i, i - 1)}>
            <Icon name="earlier" />
          </button>
          <button type="button" aria-label={tr(`Rotate page ${i + 1}`)} onClick={() => turn(i)}>
            <Icon name="right" />
          </button>
          <button type="button" aria-label={tr(`Delete page ${i + 1}`)} onClick={() => removePage(i)}>
            <Icon name="delete" />
          </button>
          <button type="button" aria-label={fr ? `Reculer la page ${i + 1}` : `Move page ${i + 1} later`} disabled={i === pages.length - 1} onClick={() => movePages(i, i + 1)}>
            <Icon name="later" />
          </button>
        </>
      )}
    />
  );

  const empty = photos ? !images.length : !pages.length;
  return (
    <section className="workspace pdfw" aria-label={tr("PDF editor")}>
      <History editor={editor} />
      <div className="two-column">
        <div className="controls pdfw-panel" inert={saving || loading}>
          <p className="panel-label">{tr(photos ? "Your Images" : "Files")}</p>
          {!sources.length && !images.length && <ExampleButton onLoad={async () => {
            if (photos) takeImages([exampleImage(locale), exampleImage(locale, 2)]);
            else await takePdfs([await examplePdf(locale)]);
          }} />}
          <p className="fine">{tr("Up to 10 PDFs or 50 images, 100 MB combined and 200 pages. Each PDF must be under 40 MB and unencrypted.")}</p>
          {!photos && sources.length > 0 && (
            <ul className="ws-filelist">
              {sources.map((source, i) => (
                <li key={source.id}>
                  <b style={{ ["--tint" as string]: tints[i % tints.length] }}>{letter(i)}</b>
                  <span>
                    <strong>{source.name}</strong>
                    <small>
                      {source.pages} {tr(source.pages === 1 ? "page" : "pages")} · {formatBytes(source.size, locale)}
                    </small>
                  </span>
                  <button type="button" aria-label={`${tr("Remove")} ${source.name}`} onClick={() => removeSource(i)}>
                    <Icon name="close" />
                  </button>
                </li>
              ))}
            </ul>
          )}
          <div className="ws-files">
            <AddFiles
              label={tr(photos ? (images.length ? "Add More Images" : "Choose Images") : sources.length ? "Add PDFs" : "Choose PDFs")}
              accept={photos ? "image/*,.svg" : ".pdf,application/pdf"}
              multiple
              primary={empty}
              onFiles={take}
            />
            {!empty && (
              <button
                type="button"
                className="ws-quiet"
                onClick={() => {
                  patch({ sources: [], pages: [], images: [] });
                  setPicked(new Set());
                  setActive(null);
                  setSaved("");
                }}
              >
                {tr("Clear All")}
              </button>
            )}
          </div>
          <p className="fine" role="status">
            {loading
              ? tr("Opening files locally…")
              : photos
                ? `${images.length} ${tr("images selected")}`
                : `${sources.length} ${tr("PDF files")} · ${pages.length} ${tr("pages")}`}
          </p>
          {photos && (
            <>
              <p className="panel-label">{tr("Paper Size")}</p>
              <PresetRows
                label={tr("Paper Size")}
                value={state.size}
                onPick={(size) => patch({ size: size as State["size"] })}
                items={[
                  { id: "a4", title: "A4", detail: "The international standard sheet.", meta: "210 × 297 mm" },
                  { id: "letter", title: "US Letter", detail: "The North American standard sheet.", meta: "8.5 × 11 in" },
                  { id: "image", title: "Match Each Image", detail: "Each page takes its image's size at 96 DPI. No margin.", meta: "96 DPI" },
                ]}
              />
              <label className="ws-range">
                <span>{tr("Margin")}</span>
                <output>{state.margin} mm</output>
                <input
                  type="range"
                  min="0"
                  max="50"
                  value={state.margin}
                  disabled={state.size === "image"}
                  aria-label={tr("Margin (mm)")}
                  onChange={(e) => patch({ margin: +e.target.value })}
                />
              </label>
              <p className="fine">{tr("One image per page, centred without cropping. Drag the pages on the stage to set the order.")}</p>
            </>
          )}
          {picking && pages.length > 0 && (
            <>
              <p className="panel-label">{tr("Pages")}</p>
              <label>
                {tr("Pick Pages")}
                <input value={range} placeholder={tr("All pages, or 1, 3-5")} onChange={(e) => pickRange(e.target.value)} />
              </label>
              {rangeError && <p role="alert" className="notice">{tr(rangeError)}</p>}
              <div className="library-actions">{(["Odd Pages", "Even Pages", "Invert Selection"] as const).map((label, action) => <button key={label} type="button" onClick={() => {
                setRange(""); setRangeError(""); setPicked(new Set(pages.filter((p, i) => action === 2 ? !picked.has(p.id) : i % 2 === action).map(p => p.id)));
              }}>{tr(label)}</button>)}</div>
              <p className="fine">{tr("Selected stage pages")}: {pages.map((p, i) => picked.has(p.id) ? i + 1 : null).filter(n => n !== null).join(", ") || tr("None")}</p>
              <p className="fine">
                {tr("Tap pages on the stage to include or leave them out. Numbers follow the order on the stage.")}
              </p>
            </>
          )}
          {mode === "split-pdf" && (
            <>
              <p className="panel-label">{tr("Output")}</p>
              <PresetRows
                label={tr("Output")}
                value={state.each ? "each" : "one"}
                onPick={(id) => patch({ each: id === "each" })}
                items={[
                  { id: "one", title: "One PDF", detail: "The picked pages, in stage order, in one file.", meta: "PDF" },
                  { id: "each", title: "One PDF per Page", detail: "Each picked page as its own PDF, in a ZIP.", meta: "ZIP" },
                ]}
              />
            </>
          )}
          {mode === "pdf-to-image" && (
            <>
              <p className="panel-label">{tr("Image Format")}</p>
              <PresetRows
                label={tr("Image Format")}
                value={state.format}
                onPick={(format) => patch({ format: format as State["format"] })}
                items={[
                  { id: "png", title: "PNG", detail: "Lossless. Sharp text and lines.", meta: "PNG" },
                  { id: "jpeg", title: "JPG", detail: "Smaller files for photos and scans.", meta: "JPG" },
                ]}
              />
              <p className="panel-label">{tr("Resolution")}</p>
              <PresetRows
                label={tr("Resolution")}
                value={String(state.dpi)}
                onPick={(dpi) => patch({ dpi: +dpi })}
                items={[
                  { id: "72", title: "Screen · 72 DPI", detail: "Quick previews and email.", meta: pixels(72) },
                  { id: "96", title: "Web · 96 DPI", detail: "Pages at their on-screen size.", meta: pixels(96) },
                  { id: "150", title: "Documents · 150 DPI", detail: "Clear text for sharing.", meta: pixels(150) },
                  { id: "300", title: "Print · 300 DPI", detail: "Print quality. Large files.", meta: pixels(300) },
                ]}
              />
            </>
          )}
          {mode === "stamp-pdf" && (
            <>
              <p className="panel-label">{tr("Page Numbers and Stamps")}</p>
              {marksControls}
            </>
          )}
          {(mode === "merge-pdf" || mode === "organize-pdf" || mode === "split-pdf") && (
            <details className="ws-more">
              <summary>{tr("Page numbers and stamps")}</summary>
              {marksControls}
            </details>
          )}
          <p className="fine">{tr(editor.storage)}</p>
          <p className="fine">{tr("Keep your originals. Review exported forms, fonts and signatures in your usual reader.")}</p>
        </div>
        <div
          ref={stage}
          className={`output ws-stage pdfw-stage${drop.dragging ? " is-dropping" : ""}${mode === "stamp-pdf" ? " is-focus" : ""}`}
          {...drop.bind}
        >
          {notice && (
            <p className="ws-toast" role="alert">
              <span>{tr(notice)}</span>
              <button type="button" aria-label={tr("Close")} onClick={() => setNotice("")}>
                <Icon name="close" />
              </button>
            </p>
          )}
          {empty ? (
            <label className="ws-empty">
              <input
                type="file"
                multiple
                accept={photos ? "image/*,.svg" : ".pdf,application/pdf"}
                onChange={(e) => {
                  const list = Array.from(e.target.files ?? []);
                  e.target.value = "";
                  if (list.length) take(list);
                }}
              />
              <span className="ws-empty-icon" aria-hidden="true">
                <Icon name="add" />
              </span>
              <strong>{tr(photos ? "A document from your pictures." : "Your pages, in order.")}</strong>
              <span>
                {tr(loading ? "Opening files locally…" : photos ? "Drop images to choose their order and paper size." : "Drop PDFs to preview, arrange and export.")}
              </span>
            </label>
          ) : (
            <>
              <div className="pdfw-bar" inert={saving || loading}>
                {photos ? (
                  <span className="pdfw-count">
                    {images.length} {tr(images.length === 1 ? "image" : "images")}
                  </span>
                ) : (
                  <ul className="pdfw-chips">
                    {sources.map((source, i) => (
                      <li key={source.id} style={{ ["--tint" as string]: tints[i % tints.length] }}>
                        <b>{letter(i)}</b>
                        <span>{source.name}</span>
                      </li>
                    ))}
                  </ul>
                )}
                {picking && (
                  <span className="pdfw-picks">
                    <button type="button" onClick={() => { setRange(""); setRangeError(""); setPicked(new Set(pages.map((p) => p.id))); }}>
                      {tr("Select All")}
                    </button>
                    <button type="button" onClick={() => { setRange(""); setRangeError(""); setPicked(new Set()); }}>
                      {tr("Select None")}
                    </button>
                  </span>
                )}
                <AddFiles
                  label={tr(photos ? "Add Images" : "Add PDFs")}
                  accept={photos ? "image/*,.svg" : ".pdf,application/pdf"}
                  multiple
                  onFiles={take}
                />
              </div>
              {mode === "stamp-pdf" && focus && (
                <Focus
                  source={sources[focus.source]}
                  page={focus}
                  index={focusIndex}
                  count={pages.length}
                  marks={marks}
                  image={stampImage}
                  renderer={renderer}
                  onPosition={(position) => mark({ position })}
                  onStep={(by) => setActive(pages[Math.min(pages.length - 1, Math.max(0, focusIndex + by))].id)}
                />
              )}
              <div className={`pdfw-scroll${mode === "stamp-pdf" ? " is-row" : ""}`} inert={saving || loading}>
                {photos ? (
                  <PageGrid
                    items={images}
                    keyOf={(p) => p.id}
                    stage={stage}
                    name={tr("Page Order")}
                    label={(p, i) => `${tr("Page")} ${i + 1}: ${p.file.name}`}
                    on={() => false}
                    onPick={() => {}}
                    onMove={(from, to) => patch({ images: movePage(images, from, to) })}
                    sheet={(p) => <PhotoSheet file={p.file} size={state.size} margin={state.margin} />}
                    caption={(p, i) => (
                      <>
                        <b>{i + 1}</b>
                        <span className="pdfw-name">{p.file.name}</span>
                      </>
                    )}
                    tools={(_, i) => (
                      <>
                        <button type="button" aria-label={tr(`Earlier image ${i + 1}`)} disabled={i === 0} onClick={() => patch({ images: movePage(images, i, i - 1) })}>
                          <Icon name="earlier" />
                        </button>
                        <button type="button" aria-label={tr(`Remove image ${i + 1}`)} onClick={() => patch({ images: images.filter((_, n) => n !== i) })}>
                          <Icon name="delete" />
                        </button>
                        <button type="button" aria-label={tr(`Later image ${i + 1}`)} disabled={i === images.length - 1} onClick={() => patch({ images: movePage(images, i, i + 1) })}>
                          <Icon name="later" />
                        </button>
                      </>
                    )}
                  />
                ) : (
                  pageGrid(mode === "stamp-pdf")
                )}
              </div>
              {!photos && mode !== "stamp-pdf" && (
                <div className="pdfw-result" aria-label={tr("Result order")}>
                  <span className="pdfw-result-label">{tr("Result")}</span>
                  <ol>
                    {output.map((p, i) => (
                      <li key={p.id}>
                        <PageSheet
                          source={sources[p.source]}
                          page={p}
                          thumb={thumbs[`${sources[p.source]?.id}:${p.page}`]}
                          index={i}
                        />
                        <span>
                          {i + 1}
                          <i style={{ color: tints[p.source % tints.length] }}>
                            {letter(p.source)}
                            {p.page + 1}
                          </i>
                        </span>
                      </li>
                    ))}
                    {!output.length && <li className="pdfw-result-empty">{tr("Pick at least one page.")}</li>}
                  </ol>
                </div>
              )}
              <div className="ws-foot">
                <div className="ws-foot-text">
                  <strong>{summary}</strong>
                  <span role="status">
                    {saving ? `${tr("Preparing Pages")} ${progress}/${count}` : loading ? tr("Opening files locally…") : saved || tr("Nothing is uploaded. The file is made in this browser.")}
                  </span>
                </div>
                {saving && <button type="button" onClick={() => exportJob.current?.abort()}>{tr("Cancel Export")}</button>}
                <button type="button" className="ws-export" disabled={saving || loading || !count || !!rangeError} onClick={() => void save()}>
                  <Icon name="download" />
                  {saving ? tr("Preparing…") : exportLabel}
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </section>
  );
}
