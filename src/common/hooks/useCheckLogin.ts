import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { api } from "../services/api";
import { config } from "../libs/config";

export const useCheckLogin = () => {
  const router = useRouter();

  useEffect(() => {
    const checkAndRefreshToken = async () => {
      const accessToken = localStorage.getItem("access_token");

      if (!accessToken) {
        try {
          const response = await api.post(`${config.backendUrl}/auth/refresh`);
          const { access_token: newAccessToken } = response.data;

          if (newAccessToken) {
            localStorage.setItem("access_token", newAccessToken);
          } else {
            throw new Error("No access token received");
          }
        } catch (err) {
          console.warn("자동 로그인 실패: 리프레시 토큰 없음 또는 만료됨", err);
          localStorage.removeItem("access_token");
          localStorage.removeItem("id_token");

          if (window.location.pathname !== "/auth") {
            router.replace("/auth");
          }
        }
      }
    };

    checkAndRefreshToken();
  }, [router]);
};