interface OptionProps<T> {
  label: string;
  value: T;
  description: string;
};

export interface OptionSelectorProps<T> {
  title: string;
  options: OptionProps<T>[];
  selectedOption: T;
  setSelectedOption: (value: T) => void;
};