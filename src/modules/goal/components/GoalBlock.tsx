"use client";

import { Pencil, Trash2 } from "lucide-react";
import { useState } from "react";
import GoalModal from "./GoalModal";
import { Goal } from "../types/Type";

const GoalBlock = ({ goal, onUpdate, onDelete }: Goal) => {
  const [isEditing, setIsEditing] = useState(false);

  return (
    <div className="relative bg-white px-6 py-4 rounded-lg border border-gray-200 dark:bg-gray-800 dark:border-gray-700">
      <div className="absolute top-2 right-2 flex space-x-2">
        <button onClick={() => setIsEditing(true)} className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300">
          <Pencil size={18} />
        </button>
        <button onClick={() => onDelete(goal.id)} className="text-red-500 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300">
          <Trash2 size={18} />
        </button>
      </div>
      <h2 className="text-lg text-black font-semibold dark:text-white">{goal.title}</h2>
      <p className="text-sm text-gray-600 min-h-[15px] dark:text-gray-300">{goal.description || " "}</p>
      <p className="text-xs text-gray-500 dark:text-gray-400">{goal.start_date} ~ {goal.end_date}</p>
      {isEditing && <GoalModal goal={goal} onClose={() => setIsEditing(false)} onSave={onUpdate} />}
    </div>
  );
};

export default GoalBlock;