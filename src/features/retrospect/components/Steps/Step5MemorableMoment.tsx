"use client";

import { useRetrospectStore } from "@/shared/store/useRetrospect.store";
import { fetchStep5 } from "../../services/fetchStep5";
import BaseTextInputStep from "./shared/BaseTextInputStep";

const Step5MemorableMoment = ({ onNext }: { onNext: any }) => {
  const memorableMoment = useRetrospectStore((state) => state.memorable_moment);
  const setMemorableMoment = useRetrospectStore((state) => state.setMemorableMoment);

  return (
    <BaseTextInputStep
      title="오늘 가장 기억에 남는 순간은?"
      description="오늘 가장 기억에 남는 순간을 적어주세요."
      value={memorableMoment}
      onChange={setMemorableMoment}
      fetchFunction={fetchStep5}
      storeSetter={setMemorableMoment}
      onComplete={onNext}
    />
  );
};

export default Step5MemorableMoment;