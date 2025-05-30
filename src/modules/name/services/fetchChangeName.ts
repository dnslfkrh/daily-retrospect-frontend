import { api } from "@/common/services/api";

export const fetchChangeName = async (newName: string) => {
  try {
    const response = await api.post("/user/change-name", { name: newName });
    return response.data;
  } catch (error) {
    console.error("Error changing name:", error);
    throw error;
  }
};