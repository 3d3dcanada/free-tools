import type { ReadingSection } from "../types";
export default [
  {
    title: "Describe the motion and retention you want",
    paragraphs: [
      "A fit is a behaviour between parts, not just two nominal dimensions. Decide whether the pieces should slide freely, locate with a little play or remain retained after assembly. Also ask whether they must come apart repeatedly and how the user can grip them. A tight connection that can only be assembled with uncontrolled force may be unsuitable even if it technically goes together. Write the intended behaviour before choosing a clearance. That turns the trial into a decision about the job rather than a search for one supposedly perfect tolerance.",
      "Distinguish total clearance from clearance on each side. For a centred 10.0 millimetre square peg inside a 10.4 millimetre square opening, the nominal total width difference is 0.4 millimetres, or 0.2 on each side. Those are design dimensions, not measured printed results. A circular diameter difference similarly differs from the radial gap. Label which quantity your drawing or calculator uses. This simple bookkeeping prevents a common mistake where an allowance is unintentionally doubled or halved while moving between a sketch, CAD parameters and a fit table.",
    ],
    sources: ["design"],
  },
  {
    title: "Print a short representative section",
    paragraphs: [
      "Instead of printing the complete enclosure and lid, isolate the mating feature in a short coupon. Preserve its important wall thickness, corner shape, orientation and material so that the small trial resembles the real construction. Add labels to identify each variant after printing. The course's square peg and three sleeves use experimental internal widths of 10.2, 10.4 and 10.6 millimetres. These values create a comparison; they are not recommended universal clearances. Keep the nominal peg dimension fixed so that the changed input is easy to understand.",
      "A short coupon can still miss a feature of the final assembly. A long slide has more contact length, a flexible wall can deform differently and a large part can distort in ways the coupon does not. Use the coupon to choose a candidate worth retesting, then verify it in the final design. Do not describe the first fitting sleeve as production tolerance. Record how the pieces were printed and which faces touched the bed, because first-layer effects and orientation can influence where contact occurs during assembly.",
    ],
    sources: ["design", "firstlayer"],
  },
  {
    title: "Measure and assemble without forcing the answer",
    paragraphs: [
      "Let the samples cool according to the material and plate procedure. Measure the peg and opening with a suitable method and record actual values separately from the CAD dimensions. Check for a first-layer lip, rough support contact or debris before judging the entire fit. Try assembly gently in the intended direction. Stop if the pieces crack, distort badly or require an unsafe tool arrangement. A forced fit that damages one piece is not evidence that the nominal clearance is correct for repeatable assembly.",
      "Manufacturing variation can affect both mating parts. As a simplified arithmetic exercise, a nominal total clearance of 0.40 millimetres with each dimension varying by plus or minus 0.10 millimetres gives a possible clearance range from 0.20 to 0.60 millimetres. The worst cases combine a small opening with a large peg, or the reverse. The variation values are assumed teaching inputs, not your printer's measured accuracy. Use the example to see why testing only one pair cannot establish the behaviour of every future pair.",
    ],
    sources: ["design", "flow", "firstlayer"],
  },
  {
    title: "Keep fit evidence connected to the final part",
    paragraphs: [
      "For each labelled pair, record measured dimensions, assembly feel, visible damage and whether it can be separated as intended. Choose a candidate based on the required behaviour, not simply the smallest gap that could be pushed together. Repeat the candidate and then test it in the actual design and material. If the final part includes a different surface treatment or coating, account for that change too. Removing or adding material during finishing can change a fit even when the underlying print came from the same saved profile.",
      "A press fit, snap or loaded joint needs more design work than this simple clearance exercise. Material deformation, repeated assembly and consequences of failure matter. Keep the beginner trial to gentle, accessible desk-use samples, and obtain suitable help for demanding connections. Your useful outcome is a labelled comparison with one candidate and explicit limits. The tolerance calculator can help organize nominal values and assumed variation, but it cannot discover the actual uncertainty of your printer or certify the retained connection from arithmetic alone. Physical evidence remains necessary.",
    ],
    sources: ["design", "fasteners", "finish"],
  },
] satisfies ReadingSection[];
