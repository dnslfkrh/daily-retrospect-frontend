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
import { fetchSaveAnswer } from "../services/fetchSaveAnswer";

interface RetrospectQuestion {
  id: number;
  concept: string;
  answer_type: AnswerType;
  question_text: string;
}

interface RetrospectAnswer {
  id: number;
  answer_type: AnswerType;
  answer: string;
  created_at: string;
  updated_at: string;
}

interface Goal {
  id: number;
  title: string;
}

interface RetrospectSession {
  id: number;
  created_at: string;
  answers: RetrospectAnswer[];
  questions: RetrospectQuestion[];
  goals: Goal[];
}

export const RetrospectView = () => {
  const [session, setSession] = useState<RetrospectSession | null>(null);
  const [answers, setAnswers] = useState<{ [key: number]: string }>({});
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const loadSession = async () => {
      const data: RetrospectSession = await fetchSession();
      console.log(data);
      setSession(data);

      const initialAnswers = data.questions.reduce((acc, question, index) => {
        const matchingAnswer = data.answers[index];
        return {
          ...acc,
          [question.id]: matchingAnswer?.answer || "",
        };
      }, {} as { [key: number]: string });

      setAnswers(initialAnswers);
    };

    loadSession();
  }, []);

  const handleAnswerChange = (value: string) => {
    if (!session) {
      return;
    }

    const currentQuestion = session.questions[currentIndex];
    setAnswers((prev) => ({ ...prev, [currentQuestion.id]: value }));
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
      alert("회고가 저장되었습니다.");
    }
  };

  if (!session) return <LoadingText />;

  const currentQuestion = session.questions[currentIndex];
  const isGoalQuestion = currentQuestion.concept === "goal";

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

            {isGoalQuestion && session.goals.length > 0 && (
              <div className="mt-4 p-4 bg-gray-100 dark:bg-gray-800 rounded-lg">
                <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300">진행 중인 목표들</h3>
                <ul className="mt-2 space-y-2 max-h-40 overflow-y-auto">
                  {session.goals.map((goal) => (
                    <li key={goal.id} className="p-2 bg-white dark:bg-gray-700 rounded shadow">
                      {goal.title}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <div className="mt-6">
              {
                {
                  [AnswerType.TEXT]: <TextAnswer value={answers[currentQuestion.id] || ""} onChange={handleAnswerChange} />,
                  [AnswerType.SCORE]: <ScoreAnswer value={answers[currentQuestion.id] || ""} onChange={handleAnswerChange} />,
                  [AnswerType.SINGLE_CHOICE]: <SingleChoiceAnswer question={currentQuestion.question_text} value={answers[currentQuestion.id] || ""} onSelect={handleAnswerChange} />,
                  [AnswerType.MULTI_CHOICE]: <></>,
                }[currentQuestion.answer_type]
              }
            </div>

            <button
              className="w-full max-w-lg mx-auto mt-4 p-2 rounded transition-all disabled:opacity-50 bg-black text-white hover:bg-gray-900 dark:bg-gray-700 dark:text-white dark:hover:bg-gray-600"
              onClick={() => handleNavigation()}
              disabled={!answers[currentQuestion.id]}
            >
              {currentIndex === session.questions.length - 1 ? "저장" : "다음"}
            </button>

            <button className="w-full max-w-lg mx-auto mt-8 p-2 text-center text-gray-500 dark:text-gray-400 underline" onClick={() => handleNavigation(true)}>
              건너뛰기
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </FullHeightContainer>
  );
};