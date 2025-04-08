import { AnswerType } from "../enums/retrospect.enum";

export interface RetrospectQuestionProps {
  id: number;
  concept: string;
  answer_type: AnswerType;
  question_text: string;
}