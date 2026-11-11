import { useEffect, useRef, useState } from "react";
import { track } from "../../lib/analytics";

/**
 * Share a free tool or lesson (added 2026-10-09). On a phone the system share sheet opens (every app the visitor has);
 * elsewhere a small menu of plain share links. No share scripts, no widgets, no
 * trackers loaded: each network is an ordinary link that opens in a new tab.
 */
type Net = { id: string; label: string; href: (u: string, t: string) => string };
const NETS: Net[] = [
  { id: "facebook", label: "Facebook", href: (u) => `https://www.facebook.com/sharer/sharer.php?u=${u}` },
  { id: "x", label: "X", href: (u, t) => `https://twitter.com/intent/tweet?url=${u}&text=${t}` },
  { id: "linkedin", label: "LinkedIn", href: (u) => `https://www.linkedin.com/sharing/share-offsite/?url=${u}` },
  { id: "reddit", label: "Reddit", href: (u, t) => `https://www.reddit.com/submit?url=${u}&title=${t}` },
  { id: "whatsapp", label: "WhatsApp", href: (u, t) => `https://wa.me/?text=${t}%20${u}` },
  { id: "pinterest", label: "Pinterest", href: (u, t) => `https://www.pinterest.com/pin/create/button/?url=${u}&description=${t}` },
];

export default function ShareButton({ title, fr = false, className = "" }: { title: string; fr?: boolean; className?: string }) {
  const [open, setOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const box = useRef<HTMLDivElement | null>(null);
  const opener = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    if (!open) return;
    const close = (e: MouseEvent | KeyboardEvent) => {
      if (e instanceof KeyboardEvent) {
        if (e.key !== "Escape") return;
        // Back to Share, not to <body> (WCAG 2.4.3).
        if (box.current?.contains(document.activeElement)) opener.current?.focus();
        setOpen(false);
      } else if (!box.current?.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", close);
    document.addEventListener("keydown", close);
    return () => {
      document.removeEventListener("mousedown", close);
      document.removeEventListener("keydown", close);
    };
  }, [open]);

  const url = () => (typeof window === "undefined" ? "" : window.location.origin + window.location.pathname);
  const note = (kind: string) => track("content_cta", { to: typeof window === "undefined" ? "" : window.location.pathname, kind: `share:${kind}` });

  async function onShare() {
    const nav = typeof navigator === "undefined" ? undefined : navigator;
    // The system sheet only where it is a phone-style sheet; desktop Chrome's
    // version is a thin list, so desktop gets the menu.
    if (nav?.share && window.matchMedia("(pointer: coarse)").matches) {
      try {
        await nav.share({ title, url: url() });
        note("system");
      } catch {
        /* cancelled */
      }
      return;
    }
    setOpen((o) => !o);
  }

  async function copy() {
    try {
      await navigator.clipboard.writeText(url());
      setCopied(true);
      note("copy");
      window.setTimeout(() => setCopied(false), 1800);
    } catch {
      setCopied(false);
    }
  }

  const u = encodeURIComponent(url());
  const t = encodeURIComponent(title);
  return (
    <div ref={box} className={`share-box ${className}`}>
      {/* A disclosure of plain links, not role="menu", which promises arrow keys (4.1.2). */}
      <button ref={opener} type="button" onClick={onShare} aria-expanded={open}>
        {fr ? "Partager" : "Share"}
      </button>
      {open && (
        <div className="share-menu">
          {NETS.map((n) => (
            <a
              key={n.id}
              href={n.href(u, t)}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => {
                note(n.id);
                setOpen(false);
              }}
            >
              {n.label}
            </a>
          ))}
          <a href={`mailto:?subject=${t}&body=${u}`} onClick={() => note("email")}>
            {fr ? "Courriel" : "Email"}
          </a>
          {/* aria-live: "Link copied" is said, not only shown (4.1.3). */}
          <button type="button" onClick={copy} aria-live="polite">
            {copied ? (fr ? "Lien copié" : "Link copied") : fr ? "Copier le lien" : "Copy link"}
          </button>
        </div>
      )}
    </div>
  );
}
