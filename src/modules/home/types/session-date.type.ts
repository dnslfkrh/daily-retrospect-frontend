export interface SessionData {
  userId: string;
  email: string;
  name: string;
  answers?: {
    question_id?: string;
    answer: string;
  }[];
}