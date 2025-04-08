import { api } from "@/common/services/api";

export const fetchDeleteAccount = async (email: string) => {
  try {
    const response = await api.delete(`/user/delete?email=${email}`);
    return response.data;
  } catch (error) {
    console.error("Error deleting account:", error);
    throw error;
  }
}