"use client";

import Link from "next/link";
import { useHomeData } from "../hooks/useHomeData";
import { getConsecutiveDays } from "../utils/getConsecutiveDays";
import CardGroup from "@/shared/components/CardGroup";

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
    .sort((a, b) => new Date(b.end_date).getTime() - new Date(a.end_date).getTime());

  const nearestEndingGoal = ongoingGoals?.[0];

  const averageScore = goalScores.length
    ? (
      goalScores.reduce((sum, item) => sum + Number(item.answer), 0) /
      goalScores.length
    ).toFixed(1)
    : null;

  const consecutiveDays = getConsecutiveDays(retrospectDates);

  return (
    <div className="p-6 bg-white dark:bg-gray-900 min-h-screen text-gray-800 dark:text-white">
      <h1 className="text-xl font-bold mb-6">명언 한줄 추가 ㄱㄱ</h1>

      {loading ? (
        <p className="mt-6 text-sm text-gray-500 dark:text-gray-400">불러오는 중...</p>
      ) : (
        <div className="space-y-8">
          {/* 회고 그룹 */}
          <div>
            <h2 className="text-md font-semibold text-gray-600 dark:text-gray-400 mb-2">회고</h2>
            <CardGroup>
              {[
                <Link href="/retrospect" key="retrospect-link">
                  <div className="flex items-center">
                    <span className="mr-3">📝</span>
                    {isWrittenToday ? "오늘 회고를 이미 작성했어요." : "오늘 회고를 작성해보세요."}
                  </div>
                </Link>
              ]}
            </CardGroup>
          </div>

          {/* 목표 그룹 */}
          <div>
            <h2 className="text-md font-semibold text-gray-600 dark:text-gray-400 mb-2">목표</h2>
            <CardGroup>
              <Link href="/goal" key="retrospect-link">
                <div className="flex items-center">
                  <span className="mr-3">🎯</span>
                  {ongoingGoals.length
                    ? `${ongoingGoals.length}개의 목표가 진행 중입니다.`
                    : "진행 중인 목표가 없어요."}
                </div>
              </Link>

              <Link href="/goal">
                <div className="flex items-center">
                  <span className="mr-3">⏰</span>
                  {nearestEndingGoal
                    ? `가장 먼저 종료될 목표는 "${nearestEndingGoal.title}"입니다.`
                    : "종료 예정인 목표가 없어요."}
                </div>
              </Link>
            </CardGroup>
          </div>

          {/* 캘린더 그룹 */}
          <div>
            <h2 className="text-md font-semibold text-gray-600 dark:text-gray-400 mb-2">캘린더</h2>
            <CardGroup>
              <Link href="/my/calendar" key="retrospect-link">
                <div className="flex items-center">
                  <span className="mr-3">📅</span>
                  지금까지 {retrospectDates.length}일 회고를 작성했어요.
                </div>
              </Link>

              <Link href="/my/calendar" key="retrospect-link">
                <div className="flex items-center">
                  <span className="mr-3">🔥</span>
                  {consecutiveDays > 0
                    ? `${consecutiveDays}일 연속으로 회고를 작성했어요.`
                    : "매일 회고를 작성해 보세요!"}
                </div>
              </Link>

              <Link href="/my/calendar" key="retrospect-link">
                <div className="flex items-center">
                  <span className="mr-3">🧠</span>
                  {lastSummary?.trim().length
                    ? lastSummary.length > 80
                      ? `${lastSummary.slice(0, 80)}...`
                      : lastSummary
                    : "최근 회고 요약이 없어요."}
                </div>
              </Link>
            </CardGroup>
          </div>

          {/* 점수 그룹 */}
          <div>
            <h2 className="text-md font-semibold text-gray-600 dark:text-gray-400 mb-2">점수</h2>
            <CardGroup>
              {[
                <Link href="/my/graph" key="retrospect-link">
                  <div className="flex items-center">
                    <span className="mr-3">📊</span>
                    {averageScore
                      ? `평균 점수는 ${averageScore}점입니다.`
                      : "아직 목표 평가 점수가 없어요."}
                  </div>
                </Link>
              ]}
            </CardGroup>
          </div>
        </div>
      )}
    </div>
  );
};

export default HomeScreen;
