import { reactRouter } from "@react-router/dev/vite";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [reactRouter()],
  // Run in the app's own port range so it does not fight another dev server.
  server: { port: 5190 },
  preview: { port: 4190 },
  build: {
    // The tools lazy-load large codecs (AVIF, OxiPNG, ONNX, three); those chunks are expected to be big.
    chunkSizeWarningLimit: 4096,
  },
});
