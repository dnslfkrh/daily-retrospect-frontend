import { api } from "@/shared/apis/base/api"

export const fetchStep2 = async (keywords: string[]) => {
  try {
    const response = await api.put("/retrospect/step2", { keywords });
    return response.data;
  } catch (error) {
    console.error("fetchStep2: ", error);
    throw error;
  }
};