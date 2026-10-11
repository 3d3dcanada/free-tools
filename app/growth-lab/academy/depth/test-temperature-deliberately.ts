import type { ReadingSection } from "../types";
export default [
  {
    title: "Locate the supported overlap",
    paragraphs: [
      "Find the processing guidance for the exact filament and the operating limits for the actual printer configuration. The usable trial range must respect both. A broad spool label does not override a hotend, nozzle or plate restriction. Start with the supported profile rather than selecting the middle of an internet chart. Record where the baseline came from. If the manufacturer does not provide an appropriate adjustment procedure for your setup, repeat the known baseline and document the question instead of inventing a temperature sweep to satisfy the exercise.",
      "Keep the displayed setpoint separate from the material's service capability. The printer's temperature field describes a process control target, not an allowable temperature for the finished product. It also does not directly measure the polymer's temperature everywhere along the deposited path. Changes in throughput, cooling and geometry influence the process. This is why copying one successful number from another machine is weak evidence. The useful information is a complete supported configuration and a specific observation you want to investigate with a controlled trial.",
    ],
    sources: ["materialtable", "maxflow", "first"],
  },
  {
    title: "Choose a symptom and hold the other inputs still",
    paragraphs: [
      "Write the reason for the trial before slicing: a repeatable surface defect, an extrusion concern or another observation addressed by the manufacturer's procedure. Use the same model, orientation, material condition, speed, flow and cooling for both samples. Keep the physical nozzle and plate unchanged. Temperature interacts with these factors, so changing several at once prevents a simple interpretation. Save separate projects or clearly named variants, and record the exact values in your log. Do not rely on remembering which file contained the warmer or cooler setting after printing.",
      "Use two small separate specimens for a beginner comparison. A tower that changes temperature by height can be useful when correctly generated for a known setup, but downloaded machine instructions can include unrelated assumptions. Separate jobs make each sample's setting easier to trace and avoid hidden height-change commands. Label the specimens before they become mixed with other tests. Inspect the same surfaces under similar light. If one job fails for an unrelated first-layer problem, keep the failure record and do not treat it as a fair temperature comparison.",
    ],
    sources: ["teaching", "first", "viewer"],
  },
  {
    title: "Read several observations without inventing a rating",
    paragraphs: [
      "Compare continuity of deposited lines, visible gaps, excess material and surface appearance where those features relate to your question. Note strings or changes at small details, but remember that moisture and retraction can also contribute. A single good-looking region does not establish the best temperature for every geometry. Record whether the change improved the target feature and whether it introduced another problem. If there is no clear benefit, restoring the baseline is a sensible result. The experiment has answered that this particular change did not justify a new setting.",
      "Do not infer layer strength from gloss or from a casual hand bend. Mechanical testing requires a defined specimen, loading method and acceptance question, and the course's visual comparison does not provide those. Likewise, the absence of strings does not establish that the material is dry or that every part of the process is correct. Use observations as clues with stated limits. A careful note such as fewer visible threads under the same viewing conditions is more useful than an unsupported claim that the sample is fully optimized.",
    ],
    sources: ["string", "dry", "teaching"],
  },
  {
    title: "Keep the result tied to this material and demand",
    paragraphs: [
      "A small slowly printed block may not challenge the hotend in the same way as a long, wide, fast path. The volumetric-speed lesson explains why the amount of material requested per second matters. Do not turn a successful small trial into permission to exceed the supported throughput of the setup. When moving to a different nozzle, material grade or demanding geometry, review the profile and preview again. A temperature adjustment is one element of a process, and it should remain connected to the conditions under which it was assessed.",
      "Finish the record with the source of the allowed settings, variables held constant, observed differences and the decision to keep or restore the baseline. Include any reason the comparison was incomplete. If only one specimen was printed, do not fill the missing result from expectation. If the adjustment is retained, save it as an identified user profile with a short purpose note. That note should explain the benefit for the recorded setup without promising a universal value for the polymer, the brand or every future spool.",
    ],
    sources: ["maxflow", "materialtable", "teaching"],
  },
] satisfies ReadingSection[];
