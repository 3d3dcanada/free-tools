import type { ToolGuide } from "../guide";
export default {
  slug: "svg-to-png",
  locale: "fr",
  title: "Convertir SVG en PNG gratuitement | 3D3D",
  description:
    "Transformez un SVG autonome en PNG sur votre appareil. Conservez la transparence, vérifiez les dimensions et téléchargez sans compte ni téléversement.",
  name: "Convertir SVG en PNG",
  headline: "Un dessin vectoriel, une copie en pixels.",
  summary: "Transformez les formes et textes SVG pris en charge en PNG transparent.",
  answer:
    "Convertissez gratuitement un SVG autonome en PNG dans votre navigateur, sans téléverser le fichier. Le format PNG est déjà sélectionné et les formes prises en charge sont rendues en pixels, avec leur transparence. Les scripts, images intégrées et ressources externes sont refusés. Vérifiez les dimensions, les polices et l’apparence avant d’utiliser le téléchargement.",
  steps: [
    "Préparez un SVG autonome contenant des formes et du texte. Retirez les scripts et les dépendances externes dans votre logiciel de dessin. Les images intégrées, les liens distants et le contenu interactif ne font pas partie des entrées acceptées.",
    "Déposez le SVG en conservant PNG comme sortie. Lancez la conversion et regardez les dimensions obtenues. Ce parcours utilise les dimensions intrinsèques du fichier; passez par le redimensionnement avec le SVG original si vous souhaitez une autre taille.",
    "Comparez l’aperçu à votre dessin de référence. Vérifiez l’alignement du texte, les découpes, les dégradés et les traits fins. Si une police manque sur l’appareil, préparez au besoin une version dont les caractères sont convertis en tracés.",
    "Téléchargez le PNG et ouvrez-le dans le logiciel destinataire. Gardez le SVG source à côté. Le PNG convient à une diffusion aux dimensions choisies; les futures modifications des formes et de la mise en page se font plus facilement dans le dessin vectoriel.",
  ],
  sections: [
    {
      heading: "Préparer un dessin vraiment autonome",
      paragraphs: [
        "Un SVG peut contenir davantage qu’un dessin fixe. Ce convertisseur accepte volontairement un ensemble limité adapté au traitement local. Il refuse notamment les scripts, les gestionnaires d’événements, les objets étrangers, les éléments d’image intégrés et les références à des ressources externes. Un refus ne signifie donc pas nécessairement que le dessin est défectueux: il peut simplement utiliser une fonction hors du périmètre pris en charge.",
        "Retournez dans le logiciel d’origine pour exporter une version plus simple lorsque c’est possible. Ne comptez pas sur ce convertisseur pour récupérer une photographie liée à distance. Pour un logo composé de tracés et d’aplats, un export vectoriel propre est généralement plus facile à examiner et à archiver qu’un fichier contenant des éléments d’éditeur inutiles ou des interactions destinées à une page Web.",
      ],
    },
    {
      heading: "Choisir le nombre de pixels utile",
      paragraphs: [
        "Le PNG possède un nombre fixe de pixels. Il ne conserve pas la possibilité d’agrandir indéfiniment le dessin vectoriel. Regardez les dimensions avant de placer le fichier dans une composition. Une petite icône exportée à faible résolution peut devenir floue si vous l’agrandissez ensuite. Produisez la taille nécessaire à partir du SVG original plutôt que de grossir plusieurs fois une copie déjà transformée en pixels.",
        "Les zones transparentes restent transparentes dans la sortie PNG. Examinez les contours sur le véritable fond de destination, surtout les petits caractères et les traits fins. Une ligne d’un pixel peut changer d’apparence selon sa position sur la grille. Pour une icône d’interface, vérifiez aussi la taille réelle d’affichage: le grossissement aide à repérer les défauts, mais ne remplace pas un contrôle de lisibilité dans le contexte prévu.",
      ],
    },
    {
      heading: "Préserver les polices et la possibilité de modifier",
      paragraphs: [
        "Le texte d’un SVG peut dépendre des polices disponibles dans l’environnement de rendu. Si une police manque, l’apparence peut changer. Comparez le fichier obtenu au lieu de supposer que chaque navigateur reproduira exactement votre logiciel de dessin. Pour un logo final que vous maîtrisez, convertir les caractères en tracés peut retirer cette dépendance. Conservez néanmoins une source modifiable contenant le texte d’origine.",
        "Le PNG téléchargé contient des pixels, sans tracés vectoriels ni texte modifiable. Pour changer une couleur, un mot ou une forme, reprenez la source et exportez une nouvelle copie. Dans un dossier de livraison, distinguez clairement le fichier maître des versions raster, avec des noms indiquant leur usage et leurs dimensions. La conversion ne donne aucun droit supplémentaire sur un logo ou une police; gardez les informations de licence avec les sources.",
      ],
    },
  ],
  comparison: [
    { name: "Squoosh", detail: "Propose un parcours de conversion locale.", url: "https://squoosh.app/" },
  ],
  faqs: [
    {
      q: "Pourquoi mon SVG est-il refusé?",
      a: "L’outil accepte des formes et du texte autonomes. Les scripts, les images intégrées et les ressources externes sont exclus. Exportez un SVG statique plus simple depuis le logiciel d’origine.",
    },
    {
      q: "Puis-je choisir les dimensions du PNG?",
      a: "Ce parcours utilise les dimensions intrinsèques du SVG. Pour une autre taille, ouvrez le SVG original dans l’outil de redimensionnement et vérifiez les dimensions de sortie.",
    },
    {
      q: "La transparence est-elle conservée?",
      a: "Oui. Vérifiez néanmoins les contours lissés sur le fond de destination, particulièrement autour des petits caractères et des icônes fines.",
    },
    {
      q: "Pourquoi le texte a-t-il changé?",
      a: "Le fichier peut demander une police indisponible. Comparez le rendu et envisagez un export avec caractères en tracés, tout en gardant une source au texte modifiable.",
    },
    {
      q: "Pourrai-je retrouver les tracés dans le PNG?",
      a: "Le PNG contient des pixels, pas les tracés originaux. Conservez le SVG maître et utilisez-le pour les modifications futures.",
    },
    {
      q: "Puis-je convertir plusieurs SVG ensemble?",
      a: "Oui. Chaque fichier doit respecter les mêmes règles et limites. Examinez chaque résultat, car les dimensions et les dépendances de polices peuvent différer d’un dessin à l’autre.",
    },
  ],
  service: { label: "Créer un site ou un outil visuel avec 3D3D", path: "/software-development" },
} satisfies ToolGuide;
