import { api } from "@/shared/apis/base/api";
import { Goal } from "@/shared/types/Goal.type";

export const fetchCreateGoal = async (goal: Goal) => {
  try {
    const response = await api.post("/goal/create", goal);
    return response.data;
  } catch (error) {
    console.error("fetchCreateGoal: ", error);
    throw error;
  }
};