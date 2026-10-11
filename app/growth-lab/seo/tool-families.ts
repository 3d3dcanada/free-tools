/**
 * The six families of free tools, as the homepage band and the menus show them.
 * Plain data on purpose: the chrome imports this, and it must not pull in the tool
 * models. `scripts/audit/tools-hub.test.mts` checks it against the catalogue and
 * `categoryFor` so a new tool cannot be left out of a family or counted twice.
 */
export interface ToolFamily {
  /** The category name the hub uses (`categories` in tools/navigation.ts). */
  category: string;
  /** Hub anchor: the family's section id on /tools. */
  id: string;
  hex: string;
  blurb: string;
  /** The family's name and line on French pages (same words as the French hub). */
  fr: { category: string; blurb: string };
  /** Every tool in the family, in catalogue order. */
  slugs: string[];
  /** The three to show first, with the name to show for each. */
  best: { slug: string; name: string }[];
}

export const TOOL_FAMILIES: ToolFamily[] = [
  {
    category: "QR and Contacts",
    id: "qr",
    hex: "#04D9C4",
    blurb: "Links, Wi-Fi, contacts and events as codes that scan.",
    fr: { category: "QR et contacts", blurb: "Liens, Wi-Fi, contacts et événements en codes qui se scannent." },
    slugs: ["calendar-qr-code", "qr-code", "vcard-qr-code", "wifi-qr-code"],
    best: [
      { slug: "qr-code", name: "QR Studio" },
      { slug: "wifi-qr-code", name: "Wi-Fi QR Code" },
      { slug: "vcard-qr-code", name: "Contact QR Code" },
    ],
  },
  {
    category: "Design",
    id: "design",
    hex: "#FF2D92",
    blurb: "Cards, flyers, posters, social images and presentations.",
    fr: { category: "Graphisme", blurb: "Cartes, dépliants, affiches, images sociales et présentations." },
    slugs: ["business-card", "flyer-maker", "pitch-deck", "poster-maker", "social-image-maker"],
    best: [
      { slug: "pitch-deck", name: "Deck Studio" },
      { slug: "business-card", name: "Business Cards" },
      { slug: "flyer-maker", name: "Flyers" },
    ],
  },
  {
    category: "Images",
    id: "images",
    hex: "#04D9C4",
    blurb: "Convert, resize, crop, compress and clean up pictures.",
    fr: { category: "Images", blurb: "Convertissez, redimensionnez, recadrez, compressez et nettoyez vos images." },
    slugs: [
      "compress-image", "convert-image", "crop-image", "favicon-generator", "heic-to-jpg",
      "png-to-webp", "remove-background", "resize-image", "rounded-image", "svg-to-png",
    ],
    best: [
      { slug: "compress-image", name: "Image Compressor" },
      { slug: "remove-background", name: "Background Remover" },
      { slug: "resize-image", name: "Image Resizer" },
    ],
  },
  {
    category: "PDF Documents",
    id: "pdf",
    hex: "#FF6A00",
    blurb: "Merge, split, reorder, stamp and convert pages.",
    fr: { category: "Documents PDF", blurb: "Fusionnez, divisez, réorganisez, tamponnez et convertissez des pages." },
    slugs: [
      "images-to-pdf", "jpg-to-pdf", "merge-pdf", "organize-pdf", "pdf-to-image", "pdf-to-jpg",
      "split-pdf", "stamp-pdf",
    ],
    best: [
      { slug: "merge-pdf", name: "Merge PDF" },
      { slug: "split-pdf", name: "Split PDF" },
      { slug: "images-to-pdf", name: "Images to PDF" },
    ],
  },
  {
    category: "Business",
    id: "business",
    hex: "#18E36B",
    blurb: "Invoices, quotes and receipts with your own prices.",
    fr: { category: "Entreprise", blurb: "Factures, devis et reçus avec vos propres prix." },
    slugs: ["invoice-generator", "quote-generator", "receipt-generator"],
    best: [
      { slug: "invoice-generator", name: "Invoices" },
      { slug: "quote-generator", name: "Quotes" },
      { slug: "receipt-generator", name: "Receipts" },
    ],
  },
  {
    category: "3D Printing",
    id: "printing",
    hex: "#FF6A00",
    blurb: "Open a model, check the fit and price the print.",
    fr: { category: "Impression 3D", blurb: "Ouvrez un modèle, vérifiez l’ajustement et chiffrez l’impression." },
    slugs: [
      "filament-calculator", "model-viewer", "nozzle-layer-guide", "print-cost-calculator",
      "tolerance-calculator", "unit-converter",
    ],
    best: [
      { slug: "model-viewer", name: "3D Model Viewer" },
      { slug: "print-cost-calculator", name: "Print Cost" },
      { slug: "tolerance-calculator", name: "Tolerance" },
    ],
  },
];

export const TOOL_COUNT = TOOL_FAMILIES.reduce((n, f) => n + f.slugs.length, 0);
