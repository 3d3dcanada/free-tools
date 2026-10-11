import type { ToolGuide } from "../guide";
export default {
  slug: "favicon-generator",
  locale: "en",
  title: "Free Favicon Generator, ICO PNG & Manifest | 3D3D",
  description:
    "Turn an image into nine PNG icon sizes, a multi-size ICO and site.webmanifest. Download a free local ZIP with installation notes. No upload.",
  name: "Free Favicon Generator",
  headline: "A small mark, everywhere it belongs.",
  summary: "Package a master image into icon files and a starter web manifest.",
  answer:
    "Generate a free favicon package from your own image without uploading it. The local ZIP contains nine PNG sizes, a multi-size ICO, a web manifest and installation notes. The full image is fitted with transparent padding, so choose a simple, recognisable source and inspect the smallest icon before installing the package.",
  steps: [
    "Choose a clear master image, ideally with a square composition and a simple silhouette. Remove unnecessary surrounding space with the crop tool first. A long wordmark or detailed photograph may become unreadable in a tiny browser tab.",
    "Run the generator and download the ZIP for that image. The package contains PNG files at 16, 32, 48, 64, 128, 180, 192, 256 and 512 pixels, plus ICO, manifest and installation instructions.",
    "Inspect the 16-pixel and 32-pixel versions at their real size. Check light and dark surroundings, transparent edges and the space around the mark. Adjust the source artwork and regenerate if the small version loses its identity.",
    "Update the site name and settings in the manifest, copy the files into your own website project and add the documented link elements. Verify the file URLs and the actual browser display after the site owner publishes the change.",
  ],
  sections: [
    {
      heading: "Design for a tiny square",
      paragraphs: [
        "A favicon often appears where there is little room for detail. Begin with the element that makes the site recognisable: a strong shape, a short monogram or another simple mark you have permission to use. Do not assume a full horizontal logo becomes an effective icon just because it can be resized. The generator preserves the whole source, which can leave a wide logo very small within the square.",
        "Prepare a separate icon composition when necessary. A square crop should retain the meaningful shape without clipping it at the edges. If the mark contains lettering, inspect whether the smallest rendered version still looks intentional rather than like a blurred patch. Large previews are useful for checking the source, but the tiny output is the important design test for a browser tab.",
      ],
    },
    {
      heading: "Understand what the package provides",
      paragraphs: [
        "Each source produces its own ZIP, so a batch of separate brands or projects does not merge them into one confusing icon set. The ICO contains several embedded PNG resolutions, while the individual PNG files can be referenced directly. Transparent padding keeps the source proportions. The package does not automatically redesign the mark, generate a vector master or create a distinct composition for every icon size.",
        "The manifest is a starter file with placeholder site names and ordinary icon entries. Replace those values and review the start URL and display choice before installation. The icons are marked for general use, not claimed as purpose-built maskable artwork. If your application needs a maskable icon, design and test that safe area separately instead of relabelling a padded square and assuming it is suitable.",
      ],
    },
    {
      heading: "Install and verify in the actual website",
      paragraphs: [
        "The included instructions show the icon, Apple touch icon and manifest link elements. Paths must match where the files are served in your project. A site deployed beneath a subdirectory may need different paths from the root-level example. Open the resulting URLs directly and check that they return images or the manifest, rather than a fallback HTML page or an inaccessible development path.",
        "A ZIP download changes nothing on a live website. The site owner still needs to integrate and publish the files through the normal workflow. Check the browser tab, bookmarks and relevant device presentation afterward. Keep the original artwork and generated package with the website source so another maintainer can reproduce the set. A successful icon export is evidence about files, not proof of installation on every device.",
      ],
    },
  ],
  comparison: [
    {
      name: "Favicon.io",
      detail: "Favicon creation and HTML installation references.",
      url: "https://favicon.io/",
    },
  ],
  faqs: [
    {
      q: "Which files are in the favicon ZIP?",
      a: "Nine PNG sizes from 16 to 512 pixels, a multi-size favicon.ico, site.webmanifest and README.txt. Each input image receives its own package.",
    },
    {
      q: "Why does my wide logo look tiny?",
      a: "The generator fits the complete image inside a square without cropping. Prepare a square icon composition or crop unnecessary whitespace before generating the set.",
    },
    {
      q: "Can I use a transparent source?",
      a: "Yes. PNG outputs retain transparency and add transparent padding where required. Inspect the mark on different background colours so important details remain visible.",
    },
    {
      q: "Is the generated manifest ready to publish unchanged?",
      a: "Replace the placeholder names and review its URLs and display settings first. The file is a starting package, not a complete application-installation configuration for every site.",
    },
    {
      q: "Are these maskable icons?",
      a: "The manifest uses the general-purpose any value. A maskable icon requires artwork designed for that safe area; this generator does not make that claim automatically.",
    },
    {
      q: "Does downloading the ZIP update my website?",
      a: "No. Copy the files into the site project, add the appropriate links and use the owner’s publication workflow. Then test the served files and device presentation.",
    },
  ],
  service: { label: "Discuss your website with 3D3D", path: "/software-development" },
  sources: [
    {
      label: "MDN: web manifest icon paths, sizes and purpose",
      url: "https://developer.mozilla.org/en-US/docs/Web/Progressive_web_apps/Manifest/Reference/icons",
    },
  ],
} satisfies ToolGuide;
