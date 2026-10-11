/**
 * What the tools in app/growth-lab need from the page around them. This file is the
 * standalone build's side of the seam; the 3D3D site has its own copy of the same names.
 *
 * Nothing here is sent anywhere by default. Set these in a `.env` file (see `.env.example`).
 */

/** Where the feedback and correction forms post. `null` (the default) hides both forms. */
export const FEEDBACK_ENDPOINT: string | null = (import.meta.env.VITE_FEEDBACK_ENDPOINT ?? "").trim() || null;

/** What a valid acknowledgement reference from that endpoint looks like. */
export const FEEDBACK_RECEIPT = /^[A-Za-z0-9._:-]{1,100}$/;

/** A Cloudflare Turnstile site key, for an endpoint that verifies a human check. */
export const TURNSTILE_SITE_KEY: string | null = (import.meta.env.VITE_TURNSTILE_SITE_KEY ?? "").trim() || null;

/** Prefix for links from a tool to a page of the 3D3D site. */
export const SITE_BASE = "https://3d3d.ca";
