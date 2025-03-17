import { api } from "@/shared/apis/base/api"

export const fethcActivatedGoals = async () => {
  try {
    const response = await api.get("/goal/activated");
    return response.data;
  } catch (error) {
    console.error("fetchGoals: ", error);
    throw error;
  }
};