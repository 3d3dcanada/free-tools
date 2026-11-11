import { COURSE_VERSION } from "./paths";

export type LessonProgress = { answers: (number | null)[]; checked: boolean; practice: boolean };
export type Progress = { version: 1; courseVersion: number; lessons: Record<string, LessonProgress> };
/**
 * Each lesson's five correct options, by slug, for all forty (curriculum.ts answerKeys). The
 * loader sends these instead of the lessons themselves (2026-11-11): scoring needs nothing else.
 */
export type AnswerKeys = Record<string, number[]>;
export const PROGRESS_KEY = "3d3d-academy-progress-v1";
export const EMPTY_PROGRESS: Progress = { version: 1, courseVersion: COURSE_VERSION, lessons: {} };
export const emptyLesson = (): LessonProgress => ({
  answers: [null, null, null, null, null],
  checked: false,
  practice: false,
});
export function validProgress(value: unknown, keys: AnswerKeys): value is Progress {
  if (!value || typeof value !== "object") return false;
  const p = value as Progress;
  if (
    p.version !== 1 ||
    p.courseVersion !== COURSE_VERSION ||
    !p.lessons ||
    typeof p.lessons !== "object" ||
    Array.isArray(p.lessons)
  )
    return false;
  return Object.entries(p.lessons).every(
    ([slug, v]) =>
      Object.hasOwn(keys, slug) &&
      v &&
      typeof v === "object" &&
      typeof v.checked === "boolean" &&
      typeof v.practice === "boolean" &&
      Array.isArray(v.answers) &&
      v.answers.length === 5 &&
      v.answers.every((a) => a === null || (Number.isInteger(a) && a >= 0 && a < 3)),
  );
}
export function score(answers: number[], state: LessonProgress) {
  return answers.reduce((n, a, i) => n + (state.answers[i] === a ? 1 : 0), 0);
}
export function complete(answers: number[] | undefined, state: LessonProgress | undefined) {
  return Boolean(answers && state?.checked && state.practice && score(answers, state) === 5);
}
export const completedCount = (progress: Progress, keys: AnswerKeys) =>
  Object.keys(keys).filter((slug) => complete(keys[slug], progress.lessons[slug])).length;
export const canPrintCertificate = (progress: Progress, keys: AnswerKeys) =>
  completedCount(progress, keys) === Object.keys(keys).length;
