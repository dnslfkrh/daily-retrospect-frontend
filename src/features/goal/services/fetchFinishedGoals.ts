import { api } from "@/shared/apis/base/api"

export const fetchFinishedGoals = async () => {
  try {
    const response = await api.get("/goal/finished");
    return response.data;
  } catch (error) {
    console.error("fetchGoals: ", error);
    throw error;
  }
};