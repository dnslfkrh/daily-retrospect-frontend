import { useState, useEffect } from "react";
import GoalBlock from "./GoalBlock";
import { Goal } from "@/features/goal/types/Props";
import { fetchUpdateGoal } from "../services/fetchUpdateGoal";
import { fetchDeleteGoal } from "../services/fetchDeleteGoal";

type GoalListProps = {
  goals: Goal[];
};

const GoalList = ({ goals: initialGoals }: GoalListProps) => {
  const [goals, setGoals] = useState<Goal[]>(initialGoals);

  useEffect(() => {
    setGoals(initialGoals);
  }, [initialGoals]);

  const handleUpdate = async (updatedGoal: Goal) => {
    await fetchUpdateGoal(updatedGoal);
    console.log("Updated goal:", updatedGoal);
    setGoals((prevGoals) => prevGoals.map((goal) => (goal.id === updatedGoal.id ? updatedGoal : goal)));
  };

  const handleDelete = async (id: number) => {
    await fetchDeleteGoal(id);
    console.log("Deleted goal with ID:", id);
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