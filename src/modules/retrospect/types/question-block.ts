import { AnswerType } from "../enums/retrospect.enum";

export interface QuestionBlockProps {
  type: AnswerType;
  value: string;
  onChange: (value: string) => void;
  question: string;
}