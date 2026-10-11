# Free Social Image Maker

> Prepare social graphics in useful pixel formats and keep the files.

![social-image-maker](../../../../docs/screenshots/social-image-maker.jpg)

## What it does

Make free social images in your browser without uploading your text or photos. Start with a 1080 by 1080 square, choose one of 13 templates and switch to a story, post, cover, banner or thumbnail: every template has its own tall and wide layout. Download PNG or JPG at the exact pixel size. Review the destination’s current crop and interface overlays before publishing the image yourself.

## How to use it

1. Choose the intended pixel format before writing the final copy. The square post preset is selected initially. Story, cover, banner and thumbnail shapes have different space for a headline, supporting text and image, so review each adaptation separately.
2. Select a template and replace all sample wording. Lead with one message, then add only the detail that belongs in the graphic. Keep longer explanations in the accompanying post text you will prepare in the publishing platform.
3. Drop your own photo onto a photo frame. Check contrast and the subject’s crop, then review the result at a phone-like size. If you include a QR, also provide a practical destination in the accompanying text or profile workflow.
4. Download a PNG or JPG and inspect its dimensions and readability. Preview it in the actual destination before publishing, checking cropped edges and overlays. Keep the design file and save separately named variants when preparing several formats.

## In this repository

- Route: `/tools/social-image-maker` and `/fr/tools/social-image-maker` (French). The page is `route.tsx` / `route.fr.tsx` in this folder.
- The editor is in [`../design-studio/`](../design-studio/), shared with: `business-card`, `flyer-maker`, `poster-maker`.
- Guide text: [`../../seo/content/social-image-maker.en.ts`](../../seo/content/social-image-maker.en.ts) and `social-image-maker.fr.ts`.

## Your files

The tool runs in the page. A file you open is read by the browser and processed on your device; the code in this repository has no upload path for it. `npm test` checks that every network call in the tools is on a short reviewed list (`tests/network-surface.test.mjs`).
