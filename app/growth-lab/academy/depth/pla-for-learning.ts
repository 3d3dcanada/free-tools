import type { ReadingSection } from "../types";
export default [
  {
    title: "Give the prototype a narrow question",
    paragraphs: [
      "A prototype earns its place by answering a question before you commit more time and material. A PLA mockup can show whether a handle is comfortable to reach, whether a cover occupies the intended space or whether a label is readable at its planned size. Write that question on the sample tag. Avoid a vague instruction to test the part, because it invites conclusions that the exercise cannot support. Checking access with a static mockup is different from checking repeated use, impact, heat or a loaded attachment.",
      "Imagine a cover for a desk cable opening. The first PLA version can check the outline and whether the cable passes through. If the final use includes heat or a stressed clip, those requirements remain separate. Keep the drawing and intended final material beside the prototype record. When the mockup fits, record that specific fit observation rather than writing approved for use. This makes it possible to learn from the low-cost sample without accidentally treating the sample material and process as a finished specification for a different job.",
    ],
    sources: ["pla", "design"],
  },
  {
    title: "Use ease of printing to learn the process",
    paragraphs: [
      "PLA is commonly used for beginner work and quick prototypes because it is comparatively approachable to print. That convenience lets you focus on reading the first layer, recognising walls and checking dimensions. It does not remove the need for a supported profile, suitable surface and prepared workspace. Use the instructions for the exact spool and machine instead of adopting one temperature from a generic chart. Keep a simple baseline so that the observations in later lessons can be compared with a specimen whose preparation you actually understand.",
      "A new colour, blend or brand is still a change worth recording. The name PLA covers products with different formulations and intended uses. If the manufacturer publishes a technical data sheet, save the reference and read the conditions attached to any property value. Do not substitute the nozzle's printing temperature for an allowable service temperature. Those numbers describe different things. Likewise, a neat surface is evidence about appearance, not a measurement of impact resistance or layer bonding. This distinction matters even when every previous PLA print has looked successful.",
    ],
    sources: ["pla", "materialtable", "first"],
  },
  {
    title: "Separate the shop policy from a universal rule",
    paragraphs: [
      "For this course's 3D3D workflow, PLA is used for learning and prototypes, while customer parts are considered in PETG or another material appropriate to the actual requirements. This is a stated shop policy. It is not a claim that every PLA object is unsuitable for every practical purpose, nor a promise that substituting PETG automatically qualifies a design. A useful material decision begins with the environment, geometry and consequence of failure. The course's beginner samples deliberately avoid applications whose suitability cannot be established by a modest workshop exercise.",
      "Think about what changes when a prototype moves from a desk to a vehicle, outdoor location or continuously loaded assembly. Temperature, sunlight, chemicals and time may become relevant even if the shape is unchanged. Rather than improvising a dramatic home test, write a requirement for the final design and identify what evidence would address it. Some jobs need specialist evaluation or a different manufacturing method. Keeping the prototype's successful observations narrow makes that later decision easier: you know which geometry questions are already answered and which material questions are still open.",
    ],
    sources: ["pla", "materialtable", "safety"],
  },
  {
    title: "Preserve a useful learning specimen",
    paragraphs: [
      "Use your original block or make another with the same supported PLA setup. Label the material, profile, model revision and date. Identify the base and one measured dimension, then note which visible features will serve as comparisons in later exercises. Keep it away from an environment that could change it before comparison. If the sample becomes distorted or damaged, record that rather than using it as an unchanged reference. The specimen and its log work together; an unlabelled block cannot tell you how it was made or what it demonstrated.",
      "If your available machine is already prepared for supported PETG rather than PLA, you can perform the basic workflow exercise with that material and label the substitution. Do not switch hardware or an unfamiliar plate merely to satisfy a word in the lesson. The record should say what you actually printed and which PLA-specific observations you did not make. Finish by writing one sentence the prototype supports and one requirement it does not address. Those two sentences are a practical defence against turning an encouraging first result into a broader performance promise.",
    ],
    sources: ["pla", "petg", "first"],
  },
] satisfies ReadingSection[];
