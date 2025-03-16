"use client";

import { useRetrospectStore } from "@/shared/store/useRetrospect.store";
import { useState } from "react";
import { fetchStep1 } from "../services/fetchStep1";
import { StepContainer } from "./shared/StepContainer";

const MOODS = [
  { emoji: "😃", mood: "HAPPY" },
  { emoji: "😊", mood: "RELAXED" },
  { emoji: "😐", mood: "NEUTRAL" },
  { emoji: "😢", mood: "SAD" },
  { emoji: "😡", mood: "ANGRY" },
];

const Step1Mood = ({ onNext }: { onNext: () => void }) => {
  const setMood = useRetrospectStore((state) => state.setMood);
  const [selectedMood, setSelectedMood] = useState<string | null>(null);

  const handleComplete = async (emoji: string, mood: string) => {
    setMood(mood);
    setSelectedMood(emoji);
    await fetchStep1(mood);
    console.log("Step 1 완료: 기분 -", mood);
    onNext();
  };

  return (
    <StepContainer>
      <h2 className="text-lg font-semibold mb-4 text-black dark:text-white text-center">오늘 나의 기분은?</h2>

      <div className="grid grid-cols-5 gap-3">
        {MOODS.map(({ emoji, mood }) => (
          <button
            key={emoji}
            className={`flex items-center justify-center text-2xl w-12 h-12 border border-gray-300 rounded-lg transition ${selectedMood === emoji ? "bg-gray-300 border-gray-500 dark:bg-gray-600 dark:border-gray-400" : "bg-white dark:bg-gray-800"
              }`}
            onClick={() => handleComplete(emoji, mood)}
          >
            {emoji}
          </button>
        ))}
      </div>
    </StepContainer>
  );
};

export default Step1Mood;