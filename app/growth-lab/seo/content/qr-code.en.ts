import type { ToolGuide } from "../guide";
export default {
  slug: "qr-code",
  locale: "en",
  title: "Free QR Code Generator, Static & No Expiry | 3D3D",
  description:
    "Create and scan-check free static QR codes with logos, colours and contact options. Export SVG, PNG, PDF or EPS locally. No account or expiry.",
  name: "Free QR Code Generator",
  headline: "A code you can keep.",
  summary: "Style and verify static codes for links, contacts, networks and events.",
  answer:
    "Create a free static QR code with your own colours, logo and caption, then download it as SVG, PNG, PDF or EPS. Nothing is uploaded. The code contains your chosen information directly, without a subscription redirect, scan tracking or expiry date. Use the built-in scan check before sharing your export.",
  steps: [
    "Choose the content type first. A website needs its complete address; a contact, network or event needs the relevant structured fields. Check spelling and include only information you intend the recipient to read.",
    "Set the foreground, background, dots and corners. Add a small logo if needed, then retain a clear border around the symbol. The editor increases error correction for a logo, but that does not guarantee every phone will scan it.",
    "Wait for the built-in decoder to report that it recovered your exact content. Resolve a failed scan before exporting. A valid decode checks the image and payload; it does not confirm that a website is online or a password works.",
    "Choose SVG for scalable artwork, PNG for an image workflow, or PDF for the printable tag. Open the downloaded file, scan it again, and test a physical sample at its intended size and viewing distance.",
  ],
  sections: [
    {
      heading: "Choose the information a scan should deliver",
      paragraphs: [
        "A URL code opens a destination that you maintain. Contact codes carry details a phone can offer to save. Wi-Fi codes carry network credentials, while an event code carries calendar fields. Plain text can label an object without needing a website at all. Start with that recipient action, then choose the matching fields; a visually impressive code with the wrong payload still creates the wrong experience.",
        "For a workshop sign, put a short, readable web address beside the QR and explain what the visitor will find. For a guest network, place the sign where only intended guests can see it. For a business card, keep the contact concise. Long payloads create denser symbols, which usually need more space and a more careful print test.",
      ],
    },
    {
      heading: "Design for the camera and the print",
      paragraphs: [
        "Dark modules on a light background are the dependable starting point. A decorative gradient, pale ink or large central logo can weaken the camera’s distinction between modules. The quiet zone is functional space, so do not fill it with a caption, illustration or surrounding border. Check the smallest version you plan to distribute, not just the large preview on your monitor.",
        "DPI describes the relationship between pixels and physical output size. It does not make a tiny image contain more useful detail. Vector output avoids a fixed pixel grid, but the final printer, surface and lighting still matter. Curved objects, glossy coatings, low contrast and texture can turn a digitally valid code into a difficult scan. Produce a small physical sample before a batch of signs or tags.",
      ],
    },
    {
      heading: "Keep static codes and destinations understandable",
      paragraphs: [
        "Static means the printed data does not change. There is no hosted redirect to renew and no built-in scan limit, but a linked domain can still expire or a destination page can disappear. Keep ownership of that destination and preserve its address when moving a website. If you need to change the encoded data itself, make a new code and replace the old print.",
        "CSV batch export creates individual codes in a ZIP on this device. Review the input column names and inspect the outputs instead of treating a completed download as approval of every destination. An NFC content or NDEF download is a payload file, not proof that a physical chip has been programmed. Use a compatible writing app and test the finished NFC tag separately.",
      ],
    },
  ],
  comparison: [
    {
      name: "Adobe Express",
      detail: "Free static URL codes with no service expiry.",
      url: "https://www.adobe.com/express/feature/image/qr-code-generator",
    },
    {
      name: "QRCode Monkey",
      detail: "Static codes with several payloads and styling controls.",
      url: "https://www.qrcode-monkey.com/",
    },
  ],
  faqs: [
    {
      q: "Will my QR code expire?",
      a: "The symbol has no service expiry or scan quota. A linked website still needs to remain available, and credentials or contact details can become outdated.",
    },
    {
      q: "Can I add a logo without breaking the code?",
      a: "Keep it small and use the scan check after every change. Higher error correction is helpful, but it does not guarantee recovery from an arbitrary covered area.",
    },
    {
      q: "Why does the scan check pass but my phone struggles?",
      a: "The local decoder sees a clean digital image. A phone sees lighting, focus, material and viewing distance. Test the actual printed object with several phones.",
    },
    {
      q: "Can I track scans or edit a printed destination?",
      a: "This generator adds neither tracking nor a redirect service. You may update a page at your own URL, but changing the encoded address requires a new code.",
    },
    {
      q: "Which export should I send to a printer?",
      a: "Ask for the printer’s preferred format and final dimensions. SVG preserves vector geometry; PDF provides a measured tag page. Confirm the quiet border survives their layout.",
    },
    {
      q: "Are Wi-Fi passwords and contacts private here?",
      a: "They stay in this browser during editing. The exported code itself reveals its payload to anyone who scans it, so distribute it only to the intended audience.",
    },
  ],
  service: { label: "Make a printed sign or NFC tag with 3D3D", path: "/nfc-tags" },
} satisfies ToolGuide;
