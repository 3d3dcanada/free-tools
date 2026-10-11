import { frenchLesson } from "./lesson";
import type { ReadingSection } from "../types";
const content = frenchLesson(28, {
  summary:
    "Un coin peut se relever après une première couche correctement attachée. Notez le moment, la forme et les conditions, puis vérifiez préparation et environnement sans neutraliser les protections. Cette leçon gratuite compare une intervention limitée et sa planéité réelle. Aucun fichier n’est téléversé; les observations et la progression restent sur votre appareil.",
  learn: "Distinguer un relevage tardif d’un défaut initial et choisir une comparaison utile.",
  steps: [
    "Notez quel coin se relève et à quel moment. Arrêtez si la pièce relevée risque de heurter la buse; ne la maintenez jamais dans le mécanisme en mouvement.",
    "Vérifiez compatibilité de la surface, préparation et profil. Une adhérence initiale incertaine doit être traitée avant de modifier l’environnement thermique.",
    "Consultez les exigences de refroidissement et d’enceinte du matériau et de l’imprimante. Le contrôle des émissions doit rester efficace pendant toute modification autorisée.",
    "Comparez une bordure prise en charge, une orientation différente ou une section plus petite, un changement à la fois. Limitez votre conclusion à la configuration réellement testée.",
  ],
  mistakes: [
    "Augmenter le plateau au-delà de la plage prise en charge.",
    "Improviser une enceinte sans vérifier la compatibilité de l’équipement.",
  ],
  practice: {
    task: "Imprimez un bloc de 40 × 20 × 3 mm dans une matière prise en charge et inspectez sa planéité. Pour essayer une bordure, gardez une base enregistrée sans cette modification.",
    record: "Coins observés, conditions ambiantes et facteur unique modifié.",
  },
  quiz: [
    [
      "Un relevage peut-il suivre une première couche attachée ?",
      "Oui",
      "Jamais",
      "Seulement avant le départ",
      "La contraction ultérieure peut relever une pièce initialement attachée.",
    ],
    [
      "Que noter à propos du défaut ?",
      "L’endroit et le moment",
      "Seulement la couleur",
      "Un diagnostic supposé",
      "La répartition du défaut guide les vérifications.",
    ],
    [
      "Faut-il toujours chauffer davantage le plateau ?",
      "Non",
      "Toujours",
      "Au maximum disponible",
      "Respectez les conditions du matériau et de l’équipement.",
    ],
    [
      "Que préserver en contrôlant les courants d’air ?",
      "Le dispositif de maîtrise des émissions",
      "Seulement le silence",
      "Aucune ventilation",
      "Les exigences thermiques et d’exposition comptent ensemble.",
    ],
    [
      "Quel est le rôle possible d’une bordure ?",
      "Aider l’adhérence dans un cas précis",
      "Garantir toutes les pièces",
      "Remplacer la préparation",
      "Son utilité dépend de la configuration et n’est pas universelle.",
    ],
  ],
});
const reading: ReadingSection[] = [
  {
    title: "Utiliser le moment du défaut",
    sources: ["warp", "adhesion", "safety"],
    paragraphs: [
      "Un coin jamais attaché et un coin d’abord plat qui se relève plus tard ne sont pas la même observation. Le premier oriente vers préparation et dépôt initial. Le second peut impliquer contraction et évolution thermique pendant la construction. Notez le coin et le premier moment où vous avez vu le changement. Arrêtez si la hauteur crée une collision ou une autre situation dangereuse. Ne pressez pas la pièce dans la zone mobile : la maintenir à la main ne rétablit pas un procédé d’impression contrôlé.",
      "Inspectez empreinte et forme dans le projet sauvegardé. Une plaque large et mince peut se comporter autrement qu’un bloc compact avec le même filament. Notez orientation, surface de contact et aide d’adhérence. La photo finale ne raconte pas toute la séquence; gardez aussi les observations datées du déroulement. N’attribuez pas automatiquement chaque coin relevé à un courant d’air ou à un plateau sale. Le dossier doit permettre de choisir une première vérification pertinente, sans transformer une apparence en preuve d’une cause unique et certaine.",
    ],
  },
  {
    title: "Vérifier la préparation avant la chaleur",
    sources: ["surface", "warp", "asa", "materialtable"],
    paragraphs: [
      "Confirmez la compatibilité de la plaque, du matériau et du profil, puis la préparation de première couche prescrite. Si le contact initial était insuffisant, traitez ce point avant d’essayer une enceinte ou une plus grande bordure. Une modification reposant sur un état de surface inconnu reste difficile à interpréter. Consultez les instructions de nettoyage et de retrait de cette plaque. Davantage de colle ou d’adhérence n’est pas automatiquement préférable : certaines combinaisons collent assez fortement pour endommager la surface au retrait. Pensez à l’attachement et au décollage ensemble.",
      "Relisez les exigences de refroidissement et d’enceinte du matériau avec celles de la machine. Ne coupez pas tous les ventilateurs et ne dépassez pas la plage du plateau. Les géométries et matières demandent des traitements différents. Une consigne de chauffage n’est pas une mesure de la température de toute la pièce. Si l’équipement ne permet pas les conditions requises, il manque une condition de préparation; ce n’est pas un défi à résoudre par des réglages toujours plus extrêmes. Revenez à une combinaison prise en charge.",
    ],
  },
  {
    title: "Garder les protections opérationnelles",
    sources: ["enclosure", "safety", "asa"],
    paragraphs: [
      "Un courant d’air inattendu ou une variation de pièce peut compter. Notez une porte ouverte ou une modification de ventilation, sans prendre la coïncidence pour une cause prouvée. Le dispositif de maîtrise des émissions doit continuer à fonctionner. Éviter un souffle froid directement sur l’impression ne signifie pas enfermer la machine dans une boîte non évaluée ou arrêter une extraction requise. Stabilité thermique et protection contre l’exposition se traitent ensemble dans une installation adaptée et documentée, particulièrement avec une matière exigeante pour l’espace de travail.",
      "Si une enceinte prise en charge fait partie du procédé, vérifiez ses conditions autorisées et son entretien. Gardez composants et environnement dans leurs limites. N’ajoutez pas une source de chaleur improvisée pour augmenter la température interne. Si les conditions ne peuvent pas être établies correctement, arrêtez cet essai de matériau et notez la limite. Une petite impression réussie dans un environnement incertain ne valide pas l’installation. Les leçons de sécurité et de matière précèdent cet essai, car un coin plus plat ne justifie pas une protection supprimée.",
    ],
  },
  {
    title: "Comparer une intervention puis la planéité",
    sources: ["warp", "design", "supports"],
    paragraphs: [
      "Choisissez une intervention autorisée reliée aux faits : bordure documentée, orientation différente ou section représentative plus petite. Maintenez le reste et sauvegardez le projet. Une bordure modifie l’empreinte et ajoute du nettoyage; relevez ces deux conséquences. Un petit spécimen aide à explorer le procédé mais peut ne pas reproduire la déformation de la grande pièce. Sa réussite ne prouve donc pas que la géométrie originale soit corrigée. Quand un changement candidat semble pertinent, revenez à la forme réelle pour vérifier que le bénéfice se maintient.",
      "Pour le bloc pédagogique refroidi, inspectez la base sur une référence plane adaptée sans forcer le contact. Notez relevage visible ou incertitude, ainsi que les conditions. Si la base n’a aucun défaut, préservez ce résultat et écrivez le plan de diagnostic au lieu de fabriquer une panne. Le compte rendu relie moment, préparation, environnement et changement unique à une observation réelle. Cette chaîne donne une raison à l’essai suivant et empêche une collection d’astuces d’adhérence de remplacer une investigation propre à la pièce et à son procédé.",
    ],
  },
];
export default { lesson: content, reading };
