# Round Image Corners

> Round corners and add a border without changing the image dimensions.

![rounded-image](../../../../docs/screenshots/rounded-image.jpg)

## What it does

Round image corners for free in your browser, with an optional coloured border and transparent PNG output. Nothing is uploaded. Adjust the radius, inspect the edge and download a new file at the original dimensions. Process several images together when you need a consistent shape for a presentation, shop or website.

## How to use it

1. Drop your images into the tool and inspect the first preview. Crop to the intended composition before rounding if you need a square portrait or a particular aspect ratio. This operation changes the edge, not the canvas dimensions.
2. Choose the corner radius as a percentage of the shorter side. Start with a modest value, then increase it while watching the preview. At fifty percent, a square becomes circular and a wide rectangle becomes a capsule.
3. Set the border width and colour if an outline helps separate the image from its surroundings. The border is drawn inside the clipped shape. Check that it does not obscure small text, a face or another detail near the edge.
4. Process the batch and download the PNG results. Place a sample on the actual background where it will be used. Transparent corners look different against a white slide, a coloured section and a patterned page.

## In this repository

- Route: `/tools/rounded-image` and `/fr/tools/rounded-image` (French). The page is `route.tsx` / `route.fr.tsx` in this folder.
- The editor is in [`../image-toolkit/`](../image-toolkit/), shared with: `compress-image`, `convert-image`, `crop-image`, `favicon-generator`, `heic-to-jpg`, `png-to-webp`, `remove-background`, `resize-image`, `svg-to-png`.
- Guide text: [`../../seo/content/rounded-image.en.ts`](../../seo/content/rounded-image.en.ts) and `rounded-image.fr.ts`.

## Your files

The tool runs in the page. A file you open is read by the browser and processed on your device; the code in this repository has no upload path for it. `npm test` checks that every network call in the tools is on a short reviewed list (`tests/network-surface.test.mjs`).
