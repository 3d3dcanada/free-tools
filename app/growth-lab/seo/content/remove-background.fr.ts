import type { ToolGuide } from "../guide";
export default {
  slug: "remove-background",
  locale: "fr",
  title: "Supprimer un arrière-plan gratuitement | 3D3D",
  description:
    "Détourez une image sur votre appareil avec un modèle local. Export PNG transparent, traitement par lots et aucune photo téléversée.",
  name: "Supprimer l’arrière-plan",
  headline: "Gardez le sujet. Vérifiez le contour.",
  summary: "Estimez un masque localement et conservez un PNG transparent.",
  answer:
    "Supprimez gratuitement l’arrière-plan d’une photo sans la téléverser. Un modèle facultatif se charge dans votre navigateur, estime le premier plan et produit un PNG transparent aux dimensions originales. Examinez soigneusement le contour: les cheveux fins, le verre, les ombres et les objets peu distincts du fond peuvent demander une retouche manuelle.",
  steps: [
    "Choisissez une photo nette dont le sujet est bien reconnaissable. Un fond contrasté et un éclairage suffisant facilitent le travail. Conservez l’original pour comparer le résultat et reprendre le détourage dans un autre logiciel si nécessaire.",
    "Chargez le modèle lorsque vous êtes prêt à lancer l’opération. Ses fichiers proviennent de ce site; votre photo reste sur votre appareil. La première utilisation comprend ce téléchargement et peut donc être plus longue que les suivantes.",
    "Examinez le résultat en détail, au-delà de la silhouette générale. Regardez les cheveux, les poignées, les sangles, les reflets et les ouvertures dans l’objet. Vérifiez si une ombre utile a disparu ou si des morceaux du fond sont restés.",
    "Téléchargez le PNG transparent et placez-le sur un fond clair, puis sur un fond sombre. Utilisez-le seulement si sa qualité convient à la destination. Une fiche produit ou un visuel imprimé peut exiger un masque manuel plus précis.",
  ],
  sections: [
    {
      heading: "Comprendre les limites du masque automatique",
      paragraphs: [
        "Le modèle reconnaît un premier plan probable, sans connaître votre intention. Une personne tenant un produit peut être conservée avec lui, tandis qu’un objet éloigné peut disparaître. Une poignée manquante ou un bord transparent mal découpé compte même si la miniature semble réussie. Examinez l’ensemble du sujet avant d’utiliser l’image pour présenter fidèlement un produit ou une personne.",
        "Le masque de travail est calculé à 320 sur 320 pixels, puis adapté aux dimensions de la photo. Le PNG conserve la taille originale, mais cela ne signifie pas que chaque détail a été analysé à cette résolution. Les mèches fines et les transitions douces peuvent être simplifiées. Une source plus grande ne recrée pas les détails que le modèle n’a pas reconnus, et répéter le détourage ne constitue pas une correction fiable.",
      ],
    },
    {
      heading: "Choisir une photo qui facilite le détourage",
      paragraphs: [
        "Un fond simple réduit les ambiguïtés visuelles sans devoir être parfaitement blanc. Évitez une couleur ou une texture presque identique à celle du sujet. Laissez un peu d’espace autour de l’objet et montrez son contour avec un éclairage régulier. Le modèle ne reconstruit pas les parties situées hors du cadre: une anse coupée au moment de la prise de vue reste une anse coupée.",
        "Les surfaces réfléchissantes, translucides et très fines sont particulièrement délicates. Un verre laisse voir le décor à travers sa paroi; une pièce polie reflète la pièce; une chaîne comporte de petites ouvertures. Inspectez ces zones une par une. Cet outil ne possède pas de pinceau pour reprendre le masque. Si le résultat automatique ne convient pas, poursuivez dans un éditeur permettant une retouche explicite du contour.",
      ],
    },
    {
      heading: "Prévoir le traitement et l’utilisation finale",
      paragraphs: [
        "Le modèle U2NetP, distribué sous une licence permissive, fonctionne sur l’appareil avec WebGL. L’opération ne peut pas aboutir si le navigateur ne dispose pas d’un WebGL utilisable. Commencez par une photo et évitez les tâches concurrentes gourmandes en mémoire. Les images sont traitées successivement, avec des limites de fichiers, mais un essai réussi ne garantit pas le traitement de toutes les grandes photos sur tous les téléphones.",
        "Un PNG transparent s’intègre facilement dans une diapositive, un catalogue ou une composition graphique. Il n’ajoute pas automatiquement une ombre de contact réaliste et ne corrige ni la perspective ni l’éclairage d’un nouveau décor. Gardez la source et documentez vos retouches selon votre usage. Le détourage n’est pas non plus une preuve de nettoyage des métadonnées; utilisez le parcours SNITCH lorsque vous devez les inspecter ou les retirer.",
      ],
    },
  ],
  comparison: [
    {
      name: "Adobe Express",
      detail: "Propose un parcours consacré au détourage.",
      url: "https://www.adobe.com/express/feature/image/remove-background",
    },
  ],
  faqs: [
    {
      q: "Ma photo quitte-t-elle mon appareil?",
      a: "Non. Le navigateur télécharge les fichiers statiques du modèle et effectue le calcul localement. L’outil n’envoie pas votre image à un service de traitement distant.",
    },
    {
      q: "Pourquoi une partie du sujet a-t-elle disparu?",
      a: "Le masque reste une estimation. Les couleurs proches, les détails fins, les matières transparentes et les sujets superposés peuvent provoquer une erreur. Conservez l’original et reprenez manuellement au besoin.",
    },
    {
      q: "Puis-je corriger le contour avec un pinceau?",
      a: "Cette version ne propose pas de pinceau de masque. Téléchargez le résultat s’il vous convient, ou terminez le détourage dans un éditeur doté de ces commandes.",
    },
    {
      q: "Pourquoi le premier traitement est-il plus long?",
      a: "Le modèle doit être chargé avant le calcul. La vitesse de l’appareil, les dimensions de l’image et les ressources disponibles influencent aussi la durée, sans délai garanti.",
    },
    {
      q: "L’outil fonctionne-t-il sans WebGL?",
      a: "Ce traitement demande un WebGL utilisable. Si le navigateur le refuse, l’opération signale une erreur au lieu de transmettre la photo à un serveur.",
    },
    {
      q: "Puis-je détourer plusieurs photos?",
      a: "Oui, dans les limites affichées. Chaque image reçoit son propre résultat. Vérifiez chaque masque: une bonne première photo ne prouve pas la qualité de tout le lot.",
    },
  ],
  service: { label: "Créer un site produit avec 3D3D", path: "/software-development" },
  sources: [{ label: "U²-Net: projet du modèle et licence", url: "https://github.com/xuebinqin/U-2-Net" }],
} satisfies ToolGuide;
