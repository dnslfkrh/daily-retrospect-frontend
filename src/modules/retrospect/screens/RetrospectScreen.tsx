"use client";

import { motion, AnimatePresence } from "framer-motion";
import FullHeightContainer from "@/common/components/FullHeightContainer";
import LoadingText from "@/common/components/LoadingText";
import GoalListBlock from "../components/GoalListBlock";
import RetrospectNavigationButtons from "../components/RetrospectNavigationButtons";
import RetrospectQuestionBlock from "../components/RetrospectQuestionBlock";
import { useRetrospectNavigation } from "../hooks/useRetrospectNavigation";
import { useRetrospectSession } from "../hooks/useRetrospectSession";

const RetrospectScreen = () => {
  const { session, answers, setAnswers } = useRetrospectSession();
  const { currentIndex, handleAnswerChange, handleNavigation } = useRetrospectNavigation(session, answers);

  if (!session) return <LoadingText />;

  const currentQuestion = session.questions[currentIndex];
  const isGoalQuestion = currentQuestion.concept === "goal";

  return (
    <FullHeightContainer>
      <AnimatePresence mode="wait">
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

          {isGoalQuestion && session.goals.length > 0 && <GoalListBlock goals={session.goals} />}

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
            onSkip={() => handleNavigation(true)}
            isLast={currentIndex === session.questions.length - 1}
            disabled={!answers[currentQuestion.id]}
          />
        </motion.div>
      </AnimatePresence>
    </FullHeightContainer>
  );
};

export default RetrospectScreen;