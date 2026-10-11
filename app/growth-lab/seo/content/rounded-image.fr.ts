import type { ToolGuide } from "../guide";
export default {
  slug: "rounded-image",
  locale: "fr",
  title: "Arrondir une image et ajouter une bordure | 3D3D",
  description:
    "Arrondissez les coins de vos images et ajoutez une bordure. Export PNG transparent, traitement par lots et aucun téléversement de vos fichiers.",
  name: "Arrondir les coins d’une image",
  headline: "Des coins doux, un contour précis.",
  summary: "Créez un PNG aux coins arrondis, avec une bordure au besoin.",
  answer:
    "Arrondissez gratuitement les coins d’une image dans votre navigateur, sans téléverser vos fichiers. Réglez le rayon et ajoutez une bordure colorée au besoin, puis téléchargez un PNG aux coins transparents. Les dimensions restent identiques. Le traitement par lots facilite la préparation d’images cohérentes pour une présentation, une boutique ou un site.",
  steps: [
    "Déposez les images et examinez le premier aperçu. Si vous souhaitez un portrait carré ou un format précis, faites d’abord le recadrage. Cet outil modifie le contour visible; il ne transforme pas automatiquement un rectangle en carré.",
    "Choisissez le rayon des coins, exprimé en pourcentage du côté le plus court. Augmentez progressivement la valeur en regardant le résultat. À cinquante pour cent, un carré devient un cercle et un rectangle allongé prend une forme de capsule.",
    "Ajoutez une bordure si elle aide à distinguer l’image de son arrière-plan. Choisissez sa largeur et sa couleur. Le trait se trouve à l’intérieur de la forme et peut donc couvrir des détails placés près du bord.",
    "Traitez le lot et téléchargez les PNG. Essayez un résultat sur le véritable fond de destination. Des coins transparents n’auront pas le même effet sur une diapositive blanche, une section colorée ou une page à motifs.",
  ],
  sections: [
    {
      heading: "Préparer la composition avant le contour",
      paragraphs: [
        "Pour obtenir un avatar circulaire, commencez par un recadrage carré centré sur le sujet. Gardez assez d’espace au-dessus de la tête et sur les côtés, puis appliquez le rayon maximal. Un rectangle très large conserve sa largeur et donne des extrémités arrondies. Cette forme peut convenir à une étiquette, mais elle ne remplace pas la composition d’un portrait dans un cercle.",
        "Une série d’images peut partager le même rayon sans devoir partager exactement le même cadrage. Examinez chaque fichier après le traitement. Un visage ou un objet placé dans un coin risque de disparaître alors qu’une autre photo reste bien équilibrée. Conservez les originaux afin de pouvoir reprendre le cadrage sans travailler sur une copie dont les coins ont déjà été supprimés.",
      ],
    },
    {
      heading: "Préserver les coins transparents",
      paragraphs: [
        "Le résultat est un PNG, car ce format permet de conserver les pixels transparents. Un damier affiché par un logiciel sert généralement à représenter la transparence; il ne fait pas nécessairement partie de l’image. Placez le fichier sur le fond prévu pour vérifier son apparence. Si un autre logiciel le convertit en JPEG, les coins devront être remplis avec une couleur opaque.",
        "Les dimensions du canevas ne changent pas. Une image de 1200 sur 800 pixels garde ces dimensions, y compris les zones devenues transparentes. Vous pouvez ainsi remplacer une image dans une mise en page qui attend déjà ce format. Si votre destination impose une limite de taille de fichier, mesurez le PNG téléchargé: des coins invisibles ne garantissent pas une réduction importante du nombre d’octets.",
      ],
    },
    {
      heading: "Choisir entre un fichier modifié et un style Web",
      paragraphs: [
        "Un PNG arrondi emporte son contour dans une présentation, une pièce jointe ou un document téléchargeable. Pour un site que vous maintenez, la propriété CSS border-radius peut être plus souple: le fichier original reste intact et le style peut évoluer avec la page. Choisissez selon l’usage réel plutôt que de multiplier des copies définitivement découpées sans savoir où elles seront utilisées.",
        "Une bordure peut détacher une photo de son fond, mais elle ne corrige ni une résolution insuffisante ni un manque de contraste à l’intérieur de l’image. Vérifiez le plus petit format d’affichage prévu et évitez un trait trop épais. Lorsqu’un logo ou une silhouette possède déjà un contour net, une bordure supplémentaire peut nuire à la lisibilité. Gardez aussi une version simple si le reste du design est encore en discussion.",
      ],
    },
  ],
  comparison: [
    {
      name: "CSS border-radius",
      detail: "Arrondit le contour d’un élément dans une page Web.",
      url: "https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/border-radius",
    },
  ],
  faqs: [
    {
      q: "Comment obtenir une image circulaire?",
      a: "Utilisez une source carrée et un rayon de cinquante pour cent. Recadrez d’abord une photo rectangulaire si vous souhaitez un cercle plutôt qu’une capsule.",
    },
    {
      q: "Pourquoi le fichier est-il un PNG?",
      a: "Le PNG conserve les coins transparents. Un JPEG a besoin d’un fond opaque et ne peut pas conserver cette découpe transparente de la même manière.",
    },
    {
      q: "La bordure agrandit-elle l’image?",
      a: "Non. Le trait est dessiné à l’intérieur de la forme. Les dimensions restent identiques, mais une bordure épaisse peut cacher des éléments près du contour.",
    },
    {
      q: "Puis-je traiter plusieurs images ensemble?",
      a: "Oui. Les réglages choisis s’appliquent à chaque image. Vérifiez toutefois chaque composition, car les sujets ne se trouvent pas tous au même endroit.",
    },
    {
      q: "Les fichiers originaux sont-ils remplacés?",
      a: "Non. Les résultats sont de nouveaux téléchargements. Gardez les sources pour modifier le rayon, reprendre le cadrage ou retrouver une version sans découpe.",
    },
    {
      q: "La transparence sera-t-elle conservée partout?",
      a: "Elle reste disponible dans les logiciels qui préservent la transparence PNG. Certains services aplatissent les images; vérifiez le résultat après l’importation ou la publication.",
    },
  ],
  service: { label: "Préparer votre site avec 3D3D", path: "/software-development" },
} satisfies ToolGuide;
