"use client"

import React from 'react'
import { motion } from 'framer-motion'

const achievementsData = [
  {
    name: "Global Rank 1 - CodeChef Challenge",
    detail: "CodeChef Weekend Dev Challenge 31 | 2024",
    description: "Secured a perfect score of 600/600 in Data Analysis & Visualization."
  },
  {
    name: "MAHE Achievers Scholarship",
    detail: "Manipal Institute of Technology | 2024",
    description: "Awarded for ranking in the top 5% of the branch for academic excellence."
  },
  {
    name: "AWS Academy Graduate",
    detail: "Amazon Web Services | Dec 2025",
    description: "Certified in Cloud Foundations, covering cloud infrastructure and security.",
    link: "https://example.com/aws-cert"
  },
  {
    name: "Agile Scrum Certified",
    detail: "Infosys | June 2025",
    description: "Certified in Agile Scrum methodologies and best practices in software development.",
    link: "https://example.com/scrum-cert"
  }
]

export const Certifications = () => {
  return (
    <section id="achievements" className="py-32 max-w-4xl mx-auto px-6 md:px-0">
      {/* Header */}
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        className="heading-subtitle text-foreground mb-20 flex items-center gap-6"
      >
        <span className="font-mono text-primary text-xl">04.</span>
        <span className="uppercase tracking-widest text-sm md:text-xl font-bold">Achievements & Certifications</span>
        <div className="h-[1px] bg-foreground/10 flex-grow ml-4 max-w-md"></div>
      </motion.h2>

      {/* List Container */}
      <div className="flex flex-col">
        {achievementsData.map((item, index) => (
          <motion.div
            key={index}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={{
              hidden: {},
              visible: {
                transition: { staggerChildren: 0.15 }
              }
            }}
            className="group grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-8 py-10 border-b border-foreground/10 last:border-0"
          >
            {/* Left Column: Name */}
            <div className="md:col-span-4">
              <div className="overflow-hidden pb-1">
                <motion.h3
                  variants={{
                    hidden: { y: "100%" },
                    visible: { y: 0, transition: { ease: [0.33, 1, 0.68, 1], duration: 1 } }
                  }}
                  className="text-lg md:text-xl font-bold text-primary group-hover:text-primary/80 transition-colors"
                >
                  {item.name}
                </motion.h3>
              </div>
            </div>

            {/* Right Column: Detail & Description */}
            <div className="md:col-span-8 flex flex-col justify-center">
              <div className="overflow-hidden pb-1 mb-2">
                <motion.p
                  variants={{
                    hidden: { y: "100%" },
                    visible: { y: 0, transition: { ease: [0.33, 1, 0.68, 1], duration: 1 } }
                  }}
                  className="font-mono text-xs md:text-sm text-foreground/50 tracking-wider uppercase"
                >
                  {item.detail}
                </motion.p>
              </div>
              
              <div className="overflow-hidden pb-1">
                <motion.p
                  variants={{
                    hidden: { y: "100%" },
                    visible: { y: 0, transition: { ease: [0.33, 1, 0.68, 1], duration: 1 } }
                  }}
                  className="text-foreground/80 text-sm md:text-base font-light leading-relaxed"
                >
                  {item.description}
                </motion.p>
              </div>

              {item.link && (
                <div className="overflow-hidden pb-1 mt-4">
                  <motion.a
                    href={item.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    variants={{
                      hidden: { y: "100%" },
                      visible: { y: 0, transition: { ease: [0.33, 1, 0.68, 1], duration: 1 } }
                    }}
                    className="inline-block font-mono text-xs md:text-sm text-primary hover:text-primary/70 hover:underline underline-offset-4 transition-all"
                  >
                    View Credential &rarr;
                  </motion.a>
                </div>
              )}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
