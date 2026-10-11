/**
 * The standalone build sends nothing anywhere by default: no feedback endpoint, no analytics,
 * no human-check script. Rendering the page that would carry a form proves the form is absent.
 */
import assert from "node:assert/strict";
import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { FEEDBACK_ENDPOINT, SITE_BASE, TURNSTILE_SITE_KEY } from "../app/lib/free-tools-host";
import { track } from "../app/lib/analytics";
import { sitePath, siteAbsolute } from "../app/growth-lab/seo/site-links";
import CorrectionForm from "../app/growth-lab/academy/CorrectionForm";
import { LocaleProvider } from "../app/growth-lab/shared/locale";

assert.equal(FEEDBACK_ENDPOINT, null, "feedback endpoint is off by default");
assert.equal(TURNSTILE_SITE_KEY, null, "no Turnstile key by default");
assert.equal(track("content_cta", { to: "/tools" }), undefined, "analytics is a no-op");

// Links to the 3D3D site are absolute, once.
assert.equal(SITE_BASE, "https://3d3d.ca");
assert.equal(sitePath("/quote", "en"), "https://3d3d.ca/quote");
assert.equal(sitePath("/quote", "fr"), "https://3d3d.ca/fr/devis");
assert.equal(siteAbsolute(sitePath("/3d-printing", "en")), "https://3d3d.ca/3d-printing");

// The lesson correction form renders nothing without an endpoint.
const html = renderToStaticMarkup(
  createElement(LocaleProvider, { locale: "en", children: createElement(CorrectionForm, { lesson: "x", title: "X" }) }),
);
assert.equal(html, "", "correction form is absent without a feedback endpoint");

console.log("host-seam: 8 checks passed");
