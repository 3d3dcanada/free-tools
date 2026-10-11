import first from "./lessons/01-10";
import second from "./lessons/11-20";
import third from "./lessons/21-30";
import fourth from "./lessons/31-40";
import type { Lesson } from "./types";
import { lessonAnswers } from "./answers.en";
export const lessons = [...first, ...second, ...third, ...fourth].map((lesson, i) => ({
  ...lesson,
  summary: lessonAnswers[i],
}));
export const COURSE_VERSION = 1;
export const ACADEMY_PATH = "/learn/academy";
export const lessonPath = (lesson: Lesson) => `${ACADEMY_PATH}/${lesson.slug}`;
