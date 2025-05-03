import { useEffect, useState } from "react";
import { fetchActivatedGoals } from "../../../shared/services/fetchActivatedGoals";
import { fetchFinishedGoals } from "../services/fetchFinishedGoals";
import { fetchCreateGoal } from "../services/fetchCreateGoal";
import { GoalProps } from "../types/goal";
import { useRouter } from "next/navigation";

export const useGoalManager = () => {
  const [goals, setGoals] = useState<GoalProps[]>([]);
  const [finishedGoals, setFinishedGoals] = useState<GoalProps[]>([]);
  const [showCompleted, setShowCompleted] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const loadGoals = async () => {
      const data = await fetchActivatedGoals();
      setGoals(data);
    };
    loadGoals();
  }, []);

  const addGoal = async (newGoal: GoalProps) => {
    const goal = await fetchCreateGoal(newGoal);
    setGoals((prev) => [...prev, { ...newGoal, id: goal.id }]);
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
