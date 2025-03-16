"use client";

import { useRetrospectStore } from "@/shared/store/useRetrospect.store";
import { fetchStep3 } from "../services/fetchStep3";
import BaseTextInputStep from "./shared/BaseTextInputStep";

const Step3Mistake = ({ onNext }: { onNext: any }) => {
  const mistake = useRetrospectStore((state) => state.mistake);
  const setMistake = useRetrospectStore((state) => state.setMistake);

  return (
    <BaseTextInputStep
      title="오늘 나의 실수는?"
      description="오늘 후회되거나 아쉬웠던 일을 적어주세요."
      value={mistake}
      onChange={setMistake}
      fetchFunction={fetchStep3}
      storeSetter={setMistake}
      onComplete={onNext}
    />
  );
};

export default Step3Mistake;