import { api } from "@/common/services/api";
import { UpdateSettingProps } from "../types/setting";

export const fetchUpdateSetting = async (setting: UpdateSettingProps) => {
  try {
    const response = await api.post("/retrospect/setting", setting);
    return response.data;
  } catch (error) {
    console.error("fetchUpdateSetting: ", error);
    throw error;
  }
};