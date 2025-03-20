export interface Goal {
  id: number;
  title: string;
  description: string | null;
  start_date: string;
  end_date: string;
  created_at: string;
};

export type GoalListProps = {
  goals: Goal[];
  onUpdate: (goal: Goal) => void;
  onDelete: (id: number) => void;
};