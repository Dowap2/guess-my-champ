import { useEffect, useState } from "react";
import styled from "styled-components";

type Question = {
  correctAnswer: string;
  skillImages: string[];
};

const MOCK_QUESTIONS: Question[] = [
  {
    correctAnswer: "아리",
    skillImages: [
      "https://ddragon.leagueoflegends.com/cdn/14.12.1/img/spell/AhriQ.png",
      "https://ddragon.leagueoflegends.com/cdn/14.12.1/img/spell/AhriW.png",
      "https://ddragon.leagueoflegends.com/cdn/14.12.1/img/spell/AhriE.png",
      "https://ddragon.leagueoflegends.com/cdn/14.12.1/img/spell/AhriR.png",
    ],
  },
  {
    correctAnswer: "이즈리얼",
    skillImages: [
      "https://ddragon.leagueoflegends.com/cdn/14.12.1/img/spell/EzrealQ.png",
      "https://ddragon.leagueoflegends.com/cdn/14.12.1/img/spell/EzrealW.png",
      "https://ddragon.leagueoflegends.com/cdn/14.12.1/img/spell/EzrealE.png",
      "https://ddragon.leagueoflegends.com/cdn/14.12.1/img/spell/EzrealR.png",
    ],
  },
  {
    correctAnswer: "럭스",
    skillImages: [
      "https://ddragon.leagueoflegends.com/cdn/14.12.1/img/spell/LuxLightBinding.png",
      "https://ddragon.leagueoflegends.com/cdn/14.12.1/img/spell/LuxPrismaticWave.png",
      "https://ddragon.leagueoflegends.com/cdn/14.12.1/img/spell/LuxLightStrikeKugel.png",
      "https://ddragon.leagueoflegends.com/cdn/14.12.1/img/spell/LuxR.png",
    ],
  },
  {
    correctAnswer: "야스오",
    skillImages: [
      "https://ddragon.leagueoflegends.com/cdn/14.12.1/img/spell/YasuoQ1Wrapper.png",
      "https://ddragon.leagueoflegends.com/cdn/14.12.1/img/spell/YasuoW.png",
      "https://ddragon.leagueoflegends.com/cdn/14.12.1/img/spell/YasuoE.png",
      "https://ddragon.leagueoflegends.com/cdn/14.12.1/img/spell/YasuoR.png",
    ],
  },
];

const QuizComponent = styled.div`
  padding: 20px;
  textalign: center;
`;

const QuizContent = styled.div`
  display: flex;
  justifycontent: center;
  gap: 10px;
  margin: 20px;
`;

const QuizImage = styled.img`
  width: 64px;
  height: 64px;
  transition: opacity 0.3s ease;
  opacity: 1;
`;

const QuizForm = styled.div`
  display: flex;
  justifycontent: center;
  gap: 10px;
  margin: 20px;
`;

const Message = styled.p<{ result: "correct" | "wrong" }>`
  color: ${({ result }) => (result === "correct" ? "green" : "red")};
`;

export const Quiz = () => {
  const [answer, setAnswer] = useState<string>("");
  const [timeLeft, setTimeLeft] = useState<number>(10);
  const [result, setResult] = useState<null | "correct" | "wrong">(null);
  const [remainingQuestions, setRemainingQuestions] = useState<Question[]>([
    ...MOCK_QUESTIONS,
  ]);
  const [randomQuestion, setRandomQuestion] = useState<Question | null>(null);

  useEffect(() => {
    if (remainingQuestions.length > 0 && !randomQuestion) {
      const first = drawRandomQuestion(remainingQuestions);
      setRandomQuestion(first.question);
      setRemainingQuestions(first.remaining);
    }
  }, []);

  useEffect(() => {
    if (timeLeft <= 0 || result !== null) return;

    const interval: number = setInterval(() => {
      setTimeLeft((prev) => {
        const next: number = parseFloat((prev - 0.1).toFixed(1));
        if (next <= 0) {
          clearInterval(interval);
          return 0;
        }
        return next;
      });
    }, 100);

    return () => clearInterval(interval);
  }, [result, timeLeft]);

  const handleSubmit = () => {
    if (answer.trim() === randomQuestion?.correctAnswer) {
      setResult("correct");
    } else {
      setResult("wrong");
    }
  };

  const drawRandomQuestion = (questions: Question[]) => {
    const idx = Math.floor(Math.random() * questions.length);
    const selected = questions[idx];
    const remaining = questions.filter((_, i) => i !== idx);
    return { question: selected, remaining };
  };

  const resetQuiz = () => {
    if (remainingQuestions.length === 0) {
      alert("🎉 모든 문제를 다 풀었습니다! 퀴즈가 종료됩니다.");
      setRandomQuestion(null);
      return;
    }

    const next = drawRandomQuestion(remainingQuestions);

    setAnswer("");
    setResult(null);
    setTimeLeft(10);
    setRandomQuestion(next.question);
    setRemainingQuestions(next.remaining);
  };

  return (
    <QuizComponent>
      <h2>이 스킬들의 주인은 누구일까요?</h2>

      <QuizContent>
        {randomQuestion?.skillImages.map((url, idx) => (
          <QuizImage key={idx} src={url} alt={`Skill ${idx}`} />
        ))}
      </QuizContent>

      <QuizForm>
        <input
          type="text"
          placeholder="챔피언 이름 입력"
          value={answer}
          onChange={(e) => setAnswer(e.target.value)}
          disabled={result !== null || timeLeft === 0}
          style={{ padding: "8px", fontSize: "16px" }}
        />
        <button
          onClick={handleSubmit}
          disabled={result !== null || timeLeft === 0}
        >
          제출
        </button>
      </QuizForm>

      <div style={{ marginTop: "20px", fontSize: "18px" }}>
        ⏱️ 남은 시간: {timeLeft}초
      </div>
      <div
        style={{
          margin: "20px 0",
          height: "10px",
          width: "80%",
          background: "#ddd",
          marginInline: "auto",
        }}
      >
        <div
          style={{
            height: "100%",
            width: `${(timeLeft / 10) * 100}%`,
            backgroundColor:
              timeLeft > 6 ? "green" : timeLeft > 3 ? "orange" : "red",
          }}
        />
      </div>

      {result === "correct" && (
        <Message result="correct">✅ 정답입니다!</Message>
      )}

      {result === "wrong" && (
        <Message result="wrong">
          ❌ 오답입니다! 정답은 {randomQuestion?.correctAnswer}
        </Message>
      )}

      {(result !== null || timeLeft === 0) && (
        <button onClick={resetQuiz} style={{ marginTop: "20px" }}>
          다음 문제 ▶
        </button>
      )}
    </QuizComponent>
  );
};
