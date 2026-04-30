"use client"

import * as React from "react"
import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"
import { motion, useScroll, useMotionValueEvent, AnimatePresence } from "framer-motion"

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
  const [isOpen, setIsOpen] = React.useState(false)
  const { scrollY } = useScroll()

  React.useEffect(() => { setMounted(true) }, [])

  // Scroll lock when menu is open
  React.useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = "unset"
    }
    return () => {
      document.body.style.overflow = "unset"
    }
  }, [isOpen])

  // Hide header on scroll-down, reveal on scroll-up (Brittany Chiang pattern)
  useMotionValueEvent(scrollY, "change", (latest) => {
    const prev = scrollY.getPrevious() ?? 0
    setHidden(latest > prev && latest > 80)
    setAtTop(latest < 20)
  })

  return (
    <>
      <motion.header
        animate={{ y: hidden && !isOpen ? "-100%" : "0%" }}
        transition={{ duration: 0.3, ease: [0.76, 0, 0.24, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 md:px-10 lg:px-16 h-16 md:h-20 transition-all duration-300 ${
          atTop || isOpen
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

      {/* Right side: nav links + theme toggle + mobile menu trigger */}
      <div className="flex items-center gap-4 md:gap-8 z-50">
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

        {/* Hamburger Menu Toggle (Mobile Only) */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden p-2 text-foreground focus:outline-none flex flex-col justify-center items-center gap-[5px] z-50 w-10 h-10"
          aria-label="Toggle Menu"
        >
          <motion.span
            animate={{ rotate: isOpen ? 45 : 0, y: isOpen ? 7 : 0 }}
            transition={{ type: "spring", stiffness: 260, damping: 20 }}
            className="block w-6 h-[2px] bg-current rounded-full"
          />
          <motion.span
            animate={{ opacity: isOpen ? 0 : 1 }}
            transition={{ duration: 0.1 }}
            className="block w-6 h-[2px] bg-current rounded-full"
          />
          <motion.span
            animate={{ rotate: isOpen ? -45 : 0, y: isOpen ? -7 : 0 }}
            transition={{ type: "spring", stiffness: 260, damping: 20 }}
            className="block w-6 h-[2px] bg-current rounded-full"
          />
        </button>
      </div>
    </motion.header>

    {/* Mobile Menu Overlay */}
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ x: "100%" }}
          animate={{ x: 0 }}
          exit={{ x: "100%" }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          className="fixed inset-0 z-40 bg-black/80 backdrop-blur-2xl flex flex-col px-6 pt-32 pb-10 overflow-y-auto"
        >
          <div className="flex flex-col gap-8">
            {navLinks.map((link, i) => (
              <motion.a
                key={link.name}
                href={link.href}
                onClick={() => setIsOpen(false)}
                initial={{ x: 50, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: 50, opacity: 0 }}
                transition={{ delay: 0.1 * i, type: "spring", stiffness: 200, damping: 20 }}
                className="group relative flex items-center font-mono text-2xl sm:text-3xl font-bold tracking-wide"
              >
                <span className="opacity-0 group-hover:opacity-100 group-focus:opacity-100 transition-opacity text-primary absolute -left-6">
                  &gt;
                </span>
                <span className="text-foreground/40 mr-4 text-xl sm:text-2xl">{link.number}</span>
                <span className="text-primary mr-3">GET</span>
                <span className="text-white group-hover:text-primary/80 transition-colors">/{link.name.toLowerCase()}</span>
              </motion.a>
            ))}
          </div>
          
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="mt-auto pt-10"
          >
            <p className="font-mono text-xs text-foreground/40 mb-2">STATUS: 200 OK</p>
            <p className="font-mono text-xs text-foreground/40">SYSTEM: ONLINE</p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
    </>
  )
}
