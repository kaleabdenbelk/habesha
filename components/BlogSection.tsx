"use client";

import { motion, Variants } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
const blogPosts = [
  {
    id: 1,
    category: "Future of Work",
    date: "March 14, 2026",
    title: "Will AI Replace Jobs in Ethiopia — or Create New Ones?",
    excerpt:
      "Artificial intelligence is transforming industries across the world. For Ethiopia's young workforce, the question is no longer if AI will arrive, but how we adapt, build new skills, and shape the opportunities it creates.",
  },
  {
    id: 2,
    category: "AI & Technology",
    date: "March 10, 2026",
    title: "Why AI Literacy Might Be the Most Important Skill for the Next Generation",
    excerpt:
      "Coding is powerful, but understanding how AI works may become just as important. From business to marketing to engineering, AI literacy will define the builders of the next decade.",
  },
  {
    id: 3,
    category: "Startups",
    date: "March 05, 2026",
    title: "Why Ethiopia Needs Builders, Not Just Job Seekers",
    excerpt:
      "For decades, success meant finding a job. But the future belongs to those who create them. Ethiopia's young innovators have the opportunity to build startups, solve real problems, and shape the country's economic future.",
  },
];
const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut",
    },
  },
};

export default function BlogSection() {
  return (
    <section className="relative w-full py-24 md:py-32 bg-black overflow-hidden px-6">
      {/* Decorative Blur Elements */}
      <div className="absolute top-1/2 left-0 w-[400px] h-[400px] bg-[#57ff8f]/5 rounded-full blur-[100px] -translate-y-1/2 pointer-events-none" />
      <div className="absolute top-1/2 right-0 w-[400px] h-[400px] bg-[#005f73]/5 rounded-full blur-[100px] -translate-y-1/2 pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8">
          <div>
            <motion.span
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="text-[#57ff8f] font-outfit font-bold uppercase tracking-widest text-sm mb-4 block"
            >
              The Progeny Journal
            </motion.span>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="font-outfit text-4xl md:text-6xl font-extrabold text-white"
            >
              Insights & <span className="text-gray-500 italic">Innovations.</span>
            </motion.h2>
          </div>

          <motion.button
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="group flex items-center gap-3 text-white font-bold tracking-widest text-sm border-b border-white/20 pb-2 transition-all hover:border-[#57ff8f] hover:text-[#57ff8f]"
          >
            VIEW ALL PERSPECTIVES
            <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
          </motion.button>
        </div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          {blogPosts.map((post) => (
            <motion.div
              key={post.id}
              variants={cardVariants}
              className="group relative h-full flex flex-col p-8 rounded-3xl bg-white/[0.03] border border-white/10 backdrop-blur-sm transition-all duration-500 hover:bg-white/[0.07] hover:border-[#57ff8f]/30"
            >
              <div className="flex justify-between items-start mb-12">
                <span className="text-[10px] font-bold uppercase tracking-tighter px-3 py-1 rounded-full bg-[#57ff8f]/10 text-[#57ff8f] border border-[#57ff8f]/20">
                  {post.category}
                </span>
                <span className="text-[10px] font-medium text-gray-500 uppercase tracking-widest">
                  {post.date}
                </span>
              </div>

              <div className="flex-grow">
                <h3 className="font-outfit text-2xl font-bold text-white mb-4 group-hover:text-[#57ff8f] transition-colors duration-300 leading-tight">
                  {post.title}
                </h3>
                <p className="font-outfit text-gray-400 text-sm leading-relaxed line-clamp-3 mb-8">
                  {post.excerpt}
                </p>
              </div>

              <div className="mt-auto pt-6 border-t border-white/5 flex items-center justify-between">
                <span className="text-xs font-bold text-white tracking-widest group-hover:translate-x-2 transition-transform duration-300">
                  READ ARTICLE
                </span>
                <motion.div
                  className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center border border-white/10 group-hover:bg-[#57ff8f] group-hover:border-[#57ff8f] group-hover:text-[#001827] transition-all duration-300"
                >
                  <ArrowUpRight className="w-4 h-4" />
                </motion.div>
              </div>

              {/* Subtle hover glow effect */}
              <div className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none shadow-[0_0_40px_rgba(0,229,255,0.05)]" />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
