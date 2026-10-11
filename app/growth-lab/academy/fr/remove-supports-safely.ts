import { frenchLesson } from "./lesson";
import type { ReadingSection } from "../types";
const content = frenchLesson(31, {
  summary:
    "Retirez les supports sur une pièce refroidie et stabilisée, par petites sections accessibles, puis inspectez les contacts et les fissures. Un nettoyage esthétique ne répare pas une partie endommagée. Cette leçon gratuite relie retrait, outils et préparation du prochain essai. Aucun fichier n’est téléversé; votre progression reste localement sur votre appareil.",
  learn: "Enlever un support accessible et distinguer nettoyage et dommage réel.",
  steps: [
    "Laissez refroidir puis retirez la pièce selon les consignes de la plaque. Identifiez les contacts du support avant de tirer sur un élément.",
    "Préparez outils manuels adaptés et protection oculaire contre les fragments. Stabilisez le travail et dirigez la coupe à l’opposé des doigts et des autres personnes.",
    "Enlevez les portions accessibles progressivement. Si un support reste piégé ou si le retrait menace un détail important, arrêtez et reconsidérez orientation ou conception.",
    "Cherchez fissures, entailles et bords manquants. Une pièce endommagée demande une nouvelle décision; une photo avantageuse ou du ponçage ne restaure pas la matière perdue.",
  ],
  mistakes: [
    "Tordre un détail fragile pour arracher un gros bloc de support.",
    "Accepter une pièce fissurée parce que sa surface paraît propre.",
  ],
  practice: {
    task: "Retirez le support du T de la leçon 22, ou imprimez un petit spécimen équivalent. Gardez une zone de contact non polie pour comparer son état au résultat nettoyé.",
    record: "Outils, état du contact et éventuel dommage ou changement de conception.",
  },
  quiz: [
    [
      "Dans quel état manipuler le spécimen ?",
      "Refroidi et stable",
      "En mouvement",
      "Encore fixé sous une buse active",
      "Préparez un état de manipulation sûr.",
    ],
    [
      "Pourquoi prévoir une protection oculaire ?",
      "Des fragments peuvent être projetés",
      "Pour changer la couleur",
      "Pour remplacer l’outil",
      "Le retrait peut produire de petits éclats coupants.",
    ],
    [
      "Que faire face à un support inaccessible ?",
      "Reconsidérer conception ou orientation",
      "Creuser à l’aveugle",
      "Le cacher systématiquement",
      "L’accès au retrait appartient à la préparation.",
    ],
    [
      "Le ponçage restaure-t-il une partie fissurée ?",
      "Non",
      "Toujours",
      "Si la photo est nette",
      "L’aspect ne constitue pas une preuve de réparation mécanique.",
    ],
    [
      "Qu’inspecter après le retrait ?",
      "Contacts, bords et fissures",
      "Seulement le fichier",
      "Uniquement la couleur",
      "Examinez les zones touchées par l’opération.",
    ],
  ],
});
const reading: ReadingSection[] = [
  {
    title: "Préparer le chemin de retrait",
    sources: ["finish", "safety", "supports"],
    paragraphs: [
      "Commencez par une pièce refroidie, retirée avec la méthode autorisée pour la plaque. Distinguez géométrie finale et support temporaire grâce à l’aperçu sauvegardé si nécessaire. Imaginez comment chaque portion peut sortir sans tordre un détail fragile ni emprisonner l’outil. Le petit T pédagogique facilite cette lecture, car contacts et direction de retrait restent visibles. Si la seule méthode apparente demande une force mal maîtrisée sur la pièce finie, arrêtez. Revenez à l’orientation ou à la stratégie de support avant de transformer une difficulté d’accès en casse.",
      "Préparez un poste stable, des outils adaptés et les protections correspondant à l’opération, notamment contre les fragments projetés. Orientez coupe et traction loin des doigts et des autres personnes. Une petite pièce peut être plus difficile à tenir qu’une grande : ne placez pas la main derrière l’outil pour compenser. Choisissez un maintien qui ne l’écrase pas. Suivez les instructions des outils. N’ajoutez pas une opération motorisée ou chauffée à ce premier exercice dont le but est simplement un retrait manuel contrôlé et observable.",
    ],
  },
  {
    title: "Travailler par sections et garder les indices",
    sources: ["supportfinish", "finish", "cut"],
    paragraphs: [
      "Retirez des portions maîtrisables au lieu de tirer tout un volume contre une mince avancée. Observez la séparation du contact et arrêtez si la pièce fissure, fléchit excessivement ou perd un bord. Un support prisonnier dans une cavité est un problème de conception et de procédé, pas une invitation à creuser sans visibilité. Retournez à l’aperçu : rotation, séparation du modèle ou disposition accessible peuvent améliorer la version suivante. Ne dissimulez pas un support impossible à retirer dans une pièce dont le volume devait rester vide.",
      "Gardez un contact non poli jusqu’à sa documentation. Notez rugosité, petits reliefs, entailles et matière manquante. Cette observation donne une cible au prochain essai d’interface. Poncer immédiatement partout peut effacer les indices et changer les cotes. Si le nettoyage est nécessaire à l’usage, inscrivez-le comme opération distincte avec temps et inspection. Une surface acceptable seulement après un travail important correspond à un autre procédé de fabrication qu’une surface utilisable dès le retrait. Les deux peuvent convenir, mais leur coût et leur répétabilité ne sont pas identiques.",
    ],
  },
  {
    title: "Distinguer une marque d’un dommage",
    sources: ["finish", "design", "supportfinish"],
    paragraphs: [
      "Un dessous rugueux peut être acceptable sur une face cachée et gênant sur une surface d’assemblage. Une fissure diffère d’une texture; un bord manquant ne revient pas en lissant ses alentours. Inspectez selon la fonction prévue. Pour le T d’exercice, décrivez avancée et pied sans leur attribuer une charge admissible. Pour un montage réel, vérifiez dimensions et contacts importants. La décision doit s’appuyer sur des critères écrits, pas sur la possibilité de prendre une photo depuis un angle qui masque la zone touchée.",
      "Peinture, mastic ou image nettoyée ne prouvent pas qu’une partie endommagée retrouve sa fonction. Une réparation éventuelle demande sa justification et sa vérification propres. La démarche débutante consiste à identifier la pièce rejetée puis à modifier conception ou procédé. Gardez le spécimen ou une preuve claire pour éviter qu’il retourne accidentellement dans un lot accepté. Séparer physiquement ou visiblement les statuts est une habitude de qualité pratique. Elle importe autant que de pouvoir retrouver le réglage de support utilisé pour l’impression et la cause supposée du dommage.",
    ],
  },
  {
    title: "Réutiliser l’expérience dans la préparation",
    sources: ["supports", "supportfinish", "safety"],
    paragraphs: [
      "Comparez le spécimen et l’aperçu : les contacts étaient-ils prévus et l’outil pouvait-il réellement les atteindre ? Notez toute différence entre plan numérique et manipulation. Un réglage d’interface peut échanger facilité de retrait contre qualité du dessous. Jugez les deux résultats ensemble. Si l’emplacement est lui-même inaccessible, reconsidérez orientation ou découpe avant d’affiner l’espacement. Une modification de forme peut résoudre un problème de manipulation qu’aucun petit ajustement de distance ne rendra pratique de façon répétable avec les outils et l’accès disponibles.",
      "Le compte rendu nomme outils, maintien, état des contacts, effort de nettoyage et décision finale. Si le retrait n’a pas été effectué, laissez cette étape non vérifiée même si l’objet paraît terminé sur le plateau. Si une partie est abîmée, écrivez le dommage et la révision suivante plutôt que de cocher une réussite. Le résultat utile est une méthode qui éloigne les personnes des fragments coupants, conserve les preuves et transforme l’expérience de retrait en meilleure préparation. La fin d’impression n’est ainsi plus confondue avec la fin du travail.",
    ],
  },
];
export default { lesson: content, reading };
