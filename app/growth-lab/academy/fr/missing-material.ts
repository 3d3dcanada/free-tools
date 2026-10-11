import { frenchLesson } from "./lesson";
import type { ReadingSection } from "../types";
const content = frenchLesson(29, {
  summary:
    "Un manque de matière demande de comparer les trajets prévus au dépôt réel, puis de vérifier alimentation, profil et capacité du procédé. Augmenter le multiplicateur de débit ne répare pas une obstruction. Cette leçon gratuite organise des vérifications documentées. Aucun fichier n’est téléversé; vos observations restent sur votre appareil et sous votre contrôle.",
  learn: "Suivre un manque de matière avec des vérifications sûres et documentées.",
  steps: [
    "Notez où la matière manque et si le défaut suit un changement. Arrêtez une impression manifestement échouée et comparez son aperçu aux zones concernées.",
    "Vérifiez le parcours externe du filament et le mouvement de bobine dans l’état sûr prévu. Cherchez un accrochage sans intervenir dans une alimentation active.",
    "Confirmez buse, profil et matériau. Une vitesse commandée peut demander davantage de matière fondue que le montage ne peut réellement fournir.",
    "Suivez la procédure précise de maintenance ou de débouchage si elle est indiquée. Réessayez un spécimen connu avant d’affiner le débit; n’improvisez pas un démontage de tête.",
  ],
  mistakes: [
    "Masquer un problème mécanique ou thermique par un débit excessif.",
    "Démonter une tête chauffante avec les instructions d’une autre conception.",
  ],
  practice: {
    task: "Imprimez le bloc de référence après les vérifications prescrites, ou inspectez une base déjà saine en rédigeant le chemin de diagnostic. Ne provoquez pas volontairement un bouchage.",
    record: "Emplacement du défaut, vérification choisie et résultat du nouvel essai.",
  },
  quiz: [
    [
      "Augmenter le débit doit-il être la première réponse automatique ?",
      "Non",
      "Toujours",
      "Sans limite",
      "Vérifiez les causes en amont avant l’ajustement fin.",
    ],
    [
      "Qu’est-ce qui peut freiner le matériau avant la tête ?",
      "Une bobine ou un parcours accroché",
      "Le nom du fichier",
      "Le fond de l’aperçu",
      "Le chemin d’alimentation fait partie du procédé.",
    ],
    [
      "La vitesse demandée peut-elle dépasser la capacité de fusion ?",
      "Oui",
      "Jamais",
      "Seulement dans la CAO",
      "La fourniture dépend du matériel et de la matière.",
    ],
    [
      "Quelle notice commande le démontage ?",
      "Celle de la tête précise",
      "La première vidéo trouvée",
      "N’importe quelle imprimante",
      "Les conceptions de tête diffèrent.",
    ],
    [
      "Quel nouvel essai convient ?",
      "Un petit spécimen connu",
      "Une obstruction volontaire",
      "Une grande commande urgente",
      "Gardez la recherche de cause limitée et sûre.",
    ],
  ],
});
const reading: ReadingSection[] = [
  {
    title: "Comparer manque et trajet prévu",
    sources: ["under", "viewer", "first"],
    paragraphs: [
      "La matière peut manquer entre lignes, dans une paroi ou après une interruption en hauteur. Comparez d’abord la zone aux trajets tranchés. Si le détail n’existe pas dans l’aperçu, la machine n’a pas reçu l’instruction attendue. Si le trajet existe mais que son dépôt manque, examinez alimentation et conditions du procédé. Notez endroit, hauteur et éventuel changement précédent. Arrêtez un travail clairement échoué plutôt que de continuer à produire un spécimen inutilisable. La comparaison sépare ainsi un problème de préparation d’un problème possible de fourniture.",
      "Une nouvelle bobine, une autre buse, un profil importé ou un entretien récent peut avoir changé une hypothèse. Écrivez ces faits sans leur attribuer automatiquement la faute. Un vide répété pendant chaque remplissage rapide suggère une première vérification différente d’un arrêt complet après un accrochage de bobine. Décrivez assez précisément pour distinguer ces cas. Le terme sous-extrusion nomme le manque visible, mais ne désigne pas son origine. Une note qui se limite à ce mot perd les indices nécessaires pour choisir une action ciblée et comparable.",
    ],
  },
  {
    title: "Suivre l’alimentation dans l’état prévu",
    sources: ["under", "maintenance", "safety"],
    paragraphs: [
      "Examinez parcours externe, bobine et guides autorisés sans atteindre un mécanisme en mouvement. Cherchez un accrochage visible ou un chemin incompatible prévu par la procédure du fabricant. Ne tirez pas fortement contre une alimentation active. Si le déchargement demande une température particulière, suivez cette séquence et ses précautions : tout entretien n’est pas automatiquement froid ou chaud. La conception détermine l’accès sûr. Arrêtez et demandez une aide qualifiée lorsqu’une inspection dépasse les opérations documentées pour l’utilisateur, au lieu d’explorer les pièces internes par essais successifs.",
      "Confirmez la buse installée, le profil sélectionné et la compatibilité du matériau avec les températures. Une discordance modifie les hypothèses d’extrusion. Consultez les alertes du diagnostic ou de l’entretien pris en charge. Ne serrez pas indistinctement les composants d’alimentation et ne démontez pas une tête avec les consignes d’une autre révision. Photo et relevé de configuration aident le fabricant à distinguer une vérification courante d’une réparation nécessaire. Cette progression réduit le risque de créer plusieurs nouveaux défauts en cherchant à résoudre le manque initial.",
    ],
  },
  {
    title: "Distinguer demande et multiplicateur",
    sources: ["maxflow", "flow", "under"],
    paragraphs: [
      "Une ligne plus large ou plus haute à vitesse égale demande davantage de volume par seconde. Avec une approximation rectangulaire, 0,5 mm de largeur × 0,2 mm de hauteur × 80 mm/s donne 8 mm³/s. Passer à 120 mm/s porte la demande à 12 mm³/s. Ces nombres décrivent une commande, pas la capacité mesurée de votre tête. Les modèles de cordon et limites réelles ajoutent des détails. Consultez les limites volumétriques prises en charge et l’aperçu au lieu de supposer que toute vitesse inscrite sera réalisable.",
      "Le multiplicateur change la quantité commandée; il ne supprime ni obstruction ni limite de fusion. L’augmenter pour cacher un problème d’alimentation peut ajouter trop de matière là où le procédé fonctionnait déjà. La calibration fine du débit vient après vérification de la machine, du parcours et de l’état du filament. Si le défaut apparaît seulement quand la demande augmente, revenez à la base et aux recommandations du fabricant. Un ralentissement qui masque le manque est un indice utile, mais ne démontre pas l’élimination de toutes les autres causes possibles.",
    ],
  },
  {
    title: "Reprendre un spécimen connu",
    sources: ["under", "flow", "teaching"],
    paragraphs: [
      "Après la correction documentée, imprimez le même petit spécimen avec ses paramètres connus. Comparez la zone initialement touchée et inspectez le reste pour détecter un nouveau défaut. Notez le résultat avant un deuxième changement. Si la machine produit déjà une bonne base, utilisez cet exemplaire pour pratiquer le raisonnement; ne fabriquez pas un bouchage. Une reprise réussie soutient la correction dans les conditions observées. Un nouvel échec justifie davantage de preuves ou une aide compétente, plutôt qu’une succession de valeurs de débit de plus en plus grandes.",
      "Le dossier final contient emplacement du manque, changements récents, contrôles d’alimentation et de profil, procédure suivie et résultat. Si la cause demeure incertaine, dites-le. Une impression réussie sans explication ne devient pas automatiquement une réparation confirmée. Gardez projets et spécimens identifiés pour permettre leur comparaison. La compétence travaillée consiste à relier une absence de matière à une prochaine vérification justifiée. Le réglage fin du débit conserve ainsi sa fonction réelle, au lieu de devenir une réponse universelle à tout vide observé sur une pièce imprimée.",
    ],
  },
];
export default { lesson: content, reading };
