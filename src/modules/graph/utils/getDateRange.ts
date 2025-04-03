export const getDateRange = (period: '1m' | '3m' | '6m' | '1y') => {
  const now = new Date();
  let startDate = new Date();

  switch (period) {
    case '1m': startDate.setMonth(now.getMonth() - 1); break;
    case '3m': startDate.setMonth(now.getMonth() - 3); break;
    case '6m': startDate.setMonth(now.getMonth() - 6); break;
    case '1y': startDate.setFullYear(now.getFullYear() - 1); break;
  }

  return { startDate, endDate: now };
};