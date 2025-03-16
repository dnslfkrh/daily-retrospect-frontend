"use client";

import { useRetrospectStore } from "@/shared/store/useRetrospect.store";
import { fetchStep6 } from "../services/fetchStep6";
import BaseTextInputStep from "./shared/BaseTextInputStep";

const Step6MemorableInteraction = ({ onNext }: { onNext: () => void }) => {
  const memorableInteraction = useRetrospectStore((state) => state.memorable_interaction);
  const setMemorableInteraction = useRetrospectStore((state) => state.setMemorableInteraction);

  return (
    <BaseTextInputStep
      title="오늘 만난 사람이나 인상 깊었던 대화는?"
      description="오늘 만난 사람이나 인상 깊었던 대화를 적어주세요."
      value={memorableInteraction}
      onChange={setMemorableInteraction}
      fetchFunction={fetchStep6}
      storeSetter={setMemorableInteraction}
      onComplete={onNext}
      isLast={true}
    />
  );
};

export default Step6MemorableInteraction;