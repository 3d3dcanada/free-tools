import type { ToolGuide } from "../guide";
export default {
  slug: "crop-image",
  locale: "en",
  title: "Free Image Cropper, Rotate & Flip in Batches | 3D3D",
  description:
    "Crop images with free or fixed proportions, choose the focal region, rotate and flip. Process batches privately and download new files for free.",
  name: "Free Image Cropper",
  headline: "Keep the part that matters.",
  summary: "Choose the composition, proportions and orientation before exporting a new image.",
  answer:
    "Crop, rotate and flip images for free in your browser without uploading the originals. Choose a free crop or fixed proportions, set the region’s size and position, then review the processed result. The same settings can handle a batch, while each downloaded image remains a separate file from its source.",
  steps: [
    "Choose an image and identify the part that matters to the reader. Select free proportions or a fixed ratio such as square, landscape or portrait before deciding how much of the surrounding scene to remove.",
    "Set the crop width and height percentages, then move the region horizontally and vertically. A fixed ratio fits inside that region. Run the operation to see the exact result rather than assuming every subject remains centred.",
    "Choose any quarter-turn rotation and horizontal or vertical flip. Flips apply before the selected rotation, so inspect asymmetrical objects, lettering and handed parts carefully. A mirrored photograph can describe the wrong physical object.",
    "Download the processed image or batch ZIP and inspect the actual files. Confirm the dimensions and orientation in the destination application. Keep the source so a later layout can recover material intentionally removed from this crop.",
  ],
  sections: [
    {
      heading: "Crop to clarify, not to change the evidence",
      paragraphs: [
        "Cropping can remove a distracting desk, centre a product or give a portrait a useful frame. Start with the communication task: which visible details establish what the viewer needs to understand? Leave enough context to interpret the subject. A tight crop that removes a defect, scale reference or important warning may make the image less accurate even if it looks cleaner.",
        "For a product listing, inspect whether the complete item and any relevant attachment points remain visible. For a photographed document, preserve page edges or headings needed to identify it. For a social composition, leave room for the caption or graphic elements you will add later. Save different purposeful crops rather than expecting one composition to work in every placement.",
      ],
    },
    {
      heading: "Separate proportions from pixel dimensions",
      paragraphs: [
        "A ratio describes shape, not resolution. A square can contain many different pixel dimensions. The crop controls select a region of the existing image, so a small crop contains fewer source pixels than a large one. If the destination also needs an exact width and height, crop for composition first, then use the resize tool with the exported result.",
        "Fixed proportions are useful for a consistent gallery, but a batch can contain subjects in different positions. The same percentage region may cut a face from one photograph while fitting another perfectly. Review every result and process exceptional images separately. When preserving the entire object matters more than matching a frame, use the resizer’s contain option instead of forcing a crop.",
      ],
    },
    {
      heading: "Check orientation and the final encoding",
      paragraphs: [
        "Rotation changes which dimension is horizontal; a quarter turn swaps the output width and height. A flip changes handedness. These are different operations, and neither is a substitute for changing the crop region. Read any visible text after transformation and check directional details such as connectors, mounting holes or controls before using the image to explain a physical product.",
        "The output format still affects transparency and image quality. A PNG can keep a clear background, while JPEG fills transparent pixels with the selected background colour. Repeatedly exporting a lossy format can introduce additional artifacts. Make revisions from the original when possible, then perform the final crop and encode once. The original file is never overwritten by this editor.",
      ],
    },
  ],
  comparison: [
    { name: "Squoosh", detail: "Local image processing and visual comparison.", url: "https://squoosh.app/" },
  ],
  faqs: [
    {
      q: "Can I make a square crop?",
      a: "Yes. Choose the 1:1 ratio and position the crop around the subject. The pixel dimensions depend on the source region; resize afterward if a particular square size is required.",
    },
    {
      q: "What do the crop percentages mean?",
      a: "They define the size of a candidate region within the original. A fixed ratio is fitted inside that region, while the position controls determine where it sits.",
    },
    {
      q: "Is a flip the same as a rotation?",
      a: "No. A flip mirrors the image; a rotation turns it. Check lettering and handed components, since a mirror can misrepresent an otherwise accurate product photograph.",
    },
    {
      q: "Can I recover the removed edges later?",
      a: "The downloaded crop no longer contains those pixels. Keep the original source, reload it and make a different crop when a later composition needs more context.",
    },
    {
      q: "Can I crop a whole batch consistently?",
      a: "Yes. The same settings apply to every selected file. Inspect each output because different source proportions and subject positions can need individual adjustments.",
    },
    {
      q: "Does the tool straighten an arbitrary tilted horizon?",
      a: "Rotation here uses quarter turns, not arbitrary-angle straightening. Use an editor with fine-angle rotation when a document or horizon needs that more precise correction.",
    },
  ],
  service: { label: "Prepare a website or product workflow with 3D3D", path: "/software-development" },
} satisfies ToolGuide;
