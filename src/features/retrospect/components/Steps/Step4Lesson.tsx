"use client";

import { useRetrospectStore } from "@/shared/store/useRetrospect.store";
import { useState } from "react";
import { fetchStep4 } from "../../services/fetchStep4";
import { StepContainer } from "./shared/StepContainer";
import { TextAreaInput } from "./shared/TextAreaInput";
import { NextButton } from "./shared/NextButton";

const Step4Lesson = ({ onNext }: { onNext: () => void }) => {
  const setLesson = useRetrospectStore((state) => state.setLesson);
  const [inputValue, setInputValue] = useState("");

  const handleComplete = async () => {
    if (!inputValue.trim()) {
      return
    };
    setLesson(inputValue);
    await fetchStep4(inputValue);
    console.log("Step 4 완료: 오늘의 나에게 한마디 -", inputValue);
    onNext();
  };

  return (
    <StepContainer>
      <h2 className="text-lg font-semibold mb-4 text-center">
        오늘 느낀 교훈이 있나요?
      </h2>
      <TextAreaInput
        value={inputValue}
        onChange={setInputValue}
        placeholder="오늘의 교훈을 적어보세요."
      />
      <NextButton onClick={handleComplete} disabled={!inputValue.trim()} text={""} />
    </StepContainer>
  );
};

export default Step4Lesson;