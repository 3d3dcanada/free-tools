# PDF to JPG Converter

> Render PDF pages as ordinary JPEG images for compatible destinations.

![pdf-to-jpg](../../../../docs/screenshots/pdf-to-jpg.jpg)

## What it does

Convert PDF pages to JPG for free without uploading the document. JPEG is already selected on this page. Choose the pages and resolution, then download a ZIP of complete page images for previews, slides or compatible forms. Keep the original PDF because text becomes pixels, links stop being interactive and JPEG compression can soften fine detail.

## How to use it

1. Open the PDF and choose the pages needed for the destination. A preview often needs only a cover or selected examples. Use the page list to avoid exposing unrelated pages simply because they share the same source document.
2. Keep JPEG selected and choose a resolution that produces the required dimensions. Start with a modest selection to check readability and file size. If the destination specifies pixels, compare those dimensions rather than relying only on the DPI label.
3. Review page orientation and order before exporting. Each selected page becomes one JPG with a white background. The output represents the whole page layout, not an editable paragraph, separate photograph or transparent design element.
4. Download and unpack the ZIP, then inspect the JPEG files themselves. Test one in the receiving application or form. Keep the PDF for readers who need selectable text or document features, and avoid replacing the master with a compressed preview.

## In this repository

- Route: `/tools/pdf-to-jpg` and `/fr/tools/pdf-to-jpg` (French). The page is `route.tsx` / `route.fr.tsx` in this folder.
- The editor is in [`../pdf-toolkit/`](../pdf-toolkit/), shared with: `images-to-pdf`, `jpg-to-pdf`, `merge-pdf`, `organize-pdf`, `pdf-to-image`, `split-pdf`, `stamp-pdf`.
- Guide text: [`../../seo/content/pdf-to-jpg.en.ts`](../../seo/content/pdf-to-jpg.en.ts) and `pdf-to-jpg.fr.ts`.

## Your files

The tool runs in the page. A file you open is read by the browser and processed on your device; the code in this repository has no upload path for it. `npm test` checks that every network call in the tools is on a short reviewed list (`tests/network-surface.test.mjs`).
