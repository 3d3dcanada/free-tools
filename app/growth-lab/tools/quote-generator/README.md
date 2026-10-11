# Free Quote Generator

> Describe the scope and prices before the job begins.

![quote-generator](../../../../docs/screenshots/quote-generator.jpg)

## What it does

Create a free quote PDF locally without uploading business or client details. This page starts in quote mode with its own numbering and saved workspace. Describe the proposed work, quantities, prices, taxes and expiry date, then review the file before sharing it. The tool documents your proposal; it does not calculate 3D3D prices or record acceptance.

## How to use it

1. Confirm that the document type is Quote and replace the sample parties with the real business and client. Choose a number and issue date. Add an expiry date when it is part of your offer, keeping it on or after the issue date.
2. Break the proposed work into clear line items. State quantities and unit prices in the chosen currency. Use descriptions that connect the price to a deliverable, and avoid mixing an optional extra into the committed total without explaining it.
3. Review tax selections and use the notes field for scope assumptions, exclusions, schedule conditions or the next step. Keep wording concise enough to fit the document. Verify applicable tax treatment separately from the template’s editable rate presets.
4. Download the quote PDF and inspect every page before sending it yourself. Save a JSON backup for future revisions. Keep the issued version and any later acceptance or changes in your own records rather than overwriting the only copy.

## In this repository

- Route: `/tools/quote-generator` and `/fr/tools/quote-generator` (French). The page is `route.tsx` / `route.fr.tsx` in this folder.
- The editor is in [`../invoice-generator/`](../invoice-generator/), shared with: `invoice-generator`, `receipt-generator`.
- Guide text: [`../../seo/content/quote-generator.en.ts`](../../seo/content/quote-generator.en.ts) and `quote-generator.fr.ts`.

## Your files

The tool runs in the page. A file you open is read by the browser and processed on your device; the code in this repository has no upload path for it. `npm test` checks that every network call in the tools is on a short reviewed list (`tests/network-surface.test.mjs`).
