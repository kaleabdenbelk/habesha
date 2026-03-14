"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { ChevronRight, ArrowLeft, CheckCircle2, Terminal, Send, Cpu, Globe, Zap, Sparkles, Check } from "lucide-react";
import Link from "next/link";
import { INNER_CIRCLE_CONTENT, INNER_CIRCLE_FORM } from "@/constants";
import { submitJoin } from "@/app/actions";

export default function JoinPage() {
  const [formData, setFormData] = useState({
    email: "",
    specialization: "",
    commit: false,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.commit || !formData.specialization) return;

    setIsSubmitting(true);
    
    const result = await submitJoin({
      email: formData.email,
      specialization: formData.specialization,
    });

    if (result.success) {
      setIsSuccess(true);
    } else {
      alert(result.error);
    }
    
    setIsSubmitting(false);
  };

  return (
    <main className="min-h-screen bg-black text-white selection:bg-[#57ff8f] selection:text-[#001827] overflow-hidden">
      {/* Background Decorative Mesh/Grid */}
      <div className="fixed inset-0 z-0 opacity-20 transition-opacity duration-1000">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,#57ff8f08,transparent_50%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808008_1px,transparent_1px),linear-gradient(to_bottom,#80808008_1px,transparent_1px)] bg-[size:40px_40px]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-24 md:py-32">
        {/* Navigation / Back */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="mb-12"
        >
          <Link
            href="/"
            className="group inline-flex items-center gap-2 text-sm font-bold tracking-widest uppercase text-gray-400 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
            RETURN_TO_HUB
          </Link>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start">

          {/* Left Column: Mission & Requirements */}
          <div className="space-y-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              <span className="inline-block px-3 py-1 rounded-full bg-[#57ff8f]/10 border border-[#57ff8f]/20 text-[#57ff8f] text-[10px] font-bold tracking-widest uppercase mb-6">
                {INNER_CIRCLE_CONTENT.tagline}
              </span>
              <h1 className="font-outfit text-5xl md:text-7xl font-extrabold leading-tight tracking-tighter mb-8">
                {INNER_CIRCLE_CONTENT.titlePrefix} <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#57ff8f] to-white">
                  {INNER_CIRCLE_CONTENT.titleGradient}
                </span>
              </h1>
              <p className="font-outfit text-xl text-gray-400 leading-relaxed max-w-xl">
                {INNER_CIRCLE_CONTENT.description}
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="space-y-6"
            >
              <h3 className="font-outfit text-sm font-bold uppercase tracking-widest text-[#57ff8f]">System Requirements</h3>
              <ul className="space-y-4">
                {INNER_CIRCLE_CONTENT.requirements.map((req, i) => (
                  <motion.li
                    key={i}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 + (i * 0.1) }}
                    className="flex items-start gap-3"
                  >
                    <div className="mt-1 w-1.5 h-1.5 rounded-full bg-[#57ff8f] shadow-[0_0_10px_rgba(0,229,255,0.5)] flex-shrink-0" />
                    <span className="font-outfit text-gray-300">{req}</span>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          </div>

          {/* Right Column: Application Form */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 }}
            className="relative"
          >
            {/* Form Glow */}
            <div className="absolute -inset-4 bg-gradient-to-tr from-[#57ff8f]/10 to-transparent blur-3xl opacity-50 -z-10" />

            <div className="bg-white/[0.03] backdrop-blur-3xl border border-white/10 rounded-3xl p-8 md:p-12 shadow-2xl relative overflow-hidden">
              {/* Form Scan Line Animation */}
              <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[#57ff8f]/40 to-transparent animate-scan" />

              <AnimatePresence mode="wait">
                {!isSuccess ? (
                  <motion.form
                    key="form"
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0, y: -20 }}
                    onSubmit={handleSubmit}
                    className="space-y-8"
                  >
                    {/* Header */}
                    <div className="flex items-center gap-3 pb-6 border-b border-white/5">
                      <Terminal className="w-5 h-5 text-[#57ff8f]" />
                      <span className="font-mono text-[10px] tracking-widest text-gray-500 uppercase">RECRUITMENT_PHASE_01</span>
                    </div>

                    {/* Email Input */}
                    <div className="space-y-2">
                      <label className="text-[10px] font-bold text-gray-500 tracking-widest uppercase ml-1">
                        {INNER_CIRCLE_FORM.emailLabel}
                      </label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder={INNER_CIRCLE_FORM.emailPlaceholder}
                        className="w-full bg-black/40 border border-white/10 rounded-2xl px-5 py-4 text-white font-outfit focus:outline-none focus:border-[#57ff8f] focus:ring-1 focus:ring-[#57ff8f]/30 transition-all placeholder:text-gray-700"
                      />
                    </div>

                    {/* Specialization Select */}
                    <div className="space-y-2">
                      <label className="text-[10px] font-bold text-gray-500 tracking-widest uppercase ml-1">
                        {INNER_CIRCLE_FORM.fieldLabel}
                      </label>
                      <select
                        required
                        value={formData.specialization}
                        onChange={(e) => setFormData({ ...formData, specialization: e.target.value })}
                        className="w-full bg-black/40 border border-white/10 rounded-2xl px-5 py-4 text-white font-outfit focus:outline-none focus:border-[#57ff8f] focus:ring-1 focus:ring-[#57ff8f]/30 transition-all appearance-none cursor-pointer"
                      >
                        <option value="" disabled className="bg-black">{INNER_CIRCLE_FORM.fieldPlaceholder}</option>
                        {INNER_CIRCLE_FORM.fields.map(field => (
                          <option key={field.value} value={field.value} className="bg-black text-white">{field.label}</option>
                        ))}
                      </select>
                    </div>

                    {/* Commitment Checklist */}
                    <div className="pt-4">
                      <label className="flex items-center gap-4 group cursor-pointer">
                        <div className="relative flex items-center justify-center">
                          <input
                            type="checkbox"
                            required
                            checked={formData.commit}
                            onChange={(e) => setFormData({ ...formData, commit: e.target.checked })}
                            className="peer sr-only"
                          />
                          <div className="w-6 h-6 border-2 border-white/10 rounded-lg bg-black/40 peer-checked:bg-[#57ff8f] peer-checked:border-[#57ff8f] transition-all" />
                          <CheckCircle2 className="absolute w-4 h-4 text-black opacity-0 peer-checked:opacity-100 transition-opacity" />
                        </div>
                        <span className="font-outfit text-sm text-gray-400 group-hover:text-white transition-colors">
                          {INNER_CIRCLE_FORM.commitmentLabel}
                        </span>
                      </label>
                    </div>

                    {/* Submit Button */}
                    <button
                      type="submit"
                      disabled={isSubmitting || !formData.commit || !formData.specialization}
                      className={`group relative w-full inline-flex items-center justify-center px-8 py-5 text-sm font-bold tracking-widest text-[#001827] bg-[#57ff8f] rounded-2xl overflow-hidden transition-all duration-300
                        ${(isSubmitting || !formData.commit || !formData.specialization) ? "opacity-50 cursor-not-allowed" : "hover:shadow-[0_0_30px_rgba(0,229,255,0.4)] active:scale-[0.98]"}
                      `}
                    >
                      <AnimatePresence mode="wait">
                        {isSubmitting ? (
                          <motion.div
                            key="loading"
                            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                            className="flex items-center gap-3"
                          >
                            <div className="w-4 h-4 border-2 border-[#001827] border-t-transparent rounded-full animate-spin" />
                            TRANSMITTING...
                          </motion.div>
                        ) : (
                          <motion.div
                            key="ready"
                            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                            className="flex items-center gap-3"
                          >
                            {INNER_CIRCLE_FORM.cta}
                            <Send className="w-4 h-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </button>
                  </motion.form>
                ) : (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="flex flex-col items-center text-center py-12"
                  >
                    <div className="w-20 h-20 rounded-full bg-[#57ff8f]/10 flex items-center justify-center mb-8 relative">
                      <Check className="w-10 h-10 text-[#57ff8f]" />
                    </div>
                    <h2 className="font-outfit text-3xl font-extrabold text-white mb-4">
                      {INNER_CIRCLE_FORM.successTitle}
                    </h2>
                    <p className="font-outfit text-gray-400 text-lg leading-relaxed mb-12">
                      {INNER_CIRCLE_FORM.successMessage}
                    </p>
                    <Link
                      href="/"
                      className="inline-flex items-center gap-2 text-[#57ff8f] font-bold tracking-widest text-sm border-b border-[#57ff8f]/30 pb-1 hover:border-[#57ff8f] transition-all"
                    >
                      RETURN TO SYSTEM CORE
                      <ChevronRight className="w-4 h-4" />
                    </Link>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>

        </div>
      </div>

      {/* Style for scan line animation */}
      <style jsx global>{`
        @keyframes scan {
          0% { transform: translateY(-100%); opacity: 0; }
          50% { opacity: 1; }
          100% { transform: translateY(1000%); opacity: 0; }
        }
        .animate-scan {
          animation: scan 3s linear infinite;
        }
      `}</style>
    </main>
  );
}
