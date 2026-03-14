"use client";

import { motion, MotionValue, useTransform } from "framer-motion";
import { HERO_CONTENT } from "@/constants";
import Link from "next/link";
import { useEffect, useState } from "react";

interface HeroTextOverlaysProps {
  scrollYProgress: MotionValue<number>;
}

export default function HeroTextOverlays({ scrollYProgress }: HeroTextOverlaysProps) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Sequential Ranges for Mobile to prevent overlapping
  // Desktop still allows some overlap for richness
  const rangeHeadline = isMobile ? [0, 0.05, 0.15, 0.2] : [0, 0.15, 0.25, 0.35];
  const rangeSubheadline = isMobile ? [0.2, 0.25, 0.35, 0.4] : [0.05, 0.15, 0.25, 0.35];
  const rangeMicrocopy = isMobile ? [0.4, 0.45, 0.55, 0.6] : [0.1, 0.2, 0.25, 0.35];
  const rangeAbout = isMobile ? [0.6, 0.7, 0.85, 0.95] : [0.5, 0.65, 0.95, 1];
  const rangeCTA = isMobile ? [0.75, 0.85, 0.95, 1] : [0.55, 0.7, 0.95, 1];

  // TOP LEFT: Headline
  const opacityTL = useTransform(scrollYProgress, rangeHeadline, isMobile ? [0, 1, 1, 0] : [1, 1, 0, 0]);
  const yTL = useTransform(scrollYProgress, [rangeHeadline[0], rangeHeadline[1]], [30, 0]);

  // TOP RIGHT: Subheadline
  const opacityTR = useTransform(scrollYProgress, rangeSubheadline, [0, 1, 1, 0]);
  const yTR = useTransform(scrollYProgress, [rangeSubheadline[0], rangeSubheadline[1]], [30, 0]);

  // BOTTOM LEFT: Microcopy
  const opacityBL = useTransform(scrollYProgress, rangeMicrocopy, [0, 1, 1, 0]);
  const xBL = useTransform(scrollYProgress, [rangeMicrocopy[0], rangeMicrocopy[1]], isMobile ? [0, 0] : [-30, 0]);
  const yBL = useTransform(scrollYProgress, [rangeMicrocopy[0], rangeMicrocopy[1]], isMobile ? [30, 0] : [0, 0]);

  // ABOUT US TEXT
  const opacityAbout = useTransform(scrollYProgress, rangeAbout, [0, 1, 1, 0]);
  const yAbout = useTransform(scrollYProgress, [rangeAbout[0], rangeAbout[1]], [30, 0]);

  // BOTTOM RIGHT: CTA
  const opacityBR = useTransform(scrollYProgress, rangeCTA, [0, 1, 1, 0]);
  const scaleBR = useTransform(scrollYProgress, rangeCTA, [0.8, 1, 0.95, 0.9]);

  // Scroll cue arrow
  const opacityCue = useTransform(scrollYProgress, [0.85, 0.95], [0, 1]);

  return (
    <div className="absolute inset-0 pointer-events-none w-full h-full z-10">
      <div className="sticky top-0 w-full h-screen overflow-hidden p-6 md:p-12 lg:p-24 flex flex-col justify-between">

        {/* TOP ROW */}
        <div className="flex flex-col md:flex-row justify-between items-start gap-8 mt-24">

          {/* Top Left: Headline */}
          <motion.div
            style={{ opacity: opacityTL, y: yTL }}
            className="pointer-events-auto max-w-xl md:max-w-2xl absolute top-24 left-6 md:left-12 lg:left-24"
          >
            <h1 className="font-outfit text-5xl md:text-7xl font-extrabold leading-tight tracking-tight text-white drop-shadow-2xl">
              {HERO_CONTENT.brand.first}<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-[#57ff8f]">
                {HERO_CONTENT.brand.tagline}
              </span>
            </h1>
          </motion.div>

          {/* Top Right: Subheadline */}
          <motion.div
            style={{ opacity: opacityTR, y: yTR }}
            className="pointer-events-auto max-w-2xl text-center absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"          >
            <h2 className="font-outfit text-xl md:text-2xl font-semibold text-gray-200 drop-shadow-xl leading-relaxed">
              {HERO_CONTENT.subheadline.sectors}<br />
              <span className="text-[#57ff8f]">·</span> {HERO_CONTENT.subheadline.experience}<br />
              <span className="text-[#57ff8f]">·</span> {HERO_CONTENT.subheadline.impact}
            </h2>
          </motion.div>

        </div>

        {/* MIDDLE ROW: About Us */}
        <div className="absolute inset-0 flex items-center justify-center p-6 md:p-12">
          <motion.div id="about" style={{ opacity: opacityAbout, y: yAbout }} className="pointer-events-auto max-w-3xl text-center">
            <h3 className="font-outfit text-4xl md:text-5xl font-bold text-white mb-6 drop-shadow-xl">
              {HERO_CONTENT.about.title}
            </h3>
            <p className="font-outfit text-xl md:text-2xl text-gray-200 leading-relaxed drop-shadow-lg">
              {HERO_CONTENT.about.description}
            </p>
          </motion.div>
        </div>

        {/* BOTTOM ROW */}
        <div className="flex flex-col md:flex-row justify-between items-end gap-8 mb-8 md:mb-12 absolute bottom-12 left-6 right-6 md:left-12 md:right-12 lg:left-24 lg:right-24">

          {/* Bottom Left: Microcopy */}
          <motion.div style={{ opacity: opacityBL, x: xBL, y: yBL }} className="pointer-events-auto max-w-md text-left">
            <p className="font-outfit text-lg md:text-xl text-gray-300 font-medium drop-shadow-lg leading-snug">
              {HERO_CONTENT.microcopy}
            </p>
          </motion.div>

          {/* Bottom Right: Primary CTA */}
          <motion.div style={{ opacity: opacityBR, scale: scaleBR }} className="pointer-events-auto flex justify-center md:justify-end md:ml-auto w-full md:w-auto">
            <Link
              href="/join"
              className="group relative inline-flex items-center justify-center px-8 py-4 text-base md:text-lg font-bold text-[#001827] bg-[#57ff8f] shadow-[0_0_20px_rgba(0,229,255,0.4)] hover:shadow-[0_0_30px_rgba(0,229,255,0.8)] rounded-none overflow-hidden transition-all duration-300 ease-out"
            >
              <div className="absolute inset-0 w-full h-full bg-white opacity-0 group-hover:opacity-20 transition-opacity duration-300" />
              <span className="mr-3 tracking-wide">{HERO_CONTENT.cta}</span>
            </Link>
          </motion.div>

        </div>

        {/* Scroll cue */}
        <motion.div style={{ opacity: opacityCue }} className="absolute bottom-6 left-1/2 transform -translate-x-1/2">
          <span className="animate-bounce text-gray-400 text-2xl">⌄</span>
        </motion.div>

      </div>
    </div>
  );
}