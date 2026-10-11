import { frenchLesson } from "./lesson";
import type { ReadingSection } from "../types";
const content = frenchLesson(6, {
  summary:
    "Le profil de tranchage doit correspondre à l’imprimante, à la buse montée, au plateau et au matériau réels. Un menu ne remplace pas le matériel absent. Cette leçon gratuite vous apprend à vérifier une configuration de référence avant de produire les instructions. Aucun fichier n’est téléversé; vos réponses restent sur votre appareil.",
  learn: "Choisir une configuration compatible sans recopier les paramètres d’une autre machine.",
  steps: [
    "Installez le trancheur pris en charge depuis sa source officielle. Ajoutez le modèle exact d’imprimante et le diamètre de la buse réellement montée.",
    "Consultez les indications accessibles sur la buse ou le relevé de configuration. Le nom d’un profil ne prouve pas qu’une pièce a été remplacée.",
    "Choisissez la surface et le filament utilisés. Vérifiez de nouveau ces sélections après l’ouverture d’un projet importé.",
    "Sauvegardez une copie clairement nommée de la référence. Ne modifiez ni géométrie de machine ni micrologiciel sans procédure du fabricant qui le demande.",
  ],
  mistakes: [
    "Choisir une imprimante simplement parce qu’elle ressemble à la vôtre.",
    "Supposer qu’un projet partagé conserve votre propre sélection de buse.",
  ],
  practice: {
    task: "Tranchez le bloc de la première leçon avec la référence vérifiée. Imprimez après la leçon 10 et conservez ensemble projet et sortie.",
    record: "Les quatre sélections vérifiées, leurs sources de confirmation et le nom du projet enregistré.",
  },
  quiz: [
    [
      "Que vérifier dans un projet reçu d’une autre personne ?",
      "Imprimante, buse, plateau et matériau",
      "Uniquement la couleur",
      "Uniquement le nom du fichier",
      "Un projet peut rétablir les réglages d’une autre machine.",
    ],
    [
      "Quel diamètre de buse le profil doit-il décrire ?",
      "Celui de la buse montée",
      "Le plus grand du menu",
      "Celui d’une photo trouvée en ligne",
      "Le profil doit correspondre au matériel en service.",
    ],
    [
      "Où obtenir le trancheur pris en charge ?",
      "Depuis sa source officielle",
      "Depuis une pièce jointe inconnue",
      "Depuis n’importe quelle publicité",
      "Utilisez le canal de distribution du fournisseur.",
    ],
    [
      "Quel point de départ convient ?",
      "Une référence compatible et documentée",
      "Des réglages extrêmes",
      "Le profil le plus récent d’une autre machine",
      "Commencez avec une configuration prise en charge.",
    ],
    [
      "Faut-il modifier le micrologiciel pour commencer ?",
      "Seulement si le fabricant le demande",
      "Toujours",
      "Dès que l’aperçu est lent",
      "Le tranchage courant ne justifie pas des changements arbitraires du micrologiciel.",
    ],
  ],
});
const reading: ReadingSection[] = [
  {
    title: "Faire correspondre les faits aux noms du logiciel",
    sources: ["slicer", "first", "bates"],
    paragraphs: [
      "Commencez près de l’imprimante arrêtée, avec son manuel et son relevé de configuration. Identifiez le modèle et sa révision, la buse installée, la surface et le matériau qui sera chargé. Ce sont des faits concernant la machine. Ouvrez ensuite les sélections correspondantes dans le logiciel et comparez-les une à une. Un profil portant le nom d’une grosse buse ne prouve pas qu’elle a été montée. Un projet du mois précédent peut décrire un état qui a changé depuis. La vérification se termine lorsque le relevé physique et les sélections concordent.",
      "Utilisez la source et la procédure de configuration recommandées par le fabricant. Un profil communautaire peut être utile plus tard, mais il ajoute des hypothèses à comprendre. Ne choisissez pas une machine ressemblante uniquement parce que son plateau semble avoir la bonne taille. Les commandes de début et de fin, les limites de déplacement et les options matérielles peuvent différer. Si la configuration exacte manque dans la documentation, laissez le point ouvert et consultez le responsable ou le fabricant. Deviner la géométrie de la machine ne résout pas correctement un profil absent.",
    ],
  },
  {
    title: "Comprendre les groupes de réglages",
    sources: ["first", "layers"],
    paragraphs: [
      "Il est utile de distinguer paramètres de machine, paramètres de matériau et choix d’impression. Les premiers décrivent l’équipement, les seconds une manière compatible de traiter un filament, et les derniers des éléments comme la hauteur de couche ou la construction des parois. Les applications peuvent nommer ou combiner ces groupes différemment : consultez la documentation de votre version. Quand un groupe change, vérifiez les autres au lieu de supposer que toute combinaison est admise. Laissez les modifications de micrologiciel ou de limites mécaniques hors du premier exercice, sauf consigne explicite du fabricant.",
      "Supposons que le projet sélectionne une buse de 0,6 mm alors que le relevé d’entretien indique une buse de 0,4 mm montée. Cette contradiction suffit pour suspendre la préparation; une impression ratée n’est pas nécessaire pour la confirmer. Corrigez la sélection ou faites modifier le matériel selon sa procédure, puis vérifiez de nouveau. Ne compensez pas avec un réglage de débit sans rapport direct. L’exemple montre une correspondance à établir, sans imposer une largeur universelle de ligne pour l’un ou l’autre diamètre de buse.",
    ],
  },
  {
    title: "Examiner les imports et conserver la référence",
    sources: ["files", "first", "teaching"],
    paragraphs: [
      "L’ouverture d’un projet peut restaurer les paramètres de son auteur. Regardez immédiatement imprimante, buse, plateau et matériau, surtout si le logiciel propose d’adopter une configuration. Lisez le choix au lieu de valider automatiquement. Importer une géométrie et ouvrir un projet complet peuvent avoir des effets différents. Si vous voulez seulement la forme, utilisez la méthode adaptée et vérifiez quand même les dimensions. Gardez le téléchargement original séparé de votre copie préparée, afin que l’adaptation à votre machine n’efface pas la provenance de ce que vous avez reçu.",
      "Sauvegardez la référence vérifiée sous un nom reconnaissable. Distinguez imprimante, buse et matériau sans mettre tous les paramètres dans le nom. Lorsque le logiciel le permet, conservez le profil fourni et créez une copie utilisateur. Pour un essai ultérieur, dupliquez cette référence et notez le seul changement volontaire. Revenir à une configuration connue doit être une action précise, pas un effort de mémoire. Sauvegardez aussi le projet et la version du logiciel : une mise à jour de profil pourra ainsi être distinguée de vos propres modifications.",
    ],
  },
  {
    title: "Vérifier la sélection avec un petit travail",
    sources: ["first", "viewer"],
    paragraphs: [
      "Posez le bloc du cours sur sa base prévue et lancez le tranchage. Contrôlez dimensions, première couche, parois et fermeture du dessus. Notez durée et matière comme des prévisions, sans les appeler mesures. Conservez le projet et les instructions sous le même identifiant de travail. Avant l’essai physique, comparez le fichier choisi sur la machine à celui que vous venez de préparer. Cela évite une erreur ordinaire mais importante : examiner soigneusement une sortie puis démarrer un ancien fichier portant un nom voisin sur un support amovible.",
      "Pour le relevé, écrivez quatre lignes : machine, buse, plateau et filament, avec la preuve utilisée pour chacun. Une étiquette accessible ou une entrée d’entretien peut confirmer le matériel sans démontage. Ajoutez le nom du projet et le résultat de la vérification préalable. L’objectif n’est pas de mémoriser toutes les valeurs, mais de savoir ce que le trancheur décrit réellement. Lorsqu’un matériel ou un matériau change, reprenez cette comparaison avant de considérer que le dernier travail réussi représente encore l’état actuel de votre installation.",
    ],
  },
];
export default { lesson: content, reading };
