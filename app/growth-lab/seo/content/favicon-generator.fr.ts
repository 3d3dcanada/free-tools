import type { ToolGuide } from "../guide";
export default {
  slug: "favicon-generator",
  locale: "fr",
  title: "Générateur de favicon gratuit, ICO et PNG | 3D3D",
  description:
    "Créez neuf tailles PNG, un ICO multitailles et site.webmanifest à partir d’une image. ZIP gratuit avec consignes d’installation, sans téléversement.",
  name: "Générateur de favicon gratuit",
  headline: "Une petite marque, bien reconnaissable.",
  summary: "Préparez vos icônes et un manifeste Web initial à partir d’une image source.",
  answer:
    "Créez gratuitement un ensemble de favicons à partir de votre image, sans la transmettre. Le ZIP local contient neuf tailles PNG, un ICO multitailles, un manifeste Web et des consignes d’installation. L’image entière est conservée avec des marges transparentes: choisissez une forme simple et vérifiez la plus petite icône avant l’installation.",
  steps: [
    "Choisissez une image nette, idéalement carrée avec une silhouette simple. Retirez l’espace inutile grâce au recadrage. Un long logo textuel ou une photo détaillée peut devenir illisible dans le petit onglet d’un navigateur.",
    "Lancez la génération et téléchargez le ZIP de l’image. Il contient des PNG de 16, 32, 48, 64, 128, 180, 192, 256 et 512 pixels, ainsi qu’un ICO, un manifeste et les instructions.",
    "Examinez les versions de 16 et 32 pixels à leur taille réelle. Vérifiez les fonds clairs et foncés, les contours transparents et l’espace autour du dessin. Modifiez la source si la petite version perd son identité.",
    "Personnalisez le nom et les réglages du manifeste, copiez les fichiers dans votre projet Web et ajoutez les liens indiqués. Contrôlez leurs adresses et l’affichage réel après publication par le responsable du site.",
  ],
  sections: [
    {
      heading: "Concevoir pour un très petit carré",
      paragraphs: [
        "Une favicon apparaît souvent dans un espace minuscule. Partez de l’élément qui identifie le site: une silhouette forte, un court monogramme ou une autre marque dont vous avez les droits. Un logo horizontal complet ne devient pas forcément une bonne icône parce qu’il peut être réduit. Le générateur conserve toute la source; une marque très large peut donc occuper peu de hauteur dans le carré.",
        "Préparez une composition propre à l’icône si nécessaire. Le cadrage carré doit conserver le signe utile sans le couper sur les bords. Si le dessin comprend des lettres, vérifiez que le petit rendu semble volontaire plutôt qu’une simple tache floue. Le grand aperçu aide à contrôler la source, mais le minuscule fichier constitue le test déterminant pour un onglet de navigateur.",
      ],
    },
    {
      heading: "Comprendre le contenu de l’ensemble",
      paragraphs: [
        "Chaque source reçoit son ZIP. Un lot de plusieurs marques ne mélange donc pas les projets dans un jeu d’icônes unique. Le fichier ICO contient plusieurs résolutions PNG intégrées, tandis que les PNG individuels peuvent être liés directement. Les marges transparentes préservent les proportions. L’outil ne redessine pas automatiquement le logo, ne crée pas de maître vectoriel et ne compose pas une variante particulière pour chaque taille.",
        "Le manifeste est un point de départ avec des noms d’exemple et des entrées d’icônes ordinaires. Remplacez ces valeurs et examinez l’adresse de départ ainsi que le mode d’affichage. Les icônes sont déclarées pour un usage général, sans prétendre être des dessins adaptés aux masques. Si l’application demande une icône masquable, concevez et testez sa zone de sécurité plutôt que de simplement changer l’étiquette du fichier.",
      ],
    },
    {
      heading: "Installer et vérifier dans le véritable site",
      paragraphs: [
        "Les consignes montrent les liens de l’icône, de l’icône tactile Apple et du manifeste. Les chemins doivent correspondre à l’emplacement servi par votre projet. Un site placé dans un sous-dossier peut demander des adresses différentes de l’exemple à la racine. Ouvrez directement les URL et vérifiez qu’elles renvoient bien une image ou le manifeste, pas une page HTML de remplacement ou une adresse locale inaccessible.",
        "Télécharger un ZIP ne change rien au site public. Son responsable doit encore intégrer et publier les fichiers selon le parcours habituel. Vérifiez ensuite l’onglet, les favoris et les présentations pertinentes sur appareil. Gardez le dessin original et le paquet généré avec le code du site pour qu’une autre personne puisse les reproduire. Un export réussi démontre les fichiers, pas leur installation sur tous les appareils.",
      ],
    },
  ],
  comparison: [
    {
      name: "Favicon.io",
      detail: "Création de favicons et références d’installation HTML.",
      url: "https://favicon.io/",
    },
  ],
  faqs: [
    {
      q: "Quels fichiers le ZIP contient-il?",
      a: "Neuf tailles PNG de 16 à 512 pixels, favicon.ico multitailles, site.webmanifest et README.txt. Chaque image source reçoit son propre ensemble.",
    },
    {
      q: "Pourquoi mon logo large paraît-il minuscule?",
      a: "L’image complète est ajustée dans un carré, sans être coupée. Préparez une composition carrée ou retirez l’espace inutile avant de générer les icônes.",
    },
    {
      q: "Puis-je utiliser une source transparente?",
      a: "Oui. Les PNG conservent la transparence et ajoutent des marges transparentes au besoin. Examinez la marque sur différents fonds pour vérifier la visibilité de ses détails.",
    },
    {
      q: "Puis-je publier le manifeste sans le modifier?",
      a: "Remplacez les noms d’exemple et contrôlez les URL ainsi que les réglages d’affichage. Ce fichier initial n’est pas une configuration complète d’installation adaptée automatiquement à chaque site.",
    },
    {
      q: "Les icônes sont-elles masquables?",
      a: "Le manifeste utilise la valeur générale any. Une icône masquable demande un dessin adapté à une zone de sécurité précise; cette propriété n’est pas garantie par le générateur.",
    },
    {
      q: "Le téléchargement met-il mon site à jour?",
      a: "Non. Intégrez les fichiers au projet, ajoutez les liens et passez par la publication du responsable. Testez ensuite les fichiers servis et leur présentation sur appareil.",
    },
  ],
  service: { label: "Discuter de votre site Web avec 3D3D", path: "/software-development" },
  sources: [
    {
      label: "MDN: chemins, tailles et usages des icônes du manifeste",
      url: "https://developer.mozilla.org/en-US/docs/Web/Progressive_web_apps/Manifest/Reference/icons",
    },
  ],
} satisfies ToolGuide;
