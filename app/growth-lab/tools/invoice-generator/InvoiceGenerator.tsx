import { useT, useLocale, translate } from "../../shared/locale";
import { useEffect, useState } from "react";
import { download, imageFile } from "../../shared/browser";
import { DraftFiles, DropZone, ExportBar, History, useEditor } from "../../shared/kit";
import BrandProfile from "../../shared/BrandProfile";
import { changeLibrary } from "../../shared/projects";
import { matchesSearch } from "../navigation";
import {
  billDefaults,
  currencies,
  digits,
  exportProblem,
  money,
  nextDocument,
  copyDocument,
  restoreBilling,
  localDate,
  presetTaxes,
  provinces,
  taxChecked,
  taxSource,
  totals,
  validBilling,
  templates,
  docLangs,
  designOf,
  docT,
  qtyText,
  type Bill,
  type Design,
  type DocLang,
  type Currency,
  type Kind,
  type Line,
} from "./model";
/** Ink or white on the accent, whichever reads. */
function onAccent(hex: string) {
  const c = [1, 3, 5].map((i) => parseInt(hex.slice(i, i + 2), 16) / 255).map((v) => (v <= 0.04 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4));
  return 0.2126 * c[0] + 0.7152 * c[1] + 0.0722 * c[2] > 0.35 ? "#0a0a0a" : "#ffffff";
}
export default function InvoiceGenerator({
  initialKind = "invoice",
  draftKey = "3d3d-public-billing-v1",
}: {
  initialKind?: Kind;
  draftKey?: string;
}) {
  const tr = useT(),
    locale = useLocale();
  // the sample text is rebuilt per language, and an unedited sample is never
  // stored, so the page language decides it (see useLocalDraft).
  const sampleFor = (l: "en" | "fr") => {
    const t = (text: string) => translate(text, l);
    const sample = {
      ...billDefaults,
      bill: {
        ...billDefaults.bill,
        business: t(billDefaults.bill.business),
        address: t(billDefaults.bill.address),
        client: {
          ...billDefaults.bill.client,
          name: t(billDefaults.bill.client.name),
          address: t(billDefaults.bill.client.address),
        },
        lines: billDefaults.bill.lines.map((line) => ({ ...line, description: t(line.description) })),
        notes: t(billDefaults.bill.notes),
      },
    };
    return initialKind === "invoice" ? sample : nextDocument(sample, initialKind);
  };
  const defaults = sampleFor(locale);
  const editor = useEditor(draftKey, defaults, validBilling, [sampleFor("en"), sampleFor("fr")]);
  const state = editor.value,
    b = state.bill;
  const [notice, setNotice] = useState("");
  const [clientQuery, setClientQuery] = useState(""), [itemQuery, setItemQuery] = useState("");
  const patch = (next: Partial<Bill>) => editor.setValue({ ...state, bill: { ...b, ...next } });
  // A new document starts in the page's language; after that it is the user's choice.
  const design: Design = b.design ? designOf(b) : { ...designOf(b), lang: locale },
    L = design.lang;
  const D = (k: string) => docT(k, L);
  const setDesign = (p: Partial<Design>) => patch({ design: { ...design, ...p } });
  const copy = (kind: Kind) => {
    try {
      const next = copyDocument(state, kind, localDate());
      changeLibrary(localStorage, "billing-backup", validBilling, projects => [...projects, {
        id: crypto.randomUUID(), name: `${b.number || tr("Document")} · ${b.client.name}`.slice(0, 100),
        updated: new Date().toISOString(), value: state,
      }]);
      editor.setValue(next);
      setNotice("Original saved in Projects & Backups. Review the new number, dates and payment details before issuing.");
    } catch (e) { setNotice((e as Error).message); }
  };
  useEffect(() => {
    if (editor.ready && !b.date)
      editor.setValue((s) => ({ ...s, bill: { ...s.bill, date: localDate() } }));
  }, [editor.ready, b.date, editor.setValue]);
  let calculated: ReturnType<typeof totals> | undefined;
  const problem = exportProblem(b);
  try {
    calculated = totals(b);
  } catch {
    /* Incomplete numeric input stays visible until corrected. */
  }
  const item = (index: number, change: Partial<Line>) =>
    patch({ lines: b.lines.map((l, i) => (i === index ? { ...l, ...change } : l)) });
  function saveClient() {
    if (!b.client.name.trim()) {
      setNotice("Enter a client name first.");
      return;
    }
    const index = state.clients.findIndex((c) => c.name === b.client.name && c.email === b.client.email);
    if (index < 0 && state.clients.length >= 100) {
      setNotice("The local client list is full (100). Remove an entry first.");
      return;
    }
    editor.setValue({
      ...state,
      clients:
        index < 0
          ? [...state.clients, { ...b.client }]
          : state.clients.map((c, i) => (i === index ? { ...b.client } : c)),
    });
    setNotice("Client saved on this device.");
  }
  const field = (
    label: string,
    key: "business" | "email" | "number" | "date" | "due" | "paid" | "paymentMethod" | "paymentDate",
    max = 100,
    type = "text",
  ) => (
    <label>
      {tr(label)}
      <input type={type} maxLength={max} value={b[key]} onChange={(e) => patch({ [key]: e.target.value })} />
    </label>
  );
  return (
    <section className="workspace" aria-label={tr("Invoice, quote and receipt editor")}>
      <History editor={editor} />
      <div className="two-column">
        <div className="controls">
          <div className="library-actions">
            <DraftFiles value={state} valid={validBilling} onLoad={loaded => editor.setValue(restoreBilling(state, loaded))} name="billing-backup" title={b.number} />
            <BrandProfile applyLabel="Apply Business Details" onApply={p => patch({ business: p.company || p.name, address: p.address, email: p.email, logo: p.logo, design: { ...design, accent: p.accent } })} />
          </div>
          <button type="button" onClick={() => copy(b.kind === "quote" ? "invoice" : b.kind)}>{tr(b.kind === "quote" ? "Create Invoice Copy" : "Duplicate as New Document")}</button>
          <p className="fine">{tr("A new copy gets a new local number. The original stays in Projects & Backups; payment details are cleared.")}</p>
          <details><summary>{tr("Style & Document Language")}</summary>
          <p className="panel-label">{tr("Style")}</p>
          <div className="doc-templates">
            {templates.map((tpl) => (
              <button
                key={tpl}
                type="button"
                className="doc-template"
                data-template={tpl}
                aria-pressed={design.template === tpl}
                onClick={() => setDesign({ template: tpl })}
                style={{ ["--doc-accent" as string]: design.accent }}
              >
                <span className="doc-mini" aria-hidden="true">
                  <i className="m-band" />
                  <i className="m-title" />
                  <i className="m-l1" />
                  <i className="m-l2" />
                  <i className="m-row" />
                  <i className="m-row" />
                  <i className="m-tot" />
                </span>
                <span>{tr(tpl[0].toUpperCase() + tpl.slice(1))}</span>
              </button>
            ))}
          </div>
          <p className="panel-label">{tr("Accent Colour")}</p>
          <div className="accent-row">
            {["#04d9c4", "#ff2d92", "#ff6a00", "#18e36b", "#0f172a", "#1d4ed8", "#7c3aed", "#b4232a", "#0e7c66", "#c99a2e"].map((c) => (
              <button
                key={c}
                type="button"
                className="accent-dot"
                style={{ background: c }}
                aria-pressed={design.accent.toLowerCase() === c}
                aria-label={c}
                onClick={() => setDesign({ accent: c })}
              />
            ))}
            <label className="accent-dot accent-custom" title={tr("Custom colour")}>
              <input type="color" value={design.accent} onChange={(e) => setDesign({ accent: e.target.value })} aria-label={tr("Custom colour")} />
            </label>
          </div>
          <div className="field-grid">
            <label>
              {tr("Typeface")}
              <select value={design.font} onChange={(e) => setDesign({ font: e.target.value as Design["font"] })}>
                <option value="sans">{tr("Sans")}</option>
                <option value="serif">{tr("Serif")}</option>
                <option value="mono">{tr("Mono")}</option>
              </select>
            </label>
            <label>
              {tr("Document Language")}
              <select value={L} onChange={(e) => setDesign({ lang: e.target.value as DocLang })}>
                {(Object.keys(docLangs) as DocLang[]).map((k) => (
                  <option key={k} value={k}>
                    {docLangs[k]}
                  </option>
                ))}
              </select>
            </label>
          </div>
          </details>
          <p className="fine">{tr("Sample wording is provided. Replace it with your business and client details.")}</p>
          <div className="field-grid">
            <label>
              {tr("Document Type")}
              <select
                aria-label={tr("Document Type")}
                value={b.kind}
                onChange={(e) => {
                  try {
                    copy(e.target.value as Kind);
                  } catch (e) {
                    setNotice((e as Error).message);
                  }
                }}
              >
                <option value="invoice">{tr("Invoice")}</option>
                <option value="quote">{tr("Quote")}</option>
                <option value="receipt">{tr("Receipt")}</option>
              </select>
            </label>
            <label>
              {tr("Currency")}
              <select
                aria-label={tr("Currency")}
                value={b.currency}
                onChange={(e) => patch({ currency: e.target.value as Currency })}
              >
                {currencies.map((c) => (
                  <option key={c}>{c}</option>
                ))}
              </select>
            </label>
          </div>
          <p className="fine">
            {tr("Changing currency relabels amounts; it does not convert them. JPY uses whole yen.")}
          </p>
          <div className="field-grid">
            {field("Document Number", "number", 40)}
            {field("Issue Date", "date", 10, "date")}
          </div>
          <button
            onClick={() => {
              try {
                editor.setValue(nextDocument(state, b.kind));
              } catch (e) {
                setNotice((e as Error).message);
              }
            }}
          >
            {tr("Next Number")}
          </button>
          <p className="fine">
            {tr("Numbers are local to this browser. Check against your records before issuing a document.")}
          </p>
          {b.kind !== "receipt" &&
            field(b.kind === "quote" ? "Valid Until (optional)" : "Due Date (optional)", "due", 10, "date")}
          <details open>
            <summary>{tr("Your business")}</summary>
            {field("Business Name", "business")}
            <label>
              {tr("Business Address")}
              <textarea
                aria-label={tr("Business Address")}
                maxLength={400}
                value={b.address}
                onChange={(e) => patch({ address: e.target.value })}
              />
            </label>
            {field("Business Email", "email", 150, "email")}
            <DropZone
              label={tr("Business Logo")}
              accept="image/png,image/jpeg,image/webp"
              onFiles={async ([file]) => patch({ logo: await imageFile(file) })}
            />
            {b.logo && <button onClick={() => patch({ logo: "" })}>{tr("Remove Logo")}</button>}
          </details>
          <details open>
            <summary>{tr("Client")}</summary>
            {!!state.clients.length && <label>{tr("Search Saved Clients")}<input type="search" value={clientQuery} onChange={e => setClientQuery(e.target.value)} /></label>}
            {!!state.clients.length && (
              <label>
                {tr("Saved Clients")}
                <select
                  aria-label={tr("Saved Clients")}
                  value=""
                  onChange={(e) => patch({ client: { ...state.clients[+e.target.value] } })}
                >
                  <option value="" disabled>
                    {tr("Choose a client")}
                  </option>
                  {state.clients.map((c, i) => ({ c, i })).filter(({ c }) => matchesSearch(`${c.name} ${c.email}`, clientQuery)).map(({ c, i }) => (
                    <option key={i} value={i}>
                      {c.name} · {c.email}
                    </option>
                  ))}
                </select>
              </label>
            )}
            <label>
              {tr("Client Name")}
              <input
                maxLength={100}
                value={b.client.name}
                onChange={(e) => patch({ client: { ...b.client, name: e.target.value } })}
              />
            </label>
            <label>
              {tr("Client Address")}
              <textarea
                aria-label={tr("Client Address")}
                maxLength={400}
                value={b.client.address}
                onChange={(e) => patch({ client: { ...b.client, address: e.target.value } })}
              />
            </label>
            <label>
              {tr("Client Email")}
              <input
                type="email"
                maxLength={150}
                value={b.client.email}
                onChange={(e) => patch({ client: { ...b.client, email: e.target.value } })}
              />
            </label>
            <button onClick={saveClient}>{tr("Save Client")}</button>
            {!!state.clients.length && (
              <details>
                <summary>{tr("Manage saved clients")}</summary>
                {state.clients.map((c, i) => (
                  <p key={i}>
                    {c.name}{" "}
                    <button
                      onClick={() =>
                        editor.setValue({ ...state, clients: state.clients.filter((_, n) => n !== i) })
                      }
                    >
                      {tr("Remove saved client")} {i + 1}
                    </button>
                  </p>
                ))}
              </details>
            )}
          </details>
          <details>
            <summary>{tr("Taxes and registration numbers")}</summary>
            <label>
              {tr("Canadian Tax Preset")}
              <select
                aria-label={tr("Canadian Tax Preset")}
                value=""
                onChange={(e) => {
                  const taxes = presetTaxes(e.target.value).map((tax) => ({ ...tax, label: tr(tax.label) }));
                  patch({ taxes, lines: b.lines.map((l) => ({ ...l, taxIds: taxes.map((t) => t.id) })) });
                }}
              >
                <option value="" disabled>
                  {tr("Choose a province or custom")}
                </option>
                {Object.entries(provinces).map(([id, p]) => (
                  <option value={id} key={id}>
                    {tr(
                      p.name +
                        (p.rates.length
                          ? " · " + p.rates.map(([name, rate]) => `${name} ${rate}%`).join(" + ")
                          : ""),
                    )}
                  </option>
                ))}
              </select>
            </label>
            <p className="fine">
              {tr("General rates checked")} {taxChecked}
              {tr(
                ". A preset applies all its taxes to every item; adjust the checkboxes for exemptions. Choose only taxes you are registered and required to collect.",
              )}{" "}
              <a href={taxSource}>{tr("Official rates and place-of-supply guidance")}</a>.
            </p>
            {b.taxes.map((tax, i) => (
              <fieldset key={tax.id}>
                <legend>
                  {tr("Tax")} {i + 1}
                </legend>
                <div className="field-grid">
                  <label>
                    {tr("Tax Name")} {i + 1}
                    <input
                      maxLength={40}
                      value={tax.label}
                      onChange={(e) =>
                        patch({
                          taxes: b.taxes.map((t, n) => (n === i ? { ...t, label: e.target.value } : t)),
                        })
                      }
                    />
                  </label>
                  <label>
                    {tr("Tax Rate")} {i + 1} (%)
                    <input
                      inputMode="decimal"
                      value={tax.rate}
                      onChange={(e) =>
                        patch({
                          taxes: b.taxes.map((t, n) => (n === i ? { ...t, rate: e.target.value } : t)),
                        })
                      }
                    />
                  </label>
                </div>
                <label>
                  {tr("Registration Number")} {i + 1}
                  <input
                    maxLength={80}
                    value={tax.registration}
                    onChange={(e) =>
                      patch({
                        taxes: b.taxes.map((t, n) => (n === i ? { ...t, registration: e.target.value } : t)),
                      })
                    }
                  />
                </label>
                <button
                  onClick={() =>
                    patch({
                      taxes: b.taxes.filter((_, n) => n !== i),
                      lines: b.lines.map((l) => ({ ...l, taxIds: l.taxIds.filter((id) => id !== tax.id) })),
                    })
                  }
                >
                  {tr("Remove Tax")} {i + 1}
                </button>
              </fieldset>
            ))}
            <button
              disabled={b.taxes.length >= 4}
              onClick={() => {
                const id = `tax-${Date.now()}`;
                patch({
                  taxes: [...b.taxes, { id, label: tr("Tax"), rate: "0", registration: "" }],
                  lines: b.lines.map((l) => ({ ...l, taxIds: [...l.taxIds, id] })),
                });
              }}
            >
              {tr("Add Tax Line")}
            </button>
            <p className="fine">
              {tr(
                "Each item is rounded to the currency's smallest unit. Each tax is calculated on the subtotal of its selected items, then rounded half up. Taxes are not compounded.",
              )}
            </p>
          </details>
          <h2>{tr("Line items")}</h2>
          {!!state.items.length && <label>{tr("Search Saved Items")}<input type="search" value={itemQuery} onChange={e => setItemQuery(e.target.value)} /></label>}
          {!!state.items.length && (
            <label>
              {tr("Saved Items")}
              <select
                aria-label={tr("Saved Items")}
                value=""
                onChange={(e) => {
                  const saved = state.items[+e.target.value];
                  if (saved.currency !== b.currency) {
                    setNotice(
                      `This item is priced in ${saved.currency}. Change the document currency or enter its price yourself.`,
                    );
                    return;
                  }
                  if (b.lines.length >= 50) return;
                  const line: Line = {
                    description: saved.description,
                    quantity: saved.quantity,
                    price: saved.price,
                    taxIds: saved.taxIds,
                  };
                  patch({
                    lines: [
                      ...b.lines,
                      { ...line, taxIds: line.taxIds.filter((id) => b.taxes.some((t) => t.id === id)) },
                    ],
                  });
                }}
              >
                <option value="" disabled>
                  {tr("Choose an item")}
                </option>
                {state.items.map((line, i) => ({ line, i })).filter(({ line }) => matchesSearch(line.description, itemQuery)).map(({ line, i }) => (
                  <option key={i} value={i}>
                    {line.description} · {line.currency} {line.price}
                  </option>
                ))}
              </select>
            </label>
          )}
          {b.lines.map((line, i) => (
            <fieldset key={i} className="invoice-line">
              <legend>
                {tr("Item")} {i + 1}
              </legend>
              <label>
                {tr("Description")} {i + 1}
                <textarea
                  aria-label={`Description ${i + 1}`}
                  maxLength={300}
                  value={line.description}
                  onChange={(e) => item(i, { description: e.target.value })}
                />
              </label>
              <div className="field-grid">
                <label>
                  {tr("Quantity")} {i + 1}
                  <input
                    inputMode="decimal"
                    value={line.quantity}
                    onChange={(e) => item(i, { quantity: e.target.value })}
                  />
                </label>
                <label>
                  {tr("Unit Price")} {i + 1}
                  <input
                    inputMode="decimal"
                    value={line.price}
                    onChange={(e) => item(i, { price: e.target.value })}
                  />
                </label>
              </div>
              {b.taxes.map((tax) => (
                <label className="check" key={tax.id}>
                  <input
                    type="checkbox"
                    checked={line.taxIds.includes(tax.id)}
                    onChange={(e) =>
                      item(i, {
                        taxIds: e.target.checked
                          ? [...line.taxIds, tax.id]
                          : line.taxIds.filter((id) => id !== tax.id),
                      })
                    }
                  />
                  {tr("Apply")} {tax.label} {tr("to item")} {i + 1}
                </label>
              ))}
              <div className="toolbar">
                <button
                  disabled={b.lines.length <= 1}
                  onClick={() => patch({ lines: b.lines.filter((_, n) => n !== i) })}
                >
                  {tr("Remove Item")} {i + 1}
                </button>
                <button
                  disabled={state.items.length >= 100}
                  onClick={() => {
                    editor.setValue({ ...state, items: [...state.items, { ...line, currency: b.currency }] });
                    setNotice("Item saved on this device.");
                  }}
                >
                  {tr("Save Item")} {i + 1}
                </button>
              </div>
            </fieldset>
          ))}
          <button
            disabled={b.lines.length >= 50}
            onClick={() =>
              patch({
                lines: [
                  ...b.lines,
                  {
                    description: "",
                    quantity: "1",
                    price: digits(b.currency) ? "0.00" : "0",
                    taxIds: b.taxes.map((t) => t.id),
                  },
                ],
              })
            }
          >
            {tr("Add Item")}
          </button>
          {!!state.items.length && (
            <details>
              <summary>{tr("Manage saved items")}</summary>
              {state.items.map((l, i) => (
                <p key={i}>
                  {l.description}{" "}
                  <button
                    onClick={() =>
                      editor.setValue({ ...state, items: state.items.filter((_, n) => n !== i) })
                    }
                  >
                    {tr("Remove saved item")} {i + 1}
                  </button>
                </p>
              ))}
            </details>
          )}
          {b.kind !== "quote" && (
            <details open={b.kind === "receipt"}>
              <summary>{tr("Payment received")}</summary>
              {field("Amount Paid", "paid", 15)}
              {field("Payment Method", "paymentMethod")}
              {field("Payment Date", "paymentDate", 10, "date")}
              <p className="fine">
                {tr(
                  "Leave the amount blank when payment is unknown. A receipt needs the amount actually received.",
                )}
              </p>
            </details>
          )}
          <label>
            {tr("Notes and Payment Terms")}
            <textarea
              aria-label={tr("Notes and Payment Terms")}
              maxLength={1600}
              value={b.notes}
              onChange={(e) => patch({ notes: e.target.value })}
            />
          </label>
          <p role="status" className="fine">
            {tr(notice || editor.storage)}
          </p>
        </div>
        <div className="output invoice-output">
          <div className="output-scroll">
            <article
              className="invoice-preview"
              aria-label={tr("Document preview")}
              data-template={design.template}
              data-font={design.font}
              lang={L}
              style={{ ["--doc-accent" as string]: design.accent, ["--doc-on" as string]: onAccent(design.accent) }}
            >
              <div className="invoice-head">
                <div>
                  {b.logo && <img src={b.logo} alt={tr("Your business logo")} />}
                  <strong>{b.business}</strong>
                  <p>
                    {b.address}
                    <br />
                    {b.email}
                  </p>
                </div>
                <div>
                  <h2>{D(b.kind)}</h2>
                  <p>
                    {b.number}
                    {b.date && (
                      <>
                        <br />
                        {D("issued")} {b.date}
                      </>
                    )}
                  </p>
                  {b.due && b.kind !== "receipt" && (
                    <p>
                      {b.kind === "quote" ? D("valid") : D("due")} {b.due}
                    </p>
                  )}
                </div>
              </div>
              <p>
                <small>
                  {D(b.kind === "quote" ? "preparedFor" : b.kind === "receipt" ? "receivedFrom" : "billTo").toUpperCase()}
                </small>
                <br />
                <strong>{b.client.name}</strong>
                <br />
                {b.client.address}
                <br />
                {b.client.email}
              </p>
              <div className="table-scroll">
                <table>
                  <caption>{b.currency}</caption>
                  <thead>
                    <tr>
                      <th>{D("description")}</th>
                      <th>{D("qty")}</th>
                      <th>{D("amount")}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {b.lines.map((l, i) => (
                      <tr key={i}>
                        <td>{l.description}</td>
                        <td>{qtyText(l.quantity, L)}</td>
                        <td>
                          {calculated ? money(calculated.amounts[i], b.currency, L) : tr("Incomplete")}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              {calculated && (
                <dl className="invoice-totals">
                  <dt>{D("subtotal")}</dt>
                  <dd>{money(calculated.subtotal, b.currency, L)}</dd>
                  {calculated.taxes.map((t) => (
                    <div key={t.id}>
                      <dt>
                        {t.label} {L === "en" ? t.rate : t.rate.replace(".", ",")}%
                      </dt>
                      <dd>{money(t.amount, b.currency, L)}</dd>
                    </div>
                  ))}
                  <dt className="grand">{b.kind === "quote" ? D("quotedTotal") : D("total")}</dt>
                  <dd className="grand">
                    <strong>{money(calculated.total, b.currency, L)}</strong>
                  </dd>
                  {b.kind !== "quote" && (
                    <>
                      <dt>{D("paid")}</dt>
                      <dd>
                        {calculated.paid === null ? D("notRecorded") : money(calculated.paid, b.currency, L)}
                      </dd>
                      <dt>{D("balance")}</dt>
                      <dd>
                        {calculated.balance === null ? D("notCalculated") : money(calculated.balance, b.currency, L)}
                      </dd>
                    </>
                  )}
                </dl>
              )}
              <p className="invoice-notes">{b.notes}</p>
            </article>
            {problem && (
              <p role="alert" className="notice">
                {tr(problem)}
              </p>
            )}
            <p className="fine">
              {tr(
                "Your logo and details, with no added watermark. A PDF export does not send, file or collect payment for this document.",
              )}
            </p>
          </div>
          <div className="output-actions">
            <ExportBar
              disabled={!!problem}
              actions={{
                "Download PDF": async () => {
                  const { invoicePdf } = await import("./export");
                  download(
                    `${b.kind}-${b.number.replace(/[^a-zA-Z0-9_-]/g, "-")}.pdf`,
                    await invoicePdf(b),
                    "application/pdf",
                  );
                },
              }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
