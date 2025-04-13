"use client";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { useTheme } from "next-themes";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { MoonStarIcon, Sun, Box } from "lucide-react";

export default function Home() {
  const { theme, setTheme } = useTheme();
  const [email, setEmail] = useState("gihan@gmail.com");
  const [password, setPassword] = useState("gihan123");
  const [loading, setLoading] = useState(false);

  const router = useRouter();
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!email || !password) {
      toast.error("Please fill all the fields before login!");
    } else {
      setLoading(true);
      try {
        const response = await axios.post(`${baseUrl}/users/loginUser`, {
          email,
          password,
        });

        if (response.status === 200) {
          toast.success("Login successfully!");
          console.log("Redirecting to dashboard...");
          router.push("/dashboard");
        } else {
          toast.error("Incorrect login credentials!");
        }
      } catch (error) {
        console.error("Login error:", error);
        toast.error("An error occurred during login!");
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <div className="h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100 flex justify-center overflow-hidden">
      <Toaster position="top-right" reverseOrder={false} />
      <div className="max-w-screen-xl m-0 sm:m-10 bg-white dark:bg-gray-800 shadow sm:rounded-lg flex justify-center flex-1">
        <div className="lg:w-1/2 xl:w-5/12 p-6 sm:p-12">
          <div className="flex flex-row items-center justify-center text-center gap-3">
            <Box size={20} className="" />
            <p className="text-indigo-500 dark:text-indigo-400 font-bold text-2xl">
              InvenTrack
            </p>
          </div>
          <div className="mt-12 flex flex-col items-center">
            <h1 className="text-2xl xl:text-3xl font-extrabold">Login</h1>
            <div className="w-full flex-1 mt-8">
              <div className="my-12 border-b text-center">
                <div className="leading-none px-2 inline-block text-sm text-gray-600 dark:text-gray-400 font-medium bg-white dark:bg-gray-800 transform translate-y-1/2">
                  Login with email
                </div>
              </div>
              <form onSubmit={handleLogin} className="mx-auto max-w-xs">
                <input
                  className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 placeholder-gray-500 dark:placeholder-gray-400 text-sm focus:outline-none focus:border-gray-400 dark:focus:border-gray-500 focus:bg-white dark:focus:bg-gray-600"
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <input
                  className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 placeholder-gray-500 dark:placeholder-gray-400 text-sm focus:outline-none focus:border-gray-400 dark:focus:border-gray-500 focus:bg-white dark:focus:bg-gray-600 mt-5"
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <button
                  type="submit"
                  className="mt-5 tracking-wide font-semibold bg-indigo-500 dark:bg-indigo-600 text-gray-100 w-full py-4 rounded-lg hover:bg-indigo-700 dark:hover:bg-indigo-700 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none"
                  disabled={loading}
                >
                  {loading ? (
                    <svg
                      className="animate-spin h-5 w-5 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                      ></path>
                    </svg>
                  ) : (
                    <span className="ml-3">Login</span>
                  )}
                </button>
              </form>
              <div className="flex items-center justify-center h-9">
                <button
                  onClick={() => setTheme(theme === "light" ? "dark" : "light")}
                  className="mr-2"
                >
                  {theme === "light" ? (
                    <Sun size={20} />
                  ) : (
                    <MoonStarIcon size={20} />
                  )}
                </button>
                <p className="text-xs text-gray-600 dark:text-gray-400 text-center">
                  {`I agree to abide by InvenTrack's `}
                  <a
                    href="#"
                    className="border-b border-gray-500 dark:border-gray-400 border-dotted"
                  >
                    {`Terms of Service `}
                  </a>
                  and its
                  <a
                    href="#"
                    className="border-b border-gray-500 dark:border-gray-400 border-dotted"
                  >
                    {` Privacy Policy`}
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="flex-1 bg-indigo-100 dark:bg-indigo-900 text-center hidden lg:flex">
          <div
            className="w-full bg-cover bg-center bg-no-repeat"
            style={{
              backgroundImage: "url('/login_background.jpg')",
            }}
          ></div>
        </div>
      </div>
    </div>
  );
}
