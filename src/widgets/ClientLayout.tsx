"use client";

import dynamic from "next/dynamic";
import { ReactNode } from "react";
import { usePathname } from "next/navigation";

const BottomNav = dynamic(() => import("@/widgets/BottomNav"), { ssr: false });
const Loading = dynamic(() => import("@/shared/components/Loading"), { ssr: false });

export default function ClientLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname();

  // 특정 페이지에서는 overflow-hidden 적용
  const isHiddenOverflow = pathname === "/retrospect" || pathname === "/auth";

  return (
    <div
      className={`w-full max-w-[450px] flex flex-col min-h-screen relative ${
        isHiddenOverflow ? "overflow-hidden" : "overflow-y-auto"
      }`}
    >
      <div className="flex-grow border-t border-x border-b border-gray-200">
        {children}
        <Loading />
      </div>
      <BottomNav />
    </div>
  );
}
