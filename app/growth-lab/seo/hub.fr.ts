import type { ToolGuide } from "./guide";
export default {
  slug: "hub",
  locale: "fr",
  title: "Outils gratuits: création, fichiers et impression 3D | 3D3D",
  description:
    "Choisissez un outil local pour QR, visuels, images, PDF, documents et impression 3D. Sans compte, filigrane, essai ni téléversement.",
  name: "Outils gratuits dans le navigateur",
  headline: "Créez quelque chose d’utile.",
  summary: "Un atelier local pour les visuels, les documents et la préparation 3D.",
  answer:
    "Utilisez des outils gratuits pour créer QR, présentations, affiches, cartes et documents commerciaux, traiter des images ou PDF et préparer une impression 3D. Recherchez le travail voulu, ouvrez l’éditeur correspondant et téléchargez le résultat. Aucun compte n’est nécessaire, vos fichiers ne sont pas téléversés et il n’y a ni essai, ni filigrane, ni expiration.",
  steps: [
    "Recherchez une tâche, comme Wi-Fi, redimensionnement, facture ou STL, ou choisissez une catégorie. La description de chaque outil précise son résultat. Une page consacrée à un besoin précis ouvre l’éditeur avec les réglages adaptés à ce départ.",
    "Examinez l’exemple initial et les limites d’entrée. Ajoutez vos textes ou fichiers, modifiez les commandes utiles et regardez l’aperçu. Conservez les sources pour les comparer aux nouveaux résultats sans perdre le point de départ.",
    "Téléchargez dans un format accepté par la destination. Sauvegardez aussi le brouillon modifiable lorsqu’il est proposé. Ouvrez le véritable export et contrôlez les détails essentiels au lieu de considérer l’aperçu comme une preuve suffisante.",
    "Suivez les outils associés pour l’étape suivante ou l’académie pour comprendre une décision d’impression. Les liens de service ouvrent une demande distincte lorsque vous souhaitez une pièce physique ou un parcours logiciel réalisé par 3D3D.",
  ],
  sections: [
    {
      heading: "Choisir selon le résultat attendu",
      paragraphs: [
        "Les outils QR couvrent liens directs, réseaux, contacts et événements, avec personnalisation et contrôle de lecture. Les éditeurs graphiques produisent présentations, cartes, dépliants, affiches et visuels sociaux à partir de vos contenus. Choisissez un format papier lorsque coupe et fond perdu comptent, ou des dimensions en pixels pour une image destinée à un écran. Le nom du format ne remplace pas la vérification de la destination réelle.",
        "Les images peuvent être converties, redimensionnées, recadrées, compressées, arrondies ou préparées en favicons, avec un détourage local facultatif. Les outils PDF assemblent, extraient, tournent ou réorganisent des pages, créent des documents depuis des images et rendent des pages en images. Ces sorties sont différentes: un PDF rendu en PNG devient une image, tandis qu’une page extraite en PDF reste une page documentaire. Choisissez ce que vous devez conserver.",
      ],
    },
    {
      heading: "Garder un travail local compréhensible et récupérable",
      paragraphs: [
        "Le traitement côté client se déroule sur votre appareil. Le navigateur peut charger le code statique, les polices, les codecs ou le modèle facultatif nécessaires, sans envoyer vos sources pour les traiter. Les fichiers volumineux utilisent toutefois votre mémoire locale. Commencez par un exemple représentatif pour une opération exigeante. Les limites affichées bornent les entrées sans promettre une vitesse identique sur tous les téléphones.",
        "Certains éditeurs gardent des brouillons ou des données réutilisables dans le navigateur; les outils de fichiers conservent leurs sources pendant la session. Ce n’est pas une sauvegarde distante. Lisez la note de stockage, exportez les données modifiables proposées et rangez les résultats dans un emplacement maîtrisé. Effacer les données, changer de profil ou perdre l’appareil peut retirer le travail local. Sources et sauvegardes exportées servent alors à le reprendre.",
      ],
    },
    {
      heading: "Vérifier dans le contexte d’utilisation",
      paragraphs: [
        "Une exportation réussie prouve la création d’un fichier, mais le contrôle utile dépend de son rôle. Scannez un QR imprimé à sa taille réelle, ouvrez une présentation dans le logiciel prévu, examinez le PDF dans le lecteur destinataire et regardez une image après son recadrage final. Pour les calculs d’impression, confirmez les unités et comparez au trancheur puis à un essai physique lorsque l’ajustement ou la fonction compte.",
        "Les documents commerciaux utilisent vos prix sans accéder aux comptes de 3D3D ni encaisser. Les calculateurs d’impression estiment aussi vos entrées au lieu d’afficher les tarifs du service. L’académie explique des décisions de préparation et chaque leçon invite aux corrections. Demandez un devis séparé pour une prestation réelle. Terminer une session locale ne soumet pas un travail, ne publie pas une page et n’envoie pas de message en votre nom.",
      ],
    },
  ],
  comparison: [
    { name: "Squoosh", detail: "Autre option locale pour traiter des images.", url: "https://squoosh.app/" },
  ],
  faqs: [
    {
      q: "Faut-il créer un compte?",
      a: "Non. Les outils fonctionnent sans inscription, essai ou déblocage payant. Les résultats téléchargés ne reçoivent pas de filigrane 3D3D.",
    },
    {
      q: "Les sources sont-elles envoyées à un serveur?",
      a: "Non. Le traitement reste sur l’appareil. Les ressources statiques peuvent venir du site, mais documents, images et modèles ne sont pas téléversés.",
    },
    {
      q: "Puis-je travailler sur téléphone?",
      a: "Les interfaces prévoient petits écrans et commandes tactiles. La mémoire et les fonctions du navigateur influencent encore les grands fichiers, modèles facultatifs et formats particuliers.",
    },
    {
      q: "Les brouillons sont-ils synchronisés?",
      a: "Non. Les enregistrements appartiennent au navigateur et à l’appareil actuels. Exportez une sauvegarde avant de changer d’appareil ou d’effacer les données.",
    },
    {
      q: "Les estimations d’impression sont-elles des devis?",
      a: "Non. Elles utilisent vos hypothèses et coûts. Demandez un devis distinct pour l’examen et la fabrication d’une pièce par 3D3D.",
    },
    {
      q: "Un téléchargement publie-t-il quelque chose?",
      a: "Non. Vous recevez un fichier local et contrôlez son usage. Publication, livraison, impression et demande de service restent des actions séparées que vous choisissez.",
    },
  ],
  service: { label: "Discuter d’un projet avec 3D3D", path: "/quote" },
} satisfies ToolGuide;
