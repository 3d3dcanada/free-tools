import { frenchLesson } from "./lesson";
import type { ReadingSection } from "../types";
const content = frenchLesson(10, {
  summary:
    "Commencez par un petit travail vérifié, observez le dépôt initial et arrêtez un échec manifeste selon la procédure prévue. Laissez refroidir, retirez la pièce correctement puis contrôlez son état. Cette leçon gratuite relie préparation et résultat réel. Aucun fichier n’est téléversé; vos réponses et votre relevé de pratique restent sur votre appareil.",
  learn: "Mener un essai supervisé et conserver un résultat honnête, y compris en cas d’échec.",
  steps: [
    "Terminez les contrôles d’espace et de profil des leçons 3 et 6. Retirez anciennes pièces et débris selon la procédure sûre. Confirmez fichier et filament.",
    "Démarrez selon le manuel et observez sans entrer dans la zone mobile. Arrêtez si les lignes se détachent, si la pièce bouge ou si la buse accroche dangereusement.",
    "Assurez le suivi prescrit par le fabricant et le lieu. Une caméra aide à voir mais ne peut pas intervenir physiquement.",
    "Après la fin, attendez le refroidissement indiqué pour le plateau. Utilisez la méthode de retrait autorisée, outils dirigés loin des mains. Examinez dessous, parois et dimensions, puis complétez le journal.",
  ],
  mistakes: [
    "Forcer le retrait d’une pièce encore chaude et fortement collée.",
    "Repousser à la main une pièce détachée pendant que la machine fonctionne.",
  ],
  practice: {
    task: "Imprimez le petit bloc préparé. Utilisez cet échantillon pour compléter, lorsque cela convient, les observations prévues dans les leçons 1 à 9.",
    record:
      "Le résultat réel, la méthode de refroidissement et de retrait, puis une dimension mesurée. Un échec clairement décrit reste un exercice utile.",
  },
  quiz: [
    [
      "La première couche se détache. Quelle réponse est utile ?",
      "Arrêter et rechercher la cause",
      "La tenir pendant le mouvement",
      "Augmenter tous les paramètres",
      "Un départ instable doit être examiné dans un état sûr.",
    ],
    [
      "Quand manipuler une surface flexible pour retirer la pièce ?",
      "Après le refroidissement prescrit",
      "Dès la dernière ligne déposée",
      "Quand la couleur semble bonne",
      "Suivez les consignes de refroidissement et de retrait du fabricant.",
    ],
    [
      "Une caméra distante peut-elle corriger physiquement une panne ?",
      "Non",
      "Oui, toujours",
      "Seulement en haute résolution",
      "Observer et intervenir sont deux capacités différentes.",
    ],
    [
      "Que doit contenir le journal final ?",
      "Le résultat réel",
      "Le résultat souhaité uniquement",
      "Une réussite inventée",
      "Conservez ce qui s’est passé, échecs compris.",
    ],
    [
      "Un premier bloc réussi valide-t-il toutes les pièces futures ?",
      "Non",
      "Oui, tous les matériaux",
      "Oui, toutes les charges",
      "Chaque nouvel usage peut introduire des exigences supplémentaires.",
    ],
  ],
});
const reading: ReadingSection[] = [
  {
    title: "Choisir un premier essai au but clair",
    sources: ["first", "surface", "safety"],
    paragraphs: [
      "Utilisez le bloc préparé dans les leçons précédentes. Il relie les vérifications du projet, du profil et de l’aperçu à un échantillon réel. N’ajoutez pas en même temps une forme complexe, un matériau nouveau et des réglages inconnus. Apportez le journal, la sortie préparée et les consignes de la machine. Confirmez la personne chargée de la supervision et la manière d’arrêter un échec. Un essai court et compréhensible apporte de meilleures observations qu’un objet ambitieux dont les nombreux détails rendent chaque défaut difficile à expliquer.",
      "Avant de lancer, confirmez l’installation et la préparation du plateau, le filament chargé et l’identité du fichier. Enlevez anciennes pièces et débris selon la méthode documentée. Gardez les outils hors du volume de mouvement. Si la buse, le matériau ou une autre donnée de préparation a changé depuis le tranchage, revenez à la vérification du profil. Le démarrage doit découler d’une suite de choix contrôlés, pas de l’idée que la machine a fonctionné hier. Une réussite antérieure sur un autre travail ne remplace pas les contrôles de celui-ci.",
    ],
  },
  {
    title: "Observer la base sans intervenir avec les mains",
    sources: ["adhesion", "warp", "safety"],
    paragraphs: [
      "Regardez le dépôt initial depuis l’extérieur de la zone mobile. Les lignes doivent rester fixées et former l’empreinte attendue. Un fil détaché, une pièce en mouvement ou un contact dangereux de buse justifie la procédure d’arrêt. Ne maintenez pas une impression qui se décolle et ne retirez pas de matière pendant le mouvement. La leçon consacrée à la première couche guidera l’investigation ultérieure. Pour ce premier essai, votre responsabilité immédiate est de reconnaître un échec évident et d’agir correctement, sans tenter un réglage manuel parmi des mécanismes actifs.",
      "Notez le moment où le problème apparaît. Un coin qui n’a jamais adhéré diffère d’un coin initialement plat qui se soulève beaucoup plus tard. Vous n’avez pas à résoudre la cause pendant que l’imprimante fonctionne; une note sur le lieu et le moment suffit pour orienter la suite. Respectez le suivi prévu par le manuel et l’atelier. Si vous devez partir, appliquez la procédure convenue. Une caméra ou une notification complète l’observation sans remplacer la capacité d’intervention ni constituer une autorisation de fonctionnement sans surveillance.",
    ],
  },
  {
    title: "Refroidir et retirer selon la surface réelle",
    sources: ["sheets", "surface", "safety"],
    paragraphs: [
      "Après l’arrêt du mouvement, considérez buse et plateau comme chauds jusqu’aux conditions de manipulation prescrites. Suivez les consignes correspondant au matériau et à la surface. Un plateau fixe, une feuille flexible et différents revêtements peuvent demander des gestes différents. Une méthode vue sur une autre imprimante ne devient pas automatiquement adaptée à la vôtre. Forcer une pièce fortement liée peut abîmer le revêtement ou provoquer un dérapage de l’outil. Si le retrait normal ne fonctionne pas, arrêtez et consultez les instructions plutôt que d’augmenter la force sans diagnostic.",
      "Prévoyez où poser le plateau et la pièce retirés. La zone de manipulation doit être stable et dégagée pour éviter une chute ou une torsion involontaire. Utilisez les outils approuvés avec une direction de travail éloignée des mains. Si la pièce casse au retrait, gardez ce résultat dans le relevé au lieu de décrire seulement le dépôt comme réussi. Le retrait fait partie de la fabrication d’un objet utilisable. Plus tard, le même raisonnement s’appliquera aux supports : terminer les trajets ne garantit pas la survie aux opérations nécessaires après impression.",
    ],
  },
  {
    title: "Contrôler l’échantillon et choisir une suite précise",
    sources: ["bates", "design", "teaching"],
    paragraphs: [
      "Une fois la manipulation possible, examinez séparément base, parois et dessus. Cherchez lignes détachées, matière manquante, fissure évidente ou coin déformé. Comparez une dimension clairement désignée à la valeur prévue avec un instrument adapté. Notez la lecture et son unité sans arrondir vers la valeur souhaitée. Une dimension non mesurée doit rester indiquée comme telle. La photo décrit un aspect visible, mais ne remplace pas la mesure ni ne prouve une capacité de charge ou de température que vous n’avez pas essayée.",
      "Complétez le journal avec résultat, méthode de retrait et prochaine action justifiée par l’observation. Un bloc correct peut permettre de poursuivre vers les matériaux. Une base décollée mène au diagnostic de première couche. Un symptôme confus peut justifier une répétition avec la référence inchangée après une vérification simple. Ne modifiez pas plusieurs valeurs uniquement pour faire une tentative différente. Gardez ce premier échantillon, ou les preuves de son échec, avec le relevé. Il sert de référence d’apprentissage, sans démontrer que toutes les géométries et toutes les utilisations futures fonctionneront.",
    ],
  },
];
export default { lesson: content, reading };
