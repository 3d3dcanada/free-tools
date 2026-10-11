export type Locale = "en" | "fr";
export type ToolGuide = {
  slug: string;
  locale: Locale;
  title: string;
  description: string;
  name: string;
  headline: string;
  summary: string;
  answer: string;
  steps: string[];
  sections: { heading: string; paragraphs: string[] }[];
  comparison: { name: string; detail: string; url: string }[];
  faqs: { q: string; a: string }[];
  service: { label: string; path: string };
  sources?: { label: string; url: string }[];
};
export const origin = "https://3d3d.ca";
export const localizedPath = (path: string, locale: Locale) => (locale === "fr" ? "/fr" : "") + path;
export function languagePath(path: string) {
  const locale: Locale = path === "/fr" || path.startsWith("/fr/") ? "fr" : "en";
  return { locale, path: locale === "fr" ? path.slice(3) || "/" : path };
}
export function guideSchema(guide: ToolGuide) {
  const path = localizedPath(`/tools/${guide.slug}`, guide.locale);
  const url = origin + path;
  const fr = guide.locale === "fr";
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebApplication",
        "@id": url + "#app",
        name: guide.name,
        description: guide.answer,
        url,
        inLanguage: guide.locale,
        applicationCategory: "UtilitiesApplication",
        operatingSystem: "Any",
        isAccessibleForFree: true,
        offers: { "@type": "Offer", price: 0, priceCurrency: "CAD" },
        screenshot: origin + `/og/tools/${guide.slug}.${guide.locale}.jpg`,
      },
      {
        "@type": "FAQPage",
        "@id": url + "#faq",
        inLanguage: guide.locale,
        mainEntity: guide.faqs.map(({ q, a }) => ({
          "@type": "Question",
          name: q,
          acceptedAnswer: { "@type": "Answer", text: a },
        })),
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          ["3D3D", "/"],
          [fr ? "Outils gratuits" : "Free tools", localizedPath("/tools", guide.locale)],
          [guide.name, path],
        ].map(([name, item], i) => ({ "@type": "ListItem", position: i + 1, name, item: origin + item })),
      },
      {
        "@type": "HowTo",
        "@id": url + "#steps",
        name: guide.name,
        description: guide.answer,
        inLanguage: guide.locale,
        step: guide.steps.map((text, i) => ({
          "@type": "HowToStep",
          position: i + 1,
          text,
          url: url + `#step-${i + 1}`,
        })),
      },
    ],
  };
}
export function pageMeta(path: string, locale: Locale, title: string, description: string, image: string) {
  return [
    { title },
    { name: "description", content: description },
    { tagName: "link", rel: "canonical", href: origin + localizedPath(path, locale) },
    ...(["en", "fr"] as const).map((lang) => ({
      tagName: "link",
      rel: "alternate",
      hrefLang: lang,
      href: origin + localizedPath(path, lang),
    })),
    { tagName: "link", rel: "alternate", hrefLang: "x-default", href: origin + path },
    { property: "og:type", content: "website" },
    { property: "og:title", content: title },
    { property: "og:description", content: description },
    { property: "og:url", content: origin + localizedPath(path, locale) },
    { property: "og:locale", content: locale === "fr" ? "fr_CA" : "en_CA" },
    { property: "og:image", content: origin + image },
    { property: "og:image:width", content: "1200" },
    { property: "og:image:height", content: "630" },
    { property: "og:image:alt", content: title },
    { name: "twitter:card", content: "summary_large_image" },
    { name: "twitter:title", content: title },
    { name: "twitter:description", content: description },
    { name: "twitter:image", content: origin + image },
    { name: "twitter:image:alt", content: title },
  ];
}
