# Free Invoice Generator

> Prepare an invoice using your own business details and agreed prices.

![invoice-generator](../../../../docs/screenshots/invoice-generator.jpg)

## What it does

Create a free invoice PDF in your browser without uploading client or business information. Add line items, your logo, currency and editable Canadian tax lines, then review the totals before downloading. Saved clients and items stay on this device. Export a backup for your records; this tool does not send invoices, collect payment or replace bookkeeping.

## How to use it

1. Replace the sample business and client details with the actual parties. Choose an invoice number, issue date and any due date. Add your own logo if needed, and check that the contact information is sufficient for the recipient to identify the work.
2. Describe each product or service with its quantity and unit price. Choose the currency before entering amounts. Review which tax lines apply to each item rather than assuming that every item in a mixed invoice has the same treatment.
3. Use a province preset only as a starting point, then verify the tax labels, rates and registration details appropriate to your situation. Review the subtotal, each tax amount and total. A preset is a calculation convenience, not a tax determination.
4. Download the PDF and reopen it to check the actual document. Save an editable JSON backup and the final PDF in your normal records. Deliver the invoice through your own agreed channel and track payment separately from this local document editor.

## In this repository

- Route: `/tools/invoice-generator` and `/fr/tools/invoice-generator` (French). The page is `route.tsx` / `route.fr.tsx` in this folder.
- The editor is in this folder.
- Guide text: [`../../seo/content/invoice-generator.en.ts`](../../seo/content/invoice-generator.en.ts) and `invoice-generator.fr.ts`.

## Your files

The tool runs in the page. A file you open is read by the browser and processed on your device; the code in this repository has no upload path for it. `npm test` checks that every network call in the tools is on a short reviewed list (`tests/network-surface.test.mjs`).
