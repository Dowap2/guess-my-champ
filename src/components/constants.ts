import type { Question } from "./types";

export const MOCK_QUESTIONS: Question[] = [
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

export const TIMER_DURATION = 10;
export const TIMER_INTERVAL = 100;
export const QUESTION_COUNT_OPTIONS = [1, 2, 3, 4];
