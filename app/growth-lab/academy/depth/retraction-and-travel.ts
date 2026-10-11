import type { ReadingSection } from "../types";
export default [
  {
    title: "Find the travel before changing retraction",
    paragraphs: [
      "Retraction changes filament movement around some non-printing travel moves to help control ooze. Begin by locating the travel in the preview. For two separated pillars, identify where deposition ends on one pillar, where the nozzle travels and where the next deposited path begins. Those three locations give you a better observation plan than simply looking for hair between objects. The slicer may offer several travel and retraction controls, but their presence does not mean they all need changing. Start with the supported preset for the actual feed system.",
      "The physical feed path matters. A direct arrangement and a longer guided path can respond differently, and flexible material adds another variable. Do not copy a distance from another machine without checking its configuration. Read the printer's procedure and material restrictions together. A larger retraction value is not automatically a stronger cure. The useful setting is one that addresses the observed ooze while preserving reliable restart and feeding. Keep the original values so that a trial with worse extrusion can be reversed immediately and clearly in the project.",
    ],
    sources: ["string", "tpu", "viewer"],
  },
  {
    title: "Check the conditions that can imitate a retraction problem",
    paragraphs: [
      "Thin strings can involve temperature, material condition and residue as well as retraction. Verify the supported profile and the filament's preparation before starting a parameter sweep. If the maker's procedure calls for inspecting or cleaning the nozzle, do so only in its documented safe state. Do not reach into moving hardware to wipe away a thread. Describe the symptom and keep a photograph if useful. A label such as retraction failure should be a hypothesis to investigate, not the starting assumption that forces every later observation into one explanation.",
      "Moisture preparation is especially relevant when the material's instructions call for drying. A dry-storage container and an active dryer serve different purposes, and both need suitable equipment and procedures. If you dry a spool, record that as a changed condition and establish a new baseline before also changing retraction. Otherwise, an improved sample cannot distinguish the effects. The same applies to a temperature correction. Fix a known profile mismatch first, then assess whether a repeatable stringing problem remains before fine tuning the travel-related settings.",
    ],
    sources: ["dry", "string", "first"],
  },
  {
    title: "Use two pillars to observe both ends of the move",
    paragraphs: [
      "Create the two 6 by 6 by 15 millimetre pillars with the planned separation and inspect their paths. Keep their dimensions and placement the same for every comparison. Print the baseline and label it. Look between the pillars for threads, but also inspect the points where extrusion restarts. A trial that removes a thread while leaving a gap at each restart may make the part less useful. Record both observations in separate fields so that the most visible improvement does not hide a new delivery defect.",
      "If a supported adjustment is warranted, change one parameter at a time within the maker's procedure. Distance and speed are different controls; changing both prevents a simple conclusion about either. Keep temperature, material condition, model and other settings fixed. Compare under the same lighting and viewing direction. Do not rank samples only after removing their strings with a tool, because that erases part of the evidence. Photograph or describe the as-printed result before any cleanup, and retain the project that generated each labelled specimen.",
    ],
    sources: ["string", "teaching", "viewer"],
  },
  {
    title: "Retain a useful profile, not an extreme number",
    paragraphs: [
      "Stop the tuning sequence when a supported setting gives a useful result for the trial without introducing worse feeding or restart behaviour. If no supported adjustment helps, restore the baseline and reconsider the diagnosis. Do not keep extending distance or speed because the remaining thread is annoying. The next check may concern temperature, material condition, nozzle condition or the geometry's travel strategy. Persistent faults should be investigated with the maker's guidance and useful evidence rather than a collection of increasingly extreme values from unrelated machines.",
      "Your final record should connect the material and feed route with the baseline, the single change and the observations at both travel and restart. State whether the change was retained and what remains untested. Two simple pillars do not represent every long travel, small feature or flexible geometry you may later print. Keep that limit visible when reusing the profile. The lesson is complete when you can explain why the trial was needed, what the setting changed and why the observed result justified keeping it or returning to the baseline.",
    ],
    sources: ["string", "tpu", "teaching"],
  },
] satisfies ReadingSection[];
