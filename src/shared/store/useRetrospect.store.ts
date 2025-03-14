import { create } from "zustand";

type GoalPregress = 'good' | 'normal' | 'bad' | null;

interface RetrospectState {
  date: string;
  mood: string;
  highlight: string;
  keywords: string[];
  resolution: string;
  comment: string;
  goalId: number | null;
  goalProgress: GoalPregress;
  goalFeedback: string;

  setMood: (mood: string) => void;
  setHighlight: (highlight: string) => void;
  setKeywords: (keyword: string[]) => void;
  setResolution: (resolution: string) => void;
  setComment: (comment: string) => void;
  setGoalId: (goal_id: number) => void;
  setGoalProgress: (goal_progress: GoalPregress) => void;
  setGoalFeedback: (goal_feedback: string) => void;
  resetRetrospect: () => void;
}

export const useRetrospectStore = create<RetrospectState>((set) => ({
  date: new Date().toISOString().split('T')[0], // YYYY-MM-DD 형식
  mood: "",
  highlight: "",
  keywords: [],
  resolution: "",
  comment: "",
  goalId: null,
  goalProgress: null,
  goalFeedback: "",

  setMood: (mood) => set({ mood }),
  setHighlight: (highlight) => set({ highlight }),
  setKeywords: (keywords) => set({ keywords }),
  setResolution: (resolution) => set({ resolution }),
  setComment: (comment) => set({ comment }),
  setGoalId: (goalId) => set({ goalId }),
  setGoalProgress: (goalProgress) => set({ goalProgress }),
  setGoalFeedback: (goalFeedback) => set({ goalFeedback }),

  resetRetrospect: () => set({
    date: new Date().toISOString().split('T')[0],
    mood: "",
    highlight: "",
    keywords: [],
    resolution: "",
    comment: "",
    goalId: null,
    goalProgress: null,
    goalFeedback: "",
  }),
}));