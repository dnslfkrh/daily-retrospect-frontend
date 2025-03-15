import { api } from "@/shared/apis/api"

export const fetchStep1 = async (mood: string) => {
  try {
    const response = await api.post("/retrospect/step1", { mood });
    return response.data;
  } catch (error) {
    console.error("fetchStep1: ", error);
    throw error;
  }
};