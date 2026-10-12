import { LocaleProvider, useT, useLocale, useLocalLink } from "../shared/locale";
import { useState } from "react";
import { DataPromise, Pledge } from "../shared/kit";
import { catalogFor } from "./catalog";
import { categories, categoryFor, matchesSearch } from "./navigation";
import ToolGuide from "../seo/ToolGuide";
import type { ToolGuide as Guide } from "../seo/guide";
import { hubSchema } from "../seo/hub-schema";
import { ToolIcon } from "../shared/toolIcons";
import ToolPreview from "../shared/ToolPreview";
import { TOOL_FAMILIES } from "../seo/tool-families";
import QuickTools from "./QuickTools";

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
function Hub({ guide }: { guide: Guide }) {
  const tr = useT();
  const locale = useLocale();
  const localLink = useLocalLink();
  const toolCatalog = catalogFor(locale);

  const [query, setQuery] = useState(""),
    [category, setCategory] = useState(categories[0]);
  const results = toolCatalog.filter(
    (t) =>
      (category === categories[0] || categoryFor(t.slug) === category) &&
      matchesSearch(`${t.name} ${t.slug} ${t.summary}`, query),
  );
  return (
    <section aria-label={tr("Free browser tools")}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(hubSchema(guide)).replace(/</g, "\\u003c") }}
      />
      <QuickTools locale={locale} />
      <div className="hero hub-hero">
        <p className="eyebrow">{tr("A workshop in your browser")}</p>
        <h1>{guide.headline}</h1>
        <p className="answer">{guide.answer}</p>
        <Pledge />
      </div>
      <div className="hub-search">
        <label>
          {tr("Find a Tool")}
          <input
            type="search"
            aria-label={tr("Find a Tool")}
            placeholder={tr("Try Wi-Fi, image, invoice or STL")}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </label>
        <label>
          {tr("Category")}
          <select aria-label={tr("Category")} value={category} onChange={(e) => setCategory(e.target.value)}>
            {categories.map((c) => (
              <option key={c} value={c}>
                {tr(c)}
              </option>
            ))}
          </select>
        </label>
      </div>
      {!query && category === categories[0] && (
        <section className="hub-design" aria-label={tr("What Are You Making?")}>
          <div><p className="eyebrow">{tr("Design and Download")}</p><h2>{tr("What Are You Making?")}</h2><p>{tr("Choose a format, make it yours, and export a real file.")}</p></div>
          <nav aria-label={tr("Design studios")}>
            {["business-card", "flyer-maker", "poster-maker", "social-image-maker", "pitch-deck"].map((slug) => {
              const tool = toolCatalog.find((t) => t.slug === slug);
              return tool && <a key={slug} href={localLink(`/tools/${slug}`)}><ToolIcon slug={slug} /><strong>{tool.short}</strong><span aria-hidden="true">→</span></a>;
            })}
          </nav>
        </section>
      )}
      {!query && category === categories[0] && (
        <div className="hub-featured" aria-label={tr("Most used")}>
          {(
            [
              ["pitch-deck", "#FF2D92", "Deck Studio", "Design a presentation on a real canvas, then present it or export PowerPoint and PDF."],
              ["qr-code", "#04D9C4", "QR Studio", "Twelve looks, custom shapes and your logo in the centre, checked by a scan."],
              ["invoice-generator", "#18E36B", "Invoices and Quotes", "Five styles, your colours, six languages and Canadian tax presets."],
              ["model-viewer", "#FF6A00", "3D Model Viewer", "Open STL, OBJ and 3MF files, measure them and check they fit your printer."],
            ] as const
          ).map(([slug, accent, name, line]) => (
            <a key={slug} className="hub-feature" href={localLink(`/tools/${slug}`)} style={{ ["--accent" as string]: accent }}>
              <ToolIcon slug={slug} />
              <strong>{tr(name)}</strong>
              <span>{tr(line)}</span>
              <em aria-hidden="true">{tr("Open")} →</em>
            </a>
          ))}
        </div>
      )}
      <p role="status" className="fine hub-status">
        {results.length} {results.length === 1 ? tr("tool") : tr("tools")}
        {query ? (locale === "fr" ? ` pour « ${query} »` : ` matching “${query}”`) : tr(" ready to use")}.
      </p>
      {(query || category !== categories[0]) && <button type="button" onClick={() => { setQuery(""); setCategory(categories[0]); }}>{tr("Clear Search")}</button>}
      {categories.slice(1).map((c) => {
        const group = results.filter((t) => categoryFor(t.slug) === c);
        return group.length ? (
          <section key={c} id={TOOL_FAMILIES.find((f) => f.category === c)?.id} className="hub-category hub-cards" aria-label={tr(c)} style={{ ["--accent" as string]: CATEGORY_ACCENT[c] }}>
            <header className="hub-category-head">
              <h2>{tr(c)}</h2>
              <p>{tr(BLURB[c] ?? "")}</p>
              <span className="hub-count">
                {group.length} {group.length === 1 ? tr("tool") : tr("tools")}
              </span>
            </header>
            <ul className="hub-grid">
              {group.map((t) => (
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
          </section>
        ) : null;
      })}
      {!results.length && <p>{tr("No matching tools. Try a shorter term or select all categories.")}</p>}
      {!query && category === categories[0] &&
        MORE.map((group) => (
          <section key={group.title} className="hub-category hub-cards" aria-label={tr(group.title)} style={{ ["--accent" as string]: group.accent }}>
            <header className="hub-category-head">
              <h2>{tr(group.title)}</h2>
              <span className="hub-count">
                {group.links.length} {tr("tools")}
              </span>
            </header>
            <ul className="hub-grid">
              {group.links.map(([label, href, line]) => (
                <li key={href}>
                  <a className="hub-tool hub-tool-link" href={href.startsWith("http") ? href : localLink(href)}>
                    <strong>{tr(label)}</strong>
                    <span>{tr(line)}</span>
                    <em aria-hidden="true">{tr("Open")} →</em>
                  </a>
                </li>
              ))}
            </ul>
          </section>
        ))}
      {!query && category === categories[0] && <DataPromise />}
      <aside className="hub-commission">
        <p className="eyebrow">{tr("Built to order")}</p>
        <h2>{tr("Need a tool for a different job?")}</h2>
        <p>{tr("Describe the repetitive or private job and 3D3D will quote a tool that does exactly that.")}</p>
        <div className="growth-made-links">
          <a href={localLink("/apps")}>{tr("Everything we build, on one page")}</a>
          <a href={localLink("/quote?for=software&context=document-tool")}>{tr("Commission a tool")}</a>
        </div>
      </aside>
      <aside className="reference">
        <h2>{tr("Learn what makes a better print.")}</h2>
        <p>
          {tr("The public")} <a href={localLink("/learn/academy")}>{tr("3D Printing Academy")}</a>{" "}
          {tr(
            "takes you from first layers to your first considered product. To inspect or remove image metadata, use",
          )}{" "}
          <a href={localLink("/snitch")}>{tr("SNITCH")}</a>.
        </p>
      </aside>
      <ToolGuide guide={guide} />
    </section>
  );
}
