"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { handleCognitoCallback } from "../utils/handleCognitoCallback";

const CallbackScreen = () => {
  const router = useRouter();

  useEffect(() => {
    handleCognitoCallback(router);
  }, [router]);

  return (
    <div className="flex items-center justify-center h-screen bg-gray-200 text-black dark:bg-gray-800 dark:text-white">
      로그인 중...
    </div>
  );
};

export default CallbackScreen;