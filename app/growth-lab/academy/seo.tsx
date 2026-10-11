import { useLocale, useLocalLink } from "../shared/locale";
import { catalogFor } from "../tools/catalog";
import { sources } from "./sources";
import { siteAbsolute } from "../seo/site-links";
import type { Lesson } from "./types";
export type AcademyFaq = { q: string; a: string };
export type SupportGuide = {
  answer: string;
  sections: { title: string; paragraphs: string[] }[];
  faqs: AcademyFaq[];
};
export function lessonFaq(lesson: Lesson, locale: "en" | "fr"): AcademyFaq[] {
  return [
    ...lesson.quiz.map((q) => ({ q: q.question, a: `${q.options[q.answer]}. ${q.explanation}` })),
    {
      q:
        locale === "fr"
          ? "Quel exercice permet d’appliquer cette leçon ?"
          : "What practice applies this lesson?",
      a: lesson.practice.task + " " + lesson.practice.record,
    },
  ];
}
export function AcademyFaqs({ faqs }: { faqs: AcademyFaq[] }) {
  const locale = useLocale();
  return (
    <section className="reading academy-faq no-print" aria-labelledby="academy-faq-title">
      <h2 id="academy-faq-title">{locale === "fr" ? "Questions fréquentes" : "Common questions"}</h2>
      {faqs.map((f) => (
        <details key={f.q}>
          <summary>{f.q}</summary>
          <p>{f.a}</p>
        </details>
      ))}
    </section>
  );
}
export function SupportReading({ guide }: { guide?: SupportGuide }) {
  return guide ? (
    <div className="reading no-print academy-guide">
      {guide.sections.map((s) => (
        <section key={s.title}>
          <h2>{s.title}</h2>
          {s.paragraphs.map((p) => (
            <p key={p}>{p}</p>
          ))}
        </section>
      ))}
      <AcademyFaqs faqs={guide.faqs} />
    </div>
  ) : null;
}
const toolSlugs: Record<number, string[]> = {
  1: ["model-viewer", "unit-converter"],
  2: ["model-viewer", "nozzle-layer-guide"],
  3: ["filament-calculator", "print-cost-calculator"],
  4: ["tolerance-calculator", "nozzle-layer-guide"],
  5: ["model-viewer", "tolerance-calculator"],
  6: ["nozzle-layer-guide", "tolerance-calculator"],
  7: ["tolerance-calculator", "unit-converter"],
  8: ["print-cost-calculator", "invoice-generator", "resize-image"],
};
export function AcademyRelated({ unit = 1 }: { unit?: number }) {
  const locale = useLocale(),
    link = useLocalLink();
  const tools = catalogFor(locale).filter((t) => toolSlugs[unit].includes(t.slug));
  return (
    <nav
      className="reading academy-related no-print"
      aria-label={locale === "fr" ? "Outils et services associés" : "Related tools and services"}
    >
      <h2>{locale === "fr" ? "Outils pour passer à la pratique" : "Tools for the next practical step"}</h2>
      <ul>
        {tools.map((t) => (
          <li key={t.slug}>
            <a href={link(`/tools/${t.slug}`)}>{t.title}</a>
          </li>
        ))}
        <li>
          <a href={link("/tools")}>{locale === "fr" ? "Tous les outils gratuits" : "All free tools"}</a>
        </li>
        <li>
          <a href={siteAbsolute(link("/3d-printing"))}>
            {locale === "fr"
              ? "Parler d’un projet d’impression à 3D3D"
              : "Discuss a printing project with 3D3D"}
          </a>
        </li>
      </ul>
    </nav>
  );
}
export function ReferenceComparison({ ids }: { ids: string[] }) {
  const locale = useLocale();
  const unique = [...new Set(ids)].slice(0, 2);
  return (
    <section className="reading reference-comparison no-print">
      <h2>{locale === "fr" ? "Choisir la bonne référence" : "Choose the right reference"}</h2>
      <p>
        {locale === "fr"
          ? "Comparaison de portée, vérifiée le 8 octobre 2026. Relisez les consignes actuelles du produit précis avant d’agir."
          : "Scope comparison checked 8 October 2026. Recheck the current instructions for your exact product before acting."}
      </p>
      <div className="table-scroll">
        <table>
          <thead>
            <tr>
              <th>{locale === "fr" ? "Ressource" : "Resource"}</th>
              <th>{locale === "fr" ? "Usage approprié" : "Appropriate use"}</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th>3D3D Academy</th>
              <td>
                {locale === "fr"
                  ? "Comprendre le principe et préparer un essai limité. Cette leçon générale ne remplace pas les consignes du fabricant."
                  : "Understand the principle and prepare a bounded trial. This general lesson does not replace the manufacturer's instructions."}
              </td>
            </tr>
            {unique.map((id) => (
              <tr key={id}>
                <th>
                  <a href={sources[id].url}>{sources[id].title}</a>
                </th>
                <td>
                  {locale === "fr"
                    ? "Consulter la référence originale pour son produit, sa procédure et ses limites précises. Vérifier qu’elle s’applique à votre configuration."
                    : "Consult the original reference for its specific product, procedure and limits. Check that it applies to your setup."}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
