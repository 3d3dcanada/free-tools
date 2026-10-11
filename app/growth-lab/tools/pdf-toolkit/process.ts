import { stampLayout, type PageRef, type PdfMarks, type PdfSource } from "./model";
export async function readPdf(file: File, id = 0): Promise<PdfSource> {
  if (file.size > 40_000_000) throw new Error("Each PDF must be below 40 MB.");
  const bytes = new Uint8Array(await file.arrayBuffer());
  if (!new TextDecoder().decode(bytes.slice(0, 1024)).includes("%PDF-"))
    throw new Error(`${file.name} is not a PDF.`);
  const { PDFDocument } = await import("pdf-lib");
  let doc;
  try {
    doc = await PDFDocument.load(bytes, { updateMetadata: false });
  } catch {
    throw new Error(`${file.name} could not be opened. Use a valid PDF without password protection.`);
  }
  if (doc.getPageCount() < 1 || doc.getPageCount() > 200) throw new Error("Use PDFs with 1 to 200 pages.");
  const sizes = doc.getPages().map((page) => {
    const box = page.getCropBox();
    return [box.width, box.height, ((page.getRotation().angle % 360) + 360) % 360] as [number, number, number];
  });
  return { id, name: file.name, bytes, pages: doc.getPageCount(), size: file.size, sizes };
}
export async function composePdf(sources: PdfSource[], pages: PageRef[], marks: PdfMarks, signal?: AbortSignal, progress?: (done: number) => void) {
  if (!pages.length || pages.length > 200) throw new Error("Keep 1 to 200 pages in the output.");
  if (
    !Number.isInteger(marks.start) ||
    marks.start < 0 ||
    marks.start > 999999 ||
    !Number.isFinite(marks.opacity) ||
    marks.opacity < 0.05 ||
    marks.opacity > 1 ||
    marks.text.length > 100
  )
    throw new Error("Check numbering, stamp text and opacity.");
  if (marks.image && !/^data:image\/(png|jpeg);base64,[A-Za-z0-9+/=]+$/.test(marks.image))
    throw new Error("Use a local PNG or JPEG stamp.");
  const { PDFDocument, StandardFonts, degrees, rgb } = await import("pdf-lib");
  const output = await PDFDocument.create();
  const documents = new Map<number, Awaited<ReturnType<typeof PDFDocument.load>>>();
  const font = marks.numbers || marks.text ? await output.embedFont(StandardFonts.Helvetica) : undefined;
  const image = marks.image
    ? await (marks.image.startsWith("data:image/png")
        ? output.embedPng(marks.image)
        : output.embedJpg(marks.image))
    : undefined;
  for (const [index, ref] of pages.entries()) {
    if (signal?.aborted) throw new Error("Cancelled");
    if (
      !sources[ref.source] ||
      !Number.isInteger(ref.page) ||
      ref.page < 0 ||
      ref.page >= sources[ref.source].pages ||
      ![0, 90, 180, 270].includes(ref.rotation)
    )
      throw new Error("Page selection is invalid.");
    if (!documents.has(ref.source))
      documents.set(ref.source, await PDFDocument.load(sources[ref.source].bytes, { updateMetadata: false }));
    const [page] = await output.copyPages(documents.get(ref.source)!, [ref.page]);
    output.addPage(page);
    const rotation = (((page.getRotation().angle + ref.rotation) % 360) + 360) % 360;
    page.setRotation(degrees(rotation));
    const box = page.getCropBox(),
      w = box.width,
      h = box.height;
    const vw = rotation % 180 ? h : w,
      vh = rotation % 180 ? w : h;
    const at = (x: number, y: number) => {
      const [px, py] =
        rotation === 90
          ? [w - y, x]
          : rotation === 180
            ? [w - x, h - y]
            : rotation === 270
              ? [y, h - x]
              : [x, y];
      return { x: box.x + px, y: box.y + py, rotate: degrees(rotation) };
    };
    const drawText = (text: string, size: number, y: number, opacity: number) => {
      const width = font!.widthOfTextAtSize(text, size);
      if (width > vw - 16) throw new Error("Stamp text is too wide for this page. Shorten it.");
      page.drawText(text, { ...at((vw - width) / 2, y), size, font, color: rgb(0.12, 0.14, 0.14), opacity });
    };
    for (const item of stampLayout(vw, vh, marks, index, image)) {
      if (item.kind === "text") drawText(item.text, item.size, item.y, item.opacity);
      else page.drawImage(image!, { ...at(item.x, item.y), width: item.width, height: item.height, opacity: item.opacity });
    }
    progress?.(index + 1);
    if (signal) await new Promise(resolve => setTimeout(resolve, 0));
  }
  if (signal?.aborted) throw new Error("Cancelled");
  output.setProducer("3D3D Free PDF Tools");
  return new Uint8Array(await output.save());
}
export async function imagesPdf(files: File[], size: "a4" | "letter" | "image", margin: number, signal?: AbortSignal, progress?: (done: number) => void) {
  if (!files.length || files.length > 50 || !Number.isFinite(margin) || margin < 0 || margin > 50)
    throw new Error("Choose up to 50 images and a margin between 0 and 50 mm.");
  const [{ PDFDocument }, { decodeImage, canvas, blob }] = await Promise.all([
    import("pdf-lib"),
    import("../image-toolkit/process"),
  ]);
  const pdf = await PDFDocument.create();
  for (const file of files) {
    if (signal?.aborted) throw new Error("Cancelled");
    const image = await decodeImage(file),
      c = canvas(image.naturalWidth, image.naturalHeight);
    c.getContext("2d")!.drawImage(image, 0, 0);
    // photos stay JPEG (the canvas has already applied the EXIF turn). As PNG,
    // three phone photos made a 25 MB PDF. Anything that may carry transparency stays PNG.
    const photo = /^image\/(jpeg|heic|heif)$/.test(file.type) || /\.(jpe?g|heic|heif)$/i.test(file.name);
    const embedded = photo
      ? await pdf.embedJpg(await (await blob(c, "jpeg", 92)).arrayBuffer())
      : await pdf.embedPng(await (await blob(c)).arrayBuffer());
    const [w, h] =
      size === "a4"
        ? [595.2756, 841.8898]
        : size === "letter"
          ? [612, 792]
          : [c.width * 0.75, c.height * 0.75];
    c.width = c.height = 1;
    const m = size === "image" ? 0 : (margin * 72) / 25.4;
    const scale = Math.min((w - m * 2) / embedded.width, (h - m * 2) / embedded.height);
    const page = pdf.addPage([w, h]);
    page.drawImage(embedded, {
      x: (w - embedded.width * scale) / 2,
      y: (h - embedded.height * scale) / 2,
      width: embedded.width * scale,
      height: embedded.height * scale,
    });
    progress?.(pdf.getPageCount());
    if (signal) await new Promise(resolve => setTimeout(resolve, 0));
  }
  if (signal?.aborted) throw new Error("Cancelled");
  return new Uint8Array(await pdf.save());
}
