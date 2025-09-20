import React from "react";
import { TimerContainer, TimerBar } from "./styled";

interface TimerProps {
  timeLeft: number;
  maxTime: number;
}

export const Timer: React.FC<TimerProps> = ({ timeLeft, maxTime }) => {
  const percentage = (timeLeft / maxTime) * 100;

  return (
    <>
      <div style={{ marginTop: "20px", fontSize: "18px" }}>
        ⏱️ 남은 시간: {timeLeft}초
      </div>
      <TimerContainer>
        <TimerBar $width={percentage} $timeLeft={timeLeft} />
      </TimerContainer>
    </>
  );
};
