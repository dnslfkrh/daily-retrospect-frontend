import { api } from "@/shared/apis/api";

export const fetchStep4 = async (achievement: string) => {
  try {
    const response = await api.put("/retrospect/step4", { achievement });
    return response.data;
  } catch (error) {
    console.error("fetchStep: ", error);
    throw error;
  }
};