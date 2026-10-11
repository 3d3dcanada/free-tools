#!/usr/bin/env node
/**
 * Secret and personal-data scan of everything that would be published.
 *
 *   node scripts/scan.mjs [--denylist file] [--json] [dir]
 *
 * Looks, in every text file outside node_modules, build and .git, for:
 *   - keys, tokens and private keys (by their well-known shapes, and `key = "long string"`)
 *   - email addresses (example and placeholder domains are allowed)
 *   - telephone numbers, IP addresses, home-directory paths
 *   - internal markers: work-order numbers, the site's analytics host, its intake route
 *   - with --denylist, any line of that file (one term per line, `#` comments): customer and
 *     personal names kept outside this repository
 *
 * Reviewed false positives go in scripts/scan-allow.json as { rule, file, match, why }.
 * Exit code 1 when anything remains. Output is the report; keep it with the release evidence.
 */
import { readdirSync, readFileSync, statSync } from "node:fs";
import { join, relative, resolve } from "node:path";

const argv = process.argv.slice(2);
const take = (flag) => {
  const i = argv.indexOf(flag);
  if (i < 0) return undefined;
  return argv.splice(i, 2)[1];
};
const denylistFile = take("--denylist");
const asJson = argv.includes("--json");
const root = resolve(argv.find((a) => !a.startsWith("--")) ?? ".");

const SKIP_DIRS = new Set(["node_modules", "build", ".git", ".react-router", ".cache"]);
const BINARY = /\.(onnx|wasm|woff2?|ttf|otf|png|jpe?g|webp|avif|gif|ico|bcmap|pfb|icc|icm|pdf|zip|gz)$/i;
const ALLOWED_MAIL_DOMAINS = /@(example\.(com|org|net)|company\.com|entreprise\.ca|domain\.com|email\.com|3d3d\.ca)$/i;

const RULES = [
  ["private-key", /-----BEGIN [A-Z ]*PRIVATE KEY-----/],
  ["aws-key", /\bAKIA[0-9A-Z]{16}\b/],
  ["github-token", /\b(gh[pousr]_[A-Za-z0-9]{30,}|github_pat_[A-Za-z0-9_]{30,})\b/],
  ["slack-token", /\bxox[baprs]-[A-Za-z0-9-]{10,}\b/],
  ["stripe-key", /\b[sr]k_(live|test)_[A-Za-z0-9]{16,}\b/],
  ["google-api-key", /\bAIza[0-9A-Za-z_-]{35}\b/],
  ["turnstile-key", /\b0x4[A-Za-z0-9_-]{20,}\b/],
  ["jwt", /\beyJ[A-Za-z0-9_-]{10,}\.eyJ[A-Za-z0-9_-]{10,}\./],
  ["bearer", /\bBearer\s+[A-Za-z0-9._~+/-]{20,}/],
  ["assigned-secret", /\b(api[_-]?key|secret|passw(or)?d|auth[_-]?token|access[_-]?token)\b\s*[:=]\s*["'`][^"'`\s]{12,}["'`]/i],
  // 555-01xx is the range reserved for fiction: the sample cards and flyers use it on purpose.
  ["phone", /(?<![\d.])(?:\+?1[ .-]?)?\(?[2-9]\d{2}\)?[ .-](?!555[ .-]01\d\d)\d{3}[ .-]\d{4}(?![\d.])/],
  ["ip-address", /(?<![\d.])(?!0\.0\.0\.0|127\.0\.0\.1)(?:(?:25[0-5]|2[0-4]\d|1?\d?\d)\.){3}(?:25[0-5]|2[0-4]\d|1?\d?\d)(?![\d.])/],
  ["home-path", /(\/home\/[a-z_][\w-]*|\/Users\/[A-Za-z][\w-]*|C:\\Users\\[A-Za-z][\w-]*)/],
  ["work-order", /\bWO-\d{2,4}\b/],
  ["internal-ref", /\b(evidence\/[\w-]+\/|work[ -]orders?|docs\/work-orders|workstation)\b/i],
  ["internal-host", /(3d3d-analytics|workers\.dev|\.dev\.vars|\/api\/intake|wrangler)/i],
];
const EMAIL = /[A-Za-z0-9._%+-]+@[A-Za-z0-9-]+(?:\.[A-Za-z0-9-]+)*\.[A-Za-z]{2,}/g;

const allow = (() => {
  try {
    return JSON.parse(readFileSync(join(root, "scripts/scan-allow.json"), "utf8"));
  } catch {
    return [];
  }
})();
const denylist = denylistFile
  ? readFileSync(resolve(denylistFile), "utf8")
      .split("\n")
      .map((l) => l.trim())
      .filter((l) => l && !l.startsWith("#"))
  : [];
const denyRules = denylist.map((term) => [`denylist`, new RegExp(`\\b${term.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}\\b`, "i"), term]);

const walk = (dir) =>
  readdirSync(dir, { withFileTypes: true }).flatMap((e) => {
    if (e.isDirectory()) return SKIP_DIRS.has(e.name) ? [] : walk(join(dir, e.name));
    return [join(dir, e.name)];
  });

const findings = [];
let filesScanned = 0;
for (const file of walk(root)) {
  const name = relative(root, file).split("\\").join("/");
  if (BINARY.test(file) || ["package-lock.json", "scripts/scan-allow.json", "scripts/scan.mjs"].includes(name)) continue;
  if (statSync(file).size > 3_000_000) continue;
  const text = readFileSync(file, "utf8");
  if (text.includes("\u0000")) continue;
  filesScanned++;
  const lines = text.split("\n");
  lines.forEach((line, i) => {
    if (line.length > 4000) line = line.slice(0, 4000); // minified or data URL lines: still scanned, but bounded
    for (const [rule, re] of RULES) {
      const m = re.exec(line);
      if (m) findings.push({ rule, file: name, line: i + 1, match: m[0].slice(0, 80) });
    }
    for (const m of line.matchAll(EMAIL)) if (!ALLOWED_MAIL_DOMAINS.test(m[0])) findings.push({ rule: "email", file: name, line: i + 1, match: m[0] });
    for (const [rule, re, term] of denyRules) if (re.test(line)) findings.push({ rule, file: name, line: i + 1, match: term });
  });
}

// A denylist hit is never suppressed from inside the repository: the allow file is published.
const reviewed = (f) => f.rule !== "denylist" && allow.some((a) => a.rule === f.rule && a.file === f.file && (a.match === f.match || a.match === "*"));
const open = findings.filter((f) => !reviewed(f));
const suppressed = findings.length - open.length;

if (asJson) console.log(JSON.stringify({ filesScanned, denylistTerms: denylist.length, suppressed, findings: open }, null, 2));
else {
  console.log(`scan: ${filesScanned} text files, ${RULES.length + 1} pattern rules${denylist.length ? ` + ${denylist.length} denylist terms` : ""}`);
  for (const f of open) console.log(`  ${f.rule.padEnd(15)} ${f.file}:${f.line}  ${f.match}`);
  console.log(`scan: ${open.length} finding${open.length === 1 ? "" : "s"}${suppressed ? `, ${suppressed} reviewed and allowed (scripts/scan-allow.json)` : ""}`);
}
process.exit(open.length ? 1 : 0);
