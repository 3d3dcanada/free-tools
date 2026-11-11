/**
 * Counting real use of the free tools, 2026-11-06: every tool page reports
 * `tool_use` once per load on open, on the first real result (run) and on every
 * export, and the "Did this help?" card reports `tool_feedback`.
 *
 * HARD CONSTRAINT, same law as the SNITCH tool: counts and labels only. A
 * payload is never a filename, file size, hash, dimension, anything the
 * visitor typed into the tool, a colour, the URL they encoded, or anything
 * derived from their file. The slug comes from the page path or the guide, the
 * label is a fixed format or button name chosen in code.
 */
import { track } from "../../lib/analytics";

export type ToolUseAction = "open" | "run" | "export";
export type FeedbackAnswer = "yes" | "no";

/** Window event the "Did this help?" card listens for (export and run only). */
export const TOOL_USE_EVENT = "3d3d:tool-use";

/** The note cap for tool_feedback. Longer notes are refused, never sent. */
export const NOTE_MAX = 240;
/** The card is asked at most once per tool per 30 days. */
export const ASK_AGAIN_MS = 30 * 24 * 60 * 60 * 1000;

const askedKey = (slug: string) => `3d3d-tool-feedback:${slug}`;

/** The tool slug behind a page path: /tools/qr-code and /fr/tools/qr-code. */
export function slugFromPath(pathname: string): string {
  const m = /\/(?:fr\/)?tools\/([a-z0-9-]+)/.exec(pathname);
  return m ? m[1] : "";
}

const currentSlug = () =>
  typeof window === "undefined" ? "" : slugFromPath(window.location.pathname);

/** tool_use props: exactly tool, action and an optional label. Nothing else. */
export function toolUsePayload(tool: string, action: ToolUseAction, label?: string) {
  const props: Record<string, string> = { tool, action };
  if (label !== undefined) props.label = label;
  return props;
}

/**
 * tool_feedback props: exactly tool, answer and an optional note. A note longer
 * than NOTE_MAX throws, so a too-long note can never be sent.
 */
export function feedbackPayload(tool: string, answer: FeedbackAnswer, note?: string) {
  if (note !== undefined && note.length > NOTE_MAX)
    throw new RangeError(`tool_feedback note exceeds ${NOTE_MAX} characters`);
  const props: Record<string, string> = { tool, answer };
  if (note) props.note = note;
  return props;
}

/** Send one tool_use event and tell the page (the help card) about a real use. */
export function emitToolUse(
  slug: string,
  action: ToolUseAction,
  label?: string,
  send: typeof track = track,
): void {
  if (!slug) return;
  send("tool_use", toolUsePayload(slug, action, label));
  if (action !== "open" && typeof window !== "undefined" && window.dispatchEvent)
    window.dispatchEvent(new CustomEvent(TOOL_USE_EVENT, { detail: { slug, action } }));
}

/** Send one tool_feedback event. Returns false (and sends nothing) if the note is refused. */
export function emitToolFeedback(
  slug: string,
  answer: FeedbackAnswer,
  note?: string,
  send: typeof track = track,
): boolean {
  if (!slug) return false;
  let props;
  try {
    props = feedbackPayload(slug, answer, note);
  } catch {
    return false;
  }
  send("tool_feedback", props);
  return true;
}

/**
 * Count an export exactly as ExportBar does: the tool and the export kind, never
 * a file name or size. The slug defaults to the current tool page's path.
 */
export function countExport(label: string, slug = currentSlug(), send: typeof track = track): void {
  emitToolUse(slug, "export", label, send);
}

/** When this tool was last asked "Did this help?", or null. */
export function readAsked(slug: string, store?: Storage): number | null {
  try {
    const s = store ?? localStorage;
    const raw = s.getItem(askedKey(slug));
    const n = raw === null ? NaN : Number(raw);
    return Number.isFinite(n) ? n : null;
  } catch {
    return null;
  }
}

/** Remember that the tool was asked now, so it is not asked again for 30 days. */
export function markAsked(slug: string, now = Date.now(), store?: Storage): void {
  try {
    (store ?? localStorage).setItem(askedKey(slug), String(now));
  } catch {
    /* storage blocked: the card simply asks again next visit */
  }
}

export type HelpState = "hidden" | "ask" | "next";

/**
 * What the help card shows: nothing before the first real use, the question the
 * first time (at most once per 30 days), and only the quiet next-step link
 * after that or once answered or dismissed.
 */
export function helpState(used: boolean, askedAt: number | null, now = Date.now()): HelpState {
  if (!used) return "hidden";
  if (askedAt !== null && now - askedAt < ASK_AGAIN_MS) return "next";
  return "ask";
}
