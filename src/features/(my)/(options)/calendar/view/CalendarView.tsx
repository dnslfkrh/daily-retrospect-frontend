"use client";

import { useState, useEffect } from "react";
import { subMonths, addMonths, startOfMonth, endOfMonth, eachDayOfInterval, isSameDay, getDay, isSameMonth } from "date-fns";
import MonthNavigation from "../components/MonthNavigation";
import DayOfWeek from "../components/DayOfWeek";
import DayButton from "../components/DayButton";
import SelectedDateSummary from "../components/SelectedDateSummary";
import { fetchRetrospectDates } from "../services/fetchRetrospectDates";
import { fetchSummary } from "../services/fetchSummary";

const CalendarView = () => {
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

  const daysInMonth = eachDayOfInterval({
    start: startOfMonth(currentMonth),
    end: endOfMonth(currentMonth),
  });

  const firstDayIndex = getDay(daysInMonth[0]);
  const emptyDays = Array(firstDayIndex).fill(null);

  const handlePrevMonth = () => {
    setSelectedDate(null);
    setCurrentMonth(subMonths(currentMonth, 1));
  };

  const handleNextMonth = () => {
    if (isSameMonth(currentMonth, new Date())) return;
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

  return (
    <div className="flex flex-col items-center p-4 mt-4">
      <div className="w-full bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 border border-gray-200 dark:border-gray-700" style={{ maxWidth: "336px" }}>
        <MonthNavigation currentMonth={currentMonth} onPrevMonth={handlePrevMonth} onNextMonth={handleNextMonth} />
        <DayOfWeek />
        <div className="grid grid-cols-7 gap-1 mt-2">
          {emptyDays.map((_, index) => (
            <div key={`empty-${index}`} className="w-10 h-10"></div>
          ))}
          {daysInMonth.map(day => (
            <DayButton
              key={day.toISOString()}
              day={day}
              isRetrospectDate={retrospectDates.some(d => isSameDay(d, day))}
              onClick={handleDateClick}
            />
          ))}
        </div>
      </div>

      {selectedDate && (
        <div className="w-full bg-white dark:bg-gray-800 p-5 rounded-lg shadow-md mt-6" style={{ maxWidth: "336px" }}>
          <SelectedDateSummary selectedDate={selectedDate} summary={summary} />
        </div>
      )}
    </div>
  );
};

export default CalendarView;
