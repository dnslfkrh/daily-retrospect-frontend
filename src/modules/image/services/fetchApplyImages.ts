import { api } from "@/common/services/api"
import { ImageData } from "../types/image-data.type";

export const fetchApplyImages = async (images: File[]) => {
  try {
    const response = await api.post("/image/apply", { images });
    return response.data;
  } catch (error) {
    console.error("Error applying images:", error);
    throw error;
  }
};