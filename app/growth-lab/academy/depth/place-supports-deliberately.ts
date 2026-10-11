import type { ReadingSection } from "../types";
export default [
  {
    title: "Find the unsupported start, then consider the alternatives",
    paragraphs: [
      "Move through the sliced layers until the questionable feature first appears. Ask what lies beneath the first deposited paths. If there is no useful support from the existing object, the geometry may need temporary support, a different orientation or a design change. Do not enable support everywhere before locating the problem. A rotation can sometimes move the critical feature into a more practical position. A split can sometimes give each piece a sensible base. Both alternatives introduce their own tradeoffs, so inspect the whole part after any change.",
      "For the teaching T-piece, a narrow stem supports a wider top. The ledges extending beyond the stem make the support question easy to see. Build it as joined geometry using the stated dimensions, and check that the exported object represents the intended union. If the top remains a disconnected shell, the file introduces another problem that support settings alone do not explain. Save the source and preview. The goal is an understandable example of temporary construction beneath a ledge, not a complicated benchmark with several hidden failure modes.",
    ],
    sources: ["supports", "cut", "design"],
  },
  {
    title: "Inspect contact, origin and removal access",
    paragraphs: [
      "After generating supports with the supported baseline, inspect where they start and which surfaces they touch. A support may begin on the plate or on another part of the object, depending on the selected mode. The contact can affect surface finish and cleanup. Identify whether that face is cosmetic, a mating surface or a region whose damage would matter to the design. Do not judge the support only by its material estimate. Its placement determines what work will be needed after the print and whether the resulting surface remains useful.",
      "Now imagine removing every support from the cooled part. Can a hand tool reach it without bending a thin feature or driving fragments into a closed cavity? A support that prints successfully but cannot be removed may defeat the design. Trace the removal direction in a sketch. If access is poor, revisit orientation, a split or the geometry itself before trying an increasingly delicate support pattern. This planning step is especially valuable for channels and enclosed spaces, where a shaded exterior view can conceal material that will remain trapped inside.",
    ],
    sources: ["supports", "supportfinish", "cut"],
  },
  {
    title: "Treat interface settings as a tested compromise",
    paragraphs: [
      "The contact region balances support during printing with separation afterward. Slicers offer interface and spacing controls, but their useful values depend on material, printer and support strategy. Start with the maker-supported configuration rather than copying a universal gap. A setting that makes support easy to remove can leave a rougher underside; a closer contact may improve support but become harder to separate. Observe both outcomes on the same specimen. Do not report only the side that improved when the other consequence makes the actual part less suitable.",
      "For the first trial, keep the baseline and print the small accessible T-piece. After proper cooling and release, remove support with the safe method covered in the finishing unit. Preserve one contact region before cosmetic cleanup so that its as-removed condition remains visible. Look for gouges, cracks and missing edges as well as roughness. A fine surface after heavy sanding does not show what the support interface produced, and it may hide a dimensional change. Keep printing quality and later finishing work as separate observations in the record.",
    ],
    sources: ["supportfinish", "finish", "supports"],
  },
  {
    title: "Count the support in the whole job",
    paragraphs: [
      "Supports consume material and machine time, and removal takes labour. Include those quantities when comparing two ways to manufacture the part. The mass of the cleaned specimen alone omits material that was necessary to make it. A split design with connectors may use less temporary material but add assembly work. Compare the full sequence rather than selecting whichever slicer estimate is smallest. Keep unknown labour or failure effort visible until measured. For the teaching exercise, a simple time note and a description of access are enough to make the comparison concrete.",
      "Finish with a support-contact sketch, the saved profile and a removal result. State whether the underside is suitable for the practice purpose and whether the geometry needs revision. If you did not physically print the specimen, label the result as preview-only and leave removal unproven. The preview can confirm generated paths and contact locations; it cannot show how easily your material will separate. Knowing which evidence belongs to each stage helps prevent a neat support rendering from being mistaken for a finished, inspected and usable physical part.",
    ],
    sources: ["supports", "cost", "supportfinish"],
  },
] satisfies ReadingSection[];
