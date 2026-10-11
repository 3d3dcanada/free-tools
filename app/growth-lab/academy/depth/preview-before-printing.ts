import type { ReadingSection } from "../types";
export default [
  {
    title: "Read the instructions, not only the solid model",
    paragraphs: [
      "The shaded model answers what shape was imported. The sliced preview answers what paths the software generated for the active configuration. Those views can disagree in important ways. A very thin feature may disappear, a region may be filled differently than expected, or support may contact a surface you wanted to preserve. Open the preview after every meaningful model or setting change. A screenshot from an earlier slice does not review the output you are about to send, even if the model still looks almost identical in the workspace.",
      "Begin by identifying the job and selected configuration. Confirm the dimensions and arrangement, then inspect the first deposited layer. Explain why its footprint matches the intended base. Move upward slowly through changes in geometry instead of immediately jumping to the final layer. Pay attention when holes begin, ledges appear or separate regions join. The goal is not to inspect every path individually. It is to understand how the important features grow and to notice where that construction cannot be explained by the layers beneath it.",
    ],
    sources: ["viewer", "first"],
  },
  {
    title: "Use colour views to answer specific questions",
    paragraphs: [
      "Many slicers can colour paths by feature, speed or another quantity. Read the legend and units before interpreting a colour. A red region is not universally an error; its meaning depends on the selected view. Feature colours help distinguish perimeters, infill and supports. A speed view can reveal where the requested motion changes, but it does not measure the achieved speed of a physical machine. Keep screenshots with the legend visible when you use them as evidence, so that another person does not have to guess what the colours represented.",
      "Inspect travel paths separately from deposited paths when diagnosing movement across gaps or surfaces. A travel line shows a proposed movement without the same deposition role as a perimeter. It does not prove that the nozzle will leave a mark or a string. Look at the relevant retraction and movement behaviour only after locating the suspected path. This sequence keeps diagnosis tied to a visible instruction. Randomly increasing retraction because the preview contains travel lines can create a new problem without demonstrating why the original route needed changing.",
    ],
    sources: ["viewer", "string"],
  },
  {
    title: "Stop at features that need an explanation",
    paragraphs: [
      "An island that first appears above empty space needs a construction plan. It may need support, a different orientation or a design change. A bridge is a different case: material spans between supported regions, with success depending on the specific setup and distance. The preview can show the proposed span but cannot guarantee its physical quality. When a feature looks questionable, return to the relevant lesson and manufacturer guidance. Do not assume that the absence of a software warning means the geometry is suitable for every material and printer.",
      "The official benchmark's cabin opening is a useful place to practise distinguishing an overhang from a span. Keep the reference scale unchanged for a meaningful comparison and inspect the layers where the opening begins and closes. Write what supports each new line of material. If you select support, check where it starts, where it touches and whether you can later remove it. A support structure trapped inside a finished cavity can be a design problem even if the slicing engine successfully generates all of its paths.",
    ],
    sources: ["supports", "bridge", "benchy"],
  },
  {
    title: "Close the preflight with a traceable export",
    paragraphs: [
      "Review the final top surfaces and the reported time and material estimates. Save them as predictions in the print log. Save the project that generated the output, then export instructions for the intended machine through the documented workflow. Reopen the exported instructions in a compatible viewer when practical, especially after changing output settings. Match the filename at the printer to the reviewed job. Removing an old similarly named file from your own job selection workflow can be useful, but do not delete another person's files from shared storage.",
      "Your preflight record should identify one important feature and explain how it will be built. For a plain block, that might be the first layer and closing top. For the benchmark, it might be the cabin opening. Note any unresolved question and delay the physical trial if it affects readiness. A completed preflight is evidence about instructions, not a certificate for the finished part. You still need the workspace checks, supervision, cooling and inspection. Keeping those stages distinct makes a later failure easier to locate without dismissing the useful preparation already completed.",
    ],
    sources: ["viewer", "first", "safety"],
  },
] satisfies ReadingSection[];
