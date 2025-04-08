import { useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { fetchSaveAnswer } from "../services/fetchSaveAnswer";
import { RetrospectSessionProps } from "../types/session";

export const useRetrospectNavigation = (
  session: RetrospectSessionProps | null,
  answers: { [key: number]: string }
) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const router = useRouter();

  const handleAnswerChange = (value: string) => {
    const currentQuestion = session?.questions[currentIndex];
    if (!currentQuestion) {
      return;
    }
    return { [currentQuestion.id]: value };
  };

  const handleNavigation = async (skip = false) => {
    if (!session) {
      return;
    }
    const currentQuestion = session.questions[currentIndex];
    await fetchSaveAnswer({
      sessionId: session.id,
      questionId: currentQuestion.id,
      answer: skip ? "" : answers[currentQuestion.id],
    });

    if (currentIndex < session.questions.length - 1) {
      setCurrentIndex((prev) => prev + 1);
    } else {
      toast.success("회고가 저장되었습니다.");
      setTimeout(() => router.push("/home"), 1500);
    }
  };

  return { currentIndex, handleAnswerChange, handleNavigation };
};
