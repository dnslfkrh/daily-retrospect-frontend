import { motion } from "framer-motion";
import { format } from "date-fns";
import { CheckCircle } from "lucide-react";

const DayButton = ({ day, isRetrospectDate, onClick }: { day: Date; isRetrospectDate: boolean; onClick: (date: Date) => void; }) => {
  return (
    <motion.button
      key={day.toISOString()}
      onClick={() => onClick(day)}
      className={`w-10 h-10 flex items-center justify-center rounded-full transition-all relative ${isRetrospectDate ? "bg-green-500 text-white" : "hover:bg-gray-200"}`}
    >
      <span className="text-black dark:text-white">
        {format(day, "d")}
      </span>
      
      {isRetrospectDate && (
        <span className="absolute w-8 h-8 rounded-full bg-green-500 opacity-50 top-0 left-0"></span>
      )}
    </motion.button>
  );
};

export default DayButton;
