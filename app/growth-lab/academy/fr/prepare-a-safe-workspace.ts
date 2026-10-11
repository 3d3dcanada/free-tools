import { frenchLesson } from "./lesson";
import type { ReadingSection } from "../types";
const content = frenchLesson(3, {
  summary:
    "Préparez l’atelier en repérant chaleur, mouvements et émissions, puis en suivant les consignes exactes de la machine et du matériau. Gardez l’arrêt accessible et prévoyez la maîtrise à la source avant d’imprimer. Cette leçon gratuite organise la préparation sans proposer de ventilation universelle. Vos réponses restent locales; aucun fichier n’est téléversé.",
  learn: "Identifier les dispositions nécessaires avant un essai supervisé.",
  steps: [
    "Lisez le manuel et la fiche de données de sécurité du filament. Repérez les surfaces chaudes, la zone mobile, les exigences électriques et la procédure d’arrêt.",
    "Utilisez la surface stable et les dégagements prescrits. Maintenez objets libres, enfants et animaux hors de la zone de fonctionnement.",
    "Prévoyez une maîtrise des émissions adaptée au matériau et au local. Une enceinte ventilée ou une captation locale peut intervenir à la source; une boîte fermée ne prouve pas son efficacité.",
    "Dégagez l’accès à l’arrêt et connaissez les consignes d’urgence du lieu. En cas de dommage, d’odeur électrique anormale ou de comportement imprévisible, cessez l’utilisation et demandez une aide qualifiée.",
  ],
  mistakes: [
    "Confondre absence d’odeur perceptible et absence d’émissions.",
    "Introduire la main dans une machine en mouvement pour sauver une impression.",
  ],
  practice: {
    task: "Préparez l’espace pour le bloc de la première leçon. N’imprimez qu’après résolution des points de préparation et des conditions de supervision de la leçon 10.",
    record:
      "Le lieu choisi, le dispositif prévu pour les émissions et la procédure d’arrêt, avec les questions non résolues.",
  },
  quiz: [
    [
      "Que prouve une faible odeur ?",
      "Rien sur le niveau d’exposition",
      "L’absence de particules",
      "Une ventilation parfaite",
      "L’odorat ne mesure pas l’exposition.",
    ],
    [
      "Une pièce détachée suit la buse. Que faire d’abord ?",
      "Appliquer la procédure d’arrêt",
      "La saisir pendant le mouvement",
      "Tenir la buse chaude",
      "Arrêtez le procédé avant de vous approcher des éléments chauds ou mobiles.",
    ],
    [
      "Quel document décrit les dangers d’un filament ?",
      "Sa fiche de données de sécurité",
      "Sa publicité",
      "Son nuancier",
      "La fiche fait partie des informations nécessaires à la préparation.",
    ],
    [
      "Toute enceinte maîtrise-t-elle les émissions ?",
      "Non, le dispositif doit être adapté",
      "Oui, si elle est opaque",
      "Oui, si elle est chaude",
      "Une boîte seule n’établit pas la performance de ventilation ou de filtration.",
    ],
    [
      "Quel élément doit rester accessible ?",
      "La commande d’arrêt",
      "Un habillage décoratif",
      "Seulement l’étiquette de bobine",
      "Il faut pouvoir arrêter la machine sans obstacle.",
    ],
  ],
});
const reading: ReadingSection[] = [
  {
    title: "Préparer les gestes avant la mise en marche",
    sources: ["safety", "bates"],
    paragraphs: [
      "Décrivez le chargement, le lancement du travail, l’observation, l’arrêt d’un échec et le retrait après refroidissement. Ces activités demandent des espaces différents et peuvent exposer à des dangers différents. Sur un plan simple, repérez la zone de mouvement et les surfaces chaudes, le passage vers la commande d’arrêt et l’endroit où poser un plateau retiré. Ce dessin prépare la réflexion; il ne certifie pas l’installation. Le manuel exact et les règles applicables à la maison, à l’école ou dans l’atelier restent les points de départ de la préparation.",
      "Regardez au-delà de l’empreinte de la machine. Des emballages peuvent gêner un mouvement, des bobines bloquer un accès et un câble créer un risque de chute ou de détérioration. Vérifiez le support, l’alimentation et les dégagements prescrits sans improviser une modification. Tenez les personnes non concernées hors de la zone. Déterminez qui peut démarrer ou arrêter l’équipement et qui peut aider en cas d’anomalie. Dans un atelier partagé, la réponse doit être comprise collectivement : une consigne connue d’une seule personne perd son utilité quand cette personne est absente.",
    ],
  },
  {
    title: "Poser les bonnes questions sur les émissions",
    sources: ["safety", "enclosure"],
    paragraphs: [
      "Le NIOSH décrit des particules et des substances chimiques pouvant être libérées lors de l’impression à filament. Leur nature et leur quantité dépendent notamment du matériel, du matériau et du procédé. Une odeur agréable ou imperceptible n’est donc pas une mesure d’exposition. Examinez d’abord si un procédé ou un matériau adapté peut réduire le problème, puis les moyens techniques tels que la captation à la source. Ventilation générale et enceinte ventilée ne sont pas des expressions interchangeables. Demandez où vont les émissions et comment le dispositif proposé les capte dans les conditions réelles.",
      "Une enceinte fermée destinée à garder la pièce chaude ne garantit pas une maîtrise efficace des émissions. Un ventilateur, un filtre ou un conduit demande également une conception et un entretien adaptés. N’utilisez pas un débit tiré d’une seule étude comme recette pour toutes les pièces et toutes les machines. Lorsque l’installation nécessite une évaluation, faites intervenir une personne compétente en installations ou en prévention. Privilégiez les dispositions documentées et faites examiner les adaptations afin qu’une solution ne crée pas un nouveau problème thermique, électrique ou lié aux conditions d’utilisation de l’équipement.",
    ],
  },
  {
    title: "Prévoir une réponse réalisable",
    sources: ["safety"],
    paragraphs: [
      "Trouvez les procédures normales de pause, d’annulation et d’arrêt avant de commencer. Distinguez la commande qui termine le travail des situations qui exigent la réponse d’urgence du lieu. Gardez l’accès dégagé. Si une pièce se détache, ne tentez pas de la maintenir à la main dans le mécanisme mobile. Un travail interrompu coûte de la matière; une intervention pendant le mouvement peut ajouter une blessure et des dommages. Devant un câblage abîmé, une odeur de brûlé électrique ou une chauffe incontrôlée, cessez l’utilisation et demandez l’aide qualifiée appropriée.",
      "Une caméra permet parfois de voir un incident, mais elle ne supprime pas le danger et ne garantit pas une intervention. Déterminez la supervision selon le manuel et les règles locales, ainsi que la conduite à tenir si la personne responsable doit s’absenter. Une vue à distance ne remplace pas cette organisation. Gardez les coordonnées et consignes d’urgence accessibles dans le format habituel du lieu. La leçon ne décrit volontairement aucune intervention improvisée sur un incendie : suivez la procédure applicable et évitez de vous mettre en danger pour sauver une machine ou une pièce.",
    ],
  },
  {
    title: "Inclure refroidissement et nettoyage",
    sources: ["safety", "sheets"],
    paragraphs: [
      "L’arrêt du mouvement ne marque pas la fin de tous les risques. La buse, le plateau et la pièce peuvent rester chauds. Respectez la méthode de refroidissement et de retrait prescrite et prévoyez une surface stable pour manipuler l’échantillon refroidi. Les fragments de support et les outils coupants introduisent ensuite d’autres dangers. Choisissez les protections à partir de la tâche et des fiches pertinentes plutôt qu’en recopiant une liste universelle de gants ou de masques. Ces protections complètent les moyens de maîtrise; elles ne rendent pas acceptable un local ou un procédé inadapté.",
      "Complétez la fiche avec quatre éléments concrets : documents consultés, limites de la zone de fonctionnement, dispositif prévu pour les émissions et procédure d’arrêt ou d’escalade. Placez les questions ouvertes dans une colonne distincte. Si la ventilation n’est pas définie, écrivez-le et reportez l’essai physique. Les exercices de modèle et de tranchage peuvent continuer sans chauffer une machine. Une conclusion utile peut être de ne pas commencer encore. La case de pratique doit correspondre à votre préparation réelle et à votre propre relevé, pas à une approbation automatique de l’installation.",
    ],
  },
];
export default { lesson: content, reading };
