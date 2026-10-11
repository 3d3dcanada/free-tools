# 3D Printing Unit Converter

> Convert compatible quantities without confusing length, volume and mass.

![unit-converter](../../../../docs/screenshots/unit-converter.jpg)

## What it does

Convert length, volume, mass and time for free in your browser without uploading data. Choose a quantity category, source unit, destination unit and non-negative value, then review the result or download a report. Categories stay separate: cubic millimetres cannot become grams without density, and an inch-to-millimetre length factor cannot be used unchanged for volume.

## How to use it

1. Identify the kind of quantity you have: a length, volume, mass or duration. Read the unit from the original drawing, material record or time estimate. Do not infer it only from whether the number looks plausible.
2. Choose the matching category and select the source and destination units. Enter the numeric value without the unit in the number field. The converter accepts non-negative decimal values and keeps incompatible dimensions out of the same conversion.
3. Check the result against a familiar reference. One inch is 25.4 millimetres, one kilogram is 1000 grams and one hour is 60 minutes. A quick scale check can catch an accidentally reversed conversion before it reaches a model or estimate.
4. Download the report if the conversion belongs in a project record. Carry the destination unit with the value when entering it elsewhere. Verify a known model dimension again after import rather than assuming a copied number establishes the entire file’s scale.

## In this repository

- Route: `/tools/unit-converter` and `/fr/tools/unit-converter` (French). The page is `route.tsx` / `route.fr.tsx` in this folder.
- The editor is in [`../printing-tools/`](../printing-tools/), shared with: `filament-calculator`, `model-viewer`, `nozzle-layer-guide`, `print-cost-calculator`, `tolerance-calculator`.
- Guide text: [`../../seo/content/unit-converter.en.ts`](../../seo/content/unit-converter.en.ts) and `unit-converter.fr.ts`.

## Your files

The tool runs in the page. A file you open is read by the browser and processed on your device; the code in this repository has no upload path for it. `npm test` checks that every network call in the tools is on a short reviewed list (`tests/network-surface.test.mjs`).
