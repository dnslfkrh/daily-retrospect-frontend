import { motion } from "framer-motion";
import { format } from "date-fns";

const DayButton = ({ day, isRetrospectDate, onClick }: { day: Date; isRetrospectDate: boolean; onClick: (date: Date) => void; }) => {
  return (
    <motion.button
      key={day.toISOString()}
      onClick={() => onClick(day)}
      className={`w-10 h-10 flex items-center justify-center rounded-full transition-all relative
        ${isRetrospectDate ? "bg-black text-white dark:bg-white dark:text-black" : "hover:bg-gray-200 dark:hover:bg-gray-700"}
      `}
    >
      <span>
        {format(day, "d")}
      </span>
    </motion.button>
  );
};

export default DayButton;
