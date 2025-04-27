import { api } from "@/common/services/api"
import { ApplyImagesProps } from "../types/apply-images.type";

export const fetchApplyImages = async (payload: ApplyImagesProps) => {
  try {
    const response = await api.post("/image/apply", payload);
    return response.data;
  } catch (error) {
    console.error("Error applying images:", error);
    throw error;
  }
};