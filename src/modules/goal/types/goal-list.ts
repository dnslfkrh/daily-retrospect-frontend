import { GoalProps } from "./goal";

export interface GoalListProps {
  goals: GoalProps[];
  onUpdate?: (goal: GoalProps) => void;
  onDelete?: (id: number) => void;
}