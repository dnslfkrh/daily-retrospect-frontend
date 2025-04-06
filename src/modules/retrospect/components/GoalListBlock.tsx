import React from "react";

type Props = {
  goals: { id: number; title: string }[];
};

const GoalListBlock = ({ goals }: Props) => (
  <div className="mt-4 p-4 bg-gray-100 dark:bg-gray-800 rounded-lg">
    <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300">진행 중인 목표들</h3>
    <ul className="mt-2 space-y-2 max-h-40 overflow-y-auto">
      {goals.map((goal) => (
        <li key={goal.id} className="p-2 bg-white dark:bg-gray-700 rounded shadow">
          {goal.title}
        </li>
      ))}
    </ul>
  </div>
);

export default GoalListBlock;
