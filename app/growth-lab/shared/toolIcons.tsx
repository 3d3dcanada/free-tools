import {
  QrCode, Wifi, Contact, CalendarDays, Presentation, Newspaper, Megaphone, Share2, IdCard, Shrink, RefreshCw,
  Crop, AppWindow, Smartphone, Globe, WandSparkles, Scaling, SquareRoundCorner, PenTool, Images, FileImage,
  Merge, ArrowDownUp, ImageDown, FileOutput, Scissors, Stamp, FileText, FileSignature, Receipt, Rotate3d,
  Calculator, Spool, RulerDimensionLine, Layers, ArrowRightLeft, ScanLine, Palette, Image, Files, Briefcase,
  Box, ShieldCheck, GraduationCap, Hammer, Search,
} from "lucide";

/**
 * One icon system for the free tools (2026-11-11, after the owner called the drawn previews clip
 * art): a lucide glyph per tool and per family, shown as an app tile in the family's neon. The
 * tile is drawn by `.app-icon` (module.css on tool pages, app.css on the home band).
 */
type Node = [string, Record<string, string | number>][];
const TOOL: Record<string, Node> = {
  "qr-code": QrCode, "wifi-qr-code": Wifi, "vcard-qr-code": Contact, "calendar-qr-code": CalendarDays,
  "pitch-deck": Presentation, "flyer-maker": Newspaper, "poster-maker": Megaphone, "social-image-maker": Share2,
  "business-card": IdCard, "compress-image": Shrink, "convert-image": RefreshCw, "crop-image": Crop,
  "favicon-generator": AppWindow, "heic-to-jpg": Smartphone, "png-to-webp": Globe, "remove-background": WandSparkles,
  "resize-image": Scaling, "rounded-image": SquareRoundCorner, "svg-to-png": PenTool,
  "images-to-pdf": Images, "jpg-to-pdf": FileImage, "merge-pdf": Merge, "organize-pdf": ArrowDownUp,
  "pdf-to-image": ImageDown, "pdf-to-jpg": FileOutput, "split-pdf": Scissors, "stamp-pdf": Stamp,
  "invoice-generator": FileText, "quote-generator": FileSignature, "receipt-generator": Receipt,
  "model-viewer": Rotate3d, "print-cost-calculator": Calculator, "filament-calculator": Spool,
  "tolerance-calculator": RulerDimensionLine, "nozzle-layer-guide": Layers, "unit-converter": ArrowRightLeft,
} as unknown as Record<string, Node>;
const CATEGORY: Record<string, Node> = {
  "QR and Contacts": ScanLine, Design: Palette, Images: Image, "PDF Documents": Files, Business: Briefcase,
  "3D Printing": Box, "Privacy and Credit": ShieldCheck, "Learn and Explore": GraduationCap, "Built to order": Hammer,
} as unknown as Record<string, Node>;

/** The family colours, the same ones TOOL_FAMILIES carries. */
export const CATEGORY_ACCENT: Record<string, string> = {
  "QR and Contacts": "#04D9C4",
  Design: "#FF2D92",
  Images: "#04D9C4",
  "PDF Documents": "#FF6A00",
  Business: "#18E36B",
  "3D Printing": "#FF6A00",
};

/**
 * The name under a tile, two lines at most in a four-column grid at 390 px. Each one is a piece
 * of the tool's own name (scripts/audit/tools-hub.test.mts checks), so the visible words stay
 * inside the link's accessible name.
 */
const LABEL: Record<string, [string, string]> = {
  "business-card": ["Business Card", "Cartes de visite"],
  "calendar-qr-code": ["Calendar Event QR", "QR d’événement"],
  "compress-image": ["Image Compressor", "Compresseur d’images"],
  "convert-image": ["Image Converter", "Convertisseur d’images"],
  "crop-image": ["Image Cropper", "Recadrage d’images"],
  "favicon-generator": ["Favicon Generator", "Favicon"],
  "filament-calculator": ["Filament Calculator", "Calculateur de filament"],
  "flyer-maker": ["Flyer Maker", "Dépliants"],
  "heic-to-jpg": ["HEIC to JPG", "HEIC en JPG"],
  "images-to-pdf": ["Images to PDF", "Images en PDF"],
  "invoice-generator": ["Invoice Generator", "Factures"],
  "jpg-to-pdf": ["JPG to PDF", "JPG en PDF"],
  "merge-pdf": ["Merge PDF", "Fusionner des PDF"],
  "model-viewer": ["STL, OBJ and 3MF Viewer", "Visionneuse STL, OBJ et 3MF"],
  "nozzle-layer-guide": ["Layer Height Guide", "Hauteur de couche"],
  "organize-pdf": ["Organize PDF", "Organiser les pages"],
  "pdf-to-image": ["Pages to Images", "Pages PDF en images"],
  "pdf-to-jpg": ["PDF to JPG", "PDF en JPG"],
  "pitch-deck": ["Pitch Deck", "Présentations"],
  "png-to-webp": ["PNG to WebP", "PNG en WebP"],
  "poster-maker": ["Poster Maker", "Affiches"],
  "print-cost-calculator": ["Print Cost Calculator", "Coût d’impression 3D"],
  "qr-code": ["QR Code", "Code QR"],
  "quote-generator": ["Quote Generator", "Devis"],
  "receipt-generator": ["Receipt Generator", "Reçus"],
  "remove-background": ["Background Remover", "Supprimer l’arrière-plan"],
  "resize-image": ["Image Resizer", "Redimensionnement"],
  "rounded-image": ["Round Image Corners", "Arrondir les coins"],
  "social-image-maker": ["Social Image Maker", "Visuels sociaux"],
  "split-pdf": ["Split PDF", "Diviser un PDF"],
  "stamp-pdf": ["Page Numbers", "Numéros et marques"],
  "svg-to-png": ["SVG to PNG", "SVG en PNG"],
  "tolerance-calculator": ["FDM Fit Calculator", "Ajustement FDM"],
  "unit-converter": ["Unit Converter", "Convertisseur d’unités"],
  "vcard-qr-code": ["vCard QR Code", "QR vCard"],
  "wifi-qr-code": ["Wi-Fi QR Code", "QR Wi-Fi"],
};
export const ICON_SLUGS = Object.keys(TOOL);
export const toolLabel = (slug: string, locale: "en" | "fr" = "en") => LABEL[slug]?.[locale === "fr" ? 1 : 0] ?? slug;

function Glyph({ node }: { node: Node }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" focusable="false">
      {node.map(([tag, attrs], i) => {
        const Tag = tag as "path";
        return <Tag key={i} {...(attrs as Record<string, string>)} />;
      })}
    </svg>
  );
}

/** A small neon tile with the tool's icon (decorative; the name sits beside it). */
export function ToolIcon({ slug }: { slug: string }) {
  return (
    <span className="tool-icon" aria-hidden="true">
      <Glyph node={TOOL[slug] ?? (Image as unknown as Node)} />
    </span>
  );
}

/** The launcher tile: solid family neon, ink glyph. Decorative; the link carries the name. */
export function AppIcon({ slug, category }: { slug?: string; category?: string }) {
  const node = (slug && TOOL[slug]) || (category && CATEGORY[category]) || (Image as unknown as Node);
  return (
    <span className="app-icon" aria-hidden="true">
      <Glyph node={node} />
    </span>
  );
}

/**
 * A launcher entry: the tile and its short label. The label is hidden from assistive tech and the
 * tool's full name (and line, where one was shown before) is read instead, so every link keeps
 * the accessible name it had as a row.
 */
export function AppTile({ slug, href, name, summary, locale = "en" }: { slug: string; href: string; name: string; summary?: string; locale?: "en" | "fr" }) {
  return (
    <a className="app-tile" href={href}>
      <AppIcon slug={slug} />
      <span className="app-tile-name" aria-hidden="true">{toolLabel(slug, locale)}</span>
      <span className="sr-only">
        {name}
        {summary ? ` ${summary}` : ""}
      </span>
    </a>
  );
}

/** The search field's glyph, from the same set. */
export function SearchGlyph() {
  return <Glyph node={Search as unknown as Node} />;
}
