"use client"

import React, { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'

export const Projects = () => {
  const containerRef = useRef<HTMLDivElement>(null)

  // Scroll-linked physics for the 3D laptop hinge
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "center center"]
  })

  // Map scroll progress to a -90deg to 0deg rotation for the Lid
  const rotateX = useTransform(scrollYProgress, [0, 1], [-90, 0])

  return (
    <section id="projects" className="py-32 max-w-6xl mx-auto px-4 md:px-0 overflow-hidden">
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        className="heading-subtitle text-foreground mb-24 flex items-center gap-6"
      >
        <span className="font-mono text-primary text-xl">03.</span>
        <span className="uppercase tracking-widest text-sm md:text-xl font-bold">Projects</span>
        <div className="h-[1px] bg-foreground/10 flex-grow ml-4 max-w-md"></div>
      </motion.h2>

      <div ref={containerRef} className="relative grid grid-cols-1 lg:grid-cols-12 gap-8 items-center mb-32 md:mb-48">
        
        {/* DOM-Based 3D Laptop Mockup */}
        <div className="col-span-1 lg:col-span-7 relative z-10 h-[300px] md:h-[400px] lg:h-[500px] flex items-center justify-center">
          
          {/* Laptop Wrapper with Perspective */}
          <div 
            className="relative w-full max-w-[600px] aspect-[16/10] flex flex-col items-center justify-end"
            style={{ perspective: "1000px" }}
          >
            {/* The Lid (Screen) - Hinges open from the bottom */}
            <motion.div
              style={{
                rotateX,
                transformOrigin: "bottom center",
                transformStyle: "preserve-3d",
              }}
              className="relative w-[90%] aspect-[16/10] bg-slate-900 rounded-t-xl lg:rounded-t-3xl border-4 border-slate-800 border-b-0 overflow-hidden shadow-2xl z-20"
            >
              {/* Screen Content / Image */}
              <div className="absolute inset-1 bg-black rounded-t-lg lg:rounded-t-2xl overflow-hidden flex items-center justify-center">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img 
                  src="https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=1280&q=80" 
                  alt="Project Screenshot"
                  className="w-full h-full object-cover opacity-80"
                />
              </div>
            </motion.div>

            {/* The Base (Keyboard) - Static */}
            <div className="relative w-full h-[15px] lg:h-[20px] bg-slate-300 dark:bg-slate-700 rounded-b-2xl shadow-[0_20px_40px_rgba(0,0,0,0.5)] z-10 flex justify-center">
              {/* Trackpad notch */}
              <div className="w-1/6 h-[4px] bg-slate-400 dark:bg-slate-800 rounded-b-md mx-auto absolute top-0"></div>
            </div>
          </div>
        </div>

        {/* Project Text Content */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={{
            hidden: {},
            visible: {
              transition: { staggerChildren: 0.2, duration: 0.6, ease: "easeOut" }
            }
          }}
          className="col-span-1 lg:col-span-5 relative z-40 mt-8 lg:mt-0 text-left"
        >
          <motion.p 
            variants={{ hidden: { y: 50, opacity: 0 }, visible: { y: 0, opacity: 1 } }} 
            className="font-mono text-primary text-sm my-2 tracking-widest uppercase"
          >
            Featured Project
          </motion.p>
          <motion.h3 
            variants={{ hidden: { y: 50, opacity: 0 }, visible: { y: 0, opacity: 1 } }} 
            className="text-3xl lg:text-4xl font-bold text-foreground mb-6 tracking-tight"
          >
            DOM 3D Integration
          </motion.h3>

          <motion.div 
            variants={{ hidden: { y: 50, opacity: 0 }, visible: { y: 0, opacity: 1 } }} 
            className="bg-background/80 backdrop-blur-xl p-6 md:p-8 rounded-lg shadow-2xl border border-foreground/10 text-foreground/80 text-sm md:text-base leading-relaxed lg:-ml-16 relative z-50"
          >
            <p>
              A high-performance web application featuring a CSS-driven 3D laptop mockup. The lid is bound to the scroll position, allowing it to hinge open naturally as it enters the viewport.
            </p>
          </motion.div>

          <motion.ul 
            variants={{ hidden: { y: 50, opacity: 0 }, visible: { y: 0, opacity: 1 } }} 
            className="flex flex-wrap gap-4 mt-8 font-mono text-xs text-foreground/60 tracking-wider uppercase justify-start"
          >
            <li>Next.js</li>
            <li>Framer Motion</li>
            <li>CSS 3D</li>
            <li>Tailwind</li>
          </motion.ul>
        </motion.div>
      </div>
    </section>
  )
}
