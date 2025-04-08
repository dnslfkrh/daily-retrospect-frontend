"use client";

import { useCalendar } from "../hooks/useCalendar";
import MonthNavigation from "../components/MonthNavigation";
import DayOfWeek from "../components/DayOfWeek";
import DayButton from "../components/DayButton";
import SelectedDateSummary from "../components/SelectedDateSummary";
import { isSameDay } from "date-fns";

const CalendarScreen = () => {
  const {
    currentMonth,
    daysInMonth,
    retrospectDates,
    selectedDate,
    summary,
    emptyDays,
    handlePrevMonth,
    handleNextMonth,
    handleDateClick,
  } = useCalendar();

  return (
    <div className="flex flex-col items-center p-4 mt-4">
      <div className="w-full bg-white dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-700" style={{ maxWidth: "336px" }}>
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
        <div className="w-full bg-white dark:bg-gray-800 p-5 rounded-lg mt-6" style={{ maxWidth: "336px" }}>
          <SelectedDateSummary selectedDate={selectedDate} summary={summary} />
        </div>
      )}
    </div>
  );
};

export default CalendarScreen;
