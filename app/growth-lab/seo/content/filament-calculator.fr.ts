import type { ToolGuide } from "../guide";
export default {
  slug: "filament-calculator",
  locale: "fr",
  title: "Calculateur de longueur, masse et coût du filament | 3D3D",
  description:
    "Convertissez mètres et grammes de filament avec diamètre et densité. Estimez le coût matière selon votre prix et téléchargez un rapport local gratuit.",
  name: "Calculateur de filament",
  headline: "Des mètres aux grammes, puis au coût.",
  summary: "Reliez longueur et masse avec le diamètre et la densité du filament.",
  answer:
    "Convertissez gratuitement une longueur de filament en masse, ou l’inverse, sans téléverser de données. Indiquez diamètre, densité et prix au kilogramme pour estimer grammes, mètres et coût matière. Le calcul suppose un cylindre uniforme. Utilisez des mesures ou des données fabricant et gardez une réserve plutôt que de compter sur le dernier mètre estimé.",
  steps: [
    "Choisissez la quantité connue: longueur ou masse. Saisissez des mètres dans le premier mode ou des grammes dans le second. Pour une bobine entamée pesée sur une balance, retirez la masse de la bobine vide avant la saisie.",
    "Indiquez le diamètre nominal ou mesuré et la densité de la matière. Vérifiez les unités: millimètres pour le diamètre, grammes par centimètre cube pour la densité. Les valeurs d’exemple ne constituent pas une spécification universelle du filament.",
    "Ajoutez votre prix au kilogramme et choisissez la devise qui l’identifie. Examinez longueur, masse et coût calculés. Gardez séparés les autres coûts du travail: électricité, temps machine et main-d’œuvre ne sont pas calculés sur cette page.",
    "Téléchargez le rapport JSON avec les entrées. Comparez l’estimation à plusieurs utilisations réelles et prévoyez chargement, purge et pertes. Passez au calculateur de coût d’impression si vous devez aussi inclure la durée et l’énergie.",
  ],
  sections: [
    {
      heading: "Comprendre le calcul d’un cylindre",
      paragraphs: [
        "La section du filament vaut pi multiplié par le carré de son demi-diamètre. Cette section multipliée par la longueur donne le volume, puis la densité permet d’obtenir la masse. Avec le diamètre en millimètres et la longueur en mètres, la valeur numérique section-longueur correspond à des centimètres cubes. Le mode inverse reprend la même relation lorsque les grammes sont connus et que les mètres sont recherchés.",
        "Avec les exemples de 100 mètres, 1,75 millimètre et 1,24 gramme par centimètre cube, la masse estimée est d’environ 298,25 grammes. À 25 unités monétaires par kilogramme, la matière coûte environ 7,46. Ces résultats viennent des nombres saisis, sans affirmer que toutes les bobines d’une même famille de polymère possèdent cette densité ou cette longueur utile. Gardez les hypothèses pour comparer les estimations.",
      ],
    },
    {
      heading: "Mesurer la bonne masse et le bon diamètre",
      paragraphs: [
        "La lecture d’une balance comprend le support de bobine et le filament. Retirez une tare connue correspondant au même type de bobine avant d’estimer la matière restante. Si cette tare est inconnue, la quantité de plastique l’est aussi avec une certaine incertitude. Un affichage précis sur la balance ne prouve pas que vous avez correctement isolé la masse du filament.",
        "Le diamètre intervient au carré dans la section. Une petite différence modifie donc la masse estimée par mètre, et un brin irrégulier ne correspond pas exactement au cylindre uniforme du modèle. Utilisez des mesures adaptées ou les données du fournisseur plutôt que de changer la densité pour masquer un mauvais diamètre. Les matières chargées et les mélanges peuvent avoir des densités différentes malgré une même appellation générale.",
      ],
    },
    {
      heading: "Planifier avec une réserve réaliste",
      paragraphs: [
        "La longueur estimée aide à comparer la consommation prévue d’un travail avec le reste d’une bobine. Elle ne prédit pas les pertes au chargement, la purge, les supports ou un démarrage raté. Gardez une réserve fondée sur votre procédé au lieu de prévoir une longue impression critique jusqu’au dernier mètre calculé. Vérifiez la consommation du trancheur et le comportement de la machine en fin de filament avant de compter sur une bobine presque vide.",
        "Le résultat financier concerne uniquement la masse de plastique au prix que vous indiquez. Ce n’est ni un coût complet ni un prix de vente, et aucun tarif de 3D3D n’y est intégré. Comparez les offres de bobines avec des unités cohérentes: la masse annoncée peut concerner le filament, tandis que le poids d’expédition inclut l’emballage. Notez ce que représentent prix et masse, puis gardez le rapport pour permettre une révision des hypothèses.",
      ],
    },
  ],
  comparison: [
    {
      name: "Calculateur Prusa",
      detail: "Calcule des coûts à partir de la masse et du prix saisis.",
      url: "https://blog.prusa3d.com/3d-printing-price-calculator_38905/",
    },
  ],
  faqs: [
    {
      q: "Puis-je convertir des grammes en mètres?",
      a: "Oui. Choisissez le mode masse et indiquez le filament seul. Le résultat dépend toujours du diamètre et de la densité retenus.",
    },
    {
      q: "Dois-je inclure la bobine vide?",
      a: "Non. Saisissez la masse du filament. Retirez une tare connue pour le même support et gardez une incertitude explicite si cette valeur manque.",
    },
    {
      q: "La densité par défaut convient-elle à tous les PLA?",
      a: "Aucune valeur universelle n’est promise. Utilisez la spécification réelle ou une mesure adaptée, surtout pour les mélanges chargés ou inhabituels.",
    },
    {
      q: "Pourquoi le diamètre influence-t-il autant le résultat?",
      a: "La section dépend du diamètre au carré. Modifier le diamètre change donc le volume et la masse représentés par chaque mètre de filament.",
    },
    {
      q: "La purge et les supports sont-ils compris?",
      a: "Seulement si votre longueur ou masse les inclut déjà. Le calculateur ne lit pas un travail tranché et n’ajoute pas de marge de déchets séparée.",
    },
    {
      q: "Est-ce le prix d’une impression chez 3D3D?",
      a: "Non. C’est votre coût matière à partir de vos entrées. Demandez un devis pour le service 3D3D ou utilisez le calculateur complet pour d’autres postes.",
    },
  ],
  service: { label: "Demander un devis d’impression à 3D3D", path: "/quote" },
} satisfies ToolGuide;
