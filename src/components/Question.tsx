import React, { type JSX } from "react";
import { QuizComponent, Button } from "./styled";
import { QuestionSelector } from "./QuestionSelector";
import { QuizResult } from "./QuizResult";
import { QuizQuestion } from "./QuizQuestion";
import { ProgressBar } from "./ProgressBar";
import { Timer } from "./Timer";
import { useQuiz } from "./hooks/useQuiz";
import { TIMER_DURATION } from "./constants";

export const Question: React.FC = () => {
  const {
    answer,
    timeLeft,
    result,
    currentQuestion,
    questionsAnswered,
    questionCount,
    // selectedQuestions,
    isQuizFinished,
    progress,
    quizStats,
    isDisabled,
    total,
    lastQuestion,
    questionList,
    setAnswer,
    handleSubmit,
    handleKeyPress,
    handleSetQuiz,
    resetQuiz,
    restartQuiz,
  } = useQuiz();

  if (questionCount === null) {
    return <QuestionSelector onSelectCount={handleSetQuiz} />;
  }

  if (isQuizFinished) {
    return <QuizResult stats={quizStats} onRestart={restartQuiz} />;
  }
  return (
    <QuizComponent>
      <h2>이 스킬들의 주인은 누구일까요?</h2>

      <ProgressBar
        current={questionsAnswered}
        total={total}
        progress={progress}
      />

      {currentQuestion && (
        <QuizQuestion
          question={currentQuestion}
          answer={answer}
          result={result}
          isDisabled={isDisabled}
          questionList={questionList}
          onAnswerChange={setAnswer}
          onSubmit={handleSubmit}
          onKeyPress={handleKeyPress}
        />
      )}

      <Timer timeLeft={timeLeft} maxTime={TIMER_DURATION} />
      {(result !== null || timeLeft === 0) && (
        <Button onClick={resetQuiz} style={{ marginTop: "20px" }}>
          {lastQuestion ? "결과 보기 ▶" : "다음 문제 ▶"}
        </Button>
      )}
    </QuizComponent>
  );
};
