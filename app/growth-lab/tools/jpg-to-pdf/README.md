# JPG to PDF

> Make a Letter-size document from JPEG photos or scans.

![jpg-to-pdf](../../../../docs/screenshots/jpg-to-pdf.jpg)

## What it does

Convert JPG photos into a PDF for free without uploading them. This page starts with Letter paper selected, places one image on each page and lets you choose margins and order. Prepare readable photos first, then download and inspect the document. The conversion packages pictures; it does not recognise text, correct perspective or certify a scan.

## How to use it

1. Gather the JPEG photographs or scans for one document. Check that each page is complete, in focus and facing the right way. Crop out the desk or surrounding material before adding the files if it does not belong in the document.
2. Select the images together and arrange them in reading order. Use the page headings or visible numbers to confirm the sequence. Remove accidental duplicate photos and include any back page that contains information the recipient needs.
3. Keep Letter selected when the receiving workflow expects 8.5 by 11 inches, or choose another available page format. Set a margin that leaves room around the image without making its writing too small to read.
4. Export the PDF and open the downloaded copy. Zoom to inspect the smallest text, check the first and last pages and confirm the total count. Keep the JPEG originals and retain a clear filename identifying the document and its version.

## In this repository

- Route: `/tools/jpg-to-pdf` and `/fr/tools/jpg-to-pdf` (French). The page is `route.tsx` / `route.fr.tsx` in this folder.
- The editor is in [`../pdf-toolkit/`](../pdf-toolkit/), shared with: `images-to-pdf`, `merge-pdf`, `organize-pdf`, `pdf-to-image`, `pdf-to-jpg`, `split-pdf`, `stamp-pdf`.
- Guide text: [`../../seo/content/jpg-to-pdf.en.ts`](../../seo/content/jpg-to-pdf.en.ts) and `jpg-to-pdf.fr.ts`.

## Your files

The tool runs in the page. A file you open is read by the browser and processed on your device; the code in this repository has no upload path for it. `npm test` checks that every network call in the tools is on a short reviewed list (`tests/network-surface.test.mjs`).
