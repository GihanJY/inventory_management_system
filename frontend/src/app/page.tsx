"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";

export default function Home() {
  const router = useRouter();
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

  useEffect(() => {
    const startServer = async () => {
      if (!baseUrl) {
        console.error("NEXT_PUBLIC_BASE_URL is not defined");
        return;
      }

      try {
        await axios.get(`${baseUrl}/`);
      } catch (error) {
        console.error("Failed to ping server:", error);
      } finally {
        setTimeout(() => {
          router.push("/login");
        }, 2000);
      }
    };
    startServer();
  }, [router, baseUrl]);

  return (
    <div className="flex items-center justify-center h-screen bg-blue-100">
      <img src="/logo.png" alt="logo spin" className="animate-spin h-12 w-12" />
    </div>
  );
}
