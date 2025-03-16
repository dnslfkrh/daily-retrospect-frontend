"use client";

import { useRetrospectStore } from "@/shared/store/useRetrospect.store";
import { useState } from "react";
import { fetchStep2 } from "../services/fetchStep2";
import { StepContainer } from "./shared/StepContainer";
import { NextButton } from "./shared/NextButton";

const KEYWORDS = [
  "성취", "도전", "즐거움", "보람", "고독",
  "성장", "행복", "지침", "실패", "감사",
  "배움", "우울", "기대", "좌절", "설렘",
];

const Step2Keywords = ({ onNext }: { onNext: () => void }) => {
  const setKeywords = useRetrospectStore((state) => state.setKeywords);
  const [selectedKeywords, setSelectedKeywords] = useState<string[]>([]);

  const toggleKeyword = (keyword: string) => {
    setSelectedKeywords((prev) =>
      prev.includes(keyword) ? prev.filter((k) => k !== keyword) : [...prev, keyword]
    );
  };

  const handleComplete = async () => {
    if (selectedKeywords.length === 0) {
      return
    }
    setKeywords(selectedKeywords);
    await fetchStep2(selectedKeywords);
    console.log("Step 2 완료: 오늘을 표현할 수 있는 키워드 -", selectedKeywords);
    onNext();
  };

  return (
    <StepContainer>
      <h2 className="text-lg font-semibold mb-4 text-center text-black">
        오늘을 표현할 수 있는 키워드는?
      </h2>
      <div className="flex flex-wrap gap-2 mb-4 justify-center">
        {KEYWORDS.map((keyword) => (
          <button
            key={keyword}
            onClick={() => toggleKeyword(keyword)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all 
              ${selectedKeywords.includes(keyword) ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-700"}`}
          >
            {keyword}
          </button>
        ))}
      </div>
      <NextButton onClick={handleComplete} disabled={selectedKeywords.length === 0} text="다음" />
    </StepContainer>
  );
};

export default Step2Keywords;