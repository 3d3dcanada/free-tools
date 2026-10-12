import { useEffect, useMemo, useRef, useState, type ReactNode } from "react";
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
import { ToolChrome, type ToolSlots } from "../shared/chrome";
import { intentFor } from "./intents";
import { categoryFor } from "./navigation";
import { QuickLinks, ToolFinder } from "./QuickTools";
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
 * Every tool is an app (rebuilt 2026-10-11 for the phone first). One bar: back
 * to the tools, the tool's name, the editor's undo and redo, its primary export
 * when it has one, and a single menu holding everything else (guide, finder,
 * projects, brand, feedback, share, language). Below the bar the result owns
 * the screen. On desktop the controls sit in a panel on the left; up to 900 px
 * they open as a sheet from an Edit button at the foot, and the result stays
 * in view above them. The site header and the edge menu tab are not drawn on
 * tool pages: the site's bottom bar is the way out. The full guide stays in the
 * server HTML inside the guide sheet.
 */
export default function ToolPage({
  guide,
  children,
  wide = false,
}: {
  guide: Guide;
  children: ReactNode;
  /** The editor owns its whole layout (the deck and page studios). */
  wide?: boolean;
}) {
  const [hydrated, setHydrated] = useState(false);
  const [panel, setPanel] = useState(guide.slug !== "model-viewer");
  const [view, setView] = useState<"edit" | "result">("result");
  const [drawer, setDrawer] = useState<"guide" | "feedback" | "finder" | null>(null);
  const [menu, setMenu] = useState(false);
  const [slots, setSlots] = useState<ToolSlots>({ history: null, primary: null, menu: null });
  const menuBox = useRef<HTMLDivElement>(null);
  // Stable ref callbacks: a new function each render would detach and reattach the slot forever.
  const slot = useMemo(() => {
    const make = (name: keyof ToolSlots) => (el: HTMLElement | null) =>
      setSlots((s) => (s[name] === el ? s : { ...s, [name]: el }));
    const refs = { history: make("history"), primary: make("primary"), menu: make("menu") };
    return (name: keyof ToolSlots) => refs[name];
  }, []);
  useEffect(() => setHydrated(true), []);
  useEffect(() => {
    const close = (e: KeyboardEvent) => {
      if (e.key !== "Escape" || (e.target as HTMLElement).closest("dialog")) return;
      setMenu(false);
      setView("result");
    };
    window.addEventListener("keydown", close);
    return () => window.removeEventListener("keydown", close);
  }, []);
  useEffect(() => {
    if (!menu) return;
    const outside = (e: PointerEvent) => {
      if (!menuBox.current?.contains(e.target as Node)) setMenu(false);
    };
    document.addEventListener("pointerdown", outside);
    return () => document.removeEventListener("pointerdown", outside);
  }, [menu]);
  const fr = guide.locale === "fr";
  const intent = intentFor(guide.slug);
  const accent = CATEGORY_ACCENT[categoryFor(guide.slug)] ?? "#04D9C4";
  const other = fr ? "en" : "fr";
  // The bar names the tool without the "Free" the page title carries for search.
  const shortName = (fr ? guide.name.replace(/\s+gratuit(e|s|es)?\b/i, "") : guide.name.replace(/^Free\s+/, "")).trim();
  const guideOpen = drawer === "guide";
  const setGuideOpen = (o: boolean) => setDrawer(o ? "guide" : null);
  const open = (d: typeof drawer) => {
    setMenu(false);
    setDrawer(d);
  };
  return (
    <LocaleProvider locale={guide.locale}>
      <ToolChrome.Provider value={slots}>
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
          <header className="tool-bar">
            <a className="tool-back" href={localizedPath("/tools", guide.locale)} aria-label={fr ? "Tous les outils" : "All tools"}>
              <span aria-hidden="true">←</span>
              <span className="tool-back-label">{fr ? "Outils" : "Tools"}</span>
            </a>
            {!wide && (
              <button
                type="button"
                className="tool-panel-toggle"
                aria-pressed={panel}
                aria-label={panel ? (fr ? "Masquer les réglages" : "Hide settings") : fr ? "Afficher les réglages" : "Show settings"}
                title={panel ? (fr ? "Masquer les réglages" : "Hide settings") : fr ? "Afficher les réglages" : "Show settings"}
                onClick={() => setPanel((p) => !p)}
              >
                <svg viewBox="0 0 24 24" aria-hidden="true"><rect x="3" y="4" width="18" height="16" rx="2" /><path d="M9 4v16" /></svg>
              </button>
            )}
            <ToolIcon slug={guide.slug} />
            <h1 className="tool-name" title={guide.name}>{shortName}</h1>
            <QuickLinks locale={guide.locale} current={guide.slug} className="tool-bar-quick" />
            <button type="button" className="tool-find" aria-haspopup="dialog" onClick={() => open("finder")}>
              <span aria-hidden="true">⌕</span> {fr ? "Trouver un outil" : "Find a Tool"}
            </button>
            <div className="tool-history" ref={slot("history")} />
            <div className="tool-primary" ref={slot("primary")} />
            <div className="tool-more" ref={menuBox}>
              <button
                type="button"
                className="tool-more-button"
                aria-haspopup="menu"
                aria-expanded={menu}
                aria-label={fr ? "Plus d’options" : "More options"}
                onClick={() => setMenu((m) => !m)}
              >
                <svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="5" cy="12" r="1.6" /><circle cx="12" cy="12" r="1.6" /><circle cx="19" cy="12" r="1.6" /></svg>
              </button>
              <div
                className="tool-menu"
                hidden={!menu}
                onClick={(e) => {
                  // Any action in the menu closes it; the share list stays open for its choice.
                  const hit = (e.target as HTMLElement).closest("a, button");
                  if (hit && !hit.closest(".share-box > button")) setMenu(false);
                }}
              >
                <button type="button" onClick={() => open("guide")}>{fr ? "Démarrage et guide" : "Quick Start & Guide"}</button>
                <button type="button" className="tool-menu-find" onClick={() => open("finder")}>{fr ? "Trouver un outil" : "Find a Tool"}</button>
                <div className="tool-menu-slot" ref={slot("menu")} />
                {FEEDBACK_ENDPOINT && (
                  <button type="button" onClick={() => open("feedback")}>{fr ? "Envoyer un commentaire" : "Send Feedback"}</button>
                )}
                <ShareButton title={`${guide.name} · 3D3D`} fr={fr} className="tool-menu-share" />
                <a
                  href={localizedPath(`/tools/${guide.slug}`, other)}
                  hrefLang={other === "fr" ? "fr-CA" : "en-CA"}
                  lang={other}
                >
                  {other === "fr" ? "Français" : "English"}
                </a>
              </div>
            </div>
          </header>
          <div className="tool-content" inert={!hydrated}>
            {children}
          </div>
          {!wide && (
            <button
              type="button"
              className="tool-sheet-toggle"
              aria-expanded={view === "edit"}
              onClick={() => setView((v) => (v === "edit" ? "result" : "edit"))}
            >
              {view === "edit" ? (
                <>{fr ? "Terminé" : "Done"} <span aria-hidden="true">⌄</span></>
              ) : (
                <><span aria-hidden="true">⌃</span> {fr ? "Modifier les réglages" : "Edit Settings"}</>
              )}
            </button>
          )}
        </div>

        <div className="tool-below">
          <h2 className="tool-headline">{guide.headline}</h2>
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
        <ToolFinder locale={guide.locale} current={guide.slug} open={drawer === "finder"} onClose={() => setDrawer(null)} />
      </section>
      </ToolChrome.Provider>
    </LocaleProvider>
  );
}
