import { BaseGoalProps } from "@/shared/types/goal";
import { RetrospectQuestionProps } from "./question";
import { RetrospectAnswerProps } from "./retrospect-answer";

export interface RetrospectSessionProps {
  id: number;
  created_at: string;
  answers: RetrospectAnswerProps[];
  questions: RetrospectQuestionProps[];
  goals: BaseGoalProps[];
}