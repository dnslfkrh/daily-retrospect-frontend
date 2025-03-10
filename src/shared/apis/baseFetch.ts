export const baseFetch = async (path: `${string}`, option?: RequestInit) => {
  try {
    const accessToken = localStorage.getItem("accessToken") ?? "";

    const getHeaders = (token?: string) => ({
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...option?.headers as Record<string, string>
    });

    const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}${path}`, {
      ...option,
      headers: getHeaders(accessToken),
      credentials: "include"
    });

    if (response.status === 401) {
      console.warn("[baseFetch] 401 에러 발생, 리프레시 요청 시도");

      const refreshResponse = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/refresh`, {
        method: "GET",
        credentials: "include"
      });

      if (refreshResponse.ok) {
        const { accessToken: newAccessToken } = await refreshResponse.json();
        console.log("[baseFetch] 새 accessToken 발급됨:", newAccessToken);

        localStorage.setItem("accessToken", newAccessToken);

        return fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}${path}`, {
          ...option,
          headers: getHeaders(newAccessToken),
          credentials: "include"
        });
      } else {
        console.error("[baseFetch] refresh 요청 실패, 로그인 페이지로 이동");
        localStorage.removeItem("accessToken");
        if (window.location.pathname !== "/auth") window.location.href = "/auth";
        return null;
      }
    }

    return response;
  } catch (error) {
    console.error("[baseFetch] Network error:", error);
    return null;
  }
};
