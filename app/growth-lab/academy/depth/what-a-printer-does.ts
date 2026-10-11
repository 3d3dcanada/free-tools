import type { ReadingSection } from "../types";
export default [
  {
    title: "Follow the material and the instructions",
    paragraphs: [
      "Imagine making a small desk spacer. The design says where the outside surfaces belong. It does not say which motor should move next or how much filament should enter the hotend. A slicer interprets that shape using a printer, material and print profile. It produces a sequence of movements and process commands. The printer follows those instructions while pushing softened material through a nozzle. The cooled result is a new physical object, with its own dimensions and possible defects. Keep these four stages separate when describing a problem.",
      "Two systems work together during deposition: controlled motion and controlled material delivery. Depending on the machine, the bed, toolhead or both move. The important relationship is the nozzle's position relative to the build surface. Do not infer the axis arrangement from a photograph of another printer. Find the motion diagram in your own manual, with the machine stopped. Then trace the material route from spool to feeder to hotend. This paper exercise makes later descriptions such as a feed interruption or a sideways shift much more precise.",
    ],
    sources: ["safety", "slicer"],
  },
  {
    title: "A solid model is not necessarily a solid print",
    paragraphs: [
      "The spacer can appear completely solid in the modelling window while the slicer fills its interior with a sparse pattern. Outer walls, top and bottom layers, and interior paths serve different purposes. The slicer chooses them from the active settings. That is why the shape's enclosed volume is not the same as the amount of plastic a finished print will contain. Supports, brims and purge material can add plastic outside the final shape as well. Later cost exercises separate model volume, predicted use and material actually consumed.",
      "For a simple geometric example, a 20 by 20 by 10 millimetre block encloses 4,000 cubic millimetres, or 4 cubic centimetres. This is a calculation from the intended dimensions, not a measurement of a printed block. At a constant 0.20 millimetre layer height, 10 millimetres contains 50 nominal layer intervals. A different first layer or variable layers changes that simple count. Use the example to connect height with stacked paths, then read the actual layer count in your own sliced preview instead of treating 50 as a required result.",
    ],
    sources: ["slicer", "layers", "infill"],
  },
  {
    title: "Look for evidence at each stage",
    paragraphs: [
      "When a feature is absent, ask where it disappeared. If the hole is missing in the model, changing printer speed cannot restore it. If it exists in the model but vanishes in the sliced paths, inspect the geometry and slicing choices. If the paths show it but the printed part does not, investigate the physical process. This order reduces random setting changes. Save a view of the model, a matching view of the preview and a photograph of the part so that the three observations refer to the same feature.",
      "A printer's finished message means that its instruction sequence ended. It does not measure a hole, test adhesion between layers or decide whether an object can carry a load. Even a good looking spacer might be the wrong size for its intended location. Start with a modest inspection: let it cool as instructed, look at the underside and walls, then compare one dimension with the intended value. Write an actual observation such as a visible gap or a measured width. Avoid replacing those observations with an unexplained label such as perfect.",
    ],
    sources: ["first", "design"],
  },
  {
    title: "Make the first exercise small and explainable",
    paragraphs: [
      "The course begins with a plain block because its purpose is easy to state. You can identify the base, compare vertical edges and locate layer lines without also diagnosing an elaborate model. Draw the five stages in your notebook: shape, slicing, preview, printing and inspection. Under each stage, name the evidence you will keep. The project file belongs with the slicing stage; the printed sample and measured value belong with inspection. If you cannot yet complete a stage, leave its result blank rather than copying an example as if you observed it.",
      "Do not run the printer just to complete this first lesson. The workspace, file and profile checks come first, followed by the supervised printing procedure in lesson 10. A borrowed machine still needs its operator's permission and its own instructions. Reading this course is free and needs no account, and its progress record stays in your browser. Physical practice needs suitable equipment and judgment. For now, success is being able to explain what information moves between the stages and what still needs checking before your planned block becomes a useful physical specimen.",
    ],
    sources: ["safety", "first"],
  },
] satisfies ReadingSection[];
