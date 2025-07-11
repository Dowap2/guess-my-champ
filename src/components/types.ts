export type Question = {
  correctAnswer: string;
  skillImages: string[];
} | null;

export type QuizResult = "correct" | "wrong" | null;

export type QuizStats = {
  total: number;
  correct: number;
  incorrect: number;
  rate: string;
};
