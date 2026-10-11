import { frenchLesson } from "./lesson";
import type { ReadingSection } from "../types";
const content = frenchLesson(17, {
  summary:
    "Étalonnez à partir d’une machine en état et d’un profil compatible enregistré. Corrigez d’abord la préparation et la première couche, puis comparez un seul changement justifié par une observation. Cette leçon gratuite explique cet ordre sans remplacer les procédures du fabricant. Aucun fichier n’est téléversé; vos réponses restent enregistrées dans votre navigateur.",
  learn: "Choisir une petite séquence justifiée au lieu de modifier tous les réglages.",
  steps: [
    "Consultez entretien et vérifications de démarrage de la machine exacte. Dans son état sûr d’inspection, repérez les éléments manifestement desserrés, obstrués ou endommagés.",
    "Suivez l’autotest et la procédure du plateau. Ne copiez pas une commande de décalage Z ou d’entraînement provenant d’une imprimante différente.",
    "Imprimez une petite référence avec matériau et surface compatibles. Désignez le seul problème visible auquel l’essai doit répondre.",
    "Changez le paramètre pertinent autorisé, répétez l’échantillon et comparez. Conservez un nouveau profil seulement si son intérêt est documenté.",
  ],
  mistakes: [
    "Utiliser le débit pour masquer une première couche mal préparée.",
    "Étalonner uniquement parce qu’un réglage existe dans un menu.",
  ],
  practice: {
    task: "Imprimez deux fois le même petit bloc avec la référence inchangée. Comparez avant de décider si un ajustement est nécessaire.",
    record:
      "Les deux observations et une raison précise d’ajuster, ou la conclusion que la référence convient à cet exercice.",
  },
  quiz: [
    [
      "Qu’est-ce qui précède un réglage fin ?",
      "Une machine en état et une référence",
      "Un changement de tous les paramètres",
      "Une valeur extrême",
      "Le réglage fin ne remplace pas la préparation.",
    ],
    [
      "Toutes les machines utilisent-elles un décalage Z manuel ?",
      "Non",
      "Oui",
      "Seulement selon leur couleur",
      "Les méthodes d’étalonnage varient.",
    ],
    [
      "Combien de variables changer lors d’un premier essai ciblé ?",
      "Une",
      "Toutes",
      "Autant que possible",
      "Un changement isolé est plus facile à interpréter.",
    ],
    [
      "La référence imprime correctement. Faut-il changer le débit ?",
      "Non",
      "Toujours",
      "Pour que l’exercice compte",
      "Un réglage inutile peut créer un défaut.",
    ],
    [
      "Quand remplacer la référence par un nouveau profil ?",
      "Après une amélioration documentée",
      "Dès qu’une valeur paraît moderne",
      "Avant la comparaison",
      "Gardez une preuve du bénéfice et un moyen de revenir en arrière.",
    ],
  ],
});
const reading: ReadingSection[] = [
  {
    title: "Décider si un réglage est nécessaire",
    sources: ["teaching", "flow", "firstlayer"],
    paragraphs: [
      "L’étalonnage doit répondre à une observation définie. Commencez par un petit échantillon avec la référence compatible et notez le résultat. S’il répond au but de l’exercice, aucun réglage n’est nécessaire simplement parce qu’un guide propose un autre test. Une modification inutile ajoute des variables et rend parfois plus difficile le retour à un état connu. Écrivez référence acceptable lorsque c’est votre observation. Une bonne méthode comprend la décision d’arrêter les réglages, pas seulement la connaissance du prochain paramètre qu’un logiciel permet de modifier.",
      "En présence d’un défaut répétable, décrivez-le précisément. Un espace entre les lignes supérieures, une première couche détachée et un étage décalé sont des observations différentes. Elles appellent des investigations distinctes. Évitez une étiquette globale comme imprécis pour les trois. Gardez une photo ou un croquis du détail concerné. La prochaine expérience doit expliquer pourquoi son changement pourrait agir sur ce détail. Si le lien reste obscur, inspectez la préparation avant de modifier. Choisissez la plus petite forme qui conserve le défaut pour économiser de la matière et simplifier l’observation.",
    ],
  },
  {
    title: "Faire passer le matériel avant l’ajustement fin",
    sources: ["maintenance", "firstlayer", "safety"],
    paragraphs: [
      "Suivez les contrôles de démarrage et d’entretien de l’imprimante exacte. Dans l’état sûr prévu, recherchez les obstructions, jeux ou dommages que l’inspection courante est censée révéler. Ne démontez pas des éléments inconnus et ne retouchez pas toutes les vis. Un trajet d’alimentation abîmé ou une mauvaise buse physique ne se corrige pas correctement avec un débit cosmetiquement ajusté. Notez réparation et entretien séparément, puis rétablissez la référence. Sinon, une amélioration due au matériel pourrait être attribuée à tort au paramètre changé en même temps.",
      "Les systèmes automatiques et manuels n’effectuent pas tous les mêmes opérations. La procédure d’une imprimante munie d’un capteur particulier et d’un réglage manuel initial n’est pas une suite de commandes universelle. Respectez autotest, surface et démarrage de votre révision. Ne copiez pas des commandes de micrologiciel d’un autre guide parce que leurs noms semblent familiers. Si la procédure prise en charge signale un échec, résolvez-le avant de poursuivre. Une confirmation à l’écran ne remplace pas non plus le contrôle de l’échantillon physique produit ensuite.",
    ],
  },
  {
    title: "Conserver une référence et une variable",
    sources: ["teaching", "flow", "viewer"],
    paragraphs: [
      "Sauvegardez modèle et profil sous un identifiant clair. Deux impressions de référence sans changement volontaire peuvent aider à voir la variation ordinaire. Gardez matière, orientation et méthode de contrôle identiques. Si leurs résultats diffèrent fortement, examinez cette incohérence avant d’attribuer un bénéfice au réglage suivant. Une amélioration isolée peut venir d’une préparation ou d’un état de filament non maîtrisé. Cet exercice ne demande pas une étude statistique complexe, mais suffisamment de cohérence pour comprendre le sens d’un petit ajustement et savoir ce que la comparaison représente réellement.",
      "Pour l’essai suivant, changez un seul paramètre autorisé et consignez ancienne et nouvelle valeurs. Gardez le projet d’origine pour rendre le changement réversible. Examinez la zone visée et cherchez aussi les nouveaux défauts. Un dessus plus lisse accompagné de manques ailleurs peut ne pas améliorer le travail. Si l’essai n’aide pas, revenez à la référence et notez-le. N’empilez pas de nouveaux réglages sur une tentative décevante avant de pouvoir expliquer quelle configuration le prochain résultat représentera et pourquoi elle mérite une autre comparaison.",
    ],
  },
  {
    title: "Définir la portée du résultat",
    sources: ["teaching", "firstlayer", "flow"],
    paragraphs: [
      "Un échantillon peut montrer qu’une préparation et un réglage ont amélioré une observation précise. Il ne vérifie pas toutes les propriétés du matériau ni une autre géométrie. Reliez la conclusion aux conditions essayées. Si une modification améliore la surface d’une bobine, notez grade et état au lieu de déclarer une valeur universelle du polymère. Quand buse, matériau ou matériel pertinent changent, reprenez les contrôles de correspondance et de référence. C’est pourquoi un profil doit porter un nom utile et une note de contexte, pas seulement une valeur jugée meilleure.",
      "Terminez avec deux relevés identifiés et une décision : garder la référence, faire un essai justifié ou rechercher un défaut de préparation. Indiquez la procédure consultée et l’observation à l’origine du choix. Le questionnaire peut vérifier la compréhension de l’ordre, mais ne voit pas l’imprimante et ne valide pas un réglage. Les preuves pratiques restent dans votre journal. Cette séparation permet un relevé d’apprentissage honnête tout en fournissant une méthode concrète pour le prochain défaut, sans transformer la réussite du questionnaire en approbation technique de la machine.",
    ],
  },
];
export default { lesson: content, reading };
