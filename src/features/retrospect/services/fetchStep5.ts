import { api } from "@/shared/apis/api";

export const fetchStep5 = async (comment: string) => {
  try {
    const response = await api.put("/retrospect/step5", { comment });
    return response.data;
  } catch (error) {
    console.error("fetchStep5: ", error);
    throw error;
  }
};