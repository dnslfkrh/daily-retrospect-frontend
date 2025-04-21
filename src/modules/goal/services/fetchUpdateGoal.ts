import { api } from "@/common/services/api";
import { GoalProps } from "../types/goal";

export const fetchUpdateGoal = async (updatedGoal: GoalProps) => {
  const { created_at, ...filteredGoal } = updatedGoal;
  try {
    const response = await api.put("/goal/update", filteredGoal);
    return response.data;
  } catch (error) {
    console.error("fetchUpdateGoal: ", error);
    throw error;
  }
};