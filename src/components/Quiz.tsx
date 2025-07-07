import { useEffect, useState } from "react";

type Question = {
  correctAnswer: string;
  skillImages: string[];
};

const MOCK_QUESTION: Question = {
  correctAnswer: "아리",
  skillImages: [
    "https://ddragon.leagueoflegends.com/cdn/14.12.1/img/spell/AhriQ.png",
    "https://ddragon.leagueoflegends.com/cdn/14.12.1/img/spell/AhriW.png",
    "https://ddragon.leagueoflegends.com/cdn/14.12.1/img/spell/AhriE.png",
    "https://ddragon.leagueoflegends.com/cdn/14.12.1/img/spell/AhriR.png",
  ],
};

export const Quiz = () => {
  const [answer, setAnswer] = useState<string>("");
  const [timeLeft, setTimeLeft] = useState<number>(10);
  const [result, setResult] = useState<null | "correct" | "wrong">(null);

  useEffect(() => {
    if (timeLeft <= 0 || result !== null) return;

    const interval = setInterval(() => {
      setTimeLeft((prev) => {
        const next = parseFloat((prev - 0.1).toFixed(1));
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
    const normalizedInput = answer.trim().toLowerCase();
    const normalizedCorrect = MOCK_QUESTION.correctAnswer.toLowerCase();

    if (normalizedInput === normalizedCorrect) {
      setResult("correct");
    } else {
      setResult("wrong");
    }
  };

  const resetQuiz = () => {
    setAnswer("");
    setResult(null);
    setTimeLeft(10);
  };

  return (
    <div style={{ padding: "20px", textAlign: "center" }}>
      <h2>이 스킬들의 주인은 누구일까요?</h2>

      <div
        style={{
          display: "flex",
          justifyContent: "center",
          gap: "10px",
          margin: "20px",
        }}
      >
        {MOCK_QUESTION.skillImages.map((url, idx) => (
          <img
            key={idx}
            src={url}
            alt={`Skill ${idx}`}
            width={64}
            height={64}
          />
        ))}
      </div>

      <div>
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
          style={{ marginLeft: "10px" }}
        >
          제출
        </button>
      </div>

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

      {result === "correct" && <p style={{ color: "green" }}>✅ 정답입니다!</p>}
      {result === "wrong" && (
        <p style={{ color: "red" }}>
          ❌ 오답입니다! 정답은 {MOCK_QUESTION.correctAnswer}
        </p>
      )}
      {(result !== null || timeLeft === 0) && (
        <button onClick={resetQuiz} style={{ marginTop: "20px" }}>
          다음 문제 ▶
        </button>
      )}
    </div>
  );
};
