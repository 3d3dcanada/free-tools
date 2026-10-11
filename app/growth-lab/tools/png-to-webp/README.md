# PNG to WebP Converter

> Create WebP copies of PNG images and compare the actual bytes.

![png-to-webp](../../../../docs/screenshots/png-to-webp.jpg)

## What it does

Convert PNG to WebP for free without uploading your images. This page opens with WebP selected, preserves transparent pixels and lets you adjust quality before downloading. Compare the actual file size and visible detail for each result. A different format can reduce bytes, but a smaller file is not guaranteed for every source.

## How to use it

1. Add the PNG images you want to convert. Start with a representative example containing the kind of edges, colours and transparency used in the rest of the batch. Keep the PNG originals as your editable or archival masters.
2. Leave WebP selected and choose a quality setting. Run the conversion, then compare the before and after preview and the recorded byte counts. Lower the setting only while the result still meets the intended visual standard.
3. Inspect small lettering, thin lines, gradients and semi-transparent edges at a useful magnification. A product cutout may look good on white but reveal a halo against a dark background. Test it where the image will actually appear.
4. Download the individual WebP files or the batch ZIP. Check that the destination accepts WebP and update the filename reference when replacing an image in a website. Retain the old asset until the new reference has been verified.

## In this repository

- Route: `/tools/png-to-webp` and `/fr/tools/png-to-webp` (French). The page is `route.tsx` / `route.fr.tsx` in this folder.
- The editor is in [`../image-toolkit/`](../image-toolkit/), shared with: `compress-image`, `convert-image`, `crop-image`, `favicon-generator`, `heic-to-jpg`, `remove-background`, `resize-image`, `rounded-image`, `svg-to-png`.
- Guide text: [`../../seo/content/png-to-webp.en.ts`](../../seo/content/png-to-webp.en.ts) and `png-to-webp.fr.ts`.

## Your files

The tool runs in the page. A file you open is read by the browser and processed on your device; the code in this repository has no upload path for it. `npm test` checks that every network call in the tools is on a short reviewed list (`tests/network-surface.test.mjs`).
