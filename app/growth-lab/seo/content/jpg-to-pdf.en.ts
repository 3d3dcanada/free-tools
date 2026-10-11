import type { ToolGuide } from "../guide";
export default {
  slug: "jpg-to-pdf",
  locale: "en",
  title: "JPG to PDF, Free Letter-Size Document Maker | 3D3D",
  description:
    "Turn JPEG photos or scans into an ordered PDF locally. Letter pages are selected; adjust margins, arrange images and download without an account.",
  name: "JPG to PDF",
  headline: "Put the photographed pages back together.",
  summary: "Make a Letter-size document from JPEG photos or scans.",
  answer:
    "Convert JPG photos into a PDF for free without uploading them. This page starts with Letter paper selected, places one image on each page and lets you choose margins and order. Prepare readable photos first, then download and inspect the document. The conversion packages pictures; it does not recognise text, correct perspective or certify a scan.",
  steps: [
    "Gather the JPEG photographs or scans for one document. Check that each page is complete, in focus and facing the right way. Crop out the desk or surrounding material before adding the files if it does not belong in the document.",
    "Select the images together and arrange them in reading order. Use the page headings or visible numbers to confirm the sequence. Remove accidental duplicate photos and include any back page that contains information the recipient needs.",
    "Keep Letter selected when the receiving workflow expects 8.5 by 11 inches, or choose another available page format. Set a margin that leaves room around the image without making its writing too small to read.",
    "Export the PDF and open the downloaded copy. Zoom to inspect the smallest text, check the first and last pages and confirm the total count. Keep the JPEG originals and retain a clear filename identifying the document and its version.",
  ],
  sections: [
    {
      heading: "Start with a readable photograph",
      paragraphs: [
        "When photographing paperwork, the source controls the quality of the result. Missing corners, motion blur, glare and a strong perspective angle remain problems after PDF conversion. Take the photograph as square to the page as practical, with enough even light to read the details. If a line is unreadable in the JPEG, placing it on a PDF page will not reconstruct the missing information.",
        "Crop deliberately before assembly. A page surrounded by a large area of desk must be fitted as a whole image, which makes the actual writing smaller on the paper. Removing those surroundings can improve the useful scale without changing the PDF settings. Do not crop away dates, page identifiers or notes that the recipient needs. Keep an unmodified source when the original context may matter later.",
      ],
    },
    {
      heading: "Use the paper size as a delivery choice",
      paragraphs: [
        "Letter is the starting choice on this route, not a claim about the original photographed sheet. The image is fitted proportionally inside the margins, without intentional stretching or clipping. A photo of a narrow receipt will leave unused space on the page. A landscape sheet may become relatively small on portrait paper, so inspect whether the chosen format remains practical for reading and printing.",
        "Margins are measured in millimetres even when the paper is Letter. Increasing them reduces the area available to the picture. Choose enough space for the recipient’s handling needs, then verify the resulting text size. If the task is simply a screen reference and variable page dimensions are acceptable, the image-size option may fit better; confirm the destination’s requirements rather than assuming that every portal accepts the same arrangement.",
      ],
    },
    {
      heading: "Know what this document contains",
      paragraphs: [
        "The PDF embeds rendered images. It does not add optical character recognition, searchable words, form fields or a verified reading order for assistive technology. If the recipient needs text search or an accessible document, prepare that additional version through an appropriate workflow. A photo of a table remains a picture of the table, not a spreadsheet or editable set of cells.",
        "File size is another separate check. The conversion can re-encode and embed the image representation, so JPEG source bytes do not directly predict the PDF’s final size. Inspect the downloaded file against any submission limit. This tool does not send the document, collect a signature or declare it an official record. Save the output and sources in your normal record system, then deliver them yourself through the intended channel.",
      ],
    },
  ],
  comparison: [
    {
      name: "iLovePDF JPG to PDF",
      detail: "Offers a JPEG upload-to-PDF workflow.",
      url: "https://www.ilovepdf.com/jpg_to_pdf",
    },
  ],
  faqs: [
    {
      q: "Why does this page start with Letter?",
      a: "It is set up for a common 8.5 by 11 inch document workflow. You can choose A4 or image-sized pages if those better match the recipient’s needs.",
    },
    {
      q: "Will a photographed page be straightened?",
      a: "No automatic perspective correction or deskew is performed. Prepare the photo’s crop and orientation before assembling the PDF.",
    },
    {
      q: "Does the conversion make text searchable?",
      a: "No. It places images on pages without OCR. Use an appropriate text-recognition workflow when the document must support search or selectable words.",
    },
    {
      q: "Why is there blank space around a receipt?",
      a: "The whole image is fitted proportionally inside the paper margins. A narrow source leaves unused space instead of being stretched to fill the sheet.",
    },
    {
      q: "Can I arrange the photos after selecting them?",
      a: "Yes. Move images earlier or later in the list and remove unwanted copies. Check page identifiers rather than assuming filenames always sort correctly.",
    },
    {
      q: "Will the PDF be smaller than the JPG files?",
      a: "Not necessarily. Measure the actual output. The tool assembles a document and does not promise PDF compression or a specific submission size.",
    },
  ],
  service: { label: "Make a document intake tool with 3D3D", path: "/software-development" },
} satisfies ToolGuide;
