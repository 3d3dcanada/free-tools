import type { ReadingSection } from "../types";
export default [
  {
    title: "Define the same job three times",
    paragraphs: [
      "Choose a simple original desk-use part with a saved model revision and written acceptance checks. The exercise is to repeat a known process, so keep the material, printer, nozzle, orientation and profile identified. Decide whether the samples will be made in separate jobs or together on one plate, and record that choice. Those arrangements are not identical experiments. Multiple objects on a plate can alter travel and cooling behaviour, while separate jobs repeat setup and heating. Use the arrangement that answers your current question and keep its limits visible.",
      "Give the three samples distinct identifiers before printing. Connect each identifier with its job file and inspection row. If several parts share a plate, preserve their positions in a sketch so that a regional issue can be traced. Do not rely on memory after the pieces are removed and placed together. A small label or separate container can prevent a sound sample and a rejected one from becoming indistinguishable. The record should follow the object through cleanup and inspection, not stop when the printer reports that the toolpath finished.",
    ],
    sources: ["design", "viewer", "maintenance"],
  },
  {
    title: "Use one acceptance method for every sample",
    paragraphs: [
      "Inspect each part against the same stated criteria. Measure the same features using the same method and record visible damage or required rework. Do not loosen the criteria for the third sample because you want the batch to pass. Keep the nominal values separate from actual readings. If the measuring method cannot resolve a required feature, mark that requirement unresolved for each affected sample. A batch result is a collection of individual observations, and a neat average should not hide one part that fails a necessary fit or visible-damage check.",
      "As a fictional illustration, widths of 20.02, 20.10 and 20.18 millimetres have a range of 0.16 millimetres. That arithmetic describes those three readings only. It does not establish a process tolerance, a long-term distribution or a guaranteed future range. You also need an acceptance criterion to decide whether the readings are suitable for the job. Avoid turning a tiny practice batch into a statistical capability claim. Its strength is exposing practical inconsistencies and missing steps while the cost of another trial remains modest.",
    ],
    sources: ["design", "flow", "orientation"],
  },
  {
    title: "Count rejects, labour and elapsed time honestly",
    paragraphs: [
      "Record every attempt, including a print that was stopped or damaged during removal. Keep consumed material, active labour and machine time connected to the batch. If one of three attempts fails, do not calculate the manufacturing effort as though only the two successful attempts existed. The failed work still consumed resources. At the same time, do not extrapolate that single failure into a dependable long-term defect rate. Use it to identify a cause worth investigating and to keep the current cost record complete.",
      "Separate the time boundaries. A slicer estimate, elapsed machine cycle, cooling interval and hands-on packing time describe different activities. For delivery planning, the order of those activities matters as well as their sum. A printer may be free while a part cools, or the next job may require the same plate and handling. Record the actual workflow rather than assuming perfect overlap. Include setup and cleanup tasks that would repeat in a real order, because an ideal print-time figure alone cannot establish reliable production capacity.",
    ],
    sources: ["cost", "calculator", "sheets"],
  },
  {
    title: "Use the small batch to choose the next trial",
    paragraphs: [
      "Review the three records together. Look for a repeated issue, an inconsistent observation or a step that took more labour than expected. Choose one improvement or one question for the next batch. If the process is sound for the modest teaching purpose, preserve its model and profile as the current baseline. If it is not, revise the relevant geometry or preparation and assign a new revision. Do not mix old and new parts in a single result row, because that hides whether the process change actually helped.",
      "Finish with the three sample statuses, actual resource record and a bounded conclusion. You can report what happened in this trial and what you plan to check next. You cannot promise an order quantity or dispatch date solely from these three specimens. Real delivery decisions also depend on available equipment, material, inspection, packing and other commitments. The course exercise remains local and does not accept an order. Its useful outcome is a small repeatability packet that makes the next human production decision more informed and exposes uncertainty before it becomes a customer promise.",
    ],
    sources: ["cost", "calculator", "maintenance", "design"],
  },
] satisfies ReadingSection[];
