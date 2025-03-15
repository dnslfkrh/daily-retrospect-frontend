"use client";

import { useRetrospectStore } from "@/shared/store/useRetrospect.store";
import { useState } from "react";
import { fetchStep4 } from "../../services/fetchStep4";
import { StepContainer } from "./shared/StepContainer";
import { TextAreaInput } from "./shared/TextAreaInput";
import { NextButton } from "./shared/NextButton";

const Step4Achievement = ({ onNext }: { onNext: () => void }) => {
  const setAchievement = useRetrospectStore((state) => state.setAchievement);
  const [archievement, setArchievement] = useState("");

  const handleComplete = async () => {
    if (!archievement.trim()) {
      return;
    }
    setAchievement(archievement);
    await fetchStep4(archievement);
    console.log("Step 4 완료: 오늘 나의 성취 -", archievement);
    onNext();
  };

  return (
    <StepContainer>
      <h2 className="text-lg font-semibold mb-4 text-center text-black">
        오늘 나의 성취는?
      </h2>
      
      {/* <p className="text-sm text-gray-500 mb-4">
        오늘 있었던 뿌듯한 일을 적어보세요.
      </p> */}

      <TextAreaInput
        value={archievement}
        onChange={setArchievement}
        placeholder="오늘의 성취를 적어보세요."
      />
      <NextButton onClick={handleComplete} disabled={!archievement.trim()} text={"다음"} />
    </StepContainer>
  );
};

export default Step4Achievement;