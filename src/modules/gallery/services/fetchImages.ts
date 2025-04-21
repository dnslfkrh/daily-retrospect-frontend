import { api } from "@/common/services/api";

export const fetchGalleryImages = async (page: number): Promise<{ file: File, imageData: string; description: string; contentType: string; s3_key: string, date: string }[]> => {
  try {
    const response = await api.get(`/image/gallery?page=${page}`, {
      responseType: "json",
    });

    return response.data.map((image: { id: string; contentType: string; data: string; description: string; s3_key: string, date: string }) => {
      const imageData = `data:${image.contentType};base64,${image.data}`;
      return {
        imageData,
        description: image.description,
        contentType: image.contentType,
        s3_key: image.s3_key,
        date: image.date
      };
    });
  } catch (error) {
    console.error("Error fetching gallery images:", error);
    throw error;
  }
};
