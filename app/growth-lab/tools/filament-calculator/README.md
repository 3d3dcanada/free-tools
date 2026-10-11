# Filament Calculator

> Relate filament length and mass using the actual diameter and density.

![filament-calculator](../../../../docs/screenshots/filament-calculator.jpg)

## What it does

Convert filament length to weight, or weight to length, for free without uploading anything. Enter the filament diameter, material density and price per kilogram to estimate grams, metres and material cost. The calculation treats filament as a uniform cylinder. Use measured or manufacturer values and keep a reserve rather than assuming a spool contains exactly the predicted usable length.

## How to use it

1. Choose whether the known quantity is length or weight. Enter metres in length mode or grams in weight mode. If weighing a partly used spool, subtract the empty spool mass before entering the filament mass.
2. Enter the nominal or measured filament diameter and the density appropriate to that material. Check the units: diameter is in millimetres and density is in grams per cubic centimetre. The example values are editable assumptions, not a universal filament specification.
3. Add your material price per kilogram and select its currency label. Review the converted length or mass and the resulting material cost. Keep other job costs separate, since electricity, machine time and labour are outside this calculation.
4. Download the JSON report with its inputs. Compare the estimate with actual spool use over several jobs and allow enough reserve for loading, purge and waste. Use the print-cost calculator when you also need time and energy components.

## In this repository

- Route: `/tools/filament-calculator` and `/fr/tools/filament-calculator` (French). The page is `route.tsx` / `route.fr.tsx` in this folder.
- The editor is in [`../printing-tools/`](../printing-tools/), shared with: `model-viewer`, `nozzle-layer-guide`, `print-cost-calculator`, `tolerance-calculator`, `unit-converter`.
- Guide text: [`../../seo/content/filament-calculator.en.ts`](../../seo/content/filament-calculator.en.ts) and `filament-calculator.fr.ts`.

## Your files

The tool runs in the page. A file you open is read by the browser and processed on your device; the code in this repository has no upload path for it. `npm test` checks that every network call in the tools is on a short reviewed list (`tests/network-surface.test.mjs`).
