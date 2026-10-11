import { frenchLesson } from "./lesson";
import type { ReadingSection } from "../types";
const content = frenchLesson(24, {
  summary:
    "Définissez l’ajustement souhaité, choisissez un jeu d’essai puis mesurez une paire représentative. Le jeu total diffère de celui de chaque côté, et la variation de fabrication peut réduire la réserve prévue. Cette leçon gratuite propose un exemple chiffré et des éprouvettes. Aucun fichier n’est téléversé; vos réponses restent sur votre appareil.",
  learn: "Vérifier un petit assemblage avant d’engager toute la fabrication.",
  steps: [
    "Choisissez le comportement recherché : glissement, positionnement avec jeu ou liaison retenue. Ces fonctions ne demandent pas nécessairement la même valeur.",
    "En CAO, isolez une petite section des formes assemblées. Ajoutez dimensions et repères pour identifier les variantes après impression.",
    "Préparez plusieurs jeux en gardant imprimante, orientation et matériau identiques. Les valeurs choisies sont des entrées d’essai, pas une tolérance garantie.",
    "Après refroidissement, mesurez et assemblez doucement. Notez le résultat et une éventuelle surépaisseur de première couche, puis réessayez le candidat dans la conception finale.",
  ],
  mistakes: [
    "Forcer l’assemblage puis déclarer le jeu correct.",
    "Redimensionner tout un ensemble pour corriger un seul trou serré.",
  ],
  practice: {
    task: "Créez un tenon carré nominal de 10 mm et trois petits logements de largeur intérieure 10,2, 10,4 et 10,6 mm. Imprimez et identifiez les variantes : ces valeurs sont pédagogiques, pas universelles.",
    record: "Dimensions mesurées, comportement d’assemblage et variante qui mérite un nouvel essai.",
  },
  quiz: [
    [
      "Qu’est-ce qui détermine un jeu utile ?",
      "La fonction et le procédé",
      "La seule couleur",
      "Une valeur universelle",
      "Géométrie, matériau et fabrication influencent l’assemblage.",
    ],
    [
      "Pourquoi imprimer une courte section ?",
      "Pour apprendre avant une grande pièce",
      "Pour éviter toute mesure",
      "Pour garantir tous les assemblages",
      "Une petite éprouvette réduit le coût d’une hypothèse erronée.",
    ],
    [
      "Que garder identique entre variantes ?",
      "Matériau et orientation",
      "Seulement le nom",
      "Rien",
      "Conservez les autres variables pendant l’étude du jeu.",
    ],
    [
      "Une pièce serre. Faut-il redimensionner aveuglément tout l’ensemble ?",
      "Non",
      "Toujours",
      "Seulement vers le haut",
      "Un défaut local demande une investigation ciblée.",
    ],
    [
      "Que représentent les valeurs d’exemple ?",
      "Des entrées expérimentales",
      "La précision garantie de l’imprimante",
      "Une norme pour tout matériau",
      "Le résultat de chaque ajustement doit être observé.",
    ],
  ],
});
const reading: ReadingSection[] = [
  {
    title: "Décrire mouvement et retenue",
    sources: ["design"],
    paragraphs: [
      "L’ajustement décrit un comportement entre pièces, pas seulement deux cotes nominales. Déterminez si elles doivent glisser librement, se positionner avec un peu de jeu ou rester retenues après assemblage. Précisez aussi le démontage et les prises accessibles. Une liaison qui exige une force incontrôlée peut être inadaptée même si elle finit par entrer. Écrivez la fonction avant de choisir le jeu. L’essai devient alors une décision liée au projet, plutôt que la recherche d’une tolérance prétendument parfaite pour chaque machine et chaque application.",
      "Distinguez jeu total et jeu de chaque côté. Un tenon carré de 10,0 mm centré dans une ouverture de 10,4 mm donne une différence nominale totale de 0,4 mm, soit 0,2 mm par côté. Ce sont des dimensions de dessin, pas des mesures imprimées. De même, une différence de diamètres ne représente pas directement le jeu radial. Identifiez la grandeur utilisée par le croquis ou le calculateur. Cette comptabilité simple évite de doubler ou diviser involontairement une réserve en passant du dessin à la CAO puis au tableau d’essai.",
    ],
  },
  {
    title: "Imprimer une section représentative",
    sources: ["design", "firstlayer"],
    paragraphs: [
      "Au lieu de fabriquer tout le boîtier et son couvercle, isolez la zone d’accouplement. Conservez l’épaisseur importante, les angles, l’orientation et le matériau afin que l’éprouvette ressemble à la construction réelle. Ajoutez des repères. Les logements de 10,2, 10,4 et 10,6 mm créent une comparaison autour du tenon fixe. Ils ne constituent pas des jeux recommandés pour tout usage. Garder le tenon nominal inchangé rend la variable évidente et permet de relier chaque résultat à la largeur d’ouverture réellement prévue dans le dessin.",
      "L’éprouvette courte peut malgré tout manquer une difficulté du produit final. Une longue glissière possède davantage de longueur de contact, une paroi souple se déforme et une grande pièce peut se voiler différemment. Utilisez le petit essai pour choisir un candidat, puis vérifiez-le dans la vraie conception. Ne présentez pas le premier logement qui entre comme une tolérance de production. Relevez orientation et faces posées sur le plateau : les effets de première couche peuvent modifier l’endroit où les deux pièces se touchent pendant l’assemblage.",
    ],
  },
  {
    title: "Mesurer sans forcer la réponse",
    sources: ["design", "flow", "firstlayer"],
    paragraphs: [
      "Laissez refroidir selon les consignes. Mesurez tenon et ouverture avec une méthode adaptée et séparez les lectures des dimensions de CAO. Cherchez bord épaissi de première couche, contact de support rugueux ou débris avant de juger tout l’ajustement. Assemblez doucement dans le sens prévu. Arrêtez si la pièce craque, se déforme fortement ou exige une position d’outil dangereuse. Une liaison obtenue en endommageant un élément ne prouve pas que le jeu nominal convient à un montage répétable. Gardez l’observation de dommage au même titre que les mesures.",
      "La variation de fabrication peut toucher les deux éléments. Dans un exemple simplifié, un jeu total nominal de 0,40 mm et une variation de ±0,10 mm sur chaque dimension donnent un jeu possible de 0,20 à 0,60 mm. Les extrêmes associent petite ouverture et grand tenon, puis l’inverse. Ces variations sont des hypothèses pédagogiques, pas la précision mesurée de votre imprimante. Le calcul montre pourquoi une seule paire assemblée ne démontre pas le comportement de toutes les paires futures, même si leurs fichiers nominaux sont identiques.",
    ],
  },
  {
    title: "Relier les preuves à l’assemblage final",
    sources: ["design", "fasteners", "finish"],
    paragraphs: [
      "Pour chaque paire identifiée, notez dimensions, sensation d’assemblage, dommages et possibilité de démontage. Choisissez selon la fonction, pas simplement le plus petit espace que vous avez réussi à forcer. Répétez le candidat puis essayez-le dans la conception et la matière finales. Un traitement de finition ou un revêtement ultérieur doit également être pris en compte. Retirer ou ajouter de la matière peut changer le jeu même si l’impression provient du même profil sauvegardé. Conservez donc l’état de surface auquel chaque mesure et chaque essai se rapportent.",
      "Un emmanchement serré, une attache élastique ou une liaison chargée demande plus de conception que ce simple exercice de jeu. Déformation du matériau, répétition des assemblages et conséquences d’une rupture comptent. Limitez l’exercice aux échantillons de bureau accessibles et demandez une aide adaptée pour une connexion exigeante. Le résultat utile est une comparaison identifiée, un candidat et des limites claires. Le calculateur organise dimensions et variation supposée, sans découvrir l’incertitude réelle de l’imprimante ni certifier une retenue par le seul calcul. Les preuves physiques restent nécessaires.",
    ],
  },
];
export default { lesson: content, reading };
