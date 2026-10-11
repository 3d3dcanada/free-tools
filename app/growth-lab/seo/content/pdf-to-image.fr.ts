import type { ToolGuide } from "../guide";
export default {
  slug: "pdf-to-image",
  locale: "fr",
  title: "PDF en PNG ou JPG gratuitement et localement | 3D3D",
  description:
    "Convertissez des pages PDF en PNG ou JPG à 72, 96, 150 ou 300 ppp. Choisissez les pages et téléchargez un ZIP ordonné sans téléversement.",
  name: "Pages PDF en images",
  headline: "Une page rendue en pixels.",
  summary: "Choisissez le format et la résolution des pages à convertir.",
  answer:
    "Convertissez gratuitement des pages PDF en PNG ou JPG dans votre navigateur, sans téléverser le document. Choisissez les pages et une résolution de 72 à 300 ppp, puis téléchargez un ZIP ordonné. Chaque image représente une page entière sur fond blanc; elle n’extrait pas les photos originales et ne conserve pas le texte modifiable.",
  steps: [
    "Sélectionnez le PDF et repérez les pages nécessaires. Utilisez la liste et le champ de plages pour limiter le contenu. Vérifiez l’orientation avant l’exportation, puisque chaque résultat suit la rotation actuelle de la page.",
    "Choisissez PNG pour un encodage raster sans perte, ou JPG pour une copie photographique acceptée par la destination. Aucun des deux ne conserve les tracés vectoriels ou le texte actif. Comparez une page représentative si le choix reste incertain.",
    "Réglez la résolution à 72, 96, 150 ou 300 ppp selon les dimensions utiles. Les valeurs élevées créent plus de pixels et demandent plus de mémoire. Commencez par quelques pages pour un document long ou composé de grands plans.",
    "Téléchargez le ZIP, décompressez-le et ouvrez plusieurs fichiers réels. Contrôlez les dimensions, l’ordre, les petites légendes et les limites de la sélection. Gardez le PDF comme source documentaire à côté des copies rendues pour la livraison.",
  ],
  sections: [
    {
      heading: "Passer de la taille physique aux pixels",
      paragraphs: [
        "La résolution indique combien de pixels représentent un pouce de page PDF. Une feuille Letter à 150 ppp donne 1275 sur 1650 pixels avant une éventuelle rotation des axes. À 300 ppp, elle donne 2550 sur 3300 pixels. Doubler les deux dimensions multiplie par quatre le nombre de pixels, avec des conséquences sur la mémoire et le temps de calcul. Choisissez selon l’usage, sans prendre systématiquement le maximum.",
        "Un plan dont les dimensions physiques sont très grandes peut dépasser les limites même si le PDF original est léger. Les instructions vectorielles occupent parfois peu d’octets, alors que leur rendu demande des millions de pixels. Si l’exportation est refusée, réduisez la résolution ou préparez une page source aux dimensions adaptées. Un petit fichier en octets ne garantit pas un canevas raster facile à créer.",
      ],
    },
    {
      heading: "Distinguer le rendu et l’extraction d’éléments",
      paragraphs: [
        "L’outil dessine la page visible comme une seule image. Il ne récupère pas séparément les photographies, logos ou schémas incorporés au PDF. Une page contenant trois photos devient une image de cette page avec sa mise en page. Utilisez un parcours d’extraction dédié si vous avez besoin des fichiers intégrés d’origine ou de leur résolution propre, en respectant leurs conditions d’utilisation.",
        "Le fond du rendu est blanc, y compris pour les PNG. Le PNG conserve les pixels obtenus sans compression JPEG, mais ne rend pas automatiquement la page transparente et ne rétablit pas des objets vectoriels modifiables. Le texte devient une image: recherche, sélection, liens et champs cessent de fonctionner comme dans un PDF. Gardez le document lorsqu’un lecteur a besoin de ces fonctions ou d’une représentation textuelle accessible.",
      ],
    },
    {
      heading: "Examiner les éléments difficiles à reproduire",
      paragraphs: [
        "Contrôlez les petits caractères, traits fins, symboles et polices inhabituelles. Un téléchargement réussi prouve la création d’un fichier, pas la reproduction exacte de chaque fonction spécialisée du PDF. L’outil n’exécute pas les scripts du document et ne propose pas de formulaire interactif. Comparez les valeurs de champs, annotations ou éléments particuliers importants avec votre lecteur de référence avant d’utiliser les images.",
        "Le ZIP nomme les résultats dans l’ordre de sortie. Cette séquence peut différer des numéros imprimés, notamment après sélection ou réorganisation. Gardez une note de la source et des pages utilisées lorsque cette correspondance compte. Ne supprimez pas le PDF après le rendu: une future modification de taille doit partir du document, plutôt que d’une image déjà réduite ou compressée qui a perdu des détails.",
      ],
    },
  ],
  comparison: [
    {
      name: "iLovePDF PDF to JPG",
      detail: "Convertit les PDF téléversés en images.",
      url: "https://www.ilovepdf.com/pdf_to_jpg",
    },
  ],
  faqs: [
    {
      q: "Les photos intégrées sont-elles extraites séparément?",
      a: "Non. L’outil rend des pages complètes. Une page avec plusieurs photos devient une seule image, sans récupération des fichiers intégrés originaux.",
    },
    {
      q: "Quelle résolution choisir?",
      a: "Partez des dimensions demandées par la destination. Plus de ppp signifie plus de pixels et de mémoire. Essayez une page et vérifiez ses plus petits détails utiles.",
    },
    {
      q: "Le PNG possède-t-il un fond transparent?",
      a: "Non. Le rendu se fait sur fond blanc. Le PNG évite la compression JPEG du raster, mais le fond de la page reste opaque.",
    },
    {
      q: "Puis-je convertir seulement certaines pages?",
      a: "Oui. Saisissez des positions ou des plages et contrôlez l’ordre choisi. Les noms dans le ZIP suivent cet ordre, pas les numéros imprimés du document.",
    },
    {
      q: "Le texte et les liens restent-ils interactifs?",
      a: "Non. Ils deviennent des pixels. Gardez le PDF pour la recherche, la sélection de texte, les liens et les fonctions qu’une image ne fournit pas.",
    },
    {
      q: "Pourquoi un PDF léger dépasse-t-il la limite?",
      a: "Une page vectorielle compacte peut produire un immense raster à haute résolution. Réduisez les ppp ou préparez une page physiquement plus petite si le canevas dépasse la limite.",
    },
  ],
  service: { label: "Préparer un rendu documentaire avec 3D3D", path: "/software-development" },
} satisfies ToolGuide;
