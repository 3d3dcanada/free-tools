import { frenchLesson } from "./lesson";
import type { ReadingSection } from "../types";
const content = frenchLesson(13, {
  summary:
    "Le TPU souple demande un trajet d’alimentation et un profil compatibles avec son grade et sa dureté. La géométrie et les parois influencent aussi sa déformation. Cette leçon gratuite prépare un petit essai sans transformer la souplesse en garantie de sécurité. Aucun fichier n’est téléversé; vos réponses restent sur votre appareil.",
  learn: "Préparer un essai de filament souple sans reprendre aveuglément les réglages d’un matériau rigide.",
  steps: [
    "Vérifiez la compatibilité du grade exact avec l’imprimante et ses accessoires. Suivez le trajet de chargement prescrit; tous les systèmes multibobines n’acceptent pas tout TPU.",
    "Choisissez un profil souple compatible et préparez la surface autorisée. Respectez les indications de séchage et de stockage du fabricant du filament.",
    "Commencez par un patin simple et bas. Observez l’alimentation depuis l’extérieur de la zone mobile et arrêtez un blocage plutôt que de forcer le filament.",
    "Lors d’un autre essai, comparez parois ou remplissage. La rétraction dépend du système et de la dureté : restez dans la procédure prise en charge.",
  ],
  mistakes: [
    "Supposer qu’augmenter la rétraction supprime toujours les fils.",
    "Promettre une récupération illimitée de la forme après une simple pression à la main.",
  ],
  practice: {
    task: "Imprimez un patin de 25 × 25 × 3 mm en TPU si l’installation le permet. Sinon, utilisez le PETG pour cette forme et rédigez le plan TPU manquant; le substitut ne prouve aucune performance du TPU.",
    record:
      "Matériau exact, trajet d’alimentation et résultat, ou substitution clairement identifiée avec ses limites.",
  },
  quiz: [
    [
      "Qu’est-ce qui influence l’alimentation du TPU ?",
      "La dureté et le trajet du filament",
      "Le seul nom de fichier",
      "La couleur de l’écran",
      "Un matériau souple nécessite un guidage et des équipements compatibles.",
    ],
    [
      "Tous les systèmes multibobines conviennent-ils ?",
      "Il faut vérifier la compatibilité exacte",
      "Oui, sans exception",
      "Oui, si la bobine entre",
      "La compatibilité dépend du système et du grade.",
    ],
    [
      "Qu’est-ce qui peut changer la souplesse du patin ?",
      "Les parois et le remplissage",
      "Seulement son étiquette",
      "Le nom du profil",
      "Géométrie et matériau contribuent au comportement.",
    ],
    [
      "Faut-il toujours augmenter la rétraction ?",
      "Non, suivre le réglage compatible",
      "Oui, jusqu’au maximum",
      "Oui, sans autre contrôle",
      "Le réglage du TPU dépend du matériel et de la dureté.",
    ],
    [
      "Une pression à la main qualifie-t-elle un jouet pour enfant ?",
      "Non",
      "Oui, si la pièce revient en place",
      "Oui, si elle est colorée",
      "La qualification du produit constitue un travail distinct.",
    ],
  ],
});
const reading: ReadingSection[] = [
  {
    title: "Lire le grade avant de choisir le chargement",
    sources: ["tpu", "materialtable"],
    paragraphs: [
      "Le filament souple crée à la fois une possibilité de conception et une difficulté d’alimentation. Un brin facile à courber peut être plus difficile à pousser dans un trajet mal soutenu ou inadapté. Identifiez le grade et l’indication éventuelle de dureté, puis consultez les compatibilités de l’imprimante et de l’entraînement. Un accessoire multibobine adapté aux filaments rigides peut imposer des restrictions aux grades souples. Le fait que la bobine entre ne suffit pas. Utilisez le trajet documenté, y compris un éventuel contournement uniquement lorsqu’il est prévu par le fabricant.",
      "La dureté décrit un aspect de la matière, pas tout le comportement d’un patin imprimé. Deux formes fabriquées avec le même filament peuvent réagir différemment selon leur épaisseur, leurs parois et leur structure interne. Un grade plus dur peut également donner une géométrie déformable si elle est conçue pour cela. Séparez ces variables dans les notes. Écrivez le fabricant et le grade plutôt que seulement aspect caoutchouc. Cette expression n’identifie ni les conditions de traitement compatibles ni la source d’une propriété que vous pourriez ensuite attribuer à la pièce.",
    ],
  },
  {
    title: "Établir l’alimentation avant de régler les fils",
    sources: ["tpu", "dry", "string"],
    paragraphs: [
      "Partez du profil souple pris en charge sur la machine réelle. Confirmez séchage, stockage et préparation de surface. Ne recopiez pas vitesse et rétraction d’un filament rigide simplement parce qu’elles ont fonctionné la veille. Observez l’alimentation sans approcher le mécanisme actif et utilisez la bonne commande pour arrêter un blocage. Forcer le brin pendant le fonctionnement n’est pas un étalonnage. Si le chargement ou l’apport échoue, suivez la procédure propre au matériel avant de chercher à masquer le défaut avec davantage de débit ou de rétraction.",
      "Les fils peuvent dépendre de l’état de la matière, de la température et du mouvement, pas seulement de la rétraction. Un trajet d’alimentation souple réagit aussi différemment d’un trajet rigide. N’ajustez qu’un paramètre justifié par la procédure et gardez sa valeur initiale. Comparez les fils et le début de dépôt qui suit. Un réglage qui supprime un fil fin mais provoque un manque à chaque reprise peut être moins bon pour la pièce. Observez plusieurs détails du même essai plutôt que de poursuivre uniquement une photographie plus flatteuse.",
    ],
  },
  {
    title: "Employer une forme facile à comparer",
    sources: ["tpu", "layers", "infill"],
    paragraphs: [
      "Le patin de 25 × 25 × 3 mm reste volontairement bas et simple. Il évite de commencer avec des détails hauts et fragiles ou des supports prisonniers. Imprimez la référence compatible, laissez refroidir et retirez selon les consignes de surface. Regardez dessous, bords et continuité avant de comparer le toucher. Une comparaison douce à la main peut décrire une pièce plus facile à plier qu’une autre. Elle ne mesure pas une dureté normalisée, une durée de fatigue, une protection contre les chocs ou une charge admissible.",
      "Pour un essai ultérieur, conservez dimensions extérieures, filament et profil, en changeant un seul choix de construction, par exemple le nombre de parois. Vérifiez dans l’aperçu ce qui a réellement changé. Identifiez les deux patins et comparez-les dans la même direction. Expliquez si la différence observée en flexion ou en compression correspond à la construction. Si ce n’est pas le cas, notez-le également. Le pourcentage de remplissage ne décide pas seul de la souplesse : parois, couches pleines et direction de déformation participent au comportement de la géométrie réelle.",
    ],
  },
  {
    title: "Limiter la promesse et préciser le relevé",
    sources: ["tpu", "materialtable", "safety"],
    paragraphs: [
      "L’aspect souple peut susciter des suppositions inadéquates : adapté aux enfants, au contact cutané ou à une protection contre un choc. Rien de cela ne découle du seul mot TPU ou d’une impression réussie. Identifiez l’usage et les conséquences d’une déchirure, d’un détachement ou d’une déformation permanente. L’exercice débutant reste un échantillon de bureau. Les applications de protection, de contact particulier ou de sécurité nécessitent leur propre évaluation. Fiche matière et profil pris en charge sont des données utiles pour cette étude, pas une approbation automatique de l’objet.",
      "Consignez grade, trajet, préparation du plateau, profil et résultat observé. Si l’imprimante disponible ne permet pas l’essai TPU, fabriquez la même forme dans un matériau compatible uniquement pour travailler géométrie et relevé. Marquez-la comme substitut et énumérez les exigences TPU encore ouvertes. Elle ne démontre ni alimentation souple ni comportement du TPU. Le dossier peut contenir une préparation sérieuse et un substitut limité, à condition de ne pas transformer l’absence d’essai matière en réussite. Gardez les informations de disponibilité séparées des conclusions tirées du seul objet effectivement fabriqué.",
    ],
  },
];
export default { lesson: content, reading };
