# Free Poster Maker

> Create a large-format notice with a deliberate hierarchy and print export.

![poster-maker](../../../../docs/screenshots/poster-maker.jpg)

## What it does

Make a poster for free in your browser without uploading text or images. This page starts at 11 by 17 inches and also offers 18 by 24, 24 by 36, A3 and A2, with 13 templates, your own photos and an optional static QR code. Export a print PDF with 3 mm bleed and crop marks, then check a physical proof before producing a batch.

## How to use it

1. Choose the final poster size before refining the wording. Start from one of the 13 templates and replace the sample headline with the single idea a reader should notice first. Add the event or offer details beneath it.
2. Drop your own photo onto a photo frame or use it as the page background. Check that the subject and headline remain clear at the selected shape. Use only artwork and photographs you have permission to reproduce.
3. Add a direct destination URL if the poster needs a QR code. Keep a readable contact or short destination in the text too. Review copy length, contrast and available space; the print PDF adds 3 mm of bleed and crop marks.
4. Download the PDF, inspect its page and trim size, and produce a sample through the intended print workflow. Check readability from the expected distance and scan the physical code. Keep the design file for revisions before ordering the full run.

## In this repository

- Route: `/tools/poster-maker` and `/fr/tools/poster-maker` (French). The page is `route.tsx` / `route.fr.tsx` in this folder.
- The editor is in [`../design-studio/`](../design-studio/), shared with: `business-card`, `flyer-maker`, `social-image-maker`.
- Guide text: [`../../seo/content/poster-maker.en.ts`](../../seo/content/poster-maker.en.ts) and `poster-maker.fr.ts`.

## Your files

The tool runs in the page. A file you open is read by the browser and processed on your device; the code in this repository has no upload path for it. `npm test` checks that every network call in the tools is on a short reviewed list (`tests/network-surface.test.mjs`).
