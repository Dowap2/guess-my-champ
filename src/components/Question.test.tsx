import React from "react";
import { render, screen } from "@testing-library/react";
import { Question } from "./Question";
import * as useQuizHook from "./hooks/useQuiz";

jest.mock("./hooks/useQuiz");

describe("Question component simple render test", () => {
  test("renders Question component", () => {
    (useQuizHook.useQuiz as jest.Mock).mockReturnValue({
      answer: "",
      timeLeft: 10,
      result: null,
      currentQuestion: {
        id: 1,
        question: "이 스킬은 누구의 스킬인가요?",
        options: ["A", "B", "C", "D"],
        correctAnswer: "A",
      },
      questionsAnswered: 0,
      questionCount: 5,
      isQuizFinished: false,
      progress: 0,
      quizStats: { correct: 0, wrong: 0 },
      isDisabled: false,
      total: 5,
      setAnswer: jest.fn(),
      handleSubmit: jest.fn(),
      handleKeyPress: jest.fn(),
      handleSetQuiz: jest.fn(),
      resetQuiz: jest.fn(),
      restartQuiz: jest.fn(),
    });

    render(<Question />);

    // 제목 텍스트가 있는지 확인
    expect(
      screen.getByText("이 스킬들의 주인은 누구일까요?")
    ).toBeInTheDocument();
  });
});
