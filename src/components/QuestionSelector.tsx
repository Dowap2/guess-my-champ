import React from "react";
import { QuizComponent, Button } from "./styled.ts";
import { QUESTION_COUNT_OPTIONS } from "./constants";

interface QuestionSelectorProps {
  onSelectCount: (count: number) => void;
}

export const QuestionSelector: React.FC<QuestionSelectorProps> = ({
  onSelectCount,
}) => {
  return (
    <QuizComponent>
      <h2>풀고 싶은 문제 수를 선택하세요</h2>
      {QUESTION_COUNT_OPTIONS.map((count: number) => (
        <Button key={count} onClick={() => onSelectCount(count)}>
          {count}문제
        </Button>
      ))}
    </QuizComponent>
  );
};
