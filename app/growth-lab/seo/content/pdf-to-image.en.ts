import type { ToolGuide } from "../guide";
export default {
  slug: "pdf-to-image",
  locale: "en",
  title: "PDF to PNG or JPG, Free Local Export | 3D3D",
  description:
    "Render selected PDF pages as PNG or JPG at 72, 96, 150 or 300 DPI. Download an ordered image ZIP locally without uploading the document.",
  name: "PDF Pages to Images",
  headline: "A page, rendered into pixels.",
  summary: "Choose a raster format and resolution for selected PDF pages.",
  answer:
    "Convert PDF pages to PNG or JPG for free in your browser without uploading the document. Choose pages and a resolution from 72 to 300 DPI, then download an ordered ZIP of rendered images. Each image represents a whole page on a white background; it does not extract the original photographs or retain editable PDF text.",
  steps: [
    "Select the PDF and identify the pages to render. Use the page list and range field to include only the necessary material. Check orientation before export, since each result follows the page’s current rotation.",
    "Choose PNG for a lossless raster encoding or JPG for a photographic delivery copy when accepted by the destination. Neither choice preserves vector paths or live PDF text. Compare a representative page when the best format is uncertain.",
    "Set the resolution to 72, 96, 150 or 300 DPI according to the required pixel size. Higher values produce more pixels and use more memory. Start with a small selection when the document contains large-format drawings or many pages.",
    "Download the image ZIP, unpack it and open several actual files. Confirm dimensions, page order, fine lettering and the beginning and end of the selection. Keep the PDF source as the document master alongside the rendered delivery copies.",
  ],
  sections: [
    {
      heading: "Translate physical page size into pixels",
      paragraphs: [
        "Resolution determines how many pixels represent an inch of PDF page size. A Letter page at 150 DPI produces 1275 by 1650 pixels before any rotation swaps the axes. At 300 DPI, that becomes 2550 by 3300. Doubling both dimensions means four times as many pixels, which matters for browser memory and processing time. Choose the resolution for the intended use rather than automatically selecting the largest value.",
        "A PDF drawing with unusually large physical dimensions can exceed the image limits even when its original file is small. Vector instructions may take few bytes while their raster representation needs millions of pixels. If an export is refused for size, reduce the resolution or prepare an appropriately sized source page. A smaller source PDF in bytes does not necessarily make a large raster canvas safe to allocate.",
      ],
    },
    {
      heading: "Distinguish a rendered page from extracted assets",
      paragraphs: [
        "This tool draws the visible page as an image. It does not pull individual embedded photographs, logos or vector diagrams out of the PDF. A page containing three photographs becomes one image of that page, including its surrounding layout. Use a dedicated asset-extraction workflow when you need the original embedded files or their original resolution, and respect the rights attached to those assets.",
        "The rendered background is white, including in PNG output. PNG is useful for retaining the raster’s pixels without JPEG compression, but it does not make the original page transparent or recover vector editability. Text becomes pixels, so search, selection, links and form controls no longer behave as PDF features. Keep the PDF available when readers need those document functions or an accessible text representation.",
      ],
    },
    {
      heading: "Inspect the difficult parts of the document",
      paragraphs: [
        "Check small type, fine lines, symbols and pages with unusual fonts. A successful image download proves that a file was produced, not that every specialised PDF feature was reproduced exactly. The tool does not run PDF scripts or provide interactive form behaviour. If a form value, annotation or specialised page element is important, compare that part of the output with your trusted reader before using the image.",
        "The ZIP names images sequentially in output order. That sequence may differ from page labels printed inside the source, especially after a range selection or rearrangement. Keep a small record of which source and selection produced the images when the relationship matters. Do not delete the PDF after rasterising it: future size changes should start from the document rather than from a previously reduced or compressed picture.",
      ],
    },
  ],
  comparison: [
    {
      name: "iLovePDF PDF to JPG",
      detail: "Offers PDF-to-image conversion through upload.",
      url: "https://www.ilovepdf.com/pdf_to_jpg",
    },
  ],
  faqs: [
    {
      q: "Does this extract the photos inside a PDF?",
      a: "It renders complete pages. Individual embedded assets are not extracted as their original files. A page with multiple pictures becomes one page image.",
    },
    {
      q: "Which resolution should I choose?",
      a: "Use the pixel dimensions required by the destination. Higher DPI adds pixels and memory cost, so test a page and inspect the smallest relevant detail.",
    },
    {
      q: "Is PNG output transparent?",
      a: "No. Pages are rendered on white. PNG avoids JPEG compression of that raster image, but the page background remains opaque.",
    },
    {
      q: "Can I render only selected pages?",
      a: "Yes. Enter page positions or ranges and review the selected order. The ZIP filenames follow that output order rather than the document’s printed labels.",
    },
    {
      q: "Will text and links remain interactive?",
      a: "No. They become pixels in the image. Keep the PDF for text selection, search, links and other document behaviour that a raster image cannot provide.",
    },
    {
      q: "Why can a small PDF exceed the image limit?",
      a: "A compact vector page can require a very large raster at high DPI. Reduce the resolution or prepare a smaller physical page when the canvas limit is exceeded.",
    },
  ],
  service: { label: "Plan a document rendering workflow with 3D3D", path: "/software-development" },
} satisfies ToolGuide;
