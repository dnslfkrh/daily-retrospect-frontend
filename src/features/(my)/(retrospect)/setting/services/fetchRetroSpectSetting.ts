import { api } from "@/shared/apis/base/api";

export const fetchRetrospectSetting = async () => {
  try {
    const response = await api.get("/retrospect/setting");
    return response.data;
  } catch (error) {
    console.error("fetchRetrospectSetting: ", error);
    throw error;
  }
};