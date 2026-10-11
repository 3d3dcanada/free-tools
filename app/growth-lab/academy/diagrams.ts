import type { Locale } from "../seo/guide";

export const diagramDescriptions: [string, string][] = [
  [
    "A solid model becomes sliced paths, then a physical layered block. The arrows pass through slicing; they do not skip straight to the printer.",
    "Un modèle plein devient des trajectoires tranchées, puis un bloc imprimé par couches. Les flèches passent par le tranchage avant l’impression.",
  ],
  [
    "One example part is checked against three columns: usable space, material compatibility and workspace. No printer is ranked.",
    "Une pièce exemple passe trois vérifications : espace utile, compatibilité du matériau et espace de travail. Aucune imprimante n’est classée.",
  ],
  [
    "A printer sits inside a marked operating boundary. A separate path represents emissions control, while a clear approach leads to the stop control.",
    "L’imprimante se trouve dans une zone de fonctionnement délimitée. Un trajet distinct représente la maîtrise des émissions; l’accès à l’arrêt reste dégagé.",
  ],
  [
    "Three file sheets distinguish geometry, a project with settings and machine paths. A separate permission record applies to the intended use.",
    "Trois fiches distinguent géométrie, projet avec réglages et trajectoires machine. Une fiche d’autorisation distincte concerne l’usage prévu.",
  ],
  [
    "A print log separates estimate and actual columns with unfilled measurement cells. An arrow leads to a second trial with one recorded change.",
    "Un journal sépare estimations et mesures réelles; les cases de mesure restent vides. Une flèche mène à un essai comportant une seule modification notée.",
  ],
  [
    "Physical printer, nozzle, plate and material labels connect to corresponding slicer fields, emphasizing a match rather than a guessed preset.",
    "Les étiquettes physiques de l’imprimante, de la buse, du plateau et du matériau rejoignent les champs correspondants du trancheur.",
  ],
  [
    "A floating block is contrasted with a seated block and its footprint. Dimension arrows identify the intended 20 by 20 by 10 millimetre teaching shape.",
    "Un bloc flottant est comparé au bloc posé et à son empreinte. Les cotes indiquent la forme pédagogique de 20 × 20 × 10 mm.",
  ],
  [
    "A stepped side view shows layer height. A separate cutaway distinguishes the outer walls, sparse interior and solid top.",
    "Une vue latérale en escalier montre la hauteur de couche. Une coupe distingue parois extérieures, remplissage clairsemé et dessus plein.",
  ],
  [
    "Three successive layer views show an opening developing. A small isolated start is circled as a question to resolve before exporting paths.",
    "Trois couches successives montrent une ouverture en formation. Un départ isolé est entouré : il faut l’expliquer avant d’exporter les trajectoires.",
  ],
  [
    "Starting and observation lead to cooling and inspection. A separate stop branch leaves the observation step when a failure is seen.",
    "Le départ et l’observation mènent au refroidissement puis au contrôle. Une branche d’arrêt quitte l’étape d’observation si un échec apparaît.",
  ],
  [
    "A PLA sample carries a prototype tag. A second sample has a separate final-material check, without implying that the first sample proves service performance.",
    "Un échantillon PLA porte une étiquette de prototype. Le matériau final fait l’objet d’un contrôle distinct; le prototype ne prouve pas les performances en service.",
  ],
  [
    "A PETG and plate compatibility record precedes a cooled release and a labelled specimen. A separation layer is shown as conditional.",
    "La compatibilité PETG–plateau précède le retrait après refroidissement et l’identification de l’échantillon. La couche de séparation reste conditionnelle.",
  ],
  [
    "Flexible filament follows a constrained feed guide. Two pad cross-sections below show different wall constructions without a hardness or speed rating.",
    "Le filament flexible suit un guide de passage. Deux coupes de patins montrent des parois différentes, sans valeur de dureté ni de vitesse imposée.",
  ],
  [
    "An enclosure has two distinct labelled paths: temperature stability around the part and managed emissions leaving the process. Neither check replaces the other.",
    "L’enceinte présente deux voies distinctes : stabilité thermique autour de la pièce et maîtrise des émissions. Aucune vérification ne remplace l’autre.",
  ],
  [
    "PETG-CF and PA-CF spools point to separate requirements. A storage box is distinguished from an active dryer, with no universal drying temperature.",
    "Les bobines PETG-CF et PA-CF renvoient à des exigences distinctes. Une boîte de stockage se distingue d’un séchoir actif, sans température universelle.",
  ],
  [
    "A plate identity tag leads to the documented routine. Loose first lines and an over-bonded part show opposite outcomes to investigate.",
    "L’identification du plateau mène à sa procédure. Des premières lignes détachées et une pièce trop collée montrent deux résultats opposés à examiner.",
  ],
  [
    "An ordered ladder moves from setup through the baseline to one adjustment and comparison. An unsuccessful baseline returns to setup.",
    "Une séquence passe de la préparation à la référence, puis à un réglage et à la comparaison. Une référence défaillante ramène à la préparation.",
  ],
  [
    "Three top-surface sketches show gaps, joined lines and excess overlap. They are labelled as observations, not definitive diagnoses.",
    "Trois vues de dessus montrent des espaces, des lignes jointives et un chevauchement excessif. Ce sont des observations, pas des diagnostics définitifs.",
  ],
  [
    "Two trial points lie inside an unnumbered supported temperature interval and lead to separately labelled samples. The interval has no universal endpoints.",
    "Deux points d’essai se trouvent dans une plage thermique compatible sans valeurs imposées et correspondent à deux échantillons identifiés.",
  ],
  [
    "Two pillars are connected by a dotted travel path. A fine ooze strand and the next extrusion start are identified separately.",
    "Deux piliers sont reliés par un déplacement en pointillés. Un fil d’écoulement et la reprise d’extrusion sont repérés séparément.",
  ],
  [
    "The same L-shaped outline has horizontal layers in one build direction and vertical layers in another, with load arrows but no strength rating.",
    "Le même profil en L présente des couches horizontales puis verticales selon l’orientation. Des flèches de charge apparaissent sans valeur de résistance.",
  ],
  [
    "A ledge has accessible temporary support and a removal arrow. Beside it, support trapped inside a closed shape is marked as a design problem.",
    "Un surplomb possède un support accessible et une flèche de retrait. À côté, un support prisonnier d’une forme fermée signale un problème de conception.",
  ],
  [
    "A beam spans two supporting posts, while a separate ledge extends from one post. The bridge anchors and unsupported overhang edge are identified.",
    "Une poutre relie deux appuis; un autre rebord dépasse d’un seul appui. Les ancrages du pont et le bord sans soutien sont repérés.",
  ],
  [
    "An enlarged gap between a peg and opening illustrates total clearance. Three labelled sleeves show the experimental 10.2, 10.4 and 10.6 millimetre openings.",
    "Un jeu agrandi entre un tenon et une ouverture illustre le jeu total. Trois douilles portent les largeurs expérimentales 10,2, 10,4 et 10,6 mm.",
  ],
  [
    "Two separated halves have a locating peg and socket. Assembly arrows meet at the planned joint; locating does not imply a tested retaining force.",
    "Deux moitiés séparées possèdent un tenon et un logement de positionnement. Les flèches d’assemblage rejoignent le joint prévu, sans force de retenue certifiée.",
  ],
  [
    "Three first-layer cross-sections show rounded loose lines, joined lines and dragged ridges over a plate. Captions call them clues for the exact machine procedure.",
    "Trois coupes de première couche montrent des lignes arrondies détachées, des lignes jointives et des bourrelets entraînés. Ce sont des indices à vérifier selon la machine.",
  ],
  [
    "Strands between two pillars and separate restart marks lead to two diagnostic branches: material condition and supported settings.",
    "Des fils entre deux piliers et des marques de reprise conduisent à deux pistes : état du matériau et réglages compatibles.",
  ],
  [
    "A flat early layer is followed by a later curled corner. A timeline distinguishes initial attachment from subsequent lifting.",
    "Une première couche plane est suivie d’un coin relevé plus tard. La chronologie distingue l’adhérence initiale du soulèvement ultérieur.",
  ],
  [
    "The spool, feed and nozzle route has three inspection points. A wall with missing segments represents the symptom, with inspection performed only in the documented safe state.",
    "Le parcours bobine–entraînement–buse présente trois points de contrôle. Une paroi discontinue illustre le symptôme; l’examen exige l’état sûr prévu par la procédure.",
  ],
  [
    "A stack steps sideways at one height. A separate top-view axis sketch identifies the direction of the shift without prescribing a belt tension.",
    "Un empilement se décale brusquement à une hauteur. Une vue de dessus indique le sens du décalage, sans prescription de tension de courroie.",
  ],
  [
    "The teaching T-piece has support divided into removable sections. A tool direction points away from the holding area, and the ledge contact is marked for inspection.",
    "Le T pédagogique comporte des sections de support amovibles. La direction de l’outil s’éloigne de la zone de maintien; le contact du rebord doit être inspecté.",
  ],
  [
    "One block face is marked for cosmetic finishing and another is protected for fit. Before and after measurement fields remain blank.",
    "Une face est destinée à la finition esthétique; une autre est protégée pour conserver l’ajustement. Les mesures avant et après restent à remplir.",
  ],
  [
    "A sectioned printed body contains a through-bolt and an accessible nut pocket. Arrows show the load path without a torque or capacity claim.",
    "Une coupe du corps imprimé montre un boulon traversant et un logement d’écrou accessible. Les flèches indiquent le trajet de charge sans couple ni capacité annoncés.",
  ],
  [
    "Caliper jaws surround a block. A nearby record separates nominal dimensions from blank actual readings and an unresolved decision.",
    "Un pied à coulisse entoure un bloc. La fiche sépare les cotes nominales, les mesures réelles à remplir et la décision encore ouverte.",
  ],
  [
    "A dated maintenance record links a before specimen and an after specimen. The drawing specifies no generic service interval or lubrication location.",
    "Un journal d’entretien daté relie un échantillon avant et un échantillon après. Aucun intervalle universel ni point de lubrification n’est imposé.",
  ],
  [
    "A rights folder contains separate model-permission and marketplace-rule sheets. Both have open review fields rather than an approval seal.",
    "Un dossier de droits contient deux fiches distinctes : autorisation du modèle et règles de la plateforme. Les champs de vérification restent ouverts.",
  ],
  [
    "Five fictional cost inputs add to CAD 8.85. Shipping and fees remain marked unknown in a separate row rather than appearing as zero.",
    "Cinq coûts fictifs totalisent 8,85 CAD. Livraison et frais restent indiqués comme inconnus sur une ligne distincte, jamais comme zéro.",
  ],
  [
    "Three numbered specimens connect to blank inspection rows. A separate area keeps rejected parts visible in the batch record.",
    "Trois échantillons numérotés rejoignent des lignes de contrôle vides. Une zone distincte garde les pièces rejetées visibles dans le dossier du lot.",
  ],
  [
    "A camera frames a schematic part beside a ruler as a photography plan. A separate packed box has blank weight and dimension fields.",
    "Un appareil cadre le schéma d’une pièce et d’une règle pour préparer la photo. Un colis distinct possède des champs de masse et dimensions à remplir.",
  ],
  [
    "A review folder leads to three human decisions: review, revise or stop. There is no automatic publication path or product-certification symbol.",
    "Un dossier mène à trois décisions humaines : examiner, réviser ou arrêter. Aucun chemin de publication automatique ni symbole de certification n’apparaît.",
  ],
];
export const diagramAlt = (id: number, locale: Locale) =>
  diagramDescriptions[id - 1][locale === "fr" ? 1 : 0];
