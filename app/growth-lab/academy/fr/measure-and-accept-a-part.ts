import { frenchLesson } from "./lesson";
import type { ReadingSection } from "../types";
const content = frenchLesson(34, {
  summary:
    "Définissez les exigences avant l’inspection, mesurez la pièce refroidie puis séparez valeurs nominales et lectures réelles. Chaque critère reçoit un résultat accepté, refusé ou non résolu. Cette leçon gratuite construit un relevé limité, sans qualification générale du produit. Aucun fichier n’est téléversé; vos mesures et votre progression restent sur votre appareil.",
  learn: "Rédiger une décision d’acceptation simple, observable et liée à ses preuves.",
  steps: [
    "Choisissez les dimensions ou comportements importants avant de décider. Pour un bloc, relevez par exemple taille générale, base plane et fissures visibles.",
    "Utilisez un outil adapté sur la pièce refroidie. Vérifiez son zéro et mesurez la même zone régulièrement, sans comprimer un échantillon souple.",
    "Inscrivez les lectures réelles séparément des cotes du dessin. Répétez une mesure douteuse avant de modifier la géométrie ou le profil.",
    "Donnez à chaque exigence un résultat accepté, refusé ou non résolu. Distinguez aspect, ajustement, charge, chaleur et comportement dans la durée.",
  ],
  mistakes: [
    "Noter uniquement la dimension prévue dans la CAO.",
    "Présenter quelques contrôles comme une qualification complète du produit.",
  ],
  practice: {
    task: "Imprimez ou réutilisez un cube de 20 × 20 × 20 mm. Mesurez ses trois directions et inspectez la base. Enregistrez les lectures sans présupposer un résultat favorable.",
    record: "Tableau nominal/réel, outil utilisé et conclusion limitée aux contrôles effectués.",
  },
  quiz: [
    [
      "Quand choisir les exigences importantes ?",
      "Avant la décision d’inspection",
      "Après avoir choisi la meilleure pièce",
      "Jamais",
      "Définissez la réussite avant de juger le résultat.",
    ],
    [
      "Quelle valeur est une mesure réelle ?",
      "La lecture de l’outil sur la pièce",
      "La cote CAO seule",
      "Le nom du modèle",
      "La mesure porte sur l’objet physique.",
    ],
    [
      "Qu’est-ce qui peut fausser la lecture d’une pièce souple ?",
      "La comprimer",
      "Noter les unités",
      "Lire la notice",
      "La technique de mesure influence le résultat.",
    ],
    [
      "Que faire d’une lecture défavorable ?",
      "La conserver dans le relevé",
      "L’effacer",
      "La remplacer par la cote",
      "Un dossier utile préserve aussi les échecs.",
    ],
    [
      "Une dimension correcte prouve-t-elle la résistance à la chaleur ?",
      "Non",
      "Toujours",
      "Si elle est précise",
      "Des exigences différentes demandent des preuves différentes.",
    ],
  ],
});
const reading: ReadingSection[] = [
  {
    title: "Poser la question avant le résultat",
    sources: ["design", "orientation", "flow"],
    paragraphs: [
      "Une inspection compare une pièce à une exigence. Décidez quelles dimensions, surfaces ou fonctions comptent avant de chercher un résultat flatteur. Pour le bloc, relevez trois dimensions, planéité de base et fissures visibles. Pour un assemblage, un détail d’ajustement peut importer davantage qu’une arête extérieure. Gardez des critères modestes et observables. Si l’exercice n’a aucune tolérance numérique justifiée, enregistrez les mesures sans inventer après coup une plage qui rendrait le spécimen acceptable. L’absence de critère ne doit pas devenir une autorisation de choisir arbitrairement la réussite.",
      "Séparez apparence, dimensions et performances d’usage. Une paroi lisse peut avoir une mauvaise taille. Une pièce de bonne dimension peut être endommagée. Aucun de ces constats ne démontre un comportement sous chaleur ou sous charge. Placez ces catégories sur des lignes distinctes pour qu’une réussite n’efface pas une question ouverte ailleurs. Le statut doit rester clair pour l’usage prévu, y compris lorsqu’il est non résolu. Cela renseigne davantage qu’une étiquette générale de bonne impression qui n’explique ni les contrôles faits ni leurs limites.",
    ],
  },
  {
    title: "Mesurer de façon répétable",
    sources: ["design", "flow"],
    paragraphs: [
      "Attendez l’état approprié de manipulation et de mesure, puis choisissez un outil compatible avec le détail et la résolution nécessaire. Contrôlez zéro et état selon sa notice. Placez-le régulièrement sur les mêmes faces, sans serrer une matière souple. Une rugosité, une cicatrice de support ou une lèvre initiale peut modifier le contact des becs. Notez méthode et zone, pas seulement le nombre. Si l’outil n’atteint pas correctement une cote intérieure, marquez-la non mesurée ou choisissez une autre méthode au lieu de la deviner depuis l’extérieur.",
      "Répétez une lecture douteuse avant de changer le dessin. Repositionnez prudemment l’outil pour vérifier l’influence de votre geste tout en mesurant le même détail défini. Gardez unités et lectures originales. La résolution affichée ne démontre pas l’exactitude de la mesure : davantage de décimales ne signifie pas automatiquement davantage de confiance. Ici, l’objectif est un tableau nominal/réel honnête. Il peut révéler une question à approfondir sans présenter une observation d’atelier comme un certificat d’étalonnage ni attribuer à l’instrument une précision qui n’a pas été établie.",
    ],
  },
  {
    title: "Interpréter un écart sans surcorriger",
    sources: ["design", "orientation", "flow"],
    paragraphs: [
      "Supposons un dessin fictif à 20,00 mm et une lecture à 20,12 mm. L’écart est de +0,12 mm. Ce calcul ne dit pas accepté ou refusé tant qu’un critère justifié manque. Un bloc décoratif et une glissière peuvent permettre des variations différentes. Ne redimensionnez pas tout le modèle pour une seule cote. Vérifiez d’abord méthode, forme locale, orientation et répétabilité de l’écart. Une correction avantageuse sur une face peut déplacer un autre détail déjà satisfaisant, et remplacer un problème limité par un ensemble de nouvelles incertitudes.",
      "Pour deux pièces assemblées, considérez leurs deux dimensions. Ouverture et tenon peuvent varier : un jeu nominal seul ne décrit pas toutes les paires possibles. Le calcul de plage de la leçon d’ajustement illustre cette relation avec des hypothèses. La variation réelle demande des relevés réels. Quelques échantillons suggèrent un problème ou un prochain essai, mais ne prouvent pas une capacité statistique robuste du procédé. Gardez le nombre observé visible et ne transformez pas le meilleur exemplaire d’un lot en promesse sur toute production future.",
    ],
  },
  {
    title: "Rendre la décision visible",
    sources: ["design", "safety", "orientation"],
    paragraphs: [
      "Pour chaque exigence, inscrivez accepté, refusé ou non résolu avec l’observation associée. Séparez cote nominale et lecture, avec leurs unités. Identifiez ou isolez une pièce refusée afin de ne pas la confondre avec un spécimen accepté. Le nettoyage ne doit pas effacer une fissure ou un bord manquant du dossier. Si une révision est nécessaire, nommez la modification de géométrie ou de procédé et gardez l’état précédent. L’inspection suivante compare ainsi deux versions identifiées au lieu de dépendre du souvenir imprécis de la première pièce.",
      "Terminez avec trois lectures du cube, outil, observation de base et conclusion limitée. Vous pouvez déclarer les contrôles réellement effectués et leurs résultats. Le relevé de cours ne prouve ni qualification de produit ni inspection indépendante. Pour un usage demandant une évaluation mécanique, thermique, électrique, de contact ou réglementaire, inscrivez cette exigence séparément et obtenez l’expertise appropriée. L’habitude à conserver est simple : l’acceptation suit une preuve comparée à une exigence, tandis qu’une preuve manquante reste visible et ne se transforme pas silencieusement en résultat favorable.",
    ],
  },
];
export default { lesson: content, reading };
