"use client";

import { useRouter } from "next/navigation";

const BottomNav = () => {
  const router = useRouter();

  return (
    <nav className="fixed bottom-0 left-1/2 transform -translate-x-1/2 w-full max-w-[450px] bg-white border-t border-gray-200 shadow-md">
      <div className="grid grid-cols-3">
        {/* 일기 작성 */}
        <button
          className="w-full flex justify-center items-center py-6 text-gray-600 hover:text-black"
          onClick={() => router.push("/write")}
        >
          <span className="text-md">write</span>
        </button>

        {/* 홈 버튼 */}
        <button
          className="w-full flex justify-center items-center py-6 text-gray-600 hover:text-black"
          onClick={() => router.push("/home")}
        >
          <span className="text-md">home</span>
        </button>

        {/* 설정(계정) 버튼 */}
        <button
          className="w-full flex justify-center items-center py-6 text-gray-600 hover:text-black"
          onClick={() => router.push("/my")}
        >
          <span className="text-md">my</span>
        </button>
      </div>
    </nav>
  );
};

export default BottomNav;
