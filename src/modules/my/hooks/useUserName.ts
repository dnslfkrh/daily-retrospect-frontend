import { useEffect, useState } from "react";
import jwtDecode from "jsonwebtoken";

export const useUserName = () => {
  const [userName, setUserName] = useState<string | null>(null);

  useEffect(() => {
    const getUserNameFromToken = (idToken: string | null): string | null => {
      if (!idToken) {
        return null;
      }

      try {
        const decoded = jwtDecode.decode(idToken);

        if (typeof decoded === "object" && decoded !== null && "name" in decoded) {
          return (decoded as { name?: string }).name || "알 수 없는 사용자";
        }

        return "알 수 없는 사용자";
      } catch (error) {
        console.error("토큰 디코딩 오류:", error);
        return "알 수 없는 사용자";
      }
    };

    const idToken = localStorage.getItem("id_token");
    const name = getUserNameFromToken(idToken);
    setUserName(name);
  }, []);

  return userName;
};
