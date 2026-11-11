/**
 * Counting real tool use: tool_use / tool_feedback payloads and the "Did this
 * help?" card rules in app/growth-lab/shared/tooluse.ts.
 * Run: npm test (tests/run.mjs bundles and runs every test file).
 */
import assert from "node:assert/strict";
import { test } from "node:test";
const tu = await import("../app/growth-lab/shared/tooluse.ts");

type Sent = [string, Record<string, string>][];
const capture = (sent: Sent) => (event: string, props: Record<string, string>) => {
  sent.push([event, props]);
};

test("countExport sends tool_use with action export, the slug and the format label", () => {
  const sent: Sent = [];
  tu.countExport("Download PNG", "qr-code", capture(sent) as never);
  assert.deepEqual(sent, [["tool_use", { tool: "qr-code", action: "export", label: "Download PNG" }]]);
});

test("tool_use payload keys are only tool, action, label", () => {
  assert.deepEqual(tu.toolUsePayload("merge-pdf", "open"), { tool: "merge-pdf", action: "open" });
  assert.deepEqual(Object.keys(tu.toolUsePayload("merge-pdf", "run")).sort(), ["action", "tool"]);
  assert.deepEqual(tu.toolUsePayload("merge-pdf", "export", "Download PDF"), {
    tool: "merge-pdf",
    action: "export",
    label: "Download PDF",
  });
});

test("slugFromPath reads the tool slug from en and fr paths", () => {
  assert.equal(tu.slugFromPath("/tools/qr-code"), "qr-code");
  assert.equal(tu.slugFromPath("/fr/tools/merge-pdf"), "merge-pdf");
  assert.equal(tu.slugFromPath("/tools"), "");
  assert.equal(tu.slugFromPath("/quote"), "");
});

test("tool_feedback payload keys are only tool, answer, note", () => {
  assert.deepEqual(tu.feedbackPayload("qr-code", "yes"), { tool: "qr-code", answer: "yes" });
  assert.deepEqual(tu.feedbackPayload("qr-code", "no", "the logo came out small"), {
    tool: "qr-code",
    answer: "no",
    note: "the logo came out small",
  });
});

test("a note longer than 240 characters is refused, not sent", () => {
  assert.throws(() => tu.feedbackPayload("qr-code", "no", "x".repeat(241)));
  assert.doesNotThrow(() => tu.feedbackPayload("qr-code", "no", "x".repeat(240)));
  const sent: Sent = [];
  assert.equal(tu.emitToolFeedback("qr-code", "no", "x".repeat(300), capture(sent) as never), false);
  assert.deepEqual(sent, []);
  assert.equal(tu.emitToolFeedback("qr-code", "yes", undefined, capture(sent) as never), true);
  assert.deepEqual(sent, [["tool_feedback", { tool: "qr-code", answer: "yes" }]]);
});

test("the help card is hidden before any use", () => {
  assert.equal(tu.helpState(false, null), "hidden");
  assert.equal(tu.helpState(false, Date.now()), "hidden");
});

test("the help card is not asked again within 30 days, and can be after", () => {
  const now = 1_800_000_000_000;
  const day = 24 * 60 * 60 * 1000;
  assert.equal(tu.helpState(true, now - 29 * day, now), "next");
  assert.equal(tu.helpState(true, now - 30 * day, now), "ask");
  assert.equal(tu.helpState(true, now - 31 * day, now), "ask");
  assert.equal(tu.helpState(true, null, now), "ask");
});

test("the asked-at memory round-trips through storage, per tool", () => {
  const mem = new Map<string, string>();
  const store = {
    getItem: (k: string) => mem.get(k) ?? null,
    setItem: (k: string, v: string) => void mem.set(k, v),
    removeItem: (k: string) => void mem.delete(k),
  } as unknown as Storage;
  assert.equal(tu.readAsked("qr-code", store), null);
  tu.markAsked("qr-code", 123, store);
  assert.equal(tu.readAsked("qr-code", store), 123);
  assert.equal(tu.readAsked("merge-pdf", store), null);
});
