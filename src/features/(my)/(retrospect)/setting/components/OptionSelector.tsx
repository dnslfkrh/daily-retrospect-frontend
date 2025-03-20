import { motion, AnimatePresence } from "framer-motion";

type Option<T> = {
  label: string;
  value: T;
  description: string;
};

type OptionSelectorProps<T> = {
  title: string;
  options: Option<T>[];
  selectedOption: T;
  setSelectedOption: (value: T) => void;
};

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
      <div className="relative flex justify-between w-full">
        {options.map((option) => (
          <motion.button
            key={option.value as string}
            onClick={() => setSelectedOption(option.value)}
            animate={{ scale: selectedOption === option.value ? 1.1 : 1 }}
            transition={{ type: "spring", stiffness: 300, damping: 15 }}
            className={`px-4 py-2 font-medium transition-colors duration-200 
              ${selectedOption === option.value ? "text-black dark:text-gray-200" : "text-gray-600 dark:text-gray-400"}`}
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
          transition={{ duration: 0.3 }}
          className="mt-4 text-sm text-center text-gray-700 dark:text-gray-400"
        >
          {options.find((o) => o.value === selectedOption)?.description}
        </motion.p>
      </AnimatePresence>
    </div>
  );
};