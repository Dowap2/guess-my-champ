import { useState, useEffect, useCallback, useMemo } from "react";
import type { Question, QuizResult } from "../types.ts";
import {
  MOCK_QUESTIONS,
  TIMER_DURATION,
  TIMER_INTERVAL,
} from "../constants.js";

export const useQuiz = () => {
  const [answer, setAnswer] = useState<string>("");
  const [timeLeft, setTimeLeft] = useState<number>(TIMER_DURATION);
  const [result, setResult] = useState<QuizResult>(null);
  const [remainingQuestions, setRemainingQuestions] = useState<Question[]>([]);
  const [currentQuestion, setCurrentQuestion] = useState<Question | null>(null);
  const [questionsAnswered, setQuestionsAnswered] = useState(0);
  const [questionCount, setQuestionCount] = useState<number | null>(null);
  const [selectedQuestions, setSelectedQuestions] = useState<Question[]>([]);
  const [correctCount, setCorrectCount] = useState(0);
  const [isQuizFinished, setIsQuizFinished] = useState(false);
  const [total, setTotal] = useState<number>(0);
  const [lastQuestion, setLastQuestion] = useState<boolean>(false);
  const [questionList, setQuestionList] = useState<Question[]>([]);

  const drawRandomQuestion = useCallback((questions: Question[]) => {
    const idx = Math.floor(Math.random() * questions.length);
    const selected = questions[idx];
    const remaining = questions.filter((_, i) => i !== idx);
    console.log(selected, remaining);
    return { question: selected, remaining };
  }, []);

  useEffect(() => {
    if (remainingQuestions.length > 0 && !currentQuestion) {
      const first = drawRandomQuestion(remainingQuestions);
      console.log(first);
      setCurrentQuestion(first.question);
      setRemainingQuestions(first.remaining);
    }
  }, [remainingQuestions, currentQuestion, drawRandomQuestion]);

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

  const handleSubmit = useCallback(() => {
    if (!currentQuestion) return;

    const isCorrect = answer.trim() === currentQuestion.correctAnswer;
    setResult(isCorrect ? "correct" : "wrong");
    if (isCorrect) {
      setCorrectCount((prev) => prev + 1);
    }
    if (remainingQuestions.length === 0) {
      setLastQuestion(true);
    }
  }, [answer, currentQuestion]);

  const handleKeyPress = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === "Enter" && result === null && timeLeft > 0) {
        handleSubmit();
      }
    },
    [handleSubmit, result, timeLeft]
  );

  const handleSetQuiz = useCallback((count: number) => {
    const shuffled = [...questionList].sort(() => Math.random() - 0.5);
    setSelectedQuestions(shuffled.slice(0, count));
    setQuestionCount(count);
    setRemainingQuestions(shuffled.slice(0, count));
    generateRandomQuestions(count);
    setTotal(count);
  }, []);

  const resetQuiz = useCallback(() => {
    if (remainingQuestions.length === 0) {
      setIsQuizFinished(true);
      setCurrentQuestion(null);
      setQuestionsAnswered(0);
      setLastQuestion(false);
      return;
    }

    const next = drawRandomQuestion(remainingQuestions);
    setAnswer("");
    setResult(null);
    setTimeLeft(TIMER_DURATION);
    setCurrentQuestion(next.question);
    setRemainingQuestions(next.remaining);
    setQuestionsAnswered((prev) => prev + 1);
  }, [remainingQuestions, drawRandomQuestion]);

  const restartQuiz = useCallback(() => {
    setQuestionCount(null);
    setCorrectCount(0);
    setIsQuizFinished(false);
    setQuestionsAnswered(0);
    setRemainingQuestions([]);
    setCurrentQuestion(null);
    setAnswer("");
    setResult(null);
    setTimeLeft(TIMER_DURATION);
  }, []);

  const progress = useMemo(() => {
    if (selectedQuestions.length === 0) return 0;
    return (
      ((selectedQuestions.length - remainingQuestions.length) /
        selectedQuestions.length) *
      100
    );
  }, [remainingQuestions.length, selectedQuestions.length]);

  const quizStats = useMemo(() => {
    const total = selectedQuestions.length;
    const incorrect = total - correctCount;
    const rate = ((correctCount / total) * 100).toFixed(1);

    return {
      total,
      correct: correctCount,
      incorrect,
      rate,
    };
  }, [selectedQuestions.length, correctCount]);

  const isDisabled = result !== null || timeLeft === 0;

  const VERSION = "14.12.1";
  const LANG = "ko_KR";

  // 전체 챔피언 목록 불러오기
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
    currentQuestion,
    questionsAnswered,
    questionCount,
    selectedQuestions,
    correctCount,
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
  };
};
