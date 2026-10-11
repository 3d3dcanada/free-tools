import {
  QrCode, Wifi, Contact, CalendarDays, Presentation, Newspaper, Image, Crop, Scaling, Shapes, FileImage,
  ImageMinus, SquareRoundCorner, Images, FileStack, Scissors, ArrowDownUp, FileOutput, Stamp, FileText,
  Receipt, ReceiptText, Box, Calculator, Ruler, Layers, Spool, WandSparkles, IdCard, Megaphone, Repeat,
  Sparkles, SquareUser,
} from "lucide";

type Node = [string, Record<string, string | number>][];
const ICONS: Record<string, Node> = {
  "qr-code": QrCode, "wifi-qr-code": Wifi, "vcard-qr-code": Contact, "calendar-qr-code": CalendarDays,
  "pitch-deck": Presentation, "flyer-maker": Newspaper, "poster-maker": Megaphone, "social-image-maker": SquareUser,
  "business-card": IdCard, "compress-image": ImageMinus, "convert-image": Repeat, "png-to-webp": Repeat,
  "svg-to-png": Shapes, "heic-to-jpg": FileImage, "resize-image": Scaling, "crop-image": Crop,
  "rounded-image": SquareRoundCorner, "favicon-generator": Sparkles, "remove-background": WandSparkles,
  "images-to-pdf": Images, "jpg-to-pdf": Images, "merge-pdf": FileStack, "split-pdf": Scissors,
  "organize-pdf": ArrowDownUp, "pdf-to-image": FileOutput, "pdf-to-jpg": FileOutput, "stamp-pdf": Stamp,
  "invoice-generator": FileText, "quote-generator": ReceiptText, "receipt-generator": Receipt,
  "model-viewer": Box, "print-cost-calculator": Calculator, "filament-calculator": Spool,
  "tolerance-calculator": Ruler, "nozzle-layer-guide": Layers, "unit-converter": Repeat,
} as unknown as Record<string, Node>;

/** A small neon tile with the tool's icon (decorative; the name sits beside it). */
export function ToolIcon({ slug }: { slug: string }) {
  const node = ICONS[slug] ?? (Image as unknown as Node);
  return (
    <span className="tool-icon" aria-hidden="true">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        {node.map(([tag, attrs], i) => {
          const Tag = tag as "path";
          return <Tag key={i} {...(attrs as Record<string, string>)} />;
        })}
      </svg>
    </span>
  );
}
