import type { ReadingSection } from "../types";
export default [
  {
    title: "Look for two anchors or one extending edge",
    paragraphs: [
      "A bridge spans a gap between supported regions. An overhang extends outward beyond material below it. The distinction becomes clearer when you inspect the first paths that cross the gap rather than looking only at the completed solid. Mark the start and end of a proposed span and identify what anchors each end. For an overhanging ledge, identify the supporting edge and the portion extending into open space. These sketches help you choose the relevant check and avoid treating every downward-facing surface as the same printing problem.",
      "A simple beam between two posts is an understandable bridge example. A shelf extending from one post is an understandable overhang example. Neither diagram gives a universal permitted distance or angle. Geometry, cooling, material and process settings affect the outcome. A rule of thumb can help you notice a feature worth investigating, but it should not replace the actual preview and trial. Keep the span and orientation in the record so that a later successful short bridge is not misquoted as evidence for a much longer one.",
    ],
    sources: ["bridge", "supports", "design"],
  },
  {
    title: "Change the construction problem before chasing a setting",
    paragraphs: [
      "Rotate the part and inspect whether the span becomes shorter or the overhang becomes supported by previous layers. Check the consequences for other faces, bed contact and layer direction. A rotation that solves one bridge can put a critical surface onto supports or create a new unsupported start. If no orientation serves the whole design well, consider a split or geometry change. The slicer's support option is useful, but it is one tool among several. A deliberate design change may be more repeatable than pushing a marginal bridge to its limit.",
      "Inspect the planned support access if you decide to use temporary material. An opening that looks clear from the front may contain a difficult removal path deeper inside. Avoid selecting a support strategy based only on how much material the estimate reports. The underside quality and cleanup access matter to the final use. Keep the baseline support and bridging settings appropriate to the material. A value that works for one polymer on a cooled short span is not automatically transferable to a flexible grade or a large enclosed cavity.",
    ],
    sources: ["supports", "cut", "bridge", "tpu"],
  },
  {
    title: "Observe the first spanning layer and the finished underside",
    paragraphs: [
      "Use the standard-scale official benchmark or another clearly documented simple specimen. In preview, locate the cabin opening and identify the paths that first cross it. Keep the model scale and orientation unchanged if you intend to compare against an earlier specimen. After the supervised print and cooling, inspect the underside for sagging, loose strands or other visible differences. Record what you actually see. A top surface that eventually closes neatly can conceal a poor first spanning layer underneath, so look from the side and below as well.",
      "If the result needs investigation, follow the maker's supported bridging procedure and change one relevant parameter at a time. Speed, cooling and flow can interact, so a simultaneous change in all three will not isolate a cause. Keep the original specimen and profile. Compare the same span under consistent light and note any new issue elsewhere. Do not improvise a maximum-fan rule for every material. The useful process is a supported, explainable comparison that addresses the observed underside, not a universal recipe extracted from one attractive bridge photograph.",
    ],
    sources: ["benchy", "bridge", "viewer"],
  },
  {
    title: "State the limit of the observation",
    paragraphs: [
      "A successful small bridge shows that the recorded setup produced that span with the observed quality. It does not prove structural capacity, leak resistance or suitability for every opening. If the underside is a functional mating face, measure or test the relevant feature rather than accepting it solely because the loose strands are small. If cleanup removes material, record the resulting change separately. The intended application determines what counts as acceptable. The course specimen is a way to understand construction and observation, not a qualification sample for an unrelated product.",
      "Your final note should identify one bridge, one overhang, their supporting regions and the actual underside result. Include the model source, scale, material, profile and any single adjustment. If you reused a previously printed benchmark, confirm that its setup was recorded before drawing a comparison. If its provenance is unknown, use it only to identify visible features and leave process conclusions open. This distinction lets an old specimen remain useful for learning without pretending it is controlled evidence about a setting you did not observe or record.",
    ],
    sources: ["bridge", "supports", "benchylicense"],
  },
] satisfies ReadingSection[];
