import { api } from "@/common/services/api";
import { ImageData } from "@/shared/types/image-data.type";

export const fetchTodayImages = async (): Promise<ImageData[]> => {
  try {
    const response = await api.get("/image/today", {
      responseType: "json",
    });

    return response.data.map((image: ImageData) => {
      return {
        url: image.url,
        description: image.description,
        s3_key: image.s3_key
      };
    });
  } catch (error) {
    console.error("Error fetching today's images:", error);
    throw error;
  }
};
