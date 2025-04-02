import { GoalProps } from "./Props";

export type Goal = {
  goal: GoalProps;
  onUpdate: (goal: GoalProps) => void;
  onDelete: (id: number) => void;
};