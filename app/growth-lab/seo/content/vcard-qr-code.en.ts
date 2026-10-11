import type { ToolGuide } from "../guide";
export default {
  slug: "vcard-qr-code",
  locale: "en",
  name: "Free vCard QR Code Generator",
  headline: "A contact that is easy to keep.",
  description:
    "Create a free static vCard QR with your name, phone, email and website. Preview, scan-check and download locally without a contact hosting service.",
  answer:
    "Make a free vCard QR code so someone can add your details to an address book without retyping them. Your contact fields are encoded directly, and nothing is uploaded. Enter only information you intend to share, keep the card concise, and check the saved contact on a phone before printing.",
  steps: [
    "Enter the contact’s first and last name, then add the useful phone, email, company and website fields. Omit private details from a public business card.",
    "Review the generated vCard payload and scan result. Longer contact records need more QR modules and more physical space on a printed card.",
    "Scan the exported code with your target phones, open the contact preview and check each field before saving. Keep an editable draft for future reprints.",
  ],
  faqs: [
    {
      q: "Is a vCard QR a link to a hosted profile?",
      a: "No. This code contains the contact record itself. It has no hosted profile, scan limit or subscription redirect.",
    },
    {
      q: "Can I change a phone number on cards already printed?",
      a: "No. Print a new code after changing the contact. A website QR can point to a page you maintain, but that is a different workflow.",
    },
    {
      q: "Why does one phone save a field differently?",
      a: "Address-book applications interpret contact formats differently. Test the exported vCard on the devices your audience uses; MeCard is another available compact format.",
    },
    {
      q: "Can a vCard code work without a website?",
      a: "Yes. The name and contact fields are stored inside the QR. Following a website link in the saved contact still requires access to that destination.",
    },
    {
      q: "Why is my contact QR denser than a URL code?",
      a: "The full contact record can contain more characters than a short address. Omit unnecessary fields and allow enough printed space for the resulting module grid.",
    },
    {
      q: "Can I use the same contact in an NFC tag?",
      a: "You can export the relevant content and write it with a suitable NFC application. The browser does not program the physical chip; test the written tag separately.",
    },
  ],
  title: "Free vCard QR Generator for Contact Details | 3D3D",
  summary: "Put a concise contact record directly in a code for address-book import.",
  sections: [
    {
      heading: "Choose what belongs in a public contact",
      paragraphs: [
        "A contact record should make it easy to recognise the person and reach them through an appropriate channel. Start with the first and last name, a useful phone number and email address, then add a company or website when it helps. A public business card does not need a private home address or every number attached to the person. The QR carries the actual details, not a protected profile.",
        "Keep the record short enough to serve its purpose. Each additional field adds encoded data and can make the symbol denser. On a small card, a concise contact with a clear label can be more dependable than a full biography inside a tiny QR. Give the printed card a readable name and contact channel too, so it remains useful when the recipient cannot or prefers not to scan.",
      ],
    },
    {
      heading: "Test the saved record, not only the scan",
      paragraphs: [
        "A decoder can recover the exact vCard text while an address-book application still interprets a field differently from what you expected. Inspect the contact preview on the phones your audience uses. Confirm the separation of first and last names, the phone’s country code, the email and the website. Save a test contact, open it again and check that the useful fields landed in the right places.",
        "Use a consistent international phone format when the contact will travel beyond one region. Review accented names and punctuation in the exported payload. The editor offers vCard 3.0 and a compact MeCard option, but choosing another format is a compatibility decision, not a guarantee that all receiving apps behave alike. Keep a record of the devices you actually checked before ordering a large print batch.",
      ],
    },
    {
      heading: "Decide how future updates will work",
      paragraphs: [
        "A static contact is independent of a hosted profile service, which removes an account from the path between the card and its data. The tradeoff is that an old printed card cannot acquire a new phone number. When contact details change, update the draft and replace the card. If frequent changes are central to the job, a QR pointing to a maintained website may be a better fit.",
        "The business-card maker reuses the QR workflow and reserves room around the code in a two-sided layout. Check its final physical dimensions and try the scan through the coating or texture you will actually print. Exporting a contact code, writing an NFC tag and saving a phone contact are separate steps. Each should be checked with the appropriate device rather than inferred from a successful file download.",
      ],
    },
  ],
  comparison: [
    {
      name: "QRCode Monkey",
      detail: "Static vCard and MeCard choices alongside other payloads.",
      url: "https://www.qrcode-monkey.com/",
    },
  ],
  service: {
    label: "Request printed contact cards or NFC tags",
    path: "/quote",
  },
} satisfies ToolGuide;
