import type { ToolGuide } from "../guide";
export default {
  slug: "wifi-qr-code",
  locale: "fr",
  title: "Code QR Wi-Fi gratuit pour vos invités | 3D3D",
  description:
    "Créez un QR Wi-Fi avec le nom du réseau et son mot de passe. Vérification et export PNG, SVG ou PDF locaux, sans compte ni expiration.",
  name: "Générateur de QR Wi-Fi gratuit",
  headline: "Connecter les invités en un scan.",
  summary: "Préparez une affiche lisible avec les paramètres exacts du réseau invité.",
  answer:
    "Créez gratuitement un code QR Wi-Fi contenant le nom du réseau, son mode de protection et son mot de passe. Aucun renseignement n’est transmis. Un téléphone compatible peut lire l’affiche pour rejoindre le réseau. Choisissez le réseau invité, vérifiez les données décodées, puis testez une connexion réelle avant d’afficher le code.",
  steps: [
    "Saisissez exactement le nom du réseau invité, espaces et majuscules compris. Choisissez WPA, WEP ou un réseau ouvert selon les paramètres réels du routeur, sans modifier ce choix pour masquer une erreur de connexion.",
    "Entrez le mot de passe et indiquez un réseau masqué uniquement s’il l’est réellement. Le contenu d’un QR reste lisible: affichez les identifiants seulement là où les visiteurs autorisés peuvent les recevoir.",
    "Conservez la marge claire, attendez la vérification de lecture et téléchargez l’affiche. Essayez la connexion sur un téléphone qui n’a pas déjà enregistré ce réseau, puis contrôlez qu’il a rejoint la bonne connexion.",
  ],
  sections: [
    {
      heading: "Considérer l’affiche comme un partage d’identifiants",
      paragraphs: [
        "Le QR Wi-Fi transmet commodément les renseignements qu’une personne saisirait autrement dans son téléphone. Ce n’est pas un coffre-fort: toute personne capable de photographier ou de scanner l’affiche peut lire le nom et le mot de passe. Placez-la en fonction du public autorisé. Utilisez les réglages de réseau invité du routeur lorsque les visiteurs doivent disposer d’une connexion distincte de celle du personnel ou du foyer.",
        "Une bonne affiche donne au réseau un nom reconnaissable, précise qu’il est destiné aux invités et reste compréhensible sans appareil photo. Décidez d’imprimer ou non le mot de passe à côté du symbole selon la même politique d’accès. Ne publiez pas le réseau privé simplement parce qu’il est déjà enregistré sur votre téléphone. Confirmez le réseau voulu avec la personne responsable du routeur.",
      ],
    },
    {
      heading: "Reproduire les paramètres avant de décorer",
      paragraphs: [
        "Copiez le SSID avec sa casse, ses espaces et sa ponctuation. Le mode de protection doit correspondre à celui du réseau. L’option de réseau masqué décrit la façon dont le réseau est annoncé; elle ne cache pas les identifiants à l’intérieur du QR. Un réseau ouvert n’a pas de mot de passe, tandis qu’un réseau protégé demande la bonne valeur dans le champ prévu.",
        "La vérification locale compare les données relues à celles que vous avez saisies. Elle ne contacte pas le routeur, ne mesure pas le signal et ne remplit pas la page d’accueil d’un lieu public. Essayez un appareil qui n’a jamais mémorisé le réseau: une ancienne connexion enregistrée pourrait masquer une erreur. Après le scan, vérifiez que le téléphone rejoint le réseau prévu et réalise l’action attendue.",
      ],
    },
    {
      heading: "Prévoir les changements et l’entretien",
      paragraphs: [
        "Modifier le mot de passe du routeur ne modifie pas les QR déjà imprimés. Gardez le brouillon de l’affiche avec les paramètres actuels et remplacez tous les exemplaires lors d’un changement. Pensez aux salles de réunion, aux dossiers d’accueil et aux feuillets d’événement. Un relevé interne daté peut aider l’équipe à identifier la bonne version sans afficher des renseignements administratifs inutiles sur le panneau public.",
        "Installez le code à un endroit où une personne peut s’approcher et le photographier sans reflet. Ne laissez pas le texte environnant empiéter sur sa marge tranquille. Testez le plus petit format prévu et répétez l’essai après plastification ou installation sur son support. La lecture numérique valide le dessin; l’affiche terminée reste l’objet que vos visiteurs utiliseront réellement.",
      ],
    },
  ],
  comparison: [
    { name: "QiFi", detail: "Création locale de QR avec paramètres Wi-Fi dédiés.", url: "https://qifi.org/" },
  ],
  faqs: [
    {
      q: "Un QR Wi-Fi cache-t-il le mot de passe?",
      a: "Non. Une application de lecture peut afficher les identifiants encodés. Utilisez les réglages du réseau invité pour séparer l’accès des visiteurs de vos appareils privés.",
    },
    {
      q: "Pourquoi mon téléphone lit-il le code sans se connecter?",
      a: "La lecture valide le contenu, pas le routeur. Vérifiez le SSID, le mot de passe, le mode de protection, le signal et les éventuelles exigences d’un portail d’accueil.",
    },
    {
      q: "Que se passe-t-il si je change le mot de passe?",
      a: "Le code imprimé contient toujours l’ancienne valeur. Générez une nouvelle affiche et remplacez les anciennes: un code statique ne se met pas à jour à distance.",
    },
    {
      q: "Le code remplit-il la page de connexion d’un lieu public?",
      a: "Il fournit les paramètres Wi-Fi. Un portail captif peut encore demander d’accepter des conditions ou de se connecter dans la page du lieu.",
    },
    {
      q: "Puis-je utiliser un réseau invité masqué?",
      a: "Oui, si l’option correspond au routeur. Testez les téléphones visés, car le QR ne rend pas identiques les comportements de connexion de tous les appareils.",
    },
    {
      q: "Quel export convient à une affiche de réseau?",
      a: "Le SVG s’intègre dans une composition redimensionnable. Le PDF fournit une étiquette aux dimensions définies. Gardez la marge et testez le support imprimé final.",
    },
  ],
  service: { label: "Faire réaliser une affiche Wi-Fi durable par 3D3D", path: "/nfc-tags" },
} satisfies ToolGuide;
