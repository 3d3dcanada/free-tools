import type { ReadingSection } from "../types";
export default [
  {
    title: "Match physical facts before software names",
    paragraphs: [
      "Start beside the stopped printer with its handbook and configuration record. Identify the exact model and revision, the fitted nozzle, the installed plate and the material you will load. These are observations about the machine. Now open the slicer's corresponding selections and compare them one by one. A preset labelled for a larger nozzle does not mean the nozzle was physically replaced. A saved project from last month may describe a setup that has since changed. The comparison is complete only when the physical and software records agree.",
      "Use the manufacturer's supported slicer source and setup workflow. Community profiles can be useful later, but they add assumptions that a beginner must understand before relying on them. Avoid choosing a similar looking printer simply because its bed appears the same size. Start and end commands, movement limits and hardware options may differ. If your exact configuration is not documented, leave it unresolved and ask the equipment owner or manufacturer. Guessing at machine geometry is a poor way to get past a missing preset in the setup wizard.",
    ],
    sources: ["slicer", "first", "bates"],
  },
  {
    title: "Understand the layers of a profile",
    paragraphs: [
      "It helps to separate machine, material and print choices. The machine configuration describes the equipment. The material preset describes a supported way to process a particular filament. The print preset describes choices such as layer height and wall construction. Applications may name or combine these groups differently, so use the documentation for your version. When one group changes, inspect the others rather than assuming that every combination is supported. Keep special firmware or machine-limit edits outside this first exercise unless the manufacturer explicitly requires them.",
      "Suppose a job file selects a 0.6 millimetre nozzle while the maintenance record says a 0.4 millimetre nozzle is fitted. The mismatch is already enough to pause preparation; you do not need a failed print to prove that the selections disagree. Correct the software choice or have the hardware changed through its proper procedure, then verify again. Do not try to compensate by changing an unrelated flow setting. This example is about matching configuration, not a universal claim about the extrusion widths either nozzle must use.",
    ],
    sources: ["first", "layers"],
  },
  {
    title: "Inspect imported projects and preserve a baseline",
    paragraphs: [
      "Opening a project can restore settings from the person who saved it. Look at the selected printer, nozzle, plate and filament immediately after import, especially if the application asks whether to adopt settings. Read that choice rather than clicking through it automatically. A model import and a complete project import may behave differently. If you only need the shape, use the appropriate geometry workflow and still check dimensions. Keep the creator's original file so that your prepared copy does not erase the provenance of the input.",
      "Save your verified baseline under a name you can recognize. Include enough information to distinguish its printer, nozzle and material without putting every parameter into the filename. Keep the source preset unchanged where the slicer supports user copies. For a later tuning trial, duplicate the baseline and record the one intentional change. Returning to a known configuration should be an explicit action, not an attempt to remember which sliders moved. Export or back up the project according to the slicer's workflow so that local application resets do not erase your only record.",
      "Record the slicer version too, so a later profile update can be distinguished from a deliberate setting change in your own saved project.",
    ],
    sources: ["files", "first", "teaching"],
  },
  {
    title: "Prove the selection with a small prepared job",
    paragraphs: [
      "Place the course block on the intended base and slice it. Check the reported dimensions, first layer, walls and top closure. Note the predicted time and material without calling either a measurement. Save the project and exported instructions together under the job ID. Before the physical print, compare the filename selected on the machine with the file you just prepared. This last check catches an ordinary but consequential mistake: carefully reviewing one job and then starting an older output with a similar name from removable storage.",
      "For your lesson record, write four lines containing the verified machine, nozzle, plate and filament selections, plus the source of that verification. A photograph of an accessible configuration label or a maintenance entry can support the physical side without dismantling anything. Add the saved project name and the preflight result. The goal is not to memorize every setting. It is to establish a repeatable way of knowing what the slicer is describing. When hardware or material changes, repeat this matching process before assuming your previous successful job still represents the current setup.",
    ],
    sources: ["first", "viewer"],
  },
] satisfies ReadingSection[];
