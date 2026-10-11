import { frenchLesson } from "./lesson";
import type { ReadingSection } from "../types";
const content = frenchLesson(32, {
  summary:
    "Choisissez une face à améliorer, protégez les surfaces fonctionnelles et comparez un petit essai de finition à un témoin intact. Vérifiez l’aspect et les dimensions séparément. Cette leçon gratuite reste au travail manuel simple, sans lissage au solvant. Aucun fichier n’est téléversé; vos notes et votre progression restent localement sur votre appareil.",
  learn: "Préparer une finition limitée en préservant les surfaces qui doivent s’assembler.",
  steps: [
    "Décidez quelle face améliorer et quelles dimensions conserver. Repérez surfaces d’appui, filets et détails mesurés qui ne doivent pas perdre de matière.",
    "Pour le premier essai, utilisez un abrasif manuel adapté sur un polymère ordinaire non chargé, avec la maîtrise des poussières prescrite. Écartez outils motorisés et matières fibrées.",
    "Essayez tout mastic ou revêtement sur une chute selon ses consignes de compatibilité et de sécurité. Le lissage au solvant ne fait pas partie de cette procédure débutante.",
    "Comparez au témoin non travaillé, puis mesurez à nouveau. Précisez si l’amélioration est seulement esthétique et si un contrôle reste à effectuer.",
  ],
  mistakes: [
    "Poncer une surface ajustée jusqu’à modifier son assemblage.",
    "Présenter une peinture comme preuve d’aptitude alimentaire ou de tenue extérieure.",
  ],
  practice: {
    task: "Imprimez ou réutilisez deux petits blocs de PLA ou PETG non chargé. Effectuez une finition manuelle contrôlée sur une seule face non critique d’un bloc; conservez l’autre intact.",
    record: "Méthode, maîtrise des poussières, différence visible et variation dimensionnelle éventuelle.",
  },
  quiz: [
    [
      "Que repérer avant de poncer ?",
      "Les surfaces dont l’ajustement doit rester intact",
      "Seulement le nom",
      "La couleur du clavier",
      "La finition peut enlever de la matière fonctionnelle.",
    ],
    [
      "Un revêtement seul qualifie-t-il le contact alimentaire ?",
      "Non",
      "Toujours",
      "Si la surface brille",
      "Les exigences d’usage restent à vérifier séparément.",
    ],
    [
      "Où essayer un nouveau revêtement ?",
      "Sur une chute",
      "Sur toute la commande",
      "Dans la tête d’impression",
      "Une petite éprouvette permet de vérifier compatibilité et manipulation.",
    ],
    [
      "Pourquoi garder un bloc intact ?",
      "Pour voir l’effet du procédé",
      "Pour éviter les mesures",
      "Pour prouver toute durabilité",
      "Le témoin rend la comparaison lisible.",
    ],
    [
      "Quel procédé est hors de cet exercice ?",
      "Le lissage au solvant",
      "L’observation",
      "La mesure",
      "La leçon n’enseigne pas le traitement par vapeurs de solvant.",
    ],
  ],
});
const reading: ReadingSection[] = [
  {
    title: "Nommer la surface et le changement",
    sources: ["finish", "design", "pla"],
    paragraphs: [
      "Commencez par un objectif : réduire une arête gênante, améliorer une face visible ou préparer un revêtement compatible. Marquez zone travaillée et éléments dont les dimensions doivent rester intactes. Une face d’appui, un filetage ou un tenon peut souffrir du même ponçage qui améliore un panneau décoratif. L’objet n’est pas une surface esthétique uniforme. Un simple croquis distinguant zones protégées et zones modifiées suffit pour garder l’opération liée à la fonction de la pièce, et pour expliquer ensuite où un changement de cote était attendu ou interdit.",
      "Utilisez deux blocs ordinaires de PLA ou PETG non chargé. Gardez l’un intact et choisissez une face non critique sur l’autre. Cette comparaison évite de mélanger nouveau matériau, géométrie complexe et chimie inconnue. Relevez les dimensions importantes avant de retirer de la matière. L’objectif est d’observer une modification contrôlée, pas de créer une image publicitaire parfaite. Si la pièce de départ présente une fissure ou un détail absent, traitez ce défaut séparément. Une finition qui cache les preuves ne transforme pas un défaut de fabrication en résultat accepté.",
    ],
  },
  {
    title: "Prévoir les contrôles propres à l’opération",
    sources: ["finish", "safety", "pla"],
    paragraphs: [
      "L’abrasion produit des poussières; mastics et revêtements peuvent ajouter une exposition chimique. Consultez instructions et informations de sécurité avant de choisir méthode et protections. Les contrôles de l’impression ne suffisent pas automatiquement au ponçage. Gardez matières fibrées et ponçage motorisé hors de ce premier essai. Des gants ou un appareil respiratoire ne rendent pas seuls acceptable un poste inadapté. Préparez espace, manipulation et nettoyage pour l’opération réelle. Si les exigences restent incertaines, arrêtez à la planification et obtenez un conseil adapté avant de produire poussières ou vapeurs.",
      "Travaillez manuellement la face choisie avec une méthode compatible, selon les consignes du matériau et de l’abrasif. N’improvisez pas un lissage au solvant. Une transformation chimique de surface ajoute des questions de compatibilité et d’exposition que cette comparaison simple ne traite pas. Pour un mastic ou un revêtement ultérieur, commencez sur chute avec préparation et durcissement prescrits. Ne mélangez pas des produits inconnus et ne transférez pas une recette entre polymères seulement parce qu’ils ressemblent tous deux à du plastique. Documentez chaque opération ajoutée au procédé.",
    ],
  },
  {
    title: "Comparer l’apparence et les cotes",
    sources: ["design", "finish"],
    paragraphs: [
      "Inspectez témoin et face travaillée sous le même angle et le même éclairage. Décrivez le changement visible : marches de couches, texture ou arête. Relevez ensuite les dimensions susceptibles d’avoir changé. Une surface plus lisse et un ajustement différent peuvent apparaître ensemble. Poncer un tenon nominal de 10 mm jusqu’à ce qu’il entre dans un logement ne prouve pas la justesse de la tolérance imprimée initiale. Cela montre qu’une seconde opération a modifié la pièce. Cette différence devient essentielle pour reproduire le résultat sur plusieurs exemplaires.",
      "Un exemple arithmétique simple illustre l’effet : retirer 0,10 mm sur chacune de deux faces opposées réduit la largeur totale de 0,20 mm. Ces valeurs sont supposées; elles ne décrivent pas une quantité retirée par passage d’abrasif. L’enlèvement manuel reste difficile à maîtriser sans mesure. Utilisez l’exemple pour comprendre la protection des faces d’assemblage, pas pour compter les gestes comme une recette universelle. Mesurez le détail concerné avec une méthode adaptée et gardez l’incertitude visible si l’outil ou la forme ne permet pas une conclusion précise.",
    ],
  },
  {
    title: "Limiter la promesse au résultat observé",
    sources: ["finish", "safety", "cost"],
    paragraphs: [
      "Un revêtement peut améliorer l’aspect sans démontrer aptitude alimentaire, résistance aux intempéries ou résistance mécanique retrouvée. Ces exigences concernent la combinaison complète du matériau et du procédé. Ne donnez pas une garantie générale parce qu’une étiquette décrit un ingrédient comme adapté à un usage particulier. L’exercice reste un spécimen de bureau et un changement de surface observable. Pour un vrai projet avec contact ou durabilité spécifiques, identifiez ces exigences avant le choix du produit et recherchez les preuves nécessaires pour l’ensemble fini, y compris son application réelle.",
      "Le dossier final contient état initial, zones protégées, méthode, contrôles de l’opération, aspect et variation dimensionnelle. Identifiez témoin et échantillon fini. Si un revêtement n’est pas durci ou une inspection reste ouverte, marquez le résultat en attente. Ajoutez le nettoyage au temps de travail si vous chiffrez plus tard ce procédé. Une finition utile peut être expliquée, répétée et inspectée. Le plus bel exemplaire ne montre pas à lui seul le travail nécessaire ni le maintien des surfaces fonctionnelles dans leurs limites prévues après toutes les étapes.",
    ],
  },
];
export default { lesson: content, reading };
