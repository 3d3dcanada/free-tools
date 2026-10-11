import type { ReadingSection } from "../types";
export default [
  {
    title: "Choose a first run with a clear purpose",
    paragraphs: [
      "Use the small block prepared in the earlier lessons. Its job is to connect the planning, profile and preview checks with a real specimen. Do not add a complicated model, a new material and unfamiliar settings to the first run. Bring your log, prepared output and the exact printer instructions to the workspace. Confirm who is supervising and how the job will be stopped if it fails. A short, understandable trial creates better learning evidence than an ambitious object whose many features make every symptom difficult to interpret.",
      "Before starting, check that the plate is installed and prepared as its maker requires, that the intended filament is loaded and that the selected output matches the reviewed file. Remove old parts and loose debris using the documented safe procedure. Keep tools outside the motion envelope. If a setup item changed after slicing, such as the nozzle or material, return to the profile check. Starting the print should follow a verified chain of choices, rather than relying on the fact that the machine happened to work for a different job yesterday.",
    ],
    sources: ["first", "surface", "safety"],
  },
  {
    title: "Observe the foundation without intervening by hand",
    paragraphs: [
      "Watch the initial deposition from outside the moving area. Look for lines that remain attached and form the expected footprint. A detached strand, moving part or dangerous nozzle contact is a reason to use the proper stop procedure. Do not hold down a loose print or pick at material while the mechanism is active. The failed-first-layer lesson will help choose a later diagnostic check. For this first run, your immediate responsibility is recognizing an obvious failure and responding safely, not tuning the machine in the middle of moving hardware.",
      "Record when a problem appears. A corner that never attached is different from a corner that begins flat and lifts much later. You do not need to solve that distinction while the machine runs; a note about timing and location is enough to guide the next investigation. Continue supervision according to the manual and workspace rules. If you must leave, follow the agreed procedure. A remote camera or a notification can supplement observation, but it does not replace the ability to respond physically or establish permission for unattended operation.",
    ],
    sources: ["adhesion", "warp", "safety"],
  },
  {
    title: "Cool and release the part as instructed",
    paragraphs: [
      "At the end of motion, treat the nozzle and plate as hot until the specified conditions for handling are met. Follow the plate maker's cooling and removal procedure for the material and surface combination. A flexible sheet, a fixed plate and different coatings may require different handling. Do not assume that a method seen on another printer is appropriate. Forcing a strongly attached part can damage a coating or cause a tool to slip. If normal removal does not work, stop and consult the relevant surface instructions before escalating force.",
      "Plan where the removed plate and specimen will go. Keep the handling area stable and free of objects that could make you drop or twist the work. Use approved tools with the working direction away from your hands. If a part breaks during release, keep that result in the record rather than describing only the printing stage as successful. Removal is part of producing a usable item. The same logic applies to support cleanup later: a completed toolpath does not guarantee that the part survives the steps needed to make it usable.",
    ],
    sources: ["sheets", "surface", "safety"],
  },
  {
    title: "Inspect the actual specimen and choose one next step",
    paragraphs: [
      "Once the part is ready to handle, examine the base, walls and top separately. Look for detached lines, missing material, obvious cracks or a distorted corner. Compare one clearly named dimension with the intended block size using an appropriate measuring tool. Record the actual reading and units without rounding it toward the desired value. If you cannot measure a feature, mark it unmeasured. A photograph can document a visible surface, but it does not replace a dimensional reading or establish an untested load or temperature capability.",
      "Complete the log with the outcome, removal method and a next action supported by what you saw. A sound block may justify continuing to material lessons. A failed foundation may lead to the first-layer diagnostic path. A confusing symptom may call for a repeat using the unchanged baseline after a basic check. Do not change several settings just to make the next attempt feel different. Keep this first specimen or its failure evidence beside the job record. It is a reference for learning, not proof that every later geometry and application will work.",
    ],
    sources: ["bates", "design", "teaching"],
  },
] satisfies ReadingSection[];
