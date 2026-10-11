import {
  cropRect,
  dimensions,
  ico,
  resizeDimensions,
  safeSvg,
  validateSettings,
  type ImageMode,
  type ImageSettings,
} from "./model";
import type { CodecJob } from "./codec.worker";
export type Codec = (job: CodecJob) => Promise<Uint8Array<ArrayBuffer>>;
export function canvas(width: number, height: number) {
  dimensions(width, height);
  const c = document.createElement("canvas");
  c.width = width;
  c.height = height;
  return c;
}
export function blob(c: HTMLCanvasElement, format = "png", quality = 80): Promise<Blob> {
  return new Promise((resolve, reject) =>
    c.toBlob(
      (b) => {
        if (!b || b.type !== `image/${format}`)
          reject(new Error(`This browser cannot encode ${format}. Choose PNG or AVIF.`));
        else resolve(b);
      },
      `image/${format}`,
      quality / 100,
    ),
  );
}
export async function decodeImage(file: File) {
  if (file.size > 40_000_000) throw new Error("Each image must be below 40 MB.");
  let source: Blob = file;
  if (/\.svg$/i.test(file.name) || file.type === "image/svg+xml")
    source = new Blob([safeSvg(await file.text())], { type: "image/svg+xml" });
  const url = URL.createObjectURL(source);
  try {
    const image = new Image();
    image.src = url;
    try {
      await image.decode();
    } catch {
      throw new Error(
        "This browser cannot decode that image. HEIC works only in browsers with native HEIC support; export a JPEG on your device first.",
      );
    }
    dimensions(image.naturalWidth, image.naturalHeight);
    return image;
  } finally {
    URL.revokeObjectURL(url);
  }
}
export async function processImage(file: File, mode: ImageMode, s: ImageSettings, codec: Codec) {
  validateSettings(s);
  const image = await decodeImage(file);
  const w = image.naturalWidth,
    h = image.naturalHeight;
  let [ow, oh] = mode === "resize-image" ? resizeDimensions(w, h, s) : [w, h];
  const crop = mode === "crop-image" ? cropRect(w, h, s) : { x: 0, y: 0, width: w, height: h };
  if (mode === "crop-image") {
    ow = Math.max(1, Math.round(crop.width));
    oh = Math.max(1, Math.round(crop.height));
    if (s.rotation % 180) [ow, oh] = [oh, ow];
  }
  const c = canvas(ow, oh),
    ctx = c.getContext("2d", { willReadFrequently: true })!;
  if (mode === "resize-image" && s.resize === "pixels" && s.fit === "cover") {
    const scale = Math.max(ow / w, oh / h);
    ctx.drawImage(image, (ow - w * scale) / 2, (oh - h * scale) / 2, w * scale, h * scale);
  } else if (mode === "crop-image") {
    ctx.translate(ow / 2, oh / 2);
    ctx.rotate((s.rotation * Math.PI) / 180);
    ctx.scale(s.flipX ? -1 : 1, s.flipY ? -1 : 1);
    ctx.drawImage(
      image,
      crop.x,
      crop.y,
      crop.width,
      crop.height,
      -crop.width / 2,
      -crop.height / 2,
      crop.width,
      crop.height,
    );
    ctx.resetTransform();
  } else ctx.drawImage(image, 0, 0, ow, oh);
  if (mode === "rounded-image") {
    const original = canvas(ow, oh);
    original.getContext("2d")!.drawImage(c, 0, 0);
    ctx.clearRect(0, 0, ow, oh);
    ctx.save();
    ctx.beginPath();
    ctx.roundRect(0, 0, ow, oh, (Math.min(ow, oh) * s.radius) / 100);
    ctx.clip();
    ctx.drawImage(original, 0, 0);
    if (s.border) {
      ctx.lineWidth = s.border * 2;
      ctx.strokeStyle = s.colour;
      ctx.stroke();
    }
    ctx.restore();
    original.width = original.height = 1;
  }
  if (mode === "remove-background") {
    const small = canvas(320, 320),
      sc = small.getContext("2d", { willReadFrequently: true })!;
    sc.fillStyle = "white";
    sc.fillRect(0, 0, 320, 320);
    sc.drawImage(image, 0, 0, 320, 320);
    const mask = await codec({
      kind: "mask",
      width: 320,
      height: 320,
      pixels: sc.getImageData(0, 0, 320, 320).data,
      quality: 100,
    });
    const rgba = sc.createImageData(320, 320);
    for (let i = 0; i < mask.length; i++) {
      rgba.data[i * 4 + 3] = mask[i];
    }
    sc.putImageData(rgba, 0, 0);
    ctx.globalCompositeOperation = "destination-in";
    ctx.drawImage(small, 0, 0, ow, oh);
    ctx.globalCompositeOperation = "source-over";
    small.width = small.height = 1;
  }
  const format = ["rounded-image", "remove-background", "favicon-generator"].includes(mode)
    ? "png"
    : s.format;
  if (format === "jpeg") {
    ctx.globalCompositeOperation = "destination-over";
    ctx.fillStyle = s.colour;
    ctx.fillRect(0, 0, ow, oh);
    ctx.globalCompositeOperation = "source-over";
  }
  let output: Blob;
  if (mode === "favicon-generator") {
    const { default: JSZip } = await import("jszip");
    const zip = new JSZip();
    const pngs: { size: number; bytes: Uint8Array<ArrayBuffer> }[] = [];
    for (const size of [16, 32, 48, 64, 128, 180, 192, 256, 512]) {
      const icon = canvas(size, size),
        ic = icon.getContext("2d")!;
      const scale = Math.min(size / w, size / h);
      ic.drawImage(image, (size - w * scale) / 2, (size - h * scale) / 2, w * scale, h * scale);
      const bytes = new Uint8Array(await (await blob(icon)).arrayBuffer());
      zip.file(`icon-${size}.png`, bytes);
      if ([16, 32, 48, 256].includes(size)) pngs.push({ size, bytes });
      icon.width = icon.height = 1;
    }
    zip.file("favicon.ico", ico(pngs));
    zip.file(
      "site.webmanifest",
      JSON.stringify(
        {
          name: "Your site",
          short_name: "Your site",
          start_url: "/",
          display: "standalone",
          icons: [192, 512].map((size) => ({
            src: `icon-${size}.png`,
            sizes: `${size}x${size}`,
            type: "image/png",
            purpose: "any",
          })),
        },
        null,
        2,
      ),
    );
    zip.file(
      "README.txt",
      'Rename Your site in site.webmanifest. Copy these files to your site root. Add <link rel="icon" href="/favicon.ico">, <link rel="apple-touch-icon" href="/icon-180.png"> and <link rel="manifest" href="/site.webmanifest"> in your HTML head. These icons preserve the full image with transparent padding; review at 16 pixels.',
    );
    output = await zip.generateAsync({ type: "blob" });
  } else if (format === "avif" || (format === "png" && mode === "compress-image")) {
    output = new Blob(
      [
        await codec({
          kind: format,
          pixels: ctx.getImageData(0, 0, ow, oh).data,
          width: ow,
          height: oh,
          quality: s.quality,
        }),
      ],
      { type: `image/${format}` },
    );
  } else output = await blob(c, format, s.quality);
  const preview = mode === "favicon-generator" ? await blob(c) : output;
  c.width = c.height = 1;
  return {
    output,
    preview,
    width: ow,
    height: oh,
    originalWidth: w,
    originalHeight: h,
    extension: mode === "favicon-generator" ? "zip" : format === "jpeg" ? "jpg" : format,
  };
}
