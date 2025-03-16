"use client";

import { Pencil, Trash2 } from "lucide-react";

type GoalProps = {
  goal: {
    id: number;
    title: string;
    description: string | null;
    start_date: string;
    end_date: string;
    completed: boolean;
  };
};

const GoalBlock = ({ goal }: GoalProps) => {
  return (
    <div className="relative bg-white px-6 py-4 rounded-lg shadow-md border border-gray-200">
      {/* 수정 & 삭제 아이콘 우측 상단 배치 */}
      <div className="absolute top-2 right-2 flex space-x-2">
        <button className="text-gray-500 hover:text-gray-700">
          <Pencil size={18} />
        </button>
        <button className="text-red-500 hover:text-red-700">
          <Trash2 size={18} />
        </button>
      </div>

      {/* 목표 제목 */}
      <h2 className="text-lg font-semibold">{goal.title}</h2>

      {/* 설명 공간을 항상 일정하게 유지 */}
      <p className="text-sm text-gray-600 min-h-[15px]">
        {goal.description ? goal.description : " "}
      </p>

      {/* 목표 기간 */}
      <p className="text-xs text-gray-500">
        {goal.start_date} ~ {goal.end_date}
      </p>
    </div>
  );
};

export default GoalBlock;