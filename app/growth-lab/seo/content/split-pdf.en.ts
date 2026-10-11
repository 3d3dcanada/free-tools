import type { ToolGuide } from "../guide";
export default {
  slug: "split-pdf",
  locale: "en",
  title: "Split PDF & Extract Pages Free | 3D3D",
  description:
    "Extract selected PDF pages into one file or download separate one-page PDFs in a ZIP. Choose ranges and inspect the result locally, without uploads.",
  name: "Split PDF and Extract Pages",
  headline: "Keep the pages this task needs.",
  summary: "Select pages, export an excerpt or separate them into individual PDFs.",
  answer:
    "Split a PDF for free without uploading it. Select page numbers or ranges, then download the selection as one PDF or a ZIP containing separate one-page PDFs. Preview the order before exporting and keep the source document. The selection follows positions in the current page list, which may differ from numbers printed on the pages.",
  steps: [
    "Open a readable PDF and identify the pages you need in the displayed list. Compare the list positions with the document’s printed numbering. A cover, introduction or Roman-numbered section can make those two numbering systems different.",
    "Enter a selection such as 1, 3-5. Commas separate entries and each range must run upward. The tool retains the order you enter and removes repeated selections, so inspect the chosen sequence before proceeding.",
    "Choose Download Selected PDF to keep the excerpt together, or Split Into Separate PDFs to make a ZIP of one-page files. These solve different delivery needs; decide whether the recipient needs context across pages or independent attachments.",
    "Open the actual downloaded PDF or ZIP. Confirm the number of outputs and inspect the first and last selected pages. Rename the delivery files meaningfully and retain the full original so omitted context remains available if it is needed later.",
  ],
  sections: [
    {
      heading: "Use positions, not printed page labels",
      paragraphs: [
        "A report can show page 1 on the third physical page after a cover and contents sheet. This tool’s selection field refers to the current page list, starting at one, rather than reading a number printed in the document. Look at the thumbnail and preview of the boundary pages. This simple check prevents an excerpt from starting one page too early or leaving out the final part of a section.",
        "An empty selection includes the current list. An entry such as 5, 1-2 places the fifth page before the first two. Repeated numbers are selected only once, so writing 1, 1 does not create a duplicate copy. If you reorder or remove pages before choosing a range, inspect the list again and enter a selection that matches its new positions. Do not rely on a remembered number from the original arrangement.",
      ],
    },
    {
      heading: "Choose the right kind of split",
      paragraphs: [
        "A single excerpt is useful for a chapter, a drawing set or a few consecutive instructions that belong together. Separate one-page files are useful when each page is an independent label, certificate or attachment. The ZIP names pages in output order; it does not infer customer names, document titles or confidential classification. Apply your own naming convention after checking which page each file contains.",
        "Splitting every page can remove useful context. A table may continue on the next page, a warning may refer to a preceding instruction, or a signature may apply to the document as a whole. Decide what a reader needs to interpret the excerpt accurately. Include the relevant source title or version in your delivery notes when appropriate, and do not present an isolated page as a complete document if it is not.",
      ],
    },
    {
      heading: "Review the new files before sharing",
      paragraphs: [
        "The output copies the selected PDF pages into new documents. It is not a secure redaction tool, a password remover or a guarantee that forms, bookmarks and digital signatures survive editing. If you need to remove sensitive information inside a page, simply excluding other pages does not solve that task. Use a suitable redaction workflow and verify the resulting document separately.",
        "Keep the original unchanged and save the extracted copy to an intentional location. Browser memory is not a document archive, and the tool does not retain the source for you after the session. A split can reduce the number of pages in each file without promising a particular byte size. Check any upload limits on the actual result, and test important fonts, fields or links with the reader your recipient uses.",
      ],
    },
  ],
  comparison: [
    {
      name: "iLovePDF Split PDF",
      detail: "Offers page extraction and split workflows.",
      url: "https://www.ilovepdf.com/help/documentation",
    },
  ],
  faqs: [
    {
      q: "How do I select several ranges?",
      a: "Use commas, for example 1-3, 7, 10-12. Each range must be ascending and inside the current page count. Preview the result before exporting.",
    },
    {
      q: "Can I put page 5 before page 1?",
      a: "Yes. Enter 5, 1 to select them in that order. The selection follows the current page list and keeps each chosen page only once.",
    },
    {
      q: "What does an empty range mean?",
      a: "It selects the full current list. Enter explicit page numbers when you want only an excerpt, then verify the selected count and boundary pages.",
    },
    {
      q: "Can I download one PDF per page?",
      a: "Yes. The separate-PDF action creates a ZIP containing one-page PDFs in output order. Download Selected PDF instead when the pages should remain together.",
    },
    {
      q: "Are printed page numbers used for selection?",
      a: "No. The field uses one-based positions in the current list. Covers and introductory pages can make those positions differ from printed page labels.",
    },
    {
      q: "Does splitting preserve a signed document’s status?",
      a: "Do not assume that a newly extracted document retains digital-signature validity. Keep the full signed original and use an appropriate verification workflow when that status matters.",
    },
  ],
  service: { label: "Simplify a document workflow with 3D3D", path: "/software-development" },
} satisfies ToolGuide;
