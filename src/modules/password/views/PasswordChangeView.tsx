"use client";

import { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import { fetchChangePassword } from "../services/fetchChangePassword";
import { fetchUserInfo } from "../services/fetchUserInfo";
import { useRouter } from "next/navigation";

const PasswordChangeView = () => {
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
      alert("소셜 로그인 사용자는 비밀번호를 변경할 수 없습니다.");
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

      router.push("/my");
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || "비밀번호 변경에 실패했습니다. 다시 시도해주세요.";
      setError(errorMessage);
    }
  };

  return (
    <div className="flex flex-col items-center w-full p-4 pt-48">
      <div className="w-[90%] max-w-md bg-gray-50 dark:bg-gray-800 shadow-md rounded-lg p-4">
        <h2 className="text-2xl font-semibold text-gray-900 dark:text-white text-center mb-4">
          비밀번호 변경
        </h2>

        {isSocialUser === null ? (
          <p className="text-center text-gray-500 dark:text-gray-400">사용자 유형 확인 중..</p>
        ) : isSocialUser ? (
          <p className="text-center text-red-500">
            소셜 로그인 사용자는 비밀번호를 변경할 수 없습니다.
          </p>
        ) : (
          <>
            <label className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">
              현재 비밀번호
            </label>
            <input
              type="password"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded dark:bg-gray-700 dark:border-gray-600 dark:text-white focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-gray-500"
            />

            <label className="block mt-4 mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">
              새 비밀번호
            </label>
            <input
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded dark:bg-gray-700 dark:border-gray-600 dark:text-white focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-gray-500"
            />

            {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
            {successMessage && <p className="text-green-500 text-sm mt-2">{successMessage}</p>}

            <button
              onClick={handleChangePassword}
              className="w-full mt-4 bg-black text-white font-medium py-2 px-4 rounded"
            >
              변경하기
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default PasswordChangeView;
