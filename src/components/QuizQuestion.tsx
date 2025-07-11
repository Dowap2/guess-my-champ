import React from "react";
import {
  QuizContent,
  QuizImage,
  QuizForm,
  Input,
  Button,
  Message,
} from "./styled";
import type { Question, QuizResult } from "./types";

interface QuizQuestionProps {
  question: Question;
  answer: string;
  result: QuizResult;
  isDisabled: boolean;
  questionList: Question[];
  onAnswerChange: (answer: string) => void;
  onSubmit: () => void;
  onKeyPress: (e: React.KeyboardEvent) => void;
}

export const QuizQuestion: React.FC<QuizQuestionProps> = ({
  question,
  answer,
  result,
  isDisabled,
  questionList,
  onAnswerChange,
  onSubmit,
  onKeyPress,
}) => {
  console.log(question);
  return (
    <>
      <QuizContent>
        {question?.skillImages.map((url, idx) => (
          <QuizImage key={idx} src={url} alt={`Skill ${idx}`} />
        ))}
      </QuizContent>

      <QuizForm>
        <Input
          type="text"
          placeholder="챔피언 이름 입력"
          value={answer}
          onChange={(e) => onAnswerChange(e.target.value)}
          onKeyPress={onKeyPress}
          disabled={isDisabled}
        />
        <Button onClick={onSubmit} disabled={isDisabled}>
          제출
        </Button>
      </QuizForm>

      {result === "correct" && (
        <Message result="correct">✅ 정답입니다!</Message>
      )}

      {result === "wrong" && (
        <Message result="wrong">
          ❌ 오답입니다! 정답은 {question?.correctAnswer}
        </Message>
      )}
    </>
  );
};
