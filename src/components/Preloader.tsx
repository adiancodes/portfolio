"use client"

import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export const Preloader = () => {
  const [isLoading, setIsLoading] = useState(true)
  const [text, setText] = useState('')
  const fullText = "> WELCOME TO THE PORTFOLIO OF..."

  useEffect(() => {
    // Lock page scroll while the preloader is active so nothing steals scroll position
    document.body.style.overflow = 'hidden'

    // Typewriter effect
    let currentIndex = 0
    const intervalId = setInterval(() => {
      if (currentIndex <= fullText.length) {
        setText(fullText.slice(0, currentIndex))
        currentIndex++
      } else {
        clearInterval(intervalId)
      }
    }, 50)

    // Remove preloader after 2.5 seconds, restore scroll, force position to top
    const timeoutId = setTimeout(() => {
      document.body.style.overflow = ''
      window.scrollTo({ top: 0, left: 0, behavior: 'instant' as ScrollBehavior })
      setIsLoading(false)
    }, 2500)

    return () => {
      clearInterval(intervalId)
      clearTimeout(timeoutId)
      document.body.style.overflow = ''
    }
  }, [])

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          initial={{ y: 0 }}
          exit={{ y: "-100%" }}
          transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-[#050505]"
        >
          <div className="font-mono text-white text-sm md:text-xl font-bold tracking-widest">
            {text}
            <motion.span
              animate={{ opacity: [1, 0] }}
              transition={{ duration: 0.8, repeat: Infinity, ease: "linear" }}
              className="inline-block w-2 h-4 md:w-3 md:h-5 ml-1 bg-primary align-middle"
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
