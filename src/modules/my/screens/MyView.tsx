"use client";

import { useUserName } from "../hooks/useUserName";
import OptionBlock from "../components/MyPageOptionBlock";

const MyView = () => {
  const userName = useUserName();

  const handleLogout = () => {
    window.location.href = `${process.env.NEXT_PUBLIC_COGNITO_LOGOUT_URL}`;
  };

  return (
    <div className="p-8 bg-white dark:bg-gray-900 min-h-screen">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-xl font-bold text-gray-800 dark:text-white">
          {userName ? `안녕하세요, ${userName}님` : "불러오는 중..."}
        </h1>
        <button
          onClick={handleLogout}
          className="px-3 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 dark:bg-red-600 dark:hover:bg-red-700 transition-colors"
        >
          로그아웃
        </button>
      </div>

      <div className="space-y-4">
        <OptionBlock title="맞춤형 회고 설정하기" link="/my/customize" emoji="📝" />
        <OptionBlock title="회고 작성 달력보기" link="/my/calendar" emoji="📅" />
        <OptionBlock title="목표 진행도 평가보기" link="/my/graph" emoji="📊" />
        <OptionBlock title="비밀번호 변경하기" link="/my/password" emoji="🔒" />
        <OptionBlock title="탈퇴하기" link="/my/delete" emoji="❌" />
      </div>
    </div>
  );
};

export default MyView;
