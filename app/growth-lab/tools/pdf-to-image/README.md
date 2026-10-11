# PDF Pages to Images

> Choose a raster format and resolution for selected PDF pages.

![pdf-to-image](../../../../docs/screenshots/pdf-to-image.jpg)

## What it does

Convert PDF pages to PNG or JPG for free in your browser without uploading the document. Choose pages and a resolution from 72 to 300 DPI, then download an ordered ZIP of rendered images. Each image represents a whole page on a white background; it does not extract the original photographs or retain editable PDF text.

## How to use it

1. Select the PDF and identify the pages to render. Use the page list and range field to include only the necessary material. Check orientation before export, since each result follows the page’s current rotation.
2. Choose PNG for a lossless raster encoding or JPG for a photographic delivery copy when accepted by the destination. Neither choice preserves vector paths or live PDF text. Compare a representative page when the best format is uncertain.
3. Set the resolution to 72, 96, 150 or 300 DPI according to the required pixel size. Higher values produce more pixels and use more memory. Start with a small selection when the document contains large-format drawings or many pages.
4. Download the image ZIP, unpack it and open several actual files. Confirm dimensions, page order, fine lettering and the beginning and end of the selection. Keep the PDF source as the document master alongside the rendered delivery copies.

## In this repository

- Route: `/tools/pdf-to-image` and `/fr/tools/pdf-to-image` (French). The page is `route.tsx` / `route.fr.tsx` in this folder.
- The editor is in [`../pdf-toolkit/`](../pdf-toolkit/), shared with: `images-to-pdf`, `jpg-to-pdf`, `merge-pdf`, `organize-pdf`, `pdf-to-jpg`, `split-pdf`, `stamp-pdf`.
- Guide text: [`../../seo/content/pdf-to-image.en.ts`](../../seo/content/pdf-to-image.en.ts) and `pdf-to-image.fr.ts`.

## Your files

The tool runs in the page. A file you open is read by the browser and processed on your device; the code in this repository has no upload path for it. `npm test` checks that every network call in the tools is on a short reviewed list (`tests/network-surface.test.mjs`).
