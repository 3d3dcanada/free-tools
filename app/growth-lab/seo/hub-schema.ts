import { catalogFor } from "../tools/catalog";
import { localizedPath, origin, type ToolGuide } from "./guide";
export function hubSchema(guide: ToolGuide) {
  const url = origin + localizedPath("/tools", guide.locale);
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "CollectionPage",
        "@id": url,
        url,
        name: guide.name,
        description: guide.answer,
        inLanguage: guide.locale,
        isAccessibleForFree: true,
        mainEntity: {
          "@type": "ItemList",
          itemListElement: catalogFor(guide.locale).map((tool, i) => ({
            "@type": "ListItem",
            position: i + 1,
            name: tool.name,
            url: origin + localizedPath(`/tools/${tool.slug}`, guide.locale),
          })),
        },
      },
      {
        "@type": "FAQPage",
        "@id": url + "#faq",
        mainEntity: guide.faqs.map(({ q, a }) => ({
          "@type": "Question",
          name: q,
          acceptedAnswer: { "@type": "Answer", text: a },
        })),
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "3D3D", item: origin + "/" },
          { "@type": "ListItem", position: 2, name: guide.name, item: url },
        ],
      },
    ],
  };
}
