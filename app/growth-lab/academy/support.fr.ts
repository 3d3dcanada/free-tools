import type { SupportGuide } from "./seo";
export default {
  academy: {
    answer:
      "Apprenez l’impression 3D à filament avec quarante leçons gratuites, des exercices, des schémas originaux et des sources primaires. Préparez un poste sûr, puis fabriquez, inspectez et chiffrez vos formes simples. Aucun compte ni téléversement n’est requis. Réponses et progression restent sur votre appareil; le relevé atteste une autoformation, pas une qualification professionnelle.",
    sections: [
      {
        title: "Choisir un rythme compatible avec la pratique",
        paragraphs: [
          "Lisez la première unité avant d’utiliser une machine. Chaque leçon suivante relie une idée à une petite tâche et à un relevé que vous pouvez examiner. La lecture est possible sans imprimante, mais un questionnaire réussi ne remplace pas l’exercice. Utilisez une machine partagée avec l’autorisation et les consignes de son responsable. Si une matière ou une opération ne convient pas au poste, choisissez l’alternative prévue ou laissez la pratique non vérifiée.",
          "Conservez ensemble source modifiable, projet préparé et observations. Un petit spécimen inchangé permet une meilleure comparaison qu’un nouvel objet décoratif après chaque réglage. Le plan reste ouvert : vous pouvez revenir à un symptôme, une définition ou une source sans déverrouiller les pages précédentes. L’ordre proposé construit le contexte nécessaire aux choix suivants. Il n’impose ni échéance ni durée garantie pour acquérir une compétence.",
        ],
      },
    ],
    faqs: [
      {
        q: "Toute l’académie est-elle gratuite ?",
        a: "Oui. Les quarante leçons, schémas, questionnaires et le relevé personnel sont accessibles sans frais de cours ni compte. Il n’y a pas de période d’essai. Accès à une imprimante, filament et équipement restent distincts du contenu gratuit.",
      },
      {
        q: "Faut-il une imprimante pour commencer ?",
        a: "Vous pouvez d’abord lire chaque page. Les exercices demandent une machine à filament adaptée et un poste préparé selon ses consignes. Le cours ne peut pas inspecter le lieu à distance ni remplacer l’autorisation d’utiliser un équipement partagé.",
      },
      {
        q: "Peut-on apprendre sans JavaScript ?",
        a: "Oui. Texte, étapes, schémas, références et questions figurent dans le HTML. La vérification des réponses, la sauvegarde locale et l’impression du relevé débloqué utilisent JavaScript sur votre appareil.",
      },
      {
        q: "Changer de langue efface-t-il la progression ?",
        a: "Non. Les versions partagent identifiants de leçons et positions des bonnes réponses. Le navigateur conserve la progression. Sauvegardez un fichier avant d’effacer les données du site ou de changer de navigateur.",
      },
      {
        q: "Qui a évalué les leçons ?",
        a: "Elles ont été documentées à partir des sources citées et rédigées avec l’aide de l’IA. Une évaluation indépendante par un formateur et des essais en classe restent à effectuer. Chaque leçon permet de signaler un problème précis.",
      },
      {
        q: "Que démontre l’achèvement du cours ?",
        a: "Le relevé local montre que les réponses enregistrées correspondent aux corrigés et que vous avez déclaré les exercices terminés. Il ne vérifie ni identité, ni pièce physique, ni aptitude d’un produit à la vente.",
      },
    ],
  },
  glossary: {
    answer:
      "Ce glossaire gratuit explique les termes d’impression à filament employés dans l’académie. Chaque définition présente un concept et renvoie à une référence originale, sans imposer de réglage universel. Aucun téléversement ni compte n’est nécessaire. Revenez à la leçon correspondante pour relier le mot à un schéma, un exercice et ses limites pratiques.",
    sections: [
      {
        title: "Lire un terme dans son contexte",
        paragraphs: [
          "Un mot familier peut désigner différentes grandeurs selon l’interface. Le débit peut être un multiplicateur ou une limite volumétrique; le jeu peut représenter la différence totale ou l’espace de chaque côté. Lisez unités et documentation avant d’appliquer un nombre venant d’ailleurs. Le glossaire donne un sens de départ; la leçon explique la comparaison précise de son exemple. Cette distinction évite de transposer une bonne formule à une entrée qui mesure autre chose.",
          "Gardez la terminologie de machine et les références de matière précises dans vos notes. Une famille comme le PETG contient plusieurs nuances, et un profil suppose une buse réelle particulière. Lors d’une demande d’aide, précisez produit et version au lieu du seul terme général. Le français conserve des identifiants courants comme G-code et les abréviations de polymères, afin de retrouver les mêmes éléments dans les notices des fabricants.",
        ],
      },
    ],
    faqs: [
      {
        q: "FDM et FFF désignent-ils deux parcours ici ?",
        a: "Le cours emploie les deux appellations usuelles du dépôt de filament. Une différence de nom ne devient pas une configuration différente. Identifiez toujours la machine et le procédé réels pour choisir les consignes.",
      },
      {
        q: "Le pourcentage de remplissage indique-t-il la résistance ?",
        a: "Non. C’est un paramètre de préparation. Géométrie, parois, orientation, matière et procédé influencent aussi la pièce. Une exigence de charge demande une preuve correspondant à l’usage.",
      },
      {
        q: "Une abréviation de matière donne-t-elle une température sûre ?",
        a: "Non. Consultez les spécifications du filament et de l’équipement précis. Le nom de famille ne définit pas toutes les conditions de buse, plateau, séchage ou poste de travail.",
      },
      {
        q: "Le maillage est-il la source modifiable ?",
        a: "Pas nécessairement. Il représente les surfaces; la source CAO peut garder cotes et construction utiles pour une révision volontaire. Conservez les deux lorsque le modèle doit évoluer.",
      },
      {
        q: "Pourquoi citer des références primaires ?",
        a: "Elles permettent d’examiner contexte et limites d’origine. Une définition courte oriente; les détails de procédure restent ceux du fabricant pour son produit et sa révision.",
      },
      {
        q: "Comment signaler un terme ambigu ?",
        a: "Utilisez la page de participation ou le formulaire de la leçon concernée. Nommez le terme, expliquez l’ambiguïté et proposez une formulation étayée. N’incluez pas de fichiers clients privés.",
      },
    ],
  },
  "failed-print": {
    answer:
      "Choisissez un symptôme visible pour trouver une prochaine vérification limitée : première couche détachée, matière manquante ou couches décalées. Cette aide gratuite renvoie aux leçons détaillées sans diagnostiquer la machine par une étiquette. Rien n’est téléversé. Arrêtez d’abord toute situation dangereuse, consignez la configuration puis modifiez une seule condition justifiée à la fois.",
    sections: [
      {
        title: "Repartir du premier événement",
        paragraphs: [
          "L’amas final peut cacher l’indice utile. Notez quand la ligne s’est détachée, où un coin a commencé à monter ou la hauteur du premier décalage. Distinguez observation et cause supposée. Gardez projet préparé et profil : un trajet absent de l’aperçu n’explique pas le même problème qu’un trajet correctement commandé dont la matière n’a pas été déposée. La chronologie aide à choisir la bonne question plutôt qu’une correction au hasard.",
          "Ne laissez pas un travail échoué tourner pour prendre une meilleure photo. Utilisez l’arrêt normal et les consignes d’inspection. Certaines tâches demandent refroidissement et déconnexion; d’autres comportent une étape chauffée précise. N’intervenez jamais dans un mouvement actif et ne créez ni obstacle ni bouchage pour l’exercice. Si l’appareil est endommagé ou si le contrôle dépasse la procédure utilisateur, obtenez une aide qualifiée avant de poursuivre.",
        ],
      },
      {
        title: "Rendre le nouvel essai interprétable",
        paragraphs: [
          "Choisissez une correction liée aux faits et gardez le reste identique. Un petit spécimen connu limite le gaspillage et facilite la comparaison avec le résultat précédent. Notez condition modifiée, amélioration recherchée et nouveau défaut éventuel. Moins de fils avec une mauvaise reprise d’extrusion constitue un compromis à examiner, pas une réussite automatique. Le but est un procédé utile, pas la disparition d’un seul symptôme.",
          "Si la base prise en charge fonctionne, conservez cette référence et exercez le raisonnement sans fabriquer de panne. Si le défaut persiste, préparez modèle de machine, matière, profil, photos, chronologie et contrôles effectués pour une personne compétente. Un résultat non résolu reste une preuve utile. Une liste de tous les curseurs modifiés, sans état sauvegardé ni raison observée, rend au contraire la recherche plus difficile.",
        ],
      },
    ],
    faqs: [
      {
        q: "Cette page peut-elle diagnostiquer l’imprimante ?",
        a: "Non. Elle organise des symptômes et oriente vers une investigation précise. Plusieurs causes peuvent se ressembler; l’aide ne peut pas inspecter l’équipement ni vérifier une réparation à distance.",
      },
      {
        q: "Faut-il abaisser la buse dès qu’une pièce se détache ?",
        a: "Non. Vérifiez plateau, matière, préparation et procédure de première couche. Un coin relevé tardivement diffère d’une ligne jamais attachée. Un décalage non autorisé peut abîmer la surface.",
      },
      {
        q: "Les fils prouvent-ils une bobine humide ?",
        a: "Non. L’état de matière est une hypothèse parmi température et déplacements. Si un séchage est justifié, suivez ses consignes précises puis comparez avec un profil inchangé.",
      },
      {
        q: "Dois-je tendre toutes les courroies après un décalage ?",
        a: "Non. Notez direction et hauteur, recherchez les obstacles dans l’état sûr et suivez la procédure du mécanisme exact. Une tension reprise ailleurs peut créer une nouvelle panne.",
      },
      {
        q: "Que faire si le contrôle proposé n’aide pas ?",
        a: "Gardez le résultat, restaurez la base si nécessaire et rassemblez les preuves pour un diagnostic qualifié. Des échecs inexpliqués répétés ne justifient pas des paramètres toujours plus extrêmes.",
      },
      {
        q: "Faut-il provoquer une panne pour terminer l’exercice ?",
        a: "Non. Les leçons permettent une base saine et un chemin de diagnostic écrit. Ne salissez pas le plateau, ne mouillez pas le filament et ne bloquez pas le mouvement pour créer un exemple.",
      },
    ],
  },
  certificate: {
    answer:
      "Imprimez un relevé personnel gratuit lorsque les quarante questionnaires ont cinq bonnes réponses et les quarante exercices sont déclarés terminés. La progression vient de ce navigateur et rien n’est téléversé. Ce document décrit une autoformation : il ne constitue ni accréditation, ni vérification d’identité, ni évaluation pratique indépendante, ni approbation d’un produit imprimé.",
    sections: [
      {
        title: "Comprendre le déblocage du relevé",
        paragraphs: [
          "Chaque leçon contient cinq questions et une case d’exercice distincte. Le bouton de vérification enregistre si la tentative actuelle est correcte. Modifier une réponse annule cet état jusqu’à une nouvelle vérification. La leçon compte comme terminée lorsque les cinq réponses enregistrées correspondent au corrigé et que la pratique est déclarée. Le plan indique la prochaine leçon incomplète pour retrouver l’étape manquante sans deviner. La simple lecture d’une page ne prouve pas que ces deux actions ont été faites.",
          "La case de pratique est votre déclaration. Le site ne voit aucune imprimante, ne mesure aucun spécimen et ne reçoit aucune photo du travail. Conservez fichiers et observations pour disposer d’une preuve utile au-delà de la case. Réussir un questionnaire ne démontre pas qu’une machine ou une matière précise a été essayée. Décrivez dans vos notes l’alternative autorisée éventuellement choisie, avec la même clarté qu’un contrôle physique restant non résolu. Une déclaration honnête conserve la portée exacte de l’apprentissage accompli.",
        ],
      },
      {
        title: "Garder une copie portable de l’apprentissage",
        paragraphs: [
          "Enregistrez un fichier JSON de progression avant d’effacer les données du navigateur ou de changer d’appareil. La restauration vérifie version et structure avant de remplacer le relevé courant. Un fichier endommagé ou étranger est refusé. Si une progression existe déjà, son remplacement demande confirmation. Cette sauvegarde contient réponses et cases d’exercice, pas certificat d’identité ni preuve d’un examen indépendant. Gardez-la dans un emplacement que vous pouvez retrouver, avec une date permettant de choisir la bonne copie plus tard.",
          "Une fois le relevé débloqué, entrez le nom souhaité et utilisez l’impression ou l’enregistrement PDF du navigateur. Le nom sert uniquement dans cette page et n’entre pas dans la sauvegarde de progression. La date vient de l’appareil. Inspectez l’aperçu avant de partager le fichier produit. Les mentions concernant les exercices déclarés et les limites font partie du document, y compris lorsqu’il est présenté à une autre personne. Un changement de mise en page ne doit pas transformer ce relevé personnel en qualification qu’il ne fournit pas.",
        ],
      },
      {
        title: "Continuer après le document",
        paragraphs: [
          "Une prochaine étape utile consiste à répéter un petit projet original avec une inspection clairement documentée. Une autre matière, une forme plus grande ou une nouvelle machine peut demander une nouvelle référence et de nouveaux essais. Utilisez les sources et invitations à corriger pour continuer à apprendre. La dernière leçon aboutit à une décision humaine de revue; le relevé ne publie pas une annonce, n’accepte pas un paiement et n’autorise aucune production. La méthode reste plus importante que l’apparence du document final.",
        ],
      },
    ],
    faqs: [
      {
        q: "Pourquoi le bouton d’impression est-il bloqué ?",
        a: "Une leçon demande encore cinq réponses correctes vérifiées ou sa case de pratique. Le plan mène à la prochaine leçon incomplète. Lire le texte seul ne modifie pas son état d’achèvement.",
      },
      {
        q: "Puis-je imprimer le relevé en français ?",
        a: "Oui. Les deux langues utilisent la même progression locale. Changez de langue, entrez le nom d’affichage puis imprimez la page française. Il n’est pas nécessaire de refaire les questionnaires.",
      },
      {
        q: "Est-ce une qualification accréditée ?",
        a: "Non. C’est un relevé personnel d’autoformation. L’académie n’a pas vérifié l’identité, évalué indépendamment la pratique ni certifié un produit, un poste ou un procédé de fabrication.",
      },
      {
        q: "Mon nom sera-t-il enregistré ou téléversé ?",
        a: "Il reste dans l’état de la page courante, sans sauvegarde de progression ni enregistrement serveur. Il apparaît dans l’impression ou le PDF que vous créez volontairement.",
      },
      {
        q: "Que faire si le stockage est indisponible ?",
        a: "La page signale le problème. Téléchargez une sauvegarde avant de fermer : un stockage indisponible ou effacé ne peut pas préserver fiablement le travail entre deux visites.",
      },
      {
        q: "Le cours terminé approuve-t-il une pièce à vendre ?",
        a: "Non. Droits, exigences du produit, inspection, coûts, règles de plateforme et livraison demandent leurs propres preuves. Le cours enseigne une méthode de revue sans la remplacer par son relevé.",
      },
    ],
  },
  sources: {
    answer:
      "Consultez les références primaires de ce cours gratuit d’impression à filament et les limites de son enseignement. Chaque leçon relie des explications originales à des notices, articles techniques et exercices. Rien n’est téléversé pour lire. L’aide de l’IA est déclarée; les corrections sont bienvenues et les consignes du fabricant précis priment sur les exemples généraux.",
    sections: [
      {
        title: "Relier un énoncé à sa portée",
        paragraphs: [
          "Une référence permet de vérifier un énoncé; elle ne signifie pas que son auteur approuve ce cours. Lisez la section et identifiez machine, matière, version et expérience décrites. Une mesure sur un spécimen n’est pas une valeur admissible pour une autre pièce. Les entrées arithmétiques fictives illustrent un calcul et restent distinctes d’une performance mesurée ou d’un tarif commercial. Cette distinction permet de comprendre ce que la source établit et ce que l’exercice ajoute pour enseigner la méthode.",
          "Les sections placent les références près des explications pour éviter de chercher chaque affirmation dans une longue bibliographie. La liste générale préserve aussi le contexte de recherche. Les pages de produits et de plateformes évoluent; une vérification datée devient une preuve historique à actualiser avant une décision dépendant des règles présentes. Si un lien change, signalez leçon et référence d’origine au lieu de substituer une page sans rapport dont le sens ne correspondrait plus à l’énoncé.",
        ],
      },
      {
        title: "Corriger un énoncé précis",
        paragraphs: [
          "Une correction utile désigne la phrase ou la relation du schéma, explique le problème et apporte une source primaire. Distinguez amélioration linguistique et modification d’un fait technique. Pour un calcul, incluez unités et étapes intermédiaires; pour une observation physique, configuration et nombre d’échantillons. La personne responsable peut ainsi examiner la proposition sans transformer un essai réussi en règle universelle. Le formulaire demande un texte court et ciblé, pas le téléversement d’un manuel complet.",
        ],
      },
    ],
    faqs: [
      {
        q: "Des leçons payantes ont-elles été copiées ?",
        a: "Non. Des plans publics ont éclairé l’ordre; textes et schémas SVG ont été créés pour ce cours. Les contenus payants n’ont pas été consultés et leurs textes ou images n’ont pas été reproduits.",
      },
      {
        q: "Un fabricant cité approuve-t-il l’académie ?",
        a: "Non. La citation identifie une référence. Elle n’implique ni commandite, ni collaboration, ni approbation, ni responsabilité pour ce contenu pédagogique indépendant.",
      },
      {
        q: "Quelles instructions priment ?",
        a: "Les consignes actuelles de la machine, du filament et du lieu de travail précis. Un enseignement général ne peut pas annuler une limite de produit ni démontrer l’adéquation de votre installation.",
      },
      {
        q: "Les nombres d’exemple sont-ils des résultats mesurés ?",
        a: "Seulement lorsqu’ils sont explicitement présentés comme observations. Les entrées pédagogiques inventées sont identifiées, notamment coûts et variation de jeu, pour ne pas les confondre avec une précision ou un tarif réel.",
      },
      {
        q: "Un formateur indépendant a-t-il accepté le cours ?",
        a: "Pas encore. Revue indépendante et essais en classe restent ouverts. Le contenu documenté est public et invite des corrections précises; ce statut ne représente pas une acceptation extérieure accomplie.",
      },
      {
        q: "Que signaler pour une référence cassée ?",
        a: "Indiquez leçon, titre de source, problème et éventuel remplacement officiel vérifié. Un signalement court et précis aide davantage que l’envoi d’un manuel entier.",
      },
    ],
  },
  contributors: {
    answer:
      "L’académie remercie les contributions pédagogiques retenues seulement avec l’accord de la personne. Les corrections anonymes sont bienvenues et les coordonnées ne deviennent jamais publiques. Lire et améliorer le cours est gratuit; aucun fichier n’est à téléverser. Un remerciement décrit un apport précis, pas l’approbation de toutes les leçons ni une qualification professionnelle.",
    sections: [
      {
        title: "Relier le consentement à la contribution",
        paragraphs: [
          "Décrivez l’apport assez précisément pour le retrouver : leçon, problème et changement retenu. Mentionner une conversion d’unités corrigée renseigne davantage qu’affirmer une amélioration générale. La description reste factuelle et limitée même si la personne possède une grande expérience. Si de nouvelles preuves font encore évoluer la leçon, le remerciement historique peut décrire l’apport initial sans attribuer à cette personne la responsabilité permanente de toutes les formulations suivantes ni une approbation implicite des ajouts.",
          "Examen technique et publication d’un nom sont deux décisions distinctes. Une correction utile peut être adoptée sans nommer son auteur. Inversement, choisir un remerciement ne garantit pas l’adoption du changement. La personne responsable doit comprendre l’amélioration et le nom public autorisé avant d’ajouter une entrée. Le consentement ne se déduit ni d’une signature de courriel ni du simple fait d’avoir envoyé une proposition. La portée du remerciement reste attachée au travail effectivement retenu.",
          "Une demande de modification ou de retrait doit désigner l’entrée existante et le changement souhaité. Les coordonnées servent à clarifier, pas à publier. Aucun répertoire fictif n’est créé pour donner l’impression d’un projet déjà établi. Jusqu’à l’existence de contributions acceptées avec permission confirmée, une liste vide décrit fidèlement l’état public. Les auteurs des sources demeurent identifiables dans les références, sans être transformés en collaborateurs du projet par une simple citation.",
        ],
      },
    ],
    faqs: [
      {
        q: "Puis-je contribuer sans être nommé ?",
        a: "Oui. Laissez le remerciement public décoché. Une suggestion anonyme ou identifiée seulement en privé peut être examinée sur son contenu; un nom public n’est pas une condition de participation.",
      },
      {
        q: "Cocher la case publie-t-il mon nom immédiatement ?",
        a: "Non. Une personne responsable vérifie contribution et permission. Le formulaire n’ajoute pas automatiquement d’entrée, et l’aperçu local n’envoie rien dans un répertoire public.",
      },
      {
        q: "Mon courriel apparaîtra-t-il avec le remerciement ?",
        a: "Non. L’adresse facultative de réponse reste distincte du nom public. L’entrée décrit la contribution retenue sans exposer les coordonnées fournies dans le formulaire.",
      },
      {
        q: "Puis-je choisir un nom public différent de mon nom légal ?",
        a: "Oui. Indiquez le nom souhaité pour une contribution acceptée. N’usurpez pas l’identité d’autrui et ne fournissez pas ses coordonnées comme si elles étaient les vôtres.",
      },
      {
        q: "Un remerciement signifie-t-il que j’approuve tout le cours ?",
        a: "Non. Il identifie un apport précis. Vérifier un schéma ou une conversion ne représente pas un audit des quarante leçons, une certification professionnelle ou un soutien à un produit.",
      },
      {
        q: "Où sont cités les auteurs des références ?",
        a: "Les leçons concernées et la page des sources renvoient aux documents originaux. Citer une notice ou un article ne fait pas de son auteur une personne participante à ce projet indépendant.",
      },
    ],
  },
  join: {
    answer:
      "Améliorez ce cours gratuit en vérifiant une source, en clarifiant une étape, en examinant un schéma ou en décrivant un essai documenté. Commencez par une leçon et une modification précise. Aucun compte ni téléversement de fichier n’est nécessaire. Choisissez vos coordonnées facultatives et si une contribution retenue peut recevoir un remerciement public.",
    sections: [
      {
        title: "Commencer par une modification vérifiable",
        paragraphs: [
          "Une proposition ciblée s’examine plus facilement qu’un cours de remplacement sans références. Indiquez leçon, correction et raison. Pour une offre plus large, décrivez le périmètre que vous pouvez réellement examiner et ses limites. Un essai distingue équipement, matière, variable modifiée et résultat observé. Gardez hors du signalement données privées de clients et conceptions confidentielles. Une observation précise permet de discuter ce qui a été appris sans imposer sa conclusion à toutes les imprimantes.",
          "Pour l’accessibilité, décrivez la tâche difficile et le contrôle, la légende ou le schéma concerné. En français, expliquez l’ambiguïté technique au lieu de remplacer un mot seulement parce qu’une autre traduction littérale existe. Une clarification peut être nécessaire avant toute modification. La participation améliore les preuves et l’enseignement; elle ne constitue pas un canal de publication automatique ni une promesse d’adopter chaque suggestion. Les sources et les limites comptent autant que la nouvelle formulation proposée.",
        ],
      },
    ],
    faqs: [
      {
        q: "Dois-je vérifier les quarante leçons ?",
        a: "Non. Une correction étayée, une légende plus claire ou une observation documentée constitue un bon début. Définissez la portée limitée pour permettre une vérification indépendante.",
      },
      {
        q: "Puis-je aider sans imprimante ?",
        a: "Oui. Sources, formulations, navigation et accessibilité peuvent être examinées sans essai physique. Ne présentez pas une impression non réalisée comme testée; précisez la nature de l’apport.",
      },
      {
        q: "Faut-il envoyer un manuel complet ou un fichier client ?",
        a: "Non. Un lien primaire pertinent et une courte explication suffisent. Écartez informations privées, modèles confidentiels et longs passages copiés inutiles à l’examen.",
      },
      {
        q: "Le nom et le courriel sont-ils obligatoires ?",
        a: "Non. La correction peut être anonyme. Le courriel facultatif permet une réponse; un nom public n’est nécessaire que si vous choisissez un remerciement pour une contribution retenue.",
      },
      {
        q: "La participation promet-elle un paiement ou un emploi ?",
        a: "Non. L’invitation ne promet ni emploi, ni paiement, ni publication, ni délai de réponse. Toute entente distincte demanderait son propre accord explicite.",
      },
      {
        q: "Que fait le formulaire local ?",
        a: "Dans cet aperçu, il valide le texte et renvoie un reçu local sans stockage ni transmission extérieure. L’intégration au site branchera la même interface au traitement existant après ajout des vérifications serveur nécessaires.",
      },
    ],
  },
} satisfies Record<string, SupportGuide>;
