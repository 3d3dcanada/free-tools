import type { Locale } from "../seo/guide";

/** Small local fixtures, clearly labelled; no network request or customer data. */
export function exampleImage(locale: Locale, number = 1) {
  const label = locale === "fr" ? "IMAGE EXEMPLE" : "SAMPLE IMAGE";
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="1000" height="700" viewBox="0 0 1000 700"><rect width="1000" height="700" fill="#f4f1ea"/><rect x="80" y="80" width="840" height="540" rx="30" fill="${number % 2 ? "#04d9c4" : "#ffb479"}"/><circle cx="740" cy="270" r="110" fill="#202523"/><rect x="140" y="220" width="300" height="30" fill="#202523"/><rect x="140" y="280" width="210" height="16" fill="#202523"/><text x="140" y="500" font-family="sans-serif" font-weight="700" font-size="38" fill="#202523">${label} ${number}</text></svg>`;
  return new File([svg], `sample-image-${number}.svg`, { type: "image/svg+xml" });
}

export async function examplePdf(locale: Locale) {
  const { PDFDocument, StandardFonts, rgb } = await import("pdf-lib");
  const pdf = await PDFDocument.create();
  const font = await pdf.embedFont(StandardFonts.Helvetica);
  for (let n = 1; n <= 3; n++) {
    const page = pdf.addPage([595.28, 841.89]);
    page.drawRectangle({ x: 40, y: 670, width: 515, height: 120, color: rgb(0.02, 0.85, 0.77) });
    page.drawText(locale === "fr" ? `Document exemple : page ${n}` : `Sample document: page ${n}`, { x: 60, y: 720, size: 24, font });
    page.drawText(locale === "fr" ? "Essayez la selection, l'ordre, la rotation et les numeros." : "Try selecting, reordering, rotating and numbering pages.", { x: 60, y: 600, size: 14, font });
    page.drawText(String(n), { x: 280, y: 370, size: 100, font });
  }
  pdf.setTitle(locale === "fr" ? "Document exemple" : "Sample document");
  return new File([new Uint8Array(await pdf.save())], "sample-three-pages.pdf", { type: "application/pdf" });
}
