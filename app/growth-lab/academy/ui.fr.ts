import { useLocale } from "../shared/locale";
const french: Record<string, string> = {
  "Loading local draft…": "Chargement de la progression locale…",
  "Saved on this device": "Enregistré sur cet appareil",
  "Local draft could not be loaded. Downloads still work. Clear this tool’s saved draft to enable saving.":
    "La progression locale n’a pas pu être chargée. Le téléchargement reste disponible. Réinitialisez la progression enregistrée pour permettre une nouvelle sauvegarde.",
  "Draft has incomplete values. The last valid draft remains saved.":
    "Des valeurs sont incomplètes. La dernière progression valide reste enregistrée.",
  "Device storage is full or unavailable. Download a copy before closing.":
    "Le stockage est plein ou indisponible. Téléchargez une copie avant de fermer.",
  "Browser storage is unavailable. Downloads still work.":
    "Le stockage du navigateur est indisponible. Le téléchargement reste possible.",
  Unit: "Unité",
  "/ Lesson": "/ Leçon",
  "of 40": "sur 40",
  "Unit 0": "Unité 0",
  "You will learn to:": "Vous apprendrez à :",
  "Work through it": "Passez à la pratique",
  "Easy mistakes to avoid": "Erreurs courantes à éviter",
  "Put it to work": "Appliquez la méthode",
  "Your practice print": "Votre exercice d’impression",
  "Keep a record:": "Gardez une trace :",
  "I completed the practice and kept a record.": "J’ai réalisé l’exercice et conservé un relevé.",
  "This is your own record. The course cannot inspect your print or confirm its safety.":
    "Il s’agit de votre propre relevé. Le cours ne peut ni inspecter votre impression ni confirmer sa sécurité.",
  "Check what stuck": "Vérifiez vos acquis",
  "Answer all five. You can review the explanations and try again. A lesson is complete when all five are correct and you record your practice.":
    "Répondez aux cinq questions. Lisez les explications et réessayez au besoin. La leçon est terminée lorsque les cinq réponses sont justes et que l’exercice est consigné.",
  "Answer all five questions before checking.": "Répondez aux cinq questions avant de vérifier.",
  "Correct.": "Bonne réponse.",
  "Review this one.": "Revoyez cette réponse.",
  "Check my answers": "Vérifier mes réponses",
  "Lesson complete.": "Leçon terminée.",
  "Record your practice to complete this lesson.": "Consignez votre exercice pour terminer cette leçon.",
  "Review the explanations and try again.": "Lisez les explications puis réessayez.",
  "Your answers stay on this device.": "Vos réponses restent sur cet appareil.",
  "Read the source material": "Consultez les références",
  "Original teaching text. Manufacturer procedures and your exact material specifications take precedence over a general lesson.":
    "Texte pédagogique original. Les procédures du fabricant et les spécifications du matériau précis priment sur une leçon générale.",
  "Lesson navigation": "Navigation des leçons",
  "← Previous lesson": "← Leçon précédente",
  "Course map": "Plan du cours",
  "Next lesson →": "Leçon suivante →",
  "Completion record →": "Relevé d’apprentissage →",
  "Choose a progress file smaller than 50 KB.": "Choisissez un fichier de progression de moins de 50 Ko.",
  "This file does not match this course version.": "Ce fichier ne correspond pas à cette version du cours.",
  "Replace this device’s course progress with this file?":
    "Remplacer la progression de cet appareil par ce fichier ?",
  "Progress restored from your file.": "Progression restaurée depuis votre fichier.",
  "Could not restore progress.": "Impossible de restaurer la progression.",
  "You can read every lesson without JavaScript. Enable it to check quizzes, save progress and print your completion record.":
    "Toutes les leçons se lisent sans JavaScript. Activez-le pour vérifier les questionnaires, enregistrer la progression et imprimer le relevé d’apprentissage.",
  Academy: "Académie",
  "My print failed": "Mon impression a échoué",
  Glossary: "Glossaire",
  "Completion record": "Relevé d’apprentissage",
  "of 40 lessons complete": "leçons terminées sur 40",
  "of 40 lessons complete.": "leçons terminées sur 40.",
  "Saved on this device when storage is available":
    "Enregistré sur cet appareil si le stockage est disponible",
  "3D Printing Academy / Free self-study course": "Académie d’impression 3D / Autoformation gratuite",
  "Learn to print.": "Apprenez à imprimer.",
  "Learn what works.": "Comprenez le résultat.",
  "No account. No course fee. Your progress stays in your browser.":
    "Sans compte ni frais de cours. La progression reste dans votre navigateur.",
  "Start with lesson 1": "Commencer la leçon 1",
  "Continue learning": "Poursuivre le cours",
  "Print your completion record": "Imprimer votre relevé",
  "This course covers filament printing. You need access to a suitable printer for practice. Start with its manual and a safe workspace; the first lessons prepare you before you print.":
    "Le cours traite l’impression à filament. Les exercices demandent une imprimante adaptée. Commencez par sa notice et un poste sûr; les premières leçons préparent le travail avant l’impression.",
  "We use PLA for learning and prototypes. For customer parts, 3D3D chooses PETG or another material appropriate to the job, then checks the actual part. A material name alone is not a quality guarantee.":
    "Nous utilisons le PLA pour apprendre et prototyper. Pour les pièces clients, 3D3D choisit le PETG ou une matière adaptée puis contrôle la pièce réelle. Un nom de matériau seul ne garantit pas la qualité.",
  "Lessons are researched from the sources listed on each page, written with AI assistance and open to correction.":
    "Les leçons s’appuient sur les sources citées, sont rédigées avec l’aide de l’IA et restent ouvertes aux corrections.",
  "Read the sources and course scope": "Consultez les sources et la portée du cours",
  "Jump to unit": "Aller à une unité",
  "Complete ✓": "Terminée ✓",
  "Open →": "Ouvrir →",
  "Keep the language useful": "Des mots pour comprendre",
  "A small printing glossary": "Un glossaire de l’impression",
  Reference: "Référence",
  "Start with what you can see": "Partez de ce que vous observez",
  "My print failed.": "Mon impression a échoué.",
  "Your learning record": "Votre relevé d’apprentissage",
  "A first chapter, completed.": "Un premier chapitre terminé.",
  "Your name for the record": "Votre nom sur le relevé",
  "Print completion record": "Imprimer le relevé d’apprentissage",
  "Choose your browser’s print or Save as PDF option. Your name is used only on this page.":
    "Choisissez l’impression ou l’enregistrement PDF du navigateur. Votre nom sert uniquement sur cette page.",
  "Self-study completion certificate": "Attestation d’autoformation",
  "3D3D / 3D Printing Academy": "3D3D / Académie d’impression 3D",
  "Certificate of self-study completion": "Attestation d’autoformation terminée",
  "Your name": "Votre nom",
  "Completed the forty-lesson learning path": "A terminé le parcours de quarante leçons",
  "From the first layer": "De la première couche",
  "to a considered first product.": "à un premier produit réfléchi.",
  "200 quiz answers checked · 40 practice tasks self-reported":
    "200 réponses vérifiées · 40 exercices déclarés par la personne",
  Printed: "Imprimé le",
  "A personal learning record. No accreditation, identity verification, practical assessment or product qualification is implied.":
    "Relevé personnel d’apprentissage. Il n’implique aucune accréditation, vérification d’identité, évaluation pratique ni qualification de produit.",
  "Continue the course": "Poursuivez le cours",
  "to unlock your record.": "pour débloquer votre relevé.",
  "Where the teaching comes from": "Les références pédagogiques",
  "Sources, scope and authorship.": "Sources, portée et rédaction.",
  "How to use this course": "Comment utiliser le cours",
  "This is original AI-assisted teaching material, open to correction. It has not yet received independent instructor review or classroom trials. It is free self-study material for filament printing, with general principles rather than universal machine settings.":
    "Ce contenu pédagogique original est rédigé avec l’aide de l’IA et ouvert aux corrections. Il n’a pas encore été évalué par un formateur indépendant ni essayé en classe. Cette autoformation gratuite à l’impression à filament enseigne des principes, pas des réglages universels.",
  "Public Prusa Academy outlines, Teaching Tech, CNC Kitchen and a Bates College introduction informed the sequence. We did not access paid course lessons or reproduce their text or pictures. Bambu and All3DP were considered during research; unverified details are not used as technical instructions.":
    "Les plans publics de Prusa Academy, Teaching Tech, CNC Kitchen et une introduction de Bates College ont éclairé la progression. Aucun cours payant n’a été consulté et aucun texte ou image repris. Bambu et All3DP ont été considérés pendant la recherche; aucun détail non vérifié ne sert de consigne technique.",
  "Follow your machine manual, filament specifications and workplace requirements. The course does not qualify resin handling, food contact, medical devices, children’s products or safety-critical parts. Advanced material alternatives teach the workflow without claiming competence with an untried polymer.":
    "Suivez notice de machine, spécifications du filament et exigences du lieu de travail. Le cours ne qualifie ni résines, ni contact alimentaire, ni dispositifs médicaux, ni produits pour enfants, ni pièces critiques. Les exercices de remplacement enseignent la méthode sans prétendre maîtriser un polymère non essayé.",
  "The practice model": "Le modèle d’exercice",
  "The only named third-party benchmark is": "La seule référence de test tierce nommée est",
  "the official free 3DBenchy": "le 3DBenchy officiel gratuit",
  ". Its": ". Sa",
  "current licence is CC0 1.0": "licence actuelle est CC0 1.0",
  ", checked during research on 8 October 2026. Other practice shapes are your own simple primitives. No third-party model or machine instructions are bundled.":
    ", vérifiée le 8 octobre 2026. Les autres formes d’exercice sont vos propres primitives. Aucun modèle tiers ni fichier machine n’est fourni.",
  "Primary reading": "Références principales",
  "That lesson is not here.": "Cette leçon est introuvable.",
  "Return to the course map": "Revenir au plan du cours",
  "Manage this device’s progress": "Gérer la progression sur cet appareil",
  "Progress belongs to this browser and course version. Clearing site data removes it. Save a file if you want a backup or to move to another device.":
    "La progression appartient à ce navigateur et à cette version du cours. Effacer les données du site la supprime. Enregistrez un fichier pour la sauvegarder ou changer d’appareil.",
  "Save progress file": "Enregistrer la progression",
  "Reset this browser’s academy progress? Saved files are unchanged.":
    "Réinitialiser la progression de ce navigateur ? Les fichiers sauvegardés restent inchangés.",
  "Progress reset.": "Progression réinitialisée.",
  "Reset progress": "Réinitialiser la progression",
  "Restore a progress file": "Restaurer un fichier de progression",
  "Sources and course scope": "Sources et portée du cours",
  Contributors: "Contributions",
  "Join the project": "Participer au projet",
  "Get help with a printing project": "Obtenir de l’aide pour un projet d’impression",
};
export function academyText(text: string, locale: "en" | "fr") {
  return locale === "fr" ? (french[text] ?? text) : text;
}
export function useAcademyT() {
  const locale = useLocale();
  return (text: string) => academyText(text, locale);
}
