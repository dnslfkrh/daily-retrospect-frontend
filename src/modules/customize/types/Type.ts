type Option<T> = {
  label: string;
  value: T;
  description: string;
};

export type OptionSelectorType<T> = {
  title: string;
  options: Option<T>[];
  selectedOption: T;
  setSelectedOption: (value: T) => void;
};