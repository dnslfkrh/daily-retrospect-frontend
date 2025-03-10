"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

const AutoLogin = () => {
  const router = useRouter();

  useEffect(() => {
    const checkAndRefreshToken = async () => {
      const accessToken = localStorage.getItem("accessToken");

      if (!accessToken) {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/refresh`, {
          method: "GET",
          credentials: "include",
        });

        if (response.ok) {
          const { accessToken: newAccessToken } = await response.json();
          localStorage.setItem("accessToken", newAccessToken);
        } else {
          localStorage.removeItem("accessToken");
          router.replace("/auth");
        }
      }
    };

    checkAndRefreshToken();
  }, [router]);

  return null;
};

export default AutoLogin;
