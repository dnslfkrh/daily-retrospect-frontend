"use client";

import { useState, useEffect } from "react";
import { Plus } from "lucide-react";
import { Goal } from "@/features/goal/types/Props";
import GoalModal from "../components/GoalModal";
import GoalList from "../components/GoalList";
import { fethcActivatedGoals } from "../services/fetchActivatedGoals";
import { fetchFinishedGoals } from "../services/fetchFinishedGoals";
import { fetchCreateGoal } from "../services/fetchCreateGoal";

const GoalView = () => {
  const [goals, setGoals] = useState<Goal[]>([]);
  const [finishedGoals, setFinishedGoals] = useState<Goal[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [showCompleted, setShowCompleted] = useState(false);

  const getActivatedGoals = async () => {
    const activatedGoals = await fethcActivatedGoals();
    console.log("Activated goals: ", activatedGoals);
    return activatedGoals;
  };

  const getFinishedGoals = async () => {
    const finishedGoals = await fetchFinishedGoals();
    console.log("finishedGoals: ", finishedGoals);
    return finishedGoals;
  };

  useEffect(() => {
    const loadGoals = async () => {
      const data = await getActivatedGoals();
      setGoals(data);
    };
    loadGoals();
  }, []);

  const handleAdd = async (newGoal: Goal) => {
    await fetchCreateGoal(newGoal);
    setGoals((prev) => [...prev, { ...newGoal, id: prev.length + 1 }]);
  };

  const toggleCompleted = async () => {
    if (!showCompleted && finishedGoals.length === 0) {
      const data = await getFinishedGoals();
      setFinishedGoals(data);
    }
    setShowCompleted((prev) => !prev);
  };

  return (
    <div className="px-4 w-full min-h-screen bg-white dark:bg-gray-900 flex flex-col pb-6 pt-4">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-lg font-semibold text-gray-800 dark:text-white">목표 관리</h1>
        <button onClick={() => setShowModal(true)} className="p-2 text-gray-600 hover:text-black dark:text-gray-400 dark:hover:text-white">
          <Plus size={24} />
        </button>
      </div>

      {/* 진행 중인 목표 리스트 */}
      <h2 className="text-md font-medium text-gray-700 dark:text-gray-300 mb-2">진행 중인 목표</h2>
      <GoalList goals={goals} />

      {/* 지난 목표 보기 토글 버튼 */}
      <button
        onClick={toggleCompleted}
        className="mt-4 text-gray-500 hover:underline dark:text-gray-200"
      >
        {showCompleted ? "숨기기" : "지난 목표 보기"}
      </button>

      {/* 지난 목표 리스트 (토글 상태에 따라 표시) */}
      {showCompleted && (
        <>
          <h2 className="text-md font-medium text-gray-700 dark:text-gray-300 mt-4">지난 목표</h2>
          <GoalList goals={finishedGoals} />
        </>
      )}

      {showModal && <GoalModal goal={null} onClose={() => setShowModal(false)} onSave={handleAdd} />}
    </div>
  );
};

export default GoalView;