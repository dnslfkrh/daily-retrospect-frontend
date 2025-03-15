"use client";

import { useRetrospectStore } from "@/shared/store/useRetrospect.store";
import { useState } from "react";
import { fetchStep3 } from "../../services/fetchStep3";
import { StepContainer } from "./shared/StepContainer";
import { TextAreaInput } from "./shared/TextAreaInput";
import { NextButton } from "./shared/NextButton";

const Step3Mistake = ({ onNext }: { onNext: () => void }) => {
  const setMistake = useRetrospectStore((state) => state.setMistake);
  const [mistake, setMistakeText] = useState("");

  const handleComplete = async () => {
    if (!mistake.trim()) {
      return
    }
    setMistake(mistake);
    await fetchStep3(mistake);
    console.log("Step 3 완료: 오늘 나의 실수 -", mistake);
    onNext();
  };

  return (
    <StepContainer>
      <h2 className="text-lg font-semibold mb-4 text-center text-black">
        오늘 나의 실수는?
      </h2>
      
      {/* <p className="text-sm text-gray-500 mb-4">
        오늘 하루 동안의 실수를 적어보세요.
      </p> */}

      <TextAreaInput
        value={mistake}
        onChange={setMistakeText}
        placeholder="오늘 있었던 실수를 적어주세요."
      />

      <NextButton onClick={handleComplete} disabled={!mistake.trim()} text="다음" />
    </StepContainer>
  );
};

export default Step3Mistake;