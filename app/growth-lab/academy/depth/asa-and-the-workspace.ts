import type { ReadingSection } from "../types";
export default [
  {
    title: "Start with the application and the equipment limits",
    paragraphs: [
      "ASA is commonly considered when outdoor exposure and temperature resistance matter, but that is a reason to investigate it rather than an automatic material approval. Identify the intended environment and the actual grade. Read its processing guidance and technical data alongside the printer's limits. A slicer field that accepts a temperature is not evidence that the hotend, plate or surrounding components are rated for it. The material trial should begin only after the complete setup is documented as suitable, including the enclosure where the manufacturer's process calls for one.",
      "Keep service conditions separate from processing conditions. The temperature used to extrude a polymer does not state what a finished part can tolerate in use. A data-sheet property may depend on a specified test method, load and specimen preparation. Avoid converting one number into a promise for a thin clip or an outdoor cover with different geometry. For this lesson, the aim is to prepare and observe a small ASA print. Outdoor durability, sustained load and long-term dimensional stability remain separate questions for the eventual design.",
    ],
    sources: ["asa", "materialtable"],
  },
  {
    title: "Give temperature stability and emissions separate checks",
    paragraphs: [
      "ASA can be sensitive to temperature differences during printing, and a controlled enclosure may help manage the printing environment. Emissions control addresses a different problem: what leaves the process and where it travels. Keeping a chamber warm does not show that its air is safely managed. Your readiness worksheet needs a row for each. Use the manufacturer's integrated provisions and the workspace assessment rather than placing the printer in an improvised box. An enclosure must not create incompatible conditions for electronics, wiring or other components outside their ratings.",
      "NIOSH's guidance supports addressing emissions near their source and considering the whole installation. Do not interpret advice to avoid drafts around the print as advice to disable ventilation. A suitable arrangement must address both process stability and exposure control. If those requirements appear to conflict in your room, obtain a competent assessment instead of choosing whichever gives the best-looking sample. An odour change is not a reliable measurement of control effectiveness. Record what is documented, what has been assessed and what remains unknown before deciding whether to heat this material.",
    ],
    sources: ["asa", "enclosure", "safety"],
  },
  {
    title: "Observe a small specimen before increasing the footprint",
    paragraphs: [
      "Use the supported baseline and a simple 30 by 20 by 5 millimetre block for the first approved trial. Inspect the first layer and note whether corners stay attached as the job progresses. After the specified cooling and removal, look for lifting, distortion or separation between layers. A flat result on this small shape is useful evidence about that trial. It does not prove that a much wider enclosure lid will behave the same way. Footprint, geometry, orientation and process duration can change the problem substantially.",
      "If a corner lifts, record when and where it happened before changing settings. A failed initial attachment and later warping call for different first checks. Confirm the plate preparation and material compatibility, then follow the relevant machine and filament guidance. Do not keep increasing bed temperature beyond the rated setup or add arbitrary heating equipment. A brim, orientation change or redesign may be relevant, but each should answer a specific observation. Preserve the baseline so that a failed adjustment does not erase the only known starting point.",
    ],
    sources: ["asa", "warp", "surface"],
  },
  {
    title: "Record readiness even when the print cannot proceed",
    paragraphs: [
      "Your worksheet should name the printer configuration, material grade, approved surface, enclosure arrangement and emissions-control decision. Add the source documents and the date checked. If one requirement cannot be confirmed, mark the ASA trial pending. You can practise the block geometry and inspection in supported PETG, but label the substitution clearly. A PETG specimen cannot demonstrate ASA feeding, warping behaviour or workspace suitability. Keeping these limits visible lets you continue learning without manufacturing evidence that the unavailable setup was ready or that the intended material was physically tested.",
      "After an actual ASA trial, state the result in observational language and identify the next design question. For example, flatness of a small cooled block and visible layer continuity are limited checks, not an outdoor product qualification. Do not add solvent smoothing to this beginner exercise just because the material can be chemically treated. That process introduces separate compatibility, exposure and handling requirements. The useful result here is a documented material readiness decision and a traceable small trial, with any substitution and untested application claims kept explicit in the record.",
    ],
    sources: ["asa", "safety", "petg"],
  },
] satisfies ReadingSection[];
