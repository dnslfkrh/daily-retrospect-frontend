export type Goal = {
  id: number;
  title: string;
  description: string | null;
  start_date: string;
  end_date: string;
  completed: boolean;
};

export type GoalListProps = {
  goals: Goal[];
  onUpdate: (goal: Goal) => void;
  onDelete: (id: number) => void;
};