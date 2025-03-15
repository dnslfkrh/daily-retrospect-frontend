"use client";

import { useRetrospectStore } from "@/shared/store/useRetrospect.store";
import { useState } from "react";
import { fetchStep3 } from "../../services/fetchStep3";
import { StepContainer } from "./shared/StepContainer";
import { NextButton } from "./shared/NextButton";

const KEYWORDS = [
  "성취", "도전", "즐거움", "보람", "고독",
  "성장", "행복", "지침", "실패", "감사",
  "배움", "우울", "기대", "좌절", "설렘",
];

const KeywordSelector = ({ selectedKeywords, toggleKeyword }: {
  selectedKeywords: string[];
  toggleKeyword: (word: string) => void;
}) => (
  <div className="grid grid-cols-3 gap-2">
    {KEYWORDS.map((word) => (
      <button
        key={word}
        className={`px-4 py-2 border rounded-lg text-sm transition ${selectedKeywords.includes(word)
          ? "bg-blue-500 text-white"
          : "border-gray-300 bg-white"
          }`}
        onClick={() => toggleKeyword(word)}
      >
        {word}
      </button>
    ))}
  </div>
);

const Step3Keywords = ({ onNext }: { onNext: () => void }) => {
  const setKeywords = useRetrospectStore((state) => state.setKeywords);
  const [selectedKeywords, setSelectedKeywords] = useState<string[]>([]);

  const toggleKeyword = (word: string) => {
    setSelectedKeywords((prev) =>
      prev.includes(word) ? prev.filter((w) => w !== word) : prev.length < 5 ? [...prev, word] : prev
    );
  };

  const handleComplete = async () => {
    if (selectedKeywords.length === 0) return;
    setKeywords(selectedKeywords);
    await fetchStep3(selectedKeywords);
    console.log("Step 3 완료: 키워드 -", selectedKeywords);
    onNext();
  };

  return (
    <StepContainer>
      <h2 className="text-lg font-semibold mb-4 text-center">
        오늘을 표현하는 단어를 선택하세요.
      </h2>
      <p className="text-sm text-gray-500 mb-4">최대 5개까지 선택 가능합니다.</p>

      <KeywordSelector selectedKeywords={selectedKeywords} toggleKeyword={toggleKeyword} />

      <NextButton onClick={handleComplete} disabled={selectedKeywords.length === 0} text={""} />
    </StepContainer>
  );
};

export default Step3Keywords;