import { frenchLesson } from "./lesson";
import type { ReadingSection } from "../types";
const content = frenchLesson(40, {
  summary:
    "Réunissez conception, droits, essais, coûts, photos et emballage d’une même révision avant de décider : soumettre à une revue humaine, corriger ou arrêter. L’achèvement du cours n’approuve aucun produit. Cette leçon gratuite garde les inconnues visibles et ne publie rien. Aucun fichier n’est téléversé; votre dossier d’apprentissage reste localement sur votre appareil.",
  learn: "Prendre une décision limitée sur un produit original simple avec un dossier cohérent.",
  steps: [
    "Choisissez un objet de bureau original dont une défaillance a des conséquences modestes. Rassemblez source modifiable, révision, impressions et choix de matière.",
    "Relisez ensemble droits, inspections, hypothèses de coût, photos, colis et texte proposé. Identifiez chaque point non résolu au lieu de lui attribuer un accord implicite.",
    "Vérifiez les règles du produit, de sa destination et de la plateforme. Cherchez une aide spécialisée lorsque l’usage impose des exigences que vous ne pouvez pas vérifier.",
    "Décidez : dossier prêt pour une revue distincte du responsable, preuves à corriger ou proposition à arrêter. Gardez le dossier local; publier, encaisser et promettre une livraison sont des décisions séparées.",
  ],
  mistakes: [
    "Confondre attestation de cours et approbation du produit.",
    "Publier avant de décider de la matière ou de résoudre les droits.",
  ],
  practice: {
    task: "Imprimez la dernière petite révision du produit pédagogique original et inspectez-la selon vos critères. Assemblez le dossier local sans annonce ni vente dans cet exercice.",
    record:
      "Révision finale, décision d’inspection, questions de coût et de droits, puis prochaine décision humaine.",
  },
  quiz: [
    [
      "Qu’approuve l’achèvement du cours ?",
      "Seulement le relevé d’autoformation décrit",
      "Tous les produits",
      "Une résistance garantie",
      "L’achèvement n’est pas une qualification du produit.",
    ],
    [
      "Que devient une preuve non résolue ?",
      "Elle reste visible pour la revue",
      "Elle devient un accord",
      "Elle disparaît du dossier",
      "Les inconnues doivent être résolues ou limitées honnêtement.",
    ],
    [
      "La publication suit-elle automatiquement l’exercice ?",
      "Non",
      "Toujours",
      "Après une bonne photo",
      "La publication est une décision distincte du responsable.",
    ],
    [
      "Quel objet convient à cet exercice débutant ?",
      "Un objet de bureau original simple",
      "Un composant de sécurité",
      "Un produit aux exigences inconnues",
      "Choisissez un usage modeste et délimité.",
    ],
    [
      "Quelles décisions sont valables à la revue ?",
      "Revoir, corriger ou arrêter",
      "Vendre obligatoirement",
      "Ignorer les inconnues",
      "Corriger ou arrêter peut être la conclusion appropriée.",
    ],
  ],
});
const reading: ReadingSection[] = [
  {
    title: "Définir un produit et sa révision",
    sources: ["design", "safety", "etsy"],
    paragraphs: [
      "Le dernier exercice rassemble les preuves d’un objet de bureau original simple. Choisissez une forme aux conséquences limitées en cas de panne, comme une petite base d’étiquette ou un séparateur. Écartez composant de sécurité et usage aux exigences inconnues. Identifiez clairement la révision et gardez la source modifiable. La revue porte sur un produit et un procédé définis. Des photos d’une version, des dimensions d’une autre et des coûts d’une troisième ne forment pas un dossier cohérent, même si chaque fichier paraît complet lorsqu’il est lu séparément.",
      "Écrivez usage et limites de la promesse. Qui utilisera l’objet, pour quelle fonction et quels usages n’ont pas été évalués ? Reliez matière, orientation et profil à cette révision. Identifiez toute exigence incertaine avant de réunir le dossier final. Une meilleure formulation ne doit pas faire disparaître l’inconnu. L’objectif est de donner assez de faits pour choisir une suite, y compris une révision ou l’abandon du produit. Une conclusion prudente et motivée vaut davantage qu’un accord obtenu en masquant une limite connue derrière un texte plus vendeur.",
    ],
  },
  {
    title: "Relier les preuves entre elles",
    sources: ["listing", "photos", "design", "rights"],
    paragraphs: [
      "Rassemblez source et droits, projet préparé, carnets, pièces inspectées, petit lot, coûts, images et essai d’emballage. Vérifiez que chaque élément nomme la révision actuelle ou explique la comparaison avec une version antérieure. Une permission ne remplace pas une inspection, et une impression réussie ne règle pas l’admissibilité de plateforme. Comparez chaque exigence à la preuve qui la concerne réellement. Laissez les lignes absentes non résolues. Un dossier bien présenté facilite la lecture; son organisation ne prouve pas à elle seule que le produit répond à ses exigences.",
      "Lisez le texte proposé devant l’échantillon physique. Pour chaque affirmation importante, retrouvez son appui : plan ou mesure pour une cote, liste pour le contenu, référence traçable pour la matière et essai adapté pour une performance. Supprimez ou limitez ce qui dépasse les faits. Cet exercice révèle souvent une discordance facile à corriger localement et coûteuse à expliquer après une vente. N’utilisez pas une réserve générique pour conserver une promesse trompeuse. Le lecteur doit comprendre ce que l’objet fait réellement et ce qui reste encore à établir.",
    ],
  },
  {
    title: "Séparer coûts, capacité et exigences",
    sources: ["cost", "fees", "etsy", "safety"],
    paragraphs: [
      "Contrôlez arithmétique et exclusions de la fiche de coût. Gardez les entrées non mesurées visibles et distinguez sous-total et prix approuvé. Relisez préparation, impression, inspection et emballage avant de proposer un délai. Trois essais donnent des observations utiles, pas un taux de défaut garanti ni une capacité certaine. Considérez l’équipement et la matière réellement disponibles pour une commande. Un produit peut sembler prometteur tout en demandant encore du travail sur le prix ou l’expédition. Ces décisions distinctes méritent des statuts séparés dans le dossier final.",
      "Actualisez les règles concernant produit, destination et plateforme avant toute publication réelle. Permission du modèle, admissibilité commerciale et exigences du produit ne sont pas interchangeables. Obtenez une aide spécialisée lorsque l’usage dépasse vos preuves ou vos compétences. Le cours ne fournit pas une liste universelle d’approbation juridique ou de sécurité pour toutes les catégories. Sa méthode nomme l’usage, identifie les questions applicables et conserve les points non résolus. L’attestation enregistre l’apprentissage; elle ne règle aucune obligation extérieure et ne qualifie pas automatiquement le produit issu de l’exercice.",
    ],
  },
  {
    title: "Décider avec une prochaine action concrète",
    sources: ["etsy", "listing", "cost", "safety"],
    paragraphs: [
      "Choisissez entre dossier prêt pour une revue distincte, correction de preuves précises ou arrêt de la proposition. Prêt à revoir signifie que le dossier peut être évalué, pas qu’il est permis de publier ou vendre automatiquement. Une correction nomme l’élément manquant : réessai d’ajustement dans la matière finale ou nouvelle mesure du colis, par exemple. Un arrêt peut expliquer que l’usage dépasse le procédé ou les preuves disponibles. Les trois conclusions sont utiles lorsqu’elles suivent les observations plutôt que le désir de terminer le cours par une réussite commerciale.",
      "Gardez le dossier local avec date, révision, questions restantes et prochaine décision humaine. Ne publiez pas, n’acceptez pas de paiement et ne promettez pas de livraison dans cet exercice. Si la dernière impression échoue à un critère choisi, conservez ce résultat et révisez au lieu de substituer une ancienne photo flatteuse. L’apprentissage peut être accompli en appliquant honnêtement la méthode, y compris par une décision justifiée d’arrêter. La valeur réside dans la chaîne traçable reliant conception originale, préparation et inspection à une décision commerciale limitée qu’une autre personne peut réellement examiner.",
    ],
  },
];
export default { lesson: content, reading };
