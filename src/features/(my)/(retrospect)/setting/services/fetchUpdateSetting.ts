import { api } from "@/shared/apis/base/api";
import { UpdateSettingProps } from "../types/Props";

export const fetchUpdateSetting = async (setting: UpdateSettingProps) => {
  try {
    const response = await api.put("/retrospect/setting", setting);
    return response.data;
  } catch (error) {
    console.error("fetchUpdateSetting: ", error);
    throw error;
  }
};