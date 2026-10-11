import type { ToolGuide } from "../guide";
export default {
  slug: "print-cost-calculator",
  locale: "en",
  title: "Free 3D Print Cost Calculator, Your Own Costs | 3D3D",
  description:
    "Estimate material, electricity and machine allowance for your own prints. Enter geometry and local prices, review assumptions and download a report.",
  name: "3D Print Cost Calculator",
  headline: "Estimate your print with your own numbers.",
  summary: "Compare material, electricity and machine allowance before a print.",
  answer:
    "Estimate a 3D print’s material, electricity and machine allowance for free in your browser, with no uploads. Enter your model’s volume and surface area, shell thickness, infill, density and local costs. The result is an approximation for your own planning, not a slicer calculation, selling price or 3D3D quote. Save the assumptions with the report.",
  steps: [
    "Enter a verified solid volume in cubic centimetres and surface area in square centimetres, or read them from a suitable model through the local inspector. Confirm the model units first. An unavailable mesh volume should not be replaced with zero.",
    "Set an approximate shell thickness, infill percentage, material density and extra-material allowance. Use values appropriate to your intended print rather than treating the example defaults as a tested profile. Compare the estimate with slicer output when it becomes available.",
    "Enter your actual filament price per kilogram, estimated hours, average electrical power, energy rate and machine allowance per hour. Choose the currency label. These are your costs; the tool does not retrieve a utility tariff or convert currencies.",
    "Review the separate material, electricity and machine amounts, then download the JSON report. Keep the assumptions and compare them with actual material use and time after a trial print. Request a separate quote for work supplied by 3D3D.",
  ],
  sections: [
    {
      heading: "Understand the shell and infill approximation",
      paragraphs: [
        "The calculator approximates a shell volume by multiplying surface area by shell thickness, converting millimetres to centimetres and capping the result at the solid model volume. It fills the remaining volume at the entered infill fraction. This compact model helps compare assumptions, but it does not trace extrusion paths. Thin features, overlapping shell regions, top and bottom layers and actual infill patterns can behave differently in a slicer.",
        "For a 100 cubic centimetre model with 120 square centimetres of surface and a 1.2 millimetre shell, the shell estimate is 14.4 cubic centimetres. At twenty percent infill, the remaining 85.6 contributes 17.12, giving 31.52 cubic centimetres of plastic before waste. This example explains the calculation, not a guaranteed material requirement. Supports, purge structures and failed starts need their own considered allowance.",
      ],
    },
    {
      heading: "Calculate costs without confusing them with price",
      paragraphs: [
        "Estimated plastic volume is multiplied by the entered density and extra-material factor to obtain grams. Material cost then uses those grams and your price per kilogram. Use the actual filament specification where available, especially for filled or unusual blends. A generic density can be a reasonable trial input, but changing it without evidence can make a precise-looking result less useful rather than more accurate.",
        "Electricity is estimated from average watts multiplied by hours, divided by one thousand to obtain kilowatt-hours, then multiplied by your rate. A 100 watt average over four hours is 0.4 kilowatt-hours. The machine allowance is hours multiplied by your chosen hourly amount. These components do not automatically include design labour, handling, packaging, taxes, selling fees, overhead or profit, so their sum should not be presented as a complete business selling price.",
      ],
    },
    {
      heading: "Improve the estimate with observed work",
      paragraphs: [
        "Run a small representative job and compare the estimate with the slicer’s planned grams and time, then with the actual outcome. Record the printer, material, profile and relevant support settings. A consistent difference can reveal a poor assumption, while a single failed print may be a process issue rather than a useful new average. Keep those observations separate from the calculator’s mathematical output.",
        "The report retains inputs and limitations so another person can understand how the total was obtained. Do not share only a rounded amount without its assumptions. No printer connection, G-code parsing or live power measurement occurs here. For a manufactured part from 3D3D, use the quote form with the actual model and requirements; the service price depends on that review rather than the example numbers in this public calculator.",
      ],
    },
  ],
  comparison: [
    {
      name: "Prusa Price Calculator",
      detail: "Accepts manual or G-code time and weight, with labour inputs.",
      url: "https://blog.prusa3d.com/3d-printing-price-calculator_38905/",
    },
  ],
  faqs: [
    {
      q: "Is the result a 3D3D price?",
      a: "No. It uses your own assumptions and costs. Request a separate service quote for 3D3D to review the part and its requirements.",
    },
    {
      q: "Does this replace slicing?",
      a: "No. The shell-and-infill model is an approximation. Actual extrusion paths, supports and print time require the correct slicer profile and further checking.",
    },
    {
      q: "Can I use the model viewer’s volume?",
      a: "Yes, when it provides a suitable single-solid volume and area. Confirm the units and resolve mesh warnings before treating those values as reliable inputs.",
    },
    {
      q: "Does extra material include every failed print?",
      a: "It is a percentage you choose, not a prediction of failure. Base it on your process observations and account for unusual supports or purge needs deliberately.",
    },
    {
      q: "Is labour included in the total?",
      a: "There is no separate labour calculation here. The displayed components are material, electricity and your machine allowance; build a fuller costing record when setting a selling price.",
    },
    {
      q: "Does the currency option use an exchange rate?",
      a: "No. It labels your entered costs. Use consistent values in one currency and download the report so the assumptions remain attached to the estimate.",
    },
  ],
  service: { label: "Request an actual 3D3D printing quote", path: "/quote" },
} satisfies ToolGuide;
