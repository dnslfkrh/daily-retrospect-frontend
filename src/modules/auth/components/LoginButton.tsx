"use client";

import { LogIn } from "lucide-react";
import { useCognitoLogin } from "../hooks/useCognitoLogin";

const LoginButton = () => {
  const { login } = useCognitoLogin();

  return (
    <div className="flex flex-col items-center gap-4 p-6 bg-gray-100 dark:bg-gray-800 rounded-lg max-w-sm mx-auto border dark:border-gray-700">
      <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-100">안녕하세요</h2>
      <p className="text-gray-600 dark:text-gray-300 text-center">로그인하여 맞춤형 회고를 작성하고 진행 상황을 추적해 보세요</p>
      <button
        onClick={login}
        className="flex items-center gap-2 px-5 py-3 bg-white text-black font-medium rounded-lg hover:bg-gray-200 dark:bg-gray-700 dark:text-white dark:hover:bg-gray-600 transition"
      >
        <LogIn size={20} />
        시작하기
      </button>
    </div>
  );
};

export default LoginButton;
