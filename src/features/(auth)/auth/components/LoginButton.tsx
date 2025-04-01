"use client";

import { useRouter } from "next/navigation";
import { LogIn } from "lucide-react";

export default function LoginButton() {
  const router = useRouter();

  const handleLogin = () => {
    const REGION = process.env.NEXT_PUBLIC_AWS_REGION;
    const COGNITO_DOMAIN = process.env.NEXT_PUBLIC_COGNITO_DOMAIN;
    const CLIENT_ID = process.env.NEXT_PUBLIC_COGNITO_CLIENT_ID;
    const REDIRECT_URI = process.env.NEXT_PUBLIC_COGNITO_CALLBACK_URL;

    if (!REGION || !COGNITO_DOMAIN || !CLIENT_ID || !REDIRECT_URI) {
      console.error("환경 변수 값이 올바르게 설정되지 않았습니다.");
      return;
    }

    const loginUrl = `https://${COGNITO_DOMAIN}.auth.${REGION}.amazoncognito.com/login` +
      `?client_id=${CLIENT_ID}&response_type=code&scope=email+openid+profile` +
      `&redirect_uri=${encodeURIComponent(REDIRECT_URI)}`;

    router.push(loginUrl);
  };

  return (
    <div className="flex flex-col items-center gap-4 p-6 bg-gray-100 dark:bg-gray-800 rounded-lg shadow-lg max-w-sm mx-auto border dark:border-gray-700">
      <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-100">안녕하세요</h2>
      <p className="text-gray-600 dark:text-gray-300 text-center">로그인하여 맞춤형 회고를 작성하고 진행 상황을 추적해 보세요</p>
      <button
        onClick={handleLogin}
        className="flex items-center gap-2 px-5 py-3 bg-white text-black font-medium rounded-lg shadow-md hover:bg-gray-200 dark:bg-gray-700 dark:text-white dark:hover:bg-gray-600 transition"
      >
        <LogIn size={20} />
        시작하기
      </button>
    </div>
  );
}