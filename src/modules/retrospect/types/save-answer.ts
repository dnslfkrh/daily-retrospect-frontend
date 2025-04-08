import { BaseAnswerProps } from "@/shared/types/answer";

export interface SaveAnswerProps extends BaseAnswerProps {
  sessionId: number;
  questionId: number;
}