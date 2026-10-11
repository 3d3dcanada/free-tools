# Free vCard QR Code Generator

> Put a concise contact record directly in a code for address-book import.

![vcard-qr-code](../../../../docs/screenshots/vcard-qr-code.jpg)

## What it does

Make a free vCard QR code so someone can add your details to an address book without retyping them. Your contact fields are encoded directly, and nothing is uploaded. Enter only information you intend to share, keep the card concise, and check the saved contact on a phone before printing.

## How to use it

1. Enter the contact’s first and last name, then add the useful phone, email, company and website fields. Omit private details from a public business card.
2. Review the generated vCard payload and scan result. Longer contact records need more QR modules and more physical space on a printed card.
3. Scan the exported code with your target phones, open the contact preview and check each field before saving. Keep an editable draft for future reprints.

## In this repository

- Route: `/tools/vcard-qr-code` and `/fr/tools/vcard-qr-code` (French). The page is `route.tsx` / `route.fr.tsx` in this folder.
- The editor is in [`../qr-code/`](../qr-code/), shared with: `calendar-qr-code`, `qr-code`, `wifi-qr-code`.
- Guide text: [`../../seo/content/vcard-qr-code.en.ts`](../../seo/content/vcard-qr-code.en.ts) and `vcard-qr-code.fr.ts`.

## Your files

The tool runs in the page. A file you open is read by the browser and processed on your device; the code in this repository has no upload path for it. `npm test` checks that every network call in the tools is on a short reviewed list (`tests/network-surface.test.mjs`).
