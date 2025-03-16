"use client";

import { useEffect, useState } from "react";
import { Plus } from "lucide-react";
import GoalBlock from "../components/GoalBlock";
import GoalModal from "../components/GoalModal";
import testGoals from "../test/data";

type Goal = {
  id: number;
  title: string;
  description: string | null;
  start_date: string;
  end_date: string;
  completed: boolean;
};

const fetchActiveGoals = async (): Promise<Goal[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(testGoals.filter((goal) => new Date(goal.end_date) >= new Date()));
    }, 500);
  });
};

const fetchFinishedGoals = async (): Promise<Goal[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(testGoals.filter((goal) => new Date(goal.end_date) < new Date()));
    }, 500);
  });
};

const GoalView = () => {
  const [activeGoals, setActiveGoals] = useState<Goal[] | null>(null);
  const [completedGoals, setCompletedGoals] = useState<Goal[] | null>(null);
  const [showCompleted, setShowCompleted] = useState(false);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const loadGoals = async () => {
      const data = await fetchActiveGoals();
      setActiveGoals(data);
    };

    loadGoals();
  }, []);

  const loadCompletedGoals = async () => {
    if (completedGoals === null) {
      const data = await fetchFinishedGoals();
      setCompletedGoals(data);
    }
    setShowCompleted((prev) => (completedGoals?.length === 0 ? true : !prev));
  };

  return (
    <div className="px-4 w-full min-h-screen bg-white dark:bg-gray-900 flex flex-col relative pb-6 pt-4">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-lg font-semibold text-gray-800 dark:text-white">진행 중인 목표</h1>
        <button onClick={() => setShowModal(true)} className="p-2 text-gray-600 hover:text-black dark:text-gray-400 dark:hover:text-white">
          <Plus size={24} />
        </button>
      </div>

      <div className="flex-grow space-y-4">
        {activeGoals === null ? (
          <p className="text-gray-500 dark:text-gray-400 text-sm">목표를 가져오는 중...</p>
        ) : activeGoals.length === 0 ? (
          <p className="text-gray-500 dark:text-gray-400 text-sm">목표가 없습니다.</p>
        ) : (
          activeGoals.map((goal) => <GoalBlock key={goal.id} goal={goal} />)
        )}
      </div>

      <button
        onClick={loadCompletedGoals}
        className="mt-6 w-full text-center text-gray-600 hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-200 underline"
      >
        {showCompleted ? "숨기기" : "지난 목표 보기"}
      </button>

      {showCompleted && (
        <div className="mt-4 space-y-4">
          <h1 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">지난 목표</h1>
          {completedGoals === null ? (
            <p className="text-gray-500 dark:text-gray-400 text-sm">목표를 가져오는 중...</p>
          ) : completedGoals.length === 0 ? (
            <p className="text-gray-500 dark:text-gray-400 text-sm">지난 목표가 없습니다.</p>
          ) : (
            completedGoals.map((goal) => <GoalBlock key={goal.id} goal={goal} />)
          )}
        </div>
      )}

      {showModal && <GoalModal onClose={() => setShowModal(false)} />}
    </div>
  );
};

export default GoalView;