import type { ReadingSection } from "./types";

/**
 * A lesson as a sequence of composed steps, not a document (2026-11-11). The owner, on these pages:
 * "Don't build thin pages ... a white page with a couple of letters and a few boxes", and "Even though
 * these are mobile pages, they should have a lot more to them." Each lesson was one diagram, then
 * thirteen phone screens of paragraphs.
 *
 * Nothing here writes lesson text. A section's own sentences are cut into parts, in order: running
 * text, a sentence carrying a key number (set as a number plate) or a sentence set large as a pull
 * line. Every sentence lands in exactly one part, once, so the server HTML holds the whole lesson and
 * nothing is repeated for a screen reader. `scripts/audit/academy-compose.test.mts` checks that over
 * all 80 lessons.
 */
export type Part =
  | { kind: "p"; text: string }
  | { kind: "number"; value: string; text: string }
  | { kind: "line"; text: string };

/** A measurement the lesson states: a length, size, temperature, share, time, mass or price. */
export const KEY_NUMBER =
  /\d[\d,.]*(?:\s?[×x]\s?\d[\d,.]*)*\s?(?:mm|millimetres?|millimeters?|millimètres?|°C|degrees?|degrés|percent|per cent|pour cent|%|minutes?|hours?|heures?|grams?|grammes?|cm|CAD|kg|seconds?|secondes?)(?![\p{L}])/iu;

// "e.g." and friends end in a full stop but do not end a sentence.
const NOT_AN_END = /(?:^|\s)(?:e\.g|i\.e|etc|vs|approx|p\. ?ex|env|no|nº)\.$/i;

/** A paragraph's sentences, in order; joined with single spaces they are the paragraph. */
export function sentences(paragraph: string): string[] {
  const out: string[] = [];
  let start = 0;
  for (const m of paragraph.matchAll(/[.!?…]["»”’)]*(\s+)(?=["«“(]?[\p{Lu}\d])/gu)) {
    const end = m.index + m[0].length - m[1].length;
    if (NOT_AN_END.test(paragraph.slice(start, end))) continue;
    out.push(paragraph.slice(start, end));
    start = m.index + m[0].length;
  }
  out.push(paragraph.slice(start));
  return out.filter((s) => s.trim());
}

/**
 * Cut the sections into parts. About every `gap` characters of running text (roughly one phone screen
 * at 390 px) the next sentence that can carry a figure becomes one: a key number once a quarter
 * screen has passed, otherwise a sentence of a readable length set large. `breaks` are the section
 * indexes after which the page places a block of its own (key terms), so the count starts again.
 */
export function composeReading(sections: Pick<ReadingSection, "paragraphs">[], { gap = 800, breaks = [] as number[] } = {}): Part[][] {
  let since = 0;
  return sections.map((section, index) => {
    const parts: Part[] = [];
    for (const paragraph of section.paragraphs) {
      let run: string[] = [];
      const flush = () => {
        if (run.length) parts.push({ kind: "p", text: run.join(" ") });
        run = [];
      };
      for (const sentence of sentences(paragraph)) {
        const number = sentence.match(KEY_NUMBER);
        const feature = number ? since >= gap / 4 : since >= gap && sentence.length >= 70 && sentence.length <= 180;
        if (feature) {
          flush();
          parts.push(number ? { kind: "number", value: number[0].trim(), text: sentence } : { kind: "line", text: sentence });
          since = 0;
        } else {
          run.push(sentence);
          since += sentence.length;
        }
      }
      flush();
    }
    if (breaks.includes(index)) since = 0;
    return parts;
  });
}

const escapeRegExp = (s: string) => s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

/** Glossary entries the lesson's own text uses, in the order the text first uses them. */
export function keyTerms<T extends readonly string[]>(text: string, glossary: readonly T[], max = 3): T[] {
  return glossary
    .map((entry) => {
      const head = escapeRegExp(entry[0].split(" / ")[0]);
      const at = text.search(new RegExp(`(?<![\\p{L}])${head}(?:e?s)?(?![\\p{L}])`, "iu"));
      return [at, entry] as const;
    })
    .filter(([at]) => at >= 0)
    .sort((a, b) => a[0] - b[0])
    .slice(0, max)
    .map(([, entry]) => entry);
}
