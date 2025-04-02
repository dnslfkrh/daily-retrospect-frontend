import { format } from "date-fns";

const SelectedDateSummary = ({ selectedDate, summary }: { selectedDate: Date, summary: string | null; }) => {
  if (!selectedDate) {
    return null;
  }

  return (
    <div className="w-full mx-auto" style={{ maxWidth: "100%", overflowWrap: "break-word" }}>
      <h3 className="font-semibold mb-3">AI로 요약한 {format(selectedDate, "yyyy년 MM월 dd일")} 회고</h3>
      <p className="whitespace-pre-wrap break-words overflow-hidden">
        {summary ? summary : "아직 준비되지 않았습니다."}
      </p>
    </div>
  );
};

export default SelectedDateSummary;
