"use client";

import { useRef } from "react";
import { useScroll } from "framer-motion";
import HeroCanvas from "./HeroCanvas";
import HeroTextOverlays from "./HeroTextOverlays";

export default function Hero() {
  const containerRef = useRef<HTMLElement>(null);
  
  // Track scroll progress within the Hero section. 
  // It spans 500vh to give a long scrolling duration.
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  return (
    <section 
      ref={containerRef} 
      className="relative w-full h-[500vh] bg-[#001827] text-white"
      id="hero"
    >
      <HeroCanvas scrollYProgress={scrollYProgress} />
      <HeroTextOverlays scrollYProgress={scrollYProgress} />
    </section>
  );
}
