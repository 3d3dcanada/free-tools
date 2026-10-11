import { validImage } from "../../shared/browser";
export const currencies = ["CAD", "USD", "EUR", "GBP", "AUD", "NZD", "CHF", "JPY"] as const;
export type Currency = (typeof currencies)[number];
export type Kind = "invoice" | "quote" | "receipt";
export type Tax = { id: string; label: string; rate: string; registration: string };
export type Line = { description: string; quantity: string; price: string; taxIds: string[] };
export type Client = { name: string; address: string; email: string };
/** How the document looks and which language it is written in (independent of the site language). */
export const templates = ["modern", "bold", "minimal", "classic", "sidebar"] as const;
export type Template = (typeof templates)[number];
export const docLangs = { en: "English", fr: "Français", es: "Español", de: "Deutsch", it: "Italiano", pt: "Português" } as const;
export type DocLang = keyof typeof docLangs;
export type Design = { template: Template; accent: string; font: "sans" | "serif" | "mono"; lang: DocLang };
export const defaultDesign: Design = { template: "modern", accent: "#04d9c4", font: "sans", lang: "en" };
export const designOf = (b: Bill): Design => ({ ...defaultDesign, ...(b.design ?? {}) });
const DOC: Record<string, Partial<Record<DocLang, string>>> = {
  invoice: { en: "Invoice", fr: "Facture", es: "Factura", de: "Rechnung", it: "Fattura", pt: "Fatura" },
  quote: { en: "Quote", fr: "Devis", es: "Presupuesto", de: "Angebot", it: "Preventivo", pt: "Orçamento" },
  receipt: { en: "Receipt", fr: "Reçu", es: "Recibo", de: "Quittung", it: "Ricevuta", pt: "Recibo" },
  issued: { en: "Issued", fr: "Émis le", es: "Emitida", de: "Datum", it: "Emessa il", pt: "Emitida em" },
  due: { en: "Due", fr: "Échéance", es: "Vence", de: "Fällig", it: "Scadenza", pt: "Vencimento" },
  valid: { en: "Valid until", fr: "Valide jusqu’au", es: "Válido hasta", de: "Gültig bis", it: "Valido fino al", pt: "Válido até" },
  billTo: { en: "Bill to", fr: "Facturé à", es: "Facturar a", de: "Rechnung an", it: "Fatturare a", pt: "Faturar para" },
  preparedFor: { en: "Prepared for", fr: "Préparé pour", es: "Preparado para", de: "Erstellt für", it: "Preparato per", pt: "Preparado para" },
  receivedFrom: { en: "Received from", fr: "Reçu de", es: "Recibido de", de: "Erhalten von", it: "Ricevuto da", pt: "Recebido de" },
  description: { en: "Description", fr: "Description", es: "Descripción", de: "Beschreibung", it: "Descrizione", pt: "Descrição" },
  qty: { en: "Qty", fr: "Qté", es: "Cant.", de: "Menge", it: "Qtà", pt: "Qtd." },
  unit: { en: "Unit price", fr: "Prix unitaire", es: "Precio unitario", de: "Einzelpreis", it: "Prezzo unitario", pt: "Preço unitário" },
  amount: { en: "Amount", fr: "Montant", es: "Importe", de: "Betrag", it: "Importo", pt: "Valor" },
  subtotal: { en: "Subtotal", fr: "Sous-total", es: "Subtotal", de: "Zwischensumme", it: "Subtotale", pt: "Subtotal" },
  total: { en: "Total", fr: "Total", es: "Total", de: "Gesamt", it: "Totale", pt: "Total" },
  quotedTotal: { en: "Quoted total", fr: "Total du devis", es: "Total presupuestado", de: "Angebotssumme", it: "Totale preventivo", pt: "Total orçado" },
  paid: { en: "Amount paid", fr: "Montant payé", es: "Importe pagado", de: "Bezahlt", it: "Importo pagato", pt: "Valor pago" },
  balance: { en: "Balance", fr: "Solde", es: "Saldo", de: "Restbetrag", it: "Saldo", pt: "Saldo" },
  registration: { en: "registration", fr: "numéro d’inscription", es: "número de registro", de: "Registrierungsnummer", it: "numero di registrazione", pt: "número de registo" },
  continued: { en: "continued", fr: "suite", es: "continuación", de: "Fortsetzung", it: "continua", pt: "continuação" },
  receivedOn: { en: "Payment received on {d} by {m}.", fr: "Paiement reçu le {d} par {m}.", es: "Pago recibido el {d} mediante {m}.", de: "Zahlung erhalten am {d} per {m}.", it: "Pagamento ricevuto il {d} tramite {m}.", pt: "Pagamento recebido em {d} por {m}." },
  notCalculated: { en: "Not calculated", fr: "Non calculé", es: "Sin calcular", de: "Nicht berechnet", it: "Non calcolato", pt: "Não calculado" },
  notRecorded: { en: "Not recorded", fr: "Non inscrit", es: "Sin registrar", de: "Nicht erfasst", it: "Non registrato", pt: "Não registado" },
};
export const docT = (key: keyof typeof DOC | string, lang: DocLang) => DOC[key]?.[lang] ?? DOC[key]?.en ?? key;
const NUMBER_LOCALE: Record<DocLang, string> = { en: "en-CA", fr: "fr-CA", es: "es-ES", de: "de-DE", it: "it-IT", pt: "pt-PT" };
export type Bill = {
  version: 1;
  kind: Kind;
  number: string;
  date: string;
  due: string;
  currency: Currency;
  business: string;
  address: string;
  email: string;
  logo: string;
  client: Client;
  lines: Line[];
  taxes: Tax[];
  notes: string;
  paid: string;
  paymentMethod: string;
  paymentDate: string;
  design?: Design;
};
export type BillingState = {
  version: 1;
  bill: Bill;
  clients: Client[];
  items: (Line & { currency: Currency })[];
  next: Record<Kind, number>;
};
export const taxSource =
  "https://www.canada.ca/en/revenue-agency/services/tax/businesses/topics/gst-hst-businesses/charge-collect-which-rate/calculator.html";
export const taxChecked = "2026-10-08";
export const provinces: Record<string, { name: string; rates: [string, string][] }> = {
  none: { name: "No tax / custom", rates: [] },
  AB: { name: "Alberta", rates: [["GST", "5"]] },
  BC: {
    name: "British Columbia",
    rates: [
      ["GST", "5"],
      ["PST", "7"],
    ],
  },
  MB: {
    name: "Manitoba",
    rates: [
      ["GST", "5"],
      ["RST", "7"],
    ],
  },
  NB: { name: "New Brunswick", rates: [["HST", "15"]] },
  NL: { name: "Newfoundland and Labrador", rates: [["HST", "15"]] },
  NS: { name: "Nova Scotia", rates: [["HST", "14"]] },
  NT: { name: "Northwest Territories", rates: [["GST", "5"]] },
  NU: { name: "Nunavut", rates: [["GST", "5"]] },
  ON: { name: "Ontario", rates: [["HST", "13"]] },
  PE: { name: "Prince Edward Island", rates: [["HST", "15"]] },
  QC: {
    name: "Québec",
    rates: [
      ["GST", "5"],
      ["QST", "9.975"],
    ],
  },
  SK: {
    name: "Saskatchewan",
    rates: [
      ["GST", "5"],
      ["PST", "6"],
    ],
  },
  YT: { name: "Yukon", rates: [["GST", "5"]] },
};
export const presetTaxes = (province: string): Tax[] => {
  if (!Object.hasOwn(provinces, province)) throw new Error("Choose a listed province.");
  return provinces[province].rates.map(([label, rate], i) => ({
    id: `tax-${i}`,
    label,
    rate,
    registration: "",
  }));
};
export const billDefaults: BillingState = {
  version: 1,
  next: { invoice: 2, quote: 1, receipt: 1 },
  clients: [],
  items: [],
  bill: {
    version: 1,
    kind: "invoice",
    number: "INV-0001",
    date: "",
    due: "",
    currency: "CAD",
    business: "Your business",
    address: "Your business address",
    email: "",
    logo: "",
    client: { name: "Your client", address: "Client address", email: "" },
    lines: [{ description: "Your product or service", quantity: "1", price: "100.00", taxIds: [] }],
    taxes: [],
    notes: "Thank you for your business.",
    paid: "",
    paymentMethod: "",
    paymentDate: "",
  },
};
export const digits = (currency: Currency) => (currency === "JPY" ? 0 : 2);
export function decimal(value: string, places: number, label: string): bigint {
  const pattern = places ? new RegExp(`^\\d{1,9}(?:\\.\\d{1,${places}})?$`) : /^\d{1,9}$/;
  if (!pattern.test(value))
    throw new Error(`${label} needs a non-negative number with at most ${places} decimal places.`);
  const [whole, fraction = ""] = value.split(".");
  return BigInt(whole) * 10n ** BigInt(places) + BigInt(fraction.padEnd(places, "0") || "0");
}
const rounded = (numerator: bigint, denominator: bigint) => (numerator + denominator / 2n) / denominator;
export function totals(b: Bill) {
  if (!currencies.includes(b.currency) || b.lines.length < 1 || b.lines.length > 50 || b.taxes.length > 4)
    throw new Error("Choose a currency and 1 to 50 items, with up to four taxes.");
  if (new Set(b.taxes.map((t) => t.id)).size !== b.taxes.length)
    throw new Error("Tax identifiers must be unique.");
  const amounts = b.lines.map((line) => {
    const price = decimal(line.price, digits(b.currency), "Unit price"),
      quantity = decimal(line.quantity, 3, "Quantity");
    if (quantity <= 0n || quantity > 1_000_000_000n)
      throw new Error("Quantity must be above zero and no greater than one million.");
    if (line.taxIds.some((id) => !b.taxes.some((t) => t.id === id)))
      throw new Error("An item refers to a removed tax.");
    return rounded(price * quantity, 1000n);
  });
  const subtotal = amounts.reduce((n, a) => n + a, 0n);
  const taxes = b.taxes.map((tax) => {
    const rate = decimal(tax.rate, 3, "Tax rate");
    if (rate > 100_000n) throw new Error("Tax rates must be between 0 and 100 percent.");
    const base = amounts.reduce((n, a, i) => n + (b.lines[i].taxIds.includes(tax.id) ? a : 0n), 0n);
    return { ...tax, base, amount: rounded(base * rate, 100_000n) };
  });
  const total = subtotal + taxes.reduce((n, t) => n + t.amount, 0n);
  if (total > 100_000_000_000n)
    throw new Error(
      "The total exceeds this tool's limit of 100 billion currency units at the smallest denomination.",
    );
  const paid = b.paid === "" ? null : decimal(b.paid, digits(b.currency), "Amount paid");
  if (paid !== null && paid > total) throw new Error("Amount paid cannot exceed the document total.");
  return { amounts, subtotal, taxes, total, paid, balance: paid === null ? null : total - paid };
}
export function money(value: bigint, currency: Currency, locale: DocLang = "en") {
  const places = digits(currency),
    scale = 10n ** BigInt(places);
  return `${currency} ${(value / scale).toLocaleString(NUMBER_LOCALE[locale] ?? "en-CA")}${places ? (locale === "en" ? "." : ",") + (value % scale).toString().padStart(places, "0") : ""}`;
}
export const qtyText = (q: string, lang: DocLang) => (lang === "en" ? q : q.replace(".", ","));
const bounded = (v: unknown, max: number): v is string => typeof v === "string" && v.length <= max;
const clientValid = (v: unknown): v is Client =>
  !!v &&
  typeof v === "object" &&
  "name" in v &&
  bounded(v.name, 100) &&
  "address" in v &&
  bounded(v.address, 400) &&
  "email" in v &&
  bounded(v.email, 150);
const lineValid = (v: unknown): v is Line => {
  if (!v || typeof v !== "object") return false;
  const l = v as Line;
  return (
    bounded(l.description, 300) &&
    bounded(l.quantity, 15) &&
    bounded(l.price, 15) &&
    Array.isArray(l.taxIds) &&
    l.taxIds.length <= 4 &&
    l.taxIds.every((id) => bounded(id, 40))
  );
};
export function validBill(value: unknown): value is Bill {
  if (!value || typeof value !== "object") return false;
  const b = value as Bill;
  return (
    b.version === 1 &&
    ["invoice", "quote", "receipt"].includes(b.kind) &&
    currencies.includes(b.currency) &&
    bounded(b.number, 40) &&
    bounded(b.date, 10) &&
    bounded(b.due, 10) &&
    bounded(b.business, 100) &&
    bounded(b.address, 400) &&
    bounded(b.email, 150) &&
    validImage(b.logo) &&
    clientValid(b.client) &&
    Array.isArray(b.lines) &&
    b.lines.length >= 1 &&
    b.lines.length <= 50 &&
    b.lines.every(lineValid) &&
    Array.isArray(b.taxes) &&
    b.taxes.length <= 4 &&
    b.taxes.every(
      (t) =>
        t && bounded(t.id, 40) && bounded(t.label, 40) && bounded(t.rate, 12) && bounded(t.registration, 80),
    ) &&
    bounded(b.notes, 1600) &&
    bounded(b.paid, 15) &&
    bounded(b.paymentMethod, 100) &&
    bounded(b.paymentDate, 10) &&
    (b.design === undefined ||
      (!!b.design &&
        (templates as readonly string[]).includes(b.design.template) &&
        /^#[0-9a-f]{6}$/i.test(b.design.accent) &&
        ["sans", "serif", "mono"].includes(b.design.font) &&
        Object.hasOwn(docLangs, b.design.lang)))
  );
}
export function validBilling(value: unknown): value is BillingState {
  if (!value || typeof value !== "object") return false;
  const s = value as BillingState;
  return (
    s.version === 1 &&
    validBill(s.bill) &&
    Array.isArray(s.clients) &&
    s.clients.length <= 100 &&
    s.clients.every(clientValid) &&
    Array.isArray(s.items) &&
    s.items.length <= 100 &&
    s.items.every((i) => lineValid(i) && currencies.includes(i.currency)) &&
    !!s.next &&
    [s.next.invoice, s.next.quote, s.next.receipt].every(
      (n) => Number.isInteger(n) && n >= 1 && n <= 1_000_000,
    )
  );
}
export function exportProblem(b: Bill) {
  if (!validBill(b)) return "Some document fields have an invalid format.";
  try {
    const result = totals(b);
    if (![b.business, b.client.name, b.number].every((s) => s.trim()))
      return "Add your business, client and document number.";
    const dateValid = (v: string) =>
      /^\d{4}-\d{2}-\d{2}$/.test(v) &&
      Number.isFinite(Date.parse(v)) &&
      new Date(v).toISOString().slice(0, 10) === v;
    if (!dateValid(b.date) || (b.due && !dateValid(b.due))) return "Choose valid document dates.";
    if (b.due && b.due < b.date) return "The due or expiry date must not precede the issue date.";
    if (b.lines.some((l) => !l.description.trim())) return "Describe every line item.";
    if (b.taxes.some((t) => !t.label.trim())) return "Name every tax line.";
    if (
      b.kind === "receipt" &&
      (result.paid === null || result.paid <= 0n || !b.paymentMethod.trim() || !dateValid(b.paymentDate))
    )
      return "Enter the amount, date and method of the payment actually received before creating a receipt.";
    if (b.kind === "receipt" && b.paymentDate > b.date)
      return "The payment date must not be after the receipt's issue date.";
    return "";
  } catch (e) {
    return (e as Error).message;
  }
}
export function nextDocument(s: BillingState, kind: Kind): BillingState {
  const next = s.next[kind];
  if (next >= 1_000_000) throw new Error("Number sequence is full. Choose your own document number.");
  const prefix = { invoice: "INV", quote: "QUO", receipt: "REC" }[kind];
  return {
    ...s,
    next: { ...s.next, [kind]: next + 1 },
    bill: {
      ...s.bill,
      kind,
      due: kind === "receipt" ? "" : s.bill.due,
      number: `${prefix}-${String(next).padStart(4, "0")}`,
      paid: "",
      paymentMethod: "",
      paymentDate: "",
    },
  };
}

export function localDate(date = new Date()) {
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;
}
export function copyDocument(s: BillingState, kind: Kind, date: string): BillingState {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(date) || !Number.isFinite(Date.parse(date)) || new Date(date).toISOString().slice(0, 10) !== date)
    throw new Error("Choose valid document dates.");
  const copy = nextDocument(structuredClone(s), kind);
  return { ...copy, bill: { ...copy.bill, date, due: "" } };
}

/** Opening an older document must not rewind numbering or discard newer reusable entries. */
export function restoreBilling(current: BillingState, loaded: BillingState): BillingState {
  const clients = [...current.clients];
  for (const client of loaded.clients)
    if (!clients.some(c => c.name === client.name && c.email === client.email)) clients.push(client);
  const items = [...current.items];
  for (const item of loaded.items)
    if (!items.some(i => i.description === item.description && i.currency === item.currency && i.quantity === item.quantity && i.price === item.price && JSON.stringify(i.taxIds) === JSON.stringify(item.taxIds))) items.push(item);
  if (clients.length > 100 || items.length > 100)
    throw new Error("Combined saved clients or items exceed 100. Back up and remove unused entries before opening this document.");
  return structuredClone({ ...loaded, clients, items, next: {
    invoice: Math.max(current.next.invoice, loaded.next.invoice),
    quote: Math.max(current.next.quote, loaded.next.quote),
    receipt: Math.max(current.next.receipt, loaded.next.receipt),
  } });
}
