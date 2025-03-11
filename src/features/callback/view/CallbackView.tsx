"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

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
        alert("로그인에 실패했습니다. 다시 시도해주세요.");
        router.push("/auth");
      }
    };

    handleCallback();
  }, []);

  return (
    <div className="flex items-center justify-center h-screen">
      로그인 중...
    </div>
  );
}

export default CallbackView;