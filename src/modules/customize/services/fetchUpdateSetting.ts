import { api } from "@/shared/apis/api";
import { UpdateSettingProps } from "../types/Props";

export const fetchUpdateSetting = async (setting: UpdateSettingProps) => {
  try {
    const response = await api.post("/retrospect/setting", setting);
    return response.data;
  } catch (error) {
    console.error("fetchUpdateSetting: ", error);
    throw error;
  }
};