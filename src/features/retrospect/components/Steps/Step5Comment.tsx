"use client";

import { useRetrospectStore } from "@/shared/store/useRetrospect.store";
import { useState } from "react";
import { fetchStep5 } from "../../services/fetchStep5";
import { StepContainer } from "./shared/StepContainer";
import { TextAreaInput } from "./shared/TextAreaInput";
import { NextButton } from "./shared/NextButton";

const Step5Comment = ({ onNext }: { onNext: () => void }) => {
  const setComment = useRetrospectStore((state) => state.setComment);
  const [inputValue, setInputValue] = useState("");

  const handleComplete = async () => {
    if (!inputValue.trim()) return;
    setComment(inputValue);
    await fetchStep5(inputValue);
    console.log("Step 5 완료: 오늘의 나에게 한마디 -", inputValue);
    onNext();
  };

  return (
    <StepContainer>
      <h2 className="text-lg font-semibold mb-4 text-center">
        오늘의 나에게 한마디를 남겨보세요.
      </h2>
      <TextAreaInput
        value={inputValue}
        onChange={setInputValue}
        placeholder="오늘의 나에게 하고 싶은 말을 적어보세요."
      />
      <NextButton onClick={handleComplete} disabled={!inputValue.trim()} text={""} />
    </StepContainer>
  );
};

export default Step5Comment;
