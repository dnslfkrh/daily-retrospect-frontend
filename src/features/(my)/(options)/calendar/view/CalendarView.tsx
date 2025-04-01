"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { format, subMonths, addMonths, startOfMonth, endOfMonth, eachDayOfInterval, isSameDay, isSameMonth, getDay } from "date-fns";
import { CheckCircle, ChevronLeft, ChevronRight } from "lucide-react";

const months = [
  "1월", "2월", "3월", "4월", "5월", "6월", "7월", "8월", "9월", "10월", "11월", "12월"
];

const fetchRetrospectDates = async (): Promise<Date[]> => {
  // TODO: Replace with actual API call
  return [
    "2025-03-28 00:44:43.654000",
    "2025-03-29 05:35:35.731684",
    "2025-03-28 06:44:02.976000",
    "2025-04-01 14:59:17.109845",
  ].map(date => new Date(date));
};

const fetchSummary = async (date: Date): Promise<string> => {
  // TODO: Replace with actual API call
  return `Summary for ${format(date, "yyyy-MM-dd")}`;
};

const CalendarView = () => {
  const [currentMonth, setCurrentMonth] = useState<Date>(new Date());
  const [retrospectDates, setRetrospectDates] = useState<Date[]>([]);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [summary, setSummary] = useState<string>("");
  const monthName = months[currentMonth.getMonth()];

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
    setCurrentMonth(subMonths(currentMonth, 1));
  };

  const handleNextMonth = () => {
    if (isSameMonth(currentMonth, new Date())) return;
    setCurrentMonth(addMonths(currentMonth, 1));
  };

  const handleDateClick = async (date: Date) => {
    if (!retrospectDates.some(d => isSameDay(d, date))) return;
    setSelectedDate(date);
    const summaryData = await fetchSummary(date);
    setSummary(summaryData);
  };

  return (
    <div className="p-4 max-w-md mx-auto mt-8">
      <div className="flex justify-between items-center mb-4">
        <button onClick={handlePrevMonth} className="p-2 rounded-full hover:bg-gray-200">
          <ChevronLeft />
        </button>
        <h2 className="text-xl font-semibold">{`${format(currentMonth, "yyyy")}년 ${monthName}`}</h2>
        <button onClick={handleNextMonth} disabled={isSameMonth(currentMonth, new Date())} className="p-2 rounded-full hover:bg-gray-200 disabled:opacity-50">
          <ChevronRight />
        </button>
      </div>
      <div className="grid grid-cols-7 gap-1">
        {["일", "월", "화", "수", "목", "금", "토"].map(day => (
          <div key={day} className="text-center font-semibold">{day}</div>
        ))}
        {emptyDays.map((_, index) => (
          <div key={`empty-${index}`} className="w-10 h-10"></div>
        ))}
        {daysInMonth.map(day => (
          <motion.button
            key={day.toISOString()}
            onClick={() => handleDateClick(day)}
            className={`w-10 h-10 flex items-center justify-center rounded-full transition-all ${retrospectDates.some(d => isSameDay(d, day)) ? "bg-green-500 text-white" : "hover:bg-gray-200"}`}
          >
            {format(day, "d")}
            {retrospectDates.some(d => isSameDay(d, day)) && <CheckCircle className="w-4 h-4 absolute" />}
          </motion.button>
        ))}
      </div>
      {selectedDate && (
        <div className="mt-4 p-4 border rounded-lg">
          <h3 className="font-semibold">{format(selectedDate, "yyyy-MM-dd")}</h3>
          <p>{summary}</p>
        </div>
      )}
    </div>
  );
};

export default CalendarView;