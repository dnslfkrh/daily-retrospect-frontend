import { api } from "@/common/services/api";

export const fetchRetrospectDates = async () => {
  try {
    const response = await api.get("/retrospect/dates");
    return response.data;
  } catch (error) {
    console.error("fetchRetrospectDates: ", error);
    throw error;
  }
};