import { api } from "@/common/services/api";

export const fetchDeleteGoal = async (id: number) => {
  try {
    const response = await api.delete(`/goal/${id}`);
    return response.data;
  } catch (error) {
    console.error("fetchDeleteGoal: ", error);
    throw error;
  }
};