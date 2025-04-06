import { api } from "@/common/services/api";

export const fetchSummary = async (date: Date) => {
  try {
    const response = await api.get(`/retrospect/summary?date=${date}`);
    return response.data;
  } catch (error) {
    console.error("fetchSummary: ", error);
    throw error;
  }
};