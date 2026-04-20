"use client"

import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion'

const roles = ["AI-ML Enthusiast", "CS Student", "Data Science", "Problem Solver"]

// Premium cubic-bezier — mimics a spring without overshoot:
// fast start, decelerates elegantly into rest position
const EXPO_OUT = [0.16, 1, 0.3, 1] as const

// ─── Block-Wipe Revealer ──────────────────────────────────────────────────────
//
// The double-wipe bug was caused by `center` animating both IN and OUT
// (translate + scaleX), then `exit` firing a second full animation on top.
//
// Correct model with AnimatePresence mode="wait":
//   initial  — block fully covers text (scaleX:1, originX: right)
//              → AnimatePresence mounts this AFTER old item's exit finishes
//   animate  — block collapses rightward, revealing text (scaleX:0, originX: right)
//   exit     — block grows leftward, covering text again (scaleX:1, originX: left)
//
// This guarantees exactly ONE wipe-in and ONE wipe-out per swap, zero overlap.
const BlockWipe = ({ children, id }: { children: React.ReactNode; id: number }) => {
  return (
    <motion.div
      key={id}
      className="relative inline-block"
      initial="initial"
      animate="animate"
      exit="exit"
    >
      {/* Text — lives underneath the block */}
      <span className="heading-massive text-foreground leading-[0.9] tracking-[-0.03em] font-extrabold text-7xl md:text-8xl lg:text-9xl whitespace-nowrap block">
        {children}
      </span>

      {/* The wipe block — pure scaleX, no translation */}
      <motion.span
        aria-hidden
        className="absolute inset-0 bg-primary"
        variants={{
          // NEW item enters already covering text; originX right so it will collapse rightward
          initial: { scaleX: 1, originX: 1 },
          // Collapse rightward to reveal text underneath
          animate: {
            scaleX: 0,
            originX: 1,
            transition: { duration: 0.75, ease: [0.76, 0, 0.24, 1] as const },
          },
          // OLD item: grow from left to re-cover text, then unmount
          exit: {
            scaleX: 1,
            originX: 0,
            transition: { duration: 0.6, ease: [0.76, 0, 0.24, 1] as const },
          },
        }}
      />
    </motion.div>
  )
}

// ─── Masked Slide-Up helper ──────────────────────────────────────────────────
// Wraps content in overflow-hidden; the child slides up from y:100%.
// Stagger is driven by the parent `containerVariants`.
const SlideUp = ({
  children,
  className = "",
  delay = 0,
}: {
  children: React.ReactNode
  className?: string
  delay?: number
}) => (
  <div className={`overflow-hidden ${className}`}>
    <motion.div
      variants={{
        hidden: { y: "100%", opacity: 0 },
        visible: {
          y: "0%",
          opacity: 1,
          transition: {
            duration: 1.0,
            ease: [0.33, 1, 0.68, 1],
            delay,
          },
        },
      }}
    >
      {children}
    </motion.div>
  </div>
)

// ─── Hero ────────────────────────────────────────────────────────────────────
export const Hero = () => {
  const [currentIndex, setCurrentIndex] = useState(0)

  // Fade the scroll indicator out as soon as the user starts scrolling
  const { scrollY } = useScroll()
  const scrollOpacity = useTransform(scrollY, [0, 120], [1, 0])

  useEffect(() => {
    // Total animation budget: exit (0.6s) + enter (0.75s) = 1.35s
    // 3800ms interval gives ~2.4s of visible dwell time — comfortable rhythm
    const id = setInterval(() => {
      setCurrentIndex(prev => (prev + 1) % roles.length)
    }, 3800)
    return () => clearInterval(id)
  }, [])

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.13,
        delayChildren: 0.25,
      },
    },
  }

  return (
    <section
      className="min-h-screen flex flex-col justify-center relative overflow-hidden"
      id="hero"
    >
      {/* Background Glyphs — Hamish-style lab feel */}
      <div className="absolute inset-0 z-[-1] pointer-events-none overflow-hidden opacity-[0.07] dark:opacity-[0.12] mix-blend-overlay select-none">
        {(['01', 'SYS', 'Δ', 'λ', '0x9F', '/>', '{;}', '∑', '∇', '∂', 'π', 'ε'] as const).map(
          (glyph, i) => (
            <motion.div
              key={i}
              className="absolute text-4xl font-mono text-primary font-bold"
              style={{
                left: `${(i * 13 + 5) % 90}%`,
                top: `${(i * 17 + 10) % 85}%`,
              }}
              animate={{ y: [0, -30, 0], opacity: [0.4, 1, 0.4] }}
              transition={{
                duration: 5 + i * 0.7,
                repeat: Infinity,
                ease: "easeInOut",
                delay: i * 0.4,
              }}
            >
              {glyph}
            </motion.div>
          )
        )}
      </div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="max-w-5xl z-10 mx-auto w-full px-6 lg:px-0 text-center lg:text-left"
      >
        {/* Eyebrow — "Hello, I'm" */}
        <div className="overflow-hidden mb-2">
          <motion.p
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            transition={{ type: "spring", stiffness: 50, damping: 20, delay: 0.1 }}
            className="font-mono tracking-[0.15em] uppercase text-primary text-xs md:text-sm"
          >
            Hello, I&apos;m
          </motion.p>
        </div>

        {/* ── Main name — masked slide-up, single line ─────────────────────── */}
        <div className="mb-8">
          <h1 className="heading-massive text-foreground leading-[0.88] m-0 tracking-[-0.03em] font-extrabold text-7xl md:text-8xl lg:text-9xl whitespace-nowrap">
            <div className="overflow-hidden inline-block pb-2">
              <motion.span
                className="inline-block"
                initial={{ y: "100%" }}
                animate={{ y: 0 }}
                transition={{ ease: [0.33, 1, 0.68, 1], duration: 1 }}
              >
                Aditya Ranjan
              </motion.span>
            </div>
          </h1>
        </div>

        {/* ── Dynamic role rotator with // prefix ─────────────────────────── */}
        <div className="overflow-hidden block mb-10 pb-2">
          <motion.div
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            transition={{ ease: [0.33, 1, 0.68, 1], duration: 1, delay: 0.15 }}
            className="flex items-center justify-center lg:justify-start gap-4 md:gap-5"
          >
            {/* Developer comment prefix */}
            <span
              className="font-mono font-bold text-foreground/30 leading-none select-none"
              style={{ fontSize: "clamp(2.5rem, 6vw, 5rem)" }}
              aria-hidden
            >
              //
            </span>

            {/* Role wrapper: inline-flex so it hugs the text width */}
            <div className="inline-flex items-center">
              <AnimatePresence mode="wait" initial={false}>
                <BlockWipe key={currentIndex} id={currentIndex}>
                  {roles[currentIndex]}
                </BlockWipe>
              </AnimatePresence>
            </div>
          </motion.div>
        </div>

        {/* Body copy */}
        <div className="overflow-hidden max-w-xl mx-auto lg:mx-0 mb-0">
          <motion.p
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            transition={{ type: "spring", stiffness: 50, damping: 20, delay: 0.5 }}
            className="text-base md:text-lg text-foreground/60 leading-relaxed font-light"
          >
            I build the invisible engines that power web applications. By combining solid backend
            engineering in Java with modern AI tools, I turn complex data into smart, real-world
            solutions.
          </motion.p>
        </div>

        {/* CTA */}
        <div className="overflow-hidden mt-10">
          <motion.div
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            transition={{ type: "spring", stiffness: 50, damping: 20, delay: 0.65 }}
          >
            <a
              href="/ResumeAutoDesk.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block px-8 py-4 border border-primary text-primary font-mono text-xs tracking-[0.2em] uppercase hover:bg-primary hover:text-background transition-all duration-500"
            >
              View Resume
            </a>
          </motion.div>
        </div>
      </motion.div>
      {/* ── Mouse scroll indicator — fades out on scroll ─────────────────── */}
      <motion.div
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center"
        style={{ opacity: scrollOpacity }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.2, duration: 0.8 }}
        aria-hidden
      >
        {/* Pill / mouse body */}
        <div
          className="
            w-6 h-10 rounded-full border-2 flex items-start justify-center pt-1.5
            border-slate-400 dark:border-white/40
          "
        >
          {/* Scroll wheel dot */}
          <motion.div
            className="w-1 h-2 rounded-full bg-slate-400 dark:bg-white/60"
            animate={{ y: [0, 8, 0], opacity: [1, 0, 1] }}
            transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
          />
        </div>
      </motion.div>
    </section>
  )
}
