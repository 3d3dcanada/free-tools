import ShareButton from "../shared/ShareButton";
import { useState } from "react";
import { download, useLocalDraft } from "../shared/browser";
import { ACADEMY_PATH, lessons, lessonPath } from "./curriculum";
import { units, type Lesson, type ReadingSection } from "./types";
import { sources } from "./sources";
import { glossary, symptoms } from "./reference";
import { academySchema } from "./schema";
import { diagramAlt } from "./diagrams";
import { useLocale, useLocalLink } from "../shared/locale";
import { useAcademyT } from "./ui.fr";
import * as frenchReference from "./reference.fr";
import { academyCatalog } from "./catalog";
import { siteAbsolute } from "../seo/site-links";
import {
  AcademyFaqs,
  lessonFaq,
  SupportReading,
  AcademyRelated,
  ReferenceComparison,
  type SupportGuide,
} from "./seo";
import CorrectionForm, { type CorrectionTransport } from "./CorrectionForm";
import ParticipationPage from "./ParticipationPage";
import {
  PROGRESS_KEY,
  EMPTY_PROGRESS,
  emptyLesson,
  validProgress,
  score,
  complete,
  completedCount,
  canPrintCertificate,
  type LessonProgress,
} from "./progress";

import { academyInfo } from "./metadata";
export { academyInfo, academyRoutes } from "./metadata";
function SourceLinks({ ids }: { ids: string[] }) {
  return (
    <ul className="source-links">
      {ids.map((id) => (
        <li key={id}>
          <a href={sources[id].url}>{sources[id].title}</a>
        </li>
      ))}
    </ul>
  );
}
function Concept({ lesson }: { lesson: Lesson }) {
  const locale = useLocale();
  return (
    <figure className="concept">
      <img
        src={`/academy/diagrams/${lesson.slug}.${locale}.svg`}
        width={640}
        height={480}
        loading="lazy"
        alt={diagramAlt(lesson.id, locale)}
      />
      <figcaption>
        {locale === "fr"
          ? "Schéma original. Les proportions sont illustratives."
          : "Original teaching diagram. Proportions are illustrative."}
      </figcaption>
    </figure>
  );
}
function LessonPage({
  lesson,
  state,
  update,
  reading,
  submitCorrection,
}: {
  lesson: Lesson;
  state: LessonProgress;
  update: (v: LessonProgress) => void;
  reading: ReadingSection[];
  submitCorrection?: CorrectionTransport;
}) {
  const locale = useLocale(),
    link = useLocalLink(),
    t = useAcademyT();
  const courseUnits = locale === "fr" ? frenchReference.units : units;
  const [message, setMessage] = useState("");
  const answered = state.answers.every((a) => a !== null);
  const result = score(lesson, state);
  return (
    <article className="lesson-page">
      <div className="academy-heading">
        <p className="eyebrow">
          {t("Unit")} {lesson.unit} / {courseUnits[lesson.unit - 1].title} {t("/ Lesson")} {lesson.id}{" "}
          {t("of 40")}
        </p>
        <h1>{lesson.title}</h1>
        <div className="lesson-share"><ShareButton title={`${lesson.title} · 3D3D`} fr={locale === "fr"} /></div>
        <p className="lede">{lesson.summary}</p>
        <p className="outcome">
          <strong>{t("You will learn to:")}</strong> {lesson.learn}
        </p>
      </div>
      <Concept lesson={lesson} />
      {reading.map((section, i) => (
        <section className="reading" aria-labelledby={`reading-${i}`} key={section.title}>
          <h2 id={`reading-${i}`}>{section.title}</h2>
          {section.paragraphs.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
          <SourceLinks ids={section.sources} />
        </section>
      ))}
      <section className="reading" aria-labelledby="steps-title">
        <h2 id="steps-title">{t("Work through it")}</h2>
        <ol className="lesson-steps">
          {lesson.steps.map((s, i) => (
            <li key={i}>{s}</li>
          ))}
        </ol>
      </section>
      <section className="reading" aria-labelledby="mistakes-title">
        <h2 id="mistakes-title">{t("Easy mistakes to avoid")}</h2>
        <ul>
          {lesson.mistakes.map((s) => (
            <li key={s}>{s}</li>
          ))}
        </ul>
      </section>
      <section className="practice reading" aria-labelledby="practice-title">
        <p className="eyebrow">{t("Put it to work")}</p>
        <h2 id="practice-title">{t("Your practice print")}</h2>
        <p>{lesson.practice.task}</p>
        <p>
          <strong>{t("Keep a record:")}</strong> {lesson.practice.record}
        </p>
        <label className="choice">
          <input
            type="checkbox"
            checked={state.practice}
            onChange={(e) => update({ ...state, practice: e.target.checked })}
          />
          {t("I completed the practice and kept a record.")}
        </label>
        <p className="fine">
          {t("This is your own record. The course cannot inspect your print or confirm its safety.")}
        </p>
      </section>
      <section className="reading quiz" aria-labelledby="quiz-title">
        <h2 id="quiz-title">{t("Check what stuck")}</h2>
        <p>
          {t(
            "Answer all five. You can review the explanations and try again. A lesson is complete when all five are correct and you record your practice.",
          )}
        </p>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            if (!answered) {
              setMessage(t("Answer all five questions before checking."));
              return;
            }
            update({ ...state, checked: true });
            setMessage("");
          }}
        >
          {lesson.quiz.map((q, i) => (
            <fieldset key={i}>
              <legend>
                {i + 1}. {q.question}
              </legend>
              {q.options.map((option, j) => (
                <label className="choice" key={j}>
                  <input
                    type="radio"
                    name={`question-${i}`}
                    value={j}
                    checked={state.answers[i] === j}
                    onChange={() => {
                      const answers = [...state.answers];
                      answers[i] = j;
                      update({ ...state, answers, checked: false });
                      setMessage("");
                    }}
                  />
                  {option}
                </label>
              ))}
              {state.checked && (
                <p className={"answer " + (state.answers[i] === q.answer ? "correct" : "retry")}>
                  <strong>{state.answers[i] === q.answer ? t("Correct.") : t("Review this one.")}</strong>{" "}
                  {q.explanation}
                </p>
              )}
            </fieldset>
          ))}
          <button type="submit">{t("Check my answers")}</button>
          <p role="status" className="quiz-status">
            {message ||
              (state.checked
                ? `${result} ${locale === "fr" ? "bonnes réponses sur 5." : "of 5 correct."} ${complete(lesson, state) ? t("Lesson complete.") : result === 5 ? t("Record your practice to complete this lesson.") : t("Review the explanations and try again.")}`
                : t("Your answers stay on this device."))}
          </p>
        </form>
      </section>
      <section className="reading references" aria-labelledby="references-title">
        <h2 id="references-title">{t("Read the source material")}</h2>
        <SourceLinks ids={lesson.sources} />
        <p className="fine">
          {t(
            "Original teaching text. Manufacturer procedures and your exact material specifications take precedence over a general lesson.",
          )}
        </p>
      </section>
      <AcademyFaqs faqs={lessonFaq(lesson, locale)} />
      <ReferenceComparison ids={lesson.sources} />
      <AcademyRelated unit={lesson.unit} />
      <CorrectionForm lesson={lesson.slug} title={lesson.title} submit={submitCorrection} />
      <nav className="lesson-navigation" aria-label={t("Lesson navigation")}>
        {lesson.id > 1 && <a href={link(lessonPath(lessons[lesson.id - 2]))}>{t("← Previous lesson")}</a>}
        <a href={link(ACADEMY_PATH)}>{t("Course map")}</a>
        {lesson.id < 40 ? (
          <a href={link(lessonPath(lessons[lesson.id]))}>{t("Next lesson →")}</a>
        ) : (
          <a href={link(`${ACADEMY_PATH}/certificate`)}>{t("Completion record →")}</a>
        )}
      </nav>
    </article>
  );
}
export default function AcademyPage({
  path,
  lesson: loadedLesson,
  guide,
  reading = [],
  submitCorrection,
}: {
  path: string;
  lesson?: Lesson;
  guide?: SupportGuide;
  reading?: ReadingSection[];
  submitCorrection?: CorrectionTransport;
}) {
  const locale = useLocale(),
    link = useLocalLink(),
    t = useAcademyT();
  const courseUnits = locale === "fr" ? frenchReference.units : units;
  const terms = locale === "fr" ? frenchReference.glossary : glossary;
  const failures = locale === "fr" ? frenchReference.symptoms : symptoms;
  const {
    value: progress,
    setValue: setProgress,
    storage,
    clear,
  } = useLocalDraft(PROGRESS_KEY, EMPTY_PROGRESS, validProgress);
  const [notice, setNotice] = useState(""),
    [name, setName] = useState("");
  const total = completedCount(progress),
    current = loadedLesson ?? (locale === "en" ? lessons.find((l) => lessonPath(l) === path) : undefined);
  const next = lessons.find((l) => !complete(l, progress.lessons[l.slug]));
  const suffix = path.slice(ACADEMY_PATH.length);
  const restore = async (file: File | undefined) => {
    if (!file) return;
    try {
      if (file.size > 50_000) throw new Error(t("Choose a progress file smaller than 50 KB."));
      const v: unknown = JSON.parse(await file.text());
      if (!validProgress(v)) throw new Error(t("This file does not match this course version."));
      if (
        Object.keys(progress.lessons).length &&
        !window.confirm(t("Replace this device’s course progress with this file?"))
      )
        return;
      clear();
      setProgress(v);
      setNotice(t("Progress restored from your file."));
    } catch (e) {
      setNotice(e instanceof Error ? e.message : t("Could not restore progress."));
    }
  };
  return (
    <div className="academy">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            academySchema(path, academyInfo(path, locale), reading, {
              locale,
              lesson: current,
              faqs: current ? lessonFaq(current, locale) : guide?.faqs,
            }),
          ).replace(/</g, "\\u003c"),
        }}
      />
      <noscript>
        <p className="notice">
          {t(
            "You can read every lesson without JavaScript. Enable it to check quizzes, save progress and print your completion record.",
          )}
        </p>
      </noscript>
      <nav className="academy-nav" aria-label={t("Academy")}>
        <a href={link(ACADEMY_PATH)} aria-current={suffix === "" ? "page" : undefined}>
          {t("Course map")}
        </a>
        <a
          href={link(`${ACADEMY_PATH}/failed-print`)}
          aria-current={suffix === "/failed-print" ? "page" : undefined}
        >
          {t("My print failed")}
        </a>
        <a href={link(`${ACADEMY_PATH}/glossary`)} aria-current={suffix === "/glossary" ? "page" : undefined}>
          {t("Glossary")}
        </a>
        <a href={link(`${ACADEMY_PATH}/certificate`)}>{t("Completion record")}</a>
      </nav>
      <div className="progress-strip">
        <label htmlFor="course-progress">
          {total} {t("of 40 lessons complete")}
        </label>
        <progress id="course-progress" max={40} value={total} />
        <span className="fine">{t("Saved on this device when storage is available")}</span>
      </div>
      {current ? (
        <LessonPage
          key={current.slug}
          lesson={current}
          reading={reading}
          submitCorrection={submitCorrection}
          state={progress.lessons[current.slug] ?? emptyLesson()}
          update={(v) => setProgress({ ...progress, lessons: { ...progress.lessons, [current.slug]: v } })}
        />
      ) : suffix === "" ? (
        <>
          <div className="academy-heading course-hero">
            <p className="eyebrow">{t("3D Printing Academy / Free self-study course")}</p>
            <h1>
              {t("Learn to print.")} <br />
              {t("Learn what works.")}
            </h1>
            <p className="lede">{guide?.answer}</p>
            <p className="course-promise">
              {t("No account. No course fee. Your progress stays in your browser.")}
            </p>
            <a className="start-link" href={link(next ? lessonPath(next) : `${ACADEMY_PATH}/certificate`)}>
              {total === 0
                ? t("Start with lesson 1")
                : next
                  ? t("Continue learning")
                  : t("Print your completion record")}{" "}
              <span aria-hidden="true">↗</span>
            </a>
          </div>
          <div className="course-intro">
            <p>
              {t(
                "This course covers filament printing. You need access to a suitable printer for practice. Start with its manual and a safe workspace; the first lessons prepare you before you print.",
              )}
            </p>
            <p>
              {t(
                "We use PLA for learning and prototypes. For customer parts, 3D3D chooses PETG or another material appropriate to the job, then checks the actual part. A material name alone is not a quality guarantee.",
              )}
            </p>
            <p>
              {t(
                "Lessons are researched from the sources listed on each page, written with AI assistance and open to correction.",
              )}{" "}
              <a href={link(`${ACADEMY_PATH}/sources`)}>{t("Read the sources and course scope")}</a>.
            </p>
          </div>
          <nav className="unit-jump" aria-label={t("Jump to unit")}>
            {courseUnits.map((u, i) => (
              <a key={u.title} href={`#unit-${i + 1}`}>
                0{i + 1} {u.title}
              </a>
            ))}
          </nav>
          <div className="course-units">
            {courseUnits.map((u, i) => (
              <section className="course-unit" id={`unit-${i + 1}`} key={u.title}>
                <div>
                  <p className="eyebrow">
                    {t("Unit 0")}
                    {i + 1}
                  </p>
                  <h2>{u.title}</h2>
                  <p>{u.description}</p>
                </div>
                <ol start={i * 5 + 1}>
                  {lessons
                    .filter((l) => l.unit === i + 1)
                    .map((l) => (
                      <li key={l.slug}>
                        <a href={link(lessonPath(l))}>
                          <span>{academyCatalog[l.id - 1].title[locale]}</span>
                          <span className="lesson-state">
                            {complete(l, progress.lessons[l.slug]) ? t("Complete ✓") : t("Open →")}
                          </span>
                        </a>
                      </li>
                    ))}
                </ol>
              </section>
            ))}
          </div>
        </>
      ) : suffix === "/contributors" || suffix === "/join" ? (
        <ParticipationPage
          answer={guide?.answer}
          page={suffix === "/join" ? "join" : "contributors"}
          submitCorrection={submitCorrection}
        />
      ) : suffix === "/glossary" ? (
        <div className="reading">
          <div className="academy-heading">
            <p className="eyebrow">{t("Keep the language useful")}</p>
            <h1>{t("A small printing glossary")}</h1>
            <p className="lede">{guide?.answer}</p>
          </div>
          <dl className="glossary">
            {terms.map(([term, definition, id]) => (
              <div key={term}>
                <dt>{term}</dt>
                <dd>
                  {definition} <a href={sources[id].url}>{t("Reference")}</a>
                </dd>
              </div>
            ))}
          </dl>
        </div>
      ) : suffix === "/failed-print" ? (
        <div className="reading">
          <div className="academy-heading">
            <p className="eyebrow">{t("Start with what you can see")}</p>
            <h1>{t("My print failed.")}</h1>
            <p className="lede">{guide?.answer}</p>
          </div>
          {failures.map((s) => (
            <details className="symptom" key={s.name}>
              <summary>{s.name}</summary>
              <p>{s.advice}</p>
              <ul>
                {s.slugs.map((slug) => {
                  const l = lessons.find((l) => l.slug === slug)!;
                  return (
                    <li key={slug}>
                      <a href={link(lessonPath(l))}>{academyCatalog[l.id - 1].title[locale]}</a>
                    </li>
                  );
                })}
              </ul>
            </details>
          ))}
        </div>
      ) : suffix === "/certificate" ? (
        <div className="certificate-page">
          <div className="academy-heading no-print">
            <p className="eyebrow">{t("Your learning record")}</p>
            <h1>{t("A first chapter, completed.")}</h1>
            <p className="lede">{guide?.answer}</p>
          </div>
          {canPrintCertificate(progress) ? (
            <>
              <div className="certificate-controls no-print">
                <label>
                  {t("Your name for the record")}
                  <input
                    value={name}
                    maxLength={80}
                    autoComplete="off"
                    onChange={(e) => setName(e.target.value)}
                  />
                </label>
                <button disabled={!name.trim()} onClick={() => window.print()}>
                  {t("Print completion record")}
                </button>
                <p className="fine">
                  {t(
                    "Choose your browser’s print or Save as PDF option. Your name is used only on this page.",
                  )}
                </p>
              </div>
              <section className="certificate" aria-label={t("Self-study completion certificate")}>
                <p className="eyebrow">{t("3D3D / 3D Printing Academy")}</p>
                <h2>{t("Certificate of self-study completion")}</h2>
                <p className="recipient">{name.trim() || t("Your name")}</p>
                <p>{t("Completed the forty-lesson learning path")}</p>
                <p className="certificate-subject">
                  {t("From the first layer")}
                  <br />
                  {t("to a considered first product.")}
                </p>
                <p>{t("200 quiz answers checked · 40 practice tasks self-reported")}</p>
                <p>
                  {t("Printed")}{" "}
                  {new Date().toLocaleDateString(locale === "fr" ? "fr-CA" : "en-CA", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </p>
                <p className="fine">
                  {t(
                    "A personal learning record. No accreditation, identity verification, practical assessment or product qualification is implied.",
                  )}
                </p>
              </section>
            </>
          ) : (
            <p className="notice" role="status">
              {total} {t("of 40 lessons complete.")}{" "}
              <a href={link(next ? lessonPath(next) : ACADEMY_PATH)}>{t("Continue the course")}</a>{" "}
              {t("to unlock your record.")}
            </p>
          )}
        </div>
      ) : suffix === "/sources" ? (
        <div className="reading">
          <div className="academy-heading">
            <p className="eyebrow">{t("Where the teaching comes from")}</p>
            <h1>{t("Sources, scope and authorship.")}</h1>
            <p className="lede">{guide?.answer}</p>
          </div>
          <h2>{t("How to use this course")}</h2>
          <p>
            {t(
              "This is original AI-assisted teaching material, open to correction. It has not yet received independent instructor review or classroom trials. It is free self-study material for filament printing, with general principles rather than universal machine settings.",
            )}
          </p>
          <p>
            {t(
              "Public Prusa Academy outlines, Teaching Tech, CNC Kitchen and a Bates College introduction informed the sequence. We did not access paid course lessons or reproduce their text or pictures. Bambu and All3DP were considered during research; unverified details are not used as technical instructions.",
            )}
          </p>
          <p>
            {t(
              "Follow your machine manual, filament specifications and workplace requirements. The course does not qualify resin handling, food contact, medical devices, children’s products or safety-critical parts. Advanced material alternatives teach the workflow without claiming competence with an untried polymer.",
            )}
          </p>
          <h2>{t("The practice model")}</h2>
          <p>
            {t("The only named third-party benchmark is")}{" "}
            <a href={sources.benchy.url}>{t("the official free 3DBenchy")}</a>
            {t(". Its")} <a href={sources.benchylicense.url}>{t("current licence is CC0 1.0")}</a>
            {t(
              ", checked during research on 8 October 2026. Other practice shapes are your own simple primitives. No third-party model or machine instructions are bundled.",
            )}
          </p>
          <h2>{t("Primary reading")}</h2>
          <SourceLinks ids={Object.keys(sources)} />
        </div>
      ) : (
        <div className="academy-heading">
          <h1>{t("That lesson is not here.")}</h1>
          <a href={link(ACADEMY_PATH)}>{t("Return to the course map")}</a>
        </div>
      )}
      {!current && (
        <>
          <SupportReading guide={guide} />
          <AcademyRelated unit={suffix === "/join" || suffix === "/contributors" ? 8 : 1} />
        </>
      )}
      <details className="progress-tools no-print">
        <summary>{t("Manage this device’s progress")}</summary>
        <p className="fine">
          {t(
            "Progress belongs to this browser and course version. Clearing site data removes it. Save a file if you want a backup or to move to another device.",
          )}
        </p>
        <p role="status">
          {t(storage)} {notice}
        </p>
        <div className="exportbar">
          <button
            onClick={() =>
              download("3d3d-academy-progress.json", JSON.stringify(progress, null, 2), "application/json")
            }
          >
            {t("Save progress file")}
          </button>
          <button
            onClick={() => {
              if (window.confirm(t("Reset this browser’s academy progress? Saved files are unchanged."))) {
                clear();
                setNotice(t("Progress reset."));
              }
            }}
          >
            {t("Reset progress")}
          </button>
        </div>
        <label>
          {t("Restore a progress file")}
          <input
            type="file"
            accept=".json,application/json"
            onChange={(e) => {
              void restore(e.target.files?.[0]);
              e.target.value = "";
            }}
          />
        </label>
      </details>
      <p className="academy-footnote no-print">
        <a href={link(`${ACADEMY_PATH}/sources`)}>{t("Sources and course scope")}</a> ·{" "}
        <a href={link(`${ACADEMY_PATH}/contributors`)}>{t("Contributors")}</a> ·{" "}
        <a href={link(`${ACADEMY_PATH}/join`)}>{t("Join the project")}</a> ·{" "}
        <a href={siteAbsolute(link("/3d-printing"))}>{t("Get help with a printing project")}</a>
      </p>
    </div>
  );
}
