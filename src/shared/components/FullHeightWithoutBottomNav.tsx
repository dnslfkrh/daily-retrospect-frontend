"use client";

import React from "react";

interface FullHeightWithoutBottomNavProps {
  children: React.ReactNode;
}

const FullHeightWithoutBottomNav: React.FC<FullHeightWithoutBottomNavProps> = ({ children }) => {
  return (
    <div className="top-0 left-0 w-full h-[calc(100vh-56px)] flex items-center justify-center bg-white overflow-hidden">
      <div className="w-full max-w-sm flex flex-col items-center space-y-6 p-8">
        {children}
      </div>
    </div>
  );
};

export default FullHeightWithoutBottomNav;