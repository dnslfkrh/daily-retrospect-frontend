import { GoalEvaluationPeriod } from "../../../shared/enums/goalEvaluation";

interface Props {
  period: GoalEvaluationPeriod;
  setPeriod: (p: GoalEvaluationPeriod) => void;
}

const PeriodSelector = ({ period, setPeriod }: Props) => {
  return (
    <div className="flex justify-center gap-2 mb-6">
      {Object.values(GoalEvaluationPeriod).map(p => (
        <button
          key={p}
          className={`px-4 py-2 text-sm rounded-md transition-colors duration-200 ${period === p
            ? "bg-black text-white dark:bg-gray-500"
            : "bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-gray-300"
            }`}
          onClick={() => setPeriod(p)}
        >
          {p}
        </button>
      ))}
    </div>
  );
};

export default PeriodSelector;
