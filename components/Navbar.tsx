"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { NAV_LINKS, FOOTER_CONTENT, NAVBAR_CONTENT } from "@/constants";
import Image from "next/image";
import Link from "next/link";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="fixed top-0 left-0 w-full z-[100] px-6 py-6 pointer-events-none">
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
        className={`mx-auto flex items-center justify-between transition-all duration-500 pointer-events-auto
          ${isScrolled
            ? "max-w-[700px] bg-black/40 backdrop-blur-xl border border-white/10 px-6 py-3 rounded-full shadow-[0_10px_40px_rgba(0,0,0,0.4)]"
            : "max-w-[1440px] bg-transparent border-transparent px-0 py-4 rounded-none"
          }
        `}
      >
        {/* Brand */}
        <Link
          href="/"
          className={`font-extrabold tracking-tighter uppercase font-outfit transition-all duration-500 pointer-events-auto
            ${isScrolled ? "text-xl text-white" : "text-3xl text-white"}
          `}
        >
          <Image src="/logoo.png" alt="Logo" width={30} height={30} />
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="group relative text-xs font-bold uppercase tracking-widest text-gray-400 hover:text-white transition-colors"
            >
              {link.name}
              <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-[#57ff8f] transition-all duration-300 group-hover:w-full" />
            </a>
          ))}
        </div>

        <div className="flex items-center gap-4">


          {/* Request Info CTA (Only visible when scrolled or on desktop) */}
          <motion.div>
            <Link
              href="/join"
              className={`hidden lg:flex items-center justify-center font-bold tracking-widest text-[10px] uppercase rounded-full transition-all duration-500
                ${isScrolled
                  ? "px-4 py-2 bg-[#57ff8f] text-black shadow-[0_0_20px_rgba(0,229,255,0.4)]"
                  : "px-6 py-3 bg-white/10 text-white border border-white/10 hover:bg-white/20"
                }
              `}
            >
              {NAVBAR_CONTENT.cta}
            </Link>
          </motion.div>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden flex items-center justify-center w-10 h-10 text-white"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </motion.nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="md:hidden absolute top-24 left-6 right-6 bg-black/90 backdrop-blur-2xl border border-white/10 rounded-3xl p-8 z-[101] pointer-events-auto shadow-2xl"
          >
            <div className="flex flex-col gap-6">
              {NAV_LINKS.map((link, idx) => (
                <motion.a
                  key={link.name}
                  href={link.href}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-2xl font-bold uppercase tracking-tight text-white flex items-center justify-between group"
                >
                  {link.name}
                  <ArrowUpRight className="w-5 h-5 text-gray-600 group-hover:text-[#57ff8f] group-hover:translate-x-1 group-hover:-translate-y-1 transition-all" />
                </motion.a>
              ))}
              <div className="pt-6 border-t border-white/5">
                <Link
                  href="/join"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block w-full text-center py-4 bg-[#57ff8f] text-black rounded-xl font-bold tracking-widest text-sm"
                >
                  {NAVBAR_CONTENT.mobileCta}
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function ArrowUpRight({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <line x1="7" y1="17" x2="17" y2="7"></line>
      <polyline points="7 7 17 7 17 17"></polyline>
    </svg>
  );
}

