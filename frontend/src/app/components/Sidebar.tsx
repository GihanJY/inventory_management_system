"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Home, LogOut, MenuIcon, Box, Settings, User2 } from "lucide-react";

const Sidebar = () => {
  const router = useRouter();
  const { theme } = useTheme();

  const [mounted, setMounted] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setIsCollapsed(true);
      } else {
        setIsCollapsed(false);
      }
    };

    // Set initial state based on window size
    handleResize();

    // Add event listener for window resize
    window.addEventListener("resize", handleResize);

    // Cleanup event listener on component unmount
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  if (!mounted) {
    return null; // Return null during SSR to prevent mismatch
  }

  const handleLogout = () => {
    localStorage.removeItem("token");
    router.push("/"); // Ensure correct redirection after logout
  };

  return (
    <div
      className={`p-1 h-screen transition-width bg-white dark:bg-slate-900 duration-300 ${
        isCollapsed ? "w-20" : "w-64"
      } justify-center`}
    >
      <button
        className={`flex items-center gap-3 p-3 rounded-lg hover:bg-slate-300 dark:hover:bg-gray-700 cursor-pointer ${
          isCollapsed ? "justify-center" : ""
        } w-full transition-all duration-300`}
        onClick={() => setIsCollapsed(!isCollapsed)}
      >
        <MenuIcon color={theme === "light" ? "black" : "white"} size={20} />
      </button>
      <h1
        className={`${
          isCollapsed ? "hidden" : ""
        } text-xl font-extrabold text-blue-800 dark:text-gray-100 text-center mt-6 transition-all duration-300`}
      >
        InvenTrack
      </h1>
      <nav className="space-y-4">
        <Link href="/dashboard">
          <div
            className={`flex items-center gap-3 p-3 mt-10 rounded-lg hover:bg-slate-300 dark:hover:bg-gray-700 cursor-pointer ${
              isCollapsed ? "justify-center" : ""
            } transition-all duration-300`}
          >
            <Home color={theme === "light" ? "black" : "white"} size={20} />
            <span
              className={`text-black dark:text-white ${
                isCollapsed ? "hidden" : ""
              }`}
            >
              Dashboard
            </span>
          </div>
        </Link>
        <Link href="/dashboard/items">
          <div
            className={`flex items-center gap-3 p-3 rounded-lg hover:bg-slate-300 dark:hover:bg-gray-700 cursor-pointer ${
              isCollapsed ? "justify-center" : ""
            } transition-all duration-300`}
          >
            <Box color={theme === "light" ? "black" : "white"} size={20} />
            <span
              className={`text-black dark:text-white ${
                isCollapsed ? "hidden" : ""
              }`}
            >
              Items
            </span>
          </div>
        </Link>
        <Link href="/dashboard/users">
          <div
            className={`flex items-center gap-3 p-3 rounded-lg hover:bg-slate-300 dark:hover:bg-gray-700 cursor-pointer ${
              isCollapsed ? "justify-center" : ""
            } transition-all duration-300`}
          >
            <User2
              color={theme === "light" ? "black" : "white"}
              size={20}
            />
            <span
              className={`text-black dark:text-white ${
                isCollapsed ? "hidden" : ""
              }`}
            >
              Users
            </span>
          </div>
        </Link>
        <Link href="/dashboard/settings">
          <div
            className={`flex items-center gap-3 p-3 rounded-lg hover:bg-slate-300 dark:hover:bg-gray-700 cursor-pointer ${
              isCollapsed ? "justify-center" : ""
            } transition-all duration-300`}
          >
            <Settings color={theme === "light" ? "black" : "white"} size={20} />
            <span
              className={`text-black dark:text-white ${
                isCollapsed ? "hidden" : ""
              }`}
            >
              Settings
            </span>
          </div>
        </Link>
      </nav>
      <button
        onClick={handleLogout}
        className={`mt-64 flex items-center gap-3 p-3 rounded-lg hover:bg-slate-300 dark:hover:bg-gray-700 cursor-pointer ${
          isCollapsed ? "justify-center" : ""
        } w-full transition-all duration-300`}
      >
        <LogOut color={theme === "light" ? "black" : "white"} size={20} />
        <span
          className={`text-black dark:text-white ${
            isCollapsed ? "hidden" : ""
          }`}
        >
          Logout
        </span>
      </button>
    </div>
  );
};

export default Sidebar;
