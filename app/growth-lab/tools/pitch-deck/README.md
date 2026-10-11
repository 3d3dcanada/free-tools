# Free Pitch Deck Builder

> Arrange a presentation with charts, images, notes and editable exports.

![pitch-deck](../../../../docs/screenshots/pitch-deck.jpg)

## What it does

Build a free pitch deck in your browser using visual themes, your own images, charts and speaker notes. Nothing is uploaded. Arrange and duplicate slides, rehearse in presenter view, then download PowerPoint, PDF or HTML. The editable draft stays on this device, so save a backup before switching browsers or clearing storage.

## How to use it

1. Choose a structure that fits the decision you need from the audience. Replace its prompts with your own facts, a clear problem, the proposed response and a specific next step. Keep detailed supporting material in notes.
2. Select a theme and review the entire sequence. Drag slides into order or use the movement controls, duplicate a useful layout, and remove repetition. A consistent visual rhythm helps the audience compare related ideas.
3. Add images you have permission to use. Adjust the crop and focal point so the subject remains visible. For a chart, enter a small table and check the labels, units and numbers against the source before choosing bar, line or pie.
4. Rehearse with the presenter timer and notes. Export the format your recipient needs, open that actual file in the presentation application, and inspect wrapping, image placement, charts and speaker notes before the meeting.

## In this repository

- Route: `/tools/pitch-deck` and `/fr/tools/pitch-deck` (French). The page is `route.tsx` / `route.fr.tsx` in this folder.
- The editor is in [`../deck-studio/`](../deck-studio/), shared with: no other tool.
- Guide text: [`../../seo/content/pitch-deck.en.ts`](../../seo/content/pitch-deck.en.ts) and `pitch-deck.fr.ts`.

## Your files

The tool runs in the page. A file you open is read by the browser and processed on your device; the code in this repository has no upload path for it. `npm test` checks that every network call in the tools is on a short reviewed list (`tests/network-surface.test.mjs`).
