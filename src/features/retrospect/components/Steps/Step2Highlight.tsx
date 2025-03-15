"use client";

import { useRetrospectStore } from "@/shared/store/useRetrospect.store";
import { useState } from "react";
import { fetchStep2 } from "../../services/fetchStep2";
import { StepContainer } from "./shared/StepContainer";
import { TextAreaInput } from "./shared/TextAreaInput";
import { NextButton } from "./shared/NextButton";

const Step2Highlight = ({ onNext }: { onNext: () => void }) => {
  const setHighlight = useRetrospectStore((state) => state.setHighlight);
  const [inputValue, setInputValue] = useState("");

  const handleComplete = async () => {
    if (!inputValue.trim()) return;
    setHighlight(inputValue);
    await fetchStep2(inputValue);
    console.log("Step 2 완료: 인상적이었던 일 -", inputValue);
    onNext();
  };

  return (
    <StepContainer>
      <h2 className="text-lg font-semibold mb-4 text-center">
        오늘 가장 인상적이었던 일은 무엇인가요?
      </h2>

      <TextAreaInput
        value={inputValue}
        onChange={setInputValue}
        placeholder="오늘 가장 기억에 남는 일을 적어보세요."
      />

      <NextButton onClick={handleComplete} disabled={!inputValue.trim()} text="다음" />
    </StepContainer>
  );
};

export default Step2Highlight;