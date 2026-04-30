"use client"

import React from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'

const techList = [
  "Java", "Spring Boot", "Python", "Flask", "PostgreSQL", "AWS", "RESTful APIs", "Generative AI"
]

export const About = () => {
  return (
    <section id="about" className="py-24 max-w-5xl mx-auto">
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        className="heading-subtitle text-foreground mb-8 flex items-center gap-4"
      >
        <span className="font-mono text-primary text-xl">01.</span> About Me
        <div className="h-[1px] bg-foreground/20 flex-grow ml-4 max-w-xs"></div>
      </motion.h2>

      <div className="grid grid-cols-1 md:grid-cols-[3fr_2fr] gap-12 items-start">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ delay: 0.1 }}
          className="text-foreground/80 leading-relaxed space-y-4"
        >
          <p>
            Hello! My name is Aditya. My start in tech wasn't exactly planned. It actually began with a bricked phone and a custom ROM. I was trying to push my hardware as far as it would go, and after digging into Android kernels to save my device, I realized I didn't want to just use technology rather I wanted to understand the gears behind it.</p>
          <p>
            Fast-forward to today, I'm a 3rd-year Computer Science student at Manipal Institute of Technology specializing in Data Science. Recently, I've had the incredible opportunity to learn about Generative AI directly from scientists at the Amazon ML Summer School and train as a developer at Infosys. These days, my main focus is building solid, reliable backend systems and finding clever ways to integrate AI models into practical applications.
          </p>
          <p>Here are a few technologies I've been working with recently:</p>
          <ul className="grid grid-cols-2 gap-2 mt-4 font-mono text-sm text-foreground/70">
            {techList.map((tech, i) => (
              <li key={i} className="flex items-center gap-2">
                <svg className="w-3 h-3 text-primary" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M24 12l-24 12v-24z" />
                </svg>
                {tech}
              </li>
            ))}
          </ul>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ delay: 0.2 }}
          className="relative group w-3/4 md:w-full max-w-sm mx-auto"
        >
          {/* Physical Offset Border */}
          <div className="absolute inset-0 border-2 border-primary translate-x-4 translate-y-4 rounded transition-transform duration-300 ease-in-out group-hover:translate-x-2 group-hover:translate-y-2"></div>

          {/* Image Container with blend mode */}
          <div className="relative z-10 bg-primary rounded overflow-hidden">
            <div className="w-full aspect-[3/4] mix-blend-multiply filter grayscale contrast-125 transition-all duration-300 ease-in-out group-hover:filter-none group-hover:mix-blend-normal">
              <Image
                src="/images/me.jpeg"
                alt="Aditya Ranjan"
                fill
                className="object-cover"
              />
            </div>
            {/* Overlay to enforce primary tint */}
            <div className="absolute inset-0 bg-primary/20 transition-opacity duration-300 group-hover:opacity-0 pointer-events-none"></div>
          </div>
        </motion.div>
      </div>
    </section >
  )
}
