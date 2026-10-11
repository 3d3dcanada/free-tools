import { frenchLesson } from "./lesson";
import type { ReadingSection } from "../types";
const content = frenchLesson(21, {
  summary:
    "Choisissez l’orientation en comparant direction des efforts, couches, dimensions importantes, aspect et accès aux supports. La position la plus facile à imprimer peut compliquer l’usage ou le contrôle. Cette leçon gratuite rend ces compromis visibles avec deux petits blocs. Vos modèles ne sont pas téléversés et vos réponses restent sur votre appareil.",
  learn: "Expliquer une orientation par un croquis des efforts et un contrôle de construction.",
  steps: [
    "Dessinez où la pièce est maintenue et dans quel sens un effort agirait. Le croquis pose une question de conception sans inventer de charge admissible.",
    "Comparez deux positions dans le trancheur. Repérez la direction des couches près de la zone qui doit transmettre l’effort.",
    "Examinez contact au plateau, surplombs, surfaces critiques et retrait des supports. L’orientation automatique ne connaît pas toutes les exigences d’utilisation.",
    "Notez le compromis et évaluez la vraie conception dans son matériau prévu. Les mesures publiées sur d’autres éprouvettes ne certifient pas votre pièce.",
  ],
  mistakes: [
    "Utiliser la seule quantité de supports pour décider.",
    "Attribuer à sa pièce une résistance mesurée sur une autre géométrie.",
  ],
  practice: {
    task: "Imprimez deux blocs de 30 × 10 × 5 mm dans deux orientations compatibles. Comparez surfaces et direction des couches sans essai de rupture.",
    record: "Deux croquis d’orientation, les faces observées et le compromis constaté.",
  },
  quiz: [
    [
      "Que ne connaît pas forcément l’orientation automatique ?",
      "Les efforts de l’usage final",
      "La forme importée",
      "La présence du plateau virtuel",
      "Les exigences d’utilisation demandent une décision humaine.",
    ],
    [
      "Quel compromis faut-il examiner ?",
      "Comportement mécanique, finition et supports",
      "La couleur de l’écran seulement",
      "Le nom du fichier seulement",
      "Plusieurs conséquences changent lors d’une rotation.",
    ],
    [
      "La résistance d’une autre éprouvette devient-elle votre valeur admissible ?",
      "Non",
      "Oui, si le matériau porte le même nom",
      "Oui, sans autre essai",
      "Géométrie, matière et procédé comptent.",
    ],
    [
      "Que montrer dans le croquis ?",
      "Les appuis et la direction des efforts",
      "Uniquement une couleur",
      "Un prix supposé",
      "Reliez les efforts et les contraintes de fabrication.",
    ],
    [
      "Peu de supports prouve-t-il la meilleure orientation ?",
      "Non",
      "Toujours",
      "Seulement pour les grands objets",
      "L’économie de support constitue un critère parmi d’autres.",
    ],
  ],
});
const reading: ReadingSection[] = [
  {
    title: "Dessiner l’usage avant la construction",
    sources: ["orientation", "design"],
    paragraphs: [
      "Commencez par la pièce en situation : points de maintien, contacts et direction d’un effort. Ajoutez ensuite la direction prévue des couches. Vous reliez ainsi orientation de fabrication et rôle de la géométrie. Ne partez pas uniquement de la face qui donne le temps le plus court. Ce critère peut compter, mais il ne résume pas la décision. Une patte de fixation, une section mince ou un angle chargé peuvent demander plus d’attention qu’une grande face décorative dont l’apparence est moins importante pour le fonctionnement.",
      "Une construction imprimée peut réagir différemment selon la direction. Les expériences publiées sur l’orientation expliquent l’importance des couches et des trajets, mais leurs chiffres appartiennent aux éprouvettes et procédures étudiées. Ne transférez pas un pourcentage d’amélioration ou un angle gagnant à votre propre forme sans preuve. Servez-vous de ces résultats pour formuler une question. Sur une forme pédagogique en L, examinez comment chaque position place les couches près de l’angle et comment l’effort agirait. Le croquis doit rester dépourvu de charges admissibles inventées.",
    ],
  },
  {
    title: "Comparer les conséquences d’une même rotation",
    sources: ["supports", "design", "viewer"],
    paragraphs: [
      "Une rotation change empreinte, hauteur, surplombs et contacts avec plateau ou supports. Elle peut également modifier les dimensions construites dans l’empilement vertical. Regardez ces effets ensemble. Une direction de couches intéressante peut imposer un support sur une face d’ajustement; une autre position économise le support mais place un détail fragile défavorablement. Préparez un petit tableau : contact initial, zones soutenues, surfaces d’aspect, détails d’ajustement et question de charge. Marquez explicitement ce qui n’a pas été testé au lieu de convertir chaque préférence en résultat acquis.",
      "Inspectez chaque candidat dans l’aperçu tranché, pas seulement sous forme solide. Une face apparemment plane peut contenir une saillie qui éloigne le reste du plateau. Un support sous une avancée peut rester prisonnier. L’outil automatique propose des candidats utiles sans connaître toutes les exigences d’assemblage, d’aspect ou de service. Son résultat doit donc être examiné. Enregistrez la position retenue dans le projet afin qu’un lot futur ne revienne pas silencieusement à une orientation plus pratique à manipuler mais jamais évaluée pour la fonction de la pièce.",
    ],
  },
  {
    title: "Observer les deux blocs sans inventer un essai mécanique",
    sources: ["layers", "supports", "orientation"],
    paragraphs: [
      "Les deux blocs de 30 × 10 × 5 mm sont imprimés dans des positions compatibles différentes, avec le même matériau et les autres paramètres pertinents conservés. Identifiez leur direction de construction avant comparaison. Regardez dessous, côté et dessus; indiquez quelle dimension suit l’axe vertical dans chaque cas. Notez aspect des couches et contact éventuel de support. L’exercice rend l’orientation visible sans exiger rupture ou charge dangereuse. Il ne détermine pas quel bloc supporte le plus d’effort puisqu’aucune méthode mécanique définie n’a été appliquée.",
      "Comparez les estimations comme prévisions, puis préparation et nettoyage réels comme observations. Un dépôt plus court peut demander davantage de retrait de supports; une impression plus longue peut préserver une face utile. Notez les deux lorsque cela arrive. Si un bloc échoue, conservez l’échec et expliquez ce qui manque dans la comparaison. Ne le remplacez pas discrètement par une ancienne pièce d’une autre matière. Les conditions cohérentes permettent à ce petit exercice d’isoler suffisamment l’orientation pour comprendre la relation visée, sans attribuer l’effet à un changement caché.",
    ],
  },
  {
    title: "Reporter la décision sur la conception réelle",
    sources: ["design", "orientation", "cut"],
    paragraphs: [
      "Pour une pièce réelle, consignez orientation, matériau et révision. Vérifiez les ajustements critiques dans cette position : une éprouvette imprimée autrement ne se transpose pas forcément directement. Si les supports abîment une face nécessaire, envisagez de redessiner ou de diviser la forme plutôt que d’ajuster uniquement leur interface. Si le trajet de charge reste incertain, demandez une aide adaptée en conception et en essais. Une visionneuse montre forme et dimensions, mais ne calcule pas une résistance certifiée ni ne valide l’utilisation d’une équerre imprimée.",
      "Terminez par une phrase indiquant le candidat retenu, son avantage pratique et la performance encore inconnue. Une position peut garder une face d’assemblage sans support tout en laissant la capacité mécanique non évaluée. Employez votre observation plutôt que de recopier cet exemple comme résultat. L’habitude importante est de conserver le motif de l’orientation pour pouvoir le réexaminer après une modification. Une nouvelle ouverture, une section plus mince ou une autre direction de montage peuvent exiger une nouvelle comparaison même si l’aspect général vous paraît encore familier.",
    ],
  },
];
export default { lesson: content, reading };
