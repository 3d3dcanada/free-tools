import type { ToolGuide } from "../guide";
export default {
  slug: "social-image-maker",
  locale: "en",
  title: "Free Social Image Maker, Posts & Banners | 3D3D",
  description:
    "Create posts, stories, covers, banners and thumbnails in 11 sizes with 13 templates and your photos. PNG or JPG at exact pixels, free, nothing uploaded.",
  name: "Free Social Image Maker",
  headline: "One clear idea for a small screen.",
  summary: "Prepare social graphics in useful pixel formats and keep the files.",
  answer:
    "Make free social images in your browser without uploading your text or photos. Start with a 1080 by 1080 square, choose one of 13 templates and switch to a story, post, cover, banner or thumbnail: every template has its own tall and wide layout. Download PNG or JPG at the exact pixel size. Review the destination’s current crop and interface overlays before publishing the image yourself.",
  steps: [
    "Choose the intended pixel format before writing the final copy. The square post preset is selected initially. Story, cover, banner and thumbnail shapes have different space for a headline, supporting text and image, so review each adaptation separately.",
    "Select a template and replace all sample wording. Lead with one message, then add only the detail that belongs in the graphic. Keep longer explanations in the accompanying post text you will prepare in the publishing platform.",
    "Drop your own photo onto a photo frame. Check contrast and the subject’s crop, then review the result at a phone-like size. If you include a QR, also provide a practical destination in the accompanying text or profile workflow.",
    "Download a PNG or JPG and inspect its dimensions and readability. Preview it in the actual destination before publishing, checking cropped edges and overlays. Keep the design file and save separately named variants when preparing several formats.",
  ],
  sections: [
    {
      heading: "Treat each shape as a separate composition",
      paragraphs: [
        "The studio includes an Instagram square (1080 by 1080) and portrait (1080 by 1350), a 1080 by 1920 story, a Facebook post (1200 by 630) and cover (1640 by 624), a LinkedIn post (1200 by 627) and banner (1584 by 396), an X post (1600 by 900) and header (1500 by 500), a 1280 by 720 YouTube thumbnail and a 1200 by 630 Open Graph image. These are output presets, not a promise that every platform currently displays the whole image in every context. Feeds, profile views and devices can crop or cover different areas. Check the destination’s own preview with your actual content.",
        "A narrow banner cannot carry the same paragraph as a tall story without losing clarity. Rewrite for the available space instead of shrinking all the words. Keep the core idea consistent across versions, while choosing a shorter headline or removing secondary details where needed. The shared templates adapt their layout, but they do not decide which part of your message should be removed for a particular audience.",
      ],
    },
    {
      heading: "Make the graphic and caption work together",
      paragraphs: [
        "A social image is often seen at a small size. Give the headline a simple task and let the accompanying caption explain dates, qualifications, links or longer context. Do not bury essential information only in a tiny line inside the picture. Prepare descriptive alternative text in the destination where it is supported; the image file itself does not carry it.",
        "Use your own real photographs or artwork you are allowed to publish. An image should support the claim in the post rather than imply a product, customer or outcome you cannot substantiate. Inspect the focal subject after changing size. A face, label or important part can disappear in a wide crop even though the original square version looked correct. Keep the source photo so you can revise the composition.",
      ],
    },
    {
      heading: "Prepare delivery files without assuming publication",
      paragraphs: [
        "The PNG and JPG exports use the selected size’s exact pixel dimensions. They are local files, not scheduled or published posts. Save each format with a clear name and keep its matching caption or destination reference in your own workflow. If another service compresses or crops the upload, inspect the final preview rather than assuming the downloaded artwork is exactly what every viewer will see.",
        "A static QR can connect a graphic to a destination, but someone viewing the image on the same phone may prefer a tappable link supplied by the platform. Use the code only where it helps the actual viewing situation, and keep a readable alternative. The tool does not collect scans, connect social accounts or track engagement. Save the design file before clearing browser storage so later changes do not require rebuilding the design from a flattened image.",
      ],
    },
  ],
  comparison: [
    {
      name: "Adobe Express",
      detail: "Offers social templates and a broader asset library.",
      url: "https://www.adobe.com/express/create/post/social-media",
    },
  ],
  faqs: [
    {
      q: "Which dimensions are selected initially?",
      a: "The page starts with a 1080 by 1080 pixel square. Ten other sizes cover portrait posts, stories, Facebook, LinkedIn and X posts and covers, a YouTube thumbnail and an Open Graph link image.",
    },
    {
      q: "Are these guaranteed current platform requirements?",
      a: "They are useful output presets. Confirm the destination’s current accepted dimensions, crop and overlays in its own preview before publishing.",
    },
    {
      q: "Will changing size preserve every line of text?",
      a: "Yes. The template is redrawn for the new shape and your words and photos move into it. The space changes, so review and shorten the wording for each shape.",
    },
    {
      q: "Can the image carry alt text?",
      a: "No. Enter appropriate alternative text in the platform’s own field when you publish, and keep essential information in accessible accompanying text.",
    },
    {
      q: "Can this schedule or publish the post?",
      a: "No. It creates local artwork. You control the account, caption, destination preview and publication through your own workflow.",
    },
    {
      q: "Can I reopen the design later?",
      a: "Keep the design file and open it here when needed. PNG and JPG are flattened delivery images, while the design file keeps every element editable.",
    },
  ],
  service: { label: "Build a destination website with 3D3D", path: "/software-development" },
} satisfies ToolGuide;
