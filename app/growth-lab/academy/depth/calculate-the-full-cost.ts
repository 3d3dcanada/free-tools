import type { ReadingSection } from "../types";
export default [
  {
    title: "Define what the cost sheet includes",
    paragraphs: [
      "Begin with a named job and a clear boundary. Are you estimating one cleaned part, a packed order or a small batch including failed attempts? Put material, active labour, machine time, power, packaging and other relevant costs on separate rows. Record the source and units of each input. Keep unknowns blank and explain them. A calculator can add numbers correctly while the cost model remains incomplete. The exercise is about making those assumptions visible, not finding a universal selling price or revealing 3D3D's own commercial rates.",
      "Avoid counting the same expense twice. If your machine-hour allowance already includes electricity, adding a separate power row would duplicate that element unless you deliberately change the allowance. Likewise, distinguish active labour from elapsed machine time. Ten minutes spent preparing and packing a two-hour print is not automatically two hours and ten minutes of hands-on labour. It is also not free simply because the owner performs it. Record the work honestly, then make the separate business decision about how that cost is recovered in a price.",
    ],
    sources: ["cost", "calculator"],
  },
  {
    title: "Calculate units explicitly",
    paragraphs: [
      "Material cost equals consumed grams multiplied by spool price divided by usable spool grams. Use the amount relevant to your chosen boundary, including supports or waste where applicable. The cleaned part's mass may omit material consumed by preparation and failed work. The teaching example uses 100 grams from a 1,000 gram spool priced at CAD 25, giving CAD 2.50. Those are invented exercise inputs. Your actual spool invoice and measured or clearly estimated use belong in your own sheet, and a missing consumption value must not silently become zero.",
      "Power uses energy, not the power-supply label alone. As a separate fictional arithmetic example, an average 120 watts for two hours is 0.24 kilowatt-hours; at an assumed CAD 0.20 per kilowatt-hour, that is CAD 0.048 before rounding for display. An actual meter reading would be stronger evidence than an assumed average. Do not call the printer's maximum rated wattage its measured average consumption. Labour similarly needs a time conversion: ten minutes is one sixth of an hour, so at CAD 24 per hour it costs CAD 4.",
    ],
    sources: ["cost", "calculator"],
  },
  {
    title: "Keep markup, margin and fees distinct",
    paragraphs: [
      "The lesson's fictional subtotal combines CAD 2.50 material, CAD 4 labour, CAD 1 machine time, CAD 0.10 power and CAD 1.25 packaging, for CAD 8.85. Shipping, marketplace fees, taxes and profit are not included. A 20 percent markup on that subtotal adds CAD 1.77 and gives CAD 10.62 before those missing items. A 20 percent revenue margin is different: before fees, cost divided by 0.80 gives CAD 11.0625. Round only at the appropriate stage of your actual document and keep the unrounded reasoning available.",
      "Marketplace charges can depend on the transaction, country, currency, payment method and optional services. Check the current official fee policy for the exact scenario rather than embedding one remembered percentage as the whole cost. If an illustrative fee is a fraction f of the same selling-price base and your target margin is m, a simplified price relation is cost divided by one minus f minus m, provided the denominator is positive. That algebra omits fixed fees, different fee bases and taxes. It is a teaching model, not an Etsy quote or accounting instruction.",
    ],
    sources: ["fees", "cost", "calculator"],
  },
  {
    title: "Use measured batches to improve the estimate",
    paragraphs: [
      "A first cost sheet contains assumptions. Replace them with observations as you prepare, print, inspect and pack real samples. Keep failed work in the record rather than dividing only the best sample's material by its mass. If three attempts produce two acceptable parts, the consumed resources belong to the trial even though only two outputs are usable. A tiny batch does not establish a dependable long-term failure rate, but it can expose omitted cleanup labour or packaging work. Use that evidence to plan the next bounded trial.",
      "Finish by listing the remaining unknowns and the decision the estimate can support. The public cost calculator helps organize your own printing inputs and labels its model-based material result as an estimate. It does not slice the part or produce a 3D3D service quote. Keep tax treatment and business obligations subject to the applicable rules and appropriate advice. A complete exercise result is a transparent subtotal with stated exclusions and arithmetic, not a confident selling price assembled from missing data and an attractive margin percentage.",
    ],
    sources: ["cost", "calculator", "fees"],
  },
] satisfies ReadingSection[];
