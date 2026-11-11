# Free tools (app/growth-lab)

The free browser tools of 3d3d.ca: every tool page renders through `tools/ToolPage.tsx`, and the editors live in the engine folders (`image-toolkit`, `pdf-toolkit`, `printing-tools`, `qr-code`, `design-studio`, `deck-studio`, `invoice-generator`) shared by the single-tool routes.

## Counting tool use

Each tool page reports three kinds of use to the first-party analytics Worker, with the visitor's consent and never on localhost: `tool_use` with `action: "open"` once per page load, `action: "run"` on the first real result of a calculator or viewer, and `action: "export"` with the format label on every download. After the first run or export the page may ask "Did this help?" once per tool per 30 days, which reports `tool_feedback` with `answer` ("yes" / "no") and an optional `note` capped at 240 characters.

What is sent is counts and labels only: the tool slug, the action, the format or button name, the yes/no answer and the visitor's own note. Never a filename, file size, hash, dimension, anything typed into the tool, a colour, an encoded URL, or anything derived from a file. See `app/lib/analytics.ts` on the host site for the consent gate behind every send.
