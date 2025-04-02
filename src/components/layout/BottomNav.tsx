"use client";

import { usePathname, useRouter } from "next/navigation";
import { Home, ListChecks, Target, User } from "lucide-react";

const BottomNav = () => {
  const router = useRouter();
  const pathname = usePathname();

  if (pathname === "/auth") {
    return null;
  }

  return (
    <nav className="fixed bottom-0 left-1/2 transform -translate-x-1/2 w-full max-w-[450px] bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700 shadow-md">
      <div className="grid grid-cols-4">
        <button
          className="w-full flex flex-col justify-center items-center py-4 text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white"
          onClick={() => router.push("/home")}
        >
          <Home size={24} className="mb-1" />
          <span className="text-xs">홈</span>
        </button>

        <button
          className="w-full flex flex-col justify-center items-center py-4 text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white"
          onClick={() => router.push("/retrospect")}
        >
          <ListChecks size={24} className="mb-1" />
          <span className="text-xs">회고 작성</span>
        </button>

        <button
          className="w-full flex flex-col justify-center items-center py-4 text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white"
          onClick={() => router.push("/goal")}
        >
          <Target size={24} className="mb-1" />
          <span className="text-xs">목표 관리</span>
        </button>

        <button
          className="w-full flex flex-col justify-center items-center py-4 text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white"
          onClick={() => router.push("/my")}
        >
          <User size={24} className="mb-1" />
          <span className="text-xs">마이페이지</span>
        </button>
      </div>
    </nav>
  );
};

export default BottomNav;