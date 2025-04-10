import { ChevronLeft, ChevronRight } from "lucide-react";
import { format } from "date-fns";

const months = [
  "1월", "2월", "3월", "4월", "5월", "6월", "7월", "8월", "9월", "10월", "11월", "12월"
];

const MonthNavigation = ({ currentMonth, onPrevMonth, onNextMonth }: { currentMonth: Date; onPrevMonth: () => void; onNextMonth: () => void; }) => {
  const monthName = months[currentMonth.getMonth()];

  return (
    <div className="flex justify-between items-center mb-4">
      <button
        onClick={onPrevMonth}
        className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-500/20"
      >
        <ChevronLeft />
      </button>
      <h2 className="text-xl font-semibold">{`${format(currentMonth, "yyyy")}년 ${monthName}`}</h2>
      <button
        onClick={onNextMonth}
        className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-500/20 disabled:opacity-50"
      >
        <ChevronRight />
      </button>
    </div>
  );
};

export default MonthNavigation;
