import type { ReadingSection } from "../types";
export default [
  {
    title: "Make the split solve a specific printing problem",
    paragraphs: [
      "Splitting a model can reduce awkward support, fit a smaller build area or let different regions use more suitable orientations. Write which problem you intend to solve before drawing the cut. A split also introduces an assembly, so it is not automatically an improvement. Compare the whole sequence: printing, support removal, alignment, joining and inspection. A design that saves machine time but creates an inaccessible joint may be harder to make reliably. Keep the unsplit source so that you can compare the original and revised approaches without reconstructing the geometry.",
      "For the teaching block, begin with a simple 40 by 20 by 10 millimetre shape. Choose a cut that leaves two understandable pieces and an accessible joint. Identify which surfaces will sit on the plate and which will meet during assembly. This deliberately modest geometry lets you inspect the relationship between the halves without also solving a complex load problem. The exercise is about alignment and preparation. It does not establish a bonded joint strength or justify placing a seam in the most heavily loaded region of a real bracket.",
    ],
    sources: ["cut", "design"],
  },
  {
    title: "Separate locating from holding together",
    paragraphs: [
      "A peg, socket or other locating feature helps position the pieces. It does not necessarily provide the retention needed in use. A fastener, adhesive or other joint design may perform that second job. Sketch both functions and the assembly direction. Check whether the operator can see the alignment and reach the joining area. A feature that can only be assembled by trapping another component in the wrong order needs redesign. Keep the shape and access clear before adding more connectors in the hope that extra detail will solve a poorly planned seam.",
      "Use explicit fit allowances and test a short representative section before the complete halves. Perfectly matching nominal dimensions may not assemble after printing. The fit lesson's small coupons help select a candidate for the same orientation and material. A slicer's connector tool can generate geometry, but you still need to inspect the resulting parts and test the actual fit. Record whether the connector is printed separately or belongs to one half. This matters when naming exports and preparing a batch, because a missing small connector can leave two apparently finished pieces unusable.",
    ],
    sources: ["cut", "design", "fasteners"],
  },
  {
    title: "Keep exports and assembly identity clear",
    paragraphs: [
      "Save the editable design, model revision and the two exported pieces under names that identify their role. Preserve a view of the assembled relationship, because the print orientations may look unrelated when laid out on the bed. Check scale and units on each export. If the pieces are prepared in separate slicer projects, verify the same intended material and relevant settings rather than assuming one project inherited the other. Label the cooled specimens in a way that does not damage a mating surface or obscure the feature you need to inspect.",
      "Dry-assemble first. Check whether the locating feature seats, whether the outer surfaces align and whether an unintended gap remains. Record what you see before filing or sanding. If an interference occurs at a first-layer lip or support scar, investigate that specific region rather than globally scaling a whole half. A global scale change can move every dimension, including features that already fit. Revise the relevant geometry or process deliberately, keep the prior revision and repeat the small test so that the effect remains traceable.",
    ],
    sources: ["design", "firstlayer", "supportfinish"],
  },
  {
    title: "Plan any permanent joint as its own operation",
    paragraphs: [
      "If the eventual design uses adhesive, verify the product's material compatibility, preparation and safety instructions. Do not assume that an available household glue will create a reliable bond between every printed polymer. The surface condition, joint geometry and curing process matter. The beginner exercise can stop at dry assembly, which avoids claiming a permanent-joint result it has not established. A mechanical fastener can be another option when access allows, but it also needs suitable dimensions and an inspection plan. No joining method removes the need to understand the load path.",
      "Finish with the source file, exported pieces, assembly sketch and an observed alignment result. State which function the locating feature performs and which retention or load questions remain open. If the split did not improve the original printing problem, retain that conclusion and reconsider the seam or orientation. A useful design trial may show that the simpler unsplit version is preferable. What matters is the documented comparison of complete workflows, not the number of pieces or the sophistication of the connector shape added to the model.",
    ],
    sources: ["cut", "design", "fasteners", "safety"],
  },
] satisfies ReadingSection[];
