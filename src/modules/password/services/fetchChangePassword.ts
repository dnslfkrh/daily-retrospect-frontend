import { api } from "@/common/services/api"

export const fetchChangePassword = async (previousPassword: string, newPassword: string) => {
  try {
    const response = await api.post("user/change-password", {
      previousPassword,
      newPassword,
    });
    return response.data;
  } catch (error) {
    console.error("Error changing password:", error);
    throw error;
  }
};