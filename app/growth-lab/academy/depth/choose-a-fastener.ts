import type { ReadingSection } from "../types";
export default [
  {
    title: "Draw the complete load and assembly path",
    paragraphs: [
      "A joint includes the fastener, the surrounding printed material and the way the assembled pieces are supported. Sketch where the force enters and where it leaves. A metal insert does not make the plastic around it infinitely strong. A nut pocket can fail or distort even when the bolt itself remains intact. Begin with the intended use and consequence of failure, then choose a modest desk-use teaching sample. Keep loaded, safety-critical or demanding connections outside the claims of this beginner assembly exercise unless they receive appropriate separate design and testing.",
      "Also draw how the joint will be assembled. Can you reach both sides? Can a tool engage the head and nut? Must the connection be opened repeatedly? A through-bolt with an accessible nut may avoid a heating operation and make inspection straightforward. An insert or printed thread may suit another design, but it introduces different geometry and process requirements. Do not select a joint solely because it hides the hardware. Access, repeatability and the ability to see whether it seated correctly are practical design requirements.",
    ],
    sources: ["fasteners", "design"],
  },
  {
    title: "Use hardware dimensions and a fit trial",
    paragraphs: [
      "Measure or obtain the supplier's dimensions for the actual hardware you own. A nominal thread designation does not describe every head, nut or insert dimension. Use those dimensions to design the through-hole, nut seat and tool clearance, with an explicit allowance appropriate to a trial. Do not copy a pocket from a different fastener standard without checking it. Keep the source drawing or product reference beside the CAD file. A small coupon can expose an inaccessible seat or poor fit before you print the complete body.",
      "Print the coupon in the intended orientation and material, then inspect the cooled features. Try the hardware gently and note whether it seats without damaging the plastic. A first-layer lip or rough support contact can obstruct a pocket even if the nominal CAD width appears sufficient. Investigate the local feature rather than globally scaling the whole object. For an insert, use the supplier's recommended hole and installation guidance for that product, then validate it in your process. An insert shape generated from a photograph is not a reliable substitute for its dimensional requirements.",
    ],
    sources: ["design", "fasteners", "firstlayer"],
  },
  {
    title: "Keep installation methods distinct",
    paragraphs: [
      "A through-bolt and nut, a printed thread and a heat-set insert are different joint systems. The through-bolt exercise can be assembled with appropriate hand tools and visible access. A heat-set insert introduces a heated tool, installation depth, alignment and cooling considerations that require its specific procedure and burn controls. Do not press an arbitrary hot object into a printed hole as a shortcut. If the equipment and instructions for that process are unavailable, use the accessible nut trial and record that insert installation was not performed.",
      "Tightening should follow the requirements of the actual design and hardware. The course does not provide a universal torque value for printed plastic. Stop if the body cracks, the pocket deforms or the fastener spins without seating. Applying more torque to overcome poor fit can destroy the evidence and the part. A published test of another specimen is useful for understanding possible failure modes, but its maximum load or torque is not your joint's rating. Geometry, material, orientation, installation and test conditions must all be considered.",
    ],
    sources: ["fasteners", "safety", "orientation"],
  },
  {
    title: "Inspect the seated joint and record its limits",
    paragraphs: [
      "For the teaching block, inspect whether the head and nut contact the intended surfaces, whether the pieces align and whether visible deformation occurred. Record assembly access and any difficulty reaching the tools. Do not perform an improvised destructive test to obtain a dramatic number. A gentle assembly proves only that the sample could be assembled under the observed conditions. It does not establish repeated-use life, sustained-load behaviour or a safe working load. Those questions need a defined test and acceptance method suited to the actual application.",
      "Keep the hardware identity, measured dimensions, CAD revision, material, orientation and fit result in the record. If the joint is revised, label the old specimen so it does not become mixed with the accepted trial. State the next question clearly: improve tool access, adjust a local allowance, change the joint location or obtain a proper load evaluation. The useful lesson outcome is an accessible, inspectable assembly plan with honest evidence, not a claim that choosing metal hardware has removed every limitation of the surrounding printed structure.",
    ],
    sources: ["fasteners", "design", "safety"],
  },
] satisfies ReadingSection[];
