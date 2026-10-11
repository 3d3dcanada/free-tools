# PDF Page Numbers and Stamps

> Add sequence numbers or a visible text or image mark to PDF pages.

![stamp-pdf](../../../../docs/screenshots/stamp-pdf.jpg)

## What it does

Add page numbers or a simple stamp to a PDF for free without uploading it. Choose the first number, enter short text or select a local image, then adjust the stamp’s position and opacity. Review the preview and download a new document. These are visible additions, not secure redactions, certified signatures or access controls.

## How to use it

1. Open the PDF and settle its page order first. Remove pages you do not need before applying numbering. The sequence follows the selected output order, so changing that order later changes which number belongs on which page.
2. Enable page numbers and set the starting integer if needed. For a stamp, enter a short label such as Draft or add a local PNG or JPEG image. Use a mark you are authorized to place on the document.
3. Choose top, centre or bottom placement for the stamp and adjust opacity. Inspect pages with different orientations and margins. A position that is empty on the cover may cover a table, footnote or signature block elsewhere.
4. Download the marked PDF and review the actual output. Confirm the numbering sequence, readable text and visible image placement on representative pages. Keep the unmarked original, since the new file is a separate edited document.

## In this repository

- Route: `/tools/stamp-pdf` and `/fr/tools/stamp-pdf` (French). The page is `route.tsx` / `route.fr.tsx` in this folder.
- The editor is in [`../pdf-toolkit/`](../pdf-toolkit/), shared with: `images-to-pdf`, `jpg-to-pdf`, `merge-pdf`, `organize-pdf`, `pdf-to-image`, `pdf-to-jpg`, `split-pdf`.
- Guide text: [`../../seo/content/stamp-pdf.en.ts`](../../seo/content/stamp-pdf.en.ts) and `stamp-pdf.fr.ts`.

## Your files

The tool runs in the page. A file you open is read by the browser and processed on your device; the code in this repository has no upload path for it. `npm test` checks that every network call in the tools is on a short reviewed list (`tests/network-surface.test.mjs`).
