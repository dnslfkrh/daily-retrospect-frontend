import { useEffect, useState } from "react";
import { GoalEvaluationPeriod } from "../enums/goalEvaluation";
import { fetchGetGoalScores } from "../services/fetchGetGoalScores";
import { GoalScoreProps } from "../types/Props";
import { processScoresForChart } from "../utils/processScoresForChart";
import toast from "react-hot-toast";

export const useGoalEvaluation = (period: GoalEvaluationPeriod) => {
  const [scores, setScores] = useState<GoalScoreProps[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [chartData, setChartData] = useState<{ labels: string[]; data: number[] }>({ labels: [], data: [] });
  const [averageScore, setAverageScore] = useState(0);

  useEffect(() => {
    const fetchScores = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const data = await fetchGetGoalScores(period);
        setScores(data.map(score => ({ ...score, answer: parseInt(String(score.answer), 10) })));
      } catch (err) {
        setError("데이터를 불러오는 중 오류가 발생했습니다.");
        setScores([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchScores();
  }, [period]);

  useEffect(() => {
    if (!isLoading && !error) {
      const result = processScoresForChart(scores, period);
      setChartData(result.chartData);
      setAverageScore(result.averageScore);

      const scoreCount = scores.length;
      const requiredCount = {
        [GoalEvaluationPeriod.OneMonth]: 4,
        [GoalEvaluationPeriod.ThreeMonths]: 9,
        [GoalEvaluationPeriod.SixMonths]: 18,
        [GoalEvaluationPeriod.OneYear]: 36,
      }[period];

      if (scoreCount < requiredCount) {
        toast("평가가 부족해요! 목표와 회고를 더 작성해 주세요.", {
          icon: "⚠️",
          id: "insufficient-score-warning", // 중복 방지
        });
      }
    } else {
      setChartData({ labels: [], data: [] });
      setAverageScore(0);
    }
  }, [scores, period, isLoading, error]);

  return {
    chartData,
    averageScore,
    isLoading,
    error,
  };
};
