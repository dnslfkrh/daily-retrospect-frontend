"use client";

import { useState } from "react";
import { GoalEvaluationPeriod } from "../../../shared/enums/goalEvaluation";
import PeriodSelector from "../components/PeriodSelector";
import GoalScoreChart from "../components/GoalScoreChart";
import GoalFeedback from "../components/GoalFeedback";
import { useGoalEvaluation } from "../hooks/useGoalEvaluation";

const GoalEvaluationScreen = () => {
  const [period, setPeriod] = useState<GoalEvaluationPeriod>(GoalEvaluationPeriod.OneMonth);
  const { chartData, averageScore } = useGoalEvaluation(period);

  return (
    <div className="flex flex-col items-center justify-start min-h-screen p-4 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 rounded-lg mt-16">
      <h2 className="text-2xl font-semibold mb-6 text-center">{period} 동안의 목표 점수</h2>
      <PeriodSelector period={period} setPeriod={setPeriod} />
      <GoalScoreChart chartData={chartData} period={period} />
      {!isNaN(averageScore) && <GoalFeedback averageScore={averageScore} />}
    </div>
  );
};

export default GoalEvaluationScreen;
