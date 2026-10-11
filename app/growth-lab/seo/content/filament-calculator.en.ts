import type { ToolGuide } from "../guide";
export default {
  slug: "filament-calculator",
  locale: "en",
  title: "Filament Length, Weight & Cost Calculator | 3D3D",
  description:
    "Convert filament metres to grams or grams to metres using diameter and density. Estimate material cost with your own price and download a local report.",
  name: "Filament Calculator",
  headline: "From metres to grams to your cost.",
  summary: "Relate filament length and mass using the actual diameter and density.",
  answer:
    "Convert filament length to weight, or weight to length, for free without uploading anything. Enter the filament diameter, material density and price per kilogram to estimate grams, metres and material cost. The calculation treats filament as a uniform cylinder. Use measured or manufacturer values and keep a reserve rather than assuming a spool contains exactly the predicted usable length.",
  steps: [
    "Choose whether the known quantity is length or weight. Enter metres in length mode or grams in weight mode. If weighing a partly used spool, subtract the empty spool mass before entering the filament mass.",
    "Enter the nominal or measured filament diameter and the density appropriate to that material. Check the units: diameter is in millimetres and density is in grams per cubic centimetre. The example values are editable assumptions, not a universal filament specification.",
    "Add your material price per kilogram and select its currency label. Review the converted length or mass and the resulting material cost. Keep other job costs separate, since electricity, machine time and labour are outside this calculation.",
    "Download the JSON report with its inputs. Compare the estimate with actual spool use over several jobs and allow enough reserve for loading, purge and waste. Use the print-cost calculator when you also need time and energy components.",
  ],
  sections: [
    {
      heading: "Understand the cylinder calculation",
      paragraphs: [
        "Filament cross-section is calculated as pi multiplied by half the diameter squared. Multiplying that area by length gives volume; multiplying volume by density gives mass. With diameter in millimetres and length in metres, the numerical area-times-length result is cubic centimetres. The conversion then reverses the same relationship when grams are known and metres are the quantity you want to estimate.",
        "For the example inputs of 100 metres, 1.75 millimetres and 1.24 grams per cubic centimetre, the estimated mass is about 298.25 grams. At 25 currency units per kilogram, that material costs about 7.46. These are consequences of the entered numbers, not a claim that every spool labelled with a particular polymer has that density or usable length. Retain the assumptions when comparing estimates.",
      ],
    },
    {
      heading: "Measure the right mass and diameter",
      paragraphs: [
        "A scale reading for a spool includes the holder as well as the filament. Subtract a known empty-spool mass for the same spool type before estimating remaining material. If that tare mass is unknown, the resulting filament estimate is uncertain too. Do not treat a precise display on the scale as proof that the amount of plastic has been isolated correctly.",
        "Diameter matters because it is squared in the area calculation. A small diameter difference changes the estimated mass per metre, and an uneven strand is not exactly the uniform cylinder used here. Use appropriate measurements or the supplier’s information rather than adjusting density to disguise a diameter mismatch. Filled materials and different blends can have different densities even when their labels share a broad material family.",
      ],
    },
    {
      heading: "Use the result for planning, with a reserve",
      paragraphs: [
        "A length estimate can help compare what a job is expected to consume with what remains on a spool. It does not predict loading losses, purge, support waste or a failed start. Leave a reserve based on your process instead of scheduling a critical long print to consume the last calculated metre. Check the slicer’s material estimate and your printer’s handling of filament runout before relying on a near-empty spool.",
        "The cost result covers the entered plastic mass at your own price. It is not a full print cost or a selling price, and no 3D3D service rate is embedded. Use consistent units when comparing spool offers: a spool’s advertised weight may describe filament only, while shipping weight includes packaging. Record what your price and mass represent, then keep the report with the job assumptions if someone else will review the estimate.",
      ],
    },
  ],
  comparison: [
    {
      name: "Prusa Price Calculator",
      detail: "Calculates job costs from entered filament weight and price.",
      url: "https://blog.prusa3d.com/3d-printing-price-calculator_38905/",
    },
  ],
  faqs: [
    {
      q: "Can I convert grams back into metres?",
      a: "Yes. Select weight mode and enter the filament mass. The result uses the chosen diameter and density, so those assumptions still need to be correct.",
    },
    {
      q: "Should I include the empty spool’s weight?",
      a: "No. Enter the mass of filament itself. Subtract a known tare for the same spool type, and acknowledge uncertainty when that value is not known.",
    },
    {
      q: "Is the default density correct for every PLA?",
      a: "No universal material claim is made. Use the actual supplier specification or appropriate measurement, particularly for filled or unusual blends.",
    },
    {
      q: "Why does diameter change the result so much?",
      a: "Cross-sectional area depends on diameter squared. Changing the diameter changes the volume, and therefore mass, represented by each metre of filament.",
    },
    {
      q: "Does the estimate include purge and supports?",
      a: "Only if the length or mass you enter already includes them. The calculator does not inspect a sliced job or add a separate waste allowance.",
    },
    {
      q: "Is this the price of a 3D3D print?",
      a: "No. It is your material cost from your inputs. Use the quote form for 3D3D services or the broader cost calculator for additional planning components.",
    },
  ],
  service: { label: "Get a quote for a 3D3D print", path: "/quote" },
} satisfies ToolGuide;
