import { api } from "@/shared/apis/base/api";
import { Goal } from "@/features/goal/types/Props";

export const fetchUpdateGoal = async (updatedGoal: Goal) => {
  const { created_at, ...filteredGoal } = updatedGoal;
  try {
    const response = await api.put("/goal/update", filteredGoal);
    return response.data;
  } catch (error) {
    console.error("fetchUpdateGoal: ", error);
    throw error;
  }
};