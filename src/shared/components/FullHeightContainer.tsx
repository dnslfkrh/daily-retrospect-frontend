"use client";

import { usePathname } from "next/navigation";
import React from "react";

interface FullHeightContainerProps {
  children: React.ReactNode;
}

const FullHeightContainer: React.FC<FullHeightContainerProps> = ({ children }) => {
  const pathname = usePathname();

  const hasBottomNav = pathname !== "/auth";
  const heightStyle = hasBottomNav ? "h-[calc(100vh-72px)]" : "h-screen";

  return (
    <div className={`top-0 left-0 w-full ${heightStyle} flex items-center justify-center bg-white dark:bg-gray-900 overflow-hidden`}>
      <div className="w-full max-w-sm flex flex-col items-center space-y-6 p-8">
        {children}
      </div>
    </div>
  );
};

export default FullHeightContainer;