import avifWasm from "@jsquash/avif/codec/enc/avif_enc.wasm?url";
import pngWasm from "@jsquash/oxipng/codec/pkg/squoosh_oxipng_bg.wasm?url";
import type { InferenceSession } from "onnxruntime-web/webgl";
export type CodecJob = {
  kind: "avif" | "png" | "mask";
  width: number;
  height: number;
  pixels: Uint8ClampedArray;
  quality: number;
};
let session: InferenceSession | undefined;
let avif: Awaited<ReturnType<(typeof import("@jsquash/avif/codec/enc/avif_enc.js"))["default"]>> | undefined;
let pngReady = false;
self.onmessage = async ({ data: job }: MessageEvent<CodecJob>) => {
  try {
    const { kind, width, height, pixels, quality } = job;
    if (width * height * 4 !== pixels.length || width * height > 24_000_000)
      throw new Error("Invalid image dimensions.");
    let bytes: Uint8Array;
    if (kind === "avif") {
      const [{ default: init }, { defaultOptions }] = await Promise.all([
        import("@jsquash/avif/codec/enc/avif_enc.js"),
        import("@jsquash/avif/meta.js"),
      ]);
      avif ??= await init({ locateFile: () => avifWasm });
      const encoded = avif.encode(pixels, width, height, { ...defaultOptions, quality, speed: 8 });
      if (!encoded) throw new Error("AVIF encoding failed.");
      bytes = new Uint8Array(encoded);
    } else if (kind === "png") {
      const codec = await import("@jsquash/oxipng/codec/pkg/squoosh_oxipng.js");
      if (!pngReady) {
        await codec.default(pngWasm);
        pngReady = true;
      }
      bytes = new Uint8Array(codec.optimise_raw(pixels, width, height, 2, false, false));
    } else {
      if (width !== 320 || height !== 320) throw new Error("The mask input must be 320 × 320.");
      // The WebGL-only build is JS/shaders; the native WASM build includes MPL Eigen.
      const ort = await import("onnxruntime-web/webgl");
      ort.env.webgl.pack = true;
      session ??= await ort.InferenceSession.create("/models/u2netp-webgl.onnx", {
        executionProviders: ["webgl"],
      });
      let maximum = 1;
      for (let i = 0; i < pixels.length; i += 4)
        maximum = Math.max(maximum, pixels[i], pixels[i + 1], pixels[i + 2]);
      const input = new Float32Array(3 * width * height);
      const mean = [0.485, 0.456, 0.406],
        std = [0.229, 0.224, 0.225];
      for (let i = 0; i < width * height; i++)
        for (let c = 0; c < 3; c++)
          input[c * width * height + i] = (pixels[i * 4 + c] / maximum - mean[c]) / std[c];
      const tensor = new ort.Tensor("float32", input, [1, 3, height, width]);
      const output = await session.run({ [session.inputNames[0]]: tensor });
      const mask = output[session.outputNames[0]].data as Float32Array;
      let min = Infinity,
        max = -Infinity;
      for (const n of mask) {
        min = Math.min(min, n);
        max = Math.max(max, n);
      }
      bytes = new Uint8Array(width * height);
      for (let i = 0; i < bytes.length; i++)
        bytes[i] = max > min ? Math.round(((mask[i] - min) / (max - min)) * 255) : 255;
      tensor.dispose();
      for (const value of Object.values(output)) value.dispose();
    }
    self.postMessage({ bytes }, { transfer: [bytes.buffer] });
  } catch (e) {
    self.postMessage({ error: (e as Error).message });
  }
};
