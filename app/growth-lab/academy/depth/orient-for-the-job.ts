import type { ReadingSection } from "../types";
export default [
  {
    title: "Draw the use direction before the build direction",
    paragraphs: [
      "Start with a sketch of the part in use. Mark where it is held, where another object contacts it and where a force would act. Then draw the proposed layer direction. This connects manufacturing orientation with the job the geometry must perform. Do not begin by asking which face makes the shortest print. That can be a useful consideration, but it is only one part of the decision. A mounting ear, thin neck or loaded corner may deserve more attention than a large decorative face.",
      "Printed construction can behave differently in different directions. Published orientation experiments show why the direction of layers and paths matters, but their measured values belong to the tested specimens, materials and procedures. Do not transfer a percentage improvement or a winning angle to your own shape without evidence. Use the research to formulate a design question instead. For an L-shaped teaching piece, ask how each orientation places the layers near the corner and how the intended force would act there. Keep the sketch free of invented load ratings.",
    ],
    sources: ["orientation", "design"],
  },
  {
    title: "Compare several consequences of the same rotation",
    paragraphs: [
      "Rotating a part changes its footprint, height, overhangs and the surfaces that contact the bed or supports. It can also change which dimensions are formed across the layer stack. Inspect these effects together. A candidate with convenient layer alignment may require supports on a critical mating face. Another may print with less support but put a delicate feature in an awkward direction. Record the tradeoff in a small table: bed contact, support contacts, important finish surfaces, fit features and the load-direction question. Leave untested behaviour marked as such.",
      "Use the slicer's preview to inspect each candidate, not only the rotated solid view. A face that appears flat may contain a small boss that lifts the rest of the part away from the bed. A support generated beneath an overhang may be trapped after printing. Automatic orientation can help propose candidates, but it does not know every assembly, cosmetic or service requirement. Treat its result as something to inspect. Save the chosen orientation with the project so that later batches do not silently rotate back to a more convenient but unreviewed position.",
    ],
    sources: ["supports", "design", "viewer"],
  },
  {
    title: "Use the two-block exercise to observe construction",
    paragraphs: [
      "The practice uses two 30 by 10 by 5 millimetre blocks in different supported orientations. Keep material and the other relevant settings fixed. Label their build directions before comparison. Examine the base, side and top surfaces and identify which dimension follows the build axis in each specimen. Record the layer appearance and any support contact. This exercise makes orientation visible without requiring a destructive test or an unsafe load. It does not establish which block can carry more force, because no defined mechanical test has been performed.",
      "Compare the generated estimates as predictions, then the actual preparation and cleanup effort as observations. A shorter print may need more support removal; a longer print may preserve a useful face. Write both if they occur. If one specimen fails, retain its failure record and explain which part of the comparison remains incomplete. Do not quietly replace it with an older sample made in another material. Matching the conditions is what allows the small exercise to isolate orientation well enough to teach the intended relationship.",
    ],
    sources: ["layers", "supports", "orientation"],
  },
  {
    title: "Carry the decision into the actual design",
    paragraphs: [
      "For a real part, identify the orientation in the manufacturing record alongside material and model revision. Recheck critical fit features in that orientation, because a clearance trial printed another way may not transfer directly. If supports damage a required face, consider redesigning or splitting the geometry rather than only fine tuning the support interface. If the load path remains uncertain, obtain suitable design and testing help. A model viewer can show geometry and dimensions, but it does not calculate a certified strength or approve the use of a printed bracket.",
      "Finish with a decision sentence that names the chosen candidate, its practical benefit and the unresolved performance question. For example, a candidate may keep a mating face free of support while its load capacity remains untested. Use your own observations rather than copying that example as a result. The important habit is preserving the reason for orientation so that it can be reviewed when the design changes. A later revision with a new hole, thinner neck or different mounting direction may need a fresh comparison even if the overall shape looks familiar.",
    ],
    sources: ["design", "orientation", "cut"],
  },
] satisfies ReadingSection[];
