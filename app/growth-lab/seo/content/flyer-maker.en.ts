import type { ToolGuide } from "../guide";
export default {
  slug: "flyer-maker",
  locale: "en",
  title: "Free Flyer Maker with Print PDF Export | 3D3D",
  description:
    "Design a free Letter, A4, A5 or half-letter flyer on a canvas with 13 templates and your photos. Print PDF with bleed, PNG or SVG, nothing uploaded.",
  name: "Free Flyer Maker",
  headline: "One page. A clear invitation.",
  summary: "Design a handout on a canvas with your words, photos and a QR code.",
  answer:
    "Make a free flyer on a full design canvas: pick one of 13 templates, change the words on the page, drop in your own photo, then download a print PDF with 3 mm bleed and crop marks, a PNG or an SVG. Nothing is uploaded. Choose Letter, A4, A5 or half letter first, and keep words inside the dashed safe line shown on the page.",
  steps: [
    "Choose a paper size and one of the 13 templates that gives your main message enough room. An event announcement needs the event, date, venue and action; a business handout needs the offer, relevant detail and a way to respond.",
    "Click any text on the page to change it, or fill in the words panel. Drop your own photo onto a photo frame and check the crop and the amount of detail at the intended print size. Use the theme and colour controls to keep the text and its background clearly separated.",
    "Add a QR code if it shortens the next step. Keep a readable contact or address beside it so the handout still works without a camera. Open Export to see anything that may print badly before you download.",
    "The print PDF adds 3 mm of bleed and crop marks. Download it, confirm the page dimensions with the printer and print one proof. Check dates, contact details, legibility and the real QR before making the final quantity.",
  ],
  sections: [
    {
      heading: "Write for a person holding the page",
      paragraphs: [
        "A flyer has a brief opportunity to answer three questions: what is this, why does it matter to me, and what should I do next? Give the headline a specific job rather than filling the top with a slogan that needs explanation. Supporting details should remove the reader’s immediate uncertainty. For an event, a beautiful photograph is less useful than a missing location or an unclear date.",
        "Keep one main invitation. A short address, phone number or registration link can support the QR, while a long list of competing actions makes the page harder to use. Read the copy aloud to catch awkward phrasing and ask someone unfamiliar with the project to identify the next step. Replace sample text everywhere, including small labels that are easy to overlook after concentrating on the headline.",
      ],
    },
    {
      heading: "Use the page size as a design constraint",
      paragraphs: [
        "A4 and Letter are close in size but are not interchangeable physical formats. Select the one your printer and distribution method require. A5 and half-letter handouts give less space for text, so shorten the message rather than shrinking everything until it becomes uncomfortable to read. The poster and social image studios share this canvas, but those jobs deserve their own composition and review.",
        "Bleed extends artwork beyond the final cut. It is useful when a background must reach the edge despite normal trimming variation; colour blocks and photos that touch the edge of the page run on into the bleed automatically. Important words and QR borders belong inside the finished page, away from the cut. Crop marks indicate where trimming occurs; some printers want them and others add their own. Ask for the production requirements before treating a downloadable PDF as approval for a print run.",
      ],
    },
    {
      heading: "Review both the message and the file",
      paragraphs: [
        "The page you edit is the page you print, with the same fonts, line breaks and crop. Before you download, the export panel lists anything that may print badly, such as words outside the safe line, empty photo frames, photos that will print soft or a QR code that is too small. A higher-resolution export cannot correct weak source photography, a spelling mistake or a QR destination that points to an unfinished page. Review those decisions separately from the file’s technical properties.",
        "The print PDF holds RGB artwork rendered at 300 DPI at the page’s physical size; it is not a custom press profile or a contract colour proof. Ask a commercial printer how they handle colour conversion. Keep the design file and the original photo in your own records so a future event update does not require rebuilding the flyer. Downloaded output files do not change the original image on your device.",
      ],
    },
  ],
  comparison: [
    {
      name: "Canva",
      detail: "Flyer templates with free and premium assets.",
      url: "https://www.canva.com/create/flyers/",
    },
  ],
  faqs: [
    {
      q: "Can I make a flyer without a watermark?",
      a: "Yes. The templates and exports are free, and the tool adds no watermark. You remain responsible for permission to use your images and wording.",
    },
    {
      q: "Can I print on Letter, A4 or A5?",
      a: "Yes. Choose the paper size first; changing it later redraws the template for the new page and keeps your words and photos. The PDF carries measured trim and bleed boxes; print at actual size.",
    },
    {
      q: "What does the export panel check?",
      a: "It lists anything that may print badly: words outside the safe line, empty photo frames, photos under 150 DPI at their printed size, and small or pale QR codes. It does not block the download; you decide.",
    },
    {
      q: "Is the PNG suitable for every print job?",
      a: "It has the selected output dimensions, but your printer may prefer a PDF. Use the requested format and inspect source-image quality at the final size.",
    },
    {
      q: "Does the flyer QR expire?",
      a: "The QR contains a static destination without a subscription redirect. The website it names must remain online, and printed codes cannot change their encoded address.",
    },
    {
      q: "Can I return to edit next week?",
      a: "The draft is saved in this browser when local storage is available. Save the design file as well; clearing browser data or using another device will not carry the draft across.",
    },
  ],
  service: { label: "Ask 3D3D about printed materials", path: "/quote" },
} satisfies ToolGuide;
