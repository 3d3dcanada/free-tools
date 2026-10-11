import { frenchLesson } from "./lesson";
import type { ReadingSection } from "../types";
const content = frenchLesson(19, {
  summary:
    "Comparez des températures compatibles avec le filament exact et les limites de la machine, à partir d’un profil connu et d’un symptôme précis. Gardez les autres variables fixes et observez les pièces. Cette leçon gratuite ne prescrit aucune valeur universelle. Aucun fichier n’est téléversé; votre progression reste enregistrée localement dans le navigateur.",
  learn:
    "Comparer deux essais de température sans utiliser des instructions inconnues pour une autre machine.",
  steps: [
    "Trouvez les conditions du filament et les limites du matériel. L’essai doit respecter les deux; sans plage compatible, la configuration ne convient pas.",
    "Choisissez une petite forme répétable et une question, par exemple un défaut de surface. Gardez vitesse, débit, refroidissement et état de matière constants.",
    "Imprimez deux échantillons avec deux valeurs documentées autorisées. Évitez le G-code d’une tour inconnue susceptible de contenir les commandes d’une autre machine.",
    "Décrivez l’aspect et le résultat. Une surface agréable ne mesure ni résistance des couches ni température de service. Revenez à la référence si le changement n’aide pas.",
  ],
  mistakes: [
    "Dépasser une limite du matériel parce qu’une bobine suggère une température.",
    "Présenter une pièce lisse comme mécaniquement qualifiée.",
  ],
  practice: {
    task: "Imprimez deux petits blocs aux températures compatibles prescrites, ou répétez la référence si aucune procédure de réglage adaptée n’existe.",
    record:
      "Source des valeurs, variables conservées, différences observées et raison de garder ou d’abandonner le changement.",
  },
  quiz: [
    [
      "Le matériel ne peut atteindre les conditions minimales du filament. Quelle conclusion convient ?",
      "La configuration est inadaptée",
      "Dépasser sa limite",
      "Ignorer la fiche matière",
      "Il faut satisfaire simultanément les exigences du filament et du matériel.",
    ],
    [
      "Que conserver lors de la comparaison ?",
      "Les autres paramètres pertinents",
      "Uniquement la couleur",
      "Rien",
      "Changez une variable pour interpréter l’essai.",
    ],
    [
      "Pourquoi éviter un G-code de tour inconnu ?",
      "Il peut viser une autre machine",
      "Il est toujours trop court",
      "Il change les droits du modèle",
      "Les instructions nécessitent une configuration vérifiée.",
    ],
    [
      "Que prouve une surface lisse ?",
      "Seulement l’aspect observé",
      "Une charge admissible",
      "Une tenue thermique universelle",
      "La portée de l’observation visuelle reste limitée.",
    ],
    [
      "Que faire si le changement n’apporte rien ?",
      "Rétablir la référence",
      "Augmenter sans limite",
      "Cacher le résultat",
      "Revenez d’un essai qui n’a pas montré d’intérêt.",
    ],
  ],
});
const reading: ReadingSection[] = [
  {
    title: "Trouver les conditions réellement compatibles",
    sources: ["materialtable", "maxflow", "first"],
    paragraphs: [
      "Retrouvez les indications de traitement du filament exact et les limites de la configuration physique. La plage utilisable doit respecter les deux. Une large plage sur une bobine n’annule pas une restriction de tête, de buse ou de plateau. Partez du profil pris en charge plutôt que du milieu d’un tableau général. Notez son origine. Si le fabricant ne propose pas de procédure de réglage adaptée, répétez la référence et consignez la question. Il n’est pas nécessaire d’inventer une série de températures uniquement pour satisfaire l’exercice.",
      "Distinguez la consigne affichée de la capacité de la matière en service. Le champ de température fixe une cible de commande du procédé, pas une température admissible du produit fini. Il ne mesure pas directement la température du polymère en tout point du trajet déposé. Débit demandé, refroidissement et géométrie influencent le résultat. Copier un chiffre réussi ailleurs constitue donc une preuve faible. L’information utile combine une configuration complète compatible et une observation précise que vous voulez examiner avec un essai dont les autres conditions restent maîtrisées.",
    ],
  },
  {
    title: "Choisir un symptôme et conserver le reste",
    sources: ["teaching", "first", "viewer"],
    paragraphs: [
      "Écrivez la raison avant de trancher : défaut répétable de surface, difficulté d’extrusion ou autre observation abordée par la procédure. Gardez modèle, orientation, état de matière, vitesse, débit et refroidissement identiques. Ne changez ni buse ni plateau. La température interagit avec ces facteurs; plusieurs changements empêchent une interprétation simple. Sauvegardez des projets séparés ou des variantes clairement nommées et reportez les valeurs dans le journal. Ne comptez pas sur votre mémoire pour reconnaître ensuite quel fichier correspond à l’essai plus chaud ou plus froid.",
      "Deux petits objets séparés conviennent à une première comparaison. Une tour dont la température change selon la hauteur peut être utile lorsqu’elle est correctement préparée pour le matériel connu, mais des instructions téléchargées peuvent contenir d’autres hypothèses. Les travaux séparés rendent chaque consigne plus facile à retrouver et évitent les commandes cachées de changement par hauteur. Étiquetez les pièces avant de les mélanger à d’autres essais. Examinez les mêmes faces sous une lumière semblable. Un échec de première couche sans lien avec la température ne devient pas une comparaison équitable.",
    ],
  },
  {
    title: "Décrire plusieurs indices sans inventer une note",
    sources: ["string", "dry", "teaching"],
    paragraphs: [
      "Comparez continuité des lignes, manques, excès et aspect lorsque ces éléments répondent à votre question. Notez fils et détails fins, tout en sachant que l’humidité et la rétraction peuvent aussi intervenir. Une seule belle région ne définit pas la meilleure température pour toute forme. Écrivez si le changement améliore la cible et s’il introduit un autre problème. Sans avantage clair, revenir à la référence est une décision raisonnable. L’essai a montré que cette modification particulière ne justifie pas le remplacement du réglage de départ.",
      "Ne déduisez pas la résistance des couches de leur brillance ou d’une flexion occasionnelle à la main. Un essai mécanique exige éprouvette, méthode de chargement et question d’acceptation définies; cette comparaison visuelle ne les fournit pas. L’absence de fils ne prouve pas davantage que la matière est sèche ou que tout le procédé est correct. Utilisez les observations comme indices avec des limites explicites. Une note telle que moins de fils visibles dans les mêmes conditions est plus utile qu’une affirmation non étayée selon laquelle l’échantillon serait entièrement optimisé.",
    ],
  },
  {
    title: "Relier le résultat à la matière et à la demande",
    sources: ["maxflow", "materialtable", "teaching"],
    paragraphs: [
      "Un petit bloc imprimé lentement ne sollicite pas forcément la tête comme un long trajet large et rapide. Le débit volumique explique pourquoi la matière demandée chaque seconde compte. Une réussite modeste n’autorise pas à dépasser la capacité prise en charge. Lors d’un changement de buse, de grade ou de géométrie exigeante, examinez de nouveau profil et aperçu. La température n’est qu’un élément du procédé : elle doit rester reliée aux conditions dans lesquelles elle a été évaluée plutôt que devenir un chiffre isolé réutilisé sans réflexion.",
      "Terminez par les sources des réglages autorisés, les variables conservées, les différences constatées et la décision. Indiquez les raisons d’une comparaison incomplète. Si une seule pièce a été imprimée, ne remplissez pas la seconde ligne avec un résultat attendu. Si le changement est conservé, créez un profil utilisateur identifié et une courte note sur son objectif. Elle doit expliquer le bénéfice observé pour cette configuration sans promettre une valeur universelle pour le polymère, la marque ou toute bobine future qui porterait un nom semblable.",
    ],
  },
];
export default { lesson: content, reading };
