import type { ToolGuide } from "../guide";
export default {
  slug: "merge-pdf",
  locale: "fr",
  title: "Fusionner des PDF gratuitement et localement | 3D3D",
  description:
    "Réunissez vos PDF sur votre appareil. Vérifiez les pages, corrigez leur ordre et téléchargez un document sans compte, filigrane ni téléversement.",
  name: "Fusionner des PDF",
  headline: "Un document, dans le bon ordre.",
  summary: "Réunissez plusieurs PDF et vérifiez la séquence des pages.",
  answer:
    "Fusionnez gratuitement des PDF dans votre navigateur sans téléverser les documents. Sélectionnez les sources ensemble, examinez les pages, réorganisez leur ordre et téléchargez un nouveau fichier. Les originaux restent intacts. Cet outil assemble des pages: vérifiez ensuite les formulaires, liens, polices et fonctions particulières dans votre lecteur PDF habituel.",
  steps: [
    "Choisissez les PDF qui doivent figurer dans le dossier final. Sélectionnez le groupe complet, avec au maximum dix fichiers, 100 Mo au total et 200 pages. Chaque fichier doit rester sous 40 Mo et être lisible sans mot de passe.",
    "Examinez les vignettes dans l’ordre. Placez l’introduction avant les pièces jointes et gardez ensemble les pages liées. Déplacez-les avec les boutons ou par glisser-déposer, puis faites pivoter celles qui ne sont pas dans le bon sens.",
    "Retirez les doublons et les séparateurs inutiles seulement après les avoir identifiés. La commande Annuler permet de revenir sur une modification locale pendant la session. Gardez au moins une page et contrôlez la séquence sélectionnée avant l’exportation.",
    "Téléchargez le PDF fusionné et ouvrez ce fichier réel dans un lecteur. Comptez les pages, examinez les transitions entre documents et vérifiez un échantillon de chaque source. Donnez au résultat un nom utile et conservez les originaux séparément.",
  ],
  sections: [
    {
      heading: "Assembler un dossier facile à lire",
      paragraphs: [
        "La fusion convient à plusieurs documents qui décrivent un même travail: proposition, plans, fiche technique et rapport photographique. Décidez du parcours de lecture avant de déplacer les pages. Le bon ordre dépend du besoin du destinataire, pas nécessairement de l’ordre des téléchargements. Une couverture ou un sommaire peut aider; préparez cette page dans un éditeur de documents avant de l’ajouter au groupe.",
        "Vérifiez les jonctions entre fichiers. Une source peut déjà contenir une couverture, un verso blanc ou un avis répété que vous souhaitiez conserver. Deux vignettes semblables ne prouvent pas qu’une page est inutile. Consultez l’original en cas de doute. Notez aussi la version de chaque source, afin qu’une mise à jour ultérieure ne mélange pas discrètement d’anciens plans avec de nouvelles instructions.",
      ],
    },
    {
      heading: "Distinguer les pages et les fonctions du document",
      paragraphs: [
        "L’assemblage copie les pages PDF sans convertir volontairement tout le document en images. Cela convient aux textes et graphiques ordinaires. Un PDF peut cependant contenir des formulaires, signatures, signets, pièces jointes et fonctions interactives qui ne se résument pas à l’apparence des pages. L’outil ne certifie pas leur conservation et ne produit pas un dossier d’archivage PDF/A validé. Essayez les fonctions dont le destinataire a réellement besoin.",
        "Le résultat est un nouveau document. Ne considérez pas qu’une signature numérique existante est automatiquement transférée à cette copie. Gardez les originaux signés et utilisez un parcours de signature adapté si le dossier fusionné doit être authentifié. Les PDF protégés par mot de passe sont également refusés: obtenez une copie de travail autorisée au lieu d’attendre de la fusion qu’elle retire les restrictions.",
      ],
    },
    {
      heading: "Contrôler le poids et la livraison",
      paragraphs: [
        "Réunir plusieurs fichiers ne garantit pas un résultat plus léger. Le PDF contient les pages sélectionnées et sa réécriture peut modifier son poids. Si un portail impose une limite d’octets, mesurez le téléchargement avant de le transmettre. Diviser le dossier en sections convenues peut être préférable à dégrader des pages lisibles, mais confirmez d’abord que le destinataire accepte plusieurs fichiers.",
        "Le traitement se fait dans la mémoire du navigateur et ne crée pas de sauvegarde distante. Après la fermeture ou la remise à zéro de la session, il peut être nécessaire de sélectionner les sources à nouveau. Enregistrez le dossier final dans un emplacement que vous contrôlez, avec les originaux utiles. Rouvrez la copie enregistrée avant de la partager, particulièrement après une longue opération ou une interruption liée au manque de mémoire.",
      ],
    },
  ],
  comparison: [
    {
      name: "iLovePDF Merge PDF",
      detail: "Propose une fusion avec téléversement des documents.",
      url: "https://www.ilovepdf.com/merge_pdf",
    },
  ],
  faqs: [
    {
      q: "Mes PDF sont-ils téléversés?",
      a: "Non. Les documents sont lus et assemblés dans le navigateur. Seules les ressources statiques de l’application sont chargées depuis le site.",
    },
    {
      q: "Puis-je réunir plusieurs formats de papier?",
      a: "Oui. Chaque page conserve ses dimensions. Vérifiez le résultat si votre destinataire attend un dossier imprimé sur un seul format de papier.",
    },
    {
      q: "Puis-je modifier l’ordre après la sélection?",
      a: "Oui. Déplacez les pages par les boutons ou le glisser-déposer. Examinez les transitions entre documents et le nombre final de pages avant le téléchargement.",
    },
    {
      q: "Une signature numérique reste-t-elle valide?",
      a: "Ne vous fiez pas à cette conservation. Le résultat est un nouvel assemblage. Gardez les sources signées et utilisez un parcours adapté lorsque l’authentification compte.",
    },
    {
      q: "La fusion compresse-t-elle le PDF?",
      a: "Aucune réduction n’est promise. Comparez le poids réel du téléchargement à la limite de livraison; assembler et compresser sont deux opérations différentes.",
    },
    {
      q: "Puis-je fusionner des PDF chiffrés?",
      a: "Les entrées protégées sont refusées. Utilisez des copies lisibles que vous êtes autorisé à modifier et gardez les originaux protégés séparément.",
    },
  ],
  service: { label: "Créer un parcours documentaire avec 3D3D", path: "/software-development" },
} satisfies ToolGuide;
