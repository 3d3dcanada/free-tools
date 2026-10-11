import { frenchLesson } from "./lesson";
import type { ReadingSection } from "../types";
const content = frenchLesson(2, {
  summary:
    "Choisissez une imprimante à partir des pièces, matériaux et conditions de travail prévus. Comparez le volume utile, le matériel compatible, l’entretien et le budget d’installation avant la vitesse annoncée. Cette leçon gratuite vous aide à rédiger un besoin concret sans achat obligatoire. Vos réponses restent locales et aucun fichier n’est téléversé.",
  learn: "Rédiger un petit cahier des besoins sans s’appuyer sur un classement commercial.",
  steps: [
    "Choisissez trois objets et notez leurs dimensions, leur usage et le matériau envisagé. Une décoration et un capot extérieur posent des questions différentes.",
    "Vérifiez l’espace nécessaire aux supports ou à une bordure, ainsi que les zones interdites. La dimension annoncée du plateau ne supprime pas ces contraintes.",
    "Consultez ensemble les exigences du matériau, de la buse, du plateau et de l’enceinte. Un choix dans un menu ne fournit pas le matériel absent.",
    "Comparez manuels, pièces de rechange, soutien, montage et budget global. Incluez les outils, le filament et les besoins de ventilation à partir d’informations actuelles.",
  ],
  mistakes: [
    "Choisir uniquement selon la vitesse maximale de déplacement.",
    "Acheter une grande machine sans place pour l’utiliser ou l’entretenir.",
  ],
  practice: {
    task: "Chargez le bloc de la première leçon dans deux profils plausibles pour vérifier ses dimensions. Après la leçon 10, utilisez la machine réellement disponible.",
    record:
      "Le profil retenu, sa correspondance avec le matériel et une raison liée au projet; aucun achat n’est demandé.",
  },
  quiz: [
    [
      "Un profil ASA apparaît dans le logiciel. La machine est-elle prête ?",
      "Il faut vérifier le matériel et l’atelier",
      "Oui, le menu suffit",
      "Seule la couleur compte",
      "Un profil ne fournit ni équipements ni moyens de maîtrise manquants.",
    ],
    [
      "Par quoi commence le cahier des besoins ?",
      "Les pièces à fabriquer",
      "La vitesse annoncée seule",
      "Le plus grand écran",
      "L’usage des pièces définit les exigences pertinentes.",
    ],
    [
      "Que doit couvrir le budget ?",
      "L’installation et le fonctionnement",
      "Le prix de la machine seulement",
      "Une bobine seulement",
      "Les outils, les consommables et l’aménagement de l’atelier comptent aussi.",
    ],
    [
      "Pourquoi consulter manuels et disponibilité des pièces ?",
      "Pour prévoir entretien et assistance",
      "Pour changer la couleur du modèle",
      "Pour éviter tout contrôle ultérieur",
      "Posséder une machine implique de la maintenir utilisable.",
    ],
    [
      "D’où doivent venir les caractéristiques avant un achat ?",
      "De documents actuels du fournisseur",
      "D’une capture sans date",
      "D’un nom de modèle deviné",
      "Les caractéristiques et la disponibilité peuvent évoluer.",
    ],
  ],
});
const reading: ReadingSection[] = [
  {
    title: "Transformer une envie d’objet en exigences",
    sources: ["buy", "materialtable"],
    paragraphs: [
      "Notez trois objets que vous pensez réellement fabriquer plutôt qu’une liste de fonctions impressionnantes. Pour une étiquette, un séparateur de rangement et un capot extérieur, relevez les dimensions, le plus petit détail important, la quantité et l’environnement d’utilisation. Le capot introduit des questions de météo et de chaleur qui concernent moins l’étiquette. Ce sont des exigences à examiner, pas une justification suffisante pour annoncer immédiatement un matériau. Précisez aussi ce qui reste hors du premier projet, notamment une pièce de sécurité dont la défaillance pourrait blesser quelqu’un.",
      "Séparez obligations et préférences. Pouvoir loger le plus grand objet prévu est une obligation; préférer une couleur d’écran ne l’est généralement pas. Un profil officiellement pris en charge ne constitue pas la même preuve qu’une longue liste de profils communautaires. Associez chaque affirmation à un document actuel du fabricant, à un manuel ou à une réponse concernant la version exacte du matériel. Laissez les questions non résolues visibles. Cette méthode reste utile même sans achat : elle permet aussi de choisir quelle machine d’un atelier peut convenir à un travail donné.",
    ],
  },
  {
    title: "Vérifier l’espace utile et l’espace de travail",
    sources: ["buy", "bates", "safety"],
    paragraphs: [
      "La boîte englobante de l’objet fournit une première vérification, pas un plan d’implantation complet. L’orientation change la dimension portée par chaque axe. Les supports, les bordures, les zones exclues et les restrictions de déplacement peuvent limiter ce qui est pratique. Dans un exemple de calcul, une pièce de 180 mm avec une réserve de 5 mm de chaque côté demande 190 mm sur cet axe. Cette réserve est illustrative, pas une largeur de bordure universelle. Placez la forme et les aides réellement prévues dans le bon profil pour vérifier leur empreinte.",
      "Dessinez ensuite la machine dans la pièce où elle sera utilisée. Ajoutez le porte-bobine, les portes ouvertes, le déplacement du plateau, les câbles et l’accès pour retirer la surface de construction. Une machine qui entre sur une étagère lorsqu’elle est arrêtée peut manquer d’espace en fonctionnement ou pendant l’entretien. Consultez les dégagements prescrits au lieu d’ajouter une marge inventée. Prévoyez où poser les outils et les pièces en refroidissement. Si atteindre un bouton impose de se pencher au-dessus d’éléments chauds ou mobiles, l’aménagement doit être revu.",
    ],
  },
  {
    title: "Vérifier toute la chaîne du matériau",
    sources: ["materialtable", "enclosure", "safety"],
    paragraphs: [
      "Le nom d’un matériau sur une page commerciale ne répond pas à toutes les questions de compatibilité. Examinez la buse, le plateau, le trajet d’alimentation, les limites de température et les conditions d’enceinte ensemble. Un filament souple peut imposer des contraintes de guidage; une charge abrasive peut nécessiter des pièces résistantes à l’usure. Notez le grade précis que vous voulez essayer et consultez les recommandations du fabricant de l’imprimante et de celui du filament. Si les consignes se contredisent, résolvez ce point avant de considérer l’ensemble comme prêt.",
      "Distinguez également l’enceinte thermique du dispositif de maîtrise des émissions. Maintenir une température autour de la pièce et capter des particules ou des substances dans l’air sont deux fonctions différentes. Une enceinte peut participer aux deux, mais sa présence ne prouve ni son efficacité ni son adaptation au local. La leçon sur l’espace de travail approfondit ce sujet. Au moment du choix, identifiez ce qui est documenté et ce qui doit encore être évalué. Évitez d’acheter d’abord en supposant qu’un meuble fermé réglera ensuite toutes les questions d’installation.",
    ],
  },
  {
    title: "Prévoir un ensemble que l’on peut maintenir",
    sources: ["buy", "first", "maintenance"],
    paragraphs: [
      "Établissez des lignes distinctes pour la machine, les premiers consommables, l’installation nécessaire, les outils, les pièces d’usure et le temps d’apprentissage. Gardez un prix inconnu vide jusqu’à sa vérification auprès d’un fournisseur actuel. Un prix d’achat plus bas peut être pertinent si vous comprenez le travail supplémentaire et le soutien disponible. Lisez une procédure d’entretien courant avant de choisir. Vérifiez que la documentation et les pièces correspondent à la version vendue, puis déterminez si vous pouvez réaliser les interventions prévues ou obtenir de l’aide quand elles dépassent vos compétences.",
      "Pour l’exercice, chargez le même bloc dans deux profils plausibles. Consignez la manière dont vous avez vérifié le volume utile, la buse et le matériau. Le temps estimé par le trancheur ne suffit pas à désigner un gagnant : préparation, chauffe, manipulation, contrôle et fiabilité affectent aussi le débit de travail réel. Terminez par une décision courte comportant une raison et une question encore ouverte. Un profil peut convenir à la taille des échantillons alors que la ventilation reste à définir. Cette conclusion est plus informative qu’un classement fondé uniquement sur la vitesse annoncée.",
    ],
  },
];
export default { lesson: content, reading };
