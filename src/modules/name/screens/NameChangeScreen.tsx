"use client";

import { useState } from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { fetchChangeName } from "../services/fetchChangeName";

const NameChangeScreen = () => {
  const [newName, setNewName] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleChangeName = async () => {
    if (!newName.trim()) {
      toast.error("새 이름을 입력해 주세요.");
      return;
    }

    setLoading(true);
    try {
      await fetchChangeName(newName);
      toast.success("이름이 성공적으로 변경되었습니다.");
      router.push("/my");
    } catch (error) {
      toast.error("이름 변경에 실패했습니다. 다시 시도해주세요.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center w-full p-4 pt-48">
      <div className="w-[90%] max-w-md bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white text-center mb-4">
          이름 변경
        </h2>
        <input
          type="text"
          value={newName}
          onChange={(e) => setNewName(e.target.value)}
          placeholder="새 이름 입력"
          className="w-full p-2 border border-gray-300 rounded dark:bg-gray-700 dark:border-gray-600 dark:text-white focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-gray-500"
        />
        <button
          onClick={handleChangeName}
          disabled={loading}
          className={`w-full mt-4 font-medium py-2 px-4 rounded transition-colors ${loading
            ? "opacity-50 cursor-not-allowed"
            : "bg-black text-white hover:bg-gray-800 dark:bg-gray-500 dark:hover:bg-gray-600"
            }`}
        >
          {loading ? "변경 중..." : "변경하기"}
        </button>
      </div>
    </div>
  );
};

export default NameChangeScreen;