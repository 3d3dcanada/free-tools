import type { ReadingSection } from "../types";
export default [
  {
    title: "Read the grade before choosing the feed route",
    paragraphs: [
      "Flexible filament introduces a material-delivery problem as well as a part-design opportunity. A strand that bends easily can be harder to push through an unsupported or unsuitable feed path. Identify the exact TPU grade and any hardness designation, then read the printer and feeder compatibility instructions. A multi-spool accessory that supports rigid filament may have restrictions for flexible grades. Do not infer compatibility from whether the spool physically fits. Use the documented loading route, including any required bypass, only when the equipment maker supports that arrangement.",
      "Hardness describes one aspect of the material, not the complete behaviour of a printed pad. Two shapes made from the same filament can feel different because of their thickness, walls and internal structure. Conversely, a harder grade may still produce a compliant geometry when designed for it. Keep these variables separate in your notes. Record the manufacturer and grade rather than writing only rubber-like. That wording identifies neither the supported processing conditions nor the source of the property claim you may later be tempted to attach to the finished part.",
    ],
    sources: ["tpu", "materialtable"],
  },
  {
    title: "Establish feeding and condition before tuning strings",
    paragraphs: [
      "Start from a flexible-filament profile supported for the actual machine. Confirm the material's drying and storage requirements and the build surface procedure. Do not copy the rigid-filament speed and retraction values simply because they worked yesterday. Observe the feed from outside active motion and stop a jam through the proper controls. Forcing filament while the mechanism is running is not a calibration method. If loading or delivery fails, use the specific equipment procedure before trying to hide the fault with larger flow or retraction changes.",
      "Stringing can involve material condition, temperature and motion as well as retraction. A flexible feed path also responds differently from a rigid one. Increase only a parameter that the manufacturer's supported procedure tells you to investigate, and retain the starting value. Compare both the strings and the next extrusion start. A setting that reduces a fine thread but creates gaps at every restart may be a worse result for the intended part. This is a reason to observe multiple features of the same trial, not to chase one attractive photograph.",
    ],
    sources: ["tpu", "dry", "string"],
  },
  {
    title: "Use geometry to make the comparison understandable",
    paragraphs: [
      "The lesson's 25 by 25 by 3 millimetre pad is deliberately low and simple. It avoids beginning with tall, delicate features or trapped supports. Print the supported baseline, let it cool and release it using the approved surface procedure. Inspect the underside, edges and continuity before comparing its feel. A gentle hand comparison can describe an observation such as easier to bend than another sample. It does not measure a standardized hardness, fatigue life, impact protection or a load rating. Do not relabel a casual squeeze as a mechanical test.",
      "For a later comparison, keep the outer dimensions, filament and profile fixed while changing one construction choice, such as wall count. Inspect the paths to confirm what changed. Label both pads and compare them in the same orientation. Explain whether the visible construction change corresponds to the observed difference in bending or compression. If not, record that too. Do not claim that the infill percentage alone determines flexibility, because wall thickness, top and bottom layers and the direction of deformation all contribute to how the actual geometry behaves.",
    ],
    sources: ["tpu", "layers", "infill"],
  },
  {
    title: "Keep the use claim modest and the record exact",
    paragraphs: [
      "A flexible-looking part can invite unsuitable assumptions: safe for a child, suitable for skin contact or protective in an impact. None follows from the word TPU or a successful print. Identify the intended use and what would happen if the part tore, detached or permanently changed shape. The beginner exercise stays with a simple desk-use specimen. Applications with special contact, protective or safety requirements need their own evaluation. Material data and a supported printing profile are useful inputs to that work, not automatic approval of the finished object.",
      "Record the exact grade, feed route, plate treatment, baseline profile and observed result. If the available printer does not support the TPU trial, print the same simple shape in a supported material only to practise geometry and logging. Mark it as a substitute and write which TPU requirements remain unresolved. That specimen proves nothing about flexible feeding or TPU performance. A complete lesson record can include a sound readiness plan and a clearly limited substitute, provided it does not turn the missing material trial into a success claim.",
    ],
    sources: ["tpu", "materialtable", "safety"],
  },
] satisfies ReadingSection[];
