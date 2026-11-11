import { LocaleProvider, useT, useLocale, useLocalLink } from "../shared/locale";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { DataPromise } from "../shared/kit";
import { catalogFor } from "./catalog";
import { categories, categoryFor, matchesSearch, plainName } from "./navigation";
import ToolGuide from "../seo/ToolGuide";
import type { ToolGuide as Guide } from "../seo/guide";
import { hubSchema } from "../seo/hub-schema";
import { ToolIcon } from "../shared/toolIcons";
import ToolPreview from "../shared/ToolPreview";
import { TOOL_FAMILIES } from "../seo/tool-families";
import { readRecent } from "./recent";

const CATEGORY_ACCENT: Record<string, string> = {
  "QR and Contacts": "#04D9C4",
  Design: "#FF2D92",
  Images: "#04D9C4",
  "PDF Documents": "#FF6A00",
  Business: "#18E36B",
  "3D Printing": "#FF6A00",
};
/** One line under each category title. */
const BLURB: Record<string, string> = {
  "QR and Contacts": "Links, Wi-Fi, contacts and events as codes that scan.",
  Design: "Cards, flyers, posters, social images and presentations.",
  Images: "Convert, resize, crop, compress and clean up pictures.",
  "PDF Documents": "Merge, split, reorder, stamp and convert pages.",
  Business: "Invoices, quotes and receipts with your own prices.",
  "3D Printing": "Open a model, check the fit and price the print.",
};
/**
 * The long practical guide stays in the page (it is the hub's text for search and for answer
 * engines) but folds shut on a phone, where it was five screens by itself. Open from 651 px up.
 */
function GuideFold({ guide, label, children }: { guide: Guide; label: string; children?: ReactNode }) {
  const ref = useRef<HTMLDetailsElement>(null);
  useEffect(() => {
    if (window.matchMedia("(min-width: 651px)").matches && ref.current) ref.current.open = true;
  }, []);
  return (
    <details ref={ref} className="hub-guide">
      <summary>{label}</summary>
      {children}
      <ToolGuide guide={guide} />
    </details>
  );
}
/** The free resources that lived on the old /tools page, kept. */
const MORE: { title: string; accent: string; links: [string, string, string][] }[] = [
  {
    title: "Privacy and Credit",
    accent: "#04D9C4",
    links: [
      ["SNITCH", "/snitch", "The complete image, document and text privacy tool."],
      ["Check image metadata", "/check-image-metadata", "See location, camera, date and other metadata carried by an image."],
      ["Remove EXIF online", "/remove-exif-online", "Remove image metadata in the browser."],
      ["Inspect PDF metadata", "/does-a-pdf-show-who-made-it", "Read supported author and document fields. PDF rewriting is not available here; use a PDF editor and recheck the result."],
      ["Remove a Word document author", "/remove-author-from-word-document", "Inspect Office properties and download a copy with selected fields removed."],
      ["Add photo credit and copyright fields", "/add-copyright-to-photo", "Write credit metadata to JPEG, PNG or WebP. Metadata is attribution, not copyright protection."],
      ["Inspect Content Credentials", "/is-this-image-ai-generated", "Look for C2PA credentials and their validation results."],
    ],
  },
  {
    title: "Learn and Explore",
    accent: "#18E36B",
    links: [
      ["Learn with OpenKernel EDU", "https://openkernel.3d3d.ca", "Play with real operating-system, CPU and memory concepts in a browser."],
      ["Find a 3D model", "/repositories", "A curated map of model libraries, with licence and safety notes."],
      ["Browse our public source code", "/open-source", "CAD, privacy, education, local AI and security tools with direct source links."],
      ["The 3D Printing Academy", "/learn/academy", "Forty free lessons, from first layer to a product worth selling."],
    ],
  },
];

export default function ToolsHub({ guide }: { guide: Guide }) {
  return (
    <LocaleProvider locale={guide.locale}>
      <Hub guide={guide} />
    </LocaleProvider>
  );
}
/**
 * The hub is a launcher (2026-11-11, after Ken: "Nobody knows what's going on. Everything's
 * repetitive."). One heading and one line, the search, the tools used last in this browser,
 * then every tool exactly once in its family, then the other free resources. The guide and
 * the data promise fold shut at the end, still in the server HTML.
 */
function Hub({ guide }: { guide: Guide }) {
  const tr = useT();
  const locale = useLocale();
  const localLink = useLocalLink();
  const toolCatalog = catalogFor(locale);
  const [query, setQuery] = useState("");
  // Read after hydration only: the server has no history, and the first paint must match it.
  const [recent, setRecent] = useState<string[]>([]);
  useEffect(() => setRecent(readRecent()), []);
  const results = toolCatalog.filter((t) => matchesSearch(`${t.name} ${t.slug} ${t.summary}`, query));
  const recentTools = recent.map((slug) => toolCatalog.find((t) => t.slug === slug)).filter((t) => !!t);
  return (
    <section className="hub-app" aria-label={tr("Free browser tools")}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(hubSchema(guide)).replace(/</g, "\\u003c") }}
      />
      <header className="hub-head">
        <h1>{guide.headline}</h1>
        <p>{tr("Pick a tool. It opens ready to use, and nothing leaves your device.")}</p>
      </header>
      <div className="hub-find">
        <span aria-hidden="true">⌕</span>
        <input
          type="search"
          aria-label={tr("Find a Tool")}
          placeholder={tr("Try Wi-Fi, image, invoice or STL")}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </div>
      {query && (
        <p role="status" className="fine hub-status">
          {results.length} {results.length === 1 ? tr("tool") : tr("tools")}
          {locale === "fr" ? ` pour « ${query} »` : ` matching “${query}”`}.
        </p>
      )}
      {!query && recentTools.length > 0 && (
        <section className="hub-recent" aria-label={tr("Recently Used")}>
          <h2>{tr("Recently Used")}</h2>
          <ul>
            {recentTools.map((t) => (
              <li key={t.slug} style={{ ["--accent" as string]: CATEGORY_ACCENT[categoryFor(t.slug)] }}>
                <a href={localLink(`/tools/${t.slug}`)}>
                  <ToolIcon slug={t.slug} />
                  <span>{plainName(t.short)}</span>
                </a>
              </li>
            ))}
          </ul>
        </section>
      )}
      {categories.slice(1).map((c) => {
        const group = results.filter((t) => categoryFor(t.slug) === c);
        return group.length ? (
          <section key={c} id={TOOL_FAMILIES.find((f) => f.category === c)?.id} className="hub-group" aria-label={tr(c)} style={{ ["--accent" as string]: CATEGORY_ACCENT[c] }}>
            <h2>{tr(c)}</h2>
            <p>{tr(BLURB[c] ?? "")}</p>
            <ul className="hub-list">
              {group.map((t) => (
                <li key={t.slug}>
                  <a className="hub-row" href={localLink(`/tools/${t.slug}`)}>
                    <ToolPreview slug={t.slug} />
                    <span>
                      <strong>{plainName(t.short)}</strong>
                      <small>{t.summary}</small>
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </section>
        ) : null;
      })}
      {!results.length && (
        <p className="hub-none">
          {tr("No matching tools. Try a shorter term or select all categories.")}{" "}
          <button type="button" onClick={() => setQuery("")}>{tr("Clear Search")}</button>
        </p>
      )}
      {!query &&
        MORE.map((group) => (
          <section key={group.title} className="hub-group" aria-label={tr(group.title)} style={{ ["--accent" as string]: group.accent }}>
            <h2>{tr(group.title)}</h2>
            <ul className="hub-list">
              {group.links.map(([label, href, line]) => (
                <li key={href}>
                  <a className="hub-row hub-row-link" href={href.startsWith("http") ? href : localLink(href)}>
                    <span>
                      <strong>{tr(label)}</strong>
                      <small>{tr(line)}</small>
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </section>
        ))}
      <GuideFold guide={guide} label={tr("Read the practical guide")}>
        <p className="answer">{guide.answer}</p>
        <DataPromise />
      </GuideFold>
    </section>
  );
}
