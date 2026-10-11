import { enquiryPayload, readCorrection, type Correction } from "../academy/correction-contract.mjs";
import type { CorrectionTransport } from "../academy/CorrectionForm";
import { FEEDBACK_ENDPOINT, FEEDBACK_RECEIPT } from "../../lib/free-tools-host";

export function enquiryTransport(token: (signal: AbortSignal) => Promise<string>): CorrectionTransport {
  return async (value: Correction, signal) => {
    const correction = readCorrection(value);
    const verified = await token(signal);
    if (!verified || signal.aborted) throw new Error("Verification required");
    if (!FEEDBACK_ENDPOINT) throw new Error("No feedback endpoint");
    const body = new FormData();
    body.set("payload", JSON.stringify(enquiryPayload(correction, verified)));
    const response = await fetch(FEEDBACK_ENDPOINT, { method: "POST", body, signal, credentials: "omit" });
    const receipt = (await response.json()) as { ref?: unknown };
    if (!response.ok || typeof receipt.ref !== "string" || !FEEDBACK_RECEIPT.test(receipt.ref))
      throw new Error("No valid acceptance receipt");
    return { mode: "sent", reference: receipt.ref };
  };
}
