"use client";

import { useState } from "react";
import { StepContainer } from "./StepContainer";
import { TextAreaInput } from "./TextAreaInput";
import { NextButton } from "./NextButton";

const BaseTextInputStep = ({
  title,
  description,
  placeholder = "오늘 나는..",
  value,
  onChange,
  onComplete,
  fetchFunction,
  storeSetter,
  isLast = false
}: {
  title: string,
  description: string,
  placeholder?: string,
  value: string,
  onChange: (value: string) => void,
  onComplete: () => void,
  fetchFunction: (value: string) => Promise<void>,
  storeSetter: (value: string) => void,
  isLast?: boolean
}) => {
  const [inputValue, setInputValue] = useState(value || "");

  const handleComplete = async () => {
    if (!inputValue.trim()) return;
    storeSetter(inputValue);
    await fetchFunction(inputValue);
    console.log(`${title} 완료 -`, inputValue);
    onComplete();
  };

  return (
    <StepContainer>
      <h2 className="text-lg font-semibold text-center text-black mb-1">{title}</h2>
      <p className="text-sm text-gray-500 mb-4">{description}</p>
      <TextAreaInput value={inputValue} onChange={setInputValue} placeholder={placeholder} />
      <NextButton onClick={handleComplete} disabled={!inputValue.trim()} text={isLast ? "완료" : "다음"} />
    </StepContainer>
  );
};

export default BaseTextInputStep;