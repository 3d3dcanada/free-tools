import { frenchLesson } from "./lesson";
import type { ReadingSection } from "../types";
const content = frenchLesson(15, {
  summary:
    "Un filament chargé en fibres de carbone conserve les exigences de son polymère de base. PETG-CF et PA-CF ne partagent pas automatiquement la même préparation. Cette leçon gratuite distingue grade, abrasion, séchage et stockage au sec avant un essai. Aucun fichier n’est téléversé; vos réponses et votre progression restent sur votre appareil.",
  learn: "Vérifier polymère de base, résistance à l’abrasion du matériel et procédure de séchage.",
  steps: [
    "Lisez le nom complet et la fiche technique. Identifiez le polymère et la propriété utile au projet au lieu de conclure simplement que le carbone est plus résistant.",
    "Vérifiez buse et composants d’alimentation pour le filament abrasif. Respectez le diamètre minimal autorisé et le profil adapté.",
    "Employez le matériel, la température et la durée de séchage prescrits pour ce filament et cette bobine. Le stockage au sec entretient un état; il ne remplace pas forcément le séchage.",
    "N’ajoutez pas un ponçage de matériau chargé à un exercice débutant sans examiner la maîtrise des poussières. Commencez petit et contrôlez les couches avant toute promesse mécanique.",
  ],
  mistakes: [
    "Appliquer la recette de séchage d’une marque à tous les mélanges.",
    "Supposer que la charge améliore toutes les propriétés et toutes les directions.",
  ],
  practice: {
    task: "Imprimez un petit bloc chargé uniquement si le matériel et le grade sont pris en charge. Sinon, utilisez la référence PETG et joignez une comparaison écrite de deux fiches de filaments chargés.",
    record:
      "Le matériau effectivement utilisé, les exigences matérielles et les propriétés qui n’ont pas été évaluées.",
  },
  quiz: [
    [
      "Que faut-il lire avant le sigle CF ?",
      "Le polymère de base",
      "Uniquement le prix",
      "Uniquement la couleur",
      "Le polymère de base détermine de nombreuses exigences.",
    ],
    [
      "Pourquoi vérifier la buse ?",
      "Les fibres peuvent être abrasives",
      "Pour changer l’auteur du modèle",
      "Parce que tout diamètre convient",
      "Le matériel doit être compatible avec la matière abrasive.",
    ],
    [
      "Le stockage au sec équivaut-il au séchage d’une bobine humide ?",
      "Non",
      "Oui, dans toute boîte",
      "Oui, sans limite de temps",
      "Maintenir un état et retirer l’humidité absorbée sont deux opérations distinctes.",
    ],
    [
      "La charge carbone améliore-t-elle toute propriété ?",
      "Non",
      "Oui, dans toutes les directions",
      "Oui, quelle que soit la forme",
      "Un mélange peut modifier différemment rigidité, choc et comportement des couches.",
    ],
    [
      "Quelle procédure de séchage doit guider l’essai ?",
      "Celle du filament et de la bobine exacts",
      "La plus chaude trouvée en ligne",
      "Une recette identique pour tout plastique",
      "Les limites dépendent de la matière et du support de bobine.",
    ],
  ],
});
const reading: ReadingSection[] = [
  {
    title: "Lire les deux parties du nom",
    sources: ["cf", "materialtable"],
    paragraphs: [
      "Les lettres CF désignent un ajout de fibres de carbone, pas un polymère universel. Un PETG-CF et un mélange à base de polyamide peuvent demander des conditions différentes de traitement, d’humidité et d’utilisation. Écrivez le grade complet et identifiez le polymère de base. Définissez ensuite la propriété recherchée : rigidité, stabilité dimensionnelle, comportement au choc ou aspect, par exemple. Dire plus résistant masque ces distinctions. Une amélioration d’une propriété mesurée peut s’accompagner d’une baisse d’une autre, et l’échantillon publié ne décrit pas automatiquement votre géométrie et son orientation.",
      "Comparez deux vraies fiches de fabricants plutôt que deux adjectifs publicitaires. Notez la propriété, les unités, la méthode d’essai et les conditions de l’échantillon lorsqu’elles sont données. Une valeur sans contexte se compare difficilement. Si une propriété importante manque, marquez-la inconnue au lieu de la traiter comme nulle ou identique à celle de l’autre matière. La comparaison reste utile sans disposer d’une machine capable d’imprimer ces grades. Elle rend les questions restantes concrètes avant une décision d’achat ou de modification de l’installation.",
    ],
  },
  {
    title: "Contrôler le trajet d’une matière abrasive",
    sources: ["cf", "first", "maintenance"],
    paragraphs: [
      "Un filament chargé peut user certains composants. Vérifiez la buse et les éléments d’alimentation concernés dans les consignes des fabricants. Le diamètre seul ne décrit pas la résistance à l’usure : relevez le type réellement monté et le profil autorisé. Consultez aussi le diamètre minimal pris en charge et les restrictions de l’entraînement. Ne lancez pas un essai court sur un matériel inadéquat en supposant qu’une petite quantité ne compte pas. Établir la compatibilité avant l’essai est plus simple que comprendre un résultat après avoir introduit une usure ou une obstruction possible.",
      "Un changement de matériel peut demander un autre profil compatible. Gardez l’ancien relevé et réalisez installation ou entretien uniquement selon la procédure adaptée, puis vérifiez la nouvelle configuration. Ne recopiez pas un décalage de température universel trouvé à propos d’une autre buse : réponse thermique et hypothèses de commande peuvent varier. Pour débuter, choisissez un essai déjà pris en charge par la machine disponible. Dans le cas contraire, la comparaison documentée des besoins constitue un résultat de préparation valable, tandis que l’essai physique chargé reste clairement non réalisé.",
    ],
  },
  {
    title: "Distinguer séchage actif et stockage au sec",
    sources: ["dry", "string", "cf"],
    paragraphs: [
      "Un contenant aide à maintenir l’état du filament, mais ne devient pas automatiquement un séchoir capable de retirer l’humidité absorbée. Vérifiez la procédure du fabricant, les capacités de température du séchoir et les limites de la bobine elle-même. Le support fait partie du système : un filament peut tolérer un traitement que son emballage ne supporte pas. Consultez les indications correspondant à leurs versions exactes. Ne transférez pas une température d’un polymère à un autre et ne supposez pas qu’un cycle plus chaud mais plus court équivaut au procédé prescrit.",
      "L’état de la matière peut contribuer aux défauts de surface et d’extrusion, mais des fils ou une rugosité ne constituent pas seuls un diagnostic complet d’humidité. Consignez stockage et préparation, puis comparez à une référence compatible. Séparez un essai de séchage des changements de rétraction ou de débit pour conserver une interprétation possible. Évitez les chauffages improvisés et les appareils domestiques dont la régulation ne convient pas. Si le matériel disponible ne permet pas une préparation correcte, laissez l’essai en attente plutôt que de traiter un état incertain comme une entrée étalonnée.",
    ],
  },
  {
    title: "Prévoir l’échantillon et les opérations suivantes",
    sources: ["cf", "dry", "safety"],
    paragraphs: [
      "Choisissez une petite forme accessible et n’intégrez pas ponçage ou découpe du matériau chargé à une manipulation débutante improvisée. L’impression et les opérations générant de la poussière posent des questions d’exposition distinctes. Consultez les informations de sécurité et les moyens de maîtrise avant de produire des débris. Une surface mate peut sembler soignée dès la sortie, mais elle ne démontre ni liaison des couches ni capacité mécanique. Inspectez la pièce réelle et limitez les conclusions aux observations. Une finition attractive ne se transforme pas en certification de charge.",
      "Terminez le relevé par matériau, préparation, matériel et profil réels, suivis des observations et exigences non vérifiées. Si vous avez imprimé la référence PETG, gardez cette identification et joignez la comparaison écrite plutôt que de présenter le substitut comme un résultat carbone. Pour un véritable essai chargé, conservez ensemble pièce et identité afin que les comparaisons restent interprétables. Le principal apprentissage est de relier un grade complet à ses exigences d’équipement, de conditionnement et de preuve, puis d’expliquer pourquoi le seul nom d’un additif ne suffit pas à choisir une matière.",
    ],
  },
];
export default { lesson: content, reading };
