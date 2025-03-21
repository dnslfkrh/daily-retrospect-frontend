"use client";

import React, { useEffect, useState } from "react";
import { fetchSession } from "../services/fetchSession";
import { motion, AnimatePresence } from "framer-motion";
import FullHeightContainer from "@/shared/components/FullHeightContainer";
import { AnswerType } from "../enums/retrospect.enum";
import LoadingText from "@/shared/components/LoadingText";
import TextAnswer from "../components/TextAnswer";
import ScoreAnswer from "../components/ScoreAnswer";
import SingleChoiceAnswer from "../components/SingleChoiceAnswer";

interface RetrospectQuestion {
  id: number;
  concept: string;
  answer_type: AnswerType;
  question_text: string;
}

interface RetrospectSession {
  id: number;
  created_at: string;
  answers: string[];
  questions: RetrospectQuestion[];
}

export const RetrospectView = () => {
  const [session, setSession] = useState<RetrospectSession | null>(null);
  const [answers, setAnswers] = useState<{ [key: number]: string }>({});
  const [currentIndex, setCurrentIndex] = useState(0);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadSession = async () => {
      try {
        const data = await fetchSession();
        setSession(data);
      } catch (err) {
        setError("회고 데이터를 불러오는 중 오류가 발생했습니다.");
      }
    };
    loadSession();
  }, []);

  const handleAnswerChange = (value: string) => {
    if (!session) return;

    const currentQuestion = session.questions[currentIndex];
    setAnswers((prev) => ({ ...prev, [currentQuestion.id]: value }));
  };

  const handleSubmit = async () => {
    if (!session || currentIndex >= session.questions.length) return;

    try {
      // TODO: API PUT 요청 추가
      // await saveAnswers(session.id, answers);
      console.log(session.id, answers);
      alert("회고가 저장되었습니다.");
    } catch (err) {
      setError("회고 저장 중 오류가 발생했습니다.");
    }
  };

  const handleSkip = () => {
    if (!session || currentIndex >= session.questions.length) return;

    handleAnswerChange("");

    if (currentIndex < session.questions.length - 1) {
      setCurrentIndex((prev) => prev + 1);
    } else {
      handleSubmit();
    }
  };

  const handleNext = () => {
    if (!session) return;

    if (currentIndex < session.questions.length - 1) {
      setCurrentIndex((prev) => prev + 1);
    } else {
      handleSubmit();
    }
  };

  if (!session) {
    return <LoadingText />;
  }

  const currentQuestion = session.questions[currentIndex];

  return (
    <FullHeightContainer>
      <AnimatePresence mode="wait">
        {currentQuestion && (
          <motion.div
            key={currentQuestion.id}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.3 }}
            className="w-full max-w-lg mx-auto"
          >
            <label className="block text-xl font-semibold text-center text-gray-700 dark:text-gray-300">
              {currentQuestion.question_text}
            </label>

            <div className="mt-6">
              {currentQuestion.answer_type === "text" ? (
                <TextAnswer value={answers[currentQuestion.id] || ""} onChange={handleAnswerChange} />
              ) : currentQuestion.answer_type === "score" ? (
                <ScoreAnswer value={answers[currentQuestion.id]} onChange={handleAnswerChange} />
              ) : (
                <SingleChoiceAnswer question={currentQuestion.question_text} value={answers[currentQuestion.id]} onSelect={handleAnswerChange} />
              )}
            </div>

            <button
              className="w-full max-w-lg mx-auto mt-4 p-2 rounded transition-all disabled:opacity-50 bg-black text-white hover:bg-gray-900 dark:bg-gray-700 dark:text-white dark:hover:bg-gray-600"
              onClick={handleNext}
              disabled={!answers[currentQuestion.id]}
            >
              {currentIndex === session.questions.length - 1 ? "저장하기" : "다음"}
            </button>

            <button
              className="w-full max-w-lg mx-auto mt-8 p-2 text-center text-gray-500 dark:text-gray-400 underline"
              onClick={handleSkip}
            >
              건너뛰기
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </FullHeightContainer>
  );
};