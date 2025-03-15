"use client";

import dynamic from "next/dynamic";
import { ReactNode } from "react";

const BottomNav = dynamic(() => import("@/widgets/BottomNav"), { ssr: false });
const Loading = dynamic(() => import("@/shared/components/Loading"), { ssr: false });

export default function ClientLayout({ children }: { children: ReactNode }) {
  return (
    <div className="w-full max-w-[450px] flex flex-col min-h-screen relative">
      <div className="flex-grow border-t border-x border-b border-gray-200">
        {children}
        <Loading />
      </div>
      <BottomNav />
    </div>
  );
}