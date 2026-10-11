import { symptoms as englishSymptoms } from "./reference";
export const glossary = [
  [
    "Adhérence",
    "Maintien de la première couche sur la surface de fabrication. Matière, préparation de surface et dépôt initial comptent ensemble.",
    "adhesion",
  ],
  [
    "ASA",
    "Famille de filaments employée notamment pour des pièces extérieures. Vérifiez la nuance, les exigences de la machine et la maîtrise des émissions.",
    "asa",
  ],
  [
    "Base de référence",
    "Configuration connue et sauvegardée servant à comparer un changement contrôlé. Ce n’est pas un meilleur réglage universel.",
    "teaching",
  ],
  [
    "Pont",
    "Portée imprimée entre des régions soutenues. Son résultat dépend de la géométrie et des conditions d’impression.",
    "bridge",
  ],
  [
    "Plateau",
    "Ensemble de surface auquel adhère la première couche. Utilisez les méthodes de retrait et de nettoyage autorisées pour son revêtement.",
    "sheets",
  ],
  [
    "Mélange CF",
    "Polymère contenant une charge de fibres de carbone. Le polymère de base reste déterminant; l’abrasion peut exiger du matériel résistant à l’usure.",
    "cf",
  ],
  [
    "Multiplicateur d’extrusion",
    "Réglage du trancheur modifiant la quantité demandée. Affinez-le seulement après avoir vérifié le montage physique et la base.",
    "flow",
  ],
  [
    "FFF / FDM",
    "Appellations courantes de l’impression à filament : la machine dépose une matière ramollie suivant des trajets de couches successives.",
    "safety",
  ],
  [
    "G-code",
    "Instructions machine produites pour une configuration donnée. Un fichier d’une autre imprimante n’est pas automatiquement sûr sur la vôtre.",
    "viewer",
  ],
  [
    "Remplissage",
    "Motif intérieur entre les parois. Il aide la fabrication et influence la pièce; son pourcentage n’est pas une charge admissible.",
    "infill",
  ],
  [
    "Hauteur de couche",
    "Épaisseur d’une tranche dans la direction verticale. Elle influence les marches visibles et le nombre de couches.",
    "layers",
  ],
  [
    "Maillage",
    "Représentation d’une surface, souvent échangée en STL pour le tranchage. Vérifiez taille et géométrie après importation.",
    "files",
  ],
  [
    "Surplomb",
    "Région dépassant la matière située dessous. Orientation, géométrie ou supports peuvent demander une adaptation.",
    "supports",
  ],
  [
    "PETG",
    "Famille souvent utile pour des pièces pratiques. L’adéquation dépend toujours de la nuance, de l’usage, du procédé et des essais.",
    "petg",
  ],
  [
    "PLA",
    "Filament courant pour l’apprentissage et les prototypes de ce cours. Le choix commercial de 3D3D n’interdit pas universellement les produits en PLA.",
    "pla",
  ],
  [
    "Rétraction",
    "Mouvement contrôlé du filament lors des déplacements pour réduire un dépôt indésirable. Suivez la procédure propre à l’extrudeur.",
    "string",
  ],
  [
    "Trancheur",
    "Logiciel préparant géométrie et paramètres sous forme d’une séquence de trajets imprimables.",
    "slicer",
  ],
  [
    "Support",
    "Structure temporaire sous des détails ne pouvant être construits correctement seuls. Son retrait peut marquer la surface de contact.",
    "supports",
  ],
  [
    "Tolérance",
    "Variation permise autour d’une dimension spécifiée. Définissez ce qui compte pour l’usage avant de juger la pièce.",
    "design",
  ],
  [
    "TPU",
    "Famille de filaments souples. Parcours d’alimentation, nuance et paramètres influencent sa manipulation.",
    "tpu",
  ],
  [
    "Paroi / périmètre",
    "Trajet suivant la limite d’une couche. Les parois forment l’extérieur de la forme imprimée.",
    "infill",
  ],
  [
    "Gauchissement",
    "Déformation où certaines régions, comme les coins, se relèvent. Examinez ensemble matière, géométrie et environnement.",
    "warp",
  ],
] as const;
const translatedSymptoms = [
  [
    "Odeur électrique, fumée ou mouvement dangereux",
    "Arrêtez l’utilisation et suivez la procédure du fabricant ainsi que votre plan d’urgence local. N’intervenez pas dans un mécanisme mobile ou chaud. Obtenez une aide qualifiée avant de réutiliser un équipement endommagé.",
  ],
  [
    "La première couche ne reste pas attachée",
    "Arrêtez le travail échoué. Vérifiez combinaison plateau/matière, nettoyage autorisé et préparation de première couche. Changez une seule chose avant un petit nouvel essai.",
  ],
  [
    "Des fils fins relient des éléments séparés",
    "Comparez état de matière, température et déplacements à la référence. Utilisez la procédure de rétraction prise en charge après les vérifications de base.",
  ],
  [
    "Les coins se relèvent pendant l’impression",
    "Notez quand le relevage commence, avec matériau, forme et environnement. Une enceinte ne remplace pas une maîtrise adaptée des émissions.",
  ],
  [
    "Des vides ou de la matière manquante apparaissent",
    "Inspectez alimentation et profil compatible avant de changer le débit. Arrêtez et préparez l’accès selon les consignes du fabricant avant l’inspection physique.",
  ],
  [
    "Une couche se décale soudainement",
    "Relevez direction et hauteur du déplacement. Après l’arrêt sûr, suivez l’inspection mécanique de la machine avant de modifier le logiciel.",
  ],
  [
    "Un surplomb s’affaisse ou le support laisse des marques",
    "Relisez direction des efforts et trajets tranchés. Comparez orientation et contacts de support autorisés sur un petit échantillon.",
  ],
];
export const symptoms = englishSymptoms.map((s, i) => ({
  ...s,
  name: translatedSymptoms[i][0],
  advice: translatedSymptoms[i][1],
}));
export const units = [
  {
    title: "Partir de l’usage",
    description: "Comprendre la machine, choisir une configuration adaptée et préparer un poste sûr.",
  },
  {
    title: "Une première impression utile",
    description: "Transformer un modèle en instructions vérifiées, puis observer et inspecter le résultat.",
  },
  {
    title: "Choisir la bonne matière",
    description: "Relier polymère, matériel et environnement à la pièce.",
  },
  {
    title: "Régler avec une raison",
    description: "Conserver une référence et modifier une variable à la fois.",
  },
  {
    title: "Rendre la forme imprimable",
    description: "Prévoir efforts, supports, jeux et assemblage avant de consommer du filament.",
  },
  {
    title: "Comprendre un échec",
    description: "Utiliser le symptôme pour choisir une petite vérification pertinente.",
  },
  { title: "Finir et contrôler", description: "Nettoyer, mesurer et garder un procédé répétable." },
  {
    title: "Préparer une première vente responsable",
    description: "Vérifier droits, coûts, qualité et promesses réellement justifiables.",
  },
];
