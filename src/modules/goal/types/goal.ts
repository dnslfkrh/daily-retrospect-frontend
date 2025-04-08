import { BaseGoalProps } from "@/shared/types/goal";

export interface GoalProps extends BaseGoalProps{
  description: string | null;
  start_date: string;
  end_date: string;
  created_at: string;
}