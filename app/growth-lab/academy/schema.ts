import { ACADEMY_PATH, lessons, lessonPath } from "./curriculum";
import { units, type Lesson, type ReadingSection } from "./types";
import { sources } from "./sources";
import { academyCatalog } from "./catalog";
import { localizedPath, type Locale } from "../seo/guide";
import { sitePath } from "../seo/site-links";
import { units as frenchUnits } from "./reference.fr";
import { lessonFaq, type AcademyFaq } from "./seo";

const origin = "https://3d3d.ca";
export function academySchema(
  path: string,
  info: { title: string; description: string },
  reading: ReadingSection[] = [],
  context: { locale: Locale; lesson?: Lesson; faqs?: AcademyFaq[] } = { locale: "en" },
) {
  const { locale } = context;
  const lesson =
    context.lesson ?? (locale === "en" ? lessons.find((l) => lessonPath(l) === path) : undefined);
  const url = origin + localizedPath(path, locale),
    course = origin + localizedPath(ACADEMY_PATH, locale);
  const faqs = context.faqs ?? (lesson ? lessonFaq(lesson, locale) : []);
  const crumbs = [
    ["3D3D", origin],
    [locale === "fr" ? "Apprendre" : "Learn", origin + sitePath("/learn", locale)],
    [locale === "fr" ? "Académie d’impression 3D" : "3D Printing Academy", course],
  ];
  if (path !== ACADEMY_PATH) crumbs.push([info.title.replace(" | 3D3D", ""), url]);
  const graph: Record<string, unknown>[] = [
    {
      "@type": "BreadcrumbList",
      itemListElement: crumbs.map(([name, item], i) => ({
        "@type": "ListItem",
        position: i + 1,
        name,
        item,
      })),
    },
  ];
  if (path === ACADEMY_PATH)
    graph.push({
      "@type": "Course",
      "@id": course + "#course",
      url: course,
      name: locale === "fr" ? "Académie d’impression 3D" : "3D Printing Academy",
      description: info.description,
      provider: { "@type": "Organization", name: "3D3D", url: origin },
      inLanguage: locale,
      isAccessibleForFree: true,
      educationalLevel: locale === "fr" ? "Débutant" : "Beginner",
      creativeWorkStatus: locale === "fr" ? "Ouvert aux corrections" : "Open to correction",
      creditText:
        locale === "fr"
          ? "Documenté à partir des sources citées, rédigé avec l’aide de l’IA et ouvert aux corrections."
          : "Researched from listed sources, written with AI assistance and open to correction.",
      coursePrerequisites:
        locale === "fr"
          ? "Accès à une imprimante à filament adaptée et à un poste préparé pour les exercices."
          : "Access to a suitable filament printer and a prepared workspace for practice.",
      teaches: (locale === "fr" ? frenchUnits : units).map((u) => u.title),
      image: `${origin}/og${path}.${locale}.jpg`,
      dateModified: "2026-10-08",
      hasPart: academyCatalog.map((l) => ({
        "@type": "LearningResource",
        name: l.title[locale],
        url: origin + localizedPath(ACADEMY_PATH + "/" + l.slug, locale),
        position: l.id,
      })),
    });
  if (lesson) {
    graph.push({
      "@type": "LearningResource",
      "@id": url + "#lesson",
      url,
      name: lesson.title,
      description: lesson.summary,
      learningResourceType: locale === "fr" ? "Leçon" : "Lesson",
      educationalLevel: locale === "fr" ? "Débutant" : "Beginner",
      inLanguage: locale,
      isAccessibleForFree: true,
      creativeWorkStatus: locale === "fr" ? "Ouvert aux corrections" : "Open to correction",
      image: `${origin}/og${path}.${locale}.jpg`,
      dateModified: "2026-10-08",
      teaches: lesson.learn,
      position: lesson.id,
      isPartOf: { "@id": course + "#course" },
      citation: [...new Set([...lesson.sources, ...reading.flatMap((section) => section.sources)])].map(
        (id) => sources[id].url,
      ),
    });
    if (lesson.howTo)
      graph.push({
        "@type": "HowTo",
        "@id": url + "#procedure",
        name: lesson.title,
        description: lesson.summary,
        inLanguage: locale,
        isPartOf: { "@id": url + "#lesson" },
        step: lesson.steps.map((text, i) => ({ "@type": "HowToStep", position: i + 1, text })),
      });
  }
  if (faqs.length)
    graph.push({
      "@type": "FAQPage",
      "@id": url + "#faq",
      inLanguage: locale,
      mainEntity: faqs.map((f) => ({
        "@type": "Question",
        name: f.q,
        acceptedAnswer: { "@type": "Answer", text: f.a },
      })),
    });
  return { "@context": "https://schema.org", "@graph": graph };
}
