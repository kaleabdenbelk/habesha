"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { Plus, Minus, HelpCircle } from "lucide-react";
import { FAQ_CONTENT } from "@/constants";

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id="faq" className="relative w-full py-24 md:py-32 bg-black overflow-hidden px-6">
      {/* Decorative Background Elements */}
      <div className="absolute top-1/4 left-1/4 w-[400px] h-[400px] bg-[#57ff8f]/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-[#005f73]/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-4xl mx-auto relative z-10">
        {/* Header */}
        <div className="text-center mb-16 md:mb-24">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-[#57ff8f] font-outfit font-bold uppercase tracking-widest text-sm mb-4 block"
          >
            {FAQ_CONTENT.tagline}
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="font-outfit text-4xl md:text-6xl font-extrabold text-white leading-tight"
          >
            {FAQ_CONTENT.titlePrefix} <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#57ff8f] to-white">{FAQ_CONTENT.titleGradient}</span>
          </motion.h2>
        </div>

        {/* FAQ Accordion List */}
        <div className="space-y-4">
          {FAQ_CONTENT.items.map((item, index) => {
            const isOpen = openIndex === index;

            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className={`group rounded-2xl border transition-all duration-500 overflow-hidden backdrop-blur-sm
                  ${isOpen
                    ? "bg-white/[0.05] border-[#57ff8f]/30 shadow-[0_0_30px_rgba(0,229,255,0.05)]"
                    : "bg-white/[0.02] border-white/5 hover:border-white/20"}
                `}
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                  className="w-full flex items-center justify-between p-6 md:p-8 text-left transition-colors"
                >
                  <div className="flex items-center gap-4">
                    <div className={`p-2 rounded-lg transition-colors duration-300 
                      ${isOpen ? "bg-[#57ff8f]/10 text-[#57ff8f]" : "bg-white/5 text-gray-500"}
                    `}>
                      <HelpCircle className="w-5 h-5" />
                    </div>
                    <span className={`font-outfit text-lg md:text-xl font-bold transition-colors duration-300
                      ${isOpen ? "text-white" : "text-gray-300 group-hover:text-white"}
                    `}>
                      {item.question}
                    </span>
                  </div>

                  <div className={`flex-shrink-0 ml-4 p-2 rounded-full transition-all duration-500
                    ${isOpen ? "bg-[#57ff8f] text-black rotate-180" : "bg-white/5 text-white"}
                  `}>
                    {isOpen ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                  </div>
                </button>

                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.4, ease: [0.04, 0.62, 0.23, 0.98] }}
                    >
                      <div className="px-6 md:px-8 pb-8 pt-2">
                        <div className="w-full h-[1px] bg-white/5 mb-6" />
                        <p className="font-outfit text-gray-400 text-base md:text-lg leading-relaxed max-w-3xl">
                          {item.answer}
                        </p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
