"use client";

import { usePathname, useRouter } from "next/navigation";
import { Home, ListChecks, Target, User, Image } from "lucide-react";

const BottomNav = () => {
  const router = useRouter();
  const pathname = usePathname();

  if (pathname === "/auth") {
    return null;
  }

  return (
    <nav className="fixed bottom-0 left-1/2 transform -translate-x-1/2 w-full max-w-[450px] bg-white dark:bg-gray-900">
      <div className="grid grid-cols-5">
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
          <span className="text-xs">회고</span>
        </button>

        <button
          className="w-full flex flex-col justify-center items-center py-4 text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white"
          onClick={() => router.push("/goal")}
        >
          <Target size={24} className="mb-1" />
          <span className="text-xs">목표</span>
        </button>

        <button
          className="w-full flex flex-col justify-center items-center py-4 text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white"
          onClick={() => router.push("/image")}
        >
          <Image size={24} className="mb-1" />
          <span className="text-xs">사진</span>
        </button>

        <button
          className="w-full flex flex-col justify-center items-center py-4 text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white"
          onClick={() => router.push("/my")}
        >
          <User size={24} className="mb-1" />
          <span className="text-xs">마이</span>
        </button>
      </div>
    </nav>
  );
};

export default BottomNav;