# Free Favicon Generator

> Package a master image into icon files and a starter web manifest.

![favicon-generator](../../../../docs/screenshots/favicon-generator.jpg)

## What it does

Generate a free favicon package from your own image without uploading it. The local ZIP contains nine PNG sizes, a multi-size ICO, a web manifest and installation notes. The full image is fitted with transparent padding, so choose a simple, recognisable source and inspect the smallest icon before installing the package.

## How to use it

1. Choose a clear master image, ideally with a square composition and a simple silhouette. Remove unnecessary surrounding space with the crop tool first. A long wordmark or detailed photograph may become unreadable in a tiny browser tab.
2. Run the generator and download the ZIP for that image. The package contains PNG files at 16, 32, 48, 64, 128, 180, 192, 256 and 512 pixels, plus ICO, manifest and installation instructions.
3. Inspect the 16-pixel and 32-pixel versions at their real size. Check light and dark surroundings, transparent edges and the space around the mark. Adjust the source artwork and regenerate if the small version loses its identity.
4. Update the site name and settings in the manifest, copy the files into your own website project and add the documented link elements. Verify the file URLs and the actual browser display after the site owner publishes the change.

## In this repository

- Route: `/tools/favicon-generator` and `/fr/tools/favicon-generator` (French). The page is `route.tsx` / `route.fr.tsx` in this folder.
- The editor is in [`../image-toolkit/`](../image-toolkit/), shared with: `compress-image`, `convert-image`, `crop-image`, `heic-to-jpg`, `png-to-webp`, `remove-background`, `resize-image`, `rounded-image`, `svg-to-png`.
- Guide text: [`../../seo/content/favicon-generator.en.ts`](../../seo/content/favicon-generator.en.ts) and `favicon-generator.fr.ts`.

## Your files

The tool runs in the page. A file you open is read by the browser and processed on your device; the code in this repository has no upload path for it. `npm test` checks that every network call in the tools is on a short reviewed list (`tests/network-surface.test.mjs`).
