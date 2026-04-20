"use client"

import * as React from "react"
import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"

export function ThemeToggle() {
  const { setTheme, theme } = useTheme()
  const [mounted, setMounted] = React.useState(false)

  React.useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return <div className="w-10 h-10" />
  }

  return (
    <button
      onClick={() => setTheme(theme === "light" ? "dark" : "light")}
      className="fixed top-6 right-6 md:top-8 md:right-8 z-50 p-2 rounded-full bg-background/50 backdrop-blur-md border border-foreground/10 hover:bg-foreground/5 transition-colors"
      aria-label="Toggle theme"
    >
      {theme === "light" ? (
        <Moon className="w-6 h-6 text-foreground" />
      ) : (
        <Sun className="w-6 h-6 text-foreground" />
      )}
    </button>
  )
}
