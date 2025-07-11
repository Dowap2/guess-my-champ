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
    questionsAnswered,
    questionCount,
    isQuizFinished,
    progress,
    quizStats,
    isDisabled,
    total,
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

      {questionList[questionsAnswered] && (
        <QuizQuestion
          answer={answer}
          result={result}
          isDisabled={isDisabled}
          current={questionsAnswered}
          questionList={questionList}
          onAnswerChange={setAnswer}
          onSubmit={handleSubmit}
          onKeyPress={handleKeyPress}
        />
      )}

      <Timer timeLeft={timeLeft} maxTime={TIMER_DURATION} />
      {(result !== null || timeLeft === 0) && (
        <Button onClick={resetQuiz} style={{ marginTop: "20px" }}>
          {questionsAnswered + 1 === total ? "결과 보기 ▶" : "다음 문제 ▶"}
        </Button>
      )}
    </QuizComponent>
  );
};
