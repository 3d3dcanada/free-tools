import { useEffect, useRef, useState } from "react";
import { useLocale, useLocalLink } from "../shared/locale";
import { ACADEMY_PATH } from "./curriculum";
import { readCorrection, type Correction } from "./correction-contract.mjs";
import { enquiryTransport } from "../port/feedback";
import Turnstile from "../../ui/Turnstile";
import { FEEDBACK_ENDPOINT } from "../../lib/free-tools-host";

export type CorrectionReceipt = { mode: "sent"; reference: string };
export type CorrectionTransport = (value: Correction, signal: AbortSignal) => Promise<CorrectionReceipt>;
export default function CorrectionForm({
  lesson,
  title,
  submit,
}: {
  lesson: string;
  title: string;
  submit?: CorrectionTransport;
}) {
  const locale = useLocale(),
    link = useLocalLink();
  const t = (en: string, fr: string) => (locale === "fr" ? fr : en);
  const [ready, setReady] = useState(false);
  const [change, setChange] = useState(""),
    [name, setName] = useState(""),
    [email, setEmail] = useState("");
  const [credit, setCredit] = useState(false),
    [pending, setPending] = useState(false);
  const [error, setError] = useState(""),
    [receipt, setReceipt] = useState<CorrectionReceipt | null>(null);
  const request = useRef<AbortController | null>(null);
  useEffect(() => {
    setReady(true);
    return () => request.current?.abort();
  }, []);
  // Turnstile loads only after the visitor asks to verify, and each token is
  // used once: every attempt clears it and remounts the widget.
  const [verifying, setVerifying] = useState(false),
    [token, setToken] = useState(""),
    [widget, setWidget] = useState(0);
  const tokenRef = useRef("");
  tokenRef.current = token;
  const transport = submit ?? enquiryTransport(async () => tokenRef.current);
  // Nowhere to send it (the standalone build has no endpoint unless its owner sets one): no form.
  if (!submit && !FEEDBACK_ENDPOINT) return null;
  return (
    <section className="reading correction no-print" aria-labelledby="correction-heading">
      <h2 id="correction-heading">{t("Help improve this lesson", "Aidez-nous à améliorer cette leçon")}</h2>
      <p>
        {t(
          "Spot a mistake or know a better way? Tell us.",
          "Vous avez repéré une erreur ou une meilleure méthode ? Dites-le-nous.",
        )}
      </p>
      <p className="fine">
        {t(
          "Only the details you submit go to 3D3D for review. Your email is never displayed as a public credit.",
          "Seuls les renseignements envoyés sont transmis à 3D3D pour examen. Votre adresse courriel ne figure jamais dans les remerciements publics.",
        )}
      </p>
      <form
        onSubmit={async (e) => {
          e.preventDefault();
          if (pending || receipt) return;
          setError("");
          let value: Correction;
          try {
            value = readCorrection({ lesson, change, name, email, credit, locale });
          } catch (e) {
            const code = e instanceof Error ? e.message : "invalid";
            setError(
              code === "credit"
                ? t(
                    "Add the name you want credited, or leave the credit box unticked.",
                    "Indiquez le nom à publier ou décochez la case de remerciement.",
                  )
                : t(
                    "Describe the change in 20–3,000 characters and check the optional contact details.",
                    "Décrivez la modification en 20 à 3 000 caractères et vérifiez les coordonnées facultatives.",
                  ),
            );
            return;
          }
          const controller = new AbortController();
          request.current = controller;
          const timeout = window.setTimeout(() => controller.abort(), 15000);
          setPending(true);
          try {
            const next = await transport(value, controller.signal);
            if (next.mode !== "sent" || !next.reference || next.reference.length > 100)
              throw new Error("receipt");
            setReceipt(next);
          } catch {
            setError(
              t(
                "No acceptance receipt arrived. Your suggestion is still here. Check the connection and try again when ready.",
                "Aucun accusé de réception n’est arrivé. Votre suggestion est toujours ici. Vérifiez la connexion, puis réessayez quand vous le souhaitez.",
              ),
            );
          } finally {
            setToken("");
            setWidget((n) => n + 1);
            window.clearTimeout(timeout);
            setPending(false);
            request.current = null;
          }
        }}
      >
        <label>
          {t("Lesson", "Leçon")}
          <input value={title} readOnly />
        </label>
        <label>
          <span id="correction-change-label">{t("What would you change?", "Que modifieriez-vous ?")}</span>
          <textarea
            value={change}
            onChange={(e) => setChange(e.target.value)}
            minLength={20}
            maxLength={3000}
            required
            rows={5}
            aria-describedby="correction-hint"
            aria-labelledby="correction-change-label"
            disabled={pending || !!receipt}
          />
        </label>
        <p id="correction-hint" className="fine">
          {t(
            "Point to the passage, suggest a replacement and add a source link if you have one. Avoid private customer details.",
            "Précisez le passage, proposez une correction et ajoutez une source si possible. Évitez les renseignements privés de clients.",
          )}
        </p>
        <label>
          {t("Name for credit (optional)", "Nom pour les remerciements (facultatif)")}
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            maxLength={80}
            autoComplete="off"
            disabled={pending || !!receipt}
          />
        </label>
        <label>
          {t("Email for a reply (optional)", "Courriel pour une réponse (facultatif)")}
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            maxLength={254}
            autoComplete="off"
            disabled={pending || !!receipt}
          />
        </label>
        <label className="choice">
          <input
            type="checkbox"
            checked={credit}
            onChange={(e) => setCredit(e.target.checked)}
            disabled={pending || !!receipt}
          />
          {t(
            "If the change is accepted, you may credit the name above publicly.",
            "Si la modification est retenue, vous pouvez publier le nom ci-dessus dans les remerciements.",
          )}
        </label>
        <p className="fine">
          {t(
            "Credit is optional. A submission is not a newsletter subscription or a promise that a change will be published.",
            "Le remerciement est facultatif. L’envoi ne vous inscrit à aucune infolettre et ne garantit pas la publication d’une modification.",
          )}
        </p>
        {error && <p role="alert">{error}</p>}
        <div role="status" aria-live="polite">
          {receipt && (
            <p>
              {t("Suggestion received for review. Reference:", "Suggestion reçue pour examen. Référence :")}{" "}
              <code>{receipt.reference}</code>
            </p>
          )}
        </div>
        {!receipt && !submit && (
          <div className="verify">
            <p className="fine">
              {t(
                "Sending needs a quick human check by Cloudflare Turnstile. It loads only when you press Verify, and contacts Cloudflare.",
                "L’envoi demande une brève vérification humaine par Cloudflare Turnstile. Elle se charge seulement quand vous appuyez sur Vérifier et communique avec Cloudflare.",
              )}
            </p>
            {verifying ? (
              <Turnstile key={widget} onToken={setToken} />
            ) : (
              <button type="button" onClick={() => setVerifying(true)} disabled={!ready || pending}>
                {t("Verify", "Vérifier")}
              </button>
            )}
          </div>
        )}
        {!receipt ? (
          <button type="submit" disabled={!ready || pending || (!submit && !token)}>
            {pending ? t("Sending…", "Envoi…") : t("Send suggestion", "Envoyer la suggestion")}
          </button>
        ) : (
          <button
            type="button"
            onClick={() => {
              setReceipt(null);
              setChange("");
              setName("");
              setEmail("");
              setCredit(false);
            }}
          >
            {t("Start another suggestion", "Rédiger une autre suggestion")}
          </button>
        )}
        <noscript>
          <p>
            {t(
              "Enable JavaScript to use the suggestion form.",
              "Activez JavaScript pour utiliser le formulaire de suggestion.",
            )}
          </p>
        </noscript>
      </form>
      <p>
        <a href={link(`${ACADEMY_PATH}/join`)}>{t("Join the project", "Participer au projet")}</a>
        {" · "}
        <a href={link(`${ACADEMY_PATH}/contributors`)}>{t("Contributors", "Contributions")}</a>
      </p>
    </section>
  );
}
