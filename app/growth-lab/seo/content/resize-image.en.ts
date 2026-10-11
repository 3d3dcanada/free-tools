import type { ToolGuide } from "../guide";
export default {
  slug: "resize-image",
  locale: "en",
  title: "Free Image Resizer, Pixels or Percent | 3D3D",
  description:
    "Resize images locally by pixels, percentage or social preset. Keep the whole image or fill a crop. Free batch downloads with measured dimensions.",
  name: "Free Image Resizer",
  headline: "The right size for its next home.",
  summary: "Set pixel bounds or a percentage, with an explicit contain or cover choice.",
  answer:
    "Resize images for free by pixel dimensions, percentage or a social-image preset, without uploading them. Keep the full image within a bounding box or fill the exact frame with a centre crop. Process several files locally, compare the resulting dimensions, and download individual images or a ZIP while preserving your originals.",
  steps: [
    "Choose the original images and identify the destination’s required pixel dimensions. A platform’s upload limit and its displayed crop are separate constraints, so check both before choosing the size you want to create.",
    "Select a pixel box or percentage. In pixel mode, contain keeps the full image within the requested bounds; cover fills the exact width and height by cropping from the centre. Use the crop tool for deliberate subject placement.",
    "Choose an output format and run the batch. Inspect the reported dimensions for each file. Mixed portrait and landscape originals may produce different contained sizes even though they share the same bounding box.",
    "Open the downloaded result at its intended display size. Check small text and important subjects, then preview it in the destination application. Save the original as a master rather than enlarging the resized copy for the next job.",
  ],
  sections: [
    {
      heading: "Pixels describe the output, not its sharpness",
      paragraphs: [
        "A width and height tell you how many samples the image contains. Reducing a large camera photo can make it easier to deliver when the destination only needs a smaller display. Enlarging a small source creates more output pixels but cannot recover detail that was never recorded. If a product label becomes unreadable after resizing, use a better original or a tighter composition rather than assuming a larger number will fix it.",
        "Percentage mode scales both dimensions together. A fifty-percent setting halves the width and height, leaving roughly one quarter as many pixels before rounding. That does not guarantee a quarter of the bytes, because format and image content also affect compression. Review the actual dimensions and size instead of treating a percentage as a precise prediction of the downloaded file’s weight.",
      ],
    },
    {
      heading: "Choose between fitting and filling",
      paragraphs: [
        "Contain is appropriate when every part of the source must remain visible, such as a complete object or a screenshot with controls near its edges. It returns an image that fits inside the requested bounds; it does not add a new letterboxed canvas to force both dimensions. A two-to-one image placed within a square box therefore remains two-to-one at a smaller height.",
        "Cover is appropriate when the output must be exactly the requested width and height. It preserves the image’s proportions while cropping the excess from the centre. This can remove a face, caption or important edge if the source composition does not match the destination. Use the crop tool to choose a focal region first, or reconsider the layout when the complete object matters more than filling the frame.",
      ],
    },
    {
      heading: "Treat presets as starting canvases",
      paragraphs: [
        "The supplied social sizes are convenient pixel canvases, not promises about every platform placement. A banner can be displayed through different crops on a phone and desktop, and an application may overlay controls or profile imagery. Keep essential material away from the edges and inspect the platform’s own preview. Choose a custom size whenever the publishing workflow gives you more specific current requirements.",
        "Batch settings apply the same operation to each input, but each image still deserves a check. A landscape photograph and a tall document may need different decisions even when destined for one gallery. The tool accepts up to 20 images within its memory limits and processes them locally. Use smaller batches on constrained devices, and keep the input files until you have confirmed that every output is usable.",
      ],
    },
  ],
  comparison: [
    { name: "Squoosh", detail: "Local processing with visual comparison.", url: "https://squoosh.app/" },
  ],
  faqs: [
    {
      q: "Can I resize without cropping?",
      a: "Yes. Choose contain in pixel mode or use percentage scaling. The original proportions remain, so one contained dimension can be smaller than the bounding box.",
    },
    {
      q: "Why is the result not exactly the width and height I entered?",
      a: "Contain preserves the whole image inside those limits. Select cover for exact dimensions, understanding that it may remove content from the edges.",
    },
    {
      q: "Will enlarging an image make it sharper?",
      a: "No. Resampling adds output pixels without recovering missing source detail. Use a higher-resolution original when the final application needs more information.",
    },
    {
      q: "Can I resize several images by the same percentage?",
      a: "Yes. Percentage mode applies the same scale to each input. Different original sizes will still produce different output dimensions.",
    },
    {
      q: "Does changing pixels set a print size?",
      a: "Physical size also depends on the print resolution and scaling settings. Confirm those in the print workflow rather than assuming a social pixel preset represents a paper format.",
    },
    {
      q: "Can I undo the resize?",
      a: "Undo restores the editor settings. The original files remain unchanged; download a new result after revising the settings instead of repeatedly editing an exported copy.",
    },
  ],
  service: { label: "Discuss a website workflow with 3D3D", path: "/software-development" },
} satisfies ToolGuide;
