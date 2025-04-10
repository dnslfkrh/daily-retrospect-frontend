import axios from "axios"; // Next SSR에서는 axios 대신 fetch 사용
import { config } from "../libs/config";

console.log("API baseURL:", config.backendUrl);

export const api = axios.create({
  baseURL: config.backendUrl,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

// 요청 인터셉터 (access_token 추가)
api.interceptors.request.use((config) => {
  console.log("Request Interceptor: 요청 시작", config); // 요청 시작 로깅
  const accessToken = localStorage.getItem("access_token");
  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
    console.log("Request Interceptor: access_token 추가됨", accessToken ? "Yes" : "No"); // 토큰 추가 여부 로깅
  }
  return config;
});

// 리프레시
async function refreshAccessToken() {
  console.log("refreshAccessToken 함수 호출"); // 리프레시 함수 호출 로깅
  try {
    const response = await axios.post(
      `${config.backendUrl}/auth/refresh`,
      {},
      { withCredentials: true }
    );

    const newAccessToken = response.data.access_token;
    localStorage.setItem("access_token", newAccessToken);
    console.log("refreshAccessToken 성공: 새 access_token 발급됨", newAccessToken); // 리프레시 성공 로깅
    return newAccessToken;
  } catch (error) {
    console.error("Failed to refresh access token:", error); // 리프레시 실패 로깅
    throw error;
  }
}

// 응답 인터셉터 (401 에러 시 리프레시 후 재시도)
api.interceptors.response.use(
  (response) => {
    console.log("Response Interceptor: 응답 성공", response); // 응답 성공 로깅
    return response;
  },
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      console.warn("Response Interceptor: 401 에러 감지, 리프레시 시도"); // 401 에러 감지 로깅
      originalRequest._retry = true;

      try {
        const newAccessToken = await refreshAccessToken();
        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
        console.log("Response Interceptor: 토큰 리프레시 성공, 원래 요청 재시도"); // 리프레시 후 재시도 로깅
        return api(originalRequest);
      } catch (refreshError) {
        console.warn("리프레시 토큰도 만료됨, 로그인 필요");
        console.error(refreshError);
        localStorage.removeItem("access_token");
        if (window.location.pathname !== "/auth") {
          window.location.href = "/auth";
        }
      }
    } else {
      console.error("Response Interceptor: 응답 에러", error); // 기타 응답 에러 로깅
    }

    return Promise.reject(error);
  }
);