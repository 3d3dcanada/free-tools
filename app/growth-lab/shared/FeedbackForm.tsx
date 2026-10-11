import { useEffect, useRef, useState } from "react";
import Turnstile from "../../ui/Turnstile";
import { FEEDBACK_ENDPOINT, FEEDBACK_RECEIPT } from "../../lib/free-tools-host";

/**
 * "Something broken? Tell us." on every free tool. One explicit POST to the
 * host's feedback endpoint (`FEEDBACK_ENDPOINT`; the 3D3D site's intake, journey
 * "tool-feedback"), and only when the visitor presses Send. Turnstile loads only
 * after the visitor presses Verify, each token is used once, and nothing about
 * the visit rides along.
 */
export default function FeedbackForm({ tool, locale }: { tool: string; locale: "en" | "fr" }) {
  const t = (en: string, fr: string) => (locale === "fr" ? fr : en);
  const [message, setMessage] = useState(""),
    [name, setName] = useState(""),
    [email, setEmail] = useState(""),
    [credit, setCredit] = useState(false);
  const [verifying, setVerifying] = useState(false),
    [token, setToken] = useState(""),
    [widget, setWidget] = useState(0);
  const [pending, setPending] = useState(false),
    [error, setError] = useState(""),
    [receipt, setReceipt] = useState("");
  const request = useRef<AbortController | null>(null);
  useEffect(() => () => request.current?.abort(), []);

  async function send(e: { preventDefault(): void }) {
    e.preventDefault();
    if (pending || receipt) return;
    setError("");
    if (message.trim().length < 10)
      return setError(t("Tell us a little more: at least 10 characters.", "Donnez-nous un peu plus de détails : au moins 10 caractères."));
    if (credit && !name.trim())
      return setError(t("Add the name you want credited, or untick credit.", "Indiquez le nom à remercier ou décochez la case."));
    if (!token) return setError(t("Press Verify first.", "Appuyez d’abord sur Vérifier."));
    if (!FEEDBACK_ENDPOINT) return;
    const controller = new AbortController();
    request.current = controller;
    const timeout = window.setTimeout(() => controller.abort(), 15000);
    setPending(true);
    try {
      const answers = {
        tool,
        message: message.trim(),
        name: name.trim(),
        email: email.trim(),
        credit: credit ? "yes" : "no",
        language: locale,
      };
      const body = new FormData();
      body.set(
        "payload",
        JSON.stringify({
          journey: "tool-feedback",
          journeyName: "Free tool feedback",
          kind: "other",
          turnstileToken: token,
          answers,
          summary: Object.entries(answers).map(([field, value]) => ({ field, label: field, value, isFile: false })),
        }),
      );
      const response = await fetch(FEEDBACK_ENDPOINT, { method: "POST", body, signal: controller.signal, credentials: "omit" });
      const out = (await response.json().catch(() => ({}))) as { ref?: unknown };
      if (!response.ok || typeof out.ref !== "string" || !FEEDBACK_RECEIPT.test(out.ref)) throw new Error("receipt");
      setReceipt(out.ref);
    } catch {
      setError(
        t(
          "That did not go through. Your note is still here; press Verify and try again.",
          "L’envoi n’a pas abouti. Votre message est toujours ici ; appuyez sur Vérifier et réessayez.",
        ),
      );
    } finally {
      window.clearTimeout(timeout);
      setPending(false);
      setToken("");
      setWidget((n) => n + 1);
      request.current = null;
    }
  }

  if (receipt)
    return (
      <div className="feedback-done" role="status">
        <p className="eyebrow">{t("Received", "Reçu")}</p>
        <h3>{t("Thank you. We read every one.", "Merci. Nous lisons chaque message.")}</h3>
        <p>
          {t("Reference", "Référence")} <code>{receipt}</code>
        </p>
        <button
          type="button"
          onClick={() => {
            setReceipt("");
            setMessage("");
          }}
        >
          {t("Send Another", "Envoyer un autre message")}
        </button>
      </div>
    );

  return (
    <form className="feedback-form" onSubmit={send}>
      <p>
        {t(
          "These tools are free and get better with every report. Tell us what broke, what confused you or what you wish it did. If you want, we will credit your name in the update notes.",
          "Ces outils sont gratuits et s’améliorent à chaque signalement. Dites-nous ce qui a planté, ce qui vous a semblé confus ou ce que vous aimeriez. Si vous le souhaitez, nous citerons votre nom dans les notes de mise à jour.",
        )}
      </p>
      <label>
        {t("What happened?", "Que s’est-il passé ?")}
        <textarea
          rows={5}
          maxLength={3000}
          required
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder={t("The PNG export came out blank on my phone…", "L’export PNG est sorti vide sur mon téléphone…")}
        />
      </label>
      <div className="field-grid">
        <label>
          {t("Name (optional)", "Nom (facultatif)")}
          <input value={name} maxLength={80} onChange={(e) => setName(e.target.value)} autoComplete="name" />
        </label>
        <label>
          {t("Email for a reply (optional)", "Courriel pour une réponse (facultatif)")}
          <input type="email" value={email} maxLength={254} onChange={(e) => setEmail(e.target.value)} autoComplete="email" />
        </label>
      </div>
      <label className="check">
        <input type="checkbox" checked={credit} onChange={(e) => setCredit(e.target.checked)} />
        {t("Credit my name in the update notes", "Me remercier par mon nom dans les notes de mise à jour")}
      </label>
      <p className="fine">
        {t(
          "Your email is never published and this does not sign you up for anything. Sending needs a quick human check by Cloudflare Turnstile, which loads only when you press Verify.",
          "Votre courriel n’est jamais publié et cet envoi ne vous inscrit à rien. L’envoi demande une brève vérification humaine par Cloudflare Turnstile, chargée seulement quand vous appuyez sur Vérifier.",
        )}
      </p>
      {verifying ? (
        <Turnstile key={widget} onToken={setToken} />
      ) : (
        <button type="button" onClick={() => setVerifying(true)}>
          {t("Verify", "Vérifier")}
        </button>
      )}
      {error && (
        <p role="alert" className="notice">
          {error}
        </p>
      )}
      <button type="submit" className="feedback-send" disabled={pending || !token}>
        {pending ? t("Sending…", "Envoi…") : t("Send Feedback", "Envoyer")}
      </button>
    </form>
  );
}
