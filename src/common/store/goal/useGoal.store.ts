import { GoalProps } from '@/modules/goal/types/goal';
import { create } from 'zustand';

interface GoalState {
  goals: GoalProps[];
  addGoal: (goal: GoalProps) => void;
  updateGoal: (updatedGoal: GoalProps) => void;
  deleteGoal: (id: number) => void;
  setGoals: (goals: GoalProps[]) => void;
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

const removeCreatedAt = (goal: GoalProps): GoalProps => {
  const { ...filteredGoal } = goal;
  return filteredGoal;
};
