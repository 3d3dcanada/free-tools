import { frenchLesson } from "./lesson";
import type { ReadingSection } from "../types";
const content = frenchLesson(5, {
  summary:
    "Un journal relie la configuration enregistrée à ce qui s’est réellement passé. Séparez matériel, variable modifiée, prévision et mesure pour comparer les essais sans ambiguïté. Cette leçon gratuite propose un relevé compact que vous gardez vous-même. Aucun fichier n’est téléversé et votre progression dans le cours reste enregistrée dans votre navigateur.",
  learn: "Créer un relevé qui permet de comprendre et de répéter un essai.",
  steps: [
    "Attribuez un identifiant au travail. Notez la version du modèle, l’imprimante, la buse, le plateau, le matériau et le profil sauvegardé.",
    "Avant impression, relevez les prévisions de durée et de consommation. Laissez les valeurs réelles vides tant qu’elles n’ont pas été observées ou mesurées.",
    "Après refroidissement, décrivez le résultat, les dimensions importantes et les défauts visibles. Comparez les échantillons dans les mêmes conditions d’observation.",
    "Pour l’essai suivant, notez un seul changement volontaire et l’effet attendu. Gardez le profil d’origine afin de pouvoir revenir à la référence.",
  ],
  mistakes: [
    "Appeler une masse prévue une masse mesurée.",
    "Changer plusieurs paramètres puis attribuer l’amélioration à celui que l’on préfère.",
  ],
  practice: {
    task: "Préparez une entrée de journal pour le bloc de la première leçon. Complétez les résultats réels après l’essai mené selon la leçon 10.",
    record:
      "Un identifiant, des champs distincts de prévision et de mesure, les unités et une observation concrète.",
  },
  quiz: [
    [
      "Le trancheur annonce 20 g. Quel terme convient ?",
      "Estimation",
      "Masse mesurée",
      "Déchet garanti",
      "Une prévision ne remplace pas une pesée.",
    ],
    [
      "Que conserver avant un réglage ?",
      "Le profil de référence",
      "Seulement la dernière capture",
      "Rien",
      "La référence permet de comparer et de revenir en arrière.",
    ],
    [
      "Qu’est-ce qui rend un essai interprétable ?",
      "Un changement volontaire à la fois",
      "Cinq changements simultanés",
      "L’absence de relevé",
      "Isoler une variable rend la comparaison plus utile.",
    ],
    [
      "Quand remplir les résultats réels ?",
      "Après observation ou mesure",
      "Avant le tranchage",
      "À partir d’une publicité",
      "Ne créez pas une valeur pour remplir une case vide.",
    ],
    [
      "Quel renseignement aide à répéter un essai ?",
      "La buse et le matériau",
      "Seulement le surnom de l’objet",
      "Seulement l’heure",
      "La configuration physique influence le résultat.",
    ],
  ],
});
const reading: ReadingSection[] = [
  {
    title: "Noter la question avant les réglages",
    sources: ["teaching", "viewer"],
    paragraphs: [
      "Le journal doit aider à prendre la prochaine décision. Commencez par une phrase : vérifier si une languette entre dans une rainure, si une paroi présente des manques ou si un autre profil de couche modifie les marches visibles. Sans cette question, une longue liste de paramètres devient un ensemble de chiffres sans objectif. Donnez un identifiant à l’essai et reliez-le à la révision du modèle. Gardez le projet d’origine pour retrouver les valeurs que vous n’avez pas pensé à recopier dans le relevé court.",
      "Consignez l’imprimante, la buse montée, la surface, le grade du matériau et le profil enregistré. Ajoutez ce qui a changé ou pourrait expliquer une différence, par exemple une autre bobine ou un entretien récent. Il n’est pas nécessaire de retranscrire chaque champ du trancheur. Un projet sauvegardé et une note précise sur la variable modifiée sont souvent plus lisibles. Employez des dates et noms cohérents pour relier photo, échantillon et fichier. Si une pièce perd son étiquette, ne l’attribuez pas silencieusement au résultat qui vous semble le plus favorable.",
    ],
  },
  {
    title: "Séparer prévision, mesure et information manquante",
    sources: ["viewer", "cost"],
    paragraphs: [
      "Le trancheur peut annoncer une durée et une consommation avant la fabrication. Ces valeurs vont dans la colonne des estimations. Durée constatée, matière consommée et dimensions vont dans une colonne de mesures seulement après une observation adaptée. Une case vide signifie inconnu; zéro signifie qu’une absence de quantité a été établie. Ne remplacez pas une mesure d’énergie manquante par zéro pour faire fonctionner un calcul de coût. Précisez aussi la méthode : peser la pièce nettoyée et estimer la consommation totale de la bobine ne décrivent pas la même quantité.",
      "Prenons des chiffres fictifs : 30 minutes annoncées et 38 minutes observées pour un cycle. L’écart est de huit minutes, mais il n’identifie pas une panne. Définissez ce que chaque durée inclut : chauffe, étalonnage, dépôt, refroidissement ou manipulation. Comparez les mêmes limites avant d’expliquer la différence. Une prévision comprenant les supports ne se compare pas directement à la masse d’une pièce débarrassée de ses supports. Si vous pesez la bobine avant et après, utilisez la même bobine et la même méthode; changer la tare rend la comparaison trompeuse.",
    ],
  },
  {
    title: "Construire une comparaison qui répond à une question",
    sources: ["teaching", "under", "warp"],
    paragraphs: [
      "Supposons qu’une paroi du bloc semble irrégulière. Si vous changez ensemble température, vitesse, hauteur de couche et matériau, un second bloc plus lisse ne révèle pas quel changement a compté. Conservez une référence et choisissez un ajustement compatible qui répond à l’observation précise. Écrivez l’effet attendu avant l’essai. Ensuite, examinez la même surface sous un éclairage et un angle comparables. Un petit essai d’atelier ne devient pas ainsi une étude de laboratoire, mais le raisonnement reste vérifiable et évite d’inventer une explication après chaque amélioration.",
      "Gardez également les essais décevants. Une baisse de vitesse qui ne change rien apporte une information sur cette hypothèse. Un travail arrêté parce que sa première couche s’est détachée ne constitue pas un bon échantillon pour juger la finition, mais son échec doit rester dans le journal. Notez quand le problème apparaît et ce que vous voyez, puis choisissez la vérification suivante. Évitez une conclusion comme mauvais filament sans preuve permettant d’isoler la matière. Trois espaces sur une paroi ou un coin soulevé tardivement sont des descriptions plus utiles.",
    ],
  },
  {
    title: "Rester simple sans perdre l’essentiel",
    sources: ["teaching", "cost"],
    paragraphs: [
      "Une entrée compacte peut réunir identifiant, question, projet sauvegardé, configuration, prévision, résultat et prochaine action. Ajoutez une photo ou un croquis lorsqu’il explique l’observation. Pour le premier bloc, une dimension et une observation de surface suffisent à pratiquer la méthode. Écrivez l’unité à côté de chaque chiffre. Une longueur sans millimètres ou pouces, ou une durée sans minutes ou heures, devient ambiguë lorsqu’elle est reprise ailleurs. Gardez le même outil et le même procédé de mesure lorsque vous comparez ensuite plusieurs échantillons d’une même série.",
      "Rangez le relevé là où vous pourrez le retrouver après fermeture du navigateur ou du trancheur. Le suivi de l’académie conserve les réponses au questionnaire; il ne stocke pas vos projets, photos et mesures physiques. Exportez la progression si vous voulez une sauvegarde et gardez un dossier de travail distinct. Quelques semaines plus tard, demandez-vous si une autre personne pourrait identifier l’entrée, préparer le même essai et comprendre le résultat sans deviner. Ajoutez la prochaine fois l’information essentielle qui manque, au lieu d’allonger le journal avec des paramètres sans lien avec la question.",
    ],
  },
];
export default { lesson: content, reading };
