# Free QR Code Generator

> Style and verify static codes for links, contacts, networks and events.

![qr-code](../../../../docs/screenshots/qr-code.jpg)

## What it does

Create a free static QR code with your own colours, logo and caption, then download it as SVG, PNG, PDF or EPS. Nothing is uploaded. The code contains your chosen information directly, without a subscription redirect, scan tracking or expiry date. Use the built-in scan check before sharing your export.

## How to use it

1. Choose the content type first. A website needs its complete address; a contact, network or event needs the relevant structured fields. Check spelling and include only information you intend the recipient to read.
2. Set the foreground, background, dots and corners. Add a small logo if needed, then retain a clear border around the symbol. The editor increases error correction for a logo, but that does not guarantee every phone will scan it.
3. Wait for the built-in decoder to report that it recovered your exact content. Resolve a failed scan before exporting. A valid decode checks the image and payload; it does not confirm that a website is online or a password works.
4. Choose SVG for scalable artwork, PNG for an image workflow, or PDF for the printable tag. Open the downloaded file, scan it again, and test a physical sample at its intended size and viewing distance.

## In this repository

- Route: `/tools/qr-code` and `/fr/tools/qr-code` (French). The page is `route.tsx` / `route.fr.tsx` in this folder.
- The editor is in this folder.
- Guide text: [`../../seo/content/qr-code.en.ts`](../../seo/content/qr-code.en.ts) and `qr-code.fr.ts`.

## Your files

The tool runs in the page. A file you open is read by the browser and processed on your device; the code in this repository has no upload path for it. `npm test` checks that every network call in the tools is on a short reviewed list (`tests/network-surface.test.mjs`).
