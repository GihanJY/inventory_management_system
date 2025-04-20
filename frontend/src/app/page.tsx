"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";

export default function Home() {
  const router = useRouter();
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

  useEffect(() => {
    const startServer = async () => {
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
  }, [router]);

  return (
    <html>
      <body>
        <div className="flex items-center justify-center h-screen bg-blue-100">
          <img
            src="/logo.png"
            alt="logo pulse"
            className="animate-pulse h-12 w-12 mr-3"
          />
          <p className="animate-pulse font-bold text-2xl">InvenTrack</p>
        </div>
      </body>
    </html>
  );
}
