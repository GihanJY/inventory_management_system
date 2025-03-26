"use client";

import { useTheme } from "next-themes";
import { useState, useEffect } from "react";
import { Switch } from "@headlessui/react";

export default function Settings() {
  const { theme, setTheme } = useTheme();
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    // Load theme preference from localStorage (if needed)
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme) {
      setIsDarkMode(savedTheme === "dark");
      setTheme(savedTheme);
    }

    // Load notification preference from localStorage (if needed)
    const savedPreference = localStorage.getItem("notifications");
    if (savedPreference) {
      setEnabled(JSON.parse(savedPreference));
    }
  }, [setTheme]);

  const handleThemeToggle = () => {
    const newTheme = isDarkMode ? "light" : "dark";
    setIsDarkMode(!isDarkMode);
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme); // Save theme preference
  };

  const handleNotificationToggle = () => {
    setEnabled(!enabled);
    localStorage.setItem("notifications", JSON.stringify(!enabled));
  };

  return (
    <div className="flex flex-col bg-slate-100 dark:bg-slate-950 h-screen p-6 text-gray-900 dark:text-gray-200">
      <h1 className="text-2xl font-bold mb-6">Settings</h1>

      <div className="w-3/4">
        {/* Theme Toggle */}
        <div className="flex mb-6 p-4 bg-white dark:bg-gray-800 rounded-lg shadow-md justify-between items-center">
          <h2 className="text-md font-semibold mb-2">Dark Theme</h2>

          <Switch
            checked={isDarkMode}
            onChange={handleThemeToggle}
            className={`${
              isDarkMode ? "bg-blue-500" : "bg-gray-400"
            } relative inline-flex items-center h-6 rounded-full w-11 transition-colors`}
          >
            <span
              className={`${
                isDarkMode ? "translate-x-6" : "translate-x-1"
              } inline-block w-4 h-4 transform bg-white rounded-full transition-transform`}
            />
          </Switch>
        </div>

        {/* Notification Toggle */}
        <div className="mb-6 p-4 bg-white dark:bg-gray-800 rounded-lg shadow-md flex justify-between items-center">
          <h2 className="text-md font-semibold mb-2">Notifications</h2>
          <Switch
            checked={enabled}
            onChange={handleNotificationToggle}
            className={`${
              enabled ? "bg-blue-500" : "bg-gray-400"
            } relative inline-flex items-center h-6 rounded-full w-11 transition-colors`}
          >
            <span
              className={`${
                enabled ? "translate-x-6" : "translate-x-1"
              } inline-block w-4 h-4 transform bg-white rounded-full transition-transform`}
            />
          </Switch>
        </div>

        {/* Account Actions */}
        <div className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow-md flex justify-between items-center">
          <h2 className="text-md font-semibold mb-2">Account</h2>
          <button className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700">
            Delete Account
          </button>
        </div>
      </div>
    </div>
  );
}
