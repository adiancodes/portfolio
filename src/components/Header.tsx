"use client"

import * as React from "react"
import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"
import { motion, useScroll, useMotionValueEvent } from "framer-motion"

const navLinks = [
  { number: "01.", name: "About",        href: "#about"        },
  { number: "02.", name: "Experience",   href: "#experience"   },
  { number: "03.", name: "Projects",     href: "#projects"     },
  { number: "04.", name: "Achievements", href: "#achievements" },
  { number: "05.", name: "Contact",      href: "#contact"      },
]

export function Header() {
  const { setTheme, theme } = useTheme()
  const [mounted, setMounted] = React.useState(false)
  const [hidden, setHidden] = React.useState(false)
  const [atTop, setAtTop] = React.useState(true)
  const { scrollY } = useScroll()

  React.useEffect(() => { setMounted(true) }, [])

  // Hide header on scroll-down, reveal on scroll-up (Brittany Chiang pattern)
  useMotionValueEvent(scrollY, "change", (latest) => {
    const prev = scrollY.getPrevious() ?? 0
    setHidden(latest > prev && latest > 80)
    setAtTop(latest < 20)
  })

  return (
    <motion.header
      animate={{ y: hidden ? "-100%" : "0%" }}
      transition={{ duration: 0.3, ease: [0.76, 0, 0.24, 1] }}
      className={`fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 md:px-10 lg:px-16 h-16 md:h-20 transition-all duration-300 ${
        atTop
          ? "bg-transparent"
          : "bg-background/80 backdrop-blur-xl border-b border-foreground/10 shadow-sm"
      }`}
    >
      {/* Logo / Brand mark */}
      <a
        href="#hero"
        className="font-mono text-primary text-sm tracking-[0.2em] uppercase font-bold hover:opacity-70 transition-opacity"
        aria-label="Go to top"
      >
        AR<span className="text-foreground/40">.</span>
      </a>

      {/* Right side: nav links + theme toggle */}
      <div className="flex items-center gap-8">
        {/* Horizontal nav */}
        <nav className="hidden md:flex items-center gap-6 lg:gap-8">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="group flex items-center gap-1.5 font-mono text-sm font-semibold tracking-wide
                text-slate-500 hover:text-slate-900
                dark:text-foreground/60 dark:hover:text-primary
                transition-colors duration-300"
            >
              <span className="text-slate-400 dark:text-primary text-xs">{link.number}</span>
              {link.name}
            </a>
          ))}
        </nav>

        {/* Theme toggle */}
        {mounted && (
          <button
            onClick={() => setTheme(theme === "light" ? "dark" : "light")}
            className="p-2 rounded-full bg-background/50 backdrop-blur-md border border-foreground/10 hover:bg-foreground/5 transition-colors flex-shrink-0"
            aria-label="Toggle theme"
          >
            {theme === "light" ? (
              <Moon className="w-5 h-5 text-foreground" />
            ) : (
              <Sun className="w-5 h-5 text-foreground" />
            )}
          </button>
        )}
      </div>
    </motion.header>
  )
}
