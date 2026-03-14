"use client";

import { useEffect, useRef, useState } from "react";
import { MotionValue, useMotionValueEvent } from "framer-motion";

const FRAME_COUNT = 181;
const IMAGE_PATH_PREFIX = "/images/ezgif-frame-";
const IMAGE_EXTENSION = ".jpg";

interface HeroCanvasProps {
  scrollYProgress: MotionValue<number>;
}

export default function HeroCanvas({ scrollYProgress }: HeroCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const images = useRef<HTMLImageElement[]>([]);
  const [imagesLoaded, setImagesLoaded] = useState(0);

  // Preload frames
  useEffect(() => {
    let loaded = 0;
    const loadImages = async () => {
      for (let i = 1; i <= FRAME_COUNT; i++) {
        const img = new Image();
        const paddedIndex = i.toString().padStart(3, '0');
        img.src = `${IMAGE_PATH_PREFIX}${paddedIndex}${IMAGE_EXTENSION}`;
        img.onload = () => {
          loaded++;
          setImagesLoaded(loaded);
          // Draw first frame as soon as it's ready
          if (i === 1 && canvasRef.current) {
            requestAnimationFrame(() => renderFrame(1));
          }
        };
        images.current[i] = img;
      }
    };
    loadImages();
  }, []);

  const renderFrame = (frameIndex: number) => {
    if (!canvasRef.current || !images.current[frameIndex]) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    
    // Scale for high DPR displays
    const dpr = window.devicePixelRatio || 1;
    const rect = canvas.getBoundingClientRect();
    
    if (canvas.width !== rect.width * dpr || canvas.height !== rect.height * dpr) {
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      ctx.scale(dpr, dpr);
    }

    const img = images.current[frameIndex];
    if (!img.complete || img.naturalWidth === 0) return;

    // object-cover logic
    const imgRatio = img.width / img.height;
    const canvasRatio = rect.width / rect.height;
    let drawWidth, drawHeight, offsetX = 0, offsetY = 0;

    if (canvasRatio > imgRatio) {
      drawWidth = rect.width;
      drawHeight = rect.width / imgRatio;
      offsetY = (rect.height - drawHeight) / 2;
    } else {
      drawHeight = rect.height;
      drawWidth = rect.height * imgRatio;
      offsetX = (rect.width - drawWidth) / 2;
    }

    ctx.clearRect(0, 0, rect.width, rect.height);
    // Use simple crossfade mapping or direct draw for smooth scrollytelling
    ctx.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);
  };

  useEffect(() => {
    const handleResize = () => {
      const currentProgress = scrollYProgress.get();
      const frameIndex = Math.max(1, Math.min(FRAME_COUNT, Math.ceil(currentProgress * FRAME_COUNT)));
      requestAnimationFrame(() => renderFrame(frameIndex));
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [scrollYProgress]);

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    // Map progress 0-1 to frame 1-120 smoothly
    let frameIndex = Math.ceil(latest * FRAME_COUNT);
    if (frameIndex < 1) frameIndex = 1;
    if (frameIndex > FRAME_COUNT) frameIndex = FRAME_COUNT;
    requestAnimationFrame(() => renderFrame(frameIndex));
  });

  return (
    <div className="sticky top-0 w-full h-screen overflow-hidden bg-[#001827]">
      <canvas
        ref={canvasRef}
        className="w-full h-full block"
        role="img"
        style={{ width: '100vw', height: '100vh' }}
        aria-label="AquaNova Yacht moving through the water"
      />
      {/* Fallback pattern/gradient while loading to prevent empty block */}
      {imagesLoaded === 0 && (
        <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-[#001827] to-[#005f73]">
           <div className="w-12 h-12 border-4 border-[#00E5FF] border-t-transparent rounded-full animate-spin"></div>
        </div>
      )}
      {/* Subtle overlay to guarantee text legibility */}
      <div className="absolute inset-0 pointer-events-none bg-gradient-to-br from-black/50 via-transparent to-black/60 mix-blend-multiply" />
    </div>
  );
}
