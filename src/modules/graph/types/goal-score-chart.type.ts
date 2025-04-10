import { GoalEvaluationPeriod } from "@/shared/enums/goalEvaluation";

export interface GoalScoreChartProps {
  chartData: { labels: string[]; data: number[] };
  period?: GoalEvaluationPeriod;
}