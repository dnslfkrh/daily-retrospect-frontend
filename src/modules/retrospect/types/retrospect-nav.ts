export interface RetrospectNavProps {
  onNext: () => void;
  onSkip: () => void;
  isLast: boolean;
  disabled: boolean;
}