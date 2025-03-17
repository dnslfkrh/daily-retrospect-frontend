import { create } from 'zustand';
import { Goal } from '../types/Goal.type';

interface GoalState {
  goals: Goal[];
  addGoal: (goal: Goal) => void;
  updateGoal: (updatedGoal: Goal) => void;
  deleteGoal: (id: number) => void;
}

export const useGoalStore = create<GoalState>((set) => ({
  goals: [],
  addGoal: (goal) => set((state) => ({ goals: [...state.goals, goal] })),
  updateGoal: (updatedGoal) =>
    set((state) => ({
      goals: state.goals.map((goal) => (goal.id === updatedGoal.id ? updatedGoal : goal)),
    })),
  deleteGoal: (id) => set((state) => ({ goals: state.goals.filter((goal) => goal.id !== id) })),
}));