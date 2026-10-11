import { useLocale, useLocalLink } from "../shared/locale";
import { ACADEMY_PATH } from "./curriculum";
import CorrectionForm, { type CorrectionTransport } from "./CorrectionForm";
import { contributors } from "./contributors";

export default function ParticipationPage({
  page,
  answer,
  submitCorrection,
}: {
  page: "join" | "contributors";
  answer?: string;
  submitCorrection?: CorrectionTransport;
}) {
  const locale = useLocale(),
    link = useLocalLink();
  const t = (en: string, fr: string) => (locale === "fr" ? fr : en);
  return (
    <article className="reading participation">
      <div className="academy-heading">
        <p className="eyebrow">{t("An open teaching project", "Un projet pédagogique ouvert")}</p>
        <h1>
          {page === "join"
            ? t("Help make the next lesson better.", "Aidons la prochaine personne à apprendre.")
            : t("Contributors", "Contributions")}
        </h1>
        <p className="lede">
          {answer ??
            (page === "join"
              ? t(
                  "You can help this free 3D printing course by checking a source, explaining a confusing step, reviewing a diagram or sharing a carefully recorded practice result. Start with one lesson and one specific change. No account is needed, and public credit is always your choice.",
                  "Vous pouvez améliorer ce cours gratuit d’impression 3D : vérifier une source, clarifier une étape, examiner un schéma ou décrire un essai bien documenté. Commencez par une leçon et une modification précise. Aucun compte n’est nécessaire et vous choisissez toujours si votre nom peut être publié.",
                )
              : t(
                  "The academy credits people who choose to be named after a contribution is accepted. A correction can also be anonymous. This page records teaching contributions, not product endorsements or professional qualifications. Reading and improving the course are free, and contact details never become public credits.",
                  "L’académie remercie les personnes qui acceptent d’être nommées après une contribution retenue. Une correction peut aussi rester anonyme. Cette page présente des contributions pédagogiques, sans recommander de produits ni attester de qualifications professionnelles. La lecture et la participation sont gratuites; les coordonnées ne deviennent jamais des remerciements publics.",
                ))}
        </p>
      </div>
      {page === "contributors" ? (
        <>
          <h2>{t("Public acknowledgements", "Remerciements publics")}</h2>
          {contributors.length ? (
            <ul>
              {contributors.map((c) => (
                <li key={c.name + c.contribution}>
                  <strong>{c.name}</strong>: {c.contribution}
                </li>
              ))}
            </ul>
          ) : (
            <p>
              {t(
                "No opt-in contributor credits have been published yet. Names will appear here only after the contribution is reviewed and permission to publish the name is confirmed.",
                "Aucun remerciement nominatif n’a encore été publié. Un nom n’apparaîtra ici qu’après examen de la contribution et confirmation de l’autorisation de le publier.",
              )}
            </p>
          )}
          <h2>{t("What a credit means", "Ce qu’un remerciement signifie")}</h2>
          <p>
            {t(
              "A credit describes a particular contribution, such as correcting a unit conversion or improving a diagram label. It does not mean the contributor checked every lesson or approved the whole course. Source authors are listed separately on the relevant lessons; citing a manual does not make its author a project contributor.",
              "Un remerciement décrit un apport précis, comme la correction d’une conversion d’unités ou d’une légende. Il ne signifie pas que la personne a vérifié toutes les leçons ou approuvé l’ensemble du cours. Les auteurs des sources sont cités séparément; citer un manuel ne fait pas de son auteur une personne participante au projet.",
            )}
          </p>
          <h2>{t("Choose how you are named", "Choisissez le nom à publier")}</h2>
          <p>
            {t(
              "Leave the credit box unticked to keep your name off this page. If you opt in, enter the public name you want used, which can be different from a legal name. An email address is optional and is for a reply, never for display. To correct or remove an existing credit, identify the entry in a new course suggestion.",
              "Laissez la case de remerciement décochée pour ne pas être nommé sur cette page. Si vous acceptez, indiquez le nom public souhaité; il peut différer de votre nom légal. Le courriel est facultatif et sert uniquement à répondre. Pour modifier ou retirer un remerciement existant, désignez l’entrée dans une nouvelle suggestion concernant le cours.",
            )}
          </p>
          <p>
            <a href={link(`${ACADEMY_PATH}/join`)}>
              {t("See how to join the project", "Découvrez comment participer")}
            </a>
          </p>
        </>
      ) : (
        <>
          <h2>{t("Choose one useful contribution", "Choisissez une contribution précise")}</h2>
          <ul>
            <li>
              {t(
                "Check a factual statement against the current manual for the exact machine, material or software version. Include the page or section.",
                "Vérifiez un énoncé dans le manuel actuel de la machine, du matériau ou du logiciel concerné. Indiquez la page ou la section.",
              )}
            </li>
            <li>
              {t(
                "Describe where an instruction becomes unclear. Suggest wording that a first-time learner could follow without guessing a setting.",
                "Expliquez où une consigne devient ambiguë. Proposez une formulation qu’une personne débutante peut suivre sans deviner un réglage.",
              )}
            </li>
            <li>
              {t(
                "Review an SVG diagram, its labels and its text description. Explain any relationship that is hard to see on a phone or with assistive technology.",
                "Examinez un schéma SVG, ses légendes et sa description textuelle. Signalez une relation difficile à comprendre sur téléphone ou avec une aide technique.",
              )}
            </li>
            <li>
              {t(
                "Improve the French while keeping the technical meaning and the limits of the English lesson. A material trade name is not always a literal translation.",
                "Améliorez le français en conservant le sens technique et les limites de la leçon anglaise. Un nom commercial de matériau ne se traduit pas toujours littéralement.",
              )}
            </li>
            <li>
              {t(
                "Share an observation with the setup, changed variable and result separated. Do not turn one successful print into a universal setting or safety claim.",
                "Distinguez la configuration, le paramètre modifié et le résultat observé. Une impression réussie ne devient pas un réglage universel ni une preuve de sécurité.",
              )}
            </li>
          </ul>
          <h2>{t("Make the report easy to review", "Facilitez l’examen de la suggestion")}</h2>
          <p>
            {t(
              "Quote only the short passage that needs attention. State the problem, propose replacement wording, and link to a primary source where possible. For a numerical correction, show the inputs and units so another reader can repeat the calculation. For a practical observation, distinguish what you measured from what you suspect caused it.",
              "Citez uniquement le court passage à corriger. Expliquez le problème, proposez un remplacement et ajoutez si possible une source primaire. Pour une correction numérique, donnez les données et les unités afin de permettre un nouveau calcul. Pour un essai, distinguez les mesures de l’explication que vous soupçonnez.",
            )}
          </p>
          <p>
            {t(
              "Use the form on the lesson for a specific correction. Use the course form below for a broader offer to help, including the topic or skill you would like to contribute. You do not need to send a résumé, customer files, private addresses or a full manual. Keep other people's private information out of the report.",
              "Utilisez le formulaire de la leçon pour une correction précise. Le formulaire ci-dessous permet une proposition plus générale, en indiquant le sujet ou la compétence que vous souhaitez apporter. Aucun CV, fichier client, adresse privée ou manuel complet n’est nécessaire. N’incluez pas de renseignements privés concernant d’autres personnes.",
            )}
          </p>
          <h2>{t("What happens after review", "Après l’examen")}</h2>
          <p>
            {t(
              "A maintainer checks the source and the scope before changing the lesson. A suggestion may be accepted, clarified or left out if it cannot be supported. Participation does not promise employment, a payment, publication or a response deadline. Public credit remains separate from whether the technical change is useful.",
              "Une personne responsable vérifie la source et la portée avant de modifier la leçon. Une proposition peut être retenue, précisée ou écartée si elle manque d’appui. La participation ne promet ni emploi, ni paiement, ni publication, ni délai de réponse. Le choix d’un remerciement public reste distinct de l’intérêt technique de la correction.",
            )}
          </p>
          <CorrectionForm
            lesson="course"
            title={t("Course or project", "Cours ou projet")}
            submit={submitCorrection}
          />
        </>
      )}
      <p>
        <a href={link(ACADEMY_PATH)}>{t("Return to the course map", "Revenir au plan du cours")}</a>
        {" · "}
        <a href={link(`${ACADEMY_PATH}/sources`)}>
          {t("Sources and course scope", "Sources et portée du cours")}
        </a>
      </p>
    </article>
  );
}
