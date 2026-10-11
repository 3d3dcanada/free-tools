import type { ReadingSection } from "../types";
export default [
  {
    title: "Distinguish an amount adjustment from a delivery fault",
    paragraphs: [
      "An extrusion multiplier changes the commanded amount of material. It is useful for a fine adjustment in an otherwise sound process, but it cannot make an obstructed feed path or unsuitable profile correct. Before changing it, verify the physical nozzle, material, preparation and supported settings. If extrusion stops, skips badly or suddenly changes partway through a print, follow the under-extrusion diagnostic path first. Increasing a multiplier can mask part of a symptom while leaving the actual cause unresolved and creating excess material elsewhere in the object.",
      "Look at the top of a simple baseline block under consistent light. Describe gaps, ridges or overlap without immediately naming their cause. Similar appearances can involve first-layer conditions, material delivery and other process choices. Identify whether the issue is limited to the first layer, appears throughout the wall or occurs on the top closure. That location matters. A small top-surface flow exercise should not become an excuse to alter the printer's basic motion calibration or copy firmware commands from a procedure intended for different hardware.",
    ],
    sources: ["flow", "under", "firstlayer"],
  },
  {
    title: "Keep multipliers and throughput in different columns",
    paragraphs: [
      "A flow multiplier is commonly expressed as a ratio or percentage. One system may have a slicer setting and a separate firmware adjustment, so unexplained changes in both can combine. For a purely arithmetic example, multiplying 0.98 by 1.02 gives 0.9996, not exactly 1.00. These invented values illustrate why the active settings must be recorded together; they are not recommended calibration values. Prefer the manufacturer's supported adjustment location and keep other modifiers at the known baseline so that the trial has a clear meaning.",
      "Volumetric throughput is a different quantity, measured as volume per time. A rough rectangular-line estimate uses width multiplied by height multiplied by speed. For example, 0.45 millimetres by 0.20 millimetres by 50 millimetres per second is 4.5 cubic millimetres per second. Real slicer bead models can differ from this simplified rectangle. The calculation explains why wider, taller or faster paths ask the hotend to deliver more material. It does not establish the hotend's tested limit, and raising a multiplier does not increase its physical melting capability.",
      "Always copy the units with a throughput value; millimetres per second and cubic millimetres per second describe different quantities and cannot be compared directly.",
    ],
    sources: ["flow", "maxflow"],
  },
  {
    title: "Run only the supported fine adjustment",
    paragraphs: [
      "If the baseline has a repeatable symptom and the maker recommends a flow calibration, follow that procedure with a suitable specimen. Keep geometry, material condition, speed, temperature and viewing conditions unchanged. Record the starting value and the single new setting. Use the prescribed measurement or visual comparison, including its limitations. Do not mix a wall-thickness method from one slicer configuration with assumptions from another without understanding the generated paths. A caliper reading is meaningful only when you know which feature and expected construction it is measuring.",
      "Compare the new sample with the baseline and examine more than one attractive region. A reduced ridge may be helpful, but gaps, weak-looking joins or a rough restart elsewhere deserve attention. If the adjustment does not clearly improve the target observation, restore the baseline. Keep both samples labelled. A sequence of anonymous cubes cannot show which setting produced which effect. Avoid selecting the most flattering photograph while ignoring a failed area, because the purpose of the exercise is a usable process decision rather than a demonstration image.",
    ],
    sources: ["flow", "teaching", "viewer"],
  },
  {
    title: "Stop at a bounded conclusion",
    paragraphs: [
      "Your conclusion can say that a supported change improved the observed top surface for the recorded material and setup. It cannot say that the part is stronger unless you performed an appropriate separate test. Likewise, a visually smooth top does not prove that all internal regions are sound or that the object is watertight. Keep those application requirements separate. If a large correction seems necessary, investigate the setup and seek the maker's guidance instead of assuming that an extreme multiplier is the right permanent profile for every future print.",
      "For the practice record, include the baseline image or description, the source procedure, active modifiers, any changed value and the outcome. If the baseline is already acceptable, write that and keep the original settings. Do not invent a second trial just to fill a comparison table. If feeding is faulty, record the deferred calibration and the diagnostic check that comes first. Knowing why flow tuning should wait is part of understanding the control. It prevents a fine adjustment from becoming a substitute for maintaining a working material-delivery system.",
    ],
    sources: ["flow", "under", "maxflow"],
  },
] satisfies ReadingSection[];
