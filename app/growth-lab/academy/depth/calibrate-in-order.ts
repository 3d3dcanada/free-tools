import type { ReadingSection } from "../types";
export default [
  {
    title: "Ask whether tuning is needed at all",
    paragraphs: [
      "Calibration should address a defined observation. Begin by printing a small specimen with the correct supported baseline and recording its result. If it meets the purpose of the exercise, you do not need to change a setting simply because an online guide contains another test. Unnecessary tuning adds variables and can make a known setup harder to recover. Write baseline acceptable when that is what you observed. A useful calibration habit includes knowing when to stop, not only knowing which parameter can be adjusted next.",
      "If there is a repeatable issue, describe it narrowly. A gap between top lines, an unattached first layer and a shifted upper section are different observations. Each points toward a different investigation. Avoid using one global label such as inaccurate for all of them. Save a photograph or sketch and identify the relevant feature. The next experiment should have a sentence explaining why its chosen change might address that feature. If you cannot connect the parameter to the observation, inspect the setup before changing it.",
      "Choose the smallest specimen that still contains the troublesome feature, so each justified comparison costs less material and makes the result easier to inspect.",
    ],
    sources: ["teaching", "flow", "firstlayer"],
  },
  {
    title: "Put a sound machine ahead of fine adjustments",
    paragraphs: [
      "Use the exact printer's maintenance and startup checks. With the equipment in its documented safe state, identify obvious obstructions, loose parts or damage that the routine inspection is intended to catch. Do not disassemble unfamiliar components or adjust every fastener. A damaged feed path or incorrect physical nozzle cannot be properly corrected by a cosmetic flow tweak. Record any repair or maintenance separately, then re-establish the supported baseline. Otherwise, the improvement from fixing hardware can be wrongly attributed to an unrelated slicer change made at the same time.",
      "Automatic and manual calibration systems differ. A procedure for a printer with a particular probe and manual first-layer offset is not a general command sequence for every machine. Follow the maker's self-test, plate and startup workflow for your revision. Do not paste firmware commands from an unrelated guide just because their names sound familiar. If a supported procedure reports a failure, resolve that failure before beginning fine tuning. A successful calibration screen also does not replace inspection of the physical sample that the process produces.",
    ],
    sources: ["maintenance", "firstlayer", "safety"],
  },
  {
    title: "Preserve one baseline and one controlled change",
    paragraphs: [
      "Save the original model and profile under a clear job identifier. Print two baseline samples without intentional changes if you need to understand ordinary variation. Use the same material, orientation and inspection method. If their results differ substantially, investigate that inconsistency before comparing a tuned sample. A single improved print may simply reflect an uncontrolled change in preparation or material condition. You do not need a complex statistical study for this beginner exercise, but you do need enough consistency to interpret the direction of a small adjustment.",
      "For the next trial, change one supported parameter and record its old and new values. Keep the original project so the change is reversible. Inspect the target feature and also look for new defects. A smoother top accompanied by missing material elsewhere may not be an improvement for the job. If the trial does not help, restore the baseline and record the outcome. Do not stack additional changes on top of an unsuccessful experiment until you can explain which configuration the next result will actually represent.",
    ],
    sources: ["teaching", "flow", "viewer"],
  },
  {
    title: "Decide what the result supports",
    paragraphs: [
      "A calibration sample can show that a particular preparation and setting improved a particular observation. It cannot establish every material property or qualify a different geometry. Keep the conclusion attached to the tested conditions. If a temperature or flow adjustment improves one spool's surface, record the grade and condition rather than declaring a universal value for the polymer. When the physical nozzle, material or relevant hardware changes, revisit the matching and baseline checks. This is why a saved profile should carry a meaningful name and an accompanying note.",
      "Finish the practice with two labelled baseline records and a decision: keep the baseline, run one justified trial or investigate a setup fault. Include the source procedure you used and the observation that led to the decision. A course quiz can check whether you understand this sequence, but it cannot inspect the printer or validate an adjustment. The practical evidence stays in your own log. That separation makes the completion record honest while still giving you a concrete method to use the next time a print looks wrong.",
    ],
    sources: ["teaching", "firstlayer", "flow"],
  },
] satisfies ReadingSection[];
