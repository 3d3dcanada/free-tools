import { Links, Meta, Outlet, Scripts, ScrollRestoration, useLocation } from "react-router";
import geistLatin from "@fontsource-variable/geist/files/geist-latin-wght-normal.woff2?url";
import geistMonoLatin from "@fontsource-variable/geist-mono/files/geist-mono-latin-wght-normal.woff2?url";
import standaloneStyles from "./standalone.css?url";

// The two preloads are also what the deck HTML export reads to embed the fonts in the file it
// writes (first link Geist, second Geist Mono).
export const links = () => [
  { rel: "stylesheet", href: standaloneStyles },
  { rel: "preload", as: "font", type: "font/woff2", href: geistLatin, crossOrigin: "anonymous" as const },
  { rel: "preload", as: "font", type: "font/woff2", href: geistMonoLatin, crossOrigin: "anonymous" as const },
];

export function Layout({ children }: { children: React.ReactNode }) {
  const fr = /^\/fr(\/|$)/.test(useLocation().pathname);
  return (
    <html lang={fr ? "fr-CA" : "en-CA"}>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
        <Meta />
        <Links />
      </head>
      <body>
        {children}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function App() {
  return <Outlet />;
}
