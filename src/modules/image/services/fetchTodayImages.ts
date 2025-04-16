import { api } from "@/common/services/api";

export const fetchTodayImages = async (): Promise<{ file: File, imageData: string; description: string; contentType: string; s3_key: string }[]> => {
  try {
    const response = await api.get("/image/today", {
      responseType: "json",
    });

    return response.data.map((image: { id: string; contentType: string; data: string; description: string, s3_key: string }) => {
      const imageData = `data:${image.contentType};base64,${image.data}`;
      return {
        imageData,
        description: image.description,
        contentType: image.contentType,
        s3_key: image.s3_key,
      };
    });
  } catch (error) {
    console.error("Error fetching today's images:", error);
    throw error;
  }
};
