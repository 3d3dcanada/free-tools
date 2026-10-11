import type { ToolGuide } from "../guide";
export default {
  slug: "crop-image",
  locale: "fr",
  title: "Recadrer, tourner et retourner une image | 3D3D",
  description:
    "Recadrez gratuitement avec des proportions libres ou fixes, puis tournez ou retournez vos images. Traitement local par lot, sans téléversement.",
  name: "Recadrage d’images gratuit",
  headline: "Gardez ce qui compte.",
  summary: "Choisissez la composition, les proportions et l’orientation du nouveau fichier.",
  answer:
    "Recadrez, tournez et retournez gratuitement des images dans le navigateur sans transmettre les originaux. Choisissez des proportions libres ou fixes, réglez la taille et la position de la zone, puis examinez le résultat. Les mêmes réglages peuvent traiter un lot; chaque image téléchargée reste distincte de son fichier source.",
  steps: [
    "Choisissez une image et repérez ce qui importe au lecteur. Sélectionnez des proportions libres ou fixes, comme un carré, un paysage ou un portrait, avant de décider de la quantité de contexte à retirer.",
    "Réglez la largeur et la hauteur de recadrage en pourcentage, puis déplacez la zone horizontalement et verticalement. Les proportions fixes s’inscrivent dans cette zone. Lancez le traitement pour voir le résultat exact et vérifier la place du sujet.",
    "Ajoutez au besoin une rotation d’un quart de tour ou un miroir horizontal ou vertical. Les miroirs précèdent la rotation choisie. Contrôlez les textes et les objets asymétriques: une image inversée peut représenter une pièce différente.",
    "Téléchargez l’image ou le ZIP et inspectez les véritables fichiers. Confirmez leurs dimensions et leur orientation dans l’application destinataire. Gardez la source afin de retrouver les éléments retirés si une autre composition en a besoin.",
  ],
  sections: [
    {
      heading: "Clarifier l’image sans en changer le sens",
      paragraphs: [
        "Le recadrage peut éliminer une table encombrée, recentrer un produit ou encadrer un portrait. Partez du rôle de l’image: quels détails permettent de comprendre le sujet? Gardez assez de contexte pour l’interpréter correctement. Retirer un défaut, une référence d’échelle ou un avertissement important peut rendre l’image moins fidèle, même si la composition semble plus propre.",
        "Pour une fiche produit, vérifiez que l’objet et ses points de fixation utiles restent visibles. Pour un document photographié, conservez les bords ou les titres nécessaires à son identification. Pour une image sociale, prévoyez la place des textes qui seront ajoutés ensuite. Enregistrez plusieurs cadrages adaptés à leurs usages plutôt que d’attendre d’une seule composition qu’elle fonctionne partout.",
      ],
    },
    {
      heading: "Distinguer les proportions des dimensions",
      paragraphs: [
        "Un rapport décrit une forme, pas une résolution. Un carré peut avoir de nombreuses dimensions en pixels. Le recadrage sélectionne une région de l’image existante: une petite zone contient moins de pixels sources qu’une grande. Si la destination impose aussi une largeur et une hauteur, composez d’abord le cadrage, puis utilisez l’outil de redimensionnement sur le résultat obtenu.",
        "Des proportions fixes donnent une galerie cohérente, mais les sujets d’un lot ne se trouvent pas nécessairement au même endroit. La même région en pourcentage peut couper un visage sur une photo et convenir parfaitement à une autre. Vérifiez chaque résultat et traitez les exceptions séparément. Si l’objet entier compte davantage que le remplissage du cadre, utilisez le mode de conservation du redimensionneur.",
      ],
    },
    {
      heading: "Contrôler l’orientation et le format final",
      paragraphs: [
        "Une rotation change la dimension horizontale: un quart de tour échange largeur et hauteur. Un miroir change le sens de l’image. Ces opérations sont distinctes et ne remplacent pas le placement de la zone de recadrage. Relisez les textes et examinez les connecteurs, trous de fixation ou commandes avant d’utiliser la photo pour expliquer un produit physique.",
        "Le format de sortie agit toujours sur la transparence et la qualité. Le PNG peut garder un fond transparent, tandis que le JPEG remplit ces zones avec la couleur choisie. Des exports répétés avec perte peuvent ajouter des défauts. Reprenez l’original pour les révisions lorsque c’est possible, puis réalisez le cadrage et l’encodage définitifs. L’éditeur ne remplace jamais le fichier source sur votre appareil.",
      ],
    },
  ],
  comparison: [
    { name: "Squoosh", detail: "Traitement local et comparaison visuelle.", url: "https://squoosh.app/" },
  ],
  faqs: [
    {
      q: "Puis-je créer un recadrage carré?",
      a: "Oui. Choisissez le rapport 1:1 et placez la zone sur le sujet. Ses dimensions dépendent de la source; redimensionnez ensuite si une taille carrée précise est exigée.",
    },
    {
      q: "Que signifient les pourcentages de recadrage?",
      a: "Ils définissent une région dans l’original. Les proportions fixes s’inscrivent dans cette région, tandis que les commandes de position définissent son emplacement.",
    },
    {
      q: "Un miroir équivaut-il à une rotation?",
      a: "Non. Un miroir inverse l’image, une rotation la tourne. Vérifiez les lettres et les pièces asymétriques pour ne pas publier une représentation erronée d’un objet réel.",
    },
    {
      q: "Puis-je récupérer les bords supprimés plus tard?",
      a: "Le fichier recadré ne contient plus ces pixels. Gardez la source et rechargez-la pour produire un autre cadrage si une future mise en page exige davantage de contexte.",
    },
    {
      q: "Puis-je recadrer tout un lot de façon uniforme?",
      a: "Oui. Les mêmes réglages s’appliquent à chaque fichier. Examinez toutes les sorties: les proportions et les positions différentes des sujets peuvent nécessiter des ajustements individuels.",
    },
    {
      q: "L’outil redresse-t-il un horizon légèrement incliné?",
      a: "Les rotations proposées sont des quarts de tour, pas des angles libres. Utilisez un éditeur offrant une rotation fine pour redresser précisément un document ou un horizon.",
    },
  ],
  service: { label: "Préparer un site ou un parcours produit avec 3D3D", path: "/software-development" },
} satisfies ToolGuide;
