import React, { useState, useRef, useCallback } from "react";

const TimeAnswer = ({ value, onChange }: { value: string; onChange: (val: string) => void }) => {
  const [hour, setHour] = useState(0);
  const [minute, setMinute] = useState(0);
  const [isPM, setIsPM] = useState(false);
  const [isDragging, setIsDragging] = useState(false);

  const clockRef = useRef<HTMLDivElement>(null);

  const calculateAngleFromMouse = useCallback((e: React.MouseEvent | MouseEvent) => {
    if (!clockRef.current) return 0;
    
    const rect = clockRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const dx = e.clientX - centerX;
    const dy = e.clientY - centerY;
    
    // 12시 방향을 0도로 하는 각도 계산
    let angle = Math.atan2(dx, -dy) * (180 / Math.PI);
    if (angle < 0) angle += 360;
    
    return angle;
  }, []);

  const updateTime = useCallback((newHour: number, newMinute: number, newIsPM: boolean) => {
    const timeString = `${String(newHour).padStart(2, "0")}:${String(newMinute).padStart(2, "0")}`;
    onChange(timeString);
  }, [onChange]);

  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    const angle = calculateAngleFromMouse(e);
    setIsDragging(true);
    
    // 12시간을 한 바퀴로 계산 (360도 / 720분 = 0.5도 = 1분)
    const minutesInCircle = Math.round(angle / 0.5) % 720; // 12시간 * 60분 = 720분
    const newHourIn12 = Math.floor(minutesInCircle / 60);
    const newMinute = minutesInCircle % 60;
    
    // 현재 AM/PM 상태 기준으로 실제 시간 계산
    const newHour = isPM ? newHourIn12 + 12 : newHourIn12;
    const finalHour = newHour % 24;
    
    setHour(finalHour);
    setMinute(newMinute);
    updateTime(finalHour, newMinute, isPM);
  }, [calculateAngleFromMouse, isPM, updateTime]);

  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (!isDragging) return;
    
    const angle = calculateAngleFromMouse(e);
    
    // 현재 시간을 기준으로 총 분 계산
    const currentTotalMinutes = hour * 60 + minute;
    const newMinutesInCircle = Math.round(angle / 0.5) % 720;
    const newHourIn12 = Math.floor(newMinutesInCircle / 60);
    const newMinute = newMinutesInCircle % 60;
    
    // 이전 위치와 현재 위치 비교하여 바퀴 변화 감지
    const prevMinutesInCircle = ((hour % 12) * 60 + minute) % 720;
    let newIsPM = isPM;
    
    // 12시(0도) 근처에서 바퀴가 바뀌었는지 확인
    if (prevMinutesInCircle > 600 && newMinutesInCircle < 120) {
      // 시계방향으로 12시를 넘어감 (AM->PM 또는 PM->AM)
      newIsPM = !isPM;
    } else if (prevMinutesInCircle < 120 && newMinutesInCircle > 600) {
      // 반시계방향으로 12시를 넘어감 (PM->AM 또는 AM->PM)
      newIsPM = !isPM;
    }
    
    const newHour = newIsPM ? newHourIn12 + 12 : newHourIn12;
    const finalHour = newHour % 24;
    
    setHour(finalHour);
    setMinute(newMinute);
    setIsPM(newIsPM);
    updateTime(finalHour, newMinute, newIsPM);
  }, [isDragging, calculateAngleFromMouse, hour, minute, isPM, updateTime]);

  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
  }, []);

  React.useEffect(() => {
    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
      return () => {
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
      };
    }
  }, [isDragging, handleMouseMove, handleMouseUp]);

  return (
    <div className="flex flex-col items-center mt-8">
      <div
        ref={clockRef}
        onMouseDown={handleMouseDown}
        className="relative w-48 h-48 rounded-full border-4 border-gray-300 dark:border-gray-600 cursor-pointer bg-white dark:bg-gray-800 shadow-lg"
        style={{ userSelect: 'none' }}
      >
        {/* 중심점 */}
        <div className="absolute w-3 h-3 bg-gray-800 dark:bg-gray-200 rounded-full left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 z-20" />
        
        {/* 시침 (12시간 기준) */}
        <div
          className="absolute w-1 bg-gray-800 dark:bg-gray-200 left-1/2 top-1/2 origin-bottom z-10 rounded-full"
          style={{
            height: '50px',
            transform: `translate(-50%, -100%) rotate(${((hour % 12) * 30) + (minute * 0.5)}deg)`,
          }}
        />
        
        {/* 분침 */}
        <div
          className="absolute w-0.5 bg-gray-600 dark:bg-gray-400 left-1/2 top-1/2 origin-bottom z-10 rounded-full"
          style={{
            height: '70px',
            transform: `translate(-50%, -100%) rotate(${minute * 6}deg)`,
          }}
        />
        
        {/* 시간 숫자 (12시간 표시) */}
        {[...Array(12)].map((_, i) => {
          const hourNum = i === 0 ? 12 : i;
          const angle = i * 30; // 360도 / 12시간 = 30도
          const x = 96 + 75 * Math.sin((angle * Math.PI) / 180);
          const y = 96 - 75 * Math.cos((angle * Math.PI) / 180);
          return (
            <div
              key={i}
              className="absolute text-lg font-semibold text-gray-700 dark:text-gray-300 select-none"
              style={{
                left: `${x}px`,
                top: `${y}px`,
                transform: "translate(-50%, -50%)",
              }}
            >
              {hourNum}
            </div>
          );
        })}
        
        {/* 분 표시 (5분 단위) */}
        {[...Array(12)].map((_, i) => {
          const minuteNum = i * 5;
          const angle = minuteNum * 6;
          const x = 96 + 85 * Math.sin((angle * Math.PI) / 180);
          const y = 96 - 85 * Math.cos((angle * Math.PI) / 180);
          return (
            <div
              key={`min-${i}`}
              className="absolute w-1 h-1 bg-gray-400 dark:bg-gray-500 rounded-full"
              style={{
                left: `${x}px`,
                top: `${y}px`,
                transform: "translate(-50%, -50%)",
              }}
            />
          );
        })}
      </div>
      
      <div className="mt-6 text-2xl font-bold text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-700 px-4 py-2 rounded-lg">
        {`${String(hour).padStart(2, "0")}:${String(minute).padStart(2, "0")} ${isPM ? "PM" : "AM"}`}
      </div>
      
      <div className="mt-4 text-sm text-gray-500 dark:text-gray-400 text-center">
        시계를 드래그하면 분 단위로 시간이 조정됩니다.<br/>
        12시를 넘어가면 AM/PM이 자동으로 바뀝니다.
      </div>
    </div>
  );
};

export default TimeAnswer;