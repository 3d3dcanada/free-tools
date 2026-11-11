import ShareButton from "../shared/ShareButton";
import { Fragment, useEffect, useState } from "react";
import { download, useLocalDraft } from "../shared/browser";
import { ACADEMY_PATH, lessons, lessonPath } from "./curriculum";
import { units, type Lesson, type ReadingSection } from "./types";
import { sources } from "./sources";
import { glossary, symptoms } from "./reference";
import { academySchema } from "./schema";
import { diagramAlt } from "./diagrams";
import { composeReading, keyTerms, KEY_NUMBER, type Part } from "./compose";
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
  type Progress,
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
        {/* The three parts the diagram draws, named as it names them (lesson data). */}
        <ol className="diagram-keys">
          {lesson.diagram.labels.map((label) => (
            <li key={label}>{label}</li>
          ))}
        </ol>
        {locale === "fr"
          ? "Schéma original. Les proportions sont illustratives."
          : "Original teaching diagram. Proportions are illustrative."}
      </figcaption>
    </figure>
  );
}
/** A step, practice line or term with the key number it states set as a number. The text is unchanged. */
function WithNumber({ text }: { text: string }) {
  const m = text.match(KEY_NUMBER);
  if (!m || m.index === undefined) return <>{text}</>;
  return (
    <>
      {text.slice(0, m.index)}
      <strong className="num">{m[0]}</strong>
      {text.slice(m.index + m[0].length)}
    </>
  );
}
/** One composed part of a reading section (compose.ts): running text, a number plate or a pull line. */
function ReadingPart({ part }: { part: Part }) {
  if (part.kind === "p") return <p>{part.text}</p>;
  if (part.kind === "line")
    return (
      <p className="pull-line" data-vb="line">
        {part.text}
      </p>
    );
  return (
    <figure className="key-number" data-vb="number">
      <span className="key-value" aria-hidden="true">
        {part.value}
      </span>
      <figcaption>{part.text}</figcaption>
    </figure>
  );
}
type LessonState = "done" | "started" | "open";
const lessonState = (l: Lesson, s: LessonProgress | undefined): LessonState =>
  complete(l, s) ? "done" : s && (s.checked || s.practice || s.answers.some((a) => a !== null)) ? "started" : "open";
/** Where the last lesson opened is remembered, on this device only (the hub's "you are here"). */
const LAST_KEY = "3d3d-academy-last-v1";
/**
 * a lesson diagram on its own, for the hub and the aux pages that showed no picture.
 * Same file and alt text the lesson page uses; lazy, so a phone fetches only what it scrolls to.
 */
function LessonPic({ lesson, className, width = 640, height = 480 }: { lesson: Lesson; className?: string; width?: number; height?: number }) {
  const locale = useLocale();
  return (
    <img
      className={className}
      src={`/academy/diagrams/${lesson.slug}.${locale}.svg`}
      width={width}
      height={height}
      loading="lazy"
      alt={diagramAlt(lesson.id, locale)}
    />
  );
}
const bySlug = (slug: string) => lessons.find((l) => l.slug === slug)!;
/** For each glossary entry (same order in both languages), the first lesson whose own text uses it (2026-11-11). */
const termLesson = glossary.map((entry) =>
  lessons.find((l) => keyTerms([l.title, l.learn, l.summary, ...l.steps, ...l.mistakes].join(" "), [entry]).length),
);
/** The three failure lessons people come to /failed-print for. */
const FAILURE_PICS = ["first-layer-not-sticking", "corners-lifting", "layers-shift-sideways"];
/** One existing lesson picture near the top of each aux page, chosen for what the page is about. */
const AUX_PIC: Record<string, string> = {
  "/glossary": "layers-walls-and-infill",
  "/sources": "models-files-and-permission",
  "/certificate": "review-a-first-product",
  "/join": "keep-a-print-log",
  "/contributors": "inspect-scale-and-placement",
};
function AuxPic({ suffix }: { suffix: string }) {
  const locale = useLocale();
  const lesson = bySlug(AUX_PIC[suffix]);
  return (
    <figure className="concept aux-pic no-print">
      <LessonPic lesson={lesson} />
      <figcaption>
        {locale === "fr" ? "Schéma du cours : " : "From the course: "}
        {academyCatalog[lesson.id - 1].title[locale]}
      </figcaption>
    </figure>
  );
}
/**
 * A lesson is a sequence of composed steps (2026-11-11). On a phone it was one diagram and then thirteen
 * screens of text, with the way on at the very foot. Now: where you are in the unit, the diagram with its
 * own parts named, the lesson's steps as a rail, each reading section numbered and broken by its own key
 * numbers and sentences set large (compose.ts), the key terms it uses, the steps and mistakes as cards,
 * the practice, the five questions as cards, then the next lesson one tap away. Sources, common questions,
 * the reference table and the correction form fold shut under it; all of it stays in the server HTML.
 * Desktop: the diagram and the rail sit beside the reading and stay in view.
 */
function LessonPage({
  lesson,
  state,
  progress,
  update,
  reading,
  submitCorrection,
}: {
  lesson: Lesson;
  state: LessonProgress;
  progress: Progress;
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
  useEffect(() => {
    try {
      localStorage.setItem(LAST_KEY, lesson.slug);
    } catch {
      /* storage off: the hub falls back to the first lesson not complete */
    }
  }, [lesson.slug]);
  const composed = composeReading(reading, { breaks: [1] });
  const terms = keyTerms(
    [lesson.title, lesson.learn, ...reading.flatMap((s) => s.paragraphs), ...lesson.steps, ...lesson.mistakes].join(" "),
    (locale === "fr" ? frenchReference.glossary : glossary) as readonly (readonly string[])[],
  );
  const unitLessons = lessons.filter((l) => l.unit === lesson.unit);
  const unitDone = unitLessons.filter((l) => complete(l, progress.lessons[l.slug])).length;
  const next = lessons[lesson.id] as Lesson | undefined;
  const title = (l: Lesson) => academyCatalog[l.id - 1].title[locale];
  const two = (n: number) => String(n).padStart(2, "0");
  const done = complete(lesson, state);
  return (
    <article className="lesson-page">
      <div className="academy-heading lesson-head">
        <p className="eyebrow">
          {t("Unit")} {lesson.unit} / {courseUnits[lesson.unit - 1].title} {t("/ Lesson")} {lesson.id}{" "}
          {t("of 40")}
        </p>
        <ol className="unit-track" aria-label={t("Lessons in this unit")}>
          {unitLessons.map((l) => {
            const s = lessonState(l, progress.lessons[l.slug]);
            return (
              <li key={l.slug} className={`is-${s}`} aria-current={l.id === lesson.id ? "step" : undefined}>
                <a href={link(lessonPath(l))} title={title(l)}>
                  <span aria-hidden="true">{s === "done" ? "✓" : two(l.id)}</span>
                  <span className="sr-only">
                    {t("Lesson")} {l.id}: {title(l)}
                  </span>
                </a>
              </li>
            );
          })}
        </ol>
        <h1>{lesson.title}</h1>
        <div className="lesson-share">
          <ShareButton title={`${lesson.title} · 3D3D`} fr={locale === "fr"} />
        </div>
        <p className="lede">{lesson.summary}</p>
        <p className="outcome">
          <strong>{t("You will learn to:")}</strong> {lesson.learn}
        </p>
      </div>
      <div className="lesson-body">
        <aside className="lesson-aside">
          <Concept lesson={lesson} />
          <nav className="lesson-rail" aria-label={t("In this lesson")} data-vb="rail">
            <p className="eyebrow">{t("In this lesson")}</p>
            <ol>
              {reading.map((section, i) => (
                <li key={section.title}>
                  <a href={`#reading-${i}`}>
                    <span aria-hidden="true">{two(i + 1)}</span>
                    {section.title}
                  </a>
                </li>
              ))}
              <li>
                <a href="#steps-title">
                  <span aria-hidden="true">{two(reading.length + 1)}</span>
                  {t("Work through it")}
                </a>
              </li>
              <li>
                <a href="#practice-title">
                  <span aria-hidden="true">{two(reading.length + 2)}</span>
                  {t("Your practice print")}
                </a>
              </li>
              <li>
                <a href="#quiz-title">
                  <span aria-hidden="true">{two(reading.length + 3)}</span>
                  {t("Check what stuck")}
                </a>
              </li>
            </ol>
          </nav>
        </aside>
        <div className="lesson-main">
          {reading.map((section, i) => (
            <Fragment key={section.title}>
              <section className="reading lesson-step" aria-labelledby={`reading-${i}`}>
                <p className="step-no" aria-hidden="true">
                  {two(i + 1)}
                  <span> / {two(reading.length + 3)}</span>
                </p>
                <h2 id={`reading-${i}`}>{section.title}</h2>
                {composed[i].map((part, j) => (
                  <ReadingPart key={j} part={part} />
                ))}
                <SourceLinks ids={section.sources} />
              </section>
              {i === 1 && terms.length > 0 && (
                <section className="key-terms" data-vb="terms" aria-labelledby="terms-title">
                  <h2 id="terms-title" className="eyebrow">
                    {t("Key terms in this lesson")}
                  </h2>
                  <dl>
                    {terms.map(([term, definition]) => (
                      <div key={term}>
                        <dt>{term}</dt>
                        <dd>{definition}</dd>
                      </div>
                    ))}
                  </dl>
                  <a href={link(`${ACADEMY_PATH}/glossary`)}>{t("Open the glossary")}</a>
                </section>
              )}
            </Fragment>
          ))}
          <section className="reading lesson-step" aria-labelledby="steps-title">
            <p className="step-no" aria-hidden="true">
              {two(reading.length + 1)}
              <span> / {two(reading.length + 3)}</span>
            </p>
            <h2 id="steps-title">{t("Work through it")}</h2>
            <ol className="lesson-steps step-cards" data-vb="steps">
              {lesson.steps.map((s, i) => (
                <li key={i}>
                  <WithNumber text={s} />
                </li>
              ))}
            </ol>
            <h3 id="mistakes-title">{t("Easy mistakes to avoid")}</h3>
            <ul className="mistake-cards" data-vb="mistakes" aria-labelledby="mistakes-title">
              {lesson.mistakes.map((s) => (
                <li key={s}>{s}</li>
              ))}
            </ul>
          </section>
          <section className="practice reading" aria-labelledby="practice-title" data-vb="practice">
            <p className="eyebrow">
              {two(reading.length + 2)} / {two(reading.length + 3)} · {t("Put it to work")}
            </p>
            <h2 id="practice-title">{t("Your practice print")}</h2>
            <p className="practice-task">
              <WithNumber text={lesson.practice.task} />
            </p>
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
            <p className="eyebrow">
              {two(reading.length + 3)} / {two(reading.length + 3)} · {t("Check yourself")}
            </p>
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
                <fieldset key={i} className="q-card" data-vb="question">
                  <legend>
                    <span className="q-count">
                      {t("Question")} {i + 1} / {lesson.quiz.length}
                    </span>
                    {q.question}
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
                    ? `${result} ${locale === "fr" ? "bonnes réponses sur 5." : "of 5 correct."} ${done ? t("Lesson complete.") : result === 5 ? t("Record your practice to complete this lesson.") : t("Review the explanations and try again.")}`
                    : t("Your answers stay on this device."))}
              </p>
            </form>
          </section>
          <section className="next-card" data-vb="next" aria-labelledby="next-title">
            <p className="eyebrow">
              {done ? t("Lesson complete.") : t("Up next")} · {unitDone} / {unitLessons.length}{" "}
              {t("lessons of this unit complete")}
            </p>
            {next ? (
              <a className="next-link" href={link(lessonPath(next))}>
                <LessonPic lesson={next} width={160} height={120} />
                <span>
                  <small>
                    {t("Lesson")} {next.id}
                    {next.unit !== lesson.unit ? ` · ${t("Unit")} ${next.unit}` : ""}
                  </small>
                  <strong id="next-title">{title(next)}</strong>
                </span>
                <span className="next-go" aria-hidden="true">
                  →
                </span>
              </a>
            ) : (
              <a className="next-link" href={link(`${ACADEMY_PATH}/certificate`)}>
                <span>
                  <strong id="next-title">{t("Completion record →")}</strong>
                </span>
              </a>
            )}
          </section>
          <details className="lesson-more no-print">
            <summary>{t("Tools, sources, common questions and corrections")}</summary>
            <AcademyRelated unit={lesson.unit} />
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
            <CorrectionForm lesson={lesson.slug} title={lesson.title} submit={submitCorrection} />
          </details>
          <nav className="lesson-navigation" aria-label={t("Lesson navigation")}>
            {lesson.id > 1 && <a href={link(lessonPath(lessons[lesson.id - 2]))}>{t("← Previous lesson")}</a>}
            <a href={link(ACADEMY_PATH)}>{t("Course map")}</a>
            {lesson.id < 40 ? (
              <a href={link(lessonPath(lessons[lesson.id]))}>{t("Next lesson →")}</a>
            ) : (
              <a href={link(`${ACADEMY_PATH}/certificate`)}>{t("Completion record →")}</a>
            )}
          </nav>
        </div>
      </div>
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
  // The lesson last opened on this device, read after hydration so the first paint matches the server.
  const [last, setLast] = useState<Lesson>();
  useEffect(() => {
    try {
      const slug = localStorage.getItem(LAST_KEY);
      setLast(lessons.find((l) => l.slug === slug));
    } catch {
      /* storage off */
    }
  }, []);
  const here = last && !complete(last, progress.lessons[last.slug]) ? last : (next ?? lessons[lessons.length - 1]);
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
          progress={progress}
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
            <a className="start-link" href={link(next ? lessonPath(here) : `${ACADEMY_PATH}/certificate`)}>
              {total === 0 && !last
                ? t("Start with lesson 1")
                : next
                  ? t("Continue learning")
                  : t("Print your completion record")}{" "}
              <span aria-hidden="true">↗</span>
            </a>
          </div>
          {/* The course map (2026-11-11): where you are, every unit's progress, every lesson with its own
              diagram. Read from this device after hydration; the server paints the first visit. */}
          <section className="course-here" data-vb="here" aria-labelledby="here-title">
            <p className="eyebrow">
              {total === 0 && !last ? t("Start here") : t("You are here")} · {total} {t("of 40 lessons complete")}
            </p>
            <a className="next-link" href={link(lessonPath(here))}>
              <LessonPic lesson={here} width={160} height={120} />
              <span>
                <small>
                  {t("Unit")} {here.unit} · {t("Lesson")} {here.id}
                </small>
                <strong id="here-title">{academyCatalog[here.id - 1].title[locale]}</strong>
              </span>
              <span className="next-go" aria-hidden="true">
                →
              </span>
            </a>
          </section>
          <nav className="unit-map" aria-label={t("Jump to unit")} data-vb="units">
            <ol>
              {courseUnits.map((u, i) => {
                const unitDone = lessons.filter((l) => l.unit === i + 1 && complete(l, progress.lessons[l.slug])).length;
                return (
                  <li key={u.title} className={here.unit === i + 1 ? "is-here" : undefined}>
                    <a href={`#unit-${i + 1}`}>
                      <span className="unit-no" aria-hidden="true">
                        0{i + 1}
                      </span>
                      <strong>{u.title}</strong>
                      <span className="unit-bar" aria-hidden="true">
                        <span style={{ width: `${unitDone * 20}%` }} />
                      </span>
                      <small>
                        {unitDone} / 5
                      </small>
                    </a>
                  </li>
                );
              })}
            </ol>
          </nav>
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
                <ol start={i * 5 + 1} className="lesson-map">
                  {lessons
                    .filter((l) => l.unit === i + 1)
                    .map((l) => {
                      const s = lessonState(l, progress.lessons[l.slug]);
                      const at = l.id === here.id;
                      return (
                        <li key={l.slug} className={`is-${s}${at ? " is-here" : ""}`}>
                          <a href={link(lessonPath(l))} aria-current={at ? "step" : undefined}>
                            <LessonPic lesson={l} className="lesson-thumb" width={128} height={96} />
                            <span className="lesson-map-text">
                              <small>
                                {t("Lesson")} {l.id}
                              </small>
                              <span>{academyCatalog[l.id - 1].title[locale]}</span>
                            </span>
                            <span className="lesson-state">
                              {s === "done"
                                ? t("Complete ✓")
                                : at
                                  ? t("You are here")
                                  : s === "started"
                                    ? t("In progress")
                                    : t("Open →")}
                            </span>
                          </a>
                        </li>
                      );
                    })}
                </ol>
              </section>
            ))}
          </div>
        </>
      ) : suffix === "/contributors" || suffix === "/join" ? (
        <ParticipationPage
          answer={guide?.answer}
          page={suffix === "/join" ? "join" : "contributors"}
          pic={<AuxPic suffix={suffix} />}
          submitCorrection={submitCorrection}
        />
      ) : suffix === "/glossary" ? (
        <div className="reading">
          <div className="academy-heading">
            <p className="eyebrow">{t("Keep the language useful")}</p>
            <h1>{t("A small printing glossary")}</h1>
            <p className="lede">{guide?.answer}</p>
          </div>
          <AuxPic suffix="/glossary" />
          <dl className="glossary">
            {terms.map(([term, definition, id], i) => {
              const taught = termLesson[i];
              return (
                <div key={term}>
                  <dt>{term}</dt>
                  <dd>
                    {definition} <a href={sources[id].url}>{t("Reference")}</a>
                    {taught && (
                      <a className="term-lesson" href={link(lessonPath(taught))}>
                        <LessonPic lesson={taught} className="lesson-thumb" width={128} height={96} />
                        <span>
                          {t("Where the course uses it:")} {t("Lesson")} {taught.id},{" "}
                          {academyCatalog[taught.id - 1].title[locale]}
                        </span>
                      </a>
                    )}
                  </dd>
                </div>
              );
            })}
          </dl>
        </div>
      ) : suffix === "/failed-print" ? (
        <div className="reading">
          <div className="academy-heading">
            <p className="eyebrow">{t("Start with what you can see")}</p>
            <h1>{t("My print failed.")}</h1>
            <p className="lede">{guide?.answer}</p>
          </div>
          {/* the pictures of the failure lessons this page links to, visible without
              opening anything; each one opens its lesson. */}
          <ul className="failure-pics no-print">
            {FAILURE_PICS.map((slug) => {
              const l = bySlug(slug);
              return (
                <li key={slug}>
                  <a href={link(lessonPath(l))}>
                    <LessonPic lesson={l} />
                    <span>{academyCatalog[l.id - 1].title[locale]}</span>
                  </a>
                </li>
              );
            })}
          </ul>
          {failures.map((s) => (
            <details className="symptom" key={s.name}>
              <summary>{s.name}</summary>
              <p>{s.advice}</p>
              <ul>
                {s.slugs.map((slug) => {
                  const l = lessons.find((l) => l.slug === slug)!;
                  return (
                    <li key={slug}>
                      <a href={link(lessonPath(l))}>
                        <LessonPic lesson={l} className="symptom-thumb" width={96} height={72} />
                        <span>{academyCatalog[l.id - 1].title[locale]}</span>
                      </a>
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
          <AuxPic suffix="/certificate" />
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
          <AuxPic suffix="/sources" />
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
