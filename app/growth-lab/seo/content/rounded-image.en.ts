import type { ToolGuide } from "../guide";
export default {
  slug: "rounded-image",
  locale: "en",
  title: "Round Image Corners & Add Borders Free | 3D3D",
  description:
    "Make rounded PNG images and add an inset border locally. Keep transparent corners, batch up to 20 images and download without an account.",
  name: "Round Image Corners",
  headline: "Softer corners. A clean edge.",
  summary: "Round corners and add a border without changing the image dimensions.",
  answer:
    "Round image corners for free in your browser, with an optional coloured border and transparent PNG output. Nothing is uploaded. Adjust the radius, inspect the edge and download a new file at the original dimensions. Process several images together when you need a consistent shape for a presentation, shop or website.",
  steps: [
    "Drop your images into the tool and inspect the first preview. Crop to the intended composition before rounding if you need a square portrait or a particular aspect ratio. This operation changes the edge, not the canvas dimensions.",
    "Choose the corner radius as a percentage of the shorter side. Start with a modest value, then increase it while watching the preview. At fifty percent, a square becomes circular and a wide rectangle becomes a capsule.",
    "Set the border width and colour if an outline helps separate the image from its surroundings. The border is drawn inside the clipped shape. Check that it does not obscure small text, a face or another detail near the edge.",
    "Process the batch and download the PNG results. Place a sample on the actual background where it will be used. Transparent corners look different against a white slide, a coloured section and a patterned page.",
  ],
  sections: [
    {
      heading: "Choose the shape before the decoration",
      paragraphs: [
        "Rounding a rectangular photograph does not make it square. If you need a circular avatar, first crop a square around the subject, leaving enough room above the head and around the sides. Then use the maximum radius. Starting with a long rectangle and increasing the radius produces rounded ends, which can be useful for a label but is a different composition from a circular portrait.",
        "A consistent radius can make a group of images feel related, but consistency does not mean every source should receive the same crop. Inspect each result in a batch. A subject close to a corner may be clipped even when another image looks excellent with the same settings. Keep the original photographs so you can reconsider the composition without repeatedly editing an already clipped result.",
      ],
    },
    {
      heading: "Keep transparency through the next step",
      paragraphs: [
        "The output is PNG because the rounded corners need transparent pixels. A checkerboard in an editor is usually a way to display transparency, not a pattern added to the file. Check the downloaded image against the destination background. If another application converts it to JPEG, those corners need a solid background colour and will no longer remain transparent.",
        "The canvas stays the same size as the source. A 1200 by 800 pixel image remains 1200 by 800 pixels, including the transparent corner areas. This is useful when a slide or layout already expects those dimensions. If the destination has a strict byte limit, measure the PNG rather than assuming that removing visible corners makes the file substantially smaller.",
      ],
    },
    {
      heading: "Decide between an edited file and a web style",
      paragraphs: [
        "For a downloadable asset, presentation or message attachment, a rounded PNG carries its shape with it. For a website that you maintain, CSS border-radius may be a better choice because the original image remains available and the appearance can change with the layout. Choose based on where the image will live, rather than producing several permanently clipped copies without a reason.",
        "A border is useful when an image blends into its background, but it is not a repair for low resolution or poor contrast within the picture. Inspect the smallest intended display size and keep the line restrained. When a logo or product silhouette already contains a clear edge, extra decoration may reduce clarity. Download a plain version as well if the surrounding design is still undecided.",
      ],
    },
  ],
  comparison: [
    {
      name: "CSS border-radius",
      detail: "Rounds an element’s border in a web layout.",
      url: "https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/border-radius",
    },
  ],
  faqs: [
    {
      q: "Can I make a circular image?",
      a: "Yes. Start with a square image and set the radius to fifty percent. Crop a rectangular source first if you want a circle rather than a capsule.",
    },
    {
      q: "Why is the download a PNG?",
      a: "PNG supports transparent corners. JPEG needs an opaque rectangular background, so it cannot preserve the same transparent cutout without flattening it.",
    },
    {
      q: "Does the border add extra pixels outside the image?",
      a: "No. The border sits inside the clipped shape, and the result retains the original canvas dimensions. A thick border may cover content near the edge.",
    },
    {
      q: "Can I round a batch of images?",
      a: "Yes. The selected radius and border apply to each image. Review every composition because matching settings can clip different subjects differently.",
    },
    {
      q: "Are my original files overwritten?",
      a: "No. The browser downloads new results. Keep the source files if you may need different corners, a new crop or an unmodified version later.",
    },
    {
      q: "Will transparent corners work everywhere?",
      a: "They work where the destination preserves PNG transparency. Some publishing or messaging workflows flatten images; inspect the final presentation after importing or publishing.",
    },
  ],
  service: { label: "Plan a website with 3D3D", path: "/software-development" },
} satisfies ToolGuide;
