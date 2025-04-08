import { GoalEvaluationPeriod } from "@/shared/enums/goalEvaluation";

export interface PeriodProps {
  period: GoalEvaluationPeriod;
  setPeriod: (p: GoalEvaluationPeriod) => void;
}