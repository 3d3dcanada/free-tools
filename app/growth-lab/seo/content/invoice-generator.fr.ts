import type { ToolGuide } from "../guide";
export default {
  slug: "invoice-generator",
  locale: "fr",
  title: "Factures gratuites avec taxes canadiennes | 3D3D",
  description:
    "Créez une facture PDF locale avec logo, articles, devise et taxes modifiables. Gardez clients et articles sur cet appareil et exportez une sauvegarde.",
  name: "Générateur de factures gratuit",
  headline: "Un travail clair, une facture claire.",
  summary: "Préparez une facture avec vos coordonnées et les prix convenus.",
  answer:
    "Créez gratuitement une facture PDF dans votre navigateur sans téléverser les coordonnées de votre entreprise ou de vos clients. Ajoutez articles, logo, devise et taxes canadiennes modifiables, puis vérifiez les totaux. Les données enregistrées restent sur cet appareil. Exportez une sauvegarde: l’outil ne transmet pas les factures, n’encaisse pas et ne remplace pas votre comptabilité.",
  steps: [
    "Remplacez les exemples par les coordonnées réelles de l’entreprise et du client. Choisissez le numéro, la date d’émission et l’échéance éventuelle. Ajoutez votre logo au besoin et vérifiez que le destinataire peut identifier le travail et vous joindre.",
    "Décrivez chaque produit ou service avec sa quantité et son prix unitaire. Choisissez la devise avant les montants. Vérifiez les taxes associées à chaque article au lieu de supposer que toutes les lignes d’une facture mixte suivent le même traitement.",
    "Utilisez le préréglage provincial comme point de départ seulement. Contrôlez les libellés, taux et numéros d’inscription correspondant à votre situation, puis le sous-total, chaque taxe et le total. Le préréglage facilite le calcul sans décider de vos obligations.",
    "Téléchargez le PDF et rouvrez-le pour examiner le document réel. Gardez une sauvegarde JSON modifiable et le PDF final dans vos dossiers habituels. Transmettez vous-même la facture et suivez son paiement dans votre système de gestion.",
  ],
  sections: [
    {
      heading: "Décrire des lignes compréhensibles",
      paragraphs: [
        "Une bonne facture permet de comprendre ce que représente le montant. Remplacez un libellé vague comme Services par une description du travail, de la période ou du livrable convenu. Faites correspondre quantités et prix unitaires à cette description. Si une ligne représente des heures et une autre des objets, précisez les unités dans le texte pour éviter que le destinataire les devine à partir du total.",
        "L’éditeur accepte jusqu’à cinquante articles et quatre lignes de taxe. Les quantités peuvent comporter trois décimales; les prix suivent la précision de la devise choisie. JPY utilise ici des unités entières, les autres devises proposées deux décimales. Changer de devise ne calcule aucun taux de change. Saisissez les montants voulus et vérifiez les articles enregistrés avant de les réutiliser dans un nouveau document.",
      ],
    },
    {
      heading: "Comprendre la méthode de calcul",
      paragraphs: [
        "L’outil arrondit chaque produit quantité-prix à la plus petite unité prise en charge, puis additionne les lignes. Chaque taxe porte sur le sous-total des articles qui lui sont associés, avec arrondi au plus proche et demi-unité vers le haut. Les taxes ne se composent pas entre elles. Sur une base de 100 CAD, l’exemple québécois donne 5,00 de TPS et 9,98 de TVQ, soit 114,98. Vérifiez que cette méthode convient à votre facturation.",
        "Les préréglages canadiens ont été vérifiés le 8 octobre 2026. L’inscription, les exemptions, le lieu de fourniture et les règles particulières peuvent modifier les taxes applicables. Le choix d’une province ne résout pas ces questions. Consultez les références officielles ou votre conseiller. Les taux, libellés, inscriptions et sélections d’articles restent modifiables. Un modèle rempli ne certifie pas à lui seul la conformité de votre facture.",
      ],
    },
    {
      heading: "Conserver des dossiers locaux fiables",
      paragraphs: [
        "Clients, articles et compteurs sont enregistrés dans le stockage local de ce navigateur. Ils ne sont pas synchronisés entre appareils, profils ou pages distinctes de devis et de reçus. Un numéro local n’est pas unique dans tous vos systèmes: coordonnez votre numérotation. La navigation privée, l’effacement des données ou la perte de l’appareil peut retirer le brouillon. Téléchargez des sauvegardes avant d’en faire votre dossier de travail.",
        "Un champ de paiement vide signifie que cette information n’a pas été saisie; il n’est pas remplacé silencieusement par zéro. Indiquez seulement les paiements connus. L’outil ne vérifie pas les opérations bancaires, n’envoie pas de rappels et ne tient pas de grand livre. Conservez les PDF émis, preuves de paiement et corrections dans votre système habituel. Vérifiez aussi une sauvegarde restaurée, surtout si ses coordonnées ou taxes sont anciennes.",
      ],
    },
  ],
  comparison: [
    {
      name: "Invoice Generator",
      detail: "Propose aussi des factures PDF gratuites sans inscription.",
      url: "https://invoice-generator.com/",
    },
  ],
  faqs: [
    {
      q: "L’outil est-il relié à la facturation de 3D3D?",
      a: "Non. Cet outil public utilise vos coordonnées et vos prix. Il n’accède ni aux clients ni aux comptes ni au système de facturation interne de 3D3D.",
    },
    {
      q: "La province détermine-t-elle les taxes à facturer?",
      a: "Non. Elle fournit des taux généraux modifiables. Vérifiez le traitement adapté à votre inscription, à la transaction et aux règles applicables avant l’émission.",
    },
    {
      q: "Où sont enregistrés les clients et articles?",
      a: "Dans ce navigateur, sur cet appareil. Exportez une sauvegarde avant de changer d’appareil ou d’effacer les données. Factures, devis et reçus disposent de leurs propres espaces locaux.",
    },
    {
      q: "Choisir USD convertit-il mes prix en CAD?",
      a: "Non. Aucun service de change n’est utilisé. Choisissez la devise et saisissez les montants adaptés; vérifiez les articles sauvegardés avant de les ajouter.",
    },
    {
      q: "Que signifie un paiement laissé vide?",
      a: "L’information de paiement est inconnue dans ce document. Un zéro saisi explicitement a un sens différent. L’outil ne déduit aucun solde bancaire ni statut de règlement.",
    },
    {
      q: "Le téléchargement envoie-t-il la facture?",
      a: "Non. Il crée un PDF sur votre appareil. Vérifiez-le, gardez une copie et transmettez-le vous-même par le canal convenu avec le destinataire.",
    },
  ],
  service: { label: "Créer un parcours d’entreprise avec 3D3D", path: "/software-development" },
  sources: [
    {
      label: "ARC: taux de TPS/TVH et indications de facturation",
      url: "https://www.canada.ca/en/revenue-agency/services/tax/businesses/topics/gst-hst-businesses/charge-collect-which-rate.html",
    },
    {
      label: "Revenu Québec: calcul de la TPS et de la TVQ",
      url: "https://www.revenuquebec.ca/en/businesses/consumption-taxes/gsthst-and-qst/collecting-gst-and-qst/calculating-the-taxes/",
    },
  ],
} satisfies ToolGuide;
