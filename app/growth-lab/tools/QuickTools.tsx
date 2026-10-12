import { localizedPath, type Locale } from "../seo/guide";
import { useState } from "react";
import Dialog from "../shared/Dialog";
import { useT } from "../shared/locale";
import { catalogFor } from "./catalog";
import { categories, categoryFor, matchesSearch } from "./navigation";

const TOOLS = [
  ["qr-code", "QR", "QR"],
  ["merge-pdf", "Merge PDF", "Fusionner PDF"],
  ["compress-image", "Compress Image", "Compresser Image"],
  ["resize-image", "Resize", "Redimensionner"],
  ["remove-background", "Remove Background", "Retirer le Fond"],
  ["pitch-deck", "Deck Studio", "Présentations"],
  ["business-card", "Business Card", "Carte de Visite"],
  ["invoice-generator", "Invoice", "Facture"],
] as const;

/** The common tools as plain links (the hub strip, and the desktop tool bar). */
export function QuickLinks({ locale, current, className = "tool-quick" }: { locale: Locale; current?: string; className?: string }) {
  return (
    <nav className={className} aria-label={locale === "fr" ? "Accès rapide aux outils" : "Quick tools"}>
      {TOOLS.map(([slug, en, fr]) => (
        <a key={slug} href={localizedPath("/tools/" + slug, locale)} aria-current={current === slug ? "page" : undefined}>
          {locale === "fr" ? fr : en}
        </a>
      ))}
    </nav>
  );
}

/** Search every tool by name or job, grouped by family. */
export function ToolFinder({ locale, current, open, onClose }: { locale: Locale; current?: string; open: boolean; onClose: () => void }) {
  const tr = useT();
  const [query, setQuery] = useState("");
  const results = catalogFor(locale).filter((t) => matchesSearch(`${t.name} ${t.slug} ${t.summary}`, query));
  return (
    <Dialog open={open} title={tr("Find a Tool")} className="tool-guide-layer tool-finder" onClose={onClose}>
      <div className="tool-guide-panel">
        <div className="tool-guide-head">
          <h2>{tr("Find a Tool")}</h2>
          <button type="button" className="tool-guide-close" aria-label={locale === "fr" ? "Fermer" : "Close"} onClick={onClose}>×</button>
        </div>
        <div className="tool-finder-search">
          <label>{tr("Search tools")}<input type="search" value={query} placeholder={tr("Try Wi-Fi, image, invoice or STL")} onChange={(e) => setQuery(e.target.value)} /></label>
          <p role="status">{results.length} {tr("tools")}</p>
        </div>
        <div className="tool-guide-body">
          {categories.slice(1).map((category) => {
            const group = results.filter((t) => categoryFor(t.slug) === category);
            return group.length > 0 && <section key={category} className="tool-finder-group">
              <h3>{tr(category)}</h3>
              {group.map((t) => <a key={t.slug} href={localizedPath(`/tools/${t.slug}`, locale)} aria-current={t.slug === current ? "page" : undefined}>
                <strong>{t.short}</strong><span>{t.summary}</span>
              </a>)}
            </section>;
          })}
          {!results.length && <p>{tr("No matching tools. Try a shorter term or select all categories.")} <button type="button" onClick={() => setQuery("")}>{tr("Clear Search")}</button></p>}
          <a className="tool-finder-all" href={localizedPath("/tools", locale)}>{tr("All Tools")} →</a>
        </div>
      </div>
    </Dialog>
  );
}

/** The hub strip: the finder button and the common tools. */
export default function QuickTools({ locale, current }: { locale: Locale; current?: string }) {
  const tr = useT();
  const [open, setOpen] = useState(false);
  return (
    <>
      <div className="tool-quick">
        <button type="button" className="tool-finder-trigger" aria-haspopup="dialog" onClick={() => setOpen(true)}>
          {tr("Find a Tool")} <span aria-hidden="true">⌕</span>
        </button>
        <QuickLinks locale={locale} current={current} className="tool-quick-links" />
      </div>
      <ToolFinder locale={locale} current={current} open={open} onClose={() => setOpen(false)} />
    </>
  );
}
