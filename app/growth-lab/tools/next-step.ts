import { localizedPath, type Locale } from "../seo/guide";
import { sitePath } from "../seo/site-links";
import { categoryFor } from "./navigation";

/**
 * One quiet next step per tool category, shown under the result after the tool
 * was used (the "Did this help?" card, shared/DidThisHelp.tsx). One plain text
 * link, never a button row, never a popup. Copy is plain, no hype.
 */
const STEPS: Record<string, { text: string; path: string }> = {
  "QR and Contacts": { text: "Need NFC keychains or cards with this on them? We make those.", path: "/nfc-tags" },
  Business: { text: "Need NFC keychains or cards with this on them? We make those.", path: "/nfc-tags" },
  Design: { text: "Want it printed or made in 3D?", path: "/quote" },
  "3D Printing": { text: "Want us to print it?", path: "/quote" },
  Images: { text: "More free tools", path: "/tools" },
  "PDF Documents": { text: "More free tools", path: "/tools" },
};

/** The next-step link for a tool: its category's line, localized to the right site page. */
export function nextStepFor(slug: string, locale: Locale): { text: string; href: string } {
  const step = STEPS[categoryFor(slug)] ?? STEPS.Images;
  return {
    text: step.text,
    href: step.path === "/tools" ? localizedPath("/tools", locale) : sitePath(step.path, locale),
  };
}
