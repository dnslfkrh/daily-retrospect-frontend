import { getFeedback } from "../constants/goalFeedback";
import { GoalFeedbackProps } from "../types/goal-feedback";

const GoalFeedback = ({ averageScore }: GoalFeedbackProps) => {
  // averageScore가 null이면 렌더링하지 않음
  if (averageScore === null || averageScore <= 0) {
    return null;
  }

  const feedbacks = getFeedback(averageScore);

  return (
    <div className="mt-4 p-4 bg-gray-100 dark:bg-gray-800 rounded-lg">
      <h3 className="text-lg font-semibold">평균 점수: {averageScore.toFixed(1)}</h3>
      <ul className="list-disc pl-5 mt-2">
        {feedbacks.map((feedback, index) => (
          <li key={index} className="text-gray-700 dark:text-gray-300">{feedback}</li>
        ))}
      </ul>
    </div>
  );
};

export default GoalFeedback;