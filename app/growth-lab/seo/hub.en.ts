import type { ToolGuide } from "./guide";
export default {
  slug: "hub",
  locale: "en",
  title: "Free Browser Tools for Design, Files & 3D Printing | 3D3D",
  description:
    "Choose a free local tool for QR codes, graphics, images, PDFs, business documents and 3D printing. No account, no watermark, no trial and nothing uploaded.",
  name: "Free Browser Tools",
  headline: "Make something useful.",
  summary: "A local workshop for design, documents and print preparation.",
  answer:
    "Use free browser tools to make QR codes, presentations, posters, cards and business documents, process images and PDFs, or plan a 3D print. Search by the job you need, open the matching editor and download your result. No account is required, your files are not uploaded, and there is no trial, watermark or expiry.",
  steps: [
    "Search for the job, such as Wi-Fi, resize, invoice or STL, or choose a category. The short description beside each tool explains its output. Select a specific intent page when you want an editor already configured for that task.",
    "Review the initial example and the input limits. Add your own text or files, adjust the relevant controls and inspect the preview. Keep original files available so you can compare them with the new output.",
    "Download the result in a format accepted by its destination. Where an editable draft is available, save that too. Open the actual export and check the details that matter, rather than treating the preview alone as final evidence.",
    "Use the related-tool links for the next preparation step, or the academy to understand a printing decision. Service links lead to a separate 3D3D enquiry when you want help making a physical part or building a software workflow.",
  ],
  sections: [
    {
      heading: "Choose the tool by the result you need",
      paragraphs: [
        "The QR family covers direct links, network access, contacts and calendar events with styling and a scan check. The design editors produce presentations, cards, flyers, posters and social images from your own content. Choose a print-oriented size when physical trim and bleed matter, and a pixel preset when the destination is an image field. A format label does not replace checking the actual receiving workflow.",
        "The image tools handle conversion, resizing, cropping, compression, rounded edges, favicons and optional local background removal. PDF tools assemble pages, extract selections, rotate or reorder them, create documents from pictures and render pages as images. These operations have different outputs: a PDF page rendered as PNG is a picture, while an extracted PDF page remains a document page. Select the operation that preserves what you need.",
      ],
    },
    {
      heading: "Keep local work understandable and recoverable",
      paragraphs: [
        "Client-side processing means the work happens on your device. The browser may download the static code, fonts, codecs or optional model required by a feature, but the tool does not upload your source files for processing. Large or complex files still consume local memory. Start with one representative input when testing a demanding operation, and use the displayed limits as boundaries rather than promises of equal speed on every phone.",
        "Some editors retain drafts or reusable records in browser storage; file-processing tools keep selected source files in the current session. Neither is a cloud backup. Read the storage note, download editable data when offered and save the finished output somewhere you control. Clearing site data, switching profiles or losing the device can remove local work. The original files and exported backups remain your recovery path.",
      ],
    },
    {
      heading: "Review the result in its real context",
      paragraphs: [
        "A successful export proves that a file was created, but the relevant acceptance check depends on its use. Scan a printed QR at its real size, open a deck in the presentation software, inspect a PDF in the recipient’s reader and check an image after the destination crops it. For printing calculations, confirm units and compare the estimate with a slicer and a physical trial when fit or function matters.",
        "The public billing tools use your own prices and do not connect to 3D3D’s accounts or collect payments. Printing calculators likewise estimate your inputs rather than display 3D3D service prices. The academy explains the reasoning behind common preparation decisions, and every lesson invites corrections. Use an enquiry for an actual service quote; finishing a local tool session does not submit a job, publish a page or send a message on your behalf.",
      ],
    },
  ],
  comparison: [
    { name: "Squoosh", detail: "Another local browser option for image work.", url: "https://squoosh.app/" },
  ],
  faqs: [
    {
      q: "Do I need an account?",
      a: "No. The tools are usable without signup, a trial or a paid unlock. Downloaded outputs do not receive a 3D3D watermark.",
    },
    {
      q: "Are source files sent to a server?",
      a: "No. Tool processing stays on the device. Static application resources can load from the site, but your documents, images and models are not uploaded.",
    },
    {
      q: "Can I use the tools on a phone?",
      a: "The interfaces support narrow screens and touch controls. Device memory and browser features still affect large files, optional models and particular input formats.",
    },
    {
      q: "Are my drafts synchronized?",
      a: "No. Local records belong to the current browser and device. Export a backup where available before switching devices or clearing site data.",
    },
    {
      q: "Are the printing estimates service quotes?",
      a: "No. They use your assumptions and costs. Request a separate quote for 3D3D to review and manufacture a part.",
    },
    {
      q: "Does a download publish or send anything?",
      a: "No. You receive a local file and control its use. Publication, delivery, printing and any service enquiry are separate actions you choose.",
    },
  ],
  service: { label: "Discuss a project with 3D3D", path: "/quote" },
} satisfies ToolGuide;
