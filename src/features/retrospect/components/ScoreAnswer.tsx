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
        className="w-full max-w-lg"
      />
      <span className="text-lg font-semibold mt-2">{value ?? "5"}</span>
    </div>
  );
};

export default ScoreAnswer;
