"use client";

import { useLoadingStore } from "@/common/store/ui/useLoading.store";

const Loading = () => {
  const { isLoading } = useLoadingStore();

  if (!isLoading) {
    return null;
  }

  return (
    <div className="absolute inset-0 flex items-center justify-center bg-white dark:bg-gray-900 bg-opacity-90 z-50">
      <div className="w-12 h-12 border-4 border-black dark:border-white border-t-transparent rounded-full animate-spin"></div>
    </div>
  );
};

export default Loading;
