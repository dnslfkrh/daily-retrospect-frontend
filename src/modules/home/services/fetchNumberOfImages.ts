import { api } from "@/common/services/api";

export const fetchNumberOfImages = async () => {
  try {
    const response = await api.get("/image/numbers");
    return response.data;
  } catch (error) {
    console.error("fetchNumberOfImages: ", error);
    throw error;
  }
};