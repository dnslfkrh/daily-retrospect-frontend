import { api } from "@/common/services/api";

export const fetchSession = async () => {
  try {
    const response = await api.get("/retrospect/session");
    return response.data;
  } catch (error) {
    console.error("fetchSession: ", error);
    throw error;
  }
};