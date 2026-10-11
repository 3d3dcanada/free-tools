# Free Flyer Maker

> Design a handout on a canvas with your words, photos and a QR code.

![flyer-maker](../../../../docs/screenshots/flyer-maker.jpg)

## What it does

Make a free flyer on a full design canvas: pick one of 13 templates, change the words on the page, drop in your own photo, then download a print PDF with 3 mm bleed and crop marks, a PNG or an SVG. Nothing is uploaded. Choose Letter, A4, A5 or half letter first, and keep words inside the dashed safe line shown on the page.

## How to use it

1. Choose a paper size and one of the 13 templates that gives your main message enough room. An event announcement needs the event, date, venue and action; a business handout needs the offer, relevant detail and a way to respond.
2. Click any text on the page to change it, or fill in the words panel. Drop your own photo onto a photo frame and check the crop and the amount of detail at the intended print size. Use the theme and colour controls to keep the text and its background clearly separated.
3. Add a QR code if it shortens the next step. Keep a readable contact or address beside it so the handout still works without a camera. Open Export to see anything that may print badly before you download.
4. The print PDF adds 3 mm of bleed and crop marks. Download it, confirm the page dimensions with the printer and print one proof. Check dates, contact details, legibility and the real QR before making the final quantity.

## In this repository

- Route: `/tools/flyer-maker` and `/fr/tools/flyer-maker` (French). The page is `route.tsx` / `route.fr.tsx` in this folder.
- The editor is in [`../design-studio/`](../design-studio/), shared with: `business-card`, `poster-maker`, `social-image-maker`.
- Guide text: [`../../seo/content/flyer-maker.en.ts`](../../seo/content/flyer-maker.en.ts) and `flyer-maker.fr.ts`.

## Your files

The tool runs in the page. A file you open is read by the browser and processed on your device; the code in this repository has no upload path for it. `npm test` checks that every network call in the tools is on a short reviewed list (`tests/network-surface.test.mjs`).
