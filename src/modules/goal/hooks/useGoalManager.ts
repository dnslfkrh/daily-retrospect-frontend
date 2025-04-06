import { useEffect, useState } from "react";
import { fethcActivatedGoals } from "../services/fetchActivatedGoals";
import { fetchFinishedGoals } from "../services/fetchFinishedGoals";
import { fetchCreateGoal } from "../services/fetchCreateGoal";
import { GoalProps } from "../types/Props";

export const useGoalManager = () => {
  const [goals, setGoals] = useState<GoalProps[]>([]);
  const [finishedGoals, setFinishedGoals] = useState<GoalProps[]>([]);
  const [showCompleted, setShowCompleted] = useState(false);

  useEffect(() => {
    const loadGoals = async () => {
      const data = await fethcActivatedGoals();
      setGoals(data);
    };
    loadGoals();
  }, []);

  const addGoal = async (newGoal: GoalProps) => {
    await fetchCreateGoal(newGoal);
    setGoals((prev) => [...prev, { ...newGoal, id: prev.length + 1 }]);
  };

  const toggleCompleted = async () => {
    if (!showCompleted && finishedGoals.length === 0) {
      const data = await fetchFinishedGoals();
      setFinishedGoals(data);
    }
    setShowCompleted((prev) => !prev);
  };

  return {
    goals,
    finishedGoals,
    showCompleted,
    addGoal,
    toggleCompleted,
  };
};
