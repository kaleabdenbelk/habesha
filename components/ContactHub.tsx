"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { Send, Terminal, Cpu, Globe, Zap } from "lucide-react";
import { CONTACT_CONTENT } from "@/constants";
import { submitContact } from "@/app/actions";

const intents = [
  { id: "tech", label: CONTACT_CONTENT.intents[0].label, icon: Cpu },
  { id: "strategy", label: CONTACT_CONTENT.intents[1].label, icon: Globe },
  { id: "creative", label: CONTACT_CONTENT.intents[2].label, icon: Zap },
];

export default function ContactHub() {
  const [selectedIntent, setSelectedIntent] = useState("tech");
  const [isTransmitting, setIsTransmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsTransmitting(true);
    
    const result = await submitContact({
      ...formData,
      intent: selectedIntent,
    });

    if (result.success) {
      setFormData({ name: "", email: "", message: "" });
      // In a real app we might show a success toast here
    } else {
      alert(result.error);
    }
    
    setIsTransmitting(false);
  };

  return (
    <section id="contact" className="relative w-full min-h-screen bg-black py-24 md:py-32 px-6 overflow-hidden flex items-center justify-center">
      {/* Background Grid & FX */}
      <div className="absolute inset-0 z-0 opacity-20">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:40px_40px]" />
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#57ff8f]/50 to-transparent" />
      </div>

      <div className="max-w-6xl w-full grid grid-cols-1 lg:grid-cols-2 gap-16 relative z-10">

        {/* Left Side: Terminal Context */}
        <div className="flex flex-col justify-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="mb-8"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#57ff8f]/10 border border-[#57ff8f]/20 text-[#57ff8f] text-[10px] font-bold tracking-widest uppercase mb-6">
              <Terminal className="w-3 h-3" />
              {CONTACT_CONTENT.protocol}
            </div>
            <h2 className="font-outfit text-4xl md:text-6xl font-extrabold text-white leading-tight mb-6">
              {CONTACT_CONTENT.titlePrefix} <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#57ff8f] to-white">{CONTACT_CONTENT.titleGradient}</span>
            </h2>
            <p className="font-outfit text-gray-400 text-lg md:text-xl max-w-md leading-relaxed">
              {CONTACT_CONTENT.tagline}
            </p>
          </motion.div>

          {/* Intent Selection Chips */}
          <div className="space-y-4">
            <span className="text-[10px] font-bold text-gray-500 tracking-widest uppercase block mb-2">{CONTACT_CONTENT.vectorLabel}</span>
            <div className="flex flex-wrap gap-3">
              {intents.map((intent) => {
                const Icon = intent.icon;
                const isSelected = selectedIntent === intent.id;
                return (
                  <button
                    key={intent.id}
                    onClick={() => setSelectedIntent(intent.id)}
                    className={`relative flex items-center gap-3 px-5 py-3 rounded-xl border transition-all duration-300 group
                      ${isSelected
                        ? "bg-[#57ff8f]/10 border-[#57ff8f] text-[#57ff8f] shadow-[0_0_20px_rgba(0,229,255,0.2)]"
                        : "bg-white/5 border-white/10 text-gray-400 hover:border-white/20"
                      }`}
                  >
                    <Icon className={`w-4 h-4 ${isSelected ? "animate-pulse" : ""}`} />
                    <span className="font-outfit text-sm font-bold tracking-wide">{intent.label}</span>
                    {isSelected && (
                      <motion.div
                        layoutId="chip-glow"
                        className="absolute inset-0 rounded-xl bg-[#57ff8f]/5 blur-md"
                      />
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right Side: High-Tech Form */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="relative"
        >
          {/* Form Container with High-Tech Border */}
          <div className="relative p-8 md:p-10 rounded-3xl bg-[#001827]/80 border border-white/10 backdrop-blur-xl shadow-2xl overflow-hidden group">

            {/* Corner Decorative Accents */}
            <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-[#57ff8f]/40 rounded-tl-3xl" />
            <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-[#57ff8f]/40 rounded-tr-3xl" />
            <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-[#57ff8f]/40 rounded-bl-3xl" />
            <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-[#57ff8f]/40 rounded-br-3xl" />

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <label className="text-[10px] font-bold text-gray-500 tracking-widest uppercase ml-1">{CONTACT_CONTENT.form.nameLabel}</label>
                <div className="relative">
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder={CONTACT_CONTENT.form.namePlaceholder}
                    className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-4 text-white font-outfit focus:outline-none focus:border-[#57ff8f] focus:ring-1 focus:ring-[#57ff8f]/30 transition-all placeholder:text-gray-700"
                  />
                  <div className="absolute right-4 top-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-white/5" />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-bold text-gray-500 tracking-widest uppercase ml-1">{CONTACT_CONTENT.form.emailLabel}</label>
                <div className="relative">
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder={CONTACT_CONTENT.form.emailPlaceholder}
                    className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-4 text-white font-outfit focus:outline-none focus:border-[#57ff8f] focus:ring-1 focus:ring-[#57ff8f]/30 transition-all placeholder:text-gray-700"
                  />
                  <div className="absolute right-4 top-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-white/5" />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-bold text-gray-500 tracking-widest uppercase ml-1">{CONTACT_CONTENT.form.messageLabel}</label>
                <textarea
                  required
                  rows={4}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder={CONTACT_CONTENT.form.messagePlaceholder}
                  className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-4 text-white font-outfit focus:outline-none focus:border-[#57ff8f] focus:ring-1 focus:ring-[#57ff8f]/30 transition-all placeholder:text-gray-700 resize-none"
                />
              </div>

              <motion.button
                whileHover={{ scale: 1.02, backgroundColor: "#57ff8f", color: "#001827" }}
                whileTap={{ scale: 0.98 }}
                disabled={isTransmitting}
                className={`w-full group relative flex items-center justify-center gap-3 py-5 rounded-2xl font-outfit font-bold tracking-widest text-sm transition-all duration-300
                  ${isTransmitting ? "bg-gray-800 text-gray-500 cursor-not-allowed" : "bg-white/5 border border-white/20 text-white"}
                `}
              >
                <AnimatePresence mode="wait">
                  {isTransmitting ? (
                    <motion.div
                      key="sending"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="flex items-center gap-3"
                    >
                      <div className="w-2 h-2 rounded-full bg-[#57ff8f] animate-ping" />
                      {CONTACT_CONTENT.form.buttonTransmitting}
                    </motion.div>
                  ) : (
                    <motion.div
                      key="ready"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="flex items-center gap-3"
                    >
                      {CONTACT_CONTENT.form.buttonReady}
                      <Send className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Button Glow FX */}
                {!isTransmitting && (
                  <div className="absolute inset-0 rounded-2xl bg-[#57ff8f]/0 group-hover:bg-[#57ff8f]/10 blur-xl transition-all duration-500" />
                )}
              </motion.button>
            </form>

            {/* Interactive "Scanning" Line */}
            <motion.div
              animate={{ top: ["0%", "100%", "0%"] }}
              transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
              className="absolute left-0 right-0 h-px bg-[#57ff8f]/10 z-0 pointer-events-none"
            />
          </div>

          {/* Signal Pulse Background */}
          <div className="absolute -top-12 -right-12 w-32 h-32 bg-[#57ff8f]/5 rounded-full blur-3xl animate-pulse" />
        </motion.div>
      </div>
    </section>
  );
}
