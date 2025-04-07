"use client";

import { usePathname, useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";

const TopNav = () => {
  const router = useRouter();
  const pathname = usePathname();

  if (pathname === "/auth") {
    return null;
  }

  return (
    <nav className="fixed top-0 left-1/2 transform -translate-x-1/2 w-full max-w-[450px] bg-white dark:bg-gray-900 flex items-center px-4 py-4 z-50">
      <button onClick={() => router.back()} className="text-gray-700 dark:text-gray-300 hover:text-black dark:hover:text-white">
        <ArrowLeft size={24} />
      </button>
    </nav>
  );
};

export default TopNav;
