import { decimal, designOf, digits, docT, exportProblem, money, qtyText, totals, type Bill } from "./model";

/**
 * The invoice, quote or receipt as a real PDF (A4), drawn in the chosen
 * template, accent colour, typeface and document language.
 */
export async function invoicePdf(b: Bill) {
  const d = designOf(b),
    L = d.lang;
  const T = (k: string) => docT(k, L);
  const problem = exportProblem(b);
  if (problem) throw new Error(problem);
  const [{ PDFDocument, rgb, StandardFonts }, { default: fontkit }] = await Promise.all([
    import("pdf-lib"),
    import("@pdf-lib/fontkit"),
  ]);
  const pdf = await PDFDocument.create();
  pdf.registerFontkit(fontkit);
  let font, bold;
  if (d.font === "sans") {
    const [r, bb] = await Promise.all(
      ["LiberationSans-Regular.ttf", "LiberationSans-Bold.ttf"].map(async (n) => {
        const res = await fetch(`/pdf-assets/standard_fonts/${n}`);
        if (!res.ok) throw new Error("The local PDF font could not be loaded. Try again.");
        return res.arrayBuffer();
      }),
    );
    font = await pdf.embedFont(r, { subset: true });
    bold = await pdf.embedFont(bb, { subset: true });
  } else {
    font = await pdf.embedFont(d.font === "serif" ? StandardFonts.TimesRoman : StandardFonts.Courier);
    bold = await pdf.embedFont(d.font === "serif" ? StandardFonts.TimesRomanBold : StandardFonts.CourierBold);
  }
  const allText = [
    b.business,
    b.address,
    b.email,
    b.client.name,
    b.client.address,
    b.client.email,
    b.number,
    b.notes,
    b.paymentMethod,
    ...b.lines.map((l) => l.description),
    ...b.taxes.map((t) => `${t.label} ${t.registration}`),
  ].join("\n");
  for (const char of new Set(allText)) {
    if (/[\n\r\t]/.test(char)) continue;
    try {
      font.encodeText(char);
      bold.encodeText(char);
      if (d.font === "sans" && !font.getCharacterSet().includes(char.codePointAt(0)!)) throw new Error();
    } catch {
      throw new Error(`The PDF font cannot display “${char}”. Choose another typeface or replace it.`);
    }
  }
  const hex = (h: string) => rgb(parseInt(h.slice(1, 3), 16) / 255, parseInt(h.slice(3, 5), 16) / 255, parseInt(h.slice(5, 7), 16) / 255);
  const lum = (h: string) => {
    const c = [1, 3, 5].map((i) => parseInt(h.slice(i, i + 2), 16) / 255).map((v) => (v <= 0.04 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4));
    return 0.2126 * c[0] + 0.7152 * c[1] + 0.0722 * c[2];
  };
  const mix = (h: string, k: number) => {
    // k of the accent over white: tints for fills.
    const c = [1, 3, 5].map((i) => parseInt(h.slice(i, i + 2), 16) / 255);
    return rgb(1 - (1 - c[0]) * k, 1 - (1 - c[1]) * k, 1 - (1 - c[2]) * k);
  };
  const accent = hex(d.accent),
    onAccent = lum(d.accent) > 0.35 ? rgb(0.04, 0.04, 0.04) : rgb(1, 1, 1),
    // Neon accents are too light for text on white; text uses a darkened accent.
    accentText = lum(d.accent) > 0.3 ? (() => {
      const c = [1, 3, 5].map((i) => parseInt(d.accent.slice(i, i + 2), 16) / 255);
      return rgb(c[0] * 0.5, c[1] * 0.5, c[2] * 0.5);
    })() : accent,
    ink = rgb(0.06, 0.07, 0.07),
    muted = rgb(0.36, 0.38, 0.37),
    line = rgb(0.84, 0.85, 0.84);

  const W = 595.2756,
    H = 841.8898;
  const side = d.template === "sidebar" ? 22 : 0;
  const X0 = 44 + side,
    X1 = W - 44,
    CW = X1 - X0;
  let page = pdf.addPage([W, H]),
    y = 0;
  const text = (value: string, x: number, top: number, size = 10, o: { right?: boolean; center?: boolean; f?: typeof font; color?: ReturnType<typeof rgb> } = {}) => {
    const f = o.f ?? font;
    const w = f.widthOfTextAtSize(value, size);
    page.drawText(value, { x: o.right ? x - w : o.center ? x - w / 2 : x, y: top, size, font: f, color: o.color ?? ink });
  };
  const wrap = (value: string, width: number, size = 10, f = font) => {
    const lines: string[] = [];
    for (const paragraph of value.replace(/\r/g, "").split("\n")) {
      let ln = "";
      for (const word of paragraph.split(/\s+/)) {
        if (ln && f.widthOfTextAtSize(ln + " " + word, size) > width) {
          lines.push(ln);
          ln = "";
        }
        for (const char of (ln ? " " : "") + word) {
          if (f.widthOfTextAtSize(ln + char, size) > width && ln) {
            lines.push(ln);
            ln = "";
          }
          ln += char;
        }
      }
      lines.push(ln);
    }
    return lines;
  };
  const decorate = () => {
    if (d.template === "sidebar") page.drawRectangle({ x: 0, y: 0, width: side, height: H, color: accent });
    if (d.template === "modern") page.drawRectangle({ x: 0, y: H - 6, width: W, height: 6, color: accent });
  };
  const newPage = () => {
    page = pdf.addPage([W, H]);
    decorate();
    y = H - 62;
    text(`${T(b.kind).toUpperCase()} ${b.number} · ${T("continued")}`, X0, H - 42, 9, { color: muted });
  };
  const ensure = (h: number) => {
    if (y - h < 64) newPage();
  };
  const paragraph = (value: string, width = CW, size = 10, o: { f?: typeof font; color?: ReturnType<typeof rgb>; x?: number; center?: boolean } = {}) => {
    for (const ln of wrap(value, width, size, o.f)) {
      ensure(size + 6);
      text(ln, o.center ? W / 2 + side / 2 : (o.x ?? X0), y, size, { f: o.f, color: o.color, center: o.center });
      y -= size + 5;
    }
  };

  /* ---------------- header */
  decorate();
  const title = T(b.kind).toUpperCase();
  const metaLines = [
    b.number,
    `${T("issued")} ${b.date}`,
    ...(b.due && b.kind !== "receipt" ? [`${T(b.kind === "quote" ? "valid" : "due")} ${b.due}`] : []),
  ];
  const logo = b.logo ? await (b.logo.startsWith("data:image/png") ? pdf.embedPng(b.logo) : pdf.embedJpg(b.logo)) : null;
  if (d.template === "bold") {
    const band = 150;
    page.drawRectangle({ x: 0, y: H - band, width: W, height: band, color: accent });
    text(title, X1, H - 64, 30, { right: true, f: bold, color: onAccent });
    metaLines.forEach((m, i) => text(m, X1, H - 86 - i * 14, 10, { right: true, color: onAccent }));
    let ly = H - 52;
    if (logo) {
      const s = Math.min(130 / logo.width, 42 / logo.height);
      page.drawImage(logo, { x: X0, y: H - 52 - logo.height * s + 10, width: logo.width * s, height: logo.height * s });
      ly -= logo.height * s + 6;
    }
    text(b.business, X0, ly - 12, 16, { f: bold, color: onAccent });
    wrap([b.address, b.email].filter(Boolean).join("\n"), 260, 9).forEach((l, i) => text(l, X0, ly - 30 - i * 12, 9, { color: onAccent }));
    y = H - band - 34;
  } else if (d.template === "classic") {
    y = H - 56;
    if (logo) {
      const s = Math.min(140 / logo.width, 48 / logo.height);
      page.drawImage(logo, { x: W / 2 + side / 2 - (logo.width * s) / 2, y: y - logo.height * s + 12, width: logo.width * s, height: logo.height * s });
      y -= logo.height * s + 8;
    }
    paragraph(b.business, CW, 20, { f: bold, center: true });
    paragraph([b.address, b.email].filter(Boolean).join(" · "), CW, 9, { color: muted, center: true });
    y -= 6;
    page.drawLine({ start: { x: X0, y }, end: { x: X1, y }, thickness: 1.2, color: accent });
    page.drawLine({ start: { x: X0, y: y - 3 }, end: { x: X1, y: y - 3 }, thickness: 0.5, color: accent });
    y -= 30;
    text(title, W / 2 + side / 2, y, 22, { center: true, f: bold, color: accentText });
    y -= 18;
    text(metaLines.join("  ·  "), W / 2 + side / 2, y, 9.5, { center: true, color: muted });
    y -= 30;
  } else {
    y = H - 64;
    const titleColor = d.template === "minimal" ? accentText : ink;
    text(title, X1, y, d.template === "minimal" ? 16 : 26, { right: true, f: bold, color: titleColor });
    metaLines.forEach((m, i) => text(m, X1, y - 22 - i * 14, 10, { right: true, color: i ? muted : ink }));
    if (logo) {
      const s = Math.min(140 / logo.width, 45 / logo.height);
      page.drawImage(logo, { x: X0, y: y - logo.height * s + 18, width: logo.width * s, height: logo.height * s });
      y -= logo.height * s + 8;
    }
    paragraph(b.business, 290, 18, { f: bold });
    paragraph([b.address, b.email].filter(Boolean).join("\n"), 290, 9.5, { color: muted });
    y = Math.min(y - 18, H - 150);
  }

  /* ---------------- client */
  paragraph(T(b.kind === "receipt" ? "receivedFrom" : b.kind === "quote" ? "preparedFor" : "billTo").toUpperCase(), CW, 8.5, { f: bold, color: accentText });
  y -= 2;
  paragraph(b.client.name, CW, 12, { f: bold });
  paragraph([b.client.address, b.client.email].filter(Boolean).join("\n"), CW, 10, { color: muted });
  y -= 14;

  /* ---------------- items */
  const t = totals(b);
  const cQty = X0 + CW * 0.6,
    cUnit = X0 + CW * 0.8,
    cAmt = X1;
  const columns = () => {
    ensure(36);
    if (d.template === "minimal" || d.template === "classic") {
      page.drawLine({ start: { x: X0, y: y - 8 }, end: { x: X1, y: y - 8 }, thickness: 0.8, color: ink });
    } else {
      page.drawRectangle({ x: X0, y: y - 9, width: CW, height: 25, color: d.template === "bold" ? accent : mix(d.accent, 0.16) });
    }
    const hc = d.template === "bold" ? onAccent : ink;
    text(`${T("description")} · ${b.currency}`, X0 + 8, y, 9, { f: bold, color: hc });
    text(T("qty"), cQty, y, 9, { right: true, f: bold, color: hc });
    text(T("unit"), cUnit, y, 9, { right: true, f: bold, color: hc });
    text(T("amount"), cAmt - 6, y, 9, { right: true, f: bold, color: hc });
    y -= 30;
  };
  columns();
  for (const [i, item] of b.lines.entries()) {
    const lines = wrap(item.description, CW * 0.5, 10),
      h = Math.max(28, lines.length * 14 + 12);
    if (y - h < 64) {
      newPage();
      columns();
    }
    lines.forEach((ln, n) => text(ln, X0 + 8, y - n * 14, 10));
    text(qtyText(item.quantity, L), cQty, y, 10, { right: true });
    text(money(decimal(item.price, digits(b.currency), "Unit price"), b.currency, L).slice(4), cUnit, y, 10, { right: true });
    text(money(t.amounts[i], b.currency, L).slice(4), cAmt - 6, y, 10, { right: true });
    y -= h;
    page.drawLine({ start: { x: X0, y: y + 8 }, end: { x: X1, y: y + 8 }, thickness: 0.5, color: line });
  }
  y -= 8;

  /* ---------------- totals */
  const tx = X0 + CW * 0.48;
  const summary = (label: string, value: bigint, strong = false) => {
    const size = strong ? 13 : 10.5,
      h = strong ? 34 : 22;
    ensure(h + 4);
    if (strong) {
      if (d.template === "minimal" || d.template === "classic") {
        page.drawLine({ start: { x: tx, y: y + 14 }, end: { x: X1, y: y + 14 }, thickness: 1, color: ink });
      } else page.drawRectangle({ x: tx - 8, y: y - 10, width: X1 - tx + 8, height: 30, color: accent });
    }
    const col = strong && !(d.template === "minimal" || d.template === "classic") ? onAccent : ink;
    text(label, tx, y, size, { f: strong ? bold : font, color: col });
    text(money(value, b.currency, L), X1 - (strong ? 6 : 0), y, size, { right: true, f: strong ? bold : font, color: col });
    y -= h;
  };
  summary(T("subtotal"), t.subtotal);
  for (const tax of t.taxes) summary(`${tax.label} (${L === "en" ? tax.rate : tax.rate.replace(".", ",")}%)`, tax.amount);
  summary(T(b.kind === "quote" ? "quotedTotal" : "total"), t.total, true);
  if (t.paid !== null) {
    summary(T("paid"), t.paid);
    summary(T("balance"), t.balance!);
  }
  y -= 6;
  if (b.kind === "receipt") paragraph(T("receivedOn").replace("{d}", b.paymentDate).replace("{m}", b.paymentMethod));
  for (const tax of b.taxes.filter((x) => x.registration)) paragraph(`${tax.label} ${T("registration")}: ${tax.registration}`, CW, 9, { color: muted });
  if (b.notes) {
    y -= 14;
    paragraph(b.notes, CW, 10);
  }
  for (const [i, p] of pdf.getPages().entries())
    p.drawText(`${b.number} · ${i + 1} / ${pdf.getPageCount()}`, { x: X0, y: 30, font, size: 8.5, color: muted });
  pdf.setTitle(`${T(b.kind)} ${b.number}`);
  pdf.setAuthor(b.business);
  pdf.setLanguage(L);
  return new Uint8Array(await pdf.save());
}
