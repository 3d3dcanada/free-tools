import { frenchLesson } from "./lesson";
import type { ReadingSection } from "../types";
const content = frenchLesson(4, {
  summary:
    "Un modèle, un projet de tranchage et un fichier G-code ne contiennent pas les mêmes informations. Vérifiez provenance, dimensions, compatibilité et autorisation avant utilisation. Un téléchargement gratuit ne permet pas automatiquement toute vente. Cette leçon gratuite explique ces distinctions sans téléverser vos modèles; les réponses au questionnaire restent sur votre appareil.",
  learn: "Séparer géométrie, réglages enregistrés et autorisation d’utilisation.",
  steps: [
    "Conservez la page du créateur et le lien de licence avec le téléchargement. Notez la version choisie et l’usage que vous voulez en faire.",
    "Considérez un STL comme une géométrie à contrôler et à trancher. Un projet 3MF peut apporter objets et réglages : vérifiez imprimante, buse et matériau après ouverture.",
    "Préférez trancher vous-même un modèle connu plutôt qu’exécuter le G-code d’une autre personne. Les instructions peuvent viser une configuration différente.",
    "Utilisez la page officielle de 3DBenchy pour l’éprouvette nommée dans ce cours. Sa licence indique CC0 lors de la vérification. Gardez l’échelle normale et la référence du créateur dans vos notes.",
  ],
  mistakes: [
    "Supposer qu’un 3MF ne transporte jamais de réglages.",
    "Confondre droit de télécharger et admissibilité à une plateforme de vente.",
  ],
  practice: {
    task: "Téléchargez le modèle gratuit depuis la page officielle de 3DBenchy. Consultez sa licence et préparez un projet pour un essai après la leçon 10.",
    record:
      "Créateur, adresse de la source, lien CC0, date du téléchargement et profil choisi pour votre machine.",
  },
  quiz: [
    [
      "Que peut contenir un projet de trancheur ?",
      "Des réglages enregistrés",
      "Un certificat de sécurité",
      "Un ajustement garanti",
      "Vérifiez les paramètres apportés par le projet lors de son ouverture.",
    ],
    [
      "Que conserver avec un téléchargement ?",
      "La source et la licence",
      "Seulement une capture",
      "Un auteur inventé",
      "La provenance aide à vérifier les usages ultérieurs.",
    ],
    [
      "Quelle licence actuelle de 3DBenchy a été vérifiée ?",
      "CC0 1.0",
      "Aucune autorisation",
      "Une licence exclusivement payante",
      "La page officielle a été consultée pour préparer ce cours.",
    ],
    [
      "Pourquoi trancher soi-même le modèle ?",
      "Pour utiliser sa propre configuration",
      "Pour supprimer tout contrôle",
      "Pour changer son auteur",
      "Les instructions doivent correspondre au matériel utilisé.",
    ],
    [
      "Un fichier gratuit permet-il automatiquement toute vente ?",
      "Non, vérifiez droits et règles de la plateforme",
      "Oui, toujours",
      "Seulement si on le renomme",
      "Les droits sur le fichier et les conditions de vente sont des questions distinctes.",
    ],
  ],
});
const reading: ReadingSection[] = [
  {
    title: "Identifier ce que le fichier vous demande de croire",
    sources: ["files", "first"],
    paragraphs: [
      "Un fichier géométrique décrit une forme. Un projet de trancheur peut conserver cette forme avec des choix de placement et d’impression. Des instructions de machine décrivent des actions pour une configuration précise. Les trois demandent des vérifications différentes, même s’ils arrivent dans le même dossier. Avant ouverture, identifiez la source, l’extension et la description du créateur. Après ouverture, observez les changements dans l’application. Un modèle familier à l’écran ne prouve pas que l’imprimante, le filament ou la buse sélectionnés correspondent encore à ce que vous allez réellement utiliser.",
      "Un STL représente généralement une surface triangulée plutôt qu’un historique complet de conception. L’application doit interpréter ses coordonnées et son échelle. Un 3MF peut porter davantage d’informations; un projet peut notamment conserver des paramètres que vous n’avez pas choisis. Séparez le téléchargement original de votre projet préparé. Un nom de fichier peut identifier la révision et l’essai sans prétendre qu’ils sont validés. Conservez aussi la source modifiable lorsqu’elle vous appartient : exporter un maillage ne préserve pas nécessairement les opérations, contraintes ou dimensions qui ont produit la forme.",
    ],
  },
  {
    title: "Contrôler l’objet avant de reprendre un plan d’impression",
    sources: ["first", "viewer", "files"],
    paragraphs: [
      "Commencez par les dimensions. Une cale censée mesurer 25 mm mais affichée autour de 635 mm suggère une interprétation d’unités à examiner : 25 multiplié par 25,4 donne 635. Ce calcul fournit un indice, pas une preuve automatique de la cause. Vérifiez les unités prévues par le créateur avant de corriger l’échelle. Regardez ensuite les volumes séparés, l’orientation et la face de contact. Une vue ombrée peut donner l’impression que deux éléments sont joints alors que leurs premières couches imprimables demandent chacune un départ correctement soutenu.",
      "Produisez de préférence les instructions avec votre profil local vérifié. Un G-code préparé ailleurs peut inclure des déplacements, températures et commandes de début ou de fin propres à une autre machine. Son nom ne suffit pas pour établir sa compatibilité. La même prudence s’applique à un projet qui change le profil après importation. Comparez les sélections au relevé du matériel réel avant de trancher. Conservez le projet et examinez l’aperçu exporté : vous pourrez alors relier le fichier envoyé à l’imprimante aux choix précis qui l’ont produit.",
    ],
  },
  {
    title: "Garder l’autorisation à côté du modèle",
    sources: ["benchylicense", "rights", "etsy"],
    paragraphs: [
      "L’accès gratuit décrit le prix du téléchargement, pas l’ensemble des utilisations autorisées. Notez le créateur, la page source, le nom et la version de la licence, la date de consultation et les obligations d’attribution. Écrivez séparément l’usage prévu : exercice privé, modification, partage du fichier ou vente d’un objet. Si les conditions manquent ou restent ambiguës, écartez provisoirement le modèle d’un projet commercial. Une capture ou une page conservée constitue une trace utile, mais elle ne crée pas des droits que le titulaire n’a pas accordés.",
      "La page officielle de 3DBenchy indique CC0 lors de la vérification du 8 octobre 2026. Creative Commons précise que CC0 concerne le droit d’auteur et les droits connexes, sans régler automatiquement les marques, les brevets ou toute autre question. Citer le créateur reste utile dans les notes pour retrouver le même modèle de comparaison. Ne présentez pas un téléchargement renommé comme votre propre conception. Gardez aussi les règles de la plateforme dans un dossier distinct : une autorisation de fabriquer ne prouve pas qu’une plateforme accepte cette catégorie de produit ou cette origine de conception.",
    ],
  },
  {
    title: "Préparer un petit dossier de provenance",
    sources: ["benchy", "first", "viewer"],
    paragraphs: [
      "Pour l’exercice, partez de la source officielle plutôt que d’une copie sans explication. Réunissez la note de provenance, le fichier original et votre projet adapté à la machine. Indiquez tout changement de taille ou de forme. Une éprouvette standard aide à comparer uniquement si les différences restent visibles dans le relevé : l’agrandir discrètement change le problème d’impression. Si vous choisissez un autre modèle, expliquez pourquoi et conservez ses propres autorisations. Un dossier simple suffit, avec une note de source et des noms clairs pour les originaux et les sorties préparées.",
      "Avant de poursuivre, expliquez la portée de chaque élément. La note de licence sert à vérifier une autorisation. La géométrie identifie l’entrée. Le projet conserve la préparation et l’aperçu montre les trajets demandés. Aucun ne prouve qu’une pièce physique a réussi. Réservez une place pour cette preuve ultérieure et évitez d’appeler le dossier prêt pour la production après le seul import. Si le projet importé a remplacé votre profil, rétablissez la référence vérifiée et notez cette correction. Cette observation est déjà un résultat d’apprentissage utile avant l’essai physique.",
    ],
  },
];
export default { lesson: content, reading };
