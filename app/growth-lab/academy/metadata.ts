import { academyCatalog } from "./catalog";
import type { Locale } from "../seo/guide";
const root = "/learn/academy";
const support = {
  en: {
    "": [
      "Free 3D Printing Academy",
      "Learn filament printing in forty free, practical lessons. Original diagrams, local progress, source links and a way to suggest corrections.",
    ],
    glossary: [
      "3D Printing Glossary",
      "Understand filament printing terms through plain definitions, primary sources and related lessons in the free 3D3D Academy.",
    ],
    "failed-print": [
      "My Print Failed: Find a Next Check",
      "Choose a visible print symptom and follow a specific next check, from first-layer adhesion to shifted layers, without guessing a universal setting.",
    ],
    certificate: [
      "Academy Self-Study Completion Record",
      "Complete forty quizzes and record forty practices to print a personal learning record. Free, local and clear about what it does and does not verify.",
    ],
    sources: [
      "Academy Sources and Course Scope",
      "Read the academy's primary sources, original teaching approach, AI-assistance note, practice scope and correction process.",
    ],
    contributors: [
      "Academy Contributors",
      "See how accepted academy contributions receive optional public credit. Names require consent; contact details are never public credits.",
    ],
    join: [
      "Help Build the 3D Printing Academy",
      "Improve a free printing lesson with source checks, practical observations, accessible diagrams or French wording. Start with one specific contribution.",
    ],
  },
  fr: {
    "": [
      "Académie gratuite d’impression 3D",
      "Apprenez l’impression à filament en quarante leçons gratuites : schémas originaux, suivi local, sources et suggestions de correction.",
    ],
    glossary: [
      "Glossaire de l’impression 3D",
      "Comprenez les termes de l’impression à filament grâce à des définitions claires, des sources et des liens vers les leçons gratuites.",
    ],
    "failed-print": [
      "Impression ratée : quoi vérifier ensuite ?",
      "Partez d’un symptôme visible pour choisir une vérification ciblée : adhérence, fils, coins soulevés, manque de matière ou couches décalées.",
    ],
    certificate: [
      "Attestation personnelle d’apprentissage 3D",
      "Terminez quarante questionnaires et consignez quarante exercices pour imprimer votre relevé personnel. Gratuit, local et sans accréditation.",
    ],
    sources: [
      "Sources et portée de l’académie 3D",
      "Consultez les références, la méthode de rédaction avec aide de l’IA, la portée des exercices et le processus de correction du cours.",
    ],
    contributors: [
      "Contributions à l’académie 3D",
      "Découvrez comment une contribution retenue est remerciée avec consentement. Les coordonnées ne deviennent jamais des remerciements publics.",
    ],
    join: [
      "Participer à l’académie d’impression 3D",
      "Améliorez une leçon gratuite : vérifiez une source, décrivez un essai ou précisez le français et les schémas. Commencez par un apport ciblé.",
    ],
  },
};
/** Search descriptions run 120 to 160 characters (the site's description-length gate). */
function fitDescription(text: string, locale: Locale, id?: number): string {
  const fr = locale === "fr";
  const tails = [
    id !== undefined
      ? fr
        ? ` Leçon ${id} sur 40 de l’Académie 3D3D gratuite, avec schéma, quiz et exercice.`
        : ` Lesson ${id} of 40 in the free 3D3D Printing Academy, with a diagram, quiz and practice task.`
      : fr
        ? " Une page de l’Académie d’impression 3D gratuite de 3D3D, en français et en anglais."
        : " Part of the free 3D3D Printing Academy, in English and French.",
    fr ? " Leçon gratuite avec schéma, quiz et exercice." : " Free lesson with a diagram, quiz and practice task.",
    fr ? " Leçon gratuite." : " Free lesson.",
  ];
  if (text.length >= 120 && text.length <= 160) return text;
  if (text.length < 120)
    for (const tail of tails) if (text.length + tail.length >= 120 && text.length + tail.length <= 160) return text + tail;
  const longest = text.length < 120 ? text + tails[0] : text;
  const cut = longest.slice(0, 159);
  const end = Math.max(cut.lastIndexOf(". "), cut.lastIndexOf(", "));
  return end >= 119 ? cut.slice(0, end) + "." : cut.slice(0, cut.lastIndexOf(" ")) + ".";
}
export function academyInfo(path: string, locale: Locale = "en") {
  const slug = path === root ? "" : path.slice(root.length + 1);
  const lesson = academyCatalog.find((l) => l.slug === slug);
  const page = support[locale][slug as keyof typeof support.en];
  return lesson
    ? { title: lesson.title[locale] + " | 3D3D", description: fitDescription(lesson.description[locale], locale, lesson.id) }
    : page
      ? { title: page[0] + " | 3D3D", description: fitDescription(page[1], locale) }
      : {
          title: locale === "fr" ? "Page introuvable | 3D3D" : "Page not found | 3D3D",
          description: locale === "fr" ? "Revenez au plan du cours." : "Return to the course map.",
        };
}
export const academyRoutes = [
  root,
  ...academyCatalog.map((l) => root + "/" + l.slug),
  ...Object.keys(support.en)
    .filter(Boolean)
    .map((slug) => root + "/" + slug),
];
