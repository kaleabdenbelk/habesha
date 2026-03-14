"use client";

import { motion, useScroll, useTransform, MotionValue } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import { WHAT_WE_DO } from "@/constants";

const cards = WHAT_WE_DO.cards;

export default function WhatWeDo() {
  const containerRef = useRef<HTMLDivElement>(null);

  // Track scroll progress within this component's container
  // Increase height for mobile to give more scroll "room" for each card
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

  // -- Desktop Logic (Fan Out) --
  const desktopScale = useTransform(scrollYProgress, [0, 0.4], [0.5, 1]);
  const desktopOpacityCenter = useTransform(scrollYProgress, [0, 0.2], [0.6, 1]);
  const desktopOpacitySides = useTransform(scrollYProgress, [0, 0.4], [0, 1]);

  const desktopOffsets = [
    useTransform(scrollYProgress, [0, 0.4], ["0%", "-150%"]),
    useTransform(scrollYProgress, [0, 0.4], ["0%", "-50%"]),
    useTransform(scrollYProgress, [0, 0.4], ["0%", "50%"]),
    useTransform(scrollYProgress, [0, 0.4], ["0%", "150%"]),
  ];

  const desktopRotations = [
    useTransform(scrollYProgress, [0, 0.4], [0, -8]),
    useTransform(scrollYProgress, [0, 0.4], [0, -3]),
    useTransform(scrollYProgress, [0, 0.4], [0, 3]),
    useTransform(scrollYProgress, [0, 0.4], [0, 8]),
  ];

  // -- Mobile Logic (Sequential) --
  // We divide 0.0 to 0.8 into segments for 4 cards
  const mobileRanges = [
    [0.0, 0.1, 0.2, 0.25],
    [0.2, 0.3, 0.4, 0.45],
    [0.4, 0.5, 0.6, 0.65],
    [0.6, 0.7, 0.8, 0.85],
  ];

  const mobileOpacities = mobileRanges.map(range => 
    useTransform(scrollYProgress, range, [0, 1, 1, 0])
  );

  const mobileY = mobileRanges.map(range => 
    useTransform(scrollYProgress, range, [100, 0, 0, -100])
  );

  const mobileScale = mobileRanges.map(range => 
    useTransform(scrollYProgress, range, [0.8, 1, 1, 0.8])
  );

  const sectionOpacity = useTransform(scrollYProgress, [0.85, 1], [1, 0]);
  const headerOpacity = useTransform(scrollYProgress, [0, 0.1, 0.8, 0.9], [0, 1, 1, 0]);

  return (
    <div id="pillars" ref={containerRef} className="relative w-full h-[400vh] md:h-[300vh] bg-[#001827]">
      <motion.div
        style={{ opacity: sectionOpacity }}
        className="sticky top-0 w-full h-screen overflow-hidden flex flex-col items-center justify-center p-6"
      >

        {/* Section Header */}
        <motion.div
          style={{ opacity: isMobile ? headerOpacity : desktopOpacitySides }}
          className="absolute top-16 md:top-16 text-center z-50 pointer-events-none"
        >
          <h2 className="font-outfit text-4xl md:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-white to-[#57ff8f] mb-4">
            {WHAT_WE_DO.header}
          </h2>
          <p className="font-outfit text-lg md:text-xl text-gray-300 max-w-2xl mx-auto px-4">
            {WHAT_WE_DO.tagline}
          </p>
        </motion.div>

        {/* Cards Container */}
        <div className="relative w-full max-w-7xl flex items-center justify-center -mt-10 md:mt-20 h-[500px] gap-8">
          {cards.map((card, idx) => (
            <motion.div
              key={idx}
              style={{
                scale: isMobile ? mobileScale[idx] : desktopScale,
                opacity: isMobile 
                  ? mobileOpacities[idx] 
                  : (idx === 1 || idx === 2 ? desktopOpacityCenter : desktopOpacitySides),
                x: isMobile ? 0 : desktopOffsets[idx],
                y: isMobile ? mobileY[idx] : 0,
                rotate: isMobile ? 0 : desktopRotations[idx],
                zIndex: 10 + idx
              }}
              className={`absolute flex flex-col justify-center w-[280px] md:w-[320px] h-[380px] md:h-[420px] p-8 md:p-10 rounded-2xl md:rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.5)] bg-gradient-to-br ${card.gradient} border border-white/10 backdrop-blur-sm transition-shadow duration-500 hover:shadow-[0_0_30px_rgba(0,229,255,0.2)]`}
            >
              <div className="flex flex-col gap-6">
                <div className="text-4xl md:text-5xl">{card.icon}</div>
                <h3 className="font-outfit text-2xl md:text-3xl font-bold text-white leading-tight">
                  {card.title}
                </h3>
                <p className="font-outfit text-base md:text-lg text-gray-200 leading-relaxed">
                  {card.description}
                </p>
              </div>
              <div className="absolute inset-0 bg-gradient-to-tr from-white/5 to-transparent rounded-2xl md:rounded-3xl pointer-events-none" />
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}