import type { ReadingSection } from "../types";
export default [
  {
    title: "Distinguish an abrupt offset from surface texture",
    paragraphs: [
      "A layer shift appears as a sudden change in the position of later geometry relative to the earlier part. A wavy wall or ringing pattern may look untidy without representing the same event. Identify the first clear step, its height and the direction of displacement. Use the printer's coordinate convention rather than guessing from a camera angle. A labelled plan-view sketch can help connect the specimen with the machine. Stop a shifted or colliding job through the normal control instead of allowing the nozzle to continue striking a misplaced object.",
      "Record what happened around the time of the shift if you observed it: a collision, unusual sound, loose object or other event. Keep observations separate from explanations. Hearing a noise is not enough to identify a particular pulley, and finding a shifted wall does not prove that every belt needs tightening. Save the relevant project and profile, especially if motion settings recently changed. A useful report gives the direction, approximate layer or height and configuration so that the investigation can focus on the appropriate mechanism and operating conditions.",
    ],
    sources: ["shift", "viewer", "safety"],
  },
  {
    title: "Inspect obstacles before changing motion hardware",
    paragraphs: [
      "Put the printer in the safe inspection state specified by its maker. Check for obvious debris, loose printed material or an obstruction within the permitted operator inspection. Look for a raised or detached part that could have been involved in a collision. Do not force an axis by hand or reach into active movement to reproduce the event. Different motion systems have different handling restrictions. If a component is damaged or an inspection requires access beyond the supported procedure, stop and obtain qualified help rather than exploring the mechanism experimentally.",
      "Return to the printer's exact belt, pulley and motion guidance. Tension is not a universal number across machines, and overtightening can create another problem. Do not apply a frequency target from an unrelated belt path. Likewise, a fastener that appears accessible is not automatically one that should be tightened. Follow the sequence, tool and criteria specified for the model and revision. Record what was actually checked or adjusted. That record distinguishes a completed maintenance step from an assumption that the mechanical system now feels better.",
    ],
    sources: ["shift", "maintenance", "safety"],
  },
  {
    title: "Review the profile without hiding the symptom",
    paragraphs: [
      "Confirm that the current motion and printer profile matches the physical machine. An imported project or experimental speed change may have replaced the supported baseline. Restore that baseline before a controlled retest where the manufacturer's troubleshooting procedure calls for it. A slower successful print can be useful evidence, but it does not by itself establish that a loose or obstructed mechanism is repaired. Keep the distinction between a changed demand and a corrected fault. Do not simply reduce speed and erase the original failure from the maintenance record.",
      "Inspect the failed job's preview for geometry or support that might create a collision problem. A curled edge or poorly supported feature can change the physical path even when the instructions look orderly. Connect that observation with the warping or support lesson if relevant. The purpose is to consider the complete chain from geometry through process to motion, not to blame every shift on one hardware item. Use the available evidence to choose the next bounded check and avoid several simultaneous adjustments that make the outcome impossible to attribute.",
    ],
    sources: ["shift", "warp", "supports", "viewer"],
  },
  {
    title: "Retest without creating a deliberate obstruction",
    paragraphs: [
      "After the issue has been addressed through the proper procedure, print the simple 20 millimetre cube with a known baseline. Inspect its vertical edges for an abrupt step and record the actual outcome. Do not block the axis or introduce debris to demonstrate a shift for the course. The failure illustration and diagnostic reasoning are enough to learn the concept. If shifts recur, preserve the photographs, axis sketch, maintenance record and job files for the manufacturer or an experienced technician. Repeated unexplained failures need better diagnosis, not progressively tighter belts.",
      "Finish with a statement about what was observed, what was checked and whether the retest resolved the visible symptom. If you did not have a real shift, record that the sound baseline was inspected and that the failure path was a planning exercise. If a repair was performed, name the documented action rather than announcing a universal cause. The course cannot inspect the machine or certify its motion system. Its useful contribution is a precise way to describe a shift and a disciplined route toward the correct machine-specific check.",
    ],
    sources: ["shift", "maintenance", "teaching"],
  },
] satisfies ReadingSection[];
