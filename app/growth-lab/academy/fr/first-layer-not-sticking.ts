import { frenchLesson } from "./lesson";
import type { ReadingSection } from "../types";
const content = frenchLesson(26, {
  summary:
    "Une première couche qui ne tient pas demande de vérifier le plateau, le matériau et la procédure de réglage de votre imprimante. Observez le premier symptôme avant de changer un paramètre. Cette leçon gratuite propose un petit essai contrôlé. Aucun fichier n’est téléversé et votre carnet reste sur votre appareil, sans compte.",
  learn: "Choisir une vérification de première couche à partir de faits observés.",
  steps: [
    "Arrêtez normalement une impression détachée ou traînée. Attendez l’état d’accès sûr avant d’inspecter le plateau et les lignes échouées.",
    "Vérifiez ensemble le plateau installé, le matériau et le profil du trancheur. Relisez les consignes de préparation de cette surface précise.",
    "Distinguez fils arrondis détachés et bourrelets fortement raclés. Suivez la calibration propre à la machine; un réglage manuel en cours d’impression n’existe pas sur tous les modèles.",
    "Réessayez une petite tuile avec la base prise en charge. Si l’échec persiste, conservez photos et configuration pour le fabricant ou une personne expérimentée.",
  ],
  mistakes: [
    "Abaisser indéfiniment la buse sans comprendre la cause.",
    "Ajouter un adhésif sans vérifier si la combinaison adhère déjà trop fortement.",
  ],
  practice: {
    task: "Imprimez une tuile de 25 × 25 × 2 mm après la vérification ciblée. Arrêtez si l’adhérence échoue clairement. Ne provoquez jamais une collision de buse pour créer un exemple.",
    record: "Premier symptôme, correction unique et observation de la nouvelle première couche.",
  },
  quiz: [
    [
      "Que faire d’une pièce détachée que la buse traîne ?",
      "Arrêter en sécurité",
      "La tenir à la main",
      "Accélérer",
      "Arrêtez le mouvement avant toute inspection autorisée.",
    ],
    [
      "Que vérifier avant de changer un décalage ?",
      "La configuration et sa procédure précise",
      "La couleur du boîtier",
      "Une valeur trouvée pour une autre machine",
      "Les instructions du modèle commandent le réglage.",
    ],
    [
      "Une non-adhérence initiale équivaut-elle à un coin qui se relève plus tard ?",
      "Non",
      "Toujours",
      "Seulement en PLA",
      "Notez quand le défaut apparaît.",
    ],
    [
      "Quel essai de reprise convient ?",
      "Une petite tuile connue",
      "La plus grosse commande",
      "Une collision volontaire",
      "Gardez un spécimen limité et comparable.",
    ],
    [
      "Qu’apporter lors d’une demande d’aide ?",
      "Photos et configuration",
      "Seulement un verdict",
      "Aucune observation",
      "Les faits rendent la recherche de panne plus précise.",
    ],
  ],
});
const reading: ReadingSection[] = [
  {
    title: "Retrouver le premier symptôme",
    sources: ["adhesion", "warp", "safety"],
    paragraphs: [
      "Une pièce détachée peut rapidement produire un amas de fils. Le fait le plus utile précède souvent cet amas : la première ligne n’a jamais tenu, une zone attachée s’est décollée plus tard ou la buse a heurté une partie relevée. Arrêtez par la commande normale puis attendez l’accès sûr. Ne retenez pas la pièce et ne tirez pas sur un filament près du mécanisme actif. Sauver l’apparence de l’essai importe moins que d’éviter une intervention dangereuse dans la zone de mouvement.",
      "Notez le moment et l’endroit du défaut. Un coin qui se relève après plusieurs couches ne donne pas le même point de départ que des lignes détachées sur tout le plateau dès le début. Un défaut localisé et un défaut uniforme suggèrent également des vérifications différentes. Ce sont des indices, pas des causes démontrées. Une photo prise sans risque peut aider; elle ne doit pas retarder l’arrêt d’une situation dangereuse. Après l’arrêt, gardez assez d’éléments pour décrire ce que vous avez réellement observé.",
    ],
  },
  {
    title: "Vérifier les hypothèses de préparation",
    sources: ["surface", "sheets", "first"],
    paragraphs: [
      "Identifiez la surface installée et le filament chargé, puis comparez-les au profil sélectionné. Relisez les consignes de compatibilité, de nettoyage et de manipulation. Une habitude acquise avec du PLA sur une plaque peut être incorrecte pour un autre revêtement. Utilisez seulement la méthode autorisée dans l’état prévu. Un solvant choisi au hasard, un abrasif ou une épaisse couche de colle ne constituent pas une vérification. Si la combinaison n’est pas prise en charge, corrigez ce choix avant d’interpréter le résultat comme un problème de calibration.",
      "Vérifiez également le bon positionnement d’une plaque amovible et la sélection de surface dans la machine lorsqu’elle existe. Le diamètre de buse du profil doit correspondre à celui réellement installé. Un projet importé peut avoir modifié cette hypothèse. N’empruntez pas un décalage numérique à la photo d’une autre imprimante. Ces vérifications simples précèdent les essais de réglage parce que les paramètres suivants dépendent de leur exactitude. Si vous trouvez une discordance, notez sa correction seule au lieu de la combiner avec plusieurs changements sans rapport.",
    ],
  },
  {
    title: "Observer les lignes dans la bonne procédure",
    sources: ["firstlayer", "adhesion", "under"],
    paragraphs: [
      "Des fils arrondis mal attachés et des bourrelets fortement raclés suggèrent des conditions de dépôt différentes. Leur aspect ne fournit pourtant aucun décalage universel. Texture du plateau, matière et système de mesure changent l’interprétation. Consultez la procédure de première couche du modèle et de sa révision. Certaines machines autorisent un ajustement manuel; d’autres utilisent des capteurs et un autre déroulement. Copier une commande de déplacement vertical ou un réglage en direct provenant d’un autre système peut endommager la surface au lieu de résoudre le défaut observé.",
      "Si le fabricant demande un motif de calibration, utilisez ce motif et ses critères plutôt qu’une pièce client entière. Faites une modification pertinente et conservez la valeur initiale lorsque cela s’applique. N’essayez pas de trouver une limite par collision volontaire. Si les lignes se détachent encore ou si le résultat demeure incohérent, rassemblez configuration et photos pour obtenir de l’aide. Abaisser continuellement la buse ou augmenter une température sans comprendre le montage peut transformer une difficulté de préparation en surface abîmée ou en passage d’extrusion obstrué.",
    ],
  },
  {
    title: "Limiter la reprise et sa conclusion",
    sources: ["adhesion", "firstlayer", "warp"],
    paragraphs: [
      "Après la correction ciblée, reprenez la tuile de 25 × 25 × 2 mm avec une configuration prise en charge. Gardez géométrie, matériau et autres paramètres identiques pour relier la nouvelle observation au changement. Regardez le dépôt depuis l’extérieur de la zone mobile et arrêtez si l’échec est évident. Après refroidissement et retrait prescrits, inspectez le dessous et notez si la tuile est restée attachée. Une réussite démontre cet essai limité; elle ne résout pas automatiquement un décollement tardif sur une pièce beaucoup plus large.",
      "Le carnet réunit symptôme initial, hypothèses vérifiées, correction et résultat réel. Si votre base fonctionne déjà, utilisez-la pour reconnaître une première couche attendue et rédigez le chemin de diagnostic sans fabriquer de panne. Ne contaminez pas volontairement le plateau et ne déréglez pas la buse pour satisfaire l’exercice. La compétence utile consiste à choisir le bon chemin : préparation et dépôt initial, ou recherche d’un relevage ultérieur. La décision suivante reste alors liée au moment et à l’endroit du défaut, plutôt qu’à une liste de recettes d’adhérence.",
    ],
  },
];
export default { lesson: content, reading };
