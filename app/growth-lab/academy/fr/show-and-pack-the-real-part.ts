import { frenchLesson } from "./lesson";
import type { ReadingSection } from "../types";
const content = frenchLesson(39, {
  summary:
    "Photographiez l’exemplaire réellement inspecté, montrez ses dimensions et précisez le contenu inclus. Mesurez ensuite le colis complet avec sa protection, pas seulement la pièce nue. Cette leçon gratuite prépare photos et emballage sans publier ni expédier. Aucun fichier n’est téléversé; vos observations et votre progression restent localement sur votre propre appareil.",
  learn: "Préparer des images fidèles et un relevé d’emballage mesuré.",
  steps: [
    "Photographiez l’objet fini dans une lumière lisible. Prévoyez vue générale, référence d’échelle et détail utile sur la forme ou la finition.",
    "Décrivez ce qui est inclus. Distinguez accessoires de décor, tailles alternatives et contenu promis. Identifiez un rendu utilisé comme illustration complémentaire.",
    "Emballez la commande prévue puis mesurez dimensions extérieures et masse totale. Le poids de la pièce seule n’est pas celui de l’envoi.",
    "Rédigez matière, taille, entretien et expédition à partir de faits vérifiés. Relisez les exigences actuelles de la plateforme avant publication et ne masquez pas un défaut par retouche.",
  ],
  mistakes: [
    "Présenter un rendu comme preuve d’un produit fabriqué.",
    "Calculer le transport à partir du poids de la pièce non emballée.",
  ],
  practice: {
    task: "Choisissez un exemplaire accepté du petit lot, photographiez-le puis préparez un colis d’essai. N’achetez pas d’affranchissement et n’expédiez rien dans cet exercice.",
    record: "Rôle des trois photos, contenu inclus, dimensions du colis et masse mesurée.",
  },
  quiz: [
    [
      "Que doit montrer la preuve principale du produit ?",
      "L’objet réellement fini",
      "Seulement un rendu",
      "Un produit différent",
      "Les photos représentent ce qui sera proposé.",
    ],
    [
      "Pourquoi ajouter une vue avec échelle ?",
      "Pour expliquer la taille",
      "Pour cacher un défaut",
      "Pour éviter toute cote",
      "Une référence aide à comprendre les dimensions.",
    ],
    [
      "Quelle masse utiliser pour l’essai de transport ?",
      "Celle de la commande emballée",
      "La pièce nue seule",
      "Le filament théorique",
      "L’emballage contribue à l’envoi.",
    ],
    [
      "Comment décrire un rendu complémentaire ?",
      "Comme un rendu",
      "Comme une photo réelle",
      "Comme une inspection",
      "Gardez l’origine de l’image explicite.",
    ],
    [
      "Que préciser sur les accessoires de décor ?",
      "S’ils sont inclus",
      "Qu’ils sont toujours gratuits",
      "Rien",
      "Le contenu doit être décrit fidèlement.",
    ],
  ],
});
const reading: ReadingSection[] = [
  {
    title: "Donner une fonction à chaque photo",
    sources: ["photos", "listing", "etsy"],
    paragraphs: [
      "Utilisez l’exemplaire inspecté du lot. Une vue générale explique l’objet, une vue d’échelle montre sa taille et un détail décrit une fonction ou une finition. Une règle ou une référence non ambiguë aide, mais accompagnez-la de dimensions écrites. Gardez lumière claire et fond assez simple pour lire la forme. L’objectif est de répondre aux questions pratiques, pas de suggérer une matière, une taille ou une surface différente. Une image séduisante perd sa valeur si elle fait attendre un objet que le procédé réel ne produit pas.",
      "Montrez les éléments inclus et distinguez-les du décor. Câble, plante ou outil illustrant l’usage n’appartient pas automatiquement à la commande. Si plusieurs couleurs ou tailles apparaissent, précisez variantes ou ensemble vendu. Un gros plan peut expliquer texture de couches et assemblage au lieu de les cacher. Reliez échantillon et photo à la révision du modèle. Une modification ultérieure ne doit pas laisser dans le brouillon une ancienne jonction, dimension ou finition sans indication. Les images font partie du dossier produit et demandent elles aussi un suivi de version.",
    ],
  },
  {
    title: "Retoucher pour clarifier, sans changer la preuve",
    sources: ["photos", "etsy", "listing"],
    paragraphs: [
      "Recadrage, exposition et fond simplifié peuvent faciliter la lecture, mais la retouche ne doit ni cacher un défaut connu ni modifier le produit promis. Ne supprimez pas une fissure, n’inventez pas une surface lisse et ne changez pas le contenu apparent. Gardez l’original avec la version préparée. Un rendu peut illustrer une idée lorsqu’il est autorisé, à condition d’être identifié et de ne pas remplacer la preuve physique. Consultez les règles actuelles de la plateforme pour décider de l’usage des illustrations complémentaires dans votre cas.",
      "Les outils d’image locaux redimensionnent et préparent vos propres photographies sans téléversement. Inspectez dimensions exportées et résultat réel, surtout si un recadrage retire l’échelle ou un détail utile. Un détourage peut supprimer une partie étroite : comparez toujours à l’original. N’ajoutez pas badges, notes ou performances non vérifiés. La photo soutient la compréhension visuelle; elle ne certifie ni propriétés du matériau, ni résistance, ni procédé de fabrication. Les légendes décrivent des faits montrables, sans transformer une amélioration graphique en nouvelle caractéristique du produit vendu.",
    ],
  },
  {
    title: "Mesurer la commande emballée au complet",
    sources: ["listing", "fees", "photos"],
    paragraphs: [
      "Placez le contenu prévu dans sa protection et son contenant, puis mesurez dimensions extérieures et masse totale. Le poids de l’objet omet emballage, visserie et notices éventuelles. Même presque vide, une boîte possède un volume extérieur pouvant compter dans le transport. Notez la configuration pour refaire la mesure. N’achetez pas d’étiquette et n’envoyez rien pendant le cours. L’essai local doit révéler fournitures et manipulations manquantes avant une promesse de livraison. Une mesure du colis préparé apporte une base plus réaliste qu’une déduction tirée du modèle seul.",
      "Dans l’exemple fictif, une pièce de 80 g, 15 g de visserie et 55 g d’emballage donnent 150 g. Ces nombres illustrent le périmètre; ils ne constituent pas un tarif de transport. Pesez votre colis avec une balance adaptée et consultez les règles actuelles du transporteur pour service et destination lors d’un vrai chiffrage. Gardez aussi exigences de protection et d’inspection. Réduire le contenant n’est pas un progrès si l’objet arrive endommagé ou si les éléments inclus ne sont plus maintenus correctement pendant la manutention.",
    ],
  },
  {
    title: "Rédiger depuis les faits vérifiés",
    sources: ["photos", "listing", "etsy", "cost"],
    paragraphs: [
      "Décrivez exactement matière, dimensions, contenu et finition observée. Distinguez taille nominale du dessin et tolérance effectivement mesurée. Ne promettez pas une reproduction identique des couleurs sur tous les écrans. Les consignes d’entretien doivent suivre matière et usage réels, pas une phrase générique reprise d’ailleurs. L’expédition demande un plan réaliste de fabrication et d’emballage. Si une performance ou une compatibilité n’a pas été testée, ne la promettez pas avant d’obtenir la preuve adaptée. Le brouillon doit rendre ces limites visibles à la personne chargée de le relire.",
      "Réunissez trois photos utiles, originaux, liste du contenu, dimensions et poids emballés, puis texte proposé. Reliez le tout à l’échantillon accepté et à son inspection. Si la conception change, indiquez quelles images et mesures doivent être reprises. L’exercice s’arrête à un dossier révisable : aucune annonce, étiquette payée ou expédition n’est créée. Le résultat utile décrit ce que recevrait l’acheteur et comment vous prépareriez cette commande réelle. Les affirmations reposent sur l’exemplaire et son processus, pas seulement sur une maquette propre ou un rendu convaincant.",
    ],
  },
];
export default { lesson: content, reading };
