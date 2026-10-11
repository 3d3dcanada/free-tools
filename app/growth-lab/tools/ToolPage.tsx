import { useEffect, useState, type ReactNode } from "react";
import { DataPromise, Pledge } from "../shared/kit";
import RelatedTools from "../shared/RelatedTools";
import { LocaleProvider } from "../shared/locale";
import { guideSchema, localizedPath, type ToolGuide as Guide } from "../seo/guide";
import { sitePath } from "../seo/site-links";
import ToolGuide from "../seo/ToolGuide";
import FeedbackForm from "../shared/FeedbackForm";
import { FEEDBACK_ENDPOINT } from "../../lib/free-tools-host";
import ShareButton from "../shared/ShareButton";
import { ToolIcon } from "../shared/toolIcons";
import { intentFor } from "./intents";
import { categoryFor } from "./navigation";
import QuickTools from "./QuickTools";
import Dialog from "../shared/Dialog";
import QuickStart from "./QuickStart";

/** One neon per family, so each tool reads as part of a set (teal leads). */
const CATEGORY_ACCENT: Record<string, string> = {
  "QR and Contacts": "#04D9C4",
  Design: "#FF2D92",
  Images: "#04D9C4",
  "PDF Documents": "#FF6A00",
  Business: "#18E36B",
  "3D Printing": "#FF6A00",
};

/**
 * Every tool is an app, not a form at the bottom of an article: a bar with
 * the name and actions, a controls panel that slides in from the left (an X
 * closes it), the result on a stage, and the guide in a slide-over. On a
 * phone the panel and the stage swap with a segmented control. The full
 * guide stays in the server HTML inside the slide-over.
 */
export default function ToolPage({
  guide,
  children,
  wide = false,
}: {
  guide: Guide;
  children: ReactNode;
  /** The editor owns its whole layout (the deck studio). */
  wide?: boolean;
}) {
  const [hydrated, setHydrated] = useState(false);
  const [panel, setPanel] = useState(guide.slug !== "model-viewer");
  const [view, setView] = useState<"edit" | "result">("result");
  const [drawer, setDrawer] = useState<"guide" | "feedback" | null>(null);
  const guideOpen = drawer === "guide";
  const setGuideOpen = (open: boolean) => setDrawer(open ? "guide" : null);
  useEffect(() => setHydrated(true), []);
  useEffect(() => {
    const close = (e: KeyboardEvent) => {
      if (e.key === "Escape" && !(e.target as HTMLElement).closest("dialog")) { setPanel(false); setView("result"); }
    };
    window.addEventListener("keydown", close);
    return () => window.removeEventListener("keydown", close);
  }, []);
  const fr = guide.locale === "fr";
  const intent = intentFor(guide.slug);
  const accent = CATEGORY_ACCENT[categoryFor(guide.slug)] ?? "#04D9C4";
  const other = fr ? "en" : "fr";
  return (
    <LocaleProvider locale={guide.locale}>
      <section className="growth-lab tool-page" aria-label={guide.name} style={{ ["--accent" as string]: accent }}>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(guideSchema(guide)).replace(/</g, "\\u003c") }}
        />
        <div
          className={`tool-app${wide ? " tool-app-wide" : ""}`}
          data-panel={panel ? "open" : "closed"}
          data-view={view}
        >
          <QuickTools locale={guide.locale} current={guide.slug} />
          <header className="tool-bar">
            <a className="tool-back" href={localizedPath("/tools", guide.locale)} aria-label={fr ? "Tous les outils" : "All tools"}>
              <span aria-hidden="true">←</span>
              <span className="tool-back-label">{fr ? "Outils" : "Tools"}</span>
            </a>
            <ToolIcon slug={guide.slug} />
            <div className="tool-title">
              <p className="eyebrow">{guide.name}</p>
              <h1>{guide.headline}</h1>
            </div>
            <span className="tool-pledge" title={fr ? "Gratuit pour toujours" : "Free forever"}>
              {fr ? "Gratuit · Aucun envoi" : "Free · Nothing Uploaded"}
            </span>
            <div className="tool-actions">
              {!wide && (
                <button
                  type="button"
                  className="tool-panel-toggle"
                  aria-pressed={panel}
                  onClick={() => setPanel((p) => !p)}
                >
                  {panel ? (fr ? "Masquer les réglages" : "Hide Controls") : fr ? "Réglages" : "Controls"}
                </button>
              )}
              <button type="button" onClick={() => setGuideOpen(true)} aria-haspopup="dialog">
                {fr ? "Démarrage" : "Quick Start"}
              </button>
              {FEEDBACK_ENDPOINT && (
                <button
                  type="button"
                  className="tool-feedback-button"
                  onClick={() => setDrawer("feedback")}
                  aria-haspopup="dialog"
                >
                  {fr ? "Commentaires" : "Feedback"}
                </button>
              )}
              <ShareButton title={`${guide.name} · 3D3D`} fr={fr} />
              <a
                className="tool-lang"
                href={localizedPath(`/tools/${guide.slug}`, other)}
                hrefLang={other === "fr" ? "fr-CA" : "en-CA"}
                lang={other}
              >
                {other === "fr" ? "FR" : "EN"}
              </a>
            </div>
          </header>
          {!wide && (
            <nav className="tool-switch" aria-label={fr ? "Espace de travail" : "Tool workspace"}>
              <button type="button" aria-pressed={view === "edit"} onClick={() => setView("edit")}>
                {fr ? "Réglages" : "Controls"}
              </button>
              <button type="button" aria-pressed={view === "result"} onClick={() => setView("result")}>
                {fr ? "Aperçu" : "Preview"}
              </button>
            </nav>
          )}
          {!wide && !panel && (
            <button type="button" className="tool-panel-reopen" onClick={() => setPanel(true)}>
              {fr ? "Réglages" : "Controls"} <span aria-hidden="true">→</span>
            </button>
          )}
          <div className="tool-content" inert={!hydrated}>
            {!wide && (
              <button type="button" className="tool-panel-close" aria-label={fr ? "Fermer les réglages" : "Close controls"}
                onClick={() => { setPanel(false); setView("result"); }}>×</button>
            )}
            {children}
          </div>
        </div>

        <div className="tool-below">
          <p className="tool-answer">{guide.answer}</p>
          <Pledge />
          <DataPromise slug={guide.slug} />
          <RelatedTools slug={guide.slug} />
        </div>

        <Dialog
          className="tool-guide-layer"
          open={guideOpen}
          title={fr ? "Guide de l’outil" : "Tool guide"}
          onClose={() => setGuideOpen(false)}
        >
          <aside
            className="tool-guide-panel"
          >
            <div className="tool-guide-head">
              <p className="eyebrow">{fr ? "Guide pratique" : "Practical Guide"}</p>
              <button
                type="button"
                className="tool-guide-close"
                aria-label={fr ? "Fermer le guide" : "Close guide"}
                onClick={() => setGuideOpen(false)}
                tabIndex={guideOpen ? 0 : -1}
              >
                ×
              </button>
            </div>
            <div className="tool-guide-body" inert={!guideOpen}>
              <QuickStart slug={guide.slug} />
              <p className="tool-answer">{guide.answer}</p>
              <ToolGuide guide={guide} />
              <nav className="reference" aria-label={fr ? "Services et outils associés" : "Related services and tools"}>
                <a href={sitePath(guide.service.path, guide.locale)}>{guide.service.label}</a>
                {intent && (
                  <a href={localizedPath("/tools/" + intent.parent, guide.locale)}>
                    {fr ? "Découvrir l’éditeur complet" : "Explore the complete editor"}
                  </a>
                )}
              </nav>
            </div>
          </aside>
        </Dialog>
        {FEEDBACK_ENDPOINT && (
          <Dialog
            className="tool-guide-layer"
            open={drawer === "feedback"}
            title={fr ? "Envoyer un commentaire" : "Send feedback"}
            onClose={() => setDrawer(null)}
          >
            <aside
              className="tool-guide-panel tool-feedback-panel"
            >
              <div className="tool-guide-head">
                <p className="eyebrow">{fr ? "Aidez-nous à l’améliorer" : "Help Us Improve It"}</p>
                <button
                  type="button"
                  className="tool-guide-close"
                  aria-label={fr ? "Fermer" : "Close"}
                  onClick={() => setDrawer(null)}
                  tabIndex={drawer === "feedback" ? 0 : -1}
                >
                  ×
                </button>
              </div>
              <div className="tool-guide-body" inert={drawer !== "feedback"}>
                <h2>{fr ? `Commentaires sur ${guide.name}` : `Feedback on ${guide.name}`}</h2>
                {hydrated && <FeedbackForm tool={guide.slug} locale={guide.locale} />}
              </div>
            </aside>
          </Dialog>
        )}
      </section>
    </LocaleProvider>
  );
}
