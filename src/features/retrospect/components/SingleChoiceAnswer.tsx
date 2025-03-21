import React from "react";

const choiceOptions: { [key: string]: string[] } = {
  "오늘의 날씨는?": ["☀️", "🌤️", "⛈️", "❄️"],
  "지금 나의 컨디션은?": ["💪", "😐", "😴", "🤒"],
  "오늘 나의 기분은?": ["😀", "😢", "😡", "😌"],
};

const SingleChoiceAnswer = ({
  question,
  value,
  onSelect,
}: {
  question: string;
  value?: string;
  onSelect: (v: string) => void;
}) => {
  const options = choiceOptions[question] || ["✅", "❌"];

  return (
    <div className="flex justify-center space-x-2">
      {options.map((option) => (
        <button
          key={option}
          className={`p-3 border rounded transition-all text-3xl ${value === option
            ? "bg-black text-white dark:bg-gray-700 dark:text-white border-gray-600"
            : "bg-white text-black dark:bg-gray-800 dark:text-gray-300 border-gray-600"
            }`}
          onClick={() => onSelect(option)}
        >
          {option}
        </button>
      ))}
    </div>
  );
};

export default SingleChoiceAnswer;
