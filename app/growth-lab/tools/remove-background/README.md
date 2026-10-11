# Free Background Remover

> Estimate a foreground mask locally and export a transparent PNG.

![remove-background](../../../../docs/screenshots/remove-background.jpg)

## What it does

Remove an image background for free without uploading the picture. An optional model downloads to your browser and estimates which pixels belong to the foreground, then saves a transparent PNG at the original dimensions. Inspect the result carefully: fine hair, glass, shadows and objects that blend into the background can need further editing.

## How to use it

1. Choose a clear photograph with a recognisable subject. A contrasting background and adequate light give you a more useful starting point than a blurred image with overlapping objects. Keep the original photograph for comparison and possible manual editing.
2. Load the background-removal model when you are ready to process. Its static files come from this site; your image stays on your device. The first run includes that download and may take longer than subsequent images in the same session.
3. Run the operation and inspect the foreground, not just the overall silhouette. Look around hair, straps, handles, reflections and holes inside the object. Check whether useful shadows disappeared or background fragments remained between separate parts of the subject.
4. Download the transparent PNG and test it against both a light and dark background. Accept the result only if it serves the intended use. A product listing, print graphic or detailed logo cutout may need a more careful manual mask.

## In this repository

- Route: `/tools/remove-background` and `/fr/tools/remove-background` (French). The page is `route.tsx` / `route.fr.tsx` in this folder.
- The editor is in [`../image-toolkit/`](../image-toolkit/), shared with: `compress-image`, `convert-image`, `crop-image`, `favicon-generator`, `heic-to-jpg`, `png-to-webp`, `resize-image`, `rounded-image`, `svg-to-png`.
- Guide text: [`../../seo/content/remove-background.en.ts`](../../seo/content/remove-background.en.ts) and `remove-background.fr.ts`.

## Your files

The tool runs in the page. A file you open is read by the browser and processed on your device; the code in this repository has no upload path for it. `npm test` checks that every network call in the tools is on a short reviewed list (`tests/network-surface.test.mjs`).
