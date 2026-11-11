import { useT, useLocale, useLocalLink } from "./locale";
import { categoryFor, relatedTools } from "../tools/navigation";
import { AppTile, CATEGORY_ACCENT } from "./toolIcons";
export default function RelatedTools({ slug }: { slug: string }) {
  const tr = useT();
  const locale = useLocale();
  const localLink = useLocalLink();

  // 2026-11-11: the same app tiles as the hub, one row of four, in place of drawn preview cards.
  return (
    <nav className="reference related-tools" aria-label={tr("Related tools")}>
      <h2>{tr("Keep making")}</h2>
      <ul className="hub-launch">
        {relatedTools(slug, locale).map((t, i) => (
          <li key={t.slug} style={{ ["--accent" as string]: CATEGORY_ACCENT[categoryFor(t.slug)], ["--i" as string]: i }}>
            <AppTile slug={t.slug} locale={locale} href={localLink(`/tools/${t.slug}`)} name={t.short} summary={t.summary} />
          </li>
        ))}
      </ul>
    </nav>
  );
}
