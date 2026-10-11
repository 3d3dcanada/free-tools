import { frenchLesson } from "./lesson";
import type { ReadingSection } from "../types";
const content = frenchLesson(23, {
  summary:
    "Un pont franchit un vide entre des régions soutenues; un porte-à-faux dépasse la matière située dessous. Leur réussite dépend de la géométrie et du procédé, pas d’une règle d’angle universelle. Cette leçon gratuite les compare sur une petite éprouvette documentée. Aucun modèle n’est téléversé et vos réponses restent enregistrées sur votre appareil.",
  learn: "Identifier la construction sans soutien et choisir un essai limité.",
  steps: [
    "Repérez dans l’aperçu le début et la fin du premier trajet sans matière dessous. Vérifiez s’il possède des appuis aux deux extrémités.",
    "Essayez une rotation qui réduit la portée ou évite le porte-à-faux. Examinez les autres faces avant de retenir cette orientation.",
    "Utilisez la référence de pontage compatible avec la matière. Si l’affaissement persiste, comparez un seul réglage pertinent selon la procédure adaptée.",
    "Observez le dessous refroidi. Conservez portée et paramètres avec le résultat sans le généraliser à tous les modèles et matériaux.",
  ],
  mistakes: [
    "Appeler pont toute surface située au-dessus du vide.",
    "Promettre la même portée sans support pour chaque imprimante.",
  ],
  practice: {
    task: "Imprimez le 3DBenchy officiel à son échelle normale avec une référence compatible et regardez l’ouverture de cabine. Un exemplaire antérieur peut être repris si sa préparation est connue.",
    record: "Un pont, un porte-à-faux et une description de l’état réel de leurs dessous.",
  },
  quiz: [
    [
      "Qu’est-ce qui caractérise un pont ?",
      "Une portée entre des extrémités soutenues",
      "Un bord libre seulement",
      "La présence d’une couleur",
      "Le pont relie des régions qui lui fournissent des appuis.",
    ],
    [
      "Qu’est-ce qui peut réduire une portée difficile ?",
      "Une orientation mieux choisie",
      "Un nouveau nom de fichier",
      "Une image agrandie à l’écran",
      "La position modifie le vide à franchir.",
    ],
    [
      "Quels paramètres peuvent influencer un pont ?",
      "Refroidissement et vitesse",
      "Le nom du créateur seulement",
      "La taille de l’écran",
      "Utilisez la référence compatible du matériau pour les réglages pertinents.",
    ],
    [
      "Quelle face examiner après impression ?",
      "Le dessous",
      "Seulement la photo du modèle",
      "Uniquement le dessus fermé",
      "Le dessous révèle affaissement et lignes incomplètes.",
    ],
    [
      "Un pont réussi fixe-t-il une limite universelle ?",
      "Non",
      "Oui, pour toute matière",
      "Oui, pour toute longueur",
      "Le résultat dépend du matériel, du procédé et de la géométrie.",
    ],
  ],
});
const reading: ReadingSection[] = [
  {
    title: "Chercher deux appuis ou un bord qui avance",
    sources: ["bridge", "supports", "design"],
    paragraphs: [
      "Le pont traverse un espace entre des régions soutenues. Le porte-à-faux s’étend au-delà de la matière sous-jacente. La distinction devient plus claire sur les premiers trajets franchissant le vide que sur la forme complète. Marquez début et fin de la portée, puis ce qui les ancre. Pour une avancée, repérez le bord soutenu et la portion qui dépasse. Ces croquis orientent le choix du contrôle et évitent de traiter toutes les surfaces tournées vers le bas comme si elles posaient exactement le même problème d’impression.",
      "Une poutre entre deux poteaux fournit un exemple simple de pont; une tablette portée par un seul poteau fournit un exemple de porte-à-faux. Aucun dessin n’impose une distance ou un angle autorisés partout. Géométrie, refroidissement, matériau et réglages influencent le résultat. Une règle indicative peut signaler une région à examiner sans remplacer aperçu et essai. Conservez portée et orientation dans le relevé. Une courte traversée réussie ne doit pas être citée plus tard comme preuve qu’une ouverture beaucoup plus longue sera aussi correctement construite.",
    ],
  },
  {
    title: "Changer le problème avant de chercher un réglage",
    sources: ["supports", "cut", "bridge", "tpu"],
    paragraphs: [
      "Tournez la pièce et vérifiez si la portée diminue ou si les couches précédentes soutiennent maintenant l’avancée. Contrôlez les conséquences pour les autres faces, la base et la direction des couches. Une rotation qui résout un pont peut imposer des supports sur une face critique ou créer un autre départ isolé. Si aucune position ne sert bien l’ensemble, envisagez séparation ou redessin. Les supports ne sont qu’un moyen parmi plusieurs. Une modification raisonnée de forme peut être plus répétable qu’un pont maintenu tout juste à la limite du procédé.",
      "Si vous utilisez de la matière temporaire, inspectez l’accès au retrait. Une ouverture qui paraît dégagée de face peut contenir une zone plus profonde difficile à atteindre. Ne retenez pas la stratégie d’après la seule consommation estimée : qualité du dessous et accès au nettoyage comptent pour l’usage final. Gardez des réglages de support et de pontage adaptés au matériau. Une valeur utile sur une petite portée refroidie d’un polymère ne s’applique pas automatiquement à un grade souple ou à une grande cavité fermée qui impose d’autres conditions.",
    ],
  },
  {
    title: "Examiner la première portée et le dessous terminé",
    sources: ["benchy", "bridge", "viewer"],
    paragraphs: [
      "Utilisez le modèle officiel à échelle normale ou une forme simple clairement documentée. Dans l’aperçu, localisez l’ouverture de cabine et les premiers trajets qui la franchissent. Gardez taille et orientation identiques si vous comparez à une pièce antérieure. Après essai supervisé et refroidissement, cherchez affaissement, brins libres ou autres différences sous l’ouverture. Écrivez ce que vous voyez réellement. Un dessus qui finit par se fermer proprement peut cacher une première couche de pont médiocre. Regardez donc aussi de côté et par-dessous avant de juger l’ensemble.",
      "Si une investigation est nécessaire, suivez la méthode compatible du fabricant et modifiez une variable pertinente à la fois. Vitesse, refroidissement et débit peuvent interagir; les changer ensemble n’isole pas une cause. Gardez profil et premier échantillon. Comparez la même portée sous un éclairage stable et notez les nouveaux défauts ailleurs. N’imposez pas une règle de ventilation maximale à tous les matériaux. Vous cherchez une comparaison explicable qui répond à l’état du dessous, pas une recette universelle déduite d’une seule photographie avantageuse.",
    ],
  },
  {
    title: "Décrire la limite de l’observation",
    sources: ["bridge", "supports", "benchylicense"],
    paragraphs: [
      "Un petit pont réussi montre que la configuration relevée a produit cette portée avec la qualité observée. Il ne démontre ni capacité structurelle, ni étanchéité, ni aptitude à toute ouverture. Si le dessous est une face fonctionnelle d’assemblage, mesurez ou évaluez la caractéristique pertinente au lieu de l’accepter uniquement parce que les fils sont discrets. Si le nettoyage retire de la matière, notez séparément cette modification. L’application détermine le critère d’acceptation. L’éprouvette sert à comprendre construction et observation, pas à qualifier un produit sans rapport avec elle.",
      "La note finale identifie pont, porte-à-faux, appuis et résultat réel du dessous. Ajoutez source du modèle, échelle, matière, profil et éventuel réglage unique. Pour un exemplaire réutilisé, confirmez que sa préparation est enregistrée avant de comparer les procédés. Si sa provenance manque, il peut aider à nommer des détails visibles, tout en laissant ouvertes les conclusions sur les paramètres. Cette distinction garde un ancien échantillon utile à l’apprentissage sans le présenter comme preuve contrôlée d’un réglage que vous n’avez ni observé ni consigné lors de sa fabrication.",
    ],
  },
];
export default { lesson: content, reading };
