import type { SupportGuide } from "./seo";
export default {
  academy: {
    answer:
      "Learn filament 3D printing through forty free lessons with practical exercises, original diagrams and primary references. Start with a safe setup, then prepare, inspect and cost your own simple parts. No account or upload is required. Quizzes and progress stay on your device; the completion record describes self-study, not professional certification.",
    sections: [
      {
        title: "Choose a pace you can actually practise",
        paragraphs: [
          "Read the first unit before running a machine. Each later lesson connects one idea to a small task and a record you can inspect afterward. You can read without owning a printer, but a checked quiz alone does not complete the practice. Use suitable shared equipment only with its operator's permission and instructions. If a material or operation is unsuitable for your setup, use the stated alternative or leave the practice unverified.",
          "Keep the editable model, prepared project and observations together. An unchanged small specimen makes a better comparison than a different decorative object after every adjustment. The course map is open, so you can revisit a specific symptom, definition or source without unlocking earlier pages. The suggested order builds the context needed for later choices. It does not impose a deadline or promise a fixed time to competence.",
        ],
      },
    ],
    faqs: [
      {
        q: "Is the whole academy free?",
        a: "Yes. All forty lessons, diagrams, quizzes and the personal completion record are available without a course fee or account. There is no trial expiry. Printer access, filament and any equipment you choose to use are separate from the free reading material.",
      },
      {
        q: "Do I need a printer before I start?",
        a: "You can read every page first. Practice requires access to an appropriate filament printer and its documented safe setup. The course cannot inspect your workspace remotely or replace the operator's permission on shared equipment.",
      },
      {
        q: "Can I learn without JavaScript?",
        a: "Yes, the full teaching text, steps, diagrams, references and questions are in the page HTML. Checking answers, storing progress and printing the unlocked completion record use JavaScript on your device.",
      },
      {
        q: "Does changing language reset my progress?",
        a: "No. English and French share the same lesson identifiers and answer positions. Switching language keeps the current browser's progress. Save a progress file before clearing site data or moving to a different browser.",
      },
      {
        q: "Who has reviewed the lessons?",
        a: "The lessons were researched from the listed sources and written with AI assistance. Independent instructor review and classroom trials have not yet been completed. Every lesson provides a correction form so a specific problem can be examined.",
      },
      {
        q: "What does finishing the course demonstrate?",
        a: "The local record shows that the saved answers match the quiz keys and that you marked the practices complete. It does not verify identity, inspect a physical part or qualify a product for sale.",
      },
    ],
  },
  glossary: {
    answer:
      "Use this free glossary to understand the filament printing terms used throughout the academy. Each definition explains a concept and links to an original reference, without prescribing universal machine settings. Nothing is uploaded and no account is needed. Return to the relevant lesson to connect a term with a diagram, an exercise and its limits.",
    sections: [
      {
        title: "Read a term in its working context",
        paragraphs: [
          "A familiar word can describe different quantities in different interfaces. Flow may mean a multiplier or a volumetric limit; clearance can mean a total dimensional difference or a gap on each side. Read the field's units and the software documentation before applying a number from another source. This glossary provides a starting meaning, while the linked lesson explains the specific comparison used in its example.",
          "Keep machine terminology and material trade names precise in your notes. A family such as PETG contains grades with different specifications, and a nozzle setting assumes a particular physical nozzle. When asking for help, include the exact product and version rather than relying on the broad term alone. In French, the course keeps common identifiers such as G-code and material abbreviations so you can locate the same controls in a manufacturer's manual.",
        ],
      },
    ],
    faqs: [
      {
        q: "Are FDM and FFF separate lessons here?",
        a: "The course uses both common names for filament deposition. It does not treat a naming difference as a different machine setup. Always identify the actual printer and process when choosing instructions.",
      },
      {
        q: "Is infill percentage a strength rating?",
        a: "No. It describes a preparation setting, while geometry, walls, orientation, material and the process also affect the part. A load requirement needs evidence appropriate to that application.",
      },
      {
        q: "Does a material abbreviation specify a safe temperature?",
        a: "No. Read the exact filament and equipment specifications. A family name does not supply all nozzle, plate, drying or workspace requirements, and a generic glossary cannot inspect compatibility.",
      },
      {
        q: "Is a mesh the editable design source?",
        a: "Not necessarily. A mesh describes surfaces; the original CAD source may retain dimensions and construction history that make deliberate revision easier. Keep both when preparing a design you expect to change.",
      },
      {
        q: "Why do definitions link to primary references?",
        a: "The references let you examine the original context and limitations. A short definition helps orientation, while a manufacturer procedure controls the details for its particular product and revision.",
      },
      {
        q: "How can I report an unclear term?",
        a: "Use the course contribution page or the correction form on the lesson where the term appears. Name the term, explain the ambiguity and suggest a source-backed replacement. Do not include private customer files.",
      },
    ],
  },
  "failed-print": {
    answer:
      "Choose a visible printing symptom to find a bounded next check, from a loose first layer to missing material or shifted layers. This free helper links to detailed lessons instead of diagnosing your machine from a label. Nothing is uploaded. Stop unsafe operation first, then record the setup and change one justified condition at a time.",
    sections: [
      {
        title: "Start with the earliest event",
        paragraphs: [
          "The final tangle may hide the useful clue. Write when the first line detached, where a corner began lifting or the height of an abrupt shift. Distinguish what you saw from what you think caused it. Save the prepared project and profile, because a setting or missing path in that file can explain a different problem from a correctly commanded path that was not deposited.",
          "Do not keep a failing print running to obtain a better photograph. Use the normal stop procedure and the maker's requirements for inspection. Some tasks require cooling and disconnection; others have a specific heated step. Never reach into active motion, deliberately obstruct an axis or create a clog for a teaching exercise. If equipment is damaged or the required check exceeds the operator procedure, obtain qualified help.",
        ],
      },
      {
        title: "Make the next trial interpretable",
        paragraphs: [
          "Choose one correction that follows from the evidence and keep the remaining inputs fixed. A small known specimen limits wasted time and makes the previous result easier to compare. Record the changed condition and both the desired improvement and any new defect. Less stringing with poor extrusion restarts is a tradeoff to examine, not an automatic success.",
          "If a supported baseline already prints well, record that reference and practise the diagnostic reasoning without manufacturing a fault. If the issue persists, prepare the machine model, material, profile, photographs, timing and checks performed for an experienced operator. An unresolved result is useful evidence. Avoid a list of every slider changed without a saved state or an observed reason.",
        ],
      },
    ],
    faqs: [
      {
        q: "Can this page diagnose my printer?",
        a: "No. It organizes observed symptoms and points to a specific investigation. Different causes can produce similar appearances, and the helper cannot inspect the machine or verify a repair remotely.",
      },
      {
        q: "Should I lower the nozzle whenever a print detaches?",
        a: "No. Check plate, material, preparation and the exact first-layer procedure. A later lifted corner differs from a line that never attached, and unsupported offset changes can damage the surface.",
      },
      {
        q: "Do strings prove that the spool is wet?",
        a: "No. Material condition is one hypothesis alongside temperature and travel behaviour. Use the exact drying instructions if a drying trial is justified, then compare with the unchanged baseline.",
      },
      {
        q: "Should I tighten every belt after a shift?",
        a: "No. Record direction and height, inspect safely for obstructions and follow the procedure for the exact motion system. An unrelated tension target can create a new problem.",
      },
      {
        q: "What if the suggested check does not help?",
        a: "Keep the result, restore the baseline where appropriate and collect the evidence for qualified diagnosis. Do not treat repeated unexplained failures as a reason for increasingly extreme settings.",
      },
      {
        q: "Do I need to cause a failure to finish the practice?",
        a: "No. The lessons allow a sound baseline and a written diagnostic path. Never contaminate a plate, wet a spool, block motion or damage equipment to create an example.",
      },
    ],
  },
  certificate: {
    answer:
      "Print a free personal completion record after all forty quizzes have five correct answers and all forty practice tasks are marked complete. The record uses progress saved in this browser and uploads nothing. It is a self-study record, not accreditation, identity verification, an independent practical assessment or approval of any printed product.",
    sections: [
      {
        title: "Understand exactly what unlocks the record",
        paragraphs: [
          "Every lesson has five questions and a separate practice checkbox. Checking the answers records whether that saved attempt is correct. Changing an answer clears its checked state until you check again. A lesson counts as complete only when its five saved answers match and you have marked the practice complete. The course map shows the next unfinished lesson so you can return to the relevant evidence instead of guessing which step is missing.",
          "The practice mark is your declaration. The site does not see a printer, measure a specimen or receive a photograph of your work. Keep your own job files and observations if you want a useful record beyond the checkbox. Completing a quiz does not demonstrate that a particular machine or material was physically tried. An allowed alternative should be described in your own notes with the same honesty as an unresolved practical check.",
        ],
      },
      {
        title: "Keep a portable copy of your learning",
        paragraphs: [
          "Use the progress controls to save a JSON file before clearing browser data or changing devices. Restore checks the course version and the structure before replacing the current record. A damaged or unrelated file is rejected. If this browser already contains progress, replacement asks for confirmation. The backup includes lesson answers and practice marks, not an identity certificate or proof from an independent examiner.",
          "Once unlocked, enter the name you want displayed and use the browser's print or Save as PDF function. The name is only used on this page and is not added to the progress store. The printed date comes from your device. Keep the resulting file where you can find it and inspect the preview before sharing. The record's wording about self-reporting and its limits belongs with the document, including when it is shown to someone else.",
        ],
      },
      {
        title: "Carry the method beyond the certificate",
        paragraphs: [
          "A useful next step is to repeat a small original project with a clear inspection record. A different material, larger geometry or changed printer may need a new baseline and new tests. Use the source links and correction invitations as part of continued learning. The final product lesson ends with a human review decision; the completion record does not publish a listing, accept a payment or authorize production.",
        ],
      },
    ],
    faqs: [
      {
        q: "Why is the print button locked?",
        a: "At least one lesson still needs five checked correct answers or its practice mark. Follow the course map to the next incomplete lesson. Reading a page alone does not change its completion state.",
      },
      {
        q: "Can I print the record in French?",
        a: "Yes. English and French use the same local progress. Switch language, enter your chosen display name and print the French page. Changing language does not require answering the same questions again.",
      },
      {
        q: "Is this an accredited qualification?",
        a: "No. It is a personal self-study record. The academy has not verified identity, independently assessed practical skill or certified a product, workplace or manufacturing process.",
      },
      {
        q: "Will my name be stored or uploaded?",
        a: "The certificate name is held only in the current page state. It is not part of the progress backup or a server record. It will appear in the print or PDF you deliberately create.",
      },
      {
        q: "What happens if browser storage is unavailable?",
        a: "The page reports the storage problem. Keep a downloaded progress file before closing, since an unavailable or cleared browser store cannot preserve your work reliably across visits.",
      },
      {
        q: "Can a completed course approve a part for sale?",
        a: "No. Rights, product requirements, inspection, costs, marketplace rules and delivery decisions need their own evidence. The course teaches a review method; its completion record does not replace that review.",
      },
    ],
  },
  sources: {
    answer:
      "Read the primary references behind this free filament printing course and the limits of its teaching. Each lesson connects original explanations to relevant manuals, technical articles and practice evidence. Nothing is uploaded to read the material. AI assistance is disclosed, corrections are welcome, and manufacturer instructions for the exact setup take precedence over general examples.",
    sections: [
      {
        title: "Trace a statement to its scope",
        paragraphs: [
          "A source link explains where a claim can be checked; it does not mean the source author endorses this course. Read the linked section and identify the machine, material, version and experiment it describes. A measured result from one test specimen is not a general rating for a different part. When the lesson gives invented arithmetic inputs, those numbers illustrate the calculation and remain distinct from measured printer performance or commercial prices.",
          "The reading sections keep references beside the relevant explanation so that you do not have to search a long bibliography for every claim. The larger list below also preserves research context. Product and platform pages can change; dated checks are historical evidence and should be refreshed before a decision that depends on current terms or specifications. If a link moves, report the lesson and the original reference rather than silently replacing its meaning with an unrelated page.",
        ],
      },
      {
        title: "Correct the smallest unsupported statement",
        paragraphs: [
          "A useful correction names the exact sentence or diagram relationship, explains the problem and proposes evidence from a primary source. Distinguish a translation improvement from a changed technical claim. For a calculation, include units and intermediate steps. For a physical observation, describe the setup and sample count. A maintainer can then assess the proposed change without treating a single successful print as proof of a universal rule.",
        ],
      },
    ],
    faqs: [
      {
        q: "Were paid course lessons copied?",
        a: "No. Public outlines informed the sequence; the teaching text and SVG diagrams were created for this course. Paid lessons were not accessed and their text or images were not reproduced.",
      },
      {
        q: "Does a cited manufacturer endorse the academy?",
        a: "No. A citation identifies reference material. It does not imply sponsorship, collaboration, approval or responsibility for the academy's independent teaching text.",
      },
      {
        q: "Which instructions take precedence?",
        a: "Use the current instructions for the exact machine, filament and workplace. General teaching cannot override a product limit or establish that your installation is suitable for an operation.",
      },
      {
        q: "Are the numerical examples measured results?",
        a: "Only when explicitly identified as observations. The course labels invented teaching inputs, including costs and fit variation, so arithmetic examples cannot be mistaken for printer accuracy or business rates.",
      },
      {
        q: "Has an instructor independently accepted the course?",
        a: "Not yet. Independent instructor review and classroom trials remain open. The source-based draft is public and invites specific corrections; this status should not be read as completed external acceptance.",
      },
      {
        q: "What should I send about a broken reference?",
        a: "Identify the lesson and source title, explain what no longer works and provide an official replacement if you can verify it. A short precise report is more useful than uploading an entire manual.",
      },
    ],
  },
  contributors: {
    answer:
      "The academy credits accepted teaching contributions only when the contributor chooses public acknowledgement. Anonymous corrections are welcome, and contact details never become public credits. Reading and improving the course are free; no files need to be uploaded. A credit describes a particular contribution, not approval of every lesson or a professional qualification.",
    sections: [
      {
        title: "Keep consent attached to the contribution",
        paragraphs: [
          "Describe the contribution with enough detail to be checked later: the lesson, the issue and the accepted change. For example, identifying a corrected unit conversion is more informative than saying someone improved everything. This description should remain factual and limited even when the contributor has substantial experience. If later evidence changes the lesson again, the historical acknowledgement can still describe the original contribution without implying continuing responsibility for new wording.",
          "Technical review and public naming are separate decisions. A useful correction can be adopted while its author remains unnamed. Conversely, selecting the credit option does not guarantee acceptance of a proposed change. The maintainer needs to understand both what improved and which public name was authorized before adding an entry. This page does not infer consent from an email signature or from the fact that somebody submitted a report.",
          "A request to change or remove a credit should identify the existing entry and the desired correction. Contact information remains a means to clarify the request, not a field for public display. We do not invent a roster to make a new project appear established. Until accepted contributions with confirmed permission exist, the empty acknowledgement list is the accurate public state.",
        ],
      },
    ],
    faqs: [
      {
        q: "Can I contribute without being named?",
        a: "Yes. Leave the public-credit option unchecked. Anonymous or privately identified suggestions can still be reviewed on their technical merits; a public name is not a condition of participation.",
      },
      {
        q: "Does checking the credit box publish my name immediately?",
        a: "No. A maintainer first reviews the contribution and the permission. The form does not automatically add entries to this page, and the local preview sends nothing to a public contributor directory.",
      },
      {
        q: "Will my email appear beside a credit?",
        a: "No. The optional reply address is separate from the public name. A contributor entry describes the accepted contribution without exposing the form's contact details.",
      },
      {
        q: "Can I use a public name instead of a legal name?",
        a: "Yes. Enter the name you want associated with an accepted contribution. Do not impersonate another person or provide someone else's contact information as your own.",
      },
      {
        q: "Does a credit mean I approved the entire course?",
        a: "No. It identifies a particular contribution. Reviewing one diagram or conversion does not imply an audit of all forty lessons, professional certification or endorsement of a product.",
      },
      {
        q: "Where are authors of the technical references credited?",
        a: "The relevant lesson and sources page link to the original reference. Citing a manual or article does not make its author a participating contributor to this independent project.",
      },
    ],
  },
  join: {
    answer:
      "Help improve this free printing course by checking a source, clarifying a step, reviewing a diagram or sharing a carefully described observation. Begin with one lesson and one specific change. No account or file upload is needed. Choose whether to provide reply details and whether an accepted contribution may receive public credit.",
    sections: [
      {
        title: "Start with a reviewable change",
        paragraphs: [
          "A narrow report is easier to assess than a replacement course with no source trail. Identify the lesson, proposed correction and reason. If you offer to review a broader topic, describe the scope you can actually examine and any limitations. A practical result should state the equipment, material, changed variable and observed outcome. Keep private customer information and confidential designs out of the report.",
          "For accessibility, describe the task that becomes difficult and the relevant control, label or diagram. For French wording, explain the technical ambiguity rather than replacing a term solely because another literal translation exists. A maintainer may ask for clarification before changing the lesson. The contribution process is a way to improve teaching evidence, not an automatic publication channel or a promise that every suggestion will be adopted.",
        ],
      },
    ],
    faqs: [
      {
        q: "Do I need to review all forty lessons?",
        a: "No. One well-supported correction, clearer label or documented observation is a useful starting contribution. Name the limited scope so it can be checked independently.",
      },
      {
        q: "Can I help without owning a printer?",
        a: "Yes. Source checks, wording, navigation and accessibility reviews can be useful without a physical trial. Do not describe an unperformed print as tested; keep the kind of contribution explicit.",
      },
      {
        q: "Should I send a complete manual or customer file?",
        a: "No. Provide a relevant primary-source link and a short explanation. Do not include private customer data, confidential models or long copied passages that the reviewer does not need.",
      },
      {
        q: "Are a name and email required?",
        a: "No. The correction can be anonymous. An optional email enables a reply, while a public name is needed only if you choose public credit for an accepted contribution.",
      },
      {
        q: "Does helping promise payment or a job?",
        a: "No. This participation invitation does not promise employment, payment, publication or a response deadline. Any separate arrangement would need its own clear agreement.",
      },
      {
        q: "What does the local form do?",
        a: "In this preview it validates a suggestion and returns a local receipt without storing or forwarding it. The site integration connects the same form to the existing enquiry workflow after its server checks are implemented.",
      },
    ],
  },
} satisfies Record<string, SupportGuide>;
