import { useState, useEffect, useCallback, useMemo } from "react";
import type { Question, QuizResult } from "../types.ts";
import { TIMER_DURATION, TIMER_INTERVAL } from "../constants.js";

export const useQuiz = () => {
  const [answer, setAnswer] = useState<string>("");
  const [timeLeft, setTimeLeft] = useState<number>(TIMER_DURATION);
  const [result, setResult] = useState<QuizResult>(null);
  const [questionsAnswered, setQuestionsAnswered] = useState(0);
  const [questionCount, setQuestionCount] = useState<number | null>(null);
  const [correctCount, setCorrectCount] = useState(0);
  const [isQuizFinished, setIsQuizFinished] = useState(false);
  const [total, setTotal] = useState<number>(0);
  const [questionList, setQuestionList] = useState<Question[]>([]);

  useEffect(() => {
    if (timeLeft <= 0 || result !== null) return;

    const interval = setInterval(() => {
      setTimeLeft((prev) => {
        const next = Math.max(0, parseFloat((prev - 0.1).toFixed(1)));
        if (next <= 0) {
          clearInterval(interval);
        }
        return next;
      });
    }, TIMER_INTERVAL);

    return () => clearInterval(interval);
  }, [result, timeLeft]);

  const handleSubmit = () => {
    console.log(questionsAnswered, total);
    if (questionsAnswered === total) {
      return;
    }

    const isCorrect =
      answer.trim() === questionList[questionsAnswered]?.correctAnswer;

    setResult(isCorrect ? "correct" : "wrong");
    console.log(isCorrect);
    if (isCorrect) {
      setCorrectCount((prev) => prev + 1);
    }
  };

  const handleKeyPress = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === "Enter" && result === null && timeLeft > 0) {
        handleSubmit();
      }
    },
    [handleSubmit, result, timeLeft]
  );

  const handleSetQuiz = (count: number) => {
    setQuestionCount(count);
    generateRandomQuestions(count);
    setTotal(count);
  };

  const resetQuiz = () => {
    if (questionsAnswered + 1 === total) {
      setIsQuizFinished(true);
      return;
    }

    setAnswer("");
    setResult(null);
    setTimeLeft(TIMER_DURATION);
    setQuestionsAnswered((prev) => prev + 1);
  };

  const restartQuiz = useCallback(() => {
    setQuestionCount(null);
    setCorrectCount(0);
    setIsQuizFinished(false);
    setQuestionsAnswered(0);
    setAnswer("");
    setResult(null);
    setTimeLeft(TIMER_DURATION);
  }, []);

  const progress = useMemo(() => {
    if (total === 0) return 0;
    return (questionsAnswered / total) * 100;
  }, [questionsAnswered, total]);

  const quizStats = useMemo(() => {
    const incorrect = total - correctCount;
    const rate =
      total === 0 ? "0.0" : ((correctCount / total) * 100).toFixed(1);

    return {
      total,
      correct: correctCount,
      incorrect,
      rate,
    };
  }, [correctCount, total]);

  const isDisabled = result !== null || timeLeft === 0;

  const VERSION = "14.12.1";
  const LANG = "ko_KR";

  async function fetchChampionList(): Promise<{ id: string; name: string }[]> {
    const res = await fetch(
      `https://ddragon.leagueoflegends.com/cdn/${VERSION}/data/${LANG}/champion.json`
    );
    const json = await res.json();
    const data = json.data;

    return Object.values(data).map((champ: any) => ({
      id: champ.id,
      name: champ.name,
    }));
  }

  function getRandomChampions<T>(list: T[], count: number): T[] {
    const shuffled = list.sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
  }

  async function fetchChampionSpells(championId: string): Promise<string[]> {
    const res = await fetch(
      `https://ddragon.leagueoflegends.com/cdn/${VERSION}/data/${LANG}/champion/${championId}.json`
    );
    const json = await res.json();
    const champ = json.data[championId];

    return champ.spells.map(
      (spell: any) =>
        `https://ddragon.leagueoflegends.com/cdn/${VERSION}/img/spell/${spell.image.full}`
    );
  }

  async function generateRandomQuestions(count: number) {
    const allChampions = await fetchChampionList();
    const randomChampions = getRandomChampions(allChampions, count);

    const questions = await Promise.all(
      randomChampions.map(async (champ) => {
        try {
          const skillImages = await fetchChampionSpells(champ.id);
          return {
            correctAnswer: champ.name,
            skillImages,
          };
        } catch (error) {
          console.warn(`챔피언 데이터 로드 실패: ${champ.id}`, error);
          return null;
        }
      })
    );
    // console.log(questions, currentQuestion);
    setQuestionList(questions.filter((q): q is Question => q !== null));
  }

  return {
    answer,
    timeLeft,
    result,
    questionsAnswered,
    questionCount,
    correctCount,
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
  };
};
