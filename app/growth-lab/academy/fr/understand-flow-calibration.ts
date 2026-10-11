import { frenchLesson } from "./lesson";
import type { ReadingSection } from "../types";
const content = frenchLesson(18, {
  summary:
    "L’étalonnage du débit ajuste la quantité d’extrusion demandée lorsque le procédé fonctionne correctement. Il ne répare ni buse obstruée ni alimentation interrompue. Cette leçon gratuite distingue aussi multiplicateur et demande volumique à partir de calculs simples, puis prépare une comparaison ciblée. Aucun fichier n’est téléversé; vos réponses restent sur votre appareil.",
  learn: "Reconnaître les conditions où une comparaison contrôlée de débit est pertinente.",
  steps: [
    "Confirmez profil, état du filament et liberté du trajet d’alimentation. Une extrusion qui s’interrompt ou saute demande d’abord un diagnostic.",
    "Examinez le dessus d’un petit échantillon de référence. Décrivez espaces et bourrelets sans supposer immédiatement leur cause.",
    "Si le fabricant le recommande, suivez sa procédure de débit. Modifiez uniquement le réglage prévu et conservez sa valeur initiale.",
    "Comparez dans le même éclairage et retenez l’ajustement compatible utile. N’empilez pas sans explication des multiplicateurs du trancheur et du micrologiciel.",
  ],
  mistakes: [
    "Augmenter le débit pour masquer une obstruction partielle.",
    "Oublier que plusieurs multiplicateurs actifs peuvent se combiner.",
  ],
  practice: {
    task: "Imprimez un bloc de 25 × 25 × 5 mm avec la référence. Un second essai de débit n’est justifié que par un symptôme répétable et une procédure compatible.",
    record: "L’observation initiale, les modificateurs actifs, le changement éventuel et son résultat.",
  },
  quiz: [
    [
      "Que modifie un multiplicateur d’extrusion ?",
      "La quantité de matière demandée",
      "Le diamètre physique de la buse",
      "La licence du modèle",
      "Il intervient dans le calcul de matière à fournir.",
    ],
    [
      "La buse est partiellement obstruée. Que faire d’abord ?",
      "Diagnostiquer l’obstruction",
      "Augmenter fortement le débit",
      "Ignorer l’alimentation",
      "Un réglage fin suppose un procédé en état.",
    ],
    [
      "Les multiplicateurs du logiciel et du micrologiciel peuvent-ils interagir ?",
      "Oui",
      "Non",
      "Seulement selon la couleur",
      "Leur combinaison peut masquer le changement effectif.",
    ],
    [
      "Que conserver pour comparer les surfaces ?",
      "La matière et les conditions d’observation",
      "Seulement le nom des fichiers",
      "Aucune condition",
      "La comparaison exige des conditions cohérentes.",
    ],
    [
      "Un réglage manuel du débit est-il obligatoire sur chaque nouvelle machine ?",
      "Non, suivez ses consignes",
      "Oui, toujours",
      "Seulement si elle est chère",
      "Une référence compatible peut ne demander aucune modification manuelle.",
    ],
  ],
});
const reading: ReadingSection[] = [
  {
    title: "Séparer quantité commandée et panne d’alimentation",
    sources: ["flow", "under", "firstlayer"],
    paragraphs: [
      "Le multiplicateur d’extrusion change la quantité commandée. Il sert à un ajustement fin lorsque le reste du procédé est correct, sans rendre acceptable un trajet obstrué ou un profil incompatible. Vérifiez d’abord buse physique, matériau, préparation et réglages pris en charge. Si l’extrusion s’arrête, saute fortement ou change soudain en cours de pièce, suivez le diagnostic de manque de matière. Augmenter un multiplicateur peut atténuer une manifestation du défaut tout en laissant la cause présente et en créant un excès ailleurs sur l’objet.",
      "Regardez le dessus du bloc sous une lumière constante. Décrivez espaces, surépaisseurs ou chevauchements sans nommer immédiatement la cause. Des apparences proches peuvent résulter de la première couche, de l’alimentation ou d’autres choix. Précisez si le défaut concerne seulement la base, toute une paroi ou la fermeture supérieure : cet emplacement compte. Un exercice de surface ne justifie pas de modifier l’étalonnage fondamental des mouvements ni de copier des commandes de micrologiciel destinées à un autre matériel. Le prochain contrôle doit rester lié au symptôme observé.",
    ],
  },
  {
    title: "Ne pas confondre multiplicateur et débit volumique",
    sources: ["flow", "maxflow"],
    paragraphs: [
      "Un multiplicateur s’exprime souvent en rapport ou en pourcentage. Un système peut comporter une valeur dans le trancheur et une autre dans le micrologiciel. Des modifications inexpliquées des deux se combinent. Pour un exemple purement arithmétique, 0,98 multiplié par 1,02 donne 0,9996 et non exactement 1,00. Ces valeurs fictives expliquent pourquoi noter ensemble les réglages actifs; elles ne constituent pas une recommandation. Employez l’emplacement d’ajustement prévu par le fabricant et laissez les autres modificateurs à leur référence connue afin que la comparaison garde un sens clair.",
      "Le débit volumique décrit une quantité différente : un volume par unité de temps. Une approximation de cordon rectangulaire multiplie largeur, hauteur et vitesse. Ainsi, 0,45 mm × 0,20 mm × 50 mm/s donne 4,5 mm³/s. Le modèle réel de cordon du trancheur peut différer de ce rectangle simplifié. Le calcul explique pourquoi une ligne plus large, plus haute ou plus rapide demande davantage de matière par seconde. Il ne mesure pas la limite de fusion du matériel. Conservez les unités : mm/s et mm³/s ne se comparent pas directement.",
    ],
  },
  {
    title: "Effectuer uniquement l’ajustement compatible",
    sources: ["flow", "teaching", "viewer"],
    paragraphs: [
      "Si le symptôme se répète et que le fabricant recommande un étalonnage, utilisez sa méthode avec une éprouvette adaptée. Gardez géométrie, état de matière, vitesse, température et observation constants. Notez valeur de départ et unique nouvelle valeur. Respectez la comparaison visuelle ou la mesure prescrite, ainsi que ses limites. Ne combinez pas une méthode d’épaisseur de paroi issue d’un profil avec les hypothèses d’un autre sans comprendre les trajets générés. Une lecture au pied à coulisse prend son sens seulement si vous identifiez le détail et la construction qu’elle mesure.",
      "Comparez le nouvel échantillon à la référence en regardant plus qu’une région avantageuse. Un bourrelet réduit peut être utile, mais espaces, liaisons irrégulières et reprises dégradées ailleurs demandent aussi une observation. Si le bénéfice n’est pas clair, rétablissez la référence. Gardez les deux pièces étiquetées : une série de cubes anonymes ne permet pas de relier réglage et effet. Ne choisissez pas la photo la plus flatteuse en oubliant une zone ratée. Vous cherchez une décision de procédé utilisable, pas seulement une image de démonstration réussie.",
    ],
  },
  {
    title: "S’arrêter à une conclusion limitée",
    sources: ["flow", "under", "maxflow"],
    paragraphs: [
      "Vous pouvez conclure qu’un changement compatible a amélioré le dessus observé pour la matière et l’installation enregistrées. Vous ne pouvez pas conclure à une résistance supérieure sans essai séparé approprié. Un dessus lisse ne prouve pas non plus que toutes les zones internes sont correctes ou que la pièce est étanche. Gardez ces exigences distinctes. Si la correction paraît très importante, examinez le matériel et consultez les consignes plutôt que d’adopter un multiplicateur extrême comme profil permanent pour toutes les impressions futures.",
      "Le relevé comporte une description initiale, la procédure, les modificateurs actifs, le changement éventuel et le résultat. Si la référence convient déjà, écrivez-le et conservez-la. Ne créez pas un second essai fictif pour remplir une table. Si l’alimentation fonctionne mal, notez que l’étalonnage est reporté et quelle vérification le précède. Comprendre pourquoi attendre fait partie de la maîtrise du réglage. Cela évite qu’un ajustement fin remplace l’entretien d’un système d’alimentation en état ou que la quantité demandée serve à masquer une limite physique jamais examinée.",
    ],
  },
];
export default { lesson: content, reading };
