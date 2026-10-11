import type { ToolGuide } from "../guide";
export default {
  slug: "resize-image",
  locale: "fr",
  title: "Redimensionner une image gratuitement | 3D3D",
  description:
    "Redimensionnez vos images par pixels, pourcentage ou format social. Conservez l’image entière ou remplissez le cadre. Lots gratuits et locaux.",
  name: "Redimensionnement d’images gratuit",
  headline: "La bonne taille pour la suite.",
  summary: "Réglez des limites en pixels ou un pourcentage, avec ou sans recadrage.",
  answer:
    "Redimensionnez gratuitement vos images en pixels, en pourcentage ou avec un format social, sans transmettre les fichiers. Conservez l’image entière dans des limites données ou remplissez le cadre exact avec un recadrage centré. Traitez un lot localement, vérifiez les dimensions obtenues et téléchargez les résultats séparément ou en ZIP.",
  steps: [
    "Choisissez les originaux et repérez les dimensions en pixels demandées par la destination. La limite de poids et le cadrage affiché sont deux contraintes différentes: vérifiez-les avant de définir votre taille de sortie.",
    "Sélectionnez des dimensions ou un pourcentage. Le mode de conservation fait tenir l’image entière dans les limites choisies; le remplissage produit la largeur et la hauteur exactes en recadrant au centre. Utilisez l’outil de recadrage pour placer précisément le sujet.",
    "Choisissez le format de fichier et lancez le lot. Examinez les dimensions de chaque résultat. Des originaux en portrait et en paysage peuvent produire des tailles différentes en mode de conservation, même avec les mêmes limites.",
    "Ouvrez le fichier à sa taille d’affichage prévue. Vérifiez les petits textes et les sujets importants, puis l’aperçu dans l’application destinataire. Gardez l’original comme référence au lieu d’agrandir la petite copie pour le prochain usage.",
  ],
  sections: [
    {
      heading: "Les pixels décrivent la taille, pas la netteté",
      paragraphs: [
        "La largeur et la hauteur indiquent le nombre d’échantillons contenus dans l’image. Réduire une grande photo facilite sa diffusion si la destination n’a besoin que d’un petit affichage. Agrandir une petite source crée davantage de pixels de sortie sans retrouver les détails jamais enregistrés. Si une étiquette devient illisible, choisissez une meilleure photo ou une composition plus serrée plutôt que de compter sur un nombre supérieur.",
        "Le pourcentage agit sur les deux dimensions. Un réglage à cinquante pour cent divise la largeur et la hauteur par deux, laissant environ le quart des pixels avant arrondi. Il ne garantit pas le quart du poids: le format et le contenu influencent aussi la compression. Examinez les mesures réelles plutôt que de traiter le pourcentage comme une prévision exacte de la taille du fichier téléchargé.",
      ],
    },
    {
      heading: "Choisir entre conserver et remplir",
      paragraphs: [
        "La conservation convient lorsqu’il faut montrer toute la source, par exemple un objet complet ou une capture dont les commandes sont près des bords. Elle produit une image qui tient dans les dimensions demandées, sans ajouter de toile avec des bandes pour forcer les deux mesures. Une image deux fois plus large que haute conserve donc cette proportion à l’intérieur d’un cadre carré.",
        "Le remplissage convient lorsqu’une largeur et une hauteur exactes sont obligatoires. Il préserve les proportions en coupant ce qui dépasse autour du centre. Il peut ainsi retirer un visage, une légende ou un détail important si la composition ne correspond pas à la destination. Recadrez d’abord autour du sujet ou revoyez la disposition lorsque l’intégrité de l’objet compte davantage que le remplissage complet de la zone.",
      ],
    },
    {
      heading: "Utiliser les préréglages comme point de départ",
      paragraphs: [
        "Les formats sociaux proposés sont des dimensions pratiques, pas des garanties pour chaque emplacement d’une plateforme. Une bannière peut subir différents cadrages sur téléphone et ordinateur; des commandes ou une image de profil peuvent aussi la recouvrir. Gardez le contenu essentiel loin des bords et vérifiez l’aperçu du service de publication. Utilisez des dimensions personnalisées si votre parcours fournit des exigences actuelles plus précises.",
        "Un lot applique la même opération à chaque fichier, mais chaque image mérite une vérification. Une photo panoramique et un document vertical peuvent demander des décisions différentes dans une même galerie. L’outil accepte au maximum 20 images dans ses limites de mémoire et les traite localement. Réduisez les lots sur un appareil limité et gardez les originaux jusqu’à confirmation de l’utilité de toutes les sorties.",
      ],
    },
  ],
  comparison: [
    { name: "Squoosh", detail: "Traitement local avec comparaison visuelle.", url: "https://squoosh.app/" },
  ],
  faqs: [
    {
      q: "Puis-je redimensionner sans couper l’image?",
      a: "Oui. Choisissez la conservation en mode pixels ou utilisez le pourcentage. Les proportions restent identiques; une dimension peut donc être inférieure à la limite saisie.",
    },
    {
      q: "Pourquoi les deux dimensions ne correspondent-elles pas exactement?",
      a: "La conservation garde toute l’image à l’intérieur des limites. Le remplissage impose les dimensions exactes, mais peut retirer du contenu sur les bords.",
    },
    {
      q: "Agrandir l’image améliore-t-il sa netteté?",
      a: "Non. Le rééchantillonnage ajoute des pixels sans recréer les détails absents. Choisissez un original de meilleure résolution si l’usage final exige davantage d’information.",
    },
    {
      q: "Puis-je appliquer le même pourcentage à plusieurs images?",
      a: "Oui. Chaque fichier reçoit la même échelle. Des dimensions initiales différentes donnent toujours des dimensions finales différentes.",
    },
    {
      q: "Changer les pixels définit-il une taille d’impression?",
      a: "La taille physique dépend aussi de la résolution et des réglages d’impression. Confirmez-les dans le procédé d’impression: un format social en pixels ne représente pas automatiquement une feuille de papier.",
    },
    {
      q: "Puis-je annuler le redimensionnement?",
      a: "Annuler restaure les réglages de l’éditeur. Les originaux restent intacts; téléchargez un nouveau résultat après modification plutôt que de retravailler plusieurs fois une copie exportée.",
    },
  ],
  service: { label: "Discuter d’un parcours Web avec 3D3D", path: "/software-development" },
} satisfies ToolGuide;
