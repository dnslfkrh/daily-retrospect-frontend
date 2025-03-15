import { create } from "zustand";

type GoalRating = 1 | 2 | 3 | 4 | 5 | null;

interface RetrospectState {
  date: string;
  mood: string;
  keywords: string[];
  mistake: string;
  achievement: string;
  memorable_moment: string;
  memorable_interaction: string;
  goalId: number | null;
  goalRating: GoalRating; // 1~5점 평가

  setMood: (mood: string) => void;
  setKeywords: (keywords: string[]) => void;
  setMistake: (mistake: string) => void;
  setAchievement: (achievement: string) => void;
  setMemorableMoment: (moment: string) => void;
  setMemorableInteraction: (interaction: string) => void;
  setGoalId: (goalId: number | null) => void;
  setGoalRating: (goalRating: GoalRating) => void;
  resetRetrospect: () => void;
}

export const useRetrospectStore = create<RetrospectState>((set) => ({
  date: new Date().toISOString().split('T')[0], // YYYY-MM-DD 형식
  mood: "",
  keywords: [],
  mistake: "",
  achievement: "",
  memorable_moment: "",
  memorable_interaction: "",
  goalId: null,
  goalRating: null,

  setMood: (mood) => set({ mood }),
  setKeywords: (keywords) => set({ keywords }),
  setMistake: (mistake) => set({ mistake }),
  setAchievement: (achievement) => set({ achievement }),
  setMemorableMoment: (moment) => set({ memorable_moment: moment }),
  setMemorableInteraction: (interaction) => set({ memorable_interaction: interaction }),
  setGoalId: (goalId) => set({ goalId }),
  setGoalRating: (goalRating) => set({ goalRating }),

  resetRetrospect: () => set({
    date: new Date().toISOString().split('T')[0],
    mood: "",
    keywords: [],
    mistake: "",
    achievement: "",
    memorable_moment: "",
    memorable_interaction: "",
    goalId: null,
    goalRating: null,
  }),
}));