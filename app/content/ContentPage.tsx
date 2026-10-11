import type { ReactNode } from "react";
import { useLocation } from "react-router";

/**
 * The page the tools sit in. On the 3D3D site this is the site's own chrome (header,
 * menus, footer). Here it is a skip link, the scroll container the tools expect and a
 * one-line footer. The props are the ones the tools pass; only `children` is used.
 */
export default function ContentPage({
  children,
}: {
  accent?: string;
  startHref?: string;
  startLabel?: string;
  subscribe?: boolean;
  litFooterCta?: boolean;
  chrome?: boolean;
  children: ReactNode;
}) {
  const fr = /^\/fr(\/|$)/.test(useLocation().pathname);
  return (
    <main className="host-page" id="top">
      <a href="#content" className="skip-link">
        {fr ? "Passer au contenu" : "Skip to content"}
      </a>
      <div id="content" tabIndex={-1}>
        {children}
      </div>
      <footer className="host-foot">
        {fr
          ? "Outils gratuits et académie par 3D3D. Licence Apache-2.0. Tout s’exécute dans votre navigateur."
          : "Free tools and academy by 3D3D. Apache-2.0 licence. Everything runs in your browser."}
      </footer>
    </main>
  );
}
