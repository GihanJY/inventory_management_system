"use client"

import { useTheme } from "next-themes"

export default function Home() {
    const {theme, setTheme} = useTheme();

  return (
    <div className="flex flex-col bg-slate-100 dark:bg-slate-950 h-screen m-0 p-0">
      <h1>Settings</h1>
      <button
      onClick={() => setTheme(theme === 'light'? 'dark': 'light')}>Theme</button>
    </div>
  )
}
