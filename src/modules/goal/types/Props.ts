export interface GoalProps {
  id: number;
  title: string;
  description: string | null;
  start_date: string;
  end_date: string;
  created_at: string;
};

export type GoalListProps = {
  goals: GoalProps[];
  onUpdate: (goal: GoalProps) => void;
  onDelete: (id: number) => void;
};