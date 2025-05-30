import { useEffect, useState } from "react";
import { fetchUserName } from "../services/fetchUserName";

export const useUserName = () => {
  const [userName, setUserName] = useState<string | null>(null);

  useEffect(() => {
    const fetchName = async () => {
      try {
        const data = await fetchUserName();
        console.log("사용자 이름 데이터:", data);
        setUserName(data || "알 수 없는 사용자");
      } catch (error) {
        setUserName("알 수 없는 사용자");
      }
    };

    fetchName();
  }, []);

  return userName;
};
