import type { ReadingSection } from "../types";
export default [
  {
    title: "Begin with the whole material and plate combination",
    paragraphs: [
      "PETG is a useful candidate for practical printing, but the spool is only one part of the process. Check the filament grade, printer profile and exact build surface together. A surface that worked with PLA may behave differently with PETG. The right first question is not how to make adhesion as strong as possible; it is how to hold the job during printing and release it without damage afterward. Read the plate maker's compatibility instructions before loading a large object that is difficult to remove.",
      "A separation layer is conditional. On some approved material and surface combinations, it helps prevent an overly strong bond; on others, the documented routine differs. Do not apply glue simply because another operator calls it an adhesion trick. Record the product and procedure specified for your plate, including cleaning and cooling. If you cannot identify the plate, resolve that before choosing a chemical or treatment. A shiny, smooth or textured appearance alone is not enough to identify a coating or establish which removal method it supports.",
    ],
    sources: ["petg", "surface", "sheets"],
  },
  {
    title: "Use a small trial to expose handling problems",
    paragraphs: [
      "Choose a simple block with a modest footprint for the first material trial. Keep the shape easy to inspect and use the maker-supported baseline. Observe the first layer, then inspect the cooled part and its release. Record whether lines failed to attach, whether the part stayed flat and whether removal required an unexpected amount of force. These are different observations. A print that stayed attached very well but damaged the surface during release is not a successful material and plate combination for repeated work.",
      "Do not change several settings to make PETG look like a previous PLA sample. First establish that the physical setup, material condition and selected profile are correct. Then describe a specific issue, such as strings between separate features or a rough supported underside. A single block will not reveal every behaviour relevant to a future design, but it gives you a documented starting point. Save the actual spool and profile identifiers so that a later comparison does not accidentally combine changes in material brand, colour, moisture condition and printing settings.",
    ],
    sources: ["petg", "first", "string"],
  },
  {
    title: "Ask what the intended part must withstand",
    paragraphs: [
      "A material guide describes useful tendencies and processing requirements. It does not certify your finished geometry. A PETG box that holds water briefly has not established long-term leak performance, and a bracket that survives one gentle assembly has not established a load rating. For a desk-use prototype, you might initially check size, access and visible damage. Write those checks explicitly. If the intended application includes heat, repeated loading, food contact or another special requirement, keep that requirement open until the actual design and process have suitable evidence.",
      "Consider a small cable guide. Its useful questions include whether the cable fits, whether its mounting method is accessible and whether edges damage the cable during ordinary handling. Changing the material does not automatically fix a sharp edge or poor load path. Sketch the way forces move through the attachment and choose the orientation with that in mind. You can use the tolerance and orientation lessons to refine the trial. Avoid presenting a material name as a substitute for the design decisions and inspections that the physical object still needs.",
    ],
    sources: ["petg", "design", "orientation"],
  },
  {
    title: "Turn the trial into a reusable process note",
    paragraphs: [
      "Your PETG record should include the plate identity, approved preparation, supported profile, material and release method. Add a photograph or description of the underside, because it connects the surface treatment with a visible result. If removal was difficult, retain that information and consult the plate guidance before repeating with a larger footprint. Do not solve the problem by reaching for a sharper tool without understanding the surface. A controlled small specimen is valuable precisely because it can reveal a handling issue before a large part makes that issue harder to manage.",
      "Finish with a bounded statement such as the trial produced a flat block that released by the approved cooled-sheet procedure, followed by the checks still needed for the real part. Use your own observed wording; the example is not a result to copy. If PETG is not supported by the available equipment, document the missing requirement and keep the physical trial pending. The course can still help you prepare a material plan. A truthful readiness decision is more useful than a substituted sample that is later mistaken for evidence about PETG.",
    ],
    sources: ["sheets", "surface", "materialtable"],
  },
] satisfies ReadingSection[];
