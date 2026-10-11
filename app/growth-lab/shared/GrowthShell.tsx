import { LocaleProvider, useT, useLocalLink } from "./locale";
import { languagePath, localizedPath } from "../seo/guide";
import ContentPage from "../../content/ContentPage";
import type { ReactNode } from "react";

/**
 * Free tools + academy inside the site's own content chrome: SiteHeader, the
 * drawer, the bottom bar and the ContentPage footer all come from the host.
 * This adds only the section bar (tools / academy / language) and the
 * free-forever line. No subscribe band: these pages ask for nothing.
 */
export default function GrowthShell({ path, children }: { path: string; children?: ReactNode }) {
  const fr = languagePath(path).locale === "fr";
  return (
    <LocaleProvider locale={fr ? "fr" : "en"}>
      <ContentPage
        accent="teal"
        startHref={fr ? "/fr/devis" : "/quote"}
        startLabel={fr ? "Demander un devis" : "Get a Quote"}
        subscribe={false}
      >
        <Shell path={path}>{children}</Shell>
      </ContentPage>
    </LocaleProvider>
  );
}

function Shell({ path, children }: { path: string; children?: ReactNode }) {
  const tr = useT();
  const localLink = useLocalLink();
  const language = languagePath(path);
  const other = language.locale === "en" ? "fr" : "en";
  const inAcademy = language.path.startsWith("/learn/academy");
  // A tool page is a full-screen app with its own bar: no section bar above it.
  const inTool = /^\/tools\/[^/]+/.test(language.path);
  const tabs: [string, string, boolean][] = [
    [tr("Free Tools"), localLink("/tools"), !inAcademy],
    [tr("Academy"), localLink("/learn/academy"), inAcademy],
  ];

  return (
    <div className="growth-lab growth-shell">
      {!inTool && (
      <nav className="growth-bar" aria-label={tr("Free tools and academy")}>
        <div className="growth-bar-inner">
          {tabs.map(([label, href, on]) => (
            <a key={href} href={href} aria-current={on ? "page" : undefined}>
              {label}
            </a>
          ))}
          <span className="growth-bar-promise" aria-hidden="true">
            {tr("Free · No Upload · No Account")}
          </span>
          <a
            className="growth-bar-lang"
            href={localizedPath(language.path, other)}
            hrefLang={other === "fr" ? "fr-CA" : "en-CA"}
            lang={other}
          >
            {other === "fr" ? "Français" : "English"}
          </a>
        </div>
      </nav>
      )}
      <div className="growth-main">{children}</div>
      <aside className="growth-made">
        <p className="eyebrow">{tr("Made for people making things.")}</p>
        <h2>{tr("Rather we just made it for you?")}</h2>
        <p>
          {tr(
            "These tools are free and stay free. When the job is bigger than a browser tab, 3D3D prints, models and builds it.",
          )}
        </p>
        <div className="growth-made-links">
          <a href={localLink("/3d-printing")}>{tr("3D Printing")}</a>
          <a href={localLink("/software-development")}>{tr("Custom Software")}</a>
          <a href={localLink("/quote")}>{tr("Talk About A Project")}</a>
        </div>
      </aside>
    </div>
  );
}
