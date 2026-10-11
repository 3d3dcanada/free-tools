import type { ToolGuide } from "../guide";
export default {
  slug: "model-viewer",
  locale: "en",
  title: "Free STL, OBJ & 3MF Viewer with Measurements | 3D3D",
  description:
    "Inspect a 3D model locally: dimensions, triangles, mesh warnings and a printer-box fit check. Download measurements without uploading your file.",
  name: "STL, OBJ and 3MF Viewer",
  headline: "Know the geometry before the print.",
  summary: "Inspect a mesh, check its scale and keep a measurement report.",
  answer:
    "View STL, OBJ and supported 3MF geometry for free without uploading the model. Inspect dimensions, triangle count, surface area and mesh warnings, then compare the bounding box with a printer’s build volume. Volume is reported only for a suitable single closed shell. These checks help preparation but do not certify printability, strength or collision-free placement.",
  steps: [
    "Open a model within the displayed size and triangle limits, or try the sample cube. Check the unit interpretation for STL and OBJ. Supported 3MF units and build transforms are read from the package rather than guessed from its filename.",
    "Inspect the three dimensions and compare them with a known feature or intended overall size. Orbit the view to understand the shape, but remember that camera movement changes your view, not the model’s physical orientation for the fit calculation.",
    "Read the mesh warnings and volume status. Choose a listed printer or enter a custom build volume, then set the edge margin. Review the current box fit and any axis-aligned alternative as a preliminary check before using a slicer.",
    "Download a measurement report or a picture of the view. Keep the source model and confirm scale, orientation, supports and printable geometry in your actual slicer. Use the quote link if you want 3D3D to assess a manufacturing request.",
  ],
  sections: [
    {
      heading: "Confirm scale before trusting a measurement",
      paragraphs: [
        "A shape can look plausible on screen at almost any size because the camera frames it automatically. STL and OBJ geometry do not supply an unambiguous physical-unit definition in this workflow. Choose the intended unit and compare a known dimension. An inch-based model interpreted as millimetres will be much smaller than intended, even if its proportions and triangle count appear correct.",
        "Length, area and volume respond differently to a unit scale change. Multiplying a length by 25.4 multiplies area by 25.4 squared and volume by 25.4 cubed. That is why a wrong unit can produce a dramatically wrong material estimate. Resolve scale first, then use any derived volume or surface area. Do not compensate for an implausible mass by changing density while leaving the model’s scale unverified.",
      ],
    },
    {
      heading: "Read mesh warnings as evidence with limits",
      paragraphs: [
        "The analysis checks triangle connectivity, edge use, orientation consistency and vertex relationships within its stated numerical tolerance. An open edge or non-manifold connection is useful evidence that the mesh deserves attention. A closed result is more limited: it does not establish the absence of self-intersections, overlapping bodies, thin walls or mechanically weak features. A visually smooth shape can still require repair or redesign.",
        "Volume is withheld for an open or unsuitable mesh and for multiple shells whose overlap or nesting would make a simple total ambiguous. An unavailable value is not zero. Export a clean single solid when you need a volume-based estimate, and verify it in your design or slicing workflow. The viewer does not perform a Boolean union, reconstruct missing surfaces or silently turn a collection of parts into one certified solid.",
      ],
    },
    {
      heading: "Treat the printer comparison as an early screen",
      paragraphs: [
        "The fit check compares the model’s bounding dimensions with the selected build box, subtracting the chosen margin on the horizontal axes. It also tries the six axis-aligned dimension permutations. It does not search every possible diagonal placement or arrange several models together. Brims, supports, toolhead clearance and excluded bed regions can require more room than the bare geometry. Confirm the actual placement in the correct printer profile.",
        "This viewer handles geometry rather than a complete slicer project. Paint, textures, material assignments and specialised 3MF extensions may not be reproduced; unsupported required features are refused. Files are limited to 20 MB and 150,000 triangles to keep the browser workload bounded. Simplify a suitable working copy when necessary, retain the detailed master and remember that successful import is not physical verification of a printed part.",
      ],
    },
  ],
  comparison: [
    {
      name: "Online 3D Viewer",
      detail: "Open-source browser viewer with a broader format list.",
      url: "https://github.com/kovacsv/Online3DViewer",
    },
  ],
  faqs: [
    {
      q: "Does the model leave my device?",
      a: "No. Import, measurement and rendering happen locally. The viewer’s static code loads when needed, without sending the model to a server.",
    },
    {
      q: "Why is the model the wrong size?",
      a: "Check the STL or OBJ unit interpretation against a known dimension. The camera automatically framing a shape does not establish its physical scale.",
    },
    {
      q: "Why is volume unavailable?",
      a: "The mesh may be open, unsuitable or contain multiple shells. The tool withholds an ambiguous value rather than presenting it as a reliable solid volume or zero.",
    },
    {
      q: "Does a closed mesh guarantee a good print?",
      a: "No. Self-intersections, strength, supports, wall thickness and machine behaviour require additional checks. Treat the report as preparation evidence, not a printability certificate.",
    },
    {
      q: "Does rotating the view test a new print orientation?",
      a: "No. Camera orbit only changes the view. The fit calculation tests the measured box and six axis-aligned arrangements, not arbitrary rotations.",
    },
    {
      q: "Can I keep the measurements?",
      a: "Download the JSON report with dimensions and warnings, and optionally a PNG view. Keep the source model and identify its revision when sharing the report.",
    },
  ],
  service: { label: "Ask 3D3D to quote your part", path: "/quote" },
  sources: [{ label: "3MF Consortium: format specification", url: "https://3mf.io/spec/" }],
} satisfies ToolGuide;
