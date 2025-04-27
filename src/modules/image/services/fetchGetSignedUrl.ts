import { api } from "@/common/services/api"

export const fetchGetSignedUrl = async (): Promise<string> => {
  try {
    const response = await api.get("/image/apply/signed-url");
    return response.data;
  } catch (error) {
    console.error("Error fetching signed URL:", error);
    throw error;
  }
};