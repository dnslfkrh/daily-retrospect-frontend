import { api } from "@/common/services/api";
import { GoalProps } from "../types/goal";

export const fetchCreateGoal = async (goal: GoalProps) => {
  try {
    const response = await api.post("/goal/create", goal);
    return response.data;
  } catch (error) {
    console.error("fetchCreateGoal: ", error);
    throw error;
  }
};