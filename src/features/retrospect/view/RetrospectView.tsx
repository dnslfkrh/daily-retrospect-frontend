"use client";

import FullHeightContainer from "@/shared/components/FullHeightContainer";
import { useLoadingStore } from "@/shared/store/useLoading.store";
import { useRetrospectStore } from "@/shared/store/useRetrospect.store";
import { AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { fetchTodayRetrospect } from "../../../shared/apis/fetchTodayRetrospect";
import Step1Mood from "../components/Step1Mood";
import Step2Keywords from "../components/Step2Keywords";
import Step3Mistake from "../components/Step3Mistake";
import Step4Achievement from "../components/Step4Achievement";
import Step5MemorableMoment from "../components/Step5MemorableMoment";
import Step6MemorableInteraction from "../components/Step6MemorableInteraction";
import { a } from "framer-motion/client";

const RetrospectView = () => {
  const [step, setStep] = useState<number | null>(null);
  const router = useRouter();

  const {
    setMood,
    setKeywords,
    setMistake,
    setAchievement,
    setMemorableMoment,
    setMemorableInteraction,
    resetRetrospect,
  } = useRetrospectStore();

  const { startLoading, endLoading } = useLoadingStore();

  useEffect(() => {
    const checkRetrospect = async () => {
      startLoading();
      try {
        const data = await fetchTodayRetrospect();
        console.log("loadRetrospect: ", data);

        if (data) {
          setMood(data.mood);
          setKeywords(data.keywords);
          setMistake(data.mistake);
          setAchievement(data.achievement);
          setMemorableMoment(data.memorable_moment);
          setMemorableInteraction(data.memorable_interaction);

          if (!data.mood) {
            setStep(1);
          } else if (!data.keywords?.length) {
            setStep(2);
          } else if (!data.mistake) {
            setStep(3);
          } else if (!data.achievement) {
            setStep(4);
          } else if (!data.memorable_moment) {
            setStep(5);
          } else if (!data.memorable_interaction) {
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

  useEffect(() => {
    if (step === 7) {
      setTimeout(() => {
        alert("오늘의 회고가 완료되었습니다.");
        router.push("/home");
      }, 0);
    }
  }, [step, router]);

  const handleNext = () => {
    setStep((prev) => {
      const nextStep = prev !== null ? prev + 1 : 1;
      if (nextStep === 7) {
        router.push("/home");
      }
      return nextStep;
    });
  };

  return (
    <FullHeightContainer>
      <AnimatePresence mode="wait">
        {step === 1 && <Step1Mood onNext={handleNext} />}
        {step === 2 && <Step2Keywords onNext={handleNext} />}
        {step === 3 && <Step3Mistake onNext={handleNext} />}
        {step === 4 && <Step4Achievement onNext={handleNext} />}
        {step === 5 && <Step5MemorableMoment onNext={handleNext} />}
        {step === 6 && <Step6MemorableInteraction onNext={handleNext} />}
      </AnimatePresence>
    </FullHeightContainer>
  );
};

export default RetrospectView;