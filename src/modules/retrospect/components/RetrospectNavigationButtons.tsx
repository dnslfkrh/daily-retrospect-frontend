import { ChevronLeft, ChevronRight } from "lucide-react";
import { RetrospectNavProps } from "../types/retrospect-nav";

interface ExtendedRetrospectNavProps extends RetrospectNavProps {
  onPrevious: () => void;
  isFirst: boolean;
}

const RetrospectNavigationButtons = ({ 
  onNext, 
  onPrevious, 
  onSkip, 
  isLast, 
  isFirst, 
  disabled 
}: ExtendedRetrospectNavProps) => (
  <>
    <div className="flex justify-between items-center w-full max-w-48 mx-auto mt-4">
      <button
        className="p-4 flex items-center justify-center disabled:opacity-30"
        onClick={onPrevious}
        disabled={isFirst}
      >
        {!isLast && <ChevronLeft size={32} className="text-gray-600 dark:text-gray-400" />}
      </button>
      
      {isLast && (
        <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
          저장
        </span>
      )}
      
      <button
        className="p-4 flex items-center justify-center disabled:opacity-50"
        onClick={onNext}
        disabled={disabled}
      >
        {!isLast && <ChevronRight size={32} className="text-gray-600 dark:text-gray-400" />}
      </button>
    </div>
    <button
      className="w-full max-w-lg mx-auto mt-8 p-2 text-center text-gray-500 dark:text-gray-400 underline"
      onClick={onSkip}
    >
      건너뛰기
    </button>
  </>
);

export default RetrospectNavigationButtons;