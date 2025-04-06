import { AnswerType } from "../enums/retrospect.enum";

export interface SaveAnswerProps {
  sessionId: number;
  questionId: number;
  answer: string;
}

export interface AnswerProps {
  answer: string;
}

interface RetrospectAnswerProps extends AnswerProps {
  id: number;
  answer_type: AnswerType;
  created_at: string;
  updated_at: string;
  question_id: number;
}

interface RetrospectQuestionProps {
  id: number;
  concept: string;
  answer_type: AnswerType;
  question_text: string;
}

interface GoalProps {
  id: number;
  title: string;
}

export interface RetrospectSessionProps {
  id: number;
  created_at: string;
  answers: RetrospectAnswerProps[];
  questions: RetrospectQuestionProps[];
  goals: GoalProps[];
}