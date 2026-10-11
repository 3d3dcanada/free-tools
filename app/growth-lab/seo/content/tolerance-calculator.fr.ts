import type { ToolGuide } from "../guide";
export default {
  slug: "tolerance-calculator",
  locale: "fr",
  title: "Calculateur de jeu et d’ajustement FDM | 3D3D",
  description:
    "Préparez un essai arbre-alésage avec jeu diamétral signé et incertitude par pièce. Comparez les limites défavorables et gardez un rapport local gratuit.",
  name: "Calculateur d’ajustement FDM",
  headline: "Prévoir le jeu des pièces réellement imprimées.",
  summary: "Comparez l’ajustement nominal et un intervalle simple de jeu possible.",
  answer:
    "Préparez gratuitement un essai d’ajustement FDM sans téléverser de données. Indiquez diamètre d’arbre, jeu diamétral signé et incertitude par pièce pour calculer l’alésage nominal et l’intervalle possible. Les choix serré, glissant et libre sont des exemples, pas des normes. Imprimez et mesurez une paire d’essai dans la matière et l’orientation prévues.",
  steps: [
    "Saisissez le diamètre nominal de l’arbre en millimètres. Choisissez un exemple ou indiquez votre jeu diamétral signé. Une valeur positive agrandit l’alésage par rapport à l’arbre; une valeur négative crée un serrage nominal.",
    "Indiquez une incertitude dimensionnelle réaliste pour chaque pièce, fondée sur des mesures avec la machine, la matière et l’orientation prévues. Le modèle simplifié applique la même valeur aux deux diamètres, sans la déduire de la marque de l’imprimante.",
    "Examinez l’alésage nominal, le jeu radial et les limites minimale et maximale. Si l’intervalle traverse zéro, le même dessin nominal peut produire un jeu ou un serrage dans les bornes saisies. Ce n’est donc pas un coulissement garanti.",
    "Imprimez une petite paire reproduisant la longueur d’engagement et l’orientation utiles. Mesurez, assemblez et notez le résultat avant d’ajuster le dessin. Gardez le rapport avec les conditions d’essai avant de lancer une grande pièce.",
  ],
  sections: [
    {
      heading: "Distinguer jeu diamétral et jeu radial",
      paragraphs: [
        "Le jeu diamétral est le diamètre de l’alésage moins celui de l’arbre. Pour un arbre de 10 millimètres et un jeu de 0,2 millimètre, l’alésage nominal vaut 10,2 millimètres. Le jeu radial idéal, avec les pièces centrées, vaut la moitié, soit 0,1 millimètre. Confondre les deux peut doubler l’espace voulu. Précisez toujours le type de cote dans un dessin ou une note transmis à une autre personne.",
        "Un jeu négatif représente un serrage dans la géométrie nominale. L’exemple serré utilise moins 0,05 millimètre, soit un alésage de 9,95 pour un arbre de 10. Il ne prédit ni l’effort d’insertion ni la retenue ni le risque de fissurer une paroi. Matière, forme, sens des couches, état de surface et montage restent déterminants. Utilisez l’exemple comme départ d’essai, sans en faire une instruction universelle.",
      ],
    },
    {
      heading: "Interpréter honnêtement l’intervalle",
      paragraphs: [
        "Le calcul suppose que chaque diamètre peut varier de l’incertitude indiquée dans les deux sens. Le jeu défavorable va donc du nominal moins deux fois cette valeur au nominal plus deux fois cette valeur. Avec 0,2 millimètre de jeu et 0,1 d’incertitude par pièce, l’intervalle va de zéro à 0,4. Une limite à zéro ne promet pas un mouvement fluide sur des surfaces imprimées réelles.",
        "Ce modèle fournit des bornes dimensionnelles, pas une distribution de probabilités. Il ne dit pas combien de fois un extrême se produira. Choisissez l’incertitude à partir de mesures pertinentes, sans la réduire pour obtenir un résultat rassurant. Si une seule pièce est imprimée ou si arbre et alésage varient très différemment, utilisez une analyse adaptée à l’assemblage réel plutôt que de considérer cette approximation symétrique comme suffisante.",
      ],
    },
    {
      heading: "Tester la fonction d’assemblage",
      paragraphs: [
        "Une éprouvette utile reproduit la géométrie de contact, la longueur d’engagement et l’orientation qui influencent l’ajustement. Un petit téton peut entrer alors qu’un arbre long coince; un trou imprimé dans un autre sens peut se comporter autrement. Mesurez plusieurs éléments pertinents et notez matière, profil et finition. Évitez de changer plusieurs réglages à la fois si vous voulez comprendre ce qui améliore le résultat.",
        "Le calculateur ne modélise ni filetages, ni clips, ni dilatation thermique, ni déformation élastique, ni retenue critique pour la sécurité. Il ne certifie pas non plus la précision d’une machine. Gardez l’essai physique avec le rapport numérique et identifiez la version de pièce utilisée. Pour une fabrication 3D3D, décrivez la pièce partenaire et la fonction dans la demande de devis afin d’examiner le montage dans son contexte réel.",
      ],
    },
  ],
  comparison: [
    {
      name: "Conseils de conception Prusa",
      detail: "Abordent les jeux et les essais d’assemblage imprimé.",
      url: "https://help.prusa3d.com/article/modeling-with-3d-printing-in-mind_164135",
    },
  ],
  faqs: [
    {
      q: "Le jeu saisi concerne-t-il le diamètre ou le rayon?",
      a: "Le diamètre: alésage moins arbre. Le jeu radial affiché vaut la moitié de cette différence pour une paire idéale centrée.",
    },
    {
      q: "Les exemples serré et glissant sont-ils normalisés?",
      a: "Non. Ce sont des départs d’essai. Machine, matière, orientation et géométrie peuvent demander d’autres valeurs à valider physiquement.",
    },
    {
      q: "Pourquoi doubler l’incertitude?",
      a: "Dans le cas défavorable simplifié, l’alésage rétrécit pendant que l’arbre grandit, ou l’inverse. Les deux diamètres contribuent à la plage de jeu.",
    },
    {
      q: "Que signifie un intervalle qui traverse zéro?",
      a: "Les bornes saisies permettent soit du jeu, soit du serrage. Le comportement reste incertain: ce n’est pas la garantie d’un assemblage glissant ou serré.",
    },
    {
      q: "L’effort d’insertion est-il calculé?",
      a: "Non. Seuls les diamètres sont comparés. Les efforts et la retenue dépendent d’autres propriétés géométriques et matérielles absentes de ce modèle.",
    },
    {
      q: "Puis-je éviter l’essai si les nombres conviennent?",
      a: "Le calcul ne remplace pas une éprouvette. Imprimez, mesurez et assemblez une paire représentative avant de retenir le jeu pour une pièce importante ou volumineuse.",
    },
  ],
  service: { label: "Discuter d’une pièce d’assemblage avec 3D3D", path: "/quote" },
} satisfies ToolGuide;
