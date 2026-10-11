import type { ReadingSection } from "../types";
export default [
  {
    title: "Identify the surface before choosing a routine",
    paragraphs: [
      "A build plate is a specific product with a coating, preparation method and compatibility limits. Identify it from the maker's label or equipment record rather than guessing from its colour or texture. Find the current instructions for that plate and the material you plan to print. Cleaning advice for one surface can damage another. The useful first step is therefore documentary: write the plate identity and reference before opening a bottle of cleaner. If a shared workshop has several interchangeable sheets, check the one actually installed for this job.",
      "Adhesion has two sides. The part must remain attached while it is built, and it must later release without damaging the part or surface. More bonding is not always better. Some material and plate combinations call for a separating layer, while others use a different preparation. Follow the specific compatibility guidance rather than applying glue as a universal answer. Record what you used and why. A routine copied from a different material may conceal the cause of a removal problem even when the first layer looks excellent.",
      "If a removable sheet has two usable sides, record which side was used. A damaged or differently prepared reverse face should not silently become the next baseline.",
    ],
    sources: ["surface", "sheets"],
  },
  {
    title: "Prepare a clean, controlled handling sequence",
    paragraphs: [
      "Put the printer and plate into the state required by the maker's cleaning procedure. Let surfaces cool where instructed and keep cleaning agents away from live electronics, active heat and ignition sources. Use the approved product and method, including any drying or handling instructions. Do not add an abrasive, solvent or scraping step because a stain looks persistent. A visible mark is not automatically contamination, and damaging a coating can create a new adhesion problem. If the approved routine does not address the condition, consult the plate documentation.",
      "After preparation, handle the plate by its permitted edges or grip points so that the printing area stays consistent. Check that it is seated as intended and that no debris is trapped beneath a removable sheet. Keep the surface record connected to the printer's plate selection or calibration procedure if the system distinguishes sheets. Changing plate thickness or type can affect setup assumptions. The goal is a known condition, not a ritual performed from memory. A short checklist is especially useful when different people prepare the same machine.",
    ],
    sources: ["surface", "sheets", "maintenance", "safety"],
  },
  {
    title: "Describe when the failure happens",
    paragraphs: [
      "Print the small tile using a supported baseline. Observe the first lines without entering the moving area. If they never attach, record that initial failure and stop according to the machine procedure. If they attach but a corner lifts later, record the timing and location. If the print finishes but will not release normally after cooling, record a removal problem. These three outcomes should not all be labelled poor adhesion. Their different timing helps choose the next check and prevents a reflexive increase in glue or bed temperature.",
      "Inspect the cooled underside and connect its appearance with the plate and material record. Do not infer a precise nozzle offset from a photograph alone. Surface texture, first-layer settings and material can affect the appearance. Use the calibration procedure appropriate to the exact machine if the observations point there. A smooth-looking bottom is also not proof that the rest of the part is dimensionally correct. Keep this exercise focused on preparation, attachment and release, then use the later measurement lesson for a separate acceptance question.",
    ],
    sources: ["adhesion", "firstlayer", "warp", "surface"],
  },
  {
    title: "Keep the successful routine reproducible",
    paragraphs: [
      "For a successful trial, record plate identity, material, approved cleaning method, any required separation layer, first-layer observation and removal method. Leave quantities or times unspecified if the instructions do not call for a measured value; do not invent precision. Keep a note of any change since the previous run. If the routine worked only after an unexplained additional treatment, the explanation is still incomplete. Compare it with the official guidance before making that treatment a workshop habit or applying it to a larger, more expensive part.",
      "If preparation does not restore a reliable baseline, stop repeating the same failed full print. Check the profile, material compatibility and machine-specific first-layer procedure, and seek help for damaged or uncertain equipment. Preserve the failed sample and its timing note if they will help diagnosis. Do not scrape a coated surface aggressively to erase the evidence. The useful outcome is either a repeatable attachment-and-release routine or a clear unresolved condition with a next check. Both are more informative than calling the plate bad after one unrecorded failure.",
    ],
    sources: ["surface", "maintenance", "adhesion"],
  },
] satisfies ReadingSection[];
