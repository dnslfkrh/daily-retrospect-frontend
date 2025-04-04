"use client";

import { useEffect, useState } from "react";
import GoalScoreChart from "../components/GoalScoreChart";
import GoalFeedback from "../components/GoalFeedback";
import { GoalEvaluationPeriod } from "../enums/goalEvaluation";
import { fetchGetGoalScores } from "../services/fetchGetGoalScores";
import { getWeekOfMonth } from "date-fns";
import { GoalScoreProps } from "../types/Props";
import { getMonthName } from "../utils/getMonthName";

const GoalEvaluationView = () => {
  const [period, setPeriod] = useState<GoalEvaluationPeriod>(GoalEvaluationPeriod.OneMonth);
  const [scores, setScores] = useState<GoalScoreProps[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [chartData, setChartData] = useState<{ labels: string[]; data: number[] }>({ labels: [], data: [] });
  const [averageScore, setAverageScore] = useState<number>(0);

  useEffect(() => {
    const fetchScores = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const data = await fetchGetGoalScores(period);
        console.log("Fetched Data:", data);
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
    if (!isLoading && !error && scores.length > 0) {
      processScoresForChart(scores, period);
    } else {
      setChartData({ labels: [], data: [] });
      setAverageScore(0);
    }
  }, [scores, period, isLoading, error]);

  const processScoresForChart = (rawData: GoalScoreProps[], period: GoalEvaluationPeriod) => {
    const aggregatedScores: { [key: string]: { sum: number; count: number } } = {};
    const allScores: number[] = [];
    const currentDate = new Date();
    const oneYearAgo = new Date();
    oneYearAgo.setFullYear(currentDate.getFullYear() - 1);

    rawData.forEach(item => {
      const date = new Date(item.created_at);
      if (period === GoalEvaluationPeriod.OneYear && date < oneYearAgo) {
        return;
      }
      const answer = item.answer;
      if (!isNaN(answer)) {
        allScores.push(answer);
      }
      let key: string = '';

      switch (period) {
        case GoalEvaluationPeriod.OneYear:
        case GoalEvaluationPeriod.SixMonths:
        case GoalEvaluationPeriod.ThreeMonths:
          key = `${date.getFullYear()}-${date.getMonth() + 1}`;
          break;
        case GoalEvaluationPeriod.OneMonth:
          key = `${date.getFullYear()}-${date.getMonth() + 1}-${getWeekOfMonth(date, { weekStartsOn: 1 })}`;
          break;
        default:
          key = `${date.getFullYear()}-${date.getMonth() + 1}`;
          break;
      }

      if (!aggregatedScores[key]) {
        aggregatedScores[key] = { sum: 0, count: 0 };
      }
      aggregatedScores[key].sum += answer;
      aggregatedScores[key].count += 1;
    });

    const sortedKeys = Object.keys(aggregatedScores).sort((a, b) => {
      const [yearA, monthA] = a.split('-').map(Number);
      const [yearB, monthB] = b.split('-').map(Number);
      return yearA !== yearB ? yearA - yearB : monthA - monthB;
    });

    const labels: string[] = [];
    const data: number[] = [];

    sortedKeys.forEach(key => {
      const [year, month, week] = key.split(/[-]/);
      let label: string = '';
      switch (period) {
        case GoalEvaluationPeriod.OneYear:
        case GoalEvaluationPeriod.SixMonths:
        case GoalEvaluationPeriod.ThreeMonths:
          label = getMonthName(parseInt(month));
          break;
        case GoalEvaluationPeriod.OneMonth:
          label = `${parseInt(week)}주`;
          break;
        default:
          label = `${year}-${month}`;
          break;
      }
      labels.push(label);
      data.push(aggregatedScores[key].sum / aggregatedScores[key].count);
    });

    const sumOfScores = allScores.reduce((sum, score) => sum + score, 0);
    const average = allScores.length > 0 ? sumOfScores / allScores.length : 0;
    setChartData({ labels, data });
    setAverageScore(average);
  };

  return (
    <div className="flex flex-col items-center justify-start min-h-screen p-4 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 rounded-lg mt-16">
      <h2 className="text-2xl font-semibold mb-6 text-center">{period} 동안의 평균 점수</h2>
      <div className="flex justify-center gap-2 mb-6">
        {Object.values(GoalEvaluationPeriod).map(p => (
          <button
            key={p}
            className={`px-4 py-2 text-sm rounded-md transition-colors duration-200 ${period === p
              ? "bg-black text-white dark:bg-gray-500"
              : "bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-gray-300"
              }`}
            onClick={() => setPeriod(p)}
          >
            {p}
          </button>
        ))}
      </div>
      <GoalScoreChart chartData={chartData} period={period} />
      {!isNaN(averageScore) && <GoalFeedback averageScore={averageScore} />}
    </div>
  );
};

export default GoalEvaluationView;
