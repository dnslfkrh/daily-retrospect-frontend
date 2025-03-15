"use client";

import { useRetrospectStore } from "@/shared/store/useRetrospect.store";
import { useState } from "react";
import { fetchStep5 } from "../../services/fetchStep5";
import { StepContainer } from "./shared/StepContainer";
import { TextAreaInput } from "./shared/TextAreaInput";
import { NextButton } from "./shared/NextButton";

const Step5MemorableMoment = ({ onNext }: { onNext: () => void }) => {
  const setMemorableMoment = useRetrospectStore((state) => state.setMemorableMoment);
  const [inputValue, setInputValue] = useState("");

  const handleComplete = async () => {
    if (!inputValue.trim()) {
      return
    }
    setMemorableMoment(inputValue);
    await fetchStep5(inputValue);
    console.log("Step 5 완료: 오늘 가장 기억에 남는 순간 -", inputValue);
    onNext();
  };

  return (
    <StepContainer>
      <h2 className="text-lg font-semibold mb-4 text-center text-black">
        오늘 가장 기억에 남는 순간은?
      </h2>
      <TextAreaInput
        value={inputValue}
        onChange={setInputValue}
        placeholder="오늘 기억에 남는 순간을 적어보세요."
      />
      <NextButton onClick={handleComplete} disabled={!inputValue.trim()} text={"다음"} />
    </StepContainer>
  );
};

export default Step5MemorableMoment;