"use client";

import { motion, Variants } from "framer-motion";
import { useState } from "react";
import Image from "next/image";

const projects = [
  {
    id: 1,
    title: "AI Fleet Orchestrator",
    category: "Technical Innovation",
    description: "Quantum-ready routing for autonomous maritime assets, ensuring zero-collision pathways and peak energy efficiency.",
    image: "/images/bg-hero.jpg", // Using existing placeholder if possible, or reliable fallbacks
    accent: "#00E5FF",
    size: "large", // Bento grid sizing
  },
  {
    id: 2,
    title: "EcoMarine Tokenomics",
    category: "Strategic Growth",
    description: "Decentralized carbon-credit platform for luxury maritime voyages.",
    image: "/images/bg-hero.jpg",
    accent: "#005f73",
    size: "small",
  },
  {
    id: 3,
    title: "Aura UI Design System",
    category: "Creative Excellence",
    description: "Multi-sensory interface architecture for high-end digital cockpits.",
    image: "/images/bg-hero.jpg",
    accent: "#ffffff",
    size: "small",
  },
  {
    id: 4,
    title: "AquaNova Sales Experience",
    category: "Strategic Growth",
    description: "Immersive VR configurator for next-gen hybrid catamaran customization.",
    image: "/images/bg-hero.jpg",
    accent: "#00E5FF",
    size: "medium",
  },
];

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const cardVariants: Variants = {
  hidden: { y: 50, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.8,
      ease: "easeOut",
    },
  },
};

export default function ProjectShowcase() {
  const [hoveredId, setHoveredId] = useState<number | null>(null);

  return (
    <section className="relative w-full min-h-screen bg-black py-24 md:py-32 px-6 overflow-hidden">
      {/* Background radial glow */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-[#00E5FF]/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-[#005f73]/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-16 md:mb-24">
          <motion.span 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="text-[#00E5FF] font-outfit font-bold uppercase tracking-widest text-sm mb-4 block"
          >
            Capabilities in Action
          </motion.span>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="font-outfit text-4xl md:text-6xl font-extrabold text-white leading-tight"
          >
            Progeny <span className="text-gray-500 italic">Projects.</span>
          </motion.h2>
        </div>

        {/* Project Grid (Bento Style) */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-12 gap-6 h-auto md:h-[900px]"
        >
          {projects.map((project) => (
            <motion.div
              key={project.id}
              variants={cardVariants}
              onHoverStart={() => setHoveredId(project.id)}
              onHoverEnd={() => setHoveredId(null)}
              className={`relative group rounded-3xl overflow-hidden cursor-pointer bg-[#001827] border border-white/5 transition-all duration-500
                ${project.size === 'large' ? 'md:col-span-8 md:row-span-2' : ''}
                ${project.size === 'medium' ? 'md:col-span-12 md:row-span-1' : ''}
                ${project.size === 'small' ? 'md:col-span-4 md:row-span-1' : ''}
                ${hoveredId === project.id ? 'border-[#00E5FF]/30 shadow-[0_0_40px_rgba(0,229,255,0.1)]' : ''}
              `}
            >
              {/* Image with overlay */}
              <div className="absolute inset-0 z-0">
                <div 
                  className="w-full h-full bg-cover bg-center transition-transform duration-1000 ease-out group-hover:scale-110"
                  style={{ backgroundImage: `url(${project.image})`, opacity: 0.4 }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#001827] via-[#001827]/60 to-transparent" />
              </div>

              {/* Content */}
              <div className="relative z-10 p-8 h-full flex flex-col justify-end">
                <div className="mb-4">
                  <span 
                    className="px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-tighter bg-white/10 text-white border border-white/20"
                    style={{ borderColor: hoveredId === project.id ? project.accent : '' }}
                  >
                    {project.category}
                  </span>
                </div>
                
                <h3 className="font-outfit text-2xl md:text-3xl font-bold text-white mb-2 transition-transform duration-500 group-hover:-translate-y-2">
                  {project.title}
                </h3>
                
                <p className="font-outfit text-gray-400 text-sm md:text-base max-w-md opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-4 group-hover:translate-y-0">
                  {project.description}
                </p>

                {/* Interactive button (appearing on hover) */}
                <div className="mt-6 opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-4 group-hover:translate-y-0">
                   <div className="inline-flex items-center text-white font-bold text-sm tracking-widest gap-2">
                     VIEW CASE STUDY
                     <div className="w-8 h-[1px] bg-[#00E5FF]" />
                   </div>
                </div>
              </div>

              {/* Decorative accent light */}
              <div 
                className="absolute top-0 right-0 w-32 h-32 blur-[60px] opacity-0 group-hover:opacity-40 transition-opacity duration-500 pointer-events-none"
                style={{ backgroundColor: project.accent }}
              />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
