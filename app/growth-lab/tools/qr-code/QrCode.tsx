import { useT, useLocale } from "../../shared/locale";
import { useEffect, useState } from "react";
import { download, imageFile } from "../../shared/browser";
import { DraftFiles, DropZone, ExportBar, History, useEditor } from "../../shared/kit";
import BrandProfile from "../../shared/BrandProfile";
import { qrUseCase, useCases } from "./use-cases";
import { parseCsv } from "../../shared/csv";
import {
  cornerSampleSvg,
  cornerStyles,
  dotSampleSvg,
  dotStyles,
  initialTag,
  sampleTag,
  isTag,
  kinds,
  ndef,
  payload,
  qrPresets,
  qrSvg,
  qrWarnings,
  tagSvg,
  type QrKind,
  type Tag,
  type QrStyle,
} from "./model";
import { saveQr, scanQr } from "./exports";
import { SITE_BASE } from "../../../lib/free-tools-host";
const names: Record<QrKind, string> = {
  url: "Website",
  text: "Text",
  wifi: "Wi-Fi",
  vcard: "Contact · vCard 3.0",
  mecard: "Contact · MeCard",
  email: "Email",
  sms: "SMS",
  phone: "Phone",
  location: "Location",
  event: "Calendar Event",
  app: "App Store Link",
};
const shapeNames: Record<string, string> = {
  square: "Square",
  round: "Rounded",
  circle: "Circle",
  diamond: "Diamond",
  classy: "Classy",
  tiny: "Fine Dots",
  bars: "Bars",
  leaf: "Leaf",
  dot: "Dot Centre",
};
function localizeSample(tag: Tag, locale: "en" | "fr", kind: QrKind): Tag {
  const own = sampleTag(locale, kind), other = sampleTag(locale === "en" ? "fr" : "en", kind);
  const swap = (v: string, a: string, b: string) => (v === b && a !== b ? a : v);
  const label = swap(tag.label, own.label, other.label), caption = swap(tag.caption, own.caption, other.caption);
  const fields = { ...tag.fields };
  for (const k of ["ssid", "subject", "title"] as const) fields[k] = swap(tag.fields[k], own.fields[k], other.fields[k]);
  return label === tag.label && caption === tag.caption && (["ssid", "subject", "title"] as const).every((k) => fields[k] === tag.fields[k])
    ? tag
    : { ...tag, label, caption, fields };
}

export default function QrCode({ intent }: { intent?: QrKind }) {
  const tr = useT(),
    locale = useLocale();
  // the draft key is shared by both languages, so the untouched sample is
  // rebuilt per language and an unedited one is never stored (see useLocalDraft).
  const editor = useEditor(
    `3d3d:qr:v2:${intent || "all"}`,
    sampleTag(locale, intent || "url"),
    isTag,
    [sampleTag("en", intent || "url"), sampleTag("fr", intent || "url")],
  );
  const { setValue: setTag } = editor;
  // A saved draft keeps the sample wording of the language it was edited in; show
  // the sample text in this page's language (an English page showed a French caption).
  const tag = localizeSample(editor.value, locale, intent || "url");
  const [scan, setScan] = useState("Checking…");
  let svg = "",
    issue = "";
  try {
    svg = tagSvg(tag, locale);
  } catch (e) {
    issue = (e as Error).message;
  }
  useEffect(() => {
    let live = true;
    setScan("Checking…");
    const timer = setTimeout(() => {
      scanQr(tag)
        .then((ok) => {
          if (live)
            setScan(
              ok ? "PASS · Your exact content was decoded" : "FAIL · Simplify the design before exporting",
            );
        })
        .catch((e) => {
          if (live) setScan("FAIL · " + e.message);
        });
    }, 180);
    return () => {
      live = false;
      clearTimeout(timer);
    };
  }, [tag]);
  function field(key: string, label: string, type = "text") {
    return (
      <label key={key}>
        {tr(label)}
        <input
          type={type}
          value={tag.fields[key] || ""}
          maxLength={500}
          onChange={(e) => setTag({ ...tag, fields: { ...tag.fields, [key]: e.target.value } })}
        />
      </label>
    );
  }
  const style = (patch: Partial<typeof tag.style>) => setTag({ ...tag, style: { ...tag.style, ...patch } });
  return (
    <section className="workspace" aria-label={tr("QR code studio")}>
      <History editor={editor} />
      <div className="two-column qr-workspace">
        <div className="controls">
          <DraftFiles value={tag} valid={isTag} onLoad={setTag} name="qr-draft" title={tag.label} />
            <BrandProfile applyLabel="Apply Contact & Brand" onApply={b => {
              const [first = "", ...last] = b.name.trim().split(/\s+/);
              setTag({ ...tag, fields: { ...tag.fields, first, last: last.join(" "), company: b.company, phone: b.phone, email: b.email, url: b.website, address: b.address },
                ...(tag.kind === "url" && b.website ? { value: b.website } : {}), style: { ...tag.style, logo: b.logo, frameColor: b.accent } });
            }} />
          <label>{tr("Start With a Use Case")}<select value="" onChange={e => {
            if (e.target.value && window.confirm(tr("Apply this use case? It updates the heading and style. Undo restores your design."))) setTag(qrUseCase(tag, e.target.value as (typeof useCases)[number]["id"], locale));
          }}><option value="" disabled>{tr("Choose a Starting Point")}</option>{useCases.filter(c => !intent || c.kind === intent).map(c => <option key={c.id} value={c.id}>{tr(c.label)}</option>)}</select></label>
          <p className="fine">{tr("Replace example links and contact details with your own. For Wi-Fi, enter the network name, security and password exactly as configured.")}</p>
          <label>
            {tr("Content Type")}
            <select
              aria-label={tr("Content Type")}
              value={tag.kind}
              onChange={(e) => setTag({ ...tag, kind: e.target.value as QrKind })}
            >
              {kinds.map((k) => (
                <option key={k} value={k}>
                  {tr(names[k])}
                </option>
              ))}
            </select>
          </label>
          {["url", "text", "app"].includes(tag.kind) && (
            <label>
              {tr("QR Content")}
              <textarea
                aria-label={tr("QR Content")}
                rows={2}
                maxLength={1000}
                value={tag.value}
                onChange={(e) => setTag({ ...tag, value: e.target.value })}
              />
            </label>
          )}
          {tag.kind === "wifi" && (
            <>
              {field("ssid", "Network Name")}
              {field("password", "Network Password", "password")}
              <label>
                {tr("Security")}
                <select
                  value={tag.fields.security}
                  onChange={(e) => setTag({ ...tag, fields: { ...tag.fields, security: e.target.value } })}
                >
                  <option value="WPA">{tr("WPA / WPA2 / WPA3 personal")}</option>
                  <option value="WEP">{tr("WEP")}</option>
                  <option value="nopass">{tr("No Password")}</option>
                </select>
              </label>
              <label className="check">
                <input
                  type="checkbox"
                  checked={tag.fields.hidden === "true"}
                  onChange={(e) =>
                    setTag({ ...tag, fields: { ...tag.fields, hidden: String(e.target.checked) } })
                  }
                />
                {tr("Hidden Network")}
              </label>
              <p className="fine">
                {tr("The password is readable by anyone holding the code. Use a guest network.")}
              </p>
            </>
          )}
          {["vcard", "mecard"].includes(tag.kind) && (
            <div className="field-grid">
              {field("first", "First Name")}
              {field("last", "Last Name")}
              {field("company", "Company")}
              {field("phone", "Contact Phone")}
              {field("email", "Contact Email")}
              {field("url", "Website")}
              {field("address", "Address")}
            </div>
          )}
          {tag.kind === "email" && (
            <>
              {field("email", "Email Address")}
              {field("subject", "Subject")}
              {field("body", "Message")}
            </>
          )}
          {["phone", "sms"].includes(tag.kind) && (
            <>
              {field("phone", "Phone Number")}
              {tag.kind === "sms" && field("body", "Message")}
            </>
          )}
          {tag.kind === "location" && (
            <>
              {field("latitude", "Latitude")}
              {field("longitude", "Longitude")}
              <label>
                {tr("Location Format")}
                <select
                  value={tag.fields.locationType}
                  onChange={(e) =>
                    setTag({ ...tag, fields: { ...tag.fields, locationType: e.target.value } })
                  }
                >
                  <option value="geo">{tr("geo: coordinates")}</option>
                  <option value="maps">{tr("Google Maps Link")}</option>
                </select>
              </label>
            </>
          )}
          {tag.kind === "event" && (
            <>
              {field("title", "Event Name")}
              {field("start", "Starts (local event time)", "datetime-local")}
              {field("end", "Ends (local event time)", "datetime-local")}
              {field("place", "Venue")}
              {field("body", "Description")}
              <p className="fine">
                {tr(
                  "Floating local times: attendees use the event's local clock time. Check the imported calendar before sharing.",
                )}
              </p>
            </>
          )}
          <details><summary>{tr("Style & Colours")}</summary><div className="qr-studio">
            <p className="panel-label">{tr("Style")}</p>
            <div className="style-gallery" role="list">
              {qrPresets.map((p) => {
                const look = { ...tag.style, ...p.style, logo: "" };
                const on = (Object.keys(p.style) as (keyof QrStyle)[]).every(
                  (k) => (tag.style[k] ?? "") === (p.style[k] ?? ""),
                );
                return (
                  <button
                    key={p.name}
                    type="button"
                    role="listitem"
                    className="style-tile"
                    aria-pressed={on}
                    onClick={() => style(p.style)}
                  >
                    <span
                      className="style-thumb"
                      dangerouslySetInnerHTML={{ __html: qrSvg("https://3d3d.ca/tools", { ...look, size: 192 }, locale) }}
                    />
                    <span>{tr(p.name)}</span>
                  </button>
                );
              })}
            </div>

            <p className="panel-label">{tr("Centre Logo")}</p>
            <div className="logo-row">
              {tag.style.logo ? (
                <img className="logo-thumb" src={tag.style.logo} alt={tr("Your logo")} />
              ) : (
                <span className="logo-thumb logo-empty" aria-hidden="true">
                  +
                </span>
              )}
              <div className="logo-pick">
                <DropZone
                  label={tag.style.logo ? tr("Replace Logo") : tr("Add Your Logo")}
                  accept="image/png,image/jpeg,image/webp"
                  onFiles={async ([file]) => style({ logo: await imageFile(file) })}
                />
              </div>
            </div>
            {tag.style.logo && (
              <div className="logo-tune">
                <label>
                  {tr("Logo Size")} · {Math.round(tag.style.logoSize * 100)}%
                  <input
                    type="range"
                    min=".1"
                    max=".3"
                    step=".01"
                    value={tag.style.logoSize}
                    onChange={(e) => style({ logoSize: +e.target.value })}
                  />
                </label>
                <button type="button" onClick={() => style({ logo: "" })}>
                  {tr("Remove Logo")}
                </button>
                <p className="fine">{tr("High error correction is enabled automatically.")}</p>
              </div>
            )}

            <p className="panel-label">{tr("Dot Shape")}</p>
            <div className="shape-row">
              {dotStyles.map((d) => (
                <button
                  key={d}
                  type="button"
                  className="shape-tile"
                  aria-pressed={tag.style.dots === d}
                  aria-label={tr(shapeNames[d])}
                  title={tr(shapeNames[d])}
                  onClick={() => style({ dots: d })}
                >
                  <span
                    dangerouslySetInnerHTML={{
                      __html: dotSampleSvg(d),
                    }}
                  />
                </button>
              ))}
            </div>
            <p className="panel-label">{tr("Corner Shape")}</p>
            <div className="shape-row">
              {cornerStyles.map((c) => (
                <button
                  key={c}
                  type="button"
                  className="shape-tile corner-tile"
                  aria-pressed={tag.style.corners === c}
                  aria-label={tr(shapeNames[c])}
                  title={tr(shapeNames[c])}
                  onClick={() => style({ corners: c })}
                >
                  <span
                    dangerouslySetInnerHTML={{
                      __html: cornerSampleSvg(c),
                    }}
                  />
                </button>
              ))}
            </div>

            <p className="panel-label">{tr("Colours")}</p>
            <div className="swatch-grid">
              <label>
                {tr("Ink")}
                <input type="color" value={tag.style.foreground} onChange={(e) => style({ foreground: e.target.value })} />
              </label>
              <label>
                {tr("Corner Colour")}
                <input
                  type="color"
                  value={tag.style.eye || tag.style.foreground}
                  onChange={(e) => style({ eye: e.target.value })}
                />
              </label>
              <label>
                {tr("Paper")}
                <input type="color" value={tag.style.background} onChange={(e) => style({ background: e.target.value })} />
              </label>
              <label>
                {tr("Frame Accent")}
                <input
                  type="color"
                  value={tag.style.frameColor || "#04d9c4"}
                  onChange={(e) => style({ frameColor: e.target.value })}
                />
              </label>
            </div>
            <div className="segmented" role="group" aria-label={tr("Ink Fill")}>
              {(["solid", "linear", "radial"] as const).map((g) => {
                const on = g === "solid" ? !tag.style.gradient : !!tag.style.gradient && (tag.style.gradientType ?? "linear") === g;
                return (
                  <button
                    key={g}
                    type="button"
                    aria-pressed={on}
                    onClick={() =>
                      style(
                        g === "solid"
                          ? { gradient: "" }
                          : { gradient: tag.style.gradient || "#0b3d91", gradientType: g },
                      )
                    }
                  >
                    {tr(g === "solid" ? "Solid" : g === "linear" ? "Linear Blend" : "Radial Blend")}
                  </button>
                );
              })}
            </div>
            {tag.style.gradient && (
              <label>
                {tr("Second Ink")}
                <input type="color" value={tag.style.gradient} onChange={(e) => style({ gradient: e.target.value })} />
              </label>
            )}
          </div>
          </details><details open>
            <summary>{tr("Frame and Caption")}</summary>
            <label className="check">
              <input
                type="checkbox"
                checked={tag.style.frame}
                onChange={(e) => style({ frame: e.target.checked })}
              />
              {tr("Caption Frame")}
            </label>
            {tag.style.frame && (
              <>
                <label>
                  {tr("Tag Heading")}
                  <input
                    maxLength={35}
                    value={tag.label}
                    onChange={(e) => setTag({ ...tag, label: e.target.value })}
                  />
                </label>
                <label>
                  {tr("Tag Caption")}
                  <input
                    maxLength={50}
                    value={tag.caption}
                    onChange={(e) => setTag({ ...tag, caption: e.target.value })}
                  />
                </label>
              </>
            )}
            <div className="field-grid">
              <label>
                {tr("Size at 96 DPI")}
                <input
                  type="number"
                  min="192"
                  max="1200"
                  step="1"
                  value={tag.style.size}
                  onChange={(e) => style({ size: +e.target.value })}
                />
              </label>
              <label>
                {tr("Quiet Zone (modules)")}
                <input
                  type="number"
                  min="4"
                  max="12"
                  value={tag.style.quiet}
                  onChange={(e) => style({ quiet: +e.target.value })}
                />
              </label>
              <label>
                {tr("PNG DPI")}
                <select value={tag.style.dpi} onChange={(e) => style({ dpi: +e.target.value })}>
                  {[72, 96, 150, 300, 600].map((d) => (
                    <option key={d}>{d}</option>
                  ))}
                </select>
              </label>
            </div>
          </details>
          <details>
            <summary>{tr("Batch from CSV")}</summary>
            <p className="fine">
              {tr(
                "Up to 100 rows. Headers: name, value, kind, plus any content field (ssid, password, first, last, email…). Each code is scan-checked before the ZIP is saved.",
              )}
            </p>
            <button
              onClick={() =>
                download(
                  "qr-batch.csv",
                  "name,kind,value\nStudio,url,https://3d3d.ca\nHelp,url,https://3d3d.ca/quote\n",
                  "text/csv",
                )
              }
            >
              {tr("Download CSV Example")}
            </button>
            <DropZone
              label={tr("Batch CSV")}
              accept=".csv,text/csv"
              onFiles={async ([file]) => {
                const rows = parseCsv(await file.text());
                const { default: JSZip } = await import("jszip");
                const zip = new JSZip();
                for (const [i, row] of rows.entries()) {
                  const next = {
                    ...tag,
                    kind: (row.kind || tag.kind) as QrKind,
                    value: row.value || tag.value,
                    label: (row.name || tag.label).slice(0, 35),
                    fields: {
                      ...tag.fields,
                      ...Object.fromEntries(
                        Object.entries(row).filter(([k]) => Object.hasOwn(initialTag.fields, k)),
                      ),
                    },
                  };
                  if (!isTag(next) || !(await scanQr(next)))
                    throw new Error(`Row ${i + 2} failed validation or scan check. No ZIP was exported.`);
                  const name = `${String(i + 1).padStart(3, "0")}-${(row.name || "code").replace(/[^a-z0-9_-]/gi, "-").slice(0, 60)}`;
                  zip.file(name + ".svg", tagSvg(next, locale));
                  zip.file(name + ".txt", payload(next));
                }
                download("qr-batch.zip", await zip.generateAsync({ type: "blob" }), "application/zip");
              }}
            />
          </details>
        </div>
        <div className="output qr-output">
          <div className="output-scroll">
            <div className="preview">{svg && <div dangerouslySetInnerHTML={{ __html: svg }} />}</div>
            <p className="scan-status" role="status">
              {tr(scan)}
            </p>
            {issue && (
              <p role="alert" className="notice">
                {tr(issue)}
              </p>
            )}
            {qrWarnings(tag.style).map((w) => (
              <p className="notice" key={w}>
                {w}
              </p>
            ))}
            <p className="fine">
              {tr(
                "Static content. No redirect, no expiry, no scan tracking. NFC files need a compatible writing app and enough tag memory. Scan a printed sample with real phones.",
              )}
            </p>
            <nav aria-label={tr("QR services")}>
              <a href={`${SITE_BASE}/quote?for=printing`}>{tr("Printed Signs")}</a>
              <a href={`${SITE_BASE}/nfc-tags`}>{tr("NFC Tags")}</a>
            </nav>
          </div>
          <div className="output-actions">
            <ExportBar
              disabled={!!issue}
              actions={{
                ...Object.fromEntries(
                  ["svg", "png", "pdf", "eps"].map((k) => [
                    `Download ${k.toUpperCase()}`,
                    { run: () => saveQr(tag, k, locale), disabled: !scan.startsWith("PASS") },
                  ]),
                ),
                "Download NFC Content": () => download("nfc-payload.txt", payload(tag), "text/plain"),
                "Download NDEF": () => download("nfc-payload.ndef", ndef(tag), "application/octet-stream"),
              }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
