import { frenchLesson } from "./lesson";
import type { ReadingSection } from "../types";
const content = frenchLesson(16, {
  summary:
    "Préparez la surface exacte pour maintenir la première couche puis libérer la pièce refroidie. Identifiez le plateau avant de choisir nettoyage ou couche séparatrice, en suivant sa procédure compatible avec le matériau. Cette leçon gratuite compare fixation et retrait sur une petite tuile. Aucun fichier n’est téléversé; vos réponses restent locales.",
  learn: "Suivre une méthode de préparation propre au plateau réellement installé.",
  steps: [
    "Identifiez fabricant, surface et finition. Retrouvez les consignes actuelles de nettoyage et de compatibilité avec le matériau.",
    "Placez le plateau dans l’état refroidi prescrit et employez la méthode autorisée. Éloignez les produits de nettoyage des éléments électriques et de la chaleur active.",
    "Manipulez la surface préparée par les bords autorisés. N’ajoutez une couche séparatrice que si les indications de compatibilité la demandent.",
    "Lancez un petit travail connu. Distinguez lignes jamais fixées, coins soulevés plus tard et retrait trop difficile : ces observations ne sont pas équivalentes.",
  ],
  mistakes: [
    "Nettoyer toute surface avec de l’acétone.",
    "Toucher la zone nettoyée avec des doigts qui la contaminent.",
  ],
  practice: {
    task: "Imprimez une tuile de 25 × 25 × 2 mm sur le plateau préparé avec un matériau compatible. Regardez son dessous et son retrait après refroidissement.",
    record: "Identité du plateau, méthode approuvée, aspect de première couche et résultat du retrait.",
  },
  quiz: [
    [
      "Que faire avant de choisir un nettoyant ?",
      "Identifier le plateau",
      "Choisir le produit le plus fort",
      "Copier toute vidéo",
      "Les consignes d’entretien varient selon la surface.",
    ],
    [
      "Où prendre une feuille préparée ?",
      "Par ses bords autorisés",
      "Au centre de la zone d’impression",
      "Sur une zone encore chaude",
      "Évitez de contaminer la surface préparée.",
    ],
    [
      "L’acétone est-elle un nettoyant universel ?",
      "Non",
      "Oui, pour toute finition",
      "Oui, si le flacon est petit",
      "Elle peut endommager certaines surfaces.",
    ],
    [
      "Que faire devant un retrait difficile ?",
      "Revoir compatibilité et procédure de retrait",
      "Ajouter toujours plus de colle",
      "Forcer sans contrôle",
      "Une liaison excessive demande sa propre investigation.",
    ],
    [
      "Dans quel état effectuer le nettoyage ?",
      "Dans l’état refroidi prévu par la procédure",
      "Pendant un déplacement",
      "Au hasard de la température",
      "Respectez la préparation sûre définie par le fabricant.",
    ],
  ],
});
const reading: ReadingSection[] = [
  {
    title: "Identifier la surface avant la routine",
    sources: ["surface", "sheets"],
    paragraphs: [
      "Un plateau est un produit précis avec un revêtement, une méthode de préparation et des limites. Identifiez-le par son étiquette ou le relevé du matériel plutôt que par sa couleur ou son relief. Retrouvez les indications actuelles concernant cette surface et le filament prévu. Un conseil adapté à un produit peut en abîmer un autre. La première étape est donc documentaire : notez l’identité et la référence avant d’ouvrir un nettoyant. Dans un atelier possédant plusieurs feuilles interchangeables, vérifiez celle effectivement installée pour ce travail.",
      "L’adhérence comporte deux exigences : maintenir la pièce pendant sa construction et permettre sa libération sans dommage. Un lien plus fort n’est pas toujours préférable. Certaines associations nécessitent une couche séparatrice; d’autres suivent une préparation différente. Respectez la compatibilité spécifique plutôt que d’utiliser de la colle comme réponse générale. Notez produit et raison de son emploi. Si la feuille possède deux faces utilisables, indiquez la face choisie : un revers endommagé ou préparé autrement ne doit pas devenir sans explication la nouvelle référence du travail suivant.",
    ],
  },
  {
    title: "Préparer une séquence de manipulation maîtrisée",
    sources: ["surface", "sheets", "maintenance", "safety"],
    paragraphs: [
      "Placez imprimante et plateau dans l’état demandé par la procédure de nettoyage. Laissez refroidir lorsque c’est prescrit et tenez les produits éloignés de l’électronique sous tension, de la chaleur active et des sources d’inflammation. Employez méthode et produit autorisés, y compris séchage et manipulation. N’ajoutez pas abrasif, solvant ou grattage parce qu’une marque résiste. Une trace visible n’est pas automatiquement une contamination. Dégrader le revêtement peut créer un nouveau défaut d’adhérence. Si la méthode normale ne répond pas à l’état observé, revenez à la documentation du plateau.",
      "Après préparation, prenez la feuille par les bords ou points de prise autorisés afin de conserver l’état de la zone utile. Vérifiez son installation et l’absence de débris dessous. Reliez son identité à la sélection ou à la procédure d’étalonnage lorsque la machine distingue plusieurs surfaces. Un changement de type ou d’épaisseur peut modifier les hypothèses de préparation. Vous cherchez une condition connue, pas un rituel mémorisé. Une courte liste est particulièrement utile lorsque plusieurs personnes utilisent la même imprimante et pourraient appliquer des habitudes différentes sans se le dire.",
    ],
  },
  {
    title: "Décrire le moment de l’échec",
    sources: ["adhesion", "firstlayer", "warp", "surface"],
    paragraphs: [
      "Imprimez la petite tuile avec une référence compatible. Observez les premières lignes sans entrer dans la zone mobile. Si elles ne se fixent jamais, notez l’échec initial et arrêtez selon la procédure. Si elles tiennent puis qu’un coin se soulève, relevez le moment et l’emplacement. Si le dépôt se termine mais que la pièce refroidie résiste au retrait normal, il s’agit d’un problème de libération. N’appelez pas indistinctement ces trois situations mauvaise adhérence. Leur chronologie aide à choisir la suite et évite d’augmenter systématiquement colle ou température.",
      "Examinez le dessous refroidi en le reliant au relevé de surface et de matériau. Ne déduisez pas un décalage de buse précis à partir d’une photo seule : texture, paramètres de première couche et filament influencent l’apparence. Si les observations conduisent vers l’étalonnage, utilisez la procédure de cette machine. Un dessous lisse ne prouve pas davantage la conformité dimensionnelle de toute la pièce. Gardez cet exercice centré sur préparation, fixation et retrait; la leçon de métrologie traitera séparément la question d’acceptation fonctionnelle.",
    ],
  },
  {
    title: "Rendre la méthode reproductible",
    sources: ["surface", "maintenance", "adhesion"],
    paragraphs: [
      "Pour un essai satisfaisant, relevez plateau, matériau, méthode de nettoyage, éventuelle couche séparatrice, observation initiale et retrait. Si les consignes ne prescrivent pas une quantité ou un temps mesuré, n’inventez pas de précision. Notez toute différence depuis le travail précédent. Une routine qui fonctionne uniquement après un traitement supplémentaire inexpliqué reste mal comprise. Comparez ce traitement aux indications officielles avant de l’adopter comme habitude ou de l’appliquer à une pièce plus grande et coûteuse. Le résultat doit être relié à une préparation que l’on sait décrire.",
      "Si la préparation ne rétablit pas une référence fiable, ne répétez pas indéfiniment le même grand travail raté. Vérifiez profil, compatibilité et méthode de première couche, puis demandez de l’aide pour un équipement abîmé ou incertain. Gardez l’échantillon raté et la note de chronologie lorsqu’ils peuvent servir au diagnostic. Ne grattez pas agressivement un revêtement pour effacer les traces. Le résultat utile est soit une méthode reproductible de fixation et de retrait, soit une condition non résolue et une prochaine vérification claire, plutôt qu’un jugement vague sur le plateau.",
    ],
  },
];
export default { lesson: content, reading };
