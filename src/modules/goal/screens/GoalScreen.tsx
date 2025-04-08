"use client";

import { useState } from "react";
import { Plus } from "lucide-react";
import GoalModal from "../components/GoalModal";
import GoalList from "../components/GoalList";
import { useGoalManager } from "../hooks/useGoalManager";

const GoalScreen = () => {
  const {
    goals,
    finishedGoals,
    showCompleted,
    addGoal,
    toggleCompleted,
  } = useGoalManager();
  const [showModal, setShowModal] = useState(false);

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
      <button onClick={toggleCompleted} className="mt-4 text-gray-500 hover:underline dark:text-gray-200">
        {showCompleted ? "숨기기" : "지난 목표 보기"}
      </button>

      {/* 지난 목표 리스트 */}
      {showCompleted && (
        <>
          <h2 className="text-md font-medium text-gray-700 dark:text-gray-300 mt-4">지난 목표</h2>
          <GoalList goals={finishedGoals} />
        </>
      )}

      {showModal && (
        <GoalModal goal={null} onClose={() => setShowModal(false)} onSave={addGoal} />
      )}
    </div>
  );
};

export default GoalScreen;
