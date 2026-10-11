import type { ToolGuide } from "../guide";
export default {
  slug: "quote-generator",
  locale: "fr",
  title: "Générateur de devis gratuit pour entreprises | 3D3D",
  description:
    "Préparez un devis PDF avec description, articles, devise, taxes et date d’expiration. Gardez un brouillon local et téléchargez sans téléverser vos données.",
  name: "Générateur de devis gratuit",
  headline: "Une proposition facile à comprendre.",
  summary: "Présentez le travail prévu et son prix avant de commencer.",
  answer:
    "Créez gratuitement un devis PDF local sans téléverser les coordonnées de votre entreprise ou du client. Cette page ouvre le mode devis avec sa propre numérotation et son espace enregistré. Décrivez le travail, les quantités, les prix, les taxes et l’échéance. L’outil présente votre proposition; il ne fixe pas les prix de 3D3D et n’enregistre pas l’acceptation.",
  steps: [
    "Vérifiez le type Devis et remplacez les exemples par les parties réelles. Choisissez le numéro et la date d’émission. Ajoutez une date d’expiration si elle fait partie de l’offre, sans la placer avant la date d’émission.",
    "Découpez le travail proposé en articles compréhensibles. Indiquez quantités et prix unitaires dans la devise choisie. Reliez chaque prix à un livrable et évitez d’inclure une option dans le total sans expliquer son statut.",
    "Contrôlez les taxes et utilisez les notes pour les hypothèses, exclusions, conditions de calendrier ou prochaines étapes. Restez assez concis pour le document. Vérifiez le traitement fiscal applicable indépendamment des taux modifiables proposés par le modèle.",
    "Téléchargez le PDF et examinez toutes les pages avant de le transmettre. Sauvegardez le JSON pour les révisions futures. Gardez la version émise et les éventuelles acceptations ou modifications dans vos dossiers, sans écraser votre seule copie.",
  ],
  sections: [
    {
      heading: "Expliquer ce que le prix comprend",
      paragraphs: [
        "Un devis utile relie un montant à un résultat défini. Au lieu d’une ligne Projet sans précision, nommez le livrable et la quantité ou l’étape correspondante. Si une dimension, une matière, un nombre de retouches ou un élément fourni modifie le travail, indiquez cette hypothèse dans la description ou les notes. Vous rédigez ce contenu: l’éditeur n’invente pas le périmètre et n’estime pas l’effort nécessaire.",
        "Présentez les alternatives clairement. Toutes les lignes incluses participent au total; une option inscrite dans le tableau augmente donc le montant affiché. Pour deux formules incompatibles entre elles, préparez des devis distincts bien nommés ou expliquez l’alternative en dehors du total. Le client ne devrait pas devoir soustraire mentalement une ligne pour comprendre ce que représente le prix proposé.",
      ],
    },
    {
      heading: "Utiliser les dates et versions avec méthode",
      paragraphs: [
        "La date d’émission situe la préparation de cette version. Une date d’expiration peut indiquer jusqu’à quand vous souhaitez maintenir les conditions proposées. L’éditeur vérifie l’ordre des dates, sans appliquer l’expiration ni prévenir les parties lorsqu’elle arrive. Décrivez votre prochaine étape dans les notes, par exemple la confirmation du périmètre par votre canal de communication habituel.",
        "Une révision doit se distinguer de la version déjà transmise. Gardez le PDF émis et utilisez un numéro ou un nom de fichier clair pour la nouvelle offre. Le compteur local facilite la préparation dans ce navigateur, sans constituer un registre commercial partagé. Si plusieurs personnes rédigent des devis, coordonnez la numérotation et les versions en dehors de l’outil pour éviter qu’un même identifiant désigne plusieurs propositions.",
      ],
    },
    {
      heading: "Séparer proposition, paiement et acceptation",
      paragraphs: [
        "Ce parcours conserve son propre brouillon, ses clients, ses articles et ses compteurs dans le navigateur. Ces données ne sont pas synchronisées automatiquement avec les pages de factures ou de reçus. Exportez puis restaurez une sauvegarde pour déplacer volontairement un travail, et vérifiez les détails obtenus. Changer de type de document ou attribuer un numéro ne prouve ni l’acceptation du client ni un mouvement d’argent.",
        "Avant l’émission, contrôlez quantités, prix et taxes associées. Choisir une devise ne réalise aucun change. Les préréglages canadiens restent des points de départ modifiables; l’outil ne détermine ni votre inscription ni le traitement propre à la transaction. Conservez le périmètre convenu, les échanges et la facture ultérieure dans vos dossiers habituels. Pour des conditions juridiques ou fiscales particulières, consultez les références officielles ou un professionnel approprié.",
      ],
    },
  ],
  comparison: [
    {
      name: "Invoice Generator",
      detail: "Propose une option distincte pour les devis.",
      url: "https://invoice-generator.com/",
    },
  ],
  faqs: [
    {
      q: "La page commence-t-elle en mode devis?",
      a: "Oui, avec un espace local et un compteur distincts. Vérifiez le type et le numéro avant d’exporter un brouillon restauré ou modifié.",
    },
    {
      q: "L’outil propose-t-il un prix pour mon travail?",
      a: "Non. Saisissez vos quantités et vos prix proposés ou convenus. Il ne s’agit pas des tarifs de 3D3D, qui proviennent d’une demande de devis séparée.",
    },
    {
      q: "Puis-je indiquer une expiration?",
      a: "Oui, à une date qui ne précède pas l’émission. Elle apparaît dans le document, sans application automatique de l’expiration ni rappel envoyé par l’outil.",
    },
    {
      q: "Les options sont-elles exclues du total?",
      a: "Non. Chaque ligne incluse entre dans le calcul. Préparez des versions distinctes ou une explication claire pour les alternatives; aucune exclusion automatique n’est effectuée.",
    },
    {
      q: "Le téléchargement enregistre-t-il l’accord du client?",
      a: "Non. Il crée seulement le PDF. Obtenez et conservez l’acceptation par votre propre procédure adaptée; l’éditeur ne suit pas cet événement.",
    },
    {
      q: "Puis-je reprendre le devis plus tard?",
      a: "Le brouillon peut rester dans le stockage local et le JSON exporté peut être restauré. Gardez le PDF émis séparément pour conserver la preuve de la version transmise.",
    },
  ],
  service: { label: "Demander un devis pour un projet 3D3D", path: "/quote" },
  sources: [
    {
      label: "ARC: choix et calcul de la TPS/TVH",
      url: "https://www.canada.ca/en/revenue-agency/services/tax/businesses/topics/gst-hst-businesses/charge-collect-which-rate.html",
    },
  ],
} satisfies ToolGuide;
