import type { ToolGuide } from "../guide";
export default {
  slug: "invoice-generator",
  locale: "en",
  title: "Free Invoice Generator with Canadian Tax Presets | 3D3D",
  description:
    "Create invoice PDFs locally with your logo, line items, currencies and editable Canadian tax presets. Save clients on this device and export a backup.",
  name: "Free Invoice Generator",
  headline: "Clear work. Clear paperwork.",
  summary: "Prepare an invoice using your own business details and agreed prices.",
  answer:
    "Create a free invoice PDF in your browser without uploading client or business information. Add line items, your logo, currency and editable Canadian tax lines, then review the totals before downloading. Saved clients and items stay on this device. Export a backup for your records; this tool does not send invoices, collect payment or replace bookkeeping.",
  steps: [
    "Replace the sample business and client details with the actual parties. Choose an invoice number, issue date and any due date. Add your own logo if needed, and check that the contact information is sufficient for the recipient to identify the work.",
    "Describe each product or service with its quantity and unit price. Choose the currency before entering amounts. Review which tax lines apply to each item rather than assuming that every item in a mixed invoice has the same treatment.",
    "Use a province preset only as a starting point, then verify the tax labels, rates and registration details appropriate to your situation. Review the subtotal, each tax amount and total. A preset is a calculation convenience, not a tax determination.",
    "Download the PDF and reopen it to check the actual document. Save an editable JSON backup and the final PDF in your normal records. Deliver the invoice through your own agreed channel and track payment separately from this local document editor.",
  ],
  sections: [
    {
      heading: "Make the line items understandable",
      paragraphs: [
        "A useful invoice tells the recipient what the amount relates to. Replace a vague description such as Services with wording that identifies the agreed work, period or deliverable. Keep quantities and unit prices consistent with that description. If one line represents hours and another represents a physical quantity, make the units clear in the text so the recipient does not have to infer them from the total.",
        "The editor supports up to fifty items and four tax lines. Quantities can have three decimal places, while prices follow the selected currency’s supported precision. JPY uses whole units here; the other listed currencies use two decimal places. Selecting another currency changes the denomination, not the economic value through an exchange-rate calculation. Enter the intended amounts yourself and review saved items before reusing them.",
      ],
    },
    {
      heading: "Understand the calculation boundary",
      paragraphs: [
        "The tool rounds each quantity-times-price line to the currency’s smallest supported unit, then totals those lines. Each tax is calculated on the subtotal of items selected for that tax, using half-up rounding. Tax lines are independent rather than compounded. With a CAD 100 taxable base, the supplied Québec example gives GST 5.00 and QST 9.98, for a total of 114.98. Check that this method fits your own invoicing requirements.",
        "Canadian presets were checked on 8 October 2026. Registration, exemptions, place of supply and special rules can change which taxes apply; a province choice cannot resolve those facts. Use the linked official guidance or your adviser for that decision. You can edit rates, labels, registrations and item selections. Do not treat a populated template as certification that an invoice satisfies every requirement for your business or jurisdiction.",
      ],
    },
    {
      heading: "Keep reliable local records",
      paragraphs: [
        "Saved clients, saved items and number counters belong to this browser’s local storage. They are not synchronized across computers, browser profiles or the separate quote and receipt landing pages. A local number is not globally unique, so coordinate numbering with any other system you use. Private browsing, cleared site data or device loss can remove the stored draft. Download backups before relying on it as your working record.",
        "An empty amount-paid field means that payment information has not been entered; it is not silently changed to zero. Enter only known payment information. The tool does not verify bank transactions, send reminders or maintain an accounting ledger. Keep issued PDFs, payment evidence and any corrections in your established record system. Review a restored JSON backup before export, especially if it comes from an older draft with outdated client or tax details.",
      ],
    },
  ],
  comparison: [
    {
      name: "Invoice Generator",
      detail: "Also offers free PDF invoices without signup.",
      url: "https://invoice-generator.com/",
    },
  ],
  faqs: [
    {
      q: "Is this connected to 3D3D’s billing system?",
      a: "No. It is a public local document tool using your own business details and prices. It does not access 3D3D customers, accounts or internal billing records.",
    },
    {
      q: "Do province presets decide which tax I charge?",
      a: "No. They provide editable general rates. Your registration, transaction and applicable rules determine the correct treatment; verify that before issuing the invoice.",
    },
    {
      q: "Where are clients and items saved?",
      a: "In this browser on this device. Export an editable backup before clearing storage or moving devices. The separate invoice, quote and receipt pages keep their own local workspaces.",
    },
    {
      q: "Does choosing USD convert my CAD prices?",
      a: "No. There is no exchange-rate service. Choose the intended currency and enter the appropriate amounts yourself; review any saved item before adding it.",
    },
    {
      q: "What does a blank payment field mean?",
      a: "It means payment information is unknown in this document. An explicitly entered zero is different. The tool does not infer a bank balance or payment status.",
    },
    {
      q: "Will downloading send the invoice?",
      a: "No. It creates a PDF on your device. Review it, retain a copy and send it yourself through the channel agreed with the recipient.",
    },
  ],
  service: { label: "Build a business workflow with 3D3D", path: "/software-development" },
  sources: [
    {
      label: "CRA: GST/HST rates and invoice guidance",
      url: "https://www.canada.ca/en/revenue-agency/services/tax/businesses/topics/gst-hst-businesses/charge-collect-which-rate.html",
    },
    {
      label: "Revenu Québec: calculating GST and QST",
      url: "https://www.revenuquebec.ca/en/businesses/consumption-taxes/gsthst-and-qst/collecting-gst-and-qst/calculating-the-taxes/",
    },
  ],
} satisfies ToolGuide;
