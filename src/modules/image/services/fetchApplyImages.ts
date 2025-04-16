import { api } from "@/common/services/api"

export const fetchApplyImages = async (images: { file: File; description: string; s3_key: string }[]) => {
  const formData = new FormData();
  const existingKeys = images
    .filter((img) => !(img.file instanceof File) && img.s3_key)
    .map((img) => img.s3_key);

  images.forEach((image) => {
    if (image.file) {
      formData.append("images", image.file);
      formData.append("descriptions", image.description);
    }
  });

  formData.append("existingImages", JSON.stringify(existingKeys));
  try {
    const response = await api.post("/image/apply", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error applying images:", error);
    throw error;
  }
};