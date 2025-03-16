"use client";

import { useLoadingStore } from "../store/useLoading.store";

const Loading = () => {
  const { isLoading } = useLoadingStore();

  if (!isLoading) {
    return null;
  }

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-white z-50 border border-gray-200">
      <div className="w-12 h-12 border-4 border-black border-t-transparent rounded-full animate-spin"></div>
    </div>
  );
};

export default Loading;