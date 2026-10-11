import { frenchLesson } from "./lesson";
import type { ReadingSection } from "../types";
const content = frenchLesson(9, {
  summary:
    "Examinez l’aperçu tranché de bas en haut pour repérer départs sans soutien, détails disparus et déplacements inattendus. Il décrit ce que la machine doit exécuter, sans prouver la qualité physique de la future pièce. Cette leçon gratuite organise une vérification courte. Aucun fichier n’est téléversé; vos réponses restent enregistrées sur votre appareil.",
  learn: "Vérifier un travail à partir des trajets réellement générés.",
  steps: [
    "Tranchez avec le profil vérifié. Confirmez que modèle, dimensions et placement correspondent toujours à votre intention.",
    "Déplacez le curseur depuis le bas. Repérez première couche, surplombs, contacts des supports et fermeture des surfaces supérieures.",
    "Cherchez les détails disparus et les îlots sans soutien. Revenez au modèle ou aux paramètres si vous ne pouvez pas expliquer leur construction.",
    "Enregistrez les prévisions de durée et de matière, le projet et la sortie destinée à la bonne imprimante. L’aperçu documente les instructions, pas la réussite de la pièce physique.",
  ],
  mistakes: [
    "Examiner uniquement le modèle ombré.",
    "Transformer l’heure de fin prévue en promesse de livraison.",
  ],
  practice: {
    task: "Préparez le 3DBenchy officiel à son échelle normale et examinez l’ouverture de la cabine dans l’aperçu. Imprimez après la leçon 10 avec une référence compatible.",
    record: "Un pont ou un porte-à-faux identifié, l’explication de sa construction et le traitement retenu.",
  },
  quiz: [
    [
      "Quelle vue montre les trajets générés ?",
      "L’aperçu après tranchage",
      "Une photo publicitaire",
      "Le modèle ombré seul",
      "La vue solide ne montre pas toutes les décisions du tranchage.",
    ],
    [
      "Un détail disparaît après tranchage. Que faire ?",
      "Résoudre le problème avant export",
      "Imprimer en espérant son retour",
      "Ignorer le détail",
      "Les instructions doivent représenter l’élément voulu.",
    ],
    [
      "Un aperçu correct prouve-t-il la qualité réelle ?",
      "Non",
      "Oui, toujours",
      "Seulement s’il est coloré",
      "Le comportement physique doit encore être observé.",
    ],
    [
      "Où commencer la vérification ?",
      "À la première couche occupée",
      "Seulement au sommet",
      "Au nom du fichier",
      "Vérifiez la base puis la construction vers le haut.",
    ],
    [
      "Que conserver avec le fichier de sortie ?",
      "Le projet et le relevé du profil",
      "Uniquement un nom agréable",
      "Rien",
      "Conservez la préparation nécessaire pour répéter le travail.",
    ],
  ],
});
const reading: ReadingSection[] = [
  {
    title: "Lire les instructions plutôt que la seule forme",
    sources: ["viewer", "first"],
    paragraphs: [
      "La vue ombrée montre la forme importée. L’aperçu tranché montre les trajets produits pour la configuration active. Les deux peuvent différer de façon importante : un détail mince disparaît, une région reçoit un autre remplissage ou un support touche une face que vous vouliez préserver. Rouvrez l’aperçu après tout changement significatif du modèle ou des paramètres. Une capture issue d’un tranchage précédent ne vérifie pas la sortie que vous allez envoyer, même si l’objet semble presque identique dans l’espace de travail.",
      "Commencez par identifier le travail et les sélections actives. Confirmez dimensions et disposition, puis regardez la première couche déposée. Expliquez pourquoi son empreinte correspond à la base choisie. Montez progressivement aux endroits où la géométrie change : début d’un trou, apparition d’une avancée, rencontre de régions séparées. Il n’est pas nécessaire d’examiner chaque segment individuellement. Vous cherchez à comprendre comment naissent les éléments importants et à remarquer le moment où leur construction ne peut pas être expliquée par ce qui se trouve dessous.",
    ],
  },
  {
    title: "Employer les couleurs pour répondre à une question",
    sources: ["viewer", "string"],
    paragraphs: [
      "De nombreux trancheurs colorent les trajets selon leur fonction, leur vitesse ou une autre grandeur. Lisez la légende et les unités avant de conclure. Une région rouge n’indique pas universellement une erreur : sa signification dépend de la vue. Les couleurs de fonction distinguent parois, remplissage et supports. Une carte de vitesse montre la vitesse demandée, pas la vitesse mesurée sur une machine physique. Lorsque vous conservez une capture, incluez la légende afin qu’une autre personne comprenne ce que représentent les couleurs sans devoir le deviner.",
      "Séparez les déplacements sans dépôt des trajets de matière lorsque vous examinez un passage au-dessus d’un vide ou d’une surface. Une ligne de déplacement n’a pas le même rôle qu’un périmètre et ne prouve pas qu’une marque ou un fil apparaîtra. Localisez d’abord le trajet suspect avant d’étudier la rétraction et le mouvement associés. Cette démarche rattache l’hypothèse à une instruction visible. Augmenter la rétraction au hasard parce qu’une vue contient des déplacements peut créer un problème sans démontrer pourquoi le trajet initial nécessitait un changement.",
    ],
  },
  {
    title: "S’arrêter devant un détail sans explication",
    sources: ["supports", "bridge", "benchy"],
    paragraphs: [
      "Un îlot qui apparaît pour la première fois au-dessus du vide demande un plan de construction. Il peut nécessiter un support, une orientation différente ou une modification du dessin. Un pont est un autre cas : la matière s’étend entre des régions soutenues, avec un résultat qui dépend notamment de la distance et du procédé. L’aperçu montre la portée prévue sans garantir son état final. Consultez la leçon pertinente et les consignes du fabricant. L’absence d’avertissement logiciel ne prouve pas que toute géométrie convient à tous les matériaux et à toutes les machines.",
      "L’ouverture de la cabine du modèle de référence permet de distinguer une avancée d’une portée entre appuis. Gardez l’échelle normale et examinez les couches où l’ouverture commence puis se ferme. Écrivez ce qui soutient chaque nouveau trajet de matière. Si vous ajoutez des supports, vérifiez leur origine, leurs contacts et la possibilité de les retirer. Une structure emprisonnée dans une cavité fermée peut rendre la conception inadaptée même si le logiciel réussit à produire tous ses trajets. Le retrait fait déjà partie de la réflexion avant l’impression.",
    ],
  },
  {
    title: "Terminer par un export que l’on peut retrouver",
    sources: ["viewer", "first", "safety"],
    paragraphs: [
      "Examinez les dernières surfaces et les prévisions de durée et de consommation. Placez ces valeurs dans les colonnes d’estimation du journal. Sauvegardez le projet à l’origine de la sortie, puis exportez pour la machine prévue selon la procédure documentée. Lorsque c’est possible, rouvrez les instructions dans une visionneuse compatible, notamment après une modification d’export. Comparez le nom choisi sur l’imprimante à celui du travail examiné. Évitez les anciens fichiers aux noms proches dans votre sélection, sans supprimer pour autant les documents d’une autre personne sur un support partagé.",
      "Le relevé préalable doit identifier un détail important et expliquer sa construction. Pour le bloc, cela peut être la base et la fermeture supérieure; pour l’éprouvette, l’ouverture de cabine. Notez les questions non résolues et reportez l’essai si elles affectent la préparation. Cette vérification documente des instructions, pas une certification de la pièce. Espace de travail, supervision, refroidissement et contrôle restent nécessaires. En gardant ces étapes séparées, vous pourrez localiser un défaut ultérieur sans rejeter le travail utile effectué avant la fabrication ni lui attribuer une preuve qu’il ne fournit pas.",
    ],
  },
];
export default { lesson: content, reading };
