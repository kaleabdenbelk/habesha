"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Music, VolumeX } from "lucide-react";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isAudioSupported, setIsAudioSupported] = useState(true);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const fadeIntervalRef = useRef<NodeJS.Timeout | null>(null);

  // Requirement: Music file path is just spaces or empty if unprovided. Let's use an empty string that won't break 
  // or a placeholder that represents the user's intent:
  const MUSIC_FILE_PATH = "  ";

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    // Only initialize Audio if there's a valid path. If "  ", it might throw unhandled rejections.
    // For safety with empty path placeholder required by instructions:
    const audioUrl = MUSIC_FILE_PATH.trim() ? MUSIC_FILE_PATH : "/audio/bg-music.mp3"; 
    
    try {
      audioRef.current = new Audio(audioUrl);
      audioRef.current.loop = true;
      audioRef.current.volume = 0; // Start muted for soft fade in
    } catch (err) {
      console.warn("Audio not supported or invalid path.", err);
      setIsAudioSupported(false);
      return;
    }

    const startAudio = async () => {
      try {
        await audioRef.current?.play();
        setIsPlaying(true);
        fadeInAudio();
      } catch (err) {
        // Autoplay is blocked unless the user interacts first
        console.log("Autoplay blocked. User interaction required.");
      }
    };

    startAudio();

    // Cleanup: completely stop music and clear refs on unmount
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.src = "";
        audioRef.current = null;
      }
      if (fadeIntervalRef.current) {
        clearInterval(fadeIntervalRef.current);
      }
    };
  }, []);

  const fadeInAudio = () => {
    if (!audioRef.current) return;
    if (fadeIntervalRef.current) clearInterval(fadeIntervalRef.current);
    
    fadeIntervalRef.current = setInterval(() => {
      if (audioRef.current && audioRef.current.volume < 0.2) { // 0.2 for "softly"
        audioRef.current.volume = Math.min(0.2, audioRef.current.volume + 0.05);
      } else {
        if (fadeIntervalRef.current) clearInterval(fadeIntervalRef.current);
      }
    }, 200);
  };

  const fadeOutAudio = () => {
    if (!audioRef.current) return;
    if (fadeIntervalRef.current) clearInterval(fadeIntervalRef.current);
    
    fadeIntervalRef.current = setInterval(() => {
      if (audioRef.current && audioRef.current.volume > 0) {
        audioRef.current.volume = Math.max(0, audioRef.current.volume - 0.05);
      } else {
        audioRef.current?.pause();
        if (fadeIntervalRef.current) clearInterval(fadeIntervalRef.current);
      }
    }, 200);
  };

  const togglePlay = () => {
    if (!audioRef.current) return;
    
    if (isPlaying) {
      setIsPlaying(false);
      fadeOutAudio();
    } else {
      audioRef.current.play().then(() => {
        setIsPlaying(true);
        fadeInAudio();
      }).catch(console.error);
    }
  };

  return (
    <motion.nav 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        isScrolled 
          ? "bg-[#001827]/80 backdrop-blur-md border-b border-[#00E5FF]/10 shadow-lg shadow-black/50" 
          : "bg-transparent"
      }`}
    >
      <div className="max-w-[1440px] mx-auto px-6 h-24 flex items-center justify-between">
        {/* Brand Logo Wordmark */}
        <div className="text-3xl font-extrabold tracking-widest uppercase bg-clip-text text-transparent bg-gradient-to-br from-white to-[#00E5FF] drop-shadow-md">
          AquaNova
        </div>
        
        <div className="flex items-center gap-6">
          {isAudioSupported && (
            <motion.button
              onClick={togglePlay}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              aria-label={isPlaying ? "Pause background music" : "Play background music"}
              className="relative flex items-center justify-center w-12 h-12 rounded-full border border-white/20 text-[#00E5FF] transition-colors group z-10 hover:bg-[#00E5FF]/10"
            >
              {isPlaying && (
                <motion.div 
                  className="absolute inset-0 rounded-full bg-[#00E5FF] mix-blend-screen"
                  animate={{ scale: [1, 1.4, 1], opacity: [0.3, 0, 0.3] }}
                  transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                />
              )}
              <AnimatePresence mode="wait">
                {isPlaying ? (
                  <motion.div
                    key="playing"
                    initial={{ opacity: 0, rotate: -90, scale: 0.8 }}
                    animate={{ opacity: 1, rotate: 0, scale: 1 }}
                    exit={{ opacity: 0, rotate: 90, scale: 0.8 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Music className="w-5 h-5 drop-shadow-[0_0_8px_rgba(0,229,255,0.8)]" />
                  </motion.div>
                ) : (
                  <motion.div
                    key="paused"
                    initial={{ opacity: 0, rotate: -90, scale: 0.8 }}
                    animate={{ opacity: 1, rotate: 0, scale: 1 }}
                    exit={{ opacity: 0, rotate: 90, scale: 0.8 }}
                    transition={{ duration: 0.2 }}
                    className="opacity-50"
                  >
                    <VolumeX className="w-5 h-5" />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.button>
          )}

          <a 
            href="#contact" 
            className="hidden md:flex relative items-center justify-center px-6 py-2.5 rounded-full text-sm font-semibold tracking-wide text-white bg-white/5 hover:bg-white/10 border border-white/20 transition-all duration-300 group"
          >
            Request Info
            <span className="absolute inset-0 rounded-full flex items-center justify-center pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity bg-gradient-to-r from-transparent via-[#00E5FF]/20 to-transparent animate-pulse" />
          </a>
        </div>
      </div>
    </motion.nav>
  );
}
