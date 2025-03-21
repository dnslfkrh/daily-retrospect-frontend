import { create } from "zustand";

type GoalRating = 1 | 2 | 3 | 4 | 5 | null;

interface RetrospectState {
  date: string;
  questions: { id: number; text: string; type: "common" | "concept" }[];
  answers: Record<number, string | null>;
  skippedQuestions: number[];
  goalId: number | null;
  goalRating: GoalRating;

  setQuestions: (questions: { id: number; text: string; type: "common" | "concept" }[]) => void;
  setAnswer: (questionId: number, answer: string | null) => void;
  skipQuestion: (questionId: number) => void;
  setGoalId: (goalId: number | null) => void;
  setGoalRating: (goalRating: GoalRating) => void;
  resetRetrospect: () => void;
}

export const useRetrospectStore = create<RetrospectState>((set) => ({
  date: new Date().toISOString().split("T")[0],
  questions: [],
  answers: {},
  skippedQuestions: [],
  goalId: null,
  goalRating: null,

  setQuestions: (questions) => set({ questions }),

  setAnswer: (questionId, answer) =>
    set((state) => ({
      answers: { ...state.answers, [questionId]: answer },
      skippedQuestions: state.skippedQuestions.filter((id) => id !== questionId),
    })),

  skipQuestion: (questionId) =>
    set((state) => ({
      skippedQuestions: [...new Set([...state.skippedQuestions, questionId])],
      answers: { ...state.answers, [questionId]: null },
    })),

  setGoalId: (goalId) => set({ goalId }),

  setGoalRating: (goalRating) => set({ goalRating }),

  resetRetrospect: () =>
    set({
      date: new Date().toISOString().split("T")[0],
      questions: [],
      answers: {},
      skippedQuestions: [],
      goalId: null,
      goalRating: null,
    }),
}));
