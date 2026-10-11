import type { ToolGuide } from "../guide";
export default {
  slug: "convert-image",
  locale: "fr",
  title: "Convertisseur d’images gratuit et local | 3D3D",
  description:
    "Convertissez en PNG, JPG, WebP ou AVIF sans transmettre les images. SVG autonome pris en charge et HEIC selon le navigateur. Lots gratuits.",
  name: "Convertisseur d’images gratuit",
  headline: "Un nouveau format. Votre original reste intact.",
  summary: "Encodez une nouvelle image dans le format demandé par l’application suivante.",
  answer:
    "Convertissez gratuitement vos images en PNG, JPG, WebP ou AVIF sans transmettre les fichiers. Le navigateur ouvre les sources compatibles, dont un ensemble limité de SVG autonomes et le HEIC lorsqu’un décodage natif existe. Choisissez le format de sortie, examinez le résultat et téléchargez les nouveaux fichiers séparément ou en ZIP.",
  steps: [
    "Repérez les formats acceptés par le destinataire et déterminez si la transparence est nécessaire. Choisissez les sources sur votre appareil. Essayez un fichier représentatif avec les formats photo particuliers, les SVG complexes ou un navigateur inhabituel.",
    "Sélectionnez la sortie. Pour un JPEG issu d’une image transparente, choisissez la couleur de fond. Réglez la qualité avec perte au besoin. La conversion produit un nouvel encodage; changer seulement l’extension du nom ne réalise pas ce travail.",
    "Lancez le lot et contrôlez les dimensions ainsi que le poids de chaque résultat. Examinez couleurs, orientation, textes et contours. Une source refusée reste signalée comme une erreur au lieu d’être renvoyée avec une extension trompeuse.",
    "Téléchargez les fichiers ou le ZIP, puis ouvrez un résultat dans l’application destinataire. Gardez l’original si vous avez besoin d’animation, de données photo, d’édition vectorielle ou d’une capacité propre au fichier source absente de l’image fixe produite.",
  ],
  sections: [
    {
      heading: "Choisir le format selon le destinataire",
      paragraphs: [
        "Le bon format dépend de l’application, de l’image et des renseignements à conserver. Le JPEG convient à de nombreux échanges photographiques, mais ne gère pas la transparence. Le PNG est utile pour les dessins rendus et le canal alpha. WebP et AVIF servent à la diffusion lorsque la destination les accepte. Vérifiez cette compatibilité avant de convertir une collection entière, surtout pour un imprimeur ou une application ancienne.",
        "L’extension décrit un format sans le créer. Renommer un PNG avec le suffixe JPG ne le transforme pas en JPEG. Cet outil décode la source, encode la sortie demandée et présente le résultat réel. Il s’agit donc d’un rendu d’image, pas d’une migration d’archives destinée à préserver toutes les fonctions et données particulières du fichier original.",
      ],
    },
    {
      heading: "Comprendre les limites des sources acceptées",
      paragraphs: [
        "Le HEIC dépend du décodeur natif du navigateur et du système. Cette page n’envoie pas une photo incompatible à un serveur et n’ajoute pas discrètement un décodeur sous copyleft. Si l’image ne s’ouvre pas, exportez d’abord un JPEG dans l’application photo de l’appareil. Une réussite sur une machine ne prouve pas la compatibilité de tous les navigateurs: testez l’environnement réellement prévu.",
        "Le SVG doit être autonome et utiliser les formes et textes acceptés. Les images externes, scripts et éléments non pris en charge sont refusés. Simplifiez un dessin complexe dans son application source et transformez les lettres importantes en tracés si la présence de la police compte. Le PNG obtenu est matriciel, pas un vecteur modifiable. Gardez le SVG pour les changements d’échelle ou de dessin futurs.",
      ],
    },
    {
      heading: "Conserver les fonctions particulières de l’original",
      paragraphs: [
        "Une conversion fixe ne préserve ni l’animation, ni le mouvement d’une Live Photo, ni les données de profondeur, ni un projet graphique en plusieurs calques. La couleur ou la dynamique peut aussi varier selon le rendu du navigateur. Comparez un exemple sur l’appareil destinataire, notamment pour une photo initialement affichée en HDR. Conservez le fichier source complet si ces capacités restent importantes.",
        "Un nouveau format n’est pas automatiquement plus léger ou plus beau. Examinez ensemble le poids mesuré et le résultat visuel. Si des dimensions précises sont demandées, redimensionnez de façon volontaire. Pour les métadonnées, utilisez le lien SNITCH plutôt que de considérer la conversion comme une suppression vérifiée. Les lots sont limités pour ménager la mémoire de l’appareil; les originaux demeurent intacts.",
      ],
    },
  ],
  comparison: [
    { name: "Squoosh", detail: "Conversion locale avec comparaison visuelle.", url: "https://squoosh.app/" },
  ],
  faqs: [
    {
      q: "Puis-je convertir un HEIC en JPG ici?",
      a: "Seulement si le navigateur décode nativement ce HEIC. Une source incompatible produit une erreur. Sinon, exportez d’abord un JPEG dans l’application photo de l’appareil d’origine.",
    },
    {
      q: "Puis-je convertir un SVG en PNG?",
      a: "Oui, pour l’ensemble de SVG autonomes pris en charge. Les scripts, ressources externes et éléments incompatibles sont refusés. Simplifiez la source puis vérifiez le rendu.",
    },
    {
      q: "Pourquoi le fond transparent est-il devenu uni?",
      a: "Le JPEG ne gère pas la transparence: ces zones prennent la couleur de fond choisie. Utilisez PNG, WebP ou AVIF si la destination demande un canal alpha.",
    },
    {
      q: "L’animation est-elle conservée?",
      a: "Non. Ce parcours crée une image fixe à partir du contenu rendu par le navigateur. Gardez l’animation ou l’ensemble photo original si le mouvement fait partie du résultat voulu.",
    },
    {
      q: "La conversion supprime-t-elle sûrement toutes les métadonnées?",
      a: "Ne la présentez pas comme un nettoyage vérifié. Utilisez SNITCH pour examiner ou retirer les métadonnées, puis contrôlez le fichier selon le parcours de cet outil.",
    },
    {
      q: "Pourquoi l’apparence du résultat diffère-t-elle?",
      a: "Le rendu de la source, les couleurs, le remplissage des zones transparentes et l’encodage avec perte peuvent la modifier. Comparez le fichier et gardez l’original si la fidélité est essentielle.",
    },
  ],
  service: { label: "Discuter d’un traitement local de fichiers avec 3D3D", path: "/software-development" },
} satisfies ToolGuide;
