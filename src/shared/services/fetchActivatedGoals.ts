import { api } from "@/common/services/api";

export const fetchActivatedGoals = async () => {
  try {
    const response = await api.get("/goal/activated");
    return response.data;
  } catch (error) {
    console.error("fetchGoals: ", error);
    throw error;
  }
};