import type { ReadingSection } from "../types";
export default [
  {
    title: "Identify what the file is asking you to trust",
    paragraphs: [
      "A geometry file describes a shape. A saved slicer project can preserve a shape together with choices about arrangement and printing. Machine instructions describe actions for a specific setup. These are different trust decisions even when they arrive in the same download folder. Before opening a file, identify its source and extension and read the creator's description. After opening it, inspect what changed in the application. Do not assume that a familiar looking model means the selected printer, material or nozzle still matches the equipment you intend to use.",
      "An STL normally gives you a triangulated surface rather than a full editable design history. The importing application must interpret its coordinates and scale. A 3MF can carry richer information, and a slicer project may include settings you did not choose yourself. Keep the original download separate from the project you prepare for your machine. A useful filename records a model revision and a job identifier without implying that the file has been tested. Save the editable source when it is yours; exporting a mesh does not preserve every design decision.",
    ],
    sources: ["files", "first"],
  },
  {
    title: "Check the object before inheriting a print plan",
    paragraphs: [
      "Start with dimensions. A downloaded spacer that should be 25 millimetres wide but appears about 635 millimetres wide suggests a unit interpretation problem worth investigating, because 25 multiplied by 25.4 equals 635. That arithmetic is a diagnostic clue, not proof of the cause. Verify the creator's intended units before applying a correction. Then inspect separate shells, orientation and the intended contact face. A model that looks joined in a shaded view may contain disconnected pieces whose first printable layers need separate attention.",
      "Prefer generating instructions using your verified local profile. Another person's G-code can include machine-specific motion, heating, start and end commands. Merely reading its filename does not establish compatibility. The same caution applies to a project that changes a printer preset after import. Compare the physical machine record with the current selections before slicing. Preserve the prepared project and inspect its exported preview so that, if something later looks wrong, you can connect the file sent to the printer with the exact preparation that produced it.",
    ],
    sources: ["first", "viewer", "files"],
  },
  {
    title: "Keep permission beside the model",
    paragraphs: [
      "Free access to a download describes its purchase price, not every permitted use. Save the creator name, source page, licence identifier and version, date checked and any attribution requirement. Write your intended use separately: private practice, modification, sharing a file and selling a physical object are distinct activities to check. If the terms are missing or unclear, keep the item out of a sales plan until that question is resolved. A screenshot or saved page is useful provenance, but it does not manufacture rights that the creator did not grant.",
      "The official 3DBenchy licence page identifies the model as CC0 when checked on 8 October 2026. Creative Commons explains that CC0 addresses copyright and related rights; it does not automatically settle every trademark, patent or other issue. Credit is still useful in learning notes because it identifies the benchmark and lets someone find the same reference. Do not rename a downloaded model and describe it as your original design. Also keep marketplace eligibility separate: a licence allowing an activity does not guarantee that a particular marketplace accepts that product category or authorship arrangement.",
    ],
    sources: ["benchylicense", "rights", "etsy"],
  },
  {
    title: "Build a small provenance packet",
    paragraphs: [
      "For practice, use the official benchmark source rather than an unexplained reupload. Put the source note, original file and your machine-specific project in one job folder. Record whether you changed scale or geometry. A standard benchmark is useful for comparison only when differences are visible in the record; quietly enlarging it changes the printing problem. If you choose a different model, explain why and retain its own permission evidence. A useful folder can be simple: one source note and clearly named originals and prepared outputs are enough.",
      "Before moving on, explain what each saved item proves. The licence note supports a permission check. The geometry file identifies the input. The project preserves preparation choices. The sliced preview helps inspect proposed paths. None of them proves that a physical print succeeded. Leave space for that later evidence and avoid calling the folder production-ready after import alone. If an imported project altered your profile, restore your verified baseline and record the correction. That observation is a useful lesson result even before you have printed the benchmark itself.",
    ],
    sources: ["benchy", "first", "viewer"],
  },
] satisfies ReadingSection[];
