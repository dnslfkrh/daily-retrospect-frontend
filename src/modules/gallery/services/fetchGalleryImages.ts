import { api } from "@/common/services/api";

export const fetchGalleryImages = async (page: number, imagesCount: number = 10) => {
  try {
    const response = await api.get(`/image/gallery?page=${page}&imagesCount=${imagesCount}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching gallery images:", error);
    throw error;
  }
};