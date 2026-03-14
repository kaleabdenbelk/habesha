"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useEffect, useState } from "react";

const cards = [
  {
    title: "Technical Innovation",
    description: "Building scalable, AI-driven architectures and modern web applications that solve complex problems.",
    icon: "💻",
    gradient: "from-[#001827] to-[#005f73]",
  },
  {
    title: "Strategic Growth",
    description: "Developing actionable business models and financial strategies to accelerate market presence.",
    icon: "📈",
    gradient: "from-[#005f73] to-[#00E5FF]",
  },
  {
    title: "Creative Excellence",
    description: "Designing intuitive, Awwwards-level user experiences with immersive storytelling.",
    icon: "✨",
    gradient: "from-[#00E5FF] to-[#001827]",
  },
];

export default function WhatWeDo() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Track scroll progress within this component's container
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // State to track if we're on a mobile device for responsive animations
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize(); // Initial check
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Shared Transformations
  // Cards start at scale 0.5 (small) and grow to 1 (normal)
  const scale = useTransform(scrollYProgress, [0, 0.4], [0.5, 1]);
  // Cards start faded slightly, become fully opaque
  const opacityCenter = useTransform(scrollYProgress, [0, 0.2], [0.6, 1]);
  const opacitySides = useTransform(scrollYProgress, [0, 0.4], [0, 1]);

  // Specific Transformations for Card 1 (Left / Top)
  // Initially at 0 offset, moves out to -110% (x on desktop, y on mobile)
  const offset1 = useTransform(scrollYProgress, [0, 0.4], ["0%", "-110%"]);
  // Tilts outward
  const rotate1 = useTransform(scrollYProgress, [0, 0.4], [0, -6]);

  // Specific Transformations for Card 2 (Center)
  // Stays centered, just scales and fades (handled by shared transforms)

  // Specific Transformations for Card 3 (Right / Bottom)
  // Initially at 0 offset, moves out to 110% (x on desktop, y on mobile)
  const offset3 = useTransform(scrollYProgress, [0, 0.4], ["0%", "110%"]);
  // Tilts outward
  const rotate3 = useTransform(scrollYProgress, [0, 0.4], [0, 6]);

  // Fade out the whole section towards the very end to transition to the next
  const sectionOpacity = useTransform(scrollYProgress, [0.8, 1], [1, 0]);

  return (
    <div ref={containerRef} className="relative w-full h-[300vh] bg-[#001827]">
      {/* Sticky container that stays on screen while scrolling the 300vh */}
      <motion.div 
        style={{ opacity: sectionOpacity }}
        className="sticky top-0 w-full h-screen overflow-hidden flex flex-col items-center justify-center p-6"
      >
        
        {/* Section Header */}
        <motion.div 
          style={{ opacity: opacitySides }} // Fade in as cards spread
          className="absolute top-24 md:top-32 text-center"
        >
          <h2 className="font-outfit text-4xl md:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-white to-[#00E5FF] mb-4">
            What We Do
          </h2>
          <p className="font-outfit text-lg md:text-xl text-gray-300 max-w-2xl mx-auto">
            Three pillars of excellence converging to build the future.
          </p>
        </motion.div>

        {/* The 3 Paper Cards Container */}
        <div className="relative w-full max-w-7xl flex items-center justify-center -mt-10 md:mt-20 h-[500px]">
          
          {/* Card 1 (Left on desktop, Top on mobile) */}
          <motion.div
            style={{ 
              scale,
              opacity: opacitySides,
              x: isMobile ? 0 : offset1,
              y: isMobile ? offset1 : 0,
              rotate: rotate1,
              zIndex: 10
            }}
            className={`absolute flex flex-col justify-between w-[280px] md:w-[350px] h-[380px] md:h-[450px] p-8 md:p-10 rounded-2xl md:rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.5)] bg-gradient-to-br ${cards[0].gradient} border border-white/10 backdrop-blur-sm`}
          >
            <div className="text-5xl md:text-6xl mb-6">{cards[0].icon}</div>
            <div>
              <h3 className="font-outfit text-2xl md:text-3xl font-bold text-white mb-4 line-clamp-2">
                {cards[0].title}
              </h3>
              <p className="font-outfit text-base md:text-lg text-gray-200 leading-relaxed">
                {cards[0].description}
              </p>
            </div>
            {/* Glossy paper reflection effect */}
            <div className="absolute inset-0 bg-gradient-to-tr from-white/5 to-transparent rounded-2xl md:rounded-3xl pointer-events-none" />
          </motion.div>

          {/* Card 3 (Right on desktop, Bottom on mobile) - Rendered before Center so Center overlaps it when stacked */}
          <motion.div
            style={{ 
              scale,
              opacity: opacitySides,
              x: isMobile ? 0 : offset3,
              y: isMobile ? offset3 : 0,
              rotate: rotate3,
              zIndex: 10
            }}
            className={`absolute flex flex-col justify-between w-[280px] md:w-[350px] h-[380px] md:h-[450px] p-8 md:p-10 rounded-2xl md:rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.5)] bg-gradient-to-br ${cards[2].gradient} border border-white/10 backdrop-blur-sm`}
          >
            <div className="text-5xl md:text-6xl mb-6">{cards[2].icon}</div>
            <div>
              <h3 className="font-outfit text-2xl md:text-3xl font-bold text-white mb-4 line-clamp-2">
                {cards[2].title}
              </h3>
              <p className="font-outfit text-base md:text-lg text-gray-200 leading-relaxed">
                {cards[2].description}
              </p>
            </div>
            <div className="absolute inset-0 bg-gradient-to-tr from-white/5 to-transparent rounded-2xl md:rounded-3xl pointer-events-none" />
          </motion.div>

          {/* Card 2 (Center) - Highest z-index so it's on top when stacked */}
          <motion.div
            style={{ 
              scale,
              opacity: opacityCenter,
              zIndex: 20
            }}
            className={`absolute flex flex-col justify-between w-[280px] md:w-[350px] h-[380px] md:h-[450px] p-8 md:p-10 rounded-2xl md:rounded-3xl shadow-[0_30px_60px_rgba(0,0,0,0.6)] bg-gradient-to-br ${cards[1].gradient} border border-[#00E5FF]/30 backdrop-blur-md`}
          >
            <div className="text-5xl md:text-6xl mb-6">{cards[1].icon}</div>
            <div>
              <h3 className="font-outfit text-2xl md:text-3xl font-bold text-white mb-4 line-clamp-2">
                {cards[1].title}
              </h3>
              <p className="font-outfit text-base md:text-lg text-gray-200 leading-relaxed">
                {cards[1].description}
              </p>
            </div>
            {/* Brighter reflection for the center/main card */}
            <div className="absolute inset-0 bg-gradient-to-tr from-white/10 to-transparent rounded-2xl md:rounded-3xl pointer-events-none" />
          </motion.div>

        </div>
      </motion.div>
    </div>
  );
}
