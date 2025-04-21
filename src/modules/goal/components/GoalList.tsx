import { useState, useEffect } from "react";
import GoalBlock from "./GoalBlock";
import { fetchUpdateGoal } from "../services/fetchUpdateGoal";
import { fetchDeleteGoal } from "../services/fetchDeleteGoal";
import { GoalListProps } from "../types/goal-list";
import { GoalProps } from "../types/goal";

const GoalList = ({ goals: initialGoals }: GoalListProps) => {
  const [goals, setGoals] = useState<GoalProps[]>(initialGoals);

  useEffect(() => {
    setGoals(initialGoals);
  }, [initialGoals]);

  const handleUpdate = async (updatedGoal: GoalProps) => {
    await fetchUpdateGoal(updatedGoal);
    setGoals((prevGoals) => prevGoals.map((goal) => (goal.id === updatedGoal.id ? updatedGoal : goal)));
  };

  const handleDelete = async (id: number) => {
    await fetchDeleteGoal(id);
    setGoals((prevGoals) => prevGoals.filter((goal) => goal.id !== id));
  };

  return (
    <div className="space-y-4">
      {goals.length > 0 ? (
        goals.map((goal) => (
          <GoalBlock key={goal.id} goal={goal} onUpdate={handleUpdate} onDelete={handleDelete} />
        ))
      ) : (
        <p className="text-gray-500 dark:text-gray-400">등록된 목표가 없습니다.</p>
      )}
    </div>
  );
};

export default GoalList;