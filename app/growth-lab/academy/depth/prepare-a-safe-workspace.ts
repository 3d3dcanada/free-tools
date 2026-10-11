import type { ReadingSection } from "../types";
export default [
  {
    title: "Map the work before switching on",
    paragraphs: [
      "Walk through loading filament, starting a job, observing it, stopping a failure and removing the cooled part. Each activity uses different space and may expose you to different hazards. Mark the moving envelope and hot surfaces on a simple room sketch. Include the route a person takes to the stop control and the place where a removed plate will rest. This is preparation, not a claim that a sketch certifies a workspace. The exact printer handbook and the rules of your home, school or workshop remain the starting points.",
      "Look beyond the machine's footprint. Loose packaging can obstruct movement; stored filament can block access; a cord can become a trip or damage point. Check the specified supporting surface, electrical supply and clearances without improvising modifications. Keep children, pets and bystanders outside the operating area. Identify who is allowed to start or stop the machine and who can help if equipment behaves abnormally. A shared workshop needs an agreed response, because a label that only one person understands is a weak control when that person is absent.",
    ],
    sources: ["safety", "bates"],
  },
  {
    title: "Treat emissions as a control question",
    paragraphs: [
      "NIOSH describes particles and chemicals that can be released during filament printing. The amount and character depend on the equipment, material and process, so a pleasant smell or no noticeable smell is not an exposure measurement. Start by asking whether a different process or suitable material can reduce the concern. Then examine engineering controls such as source capture. Room ventilation and a ventilated enclosure are not interchangeable phrases. The useful question is where emissions travel and how the proposed control captures or removes them under the actual operating conditions.",
      "A closed enclosure built to keep a print warm does not automatically provide effective emission control. A fan, filter or duct also needs an appropriate design and maintenance plan; its presence alone is not evidence of performance. Avoid converting a single study's airflow value into a universal recipe for every room. Ask a competent facilities or occupational-safety person when the installation requires assessment. Prefer documented manufacturer provisions, and have proposed retrofits evaluated so that solving one problem does not create overheating, electrical, fire or equipment-approval problems elsewhere.",
    ],
    sources: ["safety", "enclosure"],
  },
  {
    title: "Plan a response you can actually carry out",
    paragraphs: [
      "Find the maker's normal pause, cancel and shutdown procedures before starting a print. Understand which control ends a job and which conditions require the site's emergency response. Keep access clear. If a part detaches, do not put a hand into the moving mechanism to hold it down. A stopped failed print costs material; reaching into active motion can add injury and equipment damage. If you see damaged wiring, electrical burning, uncontrolled heating or other abnormal behaviour, stop using the equipment and get appropriate qualified help.",
      "A camera can help you see a problem but cannot remove a hazard or guarantee that someone will respond. Decide who will supervise the exercise according to the maker's instructions and local rules, and what they will do if they must leave. Do not interpret a remote view as permission to ignore those arrangements. Keep emergency contact and response information available in the form used by your location. This lesson deliberately does not prescribe an improvised fire intervention: use the applicable emergency procedure and avoid placing yourself in danger.",
    ],
    sources: ["safety"],
  },
  {
    title: "Include cooling and cleanup in the plan",
    paragraphs: [
      "The job is not finished when motion stops. The nozzle, plate and part may remain hot. Follow the specified cooling and removal process, and reserve a stable location for handling the cooled specimen. Sharp support fragments and hand tools introduce their own hazards during cleanup. Choose protective equipment from the task assessment and relevant safety data sheets rather than copying a universal mask or glove list. Personal protective equipment supplements appropriate process controls; it does not make an unsuitable material, room or improvised procedure acceptable.",
      "Complete your worksheet with four concrete entries: the manual and material information checked, the operating boundary, the emissions-control arrangement and the stop/escalation procedure. Add unresolved items in a separate column. If the ventilation arrangement is unknown, write unknown and delay physical practice while it is resolved. You can still complete the model and slicer exercises without heating a machine. A useful outcome for this lesson is a clear decision about readiness, including a decision not to start yet. Checking the practice box should reflect that preparation and your own record.",
    ],
    sources: ["safety", "sheets"],
  },
] satisfies ReadingSection[];
