"use client"
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';

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
                router.push('/login');
            }
        }
        startServer();
    }, [router]);

    return (
        <div className="flex items-center justify-center h-screen">
            <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-b-4 border-blue-500"></div>
        </div>
    );
}