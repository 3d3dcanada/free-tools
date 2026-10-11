import type { ToolGuide } from "../guide";
export default {
  slug: "model-viewer",
  locale: "fr",
  title: "Visionneuse STL, OBJ et 3MF gratuite | 3D3D",
  description:
    "Examinez un modèle 3D localement: dimensions, triangles, défauts de maillage et encombrement. Téléchargez les mesures sans téléverser le fichier.",
  name: "Visionneuse STL, OBJ et 3MF",
  headline: "Comprendre la géométrie avant d’imprimer.",
  summary: "Vérifiez l’échelle du maillage et conservez un rapport de mesures.",
  answer:
    "Visualisez gratuitement des géométries STL, OBJ et 3MF prises en charge sans téléverser le modèle. Examinez dimensions, triangles, surface et avertissements, puis comparez l’encombrement au volume d’une imprimante. Le volume n’est fourni que pour une coque fermée unique appropriée. Ces contrôles préparent le travail sans certifier l’imprimabilité, la résistance ou l’absence de collisions.",
  steps: [
    "Ouvrez un modèle dans les limites affichées ou essayez le cube d’exemple. Vérifiez l’unité des STL et OBJ. Pour un 3MF pris en charge, unités et transformations de fabrication sont lues dans le fichier, sans être devinées à partir du nom.",
    "Comparez les trois dimensions à une cote connue ou à la taille générale attendue. Faites tourner la vue pour comprendre la forme. Ce mouvement de caméra ne change pas l’orientation physique utilisée pour le calcul d’encombrement.",
    "Lisez les avertissements et le statut du volume. Choisissez une imprimante proposée ou indiquez votre volume personnalisé et la marge de bord. Examinez la position actuelle et les alternatives alignées sur les axes avant de passer au trancheur.",
    "Téléchargez le rapport de mesures ou une image de la vue. Conservez le modèle source et vérifiez échelle, orientation, supports et géométrie dans le véritable trancheur. Utilisez le lien de devis pour demander une évaluation de fabrication à 3D3D.",
  ],
  sections: [
    {
      heading: "Confirmer l’échelle avant les calculs",
      paragraphs: [
        "Une forme peut sembler plausible à presque toutes les tailles, car la caméra la cadre automatiquement. Dans ce parcours, les géométries STL et OBJ ne fournissent pas une unité physique sans ambiguïté. Choisissez l’unité attendue et comparez une dimension connue. Un modèle conçu en pouces et interprété en millimètres devient trop petit, même si les proportions et le nombre de triangles paraissent corrects.",
        "Longueur, surface et volume ne suivent pas la même variation d’échelle. Multiplier une longueur par 25,4 multiplie la surface par son carré et le volume par son cube. Une mauvaise unité peut ainsi fausser fortement l’estimation de matière. Réglez l’échelle avant d’utiliser les valeurs dérivées. Ne compensez pas une masse invraisemblable en modifiant la densité tout en laissant les dimensions du modèle non vérifiées.",
      ],
    },
    {
      heading: "Interpréter les avertissements du maillage",
      paragraphs: [
        "L’analyse vérifie la connexion des triangles, l’usage des arêtes, la cohérence d’orientation et les relations entre sommets dans sa tolérance numérique déclarée. Une arête ouverte ou une connexion non-manifold indique un point à examiner. Un résultat fermé ne prouve toutefois pas l’absence d’auto-intersections, de corps superposés, de parois minces ou de zones fragiles. Une forme visuellement lisse peut encore demander une réparation ou une nouvelle conception.",
        "Le volume n’est pas fourni pour un maillage ouvert ou inadapté, ni pour plusieurs coques dont l’emboîtement ou le chevauchement rendrait la somme ambiguë. Une valeur indisponible n’est pas zéro. Exportez un solide unique propre pour une estimation fondée sur le volume et contrôlez-le dans votre conception ou votre trancheur. La visionneuse ne réalise pas d’union booléenne et ne reconstruit pas silencieusement les surfaces manquantes.",
      ],
    },
    {
      heading: "Utiliser la comparaison imprimante comme premier filtre",
      paragraphs: [
        "Le contrôle compare les dimensions englobantes au volume choisi, en retirant la marge indiquée sur les axes horizontaux. Il essaie aussi les six permutations alignées sur les axes. Il ne cherche pas toutes les positions diagonales et n’organise pas plusieurs modèles sur le plateau. Bordures, supports, dégagement de tête et zones exclues peuvent demander davantage de place. Confirmez la disposition réelle avec le bon profil de trancheur.",
        "L’outil affiche la géométrie, pas un projet complet de tranchage. Peinture, textures, affectations de matière et extensions 3MF spécialisées peuvent manquer; les fonctions obligatoires non prises en charge sont refusées. Les limites de 20 Mo et 150 000 triangles bornent le travail du navigateur. Simplifiez une copie lorsque nécessaire et gardez le maître détaillé. Une importation réussie ne valide pas physiquement la pièce imprimée.",
      ],
    },
  ],
  comparison: [
    {
      name: "Online 3D Viewer",
      detail: "Visionneuse ouverte avec davantage de formats.",
      url: "https://github.com/kovacsv/Online3DViewer",
    },
  ],
  faqs: [
    {
      q: "Le modèle quitte-t-il mon appareil?",
      a: "Non. Importation, mesures et rendu restent locaux. Le code statique de la visionneuse se charge au besoin sans envoyer la géométrie à un serveur.",
    },
    {
      q: "Pourquoi les dimensions sont-elles incorrectes?",
      a: "Comparez l’unité STL ou OBJ à une cote connue. Le cadrage automatique de la caméra ne permet pas de confirmer l’échelle physique.",
    },
    {
      q: "Pourquoi le volume est-il indisponible?",
      a: "Le maillage peut être ouvert, inadapté ou composé de plusieurs coques. L’outil évite d’afficher un résultat ambigu comme un volume fiable ou comme zéro.",
    },
    {
      q: "Un maillage fermé garantit-il une bonne impression?",
      a: "Non. Auto-intersections, résistance, supports, parois et comportement de la machine demandent d’autres vérifications. Le rapport ne certifie pas l’imprimabilité.",
    },
    {
      q: "Tourner la vue teste-t-il une autre orientation?",
      a: "Non. L’orbite change seulement la caméra. Le calcul utilise l’encombrement mesuré et six positions alignées sur les axes, sans rotation arbitraire.",
    },
    {
      q: "Puis-je conserver les mesures?",
      a: "Téléchargez le rapport JSON avec dimensions et avertissements, et éventuellement une vue PNG. Gardez la source et identifiez sa version avec le rapport.",
    },
  ],
  service: { label: "Demander un devis de pièce à 3D3D", path: "/quote" },
  sources: [{ label: "Consortium 3MF: spécification du format", url: "https://3mf.io/spec/" }],
} satisfies ToolGuide;
