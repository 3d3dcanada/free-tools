import type { ToolGuide } from "../guide";
export default {
  slug: "compress-image",
  locale: "en",
  title: "Free Image Compressor, JPG PNG WebP AVIF | 3D3D",
  description:
    "Compress image batches locally and compare actual file sizes. Choose JPG, PNG, WebP or AVIF, adjust quality and download without uploading files.",
  name: "Free Image Compressor",
  headline: "Smaller files. A clear comparison.",
  summary: "Compare real bytes and visible quality before keeping a compressed image.",
  answer:
    "Compress images for free in your browser and compare the actual file size before downloading. Nothing is uploaded. Choose JPG, PNG, WebP or AVIF, adjust quality where the format supports it, and process a batch locally. Keep the original and inspect fine details because a smaller file can lose visible information.",
  steps: [
    "Choose a representative image or a batch of up to 20 files. Keep the total below 100 MB, each file below 40 MB and each image within 24 megapixels. Start with one image when trying an unfamiliar format.",
    "Select an output format suited to the destination. Use the quality slider for JPG, WebP or AVIF. PNG optimization keeps the rendered pixels lossless; its file size is not controlled by the lossy-quality slider.",
    "Run the batch and compare the reported input and output bytes. A larger result is labelled as larger. Inspect text, thin lines, gradients, faces and transparent edges at the size people will actually view.",
    "Download individual results or the batch ZIP. Open a downloaded file in the destination application before replacing an existing asset. Keep the original master so future revisions do not start from an already compressed copy.",
  ],
  sections: [
    {
      heading: "Choose a useful reduction target",
      paragraphs: [
        "The goal is a file that meets the destination’s limit while preserving the information its audience needs. An email attachment, product photo and interface screenshot have different tolerances for visible change. Begin with the required dimensions and upload limit, then compare a few quality settings. Do not keep lowering quality merely to obtain a larger percentage saving if the resulting image no longer communicates clearly.",
        "A pixel dimension and a byte count describe different things. Compression changes encoding; resizing changes the number of pixels. If a website displays a photo at a modest size, preparing appropriate dimensions may save more than aggressively compressing the camera original. Use the resize tool first when dimensions are the underlying problem, then inspect the compressed result at the intended display size.",
      ],
    },
    {
      heading: "Compare content-sensitive tradeoffs",
      paragraphs: [
        "Photographs often tolerate some lossy compression, while small lettering and sharp graphics can reveal halos or block artifacts quickly. Transparent artwork also needs a format that can carry alpha. JPEG flattens transparent areas onto the chosen background; PNG, WebP and AVIF offer different ways to retain them. The best result for one picture is not automatically the best setting for every file in a mixed batch.",
        "A quality number is an encoder setting, not a universal visual score shared by all formats. An AVIF setting and a JPEG setting with the same number should not be treated as equivalent evidence. Compare the actual decoded images and bytes instead. The first use of an optional codec downloads its same-origin static code; the image itself stays in the browser while the conversion runs.",
      ],
    },
    {
      heading: "Check the output rather than assuming a saving",
      paragraphs: [
        "Some originals are already efficiently compressed. Re-encoding them can produce a larger file, especially after switching formats or preserving information that an earlier file omitted. The results list reports this honestly instead of calling every conversion an improvement. If the output is larger or visibly worse, keep the original, try another format or reduce dimensions where the intended use permits it.",
        "PNG optimization applies to the image rendered by the browser. It is not a promise to preserve every source metadata field, colour profile or original byte sequence. For inspecting or removing metadata, use the separate SNITCH tool linked from the editor. Batch processing proceeds one image at a time to bound memory, but a phone can still struggle with very large inputs. Cancel and try a smaller batch if needed.",
      ],
    },
  ],
  comparison: [
    { name: "Squoosh", detail: "Local compression with visual comparison.", url: "https://squoosh.app/" },
  ],
  faqs: [
    {
      q: "Can I compress an image to exactly 100 KB?",
      a: "There is no guaranteed target-byte control. Adjust quality or dimensions, run again and compare the measured size until the result meets the destination’s limit.",
    },
    {
      q: "Will every output be smaller?",
      a: "No. Content, format and previous compression affect the result. The tool displays actual bytes and clearly reports when a file grows.",
    },
    {
      q: "Why is the quality slider unavailable for PNG?",
      a: "PNG optimization is lossless for the rendered pixels. A lossy quality percentage would imply a different operation; use dimensions or another format when further reduction is acceptable.",
    },
    {
      q: "Are my original photos replaced?",
      a: "No. Each download is a new file. Keep the originals and compare the result before manually replacing any asset in your own project.",
    },
    {
      q: "Can I keep transparency?",
      a: "Choose PNG, WebP or AVIF and inspect the output. JPEG has no alpha channel, so transparent areas are filled with the selected background colour.",
    },
    {
      q: "Why does a large batch take longer on my phone?",
      a: "Decoding and encoding use the phone’s processor and memory. Reduce the number or dimensions of the inputs; there is no remote processing service doing the work elsewhere.",
    },
  ],
  service: { label: "Build a useful website or software workflow with 3D3D", path: "/software-development" },
} satisfies ToolGuide;
