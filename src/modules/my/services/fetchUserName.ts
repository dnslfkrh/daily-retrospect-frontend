import { api } from "@/common/services/api";

export const fetchUserName = async () => {
  try {
    const response = await api.get("/user/me");
    return response.data;
  } catch (error) {
    console.error("사용자 이름을 불러오는 중 오류 발생:", error);
    throw error;
  }
};