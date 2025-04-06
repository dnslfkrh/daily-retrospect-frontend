"use client";

import { CardGroup } from "../components/CardGroup";
import { CardItem } from "../components/CardItem";
import { useHomeData } from "../hooks/useHomeData";
import { getConsecutiveDays } from "../utils/getConsecutiveDays";

const HomeScreen = () => {
  const {
    loading,
    session,
    goals,
    retrospectDates,
    goalScores,
    lastSummary,
  } = useHomeData();

  const today = new Date();
  const isWrittenToday = !!session?.answers?.length;

  const ongoingGoals = goals
    .filter((goal) => {
      const start = new Date(goal.start_date);
      const end = new Date(goal.end_date);
      return start <= today && today <= end;
    })
    .sort((a, b) => new Date(a.end_date).getTime() - new Date(b.end_date).getTime());

  const nearestEndingGoal = ongoingGoals?.[0];

  const averageScore = goalScores.length
    ? (
      goalScores.reduce((sum, item) => sum + Number(item.answer), 0) /
      goalScores.length
    ).toFixed(1)
    : null;

  const consecutiveDays = getConsecutiveDays(retrospectDates);

  return (
    <div className="p-6 w-full bg-white flex flex-col dark:bg-gray-900 min-h-screen text-gray-800 dark:text-white overflow-y-auto">
      <h1 className="text-2xl font-bold mb-6">오늘도 하루를 살아갑니다</h1>
      <div className="space-y-6">
        {/* 회고 카드 */}
        <CardGroup>
          <CardItem
            href="/retrospect"
            title="오늘의 회고"
            description={
              isWrittenToday
                ? "오늘 회고를 이미 작성했어요."
                : "아직 회고를 작성하지 않았어요."
            }
          />
        </CardGroup>

        {/* 목표 카드 */}
        <CardGroup>
          <CardItem
            href="/goal"
            title="진행 중인 목표"
            description={
              ongoingGoals.length
                ? `${ongoingGoals.length}개의 목표가 진행 중입니다.`
                : "진행 중인 목표가 없어요."
            }
          />
          <CardItem
            title="종료될 예정인 목표"
            description={
              nearestEndingGoal
                ? `가장 먼저 종료될 목표는 "${nearestEndingGoal.title}"입니다.`
                : "종료 예정인 목표가 없어요."
            }
          />
        </CardGroup>

        {/* 회고 요약 카드 */}
        <CardGroup>
          <CardItem
            href="/my/calendar"
            title="회고 캘린더"
            description={`지금까지 ${retrospectDates.length}일 회고를 작성했어요.`}
          />
          <CardItem
            title="연속 회고 작성"
            description={
              consecutiveDays > 0
                ? `${consecutiveDays}일 연속으로 회고를 작성했어요.`
                : "매일 회고를 작성해보세요!"
            }
          />
          <CardItem
            title="마지막 정리된 회고"
            description={
              lastSummary?.trim().length
                ? (lastSummary.length > 80 ? `${lastSummary.slice(0, 80)}...` : lastSummary)
                : "회고를 작성해 보세요."
            }
          />
        </CardGroup>

        {/* 점수 카드 */}
        <CardGroup>
          <CardItem
            href="/my/graph"
            title="목표 평가 점수"
            description={
              averageScore
                ? `평균 점수는 ${averageScore}점입니다.`
                : "아직 목표 평가 점수가 없어요."
            }
          />
        </CardGroup>
      </div>

      {loading && (
        <p className="mt-6 text-sm text-gray-500 dark:text-gray-400">
          불러오는 중...
        </p>
      )}
    </div>
  );
};

export default HomeScreen;
