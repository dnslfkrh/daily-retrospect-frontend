"use client";

import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

export const handleCognitoCallback = (router: ReturnType<typeof useRouter>) => {
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
