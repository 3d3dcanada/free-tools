import { frenchLesson } from "./lesson";
import type { ReadingSection } from "../types";
const content = frenchLesson(33, {
  summary:
    "Choisissez une fixation en considérant l’accès, les dimensions réelles et les efforts transmis dans le plastique. Un écrou accessible peut simplifier un premier assemblage sans insertion chauffée. Cette leçon gratuite vérifie un petit montage, sans inventer de couple admissible. Aucun fichier n’est téléversé; vos mesures et réponses restent sur votre appareil.",
  learn: "Préparer une fixation accessible et vérifiable sans lui attribuer une résistance non mesurée.",
  steps: [
    "Déterminez si le montage doit être ouvert plusieurs fois et si les deux faces sont accessibles. Dessinez le passage des efforts dans la fixation et le corps imprimé.",
    "Comparez vis traversante et écrou à un insert ou à un filetage imprimé. Un écrou accessible évite une opération chauffée lors du premier exercice.",
    "Utilisez les dimensions du fournisseur et un jeu testé. Prévoyez la matière autour de la fixation selon la conception et vérifiez le montage réel.",
    "Assemblez doucement avec les outils adaptés; arrêtez en cas de fissure ou déformation. Une insertion chauffée exige ses propres consignes, son outil et la prévention des brûlures.",
  ],
  mistakes: [
    "Copier le couple d’essai d’un autre spécimen comme valeur admissible.",
    "Serrer davantage pour compenser une jonction mal ajustée.",
  ],
  practice: {
    task: "Créez un petit bloc avec trou traversant et logement d’écrou accessible, à partir de visserie que vous possédez. Essayez un montage doux, sans essai destructif improvisé.",
    record: "Dimensions de la visserie, jeu essayé et positionnement observé.",
  },
  quiz: [
    [
      "Que considérer en plus du diamètre du filetage ?",
      "L’accès et le passage des efforts",
      "Seulement la couleur",
      "Le nom du dossier",
      "Le montage entier doit avoir une géométrie praticable.",
    ],
    [
      "Qu’est-ce qui peut éviter une insertion chauffée ?",
      "Un écrou accessible",
      "Une buse plus chaude",
      "Une photo",
      "Une vis traversante avec écrou peut simplifier l’exercice.",
    ],
    [
      "Un insert métallique supprime-t-il les ruptures du plastique ?",
      "Non",
      "Toujours",
      "Si le métal brille",
      "Le corps imprimé reste une partie de la jonction.",
    ],
    [
      "Peut-on reprendre comme garantie le couple d’un autre spécimen ?",
      "Non",
      "Toujours",
      "Sans connaître la matière",
      "Géométrie, matériau et procédé influencent le résultat.",
    ],
    [
      "Le plastique commence à fissurer. Que faire ?",
      "Arrêter et revoir le montage",
      "Serrer davantage",
      "Peindre la fissure",
      "Un dommage impose une nouvelle évaluation.",
    ],
  ],
});
const reading: ReadingSection[] = [
  {
    title: "Dessiner efforts et ordre de montage",
    sources: ["fasteners", "design"],
    paragraphs: [
      "La jonction comprend fixation, plastique environnant et appuis des pièces assemblées. Dessinez où l’effort entre et où il ressort. Un insert métallique ne rend pas infiniment résistant le plastique voisin. Un logement d’écrou peut se déformer même si la vis reste intacte. Commencez par l’usage et les conséquences d’une rupture, puis limitez l’exercice à un petit objet de bureau. Une liaison chargée, critique ou exigeante ne reçoit aucune qualification par ce cours : elle demande une conception et des essais adaptés séparément à sa fonction réelle.",
      "Dessinez également l’assemblage. Pouvez-vous atteindre les deux côtés et engager les outils dans tête et écrou ? Faudra-t-il ouvrir régulièrement la connexion ? Une vis traversante avec écrou accessible peut éviter le chauffage et faciliter l’inspection. Insert ou filetage imprimé peuvent convenir ailleurs, mais demandent d’autres géométries et procédés. Ne choisissez pas uniquement pour cacher la visserie. Accès, répétabilité et visibilité du bon appui sont des exigences pratiques. Une fixation élégante dans la vue CAO ne suffit pas si aucun outil ne peut la monter correctement.",
    ],
  },
  {
    title: "Utiliser les dimensions de la vraie visserie",
    sources: ["design", "fasteners", "firstlayer"],
    paragraphs: [
      "Mesurez la visserie disponible ou consultez les dimensions de son fournisseur. Une désignation de filetage ne décrit pas toutes les tailles de tête, d’écrou ou d’insert. Dessinez trou, logement et dégagement d’outil avec une marge explicitement destinée à l’essai. Ne copiez pas une poche provenant d’une autre norme sans vérifier. Gardez référence ou plan du produit avec la source CAO. Une petite éprouvette peut révéler un mauvais ajustement ou un logement inaccessible avant d’imprimer le corps complet et ses autres détails.",
      "Imprimez l’éprouvette dans la matière et l’orientation prévues, puis inspectez les formes refroidies. Présentez doucement la visserie et notez son appui sans dommage. Une lèvre de première couche ou un contact de support rugueux peut gêner l’entrée malgré une largeur nominale suffisante. Recherchez le défaut local plutôt que de redimensionner tout l’objet. Pour un insert, utilisez le trou recommandé et la procédure du produit précis, puis vérifiez dans votre procédé. Une silhouette déduite d’une photo ne remplace pas les exigences dimensionnelles de ce composant.",
    ],
  },
  {
    title: "Séparer les méthodes d’installation",
    sources: ["fasteners", "safety", "orientation"],
    paragraphs: [
      "Vis traversante, filetage imprimé et insert chauffé sont des systèmes différents. Le premier exercice utilise des outils manuels et un accès visible. L’insert chauffé ajoute température, profondeur, alignement et refroidissement, avec une procédure et une prévention des brûlures propres. N’enfoncez pas un objet chaud quelconque dans un trou comme raccourci. Si outil et consignes manquent, réalisez le montage avec écrou et indiquez que l’insertion n’a pas été effectuée. Cette limite décrit honnêtement l’apprentissage accompli, sans transformer l’absence d’équipement en essai improvisé et difficile à maîtriser.",
      "Le serrage dépend de la conception et de la visserie réelles. Le cours ne fournit aucun couple universel pour un corps imprimé. Arrêtez si celui-ci fissure, si le logement se déforme ou si la fixation tourne sans prendre appui. Forcer pour corriger un mauvais ajustement peut détruire la pièce et les indices utiles. Un essai publié sur une autre géométrie renseigne sur des modes de rupture possibles; son couple ou sa charge maximale ne devient pas votre valeur admissible. Matière, orientation, pose et conditions d’essai restent déterminantes.",
    ],
  },
  {
    title: "Inspecter et préciser les limites",
    sources: ["fasteners", "design", "safety"],
    paragraphs: [
      "Sur le bloc pédagogique, vérifiez les contacts de tête et d’écrou, l’alignement et une éventuelle déformation visible. Notez l’accès et les difficultés d’outil. N’improvisez pas un essai destructif pour obtenir un nombre impressionnant. Un montage doux démontre seulement que cet exemplaire a pu être assemblé dans les conditions observées. Il ne mesure ni durée de vie au démontage répété, ni comportement sous charge prolongée, ni charge de travail sûre. Ces questions exigent une méthode d’essai et des critères correspondant à l’application envisagée.",
      "Gardez identité de la visserie, dimensions, révision CAO, matière, orientation et résultat d’ajustement. Lors d’une révision, identifiez l’ancien spécimen pour éviter de le mélanger au candidat accepté. Formulez la prochaine question : améliorer l’accès, corriger une marge locale, déplacer la liaison ou obtenir une évaluation mécanique appropriée. L’objectif est un montage accessible et inspectable avec des preuves limitées mais claires. Employer du métal ne supprime pas les limites de la structure imprimée qui l’entoure, ni la nécessité de vérifier comment l’ensemble transmet réellement ses efforts.",
    ],
  },
];
export default { lesson: content, reading };
