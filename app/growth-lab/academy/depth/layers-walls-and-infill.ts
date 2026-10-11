import type { ReadingSection } from "../types";
export default [
  {
    title: "Read a printed object in three directions",
    paragraphs: [
      "Layer height describes the vertical increment used to build the object. It is different from the width of a deposited line and from the nozzle's diameter. Finer layers can reduce visible stepping on a sloped surface, but they also change the number of layers and the work required. A vertical flat wall and a shallow curved top do not benefit in exactly the same way. Choose a supported preset and identify the surface you hope to improve before spending extra printing time on a smaller number.",
      "For a simplified 10 millimetre tall block, constant 0.20 millimetre increments give 50 nominal layers, while 0.10 millimetre increments give 100. Real first-layer settings and variable layers can change those counts. Twice as many layers does not guarantee exactly twice the print time, because movement, cooling and other limits contribute. Compare the generated estimates, then record actual times with consistent start and end boundaries. This example teaches the direction of a tradeoff; it is not a timing formula for every printer and model.",
    ],
    sources: ["layers", "viewer"],
  },
  {
    title: "Separate the shell from the interior",
    paragraphs: [
      "Use a sliced cross-section to locate perimeter walls, solid top and bottom layers, and sparse infill. The walls follow the outside and any internal boundaries such as holes. Top and bottom regions close the object. Sparse infill occupies part of the remaining interior and can support the closing layers. These roles overlap in a real part, but they are not interchangeable controls. Adding infill does not simply add the same material in the same location as adding another wall. Look at where the paths actually move.",
      "Take a block with an internal opening and compare two wall settings while leaving the other inputs fixed. The extra perimeter should appear around the relevant boundaries in preview. Now restore the baseline and compare a different infill setting. The added paths appear in another region. Save both screenshots with clear labels. You have demonstrated a change in construction, not measured strength. A mechanical claim would require the actual material, orientation, geometry, process and loading conditions to be tested. The preview alone cannot supply that missing evidence.",
      "Sparse infill percentage applies to the interior construction; it is not simply the percentage of the complete model volume that becomes plastic.",
    ],
    sources: ["layers", "infill", "patterns"],
  },
  {
    title: "Choose settings around a part's job",
    paragraphs: [
      "A thin display shell, a squeezable pad and a bracket ask different questions. For the shell, appearance and top closure may dominate. For the pad, wall construction can strongly affect how the shape deforms. For the bracket, the load path and orientation may matter more than a single infill percentage. Begin with the required behaviour and a supported baseline. Avoid treating a percentage as a grade of quality. A part labelled 100 percent infill can still have poor bonding, unsuitable geometry or a material that does not suit the application.",
      "Top surfaces are a useful place to observe interactions. A closing layer must bridge the spaces beneath it, so the internal pattern and spacing can affect its support. Changing only the visible top-layer count may not answer every rough-top problem. Inspect the layers below the defect and compare with the manufacturer's guidance. Similarly, thin features can leave little room for an infill region at all. A slider change that seems large may barely alter that feature's paths. This is why inspecting the cross-section is more informative than reporting only the settings panel.",
    ],
    sources: ["infill", "patterns", "layers"],
  },
  {
    title: "Run a comparison you can interpret",
    paragraphs: [
      "For this lesson, print two small blocks using the same geometry, material, orientation and infill, changing only between supported layer-height presets. Record the preset names, generated estimates and actual outcome. Compare the same side under similar light. If the finer block looks better but takes longer, describe both observations. If no useful difference is visible for this shape, that is also a result. Do not invent a strength conclusion from squeezing the samples by hand; the exercise concerns visible finish and the recorded process.",
      "Keep each sample labelled so that the comparison survives beyond the print session. Add one sentence explaining which setting you would keep for this specific teaching block and why. A later curved object could justify a different choice. If either print failed, diagnose that failure before trying to rank the presets. Returning to the baseline is part of a sound comparison, not a setback. The aim is to learn what a control changes in the paths and which observation would justify using it for the next real job.",
    ],
    sources: ["layers", "teaching"],
  },
] satisfies ReadingSection[];
