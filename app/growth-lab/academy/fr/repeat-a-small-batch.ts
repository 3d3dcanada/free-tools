import { frenchLesson } from "./lesson";
import type { ReadingSection } from "../types";
const content = frenchLesson(38, {
  summary:
    "Répétez une petite pièce avec un procédé enregistré, identifiez chaque exemplaire puis appliquez les mêmes contrôles à tous. Comptez aussi les rejets et le travail réel. Cette leçon gratuite étudie trois échantillons sans promettre une capacité de production. Aucun fichier n’est téléversé; les relevés et la progression restent localement sur votre appareil.",
  learn: "Réaliser un petit essai de répétabilité et en expliquer les limites.",
  steps: [
    "Choisissez une forme originale simple et les contrôles utiles. Sauvegardez révision du modèle, matière, orientation et profil avant de lancer les travaux.",
    "Fabriquez trois exemplaires avec le procédé documenté. Identifiez-les pour relier chaque observation à son fichier et à sa position éventuelle sur le plateau.",
    "Inspectez avec les mêmes critères. Notez refus, nettoyage et durées réelles au lieu de présenter uniquement le meilleur exemplaire.",
    "Préparez l’essai suivant à partir du travail observé. Trois pièces ne démontrent ni taux statistique de défaut, ni certification, ni capacité de production garantie.",
  ],
  mistakes: [
    "Ne compter que les réussites dans l’effort de fabrication.",
    "Promettre une date d’expédition à partir d’une seule durée idéale du trancheur.",
  ],
  practice: {
    task: "Imprimez trois petites copies de votre conception de bureau et inspectez-les avec les mêmes critères écrits. Si l’une échoue, conservez aussi son relevé.",
    record: "Trois identifiants, résultats réels, travail et temps totaux, puis limites de l’essai.",
  },
  quiz: [
    [
      "Pourquoi identifier chaque exemplaire ?",
      "Pour le relier à son relevé",
      "Pour éviter l’inspection",
      "Pour garantir sa qualité",
      "La traçabilité rend la comparaison possible.",
    ],
    [
      "Quels résultats appartiennent au carnet de lot ?",
      "Réussites et rejets",
      "Seulement le meilleur",
      "Seulement les photos",
      "Les échecs font partie des preuves et du coût.",
    ],
    [
      "Que garder identique dans cet essai ?",
      "Le procédé documenté",
      "Seulement le titre",
      "Rien",
      "La répétabilité commence par des entrées maîtrisées.",
    ],
    [
      "Trois bonnes pièces prouvent-elles un taux de défaut à long terme ?",
      "Non",
      "Toujours",
      "Si elles se ressemblent",
      "Ce petit essai pédagogique n’est pas une qualification statistique.",
    ],
    [
      "Qu’est-ce qui aide à prévoir une livraison ?",
      "Le travail observé et la capacité disponible",
      "Une durée idéale seule",
      "Un résultat choisi",
      "Utilisez les faits du procédé réel.",
    ],
  ],
});
const reading: ReadingSection[] = [
  {
    title: "Définir trois fois le même travail",
    sources: ["design", "viewer", "maintenance"],
    paragraphs: [
      "Choisissez un objet de bureau original simple avec révision sauvegardée et critères écrits. L’exercice répète un procédé connu : identifiez matériau, imprimante, buse, orientation et profil. Décidez si les exemplaires seront réalisés séparément ou ensemble sur un plateau. Ces arrangements ne sont pas des expériences identiques. Plusieurs objets changent déplacements et refroidissement, tandis que des travaux séparés répètent préparation et chauffe. Choisissez l’organisation qui répond à votre question présente et notez ses limites. Un résultat de plateau partagé ne décrit pas automatiquement trois cycles indépendants de fabrication.",
      "Attribuez trois identifiants avant l’impression. Reliez chacun au fichier de travail et à sa ligne d’inspection. Sur un plateau commun, gardez un croquis des positions afin de retrouver une difficulté locale. Ne dépendez pas du souvenir après retrait et mélange des pièces. Une étiquette ou un contenant séparé évite de confondre exemplaire sain et exemplaire rejeté. Le relevé doit accompagner l’objet pendant nettoyage et inspection, et non s’arrêter lorsque la machine annonce la fin des trajets. La fin du cycle n’est pas encore une décision d’acceptation.",
    ],
  },
  {
    title: "Appliquer les mêmes contrôles",
    sources: ["design", "flow", "orientation"],
    paragraphs: [
      "Inspectez chaque pièce selon les mêmes exigences. Mesurez les mêmes détails avec la même méthode et relevez dommages ou reprises nécessaires. N’assouplissez pas le critère pour le troisième exemplaire afin de faire réussir le lot. Séparez cotes nominales et lectures. Si la méthode ne résout pas une caractéristique requise, marquez-la non résolue sur chaque pièce concernée. Le résultat du lot réunit des observations individuelles. Une moyenne agréable ne doit pas masquer un exemplaire qui échoue à un contrôle indispensable d’ajustement ou de dommage visible.",
      "Dans une illustration fictive, des largeurs de 20,02, 20,10 et 20,18 mm présentent une étendue de 0,16 mm. Ce calcul décrit ces trois lectures seulement. Il n’établit ni tolérance du procédé, ni distribution durable, ni plage future garantie. Un critère reste nécessaire pour décider si les mesures conviennent à l’usage. N’attribuez pas une capacité statistique à ce petit lot pédagogique. Sa force est de montrer des incohérences pratiques et des étapes oubliées pendant que le coût d’un autre essai reste modeste et que les conditions sont identifiables.",
    ],
  },
  {
    title: "Compter rejets et temps réellement utilisés",
    sources: ["cost", "calculator", "sheets"],
    paragraphs: [
      "Enregistrez toutes les tentatives, y compris une impression arrêtée ou une pièce cassée au retrait. Reliez matière consommée, travail actif et durée machine au lot. Si une tentative sur trois échoue, ne chiffrez pas comme si les deux réussites avaient été seules fabriquées. L’échec a utilisé des ressources. Inversement, cette occurrence unique ne devient pas un taux de défaut fiable pour l’avenir. Elle justifie une recherche de cause et un relevé de coût complet pour l’expérience présente, sans extrapolation excessive à une production prolongée.",
      "Séparez les frontières temporelles. Estimation du trancheur, cycle réel, refroidissement et emballage manuel décrivent des activités différentes. Pour une livraison, leur ordre compte autant que leur somme. Une machine peut être disponible pendant un refroidissement, ou le prochain travail peut demander cette même plaque et sa manipulation. Décrivez le déroulement réel sans supposer un chevauchement parfait. Incluez préparation et nettoyage qui se répéteraient sur une commande. Une durée idéale d’impression seule ne démontre ni disponibilité de l’opérateur ni capacité fiable de l’atelier pour honorer un délai.",
    ],
  },
  {
    title: "Choisir la prochaine expérience",
    sources: ["cost", "calculator", "maintenance", "design"],
    paragraphs: [
      "Relisez ensemble les trois fiches. Cherchez défaut récurrent, observation variable ou étape plus longue que prévu. Choisissez une amélioration ou une question pour le prochain lot. Si le procédé convient au but pédagogique modeste, conservez modèle et profil comme base actuelle. Sinon, révisez géométrie ou préparation avec un nouvel identifiant. Ne mélangez pas anciennes et nouvelles pièces dans une seule ligne de résultat : cela cacherait si le changement a aidé. La comparaison utile porte sur des états connus et des exigences stables, même lorsque l’issue reste incertaine.",
      "Terminez par les trois statuts, ressources réelles et conclusion limitée. Vous pouvez raconter cet essai et le prochain contrôle prévu. Vous ne pouvez pas promettre quantité ou date d’expédition à partir de ces trois spécimens seuls. Une livraison dépend aussi du matériel disponible, des approvisionnements, de l’inspection, de l’emballage et d’autres engagements. Le cours reste local et ne prend aucune commande. Il produit un petit dossier de répétabilité qui éclaire la décision humaine suivante et expose les inconnues avant qu’elles ne deviennent une promesse faite à un client.",
    ],
  },
];
export default { lesson: content, reading };
