import { frenchLesson } from "./lesson";
import type { ReadingSection } from "../types";
const content = frenchLesson(11, {
  summary:
    "Le PLA permet d’apprendre le procédé et de vérifier une forme avec un prototype. Une impression facile ne prouve pas son aptitude à la chaleur, aux chocs ou à un usage prolongé. Cette leçon gratuite sépare essai géométrique et validation du matériau final. Aucun modèle n’est téléversé; vos réponses restent sur votre appareil.",
  learn: "Distinguer un prototype utile d’un matériau validé pour une pièce client.",
  steps: [
    "Utilisez le profil PLA compatible avec l’imprimante et la bobine. Gardez une configuration stable pour apprendre à lire les surfaces et les dimensions.",
    "Écrivez la question du prototype : aspect, encombrement, accès ou ajustement approximatif. Ne la transformez pas implicitement en essai de charge en service.",
    "Étiquetez l’échantillon comme prototype. Si l’usage final comporte chaleur, météo ou efforts répétés, choisissez et évaluez séparément le matériau prévu.",
    "Distinguez la règle d’atelier 3D3D : PLA pour apprendre et prototyper; PETG ou matériau mieux adapté pour les pièces client. Ce choix commercial ne rend pas tous les objets en PLA inutiles.",
  ],
  mistakes: [
    "Laisser un prototype non évalué dans un environnement chaud en le considérant comme une pièce définitive.",
    "Présenter une règle d’atelier comme une loi universelle sur les plastiques.",
  ],
  practice: {
    task: "Imprimez un bloc en PLA ou reprenez votre référence PLA. Précisez la question à laquelle il répond. Si le PLA manque, utilisez le PETG compatible et signalez la substitution.",
    record: "Le rôle du prototype et les exigences qui restent à vérifier pour la pièce finale.",
  },
  quiz: [
    [
      "Quel exercice convient au PLA dans ce cours ?",
      "Un prototype de forme",
      "Une qualification universelle de charge",
      "Une preuve automatique de tenue à chaud",
      "Un prototype peut répondre à une question limitée.",
    ],
    [
      "La politique PLA de 3D3D est-elle une règle scientifique universelle ?",
      "Non, c’est un choix d’atelier",
      "Oui, pour toute pièce",
      "Oui, pour tout fabricant",
      "Le cours distingue politique d’atelier et faits concernant les matériaux.",
    ],
    [
      "Le prototype PLA s’ajuste. Qu’est-ce qui reste ouvert ?",
      "Le comportement du matériau final",
      "Rien",
      "Seulement sa couleur",
      "L’ajustement ne démontre pas les performances en service.",
    ],
    [
      "Que doit porter l’échantillon ?",
      "Son objectif et la mention prototype",
      "Une charge garantie inventée",
      "Aucune identification",
      "Identifiez clairement ce que l’essai démontre.",
    ],
    [
      "D’où viennent les paramètres de départ ?",
      "Des consignes compatibles des fabricants",
      "D’un chiffre universel",
      "De la température ambiante seule",
      "Les formulations et les machines diffèrent.",
    ],
  ],
});
const reading: ReadingSection[] = [
  {
    title: "Donner au prototype une question précise",
    sources: ["pla", "design"],
    paragraphs: [
      "Un prototype est utile lorsqu’il répond à une question avant d’engager davantage de temps et de matière. Une maquette en PLA peut montrer si une poignée reste accessible, si un capot occupe le bon espace ou si une inscription se lit à la taille prévue. Inscrivez cette question sur l’étiquette. Une consigne vague comme tester la pièce invite à des conclusions que l’exercice ne permet pas. Vérifier l’accès avec une maquette immobile diffère d’une évaluation de chocs, d’efforts répétés, de chaleur ou de fixation sous charge.",
      "Imaginez un cache pour le passage d’un câble dans un bureau. La première version peut vérifier son contour et le passage du câble. Si l’usage final impose une zone chaude ou une languette sollicitée, ces exigences restent séparées. Gardez le dessin et le matériau final envisagé avec le relevé. Lorsque la maquette s’ajuste, notez cet ajustement précis plutôt que validé pour utilisation. Vous pourrez ainsi profiter de l’essai sans transformer accidentellement son matériau et son procédé en spécification définitive pour un autre contexte.",
    ],
  },
  {
    title: "Profiter d’un matériau accessible pour apprendre",
    sources: ["pla", "materialtable", "first"],
    paragraphs: [
      "Le PLA est fréquemment employé pour débuter et réaliser rapidement des prototypes parce qu’il est relativement abordable à imprimer. Cette facilité permet de concentrer l’attention sur la première couche, les parois et les dimensions. Elle ne dispense pas d’un profil compatible, d’une surface adaptée et d’un espace préparé. Consultez les consignes de la bobine exacte et de la machine plutôt qu’une température générique trouvée dans un tableau. Une référence simple permet aux prochaines leçons de comparer leurs observations à un échantillon dont vous connaissez réellement la préparation.",
      "Un changement de couleur, de mélange ou de marque mérite encore une note. L’appellation PLA recouvre différentes formulations et destinations. Si une fiche technique existe, conservez son adresse et lisez les conditions associées aux propriétés annoncées. La température d’extrusion n’est pas la température admissible en service : ces valeurs décrivent des situations différentes. Une surface régulière renseigne sur l’aspect, pas sur la résistance aux chocs ou la liaison entre couches. Cette distinction reste nécessaire même si toutes vos impressions précédentes semblaient réussies et qu’aucun défaut n’était immédiatement visible.",
    ],
  },
  {
    title: "Séparer la politique de l’atelier du choix technique",
    sources: ["pla", "materialtable", "safety"],
    paragraphs: [
      "Dans le parcours 3D3D présenté ici, le PLA sert à apprendre et à prototyper. Les pièces client sont étudiées en PETG ou dans un autre matériau correspondant aux besoins. C’est une politique déclarée de l’atelier, pas l’affirmation que tout objet en PLA serait impropre à tout usage pratique. Remplacer le PLA par du PETG ne valide pas davantage une conception à lui seul. La décision commence par l’environnement, la géométrie et les conséquences d’une défaillance. Les exercices débutants écartent volontairement les usages qu’un petit essai d’atelier ne peut qualifier.",
      "Demandez-vous ce qui change lorsqu’une maquette quitte un bureau pour un véhicule, l’extérieur ou un assemblage sollicité longtemps. Température, lumière, produits chimiques et durée peuvent compter même si la forme est identique. Au lieu d’improviser un essai spectaculaire à domicile, formulez l’exigence du produit final et identifiez les preuves qui pourraient y répondre. Certaines pièces demandent une expertise ou un autre procédé. Limiter les conclusions du prototype facilite cette décision : vous savez quelles questions géométriques sont déjà renseignées et quelles questions de matériau restent ouvertes.",
    ],
  },
  {
    title: "Conserver un échantillon d’apprentissage identifiable",
    sources: ["pla", "petg", "first"],
    paragraphs: [
      "Reprenez le premier bloc ou imprimez-en un autre avec la même configuration PLA prise en charge. Indiquez matériau, profil, révision et date. Repérez la base et une dimension mesurée, puis les détails visuels qui serviront aux comparaisons. Rangez-le dans un environnement qui ne risque pas de le modifier avant observation. Si la pièce se déforme ou s’abîme, notez-le au lieu de la conserver comme référence inchangée. Le bloc et son relevé fonctionnent ensemble : sans identification, il ne peut expliquer ni comment il a été fabriqué ni ce qu’il démontre.",
      "Si la machine disponible est déjà préparée pour un PETG compatible, vous pouvez effectuer l’exercice de méthode avec ce matériau et étiqueter la substitution. Ne changez pas un matériel ou une surface inconnue uniquement pour respecter un mot de la leçon. Le relevé doit dire ce qui a été imprimé et quelles observations propres au PLA n’ont pas eu lieu. Terminez par deux phrases : l’une décrit ce que le prototype permet de conclure, l’autre une exigence qu’il ne vérifie pas. Elles évitent qu’un résultat encourageant devienne une promesse trop large.",
    ],
  },
];
export default { lesson: content, reading };
