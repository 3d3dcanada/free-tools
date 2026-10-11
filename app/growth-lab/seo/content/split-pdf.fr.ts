import type { ToolGuide } from "../guide";
export default {
  slug: "split-pdf",
  locale: "fr",
  title: "Diviser un PDF et extraire des pages | 3D3D",
  description:
    "Choisissez des pages PDF et téléchargez un extrait ou un ZIP de fichiers individuels. Sélection par plages, aperçu local et aucun téléversement.",
  name: "Diviser un PDF",
  headline: "Les pages utiles à cette tâche.",
  summary: "Créez un extrait ou séparez chaque page dans son propre PDF.",
  answer:
    "Divisez gratuitement un PDF sans le téléverser. Sélectionnez des numéros ou des plages de pages, puis téléchargez un extrait unique ou un ZIP de PDF individuels. Vérifiez l’ordre avant l’exportation et conservez l’original. La sélection utilise les positions dans la liste actuelle, qui peuvent différer des numéros imprimés sur les pages.",
  steps: [
    "Ouvrez un PDF lisible et repérez les pages souhaitées dans la liste. Comparez leur position avec la numérotation imprimée. Une couverture, un sommaire ou une introduction en chiffres romains peut décaler ces deux systèmes de numérotation.",
    "Saisissez une sélection comme 1, 3-5. Les virgules séparent les entrées et chaque plage doit être croissante. L’outil garde l’ordre saisi et retire les sélections répétées. Examinez donc la séquence choisie avant de lancer le téléchargement.",
    "Téléchargez le PDF sélectionné pour garder l’extrait ensemble, ou choisissez la séparation en PDF individuels pour obtenir un ZIP contenant une page par fichier. Décidez selon le besoin du destinataire: contexte continu ou pièces indépendantes.",
    "Ouvrez le PDF ou le ZIP réellement téléchargé. Vérifiez le nombre de fichiers et les pages de début et de fin. Renommez les livrables de façon claire et conservez l’original complet pour retrouver le contexte absent de l’extrait.",
  ],
  sections: [
    {
      heading: "Utiliser les positions plutôt que les numéros imprimés",
      paragraphs: [
        "Un rapport peut afficher le numéro 1 sur sa troisième page physique, après une couverture et un sommaire. Le champ de sélection utilise la liste actuelle en commençant à un; il ne lit pas le numéro imprimé dans le document. Regardez les vignettes et l’aperçu des pages aux limites de la sélection. Ce contrôle évite de commencer trop tôt ou d’omettre la fin d’une section.",
        "Une sélection vide reprend toute la liste actuelle. L’entrée 5, 1-2 place la cinquième page avant les deux premières. Les numéros répétés sont retenus une seule fois: écrire 1, 1 ne crée pas un doublon. Si vous déplacez ou supprimez des pages avant de choisir la plage, examinez la nouvelle liste et adaptez les numéros. Ne vous fiez pas à une position mémorisée dans l’ordre original.",
      ],
    },
    {
      heading: "Choisir la bonne forme de séparation",
      paragraphs: [
        "Un extrait unique convient à un chapitre, un jeu de plans ou plusieurs instructions qui doivent être lues ensemble. Des fichiers d’une seule page conviennent à des étiquettes ou pièces jointes indépendantes. Le ZIP nomme les pages selon l’ordre de sortie; il ne devine ni les noms des clients ni les titres des documents. Appliquez votre convention de nommage après avoir identifié chaque fichier.",
        "La séparation peut faire disparaître un contexte utile. Un tableau continue parfois à la page suivante, un avertissement renvoie à une instruction précédente et une signature peut concerner l’ensemble du document. Déterminez ce dont le lecteur a besoin pour comprendre l’extrait correctement. Ajoutez au besoin le titre et la version de la source dans vos notes de livraison, sans présenter une page isolée comme un dossier complet.",
      ],
    },
    {
      heading: "Vérifier les copies avant de les transmettre",
      paragraphs: [
        "Les pages choisies sont copiées dans de nouveaux documents. L’opération ne constitue ni un caviardage sécurisé ni un retrait de mot de passe, et elle ne garantit pas la conservation des formulaires, signets ou signatures numériques. Si une page contient une information confidentielle à retirer, exclure les autres pages ne règle pas le problème. Utilisez un parcours de caviardage adapté et vérifiez ce résultat séparément.",
        "Gardez la source intacte et enregistrez les extraits dans un emplacement choisi. La mémoire du navigateur n’est pas une archive, et l’outil ne conserve pas vos documents après la session. Une séparation réduit le nombre de pages par fichier sans garantir un poids précis. Contrôlez les limites de livraison sur les téléchargements réels et essayez les polices, champs ou liens essentiels dans le lecteur utilisé par le destinataire.",
      ],
    },
  ],
  comparison: [
    {
      name: "iLovePDF Split PDF",
      detail: "Propose l’extraction et la séparation de pages.",
      url: "https://www.ilovepdf.com/help/documentation",
    },
  ],
  faqs: [
    {
      q: "Comment choisir plusieurs plages?",
      a: "Séparez-les par des virgules, par exemple 1-3, 7, 10-12. Chaque plage doit être croissante et rester dans le nombre de pages actuel. Vérifiez l’aperçu avant l’exportation.",
    },
    {
      q: "Puis-je placer la page 5 avant la page 1?",
      a: "Oui. Saisissez 5, 1 pour cet ordre. Les positions se rapportent à la liste actuelle et chaque page sélectionnée est conservée une seule fois.",
    },
    {
      q: "Que signifie une sélection vide?",
      a: "Elle comprend toute la liste actuelle. Saisissez des numéros explicites pour obtenir un extrait, puis contrôlez le nombre de pages et les limites de la sélection.",
    },
    {
      q: "Puis-je obtenir un PDF par page?",
      a: "Oui. L’action de séparation produit un ZIP de PDF individuels. Téléchargez plutôt le PDF sélectionné si les pages doivent rester dans un seul document.",
    },
    {
      q: "La sélection utilise-t-elle les numéros imprimés?",
      a: "Non. Elle utilise les positions de la liste, à partir de un. La couverture et l’introduction peuvent décaler ces positions par rapport aux numéros visibles sur les pages.",
    },
    {
      q: "Une signature numérique conserve-t-elle sa validité?",
      a: "Ne supposez pas qu’un extrait conserve le statut signé de l’original. Gardez le document signé complet et utilisez une vérification adaptée lorsque ce statut compte.",
    },
  ],
  service: { label: "Simplifier vos documents avec 3D3D", path: "/software-development" },
} satisfies ToolGuide;
