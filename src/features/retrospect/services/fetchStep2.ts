import { api } from "@/shared/apis/api";

export const fetchStep2 = async (highlight: string) => {
  try {
    const response = await api.put("/retrospect/step2", { highlight });
    return response.data;
  } catch (error) {
    console.error("fetchStep2: ", error);
    throw error;
  }
};