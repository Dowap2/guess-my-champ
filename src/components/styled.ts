import styled from "styled-components";

export const QuizComponent = styled.div`
  padding: 20px;
  text-align: center;
`;

export const QuizContent = styled.div`
  display: flex;
  justify-content: center;
  gap: 10px;
  margin: 20px;
`;

export const QuizImage = styled.img`
  width: 64px;
  height: 64px;
  transition: opacity 0.3s ease;
  opacity: 1;
`;

export const QuizForm = styled.div`
  display: flex;
  justify-content: center;
  gap: 10px;
  margin: 20px;
`;

export const Message = styled.p<{ result: "correct" | "wrong" }>`
  color: ${({ result }) => (result === "correct" ? "green" : "red")};
`;

export const Button = styled.button`
  margin: 8px;
  padding: 10px 20px;
  font-size: 16px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  background-color: #007bff;
  color: white;

  &:hover {
    background-color: #0056b3;
  }

  &:disabled {
    background-color: #6c757d;
    cursor: not-allowed;
  }
`;

export const Input = styled.input`
  padding: 8px;
  font-size: 16px;
  border: 1px solid #ddd;
  border-radius: 4px;

  &:disabled {
    background-color: #f5f5f5;
    cursor: not-allowed;
  }
`;

export const TimerContainer = styled.div`
  margin: 20px 0;
  height: 10px;
  width: 80%;
  background: #ddd;
  margin-inline: auto;
  border-radius: 5px;
  overflow: hidden;
`;

export const TimerBar = styled.div<{ width: number; timeLeft: number }>`
  height: 100%;
  width: ${(props) => props.width}%;
  background-color: ${(props) =>
    props.timeLeft > 6 ? "green" : props.timeLeft > 3 ? "orange" : "red"};
  transition: width 0.1s ease;
`;
