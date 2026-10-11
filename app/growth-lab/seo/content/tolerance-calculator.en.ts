import type { ToolGuide } from "../guide";
export default {
  slug: "tolerance-calculator",
  locale: "en",
  title: "FDM Fit & Diametral Clearance Calculator | 3D3D",
  description:
    "Plan a trial shaft-and-hole fit with signed diametral clearance and uncertainty per part. Compare worst-case limits and save a free local report.",
  name: "FDM Fit Calculator",
  headline: "Leave room for the parts you actually print.",
  summary: "Compare nominal fit and a simple worst-case clearance interval.",
  answer:
    "Plan a trial FDM shaft-and-hole fit for free without uploading data. Enter shaft diameter, signed diametral clearance and dimensional uncertainty per part to calculate the nominal hole and possible clearance interval. Press, slide and clearance choices are starting examples, not fit standards. Print and measure a small test pair in the intended material and orientation.",
  steps: [
    "Enter the shaft’s nominal diameter in millimetres. Choose an example fit or enter your own signed diametral clearance. Positive clearance makes the hole larger than the shaft; a negative value creates nominal interference.",
    "Enter a realistic dimensional uncertainty for each part, based on measurements from the printer, material and orientation you plan to use. This single value is applied to both diameters in the simplified model; it is not inferred from a printer brand.",
    "Read the nominal hole, radial gap and minimum-to-maximum clearance. If the interval crosses zero, the same nominal design may produce either clearance or interference within the entered uncertainty. Do not describe that as a guaranteed sliding fit.",
    "Print a small mating test pair with the relevant feature length and orientation. Measure and assemble it, record the result and adjust the design if necessary. Save the report with the test conditions before committing to a larger assembly.",
  ],
  sections: [
    {
      heading: "Keep diametral and radial values separate",
      paragraphs: [
        "Diametral clearance is the hole diameter minus the shaft diameter. A 10 millimetre shaft with 0.2 millimetre diametral clearance calls for a nominal 10.2 millimetre hole. The ideal centred radial gap is half that difference, or 0.1 millimetre. Confusing these two quantities can double the intended allowance. Use the dimension type explicitly in a drawing or note passed to another person.",
        "Negative clearance represents interference in the nominal geometry. The press example uses minus 0.05 millimetre, making a nominal 9.95 millimetre hole for a 10 millimetre shaft. It does not predict insertion force, retention strength or whether a printed wall will crack. Material, geometry, layer direction, surface finish and assembly method still matter. Treat the example as a coupon starting point rather than a universal press-fit instruction.",
      ],
    },
    {
      heading: "Read the uncertainty interval honestly",
      paragraphs: [
        "The calculation assumes each diameter may vary by the entered uncertainty in either direction. The worst-case clearance therefore spans the nominal clearance minus twice that uncertainty to the nominal clearance plus twice it. With 0.2 millimetre clearance and 0.1 millimetre uncertainty per part, the interval runs from zero to 0.4 millimetre. Zero at the boundary does not promise smooth motion across real printed surfaces.",
        "This is a bounded dimensional model, not a statistical probability distribution. It does not say how often either extreme will occur. An uncertainty value should come from relevant measurements, not from a desired green result. If only one part is printed, or the hole and shaft have substantially different process variation, use a more detailed tolerance analysis for the actual assembly instead of assuming this symmetric approximation is sufficient.",
      ],
    },
    {
      heading: "Test the feature, not just a generic cube",
      paragraphs: [
        "A useful test coupon reproduces the mating geometry, engagement length and print orientation that influence the fit. A short peg may enter where a long one binds, and a hole in another orientation may behave differently. Measure several relevant features and note the material, profile and any finishing. Avoid changing multiple print settings between trials if you want to understand which adjustment improved the result.",
        "The calculator does not model threads, snap hooks, thermal expansion, elastic deformation or safety-critical retention. It also does not certify a printer’s accuracy. Keep the physical test result with the numerical report and identify the part revision used. For a part made by 3D3D, describe the mating component and functional requirement in the quote request so the fit can be reviewed in the actual manufacturing context.",
      ],
    },
  ],
  comparison: [
    {
      name: "Prusa design guidance",
      detail: "Discusses designing clearances and testing printed fits.",
      url: "https://help.prusa3d.com/article/modeling-with-3d-printing-in-mind_164135",
    },
  ],
  faqs: [
    {
      q: "Is clearance measured on the diameter or radius?",
      a: "The input is diametral: hole minus shaft diameter. The displayed radial gap is half that amount for an ideal centred pair.",
    },
    {
      q: "Are the press and slide examples standards?",
      a: "No. They are trial-coupon starting values. Printer, material, orientation and geometry can require different allowances verified by physical testing.",
    },
    {
      q: "Why is uncertainty multiplied by two?",
      a: "The simplified worst case lets the hole shrink while the shaft grows, or the reverse. Each diameter contributes the entered uncertainty to the total clearance range.",
    },
    {
      q: "What does an interval crossing zero mean?",
      a: "Within your stated bounds, the pair could have clearance or interference. That is uncertainty about assembly behaviour, not a guaranteed sliding or press fit.",
    },
    {
      q: "Does this calculate insertion force?",
      a: "No. It only compares diameters. Force and retention depend on additional material and geometric behaviour that this calculator does not model.",
    },
    {
      q: "Can I skip a physical test if the numbers look right?",
      a: "The result does not replace a fit coupon. Print, measure and assemble a representative pair before relying on the allowance in a larger or important part.",
    },
  ],
  service: { label: "Discuss a mating part with 3D3D", path: "/quote" },
} satisfies ToolGuide;
