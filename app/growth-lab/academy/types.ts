export type QuizSeed = [question: string, correct: string, other: string, other: string, explanation: string];
export type Question = { question: string; options: string[]; answer: number; explanation: string };
export type ReadingSection = { title: string; paragraphs: string[]; sources: string[] };
export type Lesson = {
  id: number;
  unit: number;
  slug: string;
  title: string;
  summary: string;
  learn: string;
  steps: string[];
  diagram: { labels: [string, string, string]; spec: string };
  mistakes: string[];
  practice: { task: string; record: string };
  sources: string[];
  quiz: Question[];
  howTo?: boolean;
};
export function lesson(input: Omit<Lesson, "quiz"> & { quiz: QuizSeed[] }): Lesson {
  return {
    ...input,
    quiz: input.quiz.map(([question, correct, a, b, explanation], i) => {
      const options = [correct, a, b],
        shift = (input.id + i) % 3;
      return {
        question,
        options: [...options.slice(shift), ...options.slice(0, shift)],
        answer: (3 - shift) % 3,
        explanation,
      };
    }),
  };
}
export const units = [
  {
    title: "Start with the job",
    description: "Understand the machine, choose a sensible setup and make space to work safely.",
  },
  {
    title: "Your first useful print",
    description: "Turn a model into checked instructions, then observe and inspect the result.",
  },
  {
    title: "Choose the right material",
    description: "Match the polymer, hardware and working environment to the part.",
  },
  { title: "Tune with a reason", description: "Keep a baseline and change one variable at a time." },
  {
    title: "Make the shape printable",
    description: "Plan load direction, supports, fits and assembly before spending filament.",
  },
  { title: "Read the failure", description: "Use the symptom to choose a small, useful next check." },
  { title: "Finish and check", description: "Clean up a part, measure it and keep the process repeatable." },
  {
    title: "Make a responsible first sale",
    description: "Check rights, costs, quality and what you can honestly promise.",
  },
];
