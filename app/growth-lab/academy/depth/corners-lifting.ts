import type { ReadingSection } from "../types";
export default [
  {
    title: "Use timing to separate two different problems",
    paragraphs: [
      "A corner that never attached and a corner that begins flat but lifts later are different observations. The first suggests checking initial preparation and deposition. The second can involve changing thermal conditions and contraction as the part develops. Record which corner moved and when you first noticed it. Stop the job if the raised part creates a collision or other unsafe condition. Do not reach into the moving area to press the corner down. Holding a failed geometry in place by hand cannot restore a controlled printing process.",
      "Inspect the footprint and shape in the saved project. A wide, thin plate and a compact block can respond differently even with the same material. Note the orientation, contact area and any adhesion aid used. A photograph of the final curled part cannot reveal the entire sequence, so keep the observation time in the log as well. Avoid naming a single cause from appearance alone. The record should help you choose the first check, not claim that every lifted corner is caused by a draft or a dirty surface.",
    ],
    sources: ["warp", "adhesion", "safety"],
  },
  {
    title: "Recheck preparation before adding thermal changes",
    paragraphs: [
      "Confirm that the plate, material and profile are compatible and that the first layer was prepared through the approved routine. If the initial contact was poor, address that baseline issue before experimenting with an enclosure or a larger brim. A process change built on an unknown surface condition is difficult to interpret. Use the exact plate's cleaning and release instructions. More adhesive or greater bonding is not automatically beneficial, because some combinations already bond strongly enough to damage a surface during removal. Keep attachment and release in the same decision.",
      "Review the material and printer guidance for cooling and enclosure conditions. Do not simply turn every fan off or raise the bed temperature beyond a supported range. Different materials and geometries need different treatment. A heater setpoint is also not a measurement of the whole part's temperature. If the printer or enclosure is unsuitable for the material's required conditions, that is a readiness issue, not a parameter-tuning challenge. Return to a supported setup or obtain appropriate equipment and guidance rather than improvising a thermal modification.",
    ],
    sources: ["surface", "warp", "asa", "materialtable"],
  },
  {
    title: "Manage the print environment without disabling safety controls",
    paragraphs: [
      "Unexpected drafts or changing room conditions can be relevant to the printing process. Record what changed, such as a door opening or a ventilation arrangement being altered, without claiming that the timing proves causation. The emissions-control plan still needs to function. Advice to avoid a cold draft across the part is not advice to seal the printer in an unassessed box or switch off required exhaust. Thermal stability and exposure control must be addressed together through a suitable documented installation, especially for materials with demanding workspace requirements.",
      "If a supported enclosure is part of the process, verify its permitted operating conditions and maintenance arrangements. Keep components within their ratings and follow the maker's guidance about the surrounding environment. Do not use improvised heat sources to make the chamber warmer. If the appropriate control cannot be established, stop that material trial and record the limitation. A small successful print under uncertain conditions does not validate the installation. The safety and material lessons are prerequisites because a visually improved corner is not enough to justify an unsuitable workspace change.",
    ],
    sources: ["enclosure", "safety", "asa"],
  },
  {
    title: "Compare one practical intervention and inspect flatness",
    paragraphs: [
      "Choose one supported intervention that addresses the current evidence: a documented brim, a changed orientation or a representative smaller test section. Keep the remaining inputs fixed and save the project. A brim changes the footprint and adds removal work, so record both its printing result and its effect on cleanup. A smaller specimen can help investigate the process but may not reproduce the full-size distortion. Do not present its success as proof that the original large part is solved. Retest the actual geometry when the candidate change is ready.",
      "For the course block, inspect the cooled base against a suitable flat reference without forcing it into contact. Record visible lifting or uncertainty and the conditions of the trial. If you have no lifting on the supported baseline, preserve that result and write the diagnostic plan instead of manufacturing a failure. Your final entry should connect timing, preparation, environment and the single changed factor with an actual observation. That chain gives the next trial a reason and prevents a list of adhesion tricks from replacing a diagnosis grounded in the specific part.",
    ],
    sources: ["warp", "design", "supports"],
  },
] satisfies ReadingSection[];
