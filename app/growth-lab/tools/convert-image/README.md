# Free Image Converter

> Create a genuinely encoded image in the format your next application needs.

![convert-image](../../../../docs/screenshots/convert-image.jpg)

## What it does

Convert images to PNG, JPG, WebP or AVIF for free without uploading your files. The browser opens supported inputs, including a limited self-contained SVG subset and HEIC only where native decoding is available. Choose the output format, inspect the converted image and download a new file or batch ZIP.

## How to use it

1. Identify the format the receiving application accepts and whether transparency matters. Choose the source files from your device. Try one representative input first when working with camera formats, unusual SVG artwork or a new browser.
2. Select the destination format. Choose a background colour for JPEG when the input has transparent areas, and adjust lossy quality when appropriate. Conversion creates new encoded bytes; changing a filename extension alone would not perform this job.
3. Run the batch and review each result’s dimensions and file size. Inspect colour, orientation, text and edges. A failed source remains a visible error instead of being silently returned under a misleading extension.
4. Download the individual files or ZIP, then open a result in the receiving application. Keep the original if you may need animation, camera information, vector editing or another source-specific capability that the new still image does not carry.

## In this repository

- Route: `/tools/convert-image` and `/fr/tools/convert-image` (French). The page is `route.tsx` / `route.fr.tsx` in this folder.
- The editor is in [`../image-toolkit/`](../image-toolkit/), shared with: `compress-image`, `crop-image`, `favicon-generator`, `heic-to-jpg`, `png-to-webp`, `remove-background`, `resize-image`, `rounded-image`, `svg-to-png`.
- Guide text: [`../../seo/content/convert-image.en.ts`](../../seo/content/convert-image.en.ts) and `convert-image.fr.ts`.

## Your files

The tool runs in the page. A file you open is read by the browser and processed on your device; the code in this repository has no upload path for it. `npm test` checks that every network call in the tools is on a short reviewed list (`tests/network-surface.test.mjs`).
