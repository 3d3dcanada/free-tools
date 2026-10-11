import type { ReadingSection } from "../types";
export default [
  {
    title: "Record the question, not just the settings",
    paragraphs: [
      "A print log should help you make the next decision. Begin with a sentence describing the question: whether a tab fits a slot, whether a wall has gaps, or whether a different layer preset changes the visible stepping. Without that sentence, a long settings list can become a collection of numbers with no purpose. Give the trial an identifier and connect it to the model revision. Keep the original project so that you can recover settings you did not think to copy into the short log.",
      "Record the printer, physical nozzle, build surface, material grade and saved profile. Add information that changed or might explain a result, such as a different spool or recent maintenance. You do not need to transcribe every slicer field by hand. A saved project plus a concise note about the controlled change is usually more readable. Use dates and consistent filenames so that a photograph, sample and project can be matched later. If a sample loses its label, do not silently assign it to whichever result you prefer.",
    ],
    sources: ["teaching", "viewer"],
  },
  {
    title: "Keep estimates, measurements and unknowns apart",
    paragraphs: [
      "Before printing, the slicer can provide predicted time and material use. Those values belong in an estimate column. Actual duration, consumed material and dimensions belong in a measurement column only after you have a suitable observation. A blank means you do not know yet; zero means you measured or otherwise established no amount. Do not fill a missing power reading with zero just to complete a cost formula. Add a note about the method, because weighing a cleaned part and estimating total spool consumption describe different quantities.",
      "Consider a fictional exercise with a 30 minute prediction and a 38 minute observed machine cycle. The difference is eight minutes, but it does not immediately identify a fault. Decide what each interval includes: heating, calibration, printing, cooling or handling. Compare like boundaries before explaining a discrepancy. Similarly, a slicer estimate that includes supports should not be compared with the mass of a cleaned part as though both describe identical material. These are invented numbers for practising the record structure, not promised performance for your printer.",
      "If weighing a spool before and after a job, use the same spool and scale arrangement for both readings; changing the empty-spool allowance changes the comparison.",
    ],
    sources: ["viewer", "cost"],
  },
  {
    title: "Make a comparison that answers one thing",
    paragraphs: [
      "Suppose the side of your block looks rough. If you change temperature, speed, layer height and material together, a smoother second block cannot tell you which change mattered. Keep a baseline and choose one supported adjustment that addresses a specific observation. Write the expected direction of the effect before printing. Afterward, compare the same surface under similar light and from the same angle. This does not make a small workshop trial a controlled laboratory study, but it makes your reasoning inspectable and reduces the temptation to explain every improvement after the fact.",
      "Keep unsuccessful trials. A lower speed that leaves the defect unchanged is information about that hypothesis. A print stopped because the first layer detached is not a successful surface-finish sample, but its failure still belongs in the log. Record when the issue appeared and what you actually saw, then choose the next check. Avoid labels such as bad filament unless you have evidence that isolates the material. Descriptions such as three gaps on one wall or a corner lifting late in the job are more useful starting points.",
    ],
    sources: ["teaching", "under", "warp"],
  },
  {
    title: "Use the log without creating a paperwork project",
    paragraphs: [
      "A compact entry can contain the job ID, question, saved project, physical setup, estimate, actual result and next action. Attach a photo or a sketch only when it helps explain the observation. For your first block, one measured dimension and one surface observation are enough to practise the method. Write units beside every value. A length without millimetres or inches and a time without minutes or hours can become misleading when copied into another tool. Keep the measuring method consistent if you later compare several samples.",
      "Store the record where you can find it after the browser or slicer is closed. The academy saves quiz progress locally, but that is not a storage system for your projects, photographs or physical measurements. Export progress if you need a backup and retain your own job folder separately. When returning to a trial weeks later, ask whether another person could identify the input, repeat the preparation and understand the result without guessing. If one essential detail is missing, add that field next time rather than expanding the log with unrelated settings.",
    ],
    sources: ["teaching", "cost"],
  },
] satisfies ReadingSection[];
