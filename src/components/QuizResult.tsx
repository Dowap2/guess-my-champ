import React from "react";
import { QuizComponent, Button } from "./styled";
import type { QuizStats } from "./types";

interface QuizResultProps {
  stats: QuizStats;
  onRestart: () => void;
}

export const QuizResult: React.FC<QuizResultProps> = ({ stats, onRestart }) => {
  return (
    <QuizComponent>
      <h2>🎉 퀴즈 완료!</h2>
      <p>총 {stats.total}문제 중</p>
      <ul>
        <li>✅ 정답: {stats.correct}개</li>
        <li>❌ 오답: {stats.incorrect}개</li>
        <li>📊 정답률: {stats.rate}%</li>
      </ul>
      <Button onClick={onRestart} style={{ marginTop: "20px" }}>
        다시 시작하기 🔁
      </Button>
    </QuizComponent>
  );
};
