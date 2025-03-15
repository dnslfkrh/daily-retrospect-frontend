import { api } from "@/shared/apis/api";

export const fetchStep3 = async (keywords: string[]) => {
  try {
    const response = await api.put("/retrospect/step3", { keywords });
    return response.data;
  } catch (error) {
    console.error("fetchStep3: ", error);
    throw error;
  }
};