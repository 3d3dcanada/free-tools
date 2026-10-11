import { frenchLesson } from "./lesson";
import type { ReadingSection } from "../types";
const content = frenchLesson(37, {
  summary:
    "Calculez le coût avec matière, travail, machine, énergie et emballage clairement séparés. Conservez les unités et les inconnues; ajoutez ensuite les frais et la décision de prix. Cette leçon gratuite explique un exemple fictif, sans devis de service. Aucun fichier n’est téléversé; vos calculs et vos notes restent localement sur votre appareil.",
  learn: "Construire un exemple transparent sans le présenter comme un prix commercial approuvé.",
  steps: [
    "Relevez matière consommée et masse utilisable de bobine. Coût matière = grammes utilisés × prix de bobine ÷ grammes utilisables. Incluez pertes et essais échoués dans le périmètre choisi.",
    "Ajoutez travail, temps machine, énergie et emballage avec unités explicites. Ne comptez pas une même dépense sous deux rubriques différentes.",
    "Exemple fictif : 100 g d’une bobine de 1 000 g à 25 CAD coûtent 2,50 CAD. Dix minutes à 24 CAD/h donnent 4 CAD. Avec machine 1 CAD, énergie 0,10 CAD et emballage 1,25 CAD, le sous-total est 8,85 CAD, hors transport, frais, taxes et bénéfice.",
    "Décidez la majoration séparément et vérifiez le scénario actuel des frais. Une majoration de coût de 20 % ajoute ici 1,77 CAD; ce n’est pas une marge de 20 % sur le revenu.",
  ],
  mistakes: [
    "Considérer le travail du propriétaire comme sans coût.",
    "Confondre majoration sur le coût et marge sur le revenu.",
  ],
  practice: {
    task: "Imprimez un petit objet de bureau original. Relevez matière et temps mesurés lorsqu’ils sont disponibles et établissez une fiche où les inconnues restent vides et expliquées.",
    record: "Unités, source de chaque valeur, calcul et données restant inconnues.",
  },
  quiz: [
    [
      "Quel est le coût des 100 g de l’exemple ?",
      "2,50 CAD",
      "25 CAD",
      "0,25 CAD",
      "100 × 25 ÷ 1 000 = 2,50.",
    ],
    [
      "Combien valent dix minutes à 24 CAD/h ?",
      "4 CAD",
      "240 CAD",
      "0,40 CAD",
      "Convertissez d’abord : 10 ÷ 60 × 24 = 4 CAD.",
    ],
    [
      "Quel sous-total de production est indiqué ?",
      "8,85 CAD",
      "10,62 CAD",
      "5 CAD",
      "2,50 + 4 + 1 + 0,10 + 1,25 = 8,85.",
    ],
    [
      "Que devient un coût de transport inconnu ?",
      "Une donnée non résolue",
      "Zéro automatiquement",
      "Un bénéfice",
      "Saisissez zéro seulement si vous savez réellement qu’il est nul.",
    ],
    [
      "Une majoration de coût de 20 % donne-t-elle une marge de revenu de 20 % ?",
      "Non",
      "Toujours",
      "Sans frais uniquement",
      "Les deux pourcentages n’utilisent pas le même dénominateur.",
    ],
  ],
});
const reading: ReadingSection[] = [
  {
    title: "Définir le périmètre du calcul",
    sources: ["cost", "calculator"],
    paragraphs: [
      "Commencez par un travail nommé et une limite claire : pièce nettoyée, commande emballée ou petit lot incluant les essais échoués. Séparez matière, travail actif, temps machine, énergie, emballage et autres coûts pertinents. Notez source et unité de chaque entrée. Laissez les inconnues vides avec une explication. Un calculateur peut additionner correctement un modèle économique incomplet. L’exercice vise à rendre visibles ces hypothèses, pas à trouver un prix de vente universel ni à révéler les tarifs commerciaux de 3D3D, qui relèvent de devis distincts.",
      "Évitez les doubles comptes. Si une allocation horaire de machine comprend déjà l’électricité, une ligne énergie séparée la compterait deux fois, sauf modification volontaire de l’allocation. Distinguez aussi travail actif et durée écoulée. Dix minutes de préparation et d’emballage autour d’une impression de deux heures ne donnent pas automatiquement deux heures dix de travail manuel. Ce travail n’est pas gratuit parce que le propriétaire l’effectue. Relevez l’activité honnêtement, puis prenez séparément la décision commerciale concernant sa récupération dans le prix demandé.",
    ],
  },
  {
    title: "Rendre les conversions explicites",
    sources: ["cost", "calculator"],
    paragraphs: [
      "Le coût matière multiplie grammes consommés par prix de bobine, puis divise par grammes utilisables. Choisissez la consommation correspondant au périmètre, avec supports ou pertes si nécessaire. La masse de la pièce nettoyée peut omettre préparation et tentatives échouées. L’exemple utilise 100 g, une bobine de 1 000 g et un prix de 25 CAD, soit 2,50 CAD. Ce sont des entrées inventées pour apprendre. Votre facture et votre consommation mesurée ou explicitement estimée appartiennent à votre fiche; une donnée absente ne devient jamais automatiquement zéro.",
      "L’énergie ne se déduit pas de la seule puissance inscrite sur l’alimentation. Dans un autre exemple fictif, une moyenne de 120 W pendant deux heures donne 0,24 kWh; à 0,20 CAD/kWh supposé, le coût est 0,048 CAD avant arrondi d’affichage. Une mesure serait une meilleure preuve qu’une moyenne supposée. N’appelez pas la puissance maximale consommation moyenne mesurée. Le travail demande également une conversion : dix minutes représentent un sixième d’heure, donc 4 CAD au taux pédagogique de 24 CAD/h, sans confusion entre minutes et heures.",
    ],
  },
  {
    title: "Distinguer majoration, marge et frais",
    sources: ["fees", "cost", "calculator"],
    paragraphs: [
      "Le sous-total fictif réunit matière 2,50 CAD, travail 4 CAD, machine 1 CAD, énergie 0,10 CAD et emballage 1,25 CAD, soit 8,85 CAD. Il exclut transport, frais de plateforme, taxes et bénéfice. Une majoration de 20 % ajoute 1,77 CAD et mène à 10,62 CAD avant ces éléments absents. Une marge de revenu de 20 % est différente : hors frais, 8,85 ÷ 0,80 donne 11,0625 CAD. Arrondissez au stade approprié du document réel et conservez le raisonnement non arrondi pour expliquer la différence.",
      "Les frais de plateforme dépendent parfois de transaction, pays, devise, paiement et services choisis. Vérifiez la politique officielle actuelle pour le scénario précis, au lieu de mémoriser un pourcentage unique. Si un frais illustratif f et une marge cible m portent sur la même base de prix, une relation simplifiée est coût ÷ (1 − f − m), avec dénominateur positif. Elle omet frais fixes, bases différentes et taxes. C’est une illustration algébrique, pas un devis Etsy ni une consigne comptable applicable sans examen de ses hypothèses.",
    ],
  },
  {
    title: "Remplacer les hypothèses par des observations",
    sources: ["cost", "calculator", "fees"],
    paragraphs: [
      "La première fiche contient des hypothèses. Remplacez-les progressivement par ce que vous observez en préparant, imprimant, inspectant et emballant. Gardez les échecs au lieu d’étudier seulement le meilleur exemplaire. Si trois tentatives donnent deux pièces acceptables, les ressources des trois appartiennent à l’essai. Un si petit lot ne prouve pas un taux de défaut durable, mais peut révéler du nettoyage ou du conditionnement oublié. Ces observations servent à préparer une prochaine expérience limitée, avec un périmètre plus complet et des entrées mieux fondées.",
      "Terminez par les inconnues restantes et la décision que l’estimation peut soutenir. Le calculateur public organise vos propres entrées et identifie la matière issue du modèle comme une estimation. Il ne tranche pas la pièce et ne produit pas un devis de fabrication 3D3D. Traitement fiscal et obligations d’entreprise restent soumis aux règles applicables et aux conseils adaptés. Un exercice complet donne un sous-total transparent, son arithmétique et ses exclusions. Il ne transforme pas des données manquantes et un pourcentage séduisant en prix de vente prétendument certain.",
    ],
  },
];
export default { lesson: content, reading };
