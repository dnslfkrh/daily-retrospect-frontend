"use client";

import { GoalProps } from "@/modules/goal/types/Props";
import { useState } from "react";

const GoalModal = ({ goal, onClose, onSave }: { goal: GoalProps | null; onClose: () => void; onSave: (data: GoalProps) => void }) => {
  const [title, setTitle] = useState(goal?.title || "");
  const [description, setDescription] = useState(goal?.description || "");
  const [startDate, setStartDate] = useState(goal?.start_date || "");
  const [endDate, setEndDate] = useState(goal?.end_date || "");

  const handleSave = () => {
    onSave({ ...goal, title, description, start_date: startDate, end_date: endDate } as GoalProps);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
      <div className="bg-white dark:bg-gray-800 rounded-lg p-6 w-full max-w-md">
        <h2 className="text-lg font-semibold mb-4 text-black dark:text-white">{goal ? "목표 수정" : "새 목표 추가"}</h2>
        <input type="text" placeholder="목표 제목" value={title} onChange={(e) => setTitle(e.target.value)} className="w-full border p-2 rounded mb-2 dark:bg-gray-700 dark:text-white dark:border-gray-600" />
        <textarea placeholder="설명(선택)" value={description} onChange={(e) => setDescription(e.target.value)} className="w-full border p-2 rounded mb-2 dark:bg-gray-700 dark:text-white dark:border-gray-600" />
        <input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} className="w-full border p-2 rounded mb-2 dark:bg-gray-700 dark:text-white dark:border-gray-600" />
        <input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} className="w-full border p-2 rounded mb-2 dark:bg-gray-700 dark:text-white dark:border-gray-600" />
        <div className="flex justify-end gap-2">
          <button onClick={onClose} className="text-gray-500 dark:text-gray-400 px-4 py-2">취소</button>
          <button onClick={handleSave} className="bg-black text-white px-4 py-2 rounded dark:bg-gray-600 dark:text-gray-200">{goal ? "수정" : "저장"}</button>
        </div>
      </div>
    </div>
  );
};

export default GoalModal;