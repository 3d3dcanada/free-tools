# HEIC to JPG Converter

> Use native HEIC decoding to make ordinary JPEG delivery copies.

![heic-to-jpg](../../../../docs/screenshots/heic-to-jpg.jpg)

## What it does

Convert HEIC to JPG for free on a browser that can decode HEIC natively. Nothing is uploaded, and JPEG is already selected. This is a conditional browser feature, not a universal HEIC converter. If your file cannot be opened here, export a JPEG from your device’s photo application and use that copy instead.

## How to use it

1. Try one representative HEIC photograph before adding a batch. The tool needs your browser to decode the actual file. Support depends on the browser and device, so a HEIC extension alone does not establish that processing will succeed.
2. If the image opens, keep JPEG selected and choose a quality level. Process it, then compare the preview, dimensions and file size. Check orientation, highlights, shadows and colour against the original photo as displayed on your device.
3. If decoding fails, use the photo application on the device to export a JPEG copy. Do not just rename the extension. This tool reports the unsupported input and does not send the file to an external conversion service.
4. Download the successful result and open it in the application or form that requested JPEG. Keep the HEIC original separately. Add more files only after confirming that the first example meets both the technical and visual requirements.

## In this repository

- Route: `/tools/heic-to-jpg` and `/fr/tools/heic-to-jpg` (French). The page is `route.tsx` / `route.fr.tsx` in this folder.
- The editor is in [`../image-toolkit/`](../image-toolkit/), shared with: `compress-image`, `convert-image`, `crop-image`, `favicon-generator`, `png-to-webp`, `remove-background`, `resize-image`, `rounded-image`, `svg-to-png`.
- Guide text: [`../../seo/content/heic-to-jpg.en.ts`](../../seo/content/heic-to-jpg.en.ts) and `heic-to-jpg.fr.ts`.

## Your files

The tool runs in the page. A file you open is read by the browser and processed on your device; the code in this repository has no upload path for it. `npm test` checks that every network call in the tools is on a short reviewed list (`tests/network-surface.test.mjs`).
