import { frenchLesson } from "./lesson";
import type { ReadingSection } from "../types";
const content = frenchLesson(27, {
  summary:
    "Des fils entre deux détails peuvent avoir plusieurs causes : état du filament, température ou déplacements avec rétraction. Décrivez leur emplacement, vérifiez la base puis comparez une seule modification. Cette leçon gratuite examine aussi la reprise d’extrusion, pas seulement les fils. Aucun fichier n’est téléversé; vos réponses restent sur votre appareil, sans compte.",
  learn: "Séparer les hypothèses de filage et documenter une correction contrôlée.",
  steps: [
    "Notez bobine, profil et apparition des fils. Comparez les trajets sans extrusion avec leur emplacement sur la pièce avant tout nettoyage.",
    "Vérifiez les exigences de stockage et de séchage du filament. Un essai de séchage demande un appareil adapté et les consignes du matériau et de la bobine.",
    "Comparez température et rétraction à la base prise en charge. Essayez une seule modification justifiée en conservant les autres conditions.",
    "Inspectez les fils et la qualité des reprises sur le nouveau spécimen. Si un autre défaut apparaît, revenez à la base et reconsidérez votre hypothèse.",
  ],
  mistakes: [
    "Prendre le filage comme preuve unique d’un filament humide.",
    "Ignorer un manque de matière à la reprise parce que les fils ont diminué.",
  ],
  practice: {
    task: "Réimprimez les deux piliers de la leçon 20 après une correction justifiée. Ne mouillez pas volontairement le filament pour fabriquer un défaut pédagogique.",
    record: "Une hypothèse, un changement, puis deux observations : fils et qualité des reprises.",
  },
  quiz: [
    [
      "Les fils identifient-ils une cause certaine ?",
      "Non",
      "Toujours l’humidité",
      "Toujours la vitesse",
      "Plusieurs conditions peuvent contribuer au symptôme.",
    ],
    [
      "Que consulter pour un essai de séchage ?",
      "Les consignes du matériau et de la bobine",
      "Une température universelle",
      "La couleur seule",
      "Les limites de séchage varient selon les produits.",
    ],
    [
      "Que vérifier en plus des fils ?",
      "Les reprises d’extrusion",
      "Seulement la photo",
      "Le nom du fichier",
      "Un espace propre ne compense pas une mauvaise reprise.",
    ],
    [
      "Quelle première comparaison est la plus lisible ?",
      "Un changement justifié",
      "Dix paramètres simultanés",
      "Deux machines inconnues",
      "Une comparaison contrôlée reste interprétable.",
    ],
    [
      "Faut-il abîmer le matériau pour créer le symptôme ?",
      "Non",
      "Toujours",
      "Avant chaque essai",
      "Une base saine ou des observations existantes suffisent.",
    ],
  ],
});
const reading: ReadingSection[] = [
  {
    title: "Décrire les fils avant leur cause",
    sources: ["string", "viewer", "design"],
    paragraphs: [
      "Regardez où chaque fil commence et se termine. Relie-t-il deux éléments séparés suivant un trajet sans extrusion, entoure-t-il un petit détail ou accompagne-t-il d’autres défauts ? Comparez la pièce à l’aperçu tranché. Notez matériau, état connu de la bobine, profil et changement récent. Le fil est une observation; une distance de rétraction incorrecte reste une hypothèse parmi plusieurs. Cette distinction aide à choisir un petit essai utile au lieu de modifier tous les paramètres cités dans une liste de dépannage sans rapport établi avec votre situation.",
      "Distinguez la pièce imprimée de la pièce nettoyée. Une photo prise après retrait des fils ne montre plus leur quantité initiale. Gardez une image ou une note avant nettoyage, puis relevez séparément le temps nécessaire si cela compte pour le travail. De fines fibres peuvent surtout gêner l’apparence d’un objet de bureau, mais bloquer un élément mobile dans une autre conception. L’usage détermine la question d’acceptation. Aucun fil visible ne prouve automatiquement un danger, ni une absence de conséquence dans tous les projets.",
    ],
  },
  {
    title: "Examiner le matériau sans inventer un diagnostic",
    sources: ["dry", "string", "teaching"],
    paragraphs: [
      "Consultez les consignes de stockage et de séchage du filament précis. L’humidité peut contribuer à certains défauts de surface et de dépôt, mais le filage seul ne prouve pas une bobine humide. Notez l’historique réellement connu et laissez le reste inconnu. Si un séchage est justifié, vérifiez que l’appareil et la bobine supportent les conditions prescrites. Un récipient étanche avec dessiccant n’est pas automatiquement un séchoir actif. Évitez un chauffage improvisé et ne mouillez pas la matière pour rendre l’exercice plus spectaculaire.",
      "Le séchage constitue déjà une condition modifiée. Évaluez son effet avec le profil d’impression inchangé avant de toucher aussi température et rétraction. Si les fils diminuent, notez cette association sans attribuer tous les futurs fils à la même cause. S’ils persistent, gardez ce résultat pour choisir la vérification suivante. Cette méthode permet de comprendre chaque essai. Elle évite aussi de conserver des paramètres excessifs devenus inutiles après la correction d’un problème de matière, ou de confondre le bénéfice d’une modification avec celui d’une autre.",
    ],
  },
  {
    title: "Retrouver la base de température et de déplacement",
    sources: ["string", "under", "tpu"],
    paragraphs: [
      "Vérifiez matériau et profil de buse, puis comparez température et rétraction actives à la configuration prise en charge. Un projet importé ou un ancien essai peut avoir laissé un changement oublié. Rétablissez une base connue avant d’affiner. Dans l’aperçu des deux piliers, repérez déplacements et points de reprise. La rétraction modifie le mouvement du matériau autour de ces trajets, mais son réglage utile dépend de l’alimentation et du filament. Une distance efficace sur une autre machine ne devient pas votre valeur de référence par simple ressemblance du modèle.",
      "Lorsque la procédure du fabricant prévoit un ajustement, ne changez qu’un paramètre et conservez l’ancienne valeur. Maintenez modèle, état du filament et autres conditions. Comparez quantité et emplacement des fils, puis regardez si l’extrusion reprend correctement. Moins de fils avec un vide à chaque reprise peut constituer un compromis inacceptable. Notez les deux observations. L’objectif est une pièce utilisable, pas la disparition d’un symptôme à tout prix. Revenez à la base si l’essai dégrade le résultat général ou empêche de comprendre ce qui a changé.",
    ],
  },
  {
    title: "Décider avec deux observations",
    sources: ["string", "dry", "under"],
    paragraphs: [
      "Réimprimez le spécimen à deux piliers après la correction unique. Gardez l’ancien exemplaire et son projet pour une comparaison directe. Identifiez le nouveau par la condition modifiée. Si la différence semble faible, utilisez le même éclairage et le même angle avant de conclure : des fils fins changent beaucoup d’apparence selon la vue. Si le problème persiste malgré les vérifications prises en charge, rassemblez références de bobine, machine, profil et photos. Ce dossier aide davantage qu’une affirmation selon laquelle tous les réglages ont déjà été essayés.",
      "Terminez le carnet par hypothèse, changement, fils observés, continuité de reprise et décision. Celle-ci peut être conserver, restaurer ou approfondir. Écrivez les résultats réels, sans recopier un résultat attendu. Si votre base ne produit aucun fil, documentez la référence propre et le chemin de diagnostic prévu. Il n’est pas nécessaire de dégrader une imprimante fonctionnelle pour apprendre. La leçon enseigne à répondre à des indices tout en conservant une extrusion correcte; elle ne démontre aucune règle universelle sur humidité, température ou rétraction applicable à toutes les matières.",
    ],
  },
];
export default { lesson: content, reading };
