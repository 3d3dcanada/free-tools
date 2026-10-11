import type { ReadingSection } from "../types";
export default [
  {
    title: "Read both halves of the material name",
    paragraphs: [
      "The letters CF identify a carbon-fibre addition, not a single universal polymer. PETG-CF and a nylon-based CF blend can have different processing, moisture and application requirements. Write the complete grade name and identify the base polymer. Then ask which property the job needs: stiffness, dimensional stability, impact response, appearance or something else. The word stronger hides those distinctions. A change that improves one measured property can reduce another, and published results for a particular specimen do not automatically describe your printed geometry and orientation.",
      "Compare two actual manufacturer data sheets rather than two advertising adjectives. Record the property name, units, test method and specimen conditions where provided. A value without its test context is difficult to compare. If one sheet omits a property important to your job, mark it unknown rather than treating the missing entry as zero or assuming it matches the other material. This comparison is useful even when you are not equipped to print either grade. It makes the unanswered questions concrete before the purchase or setup decision.",
    ],
    sources: ["cf", "materialtable"],
  },
  {
    title: "Check the abrasive-material path",
    paragraphs: [
      "Fibre-filled filament can be abrasive, so check the nozzle and other affected feed components against the equipment and filament makers' instructions. A nozzle diameter alone does not identify its wear resistance. Record the fitted nozzle type and the allowed profile for the exact material. Also check the minimum supported nozzle size and any feeder restrictions. Do not run a short trial through unsuitable hardware on the assumption that a small amount cannot matter. Establishing compatibility before the trial is simpler than interpreting a result after introducing possible wear or obstruction.",
      "A hardware change may require a different supported profile. Retain the old configuration record, install or service components only through the correct procedure, and verify the new setup before printing. Do not copy a universal temperature offset from a comment about another nozzle. Thermal response and the printer's control assumptions can differ. For a beginner, the sensible trial is one the available machine already supports. If it does not, a documented comparison of requirements is a valid planning result, while the physical CF trial remains unperformed and should be labelled that way.",
    ],
    sources: ["cf", "first", "maintenance"],
  },
  {
    title: "Distinguish drying from dry storage",
    paragraphs: [
      "A storage container can help maintain filament condition, but it is not automatically an active dryer capable of removing moisture from a wet spool. Check the filament maker's drying procedure, the dryer's temperature capability and the spool's own heat limits. The spool is part of the system: a filament may tolerate a process that its packaging does not. Use the exact material and spool revision guidance. Do not transfer a drying temperature from one polymer to another or assume that a hotter, shorter cycle is equivalent to the documented procedure.",
      "Material condition can contribute to surface and extrusion problems, but a stringy or rough print is not a complete moisture diagnosis by itself. Record how the spool was stored and prepared, then compare with a supported baseline. Keep any drying trial separate from simultaneous retraction or flow changes so that the result remains interpretable. Avoid improvised heating arrangements and casual use of household equipment whose control range is unsuitable. If proper preparation cannot be achieved with available equipment, keep the material trial pending rather than treating an uncertain condition as a calibrated input.",
    ],
    sources: ["dry", "string", "cf"],
  },
  {
    title: "Plan the specimen and its cleanup together",
    paragraphs: [
      "Choose a small geometry with accessible surfaces and avoid making sanding or cutting the fibre-filled sample part of a casual beginner exercise. Printing and dust-producing postprocessing introduce different exposure questions. Review the material safety information and task controls before handling operations that generate debris. A matte surface can look refined straight from the printer, but appearance does not establish layer bonding or load capacity. Inspect the actual specimen and keep the property claims limited to what the trial can support. Do not turn an attractive finish into a mechanical certification.",
      "Finish your record with the actual material, preparation, hardware and profile, followed by visible observations and untested requirements. If you printed the PETG baseline instead, retain that label and attach the written CF comparison rather than calling the substitute a carbon-fibre result. For an actual CF trial, keep the sample and its identity together so later comparisons remain meaningful. The main learning outcome is the ability to connect a complete grade name with its equipment, condition and evidence requirements, and to explain why an additive label alone cannot select a material for a job.",
    ],
    sources: ["cf", "dry", "safety"],
  },
] satisfies ReadingSection[];
