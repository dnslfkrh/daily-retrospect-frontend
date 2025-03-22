import { api } from "@/shared/apis/base/api";

interface SaveAnswerProps {
  sessionId: number;
  questionId: number;
  answer: string;
}

export const fetchSaveAnswer = async ({ sessionId, questionId, answer }: SaveAnswerProps) => {
  try {
    const response = await api.post(`/retrospect/session/${sessionId}/answer`, { questionId, answer });
    return response.data;
  } catch (error) {
    console.error("fetchSaveAnswer: ", error);
    throw error;
  }
}