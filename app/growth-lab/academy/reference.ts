export const glossary = [
  [
    "Adhesion",
    "How well the first layer stays attached to the build surface. Material, surface preparation and the initial layer all matter.",
    "adhesion",
  ],
  [
    "ASA",
    "A filament family used for applications such as outdoor parts. Check the specific grade, printer requirements and emissions controls.",
    "asa",
  ],
  [
    "Baseline",
    "A known, saved setup used as the reference for a controlled change. It is not a universal best setting.",
    "teaching",
  ],
  [
    "Bridge",
    "A printed span between supported regions. Its result depends on the geometry and printing conditions.",
    "bridge",
  ],
  [
    "Build plate",
    "The surface assembly the first layer attaches to. Use the removal and cleaning method approved for its surface.",
    "sheets",
  ],
  [
    "CF blend",
    "A polymer containing carbon fibre filler. The base polymer still matters; abrasive blends can require wear-resistant hardware.",
    "cf",
  ],
  [
    "Extrusion multiplier",
    "A slicer adjustment to the requested extrusion amount. Tune it only after the physical setup and baseline are sound.",
    "flow",
  ],
  [
    "FFF / FDM",
    "Common names for filament printing, where a machine deposits softened material along successive layer paths.",
    "safety",
  ],
  [
    "G-code",
    "Machine instructions produced for a particular setup. A file from another printer is not automatically safe to run on yours.",
    "viewer",
  ],
  [
    "Infill",
    "The interior pattern between walls. It supports printing and affects the part, but its percentage is not a load rating.",
    "infill",
  ],
  [
    "Layer height",
    "The thickness of each slice in the vertical direction. It affects visible stepping and the number of layers.",
    "layers",
  ],
  [
    "Mesh",
    "A surface representation of a shape, commonly exchanged as an STL file for slicing. Inspect size and geometry after import.",
    "files",
  ],
  [
    "Overhang",
    "A region that extends beyond the material below it. Orientation, geometry or supports may need attention.",
    "supports",
  ],
  [
    "PETG",
    "A filament family often useful for practical parts. Suitability still depends on the grade, job, process and testing.",
    "petg",
  ],
  [
    "PLA",
    "A common filament for learning and prototypes in this course. The 3D3D house policy is a business choice, not a universal ban on PLA products.",
    "pla",
  ],
  [
    "Retraction",
    "A controlled filament movement used during travel to reduce unwanted extrusion. Use the correct procedure for the extruder.",
    "string",
  ],
  [
    "Slicer",
    "Software that prepares model geometry and settings as a sequence of printable paths.",
    "slicer",
  ],
  [
    "Support",
    "Temporary printed structure under features that cannot be built adequately on their own. Removal can mark the contact surface.",
    "supports",
  ],
  [
    "Tolerance",
    "The allowed variation from a specified dimension. Decide what matters for the use before judging the part.",
    "design",
  ],
  [
    "TPU",
    "A flexible filament family. Feed path, material grade and print settings affect how it handles.",
    "tpu",
  ],
  [
    "Wall / perimeter",
    "A path around the boundary of a layer. Walls form the outside of the printed shape.",
    "infill",
  ],
  [
    "Warping",
    "A shape change in which regions such as corners lift or distort. Diagnose material, geometry and environmental factors together.",
    "warp",
  ],
] as const;
export const symptoms = [
  {
    name: "Electrical smell, smoke or unsafe motion",
    advice:
      "Stop using the equipment and follow the manufacturer’s stop procedure and your local emergency plan. Do not troubleshoot by reaching into moving or hot equipment. Get qualified help before returning damaged equipment to use.",
    slugs: ["prepare-a-safe-workspace"],
  },
  {
    name: "The first layer will not stay down",
    advice:
      "Stop the failed job. Check the correct plate/material pairing, approved cleaning method and first-layer setup. Change one thing before a small retry.",
    slugs: ["first-layer-not-sticking", "prepare-the-build-surface"],
  },
  {
    name: "Fine strings join separate features",
    advice:
      "Compare material condition, temperature and travel behaviour against the baseline. Use a supported retraction procedure after the basic checks.",
    slugs: ["strings-between-features", "retraction-and-travel"],
  },
  {
    name: "Corners lift during the print",
    advice:
      "Check when lifting began, the material, geometry and surrounding conditions. An enclosure is not a substitute for suitable emissions control.",
    slugs: ["corners-lifting", "asa-and-the-workspace"],
  },
  {
    name: "There are gaps or missing material",
    advice:
      "Inspect the feed path and compatible profile before changing flow. Stop and cool as the maker directs before any physical inspection.",
    slugs: ["missing-material", "understand-flow-calibration"],
  },
  {
    name: "A layer suddenly shifts sideways",
    advice:
      "Record the direction and height of the shift. With the machine safely stopped, follow its mechanical inspection procedure before changing software.",
    slugs: ["layers-shift-sideways", "maintain-the-baseline"],
  },
  {
    name: "An overhang sags or support marks remain",
    advice:
      "Review the intended load direction and the sliced paths. Compare orientation and supported contact settings on a small sample.",
    slugs: ["bridges-and-overhangs", "place-supports-deliberately", "remove-supports-safely"],
  },
] as const;
