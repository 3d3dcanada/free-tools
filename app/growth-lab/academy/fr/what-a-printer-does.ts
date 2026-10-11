import { frenchLesson } from "./lesson";
import type { ReadingSection } from "../types";
const content = frenchLesson(1, {
  summary:
    "Une imprimante à filament dépose du plastique ramolli en suivant des trajets superposés. Le modèle décrit la forme; le trancheur prépare les instructions; la pièce refroidie doit encore être contrôlée. Cette leçon gratuite distingue ces étapes avec un petit bloc. Vos réponses restent sur votre appareil, sans téléversement de fichiers.",
  learn: "Distinguer le modèle, le trancheur, l’imprimante et la pièce réellement obtenue.",
  steps: [
    "Machine arrêtée, repérez dans le manuel la bobine, l’entraînement, la tête chauffante, la buse et le plateau. L’entraînement pousse le filament; la tête chauffante le ramollit.",
    "Dessinez le parcours d’un travail : modèle, aperçu tranché, instructions, pièce imprimée et contrôle. Enregistrer une forme ne suffit pas pour préparer une impression.",
    "Observez une pièce sous un éclairage latéral. Repérez les lignes superposées et distinguez-les d’une fissure ou d’une zone où il manque de la matière.",
    "Laissez l’impression en résine hors de cet exercice. Elle utilise un autre procédé et exige une formation ainsi que des moyens de protection adaptés.",
  ],
  mistakes: [
    "Croire qu’un modèle téléchargé est déjà prêt pour n’importe quelle imprimante.",
    "Prendre le message de fin du travail pour un contrôle de qualité.",
  ],
  practice: {
    task: "Préparez un bloc simple de 20 × 20 × 10 mm avec une primitive du trancheur. Imprimez-le après la leçon 10, puis repérez ses couches.",
    record: "Un schéma légendé du parcours et une photo ou une note décrivant les couches de la pièce.",
  },
  quiz: [
    [
      "Quel logiciel prépare les instructions de l’imprimante ?",
      "Le trancheur",
      "La bobine",
      "Une photographie",
      "Le trancheur transforme la forme et les réglages en trajets à exécuter.",
    ],
    [
      "Que déplace le mécanisme d’entraînement ?",
      "Le filament",
      "Le bureau",
      "Une pièce terminée",
      "Il alimente la tête chauffante en filament.",
    ],
    [
      "Le modèle est téléchargé. Quelle est la prochaine étape ?",
      "Le préparer et examiner l’aperçu",
      "Chauffer immédiatement une machine quelconque",
      "Le déclarer contrôlé",
      "Il faut préparer la forme avec un profil correspondant au matériel utilisé.",
    ],
    [
      "Comment se construit la hauteur d’une pièce FFF ?",
      "Par des couches successives",
      "Par un seul moulage",
      "Par une image d’encre plane",
      "Le procédé dépose une couche après l’autre.",
    ],
    [
      "Ce cours vous qualifie-t-il pour manipuler de la résine ?",
      "Non, une formation distincte est nécessaire",
      "Oui, tous les plastiques sont identiques",
      "Seulement sans gants",
      "La résine relève d’un autre procédé et d’autres moyens de maîtrise.",
    ],
  ],
});
const reading: ReadingSection[] = [
  {
    title: "Suivre la matière et les informations",
    sources: ["safety", "slicer"],
    paragraphs: [
      "Imaginez une petite cale posée sur un bureau. Le modèle indique où doivent se trouver ses surfaces, mais il ne précise ni le prochain mouvement d’un moteur ni la quantité de filament à pousser. Le trancheur interprète cette forme avec les profils de l’imprimante, du matériau et de l’impression. Il prépare une suite de déplacements et de commandes. La machine les exécute en déposant de la matière. Après refroidissement, vous obtenez un objet physique qui possède ses propres dimensions et peut présenter des défauts. Gardez ces étapes distinctes lorsque vous décrivez un problème.",
      "Deux fonctions doivent se coordonner : le déplacement et l’apport de matière. Selon la machine, le plateau, la tête ou les deux se déplacent. Ce qui compte est la position de la buse par rapport à la surface de construction. Ne déduisez pas l’organisation des axes d’une photo d’un autre modèle. Consultez le schéma de votre manuel, machine arrêtée, puis suivez sur papier le trajet de la bobine jusqu’à la tête chauffante. Vous pourrez ensuite distinguer plus clairement une interruption d’alimentation d’un déplacement latéral anormal.",
    ],
  },
  {
    title: "Distinguer volume du modèle et plastique utilisé",
    sources: ["slicer", "layers", "infill"],
    paragraphs: [
      "La cale peut sembler entièrement pleine dans la fenêtre de modélisation alors que le trancheur prévoit un intérieur peu dense. Les parois, les couches pleines du dessus et du dessous, et les trajets internes n’ont pas tous le même rôle. Leur disposition dépend des réglages actifs. Le volume enfermé par la forme n’est donc pas automatiquement le volume de plastique consommé. Des supports, une bordure ou une purge peuvent aussi ajouter de la matière en dehors de la pièce finale. Les exercices de coût sépareront volume géométrique, consommation prévue et consommation constatée.",
      "Un bloc de 20 sur 20 sur 10 millimètres enferme 4 000 millimètres cubes, soit 4 centimètres cubes. Ce calcul porte sur les dimensions prévues, pas sur une mesure de la pièce imprimée. Avec une hauteur constante de 0,20 millimètre, une hauteur de 10 millimètres correspond à 50 intervalles nominaux. Une première couche différente ou des couches variables modifient ce raisonnement simplifié. Utilisez l’exemple pour comprendre l’empilement, puis consultez le nombre de couches de votre propre aperçu. Le nombre 50 n’est pas une exigence à imposer au résultat.",
    ],
  },
  {
    title: "Chercher la preuve à la bonne étape",
    sources: ["first", "design"],
    paragraphs: [
      "Si un trou manque, cherchez d’abord à quel moment il a disparu. S’il manque déjà dans le modèle, changer la vitesse de la machine ne le rétablira pas. S’il existe dans le modèle mais pas dans les trajets, examinez la géométrie et le tranchage. S’il apparaît dans les trajets mais pas sur la pièce, recherchez une cause liée à la fabrication. Conservez une vue du modèle, une vue correspondante de l’aperçu et une photo du résultat. Les trois observations doivent montrer le même détail pour permettre une comparaison utile.",
      "Le message de fin indique que la séquence d’instructions est terminée. Il ne mesure pas un trou, ne contrôle pas la liaison entre les couches et ne décide pas si un objet peut porter une charge. Même une cale d’aspect régulier peut être trop large pour son emplacement. Commencez par un contrôle modeste : laissez refroidir selon les consignes, regardez le dessous et les parois, puis comparez une dimension à la valeur prévue. Écrivez une observation concrète, comme un espace visible ou une largeur mesurée, plutôt qu’un simple jugement tel que parfait.",
    ],
  },
  {
    title: "Préparer un premier exercice facile à expliquer",
    sources: ["safety", "first"],
    paragraphs: [
      "Le cours commence par un bloc parce que sa fonction pédagogique est claire. Vous pouvez identifier sa base, comparer ses arêtes et observer ses lignes de couche sans devoir comprendre un modèle complexe. Dessinez les étapes dans un carnet : forme, tranchage, aperçu, impression et contrôle. Sous chaque étape, indiquez la preuve que vous conserverez. Le projet appartient à la préparation; la pièce et la mesure appartiennent au contrôle. Si une étape n’a pas encore été réalisée, laissez son résultat vide. Une valeur d’exemple ne doit jamais être présentée comme votre observation.",
      "N’allumez pas l’imprimante uniquement pour terminer cette première leçon. Les vérifications de l’espace, du fichier et du profil viennent avant l’essai supervisé de la leçon 10. Une machine empruntée exige également l’accord de son responsable et ses propres consignes. La progression du cours reste dans votre navigateur, mais vos fichiers de travail et mesures demandent un dossier séparé. Pour le moment, réussir signifie pouvoir expliquer quelles informations passent d’une étape à la suivante et ce qui reste à vérifier avant de transformer le bloc prévu en un échantillon physique utile.",
    ],
  },
];
export default { lesson: content, reading };
