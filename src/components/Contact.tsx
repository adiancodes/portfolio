"use client"

import React from 'react'
import { motion } from 'framer-motion'

export const Contact = () => {
  return (
    <section id="contact" className="py-32 max-w-4xl mx-auto px-4 md:px-0 flex flex-col items-center justify-center min-h-[80vh] relative">
      
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
      <div className="overflow-hidden mb-8 py-2">
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

      {/* Staggered Body & Button */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={{
          hidden: {},
          visible: {
            transition: { staggerChildren: 0.2, delayChildren: 0.2 }
          }
        }}
        className="flex flex-col items-center text-center"
      >
        <motion.p
          variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="max-w-md text-foreground/70 leading-relaxed mb-12"
        >
          I'm currently looking for new opportunities or interesting projects to collaborate on. Whether you have a question about backend architecture or just want to say hi, my inbox is always open.
        </motion.p>

        <motion.a
          href="mailto:contactaditya013@gmail.com"
          variants={{ hidden: { opacity: 0, scale: 0.9 }, visible: { opacity: 1, scale: 1 } }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
          whileHover={{ 
            y: -5, 
            boxShadow: "0px 0px 20px rgba(45, 212, 191, 0.4)",
            borderColor: "rgba(45, 212, 191, 1)",
            backgroundColor: "rgba(45, 212, 191, 0.05)"
          }}
          whileTap={{ scale: 0.95 }}
          className="px-8 py-4 font-mono text-teal-400 border border-teal-400/50 rounded-sm transition-colors tracking-widest text-sm relative overflow-hidden group"
        >
          SAY_HELLO()
        </motion.a>
      </motion.div>

      {/* Terminal Status Bar & Footer */}
      <div className="absolute bottom-0 w-full flex flex-col items-center justify-center gap-4 pb-8">
        
        {/* Status Bar */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.8, duration: 1 }}
          className="flex items-center gap-2 font-mono text-[10px] text-foreground/40 uppercase tracking-widest"
        >
          <span>[ STATUS ]</span>
          <div className="flex items-center gap-1.5 bg-foreground/5 px-2 py-1 rounded">
            <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse shadow-[0_0_5px_rgba(34,197,94,0.8)]" />
            <span className="text-foreground/60">Online — Listening for incoming pings...</span>
          </div>
        </motion.div>

        {/* Footer */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 1, duration: 1 }}
          className="font-mono text-[10px] text-foreground/30 hover:text-foreground/50 transition-colors"
        >
          Built by Aditya Ranjan // 2026
        </motion.div>
      </div>

    </section>
  )
}
