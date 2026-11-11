import { lessons, answerKeys, lessonPath } from "./curriculum";
import { academyCatalog } from "./catalog";
import { diagramAlt } from "./diagrams";
import { glossary } from "./reference";
import { keyTerms } from "./compose";
import { academySchema } from "./schema";
import { academyInfo } from "./metadata";
import { lessonFaq, type SupportGuide } from "./seo";
import type { AnswerKeys } from "./progress";
import type { Lesson, ReadingSection } from "./types";
import type { Locale } from "../seo/guide";

/**
 * What an academy page draws of the rest of the course, picked out in the loader (2026-11-11).
 * Every page used to ship all forty lessons, about 93 KB of text, for a course map and a link on.
 * Now a lesson page gets its unit's lessons and the ones either side; the course map and the aux
 * pages, which list every lesson, get the forty titles; every page gets the answer keys, because
 * the progress count covers the whole course. Call from loaders only.
 */
export type CourseEntry = { id: number; unit: number; slug: string; title: string; alt: string };
export type AcademyView = {
  course: CourseEntry[];
  keys: AnswerKeys;
  /** The glossary page only: for each term, the id of the first lesson whose text uses it. */
  taught: (number | null)[];
  jsonLd: ReturnType<typeof academySchema>;
};

let firstUse: (number | null)[] | undefined;
/** For each glossary entry (same order in both languages), the first lesson whose own text uses it. */
const termLessons = () =>
  (firstUse ??= glossary.map(
    (entry) =>
      lessons.find((l) => keyTerms([l.title, l.learn, l.summary, ...l.steps, ...l.mistakes].join(" "), [entry]).length)
        ?.id ?? null,
  ));

export function academyView(
  path: string,
  locale: Locale,
  content: { lesson?: Lesson; reading: ReadingSection[]; guide?: SupportGuide },
): AcademyView {
  const { lesson, reading, guide } = content;
  const current = lesson ?? (locale === "en" ? lessons.find((l) => lessonPath(l) === path) : undefined);
  const drawn = current
    ? academyCatalog.filter((l) => l.unit === current.unit || Math.abs(l.id - current.id) === 1)
    : academyCatalog;
  return {
    course: drawn.map((l) => ({ id: l.id, unit: l.unit, slug: l.slug, title: l.title[locale], alt: diagramAlt(l.id, locale) })),
    keys: answerKeys(),
    taught: path.endsWith("/glossary") ? termLessons() : [],
    jsonLd: academySchema(path, academyInfo(path, locale), reading, {
      locale,
      lesson: current,
      faqs: current ? lessonFaq(current, locale) : guide?.faqs,
    }),
  };
}
