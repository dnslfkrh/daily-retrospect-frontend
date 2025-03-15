import { api } from "@/shared/apis/api"

export const fetchStep6 = async (memorable_interaction: string) => {
  try {
    const response = await api.put("/retrospect/step6", { memorable_interaction })
    return response.data;
  } catch (error) {
    console.error("fetchStep6: ", error);
    throw error;
  }
};