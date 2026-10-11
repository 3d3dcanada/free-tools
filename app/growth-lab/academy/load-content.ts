import { lessons } from "./curriculum";
import { loadReading } from "./depth";
import type { Locale } from "../seo/guide";
import type { Lesson, ReadingSection } from "./types";
import type { SupportGuide } from "./seo";
const french: Record<string, () => Promise<{ default: { lesson: Lesson; reading: ReadingSection[] } }>> = {
  "what-a-printer-does": () => import("./fr/what-a-printer-does"),
  "choose-a-printer": () => import("./fr/choose-a-printer"),
  "prepare-a-safe-workspace": () => import("./fr/prepare-a-safe-workspace"),
  "models-files-and-permission": () => import("./fr/models-files-and-permission"),
  "keep-a-print-log": () => import("./fr/keep-a-print-log"),
  "match-the-slicer-profile": () => import("./fr/match-the-slicer-profile"),
  "inspect-scale-and-placement": () => import("./fr/inspect-scale-and-placement"),
  "layers-walls-and-infill": () => import("./fr/layers-walls-and-infill"),
  "preview-before-printing": () => import("./fr/preview-before-printing"),
  "run-and-remove-a-first-print": () => import("./fr/run-and-remove-a-first-print"),
  "pla-for-learning": () => import("./fr/pla-for-learning"),
  "petg-for-practical-parts": () => import("./fr/petg-for-practical-parts"),
  "print-flexible-tpu": () => import("./fr/print-flexible-tpu"),
  "asa-and-the-workspace": () => import("./fr/asa-and-the-workspace"),
  "carbon-fibre-and-moisture": () => import("./fr/carbon-fibre-and-moisture"),
  "prepare-the-build-surface": () => import("./fr/prepare-the-build-surface"),
  "calibrate-in-order": () => import("./fr/calibrate-in-order"),
  "understand-flow-calibration": () => import("./fr/understand-flow-calibration"),
  "test-temperature-deliberately": () => import("./fr/test-temperature-deliberately"),
  "retraction-and-travel": () => import("./fr/retraction-and-travel"),
  "orient-for-the-job": () => import("./fr/orient-for-the-job"),
  "place-supports-deliberately": () => import("./fr/place-supports-deliberately"),
  "bridges-and-overhangs": () => import("./fr/bridges-and-overhangs"),
  "design-a-fit": () => import("./fr/design-a-fit"),
  "split-and-join-a-design": () => import("./fr/split-and-join-a-design"),
  "first-layer-not-sticking": () => import("./fr/first-layer-not-sticking"),
  "strings-between-features": () => import("./fr/strings-between-features"),
  "corners-lifting": () => import("./fr/corners-lifting"),
  "missing-material": () => import("./fr/missing-material"),
  "layers-shift-sideways": () => import("./fr/layers-shift-sideways"),
  "remove-supports-safely": () => import("./fr/remove-supports-safely"),
  "finish-a-surface": () => import("./fr/finish-a-surface"),
  "choose-a-fastener": () => import("./fr/choose-a-fastener"),
  "measure-and-accept-a-part": () => import("./fr/measure-and-accept-a-part"),
  "maintain-the-baseline": () => import("./fr/maintain-the-baseline"),
  "rights-before-selling": () => import("./fr/rights-before-selling"),
  "calculate-the-full-cost": () => import("./fr/calculate-the-full-cost"),
  "repeat-a-small-batch": () => import("./fr/repeat-a-small-batch"),
  "show-and-pack-the-real-part": () => import("./fr/show-and-pack-the-real-part"),
  "review-a-first-product": () => import("./fr/review-a-first-product"),
};
export async function loadAcademy(
  slug: string,
  locale: Locale,
): Promise<{ lesson?: Lesson; reading: ReadingSection[]; guide?: SupportGuide }> {
  const lesson = lessons.find((l) => l.slug === slug);
  if (!lesson) {
    const { default: guides } = await (locale === "fr" ? import("./support.fr") : import("./support.en"));
    return { lesson: undefined, reading: [], guide: guides[slug as keyof typeof guides] };
  }
  if (locale === "fr") return (await french[slug]()).default;
  return { lesson, reading: await loadReading(slug) };
}
