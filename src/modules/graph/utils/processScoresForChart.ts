import { getWeekOfMonth } from "date-fns";
import { GoalEvaluationPeriod } from "../../../shared/enums/goalEvaluation";
import { GoalScoreProps } from "../types/Props";
import { getMonthName } from "./getMonthName";

export const processScoresForChart = (
  rawData: GoalScoreProps[],
  period: GoalEvaluationPeriod
) => {
  const aggregatedScores: { [key: string]: { sum: number; count: number } } = {};
  const allScores: number[] = [];
  const currentDate = new Date();
  const oneYearAgo = new Date(currentDate);
  oneYearAgo.setFullYear(currentDate.getFullYear() - 1);

  rawData.forEach(item => {
    const date = new Date(item.created_at);
    if (period === GoalEvaluationPeriod.OneYear && date < oneYearAgo) return;

    const answer = item.answer;
    if (!isNaN(answer)) allScores.push(answer);

    let key = "";
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

    if (!aggregatedScores[key]) aggregatedScores[key] = { sum: 0, count: 0 };
    aggregatedScores[key].sum += answer;
    aggregatedScores[key].count += 1;
  });

  const sortedKeys = Object.keys(aggregatedScores).sort((a, b) => a.localeCompare(b));
  const labels: string[] = [];
  const data: number[] = [];

  sortedKeys.forEach(key => {
    const [year, month, week] = key.split("-");
    let label = "";
    switch (period) {
      case GoalEvaluationPeriod.OneMonth:
        label = `${parseInt(week)}주`;
        break;
      default:
        label = getMonthName(parseInt(month));
        break;
    }
    labels.push(label);
    data.push(aggregatedScores[key].sum / aggregatedScores[key].count);
  });

  const sumOfScores = allScores.reduce((sum, score) => sum + score, 0);
  const averageScore = allScores.length ? sumOfScores / allScores.length : 0;

  return { chartData: { labels, data }, averageScore };
};
