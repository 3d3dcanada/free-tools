export const intentTools = [
  {
    slug: "wifi-qr-code",
    parent: "qr-code",
  },
  {
    slug: "vcard-qr-code",
    parent: "qr-code",
  },
  {
    slug: "calendar-qr-code",
    parent: "qr-code",
  },
  {
    slug: "png-to-webp",
    parent: "convert-image",
  },
  {
    slug: "svg-to-png",
    parent: "convert-image",
  },
  {
    slug: "heic-to-jpg",
    parent: "convert-image",
  },
  {
    slug: "pdf-to-jpg",
    parent: "pdf-to-image",
  },
  {
    slug: "jpg-to-pdf",
    parent: "images-to-pdf",
  },
  {
    slug: "quote-generator",
    parent: "invoice-generator",
  },
  {
    slug: "receipt-generator",
    parent: "invoice-generator",
  },
];
export const intentFor = (slug: string) => intentTools.find((t) => t.slug === slug);
