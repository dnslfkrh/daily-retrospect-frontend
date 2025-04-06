import { api } from "@/common/services/api";
import { GoalEvaluationPeriod } from "@/shared/enums/goalEvaluation";
import { GoalScoreProps } from "@/modules/graph/types/Props";

export const fetchGetGoalScores = async (period: GoalEvaluationPeriod): Promise<GoalScoreProps[]> => {
  try {
    const response = await api.get("retrospect/goal-scores", {
      params: { period },
    });

    if (Array.isArray(response.data)) {
      if (response.data.length > 0 && typeof response.data[0] === 'string') {
        return response.data.map((score, index) => ({
          answer: parseInt(score),
          created_at: new Date(Date.now() - (index * 24 * 60 * 60 * 1000)).toISOString()
        }));
      }
      return response.data;
    }

    return [];
  } catch (error) {
    console.error("Error fetching goal scores:", error);
    throw error;
  }
};