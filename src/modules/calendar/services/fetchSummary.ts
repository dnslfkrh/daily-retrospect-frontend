import { api } from "@/shared/apis/api";

export const fetchSummary = async (date: Date) => {
  try {
    const response = await api.get(`/retrospect/summary?date=${date}`);
    return response.data;
  } catch (error) {
    console.error("fetchSummary: ", error);
    throw error;
  }
};