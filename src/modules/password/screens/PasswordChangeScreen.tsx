"use client";

import { usePasswordChange } from "../hooks/usePasswordChange";

const PasswordChangeScreen = () => {
  const {
    isSocialUser,
    currentPassword,
    newPassword,
    error,
    successMessage,
    setCurrentPassword,
    setNewPassword,
    handleChangePassword,
  } = usePasswordChange();

  return (
    <div className="flex flex-col items-center w-full p-4 pt-48">
      <div className="w-[90%] max-w-md bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
        <h2 className="text-2xl font-semibold text-gray-900 dark:text-white text-center mb-4">
          비밀번호 변경
        </h2>

        {isSocialUser === null ? (
          <p className="text-center text-gray-500 dark:text-gray-400">사용자 유형 확인 중..</p>
        ) : isSocialUser ? (
          <p className="text-center text-lg text-red-500">
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

export default PasswordChangeScreen;
