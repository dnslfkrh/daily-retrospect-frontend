import { motion, AnimatePresence } from "framer-motion";
import { OptionSelectorProps } from "../types/option";

export const OptionSelector = <T,>({
  title,
  options,
  selectedOption,
  setSelectedOption,
}: OptionSelectorProps<T>) => {
  return (
    <div className="w-full mt-8 mb-4">
      <h2 className="text-lg font-medium mb-4 text-center text-gray-800 dark:text-gray-300">
        {title}
      </h2>
      <div className="relative flex justify-center space-x-4 w-full">
        {options.map((option) => (
          <motion.button
            key={option.value as string}
            onClick={() => setSelectedOption(option.value)}
            animate={{ scale: selectedOption === option.value ? 1.05 : 1 }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
            className={`relative px-6 py-3 font-medium transition-all duration-200 rounded-full border
              ${selectedOption === option.value
                ? "bg-gray-100 dark:bg-gray-800 border-gray-300 dark:border-gray-600 text-gray-800 dark:text-gray-300"
                : "text-gray-600 dark:text-gray-400 border-transparent"
              }`}
          >
            {option.label}
          </motion.button>
        ))}
      </div>
      <AnimatePresence mode="wait">
        <motion.p
          key={selectedOption as string}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.4, ease: "easeInOut" }}
          className="mt-4 text-sm text-center text-gray-700 dark:text-gray-400"
        >
          {options.find((o) => o.value === selectedOption)?.description}
        </motion.p>
      </AnimatePresence>
    </div>
  );
};
