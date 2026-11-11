import { useEffect, useState } from "react";
import { useLocale, useT } from "./locale";
import {
  emitToolFeedback,
  helpState,
  markAsked,
  NOTE_MAX,
  readAsked,
  TOOL_USE_EVENT,
  type FeedbackAnswer,
} from "./tooluse";
import { nextStepFor } from "../tools/next-step";

/**
 * "Did this help?" : a small inline card that appears only AFTER the first
 * export or run in this page load, docked as a slim strip at the foot of the app
 * (2026-11-11: under the app a phone never saw it).
 * Never a modal, never over the work, never before use. Asked at most once per
 * tool per 30 days (localStorage); after an answer or a dismiss, only the one
 * quiet next-step link stays.
 */
export default function DidThisHelp({ slug }: { slug: string }) {
  const tr = useT();
  const locale = useLocale();
  const [used, setUsed] = useState(false);
  const [answered, setAnswered] = useState<FeedbackAnswer | null>(null);
  const [dismissed, setDismissed] = useState(false);
  const [noteOpen, setNoteOpen] = useState(false);
  const [note, setNote] = useState("");
  const [closed, setClosed] = useState(false);

  useEffect(() => {
    const onUse = (e: Event) => {
      const detail = (e as CustomEvent<{ slug: string }>).detail;
      if (!detail || detail.slug === slug) setUsed(true);
    };
    window.addEventListener(TOOL_USE_EVENT, onUse);
    return () => window.removeEventListener(TOOL_USE_EVENT, onUse);
  }, [slug]);

  // When this tool was last asked, read once for this page load. Showing the card
  // stamps "asked now" for the next visit; reading it again on every render would
  // hide the card the moment the visitor taps No, before the note box can be used.
  const [askedAt] = useState(() => readAsked(slug));
  const ask = helpState(used && !answered && !dismissed, askedAt);
  useEffect(() => {
    if (ask === "ask") markAsked(slug);
  }, [ask, slug]);

  if (!used || closed) return null;
  const step = nextStepFor(slug, locale);
  const answer = (a: FeedbackAnswer) => {
    emitToolFeedback(slug, a, a === "no" && note ? note : undefined);
    setAnswered(a);
  };

  // The next step, with its own close so the strip never stays in the way.
  const next = (
    <p className="tool-next">
      <a href={step.href}>{tr(step.text)}</a>
      <button type="button" className="tool-help-close" aria-label={tr("Dismiss")} onClick={() => setClosed(true)}>×</button>
    </p>
  );
  if (answered)
    return (
      <div className="tool-help" role="status">
        <p className="tool-help-thanks">{tr("Thanks. That goes straight to the person who builds these.")}</p>
        {next}
      </div>
    );

  if (ask !== "ask") return next;

  return (
    <div className="tool-help" role="group" aria-label={tr("Did this help?")}>
      <div className="tool-help-row">
        <p>{tr("Did this help?")}</p>
        <div className="tool-help-actions">
          <button type="button" onClick={() => answer("yes")}>{tr("Yes")}</button>
          <button type="button" onClick={() => setNoteOpen((o) => !o)}>{tr("No")}</button>
          <button type="button" className="tool-help-close" aria-label={tr("Dismiss")} onClick={() => setDismissed(true)}>×</button>
        </div>
      </div>
      {noteOpen && (
        <div className="tool-help-note">
          <textarea
            value={note}
            maxLength={NOTE_MAX}
            rows={3}
            aria-label={tr("What was missing?")}
            placeholder={tr("What was missing?")}
            onChange={(e) => setNote(e.target.value)}
          />
          <button type="button" onClick={() => answer("no")}>{tr("Send")}</button>
        </div>
      )}
      <p className="tool-next">
        <a href={step.href}>{tr(step.text)}</a>
      </p>
    </div>
  );
}
