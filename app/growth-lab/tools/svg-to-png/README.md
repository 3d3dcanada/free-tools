# SVG to PNG Converter

> Render supported SVG artwork into a transparent PNG on your device.

![svg-to-png](../../../../docs/screenshots/svg-to-png.jpg)

## What it does

Convert a self-contained SVG to PNG for free in your browser without uploading it. This page opens with PNG selected and renders supported shapes and text into pixels while retaining transparency. SVGs containing scripts, embedded images or external resources are refused. Check the resulting dimensions, fonts and appearance before using the downloaded copy.

## How to use it

1. Prepare a self-contained SVG made from shapes and text. Remove scripts and external dependencies in your drawing application. Files with embedded raster images, remote references or unsupported interactive content are refused rather than silently fetching extra resources.
2. Drop the SVG into the converter with PNG selected. Run the conversion and inspect the reported pixel dimensions. This route uses the image’s intrinsic dimensions; use the resize tool with the original SVG when a different raster size is needed.
3. Compare the preview with your intended artwork. Pay particular attention to text alignment, clipping, gradients and small strokes. If the source relies on a font that is unavailable locally, prepare outlined lettering in the source application when appropriate.
4. Download the PNG and open it in the destination application. Keep the SVG master alongside it. The PNG is a delivery copy at a fixed pixel size, while the vector source remains the right place for future shape and layout changes.

## In this repository

- Route: `/tools/svg-to-png` and `/fr/tools/svg-to-png` (French). The page is `route.tsx` / `route.fr.tsx` in this folder.
- The editor is in [`../image-toolkit/`](../image-toolkit/), shared with: `compress-image`, `convert-image`, `crop-image`, `favicon-generator`, `heic-to-jpg`, `png-to-webp`, `remove-background`, `resize-image`, `rounded-image`.
- Guide text: [`../../seo/content/svg-to-png.en.ts`](../../seo/content/svg-to-png.en.ts) and `svg-to-png.fr.ts`.

## Your files

The tool runs in the page. A file you open is read by the browser and processed on your device; the code in this repository has no upload path for it. `npm test` checks that every network call in the tools is on a short reviewed list (`tests/network-surface.test.mjs`).
