import { frenchLesson } from "./lesson";
import type { ReadingSection } from "../types";
const content = frenchLesson(36, {
  summary:
    "Avant de vendre une impression, vérifiez la licence du modèle, les autres droits éventuels et les règles de la plateforme séparément. Un téléchargement gratuit ne prouve pas une autorisation commerciale. Cette leçon gratuite prépare un dossier daté sans publier d’annonce. Aucun fichier n’est téléversé; vos sources et vos réponses restent sur votre appareil.",
  learn: "Rédiger un relevé de droits et reconnaître une autorisation encore incertaine.",
  steps: [
    "Conservez page d’origine, créateur, version de licence et date de vérification. Lisez les conditions d’usage commercial, de modification et d’attribution.",
    "Séparez permission du modèle, noms, logos, brevets et admissibilité de plateforme. Résolvez une incertitude pertinente avant d’annoncer le produit.",
    "Pour Etsy, consultez les normes actuelles de créativité relatives aux outils informatisés. Une licence commerciale ne suffit pas à démontrer l’exigence de conception originale du vendeur.",
    "Utilisez votre propre forme simple pour l’exercice. Le 3DBenchy officiel est une référence d’apprentissage sous CC0; il ne devient pas votre dessin original ni un produit automatiquement admissible sur Etsy.",
  ],
  mistakes: [
    "Renommer un fichier pour prétendre en être le concepteur.",
    "Confondre autorisation commerciale et admissibilité automatique sur Etsy.",
  ],
  practice: {
    task: "Imprimez une petite forme de bureau que vous avez conçue. Gardez la source modifiable et notez tout élément tiers. Ne publiez aucune annonce dans cet exercice.",
    record: "Créateur, source, licence et questions de droits ou de plateforme encore ouvertes.",
  },
  quiz: [
    [
      "Renommer un fichier change-t-il son auteur ?",
      "Non",
      "Toujours",
      "Si le nom est original",
      "Le nom du fichier n’établit pas la création.",
    ],
    [
      "Que faut-il dans un relevé de droits ?",
      "Licence et date de la source",
      "Seulement le prix",
      "Une photo sans origine",
      "Conservez la source et les conditions réelles.",
    ],
    [
      "Permission commerciale et admissibilité Etsy sont-elles identiques ?",
      "Non",
      "Toujours",
      "Pour toute impression",
      "La plateforme impose une vérification distincte.",
    ],
    [
      "Que faire d’une permission incertaine ?",
      "La résoudre avant l’offre",
      "L’ignorer",
      "Inventer un accord",
      "L’incertitude ne doit pas devenir une affirmation.",
    ],
    [
      "Quel modèle convient à l’exercice de vente ?",
      "Votre propre conception simple",
      "Un modèle renommé",
      "Toute marque connue",
      "Un dessin original rend le cas pédagogique plus clair.",
    ],
  ],
});
const reading: ReadingSection[] = [
  {
    title: "Séparer propriété, permission et création",
    sources: ["rights", "benchylicense", "etsy"],
    paragraphs: [
      "Posséder imprimante et filament ne règle pas les droits sur une conception téléchargée. Partez de la page du créateur et de la licence attachée à la version utilisée. Distinguez impression privée, modification, redistribution du fichier et vente d’un objet physique : ces activités peuvent avoir des conditions différentes. La gratuité décrit le prix ou l’accès, pas l’autorisation. Si le modèle vient d’une republication à l’origine incertaine, retrouvez le créateur avant de bâtir une offre. Une source fiable rend la question plus précise sans remplacer la lecture des conditions.",
      "La création est aussi une affirmation factuelle distincte. Renommer le fichier, choisir une couleur ou imprimer ne fait pas du dessin votre œuvre originale. Conservez identité du créateur et attribution requise. Si vous modifiez la forme, décrivez votre contribution fidèlement et vérifiez les permissions correspondantes. Cette leçon organise questions et preuves; elle ne tranche pas un conflit de licence. Si une autorisation importante reste ambiguë, résolvez-la avec le titulaire ou une aide professionnelle adaptée avant la publicité. Une formule enthousiaste ne peut pas combler une permission manquante.",
    ],
  },
  {
    title: "Conserver un relevé daté",
    sources: ["benchylicense", "rights"],
    paragraphs: [
      "Notez titre, créateur, adresse originale, identifiant et version de licence, date consultée et usage envisagé. Gardez les conditions pertinentes ou une référence consultable. Ajoutez attribution exacte et éventuelle obligation d’identifier les modifications. Dans votre propre conception, relevez aussi illustrations importées, logos et autres éléments tiers. Un dossier contenant seulement le maillage final ne permet pas d’expliquer ces permissions plus tard. Le relevé doit montrer ce qui a été vérifié pour cette révision et cet usage précis, plutôt que le souvenir vague d’un modèle accessible gratuitement.",
      "La page officielle du 3DBenchy indique CC0 lors de la vérification du 8 octobre 2026. Cela en fait une référence pédagogique pratique, dont le nom et la source conservent une provenance utile. Creative Commons précise toutefois que CC0 ne règle pas automatiquement brevets ou marques. N’utilisez donc pas une permission de droit d’auteur comme réponse globale à toute question de nom, logo ou produit. L’exercice commercial du cours choisit un dessin original simple pour réduire le nombre de questions tierces et rendre le raisonnement plus facile à suivre.",
    ],
  },
  {
    title: "Vérifier la plateforme séparément",
    sources: ["etsy", "listing", "photos"],
    paragraphs: [
      "Une licence de modèle et les règles d’une plateforme répondent à des questions différentes. La première peut permettre un usage commercial tandis que la seconde exige une contribution du vendeur ou une catégorie particulière. Les normes de créativité d’Etsy, consultées le 8 octobre 2026, décrivent les articles fabriqués avec des outils informatisés, dont les imprimantes 3D. Relisez la règle actuelle pour l’activité prévue. Une licence commerciale seule ne prouve pas l’admissibilité. Gardez cette vérification à côté des permissions, avec sa propre source et sa propre date de consultation.",
      "Décrivez honnêtement qui a conçu et fabriqué l’article. Un modèle de référence téléchargé reste la conception d’autrui même si vous réalisez l’impression. Un rendu supplémentaire ne prouve pas la fabrication d’un exemplaire physique. Faites correspondre photos, contenu vendu et affirmations de production aux faits. Les règles peuvent évoluer : une ancienne vérification reste une trace utile, mais doit être actualisée avant une nouvelle décision de publication. Le cours ne soumet aucune annonce et n’obtient aucune approbation de plateforme; il prépare un dossier local à examiner humainement.",
    ],
  },
  {
    title: "Apprendre avec une forme originale modeste",
    sources: ["rights", "etsy", "benchylicense"],
    paragraphs: [
      "Concevez une forme simple, par exemple une base d’étiquette de bureau ou un séparateur, et conservez sa source modifiable. Notez les éléments extérieurs même si leur usage vous semble permis. Imprimez et inspectez selon les leçons précédentes, puis joignez source et relevé de droits au dossier de fabrication. Ne publiez pas pendant l’exercice. Le but est de réunir création, géométrie et preuve physique avant une promesse publique, pas de transformer l’achèvement d’un cours en déclenchement automatique d’une activité commerciale ou d’une mise en vente.",
      "Terminez avec trois états : permission du modèle, autres droits éventuels et règles de la plateforme envisagée. Chacun peut être clair, non résolu ou non applicable avec une raison. Gardez visible l’information absente. Un personnage, une marque ou une conception protégée peut soulever des droits que la licence du fichier ne couvre pas. Cherchez alors la permission ou le conseil adapté. Le dossier utile n’a pas besoin d’un badge d’approbation décoratif : il demande sources exactes, usage défini et description claire de ce qui empêche encore une décision suffisamment fondée.",
    ],
  },
];
export default { lesson: content, reading };
