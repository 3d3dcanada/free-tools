import { frenchLesson } from "./lesson";
import type { ReadingSection } from "../types";
const content = frenchLesson(30, {
  summary:
    "Un décalage de couches produit une marche soudaine dans la position de la pièce. Arrêtez le travail, notez direction et hauteur, puis suivez l’inspection mécanique propre à votre imprimante. Cette leçon gratuite prépare un diagnostic documenté, sans collision volontaire. Aucun fichier n’est téléversé; vos observations et réponses restent localement sur votre appareil.",
  learn: "Décrire un déplacement brusque et demander de l’aide avec des preuves utiles.",
  steps: [
    "Arrêtez une impression décalée ou en collision. Relevez hauteur et direction de la première marche visible, avec les axes de la machine.",
    "Dans l’état d’inspection prescrit, cherchez un obstacle, un débris ou une pièce relevée pouvant avoir causé un choc. Ne forcez pas un axe.",
    "Suivez la procédure précise des courroies, poulies et mouvements. Ne devinez pas la tension et ne serrez pas toutes les fixations sans critère.",
    "Après résolution, restaurez le profil pris en charge et essayez une petite pièce. Si les décalages persistent, fournissez photos, projet et relevé des contrôles pour un diagnostic qualifié.",
  ],
  mistakes: [
    "Appeler toute surface ondulée un décalage de couche.",
    "Tendre excessivement une courroie sans la procédure de cette machine.",
  ],
  practice: {
    task: "Après les vérifications sûres, imprimez un cube de 20 × 20 × 20 mm. Inspectez les arêtes verticales pour une marche brusque. N’introduisez jamais un obstacle dans le mécanisme pour l’exercice.",
    record: "Croquis des axes et présence ou absence d’un déplacement soudain.",
  },
  quiz: [
    [
      "Qu’est-ce qui distingue un décalage d’une simple texture ?",
      "Une marche de position",
      "La couleur",
      "Le nombre de fichiers",
      "Les couches suivantes changent brusquement de place.",
    ],
    [
      "Que relever d’abord ?",
      "Direction et hauteur de départ",
      "Un couple inventé",
      "La vitesse maximale",
      "Le motif du défaut guide la recherche.",
    ],
    [
      "Faut-il tendre toutes les courroies au jugé ?",
      "Non",
      "Toujours",
      "À chaque impression",
      "La procédure spécifique détermine les contrôles.",
    ],
    [
      "Comment utiliser une collision volontaire dans l’exercice ?",
      "Ne pas en provoquer",
      "Bloquer un axe",
      "Ajouter un débris",
      "Il ne faut pas fabriquer une panne dommageable.",
    ],
    [
      "Que faire si une base sûre se décale encore ?",
      "Demander un diagnostic avec les preuves",
      "Ignorer le défaut",
      "Serrer toujours davantage",
      "Une panne persistante de mouvement exige une investigation adaptée.",
    ],
  ],
});
const reading: ReadingSection[] = [
  {
    title: "Reconnaître une marche de position",
    sources: ["shift", "viewer", "safety"],
    paragraphs: [
      "Un décalage apparaît lorsque la géométrie suivante change soudainement de position par rapport à la partie déjà construite. Une ondulation ou une vibration visible sur une paroi peut être disgracieuse sans correspondre au même événement. Repérez première marche nette, hauteur et direction. Utilisez la convention des axes de la machine, pas une supposition tirée de l’angle de caméra. Un croquis vu de dessus aide à relier pièce et imprimante. Arrêtez normalement un travail décalé ou en collision pour éviter que la buse continue à frapper l’objet.",
      "Notez les événements observés autour du défaut : choc, bruit inhabituel, objet libre ou autre changement. Gardez faits et explications séparés. Un bruit ne désigne pas une poulie précise, et une paroi déplacée ne prouve pas que toutes les courroies manquent de tension. Sauvegardez projet et profil, surtout après un changement de mouvement. Un rapport utile donne direction, couche ou hauteur approximative et configuration. Ces éléments orientent vers le mécanisme et les conditions concernés sans imposer une cause avant la vérification du matériel.",
    ],
  },
  {
    title: "Inspecter avant de régler la mécanique",
    sources: ["shift", "maintenance", "safety"],
    paragraphs: [
      "Placez l’imprimante dans l’état d’inspection sûr indiqué par son fabricant. Dans les limites des opérations autorisées, cherchez débris, matière détachée ou obstacle. Une pièce relevée ou décollée peut avoir participé à une collision. Ne forcez pas un axe à la main et n’intervenez pas pendant un mouvement pour reproduire le phénomène. Les systèmes mécaniques ont des restrictions différentes. Si un composant est endommagé ou si l’accès dépasse la procédure utilisateur, arrêtez et demandez une aide qualifiée au lieu d’explorer le mécanisme expérimentalement.",
      "Consultez la notice exacte des courroies, poulies et guidages. La tension n’est pas une valeur universelle et un excès peut créer une autre panne. N’appliquez pas une fréquence cible provenant d’un trajet de courroie différent. De même, une vis accessible n’est pas nécessairement une vis à resserrer. Respectez ordre, outil et critères du modèle et de sa révision. Notez ce qui a réellement été contrôlé ou ajusté. Ce relevé distingue une opération vérifiable d’une impression subjective selon laquelle la mécanique semble désormais meilleure.",
    ],
  },
  {
    title: "Revoir le profil sans effacer le symptôme",
    sources: ["shift", "warp", "supports", "viewer"],
    paragraphs: [
      "Confirmez que le profil de machine et les paramètres de mouvement correspondent à l’équipement. Un projet importé ou un essai de vitesse peut avoir remplacé la base prise en charge. Restaurez-la pour la reprise lorsque la procédure de dépannage le demande. Une impression lente réussie peut apporter une information, mais ne prouve pas qu’un composant desserré ou gêné soit réparé. Distinguez une demande réduite d’un défaut corrigé. Conservez l’échec original dans le dossier d’entretien au lieu de l’effacer dès qu’un nouveau réglage produit un objet acceptable.",
      "Inspectez aussi l’aperçu du travail échoué pour une géométrie ou un support pouvant contribuer à un choc. Un bord courbé ou un détail mal soutenu modifie la situation physique même si les trajets paraissent ordonnés. Reliez cette observation aux leçons de relevage et de supports si nécessaire. L’objectif est de considérer la chaîne entière, depuis forme et procédé jusqu’au mouvement. Évitez d’attribuer chaque décalage à un seul composant. Choisissez une vérification limitée et évitez plusieurs ajustements simultanés qui rendraient impossible l’interprétation du résultat suivant.",
    ],
  },
  {
    title: "Réessayer sans fabriquer un obstacle",
    sources: ["shift", "maintenance", "teaching"],
    paragraphs: [
      "Après l’action prescrite, imprimez le cube simple de 20 mm avec une base connue. Inspectez ses arêtes verticales et notez le résultat réel. Ne bloquez pas un axe et n’ajoutez pas de débris pour démontrer un décalage. Le schéma et le raisonnement suffisent à comprendre la panne. Si elle revient, conservez photos, croquis des axes, relevé d’entretien et fichiers pour le fabricant ou une personne expérimentée. Des échecs répétés sans explication demandent une meilleure investigation, pas une tension de courroie progressivement augmentée sans procédure.",
      "Terminez par ce qui a été observé, vérifié et résolu ou non lors de la reprise. Sans panne réelle, dites que vous avez inspecté une base saine et préparé le chemin de diagnostic. Si une réparation a été faite, nommez l’action documentée plutôt qu’une cause universelle. Le cours ne peut pas inspecter l’imprimante ni certifier son mouvement à distance. Il fournit une méthode de description précise et un chemin vers les contrôles propres à la machine, en gardant visibles les incertitudes qui demandent encore une vérification compétente.",
    ],
  },
];
export default { lesson: content, reading };
