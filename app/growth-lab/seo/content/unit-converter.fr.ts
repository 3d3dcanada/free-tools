import type { ToolGuide } from "../guide";
export default {
  slug: "unit-converter",
  locale: "fr",
  title: "Convertisseur d’unités pour l’impression 3D | 3D3D",
  description:
    "Convertissez longueurs, volumes, masses et durées avec des unités explicites. Vérifiez pouces et millimètres, puis gardez un rapport local gratuit.",
  name: "Convertisseur d’unités d’impression 3D",
  headline: "Gardez le nombre avec son unité.",
  summary: "Convertissez des grandeurs compatibles sans confondre volume et masse.",
  answer:
    "Convertissez gratuitement longueurs, volumes, masses et durées dans votre navigateur, sans téléversement. Choisissez la catégorie, les unités de départ et d’arrivée et une valeur positive ou nulle, puis consultez ou téléchargez le résultat. Les catégories restent distinctes: passer des millimètres cubes aux grammes demande une densité, et un facteur de longueur ne suffit pas pour un volume.",
  steps: [
    "Identifiez la grandeur connue: longueur, volume, masse ou durée. Relevez l’unité sur le dessin, la fiche matière ou l’estimation d’origine. Ne la déduisez pas seulement de l’apparence plausible du nombre.",
    "Choisissez la catégorie et les deux unités, puis saisissez le nombre sans son unité dans le champ numérique. Le convertisseur accepte des décimaux positifs ou nuls et sépare les grandeurs incompatibles dans ses choix.",
    "Comparez le résultat à un repère simple. Un pouce vaut 25,4 millimètres, un kilogramme 1000 grammes et une heure 60 minutes. Ce contrôle rapide aide à repérer un sens de conversion inversé avant d’utiliser le nombre dans un modèle.",
    "Téléchargez le rapport si le calcul appartient à un dossier de projet. Gardez l’unité d’arrivée avec la valeur lors de sa reprise ailleurs. Vérifiez encore une cote connue après l’importation d’un modèle: copier un nombre ne prouve pas l’échelle du fichier entier.",
  ],
  sections: [
    {
      heading: "Séparer les différentes grandeurs",
      paragraphs: [
        "Une longueur décrit une dimension, tandis qu’un volume décrit un espace à trois dimensions. Passer des millimètres aux centimètres utilise un facteur dix pour la longueur, mais passer des millimètres cubes aux centimètres cubes utilise mille. Le choix de catégorie rend cette différence visible. Il évite d’appliquer à une surface ou un volume un facteur de longueur familier sans tenir compte de sa puissance.",
        "Masse et volume sont également distincts. Les centimètres cubes d’un modèle ne donnent pas directement ses grammes: il faut une densité et une représentation adaptée du solide ou du remplissage. Utilisez les calculateurs de filament ou de coût pour ces hypothèses supplémentaires. Le convertisseur ne devine pas un polymère à partir du nom de fichier et ne suppose pas qu’un millilitre de toute matière possède la même masse.",
      ],
    },
    {
      heading: "Contrôler l’échelle entre logiciels",
      paragraphs: [
        "Un dessin décrit en pouces peut être ouvert ailleurs avec une interprétation en millimètres. Une cote connue fournit un contrôle utile: un élément d’un pouce doit mesurer 25,4 millimètres après conversion. La vue seule est peu probante, car les visionneuses cadrent souvent automatiquement le modèle. Comparez une mesure au plan ou à une référence physique avant de calculer la matière et de préparer l’impression.",
        "Un pouce cube correspond à 16,387064 centimètres cubes. Cette relation vient du cube du facteur de longueur et de la conversion des unités cubiques, pas d’une seule multiplication par 2,54. Lors d’une mise à l’échelle uniforme, la surface varie avec le carré et le volume avec le cube du facteur. Le convertisseur traite les unités proposées, tandis qu’une modification réelle de géométrie se fait dans le modeleur ou le trancheur.",
      ],
    },
    {
      heading: "Conserver le sens et la précision utile",
      paragraphs: [
        "Le résultat peut afficher plus de décimales que la mesure initiale ne justifie. Ces chiffres décrivent l’arithmétique, sans améliorer le pied à coulisse, la balance ou l’horloge. Gardez la mesure originale et son incertitude lorsque les tolérances comptent. Arrondissez volontairement selon le dessin ou dossier destinataire, sans multiplier les arrondis intermédiaires lorsqu’une conversion directe serait plus claire.",
        "La catégorie temps convertit des durées en secondes, minutes et heures. Elle ne programme pas un événement, n’interprète pas les fuseaux horaires et ne compte pas une pause nocturne de l’imprimante. Les onces et livres proposées sont des masses, pas des volumes liquides ou des forces. Lisez la catégorie et les deux unités du rapport. Ce contexte est souvent plus utile qu’une longue valeur décimale copiée seule.",
      ],
    },
  ],
  comparison: [
    {
      name: "Référence SI du NIST",
      detail: "Publie des facteurs de conversion de référence.",
      url: "https://www.nist.gov/pml/special-publication-811/nist-guide-si-appendix-b-conversion-factors/nist-guide-si-appendix-b8",
    },
  ],
  faqs: [
    {
      q: "Puis-je convertir des millimètres en grammes?",
      a: "Pas directement. Longueur, volume et masse sont distincts. Estimer une masse demande une géométrie et une densité, pas seulement une unité de longueur.",
    },
    {
      q: "Combien de millimètres vaut un pouce?",
      a: "Un pouce international vaut exactement 25,4 millimètres. Utilisez une cote connue pour vérifier un modèle dont l’unité d’importation est incertaine.",
    },
    {
      q: "Un centimètre cube vaut-il un millilitre?",
      a: "Oui, ces unités représentent le même volume. Cela ne signifie pas que ce volume possède toujours une masse d’un gramme.",
    },
    {
      q: "Les onces sont-elles des onces liquides?",
      a: "Non. La catégorie masse utilise les onces et livres avoirdupois. Elle ne contient pas d’unités de volume liquide ni de force.",
    },
    {
      q: "La conversion de temps traite-t-elle les dates?",
      a: "Elle traite seulement les durées. Dates de calendrier, fuseaux, pauses et planification ne font pas partie de ce calcul.",
    },
    {
      q: "Plus de décimales signifie-t-il plus de précision?",
      a: "Non. Elles proviennent du calcul. Tenez compte de la précision et de l’incertitude de la mesure source pour choisir les chiffres à conserver.",
    },
  ],
  service: { label: "Discuter des dimensions d’une pièce avec 3D3D", path: "/quote" },
} satisfies ToolGuide;
