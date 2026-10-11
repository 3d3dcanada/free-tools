import type { ToolGuide } from "../guide";
export default {
  slug: "stamp-pdf",
  locale: "fr",
  title: "Numéroter et marquer un PDF gratuitement | 3D3D",
  description:
    "Ajoutez des numéros de page, un texte ou une image à un PDF localement. Réglez position et opacité, vérifiez l’aperçu et téléchargez sans compte.",
  name: "Numéros et marques sur PDF",
  headline: "Une indication claire sur la nouvelle copie.",
  summary: "Ajoutez une suite de numéros ou une marque visible aux pages PDF.",
  answer:
    "Ajoutez gratuitement des numéros ou une marque à un PDF sans le téléverser. Choisissez le premier numéro, saisissez un texte court ou sélectionnez une image locale, puis réglez la position et l’opacité. Vérifiez l’aperçu avant de télécharger. Ces ajouts visibles ne constituent ni un caviardage sécurisé, ni une signature certifiée, ni une restriction d’accès.",
  steps: [
    "Ouvrez le PDF et fixez d’abord l’ordre des pages. Retirez les pages inutiles avant de numéroter. La séquence suit l’ordre de sortie sélectionné: une réorganisation ultérieure change donc le numéro associé à chaque page.",
    "Activez les numéros et choisissez la valeur de départ au besoin. Pour une marque, saisissez un libellé court, comme Brouillon, ou ajoutez un PNG ou JPEG local. Utilisez uniquement une indication que vous êtes autorisé à placer sur le document.",
    "Choisissez une position en haut, au centre ou en bas, puis réglez l’opacité. Examinez les pages dont les marges ou l’orientation diffèrent. Une zone libre sur la couverture peut contenir un tableau ou une note ailleurs.",
    "Téléchargez le PDF marqué et contrôlez ce fichier réel. Vérifiez la suite des numéros, la lisibilité du texte et la place de l’image sur plusieurs pages. Conservez l’original sans marque, car l’exportation crée un document distinct.",
  ],
  sections: [
    {
      heading: "Numéroter le dossier qui sera remis",
      paragraphs: [
        "Une suite de numéros facilite les échanges sur un dossier fusionné ou un extrait. Elle ne met pas automatiquement à jour le sommaire, les renvois internes ou les numéros déjà imprimés dans la source. Déterminez si un deuxième numéro visible aidera le lecteur ou le troublera. Lorsque deux systèmes coexistent, indiquez clairement celui que les destinataires doivent utiliser pour discuter du document.",
        "La valeur initiale s’applique à la séquence de sortie. Un départ à sept donne ainsi 7, 8 et 9 sur les trois premières pages exportées. L’outil ne reconnaît pas les chapitres et ne recommence pas la numérotation à chaque fichier source. Vérifiez le début, la fin et les transitions. Si une annexe demande une autre convention, préparez un dossier séparé plutôt que d’attendre que ce compteur simple la devine.",
      ],
    },
    {
      heading: "Rendre la marque lisible sans cacher le contenu",
      paragraphs: [
        "Le texte doit rester assez court pour tenir sur la page. L’outil vérifie sa largeur et peut refuser une phrase qui dépasserait. Employez un libellé concis et inspectez les caractères, notamment lorsqu’ils sortent du jeu pris en charge par la police de base. Une marque doit faciliter la communication, sans obliger le lecteur à deviner un mot ou une cote qu’elle recouvre.",
        "L’image est ajustée dans une zone limitée de chaque page en conservant ses proportions. Un logo allongé et un sceau carré n’occupent donc pas le même espace visuel. Choisissez une source nette et suffisamment définie pour l’usage prévu; un PNG peut conserver de la transparence. Une faible opacité peut rendre la marque invisible, tandis qu’une forte opacité peut cacher le document. Vérifiez l’équilibre à l’écran et pour l’impression envisagée.",
      ],
    },
    {
      heading: "Employer une indication dont le sens est exact",
      paragraphs: [
        "Écrire Approuvé, Payé ou Confidentiel ne prouve pas le fait indiqué et n’impose aucune restriction. Ajoutez un statut seulement lorsque votre propre procédure le justifie. Une personne disposant d’un éditeur adapté peut aussi modifier ou retirer une marque visible. Cette fonction n’est ni un système de sécurité documentaire, ni un moteur d’encaissement, ni un remplacement pour une signature numérique vérifiée.",
        "Ne recouvrez pas un texte sensible avec une image sombre en considérant qu’il est caviardé. L’information placée dessous peut rester dans le PDF. Utilisez un parcours de caviardage dédié et vérifiez la suppression réelle lorsque la confidentialité compte. Gardez aussi les originaux signés: une modification crée un document dont le statut de signature ne peut pas être présumé. L’outil local ne téléverse, ne distribue et n’archive aucune des versions.",
      ],
    },
  ],
  comparison: [
    {
      name: "iLovePDF Watermark / Page Numbers",
      detail: "Propose texte, image et numérotation.",
      url: "https://www.ilovepdf.com/help/documentation",
    },
  ],
  faqs: [
    {
      q: "Puis-je commencer à un autre numéro que un?",
      a: "Oui. Choisissez le premier entier; chaque page suivante ajoute un. Vérifiez la séquence après une réorganisation ou une nouvelle sélection de pages.",
    },
    {
      q: "Puis-je ajouter un texte et une image?",
      a: "Oui. Les deux utilisent la zone choisie, donc vérifiez leur chevauchement. Un texte bref et une image simple restent plus lisibles que deux marques très denses.",
    },
    {
      q: "Une marque réalise-t-elle un caviardage sécurisé?",
      a: "Non. Cacher visuellement un contenu ne prouve pas son retrait du fichier. Utilisez un outil de caviardage conçu pour cette opération.",
    },
    {
      q: "Pourquoi un texte trop long est-il refusé?",
      a: "L’outil évite que la marque dépasse la largeur disponible. Raccourcissez le libellé et vérifiez la page la plus étroite du document.",
    },
    {
      q: "Le mot Approuvé crée-t-il une signature certifiée?",
      a: "Non. C’est uniquement une indication visible que vous ajoutez. La certification et la signature numérique demandent un parcours distinct adapté.",
    },
    {
      q: "Comment retrouver une copie sans marque?",
      a: "Gardez le fichier original. Le PDF marqué est un nouveau document; annuler dans l’éditeur ne modifie pas les copies déjà téléchargées ou partagées.",
    },
  ],
  service: { label: "Concevoir un parcours documentaire avec 3D3D", path: "/software-development" },
} satisfies ToolGuide;
