"use client";

import { motion, AnimatePresence } from "framer-motion";
import FullHeightContainer from "@/common/components/FullHeightContainer";
import GoalListBlock from "../components/GoalListBlock";
import RetrospectNavigationButtons from "../components/RetrospectNavigationButtons";
import RetrospectQuestionBlock from "../components/RetrospectQuestionBlock";
import { useRetrospectNavigation } from "../hooks/useRetrospectNavigation";
import { useRetrospectSession } from "../hooks/useRetrospectSession";

const variants = {
  enter: (direction: "next" | "prev") => ({
    x: direction === "next" ? 100 : -100,
    opacity: 0,
  }),
  center: {
    x: 0,
    opacity: 1,
  },
  exit: (direction: "next" | "prev") => ({
    x: direction === "next" ? -100 : 100,
    opacity: 0,
  }),
};

const RetrospectScreen = () => {
  const { session, answers, setAnswers } = useRetrospectSession();
  const {
    currentIndex,
    handleAnswerChange,
    handleNavigation,
    handlePreviousNavigation,
    animationDirection,
  } = useRetrospectNavigation(session, answers);

  if (!session) return null;

  const currentQuestion = session.questions[currentIndex];
  const isGoalQuestion = currentQuestion.concept === "goal";

  return (
    <FullHeightContainer>
      <AnimatePresence mode="wait" custom={animationDirection}>
        <motion.div
          key={currentQuestion.id}
          custom={animationDirection}
          variants={variants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{ duration: 0.3 }}
          className="w-full max-w-lg mx-auto"
        >
          <label className="block text-xl font-semibold text-center text-gray-700 dark:text-gray-300">
            {currentQuestion.question_text}
          </label>

          {isGoalQuestion && session.goals.length > 0 && (
            <GoalListBlock goals={session.goals} />
          )}

          <div className="mt-6">
            <RetrospectQuestionBlock
              type={currentQuestion.answer_type}
              value={answers[currentQuestion.id] || ""}
              onChange={(val) =>
                setAnswers((prev) => ({
                  ...prev,
                  ...handleAnswerChange(val),
                }))
              }
              question={currentQuestion.question_text}
            />
          </div>

          <RetrospectNavigationButtons
            onNext={() => handleNavigation()}
            onPrevious={() => handlePreviousNavigation()}
            onSkip={() => handleNavigation(true)}
            isLast={currentIndex === session.questions.length - 1}
            isFirst={currentIndex === 0}
            disabled={!answers[currentQuestion.id]}
          />
        </motion.div>
      </AnimatePresence>
    </FullHeightContainer>
  );
};

export default RetrospectScreen;
