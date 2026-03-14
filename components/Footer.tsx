"use client";

import { motion } from "framer-motion";
import { Linkedin, Github, Twitter, Instagram, ArrowUp } from "lucide-react";
import { FOOTER_CONTENT } from "@/constants";
import Image from "next/image";

const footerLinks = {
  navigation: FOOTER_CONTENT.navLinks,
  vectors: FOOTER_CONTENT.pillarsLinks,
  socials: [
    { name: "LinkedIn", icon: Linkedin, href: "#" },
    // { name: "GitHub", icon: Github, href: "#" },
    { name: "Twitter", icon: Twitter, href: "#" },
    { name: "Instagram", icon: Instagram, href: "#" },
  ],
};

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="relative w-full bg-black pt-24 pb-12 px-6 overflow-hidden border-t border-white/5">
      {/* Background Decorative FX (Matches Contact Hub) */}
      <div className="absolute inset-0 z-0 opacity-10">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:60px_60px]" />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-20">

          {/* Column 1: Brand */}
          <div className="space-y-6">
            <div className="flex w-fit items-center">
              <Image src="/logoo.png" alt="Logo" width={60} height={60} />
              <h1 className="font-outfit uppercase tracking-tighter text-white">Habesha Progeny</h1>
            </div>
            <p className="font-outfit text-gray-400 text-sm leading-relaxed max-w-xs">
              {FOOTER_CONTENT.description}
            </p>
            <div className="flex items-center gap-4 pt-4">
              {footerLinks.socials.map((social) => {
                const Icon = social.icon;
                return (
                  <a
                    key={social.name}
                    href={social.href}
                    className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-gray-400 hover:text-[#57ff8f] hover:border-[#57ff8f] hover:bg-[#57ff8f]/5 transition-all"
                  >
                    <Icon className="w-4 h-4" />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Column 2: Navigation */}
          <div>
            <h4 className="font-outfit text-sm font-bold uppercase tracking-widest text-white mb-6">{FOOTER_CONTENT.experienceTitle}</h4>
            <ul className="space-y-4">
              {footerLinks.navigation.map((link) => (
                <li key={link.name}>
                  <a href={link.href} className="font-outfit text-sm text-gray-400 hover:text-white transition-colors">{link.name}</a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Project Vectors */}
          <div>
            <h4 className="font-outfit text-sm font-bold uppercase tracking-widest text-white mb-6">{FOOTER_CONTENT.pillarsTitle}</h4>
            <ul className="space-y-4">
              {footerLinks.vectors.map((link) => (
                <li key={link.name}>
                  <a href={link.href} className="font-outfit text-sm text-gray-400 hover:text-white transition-colors">{link.name}</a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Status Hub */}
          <div className="space-y-6">
            <h4 className="font-outfit text-sm font-bold uppercase tracking-widest text-white mb-6">{FOOTER_CONTENT.statusTitle}</h4>
            <div className="flex flex-col gap-4">
              <div className="p-4 rounded-2xl bg-white/5 border border-white/5 space-y-2">
                <div className="flex items-center justify-between text-[10px] font-bold tracking-widest text-[#57ff8f] uppercase">
                  <span>{FOOTER_CONTENT.statusLabel}</span>
                  <span className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#57ff8f] animate-pulse" />
                    {FOOTER_CONTENT.statusValue}
                  </span>
                </div>
                <div className="h-1 w-full bg-white/5 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: "88%" }}
                    className="h-full bg-[#57ff8f]"
                  />
                </div>
              </div>
              <p className="text-[10px] text-gray-500 font-medium tracking-wide uppercase leading-relaxed">
                {FOOTER_CONTENT.statusLatency}<br />
                {FOOTER_CONTENT.statusCount}
              </p>
            </div>
          </div>
        </div>

        {/* Sub-footer */}
        <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="text-[10px] font-bold text-gray-600 tracking-widest uppercase">
            {FOOTER_CONTENT.copyright}
          </div>

          <button
            onClick={scrollToTop}
            className="group flex items-center gap-3 text-[10px] font-bold text-white tracking-widest uppercase hover:text-[#57ff8f] transition-colors"
          >
            {FOOTER_CONTENT.scrollToTop}
            <div className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center group-hover:border-[#57ff8f] transition-all">
              <ArrowUp className="w-3 h-3 group-hover:-translate-y-1 transition-transform" />
            </div>
          </button>
        </div>
      </div>
    </footer>
  );
}
