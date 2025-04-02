import { api } from "@/shared/apis/api";
import { GoalProps } from "@/modules/goal/types/Props";

export const fetchCreateGoal = async (goal: GoalProps) => {
  try {
    const response = await api.post("/goal/create", goal);
    return response.data;
  } catch (error) {
    console.error("fetchCreateGoal: ", error);
    throw error;
  }
};