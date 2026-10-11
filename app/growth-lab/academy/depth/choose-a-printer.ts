import type { ReadingSection } from "../types";
export default [
  {
    title: "Turn an object wish into a machine brief",
    paragraphs: [
      "Write down three objects you actually expect to make, rather than a list of impressive machine features. For a desk label, a storage divider and an outdoor cover, record the overall size, smallest important feature, likely quantity and environment. The cover introduces weather and heat questions that the desk label may not. These are requirements to investigate, not reasons to announce a material choice immediately. A useful brief also says what is outside the first project, such as safety equipment or parts whose failure could injure someone.",
      "Separate requirements from preferences. Fitting your largest planned object is a requirement; a particular screen colour is a preference. Access to a supported material profile matters differently from having a large catalogue of downloadable community profiles. Put each claim beside its evidence: a current manufacturer specification, an operating manual or a supplier answer for the exact revision. Leave an unanswered row unresolved. This makes the comparison useful even if you do not buy anything. You can apply the same method to choosing which existing workshop machine to borrow.",
    ],
    sources: ["buy", "materialtable"],
  },
  {
    title: "Check usable space rather than a single bed number",
    paragraphs: [
      "An object's bounding box is a first size check, not a complete packing plan. Orientation changes which dimension occupies each axis. Supports, a brim, excluded bed regions and the toolhead's operating restrictions can reduce what is practical. As an arithmetic exercise, a 180 millimetre part with a proposed 5 millimetre allowance on both sides needs 190 millimetres along that axis. The allowance is an example, not a universal brim requirement. Place the actual object and intended aids in the correct slicer profile to inspect the resulting footprint.",
      "Now draw the machine in its room. Include the spool holder, opening doors, moving bed envelope, cable space and access for removing the plate. A printer that fits a shelf while switched off may not fit there while operating or being serviced. Check the manufacturer's clearance requirements rather than adding an arbitrary number. Identify where replacement filament, cooling parts and hand tools will go. If reaching a control requires leaning across hot or moving equipment, the room arrangement needs work even when the printable volume looks adequate.",
    ],
    sources: ["buy", "bates", "safety"],
  },
  {
    title: "Compare complete material paths",
    paragraphs: [
      "A material name on a sales page does not answer every compatibility question. Read about the nozzle, build surface, feeding route, temperature limits and enclosure conditions together. A flexible filament can introduce feeding restrictions; an abrasive filled material can introduce wear requirements. A slicer dropdown cannot supply hardware that is absent. Record the exact grade you intend to trial, then check whether both the printer maker and filament maker support that combination. Where their instructions disagree, resolve the mismatch before treating the setup as ready.",
      "Also distinguish the printer's thermal enclosure from emissions control. Holding a stable temperature around a print and capturing airborne emissions are different jobs. An enclosure may be relevant to both, but its presence alone proves neither effectiveness nor compatibility with a particular room. The safety lesson develops this further. At selection time, identify what the manufacturer documents and what your workspace still needs assessed. Do not buy a machine first and assume that putting it in any available closed cabinet will solve all of the remaining installation questions.",
    ],
    sources: ["materialtable", "enclosure", "safety"],
  },
  {
    title: "Budget for a repeatable setup",
    paragraphs: [
      "Make a budget with separate rows for the machine, initial consumables, required installation work, tools, replacement wear parts and learning time. Keep unknown prices blank until checked with a current supplier. A lower purchase price may still be a sensible choice, but only if you understand the work and support it brings. Read one routine maintenance procedure before choosing. Confirm that parts and documentation exist for the revision being sold, and that you can realistically perform the supported tasks or obtain help when a repair exceeds your ability.",
      "For the practice comparison, choose two plausible profiles and load the same teaching block. Record how you verified the build area, nozzle and material selection. Do not use the slicer's predicted time to declare an overall winner: warmup, handling, inspection, reliability and your actual geometry affect useful throughput. Finish with a short decision sentence containing a reason and an unresolved question. For example, a profile can fit the planned samples while room ventilation remains undecided. That is a clearer outcome than a ranked list based on advertised maximum speed.",
    ],
    sources: ["buy", "first", "maintenance"],
  },
] satisfies ReadingSection[];
