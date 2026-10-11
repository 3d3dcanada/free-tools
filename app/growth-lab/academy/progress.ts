import { COURSE_VERSION, lessons } from "./curriculum";
import type { Lesson } from "./types";

export type LessonProgress = { answers: (number | null)[]; checked: boolean; practice: boolean };
export type Progress = { version: 1; courseVersion: number; lessons: Record<string, LessonProgress> };
export const PROGRESS_KEY = "3d3d-academy-progress-v1";
export const EMPTY_PROGRESS: Progress = { version: 1, courseVersion: COURSE_VERSION, lessons: {} };
export const emptyLesson = (): LessonProgress => ({
  answers: [null, null, null, null, null],
  checked: false,
  practice: false,
});
export function validProgress(value: unknown): value is Progress {
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
      lessons.some((l) => l.slug === slug) &&
      v &&
      typeof v === "object" &&
      typeof v.checked === "boolean" &&
      typeof v.practice === "boolean" &&
      Array.isArray(v.answers) &&
      v.answers.length === 5 &&
      v.answers.every((a) => a === null || (Number.isInteger(a) && a >= 0 && a < 3)),
  );
}
export function score(lesson: Lesson, state: LessonProgress) {
  return lesson.quiz.reduce((n, q, i) => n + (state.answers[i] === q.answer ? 1 : 0), 0);
}
export function complete(lesson: Lesson, state: LessonProgress | undefined) {
  return Boolean(state?.checked && state.practice && score(lesson, state) === 5);
}
export const completedCount = (progress: Progress) =>
  lessons.filter((l) => complete(l, progress.lessons[l.slug])).length;
export const canPrintCertificate = (progress: Progress) => completedCount(progress) === lessons.length;
