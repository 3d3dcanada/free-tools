import { svgPng, download } from "../../shared/browser";
import { tagSvg, payload, type Tag } from "./model";
export async function qrCanvas(tag: Tag, scale = 1, locale: "en" | "fr" = "en") {
  const width = Math.round(tag.style.size * scale),
    height = Math.round((tag.style.size + (tag.style.frame ? 124 : 0)) * scale);
  if (width * height > 32_000_000)
    throw new Error("Choose a smaller size or lower DPI (32 megapixel limit).");
  const image = new Image();
  image.src = await svgPng(tagSvg(tag, locale), width, height);
  await image.decode();
  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;
  canvas.getContext("2d")!.drawImage(image, 0, 0);
  return canvas;
}
export async function scanQr(tag: Tag) {
  const canvas = await qrCanvas(tag, Math.max(1, 720 / tag.style.size));
  const { default: jsQR } = await import("jsqr");
  const { data } = canvas.getContext("2d")!.getImageData(0, 0, canvas.width, canvas.height);
  return jsQR(data, canvas.width, canvas.height, { inversionAttempts: "attemptBoth" })?.data === payload(tag);
}
export function pngWithDpi(bytes: Uint8Array, dpi: number) {
  const chunk = new Uint8Array(21),
    view = new DataView(chunk.buffer);
  view.setUint32(0, 9);
  chunk.set([112, 72, 89, 115], 4);
  view.setUint32(8, Math.round(dpi / 0.0254));
  view.setUint32(12, Math.round(dpi / 0.0254));
  chunk[16] = 1;
  let crc = 0xffffffff;
  for (const byte of chunk.slice(4, 17)) {
    crc ^= byte;
    for (let j = 0; j < 8; j++) crc = crc & 1 ? 0xedb88320 ^ (crc >>> 1) : crc >>> 1;
  }
  view.setUint32(17, (crc ^ 0xffffffff) >>> 0);
  const out = new Uint8Array(bytes.length + chunk.length);
  out.set(bytes.slice(0, 33));
  out.set(chunk, 33);
  out.set(bytes.slice(33), 54);
  return out;
}
export async function saveQr(tag: Tag, format: string, locale: "en" | "fr" = "en") {
  if (!(await scanQr(tag)))
    throw new Error("Scan check failed. Increase contrast or remove styling before exporting.");
  if (format === "svg") return download("qr-code.svg", tagSvg(tag, locale), "image/svg+xml");
  const canvas = await qrCanvas(tag, format === "png" ? tag.style.dpi / 96 : 2, locale);
  if (format === "png") {
    const blob = await new Promise<Blob>((resolve, reject) =>
      canvas.toBlob((b) => (b ? resolve(b) : reject(new Error("PNG export failed."))), "image/png"),
    );
    return download(
      "qr-code.png",
      pngWithDpi(new Uint8Array(await blob.arrayBuffer()), tag.style.dpi),
      "image/png",
    );
  }
  const w = (tag.style.size * 25.4) / 96,
    h = ((tag.style.size + (tag.style.frame ? 124 : 0)) * 25.4) / 96;
  if (format === "pdf") {
    const { jsPDF } = await import("jspdf");
    const pdf = new jsPDF({
      unit: "mm",
      format: [w, h],
      orientation: w > h ? "landscape" : "portrait",
      compress: true,
    });
    pdf.addImage(canvas.toDataURL("image/png"), "PNG", 0, 0, w, h);
    pdf.save("qr-code.pdf");
    return;
  }
  const data = canvas.getContext("2d")!.getImageData(0, 0, canvas.width, canvas.height).data;
  let pixels = "";
  for (let i = 0; i < data.length; i += 4)
    pixels +=
      [data[i], data[i + 1], data[i + 2]].map((v) => v.toString(16).padStart(2, "0")).join("") +
      (i % 48 === 44 ? "\n" : "");
  const bw = Math.ceil((w * 72) / 25.4),
    bh = Math.ceil((h * 72) / 25.4);
  download(
    "qr-code.eps",
    `%!PS-Adobe-3.0 EPSF-3.0\n%%BoundingBox: 0 0 ${bw} ${bh}\n%%Title: Static QR\n${bw} ${bh} scale\n/picstr ${canvas.width * 3} string def\n${canvas.width} ${canvas.height} 8\n[${canvas.width} 0 0 -${canvas.height} 0 ${canvas.height}]\n{currentfile picstr readhexstring pop} false 3 colorimage\n${pixels}\nshowpage\n%%EOF\n`,
    "application/postscript",
  );
}
