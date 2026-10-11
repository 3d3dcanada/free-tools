import type { ReadingSection } from "../types";
export default [
  {
    title: "Separate the first symptom from the later mess",
    paragraphs: [
      "A loose print can quickly turn into tangled material, but the most useful observation is often what happened first. Did the initial line fail to attach, did an attached patch detach later, or did the nozzle collide with a raised region? Stop the failed job through the normal control and wait for safe access. Record the earliest symptom you observed. Do not reach into the active mechanism to hold a part down or pull away a strand. Rescuing the appearance of the print is less important than avoiding an unsafe intervention.",
      "Keep timing and location in the note. A single corner that curls after many layers is a different starting point from lines that never adhere anywhere on the plate. A problem limited to one region may suggest a different check from a uniform problem across the first layer. These are clues, not diagnoses. A photograph taken from a safe position can help, but do not delay stopping a clearly unsafe condition just to document it. Afterward, preserve enough of the failed lines to describe what you actually saw.",
    ],
    sources: ["adhesion", "warp", "safety"],
  },
  {
    title: "Verify the plate, material and profile together",
    paragraphs: [
      "Identify the installed plate and the loaded filament, then compare them with the selected slicer configuration. Read the surface preparation and compatibility guidance again. A remembered routine from PLA on one sheet may be wrong for another material or coating. Use the approved cleaning and handling method in the specified safe state. Do not add a random solvent, abrasive or thicker adhesive layer as the first response. If the material and plate combination is unsupported, correct that mismatch before interpreting the failure as a calibration problem.",
      "Check that a removable plate is seated correctly and that its relevant machine selection or calibration matches the installed surface where applicable. Do not guess at offsets from a photograph of another printer. The nozzle diameter in the profile must also match the physical setup. An imported project may have changed that selection. These basic checks are worth doing before a tuning trial because they test assumptions that every later setting depends on. Record any mismatch you find as the correction, rather than combining it with several unrelated parameter changes.",
    ],
    sources: ["surface", "sheets", "first"],
  },
  {
    title: "Use line shape as a clue within the correct procedure",
    paragraphs: [
      "Loose rounded strands and heavily dragged ridges can indicate different deposition conditions. Neither appearance gives you a universal numeric offset. The plate texture, material and machine's calibration system affect the interpretation. Follow the first-layer procedure for the exact model and revision. Some machines use manual adjustments; others use different automated sensing and setup. Do not paste a manual Z command or live-offset value from an unrelated printer. A setting that moves a nozzle closer can cause damage if used without the correct context and observation.",
      "If the maker's supported procedure calls for a calibration pattern, use that pattern and its criteria rather than a full customer part. Make one relevant adjustment, retain the original value where applicable and observe the result. Do not deliberately create a collision to explore the limit. If lines still detach or the procedure cannot produce a consistent result, stop and collect the configuration and photographs for qualified help. Repeatedly lowering the nozzle or increasing temperature without understanding the setup can turn a preparation issue into a damaged surface or blocked extrusion path.",
    ],
    sources: ["firstlayer", "adhesion", "under"],
  },
  {
    title: "Retest a small tile and record the boundary",
    paragraphs: [
      "Use the 25 by 25 by 2 millimetre tile with the supported baseline after the targeted correction. Keep material, geometry and other settings unchanged so that the new observation can be connected to that correction. Watch the initial deposition from outside motion and stop if it clearly fails. After the specified cooling and release, inspect the underside and note whether the part remained attached. A successful tile is evidence that this small first-layer trial worked. It does not automatically resolve later warping on a much larger footprint.",
      "Your final record should contain the initial symptom, the checked assumptions, one correction and the actual retest result. If the original baseline already works, use it to practise identifying the expected first-layer appearance and write the diagnostic sequence without manufacturing a failure. Do not deliberately contaminate a plate or misadjust a nozzle for the sake of the course. Knowing when to use the first-layer path and when to move to the later-lifting lesson is the useful skill. It keeps the next action tied to the timing and location of evidence.",
    ],
    sources: ["adhesion", "firstlayer", "warp"],
  },
] satisfies ReadingSection[];
