import type { ToolGuide } from "../guide";
export default {
  slug: "vcard-qr-code",
  locale: "fr",
  title: "Générateur de QR vCard gratuit pour contacts | 3D3D",
  description:
    "Créez un QR vCard statique avec nom, téléphone, courriel et site. Vérifiez et téléchargez le contact localement, sans profil hébergé ni compte.",
  name: "Générateur de QR vCard gratuit",
  headline: "Un contact facile à conserver.",
  summary: "Placez les coordonnées directement dans un code pour les enregistrer sur téléphone.",
  answer:
    "Créez gratuitement un code QR vCard pour permettre l’ajout de vos coordonnées au carnet d’adresses sans les retaper. Les champs de contact sont encodés directement et rien n’est transmis. Saisissez seulement les renseignements à partager, gardez la fiche concise et vérifiez le contact enregistré sur un téléphone avant l’impression.",
  steps: [
    "Saisissez le prénom et le nom, puis les champs utiles: téléphone, courriel, entreprise et site. Évitez les renseignements privés sur une carte destinée à circuler publiquement. Un contact court est aussi plus facile à relire.",
    "Examinez la vCard produite et le résultat de lecture. Un contact long demande davantage de modules dans le QR et plus d’espace sur la carte imprimée. Conservez une marge claire autour du symbole.",
    "Scannez le fichier exporté sur les téléphones visés. Ouvrez l’aperçu, contrôlez chaque champ, enregistrez le contact et relisez-le. Gardez le brouillon modifiable pour une future mise à jour et une réimpression.",
  ],
  sections: [
    {
      heading: "Choisir les renseignements d’un contact public",
      paragraphs: [
        "Une fiche de contact doit permettre de reconnaître une personne et de la joindre par un moyen approprié. Commencez par le prénom, le nom, un téléphone utile et une adresse courriel. Ajoutez l’entreprise ou le site si cela aide. Une carte professionnelle publique n’a pas besoin d’une adresse personnelle ou de tous les numéros de la personne. Le QR contient les véritables coordonnées, pas un profil protégé.",
        "Limitez la fiche à sa fonction. Chaque champ ajoute des données et peut rendre le symbole plus dense. Sur une petite carte, un contact concis et bien identifié sera souvent plus pratique qu’une biographie entière dans un minuscule code. Imprimez aussi un nom et un moyen de contact lisibles: la carte doit rester utile si le destinataire ne peut pas ou ne souhaite pas scanner.",
      ],
    },
    {
      heading: "Tester la fiche enregistrée, pas seulement la lecture",
      paragraphs: [
        "Le décodeur peut retrouver exactement le texte vCard alors qu’une application de contacts interprète un champ autrement que prévu. Vérifiez l’aperçu sur les téléphones de votre public. Contrôlez la séparation du prénom et du nom, l’indicatif téléphonique, le courriel et le site. Enregistrez une fiche d’essai, ouvrez-la de nouveau et assurez-vous que les renseignements utiles sont arrivés aux bons endroits.",
        "Un format téléphonique international cohérent facilite l’usage d’un contact qui circule entre régions. Vérifiez les accents et la ponctuation dans le contenu exporté. L’éditeur propose la vCard 3.0 et une variante MeCard plus compacte. Changer de format est un choix de compatibilité, pas une garantie de comportement identique dans toutes les applications. Notez les appareils réellement essayés avant de commander une grande série.",
      ],
    },
    {
      heading: "Prévoir les mises à jour futures",
      paragraphs: [
        "Le contact statique ne dépend pas d’un service de profil hébergé: aucun compte ne s’interpose entre le symbole et ses données. En contrepartie, une ancienne carte imprimée ne peut pas recevoir un nouveau numéro. Lorsque les coordonnées changent, actualisez le brouillon et remplacez la carte. Si les modifications sont fréquentes, un QR vers un site que vous entretenez peut mieux répondre au besoin.",
        "Le créateur de cartes de visite réutilise ce QR et lui réserve de l’espace dans une composition recto verso. Contrôlez les dimensions physiques et la lecture à travers la finition réellement choisie. Exporter un contact, écrire une puce NFC et enregistrer une fiche sur téléphone sont des étapes distinctes. Vérifiez chacune avec l’appareil approprié plutôt que de déduire leur réussite d’un simple téléchargement.",
      ],
    },
  ],
  comparison: [
    {
      name: "QRCode Monkey",
      detail: "Choix vCard et MeCard parmi plusieurs contenus statiques.",
      url: "https://www.qrcode-monkey.com/",
    },
  ],
  faqs: [
    {
      q: "Le QR vCard ouvre-t-il un profil hébergé?",
      a: "Non. Il contient la fiche de contact elle-même, sans profil en ligne, quota de lectures ou redirection par abonnement.",
    },
    {
      q: "Puis-je changer le téléphone sur une carte déjà imprimée?",
      a: "Non. Il faut créer un nouveau code et réimprimer. Un QR vers une page Web permet d’actualiser la page, mais constitue un autre usage.",
    },
    {
      q: "Pourquoi un téléphone range-t-il un champ autrement?",
      a: "Les carnets d’adresses interprètent les formats de contact différemment. Testez la vCard exportée sur les appareils visés; MeCard constitue une autre option compacte.",
    },
    {
      q: "Le contact peut-il fonctionner sans site Web?",
      a: "Oui. Le nom et les champs sont dans le QR. Ouvrir ensuite un lien Web enregistré dans le contact demande toutefois l’accès à cette destination.",
    },
    {
      q: "Pourquoi ce QR est-il plus dense qu’un code URL?",
      a: "Une fiche complète peut contenir plus de caractères qu’une adresse courte. Supprimez les champs inutiles et laissez assez d’espace imprimé pour la grille obtenue.",
    },
    {
      q: "Puis-je utiliser ce contact sur une étiquette NFC?",
      a: "Vous pouvez exporter le contenu et l’écrire avec une application NFC adaptée. Le navigateur ne programme pas la puce; testez séparément l’étiquette écrite.",
    },
  ],
  service: { label: "Demander des cartes imprimées ou des étiquettes NFC", path: "/quote" },
} satisfies ToolGuide;
