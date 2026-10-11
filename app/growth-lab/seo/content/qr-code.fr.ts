import type { ToolGuide } from "../guide";
export default {
  slug: "qr-code",
  locale: "fr",
  title: "Générateur QR gratuit, sans expiration | 3D3D",
  description:
    "Créez et vérifiez des codes QR statiques avec couleurs, logo et contacts. Export SVG, PNG, PDF ou EPS local, sans compte ni expiration.",
  name: "Générateur de code QR gratuit",
  headline: "Un code qui vous appartient.",
  summary: "Créez des codes statiques pour des liens, contacts, réseaux et événements.",
  answer:
    "Créez gratuitement un code QR statique avec vos couleurs, votre logo et une légende, puis téléchargez-le en SVG, PNG, PDF ou EPS. Aucun fichier n’est transmis. Le code contient directement les renseignements choisis, sans redirection par abonnement, suivi des lectures ni expiration. Vérifiez sa lecture avant de le partager.",
  steps: [
    "Choisissez d’abord le contenu. Un site demande une adresse complète; un contact, un réseau ou un événement utilise des champs précis. Vérifiez les renseignements et ne saisissez que ce que le destinataire doit pouvoir lire.",
    "Réglez les couleurs, les points et les coins. Ajoutez un petit logo au besoin, en conservant une marge dégagée autour du symbole. L’éditeur augmente la correction d’erreurs avec un logo, sans garantir la lecture sur tous les téléphones.",
    "Attendez que le décodeur confirme qu’il a retrouvé exactement le contenu saisi. Corrigez toute erreur avant l’export. Une lecture réussie vérifie le symbole et les données; elle ne confirme ni l’existence du site ni le fonctionnement du mot de passe.",
    "Choisissez le SVG pour un dessin redimensionnable, le PNG pour une image ou le PDF pour une étiquette à imprimer. Ouvrez le fichier téléchargé, relisez le code et testez un exemplaire physique à sa taille et à sa distance d’utilisation.",
  ],
  sections: [
    {
      heading: "Décider de ce que la lecture doit permettre",
      paragraphs: [
        "Un code URL ouvre une destination que vous entretenez. Un code de contact contient les renseignements qu’un téléphone peut proposer d’enregistrer. Le Wi-Fi transporte les paramètres du réseau, tandis qu’un événement contient des données de calendrier. Le texte simple peut identifier un objet sans site Web. Partez de l’action attendue du destinataire, puis choisissez les champs appropriés: un beau symbole ne corrige pas un contenu inadapté.",
        "Sur une affiche d’atelier, écrivez une courte adresse lisible à côté du QR et précisez ce que le visiteur trouvera. Pour un réseau invité, placez l’affiche là où seuls les visiteurs concernés peuvent la voir. Sur une carte de visite, limitez les champs aux renseignements utiles. Un contenu long produit un symbole plus dense, qui demande davantage de place et un essai d’impression attentif.",
      ],
    },
    {
      heading: "Penser à l’appareil photo et au support",
      paragraphs: [
        "Des modules foncés sur fond clair constituent un bon point de départ. Un dégradé décoratif, une encre pâle ou un logo central trop grand peut réduire la distinction entre les modules. La zone tranquille est une marge fonctionnelle: ne la remplissez pas de texte, d’illustrations ou d’un cadre. Testez la plus petite version prévue, plutôt que le seul grand aperçu affiché à l’écran.",
        "La résolution en points par pouce relie le nombre de pixels à la taille physique. Elle ne crée pas de détails utiles dans une petite image. Le format vectoriel évite une grille de pixels fixe, mais l’imprimante, la matière et l’éclairage restent déterminants. Une surface courbe, brillante, texturée ou peu contrastée peut rendre difficile un code valide à l’écran. Imprimez un échantillon avant de produire une série de panneaux ou d’étiquettes.",
      ],
    },
    {
      heading: "Comprendre la permanence d’un code statique",
      paragraphs: [
        "Statique signifie que les données imprimées ne changent pas. Aucune redirection hébergée n’est à renouveler et aucun quota de lectures n’est intégré. En revanche, un domaine peut expirer et une page peut disparaître. Gardez la maîtrise de votre destination et conservez son adresse lors d’une migration. Pour changer les données encodées elles-mêmes, générez un nouveau symbole et remplacez l’ancien support.",
        "L’export par lot lit un CSV et crée un ZIP de codes sur cet appareil. Vérifiez les noms de colonnes et les résultats: un téléchargement terminé n’approuve pas toutes les destinations. Un fichier de contenu NFC ou NDEF ne prouve pas non plus qu’une puce a été programmée. Utilisez une application d’écriture compatible, puis testez séparément l’étiquette NFC terminée et le code imprimé.",
      ],
    },
  ],
  comparison: [
    {
      name: "Adobe Express",
      detail: "Codes URL statiques gratuits, sans expiration du service.",
      url: "https://www.adobe.com/express/feature/image/qr-code-generator",
    },
    {
      name: "QRCode Monkey",
      detail: "Plusieurs contenus statiques et réglages graphiques.",
      url: "https://www.qrcode-monkey.com/",
    },
  ],
  faqs: [
    {
      q: "Mon code QR peut-il expirer?",
      a: "Le symbole n’a ni expiration du service ni quota de lectures. Le site lié doit toutefois rester accessible; un mot de passe ou un contact peut devenir périmé.",
    },
    {
      q: "Puis-je ajouter un logo sans casser le code?",
      a: "Gardez-le petit et relancez la vérification après chaque modification. La correction d’erreurs aide, mais ne garantit pas la récupération de n’importe quelle zone masquée.",
    },
    {
      q: "Pourquoi le test réussit-il alors que mon téléphone hésite?",
      a: "Le décodeur local examine une image numérique nette. Le téléphone dépend de l’éclairage, de la mise au point, du support et de la distance. Testez l’objet imprimé sur plusieurs appareils.",
    },
    {
      q: "Puis-je suivre les lectures ou modifier une adresse déjà imprimée?",
      a: "Cet outil n’ajoute ni suivi ni service de redirection. Vous pouvez modifier une page à votre propre adresse, mais une nouvelle adresse encodée exige un nouveau QR.",
    },
    {
      q: "Quel fichier dois-je envoyer à l’imprimeur?",
      a: "Demandez le format et les dimensions finales attendus. Le SVG conserve la géométrie vectorielle; le PDF fournit une page mesurée. Vérifiez que la marge tranquille demeure intacte dans la mise en page.",
    },
    {
      q: "Mes contacts et mots de passe Wi-Fi restent-ils privés?",
      a: "Ils restent dans ce navigateur pendant l’édition. Le code exporté révèle cependant son contenu à toute personne qui le lit: réservez sa diffusion au public prévu.",
    },
  ],
  service: { label: "Faire réaliser un panneau ou une étiquette NFC par 3D3D", path: "/nfc-tags" },
} satisfies ToolGuide;
