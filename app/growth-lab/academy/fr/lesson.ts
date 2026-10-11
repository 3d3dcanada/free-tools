import { lessons } from "../curriculum";
import { academyCatalog } from "../catalog";
import { lesson, type Lesson, type QuizSeed } from "../types";
export function frenchLesson(
  id: number,
  content: Pick<Lesson, "summary" | "learn" | "steps" | "mistakes" | "practice"> & { quiz: QuizSeed[] },
) {
  return lesson({ ...lessons[id - 1], title: academyCatalog[id - 1].title.fr, ...content });
}
