import { api } from "@/shared/apis/base/api"

export const fetchStep5 = async (memorable_moment: string) => {
  try {
    const response = await api.put("/retrospect/step5", { memorable_moment });
    return response.data;
  } catch (error) {
    console.error("fetchStep5: ", error);
    throw error;
  }
};