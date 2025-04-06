import { api } from "@/common/services/api";

export const fetchLastSummary = async () => {
  try {
    const response = await api.get("retrospect/last-summary");
    return response.data;
  } catch (error) {
    console.error("Error fetching last summary:", error);
    throw error;
  }
};