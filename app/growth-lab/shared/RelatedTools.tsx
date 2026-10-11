import { useT, useLocale, useLocalLink } from "./locale";
import { relatedTools } from "../tools/navigation";
import ToolPreview from "./ToolPreview";
export default function RelatedTools({ slug }: { slug: string }) {
  const tr = useT();
  const locale = useLocale();
  const localLink = useLocalLink();

  return (
    <nav className="reference related-tools" aria-label={tr("Related tools")}>
      <h2>{tr("Keep making")}</h2>
      <ul className="hub-grid">
        {relatedTools(slug, locale).map((t) => (
          <li key={t.slug}>
            <a className="hub-tool" href={localLink(`/tools/${t.slug}`)}>
              <ToolPreview slug={t.slug} />
              <strong>{t.short}</strong>
              <span>{t.summary}</span>
              <em aria-hidden="true">{tr("Open")} →</em>
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
