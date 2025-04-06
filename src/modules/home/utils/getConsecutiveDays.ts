export const getConsecutiveDays = (dates: string[]): number => {
  const today = new Date();
  const yesterday = new Date(today);
  yesterday.setDate(today.getDate() - 1);

  const dateSet = new Set(dates);
  let count = 0;
  const checkDate = new Date(yesterday);

  while (dateSet.has(checkDate.toISOString().slice(0, 10))) {
    count += 1;
    checkDate.setDate(checkDate.getDate() - 1);
  }

  return count;
};
