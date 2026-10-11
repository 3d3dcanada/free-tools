import type { ReadingSection } from "../types";
export default [
  {
    title: "Read dimensions before trusting the picture",
    paragraphs: [
      "Screen zoom makes a tiny object and a huge object look equally impressive. Read the model's dimensions in the slicer and compare them with a drawing, a known feature or the creator's stated size. Write the units explicitly. For the teaching block, the intended dimensions are 20 by 20 by 10 millimetres. Its appearance on the screen is irrelevant to that check. If a dimension is unexpected, investigate the export and import units before dragging a scale handle until the object seems to fit the bed.",
      "Uniform scaling changes more than the overall footprint. Doubling a model's linear dimensions multiplies surface area by four and enclosed volume by eight, for the same geometry. A 20 by 20 by 10 millimetre solid box has 4 cubic centimetres of enclosed volume; a 40 by 40 by 20 box has 32. This calculation does not predict exact filament consumption, because walls, infill and supports also matter. It does explain why enlarging a downloaded design can change its printing problem much more than the on-screen view suggests.",
    ],
    sources: ["first", "design"],
  },
  {
    title: "Choose a base for a reason",
    paragraphs: [
      "Rotate the model to inspect every side, then choose the surface intended to contact the plate. A broad flat face is often convenient for a first block, but more complex parts involve load direction, finish and support access. Use the slicer's placement tool to seat the chosen face deliberately. Check the reported height after rotating. Do not assume an object has landed correctly because its shadow touches the virtual bed. A model can be tilted, partially below the bed or held above it by a small protrusion.",
      "For the 20 by 20 by 10 block, putting a 20 by 20 face down gives a 10 millimetre nominal height. Turning it onto a 20 by 10 face changes the footprint and makes the nominal height 20 millimetres. The enclosed volume stays the same, but the number of layers and available contact area change. This is an original geometry exercise, not a prediction that one orientation is always stronger or faster. Slice both arrangements and inspect the actual paths before deciding which one serves the purpose of your trial.",
    ],
    sources: ["first", "supports", "design"],
  },
  {
    title: "Find islands and space conflicts",
    paragraphs: [
      "An imported object can contain separate shells that look like one assembly from a particular angle. Inspect the object list and the first occupied layers. A decorative dot or detached insert may begin well above the bed while the main body starts normally. The slicer needs a way to build each feature, whether through connected geometry, suitable support or separate placement. Do not declare a model printable simply because the file opens without an error. The visual inspection asks whether every part of the proposed object has a plausible construction path.",
      "Check the complete footprint against the usable build region. Include the support, brim or other aids that your chosen setup actually uses. For multiple objects, inspect their spacing and the slicer's collision or sequential-print restrictions where applicable. A simple bounding-box fit check in the model viewer is useful for screening dimensions, but it is not a full machine collision simulation. Return to the exact printer profile for placement. If you split or rearrange an assembly, keep its original relationship documented so that you do not later confuse separate print positions with final assembly positions.",
    ],
    sources: ["files", "supports", "first"],
  },
  {
    title: "Connect the first layer to the intended object",
    paragraphs: [
      "Move the preview to the first deposited layer. For the teaching block, you should be able to explain its footprint from the selected base. Unexpected tiny contacts, a missing corner or an unrelated patch deserve investigation before export. Work upward through the next layers and look for sudden new islands. The preview shows generated instructions, so it is stronger evidence than the shaded model for this question. It still cannot prove that material will adhere correctly or that the real bed is prepared as the profile assumes.",
      "Save a dimensioned view and the prepared project in your log. After the supervised print and cooling, compare the same named dimensions with the specimen. Keep intended values and actual readings in different columns. If a size differs, do not immediately rescale the entire model: measurement technique, first-layer effects, geometry and process settings may need investigation. The useful lesson outcome is a chain from intended units through placement and preview to a clearly identified measurement. That chain lets a later tolerance exercise address the right feature without losing the original size requirement.",
    ],
    sources: ["viewer", "design"],
  },
] satisfies ReadingSection[];
