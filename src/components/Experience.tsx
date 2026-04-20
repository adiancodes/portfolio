"use client"

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const experiences = [
  {
    company: "Infosys Springboard",
    role: "Software Development Trainee",
    date: "Oct 2025 - Dec 2025",
    bullets: [
      "Developed backend services and debugged API endpoints to improve data retrieval and ensure overall system reliability.",
      "Collaborated on integrating backend services with the frontend, ensuring seamless API communication.",
    ]
  },
  {
    company: "Amazon ML School",
    role: "ML Summer School Scholar",
    date: "Aug 2025 - Sep 2025",
    bullets: [
      "Selected for a competitive, month-long program focused on machine learning topics, taught by Amazon Scientists.",
      "Gained practical understanding and applied foundational concepts in deep learning, Generative AI, LLMs, and reinforcement learning through hands-on exercises and expert-led sessions.",
    ]
  }
]

export const Experience = () => {
  const [activeTab, setActiveTab] = useState(0)

  return (
    <section id="experience" className="py-24 max-w-3xl mx-auto">
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        className="heading-subtitle text-foreground mb-12 flex items-center gap-4"
      >
        <span className="font-mono text-primary text-xl">02.</span>  Hands-on Experience
        <div className="h-[1px] bg-foreground/20 flex-grow ml-4 max-w-xs"></div>
      </motion.h2>

      <div className="flex flex-col md:flex-row gap-8">
        {/* Vertical Tabs List */}
        <div className="flex md:flex-col overflow-x-auto md:overflow-visible no-scrollbar border-b md:border-b-0 md:border-l border-foreground/10 relative">
          {experiences.map((exp, idx) => (
            <button
              key={idx}
              onClick={() => setActiveTab(idx)}
              className={`px-4 py-3 md:py-4 text-left font-mono text-sm whitespace-nowrap transition-colors duration-200 border-b-2 md:border-b-0 md:border-l-2 -mb-[2px] md:-ml-[2px] ${activeTab === idx
                ? 'text-primary border-primary bg-primary/5'
                : 'text-foreground/60 border-transparent hover:text-primary hover:bg-foreground/5'
                }`}
            >
              {exp.company}
            </button>
          ))}
        </div>

        {/* Tab Panel */}
        <div className="relative flex-grow min-h-[300px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
            >
              <h3 className="text-xl font-medium text-foreground">
                {experiences[activeTab].role} <span className="text-primary">@ {experiences[activeTab].company}</span>
              </h3>
              <p className="font-mono text-xs text-foreground/60 mb-6 mt-1">
                {experiences[activeTab].date}
              </p>
              <ul className="space-y-4">
                {experiences[activeTab].bullets.map((bullet, idx) => (
                  <li key={idx} className="flex gap-4 text-foreground/80 text-sm leading-relaxed">
                    <span className="text-primary mt-1 text-xs">▹</span>
                    {bullet}
                  </li>
                ))}
              </ul>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  )
}
