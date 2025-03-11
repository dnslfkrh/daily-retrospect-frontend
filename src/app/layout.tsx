import type { Metadata } from "next";
import "./globals.css";
import AutoLogin from "@/shared/components/AutoLogin";
import BottomNav from "@/widgets/BottomNav";

export const viewport = {
  themeColor: "#ffffff",
};

export const metadata: Metadata = {
  title: "Daily Retrospect App",
  description: "This is a PWA built with Next.js",
  manifest: "/manifest.json",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className="overflow-hidden">
      <body className="antialiased flex justify-center items-center bg-white text-black min-h-screen overflow-hidden">
        <AutoLogin />
        <div className="w-full max-w-[450px] flex flex-col min-h-screen relative">
          <div className="flex-grow border-t border-x border-b border-gray-200">
            {children}
          </div>
          <BottomNav />
        </div>
      </body>
    </html>
  );
}