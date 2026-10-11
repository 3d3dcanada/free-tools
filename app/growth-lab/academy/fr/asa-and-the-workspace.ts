import { frenchLesson } from "./lesson";
import type { ReadingSection } from "../types";
const content = frenchLesson(14, {
  summary:
    "Choisir l’ASA exige aussi de préparer la machine et l’atelier. La stabilité thermique limite certains défauts; la maîtrise des émissions traite une autre question. Une enceinte ordinaire ne prouve pas les deux fonctions. Cette leçon gratuite les examine séparément avant l’essai. Aucun fichier n’est téléversé; vos réponses restent enregistrées localement.",
  learn: "Décider si un essai ASA peut être réalisé sur l’installation disponible.",
  steps: [
    "Vérifiez que machine, plateau et enceinte supportent les conditions demandées par le filament. Un champ de température dans le logiciel ne requalifie pas le matériel.",
    "Consultez la fiche de sécurité et le plan de maîtrise de l’atelier. Garder l’enceinte chaude ne suffit pas pour démontrer la gestion des émissions.",
    "Choisissez une petite forme et les réglages compatibles. Évitez les perturbations thermiques autour de la pièce sans désactiver la ventilation nécessaire.",
    "Examinez bords soulevés et séparation des couches. La durabilité extérieure et la tenue sous charge restent à vérifier pour la conception réelle.",
  ],
  mistakes: [
    "Ajouter une enceinte chauffée improvisée sans validation de compatibilité.",
    "Prendre un échantillon propre pour un essai mécanique.",
  ],
  practice: {
    task: "Sur une installation ASA adaptée, imprimez un bloc de 30 × 20 × 5 mm et examinez sa planéité. Sinon, utilisez le PETG et complétez un plan de préparation ASA en nommant clairement la substitution.",
    record:
      "La décision de préparation, le matériau effectivement imprimé et le comportement observé des coins.",
  },
  quiz: [
    [
      "À quoi contribue surtout l’enceinte chaude dans cet exercice ?",
      "À stabiliser l’environnement d’impression",
      "À certifier l’exposition",
      "À garantir la charge admissible",
      "La fonction thermique diffère de la maîtrise de l’exposition.",
    ],
    [
      "Un logiciel rend-il compatible une tête chauffante non prévue ?",
      "Non",
      "Oui, si la valeur est saisissable",
      "Oui, si le profil porte le bon nom",
      "Les limites du matériel restent applicables.",
    ],
    [
      "Quel défaut examiner sur le bloc ASA ?",
      "Les bords soulevés",
      "La couleur de l’écran",
      "La licence du logiciel seulement",
      "La déformation est une question pertinente du procédé.",
    ],
    [
      "L’installation ASA manque. Quelle option est honnête ?",
      "Employer et identifier l’alternative PETG",
      "Appeler le PETG un essai ASA",
      "Ignorer le matériel requis",
      "Un substitut enseigne la méthode sans prouver les performances ASA.",
    ],
    [
      "L’ASA qualifie-t-il automatiquement une pièce extérieure chargée ?",
      "Non",
      "Oui, pour toute forme",
      "Oui, sans contrôle",
      "Les preuves propres à l’application restent nécessaires.",
    ],
  ],
});
const reading: ReadingSection[] = [
  {
    title: "Commencer par l’usage et les limites matérielles",
    sources: ["asa", "materialtable"],
    paragraphs: [
      "L’ASA est souvent étudié lorsque l’exposition extérieure et la température comptent. C’est une raison de l’examiner, pas une approbation automatique. Identifiez le milieu d’usage et le grade réel. Consultez les indications de traitement et la fiche technique en parallèle avec les limites de la machine. Un logiciel qui accepte une température ne prouve pas que tête, plateau et composants voisins la supportent. L’essai commence seulement lorsque l’ensemble est documenté comme adapté, y compris l’enceinte si elle fait partie des conditions prévues par le fabricant.",
      "Séparez conditions de transformation et conditions de service. La température employée pour extruder ne dit pas ce que la pièce terminée peut supporter. Une propriété de fiche technique dépend parfois d’une méthode, d’une charge et d’un échantillon précisément définis. Ne transformez pas un chiffre en promesse pour une languette mince ou un capot extérieur de géométrie différente. Cette leçon vise la préparation et l’observation d’une petite impression. Durabilité extérieure, effort prolongé et stabilité dimensionnelle dans le temps constituent encore des questions à traiter sur la conception envisagée.",
    ],
  },
  {
    title: "Vérifier deux fonctions séparément",
    sources: ["asa", "enclosure", "safety"],
    paragraphs: [
      "L’ASA peut être sensible aux différences de température pendant la fabrication, et une enceinte appropriée peut aider à stabiliser le procédé. La maîtrise des émissions concerne ce qui quitte le procédé et son trajet dans le local. Une enceinte chaude ne prouve pas que son air est correctement géré. Prévoyez une ligne de vérification pour chaque fonction. Utilisez les dispositions intégrées du fabricant et l’évaluation du lieu plutôt qu’une boîte improvisée. L’enceinte ne doit pas placer électronique, câbles ou autres composants dans des conditions hors de leurs limites.",
      "Les recommandations du NIOSH invitent à considérer la source des émissions et l’installation dans son ensemble. Éviter un courant d’air autour de l’impression ne signifie pas arrêter la ventilation. La solution doit répondre à la stabilité du procédé et à la maîtrise de l’exposition. Si ces besoins paraissent incompatibles dans votre pièce, demandez une évaluation compétente plutôt que de retenir ce qui produit le plus bel échantillon. Un changement d’odeur ne mesure pas fiablement l’efficacité. Notez ce qui est documenté, évalué et encore inconnu avant de décider de chauffer ce matériau.",
    ],
  },
  {
    title: "Observer petit avant d’augmenter l’empreinte",
    sources: ["asa", "warp", "surface"],
    paragraphs: [
      "Employez la référence compatible et le bloc de 30 × 20 × 5 mm pour le premier essai autorisé. Examinez la première couche et notez si les coins restent fixés au fil du travail. Après refroidissement et retrait prescrits, cherchez soulèvement, déformation ou séparation entre couches. Un petit bloc plat renseigne sur cet essai. Il ne démontre pas qu’un grand couvercle se comportera pareil. Empreinte, géométrie, orientation et durée peuvent modifier sensiblement la difficulté, même lorsque le nom du filament et le profil semblent identiques.",
      "Si un coin se soulève, relevez où et quand avant de modifier les valeurs. Une fixation initiale ratée et une déformation plus tardive ne conduisent pas aux mêmes premières vérifications. Confirmez préparation et compatibilité du plateau, puis suivez les indications de machine et de filament. N’augmentez pas sans limite la température et n’ajoutez pas de chauffage arbitraire. Bordure, orientation ou redessin peuvent être pertinents s’ils répondent à une observation. Préservez la référence afin qu’un ajustement raté n’efface pas le seul point de départ clairement identifié.",
    ],
  },
  {
    title: "Consigner la préparation même sans impression ASA",
    sources: ["asa", "safety", "petg"],
    paragraphs: [
      "La fiche doit nommer configuration, grade, surface approuvée, enceinte et décision concernant les émissions. Ajoutez documents et dates de consultation. Si une exigence reste incertaine, indiquez que l’essai ASA est en attente. Le bloc PETG peut servir à pratiquer géométrie et contrôle, mais son étiquette doit signaler le remplacement. Il ne démontre ni alimentation ASA, ni déformation de ce matériau, ni adaptation de l’espace. Rendre ces limites visibles permet d’apprendre sans fabriquer une preuve selon laquelle une installation indisponible était prête ou un matériau absent a été testé.",
      "Après un vrai essai ASA, décrivez le résultat et la prochaine question de conception. Planéité du petit bloc refroidi et continuité visible des couches restent des contrôles limités, pas une qualification de produit extérieur. N’ajoutez pas un lissage au solvant à l’exercice simplement parce que le polymère peut subir un traitement chimique. Cette opération pose des exigences distinctes de compatibilité, d’exposition et de manipulation. Le résultat attendu est une décision documentée et un essai traçable, avec toute substitution et toute affirmation d’usage non vérifiée clairement conservées dans le dossier.",
    ],
  },
];
export default { lesson: content, reading };
