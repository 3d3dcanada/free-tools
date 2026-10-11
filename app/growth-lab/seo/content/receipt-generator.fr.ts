import type { ToolGuide } from "../guide";
export default {
  slug: "receipt-generator",
  locale: "fr",
  title: "Générateur de reçus gratuit et local | 3D3D",
  description:
    "Créez un reçu PDF pour un paiement réellement reçu. Notez montant, date et mode, vérifiez le solde et téléchargez localement sans compte.",
  name: "Générateur de reçus gratuit",
  headline: "Consignez le paiement réellement reçu.",
  summary: "Préparez un reçu avec le montant, la date et le mode du paiement.",
  answer:
    "Créez gratuitement un reçu PDF sans téléverser les renseignements du client ou du paiement. La page ouvre le mode reçu et exige un montant positif, une date et un mode de paiement. Indiquez la transaction réelle et vérifiez le solde. L’outil consigne vos données; il ne vérifie pas les virements et n’encaisse aucun argent.",
  steps: [
    "Confirmez le paiement dans vos propres dossiers avant de créer le reçu. Remplacez les exemples par les coordonnées réelles, choisissez le numéro et la date d’émission. Le document doit décrire un événement qui a effectivement eu lieu.",
    "Décrivez les biens ou services et les taxes applicables pour rendre le total compréhensible. Saisissez le montant reçu, la date et le mode. Le montant doit être positif, sans dépasser le total; la date du paiement ne peut pas suivre l’émission.",
    "Vérifiez le montant payé et le solde restant. Un paiement partiel doit laisser apparaître le reste à payer. Ajoutez une référence utile dans les notes, sans inscrire de secrets de carte bancaire ni de renseignements de compte inutiles.",
    "Téléchargez et examinez le PDF, puis gardez-le avec la preuve de transaction dans vos dossiers habituels. Transmettez vous-même la copie au destinataire. Exportez aussi un JSON si vous devez conserver une version locale modifiable.",
  ],
  sections: [
    {
      heading: "Relier le reçu à un paiement précis",
      paragraphs: [
        "Le destinataire doit pouvoir relier le reçu à un paiement réel et au travail concerné. Identifiez le client, les biens ou services et le numéro du document. Ajoutez dans les notes une référence de facture ou de projet si elle facilite cette correspondance. L’éditeur ne récupère pas automatiquement une facture externe et ne rapproche pas une écriture bancaire; cette vérification vous revient.",
        "Le mode de paiement doit correspondre à ce qui a été utilisé, par exemple des espèces ou un virement confirmé. Ne présentez pas un transfert promis comme une somme déjà reçue. La date de paiement décrit la transaction, tandis que la date d’émission situe le reçu. L’outil contrôle leur ordre, mais ne peut pas établir que la transaction existe, qu’elle est réglée ou qu’elle ne sera pas annulée.",
      ],
    },
    {
      heading: "Présenter clairement un paiement partiel",
      paragraphs: [
        "Le montant reçu peut être inférieur au total. Avec un total de 250 CAD et un paiement de 100 CAD, le solde calculé est de 150 CAD. Ce résultat vient de vos données, sans constituer un rapprochement bancaire. Expliquez dans les notes si le reçu concerne un acompte ou un versement, et utilisez vos propres dossiers pour tenir compte des paiements antérieurs ou ultérieurs.",
        "Le formulaire comporte un montant, une date et un mode pour l’enregistrement du paiement. Ce n’est pas un historique de transactions, de remboursements ou de trop-perçus. Un montant supérieur au total est refusé plutôt que transformé silencieusement en crédit. Si la situation demande plusieurs modes de paiement, des remboursements ou une affectation complexe, utilisez un outil comptable adapté au lieu de forcer des valeurs trompeuses dans ce document.",
      ],
    },
    {
      heading: "Sauvegarder les preuves et la numérotation",
      paragraphs: [
        "L’espace local conserve le brouillon actuel, les clients, les articles et les compteurs dans ce navigateur. Il ne constitue pas une archive permanente de reçus émis et ne se synchronise pas avec un autre appareil. Factures et devis ont leurs propres espaces. Enregistrez chaque PDF émis et une sauvegarde modifiable au besoin. Coordonnez les numéros avec vos dossiers existants pour éviter qu’un compteur local réutilise un identifiant déjà attribué.",
        "Vous devez choisir et vérifier les taxes selon les indications officielles applicables. Le générateur ne certifie ni l’inscription ni le traitement fiscal ni la conformité propre à une entreprise. Il reste également séparé de la facturation interne de 3D3D. Gardez les preuves de paiement avec vos dossiers habituels et contrôlez tout brouillon restauré avant de réémettre une copie: un ancien client, une date ou un montant ne doit pas être repris par inadvertance.",
      ],
    },
  ],
  comparison: [
    {
      name: "Invoice Generator",
      detail: "Propose également la génération de reçus.",
      url: "https://invoice-generator.com/",
    },
  ],
  faqs: [
    {
      q: "Pourquoi le champ payé vide bloque-t-il l’exportation?",
      a: "Un reçu demande un paiement positif enregistré, une date valide et un mode. Une valeur vide est inconnue, et zéro ne prouve pas la réception d’argent.",
    },
    {
      q: "Puis-je préparer un reçu pour un acompte?",
      a: "Vous pouvez indiquer un paiement partiel et son solde. Précisez ce que couvre la somme et rapprochez-la de vos propres enregistrements de transaction.",
    },
    {
      q: "L’outil vérifie-t-il l’arrivée de l’argent?",
      a: "Non. Il n’est relié ni à une banque ni à un service de paiement. Confirmez la transaction avant de la décrire comme reçue.",
    },
    {
      q: "Puis-je noter un trop-perçu ou un remboursement?",
      a: "Ce parcours simple refuse les paiements supérieurs au total et ne modélise pas les remboursements. Utilisez un enregistrement comptable adapté pour ces situations.",
    },
    {
      q: "Le paiement peut-il être daté après le reçu?",
      a: "Non. Sa date doit être antérieure ou égale à l’émission. Une promesse de paiement futur ne peut pas être enregistrée comme une somme déjà reçue.",
    },
    {
      q: "Tous les reçus émis restent-ils archivés ici?",
      a: "L’outil garde un brouillon et des données réutilisables, pas une archive permanente des émissions. Rangez chaque PDF dans votre système habituel et sauvegardez les données modifiables volontairement.",
    },
  ],
  service: { label: "Préparer vos logiciels d’entreprise avec 3D3D", path: "/software-development" },
  sources: [
    {
      label: "ARC: reçus, factures et TPS/TVH",
      url: "https://www.canada.ca/en/revenue-agency/services/tax/businesses/topics/gst-hst-businesses/charge-collect-which-rate.html",
    },
  ],
} satisfies ToolGuide;
