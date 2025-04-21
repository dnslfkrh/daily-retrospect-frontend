import { useEffect, useState } from "react";
import { subMonths, addMonths, startOfMonth, endOfMonth, eachDayOfInterval, isSameDay, isSameMonth, getDay } from "date-fns";
import { fetchRetrospectDates } from "../../../shared/services/fetchRetrospectDates";
import { fetchSummary } from "../services/fetchSummary";

export const useCalendar = () => {
  const [currentMonth, setCurrentMonth] = useState<Date>(new Date());
  const [retrospectDates, setRetrospectDates] = useState<Date[]>([]);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [summary, setSummary] = useState<string>("");

  useEffect(() => {
    const loadRetrospectDates = async () => {
      const dates = await fetchRetrospectDates();
      setRetrospectDates(dates);
    };
    loadRetrospectDates();
  }, []);

  const handlePrevMonth = () => {
    setSelectedDate(null);
    setCurrentMonth(subMonths(currentMonth, 1));
  };

  const handleNextMonth = () => {
    if (isSameMonth(currentMonth, new Date())) {
      return;
    }
    setSelectedDate(null);
    setCurrentMonth(addMonths(currentMonth, 1));
  };

  const handleDateClick = async (date: Date) => {
    if (!retrospectDates.some(d => isSameDay(d, date))) {
      return;
    }
    setSelectedDate(date);
    const summaryData = await fetchSummary(date);
    setSummary(summaryData);
  };

  const daysInMonth = eachDayOfInterval({
    start: startOfMonth(currentMonth),
    end: endOfMonth(currentMonth),
  });

  const firstDayIndex = getDay(daysInMonth[0]);
  const emptyDays = Array(firstDayIndex).fill(null);

  return {
    currentMonth,
    daysInMonth,
    retrospectDates,
    selectedDate,
    summary,
    emptyDays,
    handlePrevMonth,
    handleNextMonth,
    handleDateClick,
  };
};
