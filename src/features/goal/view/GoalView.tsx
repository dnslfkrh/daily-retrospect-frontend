"use client";

import { useEffect, useState } from "react";
import GoalBlock from "../components/GoalBlock";
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
  const [activeGoals, setActiveGoals] = useState<Goal[]>([]);
  const [completedGoals, setCompletedGoals] = useState<Goal[]>([]);
  const [showCompleted, setShowCompleted] = useState(false);

  useEffect(() => {
    const loadGoals = async () => {
      const data = await fetchActiveGoals();
      setActiveGoals(data);
    };
    loadGoals();
  }, []);

  const loadCompletedGoals = async () => {
    if (completedGoals.length === 0) {
      const data = await fetchFinishedGoals();
      setCompletedGoals(data);
    }
    setShowCompleted((prev) => !prev);
  };

  return (
    <div className="p-4 max-w-lg mx-auto pb-24">
      <h1 className="text-lg font-semibold text-gray-800 mb-4">진행 중인 목표</h1>
      <div className="space-y-4">
        {activeGoals.map((goal) => (
          <GoalBlock key={goal.id} goal={goal} />
        ))}
      </div>

      {/* 지난 목표 보기 버튼 */}
      <button
        onClick={loadCompletedGoals}
        className="mt-6 w-full text-center text-gray-600 hover:text-gray-800 underline"
      >
        {showCompleted ? "숨기기" : "지난 목표 보기"}
      </button>

      {/* 지난 목표 리스트 */}
      {showCompleted && (
        <div className="mt-4 space-y-4">
          <h1 className="text-lg font-semibold text-grey-800 mb-4">지난 목표</h1>
          {completedGoals.length > 0 ? (
            completedGoals.map((goal) => <GoalBlock key={goal.id} goal={goal} />)
          ) : (
            <p className="text-gray-500 text-sm">지난 목표가 없습니다.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default GoalView;