import { api } from "@/common/services/api";

export const fetchCheckTodaySession = async () => {
  try {
    const response = await api.get("/retrospect/session/today");
    return response.data;
  } catch (error) {
    console.error("fetchSession: ", error);
    throw error;
  }
};