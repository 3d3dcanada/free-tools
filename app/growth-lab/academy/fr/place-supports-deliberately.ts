import { frenchLesson } from "./lesson";
import type { ReadingSection } from "../types";
const content = frenchLesson(22, {
  summary:
    "Placez les supports sous les détails qui en ont besoin, puis vérifiez leur accès après impression. Ils ajoutent matière, temps et contacts à nettoyer; un support impossible à retirer peut rendre la pièce inutilisable. Cette leçon gratuite prépare une petite forme accessible. Aucun fichier n’est téléversé et vos réponses restent dans votre navigateur.",
  learn: "Examiner emplacement, contacts et retrait des supports avant de lancer la machine.",
  steps: [
    "Repérez la couche qui commence sans soutien utile. Comparez rotation ou séparation du modèle avant d’ajouter une grande structure temporaire.",
    "Activez le mode approprié et inspectez les trajets générés. Identifiez les surfaces que les supports touchent.",
    "Évitez les cavités inaccessibles lorsque c’est possible. Un support que vous ne pouvez atteindre peut contredire le but de la conception.",
    "Commencez avec l’interface et les contacts du profil compatible. Notez état du dessous et retrait avant tout ajustement fin.",
  ],
  mistakes: [
    "Supposer que tout support automatique est retirable.",
    "Utiliser le même espace de contact pour tous les matériaux et toutes les hauteurs.",
  ],
  practice: {
    task: "Créez une forme en T avec deux boîtes réunies en CAO : tige de 10 × 10 × 15 mm et dessus de 30 × 10 × 3 mm. Vérifiez puis imprimez avec des supports accessibles.",
    record: "Un croquis des contacts et l’état du dessous après retrait sur pièce refroidie.",
  },
  quiz: [
    [
      "Quel est le rôle d’un support ?",
      "Soutenir temporairement un détail",
      "Certifier la résistance",
      "Changer le matériau",
      "Il aide la construction et se retire généralement ensuite.",
    ],
    [
      "Que vérifier dans une cavité ?",
      "L’accès pour le retrait",
      "Uniquement la couleur",
      "Le nom du fichier",
      "Un support prisonnier peut rendre la pièce inutilisable.",
    ],
    [
      "Quelle alternative peut réduire les supports ?",
      "Changer l’orientation ou diviser la pièce",
      "Renommer le projet",
      "Cacher l’aperçu",
      "Géométrie et orientation peuvent simplifier la construction.",
    ],
    [
      "Qu’influence le contact des supports ?",
      "La finition de la surface soutenue",
      "La licence de la machine",
      "Le prix de la bobine uniquement",
      "Les faces de contact peuvent demander un nettoyage.",
    ],
    [
      "Un seul espace de contact convient-il partout ?",
      "Non",
      "Oui",
      "Seulement selon la couleur",
      "Matériaux et procédés ont des exigences différentes.",
    ],
  ],
});
const reading: ReadingSection[] = [
  {
    title: "Trouver le départ sans soutien et ses alternatives",
    sources: ["supports", "cut", "design"],
    paragraphs: [
      "Parcourez les couches jusqu’à la première apparition du détail problématique. Demandez ce qui se trouve sous ses premiers trajets. Sans soutien utile de l’objet existant, il peut falloir un support temporaire, une rotation ou un changement de dessin. N’activez pas des supports partout avant de localiser la difficulté. Une rotation peut améliorer la position d’un détail; une séparation peut donner une base utile à chaque morceau. Ces solutions apportent aussi leurs compromis. Examinez donc la pièce entière après modification au lieu de considérer seulement la région qui vous gênait.",
      "La forme en T rend la question visible : une tige étroite porte un dessus plus large. Les débords dépassant la tige demandent une stratégie de construction. Réunissez réellement les boîtes aux dimensions indiquées et vérifiez l’union exportée. Si le dessus demeure un volume déconnecté, le fichier introduit un autre problème que le seul paramètre de support n’explique pas. Gardez source et aperçu. Vous cherchez un exemple lisible de construction temporaire sous une avancée, pas une éprouvette compliquée mêlant plusieurs causes d’échec difficiles à distinguer.",
    ],
  },
  {
    title: "Examiner origine, contact et accès",
    sources: ["supports", "supportfinish", "cut"],
    paragraphs: [
      "Après génération avec la référence compatible, regardez où les supports démarrent et quelles faces ils touchent. Selon le mode, ils peuvent partir du plateau ou d’une autre région de la pièce. Le contact influence l’aspect et le nettoyage. Précisez si cette face est décorative, destinée à un ajustement ou située dans une zone où un dommage compte. Ne jugez pas la stratégie seulement par la consommation prévue. L’emplacement détermine les opérations après fabrication et la possibilité de conserver une surface réellement utile pour l’assemblage ou l’utilisation.",
      "Imaginez maintenant le retrait de chaque structure sur la pièce refroidie. Un outil peut-il l’atteindre sans plier un détail mince ou pousser les fragments dans une cavité fermée ? Une structure bien imprimée mais impossible à extraire peut faire échouer le projet. Dessinez la direction du retrait. Si l’accès manque, revenez à l’orientation, à la division ou à la forme avant de demander un support de plus en plus fragile. Cette réflexion est particulièrement utile dans les canaux et volumes fermés, où la vue extérieure peut masquer la matière prisonnière.",
    ],
  },
  {
    title: "Traiter l’interface comme un compromis à essayer",
    sources: ["supportfinish", "finish", "supports"],
    paragraphs: [
      "La zone de contact doit soutenir pendant le dépôt puis se séparer. Les trancheurs proposent interface et espacement, mais leurs valeurs utiles dépendent de la matière, de la machine et de la stratégie. Partez du profil pris en charge plutôt que d’un espace universel. Un retrait facile peut laisser un dessous plus irrégulier; un contact serré peut améliorer le soutien tout en compliquant la séparation. Observez les deux sur le même échantillon. Ne rapportez pas seulement l’amélioration si l’autre conséquence rend la pièce moins adaptée à son emploi.",
      "Pour le premier essai, gardez la référence et imprimez le petit T accessible. Après refroidissement et libération du plateau, appliquez la méthode sûre de la leçon de finition pour les supports. Gardez une région de contact avant nettoyage esthétique pour voir l’état réellement laissé par le retrait. Cherchez entailles, fissures et bords manquants en plus de la rugosité. Une belle surface obtenue après un ponçage important ne montre pas la qualité initiale de l’interface et peut cacher une variation dimensionnelle. Séparez observations d’impression et travail de finition dans le relevé.",
    ],
  },
  {
    title: "Compter les supports dans le travail complet",
    sources: ["supports", "cost", "supportfinish"],
    paragraphs: [
      "Les supports consomment matière et temps machine; leur retrait demande du travail humain. Incluez ces éléments pour comparer deux méthodes. La masse de la pièce nettoyée omet la matière temporaire nécessaire. Une forme divisée avec connecteurs peut en réduire la quantité tout en ajoutant de l’assemblage. Comparez toute la séquence plutôt que la seule plus petite estimation du logiciel. Conservez les durées inconnues comme inconnues jusqu’à mesure. Pour l’exercice, une note de temps et une description de l’accès suffisent à rendre cette comparaison concrète sans produire un dossier excessif.",
      "Terminez par croquis des contacts, profil et résultat du retrait. Précisez si le dessous convient au but pédagogique et si la forme doit être revue. Sans impression physique, appelez le résultat aperçu seulement et laissez la séparation non vérifiée. Le logiciel montre trajets et points de contact, mais pas la facilité réelle de séparation du matériau utilisé. Associer chaque preuve à son étape évite qu’une représentation nette de supports soit présentée comme une pièce terminée, inspectée et utilisable. Le contrôle de l’objet réel reste une étape distincte.",
    ],
  },
];
export default { lesson: content, reading };
