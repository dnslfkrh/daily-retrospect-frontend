import { RetrospectNavProps } from "../types/retrospect-nav";

const RetrospectNavigationButtons = ({ onNext, onSkip, isLast, disabled }: RetrospectNavProps) => (
  <>
    <button
      className="w-full max-w-lg mx-auto mt-4 p-2 rounded bg-black text-white hover:bg-gray-900 dark:bg-gray-700 dark:hover:bg-gray-600 disabled:opacity-50"
      onClick={onNext}
      disabled={disabled}
    >
      {isLast ? "저장" : "다음"}
    </button>
    <button
      className="w-full max-w-lg mx-auto mt-8 p-2 text-center text-gray-500 dark:text-gray-400 underline"
      onClick={onSkip}
    >
      건너뛰기
    </button>
  </>
);

export default RetrospectNavigationButtons;
