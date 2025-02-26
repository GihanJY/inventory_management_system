import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "../globals.css";
import ThemeProviderWrapper from "@/app/components/ThemeProviderWrapper"
import Sidebar from "@/app/components/Sidebar"

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "StockManage",
  description: "Manage your inventory easily.",
};

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable}`}>
      <body className="flex flex-row">
        <ThemeProviderWrapper>
          <div className="h-screen overflow-hidden">
            <Sidebar />
          </div>
          <div className="h-screen flex-1 flex flex-col overflow-y-scroll">
            {children}
          </div>
        </ThemeProviderWrapper>
      </body>
    </html>
  );
}
