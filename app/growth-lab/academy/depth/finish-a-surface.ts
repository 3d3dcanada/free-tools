import type { ReadingSection } from "../types";
export default [
  {
    title: "Name the surface and the intended change",
    paragraphs: [
      "Finishing should begin with a purpose: reducing a sharp edge, improving the appearance of a visible face or preparing a surface for a compatible coating. Mark the area to be changed and the features that must retain their dimensions. A mating face, thread or locating peg may be harmed by the same sanding that improves a decorative panel. Do not treat the entire object as one uniform cosmetic surface. A simple sketch showing protected and worked regions is enough to keep the operation connected to the part's intended function.",
      "For the course, use two ordinary unfilled PLA or PETG blocks. Keep one as an unfinished reference and select a noncritical face on the other. This makes the comparison clear and avoids combining a new material, complex geometry and unfamiliar finishing chemistry. Record the original dimensions that matter before removing material. The purpose is to observe a controlled change, not to produce a flawless marketing image. If the starting print has a crack or missing feature, address that defect separately instead of using finishing to make the evidence less visible.",
    ],
    sources: ["finish", "design", "pla"],
  },
  {
    title: "Choose controls for the operation, not just the material name",
    paragraphs: [
      "Abrasion can generate dust, and fillers or coatings can introduce chemical exposure. Read the relevant product instructions and safety information before choosing the method and protective measures. The controls for printing are not automatically sufficient for sanding. Keep fibre-filled materials and powered sanding outside this first exercise, and do not assume that a respirator or gloves alone make an unsuitable setup acceptable. Prepare the work area, handling and cleanup for the actual task. If those requirements are unclear, stop at planning and obtain appropriate guidance before creating dust or fumes.",
      "Use a suitable hand-finishing method on the selected face, following the material and abrasive guidance. Avoid improvising solvent smoothing in this beginner lesson. A process that changes the surface chemically also brings compatibility and exposure questions that a simple hand comparison does not address. If you later test a filler or coating, begin on scrap and follow its preparation and curing instructions. Do not mix unknown products or transfer advice between polymers merely because both parts look like plastic. Keep each added operation documented so the final result remains explainable.",
    ],
    sources: ["finish", "safety", "pla"],
  },
  {
    title: "Compare appearance and dimensions separately",
    paragraphs: [
      "Inspect the worked face under the same lighting and angle as the reference. Describe what changed: visible stepping, texture, edge sharpness or another observable feature. Then recheck the dimensions that could be affected. A smoother surface and an altered fit can occur together. If you sand a nominal 10 millimetre peg, the fact that it now enters a sleeve does not tell you that the original print tolerance was correct. It tells you that a secondary operation changed the part. That distinction matters when you try to repeat the process.",
      "As a simple arithmetic illustration, removing 0.10 millimetres from each of two opposite faces reduces the overall width by 0.20 millimetres. Those values are assumed, not a claim about how much a hand abrasive removes per pass. Real removal is difficult to control without measurement. Use the example to understand why protecting mating surfaces matters. Do not count strokes as a universal dimensional recipe. Measure the relevant feature with an appropriate method, record the actual readings and leave uncertainty visible when the tool or geometry cannot support a precise conclusion.",
    ],
    sources: ["design", "finish"],
  },
  {
    title: "Keep cosmetic improvement within its evidence",
    paragraphs: [
      "A coating can improve appearance without proving food-contact suitability, weather resistance or restored strength. Those are application requirements involving the complete material and process. Do not attach a broad safety claim to a finished object simply because a product label describes one ingredient as suitable for a particular use. The beginner exercise stays with a modest desk-use specimen and an observable surface change. If the actual job has special contact or durability requirements, identify them before selecting a finish and obtain the evidence needed for the finished combination.",
      "Complete the record with the initial condition, protected features, method, task controls, visible result and any dimensional change. Keep the reference sample and the finished sample labelled. If a coating remains uncured or an inspection remains incomplete, mark the result pending. Include the cleanup effort if you later use this method in a cost estimate. A useful finishing process is one you can explain, repeat and inspect; the best-looking sample alone does not show how much labour it required or whether important functional surfaces stayed within their intended limits.",
    ],
    sources: ["finish", "safety", "cost"],
  },
] satisfies ReadingSection[];
