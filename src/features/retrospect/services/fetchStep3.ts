import { api } from "@/shared/apis/api";

export const fetchStep3 = async (mistake: string) => {
  try {
    const response = await api.put("/retrospect/step3", { mistake });
    return response.data;
  } catch (error) {
    console.error("fetchStep3: ", error);
    throw error;
  }
};