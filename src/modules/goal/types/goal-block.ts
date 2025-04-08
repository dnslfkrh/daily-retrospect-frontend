import { GoalProps } from "./goal";

export interface GoalBlockProps {
  goal: GoalProps;
  onUpdate: (goal: GoalProps) => void;
  onDelete: (id: number) => void;
}
