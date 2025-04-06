import axios from "axios"; // Next SSR에서는 axios 대신 fetch 사용

export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BACKEND_URL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

// 요청 인터셉터 (access_token 추가)
api.interceptors.request.use((config) => {
  const accessToken = localStorage.getItem("access_token");
  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }
  return config;
});

// 리프레시
async function refreshAccessToken() {
  try {
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/refresh`,
      {},
      { withCredentials: true }
    );

    const newAccessToken = response.data.access_token;
    localStorage.setItem("access_token", newAccessToken);
    return newAccessToken;
  } catch (error) {
    console.error("Failed to refresh access token:", error);
    throw error;
  }
}

// 응답 인터셉터 (401 에러 시 리프레시 후 재시도)
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const newAccessToken = await refreshAccessToken();
        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
        return api(originalRequest);
      } catch (refreshError) {
        console.warn("리프레시 토큰도 만료됨, 로그인 필요");
        console.error(refreshError);
        localStorage.removeItem("access_token");
        if (window.location.pathname !== "/auth") {
          window.location.href = "/auth";
        }
      }
    }

    return Promise.reject(error);
  }
);
