import { frenchLesson } from "./lesson";
import type { ReadingSection } from "../types";
const content = frenchLesson(12, {
  summary:
    "Le PETG peut convenir à une pièce pratique si le grade, le profil et le plateau correspondent au projet. Vérifiez adhérence et retrait : une liaison excessive peut endommager une surface incompatible. Cette leçon gratuite prépare un petit essai aux conclusions limitées. Aucun fichier n’est téléversé; votre progression reste enregistrée sur votre appareil.",
  learn: "Préparer un essai PETG avec une surface compatible et une conclusion limitée à l’observation.",
  steps: [
    "Consultez ensemble les recommandations du filament et la compatibilité du plateau. Confirmez si la surface exige une couche séparatrice.",
    "Commencez par un petit échantillon avant une grande empreinte. Respectez refroidissement et retrait au lieu de forcer la pièce.",
    "Examinez première couche, fils et finition. Notez bobine et profil pour disposer d’une référence lors d’un réglage ultérieur.",
    "Définissez l’usage et évaluez la pièce réelle. Le seul nom PETG ne garantit ni contact alimentaire, ni étanchéité, ni tenue thermique, ni capacité de charge.",
  ],
  mistakes: [
    "Appliquer de la colle uniquement parce qu’un guide général le recommande.",
    "Transformer un nom de matériau en certification d’un usage.",
  ],
  practice: {
    task: "Imprimez un petit bloc en PETG sur une surface autorisée. Consignez la préparation du plateau et la façon dont la pièce refroidie se libère.",
    record: "Matériau, profil, traitement du plateau, résultat du retrait et usages encore non vérifiés.",
  },
  quiz: [
    [
      "Pourquoi vérifier l’association PETG et plateau ?",
      "L’adhérence peut être excessive",
      "La couleur change la licence",
      "Le plateau n’a aucun effet",
      "Une association inadéquate peut endommager la surface au retrait.",
    ],
    [
      "Le PETG garantit-il le contact alimentaire ?",
      "Non",
      "Oui, toujours",
      "Oui, si la pièce est claire",
      "Le nom de matériau ne qualifie pas l’application.",
    ],
    [
      "Quel essai précède une grande empreinte ?",
      "Un petit essai compatible",
      "Une pièce maximale sans contrôle",
      "Un changement de toutes les valeurs",
      "Commencez avec une vérification limitée et identifiable.",
    ],
    [
      "Quand employer une couche séparatrice ?",
      "Quand la procédure matériau et surface le demande",
      "Toujours sans exception",
      "Seulement selon la couleur",
      "Suivez les consignes de compatibilité documentées.",
    ],
    [
      "Que noter pour pouvoir recommencer ?",
      "La préparation et le résultat du retrait",
      "Seulement le nom de l’objet",
      "Uniquement une photo publicitaire",
      "La préparation doit pouvoir être reproduite.",
    ],
  ],
});
const reading: ReadingSection[] = [
  {
    title: "Considérer ensemble filament et surface",
    sources: ["petg", "surface", "sheets"],
    paragraphs: [
      "Le PETG constitue un candidat utile pour des pièces pratiques, mais la bobine ne représente qu’une partie du procédé. Vérifiez grade, profil et surface exacte ensemble. Un plateau qui convenait au PLA peut réagir autrement avec du PETG. La première question n’est pas comment obtenir l’adhérence maximale : il faut maintenir le travail pendant le dépôt puis libérer la pièce sans dommage. Consultez la compatibilité décrite par le fabricant du plateau avant de charger un grand objet dont le retrait pourrait devenir beaucoup plus difficile.",
      "La couche séparatrice dépend de la combinaison. Dans certains cas approuvés, elle évite une liaison trop forte; dans d’autres, la méthode prescrite diffère. N’appliquez pas une colle parce qu’un autre opérateur la présente comme astuce d’adhérence. Notez le produit et la procédure prévus pour votre surface, y compris nettoyage et refroidissement. Si vous ne pouvez pas identifier le plateau, résolvez ce point avant de choisir un traitement chimique. Un aspect lisse, brillant ou texturé ne suffit pas à identifier un revêtement ni à déterminer sa méthode de retrait.",
    ],
  },
  {
    title: "Révéler les difficultés avec un essai modeste",
    sources: ["petg", "first", "string"],
    paragraphs: [
      "Choisissez un bloc simple dont l’empreinte reste modeste. Gardez une forme facile à examiner et la référence prise en charge. Observez la première couche, puis la pièce refroidie et son retrait. Distinguez lignes qui n’adhèrent pas, pièce restée plane et force de retrait inattendue : ce sont trois observations différentes. Un travail parfaitement maintenu mais dont le retrait abîme le plateau ne constitue pas une bonne combinaison pour la répétition. L’évaluation doit inclure toute la séquence nécessaire pour obtenir un objet manipulable, pas uniquement la durée du dépôt.",
      "Ne modifiez pas plusieurs paramètres pour obtenir immédiatement l’aspect d’un ancien échantillon PLA. Confirmez d’abord matériel, état du filament et profil. Décrivez ensuite le problème précis : fils entre des détails ou dessous marqué par un support, par exemple. Le bloc ne révèle pas tous les comportements d’une future conception, mais il fournit un départ documenté. Conservez l’identification exacte de la bobine et du profil. Une comparaison ultérieure ne doit pas mêler sans le dire changements de marque, de couleur, d’humidité et de réglages d’impression.",
    ],
  },
  {
    title: "Définir ce que la pièce doit supporter",
    sources: ["petg", "design", "orientation"],
    paragraphs: [
      "Une documentation matière décrit des tendances et des conditions de traitement; elle ne certifie pas votre géométrie. Une boîte qui retient l’eau brièvement ne démontre pas une étanchéité durable. Une équerre qui survit à un assemblage doux ne possède pas encore une charge admissible. Pour un prototype de bureau, taille, accès et absence de dommage visible peuvent constituer des premiers critères. Écrivez-les. Chaleur, efforts répétés, contact alimentaire ou autre exigence spéciale doivent rester ouverts tant que la conception et son procédé n’ont pas les preuves appropriées.",
      "Prenez l’exemple d’un petit guide de câble. Vérifiez le passage du câble, l’accès à la fixation et les bords susceptibles de l’abîmer lors d’une manipulation ordinaire. Changer de matériau ne supprime pas un bord coupant ni un mauvais trajet de charge. Dessinez comment les efforts passent dans la fixation et choisissez l’orientation en conséquence. Les leçons sur l’ajustement et l’orientation peuvent préciser l’essai. Le nom du polymère ne remplace jamais les décisions de conception et les contrôles que demande encore l’objet physique réel.",
    ],
  },
  {
    title: "Transformer l’essai en note réutilisable",
    sources: ["sheets", "surface", "materialtable"],
    paragraphs: [
      "Le relevé PETG doit identifier plateau, préparation autorisée, profil, filament et retrait. Une photo ou une description du dessous relie le traitement de surface au résultat visible. Si la libération pose problème, conservez cette observation et consultez les consignes avant d’augmenter l’empreinte. Ne prenez pas simplement un outil plus tranchant sans comprendre la surface. L’intérêt du petit échantillon est justement de faire apparaître une difficulté de manipulation avant qu’une grande pièce ne la rende plus compliquée à gérer et plus coûteuse en cas de dommage.",
      "Terminez avec une phrase limitée, par exemple une description de la planéité du bloc et de son retrait par la méthode prescrite après refroidissement. Employez vos observations : l’exemple n’est pas un résultat à recopier. Ajoutez les contrôles encore nécessaires pour la vraie pièce. Si l’équipement disponible ne prend pas en charge le PETG, consignez ce qui manque et laissez l’essai physique en attente. Le cours peut quand même vous aider à préparer le choix du matériau. Une décision honnête sur la préparation vaut mieux qu’un substitut présenté plus tard comme preuve sur le PETG.",
    ],
  },
];
export default { lesson: content, reading };
