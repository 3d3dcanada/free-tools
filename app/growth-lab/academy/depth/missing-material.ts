import type { ReadingSection } from "../types";
export default [
  {
    title: "Locate where delivery and the intended paths diverge",
    paragraphs: [
      "Missing material may appear as gaps between lines, thin wall regions or an interruption partway through a print. Compare the defect with the sliced paths before deciding which system failed. If a feature is absent from the preview, the printer was not instructed to build it in the expected way. If the path exists but the material is missing, investigate delivery and process conditions. Record the location, height and whether the issue began after a change. Stop a clearly failing job rather than continuing to accumulate an unusable specimen.",
      "Recent changes can provide useful clues. A new spool, different nozzle, imported profile or maintenance task may have altered an assumption. Write those changes down without automatically blaming them. A repeatable gap on every fast infill move suggests a different first check from a sudden complete loss of extrusion after a spool snag. Keep the observation specific enough to distinguish those cases. The term under-extrusion describes the visible shortage, but it does not identify which part of the material path or configuration caused it.",
    ],
    sources: ["under", "viewer", "first"],
  },
  {
    title: "Trace the feed route in the documented safe state",
    paragraphs: [
      "Check the external material route, spool movement and permitted guides without reaching into active machinery. Look for a visible snag, incompatible routing or another obstruction addressed by the maker's routine. Do not pull forcefully against an operating feeder. If inspection or unloading requires a heated state, follow the specific procedure and its precautions rather than treating all maintenance as either cold or hot. The equipment design determines how safe access is achieved. Stop and seek qualified help when the required task exceeds the documented operator procedure.",
      "Confirm the fitted nozzle and selected profile, then check material and temperature compatibility. A mismatch can change the assumptions behind the generated extrusion. Inspect any relevant warnings from the machine's supported self-test or maintenance workflow. Do not tighten feed components indiscriminately or dismantle a hotend using instructions for another revision. A photograph and configuration record can help the manufacturer distinguish a common operator check from a repair. Keeping the investigation orderly reduces the chance of creating several new faults while trying to solve the original shortage.",
    ],
    sources: ["under", "maintenance", "safety"],
  },
  {
    title: "Separate requested throughput from a flow multiplier",
    paragraphs: [
      "A wider or taller path at the same travel speed asks for more material per second. As a simplified rectangular example, 0.5 millimetres of width times 0.2 millimetres of height times 80 millimetres per second gives 8 cubic millimetres per second. Increasing speed to 120 gives 12. These arithmetic examples describe demand, not a measured capacity for your hotend. Real bead models and machine limits add detail. Use the manufacturer's supported volumetric settings and inspect the preview instead of assuming that a commanded speed is physically achievable for every path.",
      "An extrusion multiplier changes the commanded amount but does not remove an obstruction or raise the hardware's melt capacity. Increasing it to hide a delivery fault can add excess material where the process was already working. Fine flow calibration belongs after the machine, feed path and material conditions are sound. If the issue appears only under higher demand, return to the supported baseline and follow the maker's throughput guidance. Do not treat a slowdown that masks the symptom as proof that every other underlying cause has been eliminated.",
    ],
    sources: ["maxflow", "flow", "under"],
  },
  {
    title: "Retest a known specimen and preserve unresolved evidence",
    paragraphs: [
      "After a documented correction or maintenance procedure, print the same small baseline specimen with known settings. Compare the region that originally showed missing material and inspect the rest of the part for new defects. Record the actual result before making a second change. If the printer already produces a sound baseline, use that specimen to practise the diagnostic reasoning; do not deliberately create a clog. A successful retest supports the correction for the observed conditions, while a repeated failure justifies collecting better evidence or seeking qualified diagnosis.",
      "The log should contain the symptom location, recent changes, feed and profile checks, the procedure followed and the retest outcome. If the cause remains uncertain, say so. Do not call an unexplained successful print a confirmed repair. Save the failed and successful projects and label their specimens so that an experienced operator can compare them. This lesson's useful result is a traceable path from missing material to a justified next check, with fine flow adjustments kept in their proper role instead of becoming a universal response to every gap.",
    ],
    sources: ["under", "flow", "teaching"],
  },
] satisfies ReadingSection[];
