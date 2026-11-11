import first from "./lessons/01-10";
import second from "./lessons/11-20";
import third from "./lessons/21-30";
import fourth from "./lessons/31-40";
import { lessonAnswers } from "./answers.en";
export const lessons = [...first, ...second, ...third, ...fourth].map((lesson, i) => ({
  ...lesson,
  summary: lessonAnswers[i],
}));
export { COURSE_VERSION, ACADEMY_PATH, lessonPath } from "./paths";
/** Each lesson's five correct options, by slug: all progress needs to score a lesson. */
export const answerKeys = (): Record<string, number[]> =>
  Object.fromEntries(lessons.map((l) => [l.slug, l.quiz.map((q) => q.answer)]));
