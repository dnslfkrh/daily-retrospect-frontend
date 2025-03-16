import type { Metadata } from "next";
import "./globals.css";
import ClientLayout from "@/widgets/ClientLayout";

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
    <html lang="en">
      <body className="antialiased flex justify-center items-center bg-white text-black min-h-screen">
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}
