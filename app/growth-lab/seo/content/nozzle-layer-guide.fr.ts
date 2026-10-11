import type { ToolGuide } from "../guide";
export default {
  slug: "nozzle-layer-guide",
  locale: "fr",
  title: "Guide du diamètre de buse et des couches | 3D3D",
  description:
    "Comparez hauteur de couche et diamètre de buse, avec exemples et limite générale de 80 %. Guide gratuit local et rapport téléchargeable.",
  name: "Guide buse et hauteur de couche",
  headline: "Choisir une hauteur avec un repère utile.",
  summary: "Comparez une hauteur envisagée au diamètre de buse et aux profils.",
  answer:
    "Comparez gratuitement diamètre de buse et hauteur de couche sans téléverser de données. Saisissez les deux valeurs pour voir leur rapport, trois exemples et la limite générale sous quatre-vingts pour cent du diamètre. Ce guide ne fournit pas un profil complet. Vérifiez imprimante et matière, examinez le tranchage et essayez le résultat réel.",
  steps: [
    "Confirmez la buse réellement installée et celle choisie dans le profil du trancheur. Saisissez son diamètre en millimètres. Ne supposez pas que le profil s’est adapté automatiquement après un remplacement physique de la buse.",
    "Indiquez la hauteur envisagée, puis lisez le rapport et la limite générale. Une valeur exactement égale à quatre-vingts pour cent ne passe pas le contrôle strictement inférieur. Choisissez un profil adapté plutôt que de viser la frontière.",
    "Comparez les exemples fin, équilibré et grossier, calculés à vingt-cinq, cinquante et soixante-quinze pour cent du diamètre. Ils illustrent des proportions, sans constituer des réglages certifiés pour toute machine, matière ou géométrie.",
    "Examinez le profil réel, son aperçu et une petite impression représentative. Gardez à l’esprit largeur d’extrusion, première couche, vitesse et débit de matière. Téléchargez le rapport pour conserver les deux valeurs et la comparaison utilisée.",
  ],
  sections: [
    {
      heading: "Utiliser le rapport comme contrôle, pas comme recette",
      paragraphs: [
        "Prusa recommande une hauteur inférieure à quatre-vingts pour cent du diamètre de buse. Avec une buse de 0,4 millimètre, l’outil montre une limite de 0,32 et des exemples de couches de 0,10, 0,20 et 0,30 millimètre. Ce calcul simple ne règle pas le reste de l’imprimante. Partez du profil adapté du fabricant et utilisez la comparaison pour mieux comprendre ses choix.",
        "La hauteur décrit le pas vertical entre les couches déposées. Le diamètre décrit l’ouverture de la buse. Ces valeurs sont liées, sans se confondre avec la largeur d’extrusion ou garantir la plus petite forme imprimable. Une couche plus fine peut modifier l’aspect d’une pente sans résoudre chaque détail horizontal. Déterminez la surface ou la fonction que vous souhaitez améliorer avant de modifier un réglage.",
      ],
    },
    {
      heading: "Comparer une fonction utile et le temps prévu",
      paragraphs: [
        "Choisissez un essai qui contient la pente, la courbe, le texte ou la surface d’assemblage importante pour la pièce finale. Une forme générique ne révèle pas forcément l’effet recherché. Comparez les couches dans l’aperçu et la durée estimée de chaque profil, puis examinez les surfaces physiques. Gardez la même matière et des réglages cohérents pour éviter que plusieurs changements simultanés cachent l’origine de la différence.",
        "Davantage de couches peut demander plus de travail à la machine, mais la durée dépend aussi des trajectoires, des limites de vitesse et de la géométrie. Ce guide ne calcule pas le temps et ne promet pas un gain fixe avec une couche plus épaisse. Utilisez l’estimation du trancheur pour planifier et notez la durée réelle pour améliorer votre procédé. Un rapport numérique ne décide pas à lui seul si l’apparence finale convient.",
      ],
    },
    {
      heading: "Garder le reste du procédé cohérent",
      paragraphs: [
        "Changer de buse implique de revoir le profil, notamment la largeur d’extrusion et les limites de débit adaptées. Les paramètres de première couche peuvent différer des couches suivantes, et le plateau demande toujours sa préparation normale. N’utilisez pas une couche plus épaisse pour masquer un problème mécanique ou de surface non examiné. Le guide laisse ces choix aux références de la machine et du trancheur plutôt que d’inventer une combinaison universelle.",
        "Le résultat affiché ne prouve ni la résistance, ni la précision dimensionnelle, ni l’adhérence d’une pièce terminée. Ces qualités dépendent de plus de deux entrées. Gardez buse, matière, profil et observations avec le rapport téléchargé. Pour une pièce fournie par 3D3D, décrivez les exigences fonctionnelles et visuelles dans la demande de devis. Un numéro de hauteur de couche ne suffit pas à définir tout le travail de fabrication nécessaire.",
      ],
    },
  ],
  comparison: [
    {
      name: "Guide des couches Prusa",
      detail: "Explique les profils et la limite liée à la buse.",
      url: "https://help.prusa3d.com/article/layers-and-perimeters_1748",
    },
  ],
  faqs: [
    {
      q: "Quelle limite correspond à une buse de 0,4 mm?",
      a: "Quatre-vingts pour cent donne 0,32 mm; le contrôle demande de rester en dessous. Utilisez un profil approprié au lieu de prendre cette limite comme objectif.",
    },
    {
      q: "Les trois exemples sont-ils des profils garantis?",
      a: "Non. Ils sont calculés à partir du diamètre. Ils ne fixent ni température, ni vitesse, ni largeur, ni première couche, ni débit de matière.",
    },
    {
      q: "Hauteur et largeur d’extrusion sont-elles identiques?",
      a: "Non. La hauteur décrit le pas vertical. La largeur est un autre réglage du profil et le diamètre correspond à l’ouverture physique de la buse.",
    },
    {
      q: "Une couche fine rend-elle toujours la pièce plus solide?",
      a: "L’outil ne prédit pas la résistance. Matière, orientation, géométrie et procédé complet doivent être évalués pour la pièce réelle.",
    },
    {
      q: "Une couche épaisse garantit-elle un travail plus rapide?",
      a: "Le guide ne calcule pas la durée. Comparez estimations du trancheur et essais, car les trajectoires et d’autres limites influencent aussi le temps.",
    },
    {
      q: "La première couche doit-elle avoir la même hauteur?",
      a: "Suivez le profil et la documentation adaptés à l’imprimante. Cette comparaison ne configure pas et ne valide pas le comportement de la première couche.",
    },
  ],
  service: { label: "Discuter de la qualité d’impression avec 3D3D", path: "/quote" },
} satisfies ToolGuide;
