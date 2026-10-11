export type Correction = {
  lesson: string;
  change: string;
  name: string;
  email: string;
  credit: boolean;
  locale: "en" | "fr";
};
export function readCorrection(value: unknown): Correction;
export function enquiryPayload(
  value: unknown,
  turnstileToken: string,
): {
  journey: "academy-feedback";
  journeyName: string;
  kind: "other";
  turnstileToken: string;
  answers: Record<string, string>;
  summary: { field: string; label: string; value: string; isFile: boolean }[];
};
