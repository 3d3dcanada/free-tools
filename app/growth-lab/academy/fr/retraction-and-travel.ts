import { frenchLesson } from "./lesson";
import type { ReadingSection } from "../types";
const content = frenchLesson(20, {
  summary:
    "La rétraction modifie le mouvement du filament autour de certains déplacements sans dépôt afin de limiter l’écoulement. Son réglage dépend de l’alimentation et du matériau : vérifiez d’abord leur état et le profil. Cette leçon gratuite observe déplacement et reprise sur deux piliers. Aucun fichier n’est téléversé; vos réponses restent sur votre appareil.",
  learn: "Choisir un essai de rétraction contrôlé sans multiplier les changements excessifs.",
  steps: [
    "Confirmez préparation du filament, température et profil compatibles. Tous les fils fins ne prouvent pas une distance de rétraction insuffisante.",
    "Identifiez le trajet direct ou guidé plus long de la machine. Consultez sa procédure plutôt qu’une distance provenant d’une autre imprimante.",
    "Créez deux petits piliers séparés et examinez le déplacement entre eux. Imprimez une référence avant toute modification de rétraction.",
    "Changez un seul paramètre prévu par le fabricant. Comparez les fils et la reprise d’extrusion; si l’alimentation se dégrade, rétablissez la référence.",
  ],
  mistakes: [
    "Augmenter simultanément vitesse et distance.",
    "Recopier les valeurs d’un filament rigide pour un TPU souple.",
  ],
  practice: {
    task: "Imprimez deux piliers de 6 × 6 × 15 mm avec un espace de 15 mm entre eux. N’effectuez une comparaison compatible que si la référence le justifie.",
    record: "Les observations de déplacement, l’unique paramètre changé et les éventuels défauts de reprise.",
  },
  quiz: [
    [
      "Que cherche à réduire la rétraction ?",
      "L’écoulement pendant les déplacements",
      "La taille du plateau",
      "Le nombre de fichiers",
      "Elle modifie le mouvement du filament autour de certains déplacements sans dépôt.",
    ],
    [
      "L’humidité peut-elle contribuer aux fils ?",
      "Oui",
      "Non",
      "Seulement dans le logiciel",
      "Vérifiez l’état de la matière avant de multiplier les modifications.",
    ],
    [
      "Faut-il changer deux paramètres de rétraction dès le premier essai ?",
      "Non",
      "Oui, toujours",
      "Autant que possible",
      "Une variable isolée se compare plus facilement.",
    ],
    [
      "Quelle distance prendre comme point de départ ?",
      "La référence compatible avec son installation",
      "La plus grande trouvée en ligne",
      "Celle d’un autre système sans vérification",
      "Les trajets et les matériaux diffèrent.",
    ],
    [
      "Que vérifier en plus de la diminution des fils ?",
      "La fiabilité de la reprise d’extrusion",
      "Seulement la brillance",
      "Le nom du modèle",
      "Un réglage ne doit pas créer un nouveau défaut d’alimentation.",
    ],
  ],
});
const reading: ReadingSection[] = [
  {
    title: "Trouver le déplacement avant de changer sa rétraction",
    sources: ["string", "tpu", "viewer"],
    paragraphs: [
      "La rétraction intervient autour de certains déplacements sans impression pour aider à limiter l’écoulement. Localisez d’abord ces déplacements dans l’aperçu. Sur deux piliers, repérez fin du dépôt sur le premier, trajet de la buse et début du dépôt suivant. Ces trois endroits donnent un meilleur plan d’observation que la seule recherche de cheveux entre les pièces. Plusieurs commandes peuvent être disponibles sans nécessiter de changement. Commencez par le profil compatible avec l’alimentation réellement utilisée et notez les valeurs avant d’envisager une modification.",
      "Le trajet physique compte. Un entraînement direct et un guidage plus long peuvent réagir différemment, et une matière souple ajoute une variable. Ne copiez pas une distance sans connaître la configuration à laquelle elle se rapporte. Lisez ensemble procédure de la machine et restrictions du matériau. Une valeur plus grande n’est pas un remède automatiquement plus efficace. Le réglage utile agit sur l’écoulement observé tout en préservant alimentation et reprise. Gardez les valeurs d’origine pour revenir clairement en arrière si l’essai produit une extrusion moins fiable.",
    ],
  },
  {
    title: "Examiner ce qui ressemble à un problème de rétraction",
    sources: ["dry", "string", "first"],
    paragraphs: [
      "Les fils peuvent impliquer température, état du filament ou résidus en plus de la rétraction. Vérifiez profil et préparation avant de lancer une série de réglages. Si les consignes prévoient inspection ou nettoyage de buse, effectuez-les uniquement dans l’état sûr documenté. N’approchez pas une main d’un mécanisme mobile pour enlever un fil. Décrivez le symptôme et conservez une photo si elle aide. L’expression problème de rétraction doit rester une hypothèse à vérifier, pas une conclusion initiale qui oblige ensuite toutes les observations à entrer dans une seule explication.",
      "Le conditionnement de la matière compte particulièrement lorsque les indications demandent un séchage. Contenant au sec et séchoir actif n’ont pas la même fonction et doivent être adaptés. Si vous séchez une bobine, notez ce changement et établissez une nouvelle référence avant de modifier aussi la rétraction. Sinon, une amélioration ne permettra pas de distinguer leurs effets. Le même principe s’applique à une correction de température. Réparez d’abord un profil clairement incompatible, puis vérifiez si le problème de fils se répète avant de retoucher les paramètres du déplacement.",
    ],
  },
  {
    title: "Observer les deux extrémités du trajet",
    sources: ["string", "teaching", "viewer"],
    paragraphs: [
      "Créez les piliers de 6 × 6 × 15 mm avec l’espace prévu et inspectez les trajets. Gardez dimensions et placement identiques entre essais. Imprimez et identifiez la référence. Regardez les fils entre les piliers, mais aussi les points de reprise. Un réglage qui retire un fil tout en laissant un manque à chaque redémarrage peut rendre la pièce moins utile. Séparez ces observations dans le relevé afin que l’amélioration la plus visible ne masque pas un nouveau problème de dépôt sur les surfaces des deux échantillons.",
      "Si un ajustement est justifié, changez une seule commande dans les limites de la procédure. Distance et vitesse sont distinctes; les modifier ensemble empêche de conclure simplement sur l’une. Gardez température, état de matière, forme et autres réglages identiques. Comparez avec les mêmes lumière et direction d’observation. Ne classez pas seulement les pièces après avoir retiré leurs fils à l’outil : cela supprime une partie de la preuve. Photographiez ou décrivez l’état brut avant nettoyage et conservez le projet qui a généré chaque échantillon étiqueté.",
    ],
  },
  {
    title: "Garder un réglage utile plutôt qu’un chiffre extrême",
    sources: ["string", "tpu", "teaching"],
    paragraphs: [
      "Arrêtez la séquence lorsqu’un réglage compatible fournit un résultat utile sans dégrader reprise ni alimentation. Si aucun ajustement prévu n’aide, rétablissez la référence et réexaminez l’hypothèse. N’allongez pas indéfiniment distance ou vitesse parce qu’un fil restant gêne. La prochaine vérification peut concerner température, état de matière, buse ou stratégie de déplacement de la géométrie. Un défaut persistant demande des consignes adaptées et des observations exploitables, plutôt qu’une collection de valeurs de plus en plus extrêmes empruntées à des machines dont le fonctionnement diffère du vôtre.",
      "Le relevé final relie matériau et trajet d’alimentation à la référence, au changement unique et aux observations lors du déplacement et de la reprise. Dites si le réglage est gardé et ce qui n’a pas été étudié. Deux piliers simples ne représentent pas chaque long trajet, détail minuscule ou forme souple à venir. Gardez cette limite lors de la réutilisation du profil. L’apprentissage consiste à expliquer pourquoi l’essai était nécessaire, ce que la commande a changé et pourquoi le résultat justifie soit son maintien, soit le retour à la référence.",
    ],
  },
];
export default { lesson: content, reading };
