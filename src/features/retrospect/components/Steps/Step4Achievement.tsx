"use client";

import { useRetrospectStore } from "@/shared/store/useRetrospect.store";
import { fetchStep4 } from "../../services/fetchStep4";
import BaseTextInputStep from "./shared/BaseTextInputStep";

const Step4Achievement = ({ onNext }: { onNext: any }) => {
  const achievement = useRetrospectStore((state) => state.achievement);
  const setAchievement = useRetrospectStore((state) => state.setAchievement);

  return (
    <BaseTextInputStep
      title="오늘 나의 성취는?"
      description="오늘 기쁘거나 뿌듯했던 일을 적어주세요."
      value={achievement}
      onChange={setAchievement}
      fetchFunction={fetchStep4}
      storeSetter={setAchievement}
      onComplete={onNext}
    />
  );
};

export default Step4Achievement;