export function parseCsv(text: string): Record<string, string>[] {
  if (text.length > 2_000_000) throw new Error("CSV must be smaller than 2 MB.");
  const rows: string[][] = [];
  let row: string[] = [],
    field = "",
    quoted = false;
  for (let i = 0; i < text.length; i++) {
    const c = text[i];
    if (c === '"') {
      if (quoted && text[i + 1] === '"') {
        field += '"';
        i++;
      } else if (quoted || !field) quoted = !quoted;
      else throw new Error("Unexpected quote in CSV.");
    } else if (!quoted && (c === "," || c === "\n")) {
      row.push(field.replace(/\r$/, ""));
      field = "";
      if (c === "\n") {
        rows.push(row);
        row = [];
      }
    } else field += c;
  }
  if (quoted) throw new Error("Unclosed quote in CSV.");
  if (field || row.length) {
    row.push(field.replace(/\r$/, ""));
    rows.push(row);
  }
  if (rows.length < 2 || rows.length > 101) throw new Error("Include a header and 1 to 100 rows.");
  const headers = rows.shift()!.map((h) => h.trim().replace(/^\uFEFF/, ""));
  if (
    new Set(headers).size !== headers.length ||
    headers.some((h) => !h || ["__proto__", "constructor", "prototype"].includes(h))
  )
    throw new Error("CSV headers must be unique field names.");
  return rows
    .filter((r) => r.some(Boolean))
    .map((r) => {
      if (r.length !== headers.length) throw new Error("Every CSV row must have the same number of columns.");
      return Object.fromEntries(headers.map((h, i) => [h, r[i]]));
    });
}
