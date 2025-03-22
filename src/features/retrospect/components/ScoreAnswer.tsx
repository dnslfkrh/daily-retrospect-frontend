import React from "react";

const ScoreAnswer = ({ value, onChange }: { value?: string; onChange: (v: string) => void }) => {
  return (
    <div className="flex flex-col items-center mt-4">
      <input
        type="range"
        min="1"
        max="10"
        value={value ?? "5"}
        onChange={(e) => onChange(e.target.value)}
        className="w-full max-w-lg appearance-none h-2 bg-gray-300 dark:bg-gray-700 rounded-lg outline-none transition-all
                   [&::-webkit-slider-thumb]:appearance-none
                   [&::-webkit-slider-thumb]:w-4
                   [&::-webkit-slider-thumb]:h-4
                   [&::-webkit-slider-thumb]:bg-gray-900
                   [&::-webkit-slider-thumb]:dark:bg-gray-600
                   [&::-webkit-slider-thumb]:rounded-full
                   [&::-webkit-slider-thumb]:cursor-pointer"
      />
      <span className="text-lg font-semibold mt-2 text-gray-900 dark:text-gray-300">{value ?? "5"}</span>
    </div>
  );
};

export default ScoreAnswer;