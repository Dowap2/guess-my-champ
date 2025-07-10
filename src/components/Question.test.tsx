import React from "react";
import { render, screen } from "@testing-library/react";
import { Question } from "./Question";
import * as useQuizHook from "./hooks/useQuiz";

// Jest DOM 매처는 setupTests.ts에서 설정됨

// styled-components 모킹 (필요한 경우)
jest.mock("./styled", () => ({
  QuizComponent: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="quiz-component">{children}</div>
  ),
  Button: ({
    children,
    onClick,
    style,
  }: {
    children: React.ReactNode;
    onClick?: () => void;
    style?: React.CSSProperties;
  }) => (
    <button onClick={onClick} style={style}>
      {children}
    </button>
  ),
}));

// 다른 컴포넌트들 모킹
jest.mock("./QuestionSelector", () => ({
  QuestionSelector: ({
    onSelectCount,
  }: {
    onSelectCount: (count: number) => void;
  }) => <div data-testid="question-selector">Question Selector</div>,
}));

jest.mock("./QuizResult", () => ({
  QuizResult: ({ stats, onRestart }: { stats: any; onRestart: () => void }) => (
    <div data-testid="quiz-result">Quiz Result</div>
  ),
}));

jest.mock("./QuizQuestion", () => ({
  QuizQuestion: (props: any) => (
    <div data-testid="quiz-question">Quiz Question</div>
  ),
}));

jest.mock("./ProgressBar", () => ({
  ProgressBar: ({
    current,
    total,
    progress,
  }: {
    current: number;
    total: number;
    progress: number;
  }) => <div data-testid="progress-bar">Progress: {progress}%</div>,
}));

jest.mock("./Timer", () => ({
  Timer: ({ timeLeft, maxTime }: { timeLeft: number; maxTime: number }) => (
    <div data-testid="timer">Time: {timeLeft}s</div>
  ),
}));

jest.mock("./hooks/useQuiz");

describe("Question component simple render test", () => {
  beforeEach(() => {
    // 각 테스트 전에 mock 초기화
    jest.clearAllMocks();
  });

  test("renders Question component with quiz content", () => {
    // useQuiz 훅 모킹
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
      questionCount: 5, // null이 아닌 값으로 설정
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

    // 다른 컴포넌트들이 렌더링되는지 확인
    expect(screen.getByTestId("quiz-component")).toBeInTheDocument();
    expect(screen.getByTestId("progress-bar")).toBeInTheDocument();
    expect(screen.getByTestId("quiz-question")).toBeInTheDocument();
    expect(screen.getByTestId("timer")).toBeInTheDocument();
  });

  test("renders QuestionSelector when questionCount is null", () => {
    (useQuizHook.useQuiz as jest.Mock).mockReturnValue({
      answer: "",
      timeLeft: 10,
      result: null,
      currentQuestion: null,
      questionsAnswered: 0,
      questionCount: null, // null로 설정
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

    expect(screen.getByTestId("question-selector")).toBeInTheDocument();
  });

  test("renders QuizResult when quiz is finished", () => {
    (useQuizHook.useQuiz as jest.Mock).mockReturnValue({
      answer: "",
      timeLeft: 0,
      result: null,
      currentQuestion: null,
      questionsAnswered: 5,
      questionCount: 5,
      isQuizFinished: true, // 퀴즈 완료 상태
      progress: 100,
      quizStats: { correct: 3, wrong: 2 },
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

    expect(screen.getByTestId("quiz-result")).toBeInTheDocument();
  });
});
