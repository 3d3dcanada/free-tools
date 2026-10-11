import type { ToolGuide } from "../guide";
export default {
  slug: "quote-generator",
  locale: "en",
  title: "Free Quote Generator for Small Businesses | 3D3D",
  description:
    "Prepare a quote PDF with scope, line items, currency, tax lines and expiry date. Save a local draft and download a free copy without uploading details.",
  name: "Free Quote Generator",
  headline: "Make the proposed work easy to understand.",
  summary: "Describe the scope and prices before the job begins.",
  answer:
    "Create a free quote PDF locally without uploading business or client details. This page starts in quote mode with its own numbering and saved workspace. Describe the proposed work, quantities, prices, taxes and expiry date, then review the file before sharing it. The tool documents your proposal; it does not calculate 3D3D prices or record acceptance.",
  steps: [
    "Confirm that the document type is Quote and replace the sample parties with the real business and client. Choose a number and issue date. Add an expiry date when it is part of your offer, keeping it on or after the issue date.",
    "Break the proposed work into clear line items. State quantities and unit prices in the chosen currency. Use descriptions that connect the price to a deliverable, and avoid mixing an optional extra into the committed total without explaining it.",
    "Review tax selections and use the notes field for scope assumptions, exclusions, schedule conditions or the next step. Keep wording concise enough to fit the document. Verify applicable tax treatment separately from the template’s editable rate presets.",
    "Download the quote PDF and inspect every page before sending it yourself. Save a JSON backup for future revisions. Keep the issued version and any later acceptance or changes in your own records rather than overwriting the only copy.",
  ],
  sections: [
    {
      heading: "Describe what the price covers",
      paragraphs: [
        "A useful quote lets the client connect a number to a defined outcome. Instead of a single unexplained Project line, name the deliverable and the quantity or stage it represents. If a dimension, material, number of revisions or supplied asset changes the work, put that assumption in the description or notes. This is writing you provide; the editor does not invent a scope or estimate the effort required.",
        "Keep alternatives clear. The calculator totals every included line, so an optional item placed in the table contributes to the displayed total. If you need two mutually exclusive packages, prepare separate clearly named quote versions or explain the alternative outside the total. Do not rely on a reader to subtract an optional line mentally while deciding what the quoted amount actually represents.",
      ],
    },
    {
      heading: "Use dates and revisions intentionally",
      paragraphs: [
        "The issue date identifies when this version was prepared, while an expiry date can communicate how long you intend the proposed pricing to remain available. This editor checks date order but does not enforce an expiry or notify either party when it passes. Explain your own next step in the notes, such as asking the client to confirm the scope through your normal communication channel.",
        "A revision should remain distinguishable from the version previously sent. Keep a copy of the issued PDF and use a clear number or filename for the updated offer. The local counter is a convenience within this browser, not a shared sales ledger. If several people prepare quotes, coordinate numbering and version control outside the tool so the same identifier does not accidentally describe different proposals.",
      ],
    },
    {
      heading: "Keep quoting separate from payment and acceptance",
      paragraphs: [
        "This route opens as a quote and maintains its own local draft, clients, items and counters. It does not automatically synchronize those records with the invoice or receipt landing pages. Export and restore a backup when moving work deliberately, then inspect the restored details. Switching a document type or opening a new number does not establish that a customer accepted the offer or that any money changed hands.",
        "Review quantities, rates and tax selections before issuing the PDF. Currency selection labels the values but does not perform foreign exchange. Canadian tax presets remain editable starting points, and the tool does not decide registration or transaction-specific treatment. Retain the agreed scope, communications and later invoice in your own business records. For legal terms or tax questions specific to a transaction, use the relevant professional or official guidance.",
      ],
    },
  ],
  comparison: [
    {
      name: "Invoice Generator",
      detail: "Provides a separate quote-generation option.",
      url: "https://invoice-generator.com/",
    },
  ],
  faqs: [
    {
      q: "Does this page open as a quote?",
      a: "Yes. It starts in quote mode with a separate local workspace and counter. Check the document type and number before exporting a restored or edited draft.",
    },
    {
      q: "Does the tool suggest a price for my work?",
      a: "No. Enter your own quantities and agreed or proposed prices. These are not 3D3D service prices, which come only from a separate quote request.",
    },
    {
      q: "Can I include an expiry date?",
      a: "Yes. It must not precede the issue date. The date appears in the document, but the tool does not enforce expiry or send reminders.",
    },
    {
      q: "Are optional line items excluded from the total?",
      a: "No. Every included line contributes to the calculation. Use distinct quote versions or clear supporting wording for alternatives rather than assuming optional items are automatically excluded.",
    },
    {
      q: "Does downloading record client acceptance?",
      a: "No. It only creates the PDF. Obtain and retain acceptance through your own appropriate process; the editor does not track that event.",
    },
    {
      q: "Can I revisit the proposal later?",
      a: "The current draft can remain in local storage, and an exported JSON backup is editable when restored. Keep the issued PDF separately so later edits do not erase your record of what was sent.",
    },
  ],
  service: { label: "Request a 3D3D project quote", path: "/quote" },
  sources: [
    {
      label: "CRA: choosing and calculating GST/HST",
      url: "https://www.canada.ca/en/revenue-agency/services/tax/businesses/topics/gst-hst-businesses/charge-collect-which-rate.html",
    },
  ],
} satisfies ToolGuide;
