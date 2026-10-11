import type { ReadingSection } from "../types";
export default [
  {
    title: "Describe the strands before choosing a cause",
    paragraphs: [
      "Look at where the strands begin and end. Are they between separate features along travel routes, around a small detail or mixed with other extrusion defects? Compare the physical sample with the sliced preview. Record the material, spool condition, profile and any recent change. Thin strings are an observation; excessive retraction distance is only one possible hypothesis among several process questions. Beginning with a precise description makes it easier to choose a small useful correction instead of changing every setting whose name appears in an online troubleshooting list.",
      "Distinguish the as-printed result from cleanup. A sample photographed after threads were removed cannot show how much stringing the process produced. Keep an image or note before cleaning, then record the cleanup effort separately if it matters to the job. Fine threads may be mainly cosmetic in one desk-use sample but obstruct a moving feature in another design. The intended application determines the acceptance question. Do not assume that a visually minor defect is always harmless, or that every visible strand requires an elaborate calibration campaign.",
    ],
    sources: ["string", "viewer", "design"],
  },
  {
    title: "Check material condition without inventing a diagnosis",
    paragraphs: [
      "Read the exact filament's storage and drying instructions. Moisture can contribute to poor surface and extrusion behaviour, but stringing alone does not prove a wet spool. Record the storage history you actually know and leave unknown history marked unknown. If a supported drying trial is justified, use equipment and a spool compatible with the documented conditions. A sealed container with desiccant is not automatically an active dryer. Do not deliberately wet material to make this exercise more dramatic or use improvised heating that the equipment cannot control appropriately.",
      "Treat drying as one changed condition. Establish the result with the unchanged supported print profile before also altering temperature or retraction. If the strings improve, record that association without claiming every future string has the same cause. If they do not, retain the observation and continue with another justified check. This sequence may seem slower than moving several sliders at once, but it gives each small trial a readable meaning. It also reduces the chance of keeping unnecessary extreme settings after a simple material-condition correction has already solved the issue.",
    ],
    sources: ["dry", "string", "teaching"],
  },
  {
    title: "Verify temperature and travel settings against the baseline",
    paragraphs: [
      "Confirm the actual material and nozzle profile, then compare the active temperature and retraction settings with the supported baseline. An imported project or an earlier experiment may have left a change you forgot. Restore a known configuration before fine tuning around it. Inspect the travel between the two teaching pillars and identify the restart points. Retraction affects material movement around those travels, but its useful amount depends on the feed system and material. Do not transfer a distance or speed from another printer simply because its specimen looks similar.",
      "When the manufacturer's procedure supports an adjustment, change one parameter and retain the previous value. Keep the model, material condition and other settings fixed. Compare the amount and location of strings, then examine whether the next extrusion starts cleanly. A reduction in threads accompanied by missing material at every restart is a tradeoff that may be unacceptable. Record both features. The aim is a usable printing process, not the disappearance of one symptom at any cost. Return to the baseline when the trial creates a worse overall result.",
    ],
    sources: ["string", "under", "tpu"],
  },
  {
    title: "Use the result to choose a practical next step",
    paragraphs: [
      "Reprint the two-pillar specimen from the retraction lesson after the single justified correction. Keep the earlier sample and job file for a direct comparison. Label the new one with its changed condition. If the outcome is unclear, repeat the observation method before declaring an improvement; lighting and viewing angle can make fine threads look very different. If the issue persists across supported checks, gather the spool, machine, profile and photographs for an experienced operator or manufacturer. That packet is more useful than a statement that every setting has already been tried.",
      "End the log with a hypothesis, the change, two observations and the decision. For example, the observations can cover strands and restart continuity, while the decision says keep, restore or investigate further. Use actual results rather than copying an expected outcome. If no stringing is present on your baseline, document the clean reference and the diagnostic path without generating a fault. This lesson teaches a response to evidence. It does not require deliberately degrading a working printer or proving a universal moisture, temperature or retraction rule for all materials.",
    ],
    sources: ["string", "dry", "under"],
  },
] satisfies ReadingSection[];
