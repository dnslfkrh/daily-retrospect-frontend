"use client";

import { useLoadingStore } from "../store/useLoading.store";

const LoadingText = () => {
  const { isLoading } = useLoadingStore();

  if (!isLoading) {
    return null;
  }

  return (
    <div className="absolute inset-0 flex items-center justify-center bg-white dark:bg-gray-900 bg-opacity-90 z-50">
      <p className="text-lg font-semibold text-gray-800 dark:text-gray-200">불러오는 중...</p>
    </div>
  );
};

export default LoadingText;