import type { ToolGuide } from "../guide";
export default {
  slug: "business-card",
  locale: "en",
  title: "Free Business Card Maker, Front & Back PDF | 3D3D",
  description:
    "Design both sides of a business card with 17 templates, your details and a vCard QR. Print PDF with bleed, or a 10-up sheet. No signup or uploads.",
  name: "Free Business Card Maker",
  headline: "Make a good introduction.",
  summary: "Design two faces, add a contact QR and prepare a measured print PDF.",
  answer:
    "Design a free business card with a front and a back, your own details and a website or contact QR code. Nothing is uploaded. Choose US or European dimensions, pick one of 17 styles, and download a two-page print PDF with bleed and crop marks or a sheet of ten cards with cut marks. Check a printed sample before ordering a full set.",
  steps: [
    "Choose 3.5 by 2 inches or 85 by 55 millimetres before adding content. Select one of the 17 templates and decide what belongs on the front and what the back should help the recipient do.",
    "Enter the name, role, business and useful contact details once; they fill both sides of every template. Drop in a logo or photo where you want it. Prefer one dependable contact channel over a crowded list of services, social handles and numbers that will soon become outdated.",
    "Choose whether the QR code holds your website or your contact card, then check both sides. The export panel warns when words sit outside the safe line or the code is too small or too pale to scan.",
    "Export the print PDF and verify that it contains two pages in the right order, or the 10-up sheet for a home or copy-shop printer. Confirm the trim, bleed, duplex orientation and crop-mark requirements with the printer, then approve a physical proof after testing the QR.",
  ],
  sections: [
    {
      heading: "Give each side a useful role",
      paragraphs: [
        "A card introduces a person and gives the recipient a practical way to reconnect. The front can establish the name and business, while the back offers contact details or a useful destination. Do not repeat every element on both sides simply because space is available. Decide which information someone needs immediately and which can live on the linked page or in the saved contact.",
        "Names and company titles vary in length. A sample that looks balanced with a short name may need a different layout for a long one. Review the actual text, including accented characters and punctuation, on both sides. If a long name crowds a style, shorten it or choose another template; every template redraws with your details, so comparing them takes one click.",
      ],
    },
    {
      heading: "Choose the right QR for the relationship",
      paragraphs: [
        "A website QR opens a page where you can maintain current information. A vCard QR places the contact fields directly inside the symbol, which can be convenient when a person wants to save a name and phone number. The contact code does not depend on a hosted profile, but printed phone numbers and email addresses cannot update themselves after a change. Pick the option that fits how the card will be used.",
        "Leave a clear border around the symbol and keep its printed size large enough for the data it contains. A vCard with many fields can be denser than a short website URL. Test the exported code and the physical card, including the finished coating or texture. The local decoder confirms a clean image; the final material and recipient’s camera determine the real interaction.",
      ],
    },
    {
      heading: "Prepare the printer handoff",
      paragraphs: [
        "Trim is the final card size. Bleed is artwork extending beyond that edge to tolerate normal cutting variation. The safe area keeps important text away from the cut, while crop marks help identify the trim. These are related but different boundaries. Ask the printer for their requirements, especially when they impose several cards on a larger sheet or request files without marks.",
        "The print PDF has the two faces as two pages. The 10-up sheet places ten cards, two across and five down, on Letter for 3.5 by 2 inch cards or A4 for 85 by 55 mm cards, with cut marks and the backs on the second page. Front-to-back alignment and flipping direction depend on the printer’s duplex workflow, and the sheet has no bleed between cards, so cut on the marks. The output is RGB, so colour conversion is another production decision to confirm. Keep the design file, original logo and approved proof together.",
      ],
    },
  ],
  comparison: [
    {
      name: "Adobe Express",
      detail: "Business-card templates within a broader design editor.",
      url: "https://www.adobe.com/express/create/business-card",
    },
  ],
  faqs: [
    {
      q: "Can I design both sides for free?",
      a: "Yes. All 17 templates include front and back editing, and the print PDF has two pages. There is no paid export tier or added watermark.",
    },
    {
      q: "Which business-card size should I use?",
      a: "Choose the size your printer and audience expect: 3.5 by 2 inches or 85 by 55 millimetres. They have different proportions, so review the design after switching.",
    },
    {
      q: "What does the export panel check?",
      a: "It warns when words sit outside the safe line, a photo frame is empty, a photo will print soft or the QR code is small or pale. It does not block the download.",
    },
    {
      q: "Can I change a printed vCard later?",
      a: "No. The contact data is inside the printed symbol. Update the draft and print a new card, or use a website destination whose page you maintain.",
    },
    {
      q: "Is this a sheet of cards ready for my home printer?",
      a: "Use the 10-up sheet: ten cards on Letter (A4 for 85 by 55 mm), fronts on page one and backs on page two, with cut marks. Print one double-sided test, flipping on the long edge, and check the alignment before a full run.",
    },
    {
      q: "Does the PDF guarantee a perfect physical card?",
      a: "No. It provides measured page boxes and checked layout. Paper, finishing, colour conversion, trimming and phone scanning still require a real production sample.",
    },
  ],
  service: { label: "Want them printed, or 3D-printed? 3D3D makes both", path: "/quote" },
} satisfies ToolGuide;
