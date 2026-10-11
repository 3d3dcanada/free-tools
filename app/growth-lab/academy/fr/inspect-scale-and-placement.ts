import { frenchLesson } from "./lesson";
import type { ReadingSection } from "../types";
const content = frenchLesson(7, {
  summary:
    "Vérifiez dimensions, unités, orientation et contact avec le plateau avant de trancher. Une vue convaincante peut masquer une erreur d’échelle ou une base flottante. Cette leçon gratuite utilise un bloc simple pour séparer ces contrôles et comparer ensuite la pièce. Vos modèles ne sont pas téléversés; les réponses restent dans votre navigateur.",
  learn: "Contrôler la taille, l’orientation et la face qui doit servir de base.",
  steps: [
    "Lisez les dimensions dans le trancheur et comparez-les au dessin ou à la taille indiquée par le créateur. Le zoom n’est pas une mesure.",
    "Utilisez l’outil de placement pour poser la face prévue sur le plateau virtuel. Faites tourner l’objet volontairement et examinez tous ses côtés.",
    "Cherchez les volumes séparés qui flottent et les zones hors de l’espace utilisable. Une importation réussie ne suffit pas à établir la possibilité d’imprimer.",
    "Tranchez et regardez la première couche occupée. Son empreinte doit correspondre à la base choisie avant de préparer le travail complet.",
  ],
  mistakes: [
    "Agrandir l’objet uniquement pour remplir le plateau.",
    "Oublier un petit volume isolé dont la première couche commence dans le vide.",
  ],
  practice: {
    task: "Préparez un bloc de 20 × 20 × 10 mm, face de 20 × 20 mm sur le plateau. Après la leçon 10, imprimez et comparez les dimensions prévues au résultat.",
    record:
      "Une vue cotée et les mesures de la pièce, en conservant les unités et l’identité des dimensions.",
  },
  quiz: [
    [
      "Le zoom modifie-t-il la taille du modèle ?",
      "Non",
      "Oui, toujours",
      "Seulement sur téléphone",
      "Lisez les dimensions plutôt que de juger la taille à l’écran.",
    ],
    [
      "Où doit commencer la première couche ?",
      "Sur la surface de construction préparée",
      "Dans le vide",
      "Sous le plateau",
      "L’empreinte prévue doit être en contact avec la surface.",
    ],
    [
      "Que confirme une importation réussie ?",
      "Que le fichier a été lu",
      "Que la pièce est solide",
      "Que le matériau convient",
      "L’importation n’est qu’une étape de préparation.",
    ],
    [
      "Le modèle est beaucoup trop grand. Quelle vérification vient d’abord ?",
      "Les unités et dimensions prévues",
      "Une réduction au hasard",
      "Le prix du filament",
      "Vérifiez l’échelle avant de la modifier.",
    ],
    [
      "Pourquoi examiner les volumes séparés ?",
      "Certains peuvent commencer sans soutien",
      "Pour changer leur auteur",
      "Pour garantir leur résistance",
      "Une géométrie déconnectée peut changer la construction nécessaire.",
    ],
  ],
});
const reading: ReadingSection[] = [
  {
    title: "Lire une dimension plutôt que croire une image",
    sources: ["first", "design"],
    paragraphs: [
      "Le zoom peut rendre un objet minuscule aussi imposant qu’un grand objet. Lisez ses dimensions dans le logiciel et comparez-les à un dessin, un détail connu ou la taille annoncée par le créateur. Écrivez les unités. Pour le bloc du cours, les valeurs sont 20, 20 et 10 millimètres; son apparence à l’écran n’intervient pas dans cette vérification. Si une dimension surprend, examinez les unités d’export et d’import avant de tirer une poignée d’échelle jusqu’à ce que l’objet semble tenir sur le plateau.",
      "Une mise à l’échelle uniforme modifie plus que l’encombrement. Doubler chaque longueur multiplie l’aire de surface par quatre et le volume enfermé par huit pour la même géométrie. Le bloc plein de 20 × 20 × 10 mm représente 4 cm³; celui de 40 × 40 × 20 mm représente 32 cm³. Ce calcul ne donne pas la consommation exacte de filament, car les parois, le remplissage et les supports interviennent aussi. Il explique toutefois pourquoi agrandir un téléchargement change davantage le travail que ne le suggère la vue à l’écran.",
    ],
  },
  {
    title: "Choisir la face de départ avec une raison",
    sources: ["first", "supports", "design"],
    paragraphs: [
      "Tournez le modèle pour regarder chaque côté, puis choisissez la surface qui doit toucher le plateau. Une grande face plane convient souvent au premier bloc; une pièce complexe demande aussi de considérer charges, aspect et accès aux supports. Posez délibérément la face choisie avec l’outil du trancheur et relisez la hauteur après rotation. Ne supposez pas qu’un objet est bien posé parce que son ombre touche le plateau virtuel. Une inclinaison, une portion sous le plateau ou une petite saillie peuvent masquer le contact réel prévu.",
      "Avec le bloc de 20 × 20 × 10 mm, poser une face de 20 × 20 mm donne une hauteur nominale de 10 mm. Le tourner sur une face de 20 × 10 mm donne une hauteur de 20 mm et une autre empreinte. Le volume reste identique, mais le nombre de couches et la surface de contact changent. Cet exercice géométrique ne prouve pas qu’une orientation sera toujours plus résistante ou plus rapide. Tranchez les deux positions et examinez les trajets avant de choisir celle qui répond à la question de l’essai.",
    ],
  },
  {
    title: "Repérer les îlots et les conflits d’espace",
    sources: ["files", "supports", "first"],
    paragraphs: [
      "Un objet importé peut comporter plusieurs volumes qui paraissent former un assemblage sous un angle particulier. Consultez la liste des objets et leurs premières couches occupées. Un point décoratif ou un insert séparé peut commencer bien au-dessus du plateau alors que le corps principal démarre normalement. Chaque détail doit disposer d’un moyen de construction : liaison géométrique, support approprié ou placement séparé. L’absence d’erreur à l’ouverture du fichier ne suffit donc pas. L’inspection cherche une explication plausible de la manière dont chaque partie va se construire.",
      "Comparez toute l’empreinte à la région utilisable, en incluant supports, bordure et autres aides effectivement prévues. Avec plusieurs objets, vérifiez leur espacement et les restrictions de collision ou d’impression séquentielle indiquées par le logiciel. Le contrôle de boîte englobante d’une visionneuse sert à filtrer des dimensions; il ne simule pas tous les mouvements de la machine. Revenez au profil exact pour le placement. Si vous séparez ou déplacez les éléments d’un assemblage, conservez leur relation d’origine afin de ne pas confondre positions d’impression et positions finales.",
    ],
  },
  {
    title: "Relier l’empreinte à la future mesure",
    sources: ["viewer", "design"],
    paragraphs: [
      "Placez l’aperçu sur la première couche déposée. Pour le bloc, vous devez pouvoir expliquer son empreinte à partir de la base retenue. Un contact minuscule inattendu, un coin absent ou une zone sans rapport avec la forme prévue mérite une vérification. Montez dans les couches suivantes pour chercher de nouveaux îlots. Les trajets générés répondent mieux à cette question que le modèle ombré. Ils ne prouvent cependant ni l’adhérence réelle ni la préparation du plateau physique supposée par les paramètres du projet.",
      "Gardez une vue cotée et le projet dans le journal. Après l’impression supervisée et le refroidissement, mesurez les mêmes dimensions identifiées sur la pièce. Séparez valeurs prévues et relevées. En cas d’écart, ne redimensionnez pas immédiatement tout le modèle : technique de mesure, première couche, géométrie ou procédé peuvent demander une investigation. Le résultat attendu est une chaîne claire reliant unités, placement, aperçu et mesure. Elle permettra ensuite de travailler sur un ajustement précis tout en conservant le besoin dimensionnel d’origine et la trace de ce qui a réellement été observé.",
    ],
  },
];
export default { lesson: content, reading };
