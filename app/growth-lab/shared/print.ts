import { download, svgPng } from "./browser";
export type PrintOptions = {
  width: number;
  height: number;
  bleed: number;
  marks: boolean;
  background: string;
  name: string;
};
export async function printPdf(pages: string[], options: PrintOptions) {
  const { width: w, height: h, bleed, marks, background, name } = options;
  if (
    ![w, h, bleed].every(Number.isFinite) ||
    w <= 0 ||
    h <= 0 ||
    w > 2000 ||
    h > 2000 ||
    bleed < 0 ||
    bleed > 10 ||
    !pages.length ||
    pages.length > 100
  )
    throw new Error("Invalid print dimensions.");
  const margin = bleed + (marks ? 5 : 0),
    width = w + margin * 2,
    height = h + margin * 2;
  const { jsPDF } = await import("jspdf");
  const pdf = new jsPDF({
    unit: "mm",
    format: [width, height],
    orientation: width > height ? "landscape" : "portrait",
    compress: true,
  });
  for (const [i, svg] of pages.entries()) {
    if (i) pdf.addPage([width, height], width > height ? "landscape" : "portrait");
    const view = svg.match(/viewBox="0 0 ([\d.]+) ([\d.]+)"/);
    if (!view) throw new Error("Artwork needs a measurable viewBox.");
    const vx = +view[1],
      vy = +view[2],
      bx = (bleed * vx) / w,
      by = (bleed * vy) / h;
    // Extend the paper beyond trim without scaling the layout or its quiet zones.
    const extended = svg
      .replace(/width="[\d.]+" height="[\d.]+"/, `width="${vx + bx * 2}" height="${vy + by * 2}"`)
      .replace(view[0], `viewBox="${-bx} ${-by} ${vx + bx * 2} ${vy + by * 2}"`)
      .replace(
        /(<svg[^>]*>)/,
        `$1<rect x="${-bx}" y="${-by}" width="${vx + bx * 2}" height="${vy + by * 2}" fill="${background}"/>`,
      );
    const pixelsW = Math.round(((w + bleed * 2) * 300) / 25.4),
      pixelsH = Math.round(((h + bleed * 2) * 300) / 25.4);
    if (pixelsW * pixelsH > 45_000_000)
      throw new Error("This print size exceeds the 45 megapixel export limit.");
    pdf.addImage(
      await svgPng(extended, pixelsW, pixelsH),
      "PNG",
      margin - bleed,
      margin - bleed,
      w + bleed * 2,
      h + bleed * 2,
    );
    if (marks) {
      pdf.setDrawColor(40);
      pdf.setLineWidth(0.2);
      for (const x of [margin, margin + w])
        for (const y of [margin, margin + h]) {
          const dx = x === margin ? -1 : 1,
            dy = y === margin ? -1 : 1;
          pdf.line(x + dx * (bleed + 1), y, x + dx * (bleed + 4), y);
          pdf.line(x, y + dy * (bleed + 1), x, y + dy * (bleed + 4));
        }
    }
  }
  const { PDFDocument } = await import("pdf-lib");
  const doc = await PDFDocument.load(pdf.output("arraybuffer"));
  const pt = 72 / 25.4;
  for (const page of doc.getPages()) {
    page.setTrimBox(margin * pt, margin * pt, w * pt, h * pt);
    page.setBleedBox(
      (margin - bleed) * pt,
      (margin - bleed) * pt,
      (w + bleed * 2) * pt,
      (h + bleed * 2) * pt,
    );
  }
  doc.setTitle(name);
  download(name + ".pdf", new Uint8Array(await doc.save()), "application/pdf");
}
