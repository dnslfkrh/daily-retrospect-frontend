import { api } from "@/common/services/api";

export const fetchUserInfo = async () => {
  try {
    const response = await api.get("auth/user-info");
    return response.data;
  } catch (error) {
    console.error("Error fetching user info:", error);
    throw error;
  }
};
