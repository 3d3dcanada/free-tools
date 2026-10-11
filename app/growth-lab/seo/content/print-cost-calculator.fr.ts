import type { ToolGuide } from "../guide";
export default {
  slug: "print-cost-calculator",
  locale: "fr",
  title: "Calculer le coût de votre impression 3D | 3D3D",
  description:
    "Estimez matière, électricité et coût machine avec vos propres prix. Vérifiez les hypothèses géométriques et téléchargez un rapport local gratuit.",
  name: "Calcul du coût d’impression 3D",
  headline: "Une estimation fondée sur vos chiffres.",
  summary: "Comparez matière, énergie et coût machine avant une impression.",
  answer:
    "Estimez gratuitement matière, électricité et coût machine dans votre navigateur, sans téléversement. Indiquez volume, surface, épaisseur de coque, remplissage, densité et prix locaux. Le résultat sert à planifier vos propres impressions: ce n’est ni un calcul de trancheur, ni un prix de vente, ni un devis de 3D3D. Gardez les hypothèses avec le rapport.",
  steps: [
    "Saisissez un volume solide vérifié en centimètres cubes et une surface en centimètres carrés, ou récupérez-les avec l’inspecteur local. Confirmez d’abord les unités du modèle. Un volume indisponible ne doit pas être remplacé par zéro.",
    "Réglez l’épaisseur approximative de coque, le remplissage, la densité et la marge de matière supplémentaire. Adaptez-les au travail prévu sans considérer les exemples comme un profil validé. Comparez ensuite avec le trancheur lorsque ses résultats sont disponibles.",
    "Indiquez votre prix réel au kilogramme, la durée estimée, la puissance moyenne, le tarif d’énergie et le coût machine horaire. Choisissez la devise. L’outil ne récupère aucun tarif d’électricité et ne réalise aucun change.",
    "Examinez séparément matière, électricité et machine, puis téléchargez le rapport JSON. Comparez ces hypothèses à la consommation et au temps observés lors d’un essai. Demandez un devis distinct pour une fabrication effectuée par 3D3D.",
  ],
  sections: [
    {
      heading: "Comprendre l’approximation coque et remplissage",
      paragraphs: [
        "Le calcul estime la coque en multipliant la surface par son épaisseur, après conversion des millimètres en centimètres, sans dépasser le volume solide. Il applique ensuite le pourcentage de remplissage au volume restant. Cette méthode aide à comparer des hypothèses, sans tracer les chemins d’extrusion. Les petites formes, les coques qui se chevauchent, les couches pleines et les motifs réels peuvent produire un résultat différent dans le trancheur.",
        "Pour 100 centimètres cubes, 120 centimètres carrés de surface et une coque de 1,2 millimètre, l’estimation de coque vaut 14,4 centimètres cubes. À vingt pour cent de remplissage, les 85,6 restants contribuent pour 17,12, soit 31,52 centimètres cubes de plastique avant la marge. Cet exemple décrit la formule, sans garantir la matière nécessaire. Supports, purge et démarrages ratés demandent une marge réfléchie.",
      ],
    },
    {
      heading: "Distinguer coûts calculés et prix de vente",
      paragraphs: [
        "Le volume de plastique est multiplié par la densité et le facteur de matière supplémentaire pour obtenir des grammes. Le coût matière utilise ensuite ces grammes et votre prix au kilogramme. Consultez la spécification réelle du filament, surtout pour un mélange chargé ou inhabituel. Une densité générique peut servir d’essai, mais la modifier sans preuve risque de rendre un chiffre apparemment précis moins pertinent.",
        "L’électricité correspond aux watts moyens multipliés par les heures, divisés par mille pour obtenir des kilowattheures, puis multipliés par le tarif. Une moyenne de 100 watts pendant quatre heures donne 0,4 kilowattheure. Le coût machine multiplie la durée par votre montant horaire. La somme n’inclut pas automatiquement conception, manutention, emballage, taxes, frais commerciaux, charges générales ou bénéfice. Elle ne constitue donc pas un prix de vente complet.",
      ],
    },
    {
      heading: "Améliorer les hypothèses par l’observation",
      paragraphs: [
        "Réalisez un petit travail représentatif et comparez l’estimation aux grammes et au temps du trancheur, puis au résultat réel. Notez imprimante, matière, profil et réglages de supports pertinents. Un écart régulier peut révéler une hypothèse mal choisie; un échec isolé peut plutôt signaler un problème de procédé. Gardez ces observations distinctes du résultat mathématique affiché par le calculateur.",
        "Le rapport conserve entrées et limites pour permettre de comprendre le total. Ne partagez pas seulement un montant arrondi sans ses hypothèses. L’outil ne se connecte pas à l’imprimante, ne lit pas de G-code et ne mesure pas la puissance. Pour une pièce fabriquée par 3D3D, envoyez une demande de devis avec le modèle et les exigences: le prix du service dépend de cet examen, pas des exemples de ce calculateur public.",
      ],
    },
  ],
  comparison: [
    {
      name: "Calculateur Prusa",
      detail: "Utilise temps et masse saisis ou issus du G-code, avec main-d’œuvre.",
      url: "https://blog.prusa3d.com/3d-printing-price-calculator_38905/",
    },
  ],
  faqs: [
    {
      q: "Le résultat est-il un tarif de 3D3D?",
      a: "Non. Il utilise vos coûts et hypothèses. Demandez un devis de service séparé pour l’examen de votre pièce et de ses exigences.",
    },
    {
      q: "Ce calcul remplace-t-il le tranchage?",
      a: "Non. Le modèle coque-remplissage reste approximatif. Chemins d’extrusion, supports et durée demandent le bon profil de trancheur et d’autres vérifications.",
    },
    {
      q: "Puis-je reprendre le volume de la visionneuse?",
      a: "Oui, lorsqu’elle fournit un volume et une surface adaptés pour un solide unique. Vérifiez les unités et résolvez les avertissements avant de les utiliser.",
    },
    {
      q: "La marge couvre-t-elle tous les échecs?",
      a: "C’est un pourcentage choisi, pas une prévision d’échec. Appuyez-vous sur vos observations et tenez compte volontairement des supports ou purges inhabituels.",
    },
    {
      q: "La main-d’œuvre est-elle comprise?",
      a: "Elle n’a pas de calcul distinct ici. Les composantes sont matière, électricité et coût machine. Préparez un calcul plus complet pour fixer un prix de vente.",
    },
    {
      q: "La devise applique-t-elle un taux de change?",
      a: "Non. Elle identifie vos montants saisis. Utilisez une seule devise cohérente et gardez le rapport pour conserver les hypothèses avec l’estimation.",
    },
  ],
  service: { label: "Demander un véritable devis d’impression 3D3D", path: "/quote" },
} satisfies ToolGuide;
