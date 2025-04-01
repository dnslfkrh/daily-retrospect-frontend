const DayOfWeek = () => {
  return (
    <div className="grid grid-cols-7 gap-1">
      {["일", "월", "화", "수", "목", "금", "토"].map(day => (
        <div key={day} className="text-center font-semibold">{day}</div>
      ))}
    </div>
  );
};

export default DayOfWeek;
