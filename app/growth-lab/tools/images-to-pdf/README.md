# Images to PDF

> Package supported images as a single PDF with deliberate page sizing.

![images-to-pdf](../../../../docs/screenshots/images-to-pdf.jpg)

## What it does

Turn images into a PDF for free without uploading them. Select the images, arrange their order and choose A4, Letter or pages matched to image dimensions at 96 DPI. Each image occupies one page, fitted without cropping. Set margins for paper formats, download the document and check that the smallest details remain readable.

## How to use it

1. Select the images for the document together. Use up to fifty images within the displayed file and pixel limits. Prepare their crop and orientation beforehand so each source already shows the content you want to include.
2. Arrange the sequence using the movement buttons and remove images that do not belong. Think about how a reader moves from overview to detail. The tool makes one page per image rather than an automatic collage or contact sheet.
3. Choose A4 or Letter for a paper-oriented document and set the margin. Choose image-matched pages when varying page dimensions are intentional. That mode maps image pixels to physical size at 96 DPI and does not add a paper margin.
4. Download the PDF and inspect the actual pages in a reader. Check page count, proportions and fine details at the intended viewing size. Keep the original images and save a clearly named document version with your project files.

## In this repository

- Route: `/tools/images-to-pdf` and `/fr/tools/images-to-pdf` (French). The page is `route.tsx` / `route.fr.tsx` in this folder.
- The editor is in [`../pdf-toolkit/`](../pdf-toolkit/), shared with: `jpg-to-pdf`, `merge-pdf`, `organize-pdf`, `pdf-to-image`, `pdf-to-jpg`, `split-pdf`, `stamp-pdf`.
- Guide text: [`../../seo/content/images-to-pdf.en.ts`](../../seo/content/images-to-pdf.en.ts) and `images-to-pdf.fr.ts`.

## Your files

The tool runs in the page. A file you open is read by the browser and processed on your device; the code in this repository has no upload path for it. `npm test` checks that every network call in the tools is on a short reviewed list (`tests/network-surface.test.mjs`).
