# FDM Fit Calculator

> Compare nominal fit and a simple worst-case clearance interval.

![tolerance-calculator](../../../../docs/screenshots/tolerance-calculator.jpg)

## What it does

Plan a trial FDM shaft-and-hole fit for free without uploading data. Enter shaft diameter, signed diametral clearance and dimensional uncertainty per part to calculate the nominal hole and possible clearance interval. Press, slide and clearance choices are starting examples, not fit standards. Print and measure a small test pair in the intended material and orientation.

## How to use it

1. Enter the shaft’s nominal diameter in millimetres. Choose an example fit or enter your own signed diametral clearance. Positive clearance makes the hole larger than the shaft; a negative value creates nominal interference.
2. Enter a realistic dimensional uncertainty for each part, based on measurements from the printer, material and orientation you plan to use. This single value is applied to both diameters in the simplified model; it is not inferred from a printer brand.
3. Read the nominal hole, radial gap and minimum-to-maximum clearance. If the interval crosses zero, the same nominal design may produce either clearance or interference within the entered uncertainty. Do not describe that as a guaranteed sliding fit.
4. Print a small mating test pair with the relevant feature length and orientation. Measure and assemble it, record the result and adjust the design if necessary. Save the report with the test conditions before committing to a larger assembly.

## In this repository

- Route: `/tools/tolerance-calculator` and `/fr/tools/tolerance-calculator` (French). The page is `route.tsx` / `route.fr.tsx` in this folder.
- The editor is in [`../printing-tools/`](../printing-tools/), shared with: `filament-calculator`, `model-viewer`, `nozzle-layer-guide`, `print-cost-calculator`, `unit-converter`.
- Guide text: [`../../seo/content/tolerance-calculator.en.ts`](../../seo/content/tolerance-calculator.en.ts) and `tolerance-calculator.fr.ts`.

## Your files

The tool runs in the page. A file you open is read by the browser and processed on your device; the code in this repository has no upload path for it. `npm test` checks that every network call in the tools is on a short reviewed list (`tests/network-surface.test.mjs`).
