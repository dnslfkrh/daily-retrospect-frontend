import { useEffect, useState } from "react";
import { fetchChangePassword } from "../services/fetchChangePassword";
import { fetchUserInfo } from "../services/fetchUserInfo";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { AxiosError } from "axios";

export const usePasswordChange = () => {
  const [isSocialUser, setIsSocialUser] = useState<boolean | null>(null);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const router = useRouter();

  useEffect(() => {
    const getUserInfo = async () => {
      try {
        const data = await fetchUserInfo();
        setIsSocialUser(data.isSocialUser);
      } catch {
        setError("사용자 정보를 불러오지 못했습니다.");
      }
    };
    getUserInfo();
  }, []);

  const handleChangePassword = async () => {
    if (isSocialUser) {
      toast.error("소셜 로그인 사용자는 비밀번호를 변경할 수 없습니다.");
      return;
    }

    if (!currentPassword || !newPassword) {
      setError("모든 필드를 입력해주세요.");
      return;
    }

    try {
      await fetchChangePassword(currentPassword, newPassword);
      setSuccessMessage("비밀번호가 성공적으로 변경되었습니다.");
      setError("");
      setCurrentPassword("");
      setNewPassword("");

      toast.success("비밀번호가 성공적으로 변경되었습니다.");
      router.push("/my");
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        const errorMessage = error.response?.data?.message || "비밀번호 변경에 실패했습니다. 다시 시도해주세요.";
        setError(errorMessage);
      } else {
        setError("예기치 못한 오류가 발생했습니다.");
      }
    }
  };

  return {
    isSocialUser,
    currentPassword,
    newPassword,
    error,
    successMessage,
    setCurrentPassword,
    setNewPassword,
    handleChangePassword,
  };
};
