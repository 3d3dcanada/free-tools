# Free Receipt Generator

> Prepare a receipt with an actual payment amount, date and method.

![receipt-generator](../../../../docs/screenshots/receipt-generator.jpg)

## What it does

Create a free receipt PDF without uploading customer or payment details. This page starts in receipt mode and requires a positive amount received, payment date and method before export. Enter the real transaction and review any remaining balance. The tool records what you provide; it does not verify a bank transfer, process a card or collect money.

## How to use it

1. Confirm the payment using your own records before creating the receipt. Replace the sample business and customer details, choose the receipt number and enter the issue date. Use the document to describe an event that actually occurred.
2. Enter the goods or services and applicable tax lines so the total is understandable. Record the amount received, payment date and method. The amount must be positive and no greater than the document total; the payment date cannot follow the issue date.
3. Review the amount paid and the remaining balance. A partial payment should leave a balance rather than imply full settlement. Add a useful reference or explanation in notes, without including card secrets or unnecessary sensitive account information.
4. Download and inspect the receipt PDF, then retain it with the transaction evidence in your usual records. Send the copy yourself through the intended channel. Export a JSON backup if you need to preserve the editable local document.

## In this repository

- Route: `/tools/receipt-generator` and `/fr/tools/receipt-generator` (French). The page is `route.tsx` / `route.fr.tsx` in this folder.
- The editor is in [`../invoice-generator/`](../invoice-generator/), shared with: `invoice-generator`, `quote-generator`.
- Guide text: [`../../seo/content/receipt-generator.en.ts`](../../seo/content/receipt-generator.en.ts) and `receipt-generator.fr.ts`.

## Your files

The tool runs in the page. A file you open is read by the browser and processed on your device; the code in this repository has no upload path for it. `npm test` checks that every network call in the tools is on a short reviewed list (`tests/network-surface.test.mjs`).
