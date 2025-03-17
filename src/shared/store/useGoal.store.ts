import { create } from 'zustand';
import { Goal } from '../types/Goal.type';

interface GoalState {
  goals: Goal[];
  addGoal: (goal: Goal) => void;
  updateGoal: (updatedGoal: Goal) => void;
  deleteGoal: (id: number) => void;
  setGoals: (goals: Goal[]) => void;
}

export const useGoalStore = create<GoalState>((set) => ({
  goals: [],
  addGoal: (goal) => set((state) => ({
    goals: [...state.goals, removeCreatedAt(goal)]
  })),
  updateGoal: (updatedGoal) =>
    set((state) => ({
      goals: state.goals.map((goal) =>
        goal.id === updatedGoal.id ? removeCreatedAt(updatedGoal) : goal
      ),
    })),
  deleteGoal: (id) => set((state) => ({
    goals: state.goals.filter((goal) => goal.id !== id),
  })),
  setGoals: (goals) => set({
    goals: goals.map(removeCreatedAt)
  }),
}));

const removeCreatedAt = (goal: any) => {
  const { created_at, ...filteredGoal } = goal;
  return filteredGoal;
};