"use client"

import React, { useRef, useState } from 'react'
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion'
import { ChevronLeft, ChevronRight } from 'lucide-react'

const projectsData = [
  {
    title: "Sumeazy: AI Summarizer",
    description: "An NLP-driven web application that generates concise summaries for news articles and YouTube videos. Built with a responsive frontend and engineered with a Flask and PyMongo backend, featuring secure user authentication and history tracking.",
    techStack: ["Python", "Flask", "MongoDB", "AssemblyAI", "NLTK", "Bootstrap"],
    githubLink: "https://github.com/adiancodes/sumeazylite",
    liveLink: "https://github.com/adiancodes/sumeazylite",
    images: ["/images/sumeazy1.png", "/images/sumeazy2.png", "/images/sumeazy3.png"]
  },
  {
    title: "Smart Inventory Management Platform",
    description: "A robust, real-time inventory tracking system designed to optimize supply chain operations. Built with a scalable Java backend, it features automated stock monitoring, secure RESTful APIs, and role-based access controls for enterprise-grade data management.",
    techStack: ["Java", "Spring Boot", "PostgreSQL", "REST APIs"],
    githubLink: "https://github.com/adiancodes/smartinventory",
    liveLink: "https://github.com/adiancodes/smartinventory",
    images: ["/images/inventory1.png", "/images/inventory2.png", "/images/inventory3.png"]
  },
  {
    title: "Pocket Legal Assistant",
    description: "An academic ML application that classifies plain-language legal issues into nine categories. It utilizes a TF-IDF vectorizer and a Support Vector Classifier (SVC) to identify relevant Indian statutes and recommend immediate courses of action.",
    techStack: ["Python", "scikit-learn", "Streamlit", "NLP", "Machine Learning"],
    githubLink: "https://github.com/adiancodes/lawProject",
    liveLink: "https://meetyourpersonallawbuddy.streamlit.app",
    images: ["/images/legal1.png", "/images/legal2.png", "/images/legal3.png"]
  },
  {
    title: "MedBot: Medical Document Q&A",
    description: "A Retrieval-Augmented Generation (RAG) system that allows users to query medical PDFs and receive context-aware answers. It utilizes FAISS for efficient vector similarity search and integrates Google Gemini AI to process relevant document chunks, ensuring data privacy and source transparency.",
    techStack: ["Python", "Google Gemini API", "FAISS", "Streamlit", "RAG"],
    githubLink: "https://github.com/adiancodes/medBot",
    liveLink: "https://github.com/adiancodes/medBot",
    images: ["/images/medbot1.png", "/images/medbot2.png", "/images/medbot3.png"]
  }
]

const slideVariants = {
  enter: (direction: number) => ({
    x: direction > 0 ? '100%' : '-100%',
  }),
  center: {
    x: 0,
  },
  exit: (direction: number) => ({
    x: direction < 0 ? '100%' : '-100%',
  })
}

const ProjectItem = ({ project, index }: { project: typeof projectsData[0], index: number }) => {
  const containerRef = useRef<HTMLDivElement>(null)
  
  // Carousel State
  const [currentIndex, setCurrentIndex] = useState(0)
  const [direction, setDirection] = useState(1)

  const handleNext = () => {
    setDirection(1)
    setCurrentIndex((prev) => (prev + 1) % project.images.length)
  }

  const handlePrev = () => {
    setDirection(-1)
    setCurrentIndex((prev) => (prev - 1 + project.images.length) % project.images.length)
  }

  // Scroll-linked physics for the 3D laptop hinge
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "center center"]
  })

  // Map scroll progress to a -90deg to 0deg rotation for the Lid
  const rotateX = useTransform(scrollYProgress, [0, 1], [-90, 0])

  // Alternate layouts left/right based on index
  const isEven = index % 2 === 0

  return (
    <div ref={containerRef} className="relative grid grid-cols-1 lg:grid-cols-12 gap-8 items-center mb-32 md:mb-48">

      {/* DOM-Based 3D Laptop Mockup */}
      <div className={`col-span-1 lg:col-span-7 relative z-10 h-[300px] md:h-[400px] lg:h-[500px] flex items-center justify-center order-last ${isEven ? 'lg:order-1' : 'lg:order-2'}`}>

        {/* Laptop Wrapper with Perspective */}
        <div
          className="relative w-full max-w-[600px] aspect-[16/10] flex flex-col items-center justify-end mb-16 md:mb-0"
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
            {/* Screen Content / Image Carousel */}
            <div className="absolute inset-1 bg-black rounded-t-lg lg:rounded-t-2xl overflow-hidden flex items-center justify-center">
              <div className="absolute top-0 left-0 w-full h-full overflow-hidden">
                <AnimatePresence initial={false} custom={direction}>
                  <motion.img
                    key={currentIndex}
                    src={project.images[currentIndex]}
                    alt={`${project.title} screenshot ${currentIndex + 1}`}
                    custom={direction}
                    variants={slideVariants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    transition={{ ease: [0.33, 1, 0.68, 1], duration: 0.8 }}
                    className="absolute top-0 left-0 w-full h-full object-cover"
                  />
                </AnimatePresence>
              </div>
            </div>
          </motion.div>

          {/* The Base (Keyboard) - Static */}
          <div className="relative w-full h-[15px] lg:h-[20px] bg-slate-300 dark:bg-slate-700 rounded-b-2xl shadow-[0_20px_40px_rgba(0,0,0,0.5)] z-10 flex justify-center">
            {/* Trackpad notch */}
            <div className="w-1/6 h-[4px] bg-slate-400 dark:bg-slate-800 rounded-b-md mx-auto absolute top-0"></div>
          </div>

          {/* Navigation Controls (Keyboard-Style Arrows) */}
          <div className="absolute -bottom-16 left-1/2 -translate-x-1/2 flex items-center gap-4 z-30">
            <motion.button
              onClick={handlePrev}
              aria-label="Previous image"
              whileHover="hover"
              whileTap="tap"
              variants={{
                hover: { scale: 1.05, boxShadow: "0px 0px 8px rgba(0, 229, 255, 0.4)" },
                tap: { 
                  scale: 0.92, 
                  backgroundColor: "rgba(0, 229, 255, 0.1)", 
                  borderColor: "rgba(0, 229, 255, 1)",
                  boxShadow: "inset 0px 2px 4px rgba(0,0,0,0.2)" 
                }
              }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
              className="w-10 h-10 flex items-center justify-center rounded-md border border-slate-900 dark:border-white text-slate-900 dark:text-white hover:border-primary hover:text-primary dark:hover:border-primary dark:hover:text-primary transition-colors duration-300 shadow-sm bg-background"
            >
              <motion.div variants={{ tap: { x: -2 } }}>
                <ChevronLeft className="w-5 h-5" />
              </motion.div>
            </motion.button>
            <motion.button
              onClick={handleNext}
              aria-label="Next image"
              whileHover="hover"
              whileTap="tap"
              variants={{
                hover: { scale: 1.05, boxShadow: "0px 0px 8px rgba(0, 229, 255, 0.4)" },
                tap: { 
                  scale: 0.92, 
                  backgroundColor: "rgba(0, 229, 255, 0.1)", 
                  borderColor: "rgba(0, 229, 255, 1)",
                  boxShadow: "inset 0px 2px 4px rgba(0,0,0,0.2)" 
                }
              }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
              className="w-10 h-10 flex items-center justify-center rounded-md border border-slate-900 dark:border-white text-slate-900 dark:text-white hover:border-primary hover:text-primary dark:hover:border-primary dark:hover:text-primary transition-colors duration-300 shadow-sm bg-background"
            >
              <motion.div variants={{ tap: { x: 2 } }}>
                <ChevronRight className="w-5 h-5" />
              </motion.div>
            </motion.button>
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
        className={`col-span-1 lg:col-span-5 relative z-40 mt-8 lg:mt-0 order-first ${isEven ? 'lg:order-2 text-left' : 'lg:order-1 lg:text-right'}`}
      >
        <motion.p
          variants={{ hidden: { y: 50, opacity: 0 }, visible: { y: 0, opacity: 1 } }}
          className="font-mono text-primary text-sm my-2 tracking-widest uppercase"
        >
          Featured Project
        </motion.p>

        <motion.h3
          variants={{ hidden: { y: 50, opacity: 0 }, visible: { y: 0, opacity: 1 } }}
          className="text-3xl lg:text-4xl font-bold text-foreground mb-6 tracking-tight hover:text-primary transition-colors duration-300"
        >
          <a href={project.liveLink} target="_blank" rel="noopener noreferrer">
            {project.title}
          </a>
        </motion.h3>

        <motion.div
          variants={{ hidden: { y: 50, opacity: 0 }, visible: { y: 0, opacity: 1 } }}
          className={`bg-background/80 backdrop-blur-xl p-6 md:p-8 rounded-lg shadow-2xl border border-foreground/10 text-foreground/80 text-sm md:text-base leading-relaxed relative z-50 ${isEven ? 'lg:-ml-16' : 'lg:-mr-16'}`}
        >
          <p>
            {project.description}
          </p>
        </motion.div>

        <motion.ul
          variants={{ hidden: { y: 50, opacity: 0 }, visible: { y: 0, opacity: 1 } }}
          className={`flex flex-wrap gap-4 mt-8 font-mono text-xs text-foreground/60 tracking-wider uppercase ${isEven ? 'justify-start' : 'justify-start lg:justify-end'}`}
        >
          {project.techStack.map((tech) => (
            <li key={tech}>{tech}</li>
          ))}
        </motion.ul>

        <motion.div
          variants={{ hidden: { y: 50, opacity: 0 }, visible: { y: 0, opacity: 1 } }}
          className={`flex gap-4 mt-6 items-center ${isEven ? 'justify-start' : 'justify-start lg:justify-end'}`}
        >
          <a href={project.githubLink} target="_blank" rel="noopener noreferrer" className="text-foreground/80 hover:text-primary transition-colors" aria-label="GitHub Repository">
            <svg viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor">
              <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
            </svg>
          </a>
          <a href={project.liveLink} target="_blank" rel="noopener noreferrer" className="text-foreground/80 hover:text-primary transition-colors" aria-label="External Link">
            <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
              <polyline points="15 3 21 3 21 9"></polyline>
              <line x1="10" y1="14" x2="21" y2="3"></line>
            </svg>
          </a>
        </motion.div>
      </motion.div>
    </div>
  )
}

export const Projects = () => {
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

      <div>
        {projectsData.map((project, index) => (
          <ProjectItem key={index} project={project} index={index} />
        ))}
      </div>
    </section>
  )
}
