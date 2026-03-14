"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import { WHAT_WE_DO } from "@/constants";

const cards = WHAT_WE_DO.cards;

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
  const scale = useTransform(scrollYProgress, [0, 0.4], [0.5, 1]);
  const opacityCenter = useTransform(scrollYProgress, [0, 0.2], [0.6, 1]);
  const opacitySides = useTransform(scrollYProgress, [0, 0.4], [0, 1]);

  // Card specific transforms
  const offset1 = useTransform(scrollYProgress, [0, 0.4], ["0%", "-110%"]);
  const rotate1 = useTransform(scrollYProgress, [0, 0.4], [0, -6]);

  const offset3 = useTransform(scrollYProgress, [0, 0.4], ["0%", "110%"]);
  const rotate3 = useTransform(scrollYProgress, [0, 0.4], [0, 6]);

  const sectionOpacity = useTransform(scrollYProgress, [0.8, 1], [1, 0]);

  return (
    <div id="pillars" ref={containerRef} className="relative w-full h-[300vh] bg-[#001827]">
      <motion.div 
        style={{ opacity: sectionOpacity }}
        className="sticky top-0 w-full h-screen overflow-hidden flex flex-col items-center justify-center p-6"
      >
        
        {/* Section Header */}
        <motion.div 
          style={{ opacity: opacitySides }}
          className="absolute top-16 md:top-16 text-center"
        >
          <h2 className="font-outfit text-4xl md:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-white to-[#00E5FF] mb-4">
            {WHAT_WE_DO.header}
          </h2>
          <p className="font-outfit text-lg md:text-xl text-gray-300 max-w-2xl mx-auto">
            {WHAT_WE_DO.tagline}
          </p>
        </motion.div>

        {/* Cards Container */}
        <div className="relative w-full max-w-7xl flex items-center justify-center -mt-10 md:mt-20 h-[500px] gap-8">
          
          {/* Card 1 (Left/Top) */}
          <motion.div
            style={{ 
              scale,
              opacity: opacitySides,
              x: isMobile ? 0 : offset1,
              y: isMobile ? offset1 : 0,
              rotate: rotate1,
              zIndex: 10
            }}
            className={`absolute flex flex-col justify-center w-[280px] md:w-[350px] h-[380px] md:h-[450px] p-8 md:p-10 rounded-2xl md:rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.5)] bg-gradient-to-br ${cards[0].gradient} border border-white/10 backdrop-blur-sm`}
          >
            <div className="flex flex-col gap-6">
              <h3 className="font-outfit text-2xl md:text-3xl font-bold text-white leading-tight line-clamp-2">
                {cards[0].title}
              </h3>
              <p className="font-outfit text-base md:text-lg text-gray-200 leading-relaxed">
                {cards[0].description}
              </p>
            </div>
            <div className="absolute inset-0 bg-gradient-to-tr from-white/5 to-transparent rounded-2xl md:rounded-3xl pointer-events-none" />
          </motion.div>

          {/* Card 3 (Right/Bottom) */}
          <motion.div
            style={{ 
              scale,
              opacity: opacitySides,
              x: isMobile ? 0 : offset3,
              y: isMobile ? offset3 : 0,
              rotate: rotate3,
              zIndex: 10
            }}
            className={`absolute flex flex-col justify-center w-[280px] md:w-[350px] h-[380px] md:h-[450px] p-8 md:p-10 rounded-2xl md:rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.5)] bg-gradient-to-br ${cards[2].gradient} border border-white/10 backdrop-blur-sm`}
          >
            <div className="flex flex-col gap-6">
              <h3 className="font-outfit text-2xl md:text-3xl font-bold text-white leading-tight line-clamp-2">
                {cards[2].title}
              </h3>
              <p className="font-outfit text-base md:text-lg text-gray-200 leading-relaxed">
                {cards[2].description}
              </p>
            </div>
            <div className="absolute inset-0 bg-gradient-to-tr from-white/5 to-transparent rounded-2xl md:rounded-3xl pointer-events-none" />
          </motion.div>

          {/* Card 2 (Center) */}
          <motion.div
            style={{ 
              scale,
              opacity: opacityCenter,
              zIndex: 20
            }}
            className={`absolute flex flex-col justify-center w-[280px] md:w-[350px] h-[380px] md:h-[450px] p-8 md:p-10 rounded-2xl md:rounded-3xl shadow-[0_30px_60px_rgba(0,0,0,0.6)] bg-gradient-to-br ${cards[1].gradient} border border-[#00E5FF]/30 backdrop-blur-md`}
          >
            <div className="flex flex-col gap-6">
              <h3 className="font-outfit text-2xl md:text-3xl font-bold text-white leading-tight line-clamp-2">
                {cards[1].title}
              </h3>
              <p className="font-outfit text-base md:text-lg text-gray-200 leading-relaxed">
                {cards[1].description}
              </p>
            </div>
            <div className="absolute inset-0 bg-gradient-to-tr from-white/10 to-transparent rounded-2xl md:rounded-3xl pointer-events-none" />
          </motion.div>

        </div>
      </motion.div>
    </div>
  );
}