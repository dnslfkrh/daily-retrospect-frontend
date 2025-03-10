"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

const CallbackView = () => {
  const router = useRouter();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const accessToken = params.get("accessToken");

    if (accessToken) {
      localStorage.setItem("accessToken", accessToken);
      router.replace("/home");
    } else {
      router.replace("/auth");
    }
  }, [router]);

  return (
    <div className="flex items-center justify-center min-h-screen w-full">
      <p className="text-md">로그인 중..</p>
    </div>
  );
}

export default CallbackView;