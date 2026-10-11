import type { ToolGuide } from "../guide";
export default {
  slug: "unit-converter",
  locale: "en",
  title: "3D Printing Unit Converter, Free & Local | 3D3D",
  description:
    "Convert length, volume, mass and time with explicit units. Check inch-to-mm scale, cubic measures and filament mass, then save a free local report.",
  name: "3D Printing Unit Converter",
  headline: "Keep the number and its unit together.",
  summary: "Convert compatible quantities without confusing length, volume and mass.",
  answer:
    "Convert length, volume, mass and time for free in your browser without uploading data. Choose a quantity category, source unit, destination unit and non-negative value, then review the result or download a report. Categories stay separate: cubic millimetres cannot become grams without density, and an inch-to-millimetre length factor cannot be used unchanged for volume.",
  steps: [
    "Identify the kind of quantity you have: a length, volume, mass or duration. Read the unit from the original drawing, material record or time estimate. Do not infer it only from whether the number looks plausible.",
    "Choose the matching category and select the source and destination units. Enter the numeric value without the unit in the number field. The converter accepts non-negative decimal values and keeps incompatible dimensions out of the same conversion.",
    "Check the result against a familiar reference. One inch is 25.4 millimetres, one kilogram is 1000 grams and one hour is 60 minutes. A quick scale check can catch an accidentally reversed conversion before it reaches a model or estimate.",
    "Download the report if the conversion belongs in a project record. Carry the destination unit with the value when entering it elsewhere. Verify a known model dimension again after import rather than assuming a copied number establishes the entire file’s scale.",
  ],
  sections: [
    {
      heading: "Keep dimensions in their own categories",
      paragraphs: [
        "Length describes one-dimensional extent, while volume describes three-dimensional space. Converting between millimetres and centimetres changes a length by ten, but converting cubic millimetres to cubic centimetres changes a volume by one thousand. The category selector makes that distinction explicit. It prevents a common shortcut in which a familiar length factor is applied to an area or volume without accounting for its power.",
        "Mass and volume are also different quantities. A model’s cubic centimetres do not directly tell you its grams until a material density and an appropriate solid or infill model are supplied. Use the filament or print-cost calculators for those additional assumptions. This converter does not guess a polymer from a filename or treat one millilitre of every material as though it had the same mass.",
      ],
    },
    {
      heading: "Check scale when files cross workflows",
      paragraphs: [
        "A design described in inches may be opened by another tool with a millimetre assumption. A known dimension is the most useful check: a one-inch feature should measure 25.4 millimetres in the converted interpretation. The visual preview alone is weak evidence because viewers often zoom to fit any model. Compare the measured value with a drawing or physical reference before estimating material or preparing a print.",
        "For volume, one cubic inch is 16.387064 cubic centimetres. That follows from cubing the length relationship and converting the cubic units, not simply multiplying by 2.54 once. If a model is uniformly scaled, its area changes with the square of the scale and its volume with the cube. The converter handles the listed volume units, while an actual geometry rescale still belongs in the modelling or slicing workflow.",
      ],
    },
    {
      heading: "Preserve meaning and useful precision",
      paragraphs: [
        "A converted value can display more digits than the original measurement justified. Those extra digits describe the arithmetic, not a more accurate caliper, scale or clock. Keep the original measurement and its uncertainty when tolerances matter. Round deliberately for the receiving drawing or record, and avoid rounding repeatedly through several intermediate units when one direct conversion would be clearer.",
        "The time category converts durations such as seconds, minutes and hours. It does not schedule a calendar event, interpret time zones or account for a printer pausing overnight. Similarly, ounces and pounds here are mass units, not fluid measures or forces. Read the category and both unit labels in the downloaded report. Keeping that context with the number is often more valuable than copying a long decimal result alone.",
      ],
    },
  ],
  comparison: [
    {
      name: "NIST SI conversion reference",
      detail: "Publishes reference conversion factors rather than a print workflow.",
      url: "https://www.nist.gov/pml/special-publication-811/nist-guide-si-appendix-b-conversion-factors/nist-guide-si-appendix-b8",
    },
  ],
  faqs: [
    {
      q: "Can I convert millimetres to grams?",
      a: "No direct conversion exists. Length, volume and mass are separate dimensions. A mass estimate needs geometry and a material density, not just a length unit.",
    },
    {
      q: "How many millimetres are in one inch?",
      a: "One international inch is exactly 25.4 millimetres. Check a known feature with that relationship when a model may have been imported in the wrong units.",
    },
    {
      q: "Is one cubic centimetre the same volume as one millilitre?",
      a: "Yes. They represent the same volume in this converter. That does not mean either volume always has a mass of one gram.",
    },
    {
      q: "Are ounces here fluid ounces?",
      a: "No. The mass category uses avoirdupois ounces and pounds. Fluid-volume and force units are not included in that category.",
    },
    {
      q: "Does the time conversion handle dates?",
      a: "It converts durations only. Calendar dates, time zones, pauses and scheduling are outside this tool’s calculation.",
    },
    {
      q: "Do extra decimals mean a more accurate measurement?",
      a: "No. They come from the arithmetic. Preserve the precision and uncertainty of the source measurement when deciding how many digits to use.",
    },
  ],
  service: { label: "Discuss dimensions for a 3D3D part", path: "/quote" },
} satisfies ToolGuide;
