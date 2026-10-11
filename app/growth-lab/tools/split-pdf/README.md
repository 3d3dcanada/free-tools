# Split PDF and Extract Pages

> Select pages, export an excerpt or separate them into individual PDFs.

![split-pdf](../../../../docs/screenshots/split-pdf.jpg)

## What it does

Split a PDF for free without uploading it. Select page numbers or ranges, then download the selection as one PDF or a ZIP containing separate one-page PDFs. Preview the order before exporting and keep the source document. The selection follows positions in the current page list, which may differ from numbers printed on the pages.

## How to use it

1. Open a readable PDF and identify the pages you need in the displayed list. Compare the list positions with the document’s printed numbering. A cover, introduction or Roman-numbered section can make those two numbering systems different.
2. Enter a selection such as 1, 3-5. Commas separate entries and each range must run upward. The tool retains the order you enter and removes repeated selections, so inspect the chosen sequence before proceeding.
3. Choose Download Selected PDF to keep the excerpt together, or Split Into Separate PDFs to make a ZIP of one-page files. These solve different delivery needs; decide whether the recipient needs context across pages or independent attachments.
4. Open the actual downloaded PDF or ZIP. Confirm the number of outputs and inspect the first and last selected pages. Rename the delivery files meaningfully and retain the full original so omitted context remains available if it is needed later.

## In this repository

- Route: `/tools/split-pdf` and `/fr/tools/split-pdf` (French). The page is `route.tsx` / `route.fr.tsx` in this folder.
- The editor is in [`../pdf-toolkit/`](../pdf-toolkit/), shared with: `images-to-pdf`, `jpg-to-pdf`, `merge-pdf`, `organize-pdf`, `pdf-to-image`, `pdf-to-jpg`, `stamp-pdf`.
- Guide text: [`../../seo/content/split-pdf.en.ts`](../../seo/content/split-pdf.en.ts) and `split-pdf.fr.ts`.

## Your files

The tool runs in the page. A file you open is read by the browser and processed on your device; the code in this repository has no upload path for it. `npm test` checks that every network call in the tools is on a short reviewed list (`tests/network-surface.test.mjs`).
