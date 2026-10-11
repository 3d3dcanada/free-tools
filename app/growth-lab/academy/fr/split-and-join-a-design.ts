import { frenchLesson } from "./lesson";
import type { ReadingSection } from "../types";
const content = frenchLesson(25, {
  summary:
    "Divisez une pièce pour résoudre un problème précis d’impression, puis prévoyez son positionnement et sa retenue après fabrication. Conservez la source modifiable et vérifiez l’accès à l’assemblage avant d’imprimer. Cette leçon gratuite propose un petit exercice de jonction à sec. Aucun fichier n’est téléversé; vos notes restent localement sur votre appareil.",
  learn: "Concevoir une jonction simple en conservant un modèle réellement modifiable.",
  steps: [
    "Gardez la source CAO cotée et exportez les maillages séparément. Une exportation STL ne remplace pas la source permettant une modification volontaire.",
    "Choisissez une séparation qui améliore l’impression et reste accessible au montage. Évitez de couper sans réflexion une zone où la continuité transmet un effort.",
    "Ajoutez un élément de positionnement et choisissez la retenue prévue. Vérifiez le jeu sur une courte éprouvette, puis l’accès aux doigts et aux outils.",
    "Assemblez les pièces refroidies à sec avant toute liaison permanente. Pour un adhésif éventuel, vérifiez compatibilité, préparation et fiche de sécurité du produit précis.",
  ],
  mistakes: [
    "Supprimer la source CAO après avoir exporté les STL.",
    "Créer une jonction impossible à atteindre pendant l’assemblage.",
  ],
  practice: {
    task: "Divisez un bloc de 40 × 20 × 10 mm en deux éléments avec un repère de positionnement et un jeu testé. Vérifiez uniquement un assemblage de bureau à sec, sans prétention de résistance.",
    record: "Source, fichiers des deux pièces, ordre de montage et observations sur alignement et accès.",
  },
  quiz: [
    [
      "Quel fichier doit rester modifiable ?",
      "La source de conception",
      "Seulement une photo",
      "Uniquement le fichier machine",
      "La source permet de réviser volontairement les dimensions.",
    ],
    [
      "Quelle difficulté ajoute une séparation ?",
      "La jonction et l’alignement",
      "Aucune",
      "La disparition des tolérances",
      "Deux pièces doivent ensuite être positionnées et retenues.",
    ],
    [
      "Quand la jonction doit-elle rester accessible ?",
      "Au montage et à l’inspection",
      "Seulement dans la CAO",
      "Jamais",
      "Prévoyez les outils et les vérifications nécessaires.",
    ],
    [
      "Que faire avant de coller ?",
      "Un assemblage à sec",
      "Forcer sans vérifier",
      "Supprimer les repères",
      "Vérifiez la géométrie avant une opération permanente.",
    ],
    [
      "Une séparation peut-elle faciliter l’impression ?",
      "Oui, avec des compromis",
      "Toujours sans conséquence",
      "Jamais",
      "Comparez le bénéfice d’impression au travail d’assemblage ajouté.",
    ],
  ],
});
const reading: ReadingSection[] = [
  {
    title: "Résoudre un problème identifiable",
    sources: ["cut", "design"],
    paragraphs: [
      "Une séparation peut réduire des supports difficiles à enlever, permettre une orientation plus favorable ou faire entrer les éléments sur le plateau. N’en faites pas un objectif en soi. Comparez la fabrication entière avec la chaîne complète des deux pièces : impression, nettoyage, alignement, retenue et inspection. Un gain dans le trancheur peut devenir une difficulté au montage. Écrivez donc la raison de la coupe et le résultat attendu avant de modifier la géométrie. Cette phrase permet ensuite de juger si la séparation a effectivement rendu le projet plus simple.",
      "Conservez une version entière et modifiable du modèle. Pour l’exercice, un bloc de 40 × 20 × 10 mm donne une forme simple avec une jonction accessible. Ce choix permet d’observer les opérations sans en déduire la résistance d’un produit chargé. Dessinez le plan de séparation, le sens d’assemblage et les surfaces qui se rencontrent. Si vous ne pouvez pas expliquer comment les deux morceaux se rapprochent sans interférence, revenez au croquis avant d’ajouter des détails de fixation ou d’imprimer plusieurs variantes coûteuses.",
    ],
  },
  {
    title: "Distinguer positionnement et retenue",
    sources: ["cut", "design", "fasteners"],
    paragraphs: [
      "Un tenon dans un logement peut guider l’alignement sans retenir les pièces contre une séparation. Identifiez ces deux fonctions distinctes. La retenue peut demander une fixation, un adhésif compatible ou une autre conception, chacun avec ses contraintes. Pensez à l’ordre des opérations et au passage des doigts ou de l’outil. Une vis visible dans la vue assemblée peut devenir inaccessible après la pose d’un autre élément. Une jolie image de CAO ne prouve donc pas que la procédure de montage soit réalisable sur l’objet physique.",
      "Les jeux doivent être essayés avec l’orientation et le matériau prévus. Un outil de découpe ou de connecteurs crée une géométrie; il ne vérifie pas l’ajustement réel de votre imprimante. Identifiez aussi si le connecteur est intégré à une pièce ou constitue un troisième élément à fabriquer. Vérifiez la liste d’exportation pour ne pas oublier cette petite pièce. Gardez les repères en dehors des surfaces d’appui importantes. Le nom de chaque fichier doit permettre de retrouver son rôle dans l’assemblage sans dépendre d’un souvenir de la séance de conception.",
    ],
  },
  {
    title: "Garder les révisions et vérifier à sec",
    sources: ["design", "firstlayer", "supportfinish"],
    paragraphs: [
      "Enregistrez la source, une révision identifiable et les exports nécessaires. Conservez une vue assemblée, mais contrôlez séparément l’orientation de chaque élément sur le plateau. Vérifiez les unités des deux exports, les profils des projets et les faces supportées. Deux fichiers issus d’un même dessin ne garantissent pas que leur préparation soit identique après importation. Une liste simple des noms, dimensions attendues et orientations évite de mélanger une ancienne moitié avec la nouvelle. Gardez la révision précédente jusqu’à ce que le candidat ait été effectivement vérifié.",
      "Après refroidissement et nettoyage documenté, présentez les pièces à sec. Cherchez un espace, une marche, une lèvre de première couche ou une cicatrice de support avant de limer. Notez ce qui touche et l’endroit du défaut. Redimensionner tout l’assemblage pour corriger une petite interférence peut déplacer d’autres dimensions correctes. Préférez une correction locale expliquée, puis une nouvelle éprouvette si nécessaire. Une liaison obtenue seulement en forçant ou en déformant fortement les éléments ne constitue pas une validation du jeu nominal inscrit dans le dessin.",
    ],
  },
  {
    title: "Traiter la liaison permanente séparément",
    sources: ["cut", "design", "fasteners", "safety"],
    paragraphs: [
      "Une liaison adhésive demande sa propre décision : compatibilité du polymère, préparation, conditions d’application, temps de durcissement et mesures de la fiche de sécurité. Il n’existe pas ici de colle universelle ni de délai valable pour tous les produits. L’exercice se termine à sec; il ne mesure aucune résistance de collage. Une fixation mécanique demande elle aussi dimensions, accès, inspection et réflexion sur les efforts. N’utilisez pas la réussite d’un petit montage de bureau comme justification pour une liaison dont la rupture aurait des conséquences importantes.",
      "Réunissez finalement source, exports, croquis de montage et observations. Précisez quel élément positionne et lequel retient, ainsi que les vérifications encore ouvertes. Si la séparation n’a apporté aucun bénéfice réel, conserver le modèle entier peut être la meilleure conclusion. Apprendre à renoncer à une jonction inutile fait partie du travail. Le résultat attendu n’est pas le nombre de morceaux créés : c’est une décision traçable sur la fabrication et l’assemblage, avec un essai limité qui montre ce qui fonctionne et laisse clairement visibles ses limites.",
    ],
  },
];
export default { lesson: content, reading };
