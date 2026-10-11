import { useEffect, useRef } from "react";
import { TURNSTILE_SITE_KEY } from "../lib/free-tools-host";

declare global {
  interface Window {
    turnstile?: {
      render: (el: HTMLElement, opts: Record<string, unknown>) => string;
      remove: (id: string) => void;
    };
  }
}

const SCRIPT_SRC = "https://challenges.cloudflare.com/turnstile/v0/api.js";

/**
 * The human check on the feedback forms, mounted only after the visitor presses Verify.
 *
 * With `VITE_TURNSTILE_SITE_KEY` set it loads Cloudflare Turnstile and reports each token
 * (and "" when it expires). With no key it makes no network request and reports the
 * placeholder token `no-check`, for a feedback endpoint that does not verify one.
 */
export default function Turnstile({ onToken }: { onToken: (token: string) => void }) {
  const holder = useRef<HTMLDivElement>(null);
  const widgetId = useRef<string | null>(null);
  const cb = useRef(onToken);
  cb.current = onToken;

  useEffect(() => {
    if (!TURNSTILE_SITE_KEY) {
      cb.current("no-check");
      return;
    }
    let cancelled = false;
    const render = () => {
      if (cancelled || !holder.current || !window.turnstile || widgetId.current) return;
      widgetId.current = window.turnstile.render(holder.current, {
        sitekey: TURNSTILE_SITE_KEY,
        callback: (token: string) => cb.current(token),
        "expired-callback": () => cb.current(""),
        "error-callback": () => cb.current(""),
      });
    };
    if (window.turnstile) render();
    else {
      const existing = document.querySelector<HTMLScriptElement>(`script[src^="${SCRIPT_SRC}"]`);
      if (existing) existing.addEventListener("load", render);
      else {
        const s = document.createElement("script");
        s.src = SCRIPT_SRC;
        s.async = true;
        s.addEventListener("load", render);
        document.head.appendChild(s);
      }
    }
    return () => {
      cancelled = true;
      if (widgetId.current && window.turnstile) {
        try {
          window.turnstile.remove(widgetId.current);
        } catch {
          /* already gone */
        }
        widgetId.current = null;
      }
    };
  }, []);

  if (!TURNSTILE_SITE_KEY) return null;
  return <div ref={holder} style={{ minHeight: 65 }} />;
}
