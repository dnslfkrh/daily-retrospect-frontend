import type { Metadata } from "next";
import "./globals.css";
import ClientLayout from "@/common/layouts/ClientLayout";
import { ThemeProvider } from "next-themes";
import Script from "next/script";
import AutoLogin from "@/common/components/AutoLogin";

export const viewport = {
  themeColor: "#ffffff",
};

export const metadata: Metadata = {
  title: "Daily Retrospect App",
  description: "This is a PWA built with Next.js",
  manifest: "/manifest.json",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="antialiased bg-white text-black min-h-screen flex justify-center" suppressHydrationWarning>
        <Script src="/env.js" strategy="beforeInteractive" />
        <AutoLogin />
        <div className="w-full max-w-[450px] min-h-screen relative">
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
            <ClientLayout>{children}</ClientLayout>
          </ThemeProvider>
        </div>
      </body>
    </html>
  );
}