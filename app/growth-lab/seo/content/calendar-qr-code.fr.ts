import type { ToolGuide } from "../guide";
export default {
  slug: "calendar-qr-code",
  locale: "fr",
  title: "Code QR de calendrier gratuit | 3D3D",
  description:
    "Encodez un événement iCalendar avec titre, horaires locaux et lieu. Vérification et exports SVG, PNG ou PDF gratuits, sans hébergement des données.",
  name: "Générateur de QR d’événement gratuit",
  headline: "Une date à garder dans le calendrier.",
  summary: "Encodez un événement local et contrôlez son horaire après l’importation.",
  answer:
    "Créez gratuitement un QR de calendrier contenant un événement iCalendar avec titre, début, fin et lieu. Rien n’est transmis ni hébergé. Les horaires suivent l’heure locale de l’événement, sans fuseau intégré. Scannez le résultat et vérifiez l’entrée importée dans l’application de calendrier avant de distribuer l’invitation à votre public.",
  steps: [
    "Nommez l’événement et saisissez son lieu. Utilisez l’heure locale du lieu et précisez le fuseau dans la description, surtout si des personnes participent à distance. Gardez également ces renseignements lisibles sur l’invitation.",
    "Réglez le début et la fin. Relisez le contenu VEVENT et corrigez toute erreur de date ou de lecture avant le téléchargement. Pour un événement qui passe minuit, vérifiez aussi la date de fin.",
    "Importez un scan dans un calendrier d’essai, puis vérifiez le titre, la date, l’horaire affiché et le lieu. Ne supposez pas qu’un décodage réussi garantit à lui seul le comportement de l’application destinataire.",
  ],
  sections: [
    {
      heading: "Garder une invitation compréhensible sans scanner",
      paragraphs: [
        "Un QR d’événement évite de retaper les détails d’un atelier ou d’une rencontre. Il complète l’invitation lisible plutôt qu’il ne remplace le nom, la date, l’heure et le lieu. Une personne devant une affiche doit pouvoir décider si l’événement l’intéresse avant de sortir son téléphone. Ajoutez un contact ordinaire ou un lien d’information pour les questions et les changements de dernière minute.",
        "Choisissez un titre qui restera compréhensible plusieurs semaines plus tard dans un calendrier rempli. Un simple mot comme Réunion est moins utile que l’activité et son organisateur. Placez le lieu dans son champ et utilisez la description pour une courte consigne de préparation ou un contact. Relisez la fiche comme la recevra le participant: le reste de l’affiche ne sera pas automatiquement importé avec le code.",
      ],
    },
    {
      heading: "Comprendre la limite des horaires locaux",
      paragraphs: [
        "L’éditeur écrit des horaires flottants: ils indiquent une heure sur l’horloge, sans identifiant de fuseau intégré. Cette limite doit rester visible, notamment lorsqu’une rencontre réunit des personnes à distance. Précisez le fuseau dans l’invitation et la description, puis testez l’importation. Pour convertir automatiquement entre fuseaux ou gérer une transition d’heure saisonnière, utilisez un service de calendrier produisant une invitation correctement associée à un fuseau.",
        "Choisissez des dates réelles et une fin postérieure au début. L’éditeur refuse les dates impossibles au lieu de laisser un analyseur les déplacer silencieusement au mois suivant. Cela empêche une catégorie d’erreurs, sans confirmer que le jour choisi est celui voulu par l’organisateur. Comparez le début et la fin exportés avec le programme original et le texte définitif qui apparaîtra sur l’invitation imprimée.",
      ],
    },
    {
      heading: "Prévoir les modifications et les applications différentes",
      paragraphs: [
        "Le QR statique contient une seule fiche d’événement. Il ne constitue pas un abonnement à un calendrier et ne peut envoyer une annulation, changer le lieu ou ajouter un rappel après la lecture. Si le programme évolue, annoncez la modification par votre moyen habituel et remplacez les invitations concernées. Identifiez vos anciens et nouveaux brouillons pour éviter qu’une affiche périmée retourne en circulation.",
        "Les applications de lecture et de calendrier n’offrent pas toutes le même parcours. Certaines affichent les données, tandis que d’autres proposent d’ajouter l’événement. Testez le chemin complet sur les appareils attendus: lecture, aperçu, enregistrement et ouverture de l’entrée. Vérifiez le titre, l’heure locale, la durée et le lieu. La lecture correcte du symbole ne démontre aucun de ces comportements propres aux applications.",
      ],
    },
  ],
  comparison: [
    {
      name: "QRCode Monkey",
      detail: "Codes d’événement parmi les contenus statiques proposés.",
      url: "https://www.qrcode-monkey.com/",
    },
  ],
  faqs: [
    {
      q: "Le QR envoie-t-il une invitation ou un rappel?",
      a: "Non. Il contient une fiche d’événement. L’importation et les rappels sont gérés par l’application de calendrier du destinataire.",
    },
    {
      q: "L’outil convertit-il automatiquement les fuseaux horaires?",
      a: "Non. Il utilise des horaires locaux flottants sans identifiant de fuseau. Pour un public réparti entre plusieurs fuseaux, privilégiez une invitation de calendrier appropriée et vérifiez l’affichage.",
    },
    {
      q: "Le code se met-il à jour si le lieu change?",
      a: "Le contenu imprimé ne change pas. Diffusez une invitation corrigée et expliquez la modification. Il ne s’agit pas d’un calendrier auquel les participants sont abonnés.",
    },
    {
      q: "Puis-je créer un événement récurrent?",
      a: "Ce parcours crée un seul événement avec début et fin. Les règles de récurrence et les abonnements nécessitent une application de calendrier adaptée.",
    },
    {
      q: "Pourquoi une fin avant le début est-elle refusée?",
      a: "L’éditeur exige une durée positive et des dates valides. Si l’événement continue après minuit, corrigez la date de fin au lieu d’indiquer une heure antérieure le même jour.",
    },
    {
      q: "Chaque téléphone proposera-t-il d’ajouter l’événement?",
      a: "Non. Le contenu iCalendar exporté est réel, mais les intégrations varient. Testez les applications visées et conservez les détails essentiels lisibles à côté du QR.",
    },
  ],
  service: { label: "Faire réaliser une affiche d’événement par 3D3D", path: "/quote" },
} satisfies ToolGuide;
