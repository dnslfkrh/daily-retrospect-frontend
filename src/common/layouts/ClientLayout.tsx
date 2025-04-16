"use client";

import dynamic from "next/dynamic";
import { ReactNode, useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { Toaster } from "react-hot-toast";
import { useTheme } from "next-themes";

const TopNav = dynamic(() => import("@/common/layouts/TopNav"), { ssr: false });
const BottomNav = dynamic(() => import("@/common/layouts/BottomNav"), { ssr: false });

const ClientLayout = ({ children }: { children: ReactNode }) => {
  const pathname = usePathname();
  const { resolvedTheme } = useTheme();
  const [isMounted, setIsMounted] = useState(false);

  const isHiddenOverflow =
    pathname === "/retrospect" ||
    pathname === "/auth" ||
    pathname === "/my/setting";

  useEffect(() => {
    setIsMounted(true);

    if (isHiddenOverflow) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isHiddenOverflow]);

  return (
    <div className="w-full flex flex-col h-full min-h-screen relative">
      <TopNav />

      <div className={`flex flex-col flex-grow pb-19 ${pathname === "/auth" ? "" : "mt-14"}`}>
        {children}
      </div>

      <BottomNav />

      {isMounted && (
        <Toaster
          position="top-center"
          reverseOrder={false}
          toastOptions={{
            duration: 3000,
            style: {
              background: resolvedTheme === "dark" ? "#0c0f24" : "#f9fafb",
              color: resolvedTheme === "dark" ? "#ffffff" : "#000000",
              fontSize: "14px",
              borderRadius: "8px",
            },
          }}
        />
      )}
    </div>
  );
}

export default ClientLayout;