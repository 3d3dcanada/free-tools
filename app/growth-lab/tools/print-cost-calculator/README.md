# 3D Print Cost Calculator

> Compare material, electricity and machine allowance before a print.

![print-cost-calculator](../../../../docs/screenshots/print-cost-calculator.jpg)

## What it does

Estimate a 3D print’s material, electricity and machine allowance for free in your browser, with no uploads. Enter your model’s volume and surface area, shell thickness, infill, density and local costs. The result is an approximation for your own planning, not a slicer calculation, selling price or 3D3D quote. Save the assumptions with the report.

## How to use it

1. Enter a verified solid volume in cubic centimetres and surface area in square centimetres, or read them from a suitable model through the local inspector. Confirm the model units first. An unavailable mesh volume should not be replaced with zero.
2. Set an approximate shell thickness, infill percentage, material density and extra-material allowance. Use values appropriate to your intended print rather than treating the example defaults as a tested profile. Compare the estimate with slicer output when it becomes available.
3. Enter your actual filament price per kilogram, estimated hours, average electrical power, energy rate and machine allowance per hour. Choose the currency label. These are your costs; the tool does not retrieve a utility tariff or convert currencies.
4. Review the separate material, electricity and machine amounts, then download the JSON report. Keep the assumptions and compare them with actual material use and time after a trial print. Request a separate quote for work supplied by 3D3D.

## In this repository

- Route: `/tools/print-cost-calculator` and `/fr/tools/print-cost-calculator` (French). The page is `route.tsx` / `route.fr.tsx` in this folder.
- The editor is in [`../printing-tools/`](../printing-tools/), shared with: `filament-calculator`, `model-viewer`, `nozzle-layer-guide`, `tolerance-calculator`, `unit-converter`.
- Guide text: [`../../seo/content/print-cost-calculator.en.ts`](../../seo/content/print-cost-calculator.en.ts) and `print-cost-calculator.fr.ts`.

## Your files

The tool runs in the page. A file you open is read by the browser and processed on your device; the code in this repository has no upload path for it. `npm test` checks that every network call in the tools is on a short reviewed list (`tests/network-surface.test.mjs`).
