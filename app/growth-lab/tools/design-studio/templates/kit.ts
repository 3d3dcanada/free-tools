import { iconPaths, nodeToPaths } from "../../deck-studio/icons";
import {
  icon,
  image,
  qr,
  shape,
  text,
  type Background,
  type El,
  type IconEl,
  type ImageEl,
  type QrEl,
  type ShapeEl,
  type ShapeKind,
  type TextEl,
} from "../../deck-studio/model";

/*
 * Template building blocks. A template page is a function of the
 * page size, so every design is laid out for its format rather than
 * stretched: blocks anchor to the top or the bottom and photos take the
 * space between. Type uses the site's own Geist and Geist Mono only.
 */

export type Art = { els: El[]; bg?: Partial<Background> };
export type Page = (w: number, h: number) => Art;
export type Template = { id: string; name: string; theme: string; pages: Page[] };

type TO = Partial<TextEl>;

export const T = (x: number, y: number, w: number, h: number, value: string, o: TO = {}) => text(x, y, w, h, value, o);

/** Mono label: small caps, wide tracking, accent. */
export const kick = (size: number, o: TO = {}): TO => ({ font: "mono", size, weight: 600, upper: true, tracking: 0.2, lineHeight: 1.3, color: "theme:accent", ...o });
/** Display headline: heaviest weight, tight tracking. */
export const disp = (size: number, o: TO = {}): TO => ({ font: "heading", size, weight: 900, tracking: -0.045, lineHeight: 0.92, color: "theme:ink", ...o });
/** Secondary heading. */
export const head = (size: number, o: TO = {}): TO => ({ font: "heading", size, weight: 750, tracking: -0.02, lineHeight: 1.08, color: "theme:ink", ...o });
/** Running text. */
export const copy = (size: number, o: TO = {}): TO => ({ size, weight: 400, lineHeight: 1.42, color: "theme:muted", ...o });
/** Mono detail line. */
export const mono = (size: number, o: TO = {}): TO => ({ font: "mono", size, weight: 500, tracking: 0.04, lineHeight: 1.45, color: "theme:ink", ...o });

export const S = (x: number, y: number, w: number, h: number, kind: ShapeKind, o: Partial<ShapeEl> = {}) => shape(x, y, w, h, kind, o);
export const box = (x: number, y: number, w: number, h: number, fill = "theme:accent", o: Partial<ShapeEl> = {}) =>
  shape(x, y, w, h, "rect", { fill, ...o });
/** A photo frame. Empty, it shows a quiet mark; in a file it leaves whatever sits behind it. */
export const photo = (x: number, y: number, w: number, h: number, slot = "photo", o: Partial<ImageEl> = {}) =>
  image(x, y, w, h, "", { radius: 0, slot, ...o });
export const ico = (x: number, y: number, s: number, name: string, o: Partial<IconEl> = {}) => icon(x, y, s, name, iconPaths(name), o);
/** An icon outside the curated set, straight from its Lucide node. */
export const icoNode = (x: number, y: number, s: number, name: string, node: unknown, o: Partial<IconEl> = {}) =>
  icon(x, y, s, name, nodeToPaths(node as Parameters<typeof nodeToPaths>[0]), o);
export const code = (x: number, y: number, s: number, value: string, o: Partial<QrEl> = {}) => qr(x, y, s, value, o);
/** A pattern overlay: spacing in design units. */
export const pat = (x: number, y: number, w: number, h: number, kind: ShapeKind, spacing: number, o: Partial<ShapeEl> = {}) =>
  shape(x, y, w, h, kind, { radius: spacing, fill: "theme:accent", ...o });

/** Text that fills itself from the business card details: "{name}", "{phone}\n{email}". */
export const bound = (x: number, y: number, w: number, h: number, bind: string, o: TO = {}) =>
  text(x, y, w, h, "", { ...o, bind, slot: o.slot ?? bind.replace(/[{}\n]/g, "") });
