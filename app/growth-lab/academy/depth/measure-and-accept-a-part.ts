import type { ReadingSection } from "../types";
export default [
  {
    title: "Write the acceptance question before seeing the result",
    paragraphs: [
      "An inspection is useful when it compares a part with a requirement. Decide which dimensions, surfaces or behaviours matter before looking for a flattering result. For a teaching block, you might record three overall dimensions, base flatness and visible cracks. For a mating part, a fit feature may matter more than an unrelated outer edge. Keep the criteria modest and observable. If the exercise has no justified numeric tolerance, record the measurements without inventing a pass band afterward simply to make the sample acceptable.",
      "Separate appearance, dimensions and application performance. A smooth wall can be the wrong size. A dimensionally suitable object can contain visible damage. Neither observation establishes behaviour under heat or load. Put these categories in different rows of the record so that a pass in one does not erase an unresolved question in another. The finished object should have a clear status for its intended purpose, including unresolved when necessary. This is more informative than a single overall label such as good print with no explanation of what was checked.",
    ],
    sources: ["design", "orientation", "flow"],
  },
  {
    title: "Use a repeatable measurement method",
    paragraphs: [
      "Allow the part to reach the appropriate handling and measurement condition, then use a tool suited to the feature and required resolution. Check the tool's zero and condition according to its instructions. Place it consistently on the same surfaces and avoid squeezing a flexible specimen. A rough edge, support scar or first-layer lip may change where the jaws contact. Record the feature and method, not only the number. If the tool cannot reach an internal dimension reliably, mark it unmeasured or choose a suitable method rather than guessing from an outside reading.",
      "Repeat a doubtful reading before changing the design. Rotate or reposition the measuring tool carefully to check whether your technique is introducing the difference, while still measuring the same defined feature. Keep readings in their original units and distinguish the instrument's display resolution from demonstrated measurement accuracy. Many decimal places do not automatically mean a more trustworthy result. For the course, the goal is an honest nominal-versus-actual table. The table can reveal a question worth investigating without pretending that a casual workshop measurement is a formal calibration certificate.",
    ],
    sources: ["design", "flow"],
  },
  {
    title: "Use variation to decide what needs another check",
    paragraphs: [
      "Suppose a fictional drawing calls for 20.00 millimetres and a reading is 20.12 millimetres. The difference is plus 0.12 millimetres. That arithmetic does not establish pass or fail until a justified acceptance criterion exists. A decorative block and a sliding insert may allow different variation. Do not adjust the entire model just because one dimension differs. First check the measurement method, local geometry, orientation and whether the difference is repeatable. A correction that helps one face can disturb another feature that was already suitable.",
      "For mating parts, consider both dimensions. An opening and a peg can each vary, so a single nominal clearance does not describe every possible pair. The tolerance lesson's range calculation illustrates that relationship using assumed inputs. Actual process variation needs actual records. A few samples can suggest a problem or a useful next trial, but they do not establish a robust statistical capability claim. Keep the observed sample count visible and avoid turning the best of several parts into a promise about all future output.",
    ],
    sources: ["design", "orientation", "flow"],
  },
  {
    title: "Make the disposition visible",
    paragraphs: [
      "For each requirement, record pass, fail or unresolved with the supporting observation. Keep the nominal value separate from the actual reading and include units. If a part fails a required check, label or separate it so it cannot be confused with an accepted specimen. Cosmetic cleanup should not erase a crack or missing edge from the record. If a revision is needed, identify the model or process change and preserve the earlier version. This makes the next inspection a comparison of known states rather than a memory of how the previous part looked.",
      "Finish the teaching exercise with the cube's three readings, the tool used, the base observation and a bounded conclusion. You can say that the recorded checks were completed and state their results. You cannot use the course completion record to claim product qualification or independent inspection. If a real application requires a load, heat, electrical, contact or regulatory assessment, list that requirement separately and obtain appropriate expertise. The habit to carry forward is simple: acceptance follows evidence against a stated requirement, while missing evidence stays visible instead of becoming an assumed pass.",
    ],
    sources: ["design", "safety", "orientation"],
  },
] satisfies ReadingSection[];
