import { api } from "@/shared/apis/api"

export const fetchTodayRetrospect = async () => {
  try {
    const response = await api.get("/retrospect/today");
    return response.data;
  } catch (error) {
    console.error("fetchTodayRetrospect: ", error);
    throw error;
  }
};