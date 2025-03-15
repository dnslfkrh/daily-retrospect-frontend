"use client";

import { useRetrospectStore } from "@/shared/store/useRetrospect.store";
import { useState } from "react";
import { StepContainer } from "./shared/StepContainer";
import { TextAreaInput } from "./shared/TextAreaInput";
import { NextButton } from "./shared/NextButton";
import { fetchStep6 } from "../../services/fetchStep6";

const Step6MemorableInteraction = ({ onNext }: { onNext: () => void }) => {
  const setMemorableInteraction = useRetrospectStore((state) => state.setMemorableInteraction);
  const [inputValue, setInputValue] = useState("");

  const handleComplete = async () => {
    if (!inputValue.trim()) return;
    setMemorableInteraction(inputValue);
    await fetchStep6(inputValue);
    console.log("Step 6 완료: 오늘 만난 사람이나 인상 깊었던 대화 -", inputValue);
    onNext();
  };

  return (
    <StepContainer>
      <h2 className="text-lg font-semibold mb-4 text-center text-black">
        오늘 인상깊었던 사람이나 대화는?
      </h2>

      <TextAreaInput
        value={inputValue}
        onChange={setInputValue}
        placeholder="오늘 기억에 남는 대화나 만난 사람을 적어보세요."
      />

      <NextButton onClick={handleComplete} disabled={!inputValue.trim()} text={"완료"} />
    </StepContainer>
  );
};

export default Step6MemorableInteraction;