import { frenchLesson } from "./lesson";
import type { ReadingSection } from "../types";
const content = frenchLesson(8, {
  summary:
    "La hauteur de couche définit les pas verticaux, les parois suivent les limites et le remplissage construit l’intérieur. Augmenter tous ces paramètres ne garantit pas une meilleure pièce. Cette leçon gratuite compare leurs effets dans l’aperçu puis sur deux blocs. Aucun fichier n’est téléversé; votre progression reste enregistrée localement dans le navigateur.",
  learn: "Expliquer trois commandes courantes du trancheur et comparer leurs effets séparément.",
  steps: [
    "Gardez la hauteur de référence compatible pour le premier essai. Comparez un profil plus fin dans l’aperçu et notez sa durée prévue avant utilisation.",
    "Examinez une coupe tranchée : repérez parois, intérieur peu dense et couches pleines du dessus et du dessous.",
    "Comparez un autre nombre de parois en gardant le remplissage constant. Regardez où la matière s’ajoute sans en déduire une résistance non mesurée.",
    "Choisissez selon l’usage : une coque décorative, un patin souple et une équerre chargée n’exigent pas les mêmes preuves.",
  ],
  mistakes: [
    "Présenter un remplissage à 100 % comme une solution universelle de résistance.",
    "Choisir des couches très fines sans savoir quelle surface doit en bénéficier.",
  ],
  practice: {
    task: "Imprimez deux petits blocs avec géométrie, matériau, orientation et remplissage identiques. Changez uniquement entre deux hauteurs de couche compatibles et comparez aspect latéral et durée réelle.",
    record:
      "Les deux profils, les observations et une mention précisant que la résistance n’a pas été mesurée.",
  },
  quiz: [
    [
      "Quel réglage change le pas vertical ?",
      "La hauteur de couche",
      "La couleur de bobine",
      "Le nom du modèle",
      "La hauteur de couche décrit l’épaisseur des tranches successives.",
    ],
    [
      "Quels trajets forment l’enveloppe extérieure ?",
      "Les parois ou périmètres",
      "Le déplacement à vide",
      "L’étiquette de bobine",
      "Les parois suivent les limites de chaque couche.",
    ],
    [
      "Pourquoi utiliser du remplissage ?",
      "Pour l’intérieur et le soutien du dessus",
      "Pour garantir toute charge",
      "Pour remplacer le plateau",
      "Le remplissage intervient dans la construction et le comportement de la pièce.",
    ],
    [
      "Que conserver lors d’une comparaison ciblée ?",
      "Tout sauf le paramètre étudié",
      "Uniquement la couleur",
      "Aucun paramètre",
      "Un changement isolé aide à comprendre son effet.",
    ],
    [
      "Plus de remplissage qualifie-t-il une équerre chargée ?",
      "Non, des essais adaptés restent nécessaires",
      "Oui, automatiquement",
      "Seulement si elle paraît lisse",
      "Un réglage ne constitue pas une validation de charge.",
    ],
  ],
});
const reading: ReadingSection[] = [
  {
    title: "Distinguer hauteur, largeur et diamètre",
    sources: ["layers", "viewer"],
    paragraphs: [
      "La hauteur de couche est l’incrément vertical de construction. Elle diffère de la largeur du cordon déposé et du diamètre de la buse. Des couches plus fines peuvent réduire les marches visibles sur une pente, mais elles augmentent aussi le nombre de couches et modifient le travail à accomplir. Une paroi plane verticale et un dessus légèrement courbé n’en bénéficient pas de la même manière. Choisissez un profil compatible et identifiez la surface à améliorer avant de consacrer davantage de temps d’impression à une valeur plus petite.",
      "Dans le cas simplifié d’un bloc haut de 10 mm, des pas constants de 0,20 mm donnent 50 couches nominales; des pas de 0,10 mm en donnent 100. La première couche et les hauteurs variables peuvent changer ces nombres. Doubler le nombre de couches ne garantit pas exactement le double de durée : mouvements, refroidissement et autres limites contribuent aussi au temps. Comparez les prévisions, puis les durées constatées avec les mêmes débuts et fins de mesure. L’exemple explique un compromis, pas une formule de temps valable pour toute imprimante.",
    ],
  },
  {
    title: "Séparer enveloppe et intérieur",
    sources: ["layers", "infill", "patterns"],
    paragraphs: [
      "Dans une coupe tranchée, repérez les périmètres, les couches pleines et le remplissage peu dense. Les parois suivent les limites extérieures mais aussi celles des trous. Les régions pleines du dessus et du dessous ferment l’objet. Le remplissage occupe une partie de l’espace restant et peut soutenir les couches de fermeture. Ces rôles se complètent, mais les commandes ne sont pas interchangeables. Ajouter du remplissage ne place pas simplement la même matière au même endroit qu’une paroi supplémentaire. Regardez les trajets effectivement dessinés, pas seulement les valeurs du panneau.",
      "Prenez un bloc comportant une ouverture et comparez deux nombres de parois en gardant les autres paramètres fixes. Le périmètre ajouté doit apparaître autour des limites concernées. Rétablissez ensuite la référence et changez le remplissage : les nouveaux trajets apparaissent ailleurs. Enregistrez les deux vues avec une légende. Vous avez montré une différence de construction, sans mesurer une résistance. Une conclusion mécanique demanderait matériau, orientation, géométrie, procédé et charge réels. Le pourcentage de remplissage concerne l’intérieur; il n’est pas simplement le pourcentage du volume total qui devient du plastique.",
    ],
  },
  {
    title: "Choisir en fonction du rôle de la pièce",
    sources: ["infill", "patterns", "layers"],
    paragraphs: [
      "Une coque de présentation, un patin compressible et une équerre posent des questions différentes. Pour la coque, l’aspect et la fermeture peuvent dominer. Pour le patin, les parois peuvent fortement influencer la déformation. Pour l’équerre, orientation et trajet de charge peuvent compter davantage qu’un pourcentage isolé. Partez du comportement demandé et d’une référence compatible. Un pourcentage n’est pas une catégorie de qualité. Même une pièce annoncée à 100 % peut présenter une mauvaise liaison, une forme inadaptée ou un matériau qui ne convient pas à l’usage prévu.",
      "Les surfaces supérieures permettent d’observer les interactions. Une couche de fermeture doit franchir les espaces situés dessous; le motif et l’espacement internes influencent donc son soutien. Modifier seulement le nombre de couches visibles ne répond pas à tous les défauts du dessus. Regardez les couches sous le défaut et les indications du fabricant. Inversement, un détail très fin peut laisser peu de place à un remplissage distinct. Un déplacement important du curseur peut alors modifier très peu ses trajets. La coupe explique mieux la situation qu’une capture des seuls paramètres.",
    ],
  },
  {
    title: "Effectuer un essai que l’on peut interpréter",
    sources: ["layers", "teaching"],
    paragraphs: [
      "Imprimez les deux blocs avec les mêmes géométrie, matériau, orientation et remplissage, en choisissant seulement deux hauteurs compatibles. Relevez les noms de profils, les prévisions et le résultat constaté. Comparez la même face sous une lumière semblable. Si le bloc fin semble meilleur mais prend plus de temps, décrivez les deux observations. Si cette forme ne montre pas de différence utile, c’est aussi un résultat. Serrer les pièces à la main n’autorise pas à inventer une conclusion de résistance : l’exercice porte sur l’aspect visible et le déroulement enregistré.",
      "Étiquetez chaque échantillon pour conserver la comparaison après la séance. Ajoutez une phrase expliquant quel profil vous garderiez pour ce bloc précis et pourquoi. Une future forme courbe pourra justifier un autre choix. Si un essai échoue, examinez l’échec avant de classer les profils. Revenir à la référence fait partie de la méthode. Vous cherchez à comprendre ce que la commande change dans les trajets et quelle observation justifierait son usage sur un autre travail, sans transformer une préférence de surface en promesse générale de performance.",
    ],
  },
];
export default { lesson: content, reading };
