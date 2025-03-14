"use client";

import FullHeightContainer from "@/shared/components/FullHeightContainer";
import { useLoadingStore } from "@/shared/store/useLoading.store";
import { useRetrospectStore } from "@/shared/store/useRetrospect.store";
import { AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { fetchTodayRetrospect } from "../services/fetchTodayRetrospect";

export const RetrospectForm = () => {
  const [step, setStep] = useState<number | null>(null);
  const router = useRouter();

  const {
    setMood,
    setHighlight,
    setKeywords,
    setResolution,
    setComment,
    setGoalProgress,
    setGoalFeedback,
    resetRetrospect,
  } = useRetrospectStore();

  const {
    startLoading,
    endLoading,
  } = useLoadingStore();

  useEffect(() => {
    const checkRetrospect = async () => {
      startLoading();
      try {
        const data = await fetchTodayRetrospect();
        console.log("loadRetrospect: ", data);

        const retrospect = data[0];

        if (retrospect) {
          setMood(retrospect.mood);
          setHighlight(retrospect.highlight);
          setKeywords(retrospect.keywords);
          setResolution(retrospect.resolution);
          setComment(retrospect.comment);
          setGoalProgress(retrospect.goalProgress);
          setGoalFeedback(retrospect.goalFeedback);

          if (retrospect.mood === null) {
            setStep(1);
          } else if (!retrospect.highlight) {
            setStep(2);
          } else if (!retrospect?.keywords?.length) {
            setStep(3);
          } else if (!retrospect.resolution) {
            setStep(4);
          } else if (!retrospect.comment) {
            setStep(5);
          } else if (retrospect.goal_progress === null) {
            setStep(6);
          } else {
            setStep(7);
          }
        } else {
          resetRetrospect();
          setStep(1);
        }
      } catch (error) {
        console.error("회고 데이터를 불러오는 중 오류 발생:", error);
      } finally {
        endLoading();
      }
    };

    checkRetrospect();
  }, [router]);

  const handleNext = () => {
    setStep((prev) => (prev !== null ? prev + 1 : 1));
  };

  return (
    <FullHeightContainer>
      <AnimatePresence mode="wait">
        {step === 1 && <Step1Mood onNext={handleNext} />}
        {step === 2 && <Step2Highlight onNext={handleNext} />}
        {step === 3 && <Step3Keywords onNext={handleNext} />}
        {step === 4 && <Step4Resolution onNext={handleNext} />}
        {step === 5 && <Step5Comment onNext={handleNext} />}
        {step === 6 && <Step6GoalProgress onNext={handleNext} />}
        {step === 7 && <Step7GoalFeedback />}
      </AnimatePresence>
    </FullHeightContainer>
  );
};