# Free Image Cropper

> Choose the composition, proportions and orientation before exporting a new image.

![crop-image](../../../../docs/screenshots/crop-image.jpg)

## What it does

Crop, rotate and flip images for free in your browser without uploading the originals. Choose a free crop or fixed proportions, set the region’s size and position, then review the processed result. The same settings can handle a batch, while each downloaded image remains a separate file from its source.

## How to use it

1. Choose an image and identify the part that matters to the reader. Select free proportions or a fixed ratio such as square, landscape or portrait before deciding how much of the surrounding scene to remove.
2. Set the crop width and height percentages, then move the region horizontally and vertically. A fixed ratio fits inside that region. Run the operation to see the exact result rather than assuming every subject remains centred.
3. Choose any quarter-turn rotation and horizontal or vertical flip. Flips apply before the selected rotation, so inspect asymmetrical objects, lettering and handed parts carefully. A mirrored photograph can describe the wrong physical object.
4. Download the processed image or batch ZIP and inspect the actual files. Confirm the dimensions and orientation in the destination application. Keep the source so a later layout can recover material intentionally removed from this crop.

## In this repository

- Route: `/tools/crop-image` and `/fr/tools/crop-image` (French). The page is `route.tsx` / `route.fr.tsx` in this folder.
- The editor is in [`../image-toolkit/`](../image-toolkit/), shared with: `compress-image`, `convert-image`, `favicon-generator`, `heic-to-jpg`, `png-to-webp`, `remove-background`, `resize-image`, `rounded-image`, `svg-to-png`.
- Guide text: [`../../seo/content/crop-image.en.ts`](../../seo/content/crop-image.en.ts) and `crop-image.fr.ts`.

## Your files

The tool runs in the page. A file you open is read by the browser and processed on your device; the code in this repository has no upload path for it. `npm test` checks that every network call in the tools is on a short reviewed list (`tests/network-surface.test.mjs`).
