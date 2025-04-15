import { api } from "@/common/services/api";

export const fetchTodayImages = async (): Promise<{ imageData: string; description: string; contentType: string }[]> => {
  try {
    const response = await api.get("/image/today", {
      responseType: "json",
    });

    return response.data.map((image: { id: string; contentType: string; data: string; description: string }) => {
      const imageData = `data:${image.contentType};base64,${image.data}`;
      return {
        imageData,
        description: image.description,
        contentType: image.contentType,
      };
    });
  } catch (error) {
    console.error("Error fetching today's images:", error);
    throw error;
  }
};