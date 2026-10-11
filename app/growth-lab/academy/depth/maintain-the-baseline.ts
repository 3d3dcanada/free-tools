import type { ReadingSection } from "../types";
export default [
  {
    title: "Find the procedure for the exact machine revision",
    paragraphs: [
      "Maintenance is specific to the equipment. Find the current manual or knowledge-base page for your printer model and revision, including any installed supported upgrade. A lubrication point, belt procedure or service interval from another design may be inappropriate. Read the scope of the page before following its numbered steps. The Prusa reference in this lesson is an example of model-specific guidance, not a universal checklist for all printers. Record the source and date so that a later operator can see which instructions informed the task.",
      "Separate inspection, routine service and repair. An operator may be expected to inspect an accessible surface or clean a documented feed component, while electrical access or a complex hotend repair may require different competence and precautions. Do not expand a routine check into disassembly simply because a tool is available. If you discover damage or an unexplained condition, stop the relevant operation and seek the appropriate help. A maintenance log should be able to say inspected, not due, unresolved or referred, rather than forcing every row into completed.",
    ],
    sources: ["maintenance", "safety"],
  },
  {
    title: "Prepare the safe state and the correct materials",
    paragraphs: [
      "Follow the procedure's requirements for power, temperature and access. Some operations require a cool, disconnected machine; others have a documented heated step. Do not replace those instructions with a single improvised rule. Keep hands clear of active motion and cleaning products away from live electronics and unsuitable surfaces. Select the specified lubricant, cleaner or replacement part. Applying one convenient product to every moving surface can damage components that have different requirements. Read both where a material is allowed and where the maker explicitly says it must not be used.",
      "Lay out the parts and tools needed for the bounded task and preserve the identity of anything removed. Photograph a configuration only if it helps reassembly and does not distract from the safe procedure. Keep fasteners and debris out of the motion and electrical areas. Do not tighten everything while the cover is open; adjustment is a change that should have a reason and a documented method. The aim is to restore or preserve the specified condition, not to make the machine feel more thoroughly serviced by increasing the number of interventions.",
    ],
    sources: ["maintenance", "safety"],
  },
  {
    title: "Record the change and reconnect it to printing",
    paragraphs: [
      "Write what was inspected, cleaned, adjusted or replaced, with the date and relevant machine usage if available. Include the part identity and procedure reference. If no service was due, record that decision and the condition observed. This matters when a later printing symptom appears: the log can show whether a nozzle, plate, feed route or motion component changed shortly beforehand. Without that record, a configuration mismatch can be mistaken for an unexplained material problem, and the operator may start tuning flow around a hardware change that was never acknowledged.",
      "After a relevant change, repeat the manufacturer's required setup or calibration and print the same known baseline specimen. Keep the material, model and supported profile consistent unless the changed hardware requires a documented profile update. Record that update explicitly. Compare dimensions and visible features with the earlier baseline using the same inspection method. A successful self-test is useful, but the printed specimen adds evidence about the complete process. Do not call a repair verified only because the machine powers on and the replaced component no longer produces an immediate warning.",
    ],
    sources: ["maintenance", "first", "teaching"],
  },
  {
    title: "Use the record to prevent drifting settings",
    paragraphs: [
      "Over time, a workshop can accumulate small profile changes, substituted plates and unrecorded repairs. Periodically compare the active configuration with the maintained baseline and identify intentional differences. Keep supported user profiles named clearly and archive the job files needed to repeat a known specimen. This is not a reason to reset everything indiscriminately. Preserve a working configuration and investigate discrepancies before overwriting it. On shared equipment, make the change record accessible to the people who prepare jobs so that their software assumptions match the hardware they will actually use.",
      "For the practice, perform only an appropriate routine check that is due or document that no maintenance action was required. Then inspect a baseline print and record the comparison. If a fault remains, mark the machine or task unresolved according to the workshop's process and obtain help. Do not use a single successful small cube to dismiss recurring abnormal behaviour. The lesson's useful outcome is a traceable relationship between the exact maintenance instruction, the action taken and the observed printing result, with the limits of that verification stated plainly.",
    ],
    sources: ["maintenance", "teaching", "safety"],
  },
] satisfies ReadingSection[];
