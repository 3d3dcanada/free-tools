import type { ToolGuide } from "../guide";
export default {
  slug: "compress-image",
  locale: "fr",
  title: "Compresser une image gratuitement | 3D3D",
  description:
    "Compressez des lots JPG, PNG, WebP ou AVIF localement. Réglez la qualité, comparez le poids réel et téléchargez sans transmettre vos images.",
  name: "Compresseur d’images gratuit",
  headline: "Moins de poids. Une vraie comparaison.",
  summary: "Comparez le poids réel et la qualité visible avant de conserver le résultat.",
  answer:
    "Compressez gratuitement vos images dans le navigateur et comparez leur poids réel avant le téléchargement. Aucun fichier n’est transmis. Choisissez JPG, PNG, WebP ou AVIF, réglez la qualité lorsque le format le permet et traitez un lot localement. Gardez les originaux: un fichier plus léger peut perdre des détails visibles.",
  steps: [
    "Choisissez une image représentative ou un lot de 20 fichiers au maximum. Respectez 100 Mo au total, 40 Mo par fichier et 24 mégapixels par image. Commencez par un seul exemple pour essayer un format inhabituel.",
    "Sélectionnez un format adapté à la destination. Le curseur de qualité agit sur JPG, WebP et AVIF. L’optimisation PNG conserve les pixels rendus sans perte; son poids ne se règle pas avec un pourcentage de qualité destructif.",
    "Lancez le lot et comparez les poids d’entrée et de sortie. Un résultat plus gros est indiqué comme tel. Examinez les textes, les traits fins, les dégradés, les visages et les contours transparents à leur taille d’utilisation.",
    "Téléchargez un résultat ou le ZIP du lot. Ouvrez un fichier dans l’application destinataire avant de remplacer une image existante. Gardez l’original pour éviter de repartir d’une copie déjà comprimée lors des prochaines modifications.",
  ],
  sections: [
    {
      heading: "Définir une réduction utile",
      paragraphs: [
        "Le but est de respecter la limite de la destination tout en conservant les renseignements dont le public a besoin. Une pièce jointe, une photo de produit et une capture d’interface n’acceptent pas les mêmes dégradations. Partez des dimensions et du poids autorisés, puis comparez quelques réglages. Ne baissez pas la qualité uniquement pour afficher un meilleur pourcentage si l’image ne remplit plus sa fonction.",
        "Les dimensions en pixels et le poids en octets décrivent deux choses différentes. La compression change l’encodage; le redimensionnement change le nombre de pixels. Si un site affiche une photo dans une petite zone, des dimensions adaptées peuvent économiser davantage qu’une compression agressive de l’original. Utilisez d’abord le redimensionnement si le problème vient de la taille, puis examinez le fichier comprimé dans son contexte prévu.",
      ],
    },
    {
      heading: "Comparer selon le contenu",
      paragraphs: [
        "Une photographie tolère parfois une compression avec perte, tandis que les petites lettres et les dessins nets révèlent rapidement des halos ou des blocs. Une image transparente demande aussi un format qui conserve le canal alpha. Le JPEG remplit les zones transparentes avec le fond choisi. PNG, WebP et AVIF permettent de les conserver selon l’encodage. Un bon réglage pour une photo ne convient pas nécessairement à tout un lot varié.",
        "Le nombre de qualité est un paramètre d’encodeur, pas une note visuelle universelle. La même valeur en AVIF et en JPEG ne prouve pas une qualité équivalente. Comparez les images réellement décodées et leur poids. Au premier usage, un codec facultatif télécharge son code statique depuis le même site; l’image reste dans le navigateur pendant le traitement et n’est pas envoyée pour être convertie ailleurs.",
      ],
    },
    {
      heading: "Contrôler le résultat sans supposer un gain",
      paragraphs: [
        "Certains originaux sont déjà efficacement comprimés. Les réencoder peut produire un fichier plus gros, surtout en changeant de format ou en conservant des renseignements absents d’une ancienne version. La liste des résultats l’indique honnêtement. Si le fichier grossit ou se dégrade, gardez l’original, essayez un autre format ou réduisez les dimensions lorsque l’usage final permet cette modification.",
        "L’optimisation PNG s’applique à l’image rendue par le navigateur. Elle ne promet pas de préserver chaque métadonnée, profil colorimétrique ou octet du fichier source. Pour examiner ou retirer des métadonnées, utilisez SNITCH, accessible depuis l’éditeur. Le lot est traité image par image pour limiter la mémoire, mais un téléphone peut encore peiner sur de gros fichiers. Annulez et essayez un lot plus petit au besoin.",
      ],
    },
  ],
  comparison: [
    { name: "Squoosh", detail: "Compression locale avec comparaison visuelle.", url: "https://squoosh.app/" },
  ],
  faqs: [
    {
      q: "Puis-je obtenir exactement 100 Ko?",
      a: "L’outil ne garantit pas un poids cible. Modifiez la qualité ou les dimensions, relancez le traitement et comparez la mesure à la limite de votre destination.",
    },
    {
      q: "Chaque fichier sera-t-il plus petit?",
      a: "Non. Le contenu, le format et la compression précédente influencent le résultat. Le poids réel est affiché, y compris lorsque le fichier grossit.",
    },
    {
      q: "Pourquoi le curseur de qualité est-il désactivé pour le PNG?",
      a: "L’optimisation PNG est sans perte pour les pixels rendus. Un pourcentage destructif décrirait une autre opération; changez les dimensions ou le format si une réduction supplémentaire est acceptable.",
    },
    {
      q: "Mes photos d’origine sont-elles remplacées?",
      a: "Non. Chaque téléchargement crée un nouveau fichier. Conservez les originaux et comparez le résultat avant de remplacer vous-même une ressource dans votre projet.",
    },
    {
      q: "Puis-je garder la transparence?",
      a: "Choisissez PNG, WebP ou AVIF et vérifiez la sortie. Le JPEG ne possède pas de canal alpha: les zones transparentes prennent la couleur de fond sélectionnée.",
    },
    {
      q: "Pourquoi le lot prend-il plus de temps sur mon téléphone?",
      a: "Le décodage et l’encodage utilisent son processeur et sa mémoire. Réduisez le nombre ou les dimensions des fichiers; aucun service distant ne réalise ce travail à sa place.",
    },
  ],
  service: { label: "Créer un site Web ou un logiciel utile avec 3D3D", path: "/software-development" },
} satisfies ToolGuide;
