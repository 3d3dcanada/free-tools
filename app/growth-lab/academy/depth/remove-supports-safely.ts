import type { ReadingSection } from "../types";
export default [
  {
    title: "Plan the removal path before touching the support",
    paragraphs: [
      "Begin with a cooled part removed by the plate's approved method. Identify which material belongs to the object and which is temporary support. Use the saved preview if the boundary is unclear. Trace how each support section can leave the part without twisting a fragile feature or trapping a tool. This is easiest with the small T-piece from the support lesson, because the contact and removal direction are visible. If the only apparent method requires uncontrolled force on the finished geometry, stop and reconsider the orientation or support strategy.",
      "Set up a stable work area with suitable tools and the task's protective measures, including eye protection where fragments can fly. Keep the cutting or pulling direction away from fingers and other people. A small part can be harder to hold safely than a large one, so do not compensate by placing a hand directly behind the tool. Use an appropriate holding method without crushing the specimen. Follow the tool maker's instructions and avoid adding powered or heated operations to a beginner exercise whose purpose is simply controlled support removal.",
    ],
    sources: ["finish", "safety", "supports"],
  },
  {
    title: "Remove accessible sections and preserve the contact evidence",
    paragraphs: [
      "Work in manageable sections rather than pulling a large support mass against a thin ledge. Observe where the contact begins to separate and stop if the part itself cracks, bends excessively or loses an edge. A support that is trapped in a cavity is a design and process problem, not a challenge to solve by blindly digging deeper. Return to the preview and determine whether a rotation, split or different accessible support arrangement would make the next version practical. Do not hide an unremovable support inside a part that was meant to be empty.",
      "Keep one contact area unpolished until you have documented its condition. Note roughness, remaining nubs, gouges and any material missing from the intended surface. This lets the next support trial address the actual interface result. Sanding everything immediately can erase the evidence and alter dimensions. If cleanup is necessary for the intended use, record it as a separate operation with its own time and inspection. A surface that becomes acceptable only after substantial work represents a different manufacturing process from one that is usable as removed.",
    ],
    sources: ["supportfinish", "finish", "cut"],
  },
  {
    title: "Separate cosmetic marks from consequential damage",
    paragraphs: [
      "A rough underside may be acceptable on a hidden cosmetic face and unacceptable on a mating surface. A crack is a different observation from texture, and a missing edge cannot be restored merely by smoothing its surroundings. Inspect the feature against its intended job. For the teaching T-piece, describe the ledge and stem without claiming load capacity. For a real assembly, check the dimensions and contact surfaces that matter. The decision should come from written acceptance criteria, not from whether a photograph can be taken at an angle that hides the defect.",
      "Do not use paint, filler or a cleaned photograph as proof that damaged material has regained its function. A repair process, where appropriate, needs its own justification and verification. The beginner route is to mark the damaged part and revise the design or printing process. Keep the rejected specimen or clear evidence of the damage so that it cannot accidentally return to an accepted batch. This is a practical quality habit: separating the status of parts matters as much as being able to describe the original support settings.",
    ],
    sources: ["finish", "design", "supportfinish"],
  },
  {
    title: "Feed the removal result back into preparation",
    paragraphs: [
      "Compare the removed specimen with the saved support preview. Did contacts appear where expected, and could the planned tool reach them? Record any mismatch between the digital plan and physical handling. A support interface setting can trade removal ease against underside quality, so do not judge a change on only one side of that compromise. If the location itself is unsuitable, reconsider orientation or splitting before fine tuning the gap. Geometry changes can solve a handling problem that no small spacing adjustment will make consistently accessible.",
      "Your practice record should name the tools, workholding approach, contact condition, cleanup effort and final decision. If support removal has not been performed, leave that stage unverified even when the printed object looks complete on the plate. If the part was damaged, state the damage and the next revision instead of checking a success box out of habit. The useful outcome is a method that keeps people clear of sharp fragments, preserves evidence and connects the removal experience to a better plan for the next print.",
    ],
    sources: ["supports", "supportfinish", "safety"],
  },
] satisfies ReadingSection[];
