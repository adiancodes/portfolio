"use client"

import React, { useState, useEffect, useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import emailjs from '@emailjs/browser'

type HistoryItem = {
  id: string
  text: string
  type: 'system' | 'prompt' | 'input'
}

export const ContactTerminal = () => {
  const containerRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const endOfTerminalRef = useRef<HTMLDivElement>(null)

  // Boot sequence: fires once when the section enters the viewport
  // once:true prevents the boot from re-running if the user scrolls away and back
  const isInView = useInView(containerRef, { once: true, margin: "-150px" })

  // Live inView (once:false) — only used for focus management so we don't steal
  // focus from the Hero section on initial page load
  const isVisibleNow = useInView(containerRef, { once: false, margin: "-80px" })

  const [history, setHistory] = useState<HistoryItem[]>([])
  const [input, setInput] = useState('')
  const [step, setStep] = useState<number>(0)
  const [userData, setUserData] = useState({ name: '', email: '', message: '' })
  const [isBooting, setIsBooting] = useState(false)

  // Auto-scroll INSIDE the terminal box only — guard against empty history on mount
  useEffect(() => {
    if (history.length === 0) return  // don't scroll the page on initial render
    endOfTerminalRef.current?.scrollIntoView({ behavior: 'smooth', block: 'nearest' })
  }, [history, input])

  // Only focus the input when the terminal is ACTUALLY visible on screen right now
  useEffect(() => {
    if (isVisibleNow && !isBooting && step > 0 && step < 4) {
      setTimeout(() => inputRef.current?.focus(), 100)
    }
  }, [isVisibleNow, isBooting, step])

  // Click anywhere on terminal to regain focus (helpful for mobile)
  const handleTerminalClick = () => {
    if (step > 0 && step < 4) {
      inputRef.current?.focus()
    }
  }

  // The Boot Sequence Engine
  useEffect(() => {
    if (isInView && step === 0 && !isBooting) {
      setIsBooting(true)
      const bootSequence = async () => {
        const date = new Date().toString().split(' GMT')[0]

        await new Promise(r => setTimeout(r, 600))
        setHistory(prev => [...prev, { id: Date.now().toString(), text: "[SYSTEM] Initializing contact_protocol.sh...", type: "system" }])

        await new Promise(r => setTimeout(r, 800))
        setHistory(prev => [...prev, { id: (Date.now() + 1).toString(), text: `[SYSTEM] Connection established at ${date}`, type: "system" }])

        await new Promise(r => setTimeout(r, 1000))
        setHistory(prev => [...prev, { id: (Date.now() + 2).toString(), text: "> What is your name?", type: "prompt" }])

        setStep(1)
        setIsBooting(false)
      }
      bootSequence()
    }
  }, [isInView, step, isBooting])

  // Core Conversation & EmailJS Logic
  const handleKeyDown = async (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && input.trim() !== '') {
      const currentInput = input.trim()
      setInput('')

      // Print user input to terminal
      setHistory(prev => [...prev, { id: Date.now().toString(), text: currentInput, type: "input" }])

      if (step === 1) {
        setUserData(prev => ({ ...prev, name: currentInput }))
        setTimeout(() => {
          setHistory(prev => [...prev, { id: Date.now().toString(), text: `> Hey ${currentInput}! What is your email?`, type: "prompt" }])
          setStep(2)
        }, 300)
      }
      else if (step === 2) {
        setUserData(prev => ({ ...prev, email: currentInput }))
        setTimeout(() => {
          setHistory(prev => [...prev, { id: Date.now().toString(), text: "> What is your message?", type: "prompt" }])
          setStep(3)
        }, 300)
      }
      else if (step === 3) {
        setUserData(prev => ({ ...prev, message: currentInput }))

        setTimeout(async () => {
          setHistory(prev => [...prev, { id: Date.now().toString(), text: "[SYSTEM] Processing... Sending packet to contactaditya013@gmail.com...", type: "system" }])
          setStep(4)

          try {
            await emailjs.send(
              process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!,
              process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID!,
              {
                from_name: userData.name,
                reply_to: userData.email,
                email: userData.email,
                message: currentInput,
                title: `New message from ${userData.name}`,
                to_name: "Aditya"
              },
              process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY!
            )

            await new Promise(r => setTimeout(r, 1500))

            setHistory(prev => [...prev, { id: Date.now().toString(), text: "[SUCCESS] Message sent successfully. Thank you!", type: "system" }])
            setTimeout(() => {
              setHistory(prev => [...prev, { id: (Date.now() + 1).toString(), text: "(base) aditya@portfolio ~ % _", type: "prompt" }])
              setStep(5)
            }, 800)

          } catch (error: any) {
            await new Promise(r => setTimeout(r, 1500))
            // Surface the actual EmailJS error so we can debug it
            const errMsg = error?.text || error?.message || JSON.stringify(error) || "Unknown error"
            setHistory(prev => [...prev, { id: Date.now().toString(), text: `[ERROR] ${errMsg}`, type: "system" }])
            setStep(5)
          }
        }, 300)
      }
    }
  }

  return (
    <section id="contact" className="py-32 max-w-4xl mx-auto px-4 md:px-0 flex flex-col items-center justify-center min-h-[90vh] relative" ref={containerRef}>

      {/* 05. What's Next? */}
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        className="font-mono text-teal-400 mb-6 tracking-widest text-sm"
      >
        05. What's Next?
      </motion.p>

      {/* Masked Reveal Title */}
      <div className="overflow-hidden mb-12 py-2">
        <motion.h2
          initial={{ y: "100%" }}
          whileInView={{ y: "0%" }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7, ease: [0.33, 1, 0.68, 1] }}
          className="text-5xl md:text-7xl font-bold text-foreground tracking-tight text-center"
        >
          Get In Touch
        </motion.h2>
      </div>

      {/* Terminal Window */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="w-full max-w-2xl bg-[#0a0a0a] rounded-lg border border-white/10 shadow-2xl overflow-hidden relative flex flex-col cursor-text group"
        style={{ height: '400px' }}
        onClick={handleTerminalClick}
      >
        {/* Mac OS Traffic Lights */}
        <div className="bg-[#1a1a1a] border-b border-white/5 px-4 py-3 flex items-center gap-2 relative z-20">
          <div className="w-3 h-3 rounded-full bg-[#ff5f56]" />
          <div className="w-3 h-3 rounded-full bg-[#ffbd2e]" />
          <div className="w-3 h-3 rounded-full bg-[#27c93f]" />
          <p className="absolute left-1/2 -translate-x-1/2 font-mono text-xs text-white/40">aditya@portfolio:~</p>
        </div>

        {/* Terminal Content */}
        <div className="flex-1 overflow-y-auto p-4 md:p-6 space-y-4 font-mono text-sm md:text-base text-emerald-400 relative z-10 scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent">
          {history.map((item) => (
            <motion.div
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              key={item.id}
              className={`break-words leading-relaxed ${item.type === 'input' ? 'text-emerald-200/70' : 'text-emerald-400'} ${item.text.includes('[ERROR]') ? 'text-red-400' : ''} ${item.text.includes('[SUCCESS]') ? 'text-teal-300' : ''}`}
            >
              {item.type === 'input' ? <span className="opacity-50 mr-2">{'>'}</span> : null}
              {item.text}
            </motion.div>
          ))}

          {step > 0 && step < 4 && (
            <div className="flex items-center mt-2">
              <span className="opacity-50 mr-2">{'>'}</span>
              <span className="text-emerald-200 break-words">{input}</span>
              {/* Blinking Block Cursor */}
              <motion.span
                animate={{ opacity: [1, 0] }}
                transition={{ repeat: Infinity, duration: 0.8 }}
                className="inline-block w-2.5 h-4 bg-emerald-400 ml-1 translate-y-[2px]"
              />
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                className="absolute opacity-0 w-[1px] h-[1px] -left-[10000px]"
                autoComplete="off"
                spellCheck="false"
              />
            </div>
          )}
          {/* Invisible anchor to scroll to bottom */}
          <div ref={endOfTerminalRef} className="h-2" />
        </div>

        {/* CRT Scanline Overlay */}
        <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(transparent_50%,rgba(0,0,0,0.25)_50%)] bg-[length:100%_4px] z-30 opacity-40 mix-blend-overlay group-hover:opacity-30 transition-opacity" />
      </motion.div>

      {/* Terminal Status Bar & Footer */}
      <div className="absolute bottom-8 w-full flex flex-col items-center justify-center gap-4">

        {/* Status Bar */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.8, duration: 1 }}
          className="flex items-center gap-2 font-mono text-[10px] md:text-xs text-foreground/40 uppercase tracking-widest"
        >
          <span>[ STATUS ]</span>
          <div className="flex items-center gap-2 bg-foreground/5 px-3 py-1.5 rounded border border-white/5">
            <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse shadow-[0_0_8px_rgba(34,197,94,0.8)]" />
            <span className="text-foreground/60">Online — Listening for incoming pings...</span>
          </div>
        </motion.div>

        {/* Footer */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 1, duration: 1 }}
          className="font-mono text-[10px] md:text-xs text-foreground/30 hover:text-foreground/50 transition-colors mt-4"
        >
          Built by Aditya Ranjan // 2026
        </motion.div>
      </div>

    </section>
  )
}
