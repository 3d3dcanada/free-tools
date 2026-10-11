import workerUrl from "pdfjs-dist/build/pdf.worker.min.mjs?url";
import { canvas, blob } from "../image-toolkit/process";
import type { PageRef, PdfSource } from "./model";
const documentOptions = {
  enableXfa: false,
  cMapUrl: "/pdf-assets/cmaps/",
  cMapPacked: true,
  standardFontDataUrl: "/pdf-assets/standard_fonts/",
  wasmUrl: "/pdf-assets/wasm/",
  iccUrl: "/pdf-assets/iccs/",
  useSystemFonts: false,
  maxImageSize: 24_000_000,
  canvasMaxAreaInBytes: 96_000_000,
  stopAtErrors: true,
};
const library = () =>
  import("pdfjs-dist").then((pdfjs) => {
    pdfjs.GlobalWorkerOptions.workerSrc = workerUrl;
    return pdfjs;
  });
export async function pdfImages(
  sources: PdfSource[],
  pages: PageRef[],
  dpi: number,
  format: "png" | "jpeg",
  signal?: AbortSignal,
  progress?: (done: number) => void,
) {
  if (![72, 96, 150, 300].includes(dpi) || pages.length > 200)
    throw new Error("Choose a supported resolution and at most 200 pages.");
  const pdfjs = await library();
  const documents = new Map<number, ReturnType<typeof pdfjs.getDocument>>();
  const stop = () => {
    for (const task of documents.values()) void task.destroy();
  };
  signal?.addEventListener("abort", stop, { once: true });
  const images: { blob: Blob; width: number; height: number }[] = [];
  try {
    for (const ref of pages) {
      if (signal?.aborted) throw new Error("Cancelled");
      let task = documents.get(ref.source);
      if (!task) {
        task = pdfjs.getDocument({ ...documentOptions, data: sources[ref.source].bytes.slice() });
        documents.set(ref.source, task);
      }
      const document = await task.promise,
        page = await document.getPage(ref.page + 1);
      const viewport = page.getViewport({ scale: dpi / 72, rotation: (page.rotate + ref.rotation) % 360 });
      // A mathematically integral extent can arrive as 500.00000000000006.
      const c = canvas(Math.ceil(viewport.width - 1e-7), Math.ceil(viewport.height - 1e-7));
      try {
        await page.render({
          canvas: c,
          viewport,
          background: "white",
          annotationMode: pdfjs.AnnotationMode.ENABLE,
        }).promise;
        images.push({ blob: await blob(c, format, 90), width: c.width, height: c.height });
        progress?.(images.length);
      } finally {
        c.width = c.height = 1;
        page.cleanup();
      }
    }
    return images;
  } finally {
    signal?.removeEventListener("abort", stop);
    await Promise.all([...documents.values()].map((task) => task.destroy()));
  }
}

type Task = ReturnType<Awaited<ReturnType<typeof library>>["getDocument"]>;
/**
 * page pictures for the workspace. Documents stay open while the
 * workspace lives, so thumbnails and the large page share one parse.
 */
export function pageRenderer() {
  let pdfjs: ReturnType<typeof library> | undefined;
  const open = new Map<PdfSource, Task>();
  return {
    /** A JPEG of one page whose longer side is `longSide` pixels, turned by `rotation` on top of its stored turn. */
    async render(source: PdfSource, index: number, rotation: number, longSide: number) {
      const lib = await (pdfjs ??= library());
      let task = open.get(source);
      if (!task) {
        task = lib.getDocument({ ...documentOptions, data: source.bytes.slice() });
        open.set(source, task);
      }
      const page = await (await task.promise).getPage(index + 1);
      const turn = (page.rotate + rotation) % 360;
      const base = page.getViewport({ scale: 1, rotation: turn });
      const viewport = page.getViewport({ scale: longSide / Math.max(base.width, base.height), rotation: turn });
      const c = canvas(Math.max(1, Math.ceil(viewport.width - 1e-7)), Math.max(1, Math.ceil(viewport.height - 1e-7)));
      try {
        await page.render({ canvas: c, viewport, background: "white", annotationMode: lib.AnnotationMode.ENABLE })
          .promise;
        return await blob(c, "jpeg", 85);
      } finally {
        c.width = c.height = 1;
        page.cleanup();
      }
    },
    destroy() {
      for (const task of open.values()) void task.destroy();
      open.clear();
    },
  };
}
