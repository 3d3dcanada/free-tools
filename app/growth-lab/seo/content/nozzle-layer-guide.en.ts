import type { ToolGuide } from "../guide";
export default {
  slug: "nozzle-layer-guide",
  locale: "en",
  title: "Nozzle Diameter & Layer Height Guide | 3D3D",
  description:
    "Compare layer height with nozzle diameter, see trial examples and check the general 80% boundary. Free local guide with a downloadable report.",
  name: "Nozzle and Layer Height Guide",
  headline: "Choose a layer height with a useful reference.",
  summary: "Compare a proposed layer height with the nozzle diameter and profile guidance.",
  answer:
    "Compare nozzle diameter and layer height for free without uploading data. Enter both values to see their ratio, three example heights and the general boundary below eighty percent of nozzle diameter. This is a planning guide, not a complete slicer profile. Confirm the printer and material profile, inspect the sliced preview and test the actual result.",
  steps: [
    "Confirm the nozzle physically installed on the printer and the nozzle selected in the slicer profile. Enter its diameter in millimetres. Do not assume that the default profile changed automatically after a hardware nozzle replacement.",
    "Enter the layer height you are considering. Read the ratio and the general upper boundary. The guide treats a value exactly at eighty percent as outside its below-boundary check, so choose and verify a suitable profile rather than aiming at the threshold.",
    "Compare the fine, balanced and coarse examples, calculated at twenty-five, fifty and seventy-five percent of the nozzle diameter. They illustrate proportions; they are not certified settings for every printer, material or geometry.",
    "Review the actual slicer profile, preview and a small representative print. Keep extrusion width, first-layer settings, speed and material flow requirements in view. Download the report to record the two entered values and the comparison you used.",
  ],
  sections: [
    {
      heading: "Use the ratio as a check, not an entire recipe",
      paragraphs: [
        "Prusa’s published guidance recommends layer height below eighty percent of nozzle diameter. With a 0.4 millimetre nozzle, this tool shows a 0.32 millimetre boundary and examples of 0.10, 0.20 and 0.30 millimetre layers. The arithmetic is straightforward, but the resulting numbers do not configure the rest of the printer. Start from the manufacturer’s appropriate profile and use this comparison to understand it.",
        "Layer height describes the vertical step between deposited layers. Nozzle diameter describes the opening through which material is extruded. They are related, but they are not interchangeable with extrusion width or a guarantee of the smallest printable feature. A visually finer layer can change how a slope appears without solving every horizontal detail in a model. Consider which surface or feature you are trying to improve before changing a setting.",
      ],
    },
    {
      heading: "Compare a useful feature and the time estimate",
      paragraphs: [
        "Choose a small test containing the slope, curve, text or mating surface that matters in the final part. A generic test shape may not reveal the effect you care about. Compare the sliced layer preview and the predicted time for each candidate profile, then inspect the actual surfaces. Keep the same material and relevant settings during the comparison so several simultaneous changes do not obscure the cause of a difference.",
        "More layers can increase the amount of work the printer performs, but the total duration also depends on toolpaths, speed limits and geometry. This guide does not predict print time or promise a fixed speed improvement from a coarser layer. Use the slicer’s estimate as a planning input and record actual time when refining your own process. A numerical ratio alone cannot tell you whether the final appearance is acceptable.",
      ],
    },
    {
      heading: "Keep the rest of the process consistent",
      paragraphs: [
        "A nozzle change affects the profile you should review, including extrusion width and appropriate material-flow limits. First-layer settings can differ from later layers, and the bed still needs its normal preparation. Do not use a larger first layer to hide an unexamined mechanical or surface problem. The guide deliberately leaves those controls to the printer and slicer documentation rather than inventing one universal combination.",
        "The displayed result does not establish strength, dimensional accuracy or adhesion for a finished part. Those depend on more than the two inputs. Keep a short record of nozzle, material, profile and observed outcome with the downloaded comparison. For a part supplied by 3D3D, state the functional and visual requirements in the quote request; a preferred layer number alone does not describe everything needed to plan the manufacture.",
      ],
    },
  ],
  comparison: [
    {
      name: "Prusa layer guidance",
      detail: "Explains profile settings and the nozzle-height boundary.",
      url: "https://help.prusa3d.com/article/layers-and-perimeters_1748",
    },
  ],
  faqs: [
    {
      q: "What is the boundary for a 0.4 mm nozzle?",
      a: "Eighty percent is 0.32 mm, and the check follows guidance to stay below that boundary. Use an appropriate verified profile rather than treating the boundary as a target.",
    },
    {
      q: "Are the three examples guaranteed profiles?",
      a: "No. They are proportions of the entered nozzle diameter. They do not specify temperature, speed, extrusion width, first layer or material-flow limits.",
    },
    {
      q: "Is layer height the same as extrusion width?",
      a: "No. Height is the vertical layer step. Extrusion width is another profile setting, and nozzle diameter is the physical opening size.",
    },
    {
      q: "Will a finer layer always make a stronger part?",
      a: "This tool makes no strength prediction. Material, orientation, geometry and the full process need appropriate evaluation for the actual part.",
    },
    {
      q: "Does a coarse layer guarantee a shorter job?",
      a: "The guide does not calculate duration. Compare actual slicer estimates and test results because toolpaths and other limits also influence print time.",
    },
    {
      q: "Should the first layer use the same height?",
      a: "Follow the printer’s suitable profile and documentation. This comparison does not configure or validate first-layer behaviour.",
    },
  ],
  service: { label: "Discuss print quality requirements with 3D3D", path: "/quote" },
} satisfies ToolGuide;
