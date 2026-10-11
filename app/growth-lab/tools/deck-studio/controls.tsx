import { useId, type ReactNode } from "react";
import { useDT } from "./i18n";
import { createPortal } from "react-dom";
import Dialog from "../../shared/Dialog";
import { TOKENS, palette, type Deck, type Paint } from "./model";

/** Small, reusable inspector controls. */

export function Field({ label, children, wide }: { label: string; children: ReactNode; wide?: boolean }) {
  return (
    <label className={`ds-field${wide ? " ds-field-wide" : ""}`}>
      <span>{label}</span>
      {children}
    </label>
  );
}

export function Num({
  value,
  onChange,
  min,
  max,
  step = 1,
  suffix,
}: {
  value: number;
  onChange: (v: number) => void;
  min?: number;
  max?: number;
  step?: number;
  suffix?: string;
}) {
  return (
    <span className="ds-num">
      <input
        type="number"
        value={Number.isFinite(value) ? Math.round(value * 100) / 100 : 0}
        min={min}
        max={max}
        step={step}
        onChange={(e) => {
          const v = e.target.valueAsNumber;
          if (Number.isFinite(v)) onChange(min !== undefined || max !== undefined ? Math.min(max ?? v, Math.max(min ?? v, v)) : v);
        }}
      />
      {suffix && <em>{suffix}</em>}
    </span>
  );
}

export function Slider({
  value,
  onChange,
  min,
  max,
  step = 1,
  format = (v: number) => String(v),
}: {
  value: number;
  onChange: (v: number) => void;
  min: number;
  max: number;
  step?: number;
  format?: (v: number) => string;
}) {
  return (
    <span className="ds-slider">
      <input type="range" min={min} max={max} step={step} value={value} onChange={(e) => onChange(+e.target.value)} />
      <output>{format(value)}</output>
    </span>
  );
}

export function Seg<T extends string>({
  value,
  options,
  onChange,
  label,
}: {
  value: T;
  options: { v: T; label: ReactNode; title?: string }[];
  onChange: (v: T) => void;
  label: string;
}) {
  return (
    <div className="ds-seg" role="group" aria-label={label}>
      {options.map((o) => (
        <button
          key={o.v}
          type="button"
          aria-pressed={value === o.v}
          title={o.title}
          aria-label={o.title}
          onClick={() => onChange(o.v)}
        >
          {o.label}
        </button>
      ))}
    </div>
  );
}

export function Toggle({ on, onChange, label }: { on: boolean; onChange: (v: boolean) => void; label: string }) {
  return (
    <button type="button" className="ds-toggle" aria-pressed={on} onClick={() => onChange(!on)}>
      <i aria-hidden="true" />
      {label}
    </button>
  );
}

const TOKEN_LABEL: Record<string, string> = {
  ink: "Ink",
  muted: "Muted",
  bg: "Background",
  surface: "Surface",
  accent: "Accent",
  accent2: "Accent 2",
  accent3: "Accent 3",
  line: "Line",
};

/** Theme colours first (so the deck restyles with its theme), then any custom colour. */
export function ColorField({
  deck,
  value,
  onChange,
  allowNone,
}: {
  deck: Deck;
  value: Paint | "";
  onChange: (v: Paint | "") => void;
  allowNone?: boolean;
}) {
  const tt = useDT();
  const p = palette(deck);
  const id = useId();
  const hex = value.startsWith("theme:") ? p[value.slice(6) as keyof typeof p] : value || "#ffffff";
  return (
    <div className="ds-color">
      {allowNone && (
        <button
          type="button"
          className="ds-swatch ds-swatch-none"
          aria-pressed={value === ""}
          title={tt("None")}
          aria-label={tt("None")}
          onClick={() => onChange("")}
        />
      )}
      {TOKENS.map((t) => (
        <button
          key={t}
          type="button"
          className="ds-swatch"
          style={{ background: p[t] }}
          aria-pressed={value === `theme:${t}`}
          title={`${tt("Theme")} ${tt(TOKEN_LABEL[t])}`}
          aria-label={`${tt("Theme")} ${tt(TOKEN_LABEL[t])}`}
          onClick={() => onChange(`theme:${t}`)}
        />
      ))}
      <label className="ds-swatch ds-swatch-custom" htmlFor={id} title={tt("Custom colour")} style={{ background: value && !value.startsWith("theme:") ? value : undefined }}>
        <input
          id={id}
          type="color"
          value={/^#[0-9a-f]{6}$/i.test(hex) ? hex : "#ffffff"}
          onChange={(e) => onChange(e.target.value)}
          aria-label={tt("Custom colour")}
        />
      </label>
    </div>
  );
}

export function Section({ title, children, open = true }: { title: string; children: ReactNode; open?: boolean }) {
  return (
    <details className="ds-section" open={open}>
      <summary>{title}</summary>
      <div className="ds-section-body">{children}</div>
    </details>
  );
}

export function Modal({
  title,
  onClose,
  children,
  wide,
}: {
  title: string;
  onClose: () => void;
  children: ReactNode;
  wide?: boolean;
}) {
  const tt = useDT();
  // Portalled to <body> so it sits above the site header and drawer.
  return createPortal(
    <Dialog open title={title} className="growth-lab ds-modal-layer" onClose={onClose}>
      <div className={`ds-modal${wide ? " ds-modal-wide" : ""}`}>
        <header>
          <h2>{title}</h2>
          <button type="button" className="ds-x" aria-label={tt("Close")} onClick={onClose}>
            ×
          </button>
        </header>
        <div className="ds-modal-body">{children}</div>
      </div>
    </Dialog>,
    document.body,
  );
}
