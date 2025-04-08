import { BaseAnswerProps } from "@/shared/types/answer";
import { AnswerType } from "../enums/retrospect.enum";

export interface RetrospectAnswerProps extends BaseAnswerProps {
  id: number;
  answer_type: AnswerType;
  created_at: string;
  updated_at: string;
  question_id: number;
}