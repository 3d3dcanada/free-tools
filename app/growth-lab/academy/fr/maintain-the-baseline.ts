import { frenchLesson } from "./lesson";
import type { ReadingSection } from "../types";
const content = frenchLesson(35, {
  summary:
    "Entretenez l’imprimante selon les consignes de son modèle précis et reliez chaque intervention à un essai de référence. Notez aussi ce qui n’est pas dû ou reste non résolu. Cette leçon gratuite organise un entretien traçable, sans procédure universelle. Aucun fichier n’est téléversé; votre carnet et vos réponses restent sur votre appareil.",
  learn: "Conserver un relevé d’entretien qui aide à répéter une impression connue.",
  steps: [
    "Trouvez la notice actuelle de la révision exacte. Relevez intervalles d’inspection, lubrifiant autorisé et éléments qui ne doivent pas être lubrifiés.",
    "Préparez l’état sûr décrit avant l’inspection. Gardez les mains hors des mouvements et les produits de nettoyage loin de l’électronique sous tension.",
    "Notez les éléments inspectés, nettoyés, remplacés ou réglés. Une opération chauffée ou électrique exige sa procédure particulière ou une aide qualifiée.",
    "Après un changement pertinent, reprenez le même spécimen de référence et comparez-le au relevé précédent. Associez date d’entretien, profil et résultat physique.",
  ],
  mistakes: [
    "Appliquer le même lubrifiant à toutes les surfaces mobiles.",
    "Changer plusieurs composants sans vérifier leurs effets sur l’impression.",
  ],
  practice: {
    task: "Après une vérification courante appropriée, imprimez le bloc de référence avec le profil enregistré. Si aucun entretien n’est dû, inspectez et notez l’état actuel avant l’essai.",
    record: "Notice utilisée, opération effectuée ou non due, puis résultat de comparaison.",
  },
  quiz: [
    [
      "Quel calendrier d’entretien suivre ?",
      "Les consignes de l’imprimante précise",
      "Celui de toute autre machine",
      "Une fréquence inventée",
      "Les exigences dépendent de l’équipement.",
    ],
    [
      "Toute surface mobile demande-t-elle le même lubrifiant ?",
      "Non",
      "Toujours",
      "En quantité maximale",
      "Certaines surfaces ont une exigence précise ou aucune lubrification.",
    ],
    [
      "Que faire après un changement matériel pertinent ?",
      "Comparer une impression de référence",
      "Effacer les anciens résultats",
      "Changer tous les profils",
      "Vérifiez l’effet du changement.",
    ],
    [
      "Que contient le relevé d’entretien ?",
      "Opération, date et résultat",
      "Seulement une coche",
      "Un prix supposé",
      "Un dossier précis aide les diagnostics suivants.",
    ],
    [
      "Que faire face à un accès électrique inconnu ?",
      "Demander une aide qualifiée",
      "Essayer au hasard",
      "Ignorer les consignes",
      "Une leçon courante ne justifie pas une réparation dangereuse.",
    ],
  ],
});
const reading: ReadingSection[] = [
  {
    title: "Trouver la notice de la bonne révision",
    sources: ["maintenance", "safety"],
    paragraphs: [
      "L’entretien dépend du matériel. Trouvez manuel ou page d’assistance actuels pour modèle, révision et éventuelle modification prise en charge. Un point de lubrification, une procédure de courroie ou un intervalle repris ailleurs peut être inadapté. Lisez le champ d’application avant les étapes. La référence Prusa de cette leçon illustre des consignes propres à une machine; ce n’est pas une liste universelle. Enregistrez source et date pour qu’une autre personne comprenne quelles instructions ont guidé le travail, et puisse vérifier plus tard si elles ont changé.",
      "Distinguez inspection, entretien courant et réparation. L’utilisateur peut être autorisé à contrôler une surface accessible ou à nettoyer un composant documenté, tandis qu’un accès électrique ou une réparation complexe demande d’autres compétences. La présence d’un outil ne justifie pas d’élargir une vérification en démontage. Si vous trouvez un dommage ou une situation inexpliquée, arrêtez l’opération concernée et cherchez l’aide adaptée. Le carnet doit permettre les statuts inspecté, non dû, non résolu ou transmis, au lieu de forcer chaque ligne vers une case terminée.",
    ],
  },
  {
    title: "Préparer état sûr et produits adaptés",
    sources: ["maintenance", "safety"],
    paragraphs: [
      "Suivez les exigences de température, d’alimentation électrique et d’accès de la procédure. Certaines opérations demandent une machine froide et débranchée; d’autres comportent une étape chauffée documentée. Ne remplacez pas ces détails par une règle improvisée unique. Éloignez mains des mouvements et nettoyants des circuits actifs ou surfaces incompatibles. Choisissez lubrifiant, produit ou pièce spécifiés. Employer un produit commode partout peut endommager des éléments ayant d’autres besoins. Lisez les endroits où son usage est autorisé et ceux où le fabricant indique explicitement de ne pas l’appliquer.",
      "Préparez seulement pièces et outils nécessaires au travail délimité, et gardez l’identité des éléments retirés. Une photo peut aider au remontage si elle ne détourne pas de la procédure sûre. Tenez vis et débris loin des zones mécaniques et électriques. Ne resserrez pas tout simplement parce qu’un capot est ouvert : tout réglage est un changement qui demande une raison et une méthode. Le but est de conserver ou retrouver l’état prescrit, pas de donner une impression d’entretien approfondi en multipliant les interventions sans nécessité.",
    ],
  },
  {
    title: "Relier l’intervention au résultat imprimé",
    sources: ["maintenance", "first", "teaching"],
    paragraphs: [
      "Inscrivez ce qui a été inspecté, nettoyé, réglé ou remplacé, avec date et durée d’usage pertinente si connue. Ajoutez identité du composant et référence de procédure. Si rien n’était dû, notez la décision et l’état observé. Lors d’un défaut ultérieur, ce dossier montre si buse, plaque, alimentation ou mouvement a changé récemment. Sans lui, une discordance de configuration peut passer pour un problème mystérieux de filament. L’utilisateur risque alors d’ajuster le débit autour d’un changement matériel qui n’a jamais été reconnu ni reporté dans le profil.",
      "Après une modification pertinente, réalisez la configuration ou calibration prescrite puis imprimez le spécimen connu. Gardez matériau, modèle et profil, sauf si le nouveau matériel exige une mise à jour documentée. Notez explicitement cette mise à jour. Comparez dimensions et détails visibles avec la même méthode d’inspection. Un diagnostic interne réussi est utile, mais l’objet imprimé apporte une preuve sur le procédé complet. Le simple démarrage de la machine et la disparition immédiate d’une alerte ne suffisent pas à déclarer toute réparation vérifiée en production.",
    ],
  },
  {
    title: "Empêcher la dérive silencieuse de la configuration",
    sources: ["maintenance", "teaching", "safety"],
    paragraphs: [
      "Un atelier accumule facilement petites modifications de profil, plaques remplacées et réparations non notées. Comparez périodiquement la configuration active à la référence entretenue, en identifiant les différences volontaires. Nommez clairement les profils et conservez les fichiers nécessaires pour refaire un spécimen connu. Cela ne signifie pas tout réinitialiser sans réflexion. Préservez une configuration fonctionnelle et examinez les discordances avant de l’écraser. Sur une machine partagée, rendez le relevé accessible aux personnes préparant les travaux pour que leurs hypothèses logicielles correspondent au matériel effectivement disponible.",
      "Pour l’exercice, effectuez uniquement une vérification courante appropriée et due, ou documentez qu’aucune action n’était nécessaire. Inspectez ensuite l’impression de référence et notez la comparaison. Si un défaut reste ouvert, signalez-le selon le fonctionnement de l’atelier et obtenez une aide. Un petit cube réussi n’annule pas un comportement anormal récurrent. L’apprentissage utile est la relation traçable entre instruction exacte, action accomplie et résultat observé. Sa portée doit rester explicite : le relevé prouve ces vérifications, pas une remise en état complète de chaque fonction de l’imprimante.",
    ],
  },
];
export default { lesson: content, reading };
