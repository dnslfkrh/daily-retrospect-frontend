"use client";

import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { fetchDeleteAccount } from "../services/fetchDeleteAccount";
import { handleLogout } from "@/shared/utils/logout";

const DeleteAccountScreen = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleDelete = async () => {
    if (!email) {
      toast.error("이메일을 입력해주세요.");
      return;
    }

    setLoading(true);
    try {
      await fetchDeleteAccount(email);
      toast.success("회원 탈퇴가 완료되었습니다.");
      router.push("/auth");
      handleLogout();
    } catch (error: any) {
      console.error(error);
      toast.error(error?.response?.data?.message || "탈퇴 중 오류가 발생했습니다.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-42 p-6 bg-white dark:bg-gray-700 rounded-2xl border border-zinc-200 dark:border-zinc-700 w-[95%]">
      <h1 className="text-xl font-bold text-zinc-900 dark:text-white mb-4">회원 탈퇴</h1>
      <p className="text-sm mb-6 text-muted-foreground">
        탈퇴 시 모든 데이터가 삭제되며 복구할 수 없습니다.
        <br />
        가입 시 사용한 이메일을 입력해주세요.
      </p>

      <input
        type="email"
        placeholder="이메일 입력"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="w-full px-4 py-2 mb-4 border rounded-md bg-white dark:bg-zinc-800 border-zinc-300 dark:border-zinc-600 text-zinc-900 dark:text-white placeholder-zinc-400 dark:placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-red-500"
      />

      <button
        onClick={handleDelete}
        disabled={loading}
        className={`w-full py-2 px-4 rounded-md text-white font-semibold transition 
          ${loading ? "bg-red-400" : "bg-red-600 hover:bg-red-700"}
          disabled:opacity-60`}
      >
        {loading ? "탈퇴 중..." : "회원 탈퇴하기"}
      </button>
    </div>
  );
}

export default DeleteAccountScreen;