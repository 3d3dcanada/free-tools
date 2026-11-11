import DOMPurify from "dompurify";

/**
 * SVG a visitor's file can carry into the page (2026-11-11, security finding 16).
 *
 * Today that is one thing: an icon's inner markup in a deck or design file (`IconEl.paths`),
 * which the slide renders with `dangerouslySetInnerHTML`. The file is checked on import against
 * `ICON_MARKUP` below (refused whole when anything else is in it), and the markup is cleaned again
 * here every time it is drawn, so a draft that reached storage some other way is still inert.
 */

/** The SVG shapes an icon may use, and the only attributes they may carry (the icon library's own set). */
const SHAPES = ["path", "circle", "rect", "line", "polyline", "polygon", "ellipse"];
const ATTRS = ["d", "cx", "cy", "r", "rx", "ry", "x", "y", "x1", "y1", "x2", "y2", "width", "height", "points", "fill"];

/** Shapes with allowed attributes and plain values only: what the studio itself writes. */
export const ICON_MARKUP = new RegExp(
  `^(<(${SHAPES.join("|")})( (${ATTRS.join("|")})="[^"<>&]*")*\\/>)*$`,
);

/**
 * Icon markup made safe to draw. The studio's own markup passes the strict check untouched. Anything
 * else goes through DOMPurify inside an `<svg>` (so the shapes parse as SVG), keeping only the shapes
 * and attributes above: no script, no event handlers, no links, no `href` of any kind. With no DOM
 * (server render, Node tests) DOMPurify cannot run, so anything outside the strict check is dropped.
 */
export function cleanSvgFragment(markup: unknown): string {
  if (typeof markup !== "string" || markup.length > 20000) return "";
  if (ICON_MARKUP.test(markup)) return markup;
  if (typeof window === "undefined" || !DOMPurify.isSupported) return "";
  const clean = DOMPurify.sanitize(`<svg xmlns="http://www.w3.org/2000/svg">${markup}</svg>`, {
    ALLOWED_TAGS: ["svg", ...SHAPES],
    ALLOWED_ATTR: ATTRS,
    RETURN_DOM_FRAGMENT: true,
  });
  const svg = clean.firstElementChild;
  return svg?.tagName.toLowerCase() === "svg" ? svg.innerHTML : "";
}
