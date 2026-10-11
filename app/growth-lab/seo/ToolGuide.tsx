import type { ToolGuide as Guide } from "./guide";
export default function ToolGuide({ guide }: { guide: Guide }) {
  const fr = guide.locale === "fr";
  return (
    <article className="tool-guide reference" aria-label={fr ? "Guide pratique" : "Practical guide"}>
      <section id="steps">
        <h2>{fr ? "Réaliser ce travail" : "Make this result"}</h2>
        <ol>
          {guide.steps.map((step, i) => (
            <li id={`step-${i + 1}`} key={step}>
              {step}
            </li>
          ))}
        </ol>
      </section>
      {guide.sections.map((section) => (
        <section key={section.heading}>
          <h2>{section.heading}</h2>
          {section.paragraphs.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </section>
      ))}
      <section>
        <h2>{fr ? "Choisir l’outil adapté" : "Choose the right tool"}</h2>
        <div className="table-scroll">
          <table>
            <caption>
              {fr
                ? "Pages officielles consultées le 8 octobre 2026. Les offres peuvent changer."
                : "Official product pages checked 8 October 2026. Offers can change."}
            </caption>
            <thead>
              <tr>
                <th>{fr ? "Outil" : "Tool"}</th>
                <th>{fr ? "Usage et limites" : "Use and limits"}</th>
                <th>{fr ? "Source" : "Source"}</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th scope="row">3D3D</th>
                <td>
                  {fr
                    ? "Traitement local gratuit, sans compte. Vous contrôlez les fichiers et leur diffusion. Les limites de cette page s’appliquent."
                    : "Free local processing without an account. You control the files and their distribution. The limits described on this page apply."}
                </td>
                <td>{fr ? "L’outil ci-dessus" : "The tool above"}</td>
              </tr>
              {guide.comparison.map((row) => (
                <tr key={row.url}>
                  <th scope="row">{row.name}</th>
                  <td>{row.detail}</td>
                  <td>
                    <a href={row.url}>{fr ? "Page officielle" : "Official page"}</a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
      <section id="faq">
        <h2>{fr ? "Questions fréquentes" : "Common questions"}</h2>
        {guide.faqs.map(({ q, a }) => (
          <details key={q}>
            <summary>{q}</summary>
            <p>{a}</p>
          </details>
        ))}
      </section>
      {!!guide.sources?.length && (
        <section>
          <h2>{fr ? "Références utiles" : "Useful references"}</h2>
          <ul>
            {guide.sources.map((source) => (
              <li key={source.url}>
                <a href={source.url}>{source.label}</a>
              </li>
            ))}
          </ul>
        </section>
      )}
    </article>
  );
}
