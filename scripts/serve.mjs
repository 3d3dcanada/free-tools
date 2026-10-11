#!/usr/bin/env node
/**
 * A small static file server for build/client, with the behaviour of an ordinary static host:
 * `/tools/qr-code` is `tools/qr-code/index.html`, `/x.data` is a file, anything else is 404.html.
 *
 *   node scripts/serve.mjs [port]      (default 4190)
 */
import { createServer } from "node:http";
import { readFile, stat } from "node:fs/promises";
import { extname, join, normalize, resolve } from "node:path";

const root = resolve("build/client");
const port = Number(process.argv[2] ?? 4190);
const types = {
  ".html": "text/html; charset=utf-8", ".js": "text/javascript", ".mjs": "text/javascript", ".css": "text/css",
  ".json": "application/json", ".svg": "image/svg+xml", ".wasm": "application/wasm", ".onnx": "application/octet-stream",
  ".woff2": "font/woff2", ".txt": "text/plain; charset=utf-8", ".data": "text/x-script", ".png": "image/png",
  ".jpg": "image/jpeg", ".webp": "image/webp", ".ico": "image/x-icon",
};

async function find(pathname) {
  const clean = normalize(decodeURIComponent(pathname)).replace(/^(\.\.[/\\])+/, "");
  for (const candidate of [clean, join(clean, "index.html")]) {
    const file = join(root, candidate);
    if (!file.startsWith(root)) continue;
    try {
      if ((await stat(file)).isFile()) return file;
    } catch {}
  }
  return null;
}

createServer(async (req, res) => {
  const { pathname } = new URL(req.url ?? "/", "http://localhost");
  const file = await find(pathname);
  const target = file ?? join(root, "404.html");
  try {
    const body = await readFile(target);
    res.writeHead(file ? 200 : 404, { "content-type": types[extname(target)] ?? "application/octet-stream" });
    res.end(body);
  } catch {
    res.writeHead(404).end("Not found");
  }
}).listen(port, "127.0.0.1", () => console.log(`http://127.0.0.1:${port}/`));
