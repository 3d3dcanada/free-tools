export const printingModes = {
  "model-viewer": ["STL, 3MF and OBJ Viewer", "Know your model before you print."],
  "print-cost-calculator": ["3D Print Cost Calculator", "Put a number on your own print."],
  "filament-calculator": ["Filament Calculator", "From metres to grams to cost."],
  "tolerance-calculator": ["FDM Fit Calculator", "Leave room for a real fit."],
  "unit-converter": ["3D Printing Unit Converter", "Keep your dimensions straight."],
  "nozzle-layer-guide": ["Nozzle and Layer Height Guide", "Choose a useful layer height."],
} as const;
export type PrintingMode = keyof typeof printingModes;
/**
 * Build volumes in mm (X, Y, Z), read from each maker's page on 9 October 2026.
 * The H2D figure is its single-nozzle volume. The last entry is the visitor's own.
 */
export const printers: { name: string; size: number[]; source: string }[] = [
  { name: "Prusa CORE One L", size: [300, 300, 330], source: "https://www.prusa3d.com/product/prusa-core-one-l/" },
  { name: "Prusa CORE One", size: [250, 220, 270], source: "https://www.prusa3d.com/product/prusa-core-one/" },
  {
    name: "Prusa MK4S",
    size: [250, 210, 220],
    source: "https://www.prusa3d.com/product/original-prusa-mk4s-3d-printer-7/",
  },
  { name: "Bambu Lab A1", size: [256, 256, 256], source: "https://bambulab.com/en/a1/tech-specs" },
  { name: "Bambu Lab A1 mini", size: [180, 180, 180], source: "https://bambulab.com/en/a1-mini/tech-specs" },
  { name: "Bambu Lab H2D", size: [325, 320, 325], source: "https://bambulab.com/en/h2d/tech-specs" },
  { name: "Anycubic Kobra X", size: [260, 260, 260], source: "https://store.anycubic.com/products/kobra-x" },
  { name: "Custom printer", size: [220, 220, 250], source: "" },
];
export const guideSource = "https://help.prusa3d.com/article/layers-and-perimeters_1748";
export const fitSource = "https://help.prusa3d.com/article/modeling-with-3d-printing-in-mind_164135";
export function number(text: string, label: string, min = 0, max = 1e9) {
  if (!/^(?:\d+(?:\.\d*)?|\.\d+)$/.test(text.trim())) throw new Error(`Enter a number for ${label}.`);
  const value = Number(text);
  if (!Number.isFinite(value) || value < min || value > max)
    throw new Error(`${label} must be between ${min} and ${max}.`);
  return value;
}
export const defaults = {
  volume: "100",
  area: "120",
  wall: "1.2",
  infill: "20",
  density: "1.24",
  waste: "10",
  price: "25",
  hours: "4",
  watts: "100",
  kwh: "0.15",
  wear: "0",
  currency: "CAD",
  filamentMode: "length",
  length: "100",
  grams: "250",
  diameter: "1.75",
  shaft: "10",
  fit: "slide",
  clearance: "0.2",
  uncertainty: "0.1",
  category: "length",
  from: "mm",
  to: "in",
  amount: "25.4",
  nozzle: "0.4",
  layer: "0.2",
};
export type Settings = typeof defaults;
export function validSettings(value: unknown): value is Settings {
  if (!value || typeof value !== "object") return false;
  const v = value as Settings;
  return (
    Object.keys(defaults).every(
      (k) => typeof v[k as keyof Settings] === "string" && v[k as keyof Settings].length <= 40,
    ) &&
    ["CAD", "USD", "EUR", "GBP"].includes(v.currency) &&
    ["length", "weight"].includes(v.filamentMode) &&
    ["press", "slide", "clearance", "custom"].includes(v.fit) &&
    Object.hasOwn(units, v.category) &&
    Object.hasOwn(units[v.category], v.from) &&
    Object.hasOwn(units[v.category], v.to)
  );
}
export function printCost(s: Settings) {
  const volume = number(s.volume, "volume (cm³)", 0.000001, 1e6),
    area = number(s.area, "surface area (cm²)", 0.000001, 1e7),
    wall = number(s.wall, "shell thickness (mm)", 0, 100),
    infill = number(s.infill, "infill", 0, 100) / 100,
    density = number(s.density, "density", 0.01, 30),
    waste = number(s.waste, "extra material", 0, 1000) / 100;
  const shellCm3 = Math.min(volume, (area * wall) / 10),
    plasticCm3 = shellCm3 + (volume - shellCm3) * infill,
    grams = plasticCm3 * density * (1 + waste),
    material = (grams / 1000) * number(s.price, "price per kg", 0, 1e6),
    hours = number(s.hours, "print time", 0, 1e5),
    energyKwh = (hours * number(s.watts, "average watts", 0, 1e6)) / 1000,
    electricity = energyKwh * number(s.kwh, "electricity rate", 0, 1e5),
    wear = hours * number(s.wear, "machine cost per hour", 0, 1e5);
  return {
    estimate: true,
    currency: s.currency,
    shellCm3,
    plasticCm3,
    grams,
    material,
    energyKwh,
    electricity,
    wear,
    total: material + electricity + wear,
  };
}
export function filament(s: Settings) {
  const area = Math.PI * (number(s.diameter, "filament diameter", 0.1, 10) / 2) ** 2,
    density = number(s.density, "density", 0.01, 30),
    grams =
      s.filamentMode === "length"
        ? number(s.length, "length", 0, 1e6) * area * density
        : number(s.grams, "weight", 0, 1e8);
  return {
    grams,
    metres: grams / (area * density),
    cost: (grams / 1000) * number(s.price, "price per kg", 0, 1e6),
    currency: s.currency,
  };
}
export function fit(s: Settings) {
  const shaft = number(s.shaft, "shaft diameter", 0.01, 10000),
    uncertainty = number(s.uncertainty, "uncertainty per part", 0, 10);
  if (!/^-?(?:\d+(?:\.\d*)?|\.\d+)$/.test(s.clearance))
    throw new Error("Enter the signed diametral clearance.");
  const clearance = Number(s.clearance),
    hole = shaft + clearance;
  if (Math.abs(clearance) > 10 || hole <= uncertainty || shaft <= uncertainty)
    throw new Error("Check clearance and uncertainty: both part diameters must remain positive.");
  return {
    shaft,
    hole,
    clearance,
    radialGap: clearance / 2,
    minimumClearance: clearance - 2 * uncertainty,
    maximumClearance: clearance + 2 * uncertainty,
  };
}
export const units: Record<string, Record<string, number>> = {
  length: { mm: 1, cm: 10, m: 1000, in: 25.4, ft: 304.8 },
  volume: { "mm³": 1, "cm³": 1000, mL: 1000, L: 1e6, "in³": 25.4 ** 3 },
  mass: { mg: 0.001, g: 1, kg: 1000, oz: 28.349523125, lb: 453.59237 },
  time: { seconds: 1, minutes: 60, hours: 3600 },
};
export function convert(s: Settings) {
  if (!units[s.category]?.[s.from] || !units[s.category]?.[s.to]) throw new Error("Select compatible units.");
  return {
    input: number(s.amount, "amount", 0, 1e15),
    from: s.from,
    to: s.to,
    value: (number(s.amount, "amount", 0, 1e15) * units[s.category][s.from]) / units[s.category][s.to],
  };
}
export function layers(s: Settings) {
  const nozzle = number(s.nozzle, "nozzle diameter", 0.1, 2),
    layer = number(s.layer, "layer height", 0.01, 2);
  return {
    nozzle,
    layer,
    ratio: layer / nozzle,
    upperBoundary: nozzle * 0.8,
    fineExample: nozzle * 0.25,
    balancedExample: nozzle * 0.5,
    coarseExample: nozzle * 0.75,
    belowBoundary: layer < nozzle * 0.8,
  };
}
export function printerFit(size: number[], bed: number[], margin: number) {
  if ([...size, ...bed, margin].some((n) => !Number.isFinite(n) || n < 0) || bed.some((n) => n <= 2 * margin))
    throw new Error("Enter a usable build volume and edge margin.");
  const check = (s: number[]) => s.every((n, i) => n <= bed[i] - (i < 2 ? 2 * margin : 0));
  const permutations = [
    [0, 1, 2],
    [1, 0, 2],
    [0, 2, 1],
    [2, 0, 1],
    [1, 2, 0],
    [2, 1, 0],
  ];
  return {
    current: check(size),
    rotation: permutations.map((p) => p.map((i) => size[i])).find(check) ?? null,
  };
}
/** every length can read in inches. French uses po and pi for inches and feet. */
export type System = "metric" | "imperial";
export function measure(locale: "en" | "fr", system: System) {
  const fr = locale === "fr",
    imperial = system === "imperial";
  const n = (value: number, digits: number, min = 0) =>
    value.toLocaleString(fr ? "fr-CA" : "en-CA", { maximumFractionDigits: digits, minimumFractionDigits: min });
  const inch = fr ? "po" : "in";
  return {
    imperial,
    n,
    /** The unit for typed lengths. */
    lengthUnit: imperial ? inch : "mm",
    length: (mm: number, digits = imperial ? 3 : 2) =>
      imperial ? `${n(mm / 25.4, digits, digits)} ${inch}` : `${n(mm, digits, digits)} mm`,
    lengthNumber: (mm: number, digits = imperial ? 3 : 2) => n(imperial ? mm / 25.4 : mm, digits, digits),
    volume: (mm3: number) => (imperial ? `${n(mm3 / 16387.064, 3)} ${inch}³` : `${n(mm3 / 1000, 2)} cm³`),
    area: (mm2: number) => (imperial ? `${n(mm2 / 645.16, 2)} ${inch}²` : `${n(mm2 / 100, 2)} cm²`),
    mass: (g: number) => (imperial ? `${n(g / 28.349523125, 2)} oz` : `${n(g, 1)} g`),
    long: (m: number) => (imperial ? `${n(m / 0.3048, 1)} ${fr ? "pi" : "ft"}` : `${n(m, 2)} m`),
  };
}
