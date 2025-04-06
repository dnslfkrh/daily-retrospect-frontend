"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

const CallbackView = () => {
  const router = useRouter();

  useEffect(() => {
    const handleCallback = async () => {
      const params = new URLSearchParams(window.location.search);
      const accessToken = params.get("accessToken");
      const idToken = params.get("idToken");

      if (accessToken && idToken) {
        localStorage.setItem("access_token", accessToken);
        localStorage.setItem("id_token", idToken);
        router.push("/home");
      } else {
        console.error("토큰이 없습니다.");
        toast.error("로그인에 실패했습니다.");
        router.push("/auth");
      }
    };

    handleCallback();
  }, [router]);

  return (
    <div className="flex items-center justify-center h-screen bg-gray-200 text-black dark:bg-gray-800 dark:text-white">
      로그인 중...
    </div>
  );
}

export default CallbackView;