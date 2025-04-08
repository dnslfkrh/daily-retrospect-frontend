"use client";

import { useUserName } from "../hooks/useUserName";
import Link from "next/link";
import CardGroup from "@/shared/components/CardGroup";

const MyScreen = () => {
  const userName = useUserName();

  const handleLogout = () => {
    window.location.href = `${process.env.NEXT_PUBLIC_COGNITO_LOGOUT_URL}`;
  };

  return (
    <div className="p-6 bg-white dark:bg-gray-900 min-h-screen text-gray-800 dark:text-white">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-xl font-bold">
          {userName ? `안녕하세요, ${userName}님` : "불러오는 중..."}
        </h1>
        <button
          onClick={handleLogout}
          className="px-3 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 dark:bg-red-600 dark:hover:bg-red-700 transition-colors"
        >
          로그아웃
        </button>
      </div>

      <div className="space-y-8">
        {/* 회고 그룹 */}
        <div>
          <h2 className="text-sm font-semibold text-gray-600 dark:text-gray-400 mb-2">회고</h2>
          <CardGroup>
            {[
              <Link href="/my/customize" key="customize">
                <div className="flex items-center">
                  <span className="mr-3">📝</span> 맞춤형 회고 설정하기
                </div>
              </Link>,
              <Link href="/my/calendar" key="calendar">
                <div className="flex items-center">
                  <span className="mr-3">📅</span> 회고 작성 달력 보기
                </div>
              </Link>,
            ]}
          </CardGroup>
        </div>

        {/* 목표 그룹 */}
        <div>
          <h2 className="text-sm font-semibold text-gray-600 dark:text-gray-400 mb-2">목표</h2>
          <CardGroup>
            {[
              <Link href="/my/graph" key="graph">
                <div className="flex items-center">
                  <span className="mr-3">📊</span> 목표 진행도 평가 보기
                </div>
              </Link>,
            ]}
          </CardGroup>
        </div>

        {/* 회원 기능 그룹 */}
        <div>
          <h2 className="text-sm font-semibold text-gray-600 dark:text-gray-400 mb-2">회원 기능</h2>
          <CardGroup>
            {[
              <Link href="/my/password" key="password">
                <div className="flex items-center">
                  <span className="mr-3">🔒</span> 비밀번호 변경하기
                </div>
              </Link>,
              <Link href="/my/delete" key="delete">
                <div className="flex items-center">
                  <span className="mr-3">❌</span> 탈퇴하기
                </div>
              </Link>,
            ]}
          </CardGroup>
        </div>
      </div>
    </div>
  );
};

export default MyScreen;
